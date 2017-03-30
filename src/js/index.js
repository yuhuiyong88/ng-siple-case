import { ajax,jsonp } from "./toops.js";
import { Swiper } from "../../lib/swiper.js";
import { City } from "../component/select.js";
import { CitySetDate } from "../component/cityDate.js";
import { Calendar } from "../component/calendar.js";

function init(){
    rendenBanner();
    toggleShowCity();
    setTime();
    toList()
}
//跳转到list页面
function toList(){
    let indexSubmit=document.querySelector(".index_submit");
    let dateLiveIn=document.querySelector(".in_data").innerHTML;
    let dateLeave=document.querySelector(".out_data").innerHTML;
    let checkInCity=document.querySelector(".check_in").innerHTML;
    console.log(dateLeave)
    indexSubmit.onclick=function(){
        if(dateLiveIn && dateLeave && checkInCity){
            location.href = encodeURI(`list.html?city=${checkInCity}&dateLiveIn=${dateLiveIn}&dateLeave=${dateLeave}`);
        }else{
            alert("请输入完整的信息")
        }
    }

}


function rendenBanner(){
    let [banner,str] = [document.querySelector(".banner_list"),""]
    ajax({
        url:"../../data/banner.json",
        callback:function(data){
            let ul_str="";
            for(let i in data){
                ul_str+=`<li class="swiper-slide"><img src="${ data[i].url }" alt=""/></li>`
            }
            banner.innerHTML=ul_str;
            new Swiper(".swiper-container",{
                autoplay:1000,
                loop:true
            })
        }
    })
}

function toggleShowCity(){
    let city_data;
    let Hot_list;
    city_data=new Promise(function(resolve,reject){
        ajax({
            url:"../../data/cities.json",
            callback:function(data){
                resolve(data)

            }
        })
    })
    ajax({
        url:"../../data/hotcity.json",
        callback:function(data){
            Hot_list=data;
            hotListCity(city_data,Hot_list);
        }
    })
    //定位
    getLocation()
}

//地理定位
function getLocation(){
    let location=document.querySelector(".location")
    location.onclick = () => {
        let glt=navigator.geolocation;
        if(glt){//watchLocation
         glt.getCurrentPosition(function(value){//success
             //精度
             let longitude = value.coords.longitude;
             //维度
             let latitude = value.coords.latitude;
             //map = new BMap.Map("map");
             console.log("坐标经度为：" + latitude + "， 纬度为：" + longitude );
         },function(value){//error
             switch (value.code) {
                 case 1:
                     alert("位置服务被拒绝");
                     break;
                 case 2:
                     alert("暂时获取不到位置信息");
                     break;
                 case 3:
                     alert("获取信息超时");
                     break;
                 case 4:
                     alert("未知错误");
                     break;
             }
             jsonp('http://apis.map.qq.com/ws/location/v1/ip?key=7SFBZ-SLNRP-UTZDY-VMH2X-NQG5T-D3FRF&output=jsonp',function(data){
                    console.log(data)
             })
         },{
             //指示浏览器获取高精度的位置，默认为false
             enableHighAccuracy:true,
             //指定获取地理位置的超时时间，默认不限时，单位为毫秒
             timeout:5000,
             //最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置
             maximumAge:3000
         });
         }else{
            alert("您的浏览器不支持使用HTML 5来获取地理位置服务");
        }

    }

}

function hotListCity(city_data,Hot_list){
    let city_module;
    let checkInHotel=document.querySelector(".check_in_hotel");
    city_data.then(function(data){
        city_module=new City({
            data:data,
            hotList:Hot_list,
            callback:function(city){
                checkInHotel.querySelector(".check_in").innerHTML=city
            }
        })

        checkInHotel.onclick=function(){
            city_module.show();
        }
    })
}

function setTime(){
    let checkInDate=document.querySelector(".check_in_data .in_data");
    let checkOutDate=document.querySelector(".check_out_hotel .out_data");
    new  CitySetDate(checkInDate,checkOutDate)
    renderDate(checkInDate,checkOutDate)
}


function renderDate(checkInDate,checkOutDate){
    let calender_module;
    calender_module=new Calendar({
        "initDate":new Date()
    })
    checkInDate.onclick=() => {
        calender_module.show(checkInDate);
    }
    checkOutDate.onclick=() => {
        calender_module.show(checkOutDate);
    }
}




init();
