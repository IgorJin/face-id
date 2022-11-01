document.addEventListener("DOMContentLoaded", function(event) { 
  async function init() {
    console.log(faceapi)
    const video = document.getElementById('video')
    const canvas = document.getElementById('myCanvas')
    const MODEL_URL = "/uploads/models";

    console.log('load models')
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
    await faceapi.loadFaceLandmarkModel(MODEL_URL)
    await faceapi.loadFaceRecognitionModel(MODEL_URL)
    console.log('end loading models')

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(function(stream) {
        video.srcObject = stream;
        video.play();
    })
    .catch(function(err) {
        console.log("An error occurred: " + err);
    });

    let streaming = false
    let width, height

    video.addEventListener('canplay', async function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
        width = 500;

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;

        const result = await faceapi.detectSingleFace(video)
        console.log("🚀 ~ file: webcamFaceDetection.js ~ line 38 ~ video.addEventListener ~ result", result)

        if (result) {
          const dims = faceapi.matchDimensions(canvas, video, true)
          faceapi.draw.drawDetections(canvas, faceapi.resizeResults(result, dims))
        }
      }
    }, false);

  }

  init()
});
