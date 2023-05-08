
// var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
// var options = { //지도를 생성할 때 필요한 기본 옵션
// 	center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
// 	level: 3 //지도의 레벨(확대, 축소 정도)
// };

// var map = new kakao.maps.Map(129.2287825261, 35.843644034706); //지도 생성 및 객체 리턴

        $('.con').click(function(){
            $(this).addClass('active').
            siblings().removeClass('active');
        });

        let txt= [];
        $('.div4 a').click(function(e){
            e.preventDefault();
            $(this).toggleClass('on');
            
            let t = $(this).text();
            
            
            txt.push(t);


            $('input').val(txt);
            

        });


        // gnb의 li에 마우스를 올리면
        // 해당 sub가 slideDown()
        // 마우스를 때면 해당 sub가 slidUp()이 된다.
        $('.gnb').children().on('mouseover',function(){
            $(this).children('.sub').stop().slideDown().css({'display':'flex'});

        }).on('mouseout',function(){
            $(this).children('.sub').stop().slideUp();
        })

        //1. ul을 클랙하였을때, 클릭한 ul와 일치하는
        //tab-box 나타나게 하기


        $('.ul li').on('click',function(e){
            e.preventDefault();
            let i = $(this).index();
            $('.Tab-box').eq(i).show().siblings().hide()
        })
        //ul2의 어른프로그램을 클릭하면
        // 클릭한 div인 con2 나타나게 하기
        $('.ul2 li').on('click',function(event){
            event.preventDefault();
            $(this).addClass('active').siblings().removeClass('active');
            let e = $(this).index();
            $('.con2Wrap').children().eq(e).css({'display' : 'flex'}).siblings().hide();
        });

        $('.imgcon1').slick({
            'slidesToShow' : 3
        }).on('afterChange',function(s,c){

            let img= $('.slick-current').find('img').attr('src');
            let url = '../'+img;
            console.log(url)
            $('.Stitle.cover').css({
                'background-image' : `url(${img})`
            })

        });