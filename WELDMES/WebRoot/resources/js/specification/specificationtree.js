var machineModel=0;
var allMachineModel = new Array();
var node11,	websocketURL="";
$(function(){	
	$.ajax({
		type : "post",
		async : false,
		url : "weldingMachine/getMachineModelAll",
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				allMachineModel = eval(result.ary);
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
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
	insftrameworkTree();
	insframeworkTree();
//	mqttTest();
})

//组织机构树
function insftrameworkTree(){
	 $("#speTree").tree({  
         url:'insframework/getMachine',//请求路径
         onLoadSuccess:function(node,data){  
              var tree = $(this);  
              if(data){  
                  $(data).each(function(index,d) {  
                      if (this.state=='closed') {  
                          tree.tree('expandAll');  
                      }  
                  });  
              }  
         }
     });
}

//点击组织机构树触发
function insframeworkTree() {
	$("#speTree").tree({
		onClick : function(node) {
			for (var mm = 0; mm < allMachineModel.length; mm++) {
				if (allMachineModel[mm].id == node.id) {
					machineModel = allMachineModel[mm].model;
					break;
				}
			}
			node11 = node;
//			var leve = $(node.target).parentsUntil("ul.tree","ul").length+1;
			if (!node11.attributes) {
				alert("请选择对应的焊机！！！");
			} else {
				if($('#fchanel').length > 0){
					$('#fchanel').combobox('unselect', $('#fchanel').combobox('getValue'));
				}
				if($('#body').length > 0) {
					$('#body').remove();
				}

				if(machineModel==184){
					$('#bodys').load('wps/jumpJsp?urlStr=SPC',function() {
						$("script[src='resources/js/specification/SPC.js']").remove();
						$.getScript("resources/js/specification/SPC.js", function() {
							SPCINIT(1);
						});
					});
				}else if(machineModel==172){
					$('#bodys').load('wps/jumpJsp?urlStr=CPVE-400',function() {
						$("script[src='resources/js/specification/CPVE-400.js']").remove();
						$.getScript("resources/js/specification/CPVE-400.js", function() {
							CPVESINIT(1);
						});
					});
				}else if(machineModel==173){
					$('#bodys').load('wps/jumpJsp?urlStr=CPVE-250',function() {
						$("script[src='resources/js/specification/CPVE-250.js']").remove();
						$.getScript("resources/js/specification/CPVE-250.js", function() {
							CPVETINIT(1);
						});
					});
				}else if(machineModel==174){
					$('#bodys').load('wps/jumpJsp?urlStr=EP-500',function() {
						$("script[src='resources/js/specification/EP-500.js']").remove();
						$.getScript("resources/js/specification/EP-500.js", function() {
							EPWINIT(1);
						});
					});
				}else if(machineModel==175){
					$('#bodys').load('wps/jumpJsp?urlStr=EP-400',function() {
						$("script[src='resources/js/specification/EP-400.js']").remove();
						$.getScript("resources/js/specification/EP-400.js", function() {
							EPSINIT(1);
						});
					});
				}else if(machineModel==194){
					$('#bodys').load('wps/jumpJsp?urlStr=EP-400(K7573)',function() {
						$("script[src='resources/js/specification/EP-400(K7573).js']").remove();
						$.getScript("resources/js/specification/EP-400(K7573).js", function() {
							EPSINIT(1);
						});
					});
				}else if(machineModel==178){
					$('#bodys').load('wps/jumpJsp?urlStr=WB-500L',function() {
						$("script[src='resources/js/specification/WB-500L.js']").remove();
						$.getScript("resources/js/specification/WB-500L.js", function() {
							WBLINIT(1);
						});
					});
				}else if(machineModel==193){
					$('#bodys').load('wps/jumpJsp?urlStr=WB-500L517',function() {
						$("script[src='resources/js/specification/WB-500L517.js']").remove();
						$.getScript("resources/js/specification/WB-500L517.js", function() {
							WBLINIT(1);
						});
					});
				}else if(machineModel==177){
					$('#bodys').load('wps/jumpJsp?urlStr=WB-P400',function() {
						$("script[src='resources/js/specification/WB-P400.js']").remove();
						$.getScript("resources/js/specification/WB-P400.js", function() {
							WBPINIT(1);
						});
					});
				}else if(machineModel==176){
					$('#bodys').load('wps/jumpJsp?urlStr=WB-M350L',function() {
						$("script[src='resources/js/specification/WB-M350L.js']").remove();
						$.getScript("resources/js/specification/WB-M350L.js", function() {
							WBMLINIT(1);
						});
					});
				}else if(machineModel==182){
					$('#bodys').load('wps/jumpJsp?urlStr=WB-W400',function() {
						$("script[src='resources/js/specification/WB-W400.js']").remove();
						$.getScript("resources/js/specification/WB-W400.js", function() {
							WBWINIT(1);
						});
					});
				}else if(machineModel==186){
					$('#bodys').load('wps/jumpJsp?urlStr=WB-A350P',function() {
						$("script[src='resources/js/specification/WB-A350P.js']").remove();
						$.getScript("resources/js/specification/WB-A350P.js", function() {
							WBAPINIT(1);
						});
					});
				}else if(machineModel==185 || machineModel==187 || machineModel==188 || machineModel==189 || machineModel==190 || machineModel==191){
					$('#bodys').load('wps/jumpJsp?urlStr=QinTron',function() {
						$("script[src='resources/js/specification/QinTron.js']").remove();
						$.getScript("resources/js/specification/QinTron.js", function() {
							QinTronINIT(1);
							QinTronGET(-1);
						});
					});
				}else if(machineModel==195){
					$('#bodys').load('wps/jumpJsp?urlStr=CPVE400(K7592)',function() {
						$("script[src='resources/js/specification/CPVE400(K7592).js']").remove();
						$.getScript("resources/js/specification/CPVE400(K7592).js", function() {
							CPVESINIT(1);
						});
					});
				}else{
					$('#bodys').load('wps/jumpJsp?urlStr=CPVE-500',function() {
						$("script[src='resources/js/specification/CPVE-500.js']").remove();
						$.getScript("resources/js/specification/CPVE-500.js", function() {
							CPVEWINIT(1);
						});
					});
				}
			}
		}
	})
}

function mqttTest(){
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
}

//called when the client loses its connection
function onConnectionLost(responseObject) {
	if (responseObject.errorCode !== 0) {
		console.log("onConnectionLost:"+responseObject.errorMessage);
	}
}