import Link from "next/link";
import classes from "./main-footer.module.css";
function MainFooter() {
  return (
    <footer className={classes.footer}>
      <div className={classes.logo}>
        <Link href="/">theVisualEndeavor</Link>
      </div>
      <nav className={classes.links}>
        <Link href="https://twitter.com/namedotget">TWITTER</Link>

        <Link href="https://www.instagram.com/ccolinfosterr/">INSTAGRAM</Link>

        <h3> Email : colin.foster4723@gmail.com </h3>
      </nav>
    </footer>
  );
}

export default MainFooter;
