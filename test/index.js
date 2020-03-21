import { assert } from 'chai';
import isAO from './helpers';
import defaultAwesomeFunction, { awesomeFunction, csvToJson, directoryToJson } from '../src';

describe('Awesome test.', () => {
  it('should test default awesome function', () => {
    const expectedVal = 'I am the Default Awesome Function, fellow comrade! - Dinesh';
    assert(defaultAwesomeFunction('Dinesh') === expectedVal, 'Default not awesome :(');
  });

  it('should test awesome function', () => {
    const expectedVal = 'I am just an Awesome Function';
    assert(awesomeFunction() === expectedVal, 'Named awesome :(');
  });
});

describe('Convert Directory and CSV to JSON for processing.', () => {
  it('Should output two JSONs', () => {
    const check = isAO(csvToJson());
    const check2 = isAO(directoryToJson());
    assert.isTrue(check, 'CSV is valid');
    assert.isTrue(check2, 'Directory is valid');
  });
});
