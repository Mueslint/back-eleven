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

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


firebase.initializeApp(firebaseConfig);

let db = firebase.firestore()

app.get("/getAstronauts", (req, res) => {
  db.collection('astronauts').get()
    .then((snapshot) => {
      const astronauts = []

      snapshot.forEach(doc => {
        astronauts.push(doc.data());
      });

      res.status(200).send(astronauts);
    })
    .catch(err => {
      console.error('Error fetching documents', err);
      res.status(500).send('Error fetching documents')
    })
})

app.post("/postNewAstronaut", (req, res) => {
  db.collection('astronauts').add(req.body)
  .then(() => {
    res.status(200).send("done")
  })
})


app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
