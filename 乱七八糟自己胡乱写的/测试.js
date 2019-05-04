/**
 * Created by 17579 on 2019/4/29.
 */
var imgElement=document.getElementsByClassName('div')
var xhr =new XMLHttpRequest()
xhr.open('GET',"https://easy-mock.com/mock/5cb6e6e3270aa324bd519b60/topview/Carousel")
xhr.send()
xhr.onreadystatechange=function(){
    if(this.readyState!==4) return
   var json=JSON.parse(this.responseText)
    var data =json.data
    // console.log(data.data)
    for(var i=0;i<data.length;i++){
        var liElement=document.createElement('div')
        liElement.innerHTML=data[i]
        imgElement.appendChild(liElement)

    }
}

    
    

