let noseX = 0;
let noseY = 0;
let difference = 0;
let rightWristX = 0;
let leftWristX = 0;

function setup() {
  video = createCapture(VIDEO); // Create a video capture from the webcam
  video.size(550, 500); // Set the video size
  video.position(500, 200); // Position the video feed

  canvas = createCanvas(550, 550); // Create a canvas with specified dimensions
  canvas.position(1100, 150); // Position the canvas

  poseNet = ml5.poseNet(video, modelLoaded); // Initialize PoseNet with the video feed
  poseNet.on('pose', gotPoses); // Trigger the gotPoses function when a pose is detected
}

function modelLoaded() {
  console.log('PoseNet Is Initialized!'); // Log that PoseNet is initialized
}

function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);
    noseX = results[0].pose.nose.x;
    noseY = results[0].pose.nose.y;
    console.log("noseX = " + noseX + " noseY = " + noseY);

    leftWristX = results[0].pose.leftWrist.x;
    rightWristX = results[0].pose.rightWrist.x;
    difference = floor(leftWristX - rightWristX);

    console.log("leftWristX  = " + leftWristX + " rightWristX = " + rightWristX + " difference = " + difference);
  }
}

function draw() {
  background('lightgray'); // Set the background color

  document.getElementById("square_side").innerHTML = "Width and height will be = " + difference + "px"; // Update square size in HTML
  fill('#374228'); // Set the fill color
  stroke('black'); // Set the stroke color
  square(noseX, noseY, difference); // Draw a square with calculated size and nose position
}
