/**
 * Created by 17579 on 2019/5/6.
 */
var url="https://easy-mock.com/mock/5cb6e6e3270aa324bd519b60/topview/pagination";
var page=1;
var oCon=document.querySelector(".content");
//    var aLi1=document.querySelectorAll(".page>ul li");//分页按钮
var oUl=document.querySelector('.page>ul');
var cache={};//缓存池
getData(1);
pageList();
function pageList(){
    oUl.addEventListener('click',function (e) {
        if (e.target.tagName.toLocaleLowerCase() === 'li') {
            //如果page能在cache中找到，就直接渲染数据
            page = e.target.innerText;
            if (page in cache) {
                console.log('数据已缓存' + page);
                console.log(cache[page]);
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
//        var form=new FormData();
//        form.append(page,page);利用form表单提交不成功
    $.ajax({
        type: "POST",
        dataType: 'json',
        async:true,
        data:{page,page},
//            processData:false,
        url: url,
//            contentType:false,
        success: function(res){
            console.log(res);
            var data=res.data;
            var dataPost=data;
            cache[page]=dataPost;//预存数据
            render(data);//执行渲染
            oUl.style.display="block";
        }
    });
}
function render(dataList){//利用数组循环渲染
    var str='';
    for(var i=0,len=dataList.length;i<len;i++){
        console.log(dataList[i].url);
        str+=`<div class="bigBox">
                    <a href="" class="imgEle"><img src="${dataList[i].url}" alt=""></a>
                    <div class="text">${dataList[i].text}</div>
                    </div>`;
    }
    oCon.innerHTML=str;
}
