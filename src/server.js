const express = require("express")
const path = require('path')
const app = express()
const { imageHash }= require('image-hash');


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const publicFolder = path.join(__dirname, '../public')
const scriptDir = path.join(__dirname, '../src')
const viewsDir = path.join(__dirname, '../views')

app.use(express.static(viewsDir))
app.use('/uploads', express.static(publicFolder));
app.use('/src', express.static(scriptDir));


app.get('/', (req, res) => res.redirect('/face_detection'))
app.get('/face-detection', (req, res) => res.sendFile(path.join(viewsDir, 'faceDetection.html')))
app.get('/webcam-face-detection', (req, res) => res.sendFile(path.join(viewsDir, 'webcamFaceDetection.html')))
app.get('/face-hash', (req, res) => {
  imageHash('http://localhost:3000/uploads/test-photo.jpg', 16, true, (error, data) => {
    if (error) throw error;
    console.log('hash_data', data);
    // 0773063f063f36070e070a070f378e7f1f000fff0fff020103f00ffb0f810ff0
  });
})

app.listen(3000, () => console.log('Listening on port 3000!'))