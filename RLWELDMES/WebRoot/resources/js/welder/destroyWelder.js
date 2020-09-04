var url = "";
function removeWelder() {
	$('#rfm').form('clear');
	var row = $('#welderTable').datagrid('getSelected');
	if (row) {
		$('#rdlg').window({
			title : "删除焊工",
			modal : true
		});
		$('#rdlg').window('open');
		$('#rfm').form('load', row);
		url = "welders/destroyWelder?fid=" + row.id;
	}
}

function remove() {
	$.messager.confirm('提示', '此操作不可撤销，是否确认删除?', function(flag) {
		if (flag) {
			$('#rfm').form('submit', {
				url : url,
				onSubmit : function() {
					return $(this).form('enableValidation').form('validate');
				},
				success : function(result) {
					var result = eval('(' + result + ')');
					if (result.errorMsg) {
						$.messager.show({
							title : 'Error',
							msg : result.errorMsg
						});
					} else {
						$.messager.alert("提示", "删除成功");
						$('#rdlg').dialog('close');
						$('#welderTable').datagrid('reload');
					//						var url = "welders/AllWelder";
					//						var img = new Image();
					//					    img.src = url;  // 设置相对路径给Image, 此时会发送出请求
					//					    url = img.src;  // 此时相对路径已经变成绝对路径
					//					    img.src = null; // 取消请求
					//						window.location.href = encodeURI(url);
					}
				}
			})
		}
	});
}