$(function(){
	itemidCombobox();
	protocolCombobox();
	statusCombobox();
	var item = $("#item").val();
//	$("#itemid").combobox({
//        onChange:function(){
        	//处理项目部发生改变时采集序号无法进行验证问题
//        	var gatherno = $("#gatherNo").val();
//        	$("#gatherNo").textbox("setValue",gatherno);
//        } 
//     });
	$("#itemid").combobox("select",item);
	$('#dlg').dialog( {
		onClose : function() {
			$('#protocol').combobox('clear');
			$('#status').combobox('clear');
			$('#itemid').combobox('clear');
			$("#fm").form("disableValidation");
		}
	})
	$("#fm").form("disableValidation");
})


var url = "";
var flag = 1;
function addGather(){
	flag = 1;
	$('#dlg').window( {
		title : "新增采集模块",
		modal : true
	});
	$('#dlg').window('open');
	$('#fm').form('clear');
	url = "gather/addGather";
}

function editGather(){
	flag = 2;
	$('#fm').form('clear');
	var row = $('#gatherTable').datagrid('getSelected');
	if (row) {
		$('#dlg').window( {
			title : "修改采集模块",
			modal : true
		});
		$('#dlg').window('open');
		$('#fm').form('load', row);
		$('#validgatherno').val(row.gatherNo);
		url = "gather/editGather?id="+ row.id;
	}
}
//提交
function saveGather(){
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
					$('#gatherTable').datagrid('reload');
				}
			}
			
		},  
	    error : function(errorMsg) {  
	        alert("数据请求失败，请联系系统管理员!");  
	    } 
	});
}

//采集模块状态
function statusCombobox(){
    var optionStr = '';
    optionStr += "<option value='正常'>正常</option>"+
    		"<option value='维修'>维修</option>";  
    $("#status").html(optionStr);
	$("#status").combobox();
}

//所属项目
function itemidCombobox(){
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

//采集模块通讯协议
function protocolCombobox(){
    var optionStr = ''; 
    optionStr += "<option value='串口'>串口</option>"+
    		"<option value='zigbee'>zigbee</option>"+
    		"<option value='wifi'>wifi</option>"+
    		"<option value='4g'>4g</option>";  
  
    $("#protocol").html(optionStr);
	$("#protocol").combobox();
}

