this.yeezypainter = this.yeezypainter || {};
(function(){
	function Sounds(phrases,loader){
		var _soundEnabled = false;
		var _sounds = {}, _loader = loader, _ids = phrases;
		var _init = function(){
			if(createjs.Sound.initializeDefaultPlugins()){
				//add audio to manifest
				_soundEnabled = true;
				createjs.Sound.registerPlugin(createjs.HTMLAudioPlugin);  // need this so it doesn't default to Web Audio
				loader.installPlugin(createjs.Sound);			
			}
		}
		this.isSoundEnabled = function(){
			return _soundEnabled;
		};
		this.getManifest = function(){
			var manifest = [];
			for(var i=0;i < _ids.length; i++){
				manifest.push({id:_ids[i], src:this.audioPath+_ids[i]+'.mp3|'+this.audioPath+_ids[i]+'.ogg'});
			}
			return manifest;
		};
		this.playSound = function(id){
			if(this.isSoundEnabled()){
				if(_sounds[id]) {
					return _sounds[id].play();
				}else {
					_sounds[id]=createjs.Sound.play(_loader.getResult(id).src);
				}
			}
			return null;
		}
		this.audioPath = 'sound/';
		//
		_init.call(this);
	}
	var p = Sounds.protype;
	yeezypainter.Sounds = Sounds;
	
}());