import classes from "./styles/loading-screen.module.css";

function LoadingScreen(props) {
  return (
    <div className={props.loading ? classes.body_loading : classes.none}>
      <h1>...LOADING....</h1>
      <div className={classes.lds_ellipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default LoadingScreen;
