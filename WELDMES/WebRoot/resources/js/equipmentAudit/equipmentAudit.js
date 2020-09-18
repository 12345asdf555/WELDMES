$(function(){
	insframeworkTree();
	equipmentAuditDatagrid();
});
var vlogoAudit = "";
var data = [
	{id: 1, text:''},
	{id: 2, text:'审核通过'},
	{id: 3, text:'审核不通过'}
];
function equipmentAuditDatagrid(){
	$("#equipmentAuditTable").datagrid( {
		height : $("#body").height(),
		width : $("#body").width(),
		idField : 'id',
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		url : "equipmentAudit/getEquipmentAuditList",
		singleSelect : true,
		rownumbers : true,
		remoteSort:false,
		showPageList : false, 
		columns : [ [ {
			field : 'id',
			title : '序号',
			width : 50,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'equipmentNo',
			title : '固定资产编号',
			width : 80,
			halign : "center",
			align : "left",
			sortable: true
		}, {
			field : 'typeName',
			title : '设备类型',
			width : 80,
			halign : "center",
			align : "left"
		}, {
			field : 'modelname',
			title : '设备型号',
			width : 80,
			halign : "center",
			align : "left"
		}, {
			field : 'appointmentDatetime',
			title : '预约时间',
			width : 140,
			halign : "center",
			align : "left"
		}, {
			field : 'giveBackDatetime',
			title : '归还时间',
			width : 140,
			halign : "center",
			align : "left"
		}, {
			field : 'welderInfo',
			title : '焊工',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'appointment_message',
			title : '预约信息',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'remark',
			title : '备注',
			width : 100,
			halign : "center",
			align : "left"
		}
		, {
			field : 'check_status',
			title : '审核状态',
			width : 70,
			halign : "center",
			align : "left",
			formatter:function(value,row,index){
				var str = "";
				if(value == '' || value == "" || value == 0){
					str = "";
				}else if(value == 1){
					str = '<span style="color: red">'+"待审核"+'</span>';
				}else if(value == 2){
					str = '<span style="color: green">'+"审核通过"+'</span>';
				}else if(value == 3){
					str = "审核不通过";
				}
				return str;
			}
		}, {
			field : 'checkDatetime',
			title : '审核时间',
			width : 140,
			halign : "center",
			align : "left"
		}, {
			field : 'check_message',
			title : '审核信息',
			width : 120,
			halign : "center",
			align : "left"
		}, {
			field : 'userInfo',
			title : '审核人',
			width : 130,
			halign : "center",
			align : "left"
		}
		, {
			field : 'create_time',
			title : '创建时间',
			width : 140,
			halign : "center",
			align : "left"
		}, {
			field : 'edit',
			title : '操作',
			width : 200,
			halign : "center",
			align : "left",
			formatter:function(value,row,index){
				var str = "";
				if (row.check_status == 1) {
					str += '<a id="awaitAudit" class="easyui-linkbutton" href="javascript:appointment('+row.iId+','+row.id+',1)"/>';
				}
				if (row.check_status != 1) {
					str += '<a id="edit" class="easyui-linkbutton" href="javascript:appointment('+row.iId+','+row.id+',2)"/>';
				}
				return str;
			}
		}
		] ],
		pagination : true,
//		fitColumns : true,
		rowStyler: function(index,row){
            if ((index % 2)!=0){
            	//处理行代背景色后无法选中
            	var color=new Object();
                return color;
            }
        },
		onLoadSuccess:function(data){
	        $("a[id='awaitAudit']").linkbutton({text:'审核',plain:true,iconCls:'icon-select'});		
	        $("a[id='edit']").linkbutton({text:'编辑',plain:true,iconCls:'icon-select'});		
		}
	});
}

//审核
function appointment(iId,id,status){
	$.ajax({  
        type : "post",  
        async : false,
        url : "insframework/getUserAuthority?id="+iId,  
        data : {},  
        dataType : "json", //返回数据形式为json  
        success: function(result) {
    		if(null == result.afreshLogin || result.afreshLogin==''){
        		if(result.flag){	//判断用户操作权限
    				//判断设备是否可预约
        			if (status == '1') {	//审核
        				awaitAudit(id);
					}else if(status == '2'){
						editAudit(id);
					}
        		}else{
        			alert("对不起，您不能对你的上级或同级部门的数据进行编辑");
        		}
        	}else{
        		$.messager.confirm("提示",result.afreshLogin,function(data){
	        		 if(data){
	        			var url = "login.jsp";
	       				var img = new Image();
	       			    img.src = url;  // 设置相对路径给Image, 此时会发送出请求
	       			    url = img.src;  // 此时相对路径已经变成绝对路径
	       			    img.src = null; // 取消请求
	     				 top.location.href = url;
	     			 }
	     		 });
	        }
        },  
        error: function(errorMsg) {  
            alert("数据请求失败，请联系系统管理员!");
        }  
   });
}

//弹出设备审核页面
function awaitAudit(id){
	vlogoAudit = "add";
	$('#fmAudit').form('clear');
	var row = $('#equipmentAuditTable').datagrid('getSelected');
	if (row) {
		$('#dlg').window({
			title : "焊机设备审核",
			modal : true
		});
		$('#dlg').window('open');
		$('#equipmentNo').textbox("setValue", row.equipmentNo);
		$('#welderInfo').textbox("setValue", row.welderInfo);
		$('#id').val(id);
		$("#fwelderId").val(row.welderId);
		$('#appointmentDatetime').datetimebox("setValue", row.appointmentDatetime);
		$('#giveBackDatetime').datetimebox("setValue", row.giveBackDatetime);
		$('#appointment_message').val(row.appointment_message);
		$('#remarks').val(row.remark);
		$("#check_status").combobox({
            valueField : 'id',
            textField : 'text',  
            editable : false,  
            required : true,
            mode : 'local',  
            data: data
        }); 
		$('#fmAudit').form('load', row);
	}
}


//设备审核提交
function saveEquipmentAudit(){
	var urls = "";
	var message = "";
	if (vlogoAudit == "add"){
		message = "审核完成！";
		urls = "equipmentAudit/addEquipmentAudit";
	}else if(vlogoAudit == "edit"){
		message = "修改完成！";
		urls = "equipmentAudit/editEquipmentAudit";
	}
	$('#fmAudit').form('submit', {
		url : urls,
		onSubmit : function() {
			return $(this).form('enableValidation').form('validate');
		},
		success : function(result) {
			if (result) {
				var result = eval('(' + result + ')');
				if (!result.success) {
					$.messager.show({
						title : 'Error',
						msg : result.errorMsg
					});
				} else {
					$.messager.alert("提示", message);
					$('#dlg').dialog('close');
					$('#equipmentAuditTable').datagrid('reload');
				}
			}

		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	vlogoAudit = "";
}

//编辑
function editAudit(id){
	vlogoAudit = "edit";
	$('#fmAudit').form('clear');
	var row = $('#equipmentAuditTable').datagrid('getSelected');
	if (row) {
		$('#dlg').window({
			title : "编辑",
			modal : true
		});
		$('#dlg').window('open');
		$('#equipmentNo').textbox("setValue", row.equipmentNo);
		$('#id').val(id);
		/**
		 * 给easyui textbox赋值
		 */
		$("#welderInfo").textbox("setValue", row.welderInfo);
		$('#appointmentDatetime').datetimebox("setValue", row.appointmentDatetime);
		$('#giveBackDatetime').datetimebox("setValue", row.giveBackDatetime);
		$('#appointment_message').val(row.appointment_message);
		$('#remarks').val(row.remark);
		$("#check_status").combobox({
            valueField : 'id',
            textField : 'text',  
            editable : false,  
            required : true,
            mode : 'local',  
            data: data
        }); 
		$('#checkMessage').val(row.check_message);
		$('#fmAudit').form('load', row);
	}
}

function insframeworkTree(){
	$("#myTree").tree({  
		onClick : function(node){
			$("#equipmentAuditTable").datagrid('load',{
				"parent" : node.id
			})
		 }
	})
}

//监听窗口大小变化
window.onresize = function() {
	setTimeout(domresize, 500);
}

//改变表格高宽
function domresize() {
	$("#equipmentAuditTable").datagrid('resize', {
		height : $("#body").height(),
		width : $("#body").width()
	});
}

