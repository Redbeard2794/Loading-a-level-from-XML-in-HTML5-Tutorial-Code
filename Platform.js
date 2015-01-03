function Platform(posX,posY)
{
	this.Sprite = new Image();
	this.Sprite.src = "textures/plat1.png"
	this.SpriteWidth = 40;
	this.SpriteHeight = 8;
	this.x = posX;
	this.y = posY;
}
Platform.prototype.update = function()
{
}
Platform.prototype.draw = function()
{
	game.ctx.drawImage(this.Sprite, this.x, this.y,this.SpriteWidth *2,this.SpriteHeight *2);
}