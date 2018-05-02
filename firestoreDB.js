// Configure Firebase.
const  firebase =  require("firebase");

var config = {
    apiKey: "AIzaSyA9H7MjXZ_Rje7wdr0-jtml-U0RH8ujt4Y",
    authDomain: "lively-math-170005.firebaseapp.com",
    databaseURL: "https://lively-math-170005.firebaseio.com",
    projectId: "lively-math-170005",
    storageBucket: "lively-math-170005.appspot.com",
    messagingSenderId: "658356984338"
};
firebase.initializeApp(config);

function postCoursesData (schoolId, courses) {
    const db = firebase.firestore();
    return db.collection('courses').doc(schoolId).set({
        courses: courses
    });
}

module.exports = {
    postCoursesData: postCoursesData
}