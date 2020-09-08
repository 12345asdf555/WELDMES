$(function(){
	initialize();
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
			field : 'materialType',
			title : '物料类型',
			width : 80,
			halign : "center",
			align : "left"
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
			field : 'inventoryChangeType',
			title : '库存变动类型',
			width : 80,
			halign : "center",
			align : "left"
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
		}
		, {
			field : 'putGetStorageType',
			title : '入出库类型',
			width : 70,
			halign : "center",
			align : "left"
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
				str += '<a id="delete" class="easyui-linkbutton" href="javascript:delete('+row.materialId+','+row.supplierId+')"/>';
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

function initialize(){
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