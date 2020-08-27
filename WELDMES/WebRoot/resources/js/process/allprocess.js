/**
 * 
 */
$(function() {
	$("#dg").datagrid({
		//		fitColumns : true,
		height : ($("#body").height()),
		width : $("#body").width(),
		idField : 'id',
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		url : "product/getAllProcess",
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
			field : 'processname',
			title : '工艺名称',
			//			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'weldposition',
			title : '焊接位态',
			//			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'material',
			title : '材质',
			//			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'format',
			title : '规格',
			//			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'method',
			title : '焊接方法',
			//			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'drying',
			title : '焊材烘干条件',
			//			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'temperature',
			title : '预热温度',
			//			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'factor',
			title : '后热条件',
			//			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'require',
			title : '热处理条件',
			//			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'lecel',
			title : '无损检测合格级别',
			//			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'qualify',
			title : '员工资质',
			//			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'range',
			title : '线能量控制范围',
			//			width : 100,
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
				str += '<a id="edit" class="easyui-linkbutton" href="javascript:editProcess()"/>';
				str += '<a id="remove" class="easyui-linkbutton" href="javascript:removeProcess()"/>';
				return str;
			}
		} ] ],
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