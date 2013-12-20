var app, test_sound;
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
	test_sound = phrases[7];
	app = new yeezypainter.YeezyPainter(phrases,cuePoints);
	app.addEventListener(yeezypainter.YeezyPainter.ASSETS_LOADED,createjs.proxy(app.initVideoPlayer,app));
	app.addEventListener(yeezypainter.YeezyPainter.VIDEO_READY,function(){
		app.media.setVolume(.15);
		app.start();
	});
	app.addEventListener(yeezypainter.YeezyPainter.VIDEO_ENDED,function(){
		//show/hide buttons here
		$('.replay').click(function(){
			app.start();
		});
	});
	app.addEventListener(yeezypainter.YeezyPainter.ASSETS_LOADED,function(){
		//show/hide buttons here
		$('.talk').click(function(){
			app.bob.talk(test_sound);
		});
	});
	$(app.bob.container).click(function(){
		if($(this).attr('data-paused')=='1'){
			app.start();
			$(this).attr('data-paused','0');
					
		}else{
			$(this).attr('data-paused','1');
			app.stop();		
		}
	});
	app.loadAssets();
});
