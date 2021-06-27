require("dotenv").config();
const express = require("express");
const connection = require("./config");

const app = express();

//parse the json sent to be read
app.use(express.json());

//get all tracks
app.get("/api/tracks", (req, res) => {
  connection.query("SELECT * FROM track", (err, results) => {
    if (err) {
      res.json({ error: `error retrieving all tracks: ${err}` });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/tracks/:id", (req, res) => {
  //destructure id and grab from params
  const { id } = req.params;
  connection.query("SELECT * FROM track WHERE id=?", [id], (err, results) => {
    if (err) {
      res.json({ error: `error retrieving track: ${err}` });
    } else {
      res.json(results);
    }
  });
});

app.post("/api/tracks", (req, res) => {
  connection.query("INSERT INTO track SET ?", [req.body], (err, results) => {
    if (err) {
      res.json({ error: `error adding track: ${err}` });
    } else {
      //201 = success and req.body to send the created element
      res.status(201).json(req.body);
    }
  });
});
// {
//   "title": "In Principio - I. In Principio Erat Verbum",
//   "youtube_url": "https://www.youtube.com/watch?v=CVAUv_dGg0s",
//   "album_id": 2
// }

app.put("/api/tracks/:id", (req, response) => {
  const { id } = req.params;
  connection.query("UPDATE track SET ?", [req.body], (err, res) => {
    if (err) {
      response.json({ error: `error updating track ${err}` });
    } else {
      response.status(201).json(req.body);
    }
  });
});

app.delete("/api/tracks/:id", (req, res) => {
  const { id } = req.params;
  connection.query("DELETE FROM track WHERE id=?", [id], (err) => {
    if (err) {
      res.json({ error: `error deleting track: ${err}` });
    } else {
      res.sendStatus(204);
    }
  });
});

app.get("/api/albums/:id/tracks", (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM track WHERE album_id=?",
    [id],
    (err, results) => {
      if (err) {
        res.json({ error: `Error retrieving track: ${err}` });
      } else {
        res.json(results);
      }
    }
  );
});

module.exports = app;
