$(function(){
	weldDatagrid();
});

function weldDatagrid(){
	$("#welderTable").datagrid( {
		height : $("#body").height(),
		width : $("#body").width(),
		idField : 'id',
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		url : "welders/getAllWelder",
		singleSelect : true,
		rownumbers : true,
		showPageList : false,
		pagination : true,
		fitColumns : true,
		columns : [ [ {
			field : 'id',
			title : '序号',
			width : 100,
			halign : "center",
			align : "left",
			hidden:true
		}, {
			field : 'name',
			title : '姓名',
			width : 80,
			halign : "center",
			align : "left"
		}, {
			field : 'welderno',
			title : '编号',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'cellphone',
			title : '手机',
			width : 100,
			halign : "center",
			align : "left"
		},{
			field : 'leveid',
			title : '级别id',
			width : 100,
			halign : "center",
			align : "left",
			hidden:true
		}, {
			field : 'levename',
			title : '级别',
			width : 100,
			halign : "center",
			align : "left"
		},{
			field : 'cardnum',
			title : '卡号',
			width : 100,
			halign : "center",
			align : "left"
		},{
			field : 'quali',
			title : '资质id',
			width : 100,
			halign : "center",
			align : "left",
			hidden:true
		}, {
			field : 'qualiname',
			title : '资质',
			width : 100,
			halign : "center",
			align : "left"
		},{
			field : 'owner',
			title : '部门id',
			width : 100,
			halign : "center",
			align : "left",
			hidden:true
		}, {
			field : 'ownername',
			title : '部门',
			width : 150,
			halign : "center",
			align : "left"
		},{
			field : 'back',
			title : '备注',
			width : 100,
			halign : "center",
			align : "left"
		},{
			field : 'edit',
			title : '编辑',
			width : 150,
			halign : "center",
			align : "left",
			formatter:function(value,row,index){
			var str = "";
			str += '<a id="edit" class="easyui-linkbutton" href="javascript:editWelder()"/>';
			str += '<a id="remove" class="easyui-linkbutton" href="javascript:removeWelder()"/>';
			return str;
			}}
		] ],
		rowStyler: function(index,row){
            if ((index % 2)!=0){
            	//处理行代背景色后无法选中
            	var color=new Object();
                return color;
            }
        },
		nowrap : false,
		onLoadSuccess:function(data){
	        $("a[id='edit']").linkbutton({text:'修改',plain:true,iconCls:'icon-update'});
	        $("a[id='remove']").linkbutton({text:'删除',plain:true,iconCls:'icon-delete'});
	        }
	});
}


//导入
function importclick(){
	$("#importdiv").dialog("open").dialog("setTitle","从excel导入数据");
}

function importWeldingMachine(){
	var file = $("#file").val();
	if(file == null || file == ""){
		$.messager.alert("提示", "请选择要上传的文件！");
		return false;
	}else{
		$('#importfm').form('submit', {
			url : "import/importWelder",
			success : function(result) {
				if(result){
					var result = eval('(' + result + ')');
					if (!result.success) {
						$.messager.show( {
							title : 'Error',
							msg : result.msg
						});
					} else {
						$('#importdiv').dialog('close');
						$('#welderTable').datagrid('reload');
						$.messager.alert("提示", result.msg);
					}
				}
				
			},  
		    error : function(errorMsg) {  
		        alert("数据请求失败，请联系系统管理员!");  
		    } 
		});
	}
}

//监听窗口大小变化
window.onresize = function() {
	setTimeout(domresize, 500);
}

//改变表格高宽
function domresize() {
	$("#welderTable").datagrid('resize', {
		height : $("#body").height(),
		width : $("#body").width()
	});
}

