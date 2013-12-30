this.yeezypainter = this.yeezypainter || {};
(function(){
	function GIFPlayer(files,loader){
		var _files = files;
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
			if(_currentGIF < _files.length-1){
				_currentGIF++;
				this.dispatchEvent(GIFPlayer.NEXT_GIF);
				this.play();
			}else {
				_currentGIF = 0;
				this.dispatchEvent(GIFPlayer.COMPLETE);
			}
		}
		var _nextFrame = function(event){
			var currentFrame = this.supergif.get_current_frame();
			var totalFrames = this.supergif.get_length();	
			this.dispatchEvent(GIFPlayer.PROGRESS);
			if(currentFrame<totalFrames-1){
				console.log('_nextframe',currentFrame,totalFrames);
				this.supergif.move_to(currentFrame+1);
				_int = setTimeout(_proxynf,_rate);
			}else {
				_nextGIF.call(this);
			}
		};
		this.getManifest = function(){
			var manifest = [];
			var i = 0;
			for(i=0;i<_files.length;i++)
			{
				manifest.push({id:_files[i].id,src:this.assetPath+_files[i].src});
			}
			return manifest;
		};
		var _clearWrap = function(){
			if(this.supergif){
				_gifWrap.removeChild(this.supergif.get_canvas().parentNode);
			}
		}
		var _createGIF = function(i){
			var gif = _gif;//.cloneNode(false);
			gif.setAttribute('rel:animated_src',this.assetPath+_files[i].src);
			_clearWrap.apply(this);
			_gifWrap.appendChild(gif);
			this.supergif = _superGIFs[i] = new SuperGif({gif:gif,auto_play:false});
			this.supergif.load(_proxyGIFLoaded);
		};
		var _gifLoaded = function(params){
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
		this.supergif = null;
		this.assetPath = 'img/gif/';
		_init.call(this);
	};
	var p = GIFPlayer.prototype;
	//
	GIFPlayer.NEXT_GIF = 'nextgif';
	GIFPlayer.COMPLETE = 'complete';
	GIFPlayer.PROGRESS = 'progress';
	//
	createjs.EventDispatcher.initialize(GIFPlayer.prototype);
	yeezypainter.GIFPlayer = GIFPlayer;
}());