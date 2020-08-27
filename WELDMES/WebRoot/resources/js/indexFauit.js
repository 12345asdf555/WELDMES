var socket;
var redata;
var machine_no = new Array();
var ary = new Array();
var fauitContent,timer,fauitstr;
var client,clientId;
$(function(){
	fauitContent = document.getElementById('fauitContent');
	$.ajax({  
	      type : "post",  
	      async : false,
	      url : "td/AllTdbf",  
	      data : {},  
	      dataType : "json", //返回数据形式为json  
	      success : function(result) {
	          if (result) {
	        	  websocketURL = eval(result.web_socket);
	          }  
	      },
	      error : function(errorMsg) {  
	          alert("数据请求失败，请联系系统管理员!");  
	      }  
	 });
	mqttTest();
	getWelderMachine();
	webclient();
//    websocket();
    $("#fauitContent").width($("body").width()-260);//260为图片的宽度+滚动栏及图片距右侧间距
})

//获取所有焊工编号和姓名
function getWelderMachine(){
	$.ajax({  
	      type : "post",  
	      async : false,
	      url : "welders/getWelderMachine",  
	      data : {},  
	      dataType : "json", //返回数据形式为json  
	      success : function(result) {
	          if (result) {
	        	  for(var i=0;i<result.machineary.length;i++){
	        		  machine_no.push({
	        			  "machineid" : result.machineary[i].machineid,
	        			  "machineno" : result.machineary[i].machineno,
	        			  "insfname" : result.machineary[i].insfname
	        		  });
	        	  }
	          }  
	      },
	      error : function(errorMsg) {  
	          alert("数据请求失败，请联系系统管理员!");  
	      }  
	 });
}

function webclient(){
	client.onMessageArrived = function(e){
		redata = e.payloadString;
		view();
	};
}

function view(){
	if(redata.length==297 || redata.length%99==0){
		for(var i = 0;i < redata.length;i+=99){
			var mstatus=redata.substring(36+i, 38+i);//故障状态
			switch (mstatus){
				case "01":
					content("E-010 焊枪开关OFF等待",i);
					break;
				case "02":
					content("E-000工作停止",i);
					break;
				case "10":
					content("E-100控制电源异常",i);
					break;
				case "15":
					content("E-150一次输入电压过高",i);
					break;
				case "16":
					content("E-160一次输入电压过低",i);
					break;
				case "20":
					content("E-200一次二次电流检出异常",i);
					break;
				case "21":
					content("E-210电压检出异常",i);
					break;
				case "22":
					content("E-220逆变电路反馈异常",i);
					break;
				case "30":
					content("E-300温度异常",i);
					break;
				case "70":
					content("E-700输出过流异常",i);
					break;
				case "71":
					content("E-710输入缺相异常",i);
					break;
				case "98":
					content("超规范停机",i);
					break;
				case "99":
					content("超规范报警",i);
					break;
				default:
					fauitstr = "";
					break;
			}
		}
	}
};

function content(fauit,index){
	var machineno="",insfname="",str;
	var machineid = redata.substring(4+index, 8+index);//焊机编号
	var time = redata.substring(54+index, 73+index);//发生时间
	for(var j=0;j<machine_no.length;j++){
		if(machine_no[j].machineid==parseInt(machineid)){
			machineno = machine_no[j].machineno;
			insfname = machine_no[j].insfname;
			break;
		}
	}
	if(!machineno){
		machineno = "未知";
	}
	if(!insfname){
		insfname = "未知";
	}
	str = "<span style='color:red'>！</span> 焊机编号："+ machineno +"，焊机归属："+ insfname +"，<span style='color:#0254ad'><a href='javascript:openLive()'>故障代码及名称："+ fauit +"</a></span>，发生时间："+ time+"&nbsp;&nbsp;&nbsp;";
	ary.push(str);
	fauitstr = str;
}

function  openLive(){
	window.open('td/AllTd');
}

window.setTimeout(function() {
	var num = 5;
	if(ary.length<5){
		num = ary.length;
	}
	for(var i=0;i<num;i++){
		$("#scrollcontent").append(ary[i]);
	}
	ary.length = 0;
	timer = window.setInterval(move, 10);
    fauitContent.onmouseover = function () {
        window.clearInterval(timer);
    };
    fauitContent.onmouseout = function () {
        timer = window.setInterval(move, 10);
    };
}, 5000);

var timeflag=0;
function move() {
    if(!fauitstr){
    	timeflag++;
    	if(timeflag>=300){
    		$("#scrollcontent").html("");
    		timeflag=0;
    	}
    }else{
	    fauitContent.scrollLeft++;
		if(fauitContent.scrollLeft+$("#fauitContent").width()>=$("#scrollcontent").width()){//当前数据是否已经显示完成
			$("#scrollcontent").append(ary.pop());
		}
    }
}

//监听窗口大小变化
window.onresize = function() {
    $("#fauitContent").width($("body").width()-260);
}

window.setInterval(function() {
	welder_no = new Array();
	welder_name = new Array();
	getWelderMachine();
}, 60000);

function mqttTest(){
	var websocketURL=null;
	$.ajax({
		type : "post",
		async : false,
		url : "td/AllTdbf",
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				websocketURL = result.web_socket;
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	clientId = Math.random().toString().substr(3,8) + Date.now().toString(36);
	client = new Paho.MQTT.Client(websocketURL.split(":")[0], parseInt(websocketURL.split(":")[1]), clientId);
	var options = {
        timeout: 5,  
        keepAliveInterval: 60,  
        cleanSession: false,  
        useSSL: false,  
        onSuccess: onConnect,  
        onFailure: function(e){  
            console.log(e);  
        },
        reconnect : true
	}
	
	//set callback handlers
	client.onConnectionLost = onConnectionLost;
//	client.onMessageArrived = onMessageArrived;

	//connect the client
	client.connect(options);
}

//called when the client connects
function onConnect() {
	// Once a connection has been made, make a subscription and send a message.
	console.log("onConnect");
	client.subscribe("weldmes-realdata", {
		qos: 0,
		onSuccess:function(e){  
            console.log("订阅成功");  
        },
        onFailure: function(e){  
            console.log(e);  
        }
	})
	clearData();
}

//called when the client loses its connection
function onConnectionLost(responseObject) {
	if (responseObject.errorCode !== 0) {
		console.log("onConnectionLost:"+responseObject.errorMessage);
	}
}