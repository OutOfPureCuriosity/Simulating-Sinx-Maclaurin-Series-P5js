function Equation(xmin,xmax,numberOfDataPoints,travelSpeed){
	this.step = (xmax - xmin) / numberOfDataPoints;
	this.n = 0;
	this.dataPoints = [];
	this.travelSpeed = travelSpeed;

	this.initalizeDataPoints = function(){
		var startingX = xmin;
		for(var i = 0; i < numberOfDataPoints; i++){
			this.dataPoints.push(new dataPoint(startingX,travelSpeed));
			startingX += this.step;	
		}
	}

	this.nextTerm = function(){
		var xValue = xmin;
		for(var c = 0; c < numberOfDataPoints; c++){
			//General term of sinx maclaurin series (-1)^n * (x^(2n+1)) / (2n+1)!
			var termN = (pow(-1,this.n) * (pow(xValue,(2*this.n)+1))) / factorial((2*this.n)+1);
			this.dataPoints[c].destination.x = xValue;
			this.dataPoints[c].destination.y = this.dataPoints[c].pos.y + termN;
			this.dataPoints[c].createPointSpeed();//this function sets the speed of the point in the x and y direction
			xValue += this.step;
		}
		this.n++;
	}

	this.update = function(){
		for(var i = 0; i < numberOfDataPoints; i++){
			this.dataPoints[i].update();
		}
	}

	this.show = function(){
		for(var i = 0; i < numberOfDataPoints; i++){
			this.dataPoints[i].show();
		}
	}

	this.doneTraveling = function(){
		for(var i = 0; i < numberOfDataPoints; i++){
			if(!this.dataPoints[i].isTraveling){
				return true;
			}
		}
		return false;
	}

	this.restartSimulation = function(){
		this.dataPoints = [];
		this.n = 0;
		this.initalizeDataPoints();
		this.nextTerm();
	}

}

function dataPoint(xStart,speedOfTravel){
	this.pos = createVector(xStart,0);
	this.speed = createVector(0,0);
	this.speedOfTravel = speedOfTravel;
	this.destination = createVector(0,0);
	this.isTraveling = false;
	this.scale = (width/2)/5;
	this.pointColor = color(255,255,255);

	this.update = function(){
		if(this.isTraveling){
			this.pos.x += this.speed.x;
			this.pos.y += this.speed.y;
			if(dist(this.pos.x, this.pos.y, this.destination.x, this.destination.y) < this.speed.y/2){
				this.isTraveling = false;
			}else{
				this.isTraveling = true;
			}
		}
	}

	this.show = function(){
		fill(this.pointColor);
		noStroke();
		ellipse(this.pos.x * this.scale, this.pos.y * this.scale, 5, 5);
	}

	this.createPointSpeed = function(){
		this.speed.x = (this.destination.x - this.pos.x) / this.speedOfTravel;
		this.speed.y = (this.destination.y - this.pos.y) / this.speedOfTravel;
		this.isTraveling = true;
	}
}

//5! = 5 * 4 * 3 * 2 * 1
function factorial(n){
	var multiplier = 1;
	for(var m = 1; m <= n; m++){
		multiplier *= m;
	}
	return multiplier;
}