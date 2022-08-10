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
