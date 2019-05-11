/**
 * Created by 17579 on 2019/5/9.
 */
var url="https://easy-mock.com/mock/5cb6e6e3270aa324bd519b60/topview/pagination";
var page=1;
var oCon=document.querySelector(".content");
var aLi1=document.querySelectorAll(".page>ul li");//分页按钮
var oUl=document.querySelector('.page>ul');
var cache={};//缓存池
getData(1);
pageList();
var slideMusic=document.getElementsByClassName("slideMusic");
var hot=document.getElementById("hotLabel");
console.log(hot.children.length);
for(var i=0,len=hot.children.length;i<len;i++){
    hot.children[i].onclick=function(){
        var a=this.getAttribute('index');
        if(a>5){a=a-3;};
        getData(a);
        slideMusic[0].innerHTML=this.innerHTML;
    }}
function pageList(){
    oUl.addEventListener('click',function (e) {
        if (e.target.tagName.toLocaleLowerCase() === 'li') {
            page = e.target.innerText;
            if (page in cache) {
                render(cache);
            }
            getData(page);
        }
        else {
            getData(page);
        }
        page = e.target.innerHTML;
        getData(page);
    } )}
function getData(page){//获取数据
    $.ajax({
        type: "POST",
        dataType: 'json',
        async:true,
        data:{page,page},
        url: url,
        success: function(res){
            console.log(res);
            var data=res.data;
            var dataPost=data;
            cache[page]=dataPost;//预存数据
            render(data);//执行渲染
        }
    });
}
function render(dataList){//利用数组循环渲染
    var str='';
    for(var i=0,len=dataList.length;i<len;i++){
        str+=`<div class="bigBox">
                    <a href="" class="imgEle"><img src="${dataList[i].url}" alt=""></a>
                    <div class="text">${dataList[i].text}</div>
                    </div>`;
    }
    oCon.innerHTML=str;
}