
'use strict';

const fs = require('fs');

async function postSchoolsData() {
  const cloudSql = getCloudSql();
  const schoolsDataString = fs.readFileSync('schools_data_tn.json');
  const schoolsData = JSON.parse(schoolsDataString);
  console.log("schools data obtained",schoolsData.length);
  for (let i = 0 ; i < schoolsData.length; i++) {
    const record = createRecord(schoolsData[i]);
    await cloudSql.create(record);
  }
}

function getCloudSql() {
   return require('./cloudsql');
}

function createRecord (schoolData) {
  const record = {};
  record['instituteName'] = cleanUp(schoolData['instituteName']);
  record['instituteType'] = cleanUp(schoolData['type']);
  record['link'] = cleanUp(schoolData['link']);
  record['address'] = cleanUp(schoolData['address']);
  return record;
}

function cleanUp (str) {
  str = str.replace(/(\r\n\t|\n|\r\t)/gm,'');
  str = str.trim();
  return str;
}

postSchoolsData();
