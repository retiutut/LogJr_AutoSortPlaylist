/* eslint-disable no-console */
const csvFilePath = '/Users/Richard/Documents/GitHub/LogJr_AutoSortPlaylist/playlist_databases/^^**The Lost World.csv';
const csv = require('csvtojson');
const dirTree = require('directory-tree');
const mm = require('music-metadata');
const util = require('util');

// General functions in alphabetical order
// Todo: Organize into separate files, if necessary

const csvToJson = () => csv().fromFile(csvFilePath);

const directoryToJson = () => dirTree('/Users/Richard/Documents/GitHub/LogJr_AutoSortPlaylist/playlist_databases', {
  extensions: /\.(mp3|wav|aiff|wma|flac)$/
});

async function getMetaData(path) {
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
}


const mapToJson = () => Promise.all(directoryToJson().children.map(async elem => ({
  path: elem.path,
  name: elem.name,
  metadata: await getMetaData(elem.path),
  mixedinkey: (await csvToJson())
})));

async function inspectJSON(database) {
  return util.inspect(database, { showHidden: false, depth: null, colors: true });
}

export {
  csvToJson, directoryToJson, mapToJson, inspectJSON
};
