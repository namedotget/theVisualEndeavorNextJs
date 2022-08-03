import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { auth, db, storage } from "../firebase/clientApp";
import FileSelection from "./FileSelection";
import MusicSelection from "./MusicSelection";
import classes from "./styles/editor-module.module.scss";
function EditorModule(props) {
  const { userId } = props;

  const name = useRef();
  const twitter = useRef();
  const insta = useRef();
  const website = useRef();
  const bio = useRef();
  const profileImg = useRef();

  const [user, setUser] = useState();
  const usersCollectionRef = collection(db, "artists");

  function submitInfo() {
    const dbRef = doc(db, `artists/${user.id}`);
    setDoc(
      dbRef,
      {
        name: name.current.value,
        twitter: twitter.current.value,
        instagram: insta.current.value,
        website: website.current.value,
        bio: bio.current.value,
      },
      { merge: true }
    );
  }

  useEffect(() => {
    const getArtists = async () => {
      const data = await getDocs(usersCollectionRef);
      setUser(
        data.docs
          .map((doc) =>
            userId === doc.data().uid ? { ...doc.data(), id: doc.id } : null
          )
          .filter((user) => user !== null)[0]
      );
    };
    getArtists();
  }, []);

  return (
    <div>
      <div className={classes.info}>
        <input placeholder="name" defaultValue={user?.name} ref={name} />
        <input
          placeholder="twitter-link"
          defaultValue={user?.twitter}
          ref={twitter}
        />
        <input
          placeholder="instagram-link"
          defaultValue={user?.instagram}
          ref={insta}
        />
        <input
          placeholder="website-link"
          defaultValue={user?.website}
          ref={website}
        />
        <textarea defaultValue={"bio"} value={user?.bio} ref={bio} />
        <button className={classes.submitInfoBtn} onClick={submitInfo}>
          Submit Info
        </button>
      </div>
      <div className={classes.files}>
        <div></div>
        <p>(*files auto submit after selecting a file*)</p>
        <FileSelection user={user} fileNum={"1"} key="file1" />

        <FileSelection user={user} fileNum={"2"} key="file2" />

        <FileSelection user={user} fileNum={"3"} key="file3" />

        <FileSelection user={user} fileNum={"4"} key="file4" />
        <MusicSelection user={user} key="fileMusic" />
      </div>
      <div></div>
      <button onClick={() => auth.signOut()}>SIGN-OUT</button>
    </div>
  );
}

export default EditorModule;
