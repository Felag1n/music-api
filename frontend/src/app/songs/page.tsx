// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { usePlayerStore } from "../store/playerStore";


// interface Song {
//   songUrl: string;
//   name: string;
//   textSong: string | null;
//   cover: string;
// }

// export function SongPage() {
//   const params = useParams<{ id: string }>(); 
//   const id = Number(params.id); 
//   const setSongAtStore = usePlayerStore((state) => state.setSong);

//   const [song, setSong] = useState<Song | null>(null);
//   const [notFound, setNotFound] = useState<boolean>(false);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:1337/api/songs/${id}?populate=*`)
//       .then((r) => r.data)
//       .then((r) => {
//         if (!r.data) {
//           setNotFound(true);
//           return null;
//         }
//         const songData: Song = {
//           songUrl: "http://localhost:1337" + r.data.attributes.Song.data.attributes.url,
//           name: r.data.attributes.Name,
//           textSong: r.data.attributes.TextSong || null,
//           cover: "http://localhost:1337" + r.data.attributes.Cover.data[0].attributes.url,
//         };
//         return songData;
//       })
//       .then(setSong)
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setNotFound(true);
//       });
//   }, [id]);

// //   if (notFound) {
// //     return <PageNotFound />;
// //   }

//   if (!song) {
//     return <div>Loading...</div>;
//   }

// //   return (
// //     // <div>
// //     //   <h1 style={{ color: "rgb(80, 10, 67)" }}>{song.name}</h1>
// //     //   <div className="group-genre">
// //     //     <div className="box genre">
// //     //       <img className="image" src={song.cover} alt={song.name} />
// //     //       <div className="play-button">
// //     //         <PlayButton
// //     //           onClick={(e) => {
// //     //             e.preventDefault();
// //     //             setSongAtStore(song.songUrl);
// //     //           }}
// //     //         />
// //     //       </div>
// //     //     </div>
// //     //   </div>
// //     //   <div className="song-name">{song.name}</div>
// //     //   {song.textSong && (
// //     //     <div className="text-container genre-content">
// //     //       <Markdown>{song.textSong}</Markdown>
// //     //     </div>
// //     //   )}
// //     // </div>
// //   );
// // }

