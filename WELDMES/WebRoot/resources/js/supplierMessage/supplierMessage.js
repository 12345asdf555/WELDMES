$(function(){
	insframeworkTree();
	supplierMessageDatagrid();
	var vlogoflag = "";
});

function supplierMessageDatagrid(){
	$("#supplierMessageTable").datagrid( {
		height : $("#body").height(),
		width : $("#body").width(),
		idField : 'id',
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		url : "supplierMessage/getSupplierMessageList",
		singleSelect : true,
		rownumbers : true,
		remoteSort:false,
		showPageList : false, 
		columns : [ [ {
			field : 'supplierId',
			title : '序号',
			width : 50,
			halign : "center",
			align : "left",
			hidden:true
		}, {
			field : 'code',
			title : '供应商编码',
			width : 80,
			halign : "center",
			align : "left",
			sortable: true
		}, {
			field : 'name',
			title : '供应商名称',
			width : 80,
			halign : "center",
			align : "left"
		}, {
			field : 'address',
			title : '地址',
			width : 140,
			halign : "center",
			align : "left"
		}, {
			field : 'phone',
			title : '联系方式',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'contacts',
			title : '联系人',
			width : 60,
			halign : "center",
			align : "left"
		}, {
			field : 'remark',
			title : '备注',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'createTime',
			title : '创建时间',
			width : 140,
			halign : "center",
			align : "left"
		}, {
			field : 'edit',
			title : '操作',
			width : 230,
			halign : "center",
			align : "left",
			formatter:function(value,row,index){
				var str = "";
				str += '<a id="edit" class="easyui-linkbutton" href="javascript:edit('+row.supplierId+')"/>';
				str += '<a id="delete" class="easyui-linkbutton" href="javascript:delete('+row.supplierId+')"/>';
				return str;
			}
		}
		] ],
		pagination : true,
//		fitColumns : true,
		rowStyler: function(index,row){
            if ((index % 2)!=0){
            	//处理行代背景色后无法选中
            	var color=new Object();
                return color;
            }
        },
		onLoadSuccess:function(data){
	        $("a[id='edit']").linkbutton({text:'编辑',plain:true,iconCls:'icon-update'});
	        $("a[id='delete']").linkbutton({text:'删除',plain:true,iconCls:'icon-delete'});
		}
	});
}



function insframeworkTree(){
	$("#myTree").tree({  
		onClick : function(node){
			$("#equipmentAppointmentTable").datagrid('load',{
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
	$("#equipmentAppointmentTable").datagrid('resize', {
		height : $("#body").height(),
		width : $("#body").width()
	});
}

