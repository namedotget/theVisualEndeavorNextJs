import { Fragment } from "react";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

function Layout(props) {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      <MainFooter />
    </Fragment>
  );
}

//USE FRAGMENT TO IMPORT REACT COMPONENTS INTO NEXTJS//

export default Layout;
