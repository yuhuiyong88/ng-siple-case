export class City{
    constructor (data){
        let defaults={
            data:"",
            hotList:"",
            callback:function(data){

            }
        }

        let opt=Object.assign({},defaults,data);
        this.opt=opt;
        this.cityPlugin=document.querySelector("#city_plugin");
        this.cityAlpha=document.querySelector(".city_alpha");
        this.selectMain=document.querySelector(".select_main");
        this.selectHot=document.querySelector(".select_hot");
        this.cityAlphaList=this.cityAlpha.querySelector("li");
        this.moreList=document.querySelector(".more_list li");
        this.addElement()
        this.hotCity()
        this.collecCityHeight()
        this.bindEvent()
        this.show()
        this.hide()
    }

    addElement(){
        let [alpha_str,alpha_sel]=['','']
        alpha_str=`<div class="title_common">更多</div><ul class="more_list">`;
        for(let i in this.opt.data){
            alpha_str+=`<span alpha="${ this.opt.data[i].alpha }">${this.opt.data[i].alpha}</span>`
            alpha_sel+=`<div class="main_list">
                            <div class="title_common" alpha="${ this.opt.data[i].alpha }">${ this.opt.data[i].alpha }</div>
                            <ul class="alpha">
                            ${
                                this.opt.data[i].data.map((value,index) => {
                                    return `<li>${ value["0"] }</li>`
                                }).join("")
                            }
                            </ul>
                        </div>`
        }
        alpha_str+=`</ul>`
        this.cityAlpha.innerHTML=alpha_str;
        this.selectMain.innerHTML=alpha_sel;
    }

    hotCity(){
        let hotCityEle=`<div class="title_common">热门</div><ul class="hot_list">`;
        for(let i in this.opt.hotList){
            hotCityEle+=`<li>${ this.opt.hotList[i]}</li>`
        }
        hotCityEle+=`</ul>`
        this.selectHot.innerHTML=hotCityEle;
    }

    collecCityHeight(){
        let alphaDom=document.querySelectorAll("[alpha]");
        let height_info={};
        Array.from(alphaDom).forEach((dom,index) => {
            //console.log(dom.getAttribute("alpha"))
            height_info[dom.getAttribute("alpha")] = dom.offsetTop;
        })
        this.heightInfo=height_info;
    }
    bindEvent(){

        this.cityPlugin.addEventListener("click",(e) => {
            let target=e.target;
            if(target.tagName=="SPAN"){
                this.cityPlugin.scrollTop=12222
                this.cityPlugin.scrollTop=this.heightInfo[target.getAttribute("alpha")];
                console.log(this.heightInfo[target.getAttribute("alpha")])
            }
            if(target.tagName=="LI"){
                this.opt.callback(target.innerHTML)
                this.hide()
            }
            if(target.tagName=="I" && target.classList.contains("back")){
                this.hide()
            }

        },false)

    }

    show(){
        this.cityPlugin.classList.add("plugin_active")
        this.cityPlugin.scrollTop=0
    }

    hide(){
        this.cityPlugin.classList.remove("plugin_active")
    }
}
























/**
 * Created by samsung on 2017/3/15.
 */
