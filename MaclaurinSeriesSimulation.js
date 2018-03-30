var myCanvas;
var sinXMS;//sinx maclaurin series
var restartPressed = false;

function setup(){
	myCanvas = createCanvas(screen.width,screen.height);
	myCanvas.parent("graphContainer");
	sinXMS = new Equation(-5,5,300,200);
	sinXMS.initalizeDataPoints();
	sinXMS.nextTerm();
	background(0);
}

function draw(){
	if(restartPressed){
		background(0);
		restartPressed = false;
	}
	translate(width/2,height/2);
	scale(1,-1);
	stroke(255);
	line(0,-height/2,0,height/2);//y axis
	line(-width/2,0,width/2,0);//x axis
	sinXMS.update();
	sinXMS.show();
	if(sinXMS.doneTraveling()){
		sinXMS.nextTerm();
		document.getElementById("nSeries").innerHTML = "Maclaurin Series Number: " + sinXMS.n;
		var newColor = color(random(100,255),random(100,255),random(100,255));
		for(var i = 0; i < sinXMS.dataPoints.length; i++){
			sinXMS.dataPoints[i].pointColor = newColor;
		}
	}

}

function restartSimulation(){
	sinXMS.restartSimulation();
	restartPressed = true;
}