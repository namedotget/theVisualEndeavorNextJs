import classes from "./styles/room-preview.module.css";

function RoomPreview(props) {
  return (
    <div className={classes.container}>
      <button className={classes.btn} onClick={props.onClick}>
        <img className={classes.icon} src="./room-preview-icon.png" />
      </button>
      <img className={classes.img} src="./room-preview.jpg" />
    </div>
  );
}

export default RoomPreview;
