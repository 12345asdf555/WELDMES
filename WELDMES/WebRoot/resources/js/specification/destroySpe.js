/**
 * 
 */
var url = "";
function removeWps(){
	$('#rfm').form('clear');
	var row = $('#dg').datagrid('getSelected');
	if (row) {
		$('#rdlg').window( {
			title : "删除工艺",
			modal : true
		});
		$('#rdlg').window('open');
		$('#rfm').form('load', row);
		url = "wps/destroyWps?fid="+row.FID;
	}
}

function remove(){
	$.messager.confirm('提示', '此操作不可撤销，是否确认删除?', function(flag) {
		if (flag) {
	            $('#rfm').form('submit',{
	                url: url,
	                success: function(result){
	                    var result = eval('('+result+')');
	                    if (result.errorMsg){
	                        $.messager.show({
	                            title: 'Error',
	                            msg: result.errorMsg
	                        });
	                    } else {
	              			$.messager.alert("提示", "删除成功");
							$('#rdlg').dialog('close');
							$('#dg').datagrid('reload');
	                    }
	                }
	            });
		}
	})
}
         