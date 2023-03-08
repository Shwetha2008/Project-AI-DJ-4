song1 = " ";
song2 = " ";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
status_song1 = " ";

song1_name = "Peter Pan";
song2_name = "Harry Potter";

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600,600);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses); 
}

function modelLoaded()
{
    console.log("Posenet model is initialized");
}
function draw()
{
    image(video, 0, 0, 600, 600);

    fill("red");
    stroke("red");

    if(scoreLeftWrist > 0.2)
    {

    circle(leftWristX, leftWristY, 20);
    song2.stop();

    if(status_song1 == false)
    {
        song1.play();
        document.getElementById("update_song_name").innerHTML = "Song Name : " + song1_name;
    }
    }
    status_song1 = song1.isPlaying();
}
function gotPoses(results)
{
    if(results.length > 0)
                {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist x = " + leftWristX + "Left wrist y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("Right wrist x = " + rightWristX + "Right wrist y = " + rightWristY);
    }
}
