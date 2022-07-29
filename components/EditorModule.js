import { auth } from "../firebase/clientApp";
import FileSelection from "./FileSelection";
import classes from "./styles/editor-module.module.scss";
function EditorModule(props) {
  const { userId } = props;

  return (
    <div>
      <div className={classes.info}>
        <input placeholder="name" />
        <input placeholder="twitter-link" />
        <input placeholder="instagram-link" />
        <input placeholder="website-link" />
        <textarea defaultValue={"bio"} />
        <h2>Choose a Profile Image</h2>
        <input type="file" accept=".png,.jpg,.jpeg" />
      </div>
      <div className={classes.files}>
        <h2>Artwork File #1</h2>
        <FileSelection />
        <h2>Artwork File #2</h2>
        <FileSelection />
        <h2>Artwork File #3</h2>
        <FileSelection />
        <h2>Artwork File #4</h2>
        <FileSelection />
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
