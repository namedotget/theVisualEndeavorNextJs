import classes from "./logo.module.css";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import Link from "next/link";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Vector3 } from "three";
import { useEffect } from "react";
import Image from "next/image";

function Logo(props) {
  return (
    <>
      <div className={classes.contain}>
        <Link href="/">
          <Image
            className={classes.logo}
            src={"/icons/tve-icon.jpg"}
            alt="tve"
            width={250}
            height={250}
          />
        </Link>
      </div>
    </>
  );
}

export default Logo;
