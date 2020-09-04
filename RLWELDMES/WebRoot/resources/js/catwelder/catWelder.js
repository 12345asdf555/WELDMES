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
		//fitColumns : true,
		columns : [ [ {
			field : 'id',
			title : '序号',
			width : 100,
			halign : "center",
			align : "left",
			hidden:true
		}, {
			field : 'welderno',
			title : '工号',
			width : 50,
			halign : "center",
			align : "left"
		},{
			field : 'fcheckintime',
			title : '入职时间',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'cardnum',
			title : '钢印号',
			width : 100,
			halign : "center",
			align : "left"
		},{
			field : 'firstsuretime',
			title : '首次认证日期',
			width : 100,
			halign : "center",
			align : "left"
		},{
			field : 'ownername',
			title : '部门',
			width : 100,
			halign : "center",
			align : "left"
		},{
			field : 'workship',
			title : '车间',
			width : 50,
			halign : "center",
			align : "left"
		},{
			field : 'workmaintime',
			title : '主岗位上岗时间',
			width : 100,
			halign : "center",
			align : "left"
		},{
			field : 'workkmainname',
			title : '主岗位上岗名称',
			width : 100,
			halign : "center",
			align : "left"
		},{
			field : 'workfirsttime',
			title : '岗位一上岗时间',
			width : 100,
			halign : "center",
			align : "left"
		},{
			field : 'workfirstname',
			title : '岗位一上岗名称',
			width : 100,
			halign : "center",
			align : "left"
		},{
			field : 'worksecondtime',
			title : '岗位二上岗时间',
			width : 100,
			halign : "center",
			align : "left"
		},{
			field : 'worksecondname',
			title : '岗位二上岗名称',
			width : 100,
			halign : "center",
			align : "left"
		},{
			field : 'qualiname',
			title : 'IE211从事员',
			width : 80,
			halign : "center",
			align : "left"
		},{
			field : 'levename',
			title : '分类',
			width : 100,
			halign : "center",
			align : "left"
		},{
			field : 'name',
			title : '姓名',
			width : 50,
			halign : "center",
			align : "left"
		},{
			field : 'level',
			title : '技能等级',
			width : 80,
			halign : "center",
			align : "left"
		},{
			field : 'score',
			title : '理论考试成绩',
			width : 80,
			halign : "center",
			align : "left"
		},{
			field : 'ifpase',
			title : '认证状态',
			width : 80,
			halign : "center",
			align : "left"
		},{
			field : 'icworkime',
			title : 'IC卡有效期',
			width : 100,
			halign : "center",
			align : "left"
		},{
			field : 'yearsure',
			title : '最后年度认证',
			width : 100,
			halign : "center",
			align : "left"
		},{
			field : 'halfyearsure',
			title : '半年年度认证',
			width : 100,
			halign : "center",
			align : "left"
		},{
			field : 'nextyear',
			title : '次年年度认证',
			width : 100,
			halign : "center",
			align : "left"
		},{
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
		},{
			field : 'quali',
			title : '资质id',
			width : 100,
			halign : "center",
			align : "left",
			hidden:true
		},{
			field : 'owner',
			title : '部门id',
			width : 100,
			halign : "center",
			align : "left",
			hidden:true
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
                color.class="rowColor";
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
//导出到excel
function exportcatwelder(){
	$.messager.confirm("提示", "文件默认保存在浏览器的默认路径，<br/>如需更改路径请设置浏览器的<br/>“下载前询问每个文件的保存位置“属性！",function(result){
		if(result){
			var url = "export/exportcatwelder";
			var img = new Image();
		    img.src = url;  // 设置相对路径给Image, 此时会发送出请求
		    url = img.src;  // 此时相对路径已经变成绝对路径
		    img.src = null; // 取消请求
			window.location.href = encodeURI(url);
		}
	});
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

