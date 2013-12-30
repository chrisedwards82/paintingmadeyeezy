this.yeezypainter = this.yeezypainter || {};
(function(){
	function YeezyPainter(phrases,cuePoints,gifs,showFallback){
		// ************************************************************************ 
		// PRIVATE VARIABLES AND FUNCTIONS 
		// ONLY PRIVELEGED METHODS MAY VIEW/EDIT/INVOKE 
		// ***********************************************************************
		var _node, _player;
		var _phrases = phrases;
		var _cuePoints = cuePoints;
		var _cuePointPlaying;
		var _loader, _loadListener;
		var _showFallback = showFallback;
		//
		var _init = function(){
			_loader = new createjs.LoadQueue(false); 
			this.sounds = new yeezypainter.Sounds(phrases,_loader);
			this.bob = new yeezypainter.Bob('#bob',this.sounds);
			this.gifs = new yeezypainter.GIFPlayer(gifs,_loader); 
		};
		var _checkPlayback = function(){
			var notPlaying = setTimeout(createjs.proxy(function(){
				_showFallback = true;
				this.dispatchEvent(YeezyPainter.VIDEO_FAIL);
			},this) ,1000);
			this.media.addEventListener('playing',createjs.proxy(function(event){
				clearTimeout(notPlaying);
				_showFallback = false;
			},this));
		}
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
			if(_showFallback){
				manifest = manifest.concat(this.gifs.getManifest());
			}
			console.log('manifest:',manifest);
			//appened additional asssets to manifest if needed
			_loadListener = createjs.proxy(this.assetsLoaded,this);
			_loader.addEventListener("complete", _loadListener);
			_loader.loadManifest(manifest);
		};
		this.assetsLoaded = function(){
			console.log('assetsLoaded');
			_loader.removeEventListener('complete', _loadListener);
			this.dispatchEvent(YeezyPainter.ASSETS_LOADED); 
		};
		this.loadGIFs = function(){
			_loadListener = createjs.proxy(this.gifsLoaded,this);
			_loader.addEventListener("complete", _loadListener);
			_loader.loadManifest(this.gifs.getManifest());
			this.gifs.addEventListener(yeezypainter.GIFPlayer.PROGRESS,createjs.proxy(this.gifProgress,this));
			this.gifs.addEventListener(yeezypainter.GIFPlayer.CUE_POINT,createjs.proxy(this.gifProgress,this));

			//this.gifsLoaded();
		};
		this.gifProgress = function(event) {
			//console.log('gifProgress',event.params);
			if(event.params.cuePoint){
				this.bob.talk(event.params.cuePoint);
			}
		}
		this.gifsLoaded = function(event){
			console.log('gifsLoaded');
			_loader.removeEventListener('complete', _loadListener);
			this.dispatchEvent(YeezyPainter.GIFS_READY);
		};
		this.initVideoPlayer = function(){
			//console.log('init video player');
			var success = createjs.proxy(this.onVideoReady,this);
			var error = createjs.proxy(this.onVideoError,this);
			$('video').mediaelementplayer({success: success,error:error,startVolume: 0.1});	
		};
		this.killVideoPlayer = function(){
			this.media.remove();
			_player.remove();
			_node.remove();
		};
		this.onVideoReady = function(media, node, player){
			//$('#' + node.id + '-mode').html('mode: ' + media.pluginType);
			//console.log("video success",media,node,player);
			//console.log(media.duration);
			_player = player;
			_node = node;
			this.media = media;
			this.media.addEventListener('ended',createjs.proxy(this.ended,this));
			this.media.addEventListener('canplay',createjs.proxy(this.canPlay,this));
			this.media.addEventListener('timeupdate',createjs.proxy(this.checkTime,this));
		};
	
		this.canPlay = function(event){
			//console.log(event);
			this.dispatchEvent(YeezyPainter.VIDEO_READY);
		};
		
		this.onVideoError = function(evt){
			_showFallback = true;
			console.log('onVideoError',evt);
			this.dispatchEvent(YeezyPainter.VIDEO_FAIL);
			// GIF Fallback
			// http://www.aux.tv/2013/11/18-awkward-gifs-from-kanye-wests-bound-2-video/
			// http://www.popsugar.com/Kanye-West-Bound-2-Music-Video-GIFs-32537986
		};
		this.start = function(event){
			this.bob.talk(phrases[0]);
			//this.media.setVolume(0);
			if(_showFallback){
				this.gifs.play();
			}else{
				this.media.play();
				_checkPlayback.apply(this);
			}
		
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
		this.resume = function(){
			this.media.play();
		}
		this.pause = function(){
			this.media.pause();
		}
		this.replay = function(){
			if(_showFallback){
				console.log('replay');
				this.gifs.play();
			}else{
				this.media.load(this.media.src);
				this.bob.talk(phrases[0]);
				_checkPlayback.apply(this);
			}
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
		this.gifs = null;
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
	YeezyPainter.VIDEO_FAIL = 'videoFail';
	YeezyPainter.GIFS_READY = 'gifsReady';
	//
	createjs.EventDispatcher.initialize(YeezyPainter.prototype);
	yeezypainter.YeezyPainter = YeezyPainter;
}());

