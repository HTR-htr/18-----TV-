/**
 * Created by 17579 on 2019/5/6.
 */
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
window.onload=function(){
    var tap=document.getElementsByClassName("toptop");
    var bottle=document.getElementsByClassName("buttom");
    var date=new Date();
    var arr=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
    tap[0].innerHTML=arr[date.getDay()];
    bottle[0].innerHTML=date.getDate();
};
