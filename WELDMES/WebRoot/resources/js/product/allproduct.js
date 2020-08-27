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
		url : "product/getAllProduct",
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
			field : 'pronum',
			title : '产品编号',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'partnum',
			title : '零部件编号',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'proinfo',
			title : '产品信息',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'partinfo',
			title : '零部件信息',
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
			width : 200,
			halign : "center",
			align : "left",
			formatter : function(value, row, index) {
				var str = "";
				str += '<a id="edit" class="easyui-linkbutton" href="javascript:editProduct()"/>';
				str += '<a id="remove" class="easyui-linkbutton" href="javascript:removeProduct()"/>';
				str += '<a id="weldf" class="easyui-linkbutton" href="product/AllWeldf?fid=' + row.id + '"/>';
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
			$("a[id='weldf']").linkbutton({
				text : '焊缝信息',
				plain : true,
				iconCls : 'icon-select'
			});
		}
	});

})


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