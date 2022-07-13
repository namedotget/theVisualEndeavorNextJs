import React from "react";
import { useBox } from "@react-three/cannon";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";

// Constants
export const ArtImage = (props) => {
  const pos = props.position;
  //Physics//
  const [cubeRef] = useBox(() => ({
    mass: 1,
    args: [5.5, 3.5, 0.75],
    material: {
      friction: 1,
      restitution: 0,
    },
    ...props,
  }));

  function handleKeyModal(e) {
    //Exit//
    if (e.key === "e") {
      console.log(e);
      document.querySelector(".roomModal")?.remove();
      document.querySelector(".crosshair").style.opacity = 1;
      document.removeEventListener("keypress", handleKeyModal);
    }

    if (e.key === "i") {
      window.open("https://www.instagram.com");
    }

    if (e.key === "t") {
      window.open("https://www.twitter.com");
    }
  }

  function handleClick() {
    //Check if modal is already created//
    if (document.querySelector(".roomModal")) return;

    document.querySelector(".crosshair").style.opacity = 0;
    //Create Modal///
    const modal = document.createElement("div");
    modal.className = "roomModal";
    document.body.appendChild(modal);

    const title = document.createElement("h2");
    title.className = "roomModalText";
    title.textContent = "title";
    const author = document.createElement("h3");
    author.className = "roomModalText";
    author.textContent = "author";
    const description = document.createElement("p");
    description.className = "roomModalDescription";
    description.textContent = `< press 'e' to exit > \n < press 'i' for instagram > \n < press 't' for twitter >`;

    const insta = document.createElement("img");
    insta.className = "roomModalLink";
    insta.src = `../instagram-icon.png`;
    const twitter = document.createElement("img");
    twitter.className = "roomModalLink";
    twitter.src = `../twitter-icon.png`;

    modal.appendChild(title);
    modal.appendChild(author);
    modal.appendChild(description);
    modal.appendChild(insta);
    modal.appendChild(twitter);
    //
    document.addEventListener("keypress", handleKeyModal);
  }

  // const picture = require("../public/room-preview.jpg");
  //Load Images//
  // const img = useLoader(TextureLoader, picture);
  const map = useLoader(TextureLoader, props.image);
  return (
    <group>
      <mesh
        ref={cubeRef}
        castShadow={true}
        layers={props.layers}
        onClick={handleClick}
      >
        <boxBufferGeometry args={[5, 3, 0.5]} />
        <meshLambertMaterial castShadow map={map} fog={true} />
      </mesh>
    </group>
  );
};
