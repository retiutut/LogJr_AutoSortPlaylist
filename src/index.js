/* eslint-disable no-console */
const csvFilePath = '/Users/Richard/Documents/GitHub/LogJr_AutoSortPlaylist/playlist_databases/^^**The Lost World.csv';
const csv = require('csvtojson');
const dirTree = require('directory-tree');

const csvToJson = async () => csv().fromFile(csvFilePath);

const directoryToJson = () => dirTree('/Users/Richard/Documents/GitHub/LogJr_AutoSortPlaylist/playlist_databases', {
  extensions: /\.(mp3|wav|aiff|wma|flac)$/
});


export { csvToJson, directoryToJson };
