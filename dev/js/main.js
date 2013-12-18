var app;
$(document).ready(function(){
	
	var desc = $("meta[name=description]").attr('content');
    var title = $(document).find("title").text();
	$('.share-links').shareLinks({
		media:'facebook,twitter,email',
		description:desc,
		title:title
	});
	
	var cuePoints = {
		2:'mountains',
		9:'cloud',
		4:'tree',
		12:'asyouwant',
		15:'dream',
		17:'littlepaint',
		19:'titaniumwhite',
		24:'cloud',
		29:'bush',
		32:'yellowochre',
		34:'knife',
		38:'titaniumwhite',
		39:'cloud',
		41:'mountains',
		44: 'therewego',
		47:'cloud',
		49:'therewego',
		52: 'therewego',
		54:'verythick',
		59:'cornerofbrush',
		62:'mountains',
		67:'truestory',
		72:'yellowochre',
		76:'highlight',
		86:'tree',
		90:'portraits',
		100:'yellowochre',
		103:'highlight',
		106:'tree',
		108:"therewego",
		103:'highlight',
		117:'therewego',
		122:'cornerofbrush',
		125:'truestory',
		128:'therewego',
		134:'therewego',
		146:"verythick",
		148:'cornerofbrush',
		158: 'truestory'
	};
	var phrases = [
		'letsdoit',
		'cloud',
		'tree',
		'knife',
		'mountains',
		'cornerofbrush',
		'littlepaint',
		'therewego',
		'highlight',
		'truestory',
		'portraits',
		'knack',
		'titaniumwhite',
		'dream',
		'asyouwant',
		'verythick',
		'bush',
		'yellowochre'
	];
	app = new yeezypainter.YeezyPainter(phrases,cuePoints);
	app.loadAssets();
});

/*
$(document).ready(function(){
	var node, player, media;
	var KRoss = {
		node:null,
		media:null,
		player:null,
		mouth:null,
		chin:null,
		brush:null,
		phrases:['cloud','tree','knife','letsdoit','mountains','cornerofbrush','littlepaint','therewego','highlight',
				'truestory','portraits','knack','titaniumwhite','dream','asyouwant','verythick','bush','yellowochre'],
		sounds:{},
		ready:false,
		playerReady:false,
		loader:null,
		cuePoints:{
			2:'mountains',
			9:'cloud',
			4:'tree',
			12:'asyouwant',
			15:'dream',
			17:'littlepaint',
			19:'titaniumwhite',
			24:'cloud',
			29:'bush',
			32:'yellowochre',
			34:'knife',
			38:'titaniumwhite',
			39:'cloud',
			41:'mountains',
			44: 'therewego',
			47:'cloud',
			49:'therewego',
			52: 'therewego',
			54:'verythick',
			59:'cornerofbrush',
			62:'mountains',
			67:'truestory',
			72:'yellowochre',
			76:'highlight',
			86:'tree',
			90:'portraits',
			100:'yellowochre',
			103:'highlight',
			106:'tree',
			108:"therewego",
			103:'highlight',
			117:'therewego',
			122:'cornerofbrush',
			125:'truestory',
			128:'therewego',
			134:'therewego',
			146:"verythick",
			148:'cornerofbrush',
			158: 'truestory'
		},
		cuePointPlaying:null,
		
		init:function(event){
			if(event) this.loader = event.currentTarget;
			this.chin = $('#bob>.chin');
			this.mouth = $('#bob>.mouth');
			this.brush = $('#bob>.brush');
			$('.talk').click(createjs.proxy(this.talk,this));
			this.ready = true;
			this.initVideo();
		},
		initVideo:function(){
			$('video').mediaelementplayer({
				success: function(media, node, player) {
					//$('#' + node.id + '-mode').html('mode: ' + media.pluginType);
					KRoss.player = player;
					KRoss.node = node;
					KRoss.media = media; 
					media.addEventListener('canplay',createjs.proxy(KRoss.start,KRoss));
					media.addEventListener('timeupdate',createjs.proxy(KRoss.checkTime,KRoss))
				},error:function(){

				}
			});
		},
		start:function(){
			this.talk(null,'letsdoit');
			this.media.setVolume(.1);
			this.media.play();
		},
		checkTime:function(event){
			var t = Math.floor(event.currentTime);
			if(this.cuePoints[t]&&t!=this.cuePointPlaying){
				this.talk(null,this.cuePoints[t]);
				this.moveBrush();
			}
			this.cuePointPlaying = t;
		//	console.log(t);
		},
		moveBrush:function(){
			this.brush.animate({top:180,left:130},100).animate({top: 187,left:135},100).animate(
				{top:185,left:133},100).animate({top: 187,left:135},100).animate(
					{top:182,left:132},100).animate({top: 187,left:135},100);
		},
		talk:function(event,phrase){
			if(!phrase){
				phrase = this.phrases[Math.floor(this.phrases.length*Math.random())];
			}
			console.log(phrase);
			switch(phrase){
				
			}
			if(this.loader){
				if(this.sounds[phrase]) {
					this.sounds[phrase].play();
				}else {
					this.sounds[phrase]=createjs.Sound.play(this.loader.getResult(phrase).src);
				}
			}
		}
	}
	var Sounds = {
		loader:null,
		soundEnabled:false,
		audioPath:'sound/',
		preloadSounds:function(ids){
			this.loader = new createjs.LoadQueue(false);
			manifest = [];
			if(createjs.Sound.initializeDefaultPlugins()){
				//add audio to manifest
				this.soundEnabled = true;
				for(var i=0;i < ids.length; i++){
					manifest.push({id:ids[i], src:this.audioPath+ids[i]+'.mp3|'+this.audioPath+ids[i]+'.ogg'});
				}
				createjs.Sound.registerPlugin(createjs.HTMLAudioPlugin);  // need this so it doesn't default to Web Audio
				this.loader.installPlugin(createjs.Sound);
				this.loader.addEventListener("complete", createjs.proxy(KRoss.init,KRoss));
				this.loader.loadManifest(manifest);					
			}else {
				KRoss.init();
			}
		}
	}
	//*
	var desc = $("meta[name=description]").attr('content');
    var title = $(document).find("title").text();

	$('.social').shareLinks({
		media:'facebook,twitter,google,email',
		description:desc,
		title:title
	});
	Sounds.preloadSounds(KRoss.phrases);						
	window.KRoss = KRoss;
});

*/