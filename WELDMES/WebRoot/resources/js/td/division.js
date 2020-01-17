/**
 * 
 */
var da;
var data1;
var dat;
var num = 0;
var num0 = 0;
var num1 = 0;
var num2 = 0;
var num3 = 0;
var on1 = new Array();
var on = new Array();
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
	var div = document.getElementById("division").value;
	$.ajax({
		type : "post",
		async : false,
		url : "td/getAllTdd?div=" + div,
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
			alert("您的浏览器不支持WebSocket");
			return;
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
				dat = msg.data;

				for (var n = 0; n < dat.length; n += 159) {
					if ((dat.substring(0 + n, 2 + n) == "03") || (dat.substring(0 + n, 2 + n) == "05") || (dat.substring(0 + n, 2 + n) == "07") || (dat.substring(0 + n, 2 + n) == "00")) {
						if (on1.length == 0) {
							var l1 = 1;
							var lo = 0;
							for (var a1 = 0; a1 < l1; a1++) {
								if (dat.substring(4 + n, 8 + n) != on1[a1]) {
									on1.push(dat.substring(4 + n, 8 + n));
								} else {
									for (var index = 0; index < da.length; index++) {
										if ($("#div" + index + "").length <= 0) {
										} else {
											document.getElementById("on" + index + "").value = 0;
											document.getElementById("warning" + index + "").value = 0;
											document.getElementById("wait" + index + "").value = 0;
											document.getElementById("off" + index + "").value = 0;
										}
									}
								}
							}
						} else {
							l1 = on1.length;
							var lo = 0;
							for (var a1 = 0; a1 < l1; a1++) {
								/*alert(dd.substring(4+n, 8+n));*/
								if (dat.substring(4 + n, 8 + n) != on1[a1]) {
									lo++;
									if (lo == on1.length) {
										on1.push(dat.substring(4 + n, 8 + n));
									}
								} else {
									for (var index = 0; index < da.length; index++) {
										if ($("#div" + index + "").length <= 0) {
										} else {
											document.getElementById("on" + index + "").value = 0;
											document.getElementById("warning" + index + "").value = 0;
											document.getElementById("wait" + index + "").value = 0;
											document.getElementById("off" + index + "").value = 0;
										}
									}
									on1.length = 0;
									on1.push(dat.substring(4 + n, 8 + n));
									break;
								}
							}
						}
					}
				}
				;

				for (var index = 0; index < da.length; index++) {
					num = 0;
					num0 = 0;
					num1 = 0;
					num2 = 0;
					num3 = 0;
					if ($("#div" + index + "").length <= 0) {
						/*			            	var i = Math.floor(index/3);
								            		if(index%3==0){*/
						/*		            			if($("#div"+i+"").length<=0)
								            				{*/
						//            				var str = "<div id='div"+index+"' style='width:270px;heigth:240px;float:left;'>" +
						//            				"<div>" +
						//            				"<input class='liveInput' id='btnReg"+index+"' type='button' value='' onclick='show(this.value)'/></div>&nbsp;" +
						//            				"<div>" +
						//            				"<label for='status' style='text-align:center;display:inline-block;width:20px'/>焊机总数</lable>&nbsp;" +
						//            				"<input class='liveInput' type='text' name='status"+index+"' id='status"+index+"' value='0'/></div>&nbsp;" +
						//            				"<div>" +
						//            				"<div style=' width:17px; height:17px; background-color:#00FF00; border-radius:25px; float:left;' id='electricity"+index+"'/><div/>&nbsp;" +
						//            				"<label for='on' style='text-align:center;display:inline-block'/>工作总数</lable>&nbsp;" +
						//            				"<input class='liveInput' type='text' name='on"+index+"' id='on"+index+"' value='0'/></div>&nbsp;" +
						//            				"<div>" +
						//            				"<div style=' width:17px; height:17px; background-color:#FF0000; border-radius:25px; float:left;' id='electricity"+index+"'/><div/>&nbsp;" +
						//            				"<label for='warning' style='text-align:center;display:inline-block'/>报警总数</lable>&nbsp;" +
						//            				"<input class='liveInput' type='text' name='warning"+index+"' id='warning"+index+"' value='0'/></div>&nbsp;" +
						//            				"<div>" +
						//            				"<div style=' width:17px; height:17px; background-color:#0000CD; border-radius:25px; float:left;' id='electricity"+index+"'/><div/>&nbsp;" +
						//            				"<label for='wait' style='text-align:center;display:inline-block'/>待机总数</lable>&nbsp;" +
						//            				"<input class='liveInput' type='text' name='wait"+index+"' id='wait"+index+"' value='0'/></div>&nbsp;" +
						//            				"<div>" +
						//            				"<div style=' width:17px; height:17px; background-color:#A9A9A9; border-radius:25px; float:left;' id='electricity"+index+"'/><div/>&nbsp;" +
						//            				"<label for='off' style='text-align:center;display:inline-block'/>关机总数</lable>&nbsp;" +
						//            				"<input class='liveInput' type='text' name='off"+index+"' id='off"+index+"' value='0'/></div><div/>";
						//            				$("#body").append(str);
						var str = '<div class="boxls" id="div' + index + '"><ul><li class="lshead"><a href="javascript:show(' + da[index].fid + ')" id="btnReg' + index + '">' + da[index].fname + '</a></li></ul>' +
							'<ul><li><div class="list2">焊接总数</div><div class="list3"><input class="livelist" class="list3" name="status' + index + '" id="status' + index + '" value="0" readonly="true" type="text"></div></li></ul>' +
							'<ul><li><div class="triangle-right triangle-right-ls3"></div><div class="list1">工作总数</div><div class="list3"><input class="livelist" class="list3" name="on' + index + '" id="on' + index + '" value="0" readonly="true" type="text"></div></li></ul>' +
							'<ul><li><div class="triangle-right triangle-right-ls2"></div><div class="list1">报警总数</div><div class="list3"><input class="livelist" class="list3" name="warning' + index + '" id="warning' + index + '" value="0" readonly="true" type="text"></div></li></ul>' +
							'<ul><li><div class="triangle-right triangle-right-ls1"></div><div class="list1">待机总数</div><div class="list3"><input class="livelist" class="list3" name="wait' + index + '" id="wait' + index + '" value="0" readonly="true" type="text"></div></li></ul>' +
							'<ul><li><div class="triangle-right triangle-right-ls4"></div><div class="list1">关机总数</div><div class="list3"><input class="livelist" class="list3" name="off' + index + '" id="off' + index + '" value="0" readonly="true" type="text"></div></li></ul></div>';
						$("#box").append(str);
					}
					$("#btnReg" + index).html(da[index].fname);
					for (var l = 0; l < dat.length; l = l + 159) {
						if (da[index].fid == dat.substring(l + 2, l + 4)) {
							num++;
							if (dat.substring(0 + l, 2 + l) == "03" || dat.substring(0 + l, 2 + l) == "05") {
								num0++;
								var oni = parseInt(document.getElementById("on" + index + "").value);
								document.getElementById("on" + index + "").value = oni + num0;
							} else if (dat.substring(0 + l, 2 + l) == "07") {
								num1++;
								var wni = parseInt(document.getElementById("warning" + index + "").value);
								document.getElementById("warning" + index + "").value = wni + num1;
							} else if (dat.substring(0 + l, 2 + l) == "00") {
								num2++;
								var wai = parseInt(document.getElementById("wait" + index + "").value);
								document.getElementById("wait" + index + "").value = wai + num2;
							} else {
								document.getElementById("off" + index + "").value = num - parseInt(document.getElementById("on" + index + "").value) - parseInt(document.getElementById("warning" + index + "").value) - parseInt(document.getElementById("wait" + index + "").value);
							}
						}
					}
					document.getElementById("status" + index + "").value = num;
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
	var url = "td/AllTddp?value=" + value;
	var img = new Image();
	img.src = url; // 设置相对路径给Image, 此时会发送出请求
	url = img.src; // 此时相对路径已经变成绝对路径
	img.src = null; // 取消请求
	window.location.href = url;
}