//下面是轮播图的实现
var oImgs=document.getElementById("inner").getElementsByTagName("img");
var oinner=document.getElementById("inner");
var step=0;
function autoMove(){
    step++;
    if(step>=oImgs.length){
        step=1;
        oinner.style.left=0;
    }
    animate(oinner,{left:step*-670},600);
    //selectCurrent(step);
}
var autoTimer=null;
autoTimer=window.setInterval(autoMove,2000);

//nav导航条的弹出框的实现
var nav=document.getElementsByTagName("nav")[0];
var navdiv2=document.getElementById("div2");
var navtitle=navdiv2.getElementsByClassName("navtitle");
var navshow=navdiv2.getElementsByClassName("navshow");
var into=navdiv2.getElementsByClassName("into");
var pop=navdiv2.getElementsByClassName("pop");

for(var i=0;i<navshow.length;i++){
    ~function(i){
        navshow[i].onmouseover=function(){
            pop[i].style.display="block";
            navtitle[i].style.backgroundColor="#fff";
            into[i].style.backgroundColor="#fff";
        }
    }(i);
}

for(var i=0;i<navshow.length;i++){
    ~function(i){
        navshow[i].onmouseout=function(){
            pop[i].style.display="none";
            navtitle[i].style.backgroundColor="#f5f5f5";
            into[i].style.backgroundColor="#f5f5f5";
        }
    }(i);
}

//搜索框点击时让里面的文字变空的实现
var serchkuang=document.getElementById("breadright").getElementsByTagName("input")[0];
serchkuang.onclick=function(){
    serchkuang.value="";
};

//竞拍流程中鼠标浮上去让图片变红色同事文字也变红色    添加select1和select2类名
var jingpai=document.getElementById("jingpai");
var buzou=jingpai.getElementsByClassName("buzou");
var buzoup=jingpai.getElementsByTagName("p");
var buzoutu=jingpai.getElementsByClassName("buzoutu");

for(var i=0;i<buzou.length;i++){     //鼠标浮上去时添加select1和select2类名
    ~function(i){
        buzou[i].onmouseover=function(){
            buzoup[i].className="select2";
            utils.addClass(buzoutu[i],"hover"+(i+1));
        };
    }(i);
}

for(var i=0;i<buzou.length;i++){    //鼠标离开时去除select1和select2类名
    ~function(i){
        buzou[i].onmouseout=function(){
            buzoup[i].className="";
            utils.removeClass(buzoutu[i],"hover"+(i+1));
        };
    }(i);
}





