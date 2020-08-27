/**
 * 
 */
var namex;
var time;
var rowdex = 0;
var back = new Array();
$(function() {
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
	wpt();
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
	w();
})


function w() {
	if (typeof (WebSocket) == "undefined") {
    	WEB_SOCKET_SWF_LOCATION = "resources/js/WebSocketMain.swf";
    	WEB_SOCKET_DEBUG = true;
	}
	$(function() {
		//实现化WebSocket对象，指定要连接的服务器地址与端口
		socket = new WebSocket(data1);
		//打开事件
		socket.onopen = function() {
			//alert("Socket 已打开");
			//socket.send("这是来自客户端的消息" + location.href + new Date());
		};
		//获得消息事件
		socket.onmessage = function(msg) {
			var xxx = msg.data;

			var dd = msg.data;
			for (var n = 0; n < dd.length; n += 69) {
				if (dd.substring(8 + n, 12 + n) != "0000") {
					if (back.length == 0) {
						var l = 1;
						var ll = 0;
						for (var a = 0; a < l; a++) {
							if (dd.substring(4 + n, 8 + n) != back[a]) {
								back.push(dd.substring(4 + n, 8 + n));
							} else {
								continue;
							}
						}
					} else {
						l = back.length;
						var ll = 0;
						for (var a = 0; a < l; a++) {
							if (dd.substring(4 + n, 8 + n) != back[a]) {
								ll++;
								if (ll == back.length) {
									back.push(dd.substring(4 + n, 8 + n));
								}
							} else {
								continue;
							}
						}
					}
				}
			}
			;

			if (xxx.substring(0, 2) != "7E") {
				dd = msg.data;
				var i;
				var rows = $('#dg').datagrid("getRows");
				for (var g = 0; g < dd.length; g += 69 * 3) {
					for (var dex = 0; dex < rows.length; dex++) {
						if ((dd.substring(8 + g, 12 + g) != "0000") && (dd.substring(4 + g, 8 + g) == rows[dex].machineid)) {
							rows[dex].machinestatus = dd.substring(0 + g, 2 + g);
							if ((dd.substring(0 + g, 2 + g) == "03") || (dd.substring(0 + g, 2 + g) == "05") || (dd.substring(0 + g, 2 + g) == "07")) {
								rows[dex].macstatus = "工作";
							} 
							else if (dd.substring(0 + g, 2 + g) == "00") {
								rows[dex].macstatus = "待机";
							} else {
								rows[dex].macstatus = "关机";
							}
							rows[dex].realele = parseInt(dd.substring(12 + g, 16 + g));
							rows[dex].realvol = (parseInt(dd.substring(16 + g, 20 + g)) / 10).toFixed(2);
							for (var k = 0; k < namex.length; k++) {
								if (namex[k].fwelder_no == dd.substring(8 + g, 12 + g)) {
									rows[dex].currentwelder = namex[k].fname;
								}
							}
							;
							rows[dex].weldingtime = dd.substring(53 + g, 61 + g);
							rows[dex].onlinetime = dd.substring(61 + g, 69 + g);
							rows[dex].inspower = parseInt(dd.substring(12 + g, 16 + g), 16) * parseInt(dd.substring(16 + g, 20 + g), 16);
							rows[dex].status = "在线";
							$('#dg').datagrid('refreshRow', dex);
						}
					}
				}

				if ((rowdex < back.length) && (rows.length != 0)) {
					for (var dex1 = 0; dex1 < rows.length; dex1++) {
						if (back[rowdex] == rows[dex1].machineid) {
							$('#dg').datagrid('insertRow', {
								index : 0,
								row : rows[dex1]
							});
							$('#dg').datagrid('deleteRow', dex1 + 1); //删除一行
						}
					}
					rowdex++;
				}
			}
		}
	})
}

$(function() {
	var width = $("#treeDiv").width();
	$(".easyui-layout").layout({
		onCollapse : function() {
			$("#dg").datagrid({
				height : $("#body").height() - 20,
				width : $("#body").width()
			})
		},
		onExpand : function() {
			$("#dg").datagrid({
				height : $("#body").height() - 20,
				width : $("#body").width()
			})
		}
	});
	insframeworkTree();
})

var chartStr = "";
function setParam() {
	var parent = $("#parent").val();
	var otype = $("input[name='otype']:checked").val();
	var dtoTime1 = $("#dtoTime1").datetimebox('getValue');
	var dtoTime2 = $("#dtoTime2").datetimebox('getValue');
	chartStr = "?otype=" + otype + "&parent=" + parent + "&dtoTime1=" + dtoTime1 + "&dtoTime2=" + dtoTime2;
}

function serachCompanyOverproof() {
	chartStr = "";
	wpt();
}

function wpt() {
	$("#dg").datagrid({
		//fitColumns : true,
		height : ($("body").height() - 50),
		width : $("#body").width(),
		idField : 'id',
		toolbar : "#toolbar",
		//pageSize : 10,
		//pageList : [ 10, 20, 30, 40, 50 ],
		url : "rep/getTime",
		singleSelect : true,
		rownumbers : true,
		pagination : false,
		//showPageList : false,
		columns : [ [ /*{
				field : 'wsid',
				title : '车间号',
				width : 100,
				halign : "center",
				align : "left"
			}, {
				field : 'teamid',
				title : '班组号',
				width : 100,
				halign : "center",
				align : "left"
			}, */ {
			field : 'machineid',
			title : '焊机号',
			//				width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'machinestatus',
			title : '焊机状态',
			width : 100,
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'macstatus',
			title : '焊机状态',
			//				width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'machinemodel',
			title : '焊机型号',
			//				width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'standardele',
			title : '给定电流',
			//				width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'standardvol',
			title : '给定电压',
			//				width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'realvol',
			title : '实际电压',
			//				width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'realele',
			title : '实际电流',
			//				width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'currentwelder',
			title : '当前焊工',
			//				width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'weldingtime',
			title : '焊接时间',
			//				width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'status',
			title : '群控状态',
			//				width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'inspower',
			title : '瞬时功率',
			//				width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'afv',
			title : '气流量',
			//				width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'boottime',
			title : '开机时间',
			//				width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'offtime',
			title : '关机时间',
			//				width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'onlinetime',
			title : '在线时间',
			//				width : 100,
			halign : "center",
			align : "left"
		} ] ],
		rowStyler : function(index, row) {
			if ((row.machinestatus == "03") || (row.machinestatus == "05") || (row.machinestatus == "07")) {
				return 'background-color:#00FF00;color:black;';
			} else if (row.machinestatus == "00") {
				return 'background-color:#0000CD;color:black;';
			} else {
				return 'background-color:#A9A9A9;color:black;';
			}
		}
	});
}

$(function() {
	wpt();
})
$(function() {
	$.ajax({
		type : "post",
		url : "user/getIns",
		dataType : "json",
		data : {},
		success : function(result) {
			if (result) {
				var optionstring = "";
				optionstring = "<option value='请选择...'>请选择...</option>";
				//循环遍历 下拉框绑定
				for (var k = 0; k < result.rows.length; k++) {
					optionstring += "<option value=\"" + result.rows[k].insid + "\" >" + result.rows[k].insname + "</option>";
				}
				$("#division").html(optionstring);
			} else {
				alert('车间号加载失败');
			}
			$("#division").combobox();
		},
		error : function() {
			alert('error');
		}
	});
})

$(document).ready(function() {
	$("#division").combobox({
		onChange : function(n, o) {
			if (n != "请选择...") {
				$("#dg").datagrid('load', {
					"parent" : n
				})
			}
		}
	});
});

function insframeworkTree() {
	$("#myTree").tree({
		onClick : function(node) {
			$("#dg").datagrid('load', {
				"parent" : node.id
			})
		}
	})
}

//监听窗口大小变化
window.onresize = function() {
	setTimeout(domresize, 500);
}

//改变表格高宽
function domresize() {
	$("#dg").datagrid('resize', {
		height : $("body").height() - 50,
		width : $("#body").width()
	});
}