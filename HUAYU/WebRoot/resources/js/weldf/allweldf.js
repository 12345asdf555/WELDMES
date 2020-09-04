/**
 * 
 */
$(function() {
	$("#dg").datagrid({
		fitColumns : true,
		height : ($("#body").height()),
		width : $("#body").width(),
		idField : 'id',
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		url : "product/getAllWeldf",
		singleSelect : true,
		rownumbers : true,
		pagination : true,
		showPageList : false,
		columns : [ [ {
			field : 'id',
			title : 'id',
			width : 100,
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'weldnum',
			title : '焊缝编号',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'weldinfo',
			title : '焊缝信息',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'remark1',
			title : '备注',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'remark2',
			title : '备注',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'remark3',
			title : '备注',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'remark4',
			title : '备注',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'edit',
			title : '操作',
			width : 130,
			halign : "center",
			align : "left",
			formatter : function(value, row, index) {
				var str = "";
				str += '<a id="edit" class="easyui-linkbutton" href="javascript:editWeldf()"/>';
				str += '<a id="remove" class="easyui-linkbutton" href="javascript:removeWeldf()"/>';
				str += '<a id="process" class="easyui-linkbutton" href="product/AllProcess?fid=' + row.id + '"/>';
				return str;
			}
		} ] ],
		nowrap : false,
		rowStyler : function(index, row) {
			if ((index % 2) != 0) {
				//处理行代背景色后无法选中
				var color = new Object();
				return color;
			}
		},
		onLoadSuccess : function(data) {
			$("a[id='edit']").linkbutton({
				text : '修改',
				plain : true,
				iconCls : 'icon-update'
			});
			$("a[id='remove']").linkbutton({
				text : '删除',
				plain : true,
				iconCls : 'icon-delete'
			});
			$("a[id='process']").linkbutton({
				text : '工艺信息',
				plain : true,
				iconCls : 'icon-select'
			});
		}
	});

})

function addWeldf() {
	var url = "product/toAddWeldf";
	var img = new Image();
	img.src = url; // 设置相对路径给Image, 此时会发送出请求
	url = img.src; // 此时相对路径已经变成绝对路径
	img.src = null; // 取消请求
	window.location.href = encodeURI(url);
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