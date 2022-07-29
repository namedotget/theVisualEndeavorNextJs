import classes from "../styles/editor.module.scss";
import Select from "react-select";
import { useRef, useEffect, useState } from "react";
import firebase from "../firebase/clientApp";
import { auth } from "../firebase/clientApp";
import Login from "../components/login";
import EditorModule from "../components/EditorModule";
function Editor() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((userAuth) => {
      const user = {
        uid: userAuth?.uid,
        email: userAuth?.email,
      };
      console.log(user);

      if (userAuth) {
        console.log(userAuth);
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsub;
  }, []);


  return <div className="pgContain">{user ? <EditorModule userId={user.uid}/> : <Login />}</div>;
}

export default Editor;
