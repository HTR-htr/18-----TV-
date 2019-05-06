
var listElement=document.getElementById('list');
var linebElement=document.getElementById('lineb');
var toleft=document.getElementById("main-arr-l");
var toright=document.getElementById("main-arr-r");
var index=0;
var xhr =new XMLHttpRequest();
xhr.open('GET','https://easy-mock.com/mock/5cb6e6e3270aa324bd519b60/topview/Carousel');
xhr.send();
xhr.onreadystatechange=function(){
    if(this.readyState!==4) return;
    var json=JSON.parse(this.response);
    var data=json.data;
    for(var i=0,len=data.length;i<len;i++) {
        //渲染图片
        var liElement =document.createElement('li');
        listElement.appendChild(liElement);
        liElement.className="list"+(i+1);
        var imgElement= document.createElement('img');
        imgElement.src=data[i].url;
        liElement.appendChild(imgElement);
        var spanElement =document.createElement('span');
        spanElement.setAttribute("indexspan",(i+1));
        linebElement.appendChild(spanElement)
    }
    var index=0;
    aSpan=linebElement.querySelectorAll("span");
    for(var i=0,len=aSpan.length;i<len;i++){
        aSpan[i].addEventListener("mouseover",function(){
            indexspan1=this.getAttribute("indexspan");
            jump()
        })
    }
    aSpan[0].style.backgroundColor="#45c17c";
    aListName=["list1","list2","list3","list4","list5","list6","list7"];
    aLi=listElement.querySelectorAll("li");
    var list1=document.querySelector(".list1");
    var list3=document.querySelector(".list3");
    var imgList=document.querySelector(".imglist");
    imgList.addEventListener("click",function(e){
        if(e.target.parentNode.getAttribute("class")==="list3")
        {
            nextPic();
        }
        else if(e.target.parentNode.getAttribute("class")==="list1"){
            prePic()
        }
    });
    var timeID=setInterval(nextPic,5000);
    listElement.onmouseover=function(){
        clearInterval(timeID);

        listElement.onmouseout=function(){
            timeID=setInterval(nextPic,5000);
        }
    };
    toleft.onclick=function () {
        prePic();
    };
    toright.onclick=function(){
        nextPic();
    };
};
function jump() {
    aListName=["list1","list2","list3","list4","list5","list6","list7"];
    for(i=0;i<indexspan1;i++) {
        aListName.unshift(aListName[6]);//把数组最后一个名字赋值并插入到第一位置来
        aListName.pop();//删除最后一个值
    }
    for(var i=0,len=aLi.length;i<len;i++){
        aLi[i].setAttribute("class",aListName[i]);
    }
    index=indexspan1-1;
    setLineBColor();
}
function setLineBColor(){
    for(var i=0,len=aSpan.length;i<len;i++){
//            因为访问数组长度很浪费资源，所以将数组的长度存起来
        aSpan[i].style.background="#ccc";
    }
    aSpan[index].style.backgroundColor="#45c17c";
}
function nextPic(){
    aListName.unshift(aListName[6]);//把数组最后一个名字赋值并插入到第一位置来
    aListName.pop();//删除最后一个值
    for(var i=0,len=aLi.length;i<len;i++){
        aLi[i].setAttribute("class",aListName[i]);
    }
    index=index+1;
    if(index>6){
        index=0;
    }
    setLineBColor()
}
function prePic(){
    aListName.push(aListName[0]);//把第一个值塞到最后一个
    aListName.shift();//删除第一个值
    for(var i=0,len=aLi.length;i<len;i++){
        aLi[i].setAttribute("class",aListName[i]);
    }
    index=index-1;
    if(index<0){
        index=6;
    }
    setLineBColor();
}

//获取元素
//点击播放暂停
//    init();
var onOff=true;
var str ='';
//    var totaltime=0;
//    console.log(totaltime);
$('.play')[0].onclick=function () {
    if(onOff){
        $('#audio').play();
//            console.log($(".fang"));
        $(".fang")[0].innerHTML="&#xe60e;";
        onOff=false;
        timeId=setInterval(ProgressTime,1000);
    }//点击播放
    else {
        $('#audio').pause();
        $(".fang")[0].innerHTML="&#xe717;";
        onOff=true;
        clearInterval(timeId);
    }
};

//初始化页面
//var str ='';
function init(){
    var g=songData[0].songLyrics.split('[');
    g.forEach(function(current){
        var h=current.split(']');
        var lyrics=h[1];
        console.log(lyrics);
        if(lyrics){
            str+='<p>'+lyrics+'</p>';
        }
        $('.word')[0].innerHTML=str;
    });
}

function ProgressTime(){
    var n=$('#audio').currentTime/$('#audio').duration;
    console.log(n);
    $(".smallround")[0].style.marginLeft=~~(n*$('.sum')[0].offsetWidth)+"px";
    $(".progress")[0].style.width=n*$('.sum')[0].offsetWidth+"px";
    console.log($(".smallround")[0].style.marginLeft);
}
function $(selector){
    if(selector.substring(0,1)=="."){
        return document.getElementsByClassName(selector.substring(1));
    }else{
        return document.getElementById(selector.substring(1));
    }
}
$(".smallround")[0].onmousedown=function(e) {
    document.onmousemove = function (e) {
        var x = e.clientX;//距离左边的宽度,e要做兼容？此处的e代表什么
        console.log(x);
        console.log(x);
        var a = x - $(".smallround")[0].offsetParent.offsetLeft - $(".smallround")[0].offsetWidth / 2;
        console.log($(".smallround")[0].offsetParent.offsetLeft );
        $(".smallround")[0].style.marginLeft = a + "px";
        $(".progress")[0].style.width = a + "px";
        var b = parseInt(getComputedStyle($(".smallround")[0]).marginLeft)/$(".smallround")[0].offsetWidth;
        var c=b*$("#audio").duration;
        console.log(b);
        $('#audio').currentTime=c;
        ProgressTime();
    };
    document.onmouseup=function(){
        this.onmousedown=null;
        this.onmousemove=null;
    }
};
