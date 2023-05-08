$('.gnb').children().on('mouseover',function(){
    let i = $(this).index();
    setTimeout(function(){
        $('.subItem').eq(i).fadeIn().siblings().hide();
    },200)

});
$('.subContainer').on('mouseleave',function(){
    $('.subItem').hide();
})

$('.prdCon').slick({
    'slidesToShow': 3, //화면에 보여지는 슬라이드수
    'slidesToScroll':1, //슬라이드 될때 몇개씩 될껀지
    'arrows':true, //화살표 버튼
    //'autoplay':true,//자동 슬라이드
    'scrollBar':true,

    'nextArrow':'.n_next1 a', //다음버튼 연결
    'prevArrow':'.n_prev1 a' //이전버튼 연결

});

$('.PrdCon1').slick({
    'slidesToShow': 4, //화면에 보여지는 슬라이드수
    'slidesToScroll':1, //슬라이드 될때 몇개씩 될껀지
    'arrows':true, //화살표 버튼
    //'autoplay':true,//자동 슬라이드
    'scrollBar':true,

    'nextArrow':'.n_next2 a', //다음버튼 연결
    'prevArrow':'.n_prev2 a' //이전버튼 연결
});

// 스크롤 이미지 애니메이션
    $(document).ready(function(){
        //1.스크롤이벤트가 발생하면,
        $(window).scroll(function(){
        //2. 각 .Event_Con 클래스 엘리먼트의 위치를 파악하고,
            $('.Event_Con').each( function(i){
                
                var bottom_of_element = $(this).offset().top + $(this).outerHeight(true);
                var bottom_of_window = $(window).scrollTop() + $(window).height();
                
                if( bottom_of_window > bottom_of_element ){
                    $(this).animate({'opacity':'1','margin-bottom':'0px'},1800);
                }
                
            }); 
        });
    });
