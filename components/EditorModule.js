import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { auth, db } from "../firebase/clientApp";
import FileSelection from "./FileSelection";
import classes from "./styles/editor-module.module.scss";
function EditorModule(props) {
  const { userId } = props;

  const [user, setUser] = useState();
  const usersCollectionRef = collection(db, "artists");

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
        <input placeholder="name" defaultValue={user?.name} />
        <input placeholder="twitter-link" defaultValue={user?.twitter} />
        <input placeholder="instagram-link" defaultValue={user?.instagram} />
        <input placeholder="website-link" defaultValue={user?.website} />
        <textarea defaultValue={"bio"} value={user?.bio} />
        <h2>Choose a Profile Image</h2>
        <input type="file" accept=".png,.jpg,.jpeg" />
      </div>
      <div className={classes.files}>
        <h2>Artwork File #1</h2>
        <FileSelection user={user} fileNum={"1"} />
        <h2>Artwork File #2</h2>
        <FileSelection user={user} fileNum={"2"} />
        <h2>Artwork File #3</h2>
        <FileSelection user={user} fileNum={"3"} />
        <h2>Artwork File #4</h2>
        <FileSelection user={user} fileNum={"4"} />
        <h2>Music File </h2>
        <input type="file" accept=".mp3" />
      </div>
      <button>SUBMIT</button>
      <div></div>
      <button onClick={() => auth.signOut()}>SIGN-OUT</button>
    </div>
  );
}

export default EditorModule;
