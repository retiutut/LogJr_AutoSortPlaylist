import { assert } from 'chai';
import isAO from './helpers';
import {
  csvToJson, directoryToJson, mapToJson, saveToM3U, readM3U
} from '../src/index';
import { runNN } from '../src/neuralNetTest';


describe('Neural Net Test', () => {
  it('Should perform a basic test on the neural net', () => {
    const result = runNN(1, 0.2, 0);
    // eslint-disable-next-line no-console
    console.log(result);
    assert.isTrue(result.black <= 0.04 && result.white >= 0.96, "Something went wrong with the neural network :'(");
  });
});

describe('Convert Directory and CSV to JSON for processing.', () => {
  it('Should output two Arrays', async () => {
    const database = await csvToJson();
    const directory = directoryToJson();
    // eslint-disable-next-line no-console
    // console.log(database);
    // eslint-disable-next-line no-console
    // console.log(directory);
    assert.isTrue(isAO(database), 'CSV is not valid JSON');
    assert.isTrue(isAO(directory), 'Directory is not valid JSON');
  });
});

describe('Find file paths for song names', () => {
  it('Should match a song name with available files, or return null for no match.', async () => {
    const database = await csvToJson();
    const mappedDatabase = await mapToJson();
    const complete = mappedDatabase.map((elem) => ({
      path: elem.path,
      name: elem.name,
      metadata: elem.metadata,
      mixedinkey: database.find((object) => object['File name'] === elem.metadata.title)
    }));
    // const viewAll = await inspectJSON(complete);
    // eslint-disable-next-line no-console
    console.log(complete);
    assert.isTrue(isAO(mappedDatabase));
    assert.isTrue(isAO(complete));
  });
});

describe('Output valid m3u8 playlist', () => {
  it('Should save a valid m3u8 playlist to playlist_database', () => {
    saveToM3U();

    const data = readM3U();
    // eslint-disable-next-line no-console
    console.log(data); // May need to use a m3u8 parser to improve this test
    // eslint-disable-next-line no-console
    console.log('^^^^^^^END OF FILE');
    assert.isTrue(data != null);
  });
});
