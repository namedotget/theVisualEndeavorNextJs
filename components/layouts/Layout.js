import { Fragment } from "react";
import BackgroundCanvas from "./BackgroundCanvas";
import LogoCanvas from "./LogoCanvas";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
function DisableRender() {
  useFrame(() => null, 500);
  console.log("test");
}

function Layout(props) {
  const { ref, inView } = useInView();
  console.log(props.children);
  return (
    <>
      <LogoCanvas />
      <BackgroundCanvas>{!inView && <DisableRender />}</BackgroundCanvas>
      <MainHeader />
      <main>{props.children}</main>
      <MainFooter />
    </>
  );
}

//USE FRAGMENT TO IMPORT REACT COMPONENTS INTO NEXTJS//

export default Layout;
