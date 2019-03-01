var canvas = document.querySelector('canvas');
var cellArray = [];


const aliveColor = "green";
const deadColor = "gray";
var xCells, yCells, cellSize;
let gridSize = 18;

var c = canvas.getContext('2d');

class Cell {
	constructor(x, y, size, state) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.state = state;
	}
	
	drawCell() {		
		if(this.state == "alive"){
			c.fillStyle = aliveColor;
		}
		else{
			c.fillStyle = deadColor;		
		}
		c.fillRect(this.x, this.y, this.size, this.size);
		c.strokeRect(this.x, this.y, this.size, this.size);
	}
	
	changeState(i) {	
		if (mouse.x > this.x
		&& mouse.y > this.y
		&& mouse.x < cellSize + this.x
		&& mouse.y < cellSize + this.y) {	
			if(this.state == "alive"){
				this.state  = "dead";
			}
			else{
				this.state  = "alive";		
			}
		}
		this.drawCell();
	}
}

var mouse = {
	x: undefined,
	y: undefined
}

window.addEventListener('click',
	function(event) {
		mouse.x = event.x;
		mouse.y = event.y;
		
		c.clearRect(0, 0, canvas.width, canvas.height);
		
		for (i = 0; i < cellArray.length; i++) {
			cellArray[i].changeState(i);
		}
	}
);

window.addEventListener('resize',
	function() {
		makeGrid();
});

function makeGrid () {
canvas.width = 0.8*window.innerWidth;
canvas.height = 0.7*window.innerHeight;
	
	if (canvas.width >= canvas.height) {
		cellSize = canvas.height/gridSize;
		xCells = Math.floor(canvas.width/cellSize);
		yCells = gridSize;
	}
	else {
		cellSize = canvas.width/gridSize;
		yCells = Math.floor(canvas.height/cellSize);
		xCells = gridSize;
	}	
	drawGrid();
}


function drawGrid() {
	cellArray = [];
	for (x = 0; x < xCells; x++) {
		for (y = 0; y < yCells; y++) {
			cellArray.push(new Cell(cellSize*x, cellSize*y, cellSize, "dead"));
		}
	}

	for (i = 0; i < cellArray.length; i++) {
		cellArray[i].changeState(i);
	}
}

makeGrid();
