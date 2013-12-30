<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
	<?php
		include 'includes/Mobile_Detect.php';
		$detect = new Mobile_Detect;
		$deviceType = ($detect->isMobile() ? ($detect->isTablet() ? 'tablet' : 'phone') : 'computer');
		$title = 'The Joy of Painting Made Yeezy';
		$description = 'Close your eyes and let the word paint a thousand pictures. One happy little tree is worth a thousand brushes.';
	?>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title><?php echo $title;?></title>
        <meta name="description" content="<?php echo $description;?>">
		<meta property="og:title" content="<?php echo $title;?>"/>
		<meta property="og:description" content="<?php echo $description;?>"/>
		<meta property="og:site_name" content="<?php echo $title?>"/>
		<meta property="og:type" content="website" />
		<!--meta property="og:audio" content="link to mp3?" /-->
		<meta property="og:url" content="http://www.paitingmadeyeezy.com" />
		<meta property="og:image" content="http://www.paitingmadeyeezy.com/img/og.png" />
        <meta name="viewport" content="width=device-width">
        <link rel="stylesheet" href="css/normalize.min.css">
		<!--link rel="stylesheet" href="css/mediaelementplayer.min.css" /-->
        <link rel="stylesheet" href="css/main.css">

        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
    </head>
    <body data-device-type="<?php echo $deviceType;?>">
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

        <header class="clearfix">
			<h1>Painting <span>made</span> <em>Yeezy</em></h1>
			<nav class="clearfix">
				<ul class='share-links clearfix'></ul>
				<ul class='soundboard clearfix'>
					<li class='tree' data-sound="tree">Happy Little Trees</li>
					<li class='mountains' data-sound="mountains">Snow Covered Mountains</li>
					<li class='cloud' data-sound="cloud">Happy Little Clouds</li>
				</ul>
				<ul class="controls clearfix">
					<li class='talk disabled'>Talk 2 Me, Bob</li>
					<li class='replay disabled'>Replay Video</li>
					<li class='pause disabled'>Pause Video</li>
					<li class='resume disabled'>Resume Video</li>
				</ul>
			</nav>
		</header>
		<section id="main">
			<article id="video">
				<div id='gif'><img alt="Kanye West, Bound 2, Yeezus"/></div>
				<video width="100%" height="100%" id="player">
				    <!-- Pseudo HTML5 -->
				    <source type="video/youtube" src="http://www.youtube.com/watch?v=BBAtAM7vtgc" />
				</video>
			</article>
			<article id='bob' class='bob-ross'>
				<div id="mouth" class='mouth'></div>
				<div id="brush" class='brush'></div>
			</article>
		</section>
		<footer>
			<p>copyright &copy; 2013 <a href="#">C</a>+<a href="#">C</a></p>
		</footer>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.10.1.min.js"><\/script>')</script>
		<script src="js/vendor/mediaelement/mediaelement-and-player.min.js"></script>
		<!--script src="js/vendor/createjs-2013.09.25.min.js"></script-->	
		<script src="http://code.createjs.com/soundjs-0.5.2.min.js"></script>
		<script src="http://code.createjs.com/preloadjs-0.4.1.min.js"></script>
		<script src="js/vendor/libgif.js" type="text/javascript" charset="utf-8"></script>
		<script>window.createjs || document.write('<script src="js/vendor/createjs-2013.09.25.min.js"><\/script>')</script>
        <script src="js/plugins.js"></script>
<?php include 'includes/_jslib.php'; 
writeJSLib('js/yeezypainter/');
?>
        <script src="js/main.js"></script>
        
        <script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		  ga('create', 'UA-46658203-1', 'paintingmadeyeezy.com');
		  ga('send', 'pageview');

		</script>
    </body>
</html>
