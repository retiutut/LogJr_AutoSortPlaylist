/* eslint-disable no-console */
const csvFilePath = '/Users/Richard/Documents/GitHub/LogJr_AutoSortPlaylist/playlist_databases/^^**The Lost World.csv';
const csv = require('csvtojson');
const dirTree = require('directory-tree');


const defaultAwesomeFunction = (name) => {
  const returnStr = `I am the Default Awesome Function, fellow comrade! - ${name}`;
  return returnStr;
};

const awesomeFunction = () => 'I am just an Awesome Function';

const csvToJson = () => {
  try {
    csv()
      .fromFile(csvFilePath)
      .then((jsonObj) => {
        console.log(jsonObj);
        /**
         * [
         *  {a:"1", b:"2", c:"3"},
         *  {a:"4", b:"5". c:"6"}
         * ]
         */
      });
    // Async / await usage
    const jsonArray = csv().fromFile(csvFilePath);
    return jsonArray;
  } catch (e) {
    console.log('Oops something happened');
    return null;
  }
};

const directoryToJson = () => {
  const filteredTree = dirTree('/Users/Richard/Documents/GitHub/LogJr_AutoSortPlaylist/playlist_databases', {
    extensions: /\.(mp3|wav|aiff|wma|flac)$/
  });
  console.log(filteredTree);
  return filteredTree;
};

export default defaultAwesomeFunction;

export { awesomeFunction, csvToJson, directoryToJson };
