this.yeezypainter = this.yeezypainter || {};
(function(){
	function GIFPlayer(data,loader){
		var _data = data;
		var _loader = loader;
		var _currentGIF = 0, _superGIFs;
		var _gifWrap, _gif,_proxyGIFLoaded;
		var _int, _proxynf, _rate = 100;
		var _init = function(){
			//
			_gifWrap = document.getElementById('gif');
			_gif = _gifWrap.firstChild;
			_gifWrap.removeChild(_gif);
			_superGIFs = [];
			_proxynf = createjs.proxy(_nextFrame,this);
			_proxyGIFLoaded = createjs.proxy(_gifLoaded,this);
		};
		var _nextGIF = function(){
			console.log('nextGIF');
			var event; 
			if(_currentGIF < _data.length-1){
				_currentGIF++;
				event = new createjs.Event(GIFPlayer.NEXT_GIF);
				event.params = {index:_currentGIF};
				this.dispatchEvent(event);
				this.play();
			}else {
				_currentGIF = 0;
				event = new createjs.Event(GIFPlayer.COMPLETE);
				this.dispatchEvent(event);
			}
		}
		var _nextFrame = function(){
			var currentFrame = this.supergif.get_current_frame();
			var totalFrames = this.supergif.get_length();
			var data = _data[_currentGIF];	
			var event = new createjs.Event(GIFPlayer.PROGRESS);
			event.params = {currentFrame:currentFrame,totalFrames:totalFrames};
			if(data.cuePoints){
				event.params.cuePoint = data.cuePoints[currentFrame];
			}
			this.dispatchEvent(event);
			if(currentFrame<=totalFrames){
				//console.log('_nextframe',currentFrame,totalFrames);
				//this.supergif.move_to(currentFrame+1);
				this.supergif.move_relative(1);
				_int = setTimeout(_proxynf,_rate);
			}else {
				_nextGIF.call(this);
			}
		};
		this.getManifest = function(){
			var manifest = [];
			var i = 0;
			for(i=0;i<_data.length;i++)
			{
				manifest.push({id:_data[i].id,src:this.assetPath+_data[i].src});
			}
			return manifest;
		};
		var _clearWrap = function(){
			if(this.supergif){
				_gifWrap.removeChild(this.supergif.get_canvas().parentNode);
			}
		}
		var _createGIF = function(i){
			_gif.setAttribute('rel:animated_src',this.assetPath+_data[i].src);
			_clearWrap.apply(this);
			_gifWrap.appendChild(_gif);
			this.supergif = _superGIFs[i] = new SuperGif({gif:_gif,auto_play:false});
			this.supergif.load(_proxyGIFLoaded);
		};
		var _gifLoaded = function(params){
			this.dispatchEvent(GIFPlayer.GIF_LOADED);
			_nextGIF.call(this);
		};
		
		this.play = function(){
			if(!_superGIFs[_currentGIF]){
				_createGIF.call(this,_currentGIF);
			}else {
				_clearWrap.call(this);
				this.supergif = _superGIFs[_currentGIF];
				_gifWrap.appendChild(this.supergif.get_canvas().parentNode);
				this.supergif.move_to(0);
				_nextFrame.call(this);
			}
		
		};
		this.stop=function(){
			clearTimeout(_int);
		}
		this.get_current_gif = function(){
			return _data[_currentGIF];
		}
		this.supergif = null;
		this.assetPath = 'img/gif/';
		_init.call(this);
	};
	var p = GIFPlayer.prototype;
	
	
	//
	GIFPlayer.CUE_POINT = 'cuePoint';
	GIFPlayer.GIF_LOADED = 'gifLoaded';
	GIFPlayer.NEXT_GIF = 'nextgif';
	GIFPlayer.COMPLETE = 'complete';
	GIFPlayer.PROGRESS = 'progress';
	//
	createjs.EventDispatcher.initialize(GIFPlayer.prototype);
	yeezypainter.GIFPlayer = GIFPlayer;
}());