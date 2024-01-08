const {
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
} = require("../index.js");


describe("getSortedTitles()", () => {
  let songs;
  beforeEach(() => {
    jest.resetModules();
    songs = require("../data/songs");
  });

  test("should return an array", () => {
    expect(Array.isArray(getSortedTitles(songs))).toBeTruthy();
  });

  test("should return sorted song titles", () => {
    const expected = songs.map(song => song.title).sort();
    expect(getSortedTitles(songs)).toEqual(expected);
  });
});

describe("getSongsFromAlbum()", () => {
  let songs;
  beforeEach(() => {
    jest.resetModules();
    songs = require("../data/songs");
  });

  test("should return an array", () => {
    expect(Array.isArray(getSongsFromAlbum(songs, "Bi-To Te-Pu"))).toBeTruthy();
  });

  test("should return titles from a specified album", () => {
    const album = "Bi-To Te-Pu";
    const expected = songs.filter(song => song.album === album).map(song => song.title);
    expect(getSongsFromAlbum(songs, album)).toEqual(expected);
  });
});

describe("categorizeSongsByRuntime()", () => {
  let songs;
  beforeEach(() => {
    jest.resetModules();
    songs = require("../data/songs");
  });

  test("should return an object", () => {
    expect(typeof categorizeSongsByRuntime(songs)).toBe("object");
  });

  test("should categorize songs based on runtime", () => {
    const expected = {
      shortSongs: songs.filter(song => song.runtimeInSeconds < 180).length,
      mediumSongs: songs.filter(song => song.runtimeInSeconds >= 180 && song.runtimeInSeconds <= 300).length,
      longSongs: songs.filter(song => song.runtimeInSeconds > 300).length
    };
    expect(categorizeSongsByRuntime(songs)).toEqual(expected);
  });
});

describe("findAlbumWithMostSongs()", () => {
  let songs;
  beforeEach(() => {
    jest.resetModules();
    songs = require("../data/songs");
  });

  test("should return a string", () => {
    expect(typeof findAlbumWithMostSongs(songs)).toBe("string");
  });

  test("should correctly identify the album with the most songs", () => {
    const albumCounts = songs.reduce((acc, song) => {
      acc[song.album] = (acc[song.album] || 0) + 1;
      return acc;
    }, {});

    let maxCount = 0;
    let expectedAlbum = '';
    for (const album in albumCounts) {
      if (albumCounts[album] > maxCount) {
        maxCount = albumCounts[album];
        expectedAlbum = album;
      }
    }
expect(findAlbumWithMostSongs(songs)).toEqual(expectedAlbum);
  });
});


describe("getFirstSongInAlbum()", () => {
  let songs;
  beforeEach(() => {
    jest.resetModules();
    songs = require("../data/songs");
  });

  test("should return an object or null", () => {
    const result = getFirstSongInAlbum(songs, "Bi-To Te-Pu");
    expect(result === null || typeof result === "object").toBeTruthy();
  });

  test("should return the first song in a specific album", () => {
    const expected = songs.find(song => song.album === "Bi-To Te-Pu") || null;
    expect(getFirstSongInAlbum(songs, "Bi-To Te-Pu")).toEqual(expected);
  });
});

describe("isThereLongSong()", () => {
  let songs;
  beforeEach(() => {
    jest.resetModules();
    songs = require("../data/songs");
  });

  test("should return a boolean", () => {
    expect(typeof isThereLongSong(songs, 200)).toBe("boolean");
  });

  test("should check if there's a song longer than the specified runtime", () => {
    expect(isThereLongSong(songs, 200)).toBeTruthy();
    expect(isThereLongSong(songs, 400)).toBeFalsy();
  });
});

describe("getSongsWithDurationInMinutes()", () => {
  let songs;
  beforeEach(() => {
    jest.resetModules();
    songs = require("../data/songs");
  });

  test("should return an array", () => {
    expect(Array.isArray(getSongsWithDurationInMinutes(songs))).toBeTruthy();
  });

  test("should convert song durations to minutes", () => {
    const result = getSongsWithDurationInMinutes(songs);
    result.forEach((song, index) => {
      const expectedDuration = songs[index].runtimeInSeconds / 60;
      expect(song.durationInMinutes).toBeCloseTo(expectedDuration);
    });
  });
});


describe("getAlbumsInReverseOrder()", () => {
  let songs;
  beforeEach(() => {
    jest.resetModules();
    songs = require("../data/songs");
  });

  test("should return an array", () => {
    expect(Array.isArray(getAlbumsInReverseOrder(songs))).toBeTruthy();
  });

  test("should return album names in reverse alphabetical order", () => {
    const expected = Array.from(new Set(songs.map(song => song.album))).sort().reverse();
    expect(getAlbumsInReverseOrder(songs)).toEqual(expected);
  });
});

describe("songsWithWord()", () => {
  let songs;
  beforeEach(() => {
    jest.resetModules();
    songs = require("../data/songs");
  });

  test("should return an array", () => {
    expect(Array.isArray(songsWithWord(songs, "Berlin"))).toBeTruthy();
  });

  test("should return songs that contain a specific word in their title", () => {
    const expected = songs.filter(song => song.title.includes("Berlin")).map(song => song.title);
    expect(songsWithWord(songs, "Berlin")).toEqual(expected);
  });
});

describe("getTotalRuntimeOfArtist()", () => {
  let songs;
  beforeEach(() => {
    jest.resetModules();
    songs = require("../data/songs");
  });

  test("should return a number", () => {
    expect(typeof getTotalRuntimeOfArtist(songs, "Taiyo Ky")).toBe("number");
  });

  test("should calculate the total runtime of songs by a specific artist", () => {
    const expected = songs.filter(song => song.artist === "Taiyo Ky")
                          .reduce((total, song) => total + song.runtimeInSeconds, 0);
    expect(getTotalRuntimeOfArtist(songs, "Taiyo Ky")).toEqual(expected);
  });
});
describe("getTotalRuntimeOfArtist()", () => {
  let songs;
  beforeEach(() => {
    jest.resetModules();
    songs = require("../data/songs");
  });

  test("should return a number", () => {
    expect(typeof getTotalRuntimeOfArtist(songs, "Taiyo Ky")).toBe("number");
  });

  test("should calculate the total runtime of songs by a specific artist", () => {
    const expected = songs.filter(song => song.artist === "Taiyo Ky")
                          .reduce((total, song) => total + song.runtimeInSeconds, 0);
    expect(getTotalRuntimeOfArtist(songs, "Taiyo Ky")).toEqual(expected);
  });
});

describe("printArtistsWithMultipleSongs()", () => {
  let songs;
  beforeEach(() => {
    jest.resetModules();
    songs = require("../data/songs"); // Adjust the path as needed
    console.log = jest.fn();
  });

  test("should log each artist with multiple songs", () => {
    printArtistsWithMultipleSongs(songs);

    expect(console.log).toHaveBeenCalledWith("Saib");
    expect(console.log).toHaveBeenCalledWith("Echo Vistas");
    expect(console.log).toHaveBeenCalledWith("Melody Green");
  });
});

describe("printLongestSongTitle()", () => {
  let songs;
  beforeEach(() => {
    jest.resetModules();
    songs = require("../data/songs"); // Adjust the path as needed
    console.log = jest.fn();
  });

  test("should log the longest song title", () => {
    printLongestSongTitle(songs);

    const expectedLongestTitle = "In the Middle of Nowhere";
    expect(console.log).toHaveBeenCalledWith(expectedLongestTitle);
  });
});




describe("sortSongsByArtistAndTitle()", () => {
  let songs;
  beforeEach(() => {
    jest.resetModules();
    songs = require("../data/songs");
  });

  test("should return an array", () => {
    expect(Array.isArray(sortSongsByArtistAndTitle(songs))).toBeTruthy();
  });

  test("should return sorted song array by artist and title", () => {
    const sorted = songs.slice().sort((a, b) => {
      return a.artist.localeCompare(b.artist) || a.title.localeCompare(b.title);
    });
    expect(sortSongsByArtistAndTitle(songs)).toEqual(sorted);
  });
});

describe("listAlbumTotalRuntimes()", () => {
  let songs;
  beforeEach(() => {
    jest.resetModules();
    songs = require("../data/songs");
  });

  test("should return an object", () => {
    expect(typeof listAlbumTotalRuntimes(songs)).toBe("object");
  });

  test("should list total runtimes of albums", () => {
    const albumRuntimes = {};
    songs.forEach(song => {
      albumRuntimes[song.album] = (albumRuntimes[song.album] || 0) + song.runtimeInSeconds;
    });
    expect(listAlbumTotalRuntimes(songs)).toEqual(albumRuntimes);
  });
});

describe("findFirstSongStartingWith()", () => {
  let songs;
  beforeEach(() => {
    jest.resetModules();
    songs = require("../data/songs");
  });

  test("should return an object or null", () => {
    const result = findFirstSongStartingWith(songs, 'D');
    expect(result === null || typeof result === "object").toBeTruthy();
  });

  test("should find the first song starting with a specific letter", () => {
    const expected = songs.find(song => song.title.startsWith('D')) || null;
    expect(findFirstSongStartingWith(songs, 'D')).toEqual(expected);
  });
});

describe('mapArtistsToSongs()', () => {
  let songs;
  beforeEach(() => {
    jest.resetModules();
    songs = require('../data/songs'); // Adjust this path to where your songs dataset is located
  });

  test('should return an object', () => {
    expect(typeof mapArtistsToSongs(songs)).toBe('object');
  });

  test('should correctly map artists to their songs', () => {
    const artistMap = mapArtistsToSongs(songs);
    expect(artistMap['Taiyo Ky']).toContain('Berlin Tsukin');
    expect(artistMap['Saib']).toEqual(expect.arrayContaining(['Pineapple Jam', 'Samui Sunrise']));
  });
});

describe('findAlbumWithLongestAverageRuntime()', () => {
  let songs;
  beforeEach(() => {
    jest.resetModules();
    songs = require('../data/songs');
  });

  test('should return a string', () => {
    expect(typeof findAlbumWithLongestAverageRuntime(songs)).toBe('string');
  });

  test('should correctly identify the album with the longest average runtime', () => {
    expect(findAlbumWithLongestAverageRuntime(songs)).toBe('Regular Guy'); // Replace with actual expected value
  });
});

describe('printSongsSortedByRuntime()', () => {
  let songs;
  beforeEach(() => {
    jest.resetModules();
    songs = require('../data/songs');
    console.log = jest.fn();
  });

  test('should log songs sorted by runtime', () => {
    printSongsSortedByRuntime(songs);
    expect(console.log).toHaveBeenCalledWith('Up'); // Replace with actual first song in the sorted list
  });
});

describe('printAlbumSummaries()', () => {
  let songs;
  beforeEach(() => {
    jest.resetModules();
    songs = require('../data/songs'); // Adjust this path to where your songs dataset is located
    console.log = jest.fn();
  });

  test('should log a summary for each album', () => {
    printAlbumSummaries(songs);

    const albums = {};
    songs.forEach(song => {
      if (!albums[song.album]) {
        albums[song.album] = { totalRuntime: 0, songCount: 0 };
      }
      albums[song.album].totalRuntime += song.runtimeInSeconds;
      albums[song.album].songCount++;
    });

    Object.keys(albums).forEach(album => {
      const summary = `${album}: ${albums[album].songCount} songs, Total Runtime: ${albums[album].totalRuntime} seconds`;
      expect(console.log).toHaveBeenCalledWith(summary);
    });
  });
});


describe('findArtistWithMostSongs()', () => {
  let songs;
  beforeEach(() => {
    jest.resetModules();
    songs = require('../data/songs');
  });

  test('should return a string', () => {
    expect(typeof findArtistWithMostSongs(songs)).toBe('string');
  });

  test('should correctly identify the artist with the most songs', () => {
    expect(findArtistWithMostSongs(songs)).toBe('Saib'); // Replace with actual expected artist
  });
});