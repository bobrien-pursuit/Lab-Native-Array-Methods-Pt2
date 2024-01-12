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

  return songs.map(x => (Math.floor(x.runtimeInSeconds/60) + x.runtimeInSeconds%60/100).toPrecision(3));

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
  let songsByArtist = songs.sort((a,b) => {

            if(a.title > b.title)
                return 1;
            if(a.title < b.title)
                return -1;
            else
                return 0;
  });
  let artistNames = [];
for (let i = 0; i < songs.length; i++){
      if(!artistNames.includes(songs[i].artist))
          artistNames.push(songs[i].artist);

          artistNames = artistNames.sort((a,b) => {
            if (a > b)
            return 1;
            else if (a < b)
            return -1;
          else
            return 0;
          });
}
let songsByArtistAndTitle = [];
  
      for(let i = 0; i < artistNames.length; i++)
          for(let j = 0; j < songsByArtist.length; j++)
              if(artistNames[i] == songsByArtist[j].artist)
                    songsByArtistAndTitle.push(songsByArtist[j]);

                    

  return songsByArtistAndTitle;
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
console.log(mapArtistsToSongs(exampleSongData));
// Problem #17
/**
 * Finds the album with the longest average song runtime.
 * @param {Object[]} songs - An array of songs.
 * @returns {string} The name of the album with the longest average song runtime.
 */
function findAlbumWithLongestAverageRuntime(songs) {}

// Problem #18
/**
 * Logs song titles sorted by their runtime.
 * @param {Object[]} songs - An array of songs.
 */
function printSongsSortedByRuntime(songs) {}

// Problem #19
/**
 * Prints a summary of each album, including its name, total runtime, and number of songs.
 * @param {Object[]} songs - An array of songs.
 */
function printAlbumSummaries(songs) {}

// Problem #20
/**
 * Finds the artist with the most songs in the list.
 * @param {Object[]} songs - An array of songs.
 * @returns {string} The name of the artist with the most songs.
 */
function findArtistWithMostSongs(songs) {}


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
