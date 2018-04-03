'use strict';

const extend = require('lodash').assign;
const mysql = require('mysql');

const options = {
  user: 'root',
  password: 'Neela567',
  database:'schools'
};

const connection = mysql.createConnection(options);

function checkCall () {
  console.log("cloud SQL Called!");
}

function create (recordData) {
  connection.query('INSERT INTO schools SET ?', recordData, (error, results, fields) => {
    if (error) console.log("INSERT FAILED ",error);
    read(results.insertId, (id) => {console.log("SUCESSFUL INSERT ",id)});
  })
}

function read (recordID, cb) {
  connection.query('SELECT instituteName FROM schools WHERE schoolID = ?',recordID, (error, results, fields) => {
    if (error)  console.log("CANNOT READ ",recordID);
    cb(results);
  })
}

module.exports = {
  checkCall: checkCall,
  create: create,
  read: read
}

if (module === require.main) {
  const connection = mysql.createConnection(options);

  connection.query(
    `USE \`schools\`;`
  , (err) => {
       if (err) {
         console.log(err);
       }
       console.log("Sucess Using Schools Data");
       connection.end();
    }
  );
}
