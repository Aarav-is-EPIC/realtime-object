var img="";
var status="";
object = [];
function preload(){
    img=loadImage("dog_cat.jpg");
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide()
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status:Detecting Objects";

}
function modelLoaded(){
    console.log("Model has been loaded");
    status=true;


}
function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    object=results;
}
function draw(){
    image(video,0,0,380,380);
   
    /*stroke("red");
    fill("red");
    noFill();
    rect(50,50,300,390);
    rect(190,70,200,295);
    text("Dog 99%",70,70);
    text("Cat 1%",210,90);*/

    if(status != ""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResults);
        for(i=0;i<object.length;i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("realtime").innerHTML = "Number of objects detected="+object.length;
            fill(r,g,b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " +percent+"%",object[i].x+15,object[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);

        }

    }

}