$(function (){
    /*轮播图*/
    /*1.获取轮播图数据 ajax*/
    /*2.根据数据动态渲染 根据当前设备 屏幕宽度判断*/
    /*2.1 准备数据*/
    /*2.2 把数据转化成html格式的字符串 （动态创建元素，字符串拼接，模板引擎）*/
    /*2.3 字符串渲染页面*/

    /*3.测试功能*/

    /*4.移动端手势切换*/

    banner();
    initMobileTab();
    $('[data-toggle="tooltip"]').tooltip();
});

let banner=function (){
    /*1.获取轮播图数据*/
    let getData=function (callback){
        if(window.data){
            callback&&callback(window.data);
        }else{
            $.ajax({
                type:"get",
                url:"js/data.json",
                dataType:"json",/*强制后台转回的数据是json对象*/
                data:"",
                success:function (data){
                    window.data=data;
                    callback&&callback(window.data);

                }
            });
        }
    };
    /*2.根据数据动态渲染 根据当前设备 屏幕宽度判断*/
    let render =function (){
        getData(function (data){
            let isMobile=$(window).width()<768?true:false;
            /*使用模板引擎*/
            let pointHtml=template("pointTemplate",{list:data});
            let imgHtml=template("imgTemplate",{list:data,isM:isMobile});
            $(".carousel-indicators").html(pointHtml);
            $(".carousel-inner").html(imgHtml);
        });
    };
    /*3.测试功能*/
    // render();/*此处可以省略，可以通过jq的trigger()主动实现resize*/
    $(window).on("resize",function (){
        render();
    }).trigger("resize");
    /*4.移动端手势切换*/
    let startX=0;
    let distanceX=0;
    let isMove=false;
    $(".wjs_banner").on("touchstart",function (e){
        startX=e.originalEvent.touches[0].clientX;
    }).on("touchmove",function (e){
        let moveX=e.originalEvent.touches[0].clientX;
        distanceX=moveX-startX;
        isMove=true;
    }).on("touchend",function (e){
        /*距离足够50px 并且滑动过*/
        if(isMove&&Math.abs(distanceX)>50){
            if(distanceX>0){
                $('.carousel').carousel('prev');
            }else{
                $('.carousel').carousel('next');
            }
        }
    });

};
let initMobileTab=function (){
    let width=0;
    let $lis=$(".wjs_product li");
    let $navTabs=$(".wjs_product .nav-tabs");
    $lis.each(function (i,item){
        width+=$(item).width();
    });
    $navTabs.width(width);

    new IScroll($(".nav_parent")[0],{
        scrollX: true,
        scrollY: false,
        click:true
    });
};