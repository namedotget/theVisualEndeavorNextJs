// FILES WILL BE STORED IN FIREBASE STORAGE //
// DATA WILL BE STORED ON FIREBASE DATABASE //
// FUNCTIONS WILL BE ADJUSTED AND MOVED TO ./helpers/api-utils.js

const DUMMY_DATA = {
  artists: {
    a1: {
      name: "Colin",
      bio: "I like to make shaders with GLSL ! ",
      profileImage: "/room-preview.jpg",
      centerPiece: "../files/models/nsx/scene.gltf",
      links: {
        twitter: "https://twitter.com/namedotget",
        instagram: "https://www.instagram.com/ccolinfosterr/",
        website: "https://www.neekoart.netlify.app",
      },
      artwork: {
        images: [
          {
            aid: "a1-img0",
            src: "../files/images/a1-img0.png",
            name: "name-of-img",
            artist: "Colin",
          },
          {
            aid: "a1-img1",
            src: "../files/images/a1-img1.jpg",
            name: "name-of-img",
            artist: "Colin",
          },
          {
            aid: "a1-img2",
            src: "../files/images/a1-img2.jpg",
            name: "name-of-img",
            artist: "Colin",
          },
          {
            aid: "a1-img3",
            src: "../files/images/a1-img3.jpg",
            name: "name-of-img",
            artist: "Colin",
          },
          {
            aid: "a1-img4",
            src: "../files/images/a1-img4.png",
            name: "name-of-img",
            artist: "Colin",
          },
        ],
        shaders: [
          {
            aid: "a1-sha0",
            name: "An Ode to GLSL",
            fragment: "../files/shaders/a1-sha0-fragment.glsl.js",
            vertex: "../files/shaders/a1-sha0-vertex.glsl.js",
            artist: "Colin",
          },
          {
            aid: "a1-sha1",
            name: "Space on a Plane",
            fragment: "../files/shaders/a1-sha1-fragment.glsl.js",
            vertex: "../files/shaders/a1-sha1-vertex.glsl.js",
            artist: "Colin",
          },
        ],
        models: [],
        videos: [
          {
            aid: "a1-vid0",
            name: "Sax-Time",
            src: "../files/warp.mp4",
            artist: "Colin",
            link: "https://www.instagram.com/tv/CezxufIDLVgzaK-JZ1v9qHHb2WXWrLB1Ioeg-g0/",
          },
        ],
      },
    },
    a2: {
      name: "Neeko Art",
      bio: "I like to make models in blender",
      profileImage: "/room-preview.jpg",
      links: {
        twitter: "https://twitter.com/neeko_artist",
        instagram: "https://www.instagram.com/art.neeko/",
        website: "https://www.neekoart.netlify.app",
      },
      artwork: {
        images: [
          {
            aid: "a2-img0",
            src: "../files/images/a1-img0.png",
            name: "name-of-img",
          },
          {
            aid: "a2-img1",
            src: "../files/images/a1-img1.jpg",
            name: "name-of-img",
          },
          {
            aid: "a2-img2",
            src: "../files/images/a1-img2.jpg",
            name: "name-of-img",
          },
          {
            aid: "a2-img3",
            src: "../files/images/a1-img3.jpg",
            name: "name-of-img",
          },
          {
            aid: "a2-img4",
            src: "../files/images/a1-img4.png",
            name: "name-of-img",
          },
          {
            aid: "a2-img5",
            src: "../files/images/test.jpg",
            name: "name-of-img",
          },
          {
            aid: "a2-img6",
            src: "../files/images/test1.jpeg",
            name: "name-of-img",
          },
        ],
        shaders: [],
        models: [],
        videos: [
          {
            aid: "a2-vid0",
            name: "Spase",
            src: "../files/video.mp4",
            artist: "Neeko-Art",
            link: "",
          },
        ],
      },
    },
  },
};

export const getAllArtistData = function () {
  const allArtists = [];

  for (const data of Object.entries(DUMMY_DATA.artists)) {
    allArtists.push({
      id: data[0],
      ...data[1],
    });
  }
  return allArtists;
};

export const getAllImages = function () {
  const allImages = [];
  getAllArtistData().map((artist) =>
    artist.artwork.images.map((img) => allImages.push(img))
  );

  return allImages;
};

export const getArtistById = function (id) {
  return getAllArtistData().filter((artist) => artist.id === id);
};

export const getArtworkById = function (aid) {
  const artistId = aid.slice(0, 2);

  const [artist] = getArtistById(artistId);
  const [img] = artist.artwork.images.filter((img) => img.aid === aid);
  return img;
};
