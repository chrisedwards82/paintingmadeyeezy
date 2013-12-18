this.yeezypainter = this.yeezypainter || {};
(function(){
	function Sounds(phrases,loader){
		var _soundEnabled = false;
		var _sounds = {};
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
			var ids = phrases;
			var manifest = [];
			for(var i=0;i < ids.length; i++){
				manifest.push({id:ids[i], src:this.audioPath+ids[i]+'.mp3|'+this.audioPath+ids[i]+'.ogg'});
			}
			return manifest;
		};
		this.audioPath = 'sound/';
		_init.call(this);
	}
	yeezypainter.Sounds = Sounds;
	
}());