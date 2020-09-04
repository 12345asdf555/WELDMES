$(function(){
	$("#weldingmachineid").next().hide();
	maintainDatagrid();
})


//维修记录列表
function maintainDatagrid(){
	var wid = $("#wId").val();
	$("#maintainTable").datagrid( {
		fitColumns : true,
		height : $("body").height()-$("#topdiv").height()-40,
		width : $("#bottomdiv").width(),
		idField : 'id',
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		url : "maintain/getMaintainList?wid="+wid,
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
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'viceman',
			title : '维修人员',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'starttime',
			title : '维修起始时间',
			width : 100,
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
					var str = '<a id="ok" class="easyui-linkbutton" href="javascript:okMaintain();"/>';
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
			width : 100,
			halign : "center",
			align : "left"
		}]],
		pagination : true,
		rowStyler: function(index,row){
            if ((index % 2)!=0){
            	//处理行代背景色后无法选中
            	var color=new Object();
                return color;
            }
        }
	});
}

//完成维修
function okMaintain(){
	var row = $("#maintainTable").datagrid('getSelected');
	$.ajax({  
	      type : "post",  
	      async : false,
	      url : "maintain/updateEndtime?wid="+row.mid,  
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
//监听窗口大小变化
window.onresize = function() {
	setTimeout(domresize, 500);
}

//改变表格高宽
function domresize() {
	$("#maintainTable").datagrid('resize', {
		height : $("body").height()-$("#topdiv").height()-40,
		width : $("#bottomdiv").width()
	});
}