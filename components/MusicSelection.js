import classes from "./styles/file-selection.module.scss";

import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/clientApp";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

function MusicSelection(props) {
  const { user } = props;
  const file = useRef();
  const music = useRef();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(null);

  function uploadFile(e) {
    setLoading(true);

    const curFile = e.target.files[0];

    if (curFile === null) return;

    const uploadRef = ref(storage, `${user.uid}/${props.fileNum}`);
    uploadBytes(uploadRef, curFile).then(() => {
      alert(`ARTWORK FILE #${props.fileNum} has successfully been uploaded`);
      updateURLS();
      updateDB();
      setLoading(false);
    });
  }

  function updateDB() {
    const dbRef = doc(db, `artists/${user.id}/files/music`);
    setDoc(
      dbRef,
      { url: list, type: "music", id: `${user.id}-music` },
      { merge: true }
    );
  }

  function updateURLS() {
    let listRef = ref(storage, user?.uid, "music");
    listAll(listRef).then((res) => {
      let item = res.items[4];
      if (!item) return;
      getDownloadURL(item).then((url) => {
        setList(url);
      });
    });
  }

  useEffect(() => {
    updateURLS();
  });

  return (
    <div>
      <h3>Select Music File</h3>
      {loading ? (
        <div> ~~ upload is in progress ! ~~ </div>
      ) : (
        <div>
          <input
            type="file"
            ref={file}
            accept=".mp3"
            format={"none"}
            onChange={uploadFile}
          />
        </div>
      )}
      {list ? (
        <audio controls>
          <source src={list} />
        </audio>
      ) : (
        <div />
      )}
    </div>
  );
}

export default MusicSelection;
