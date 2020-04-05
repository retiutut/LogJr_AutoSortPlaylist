/* eslint-disable no-console */
const csvFilePath = '/Users/Richard/Documents/GitHub/LogJr_AutoSortPlaylist/playlist_database/^^**The Lost World.csv';
const csv = require('csvtojson');
const dirTree = require('directory-tree');
const mm = require('music-metadata');
const util = require('util');
const fs = require('fs');
const { EOL } = require('os');

// General functions in alphabetical order
// Todo: Organize into separate files, if necessary

const csvToJson = () => csv().fromFile(csvFilePath);

const directoryToJson = () => dirTree('/Users/Richard/Documents/GitHub/LogJr_AutoSortPlaylist/playlist_database', {
  extensions: /\.(mp3|wav|aiff|m4a|flac)$/
});

const getMetaData = async (path) => {
  try {
    const { common, format } = await mm.parseFile(path);
    return {
      title: common.title,
      artist: common.artist,
      album: common.album,
      year: common.year,
      duration: Math.floor(format.duration),
    };
  } catch (e) {
    return {};
  }
};


const mapToJson = () => Promise.all(directoryToJson().children.map(async (elem) => ({
  path: elem.path,
  name: elem.name,
  metadata: await getMetaData(elem.path),
  mixedinkey: (await csvToJson())
})));

// eslint-disable-next-line max-len
const inspectJSON = async (database) => util.inspect(database, { showHidden: false, depth: null, colors: true });

const saveToM3U = () => {
  const writeStream = fs.createWriteStream('/Users/Richard/Documents/GitHub/LogJr_AutoSortPlaylist/playlist_database/output_playlist.m3u8');
  writeStream.write(`#EXTM3U${EOL}`);
  writeStream.write('#EXTINF:162,Solar Sailer - Daft Punk');
  writeStream.write(EOL);
  writeStream.write('/Users/Richard/Music/Music/iTunes Music/Daft Punk/TRON_ Legacy/15 Solar Sailer.m4a\n');
  writeStream.write(EOL);
  writeStream.end();
};

const readM3U = () => fs.readFileSync('/Users/Richard/Documents/GitHub/LogJr_AutoSortPlaylist/playlist_database/output_playlist.m3u8', 'ascii');

export {
  csvToJson, directoryToJson, mapToJson, inspectJSON, saveToM3U, readM3U
};
