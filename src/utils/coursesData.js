import pcImage from "../images/pc-image.jpg";
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "../firebaseConfig";

export const CoursesDummyData = [
  {
    id: "1",
    name: "course 1",
    image: pcImage,
    duration: "90 min",
    modules: [
      {
        id: "m1",
        courseId: "1",
        name: "Welcome!",
        duration: "14:55",
      },
      {
        id: "m2",
        courseId: "1",
        name: "What is Programming",
        duration: "14:55",
      },
      {
        id: "m3",
        courseId: "1",
        name: "Welcome!",
        duration: "14:55",
      },
      {
        id: "m4",
        courseId: "1",
        name: "Welcome!",
        duration: "14:55",
      },
    ],
  },
  {
    id: "2",
    name: "course 2",
    image: pcImage,
    duration: "44 min",
    modules: [
      {
        id: "m1",
        courseId: "2",
        name: "Welcome!",
        duration: "14:55",
      },
      {
        id: "m2",
        courseId: "2",
        name: "What is Programming",
        duration: "14:55",
      },
      {
        id: "m3",
        courseId: "2",
        name: "Welcome!",
        duration: "14:55",
      },
      {
        id: "m4",
        courseId: "2",
        name: "Welcome!",
        duration: "14:55",
      },
    ],
  },

  {
    id: "3",
    name: "course 3",
    image: pcImage,
    duration: "102 min",
    modules: [
      {
        id: "m1",
        courseId: "3",
        name: "Welcome!",
        duration: "14:55",
      },
      {
        id: "m2",
        courseId: "3",
        name: "What is Programming",
        duration: "14:55",
      },
      {
        id: "m3",
        courseId: "3",
        name: "Welcome!",
        duration: "14:55",
      },
      {
        id: "m4",
        courseId: "3",
        name: "Welcome!",
        duration: "14:55",
      },
    ],
  },

  {
    id: "4",
    name: "course 4",
    image: pcImage,
    duration: "90 min",
    modules: [
      {
        id: "m1",
        courseId: "4",
        name: "Welcome!",
        duration: "14:55",
      },
      {
        id: "m2",
        courseId: "4",
        name: "What is Programming",
        duration: "14:55",
      },
      {
        id: "m3",
        courseId: "4",
        name: "Welcome!",
        duration: "14:55",
      },
      {
        id: "m4",
        courseId: "4",
        name: "Welcome!",
        duration: "14:55",
      },
    ],
  },
];

// CoursesDummyData.map(async (item) => {
//   try {
//     await addDoc(collection(db, "courses"), {
//       id: item.id,
//       name: item.name,
//       duration: item.duration,
//       modules: item.modules,
//     });
//   } catch (error) {
//     console.error(error);
//   }
// });
