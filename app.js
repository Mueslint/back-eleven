// Express init
const express = require("express");
const app = express();
const bodyparser = require("body-parser");

// Firebase database
const firebase = require("firebase/app");
require("firebase/firestore");

// Server consts
const port = process.env.PORT || 3300;
const firebaseConfig = {
    apiKey: "AIzaSyDKf9lrsAv-2HK-KLeoyel1OdWR6nm0N28",
    authDomain: "eleventest-5122f.firebaseapp.com",
    databaseURL: "https://eleventest-5122f.firebaseio.com",
    projectId: "eleventest-5122f",
    storageBucket: "eleventest-5122f.appspot.com",
    messagingSenderId: "1056914285093",
    appId: "1:1056914285093:web:eb307ef2bb57ff0c"
  };
// Init Firebase DB connection
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore()


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// Avoid CORS related error
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



// Fetch all document in astronaut collection
app.get("/getAstronauts", (req, res) => {
  db.collection('astronauts').get()
    .then((snapshot) => {
      const astronauts = []

      snapshot.forEach(doc => {
        const astronaut = doc.data();
        astronaut.ref = doc.id;
        astronauts.push(astronaut);
      });

      res.status(200).send(astronauts);
    })
    .catch(err => {
      console.error('Error fetching documents', err);
      res.status(500).send('Error fetching documents')
    })
})

// create a db document in astronaut collection
app.post("/postNewAstronaut", (req, res) => {
  if (req.body.test) {
    db.collection('test').add(req.body)
    .then(ref => {
      res.status(200).send(ref.id)
    })
  } else {
    db.collection('astronauts').add(req.body)
    .then(ref => {
      res.status(200).send(ref.id)
    })
  }
})

// delete a db document in astronaut collection
app.post("/deleteAstronaut", (req, res) => {
  const ref = req.body.ref
  db.collection('astronauts').where(firebase.firestore.FieldPath.documentId(), "==", ref).get()
    .then( snapshot => {
      snapshot.docs[0].ref.delete()
      res.status(200).send("doc deleted")
    })
    .catch(err => {
      console.error('Error fetching documents', err);
      res.status(500).send('Error fetching documents')
    })
});

// update a db document in astronaut collection
app.post("/updateAstronaut", (req, res) => {
  const updatedAstronaut = req.body.updatedAstronaut
  const ref = req.body.ref

  db.collection('astronauts').where(firebase.firestore.FieldPath.documentId(), "==", ref).get()
    .then( snapshot => {
      snapshot.docs[0].ref.update(updatedAstronaut)
      res.status(200).send("doc updated")
    })
    .catch(err => {
      console.error('Error fetching documents', err);
      res.status(500).send('Error fetching documents')
    })
});


app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

module.exports = app
