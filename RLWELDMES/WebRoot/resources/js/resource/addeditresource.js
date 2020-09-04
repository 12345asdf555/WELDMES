$(function(){
	statusRadio();
	$('#dlg').dialog( {
		onClose : function() {
			$("#fm").form("disableValidation");
		}
	})
	$("#fm").form("disableValidation");
});

var url = "";
var flag = 1;

function addResource(){
	flag = 1;
	$('#fm').form('clear');
	$('#dlg').window( {
		title : "新增资源",
		modal : true
	});
	$('#dlg').window('open');
	var statusId = document.getElementsByName("statusid");
	statusId[0].checked =  'checked';
	url = "resource/addResource";
}

function editResource(){
	flag = 2;
	$('#fm').form('clear');
	var row = $('#dg').datagrid('getSelected');
	if (row) {
		$('#dlg').window( {
			title : "修改资源",
			modal : true
		});
		$('#dlg').window('open');
		$('#fm').form('load', row);
		$('#validName').val(row.resourceName);
		url = "resource/updateResource?id="+row.id;
	}
}
//提交
function save(){
	var url2 = "";
    var sid = $("input[name='statusid']:checked").val();
	if(flag==1){
		messager = "新增成功！";
		url2 = url+"?status="+sid;
	}else{
		messager = "修改成功！";
		url2 = url+"&status="+sid;
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

function statusRadio(){
	$.ajax({  
	    type : "post",  
	    async : false,
	    url : "user/getStatusAll",  
	    data : {},  
	    dataType : "json", //返回数据形式为json  
	    success : function(result) {
	    	if (result) {
	    		var str = "";
	    		for (var i = 0; i < result.ary.length; i++) {
	    			str += "<input type='radio' class='radioStyle' name='statusid' id='sId' value=\"" + result.ary[i].id + "\" />"  
                    + result.ary[i].name+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	    		}
	            $("#radios").html(str);
	        }  
	    },  
	    error : function(errorMsg) {  
	        alert("数据请求失败，请联系系统管理员!");  
	    }  
	});
}