'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* eslint-disable no-console */
var csvFilePath = '/Users/Richard/Documents/GitHub/LogJr_AutoSortPlaylist/playlist_database/^^**The Lost World.csv';
var csv = require('csvtojson');
var dirTree = require('directory-tree');
var mm = require('music-metadata');
var util = require('util');
var fs = require('fs');

var _require = require('os'),
    EOL = _require.EOL;

// General functions in alphabetical order
// Todo: Organize into separate files, if necessary

var csvToJson = function csvToJson() {
  return csv().fromFile(csvFilePath);
};

var directoryToJson = function directoryToJson() {
  return dirTree('/Users/Richard/Documents/GitHub/LogJr_AutoSortPlaylist/playlist_database', {
    extensions: /\.(mp3|wav|aiff|m4a|flac)$/
  });
};

var getMetaData = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(path) {
    var _ref2, common, format;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return mm.parseFile(path);

          case 3:
            _ref2 = _context.sent;
            common = _ref2.common;
            format = _ref2.format;
            return _context.abrupt('return', {
              title: common.title,
              artist: common.artist,
              album: common.album,
              year: common.year,
              duration: Math.floor(format.duration)
            });

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', {});

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 9]]);
  }));

  return function getMetaData(_x) {
    return _ref.apply(this, arguments);
  };
}();

var mapToJson = function mapToJson() {
  return Promise.all(directoryToJson().children.map(function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(elem) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t0 = elem.path;
              _context2.t1 = elem.name;
              _context2.next = 4;
              return getMetaData(elem.path);

            case 4:
              _context2.t2 = _context2.sent;
              _context2.next = 7;
              return csvToJson();

            case 7:
              _context2.t3 = _context2.sent;
              return _context2.abrupt('return', {
                path: _context2.t0,
                name: _context2.t1,
                metadata: _context2.t2,
                mixedinkey: _context2.t3
              });

            case 9:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x2) {
      return _ref3.apply(this, arguments);
    };
  }()));
};

// eslint-disable-next-line max-len
var inspectJSON = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(database) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt('return', util.inspect(database, { showHidden: false, depth: null, colors: true }));

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function inspectJSON(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

var saveToM3U = function saveToM3U() {
  var writeStream = fs.createWriteStream('/Users/Richard/Documents/GitHub/LogJr_AutoSortPlaylist/playlist_database/output_playlist.m3u8');
  writeStream.write('#EXTM3U' + EOL);
  writeStream.write('#EXTINF:162,Solar Sailer - Daft Punk');
  writeStream.write(EOL);
  writeStream.write('/Users/Richard/Music/Music/iTunes Music/Daft Punk/TRON_ Legacy/15 Solar Sailer.m4a\n');
  writeStream.write(EOL);
  writeStream.end();
};

var readM3U = function readM3U() {
  return fs.readFileSync('/Users/Richard/Documents/GitHub/LogJr_AutoSortPlaylist/playlist_database/output_playlist.m3u8', 'ascii');
};

exports.csvToJson = csvToJson;
exports.directoryToJson = directoryToJson;
exports.mapToJson = mapToJson;
exports.inspectJSON = inspectJSON;
exports.saveToM3U = saveToM3U;
exports.readM3U = readM3U;