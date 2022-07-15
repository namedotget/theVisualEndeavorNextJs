export function handleModalClick(e, artwork) {
  if (e.button === 2) return;
  if (
    document.querySelector(".roomModal") ||
    document.querySelector(".roomStartModal")
  )
    return;

  document.querySelector(".crosshair").style.opacity = 0;
  //Create Modal///
  const modal = document.createElement("div");
  modal.className = "roomModal";
  document.body.appendChild(modal);

  const title = document.createElement("h1");
  title.className = "roomModalTitle";
  title.textContent = artwork.name;
  const artist = document.createElement("h2");
  artist.className = "roomModalArtist";
  artist.textContent = artwork.artist;
  const des1 = document.createElement("p");
  des1.className = "roomModalDescription";
  des1.textContent = `< press 'E' to exit >`;
  const des2 = document.createElement("p");
  des2.className = "roomModalDescription";
  des2.textContent = `< 'I' for instagram >`;
  const des3 = document.createElement("p");
  des3.className = "roomModalDescription";
  des3.textContent = `<   'T' for twitter   >`;

  const imgContain = document.createElement("div");
  imgContain.className = "roomModalImgContain";
  const insta = document.createElement("img");
  insta.className = "roomModalImg";
  insta.src = `../instagram-icon.png`;
  const twitter = document.createElement("img");
  twitter.className = "roomModalImg";
  twitter.src = `../twitter-icon.png`;
  imgContain.appendChild(insta);
  imgContain.appendChild(twitter);

  modal.appendChild(title);
  modal.appendChild(artist);
  modal.appendChild(des1);
  modal.appendChild(des2);
  modal.appendChild(des3);
  if (artwork.link) {
    const des4 = document.createElement("p");
    des4.className = "roomModalDescription";
    des4.textContent = " < 'L' for custom link >";
    const linkImg = document.createElement("img");
    linkImg.className = "roomModalImg";
    linkImg.src = `../icons/${artwork.artist}-icon.png`;

    imgContain.appendChild(linkImg);
    modal.appendChild(des4);
  }
  modal.appendChild(imgContain);

  function handleModalKeys(e) {
    const modal = document.querySelector(".roomModal");
    //Exit//
    if (e.key === "e") {
      //Fade-out modal
      modal.classList.toggle("fadeOut");

      //Remove modal, reset crosshair after fadeOut, remove fadeOut
      setTimeout(() => {
        modal?.remove();
        document.querySelector(".crosshair").style.opacity = 1;
        document.removeEventListener("keypress", handleModalKeys);
        modal.classList.toggle("fadeOut");
      }, 500);
    }

    if (e.key === "i") {
      window.open("https://www.instagram.com");
    }

    if (e.key === "t") {
      window.open("https://www.twitter.com");
    }

    if (e.key === "l") {
      window.open(artwork.link);
    }
  }
  //
  document.addEventListener("keypress", handleModalKeys);
}
