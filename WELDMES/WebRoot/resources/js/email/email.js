$(function(){
	dgDatagrid();
});

function dgDatagrid(){
	$("#dg").datagrid( {
		fitColumns : true,
		height : $("#body").height(),
		width : $("#body").width(),
		idField : 'id',
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		url : "hierarchy/getEmailList",
		singleSelect : true,
		rownumbers : true,
		showPageList : false,
		columns : [ [ {
			field : 'id',
			title : '序号',
			width : 50,
			halign : "center",
			align : "left",
			hidden:true
		},{
			field : 'femailname',
			title : '接收者',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'femailaddress',
			title : '邮箱地址',
			width : 200,
			halign : "center",
			align : "left"
		}, {
			field : 'typestr',
			title : '权限',
			width : 500,
			halign : "center",
			align : "left"
		}, {
			field : 'femailtype',
			title : '权限',
			width : 150,
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'edit',
			title : '编辑',
			width : 150,
			halign : "center",
			align : "left",
			formatter:function(value,row,index){
				var str = "";
				str += '<a id="edit" class="easyui-linkbutton" href="javascript:editEmail('+row.itemid+')"/>';
				str += '<a id="remove" class="easyui-linkbutton" href="javascript:removeEmail()"/>';
				return str;
			}
		}] ],
		pagination : true,
		nowrap : false,
		rowStyler: function(index,row){
            if ((index % 2)!=0){
            	//处理行代背景色后无法选中
            	var color=new Object();
                color.class="rowColor";
                return color;
            }
        },
		onLoadSuccess:function(data){
	        $("a[id='edit']").linkbutton({text:'修改',plain:true,iconCls:'icon-update'});
	        $("a[id='remove']").linkbutton({text:'删除',plain:true,iconCls:'icon-delete'});
		}
	});
}

var url = "";
var flag = 1;
function addEmail(){
	flag = 1;
	$('#dlg').window( {
		title : "新增邮箱",
		modal : true
	});
	$('#dlg').window('open');
	$('#fm').form('clear');
	url = "hierarchy/addEmail";
}

function editEmail(){
	flag = 2;
	$('#fm').form('clear');
	var row = $('#dg').datagrid('getSelected');
	if (row) {
		$('#dlg').window( {
			title : "修改邮箱",
			modal : true
		});
		$('#dlg').window('open');
		$('#oldemail').val(row.femailaddress);
		$('#fm').form('load', row);
		var str = row.femailtype.split(",");
		for(var i=0;i<str.length;i++){
			$("input[name='femailtype'][value="+str[i]+"]").prop("checked",true);
		}
		url = "hierarchy/editEmail?address="+ row.femailaddress;
	}
}
//提交
function saveEmail(){
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
					$('#dg').datagrid('reload');
				}
				$("#fm").form("disableValidation");
			}
			
		},  
	    error : function(errorMsg) {  
	        alert("数据请求失败，请联系系统管理员!");  
	    } 
	});
}

function removeEmail(){
	$('#rfm').form('clear');
	var row = $('#dg').datagrid('getSelected');
	if (row) {
		$('#rdlg').window( {
			title : "删除邮箱",
			modal : true
		});
		$('#rdlg').window('open');
		$('#rfm').form('load', row);
		url =  "hierarchy/deleteEmail?femailaddress="+row.femailaddress;
		var str = row.femailtype.split(",");
		for(var i=0;i<str.length;i++){
			$("input[name='femailtype'][value="+str[i]+"]").prop("checked",true);
		}
	}
}

function remove(){
	$.messager.confirm('提示', '此操作不可撤销，是否确认删除?', function(flag) {
		if (flag) {
			$.ajax({  
		        type : "post",  
		        async : false,
		        url : url,  
		        data : {},  
		        dataType : "json", //返回数据形式为json  
		        success : function(result) {
		            if (result) {
		            	if (!result.success) {
							$.messager.show( {
								title : 'Error',
								msg : result.msg
							});
						} else {
							$.messager.alert("提示", "删除成功！");
							$('#rdlg').dialog('close');
							$('#dg').datagrid('reload');
						}
		            }  
		        },  
		        error : function(errorMsg) {  
		            alert("数据请求失败，请联系系统管理员!");  
		        }  
		   }); 
		}
	});
}

//监听窗口大小变化
window.onresize = function() {
	setTimeout(domresize, 500);
}

//改变表格高宽
function domresize() {
	$("#dg").datagrid('resize', {
		height : $("#body").height(),
		width : $("#body").width()
	});
}

