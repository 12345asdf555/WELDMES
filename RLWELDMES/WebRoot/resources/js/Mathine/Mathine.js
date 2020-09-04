$(function(){
	//typeCombobox();
	manuCombobox();
	weldmachine();
	$("#desc").combobox({
		onChange:function(){
			weldmachine();
		}
	});
	
	$("#form").form("disableValidation");
});

function weldmachine(){
	var urls="";
	var bar = $("#desc").combobox("getValue");
	urls="weldingMachine/findAllweldmachine?bar="+bar;
	//urls="weldingMachine/findAllweldmachine";
	$("#tt").datagrid( {
		fitColumns : true,
		height : $("#body").height(),
		width : $("#body").width(),
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
			width : 300,
			halign : "center",
			align : "left",
			hidden: true
		},{
			field : 'weldmachinetype',
			title : '焊机型号',
			width : 300,
			halign : "center",
			align : "center"
		},{
			field : 'machinevalue',
			title : '焊机型号value',
			width : 300,
			halign : "center",
			align : "left"
			//hidden:true
		}]],
		rowStyler: function(index,row){
            if ((index % 2)!=0){
            	//处理行代背景色后无法选中
            	var color=new Object();
                color.class="rowColor";
                return color;
                //return 'background-color:#6d8a92;color:#ffffff'
            }
		},
		onBeforeLoad:function(data){
			 $('#tt').datagrid('clearChecked');
		},
		onLoadSuccess:function(data){
			 if(data){
				 for(var i=0;i<data.rows.length;i++){
					 if(data.rows[i].symble==1){
						 $('#tt').datagrid('checkRow',i);
					 }
				 }
			 }
		}
	});
}

var url = "";
var flag = 1;
function addfactory(){
	flag = 1;
	$('#dlg').window( {
		title : "厂家焊机型号绑定",
		modal : true
	});
	$('#dlg').window('open');
	$('#fm').form('clear');
	weldmachine();
	url = "weldingMachine/getfactoryType";
}

//提交
function save(){
	//url = "weldingMachine/getfactoryType";
	 var back = $("#desc").combobox("getValue");
	//var back=$("#desc").combobox('getText');
	var rows = $('#tt').datagrid('getSelections');
	var str="";
		for(var i=0; i<rows.length; i++){
			str += rows[i].machinevalue+",";
		}
	var url2 = ""; 
	var fmachingname;
	if(flag==1){
		messager = "绑定成功！";
		url2 = "weldingMachine/getfactoryType?back="+back+"&str="+str+"&fmachingname="+"";
	}else{
		messager = "修改成功！";
		url2 = url+"&back="+back;
	}
	$('#form').form('submit', {
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
					//$('#dlg').dialog('close');
					$('#dg').datagrid('reload');
				}
			}
			
		},  
	    error : function(errorMsg) {  
	        alert("数据请求失败，请联系系统管理员!");  
	    } 
	});
}

//厂商
function manuCombobox(){
	$.ajax({  
	  type : "post",  
	  async : false,
	  url : "weldingMachine/getManuAll",  
	  data : {},  
	  dataType : "json", //返回数据形式为json  
	  success : function(result) {  
	      if (result) {
	          var optionStr = '';
	          for (var i = 0; i < result.ary.length; i++) {  
	              optionStr += "<option value=\"" + result.ary[i].id + "\" >"  
	                      + result.ary[i].name + "</option>";
	          }
	          $("#desc").html(optionStr);
	      }  
	  },  
	  error : function(errorMsg) {  
	      alert("数据请求失败，请联系系统管理员!");  
	  }  
	}); 
	$("#desc").combobox();
}

//监听窗口大小变化
window.onresize = function() {
	setTimeout(domresize, 500);
}

//改变表格高宽
function domresize() {
	$("#tt").datagrid('resize', {
		height : $("#body").height(),
		width : $("#body").width()
	});
}