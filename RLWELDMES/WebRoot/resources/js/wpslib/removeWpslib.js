/**
 * 
 */
$(function(){
	$('#rmwltdlg').dialog( {
		onClose : function() {
			$("#rmwltfm").form("disableValidation");
		}
	})
	$("#rmwltfm").form("disableValidation");
})

var url = "";
function openRemoveWpslib(){
	$('#rmwltfm').form('clear');
	statusRadio();
	var row = $('#wpslibTable').datagrid('getSelected');
	if (row) {
		$('#rmwltdlg').window( {
			title : "删除整个工艺库",
			modal : true
		});
		$('#rmwltdlg').window('open');
		$('#rmwltfm').form('load', row);
		url = "wps/removeWpslib?fid="+row.fid;
	}
}

function removeWpslib(){
	$.messager.confirm('提示', '此操作不可撤销并同时该库内所有工艺，是否确认删除?', function(flag) {
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
							$('#rmwltdlg').dialog('close');
							$('#wpslibTable').datagrid('reload');
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

function openRemoveMainWps(row){
	$('#rmmwfm').form('clear');
	if (row) {
		$('#rmmwdlg').window( {
			title : "删除工艺",
			modal : true
		});
		$('#rmmwdlg').window('open');
		$('#rmmwfm').form('load', row);
		url = "wps/removeMainWps?fid="+row.fid;
	}
}

function removeMainwps(){
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
							$('#rmmwdlg').dialog('close');
							$('#wpslibTable').datagrid('reload');
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

var rurl;
function rmSxWps(row){
	$('#sxfm').form('clear');
	if (row) {
		$('#editSxDlg').window( {
			title : "删除工艺",
			modal : true
		});
		$("#sxRemoveWpsBut").show();
		$("#sxgetWpsBut").hide();
		$("#sxSaveWpsBut").hide();
		$('#editSxDlg').window('open');
		$('#sxfm').form('load', row);
		$("input[name='sxfcharacter']").eq(row.sxfcharacter).prop("checked", true);
		rurl = "wps/removeMainWps?fid="+row.fid;
	}
}

function removeSxwps(){
	$.messager.confirm('提示', '此操作不可撤销，是否确认删除?', function(flag) {
		if (flag) {
			$.ajax({  
		        type : "post",  
		        async : false,
		        url : rurl,  
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
							$('#editSxDlg').dialog('close');
							$('#wpslibTable').datagrid('reload');
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