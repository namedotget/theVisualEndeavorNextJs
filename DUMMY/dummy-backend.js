// FILES WILL BE STORED IN FIREBASE STORAGE //
// DATA WILL BE STORED ON FIREBASE DATABASE //
// FUNCTIONS WILL BE ADJUSTED AND MOVED TO ./helpers/api-utils.js

const DUMMY_DATA = {
  artists: {
    a1: {
      name: "Colin",
      links: {
        twitter: "https://www.twitter.com",
        instagram: "https://www.instagram.com",
        website: "https://www.neekoart.netlify.app",
      },
      artwork: {
        images: [
          { aid: "a1-img0", src: "./files/images/a1-img0.png" },
          { aid: "a1-img1", src: "./files/images/a1-img1.png" },
          { aid: "a1-img2", src: "./files/images/a1-img2.png" },
          { aid: "a1-img3", src: "./files/images/a1-img3.png" },
          { aid: "a1-img4", src: "./files/images/a1-img4.png" },
        ],
        shaders: [
          {
            aid: "a1-sha0",
            fragment: ".files/images/a1-sha0-fragment.glsl.js",
            vertex: ".files/images/a1-sha0-vertex.glsl.js",
          },
        ],
        models: [],
        videos: [],
      },
    },
  },
};

export const getAllArtistData = function () {
  const ArtistData = [];

  for (const data of Object.entries(DUMMY_DATA.artists)) {
    console.log(data);
  }
};
