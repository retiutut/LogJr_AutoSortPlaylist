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

const mapToJson = () => {
  const newObject2 = directoryToJson().children.map(elem => ({
    path: elem.path,
    name: elem.name,
  }));
  console.log(newObject2);
  mm.parseFile('/Users/Richard/Documents/GitHub/LogJr_AutoSortPlaylist/playlist_databases/3195246_Home_Kollektiv_Turmstrasse___Interstellar_Mix.mp3')
    .then((metadata) => {
      console.log(util.inspect(metadata, { showHidden: false, depth: null }));
    })
    .catch((err) => {
      console.error(err.message);
    });
};

export {
  csvToJson, directoryToJson, mapToJson
};
