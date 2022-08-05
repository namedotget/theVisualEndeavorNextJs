import classes from "./styles/file-selection.module.scss";

import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/clientApp";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

function FileSelection(props) {
  const { user } = props;
  const file = useRef();
  const fileName = useRef();
  const img = useRef();
  const [loading, setLoading] = useState(false);
  const [fileType, setFileType] = useState(null);
  const [allData, setAllData] = useState(null);
  const [list, setList] = useState(null);

  const options = [
    { value: "none", label: "empty" },
    { value: "image", label: "IMAGE :  [ .png / .jpg ]" },
    { value: "video", label: "VIDEO :  [ .mp4 ] " },
    // { value: "model", label: "MODEL" },
    // { value: "shader", label: "SHADER" },
  ];
  function handleSelectionChange(e) {
    const selection = e.value;

    if (selection === "none") return;
    if (selection === "image") {
      file.current.accept = ".png,.jpg,.jpeg";
      setFileType("image");
    }
    if (selection === "video") {
      file.current.accept = ".mp4";
      setFileType("video");
    }

    file.current.style.display = "block";
  }

  function uploadFile(e) {
    setLoading(true);

    const curFile = e.target.files[0];

    if (curFile === null) return;

    const uploadRef = ref(storage, `${user.uid}/${props.fileNum}`);
    uploadBytes(uploadRef, curFile).then(() => {
      alert(`ARTWORK FILE #${props.fileNum} has successfully been uploaded`);
      updateURLS();
      updateDB();
      getFileTypeFromDB();
      setLoading(false);
    });
  }

  function updateDB() {
    const dbRef = doc(db, `artists/${user.id}/files/${props.fileNum}`);
    setDoc(
      dbRef,
      {
        url: list,
        name: fileName.current.value,
        type: fileType,
        id: `${user.id}-${props.fileNum}`,
        artist: user.name,
      },
      { merge: true }
    );
  }

  function updateURLS() {
    let listRef = ref(storage, user?.uid, props.fileNum);
    listAll(listRef).then((res) => {
      let item = res.items[props.fileNum - 1];
      if (!item) return;
      getDownloadURL(item).then((url) => {
        setList(url);
      });
    });
  }

  async function getFileTypeFromDB() {
    const dbRef = doc(db, `artists/${user.id}/files/${props.fileNum}`);
    const data = await getDoc(dbRef);
    setFileType(data.data()?.type);
    setAllData(data.data());
  }

  useEffect(() => {
    if (user) getFileTypeFromDB();
    updateURLS();
  }, [user]);

  //Styling for react-select

  return (
    <div className={classes.fileSelectionContain}>
      <h2>{`Artwork File # ${props.fileNum}`}</h2>
      <h3>Select format of file, name file, upload file</h3>
      <Select
        options={options}
        instanceId={"files"}
        onChange={handleSelectionChange}
      />
      <input
        ref={fileName}
        placeholder="Name (*enter name before choosing file*)"
        style={{ width: "100%" }}
      />
      {loading ? (
        <div> ~~ upload is in progress ! ~~ </div>
      ) : (
        <div>
          <input
            type="file"
            ref={file}
            style={{ display: "none" }}
            format={"none"}
            onChange={uploadFile}
          />
        </div>
      )}
      <h4>{allData?.name}</h4>
      {fileType === "video" ? (
        <video src={list} style={{ width: "8rem", height: "8rem" }} />
      ) : (
        <img src={list} style={{ width: "8rem", height: "8rem" }} />
      )}
    </div>
  );
}

export default FileSelection;
