// fade
$('.tab_inner').on('click',function(){

	$('tab1_Text','tab2_Text','tab3_Text').stop().slideUp();
	$(this).siblings().stop().slideToggle();

	$(this).toggleClass('active').parent()
	.siblings().children('.tab_inner h3')
	.removeClass('active');
})


// 3D 홈페이지
function atvImg(){
	var d = document,
		de = d.documentElement,
		bd = d.getElementsByTagName('body')[0],
		htm = d.getElementsByTagName('html')[0],
		win = window,
		imgs = d.querySelectorAll('.atvImg'),
		totalImgs = imgs.length,
		supportsTouch = 'ontouchstart' in win || navigator.msMaxTouchPoints;

	if(totalImgs <= 0){
		return;
	}

	for(var l=0;l<totalImgs;l++){

		var thisImg = imgs[l],
			layerElems = thisImg.querySelectorAll('.atvImg-layer'),
			totalLayerElems = layerElems.length;

		if(totalLayerElems <= 0){
			continue;
		}

		while(thisImg.firstChild) {
			thisImg.removeChild(thisImg.firstChild);
		}
	
		var containerHTML = d.createElement('div'),
			shineHTML = d.createElement('div'),
			shadowHTML = d.createElement('div'),
			layersHTML = d.createElement('div'),
			layers = [];

		thisImg.id = 'atvImg__'+l;
		containerHTML.className = 'atvImg-container';
		shineHTML.className = 'atvImg-shine';
		shadowHTML.className = 'atvImg-shadow';
		layersHTML.className = 'atvImg-layers';

		for(var i=0;i<totalLayerElems;i++){
			var layer = d.createElement('div'),
				imgSrc = layerElems[i].getAttribute('data-img');

			layer.className = 'atvImg-rendered-layer';
			layer.setAttribute('data-layer',i);
			layer.style.backgroundImage = 'url('+imgSrc+')';
			layersHTML.appendChild(layer);

			layers.push(layer);
		}

		containerHTML.appendChild(shadowHTML);
		containerHTML.appendChild(layersHTML);
		containerHTML.appendChild(shineHTML);
		thisImg.appendChild(containerHTML);

		var w = thisImg.clientWidth || thisImg.offsetWidth || thisImg.scrollWidth;
		thisImg.style.transform = 'perspective('+ w*3 +'px)';

		if(supportsTouch){
			win.preventScroll = false;

	        (function(_thisImg,_layers,_totalLayers,_shine) {
				thisImg.addEventListener('touchmove', function(e){
					if (win.preventScroll){
						e.preventDefault();
					}
					processMovement(e,true,_thisImg,_layers,_totalLayers,_shine);		
				});
	            thisImg.addEventListener('touchstart', function(e){
	            	win.preventScroll = true;
					processEnter(e,_thisImg);		
				});
				thisImg.addEventListener('touchend', function(e){
					win.preventScroll = false;
					processExit(e,_thisImg,_layers,_totalLayers,_shine);		
				});
	        })(thisImg,layers,totalLayerElems,shineHTML);
	    } else {
	    	(function(_thisImg,_layers,_totalLayers,_shine) {
				thisImg.addEventListener('mousemove', function(e){
					processMovement(e,false,_thisImg,_layers,_totalLayers,_shine);		
				});
	            thisImg.addEventListener('mouseenter', function(e){
					processEnter(e,_thisImg);		
				});
				thisImg.addEventListener('mouseleave', function(e){
					processExit(e,_thisImg,_layers,_totalLayers,_shine);		
				});
	        })(thisImg,layers,totalLayerElems,shineHTML);
	    }
	}

	function processMovement(e, touchEnabled, elem, layers, totalLayers, shine){

		var bdst = bd.scrollTop || htm.scrollTop,
			bdsl = bd.scrollLeft,
			pageX = (touchEnabled)? e.touches[0].pageX : e.pageX,
			pageY = (touchEnabled)? e.touches[0].pageY : e.pageY,
			offsets = elem.getBoundingClientRect(),
			w = elem.clientWidth || elem.offsetWidth || elem.scrollWidth,
			h = elem.clientHeight || elem.offsetHeight || elem.scrollHeight,
			wMultiple = 320/w,
			offsetX = 0.52 - (pageX - offsets.left - bdsl)/w,
			offsetY = 0.52 - (pageY - offsets.top - bdst)/h,
			dy = (pageY - offsets.top - bdst) - h / 2,
			dx = (pageX - offsets.left - bdsl) - w / 2,
			yRotate = (offsetX - dx)*(0.07 * wMultiple),
			xRotate = (dy - offsetY)*(0.1 * wMultiple),
			imgCSS = 'rotateX(' + xRotate + 'deg) rotateY(' + yRotate + 'deg)',
			arad = Math.atan2(dy, dx),
			angle = arad * 180 / Math.PI - 90;

		if (angle < 0) {
			angle = angle + 360;
		}

		if(elem.firstChild.className.indexOf(' over') != -1){
			imgCSS += ' scale3d(1.07,1.07,1.07)';
		}
		elem.firstChild.style.transform = imgCSS;
		
		shine.style.background = 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + (pageY - offsets.top - bdst)/h * 0.4 + ') 0%,rgba(255,255,255,0) 80%)';
		shine.style.transform = 'translateX(' + (offsetX * totalLayers) - 0.1 + 'px) translateY(' + (offsetY * totalLayers) - 0.1 + 'px)';	

		var revNum = totalLayers;
		for(var ly=0;ly<totalLayers;ly++){
			layers[ly].style.transform = 'translateX(' + (offsetX * revNum) * ((ly * 2.5) / wMultiple) + 'px) translateY(' + (offsetY * totalLayers) * ((ly * 2.5) / wMultiple) + 'px)';
			revNum--;
		}
	}

	function processEnter(e, elem){
		elem.firstChild.className += ' over';
	}

	function processExit(e, elem, layers, totalLayers, shine){

		var container = elem.firstChild;

		container.className = container.className.replace(' over','');
		container.style.transform = '';
		shine.style.cssText = '';
		
		for(var ly=0;ly<totalLayers;ly++){
			layers[ly].style.transform = '';
		}

	}

}


// 
atvImg();

// 컬러 머시기
$(document).ready(function(){

  $(window).scroll(function(){

    $('.tab2_Img img').each(function(i){
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();

      if(bottom_of_window > bottom_of_object/2) {
        $(this).animate({'opacity':'1','padding-top':'-300px'},500);
      }
    });
  });
});




// view
$('.carousel--item').on('click',function(e){
  e.preventDefault();
  $('.view').fadeIn();

  let photo = $(this).find('figure').html();
  $('.view figure').html(photo);
});

$('.close, .closeWrap').on('click',function(){
	$('.view').fadeOut();
});


// // 마우스커서
// kursor({
// 	type: 4
// });

// scrollControl 시작
$('.mainWrap>div').on('mousewheel',function(e,d){

	if(d>0){
		let result =$(this).prev().offset().top;

		$('html, body').stop().animate({
			'scrollTop' : result
		});
	}else if(d>0){
		let result = $(this).next().offset().top;

		$('html,body').animate({
			'scrollTop' : result
		});
	}
});

// .nav li를 누르면 해당 
$('.nav li').on('click',function(e){
e.preventDefault() //새로고침 막음
let i = $(this).index();
let destinaion = $('.mainWrap').children().eq(i).offset().top;

$('html, body').stop().animate({
	'scrollTop' : destinaion
});

});

$(window).on('scroll',function(){
	let scr = $(window).scrollTop();
	let box2Top = $('.Intro').offset().top;
	let box3Top = $('.project').offset().top;
	let box4Top = $('.artwork').offset().top;
	let box5Top = $('.footer').offset().top;

	if(scr >= 0 && scr < box2Top){
		$('.nav li').removeClass('active');
		$('.nav li').eq(0).addClass('active');

	}else if(scr >=box2Top && scr < box3Top){
		$('.nav li').removeClass('active');
		$('.nav li').eq(1).addClass('active');

	}else if(scr >= box3Top && scr < box4Top){

		$('.nav li').removeClass('active');
		$('.nav li').eq(2).addClass('active');

	}else if(scr >= box3Top && scr < box5Top){

		$('.nav li').removeClass('active');
		$('.nav li').eq(3).addClass('active');

	}else{
		$('.nav li').removeClass('active');
		$('.nav li').eq(4).addClass('active');	
	}

});

let scr = $(window).scrollTop();
	let box2Top = $('.Intro').offset().top;
	let box3Top = $('.project').offset().top;
	let box4Top = $('.artwork').offset().top;
	let box5Top = $('.footer').offset().top;

	if(scr >= 0 && scr < box2Top){
		$('.nav li').removeClass('active');
		$('.nav li').eq(0).addClass('active');

	}else if(scr >= box2Top && scr < box3Top){
		$('.nav li').removeClass('active');
		$('.nav li').eq(1).addClass('active');

	}else if(scr >= box3Top && scr < box4Top){
		$('.nav li').removeClass('active');
		$('.nav li').eq(2).addClass('active');

	}else if(scr >= box4Top && scr < box5Top){
		$('.nav li').removeClass('active');
		$('.nav li').eq(3).addClass('active');

	}else{
		$('.nav li').removeClass('active');
		$('.nav li').eq(4).addClass('active');
	}


	// 스크롤 커서 막음

	const content =
	document.querySelector('.artwork');
	const wing = document.querySelector('.wing')

	// 컨ㄴ텐츠 영역부터 브라우저 최상단까지의 길이 구하기
	// const contentTop =
	// content.getBoundingClientRect().top +
	// window.scroll;

	// window.addEventListener('scroll',function(){
	// 	if(this.window.srolly >= contentTop){
	// 		wing.classList.add('fixed');
	// 	}else{
	// 		wing.classList.remove('fised');
	// 	}
	// });

	// $.fn.Scrolling = function(obj, tar) {
	// 	var _this = this;
	// 	$(window).scroll(function(e) {
	// 		var end = obj + tar;
	// 		$(window).scrollTop() >= obj ? _this.addClass("fixed") : _this.removeClass("fixed");
	// 		if($(window).scrollTop() >= end) _this.removeClass("fixed");
	// 	});
	// };
	
	// $(".artwork").Scrolling($(".artwork").offset().top, ($('.footer').height() - $('.footer').height()));