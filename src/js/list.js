import { getParams,ajax,loading } from "./toops.js";
import { Calendar } from "../component/calendar.js";
console.log(loading)
function init(){
    //let loade=document.querySelector(".loading");
    loading.startLoading("body")
    listRander();
    showMark();
    backIndex();
    setTime();
    filter();
}

function setTime(){
    let checkIn=document.querySelector(".check_in");
    let checkLeave=document.querySelector(".check_leave");
    checkIn.innerHTML=getParams("dateLiveIn");
    checkLeave.innerHTML=getParams("dateLeave");
    modifydate(checkIn,checkLeave);
}

function modifydate(checkIn,checkLeave){
    let calenderPlugin=document.querySelector(".calender_plugin")
    let selectDate=document.querySelector(".list_sec .title")
    let moduleCalendar=new Calendar()
    checkIn.onclick=function(){
        moduleCalendar.show(checkIn)
    }
    checkLeave.onclick=function(){
        moduleCalendar.show(checkLeave)
    }
}

function listRander(){
    let listWarpper=document.querySelector(".list_warpper");
    let hotelDetails=document.querySelector(".hotel_details");
    let listStr="";
    ajax({
        url:"../../data/hotel.json",
        callback:function(data){
            loading.stopLoading();
            let listDate=data.data
            for(let i=0;i<listDate.length;i++){
                listStr+=`<dl class="hotel_list" data-region="${ listDate[i].district }" data-hotelId="${ listDate[i].hotel_id }" data-distance="${ listDate[i].distance }" data-star="${ listDate[i].star }" data-rank="${ listDate[i].rank }" data-price="${ listDate[i].price }">
                            <dt><img src="${ listDate[i].image }" alt=""/></dt><dd><p>${ listDate[i].name }</p>
                            <p>
                                <span>4.7分<i>礼</i></span>
                                <span>￥${ listDate[i].price }</span>
                                <span>起</span>
                            </p>
                            <p>
                                <span class="clear ">${ listDate[i].star }</span>
                                <span class="iconfont">&#xe621;</span>
                                <span class="iconfont">&#xe623;</span>
                            </p>
                            <p>
                                <span>${ listDate[i].addr }</span>
                                <span>${ listDate[i].distance/1000 }km</span>
                            </p>
                        </dd>
                    </dl>`
            }
            hotelDetails.innerHTML=listStr;
            goToDetail(listDate);
        }
    })
}

function showMark(){
    let listStars=document.querySelector(".listStars");
    let listStarsUl=document.querySelectorAll(".listStars ul");
    let listFoot=document.querySelectorAll(".list_foot li");
    for(let i=0; i<listFoot.length;i++){
        listFoot[i].onclick=() => {
            for(let i=0; i<listStarsUl.length;i++){
                listStarsUl[i].classList.remove("activeChild");
            }
            if( listStars.classList.contains("activeStar") && listFoot[i].className=="tagStar"){
                listStars.classList.remove("activeStar");
                listFoot[i].querySelectorAll("span")[1].innerHTML="&#xe66b;";
                listFoot[i].className="";
            }else{
                for(let j=0;j<siblings(listFoot[i]).length;j++){
                    siblings(listFoot[i])[j].querySelectorAll("span")[1].innerHTML="&#xe66b;";
                    siblings(listFoot[i])[j].className="";
                }
                listFoot[i].querySelectorAll("span")[1].innerHTML="&#xe626;";
                listFoot[i].className="tagStar";
                listStars.classList.add("activeStar");
                listStarsUl[i].classList.add("activeChild");
            }
        }
    }
}


function resets(){
    let listFoot=document.querySelectorAll(".list_foot li");
    for(let i=0;i<listFoot.length;i++){
        listFoot[i].className="";
        listFoot[i].querySelectorAll("span")[1].innerHTML="&#xe66b;";
    }
}

function filter(){
    let listStars=document.querySelector(".listStars");
    listStars.addEventListener("click",(e)  =>  {
        let target=e.target;
        switch(target.tagName){
            case "SPAN": target=target.parentNode;
                break;
            case "LI":
                break;
            case "DIV" :
                if(target.classList.contains("activeStar")){
                    target.classList.remove("activeStar");
                    resets()
                }
                return;
                break;
            default:console.log("mfkfmsd");
        }
        if(target.parentNode.classList.contains("arrange")){
            for(let k=0;k<siblings(target).length;k++){
                siblings(target)[k].querySelectorAll("span")[1].innerHTML="&#xe6be;";
                siblings(target)[k].className="";
            }
            target.className="checkBox";
            target.querySelectorAll("span")[1].innerHTML="&#xe60e;";
            let arrange=target.getAttribute("arrange");
            orderBy(arrange)
        }else{
            if(target.className==""){
                target.className="checkBox";
                if(target.querySelectorAll("span").length>0){
                    target.querySelectorAll("span")[1].innerHTML="&#xe60e;";
                }
            }else{
                target.className="";
                if(target.querySelectorAll("span").length>0){
                    target.querySelectorAll("span")[1].innerHTML="&#xe6be;";
                }
            }
        }
        screen(collect())
    },false)
}

function orderBy(arrange){
    let hotelDetails=document.querySelector(".hotel_details");
    let dls=Array.from(hotelDetails.querySelectorAll("dl"));
    dls=dls.sort(function(a,b){
        if(arrange=="low_price"){
            return a.getAttribute("date-price")-b.getAttribute("date-price")
        }else if(arrange=="stars"){
            return a.getAttribute("date-rank")-b.getAttribute("date-rank")
        }else{
            return a.getAttribute("date-distance")-b.getAttribute("date-distance")
        }
    })
    dls.forEach(function(ele,index){
        hotelDetails.appendChild(ele)
    })
}

function collect(){
    let region=document.querySelector(".listStars .region").querySelectorAll(".checkBox");
    let star=document.querySelector(".listStars .ranks").querySelectorAll(".checkBox");
    let screenItems={
        region:[],
        star:[]
    }
    for(let i=0;i<region.length;i++){
        screenItems.region.push(region[i].getAttribute("region"))
    }
    for(let k=0;k<star.length;k++){
        screenItems.star.push(star[k].getAttribute("rank"))
    }
    for(let j in screenItems){
        if(screenItems[j].length==0){
            delete screenItems[j]
        }
    }
    return screenItems;
}

function screen(obj){
    let warp=document.querySelector(".hotel_details");
    let dls=warp.querySelectorAll("dl");
    for(let i=0;i<dls.length;i++){
        dls[i].classList.remove("hides")
    }
    for(let i=0;i<dls.length;i++){
        for(let s in obj){
            if(obj[s].indexOf(dls[i].getAttribute("data-"+s))==-1){
                dls[i].classList.add("hides")
            }
        }
    }

}

function goToDetail(listDate){
    let hotelList=document.querySelector(".hotel_details");
    let dlLis=hotelList.querySelectorAll(".hotel_list");
    let dateLeave=document.querySelector(".check_in").innerHTML;
    let dateLiveIn=document.querySelector(".check_leave").innerHTML;
    for(let i=0;i<dlLis.length;i++){
        dlLis[i].onclick=() => {
            let attr=dlLis[i].getAttribute("data-hotelId");
            location.href=encodeURI(`detail.html?dateLiveIn=${dateLiveIn}&dateLeave=${dateLeave}&id=${attr}`);
        }
    }

}

function backIndex(){
    let backIndex=document.querySelector("#backIndex");
    backIndex.onclick=function(){
        location.href="index.html";
    }
}

function siblings(elm) {
    var a = [];
    var p = elm.parentNode.children;
    for(var i =0,pl= p.length;i<pl;i++) {
        if(p[i] !== elm) a.push(p[i]);
    }
    return a;
}
init();