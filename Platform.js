function Platform(posX,posY)
{
	this.Sprite = new Image();//our sprite
	this.Sprite.src = "textures/plat1.png"//where we are loading it from
	//dimensions
	this.SpriteWidth = 40;
	this.SpriteHeight = 8;
	//x and y positions
	this.x = posX;
	this.y = posY;
}
Platform.prototype.update = function()
{
}
Platform.prototype.draw = function()
{
//draw our platform
	game.ctx.drawImage(this.Sprite, this.x, this.y,this.SpriteWidth *2,this.SpriteHeight *2);
}