import { getParams,ajax } from "./toops.js";
import { SlideSelector } from "../component/selector.js";

function init(){
    back();
    selsect();
    //hideSelect();
}

function back(){
    let backIndex=document.querySelector("#backIndex")
    backIndex.onclick=function(){
        location.href="detail.html?dateLiveIn=3月28日&dateLeave=3月30日"
        console.log("0")
    }
}

function selsect(){
    let slideSelector=new SlideSelector();
    let checkCount=document.querySelector(".check_count")
    checkCount.addEventListener("click",function(){
        slideSelector.show({
            list:[1,2,3,4,5,6],
            callback:function (data) {
                checkCount.innerHTML = data
                let check_user_info=document.querySelector(".check_user_info")
                let str = `<h2>入住人信息</h2>`;
                for (let i = 0; i < data * 1; i++) {
                    str += `<ul>
                                <li>
                                    <label for="">
                                        姓名
                                        <input type="text" placeholder="每间只需填写一个姓名"/>
                                    </label>
                                </li>
                                <li>
                                    <label for="">
                                        证件
                                        <input type="text" placeholder="入住人身份证/护照号"/>
                                    </label>
                                    <span>x</span>
                                </li>
                            </ul>`
                }
                check_user_info.innerHTML = str;
            }
        })
    },false)
}

function hideSelect(){
    let slideSelector=document.querySelector(".slide_selector");
    slideSelector.addEventListener("click",(e) => {
        let target=e.target;
        if(target.tagName=="DIV" && target.classList.contains("slide_selector")){
            slideSelector.classList.add("none")
        }
        if(target.tagName=="I" && target.classList.contains("cancel")){
            slideSelector.classList.add("none")
        }
    },false)
}



init()