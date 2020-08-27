var work = new Array();
var wait = new Array();
var weld = new Array();
var mall = new Array();
var websocketURL;
var socket;
var redata;
var symbol=0;
var machine;
var namex;
var client,clientId;
$(function(){
	mqttTest();
	welder();
	machine();
	websocketurl();
//	websocket();
	webclient()
})

$(document).ready(function(){
	showPersonChart();
	showWelderChart();
})

function welder(){
	//焊工总数name.length
	$.ajax({  
	      type : "post",  
	      async : false,
	      url : "td/allWeldname",  
	      data : {},  
	      dataType : "json", //返回数据形式为json  
	      success : function(result) {
	          if (result) {
	        	  namex=eval(result.rows);
	          }  
	      },
	      error : function(errorMsg) {  
	          alert("数据请求失败，请联系系统管理员!");  
	      }  
	 });
}

function machine(){
	//焊机总数machine.length
	$.ajax({  
	      type : "post",  
	      async : false,
	      url : "td/getAllPosition",  
	      data : {},  
	      dataType : "json", //返回数据形式为json  
	      success : function(result) {
	    	  if (result) {
	    		  machine = eval(result.rows);
	          }  
	      },
	      error : function(errorMsg) {  
	          alert("数据请求失败，请联系系统管理员!");  
	      }  
	 });
}

function websocketurl(){
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
}

function webclient(){
	client.onMessageArrived = function(e){
		var redata = e.payloadString;
		if(redata.length==297 || redata.length%99==0){
			if(redata.substring(0,2)!="7E"){
			if(symbol==0){
				window.setTimeout(function() {
					for(var m=0;m<mall.length;m++){
						if(mall[m].fstatus=="00"){
							wait.push(mall[m]);
						}else{
							work.push(mall[m]);
						}
					}
					var data = [{value:work.length, name:'工作'},{value:wait.length, name:'待机'},{value:machine.length-work.length-wait.length, name:'关机'}];
					refreshWelderData(data);
					data = [{value:weld.length, name:'在线'},{value:namex.length-weld.length, name:'离线'}];
					refreshPersonData(data);
					work.length=0;
					wait.length=0;
					mall.length=0;
				}, 3000)
				symbol=1;
			}
			//53改为69
			for(var i = 0;i < redata.length;i+=99){
						if(redata.substring(0+i, 4+i)!="0000"){
						//组织机构与焊工编号都与数据库中一直则录入
							if(weld.length==0){
								weld.push(redata.substring(0+i, 4+i));
							}else{
								for(var j=0;j<weld.length;j++){
									if(weld[j]!=redata.substring(0+i, 4+i)){
										if(j==weld.length-1){
											weld.push(redata.substring(0+i, 4+i));
										}
									}else{
										break;
									}
								}
							}
						}
					if(redata.substring(36+i,38+i)=="03"||redata.substring(36+i,38+i)=="05"||redata.substring(36+i,38+i)=="07"||redata.substring(36+i,38+i)=="00"){
						for(var x=0;x<machine.length;x++){
							if(machine[x].fid == parseInt(redata.substring(4+i, 8+i))){
								if(mall.length==0){
									var arr  =
								     {
								         "fid" : redata.substring(4+i, 8+i),
								         "fstatus" : redata.substring(36+i,38+i)
								     }
									mall.push(arr);
								}else{
									for(var j=0;j<mall.length;j++){
										if(mall[j].fid!=redata.substring(4+i, 8+i)){
											if(j==mall.length-1){
												var arr  =
											     {
											         "fid" : redata.substring(4+i, 8+i),
											         "fstatus" : redata.substring(36+i,38+i)
											     }
												mall.push(arr);
											}
										}else{
											break;
										}
									}
								}
							}
						}
				  }
	/*			if(redata.substring(0+i,2+i)=="00"){
					for(var w=0;w<work.length;w++){
						if(work[w]!=redata.substring(4+i, 8+i)&&w==work.length-1){
							if(wait.length==0){
								wait.push(redata.substring(4+i, 8+i));
							}else{
								for(var j=0;j<wait.length;j++){
									if(wait[j]!=redata.substring(4+i, 8+i)){
										if(j==wait.length-1){
											wait.push(redata.substring(4+i, 8+i));
										}
									}else{
										break;
									}
								}
							}
						}
					}
				}*/
			//新增定时器
	//		if(symbol==0){
	//			window.setInterval(function() {
	//				work.length=0;
	//				weld.length=0;
	//				wait.length=0;
	//			}, 30000)
	//		}
	//		symbol=1;
			}
			}
		};
	}
}

var personcharts;
function showPersonChart(){
   	//初始化echart实例
	personcharts = echarts.init(document.getElementById("person"));
	//显示加载动画效果
	personcharts.showLoading({
		text: '稍等片刻,精彩马上呈现...',
		effect:'whirling'
	});
	option = {
		    title: {
		        text: '焊工总数\n'+namex.length+'人',
		        left: 'center',
		        top:'45%',//标题显示在pie中间
		        textStyle:{
		            fontSize:12,
		            align:'center'
		          }
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    series : [
		        {
		            name:'焊工在线统计',
		            type:'pie',
		            radius : ['40%', '60%'],
		            color:['#F6C95E','#82B3E0'],
		            data:[
		                {value:weld.length, name:'在线'},
		                {value:namex.length-weld.length, name:'离线'}
		            ].sort(function (a, b) { return a.value - b.value; }),
		            label: {
		            	widthL:10,
		                normal: {
		                	formatter: '{b}:\n{d}%',
		                    textStyle: {
		                        color: '#000'
		                    }
		                }
		            },
		            labelLine: {
		                normal: {
		                    length: 10,
		                    length2: 5
		                }
		            },
		            animationType: 'scale',
		            animationEasing: 'elasticOut',
		            animationDelay: function (idx) {
		                return Math.random() * 200;
		            }
		        }
		    ]
	}
	//为echarts对象加载数据
	personcharts.setOption(option);
	//隐藏动画加载效果
	personcharts.hideLoading();
}

function refreshPersonData(data){
    if(!personcharts){
         return;
    }
    //更新数据
     var option = personcharts.getOption();
     option.series[0].data = data.sort(function (a, b) { return a.value - b.value; });   
     personcharts.setOption(option);    
}
window.setInterval(function () {
	var data = [{value:weld.length, name:'在线'},{value:namex.length-weld.length, name:'离线'}];
	refreshPersonData(data);
},30000);

var weldercharts;
function showWelderChart(){
   	//初始化echart实例
	weldercharts = echarts.init(document.getElementById("welder"));
	//显示加载动画效果
	weldercharts.showLoading({
		text: '稍等片刻,精彩马上呈现...',
		effect:'whirling'
	});
	option = {
		    title: {
		        text: '焊机总数\n'+machine.length+'台',
		        left: 'center',
		        top:'45%',//标题显示在pie中间
		        textStyle:{
		            fontSize:12,
		            align:'center'
		          }
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    series : [
		        {
		            name:'焊机在线统计',
		            type:'pie',
		            radius : ['40%', '60%'],
		            color:['#F6C95E','#6870B3','#82B3E0'],
		            data:[
		                {value:work.length, name:'工作'},
		                {value:wait.length, name:'待机'},
		                {value:machine.length-work.length-wait.length, name:'关机'}
		            ].sort(function (a, b) { return a.value - b.value; }),
		            label: {
		                normal: {
			            	formatter: '{b}:\n{d}%',
		                    textStyle: {
		                        color: '#000'
		                    }
		                }
		            },
		            labelLine: {
		                normal: {
		                    length: 10,
		                    length2: 5
		                }
		            },
		            animationType: 'scale',
		            animationEasing: 'elasticOut',
		            animationDelay: function (idx) {
		                return Math.random() * 200;
		            }
		        }
		    ]
	}
	//为echarts对象加载数据
	weldercharts.setOption(option);
	//隐藏动画加载效果
	weldercharts.hideLoading();
}

function refreshWelderData(data){
    if(!weldercharts){
         return;
    }
    //更新数据
     var option = weldercharts.getOption();
     option.series[0].data = data.sort(function (a, b) { return a.value - b.value; });   
     weldercharts.setOption(option);    
}
window.setInterval(function () {
	for(var m=0;m<mall.length;m++){
		if(mall[m].fstatus=="00"){
			wait.push(mall[m]);
		}else{
			work.push(mall[m]);
		}
	}
	var data = [{value:work.length, name:'工作'},{value:wait.length, name:'待机'},{value:machine.length-work.length-wait.length, name:'关机'}];
	refreshWelderData(data);
	work.length=0;
	weld.length=0;
	wait.length=0;
	mall.length=0;
},30000);

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