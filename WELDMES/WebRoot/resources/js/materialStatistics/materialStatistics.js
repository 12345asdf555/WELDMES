$(function(){
	initializeMaterial();
	materialTree();
	materialListTree();
	materialMessageDatagrid();
	var width = $("#treeDiv").width();
	$(".easyui-layout").layout({
		onCollapse:function(){
			$("#materialStatisticsTable").datagrid( {
				height : $("#body").height(),
				width : $("#body").width()
			})
		},
		onExpand:function(){
			$("#materialStatisticsTable").datagrid( {
				height : $("#body").height(),
				width : $("#body").width()
			})
		}
	});
});
var vlogoflag = "";
function materialMessageDatagrid(){
	$("#materialStatisticsTable").datagrid( {
		height : $("#body").height(),
		width : $("#body").width(),
		idField : 'materialId',
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		url : "materialStatistics/getMaterialStatisticsList",
		singleSelect : true,
		rownumbers : true,
		remoteSort:false,
		showPageList : false, 
		columns : [ [ {
			field : 'materialStatisticsId',
			title : '序号',
			width : 50,
			halign : "center",
			align : "left",
			hidden:true
		}, {
			field : 'code',
			title : '物料编码',
			width : 150,
			halign : "center",
			align : "center",
			sortable: true
		}, {
			field : 'name',
			title : '物料名称',
			width : 150,
			halign : "center",
			align : "center"
		}, {
			field : 'materialTypeName',
			title : '物料类型',
			width : 120,
			halign : "center",
			align : "center"
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
			width : 180,
			halign : "center",
			align : "center"
		}, {
			field : 'inventory',
			title : '库存',
			width : 150,
			halign : "center",
			align : "center"
		}, {
			field : 'unit',
			title : '单位',
			width : 80,
			halign : "center",
			align : "center"
		}, {
			field : 'totalPrices',
			title : '总价',
			width : 150,
			halign : "center",
			align : "center"
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
			width : 400,
			halign : "center",
			align : "left",
			formatter:function(value,row,index){
				var str = "";
				str += '<a id="edit" class="easyui-linkbutton" href="javascript:edit('+row.materialStatisticsId+','+row.supplierId+')"/>';
				str += '<a id="delete" class="easyui-linkbutton" href="javascript:materialDelete('+row.materialStatisticsId+','+row.supplierId+')"/>';
				if (row.parentId != 0){
					str += '<a id="add" class="easyui-linkbutton" href="javascript:materialadd('+row.materialStatisticsId+','+row.supplierId+')"/>';
					str += '<a id="get" class="easyui-linkbutton" href="javascript:materialget('+row.materialStatisticsId+','+row.supplierId+')"/>';
				}
				str += '<a id="select" class="easyui-linkbutton" href="javascript:materialSelect('+row.materialStatisticsId+','+row.parentId+')"/>';
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
	        $("a[id='add']").linkbutton({text:'入库',plain:true,iconCls:'icon-import'});
	        $("a[id='get']").linkbutton({text:'出库',plain:true,iconCls:'icon-export'});
	        $("a[id='select']").linkbutton({text:'出入库记录',plain:true,iconCls:'icon-select'});
		}
	});
}

function materialListTree(){
	$("#myTree").tree({  
		onClick : function(node){
			$("#materialStatisticsTable").datagrid('load',{
				"parent" : node.id
			});
			materialSet(node.id);
		 }
	});
}

function materialSet(materialId){
	$.ajax({
		url: 'materialStatistics/findMaterialById',
		type: 'GET',
		data: {
			'materialId': materialId
		},
		dataType: "json",
		success: function(data){
			$("#code").textbox("setValue", data.code);
			$("#name").textbox("setValue", data.name);
			$("#materialType").textbox("setValue", data.materialTypeName);
			$("#location").textbox("setValue", data.location);
			$("#inventory").textbox("setValue", data.inventory);
			$("#unit").textbox("setValue", data.unit);
			$("#totalPrices").textbox("setValue", data.totalPrices);
		},
		error: function(){
			alert("数据请求失败，请联系系统管理员!");
		}
	});
}
var materialType = "";
var parentIdlist = "";
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
	$.ajax({
		url: 'materialStatistics/initializeMaterial',
		type: 'GET',
		data: {},
		dataType: "json",
		success: function(data){
			materialType = data.materialType;
			parentIdlist = data.parentIdlist;
			//物料类型
			$("#materialType_material").combobox({
	            valueField : 'value',
	            textField : 'valuename',  
	            editable : false,  
	            required : true,
	            mode : 'local',  
	            data: materialType
	        }); 
		},
		error: function(){
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	$("#parentIdlist").combobox({
		url: 'materialStatistics/getMaterialTree',
        valueField : 'id',
        textField : 'text',  
        editable : false,  
        required : true,
        mode : 'local',
        onChange:function(id){
        	if (parentIdlist != ''){
        		$(parentIdlist).each(function(index,d) {
                    if (this.id == id) { 
                        $("#materialType_material").combobox("select", this.materialType);//物料类型选中
                    }
                });
        	}
        	$("#parentId").val(id);//物料父级id赋值
        }  
    });
}

//监听窗口大小变化
window.onresize = function() {
	setTimeout(domresize, 500);
}

//改变表格高宽
function domresize() {
	$("#materialStatisticsTable").datagrid('resize', {
		height : $("#body").height(),
		width : $("#body").width()
	});
}

//物料树形列表
function materialTree(){
	 $("#myTree").tree({
        url: 'materialStatistics/getMaterialTree', //请求路径
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

//编辑
function edit(materialId,supplierId){
	vlogoflag = "edit";
	var row = $('#materialStatisticsTable').datagrid('getSelected');
	$('#fm').form('clear');
	if (row) {
		$('#dlg').window({
			title : "编辑",
			modal : true
		});
		$('#dlg').window('open');
		$("#materialTypediv").hide();
		$("#materialId").val(row.materialStatisticsId);//id
		$('#code_material').textbox("setValue", row.code);
		$("#code_material").textbox('textbox').attr('readonly',true);//物料编码不可编辑
		$('#name_material').textbox("setValue", row.name);
		dataSelect(row.materialStatisticsId,row.parentId);
		$("#materialType_material").combobox("select", row.materialType);//物料类型选中
		$('#location_material').textbox("setValue", row.location);
		$('#unit').textbox("setValue", row.unit);
		$('#totalPrices').textbox("setValue", row.totalPrices);
		$("#parentId").val(row.parentId);
		$('#fm').form('load', row);
	}
}

//父级物料列表选中事件
function dataSelect(materialStatisticsId,parentId){
	$("#divparentId").show();
	$("#parentIdlist").combobox({	
        valueField : 'id',
        textField : 'text',  
        editable : false,  
        required : true,
        mode : 'local',  
        data: parentIdlist,
        onLoadSuccess:function(){
        	var val = parentIdlist;
        	 for (var item in val) {
        		 if (parentId == 0){
        			 $("#divparentId").hide(); 
        			 $("#parentId").val("0");
        		 }else{
        			 if ((val[item].id) == parentId) {
                         $("#parentIdlist").combobox("select", val[item].id);
                     }  
        		 }
             }  
        }
    }); 
}

//删除
function materialDelete(materialId,supplierId){
	if (confirm("确定要删除吗？")){
		$.ajax({
			url: 'materialStatistics/deleteMaterialById',
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
		$('#materialStatisticsTable').datagrid('reload');
	}
}

//保存物料信息
function saveMaterial(){
	//判断是否有父级列表，有不为0，没有就选取父级id
	if ($("#parentId").val() == '0' || $("#parentId").val() == 0){
		$("#parentId").val(0);
	}
	var urls = "";
	var message = "";
	if (vlogoflag == "add"){
		urls = "materialStatistics/addMaterialStatistics";
		message = "新增成功";
	}else if(vlogoflag == "edit"){
		urls = "materialStatistics/editMaterialStatistics";
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
					$('#materialStatisticsTable').datagrid('reload');
				}
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	vlogoflag = "";
}

//新增物料
function addMaterial(){
	vlogoflag = "add";
	$('#fm').form('clear');
	$('#dlg').window({
		title : "新增物料",
		modal : true
	});
	$("#code_material").textbox('textbox').attr('readonly',false);
	$('#dlg').window('open');
	$("#materialTypediv").hide();
	//父级物料列表
	$("#divparentId").show();
	$("#parentIdlist").combobox({
		url: 'materialStatistics/getMaterialTree',
        valueField : 'id',
        textField : 'text',  
        editable : false,  
        required : true,
        mode : 'local'
    });
}

//新增物料种类
function addMaterialType(){
	vlogoflag = "add";
	$('#fm').form('clear');
	$('#dlg').window({
		title : "新增物料种类",
		modal : true
	});
	$("#code_material").textbox('textbox').attr('readonly',false);
	$('#dlg').window('open');
	$("#materialTypediv").show();
	$("#parentId").val('0');
	$("#divparentId").hide();
}

//入库
function materialadd(materialId,supplierId){
	vlogoflag = "addRecord";
	var row = $('#materialStatisticsTable').datagrid('getSelected');
	$('#fm').form('clear');
	if (row) {
		$('#materialadd').window({
			title : "入库",
			modal : true
		});
		$('#materialadd').window('open');
		$('#codeadd').textbox("setValue", row.code);
		$('#name_materialadd').textbox("setValue", row.name);
		$('#numberdiv lable').text("入库数量");
		$('#record_datetime_div lable').text("入库时间");
		$('#type').val('1');
		$("#supplier_message").combobox({
			url: 'supplierMessage/selectSupplierAll',
	        valueField : 'id',
	        textField : 'text',  
	        editable : false,  
	        required : true,
	        mode : 'local'
	    });
		$('#fm_materialadd').form('load', row);
	}
}

//出库
function materialget(materialId,supplierId){
	vlogoflag = "reduceRecord";
	var row = $('#materialStatisticsTable').datagrid('getSelected');
	$('#fm').form('clear');
	if (row) {
		$('#materialadd').window({
			title : "出库",
			modal : true
		});
		$('#materialadd').window('open');
		$('#codeadd').textbox("setValue", row.code);
		$('#name_materialadd').textbox("setValue", row.name);
		$('#numberdiv lable').text("出库数量");
		$('#record_datetime_div lable').text("出库时间");
		$('#type').val('2');
		$("#supplier_message").combobox({
			url: 'supplierMessage/selectSupplierAll',
	        valueField : 'id',
	        textField : 'text',  
	        editable : false,  
	        required : true,
	        mode : 'local'
	    });
		$('#fm_materialadd').form('load', row);
	}
}

//保存入库出库记录
function saveMaterialRecord(){
	var urls = "";
	var message = "";
	if (vlogoflag == "addRecord"){
		message = "入库成功";
	}else if(vlogoflag == "reduceRecord"){
		message = "出库成功";
	}
	urls = "materialStatistics/saveMaterialRecord";
	$('#fm_materialadd').form('submit', {
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
					$('#materialadd').dialog('close');
					$('#materialStatisticsTable').datagrid('reload');
				}
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
}

//查看出入库记录
function materialSelect(materialStatisticsId,parentId){
	var row = $('#materialStatisticsTable').datagrid('getSelected');
	if (row) {
		$('#material_record').window({
			title : "查看出入库记录",
			modal : true
		});
		$('#material_record').window('open');
		loadMaterialRecord(row.code);
		$('#materialRecordTable').datagrid('reload');
	}
}

function loadMaterialRecord(code){
	$("#materialRecordTable").datagrid( {
		height : '100%',
		width : '100%',
		idField : 'materialRecordId',
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		url : "materialStatistics/getMaterialRecordList",
		singleSelect : true,
		rownumbers : true,
		remoteSort:false,
		showPageList : false, 
		loadMsg : '拼命加载中，请稍后...',
		queryParams : { //传参
			code : code
		},
		columns : [ [ {
			field : 'materialRecordId',
			title : '序号',
			width : 50,
			halign : "center",
			align : "left",
			hidden:true
		}, {
			field : 'recordCode',
			title : '物料编码',
			width : 120,
			halign : "center",
			align : "center",
			sortable: true
		}, {
			field : 'type',
			title : '类型',
			width : 80,
			halign : "center",
			align : "center",
			formatter:function(value,row,index){
				var str = "";
				if (value == 1){
					str = "入库";
				}else if(value == 2){
					str = "出库";
				}
				return str;
			}
		}, {
			field : 'number',
			title : '数量',
			width : 80,
			halign : "center",
			align : "center"
		}, {
			field : 'recordDatetime',
			title : '时间',
			width : 150,
			halign : "center",
			align : "center"
		}, {
			field : 'orderNumber',
			title : '订单号',
			width : 140,
			halign : "center",
			align : "center"
		}, {
			field : 'recordSupplierId',
			title : '供应商',
			width : 150,
			halign : "center",
			align : "center"
		}, {
			field : 'univalence',
			title : '单价',
			width : 60,
			halign : "center",
			align : "center"
		}, {
			field : 'recordTotalPrices',
			title : '总价',
			width : 80,
			halign : "center",
			align : "center"
		}, {
			field : 'recordCreateTime',
			title : '创建时间',
			width : 140,
			halign : "center",
			align : "center"
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
		}
	});
}
