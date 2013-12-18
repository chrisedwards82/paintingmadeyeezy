this.yeezypainter = this.yeezypainter || {};
(function(){
	function Bob(id,sounds){
		var _init = function(){
			this.container = $(id);
			this.mouth = $(id+'>.mouth');
			this.chin = $(id+'>.chin');
			this.brush = $(id+'>.brush');
		};
		this.sounds = sounds;
		this.container = null;
		this.mouth = null;
		this.chin = null;
		this.brush = null;
		_init.call(this);
	}
	var p = Bob.prototype;
	p.talk = function(phrase){
		switch(phrase){
			default:
				console.log(phrase);
			break;
			
		}
		this.sounds.playSound(phrase);
	}
	p.moveBrush = function(){
		console.log('movebrush');
	}
	yeezypainter.Bob = Bob;
}());

/*
case "tree":
	this.chin.animate({top:174},200).animate({top:171},100).animate({top:175},100).animate({top:167},100).animate(
		{top:174},200).animate({top:171},100).animate({top:175},100).animate({top:167},100).animate(
			{top:171},100).animate({top:175},100).animate({top:167},100);
	
break;
case 'knife':
	this.chin.animate({top:174},200).animate({top:171},100).animate({top:175},100).animate({top:167},100).animate(
		{top:175},100).animate({top:167},100);
	
break;
case 'asyouwant':

case 'cloud':
	this.chin.animate({top:174},200).animate({top:171},100).animate({top:175},100).animate({top:167},100).animate(
		{top:171},100).animate({top:175},100).animate({top:167},100).animate(
			{top:171},100).animate({top:175},100).animate({top:167},100).animate(
				{top:171},100).animate({top:175},100).animate({top:167},100);
	
break;
case 'letsdoit':
	this.chin.animate({top:174},200).animate({top:171},100).animate({top:175},100).animate({top:167},100);				
break;
case 'littlepaint':
case 'yellowochre':
	this.chin.animate({top:174},200).animate({top:171},100).animate({top:175},100).animate(
	{top:167},100).animate({top:174},200).animate({top:171},100).animate(
		{top:175},100).animate({top:167},100).animate({top:175},100).animate({top:167},100);
break;

default:
	this.chin.animate({top:174},200).animate({top:171},100).animate({top:175},100).animate(
	{top:167},100).animate({top:174},200).animate({top:171},100).animate({top:175},100).animate({top:167},100);
break;
*/