function ajax(options){
    let defaults={
        type:"get",
        url:"",
        params:"",
        callback:function(){

        }
    }
    let obj=Object.assign({},defaults,options);
    let xhr= new XMLHttpRequest();
    if(obj.type=="get" && obj.params){
        let param_str=""
        for (let i in obj.params) {
            param_str+=i+"="+obj.params[i];
        }
        xhr.open(obj.type,obj.url+param_str,true)
        xhr.send();
    }else{
        xhr.open(obj.type,obj.url,true)
        xhr.send(obj.params);
    }
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.status>=200 && xhr.status<300){
                obj.callback(JSON.parse(xhr.responseText));
            }else{
                alert("失败");
            }
        }
    }
}

//function jsonp(url,callback){
//    let sElement=document.creatElement("script");
//    window[fn]=fullback(callback){
//        callback;
//    }
//    sElement.src=url+"callback=fn"
//    document.body.appendChild(sElement)
//
//}
//跨域请求封装
function jsonp(url,callback){
    window.jsonp_callback = function(data){
        callback(data);
    }
    let s = document.createElement('script');

    s.src = url+"&callback=jsonp_callback";
    document.querySelector('body').appendChild(s);
}

function getParams(str){
    let urlParams= decodeURI(location.search).split("?")[1];
    let arr=urlParams.split("&")
    let obj={};
    for(let i=0;i<arr.length;i++){
        let arrChlid=arr[i].split("=");
        obj[arrChlid[0]]=arrChlid[1];
    }
    if(str){
        return obj[str]
    }else{
        return obj;
    }
}

function Loading(){
    let tpl=`<div class="spinner">
                <div class="spinner-container container1">
                    <div class="circle1"></div>
                    <div class="circle2"></div>
                    <div class="circle3"></div>
                    <div class="circle4"></div>
                </div>
                <div class="spinner-container container2">
                    <div class="circle1"></div>
                    <div class="circle2"></div>
                    <div class="circle3"></div>
                    <div class="circle4"></div>
                </div>
                <div class="spinner-container container3">
                    <div class="circle1"></div>
                    <div class="circle2"></div>
                    <div class="circle3"></div>
                    <div class="circle4"></div>
                </div>
            </div>`
    let load = document.createElement('div');
    load.className = 'loading';
    load.innerHTML = tpl;

    this.startLoading = function (container){
        let parentDom;
        if(typeof container=='string'){
            parentDom = document.querySelector(container)
        }else if(typeof container == 'object'){
            parentDom = container;
        }else{
            parentDom = document.querySelector('.container')
        }
        this.parentDom = parentDom;
        parentDom.appendChild(load);
    };

    this.stopLoading = function(){
        this.parentDom.removeChild(load)
    }
}
let loading=new Loading()
export { ajax,getParams,loading,jsonp };
































