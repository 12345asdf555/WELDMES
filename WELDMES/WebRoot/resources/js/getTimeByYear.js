$(function(){
	getOldTime();
	getNewTime();
})

function getOldTime(){
	//获取当前时间
	var now = new Date();  
	now.setMonth(now.getMonth()-6);//获取6个月前的日期 
    var year = now.getFullYear();//年  
    var month = now.getMonth() + 1;//月  
    var day = now.getDate();//日
    var hh = now.getHours();//时  
    var mm = now.getMinutes();//分  
    var ss = now.getSeconds();//秒  
    
    var oldtime = year + "-";
      
    if(month < 10){
        oldtime += "0";
    }
    oldtime += month + "-";
      
    if(day < 10){
        oldtime += "0";
    }          
    oldtime += day + " ";
    
    if(hh < 10){
        oldtime += "0";
    }
    oldtime += hh + ":";
    
    if (mm < 10){
    	oldtime += '0';
    }
    oldtime += mm + ":";
       
    if (ss < 10){
    	oldtime += '0';
    }
    oldtime += ss;
	$("#dtoTime1").datetimebox('setValue',oldtime);
}

function getNewTime(){
	//获取当前时间
	var now = new Date();  
    
    var year = now.getFullYear();//年  
    var month = now.getMonth() + 1;//月  
    var day = now.getDate();//日
    var hh = now.getHours();//时  
    var mm = now.getMinutes();//分  
    var ss = now.getSeconds();//秒  
    
    var nowtime = year + "-";
      
    if(month < 10){
        nowtime += "0";
    }
    nowtime += month + "-";
      
    if(day < 10){
        nowtime += "0";
    }          
    nowtime += day + " ";
    
    if(hh < 10){
        nowtime += "0";
    }
    nowtime += hh + ":";
    
    if (mm < 10){
    	nowtime += '0';
    }
    nowtime += mm + ":";
       
    if (ss < 10){
    	nowtime += '0';
    }
    nowtime += ss;
	$("#dtoTime2").datetimebox('setValue',nowtime);
}