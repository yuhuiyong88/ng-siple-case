import { getParams,ajax,loading } from "./toops.js";
import { Calendar } from "../component/calendar.js";
import { Swiper } from "../../lib/swiper.js";
function init(){
    setTime();
    getId();
    reserve();
    backIndex();
    toggleInfo();
    toWrite();
    atlasImg();
}

function atlasImg(){
    let describe=document.querySelector(".describe");
    let describeList=document.querySelector(".describe_list");
    describe.onclick=function(){
        loading.startLoading("body")
        describeList.classList.remove("none");
            ajax({
                url:"../../data/banner.json",
                callback:function(date){
                    loading.stopLoading()
                    let bannerStr="";
                    setTimeout(()=>{
                        date.forEach(function(value,index){
                            bannerStr+=`<li class="swiper-slide"><img src="${value.url}" alt="atlas"/></li>`
                        })
                        describeList.innerHTML=`<ul class="swiper-wrapper img_warp">${bannerStr}</ul>`
                        new Swiper(describeList,{})
                    },100)
                }
            })
    }
    describeList.onclick=function(e){
        let target=e.target
        if(target.tagName=="DIV" && target.classList.contains("describe_list")){
            describeList.classList.add("none");
        }
    }
}

function setTime(){
    let checkIn=document.querySelector(".check_in");
    let checkLeave=document.querySelector(".check_leave");
    checkIn.innerHTML=getParams("dateLeave");
    checkLeave.innerHTML=getParams("dateLiveIn");
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

function getId(){
    let hotelId=getParams("id");
    let detailHotel=document.querySelector(".detail_hotel");
    let rigths=document.querySelector(".rigths");
    let detailStr="";
    let rightStr="";
    ajax({
        url:"../../data/hotel.json",
        callback:function(data){
            let listDate=data.data;
            for(let i in listDate){
                if(listDate[i].hotel_id==hotelId){
                    detailStr=`<h2>${listDate[i].name}</h2>
                                <p><i></i><span>星级：${listDate[i].star}级酒店</span></p>
                                <p><i></i><span>电话：${listDate[i].tel}</span></p>
                                <p><i></i><span>地址：${listDate[i].addr}</span></p>`
                    rightStr=`<p>${listDate[i].hotel_introduction}</p>`
                }
            }
            detailHotel.innerHTML=detailStr;
            rigths.innerHTML=rightStr;
        }
    })
}

function reserve(){
    let reserveHotel=document.querySelectorAll(".reserve_hotel");
    let ReserveMark=document.querySelector(".Reserve_mark");
    for(let k=0;k<reserveHotel.length;k++){
        reserveHotel[k].onclick=() => {
            let clickReserve=reserveHotel[k].parentNode.querySelectorAll(".click_reserve span");
            let orderMsg=document.querySelector(".order_msg");
            let infoStr="";
            if(clickReserve.length>1){
                ReserveMark.classList.add("Reserve_active_d")
                infoStr=`<span>标准大床房</span>
                    <span>￥90</span>
                    <span>担保</span>
                    <p class="p_fixed">x</p>`
            }else{
                ReserveMark.classList.add("Reserve_active")
                infoStr=`<span>标准大床房</span>
                    <span>￥90</span>
                    <p class="p_fixed">x</p>`
            }
            orderMsg.innerHTML=infoStr
        }
    }
    ReserveMark.onclick=function(e){
        let target=e.target;
        if(target.classList.contains("p_fixed")){
            ReserveMark.className="Reserve_mark"
        }
        if(target.tagName=="DIV" && target.classList.contains("Reserve_active") || target.classList.contains("Reserve_active_d")){
            ReserveMark.className="Reserve_mark"
        }
    }
}

function backIndex(){
    let backIndex=document.querySelector("#backIndex")
    let dateLeave=document.querySelector(".check_in").innerHTML;
    let dateLiveIn=document.querySelector(".check_leave").innerHTML;
    backIndex.onclick=function(){
        location.href=encodeURI(`list.html?dateLiveIn=${dateLiveIn}&dateLeave=${dateLeave}`);
    }
}

function toggleInfo(){
    let Linfo=document.querySelector(".l_info");
    let Rinfo=document.querySelector(".r_info");
    let detailNav=document.querySelector(".detail_nav");
    let rights=document.querySelector("#toggleRigths");
    detailNav.addEventListener("click",(e) =>{
        let target=e.target;
        if(target.classList.contains("l_info")){
            rights.classList.remove("rights_active")
            Linfo.classList.add("active")
            Rinfo.classList.remove("active")
        }else{
            rights.classList.add("rights_active")
            Rinfo.classList.add("active")
            Linfo.classList.remove("active")
        }
    })
}

function toWrite(){

    let ReserveMark=document.querySelector(".Reserve_mark");
    let ReserveFoot=document.querySelector(".Reserve_foot");
/*    let orderWrite=document.querySelector(".order_write");
    let dealWrite=document.querySelector(".deal_write");*/
    let dateLeave=document.querySelector(".check_in").innerHTML;
    let dateLiveIn=document.querySelector(".check_leave").innerHTML;
    ReserveFoot.onclick=function(){
        let orderMsg=document.querySelectorAll(".order_msg span");
        ReserveMark.className="Reserve_mark";
        console.log(orderMsg)
        if(orderMsg.length>2){
            location.href = encodeURI(`deal.html?dateLiveIn=${dateLiveIn}&dateLeave=${dateLeave}`);
            console.log("2")
        }else{
            location.href = encodeURI(`ordeWrite.html?dateLiveIn=${dateLiveIn}&dateLeave=${dateLeave}`);
        }
    }
}




















init()