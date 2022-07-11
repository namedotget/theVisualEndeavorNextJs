import Link from "next/link";
import BackgroundCanvas from "./BackgroundCanvas";
import LogoCanvas from "./LogoCanvas";
import classes from "./main-header.module.css";
function MainHeader() {
  return (
    <div className={classes.contain}>
      <header className={classes.header}>
        <nav className={classes.navigation}>
          <Link href="/gallery">GALLERY</Link>

          <Link href="/artists">ARTISTS</Link>

          <Link href="/about">ABOUT</Link>
        </nav>
      </header>
    </div>
  );
}

export default MainHeader;
