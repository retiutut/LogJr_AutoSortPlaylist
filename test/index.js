import { assert } from 'chai';
import isAO from './helpers';
import { csvToJson, directoryToJson } from '../src/index';
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
  it('Should output two JSONs', async () => {
    const database = await csvToJson();
    const directory = directoryToJson();
    // eslint-disable-next-line no-console
    console.log(database);
    // eslint-disable-next-line no-console
    console.log(directory);
    assert.isTrue(isAO(database), 'CSV is not valid JSON');
    assert.isTrue(isAO(directory), 'Directory is not valid JSON');
  });
});
