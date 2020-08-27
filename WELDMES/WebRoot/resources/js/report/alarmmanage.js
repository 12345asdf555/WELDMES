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
	setParam();
	$("#dg").datagrid({
		fitColumns : true,
		height : ($("#body").height()),
		width : $("#body").width(),
		idField : 'id',
		toolbar : "#toolbar",
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		url : "rep/getWeldPara" + chartStr,
		singleSelect : true,
		rownumbers : true,
		pagination : true,
		showPageList : false,
		columns : [ [ {
			field : 'weldnum',
			title : '工号',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'weldname',
			title : '姓名',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'prodectinfo',
			title : '产品信息',
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
			field : 'onlinetime',
			title : '持续时间',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'back',
			title : '备注',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'standardele',
			title : '给定电流',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'standardvol',
			title : '给定电压',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'wsid',
			title : '车间',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'teamid',
			title : '班组',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'machineid',
			title : '焊机号',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'machinemodel',
			title : '型号',
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
		rowStyler : function(index, row) {
			if ((index % 2) != 0) {
				//处理行代背景色后无法选中
				var color = new Object();
				return color;
			}
		},
		onLoadSuccess : function(data) {
			$("a[id='option']").linkbutton({
				text : '历史曲线',
				plain : true,
				iconCls : 'icon-Role'
			});
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
			var data = $('#division').combobox('getData');
			$("#division ").combobox('select', data[0].value);
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
					"insid" : n
				})
			}
		}
	});
});

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