$(function(){
	InsframeworkCombobox();
	$('#dlg').dialog( {
		onClose : function() {
			$('#itemid').combobox('clear');
			$("#fm").form("disableValidation");
		}
	});
	$("#fm").form("disableValidation");
	$("#weldedJunctionno").textbox('textbox').blur(function(){
		var wjno = $("#weldedJunctionno").val();
		var len = wjno.length;
		if(len!=8){
			for(var i=0;i<8-len;i++){
				wjno = "0"+wjno;
			}
		}
		$("#weldedJunctionno").textbox('setValue',wjno);
	});
})

var url = "";
var flag = 1;
function addWeldedjunction(){
	flag = 1;
	$('#dlg').window( {
		title : "新增焊缝",
		modal : true
	});
	$('#dlg').window('open');
	$('#fm').form('clear');
	url = "weldedjunction/addWeldedJunction";
}

function editWeldedjunction(){
	flag = 2;
	$('#fm').form('clear');
	var row = $('#weldedJunctionTable').datagrid('getSelected');
	if (row) {
		$('#dlg').window( {
			title : "修改焊缝",
			modal : true
		});
		$('#dlg').window('open');
		$('#fm').form('load', row);
		$('#oldno').val(row.weldedJunctionno);
		url = "weldedjunction/editWeldedJunction?id="+ row.id;
	}
}

//提交
function save(){
	var messager = "";
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
				}else{
					$.messager.alert("提示", messager);
					$('#dlg').dialog('close');
					$('#weldedJunctionTable').datagrid('reload');
				}
			}
			
		},  
	    error : function(errorMsg) {  
	        alert("数据请求失败，请联系系统管理员!");  
	    } 
	});
}

//所属项目
function InsframeworkCombobox(){
	$.ajax({  
      type : "post",  
      async : false,
      url : "weldingMachine/getInsframeworkAll",  
      data : {},  
      dataType : "json", //返回数据形式为json  
      success : function(result) {  
          if (result) {
              var optionStr = '';
              for (var i = 0; i < result.ary.length; i++) {  
                  optionStr += "<option value=\"" + result.ary[i].id + "\" >"  
                          + result.ary[i].name + "</option>";
              }
              $("#itemid").html(optionStr);
          }  
      },  
      error : function(errorMsg) {  
          alert("数据请求失败，请联系系统管理员!");  
      }  
	}); 
	$("#itemid").combobox();
}

