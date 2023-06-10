function preload(){
song1=loadSound("mini_alert.mp3");
}
function draw(){
image(video,0,0,380,380);
if(status1 !=""){
    objectDetector.detect(video,gotResults);
    r=random(255);
    g=random(255);
    b=random(255);
    for(i=0; i<objects.length;i++){
        document.getElementById("status").innerHTML="Objects detected";
    
        percent=floor(objects[i].confidence*100);
        fill(r,g,b);
        text(objects[i].label+" "+ percent+"%",objects[i].x,objects[i].y);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        if(objects[i].label=="person"){
        document.getElementById("baby").innerHTML="Baby Found";
        song1.stop();   
        }
        else{
            document.getElementById("baby").innerHTML="Baby not found";
            song1.play();

        }

    }
}

}
objects=[];
status1="";
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(380,380)
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects";

}
function modelLoaded(){
    status1="zero";
    console.log("modelloaded");
    

}
function gotResults(error,results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    objects=results;
}
}
