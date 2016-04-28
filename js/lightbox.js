$(document).ready(function() {
	
	$('#script-message').hide();
	
	$('.gallery a').click(function(e) {
		addOverlay();
		$(this).addClass('current');
		$('<div id="lightbox"></div>') //adds the container div for the images
		.appendTo('body');
		
		$('<span class="container"></span>').appendTo('#lightbox');
						
		$('<img />').attr('src',$(this).attr('href'))
		.prependTo('.container')
		.load(function() {
			positionLightbox();
		});
		
		$('<div class="content"><h1></h1><p></p></div>').appendTo('.container');
		
		//adds content to picture
		$('.content h1').text($('.current img').attr('alt'));
		$('.content p').text($(this).attr('title'));			
		e.preventDefault();
	});
	
	$('.video a').click(function(e) {
		addOverlay();
		$('<iframe width="640" height="480" frameborder="0" allowfullscreen></iframe>').attr('src',$(this).attr('href'))
		.appendTo('#lightbox')
		.load(function() {
            positionLightbox();
        });
		e.preventDefault();
	});	
});

function addOverlay(){
	$('body').css('overflow-y', 'hidden');
	
	$('<div id="overlay"></div>')
	.css('top', $(document).scrollTop()) //checks for the amount scrolled
	.css('opacity', '0') //sets opacity at start
	.animate({'opacity': '0.8'}, 'slow') //animates opacity up
	.appendTo('body') //adds overlay to body
	.click(function(e) {
		removeLightbox(); //removes lightbox on click
	});
				
	$('<div id="lightbox"></div>') //adds the container div for the images
	.appendTo('body');
							
	$(window).resize(function(e) { //repositions lightbox based on window resizing
		positionLightbox();
	});
}

function positionLightbox(){ //subtracts the lightbox height from the window height/width and divides it by two. Uses the remaining size for positioning
	var top = ($(window).height() - $('#lightbox').height()) / 2; 
	var left = ($(window).width() - $('#lightbox').width()) / 2;
	$('#lightbox').css({
		'top': top + $(document).scrollTop(),
		'left':left
	});
}

function removeLightbox(){ //fades out, removes lightbox and current class 
	$('#overlay, #lightbox').fadeOut('slow', function(){
		$(this).remove();
		$('body').css('overflow-y', 'auto'); //adds scroll bar back
		$('a.current').removeClass('current'); //removes current class
	});
}