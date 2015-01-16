var game;
function Game()
{
	//screen boundaries
	this.screenWidth = window.innerWidth;
	this.screenHeight = window.innerHeight;
	//time between frames
	this.currTime = Date.now();
	this.prevTime = 0;
	this.delta = 0;

}
Game.prototype.initCanvas = function()
{
	//create a canvas element
	this.canvas = document.createElement('canvas');
	/*create a 2d context for drawing*/
	this.ctx = this.canvas.getContext('2d');
	//add canvas to html document
	document.body.appendChild(this.canvas);
	//make a full screen canvas to draw on
	this.canvas.width = this.screenWidth;
	this.canvas.height = this.screenHeight;
}
Game.prototype.gameLoop = function()
{
	window.requestAnimationFrame(game.gameLoop);
	game.update();
	game.draw();
}
Game.prototype.update = function()
{
	//time between frames
	this.prevTime = this.currTime;
	this.currTime = Date.now();
	this.delta = this.currTime - this.prevTime;
	if(this.currTime != this.prevTime)
		this.prevTime = this.currTime;
}
function main()
{
	game = new Game();
	//call initCanvas here
	game.initCanvas();
	game.numPlatforms = 5;
	game.platforms = [];
	

	//loadLevel() loads the level from inline xml
	//loadLevel();
	//loadLevelFromExternal() loads the level from an external xml file
	loadLevelFromExternal()

	game.draw();
	document.addEventListener("keydown", keyDownHandler, true);
	game.gameLoop();
}

//loads from inline xml
function loadLevel() {
//our xml strings
	txt = "<level1>";

	txt = txt + "<Platform>"
	txt = txt + "<x>80</x>";
	txt = txt + "<y>315</y>";
	txt = txt + "</Platform>"

	txt = txt + "<Platform>"
	txt = txt + "<x>170</x>";
	txt = txt + "<y>315</y>";
	txt = txt + "</Platform>"

	txt = txt + "<Platform>"
	txt = txt + "<x>290</x>";
	txt = txt + "<y>270</y>";
	txt = txt + "</Platform>"

	txt = txt + "<Platform>"
	txt = txt + "<x>400</x>";
	txt = txt + "<y>220</y>";
	txt = txt + "</Platform>"

	txt = txt + "<Platform>"
	txt = txt + "<x>550</x>";
	txt = txt + "<y>315</y>";
	txt = txt + "</Platform>"

	txt = txt + "</level1>";

	for (var i = 0; i < game.numPlatforms; i++) {
	var x;
	var y;
	//create a DOMParser
		if (window.DOMParser) {
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(txt, "text/xml");
			//set x/y as the currently selected x/y tags value
			x = xmlDoc.getElementsByTagName("x")[i].childNodes[0].nodeValue;
			y = xmlDoc.getElementsByTagName("y")[i].childNodes[0].nodeValue;
			//create a new platform
			game.platforms[game.platforms.length] = new Platform(x, y);
		}
		else // Internet Explorer
		{
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async = false;
			xmlDoc.loadXML(txt);
			console.log(txt.length);
		}
	}
}

//loads from external xml file
function loadLevelFromExternal()
{
	xmlDoc=loadXMLDoc("Level1.xml");
	for (var i = 0; i < game.numPlatforms; i++) {
		var x;
		var y;
		//same as before
		x = xmlDoc.getElementsByTagName("x")[i].childNodes[0].nodeValue;
		y = xmlDoc.getElementsByTagName("y")[i].childNodes[0].nodeValue;
		//create a platform
		game.platforms[game.platforms.length] = new Platform(x, y);
	}
}

//for loading from an external xml file
//source: http://www.w3schools.com/dom/dom_loadxmldoc.asp
function loadXMLDoc(filename)
{
	if (window.XMLHttpRequest)
	  {
	  xhttp=new XMLHttpRequest();
	  }
	else // code for IE5 and IE6
	  {
	  xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	xhttp.open("GET",filename,false);
	xhttp.send();
	return xhttp.responseXML;
} 

function keyDownHandler(e)
{
	if(e.keyCode == "87")//upW
	{
	}
	if(e.keyCode == "83")//downD
	{
	}
}

Game.prototype.draw = function()
{
	this.ctx.clearRect(0,0,this.screenWidth, this.screenHeight);
	//for rgb values
	var r = 0;
	var g = 250;
	var b = 154;
	this.ctx.fillStyle = rgb(r,g,b);
	this.ctx.font = "15px Arial";
	//this.ctx.fillText("Copyright (c) 2014 by Redbeards Games ltd.",10,20);

 	for (var i = 0; i < game.platforms.length; i++) {
		game.platforms[i].draw();
	}

}
/*function for rgb for convenience*/
function rgb(r, g, b)
{ return 'rgb('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(g),0,255)+', '+clamp(Math.round(b),0,255)+')';};
/*helper function*/
function clamp(value, min, max) {
if(max<min) {
var temp = min;
min = max;
max = temp;
}
return Math.max(min, Math.min(value, max));
};