document.addEventListener("DOMContentLoaded", function(event) { 
  async function init() {
    console.log(faceapi)
    
    const canvas = document.getElementById('myCanvas')
    const MODEL_URL = "/uploads/models";

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, 500, 450);

    console.log('load models')
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
    await faceapi.loadFaceLandmarkModel(MODEL_URL)
    await faceapi.loadFaceRecognitionModel(MODEL_URL)
    console.log('end loading models')

    let fullFaceDescriptions = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors()
    console.log(fullFaceDescriptions)

    faceapi.matchDimensions(ctx, img)
    fullFaceDescriptions = faceapi.resizeResults(fullFaceDescriptions, img)
    faceapi.draw.drawDetections(ctx, fullFaceDescriptions)
    faceapi.draw.drawFaceLandmarks(ctx, fullFaceDescriptions)
  }

  init()
});
