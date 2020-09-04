/**
 * 
 */
var dd;
var name;
var num0 = 0;
var num1 = 0;
var num2 = 0;
var num3 = 0;
var xxx = 0;
var namex;
var pos;
var i = 0;
var data1;
var on = new Array();
var on1 = new Array();
var warn = new Array();
var wait = new Array();
var off = new Array();
$(function() {
	$.ajax({
		type : "post",
		async : false,
		url : "td/AllTdbf",
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				data1 = eval(result.web_socket);
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});

	$.ajax({
		type : "post",
		async : false,
		url : "td/allWeldname",
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				namex = eval(result.rows);
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});

	var pro = document.getElementById("project").value;
	$.ajax({
		type : "post",
		async : false,
		url : "td/getAllTdp2?div=" + pro,
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(data) {
			if (data) {
				da = eval(data.rows);
			}
		}
	})
	newSearch();
})


function newSearch() {
	$(function() {
		var socket;
		if (typeof (WebSocket) == "undefined") {
	    	WEB_SOCKET_SWF_LOCATION = "resources/js/WebSocketMain.swf";
	    	WEB_SOCKET_DEBUG = true;
		}
		$(function() {
			//实现化WebSocket对象，指定要连接的服务器地址与端口
			socket = new WebSocket(data1);
			//打开事件
			socket.onopen = function() {
				//				alert("Socket 已打开");
				//socket.send("这是来自客户端的消息" + location.href + new Date());
			};
			//获得消息事件
			socket.onmessage = function(msg) {
				/*alert(msg.data);*/
				dd = msg.data;
				if (num3 == 0) {
					for (var dex = 0; dex < dd.length; dex = dex + 159) {
						if (dd.substring(2 + dex, 4 + dex) == da[0].fid) {
							xxx++;
							document.getElementById("statusn").value = xxx;
						}
					}
					num3++;
				}
				for (var n = 0; n < dd.length; n += 159) {
					if ((dd.substring(0 + n, 2 + n) == "03") || (dd.substring(0 + n, 2 + n) == "05") || (dd.substring(0 + n, 2 + n) == "07") || (dd.substring(0 + n, 2 + n) == "00")) {
						if (on1.length == 0) {
							var l1 = 1;
							var lo = 0;
							for (var a1 = 0; a1 < l1; a1++) {
								if (dd.substring(4 + n, 8 + n) != on1[a1]) {
									on1.push(dd.substring(4 + n, 8 + n));
								}
							}
						} else {
							l1 = on1.length;
							var lo = 0;
							for (var a1 = 0; a1 < l1; a1++) {
								/*alert(dd.substring(4+n, 8+n));*/
								if (dd.substring(4 + n, 8 + n) != on1[a1]) {
									lo++;
									if (lo == on1.length) {
										on1.push(dd.substring(4 + n, 8 + n));
									}
								} else {
									document.getElementById("onn").value = 0;
									document.getElementById("warningn").value = 0;
									document.getElementById("waitn").value = 0;
									document.getElementById("offn").value = 0;
									on1.length = 0;
									on1.push(dd.substring(4 + n, 8 + n));
									break;
								}
							}
						}
					}
				}
				;
				i = 0;
				for (var index = 0; index < dd.length; index = index + 159) {
					num = 0;
					num0 = 0;
					num1 = 0;
					num2 = 0;
					/*var i = Math.floor(index/3);*/
					if (dd.substring(2 + index, 4 + index) == da[0].fid) {
						i++;
						if ($("#div" + i + "").length <= 0) {
							var str = "<div id='div" + i + "' style='width:270px;heigth:300px;float:left;'>" +
								"<div>" +
								"<div style=' width:17px; height:17px; background-color:#A9A9A9; border-radius:25px; float:left;' id='fequipment_no" + i + "'/><div/>&nbsp;" +
								"<input class='liveInput' id='btnReg" + i + "' type='button' value='' onclick='show(this.value)'/></div>&nbsp;" +
								"<div>" +
								"<label for='vol' style='text-align:center;display:inline-block'/>电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;压</lable>&nbsp;" +
								"<input class='liveInput' type='text' id='voltage" + i + "' readonly='true' value=''/></div>&nbsp;" +
								"<div>" +
								"<label for='ele' style='text-align:center;display:inline-block'/>电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;流</lable>&nbsp;" +
								"<input class='liveInput' type='text' id='electricity" + i + "' readonly='true' value=''/></div>&nbsp;" +
								"<div>" +
								"<label for='num' style='text-align:center;display:inline-block'/>焊工编号</lable>&nbsp;" +
								"<input class='liveInput' type='text' id='welderNo" + i + "' readonly='true' value=''/></div>&nbsp;" +
								"<div>" +
								"<label for='name' style='text-align:center;display:inline-block'/>焊工姓名</lable>&nbsp;" +
								"<input class='liveInput' type='text' id='welderName" + i + "' readonly='true' value=''/></div>&nbsp;" +
								"<div>" +
								"<label for='po' style='text-align:center;display:inline-block'/>设备位置</lable>&nbsp;" +
								"<input class='liveInput' type='text' id='position" + i + "' readonly='true' value=''/></div><div/>";
							$("#body").append(str);
						} else {
							if (dd.substring(0 + index, 2 + index) == "03" || dd.substring(0 + index, 2 + index) == "05") {
								document.getElementById("fequipment_no" + i + "").style.background = "#00FF00";
							}
							if (dd.substring(0 + index, 2 + index) == "07") {
								document.getElementById("fequipment_no" + i + "").style.background = "#FF0000";
							}
							if (dd.substring(0 + index, 2 + index) == "00") {
								document.getElementById("fequipment_no" + i + "").style.background = "#0000CD";
							}
						}
						if (dd.substring(8 + index, 12 + index) != "0000") {
							for (var k = 0; k < namex.length; k++) {
								if (namex[k].fwelder_no == dd.substring(8 + index, 12 + index)) {
									document.getElementById("welderName" + i + "").value = namex[k].fname;
								}
							}
							$.ajax({
								type : "post",
								async : false,
								url : "td/getPosition?equip=" + dd.substring(4 + index, 8 + index),
								data : {},
								dataType : "json", //返回数据形式为json  
								success : function(result) {
									var fposition = eval(result.rows);
									pos = fposition[0].fpositin;
									document.getElementById("position" + i + "").value = pos;
								}
							})
							document.getElementById("btnReg" + i + "").value = dd.substring(4 + index, 8 + index);
							document.getElementById("voltage" + i + "").value = parseInt(dd.substring(16 + index, 20 + index), 16);
							document.getElementById("electricity" + i + "").value = parseInt(dd.substring(12 + index, 16 + index), 16);
							document.getElementById("welderNo" + i + "").value = parseInt(dd.substring(8 + index, 12 + index), 16);
						/*document.getElementById("position"+i+"").value=c[index].fposition;*/
						} else {
							document.getElementById("btnReg" + i + "").value = dd.substring(4 + index, 8 + index);
						}

						if (dd.substring(0 + index, 2 + index) == "03" || dd.substring(0 + index, 2 + index) == "05") {
							num0++;
							var oni = parseInt(document.getElementById("onn").value);
							document.getElementById("onn").value = oni + num0;
						} else if (dd.substring(0 + index, 2 + index) == "07") {
							num1++;
							var wni = parseInt(document.getElementById("warningn").value);
							document.getElementById("warningn").value = wni + num1;
						} else if (dd.substring(0 + index, 2 + index) == "00") {
							num2++;
							var wai = parseInt(document.getElementById("waitn").value);
							document.getElementById("waitn").value = wai + num2;
						} else {
							document.getElementById("offn").value = xxx - parseInt(document.getElementById("onn").value) - parseInt(document.getElementById("warningn").value) - parseInt(document.getElementById("waitn").value);
						}

					}

				}
			};
			//关闭事件
			socket.onclose = function() {
				alert("Socket已关闭");
			};
			//发生了错误事件
			socket.onerror = function() {
				alert("发生了错误");
			}
		});

		$("#btnSend").click(function() {
			socket.send("强哥");
		});

		$("#btnClose").click(function() {
			socket.close();
		});
	});
}
function show(value) {
	var url = "td/AllTda?value=" + value;
	var img = new Image();
	img.src = url; // 设置相对路径给Image, 此时会发送出请求
	url = img.src; // 此时相对路径已经变成绝对路径
	img.src = null; // 取消请求
	window.location.href = encodeURI(url);
}