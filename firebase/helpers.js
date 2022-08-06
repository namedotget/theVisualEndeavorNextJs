import { async } from "@firebase/util";
import {
  arrayRemove,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "./clientApp";

export async function getArtistData(id) {
  const dbRef = doc(db, `artists/${id}`);
  const data = await getDoc(dbRef);
  return data.data();
}

export async function getArtistFiles(id) {
  const dbRef = collection(db, `artists/${id}/files`);
  const data = await getDocs(dbRef);
  return data.docs.map((doc) => doc.data());
}

export async function getAllFiles() {
  //get all IDs
  const dbRef = collection(db, `artists`);
  const data = await getDocs(dbRef);
  const allIDs = data.docs.map((doc) => doc.data().id);

  //get all files for each user

  return allIDs.map(async (id) => {
    return await getArtistFiles(id);
  });
}

export async function getAllData() {
  const dbRef = collection(db, `artists`);
  const data = await getDocs(dbRef);
  return data.docs.map((doc) => doc.data());
}

export async function getAllFileIDs() {
  let arr = [];
  await getAllFiles().then((res) =>
    res.forEach((user) => {
      user.then((file) => {
        file.forEach((data) => arr.push(data.id));
      });
    })
  );
  return arr;
}

export async function getFileById(id) {
  const artistId = id.slice(0, 2);
  const artworkId = id.slice(-1);

  const dbRef = doc(db, `artists/${artistId}/files/${artworkId}`);
  const data = await getDoc(dbRef);
  return data.data();
}

export const DATA = {
  artists: {
    info: {
      name: "",
      bio: "",
      id: "",
      instagram: "",
      twitter: "",
      uid: "",
      website: "",
    },
    files: {},
  },
};

function initDATA() {}
