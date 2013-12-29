this.yeezypainter = this.yeezypainter || {};
(function(){
	function GIFPlayer(gifs,loader){
		var _gifs = gifs;
		var _loader = loader;
		var _init = function(){
			//
		};
		this.supergif = null;
		this.assetPath = 'img/gif/';
		this.getManifest = function(){
			var manifest = [];
			var i = 0;
			for(i=0;i<_gifs.length;i++){
				manifest.push({id:_gifs[i].id,src:this.assetPath+_gifs[i].src});
			}
			return manifest;
		};
		this.play = function(){
			console.log('GPlayer.play = play gifs');
		};
		_init.call(this);
	};
	var p = GIFPlayer.prototype;
	//
	createjs.EventDispatcher.initialize(GIFPlayer);
	yeezypainter.GIFPlayer = GIFPlayer;
}());