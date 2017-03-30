export class CitySetDate{
    constructor (checkInDate,checkOutDate){
        this.checkInDate=checkInDate;
        this.checkOutDate=checkOutDate;
        this.setInDate();
        this.setOutDate();
    }

    setInDate(){
        let current_date=new Date();
        this.cYear=current_date.getFullYear();
        this.cMonth=current_date.getMonth()+1;
        this.cDay=current_date.getDate();
        let cHours=current_date.getHours();
        if(cHours>16){
            current_date=new Date(this.cYear+"/"+this.cMonth+"/"+(this.cDay+1));
            this.cYear=current_date.getFullYear();
            this.cMonth=current_date.getMonth()+1;
            this.cDay=current_date.getDate();
        }
        this.checkInDate.innerHTML=this.cYear+"/"+this.cMonth+"/"+this.cDay
    }

    setOutDate(){
        let checkOut_date=new Date(this.cYear+"/"+this.cMonth+"/"+(this.cDay+1));
        let outYear=checkOut_date.getFullYear();
        let outMonth=checkOut_date.getMonth()+1;
        let outDay=checkOut_date.getDate();
        this.checkOutDate.innerHTML=outYear+"/"+outMonth+"/"+(outDay)
    }

}







































