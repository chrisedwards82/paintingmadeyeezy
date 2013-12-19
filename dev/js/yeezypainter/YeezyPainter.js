this.yeezypainter = this.yeezypainter || {};
(function(){
	function YeezyPainter(phrases,cuePoints){
		// ************************************************************************ 
		// PRIVATE VARIABLES AND FUNCTIONS 
		// ONLY PRIVELEGED METHODS MAY VIEW/EDIT/INVOKE 
		// ***********************************************************************
		var _node, _player;
		var _phrases = phrases;
		var _cuePoints = cuePoints;
		var _cuePointPlaying;
		var _loader;
		//
		var _init = function(){
			_loader = new createjs.LoadQueue(false); 
			this.sounds = new yeezypainter.Sounds(phrases,_loader);
			this.bob = new yeezypainter.Bob('#bob',this.sounds);
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
			this.dispatchEvent(YeezyPainter.ASSETS_LOADED); 
		};
		
		this.initVideoPlayer = function(){
			//console.log('init video player');
			var success = createjs.proxy(this.onVideoReady,this);
			var error = createjs.proxy(this.onVideoError,this);
			$('video').mediaelementplayer({success: success,error:error,startVolume: 0.1});
			
		};
		this.onVideoReady = function(media, node, player){
			//$('#' + node.id + '-mode').html('mode: ' + media.pluginType);
			console.log("video success");
			this.media = media; 
			_player = player;
			_node = node;
			this.media.addEventListener('ended',createjs.proxy(this.ended,this));
			this.media.addEventListener('canplay',createjs.proxy(function(event){
				this.dispatchEvent(YeezyPainter.VIDEO_READY);	
			},this));
			this.media.addEventListener('timeupdate',createjs.proxy(this.checkTime,this));
		};
		
		this.onVideoError = function(evt){
			console.log('onVideoError',evt);
		}
		
		this.start = function(event){
			this.bob.talk(phrases[0]);
			this.media.setVolume(0);
			this.media.play();
		};
		this.checkTime = function(event){
			var t = Math.floor(event.currentTime);
			if(_cuePoints[t]&&t!=_cuePointPlaying){
				this.bob.talk(_cuePoints[t]);
				this.bob.moveBrush();
			}
			_cuePointPlaying = t;
			//	console.log(t);
		};
		this.stop = function(){
			this.media.stop();
		}
		this.ended = function(event){
			console.log('video ended');
			this.dispatchEvent(YeezyPainter.VIDEO_ENDED);
		};
		
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
	// ************************************************************************ 
	//  STATIC PROPERTIES -- ANYONE MAY READ/WRITE 
	// ************************************************************************
	//
	// Events
	YeezyPainter.VIDEO_ENDED = 'videoEnded';
	YeezyPainter.ASSETS_LOADED = 'assetsLoaded';
	YeezyPainter.VIDEO_READY = 'videoReady';
	//
	createjs.EventDispatcher.initialize(YeezyPainter.prototype);
	yeezypainter.YeezyPainter = YeezyPainter;
}());

