$(function(){
	initializeMaterial();
	materialTree();
	materialListTree();
	materialMessageDatagrid();
	var width = $("#treeDiv").width();
	$(".easyui-layout").layout({
		onCollapse:function(){
			$("#materialMessageTable").datagrid( {
				height : $("#body").height(),
				width : $("#body").width()
			})
		},
		onExpand:function(){
			$("#materialMessageTable").datagrid( {
				height : $("#body").height(),
				width : $("#body").width()
			})
		}
	});
	var vlogoflag = "";
});

function materialMessageDatagrid(){
	$("#materialMessageTable").datagrid( {
		//view: detailview,		//注意1
		height : $("#body").height(),
		width : $("#body").width(),
		idField : 'materialId',
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		url : "materialMessage/getMaterialMessageList",
		singleSelect : true,
		rownumbers : true,
		remoteSort:false,
		showPageList : false, 
		columns : [ [ {
			field : 'materialId',
			title : '序号',
			width : 50,
			halign : "center",
			align : "left",
			hidden:true
		}, {
			field : 'code',
			title : '物料编码',
			width : 80,
			halign : "center",
			align : "left",
			sortable: true
		}, {
			field : 'name',
			title : '物料名称',
			width : 60,
			halign : "center",
			align : "left"
		}, {
			field : 'materialTypeName',
			title : '物料类型',
			width : 80,
			halign : "center",
			align : "left"
		}, {
			field : 'materialType',
			title : '物料类型',
			//width : 80,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'location',
			title : '存放位置',
			width : 60,
			halign : "center",
			align : "left"
		}, {
			field : 'inventory',
			title : '库存',
			width : 60,
			halign : "center",
			align : "left"
		}, {
			field : 'inventoryChangeTypeName',
			title : '库存变动类型',
			width : 80,
			halign : "center",
			align : "left"
		}, {
			field : 'inventoryChangeType',
			title : '库存变动类型',
			//width : 80,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'changeAddress',
			title : '变动地址',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'changeNumber',
			title : '变动数量',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'changeOrder',
			title : '订单号',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'putGetStorageTypeName',
			title : '入出库类型',
			width : 70,
			halign : "center",
			align : "left"
		}, {
			field : 'putGetStorageType',
			title : '入出库类型',
			//width : 70,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'changeTime',
			title : '入出库时间',
			width : 140,
			halign : "center",
			align : "left"
		}, {
			field : 'unit',
			title : '单位',
			width : 60,
			halign : "center",
			align : "left"
		}, {
			field : 'univalence',
			title : '单价',
			width : 60,
			halign : "center",
			align : "left"
		}
		, {
			field : 'totalPrices',
			title : '总价',
			width : 60,
			halign : "center",
			align : "left"
		}, {
			field : 'parentId',
			title : '父级id',
			//width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'supplierId',
			title : '供应商id',
			//width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'creator',
			title : '创建者',
			//width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'createTime',
			title : '创建时间',
			//width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'edit',
			title : '操作',
			width : 230,
			halign : "center",
			align : "left",
			formatter:function(value,row,index){
				var str = "";
				str += '<a id="edit" class="easyui-linkbutton" href="javascript:edit('+row.materialId+','+row.supplierId+')"/>';
				str += '<a id="delete" class="easyui-linkbutton" href="javascript:materialDelete('+row.materialId+','+row.supplierId+')"/>';
				return str;
			}
		}
		] ],
		pagination : true,
		//fitColumns : true,
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

function materialListTree(){
	$("#myTree").tree({  
		onClick : function(node){
			$("#materialMessageTable").datagrid('load',{
				"parent" : node.id
			});
			materialSet(node.id);
		 }
	});
}

function materialSet(materialId){
	$.ajax({
		url: 'materialMessage/findMaterialById',
		type: 'GET',
		data: {
			'materialId': materialId
		},
		dataType: "json",
		success: function(data){
			$("#code").textbox("setValue", data.code);
			$("#name").textbox("setValue", data.name);
			$("#materialType").textbox("setValue", data.materialType);
			$("#location").textbox("setValue", data.location);
			$("#inventory").textbox("setValue", data.inventory);
			$("#inventoryChangeType").textbox("setValue", data.inventoryChangeType);
			$("#changeAddress").textbox("setValue", data.changeAddress);
			$("#changeNumber").textbox("setValue", data.changeNumber);
			$("#changeOrder").textbox("setValue", data.changeOrder);
			$("#putGetStorageType").textbox("setValue", data.putGetStorageType);
			$("#changeTime").textbox("setValue", data.changeTime);
			$("#supplierName").textbox("setValue", data.supplierName);
		},
		error: function(){
			alert("数据请求失败，请联系系统管理员!");
		}
	});
}
var materialType = "";
var putStorageType = "";
var GetStorageType = "";
var inventoryChangeType = [
	{id: '1',text: '入库'},
	{id: '2',text: '出库'}
];

function initializeMaterial(){
	$("#code").textbox("setValue", "");
	$("#name").textbox("setValue", "");
	$("#materialType").textbox("setValue", "");
	$("#location").textbox("setValue", "");
	$("#inventory").textbox("setValue", "");
	$("#inventoryChangeType").textbox("setValue", "");
	$("#changeAddress").textbox("setValue", "");
	$("#changeNumber").textbox("setValue", "");
	$("#changeOrder").textbox("setValue", "");
	$("#putGetStorageType").textbox("setValue", "");
	$("#changeTime").textbox("setValue", "");
	$("#supplierName").textbox("setValue", "");
	$.ajax({
		url: 'materialMessage/initialize',
		type: 'GET',
		data: {},
		dataType: "json",
		success: function(data){
			materialType = data.materialType;
			putStorageType = data.putStorageType;
			GetStorageType = data.GetStorageType;
			//物料类型
			$("#materialType_material").combobox({	
	            valueField : 'value',
	            textField : 'valuename',  
	            editable : false,  
	            required : true,
	            mode : 'local',  
	            data: materialType
	        }); 
			//库存变动类型
			$("#inventoryChangeType_material").combobox({
				valueField : 'id',
				textField : 'text',  
				editable : false,  
				required : true,
				mode : 'local',  
				data: inventoryChangeType
			}); 
			//入出库类型
			$("#putGetStorageType_material").combobox({	
	            valueField : 'value',
	            textField : 'valuename',  
	            editable : false,  
	            required : true,
	            mode : 'local',  
	            data: data.putStorageType
	        }); 
		},
		error: function(){
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	//库存变动类型 改变事件
	$('#inventoryChangeType_material').combobox({
	    onChange:function(n,o){
	        if(n==1){	//入库
	        	$("#putGetStorageType_material").combobox({	
		            valueField : 'value',
		            textField : 'valuename',  
		            editable : false,  
		            required : true,
		            mode : 'local',  
		            data: putStorageType
		        }); 
	        }else{
	        	$("#putGetStorageType_material").combobox({	
		            valueField : 'value',
		            textField : 'valuename',  
		            editable : false,  
		            required : true,
		            mode : 'local',  
		            data: GetStorageType
		        }); 
	        }
	    }
	});
}

//监听窗口大小变化
window.onresize = function() {
	setTimeout(domresize, 500);
}

//改变表格高宽
function domresize() {
	$("#materialMessageTable").datagrid('resize', {
		height : $("#body").height(),
		width : $("#body").width()
	});
}

//物料树形列表
function materialTree(){
	 $("#myTree").tree({
        url: 'materialMessage/getMaterialTree', //请求路径
        onLoadSuccess: function(node,data){  
             var tree = $(this);  
             if(data){  
                 $(data).each(function(index,d) {  
                     if (this.state=='closed') {  
                         tree.tree('expandAll');
                     }
                 });
             }  
        }
    });
}

function edit(materialId,supplierId){
	vlogoflag = "edit";
	var row = $('#materialMessageTable').datagrid('getSelected');
	$('#fm').form('clear');
	if (row) {
		$('#dlg').window({
			title : "编辑",
			modal : true
		});
		$('#dlg').window('open');
		dataSelect(row.materialType,row.inventoryChangeType,row.putGetStorageType);
		$("#materialId").val(row.materialId);
		$("#parentId").val(row.parentId);
		$("#supplierId").val(row.supplierId);
		$('#code_material').textbox("setValue", row.code);
		$("#code_material").textbox('textbox').attr('readonly',true);
		$('#name_material').textbox("setValue", row.name);
		$('#location_material').textbox("setValue", row.location);
		$('#inventory_material').textbox("setValue", row.inventory);
		$('#changeAddress_material').textbox("setValue", row.changeAddress);
		$('#changeNumber_material').textbox("setValue", row.changeNumber);
		$('#changeOrder_material').textbox("setValue", row.changeOrder);
		$('#changeTime_material').textbox("setValue", row.changeTime);
		$('#unit').textbox("setValue", row.unit);
		$('#univalence').textbox("setValue", row.univalence);
		$('#totalPrices').textbox("setValue", row.totalPrices);
		$('#fm').form('load', row);
	}
}

function dataSelect(material_type,inventory_change_type,put_getStorage_type){
	$("#materialType_material").combobox({	
        valueField : 'value',
        textField : 'valuename',  
        editable : false,  
        required : true,
        mode : 'local',  
        data: materialType,
        onLoadSuccess:function(){
        	var val = materialType;
        	 for (var item in val) {
                 if ((val[item].value) == material_type) {
                     $("#materialType_material").combobox("select", val[item].value);
                 }  
             }  
        }
    }); 
	$("#inventoryChangeType_material").combobox({
		valueField : 'id',
		textField : 'text',  
		editable : false,  
		required : true,
		mode : 'local',  
		data: inventoryChangeType,
		onLoadSuccess:function(){
        	var val = inventoryChangeType;
	    	for (var item in val) {
	            if ((val[item].id) == inventory_change_type) {
	                $("#inventoryChangeType_material").combobox("select", val[item].id);
	            }  
	        }  
	    }
	}); 
	$("#putGetStorageType_material").combobox({	
        valueField : 'value',
        textField : 'valuename',  
        editable : false,  
        required : true,
        mode : 'local',  
        data: putStorageType,
        onLoadSuccess:function(){
        	var val = putStorageType;
	    	for (var item in val) {
	            if ((val[item].value) == put_getStorage_type) {
	                $("#putGetStorageType_material").combobox("select", val[item].value);
	            }  
	        }  
	    }
    }); 
	
}

function materialDelete(materialId,supplierId){
	if (confirm("确定要删除吗？")){
		$.ajax({
			url: 'materialMessage/deleteMaterialById',
			type: 'GET',
			data: {
				'materialId': materialId
			},
			dataType: "json",
			success: function(result){
				if (result.flag){
					alert("删除成功");
				}else{
					alert("删除失败");
				}
			},
			error: function(){
				alert("数据请求失败，请联系系统管理员!");
			}
		});
		$('#materialMessageTable').datagrid('reload');
	}
}

//保存物料信息
function saveMaterial(){
	var parentIdlist = $("#parentIdlist").combobox('getValue');
	$("#parentId").val(parentIdlist);
	var urls = "";
	var message = "";
	if (vlogoflag == "add"){
		urls = "materialMessage/addMaterialMessage";
		message = "新增成功";
	}else if(vlogoflag == "edit"){
		urls = "materialMessage/editMaterialMessage";
		message = "修改成功";
	}
	$('#fm').form('submit', {
		url : urls,
		onSubmit : function() {
			return $(this).form('enableValidation').form('validate');
		},
		success: function(result) {
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
					$('#materialMessageTable').datagrid('reload');
				}
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	vlogoflag = "";
}

//新增
function addMaterial(){
	vlogoflag = "add";
	$('#fm').form('clear');
	$('#dlg').window({
		title : "新增",
		modal : true
	});
	$("#code_material").textbox('textbox').attr('readonly',false);
	$('#dlg').window('open');
	$("#divparentId").show();
	$("#parentIdlist").combobox({
		url: 'materialMessage/getMaterialTree',
        valueField : 'id',
        textField : 'text',  
        editable : false,  
        required : true,
        mode : 'local'
    });
}

//新增物料类型
function addMaterialType(){
	vlogoflag = "add";
	$('#fm').form('clear');
	$('#dlg').window({
		title : "新增物料类型",
		modal : true
	});
	$("#code_material").textbox('textbox').attr('readonly',false);
	$('#dlg').window('open');
	$("#parentId").val(0);
	$("#divparentId").hide();
}
