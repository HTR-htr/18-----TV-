/**
 * Created by 17579 on 2019/5/6.
 */
var alp=document.getElementById("alp");
for(var i=0;i<25;i++)
{//生成26个字符
    var num=(String.fromCharCode((65+i)));
    var addLi=document.createElement("li");
    addLi.innerHTML=num;
    alp.appendChild(addLi);
}
var oParent = document.getElementById('container');
var page=1;
quTu(1);
function  quTu(page){
    $.ajax({
        type:"POST",
        dataType: 'json',
        async:false,
        data : {page:page},
        url:"https://easy-mock.com/mock/5cb6e6e3270aa324bd519b60/topview/Waterfalls",
        success:function (res) {
            var data=res.data;
            list=data.list;
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
    var aContent = getChilds(child);
    //获取自己元素的宽度
    var imgWidth = aContent[0].offsetWidth;
    //计算一排显示的列数
    var num =~~(document.getElementById("mainMain").offsetWidth / imgWidth);
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
    var scroll=document.documentElement.scrollTop;
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