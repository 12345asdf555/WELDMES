/**
 * 
 */
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

var chartStr = "";
function setParam() {
	var otype = $("input[name='otype']:checked").val();
	var dtoTime1 = $("#dtoTime1").datetimebox('getValue');
	var dtoTime2 = $("#dtoTime2").datetimebox('getValue');
	chartStr = "?otype=" + otype + "&dtoTime1=" + dtoTime1 + "&dtoTime2=" + dtoTime2;
}
function serachCompanyOverproof() {
	chartStr = "";
	werpt();
}

function werpt() {
	setParam();
	$("#dg").datagrid({
		fitColumns : true,
		height : ($("#body").height()),
		width : $("#body").width(),
		idField : 'id',
		toolbar : "#toolbar",
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		url : "rep/getWelderReport" + chartStr,
		singleSelect : true,
		rownumbers : true,
		pagination : true,
		showPageList : false,
		columns : [ [ {
			field : 'fname',
			title : '焊工姓名',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'phone',
			title : '手机号',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'weldernum',
			title : '焊工号',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'back',
			title : '备注信息',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'valuetime',
			title : '有效焊接时间',
			width : 100,
			halign : "center",
			align : "left"
		}, /*{
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
			field : 'machinemodel',
			title : '焊机型号',
			width : 100,
			halign : "center",
			align : "left"
		} ] ],
		toolbar : '#toolbar',
		nowrap : false,
		rowStyler : function(index, row) {
			if ((index % 2) != 0) {
				//处理行代背景色后无法选中
				var color = new Object();
				return color;
			}
		}
	});

}
$(function() {
	werpt();
})

function insframeworkTree() {
	$("#myTree").tree({
		onClick : function(node) {
			$("#dg").datagrid('load', {
				"insid" : node.id
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
		height : $("#body").height(),
		width : $("#body").width()
	});
}