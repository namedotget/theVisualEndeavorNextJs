function exitStartModal(e) {
  if (e.key === "e") {
    console.log(e);
    document.querySelector(".roomStartModal")?.remove();
    document.querySelector(".crosshair").style.opacity = 1;
    document.removeEventListener("keypress", exitStartModal);
  }
}

export function StartModal() {
  document.querySelector(".crosshair").style.opacity = 0;

  const modal = document.createElement("div");
  modal.className = "roomStartModal";
  document.body.appendChild(modal);

  const title = document.createElement("h1");
  title.className = "roomStartTitle";
  title.textContent = "Welcome to the Visual Endeavor !";
  const des1 = document.createElement("h3");
  des1.className = "ro1";
  des1.textContent = `< press 'q' to quit >`;
  const des2 = document.createElement("h3");
  des2.className = "roomStartDescription";
  des2.textContent = `< press 'e' to exit pop-up >`;
  const des3 = document.createElement("h3");
  des3.className = "roomStartDescription";
  des3.textContent = `< click artwork to open pop-up >`;
  modal.appendChild(title);
  modal.appendChild(des1);
  modal.appendChild(des2);
  modal.appendChild(des3);

  document.addEventListener("keypress", exitStartModal);
}
