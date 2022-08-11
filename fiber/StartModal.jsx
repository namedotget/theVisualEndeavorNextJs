import { createElement } from "react";

function closeStartModal() {
  const modal = document.querySelector(".roomStartModal");
  modal.classList.toggle("fadeOut");
  //Remove modal, reset crosshair after fadeOut, remove fadeOut
  setTimeout(() => {
    modal?.remove();
    document.querySelector(".crosshair").style.opacity = 0.5;
    document.removeEventListener("keypress", exitStartModal);
    modal.classList.toggle("fadeOut");
  }, 500);
}

function exitStartModal(e) {
  if (e.key === "e") {
    closeStartModal();
  }
}

export function StartModal() {
  document.addEventListener("keypress", exitStartModal);
  document.querySelector(".crosshair").style.opacity = 0;

  const modal = document.createElement("div");
  modal.className = "roomStartModal";
  document.body.appendChild(modal);

  const title = document.createElement("img");
  title.className = "roomStartTitle";
  title.src = "../icons/tve-icon.jpg";
  const des1 = document.createElement("h3");
  des1.className = "roomStartDescription";
  des1.textContent = `< 'q' to quit >`;
  const des2 = document.createElement("h3");
  des2.className = "roomStartDescription";
  des2.textContent = `< 'e' to close pop-up >`;
  const des3 = document.createElement("h3");
  des3.className = "roomStartDescription";
  des3.textContent = `< left click artwork to open pop-up >`;
  const des4 = document.createElement("h3");
  des4.className = "roomStartDescription";
  des4.textContent = `< right click to pew-pew >`;

  modal.appendChild(title);
  modal.appendChild(des1);
  modal.appendChild(des2);
  modal.appendChild(des3);
  modal.appendChild(des4);
}
