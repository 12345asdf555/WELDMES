$(function(){
	$('#dlg').dialog( {
		onClose : function() {
			$('#typeid').combobox('clear');
			$('#parentid').combobox('clear');
			$("#fm").form("disableValidation");
		}
	})
	$("#parentid").combobox({
        onChange:function(){
        	var parent = $("#parentid").combobox('getValue');
        	typecombobox(0,parent);
        } 
     });
	$("#fm").form("disableValidation");
})


var url = "";
var flag = 1;
function newInsframework(){
	flag = 1;
	insfcombobox(0,0);
	$('#dlg').window( {
		title : "新增组织机构",
		modal : true
	});
	$('#dlg').window('open');
	$('#fm').form('clear');
	url = "insframework/addInsframework";
}

function editInsframework(){
	flag = 2;
	$('#fm').form('clear');
	var row = $('#insframeworkTable').datagrid('getSelected');
	insfcombobox(row.typeid,row.id);
	if (row) {
		$('#dlg').window( {
			title : "修改组织机构",
			modal : true
		});
		$('#dlg').window('open');
		$('#fm').form('load', row);
		$('#validname').val(row.name);
		$("#typeid").combobox('select',row.typeid);
		url = "insframework/editInsframework?id="+row.id;
	}
}
//提交
function saveInsframework(){
	var parent = $("#parentid").combobox('getValue');
	var type = $("#typeid").combobox('getValue');
	var url2 = "";
	if(flag==1){
		messager = "新增成功！";
		url2 = url+"?parent="+parent+"&type="+type;
	}else{
		messager = "修改成功！";
		url2 = url+"&parent="+parent+"&type="+type;
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
					$('#insframeworkTable').datagrid('reload');
				}
			}
			
		},  
	    error : function(errorMsg) {  
	        alert("数据请求失败，请联系系统管理员!");  
	    } 
	});
}

//上级项目/类型
function insfcombobox(type,id){
	$.ajax({  
        type : "post",  
        async : false,
        url : "insframework/getParent?type="+type+"&id="+id,  
        data : {},  
        dataType : "json", //返回数据形式为json  
        success : function(result) {
            if (result) {
                var optionStr1 = '',optionStr2 = '';  
                for (var i = 0; i < result.ary.length; i++) {  
                    optionStr1 += "<option value=\"" + result.ary[i].id + "\" >"  
                            + result.ary[i].name + "</option>";  
                }  
                $("#parentid").html(optionStr1);
            }  
        },  
        error : function(errorMsg) {  
            alert("数据请求失败，请联系系统管理员!");  
        }  
   }); 
	$("#parentid").combobox();
	typecombobox(type,"");
	$("#fm").form("disableValidation");
}

function typecombobox(type,parentid){
	$.ajax({  
        type : "post",  
        async : false,
        url : "insframework/getType?type="+type+"&parentid="+parentid,  
        data : {},  
        dataType : "json", //返回数据形式为json  
        success : function(result) {
            if (result) {
                var optionStr1 = '';  
                for (var i = 0; i < result.ary.length; i++) {  
                    optionStr1 += "<option value=\"" + result.ary[i].id + "\" >"  
                            + result.ary[i].name + "</option>";  
                }  
                $("#typeid").html(optionStr1);
            }  
        },  
        error : function(errorMsg) {  
            alert("数据请求失败，请联系系统管理员!");  
        }  
   }); 
	$("#typeid").combobox();
	$("#fm").form("disableValidation");
}

function addInsframework(){
	$.ajax({  
        type : "post",  
        async : false,
        url : "insframework/getUserInsfid",  
        data : {},  
        dataType : "json", //返回数据形式为json  
        success : function(result) {
            if (result) {
                if(!result.flag){
                	alert("项目部人员无法执行此操作");
                }else{
                	newInsframework();
                }
            }  
        },  
        error : function(errorMsg) {  
            alert("数据请求失败，请联系系统管理员!");  
        }  
   }); 
}


