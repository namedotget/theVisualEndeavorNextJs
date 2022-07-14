export function handleModalClick() {
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
  title.textContent = "title";
  const artist = document.createElement("h2");
  artist.className = "roomModalArtist";
  artist.textContent = "author";
  const des1 = document.createElement("p");
  des1.className = "roomModalDescription";
  des1.textContent = `< press 'e' to exit >`;
  const des2 = document.createElement("p");
  des2.className = "roomModalDescription";
  des2.textContent = `< 'i' for instagram >`;
  const des3 = document.createElement("p");
  des3.className = "roomModalDescription";
  des3.textContent = `< 't' for twitter >`;

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
  modal.appendChild(imgContain);
  //
  document.addEventListener("keypress", handleModalKeys);
}

export function handleModalKeys(e) {
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
}
