import { useRouter } from "next/router";
import { Fragment } from "react";
import BackgroundCanvas from "./BackgroundCanvas";
import LogoCanvas from "./LogoCanvas";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

function Layout(props) {
  const router = useRouter();

  return (
    <Fragment>
      <LogoCanvas />
      <BackgroundCanvas />
      <MainHeader />
      <main>{props.children}</main>
      <MainFooter />
    </Fragment>
  );
}

//USE FRAGMENT TO IMPORT REACT COMPONENTS INTO NEXTJS//

export default Layout;
