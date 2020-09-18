$(function(){
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
			width : 140,
			halign : "center",
			align : "left",
			sortable: true
		}, {
			field : 'name',
			title : '供应商名称',
			width : 200,
			halign : "center",
			align : "left"
		}, {
			field : 'address',
			title : '地址',
			width : 200,
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
			width : 160,
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
			width : 200,
			halign : "center",
			align : "left",
			formatter:function(value,row,index){
				var str = "";
				str += '<a id="edit" class="easyui-linkbutton" href="javascript:edit('+row.supplierId+')"/>';
				str += '<a id="delete" class="easyui-linkbutton" href="javascript:deleteSupplier('+row.supplierId+')"/>';
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
//新增
function addSupplier(){
	vlogoflag = "add";
	$('#fm').form('clear');
	$('#dlg').window({
		title : "新增供应商",
		modal : true
	});
	$('#dlg').window('open');
	$('#fm').form('load', row);
}

//保存
function saveSupplierMessage(){
	var urls = "";
	var message = "";
	if (vlogoflag == "add"){
		message = "新增成功！";
		urls = "supplierMessage/addSupplierMessage";
	}else if(vlogoflag == "edit"){
		message = "修改成功！";
		urls = "supplierMessage/editSupplierMessage";
	}
	if (urls != ""){
		$('#fm').form('submit', {
			url : urls,
			onSubmit : function() {
				return $(this).form('enableValidation').form('validate');
			},
			success : function(result) {
				if (result) {
					var result = eval('(' + result + ')');
					if (!result.success) {
						$.messager.show({
							title : 'Error',
							msg : result.errorMsg
						});
					} else {
						$.messager.alert("提示", message);
						$('#dlg').dialog('close');
						$('#supplierMessageTable').datagrid('reload');
					}
				}

			},
			error : function(errorMsg) {
				alert("数据请求失败，请联系系统管理员!");
			}
		});
	}
	vlogoflag = "";
}

//编辑
function edit(supplierId){
	vlogoflag = "edit";
	$('#fm').form('clear');
	var row = $('#supplierMessageTable').datagrid('getSelected');
	if (row) {
		$('#dlg').window({
			title : "编辑",
			modal : true
		});
		$('#dlg').window('open');
		$('#supplierId').val(supplierId);
		$('#code').textbox('setValue', row.code);
		$('#name').textbox('setValue', row.name);
		$('#address').textbox('setValue', row.address);
		$('#phone').textbox('setValue', row.phone);
		$('#contacts').textbox('setValue', row.contacts);
		$('#remark').textbox('setValue', row.remark);
		$('#fm').form('load', row);
	}
}

//删除
function deleteSupplier(supplierId){
	$.messager.confirm('提示', '确认删除该供应商信息?', function(flag) {
		if (flag) {
			$.ajax({  
		        type : "post",  
		        async : false,
		        url : 'supplierMessage/deleteSupplierMessage',  
		        data : {
		        	'supplierId' : supplierId
		        },  
		        dataType : "json", //返回数据形式为json  
		        success : function(result) {
		            if (result) {
		            	if (!result.success) {
							$.messager.show( {
								title : 'Error',
								msg : result.msg
							});
						} else {
							$.messager.alert("提示", "删除成功！");
							$('#supplierMessageTable').datagrid('reload');
						}
		            }  
		        },  
		        error : function(errorMsg) {  
		            alert("数据请求失败，请联系系统管理员!");  
		        }  
		   }); 
		}
	});
}

//监听窗口大小变化
window.onresize = function() {
	setTimeout(domresize, 500);
}

//改变表格高宽
function domresize() {
	$("#supplierMessageTable").datagrid('resize', {
		height : $("#body").height(),
		width : $("#body").width()
	});
}

