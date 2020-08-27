/**
 * 
 */
$(function(){
	$('#dlg').dialog( {
		onClose : function() {
			$("#fm").form("disableValidation");
		}
	})
	$("#fm").form("disableValidation");
 })
 
 var url = "";
var flag = 1;
function addProcess(){
	flag = 1;
	$('#dlg').window( {
		title : "新增工艺",
		modal : true
	});
	$('#dlg').window('open');
	$('#fm').form('clear');
	url = "product/addProcess";
}

function editProcess(){
	flag = 2;
	$('#fm').form('clear');
	var row = $('#dg').datagrid('getSelected');
	if (row) {
		$('#dlg').window( {
			title : "修改工艺",
			modal : true
		});
		$('#dlg').window('open');
		$('#fm').form('load', row);
		url = "product/updateProcess?id="+ row.id;
	}
}
//提交
function save(){
	var url2 = "";
	if(flag==1){
		messager = "新增成功！";
		url2 = url;
	}else{
		messager = "修改成功！";
		url2 = url;
	}
	$('#fm').form('submit', {
		url : url2,
		onSubmit : function() {
			return $(this).form('enableValidation').form('validate');
		},
		success : function(result) {
			if(result){
				var result = eval('(' + result + ')');
				if (!result.success) {
					$.messager.show( {
						title : 'Error',
						msg : result.errorMsg
					});
				} else {
					$.messager.alert("提示", messager);
					$('#dlg').dialog('close');
					$('#dg').datagrid('reload');
				}
			}
			
		},  
	    error : function(errorMsg) {  
	        alert("数据请求失败，请联系系统管理员!");  
	    } 
	});
}
