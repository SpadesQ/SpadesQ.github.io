$(document).ready(function() {

<!-- Sort/View Gallery -->
var $filterType = $('#filterOptions li.active a').attr('class');
var $holder = $('ul.holder');
var $data = $holder.clone();

$('#filterOptions li a').click(function(e) {
	
	$('#filterOptions li').removeClass('active');
	
	var $filterType = $(this).attr('class');
	$(this).parent().addClass('active');
	
	if ($filterType == 'all') {
		var $filteredData = $data.find('li');
	} 
	else {
		var $filteredData = $data.find('li[data-type~=' + $filterType + ']');
	}
	
	// call quicksand
	$holder.quicksand($filteredData, {
		duration: 800,
		easing: 'easeInOutQuad'
		},
		function() {
			galleryHover();
	});
	return false;
});

<!-- Function for gallery img rollover -->
galleryHover();

function galleryHover() {
	$('.gallery-item').hover(function(){
			if ( $.browser.msie && $.browser.version < 9 ) {
				$(this).find(".gallery-thumb img").css("opacity","0.7");
			} else {
				$(this).find('.shade-thumb').stop('true','true').fadeTo("normal",1);
			}
			$(this).find('.project-title').css("color","#fa9152");
			$(this).find('.project-details').css("background","#1c1b19 url(images/details-bg.png) bottom no-repeat");
	},
		function(){
			if ( $.browser.msie && $.browser.version < 9 ) {
				$(this).find(".gallery-thumb img").css("opacity","1");
			} else {
				$(this).find('.shade-thumb').stop('true','true').fadeTo("normal",0);
			}
			$(this).find('.project-title').css("color","#f6da96");
			$(this).find('.project-details').css("background","#21201e");
	});
	
	<!-- img rollover zoom icon-->
	$('.img-zoom').css("display", "none");
	$('.shade-thumb').hover(function(){
			$(this).find('.img-zoom').stop('true','true').fadeTo("normal",1);
	},
		function(){
			$(this).find('.img-zoom').stop('true','true').fadeTo("normal",0);
	});
}

<!-- Work around for PrettyPhoto HTML Validation -->
$('a.gallery-thumb[data-rel]').each(function() {
    $(this).attr('rel', $(this).data('rel'));
});

<!-- Rollover for gallery widget -->
$('.widget-thumb').hover(function(){
		$(this).find('.shade-thumb').stop('true','true').fadeTo("normal",1);
},
	function(){
		$(this).find('.shade-thumb').stop('true','true').fadeTo("normal",0);
});

<!-- Back to Top -->
	$(function() {
	$(window).scroll(function() {
		if($(this).scrollTop() != 0) {
			$('#toTop').fadeIn();	
		} else {
			$('#toTop').fadeOut();
		}
	});
 
	$('#toTop').click(function() {
		$('body,html').animate({scrollTop:0},800);
	});	
});

<!-- Top Banner Slide Down -->
$('#open-banner').click(function() {
		$('.top-banner').animate({ top: '0px'}, {duration: 500, easing: 'easeOutQuart'});
		$(this).hide();
		$('#close-banner').show();
	});
$('#close-banner').click(function() {
		$('.top-banner').animate({ top: '-175px'}, {duration: 500, easing: 'easeInQuart'});
		$(this).hide();
		$('#open-banner').show();
	});
	
});