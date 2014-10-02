$(document).ready(function() {

	var $window = $(window);
	var $one = $('#one');
	var $two = $('#two');
	var $three = $('#three');
	var $four = $('#four');
	var cricket = $("#two .bg");
	
	var windowHeight = $window.height();
	
	$('#one, #two, #three, #four').bind('inview', function (event, visible) {
		if (visible == true) {
			$(this).addClass("inview");
			} else {
			$(this).removeClass("inview");
		}
	});
	
	function Navigation(){
		var windowHeight = $window.height(); 
		var navHeight = $('#nav').height() / 2;
		var windowCenter = (windowHeight / 2); 
		var newtop = windowCenter - navHeight;
		$('#nav').css({"top": newtop}); 
	}
	
	function movePos(x, windowHeight, pos, offset, speed){
		return x + "% " + (-((windowHeight + pos) - offset) * speed)  + "px";
	}
        
        function moveOpacity(windowHeight, pos, offset, speed){
            return ((-((windowHeight + pos) - offset) * speed) / 100);
        }
	
	function Parallax(){ 
		var pos = $window.scrollTop(); 
		if($one.hasClass("inview")){
			$one.css({'backgroundPosition': movePos(50, windowHeight, pos, 600, 0.3)}); 
		}
		if($two.hasClass("inview")){
			$two.css({'backgroundPosition': movePos(50, windowHeight, pos, 1250, 0.3)});
			cricket.css({'backgroundPosition': movePos(28, windowHeight + 250, pos, 1900, 0.6)});
                        cricket.css({'opacity': moveOpacity(windowHeight, pos, 1900, 0.6)});
		}
		if($three.hasClass("inview")){
			$three.css({'backgroundPosition': movePos(0, windowHeight, pos, 200, 0.9) + ", " + movePos(50, windowHeight, pos, 0, 0.7) + ", " + movePos(50, windowHeight, pos, 0, 0.5) + ", " + movePos(50, windowHeight, pos, 2800, 0.6)});
		}
		
		if($four.hasClass("inview")){
			$four.css({'backgroundPosition': movePos(50, windowHeight, pos, 2800, 0.3)});
		}
		
	}
		
	Navigation(); 
	
	$window.resize(function(){ 
		Parallax(); 
		Navigation();
	});		
	
	$window.bind('scroll', function(){ 
		Parallax(); 
	});
	
});