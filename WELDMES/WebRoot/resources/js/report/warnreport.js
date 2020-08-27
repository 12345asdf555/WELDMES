/**
 * 
 */
var namex;
var time;
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
			//				alert("Socket 已打开");
			//socket.send("这是来自客户端的消息" + location.href + new Date());
		};
		//获得消息事件
		socket.onmessage = function(msg) {
			/*alert(msg.data);*/
			dd = msg.data;
			//				alert(dd);
			var i;
			var rows = $('#dg').datagrid("getRows");
			/*alert(rows[dex][columns[0][0].field]);*/
			for (var g = 0; g < dd.length; g += 69 * 3) {
				for (var dex = 0; dex < rows.length; dex++) {
					/*alert(rows[dex][columns[0][1].field]);*/
					if ((dd.substring(8 + g, 12 + g) != "0000") && (dd.substring(4 + g, 8 + g) == rows[dex].machineid)) {
						rows[dex].machinestatus = dd.substring(0 + g, 2 + g);
						if ((dd.substring(0 + g, 2 + g) == "03") || (dd.substring(0 + g, 2 + g) == "05")) {
							rows[dex].macstatus = "工作";
						} else if (dd.substring(0 + g, 2 + g) == "07") {
							rows[dex].macstatus = "报警";
						} else if (dd.substring(0 + g, 2 + g) == "00") {
							rows[dex].macstatus = "待机";
						} else {
							rows[dex].macstatus = "关机";
						}
						rows[dex].realele = parseInt(dd.substring(12 + g, 16 + g), 16);
						rows[dex].realvol = parseInt(dd.substring(16 + g, 20 + g), 16);
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
		}
	})
}

$(function() {
	var width = $("#treeDiv").width();
	$(".easyui-layout").layout({
		onCollapse : function() {
			$("#dg").datagrid({
				height : $("#body").height(),
				width : $("#body").width()
			})
		},
		onExpand : function() {
			$("#dg").datagrid({
				height : $("#body").height(),
				width : $("#body").width()
			})
		}
	});
	insframeworkTree();
})

function wpt() {
	$("#dg").datagrid({
		fitColumns : true,
		height : ($("body").height() - 50),
		width : $("#body").width(),
		idField : 'id',
		toolbar : "#toolbar",
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		url : "user/getAllUser",
		singleSelect : true,
		rownumbers : true,
		pagination : true,
		showPageList : false,
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
		},*/ {
			field : 'machineid',
			title : '焊机号',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'currentwelder',
			title : '焊工姓名',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'warninfo',
			title : '报警信息',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'boottime',
			title : '开始时间',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'offtime',
			title : '关机时间',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'onlinetime',
			title : '持续时间',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'ele',
			title : '电流',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'vol',
			title : '电压',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'option',
			title : '操作',
			width : 130,
			halign : "center",
			align : "left",
			formatter : function(value, row, index) {
				var str = "";
				str += '<a id="option" class="easyui-linkbutton" href="javascript:"/>';
				return str;
			}
		} ] ],
		toolbar : '#toolbar',
		nowrap : false,
		rowStyler : function(index, row) {
			if ((index % 2) != 0) {
				//处理行代背景色后无法选中
				var color = new Object();
				return color;
			}
		},
		onLoadSuccess : function(data) {
			$("a[id='option']").linkbutton({
				text : '停机',
				plain : true,
				iconCls : 'icon-Role'
			});
		}
	});

}

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