import { Fragment } from "react";
import BackgroundCanvas from "./BackgroundCanvas";
import LogoCanvas from "./LogoCanvas";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

function Layout(props) {
  return (
    <>
      <LogoCanvas />
      <MainHeader />
      <main>{props.children}</main>
      <MainFooter />
    </>
  );
}

//USE FRAGMENT TO IMPORT REACT COMPONENTS INTO NEXTJS//

export default Layout;
