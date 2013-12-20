this.yeezypainter = this.yeezypainter || {};
(function(){
	function Bob(id,sounds){
		var _init = function(){
			this.container = $(id);
			this.mouth = $(id+'>.mouth');
			this.brush = $(id+'>.brush');
		};
		this.sounds = sounds;
		this.container = null;
		this.mouth = null;
		this.brush = null;
		_init.call(this);
	}
	var p = Bob.prototype;
	p.talk = function(phrase){
		switch(phrase){
			case 'letsdoit':
				this.mouth.animate({top:'3%'},200).animate({top:0},100).animate({top:'3%'},100).animate({top:0},100);				
			break;
			case 'asyouwant':
			case 'cloud':
				this.mouth.animate({top:'3%'},200).animate({top:0},100).animate({top:'3%'},100).animate({top:0},100).animate(
				{top:'2%'},100).animate({top:'3%'},100).animate({top:0},100).animate(
					{top:'2%'},100).animate({top:'3%'},100).animate({top:0},100).animate(
						{top:'2%'},100).animate({top:'3%'},200).animate({top:0},100);
			break;
			case "tree":
				this.mouth.animate({top:'3%'},200).animate({top:'1%'},100).animate({top:'3%'},100).animate({top:0},100).animate(
					{top:'3%'},200).animate({top:'1%'},100).animate({top:'3%'},100).animate({top:0},100).animate(
						{top:'1%'},100).animate({top:'3%'},100).animate({top:0},100);
			break;
			case 'knife':
				this.mouth.animate({top:'3%'},200).animate({top:'1%'},100).animate({top:'3%'},100).animate({top:0},100).animate(
					{top:'3%'},100).animate({top:0},100);
			break;
			case 'littlepaint':
			case 'yellowochre':
				this.mouth.animate({top:'3%'},200).animate({top:'1%'},100).animate({top:'3%'},100).animate(
				{top:0},100).animate({top:'3%'},200).animate({top:'1%'},100).animate(
					{top:'3%'},100).animate({top:0},100).animate({top:'3%'},100).animate({top:0},100);
			break;
			break;
			default:
				this.mouth.animate({top:'3%'},200).animate({top:'1%'},100).animate({top:'3%'},100).animate(
					{top:0},100).animate({top:'3%'},200).animate({top:'1%'},100).animate({top:'3%'},100).animate({top:0},100);
			break;
			
		}
		this.sounds.playSound(phrase);
	}
	p.moveBrush = function(){
	//	console.log('movebrush');
	}
	yeezypainter.Bob = Bob;
}());

