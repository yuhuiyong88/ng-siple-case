export class Calendar{

    constructor(options){
        let defaults={
            "initDate":new Date(),
            callback:function(){}
        }
        let opt=Object.assign({},defaults,options)
        this.opt=opt;
        let year=opt.initDate.getFullYear();
        let month=opt.initDate.getMonth();
        this.year=year;
        this.month=month;
        this.calenderSec=document.querySelector(".calender_sec");
        this.calenderPlugin=document.querySelector(".calender_plugin");
        this.calenderMonth=document.querySelector(".calender_month");
        this.title=document.querySelector(".calender_title")
        this.calenderHead=document.querySelector(".calender_head");
        this.getDays(year,month)
        this.starMonthDay(year,month)
        this.randerMonth(year,month)
        this.show();
        this.hide();
        this.bindEvent();
        this.randerStarDay(year,month);
        this.randerCurrentMonth(year,month);
        this.updateTitle(year,month);
    }

    updateTitle(year,month){
        this.title.innerHTML=year+"年"+(month+1)+"月"
    }

    getDays(year,month){
        let days=0;
        let arr31=[1,3,5,7,8,10,12];
        let arr30=[4,6,9,11];
        if(month==2){
            if( month%4==0 && month%100!=0 || month%400==0 ){
                days=29
            }else{
                days=28
            }
        }else{
            if( arr31.indexOf(month) > -1){
                days=31
            }else{
                days=30
            }
        }
        return days;
    }

    starMonthDay(year,month){
        let weeks=new Date(year,month,1).getDay();
        return weeks;
    }
    randerStarDay(year,month){
        let starDayWeek=this.starMonthDay(year,month)
        let prevMonthDay=this.getDays(year,month)
        let [str,i]=["",""];
        for(i=0;i<starDayWeek;i++){
            str+=`<span class="disable_color select_day">${ prevMonthDay-starDayWeek+i+1 }</span>`;
        }
        return str
    }

    randerMonth(year,month){
        let currentDays=this.getDays(year,month+1)
        let str="";
        for(let i=1;i<=currentDays;i++){
            str+=`<span class="select_day">${ i }</span>`;
        }
        return str;
    }

    randerCurrentMonth(year,month){
        let starD=this.randerStarDay(year,month);
        let currentD=this.randerMonth(year,month)
        this.calenderMonth.innerHTML=starD+currentD
    }

    bindEvent(){
        this.calenderHead.addEventListener("click",(e) => {
            let target=e.target;
            if(target.tagName=="I" && target.classList.contains("back")){
                this.hide()
            }
            if(target.tagName=="I" && target.classList.contains("success")){
                console.log(this.tagNames)
                this.tagNames.innerHTML=this.click_time;
                console.log(this.click_time)
                this.hide()
            }
        })
        this.calenderSec.addEventListener("click",(e) => {
            let target=e.target;
            let innerHtml='';

            let remove_color=this.calenderMonth.childNodes;
            for(let i=0; i<remove_color.length;i++){
                if(remove_color[i].classList.contains("check_color")){
                    remove_color[i].classList.remove("check_color")
                }
            }
            if(target.tagName=="SPAN" && target.classList.contains("select_day")){
                innerHtml=target.innerHTML;
                target.classList.add("check_color")
                this.click_time=this.year+"/"+(this.month+1)+"/"+innerHtml
            }
            if(target.tagName=="I" && target.classList.contains("lefts")){
                let data=new Date(this.year,(this.month-1));
                let prevYear=data.getFullYear();
                let prevMonth=data.getMonth();
                console.log(prevYear)
                console.log(prevMonth)
                this.randerCurrentMonth(prevYear,prevMonth);
                this.updateTitle(prevYear,prevMonth)
                this.year=prevYear;
                this.month=prevMonth;

            }
            if(target.tagName=="I" && target.classList.contains("rights")){
                let data=new Date(this.year,(this.month+1));
                let nextYear=data.getFullYear();
                let nextMonth=data.getMonth();
                console.log(nextYear)
                console.log(nextMonth)
                this.randerCurrentMonth(nextYear,nextMonth);
                this.updateTitle(nextYear,nextMonth);
                this.year=nextYear;
                this.month=nextMonth;
            }
        },false)


    }

    show(tagNames){
        this.tagNames=tagNames;
        this.calenderPlugin.classList.add("plugin_active")
    }

    hide(){
        this.calenderPlugin.classList.remove("plugin_active")
    }




























}
