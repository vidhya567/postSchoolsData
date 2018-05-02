'use strict';

const extend = require('lodash').assign;
const mysql = require('mysql');
const firestore = require('./firestoreDB');

const options = {
  user: 'root',
  password: 'neela567',
  database:'schools'
};

const connection = mysql.createConnection(options);

function checkCall () {
  console.log("cloud SQL Called!");
}

async function create (recordData, courseData) {
  connection.query('INSERT INTO schools SET ?', recordData, (error, results, fields) => {
    if (error) console.log("INSERT FAILED ",error);
    read(results.insertId, (name,id) => {
      console.log("SUCESSFUL INSERT ",id);
      firestore.postCoursesData(id.toString(), courseData);
    });

  })
}

function read (recordID, cb) {
  connection.query('SELECT instituteName FROM schools WHERE schoolID = ?',recordID, (error, results, fields) => {
    if (error)  console.log("CANNOT READ ",recordID);
    	 cb(results, recordID);
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
