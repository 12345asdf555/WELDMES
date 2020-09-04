/**
 * 
 */ 
$(function(){
	$("#dg").datagrid( {
		fitColumns : true,
		height : ($("#body").height()),
		width : $("#body").width(),
		idField : 'id',
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],  
		url : "authority/getAllAuthority",
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
			hidden: true
		}, {
			field : 'authorityName',
			title : '权限',
			width : 100,
			halign : "center",
			align : "left"
		}, {
        	field : 'authorityDesc',
			title : '描述',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'status',
			title : '状态',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'statusid',
			title : '状态',
			width : 100,
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'resources',
			title : 'URL',
			width : 100,
			halign : "center",
			align : "left",
			formatter:function(value,row,index){
			var str = "";
			str += '<a id="resource" class="easyui-linkbutton" href="javascript:resource('+row.id+')"/>';
			return str; 
			}
		}, {
			field : 'edit',
			title : '编辑',
			width : 130,
			halign : "center",
			align : "left",
			formatter:function(value,row){
			var str = "";
			str += '<a id="edit" class="easyui-linkbutton" href="javascript:editAuthorith()"/>';
			str += '<a id="remove" class="easyui-linkbutton" href="javascript:removeAuthority()"/>';
			return str;
			}
		}]],
		rowStyler: function(index,row){
            if ((index % 2)!=0){
            	//处理行代背景色后无法选中
            	var color=new Object();
                return color;
            }
		},
		onLoadSuccess:function(data){
	        $("a[id='edit']").linkbutton({text:'修改',plain:true,iconCls:'icon-update'});
	        $("a[id='remove']").linkbutton({text:'删除',plain:true,iconCls:'icon-delete'});
	        $("a[id='resource']").linkbutton({text:'资源列表',plain:true});
	        }
		
	});
})

var url = "";
function removeAuthority(){
	$('#rfm').form('clear');
	var row = $('#dg').datagrid('getSelected');
	if (row) {
		$('#rdlg').window( {
			title : "删除权限",
			modal : true
		});
		$('#rdlg').window('open');
		$('#rfm').form('load', row);
		showdatagrid(row.id);
		url = "authority/delAuthority?id="+row.id;
	}
}

function showdatagrid(id){
    $("#rtt").datagrid( {
		fitColumns : true,
		height : '250px',
		width : '80%',
		idField : 'resources_name',
		url : "authority/getAllResource1?id="+id,
		rownumbers : false,
		showPageList : false,
		checkOnSelect:true,
		selectOnCheck:true,
		columns : [ [ {
		    field:'ck',
			checkbox:true
		},{
			field : 'id',
			title : 'id',
			width : 100,
			halign : "center",
			align : "left",
			hidden:true
		},{
			field : 'symbol',
			title : 'symbol',
			width : 100,
			halign : "center",
			align : "left",
			hidden:true
		},{
			field : 'resources_name',
			title : '资源名',
			width : 100,
			halign : "center",
			align : "left"
		}]],
		rowStyler: function(index,row){
	        if ((index % 2)!=0){
	        	//处理行代背景色后无法选中
	        	var color=new Object();
	            return color;
	        }
		},
		onBeforeLoad:function(data){
			 $('#rtt').datagrid('clearChecked');
		},
		onLoadSuccess:function(data){ 
			if(data){
				 $.each(data.rows, function(index, item){
		        	if(item.symbol==1){
		    			$('#rtt').datagrid('checkRow', index);
		     		}
	        	})
			}    
		}                   	
	});
}


function remove(){
	$.messager.confirm('提示', '此操作不可撤销，是否确认删除?', function(flag) {
		if (flag) {
			$.ajax({  
		        type : "post",  
		        async : false,
				url : url,
		        data : {},  
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
							$('#rdlg').dialog('close');
							$('#dg').datagrid('reload');
//							var url = "authority/AllAuthority";
//							var img = new Image();
//						    img.src = url;  // 设置相对路径给Image, 此时会发送出请求
//						    url = img.src;  // 此时相对路径已经变成绝对路径
//						    img.src = null; // 取消请求
//							window.location.href = encodeURI(url);
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
    
function resource(id){
	$('#div').dialog('open').dialog('center').dialog('setTitle','资源列表');
    $("#so").datagrid( {
		fitColumns : true,
		height : '300px',
		width : $("#div").width(),
		idField : 'id',
		url : "authority/getResource?id="+id,
		rownumbers : false,
		showPageList : false,
		columns : [ [ {
			field : 'id',
			title : 'id',
			width : 100,
			halign : "center",
			align : "left",
			hidden: true
		},{
			field : 'resources_name',
			title : 'URL',
			width : 100,
			halign : "center",
			align : "left"
		}]],
		rowStyler: function(index,row){
            if ((index % 2)!=0){
            	//处理行代背景色后无法选中
            	var color=new Object();
                return color;
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
  	$("#dg").datagrid('resize', {
	height : $("#body").height(),
	width : $("#body").width()
  	});
}