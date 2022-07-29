import { useRef } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/clientApp";

import classes from "./styles/login.module.scss";

function Login() {
  const user = useRef();
  const pass = useRef();

  function signIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, user.current.value, pass.current.value)
      .then((user) => {
        console.log(user);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={classes.loginContain}>
      <input placeholder="username" ref={user} />
      <input placeholder="password" ref={pass} />
      <button onClick={signIn}>LOGIN</button>
    </div>
  );
}

export default Login;
