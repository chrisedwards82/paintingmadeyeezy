this.yeezypainter = this.yeezypainter || {};
(function(){
	function YeezyPainter(phrases,cuePoints){
		// ************************************************************************ 
		// PRIVATE VARIABLES AND FUNCTIONS 
		// ONLY PRIVELEGED METHODS MAY VIEW/EDIT/INVOKE 
		// ***********************************************************************
		var _node, _player, _media;
		var _loader;
		var _init = function(){
			_loader = new createjs.LoadQueue(false); 
			this.sounds = new yeezypainter.Sounds(phrases,_loader);
			this.bob = new yeezypainter.Bob();
		};
		// ************************************************************************ 
		// PRIVILEGED METHODS 
		// MAY BE INVOKED PUBLICLY AND MAY ACCESS PRIVATE ITEMS 
		// MAY NOT BE CHANGED; MAY BE REPLACED WITH PUBLIC FLAVORS 
		// ************************************************************************
		this.loadAssets = function(){
			var manifest;
			if(this.sounds.isSoundEnabled()){
				manifest = this.sounds.getManifest();
			} else {
				manifest = [];
			}
			//appened additional asssets to manifest if needed
			_loader.addEventListener("complete", createjs.proxy(this.assetsLoaded,this));
			_loader.loadManifest(manifest);
		};
		this.assetsLoaded = function(){
			this.initVideoPlayer();
		};
		
		this.initVideoPlayer = function(){
			console.log('init video player');
			$('video').mediaelementplayer({
				success: function(media, node, player) {
					//$('#' + node.id + '-mode').html('mode: ' + media.pluginType);
					console.log("video success");
					/*
					KRossplayer = player;
					KRoss.node = node;
					KRoss.media = media; 
					media.addEventListener('canplay',createjs.proxy(KRoss.start,KRoss));
					media.addEventListener('timeupdate',createjs.proxy(KRoss.checkTime,KRoss))
					*/
				},error:function(){

				}
			});
		};
		
	
	
		// ************************************************************************ 
		// PUBLIC PROPERTIES -- ANYONE MAY READ/WRITE 
		// ************************************************************************ 
		this.bob = null;
		this.sounds = null;
		//
		//private initializer
		_init.call(this);
	}
	yeezypainter.YeezyPainter = YeezyPainter;
}());