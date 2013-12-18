this.yeezypainter = this.yeezypainter || {};
(function(){
	function YeezyPainter(phrases,cuePoints){
		// ************************************************************************ 
		// PRIVATE VARIABLES AND FUNCTIONS 
		// ONLY PRIVELEGED METHODS MAY VIEW/EDIT/INVOKE 
		// ***********************************************************************
		var _node, _player, _media;
		var _phrases = phrases;
		var _cuePoints = cuePoints;
		var _cuePointPlaying;
		var _loader;
		//
		var _init = function(){
			_loader = new createjs.LoadQueue(false); 
			this.sounds = new yeezypainter.Sounds(phrases,_loader);
			this.bob = new yeezypainter.Bob(this.sounds);
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
			//console.log('init video player');
			var success = createjs.proxy(this.onVideoReady,this);
			var error = createjs.proxy(this.onVideoError,this);
			$('video').mediaelementplayer({success: success,error:error});
			
		};
		this.onVideoReady = function(media, node, player){
			//$('#' + node.id + '-mode').html('mode: ' + media.pluginType);
			console.log("video success");
			_media = media; 
			_player = player;
			_node = node;
			_media.addEventListener('canplay',createjs.proxy(this.start,this));
			_media.addEventListener('timeupdate',createjs.proxy(this.checkTime,this));	
		};
		
		this.start = function(event){
			this.bob.talk(phrases[0]);
			this.media = _media;
			_media.setVolume(0);
			_media.play();
		}
		this.checkTime = function(event){
			var t = Math.floor(event.currentTime);
			if(_cuePoints[t]&&t!=_cuePointPlaying){
				this.bob.talk(_cuePoints[t]);
				this.bob.moveBrush();
			}
			_cuePointPlaying = t;
			//	console.log(t);
		}
		
		// ************************************************************************ 
		// PUBLIC PROPERTIES -- ANYONE MAY READ/WRITE 
		// ************************************************************************ 
		this.bob = null;
		this.sounds = null;
		this.media = null;
		//
		//private initializer
		_init.call(this);
	}
	yeezypainter.YeezyPainter = YeezyPainter;
}());