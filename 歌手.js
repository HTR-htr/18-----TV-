/**
 * Created by 17579 on 2019/5/6.
 */
var alp=document.getElementById("alp");
for(var i=0;i<25;i++)
{var num=(String.fromCharCode((65+i)));
    var addLi=document.createElement("li");
    addLi.innerHTML=num;
    alp.appendChild(addLi);
}
//在开发中不能写死，一般将获取元素的方法封装起来（适应项目需求）
//瀑布流的唯一标识
var oParent = document.getElementById('container');//页面加载完成再算；
var page=1;
//   console.log(oParent);
quTu(1);
function  quTu(page){
    $.ajax({
        type:"POST",
        dataType: 'json',
        async:false,
        data : {page,page},
        url:"https://easy-mock.com/mock/5cb6e6e3270aa324bd519b60/topview/Waterfalls",
        success:function (res) {
            var data=res.data;
            list=data.list;//为什么成为局部变量后不行？
            console.log(list);
            for(var i=1,len=list.length;i<len;i++){
                initimg(i);
            }
        }
    });}
window.addEventListener('load',function(){
    imgLocation('box');
},false);
function initimg(i){
    var boxElement=document.createElement("div");
    boxElement.setAttribute("class","box");
    oParent.appendChild(boxElement);
    var boxImg=document.createElement("div");
    boxImg.setAttribute("class","box-img");
    boxElement.appendChild(boxImg);
    var img=document.createElement("img");
    img.src=list[i];
    boxImg.appendChild(img);
}
function imgLocation(child) {
    //获取到父级下的子元素
    var aContent = getChilds(child);
    //获取自己元素的宽度
    var imgWidth = aContent[0].offsetWidth;
    //计算一排显示的列数
    var num =~~(document.getElementById("mainMain").offsetWidth / imgWidth);//(要做图片的兼容处理)
    oParent.style.cssText = 'width:' + (imgWidth * num) + 'px;margin:0 auto';
    //动态的计算父级的宽度以居中
    //计算图片的高度
    var heightArr=[];
    aContent.forEach(function (current, index) {
        if (index < num) {//计算当前每列数的高度
            heightArr.push(current.offsetHeight);

        } else {//超出当前列数的序列号
            //获取都最小高度
            var  minHeight=Math.min.apply(null,heightArr);
            current.style.position='absolute';
            //获取图片最小高度的序列号
            var minIndex=getMinHeightIndex(heightArr,minHeight);
            current.style.top=minHeight+'px';
            current.style.left=aContent[minIndex].offsetLeft+'px';
//               console.log(minIndex);
            heightArr[minIndex]=heightArr[minIndex]+current.offsetHeight;
        }
    });
//       console.log(heightArr);
}
function getMinHeightIndex(heightArr,minHeight){
    for(var i in heightArr){
        if(heightArr[i]==minHeight){
            return i;
        }
    }
}
//    imgLocation('box');
getChilds('box');
function getChilds(child){
    //存放符合条件的子元素的数组
    var childArr=[];
    var tagsAll =oParent.getElementsByTagName("*");
    for(var i=0,len=tagsAll.length;i<len;i++){
        if(tagsAll[i].className===child ){
            childArr.push(tagsAll[i]);
        }
    }
    return childArr;
}
window.onscroll=function(){
    var scroll=document.documentElement.scrollTop;//已经滚动的距离
    var screen =window.innerHeight;//浏览器高度
    var offsetTop=oParent.offsetTop;
    var height=oParent.offsetHeight;
//        console.log(scroll+screen-offsetTop-height);
    if(scroll+screen-offsetTop-height>550){
        addimg();
    };
};
function addimg(){
    page+=1;
    quTu(page);
    imgLocation('box');
}