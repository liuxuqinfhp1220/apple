$(function(){
    var header=$('.header');
    var search=$('.search');
    search.on('click',function(){
       header.addClass('searching');
    })
    var close=$('.close');
    close.on('click',function(){
        header.removeClass('searching');
    })
    var menu=$('.menu');
    var menulist=$('.menu-list');
    menu.on('click',function(){
        header.toggleClass('Searching');
        menulist.slideToggle();
        // menulist.css('display','block');
    })
    var content=$('.content');
    var consmall=$('.con-small');
    var adds=consmall.find('.small-add');
    var conlists=consmall.find('.con-list');
    var smalllist=consmall.find('.small-list');
    adds.each(function(i,v){
        adds.eq(i).on('click',function(){
            conlists.eq(i).slideToggle().css('display','block');
            adds.eq(i).toggleClass('active');
        })
    })

    var banner=$('.banner');
    var slides=banner.find('.banner-nav a');
    var dots=banner.find('.dot .dot-nav');
    var btn=banner.find('.btn');
    var leftbtn=btn.find('.btn-left');
    var rightbtn=btn.find('.btn-right');
    var dot=banner.find('.dot');
    var autoplay=true;
    var moving=false;
    dot.find('a').eq(0).addClass('show auto');
    var moveTo=function(el,dir){
        moving=true;
        var active=slides.filter('.active');
        slides.filter('.active').removeClass('active');
        if(autoplay){
           dot.find('a').eq($(el).index()).delay(1000).addClass('show auto');
            // console.log($(el).index());
            var autos=dot.find('.auto');
            // console.log(autos.length);
            if(autos.length==4){
                autos.delay(1000).removeClass('show auto');
            }
        }else{
            dot.find('.show').removeClass('.show');
            dots.eq($(el).index()).find('a').delay(1000).addClass('show');
        }
        if(dir==="right"){
            active.addClass('leave').delay(1000).queue(function(){
                active.removeClass('leave').dequeue();
            });
            slides.eq($(el).index()).addClass('active').addClass('right');
            $(el).get(0).offsetWidth;
            slides.eq($(el).index()).removeClass('right');
            moving=false;
        }else if(dir==="left"){
            slides.filter('.active').removeClass('active');
            active.addClass('right').delay(1000).queue(function(){
                active.removeClass('right').dequeue();
            });
            $(el).addClass('enter').addClass('active').delay(1000).queue(function(){
                // $(el).get(0).offsetWidth;
                $(this).removeClass('enter').dequeue();
            });
            moving=false;
        }

    }
    var moveRight=function(){
        var active=slides.filter('.active');
        var el=active.next().length?active.next():slides.eq(0);
        moveTo(el,"right");
    }
    var moveLeft=function(){
        var active=slides.filter('.active');
        var el=active.prev().length?active.prev():slides.eq(-1);
        moveTo(el,"left");
    }
    dots.on('click',function(){
        clearInterval(t);
        autoplay=false;
        dot.find('.auto').removeClass('auto show');
        var a=slides.index(slides.filter('.active'));
        var n=$(this).index();
        dot.find('a').eq(a).removeClass('show');
        dot.find('a').eq(n).addClass('show');
        if(a===n) return;
        if(a>n){
            moveTo(slides.eq(n),"left");
        }else if(a<n){
            moveTo(slides.eq(n),"right");
        }
    })
    var t=setInterval(moveRight,2000);
    banner.on('mouseenter',function(){
        btn.animate({opacity:1});
        // clearInterval(t);
    })
    banner.on('mouseleave',function(){
           btn.animate({opacity:0});
           // t=setInterval(moveRight,2000);
    })
    leftbtn.on('click',function(){
        clearInterval(t);
        autoplay=false;
        dot.find('.auto').removeClass('auto show');
        dot.find('a').eq(slides.filter('.active').index()).removeClass('show');
       moveLeft();
    })
    rightbtn.on('click',function(){
        clearInterval(t);
        autoplay=false;
        dot.find('.auto').removeClass('auto show');
        dot.find('a').eq(slides.filter('.active').index()).removeClass('show');
        moveRight();
    })
    leftbtn.on('mousedown',false);
    rightbtn.on('mousedown',false);
})