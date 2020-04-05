'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var brain = require('brain.js');

var net = new brain.NeuralNetwork();

var trainNN = function trainNN() {
  net.train([{
    input: {
      r: 0.03,
      g: 0.7,
      b: 0.5
    },
    output: {
      black: 1
    }
  }, {
    input: {
      r: 0.16,
      g: 0.09,
      b: 0.2
    },
    output: {
      white: 1
    }
  }, {
    input: {
      r: 0.5,
      g: 0.5,
      b: 1.0
    },
    output: {
      white: 1
    }
  }]);
};

var runNN = function runNN(red, green, blue) {
  trainNN();

  var output = net.run({
    r: red,
    g: green,
    b: blue
  }); // { white: 0.99, black: 0.002 }

  // eslint-disable-next-line no-console
  return output;
};

exports.trainNN = trainNN;
exports.runNN = runNN;