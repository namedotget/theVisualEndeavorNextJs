import classes from "./styles/room-preview.module.scss";

function RoomPreview(props) {
  return (
    <div className={classes.container}>
      <button
        className={classes.btn}
        onClick={props.onClick}
        style={{ fontFamily: "pixel" }}
      >
        ENTER ROOM
      </button>
      <img className={classes.img} src="./purplefog.png" />
    </div>
  );
}

export default RoomPreview;
