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
	app.addEventListener(yeezypainter.YeezyPainter.VIDEO_READY,function(){
		app.media.setVolume(.15);
		app.start();
		$('.controls>li').addClass('disabled');
		$('.pause').removeClass('disabled');
		
	});
	//intro ui and initialize video player, video will start on player intialized
	app.addEventListener(yeezypainter.YeezyPainter.ASSETS_LOADED,function(){
		//show/hide buttons here
		$('.talk').click(function(){
			app.bob.talk(test_sound);
		});
		$('body').addClass('intro');
		$('#main').css({right:'-100%'});
		$('#main').show();
		$('#main').animate({right:0},500,function(){
			app.initVideoPlayer();
			$('#main').attr('style','display: block;')
			$('body').removeClass('intro');	
		});
	});
	//
	app.addEventListener(yeezypainter.YeezyPainter.VIDEO_ENDED,function(){
		//show/hide buttons here
		$('.controls>li').addClass('disabled');
		$('.replay').removeClass('disabled');
	});
	$('.replay').click(function(){
		app.start();
	});
	$('.pause').click(function(){
		app.pause();
		$(this).addClass('.disabled');
		$('.resume').removeClass('.disabled');	
	});
	$('.resume').click(function(){
		app.resume();
		$(this).addClass('.disabled');
		$('.pause').removeClass('.disabled');
	});
	app.loadAssets();
});
