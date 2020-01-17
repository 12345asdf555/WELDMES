$(function(){
	mainDatagrid();
});

function mainDatagrid(){
	$("#maintainTable").datagrid( {
		fitColumns : true,
		height : $("#body").height(),
		width : $("#body").width(),
		idField : 'id',
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		url : "maintain/getMaintainList",
		singleSelect : true,
		rownumbers : true,
		showPageList : false,
		columns : [ [ {
			field : 'id',
			title : '序号',
			width : 100,
			halign : "center",
			align : "left",
			hidden:true
		}, {
			field : 'equipmentNo',
			title : '固定资产编号',
			width : 80,
			halign : "center",
			align : "left"
		}, {
			field : 'viceman',
			title : '维修人员',
			width : 80,
			halign : "center",
			align : "left"
		}, {
			field : 'starttime',
			title : '维修起始时间',
			width : 150,
			halign : "center",
			align : "left"
		}, {
			field : 'endtime',
			title : '维修结束时间',
			width : 150,
			halign : "center",
			align : "left",
			formatter:function(value,row,index){
				if(value == null || value == ""){
					var str = '<a id="ok" class="easyui-linkbutton" style="padding-left:40%;" href="javascript:okMaintain();"/>';
					return str;
				}
				return value;
			}
		}, {
			field : 'typename',
			title : '维修类型',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'desc',
			title : '维修说明',
			width : 150,
			halign : "center",
			align : "left"
		} , {
			field : 'typeid',
			title : '类型id',
			width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'wid',
			title : '设备id',
			width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'mid',
			title : '维修id',
			width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'edit',
			title : '编辑',
			width : 120,
			halign : "center",
			align : "left",
			formatter:function(value,row,index){
				var str = "";
				str += '<a id="edit" class="easyui-linkbutton" href="javascript:editMaintain();"/>';
				str += '<a id="remove" class="easyui-linkbutton" href="javascript:removeMaintain()"/>';
				return str;
			}
		}]],
		pagination : true,
		nowrap : false,
		rowStyler: function(index,row){
            if ((index % 2)!=0){
            	//处理行代背景色后无法选中
            	var color=new Object();
                return color;
            }
		},
		onLoadSuccess:function(data){
	        $("a[id='ok']").linkbutton({text:'完成',plain:true,iconCls:'icon-over'});
	        $("a[id='edit']").linkbutton({text:'修改',plain:true,iconCls:'icon-update'});
	        $("a[id='remove']").linkbutton({text:'删除',plain:true,iconCls:'icon-delete'});
		}
	});
}

//完成维修
function okMaintain(){
	var row = $("#maintainTable").datagrid('getSelected');
	$.ajax({  
	      type : "post",  
	      async : false,
	      url : "maintain/updateEndtime?wid="+row.mid+"&weldingid="+row.wid,
	      data : {},  
	      dataType : "json", 
	      success : function(result) {  
				if(result){
	              if(result.success){
						$('#maintainTable').datagrid('reload');
						$.messager.alert("提示", "已完成！");
	              }else{
	            	  $.messager.show( {
							title : 'Error',
							msg : result.errorMsg
						});
	              }
	          }  
	      },  
	      error : function(errorMsg) {  
	          alert("数据请求失败，请联系系统管理员!");  
	      }  
		});
}

//导出到excel
function exporMaintain(){
	$.messager.confirm("提示", "文件默认保存在浏览器的默认路径，<br/>如需更改路径请设置浏览器的<br/>“下载前询问每个文件的保存位置“属性！",function(result){
		if(result){
			var url = "export/exporMaintain";
			var img = new Image();
		    img.src = url;  // 设置相对路径给Image, 此时会发送出请求
		    url = img.src;  // 此时相对路径已经变成绝对路径
		    img.src = null; // 取消请求
			window.location.href = encodeURI(url);
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
			url : "import/importMaintain",
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
						$('#maintainTable').datagrid('reload');
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
	$("#maintainTable").datagrid('resize', {
		height : $("#body").height(),
		width : $("#body").width()
	});
}

