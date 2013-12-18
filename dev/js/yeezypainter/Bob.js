this.yeezypainter = this.yeezypainter || {};
(function(){
	function Bob(sounds){
		var _init = function(){
			
		};
		this.sounds = sounds;
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