import { Component } from 'react';
//import Realm from 'realm';
const Realm = null;
const realm = null;

//import RNFS from 'react-native-fs';
var RNFS = require('react-native-fs')


const Library = {
  name: 'Library',
  primaryKey: 'id',
  properties: {
    id: 'int',
    title: 'string',
    poster_path: 'string',
    backdrop_path: 'string',
    date_insert: 'string',
    type: 'string', //movie,tv,actor
  },
};

const Option = {
  name: 'Option',
  primaryKey: 'id',
  properties: {
    id: 'int',
    num_element: { type: 'int', default: 2 },
    server: { type: 'bool', default: true },
    filter: { type: 'int', default: 0 },
    asc: { type: 'bool', default: true },
    adult: { type: 'bool', default: false },
  },
};

//const realm = new Realm({ schema: [Library, Option] });
export default class RealmDb extends Component {

  constructor() {
    super();
    if (Realm === null){
      Realm = require('realm');
      realm = new Realm({ schema: [Library, Option] });
    }
  }

  render() {
    return null;
  }
}
