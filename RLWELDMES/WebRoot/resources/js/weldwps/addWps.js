/**
 * 
 */
/**
 * 
 */
$(function(){
	inscombobox();
	$('#dlg').dialog( {
		onClose : function() {
			$('#insid').combobox('clear');
			$("#fm").form("disableValidation");
		}
	})
	$("#fm").form("disableValidation");
 })
 
 var url = "";
var flag = 1;
function addWps(){
	flag = 1;
	$('#dlg').window( {
		title : "新增工艺",
		modal : true
	});
	$('#dlg').window('open');
	$('#fm').form('clear');
	url = "wps/addWps";
}

function editWps(){
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
		$("#validName").val(row.FWPSNum);
		url = "wps/updateWps?FID="+ row.FID;
	}
}
//提交
function save(){
	var url2 = "";
    var fwn = $('#FWPSNum').val();
    var insframework = $('#insid').combobox('getValue');
	if(flag==1){
		messager = "新增成功！";
		url2 = url+"?ins="+insframework+"&fwn="+fwn;
	}else{
		messager = "修改成功！";
		url2 = url+"&ins="+insframework;
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


function inscombobox(){
	   $.ajax({
	   type: "post", 
       async : false,
	   url: "user/getIns",
	   dataType: "json",
	   data: {},
	   success: function (result) {
	      if (result) {
	         var optionstring = "";
	         //循环遍历 下拉框绑定
	         for(var k=0;k<result.rows.length;k++){
	         optionstring += "<option value=\"" + result.rows[k].insid + "\" >" + result.rows[k].insname + "</option>";
	         }
	         $("#insid").html(optionstring);
	      } else {
	         alert('部门加载失败');
	      }
	      $("#insid").combobox();
	   },
	   error: function () {
	      alert('error');
	   }
	});
}
