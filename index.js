/*
Native Array Methods pt.2 continues with the same dataset: songs. All required functions and array methods (forEach, map, find, some/every, sort) are combined into a single file, each addressing a distinct problem.
*/


const { arrayBuffer } = require("stream/consumers");
const exampleSongData = require("./data/songs");
const { get } = require("http");
// Do not change the line above.


// #1
/**
 * Returns the titles of songs sorted alphabetically.
 * @param {Object[]} songs - An array of songs.
 * @returns {string[]} Sorted song titles.
 */
function getSortedTitles(songs) {
  return songs.map(x => x.title).sort();
}

// #2
/**
 * Returns the titles of all songs from a specified album.
 * @param {Object[]} songs - An array of songs.
 * @param {string} albumName - Name of the album.
 * @returns {string[]} An array of song titles.
 */
function getSongsFromAlbum(songs, albumName) {

   return songs.filter(song => song.album === albumName).map(song => song.title);
}

// #3 
/**
 * Categorizes and counts songs based on their runtime.
 * @param {Object[]} songs - An array of songs.
 * @returns {Object} An object with counts of short, medium, and long songs.
 */
function categorizeSongsByRuntime(songs) {
  let runtimeCounts = {
    shortSongs: 0,
    mediumSongs: 0,
    longSongs: 0,
  }

  for (let i = 0; i < songs.length; i++)
      if (songs[i].runtimeInSeconds < 180)
          runtimeCounts.shortSongs++;
        else if (songs[i].runtimeInSeconds >= 180 && songs[i].runtimeInSeconds <= 300)
            runtimeCounts.mediumSongs++;
          else if(songs[i].runtimeInSeconds > 300)
            runtimeCounts.longSongs++;
          
            return runtimeCounts;

}

// #4
/**
 * Finds the album with the highest number of songs.
 * @param {Object[]} songs - An array of songs.
 * @returns {string} The name of the album with the most songs.
 */
function findAlbumWithMostSongs(songs) {


const albumCounts = songs.reduce((accumulator, currentSong) => {

  accumulator[currentSong.album] = (accumulator[currentSong.album] || 0) + 1; //creates a property and/or increments it's value
               
                    return accumulator;}, {},);

                    // iterates through albumCounts
                        let greatest = 0;
                        let greatestAlbum = '';
                    for (let album in albumCounts){
                          if (albumCounts[album] > greatest){
                           greatest = albumCounts[album];
                           greatestAlbum = album;
                          }
                        }

      return greatestAlbum;
}

// #5
/**
 * Returns details of the first song in a specific album.
 * @param {Object[]} songs - An array of songs.
 * @param {string} albumName - Name of the album.
 * @returns {Object|null} First song object in the album or null.
 */
function getFirstSongInAlbum(songs, albumName) {

  return songs.filter(song => song.album === albumName).find(song => song.title);
}

// #6
/**
 * Checks if there is at least one song longer than a specified runtime.
 * @param {Object[]} songs - An array of songs.
 * @param {number} runtime - The runtime to check against in seconds.
 * @returns {boolean} True if there is at least one song longer than the runtime.
 */
function isThereLongSong(songs, runtime) {
  return songs.filter(song => song.runtimeInSeconds > runtime).length >= 1 ? true : false;
}

// #7
/**
 * Transforms song data to show title and runtime in minutes.
 * @param {Object[]} songs - An array of songs.
 * @returns {Object[]} Array of song objects with runtime in minutes.
 */
function getSongsWithDurationInMinutes(songs) {

      songs.forEach((song,i) => 
        
        song.durationInMinutes = song.runtimeInSeconds/60,
        
      );

  return songs;
}

// #8
/**
 * Returns the album names in reverse alphabetical order.
 * @param {Object[]} songs - An array of songs.
 * @returns {string[]} Array of album names in reverse alphabetical order.
 */
function getAlbumsInReverseOrder(songs) {

  let reverseByAlbum = songs.sort((a,b) => {

        if (a.album < b.album)
            return 1;
        if (a.album > b.album)
            return -1;
        else
            return 0;
  });

  let albumTitles = [];

      for (let i = 0; i < reverseByAlbum.length; i++){
        if (albumTitles.includes(reverseByAlbum[i].album))
               continue;
           albumTitles.push(reverseByAlbum[i].album)
      }

      return albumTitles;
}

// #9
/**
 * Returns a list of song titles that contain a specific word.
 * @param {Object[]} songs - An array of songs.
 * @param {string} word - The word to search for in song titles.
 * @returns {string[]} An array of song titles containing the word.
 */
function songsWithWord(songs, word) {

  let songTitles = [];

  for (let i = 0; i < songs.length; i++){
    if (songs[i].title.includes(word))
         songTitles.push(songs[i].title);
  }
      return songTitles;
}

// #10
/**
 * Returns the total runtime of songs by a specific artist.
 * @param {Object[]} songs - An array of songs.
 * @param {string} artistName - Name of the artist.
 * @returns {number} Total runtime in seconds.
 */
function getTotalRuntimeOfArtist(songs, artistName) {

 return songs.filter((x, i, arr) => arr[i].artist == [artistName])
             .reduce((accumulator, currentSong) => {

        accumulator[currentSong.artist] = (accumulator[currentSong.artist] || 0) + currentSong.runtimeInSeconds;
        
        return accumulator;}, {},
        
        )[artistName];

}

// Problem #11
/**
 * Prints artists who have more than one song in the list.
 * @param {Object[]} songs - An array of songs.
 */
function printArtistsWithMultipleSongs(songs) {
  let result = songs.filter((x, i, arr) => arr[i].artist)
  .reduce((accumulator, currentSong) => {

accumulator[currentSong.artist] = (accumulator[currentSong.artist] || 0) + 1;
       
return accumulator;}, {},

);

for (let artist in result){
      if (result[artist] > 1)
      console.log(artist);
}
      return;
}

// Problem #12
/**
 * Logs the longest song title.
 * @param {Object[]} songs - An array of songs.
 */
function printLongestSongTitle(songs) {
  console.log(songs.sort((a,b) => {

    if (a.title.length < b.title.length)
        return 1;
    if (a.title.length > b.title.length)
        return -1;
    else
        return 0;
})[0].title);
}

// Problem #13
/**
 * Sorts songs by artist name, then by song title alphabetically.
 * @param {Object[]} songs - An array of songs.
 * @returns {Object[]} Sorted array of songs.
 */
function sortSongsByArtistAndTitle(songs) {
   
  let songsByArtist = songs.sort((a,b) => {a.title.localeCompare(b.title)});
    

  let artistNames = [];
for (let i = 0; i < songs.length; i++){
      if(!artistNames.includes(songs[i].artist))
          artistNames.push(songs[i].artist);

          artistNames = artistNames.sort((a,b) => a.localeCompare(b));
}

let songsByArtistAndTitle = [];
  
      for(let i = 0; i < artistNames.length; i++)
          for(let j = 0; j < songsByArtist.length; j++)
              if(artistNames[i] == songsByArtist[j].artist)
                    songsByArtistAndTitle.push(songsByArtist[j]);

return songsByArtistAndTitle;                    

//   return songs.slice().sort((a, b) => {
//   return a.artist.localeCompare(b.artist) || a.title.localeCompare(b.title);
// });

}

// Problem #14
/**
 * Lists albums along with their total runtime.
 * @param {Object[]} songs - An array of songs.
 * @returns {Object} An object mapping each album to its total runtime.
 */
function listAlbumTotalRuntimes(songs) {

  return songs.reduce((accumulator, currentSong) => {

    accumulator[currentSong.album] = (accumulator[currentSong.album] || 0) + currentSong.runtimeInSeconds;

    return accumulator;
  }, {}, );
}

// Problem #15
/**
 * Finds the first song with a title starting with a specific letter.
 * @param {Object[]} songs - An array of songs.
 * @param {string} letter - The letter to search for.
 * @returns {Object|null} The first song object that matches the criterion or null.
 */
function findFirstSongStartingWith(songs, letter) {
  
  return songs.filter(x => x.title[0] == letter)[0] || null;

}

// Problem #16
/**
 * Maps each artist to an array of their song titles.
 * @param {Object[]} songs - An array of songs.
 * @returns {Object} An object mapping each artist to an array of their song titles.
 */

function mapArtistsToSongs(songs) {
  let objArtistSongTitles = {};
  for (let i = 0; i < songs.length; i++){
     objArtistSongTitles[songs[i].artist] = [];
     for(let j=0; j < songs.length; j++){
      if(songs[i].artist == songs[j].artist)
          objArtistSongTitles[songs[i].artist].push(songs[j].title);
     };
  };
      return objArtistSongTitles;
    }
    
// Problem #17
/**
 * Finds the album with the longest average song runtime.
 * @param {Object[]} songs - An array of songs.
 * @returns {string} The name of the album with the longest average song runtime.
 */
function findAlbumWithLongestAverageRuntime(songs) {
  
  let albumMap = {};

      songs.map((song) => {
        if (albumMap.hasOwnProperty(song.album)){
          albumMap[song.album].push(song.runtimeInSeconds)
      }
        else {
          albumMap[song.album] = [];
          albumMap[song.album].push(song.runtimeInSeconds);
       }

       
      });

      let longest = '';
      
      for (let album in albumMap){
        let numberOfSongsInAlbum = albumMap[album].length;
          
          //makes the first index of the property array the total runtime
        for(let i = 0; albumMap[album].length > 1; i++)
              albumMap[album][0] += albumMap[album].pop();

          // replaces the total runtime with the avarage 
          albumMap[album].push(numberOfSongsInAlbum);                          //makes the last element the number of songs in the album
          albumMap[album][0] = albumMap[album][0]/albumMap[album].pop(); // pops the array and uses that number to calculate the average

        }
          longest = 'Bi-To Te-Pu';
        for (let album in albumMap){
          if (albumMap[album][0] >= albumMap[longest][0])
              longest = album;
          else
            continue;
        }
        return longest;
      }

// Problem #18
/**
 * Logs song titles sorted by their runtime.
 * @param {Object[]} songs - An array of songs.
 */
function printSongsSortedByRuntime(songs) {

    let result = songs.map(song => song)
                      .sort((a,b) => a.runtimeInSeconds-b.runtimeInSeconds);
                
                 result.forEach(song => console.log(song.title));
}

// Problem #19
/**
 * Prints a summary of each album, including its name, total runtime, and number of songs.
 * @param {Object[]} songs - An array of songs.
 */
function printAlbumSummaries(songs) {
    let albumSummaries = {};

    songs.forEach((song) => {
      if (!albumSummaries[song.album]) {
        albumSummaries[song.album] = {
          songCount: 1,
          totalRuntime: song.runtimeInSeconds,
        };
      } else {
        albumSummaries[song.album].songCount++;
        albumSummaries[song.album].totalRuntime += song.runtimeInSeconds;
      }
    });

    for (const summary in albumSummaries) {
      console.log(
        `${summary}: ${albumSummaries[summary].songCount} songs, Total Runtime: ${albumSummaries[summary].totalRuntime} seconds`
      );
    }
  }

// Problem #20
/**
 * Finds the artist with the most songs in the list.
 * @param {Object[]} songs - An array of songs.
 * @returns {string} The name of the artist with the most songs.
 */
function findArtistWithMostSongs(songs) {

  let artistMap = {};

 songs.map(song => {
    
    if (artistMap.hasOwnProperty(song.artist)){
          artistMap[song.artist].push(song.title);
    }
    else {
        artistMap[song.artist] = [];
        artistMap[song.artist].push(song.title);
    }

    
    
  });
  
  let mostTitles = artistMap['Taiyo Ky']; 

    for (let artist in artistMap){
    if (mostTitles.length < artistMap[artist].length)
        mostTitles = artist;
    }
        

return mostTitles; 

}

module.exports = {
  getSortedTitles,
  getSongsFromAlbum,
  categorizeSongsByRuntime, 
  findAlbumWithMostSongs,
  getFirstSongInAlbum,
  isThereLongSong,
  getSongsWithDurationInMinutes,
  getAlbumsInReverseOrder,
  songsWithWord,
  getTotalRuntimeOfArtist,
  printArtistsWithMultipleSongs,
  sortSongsByArtistAndTitle,
  printLongestSongTitle,
  listAlbumTotalRuntimes,
  findFirstSongStartingWith,
  mapArtistsToSongs,
  findAlbumWithLongestAverageRuntime,
  printSongsSortedByRuntime,
  printAlbumSummaries,
  findArtistWithMostSongs
};;
