$(function(){
	statusRadio();
	$('#dlg').dialog( {
		onClose : function() {
			$("#fm").form("disableValidation");
		}
	})
	$("#fm").form("disableValidation");
});

function AutorityDatagrid(){
	var urls="";
	var row = $('#dg').datagrid('getSelected');
	if(flag==1){
		urls="authority/getAllResource";
	}else{
		urls="authority/getAllResource1?id="+row.id;
	}
	$("#tt").datagrid( {
		fitColumns : true,
		height : '250px',
		width : '80%',
		idField : 'roles_name',
		url : urls,
		rownumbers : false,
		showPageList : false,
		checkOnSelect:true,
		selectOnCheck:true,
		columns : [ [ {
		    field:'ck',
			checkbox:true
		},{
			field : 'id',
			title : 'id',
			width : 100,
			halign : "center",
			align : "left",
			hidden:true
		},{
			field : 'symbol',
			title : 'symbol',
			width : 100,
			halign : "center",
			align : "left",
			hidden:true
		},{
			field : 'resources_name',
			title : '资源名',
			width : 100,
			halign : "center",
			align : "left"
		}]],
		rowStyler: function(index,row){
            if ((index % 2)!=0){
            	//处理行代背景色后无法选中
            	var color=new Object();
                return color;
            }
		},
		onBeforeLoad:function(data){
			 $('#tt').datagrid('clearChecked');
		},
		onLoadSuccess:function(data){
			 if(data){
				 $.each(data.rows, function(index, item){
					 if(item.symbol==1){
				         $('#tt').datagrid('checkRow', index);
					 }
				 })
			 }
		}
	});
}

var url = "";
var flag = 1;
function saveAuthority(){
	flag = 1;
	$("#fm").form("disableValidation");
	$('#dlg').window( {
		title : "新增权限",
		modal : true
	});
	$('#dlg').window('open');
	$('#fm').form('clear');
	AutorityDatagrid();
	var statusId = document.getElementsByName("statusid");
	statusId[0].checked =  'checked';
	url = "authority/addAuthority";
}

function editAuthorith(){
	flag = 2;
	$('#fm').form('clear');
	var row = $('#dg').datagrid('getSelected');
	if (row) {
		$('#dlg').window( {
			title : "修改权限",
			modal : true
		});
		$('#dlg').window('open');
		AutorityDatagrid();
		$('#fm').form('load', row);
		$('#validName').val(row.authorityName.substring(5));
		$("#authorityName").textbox("setValue", row.authorityName.substring(5));
		url = "authority/updateAuthority?id="+ row.id;
	}
}
//提交
function save(){
    var sid = $("input[name='statusid']:checked").val();
    var aid = $('#id').val();
    var rows = $("#tt").datagrid("getSelections");
    var str="";
	for(var i=0; i<rows.length; i++){
		str += rows[i].id+",";
	}
	var url2 = "";
	if(flag==1){
		messager = "新增成功！";
		url2 = url+"?status="+sid+"&rid="+str;
	}else{
		messager = "修改成功！";
		url2 = url+"&status="+sid+"&sid="+str;
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