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
		url : "role/getAllRole",
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
			field : 'roleName',
			title : '角色名',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'roleDesc',
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
			field : 'authority',
			title : '权限列表',
			width : 100,
			halign : "center",
			align : "left",
			formatter:function(value,row,index){
			var str = "";
			str += '<a id="authority" class="easyui-linkbutton" href="javascript:authority('+row.id+')"/>';
			return str; 
			}
        }, {
			field : 'user',
			title : '分配用户',
			width : 100,
			halign : "center",
			align : "left",
			formatter:function(value,row,index){
			var str = "";
			str += '<a id="user" class="easyui-linkbutton" href="javascript:userdatagrid('+row.id+')"/>';
			return str; 
			}
		}, {
			field : 'edit',
			title : '编辑',
			width : 130,
			halign : "center",
			align : "left",
			formatter:function(value,row,index){
			var str = "";
			str += '<a id="edit" class="easyui-linkbutton" href="javascript:editRole()"/>';
			str += '<a id="remove" class="easyui-linkbutton" href="javascript:removeRole()"/>';
			return str;
			}
		}]],
		nowrap : false,
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
	        $("a[id='authority']").linkbutton({text:'权限列表',plain:true});
	        $("a[id='user']").linkbutton({text:'分配用户',plain:true});
	        }
	});
})

var url = "";
function removeRole(){
	$('#rfm').form('clear');
	var row = $('#dg').datagrid('getSelected');
	if (row) {
		$('#rdlg').window( {
			title : "删除角色",
			modal : true
		});
		$('#rdlg').window('open');
		$('#rfm').form('load', row);
		showdatagrid(row.id);
		url = "role/delRole?id="+row.id;
	}
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
//								var url = "role/AllRole";
//								var img = new Image();
//							    img.src = url;  // 设置相对路径给Image, 此时会发送出请求
//							    url = img.src;  // 此时相对路径已经变成绝对路径
//							    img.src = null; // 取消请求
//								window.location.href = encodeURI(url);
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

function showdatagrid(id){
    $("#rtt").datagrid( {
		fitColumns : true,
		height : '250px',
		width : '80%',
		idField : 'authorities_desc',
		url : "role/getAllAuthority1?id="+id,
		rownumbers : false,
		showPageList : false,
		checkOnSelect:true,
		selectOnCheck:true,
		columns : [ [ {
		    field:'ck',
			checkbox:true
		},{
			field : 'symbol',
			title : 'symbol',
			width : 100,
			halign : "center",
			align : "left",
			hidden:true
		},{
			field : 'authorities_desc',
			title : '权限描述',
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

function authority(id){
	$('#div1').dialog('open').dialog('center').dialog('setTitle','权限列表');
        $("#ao").datagrid( {
		fitColumns : true,
		height : '100%',
		width :"100%",
		idField : 'id',
		url : "role/getAuthority?id="+id,
		rownumbers : false,
		showPageList : false,
		singleSelect : true,
		columns : [ [ {
			field : 'authorities_desc',
			title : '权限描述',
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
        
function userdatagrid(id){
	$('#userdlg').window( {
		title : "分配用户",
		modal : true
	});
	$('#userdlg').window('open');
	var row = $('#dg').datagrid('getSelected');
	$('#userfm').form('load', row);
    $("#usertt").datagrid( {
		fitColumns : true,
		height : '380px',
		width : '80%',
		idField : 'users_name',
		url : "role/getAllUser?id="+id,
		rownumbers : false,
		showPageList : false,
		checkOnSelect:true,
		selectOnCheck:true,
		columns : [ [ {
		    field:'ck',
			checkbox:true
		},{
			field : 'users_name',
			title : '用户名',
			width : 100,
			halign : "center",
			align : "left"
		},{
	        field : 'symbol',
	        title : 'symbol',
	        width : 100,
	        halign : "center",
	        align : "left",
	        hidden:true
		}]],
		rowStyler: function(index,row){
	        if ((index % 2)!=0){
	        	//处理行代背景色后无法选中
	        	var color=new Object();
	            return color;
	        }
		},  
		onBeforeLoad:function(data){
			 $('#usertt').datagrid('clearChecked');
		}, 
		onLoadSuccess:function(data){ 
			if(data){
				$.each(data.rows, function(index, item){
					if(item.symbol==1){
						$('#usertt').datagrid('checkRow', index);
					}
				})
			}      
        }                   
    });
}

function saveRoleUser(){
    var str="";
    var rid = $("#role_id").val();
    var rows = $("#usertt").datagrid("getSelections");
	for(var i=0; i<rows.length; i++){
		str += rows[i].id+",";
	}
	
	var url = "role/dtbUser?uid="+str+"&rid="+rid;
    $('#userfm').form('submit',{
    	url: url,
       success: function(result){
           if (!result){
               $.messager.show({
                   title: 'Error',
                   msg: result.errorMsg
               });
           } else {
				$.messager.alert("提示", "分配成功！");
				$('#userdlg').dialog('close');
				$('#dg').datagrid('reload');
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
        