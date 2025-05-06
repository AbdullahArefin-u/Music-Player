const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

// Replace with your API key and folder ID
const API_KEY = 'Your google api';       // https://console.cloud.google.com/apis/api/drive.googleapis.com/
const FOLDER_ID = 'Your public profile id'; 

app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Get list of .mp3 files from Google Drive
app.get('/', async (req, res) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}' in parents and mimeType='audio/mpeg'&key=${API_KEY}&fields=files(id,name)`
    );

    const songs = response.data.files.map(file => ({
      id: file.id,
      name: file.name,
      url: `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media&key=${API_KEY}`
    }));

    res.render('index', { songs });
  } catch (err) {
    res.status(500).send('Error fetching songs');
  }
});

module.exports = app;
