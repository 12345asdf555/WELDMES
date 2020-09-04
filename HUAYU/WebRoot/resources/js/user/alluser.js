/**
 * 
 */
$(function() {
	var width = $("#treeDiv").width();
	$(".easyui-layout").layout({
		onCollapse : function() {
			$("#dg").datagrid({
				height : $("#body").height(),
				width : $("#body").width()
			})
		},
		onExpand : function() {
			$("#dg").datagrid({
				height : $("#body").height(),
				width : $("#body").width()
			})
		}
	});
	insframeworkTree();
})

$(function() {
	$("#dg").datagrid({
		fitColumns : true,
		height : ($("#body").height()),
		width : $("#body").width(),
		idField : 'id',
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		url : "user/getAllUser",
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
			hidden : true
		}, {
			field : 'insid',
			title : '组织机构id',
			width : 100,
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'userName',
			title : '用户名',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'userLoginName',
			title : '登录名',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'userPhone',
			title : '电话',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'userEmail',
			title : '邮箱',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'userPosition',
			title : '岗位',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'users_insframework',
			title : '部门',
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
			field : 'role',
			title : '角色',
			width : 100,
			halign : "center",
			align : "left",
			formatter : function(value, row, index) {
				var str = "";
				str += '<a id="role" class="easyui-linkbutton" href="javascript:role(' + row.id + ')"/>';
				return str;
			}
		}, {
			field : 'statusid',
			title : '状态id',
			width : 100,
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'userPassword',
			title : '密码',
			width : 100,
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'edit',
			title : '编辑',
			width : 130,
			halign : "center",
			align : "left",
			formatter : function(value, row, index) {
				var str = "";
				str += '<a id="edit" class="easyui-linkbutton" href="javascript:deleteUser(' + row.insid + ',' + row.id + ',' + true + ')"/>';
				str += '<a id="remove" class="easyui-linkbutton" href="javascript:deleteUser(' + row.insid + ',' + row.id + ',' + false + ')"/>';
				return str;
			}
		} ] ],
		nowrap : false,
		rowStyler : function(index, row) {
			if ((index % 2) != 0) {
				//处理行代背景色后无法选中
				var color = new Object();
				return color;
			}
		},
		onLoadSuccess : function(data) {
			$("a[id='edit']").linkbutton({
				text : '修改',
				plain : true,
				iconCls : 'icon-update'
			});
			$("a[id='remove']").linkbutton({
				text : '删除',
				plain : true,
				iconCls : 'icon-delete'
			});
			$("a[id='role']").linkbutton({
				text : '角色列表',
				plain : true
			});
		}
	});

})

var url = "";
function removeUser() {
	$('#rfm').form('clear');
	var row = $('#dg').datagrid('getSelected');
	if (row) {
		$('#rdlg').window({
			title : "删除用户",
			modal : true
		});
		$('#rdlg').window('open');
		$('#rfm').form('load', row);
		showdatagrid(row.id);
		url = "user/delUser?id=" + row.id;
	}
}

function remove() {
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
							$.messager.show({
								title : 'Error',
								msg : result.msg
							});
						} else {
							$.messager.alert("提示", "删除成功！");
							$('#rdlg').dialog('close');
							$('#dg').datagrid('reload');
						//							var url = "user/AllUser";
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

function role(id) {
	$('#div1').dialog('open').dialog('center').dialog('setTitle', '角色列表');
	$("#ro").datagrid({
		fitColumns : true,
		height : '100%',
		width : '100%',
		idField : 'id',
		url : "user/getRole?id=" + id,
		rownumbers : false,
		showPageList : false,
		singleSelect : true,
		columns : [ [ {
			field : 'id',
			title : 'id',
			width : 100,
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'roles_name',
			title : '角色名',
			width : 100,
			halign : "center",
			align : "left"
		} ] ],
		rowStyler : function(index, row) {
			if ((index % 2) != 0) {
				//处理行代背景色后无法选中
				var color = new Object();
				return color;
			}
		}
	})
}

function logout() {
	$.ajax({
		type : "post",
		async : false,
		url : "user/logout",
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				if (!result.success) {
					$.messager.show({
						title : 'Error',
						msg : result.msg
					});
				} else {
					var url = "/CMS/login.jsp";
					top.location.href = url;
				}
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
}

function insframeworkTree() {
	$("#myTree").tree({
		onClick : function(node) {
			$("#dg").datagrid('load', {
				"parent" : node.id
			})
		}
	})
}

//        function addUser(){
//        	var node = $('#myTree').tree('getSelected');
//        	if(node==null || node==""){
//        		alert("请先选择该用户所属组织机构(部门)！");
//        	}else{
//     			$.ajax({  
//     		        type : "post",  
//     		        async : false,
//     		        url : "insframework/getUserAuthority?id="+node.id,  
//     		        data : {},  
//     		        dataType : "json", //返回数据形式为json  
//     		        success : function(result) {
//     		            if (result) {
// 		            		if(result.afreshLogin==null || result.afreshLogin==""){
//     		            		if(result.flag){
//     		            			saveUser();
//	     		       				var url = "user/toAddUser";
//	     		       				var img = new Image();
//	     		       			    img.src = url;  // 设置相对路径给Image, 此时会发送出请求
//	     		       			    url = img.src;  // 此时相对路径已经变成绝对路径
//	     		       			    img.src = null; // 取消请求
//	     		       				window.location.href = encodeURI(url+"?name="+node.text+"&insid="+node.id);
//     		            		}else{
//     		            			alert("对不起，您不能对你的上级或同级部门的数据进行编辑");
//     		            		}
//     		            	}else{
//     		            		$.messager.confirm("提示",result.afreshLogin,function(data){
//     	     		        		 if(data){
//     	     		        			var url = "login.jsp";
//     	     		       				var img = new Image();
//     	     		       			    img.src = url;  // 设置相对路径给Image, 此时会发送出请求
//     	     		       			    url = img.src;  // 此时相对路径已经变成绝对路径
//     	     		       			    img.src = null; // 取消请求
//     	      		     				 top.location.href = url;
//     	      		     			 }
//     	     		     		 });
//     	     		        }
//     		           }
//     		        },  
//     		        error : function(errorMsg) {  
//     		            alert("数据请求失败，请联系系统管理员!");  
//     		        }  
//     		   }); 
//        	}
//        }

function deleteUser(id, uid, flags) {
	$.ajax({
		type : "post",
		async : false,
		url : "insframework/getUserAuthority?id=" + id,
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				if (result.afreshLogin == null || result.afreshLogin == "") {
					if (result.flag) {
						var url = "";
						if (flags) {
							// 		            				url = "user/getUser?id="+uid;
							editUser();
						} else {
							// 		            				url = "user/desUser?id="+uid;
							removeUser();
						}
					//     		       				var img = new Image();
					//     		       			    img.src = url;  // 设置相对路径给Image, 此时会发送出请求
					//     		       			    url = img.src;  // 此时相对路径已经变成绝对路径
					//     		       			    img.src = null; // 取消请求
					//     		       				window.location.href = encodeURI(url);
					} else {
						alert("对不起，您不能对你的上级或同级部门的数据进行编辑");
					}
				} else {
					$.messager.confirm("提示", result.afreshLogin, function(data) {
						if (data) {
							var url = "login.jsp";
							var img = new Image();
							img.src = url; // 设置相对路径给Image, 此时会发送出请求
							url = img.src; // 此时相对路径已经变成绝对路径
							img.src = null; // 取消请求
							top.location.href = url;
						}
					});
				}
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
}

function showdatagrid(id) {
	$("#rtt").datagrid({
		fitColumns : true,
		height : '250px',
		width : '80%',
		idField : 'roles_name',
		url : "user/getAllRole1?id=" + id,
		rownumbers : false,
		showPageList : false,
		checkOnSelect : true,
		selectOnCheck : true,
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'symbol',
			title : 'symbol',
			width : 100,
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'roles_name',
			title : '角色名',
			width : 100,
			halign : "center",
			align : "left"
		} ] ],
		rowStyler : function(index, row) {
			if ((index % 2) != 0) {
				//处理行代背景色后无法选中
				var color = new Object();
				return color;
			}
		},
		onBeforeLoad : function(data) {
			$('#rtt').datagrid('clearChecked');
		},
		onLoadSuccess : function(data) {
			if (data) {
				$.each(data.rows, function(index, item) {
					if (item.symbol == 1) {
						$('#rtt').datagrid('checkRow', index);
					}
				})
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