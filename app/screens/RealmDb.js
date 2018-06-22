import { Component } from 'react';
import Realm from 'realm'; // 2.2.8

//const Realm = null;
//const realm = null;

import RNFS from 'react-native-fs'; // 2.9.10

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

const realm = new Realm({ schema: [Library, Option] });
export default class RealmDb extends Component {

  constructor() {
    super();
    /*if (Realm === null){
      Realm = require('realm');
      realm = new Realm({ schema: [Library, Option] });
    }*/
  }
  /*
componentDidMount(){
  this.get();
  //this.get("movie");
  //console.log(this.addLibrary(21,"The Departed - Il bene e il male.","http://pad.mymovies.it/filmclub/2006/08/199/imm.jpg","movie"));
  //console.log(this.addLibrary(31,"Leonardo DiCaprio","https://upload.wikimedia.org/wikipedia/commons/2/21/Leonardo_DiCaprio_October_2016.jpg","actor"));
  //console.log(this.searchLibrary(21,"movie"));
  //this.searchLibrary(31,"actor");
  //this.delLibrary(31,"actor");
  this.get();
}*/

  setNumElement(num) {
    try {
      realm.write(() => {
        realm.create('Option', { id: 1, num_element: num }, true);
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  setServer(val) {
    try {
      realm.write(() => {
        realm.create('Option', { id: 1, server: val }, true);
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  setAdult(val) {
    try {
      realm.write(() => {
        realm.create('Option', { id: 1, adult: val }, true);
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  getNumElement() {
    return new Promise(async (resolve, reject) => {
      let el = realm.objects('Option').filtered('id == 1');
      if (el.length == 0) {
        this.setNumElement(5);
        resolve(5);
      } else {
        resolve(el[0].num_element);
      }
    });
  }

  getServer() {
    return new Promise(async (resolve, reject) => {
      let el = realm.objects('Option').filtered('id == 1');
      if (el.length == 0) {
        resolve(true);
      } else {
        resolve(el[0].server);
      }
    });
  }

  getFilter() {
    return new Promise(async (resolve, reject) => {
      let el = realm.objects('Option').filtered('id == 1');
      if (el.length == 0) {
        resolve(0);
      } else {
        resolve(el[0].filter);
      }
    });
  }

  getAdult() {
    return new Promise(async (resolve, reject) => {
      let el = realm.objects('Option').filtered('id == 1');
      if (el.length == 0) {
        resolve(0);
      } else {
        resolve(el[0].adult);
      }
    });
  }

  getAsc() {
    return new Promise(async (resolve, reject) => {
      let el = realm.objects('Option').filtered('id == 1');
      if (el.length == 0) {
        resolve(true);
      } else {
        resolve(el[0].asc);
      }
    });
  }

  get(type) {
    return new Promise(async (resolve, reject) => {
      var h = [];
      let o = realm.objects('Library');
      if (type != undefined) o = o.filtered('type == $0', type);
      o.forEach((el, index) => {
        //var el = realm.objects('Library')[index];
        var obj = {};
        obj.id = el.id;
        obj.title = el.title;
        obj.poster_path = el.poster_path;
        obj.backdrop_path = el.backdrop_path;
        obj.date_insert = el.date_insert;
        obj.type = el.type;
        h.push(obj);
      });
      resolve(h);
    });
  }

  searchLibrary(id, type, result) {
    return new Promise(async (resolve, reject) => {
      try {
        let el = realm
          .objects('Library')
          .filtered('id == $0 AND type == $1', id, type);
        resolve(result == 'Obj' ? el : el.length == 1);
      } catch (e) {
        resolve('error');
      }
    });
  }

  searchLibrary2(id, type, result) {
    try {
      let el = realm
        .objects('Library')
        .filtered('id == $0 AND type == $1', id, type);
      return result == 'Obj' ? el : el.length == 1;
    } catch (e) {
      return 'error';
    }
  }

  addLibrary(id, title, poster_path, backdrop_path, type) {
    //var datetime = currentdate.getDate()+"/"+(currentdate.getMonth()+1)+"/"+currentdate.getFullYear()+" "+currentdate.getHours()+":"+currentdate.getMinutes()+":"+currentdate.getSeconds();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yy = today.getFullYear();
    var hh = today.getHours();
    var min = today.getMinutes();
    var ss = today.getSeconds();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (hh < 10) hh = '0' + hh;
    if (min < 10) min = '0' + min;
    if (ss < 10) ss = '0' + ss;
    var datetime = dd + '/' + mm + '/' + yy + ' ' + hh + ':' + min + ':' + ss;

    try {
      realm.write(() => {
        realm.create('Library', {
          id: id,
          title: title,
          poster_path: poster_path,
          backdrop_path: backdrop_path,
          date_insert: datetime,
          type: type,
        });
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  delLibrary(id, type) {
    try {
      this.searchLibrary(id, type, 'Obj')
        .then(el => {
          realm.write(() => {
            realm.delete(el);
          });
          return true;
        })
        .catch(err => alert('error: ' + err));
    } catch (e) {
      console.log('Error on delete.');
    }
  }

  check(id, title, poster_path, backdrop_path, type) {
    return new Promise(async (resolve, reject) => {
      this.searchLibrary(id, type, '')
        .then(r => {
          if (r == false) {
            this.addLibrary(id, title, poster_path, backdrop_path, type);
            resolve(true);
          } else {
            this.delLibrary(id, type);
            resolve(false);
          }
        })
        .catch(err => alert('error: ' + err));
    });
  }

  exportPref() {
    return new Promise(async (resolve, reject) => {
      try {
          var today = new Date();
          var dd = today.getDate();
          var mm = today.getMonth() + 1;
          var yy = today.getFullYear();
          var hh = today.getHours();
          var min = today.getMinutes();
          var ss = today.getSeconds();

          if (dd < 10) dd = '0' + dd;
          if (mm < 10) mm = '0' + mm;
          if (hh < 10) hh = '0' + hh;
          if (min < 10) min = '0' + min;
          if (ss < 10) ss = '0' + ss;
          var datetime = dd + '-' + mm + '-' + yy + '_' + hh + '-' + min + '-' + ss;
        RNFS.writeFile(
          RNFS.ExternalDirectoryPath + '/PizzaTV_' + datetime + '.bak',
          JSON.stringify(realm.objects('Library')),
          'utf8'
        )
          .then(success => {
            resolve('Dati salvati.');
          })
          .catch(err => {
            resolve(err.message);
          });
      } catch (e) {
        resolve('Error.');
      }
    });
  }


  render() {
    return null;
  }
}
