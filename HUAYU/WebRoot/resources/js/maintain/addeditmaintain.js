$(function(){
	typeCombobox();
	equipmentCombobox();
	$('#dlg').dialog( {
		onClose : function() {
			$('#typeid').combobox('clear');
			$('#wid').combobox('clear');
			$("#fm").form("disableValidation");
		}
	})
	$("#fm").form("disableValidation");
})


var url = "";
var maintainfalg = true;
function addMaintain(){
	maintainfalg = true;
	$('#dlg').window( {
		title : "新增组织机构",
		modal : true
	});
	$('#dlg').window('open');
	$('#fm').form('clear');
	url = "maintain/addMaintain";
}

function editMaintain(){
	maintainfalg = false;
	$('#fm').form('clear');
	var row = $('#maintainTable').datagrid('getSelected');
	if (row) {
		$('#dlg').window( {
			title : "修改维修记录",
			modal : true
		});
		$('#dlg').window('open');
		$('#fm').form('load', row);
	}
	url = "maintain/editMaintain?mid=" + row.mid;
}
//提交
function saveMaintain(){
	var wid = $("#wid").combobox('getValue');
	var tid = $("#typeid").combobox('getValue');
	var url2 = "";
	if(maintainfalg){
		messager = "新增成功！";
		url2 = url+"?tId="+tid+"&wId="+wid;
	}else{
		messager = "修改成功！";
		url2 = url+"&tId="+tid+"&wId="+wid;;
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
					$('#maintainTable').datagrid('reload');
				}
			}
			
		},  
	    error : function(errorMsg) {  
	        alert("数据请求失败，请联系系统管理员!");  
	    } 
	});
}

//维修类型
function typeCombobox(){
	$.ajax({  
        type : "post",  
        async : false,
        url : "maintain/getComboboxValue",  
        data : {},  
        dataType : "json", //返回数据形式为json  
        success : function(result) {
            if (result) {
                var optionStr = '';  
                for (var i = 0; i < result.ary2.length; i++) {  
                    optionStr += "<option value=\"" + result.ary2[i].typeid + "\" >"  
                            + result.ary2[i].typename + "</option>";  
                }  
                $("#typeid").html(optionStr);
            }  
        },  
        error : function(errorMsg) {  
            alert("数据请求失败，请联系系统管理员!");  
        }  
   }); 
	$("#typeid").combobox();
}

//设备编号
function equipmentCombobox(){
	$.ajax({  
      type : "post",  
      async : false,
      url : "maintain/getComboboxValue",  
      data : {},  
      dataType : "json", //返回数据形式为json  
      success : function(result) {  
          if (result) {
              var optionStr = '';
              for (var i = 0; i < result.ary1.length; i++) {  
                  optionStr += "<option value=\"" + result.ary1[i].mid + "\" >"  
                          + result.ary1[i].equipmentNo + "</option>";
              }
              $("#wid").html(optionStr);
          }  
      },  
      error : function(errorMsg) {  
          alert("数据请求失败，请联系系统管理员!");  
      }  
	});
	$("#wid").combobox();
}
