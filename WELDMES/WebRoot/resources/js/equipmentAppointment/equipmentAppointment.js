$(function(){
	initialize();
	insframeworkTree();
	equipmentAppointmentDatagrid();
	var vlogoflag = "";
});

function equipmentAppointmentDatagrid(){
	$("#equipmentAppointmentTable").datagrid( {
		height : $("#body").height(),
		width : $("#body").width(),
		idField : 'id',
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		url : "equipmentAppointment/getEquipmentAppointmentList",
		singleSelect : true,
		rownumbers : true,
		remoteSort:false,
		showPageList : false, 
		columns : [ [ {
			field : 'fid',
			title : '序号',
			width : 50,
			halign : "center",
			align : "left",
			hidden:true
		}, {
			field : 'equipmentNo',
			title : '固定资产编号',
//			width : 80,
			halign : "center",
			align : "left",
			sortable: true
		}, {
			field : 'typeName',
			title : '设备类型',
//			width : 80,
			halign : "center",
			align : "left"
		}, {
			field : 'modelname',
			title : '设备型号',
//			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'fmachine_status',
			title : '焊机状态',
			width : 60,
			halign : "center",
			align : "left",
			formatter:function(value,row,index){
				var str = "";
				if(value == 0 || value == null || value == ''){
					str = "未使用";
				}else if(value == 1){
					str = "预约中";
				}else if(value == 2){
					str = "使用中";
				}
				return str;
			}
		}, {
			field : 'appointmentDatetime',
			title : '预约时间',
//			width : 80,
			halign : "center",
			align : "left"
		}, {
			field : 'giveBackDatetime',
			title : '归还时间',
//			width : 80,
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
				if(value == '' || value == ""){
					str = "";
				}else if(value == 1){
					str = "待审核";
				}else if(value == 2){
					str = "审核通过";
				}else if(value == 3){
					str = "审核不通过";
				}
				return str;
			}
		}, {
			field : 'checkDatetime',
			title : '审核时间',
//			width : 80,
			halign : "center",
			align : "left"
		}, {
			field : 'check_message',
			title : '审核信息',
			width : 100,
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
			field : 'model',
			title : '设备型号id',
			//width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'userId',
			title : '审核人id',
			//width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'welderId',
			title : '焊工id',
			//width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'welderno',
			title : '焊工编号',
			//width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'manuno',
			title : '厂商id',
			//width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'typeId',
			title : '类型id',
			//width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'iId',
			title : '项目id',
			//width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'gid',
			title : '采集id',
			//width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'id',
			title : 'id',
			//width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'edit',
			title : '操作',
			width : 300,
			halign : "center",
			align : "left",
			formatter:function(value,row,index){
				var str = "";
				if (row.fmachine_status == 0 || row.fmachine_status == null || row.fmachine_status == '') {
					str += '<a id="addAppointment" class="easyui-linkbutton" href="javascript:appointment('+row.iId+','+row.fid+','+row.fmachine_status+')"/>';
				}
				if (row.fmachine_status == 2){
					str += '<a id="give_back" class="easyui-linkbutton" href="javascript:give_back('+row.iId+','+row.fid+','+row.fmachine_status+')"/>';
				}
				if (row.fmachine_status == 1){
					str += '<a id="edit" class="easyui-linkbutton" href="javascript:editAppointment('+row.iId+','+row.fid+','+row.fmachine_status+')"/>';
					str += '<a id="cancel" class="easyui-linkbutton" href="javascript:cancel('+row.iId+','+row.fid+','+row.fmachine_status+')"/>';
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
	        $("a[id='addAppointment']").linkbutton({text:'新增预约',plain:true,iconCls:'icon-select'});		
	        $("a[id='give_back']").linkbutton({text:'归还',plain:true,iconCls:'icon-export'});		
	        $("a[id='edit']").linkbutton({text:'编辑',plain:true,iconCls:'icon-update'});		
	        $("a[id='cancel']").linkbutton({text:'取消预约',plain:true,iconCls:'icon-cancel'});	
		}
	});
}

//预约
function appointment(id,fid,fmachine_status){
	$.ajax({  
        type : "post",  
        async : false,
        url : "insframework/getUserAuthority?id="+id,  
        data : {},  
        dataType : "json", //返回数据形式为json  
        success: function(result) {
    		if(null == result.afreshLogin || result.afreshLogin==''){
        		if(result.flag){	//判断用户操作权限
    				//判断设备是否可预约
        			if (fmachine_status == 0 || fmachine_status == null || fmachine_status == '') {
        				equipmentAppointment(fid);
					}else if(fmachine_status == 1){
						alert("设备正在预约中");
					}else{
						alert("设备正在使用中");
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

//弹出设备预约页面
function equipmentAppointment(fid){
	vlogoflag = "add";
	selectCheckUser();	//审核人列表
	$('#fm').form('clear');
	var row = $('#equipmentAppointmentTable').datagrid('getSelected');
	if (row) {
		$('#dlg').window({
			title : "新增焊机设备预约",
			modal : true
		});
		$('#dlg').window('open');
		$('#valideno').val(row.equipmentNo);
		$('#validgid').val(row.gatherId);
		$('#validinsf').val(row.iId);
		$('#fid').val(fid);
		$('#fm').form('load', row);
		//$('#model').combobox("setValue",row.model);
		oldnextTime = $("#nextTime").textbox('getValue');
		if (row.gid) {
			var str = $("#gid").html();
			str += "<option value=\"" + row.gid + "\" >"
				+ row.gatherId + "</option>";
			$("#gid").html(str);
			$("#gid").combobox();
			$("#gid").combobox("select", row.gid);
		}
	}
}


//设备预约提交
function saveEquipmentAppointment(){
	var urls = "";
	var message = "";
	if (vlogoflag = "add"){
		message = "预约成功！";
		urls = "equipmentAppointment/addEquipmentAppointment";
	}else if(vlogoflag = "edit"){
		message = "修改成功！";
		urls = "equipmentAppointment/editEquipmentAppointment";
	}
	$('#fm').form('submit', {
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
					$('#equipmentAppointmentTable').datagrid('reload');
					$("#valideno").val("");
				}
			}

		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	vlogoflag = "";
}

//设备归还
function give_back(id,fid,fmachine_status){
	$.ajax({  
        type : "post",  
        async : false,
        url : "insframework/getUserAuthority?id="+id,  
        data : {},  
        dataType : "json", //返回数据形式为json  
        success : function(result) {
            if (result) {
        		if(result.afreshLogin==null || result.afreshLogin==""){
            		if(result.flag){	//判断用户操作权限
            			if(fmachine_status == 0 || fmachine_status == null || fmachine_status == ''){
            				alert("设备未使用，不能归还！");
            			}else if(fmachine_status == 1){
            				alert("设备预约中，不能归还！");
            			}else{
            				equipmentGiveBack(fid);
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
           }
        },  
        error : function(errorMsg) {  
            alert("数据请求失败，请联系系统管理员!");  
        }  
   });
}

//设备归还
function equipmentGiveBack(){
	if(confirm('确定要归还吗？')){
		var row = $('#equipmentAppointmentTable').datagrid('getSelected');
		$.ajax({
			type : "post",
			async : true,
			url : "equipmentAppointment/equipmentGiveBack",
			data : {
				"fid": row.fid,
				"fmachine_status": 0,
				"fwelderId": row.welderId,
				"appointmentMessage": '设备归还',
				"userId": row.userId,
				"giveBackDatetime": row.giveBackDatetime,
				"appointmentDatetime": row.appointmentDatetime,
				"checkStatus": row.check_status
			},
			dataType : "json", //返回数据形式为json  
			success : function(result) {
				if (result.flag){
					alert("归还成功！");
				}else{
					alert("归还失败，请稍后再试！");
				}
			},
			error : function(errorMsg) {
				alert("数据请求失败，请联系系统管理员!");
			}
		});
    }
}

//审核人列表
function selectCheckUser(){
	$.ajax({
		type : "post",
		async : true,
		url : "user/getUserListAll",
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			$("#userId").combobox({
	            valueField : 'id',  
	            textField : 'userName',  
	            editable : false,  
	            required : false,  
	            mode : 'local',  
	            data: result.ary
	        });  
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
}

//编辑
function editAppointment(id,fid,fmachine_status){
	if(fmachine_status == 1){
		vlogoflag = "edit";
		selectCheckUser();		//审核人列表
		$('#fm').form('clear');
		var row = $('#equipmentAppointmentTable').datagrid('getSelected');
		if (row) {
			$('#dlg').window({
				title : "编辑",
				modal : true
			});
			$('#dlg').window('open');
			$('#equipmentNo').textbox("setValue", row.equipmentNo);
			$('#fid').val(fid);
			/**
			 * 给easyui textbox赋值
			 */
			$("#fwelderno").textbox("setValue", row.welderno);
			$("#fwelderId").val(row.welderId);
			
			//var data = $('#userId').combobox('getData');
			//alert(data[0].value);
			
			//$('#userId').combobox('selectIndex', 1);
			//$("#userId").combobox('select', row.userId);
			
			$('#appointment_message').val(row.appointment_message);
			$('#remarks').val(row.remark);
			$('#id').val(row.id);
			$('#checkStatus').val(row.check_status);
			$('#checkMessage').val(row.check_message);
			
			$('#appointmentDatetime').datetimebox("setValue", row.appointmentDatetime);
			$('#giveBackDatetime').datetimebox("setValue", row.giveBackDatetime);
			$('#fm').form('load', row);
		}
	}else{
		alert("当前设备不可编辑");
	}
}

//初始化
function initialize() {
	$("#welderText").text("");
	$("#welderText").css("color","");
	$("#icon-ok").hide();
	$("#icon-cancel").hide();
	$("input",$("#fwelderno").next("span")).blur(function(){
		var fwelderno = $("#fwelderno").textbox('getValue')
		if (fwelderno != ''){
			$.ajax({
				type : "post",
				async : true,
				url : "equipmentAppointment/findWelderByWelderNo",
				data : {
					"fwelderno":fwelderno
				},
				dataType : "json", //返回数据形式为json  
				success : function(result) {
					if (result.success){
						$("#welderText").text("焊工编号可用");
						$("#welderText").css("color","green");
						$("#icon-ok").show();
						$("#icon-cancel").hide();
					}else{
						$("#welderText").text("焊工编号不可用");
						$("#welderText").css("color","red");
						$("#icon-cancel").show();
						$("#icon-ok").hide();
					}
				},
				error : function(errorMsg) {
					alert("数据请求失败，请联系系统管理员!");
				}
			});
		}else{
			$("#welderText").text("");
			$("#welderText").css("color","");
			$("#icon-ok").hide();
			$("#icon-cancel").hide();
		}
	 });
};

//取消预约
function cancel(iId,fid,fmachine_status){
	if (fmachine_status == 1){
		var row = $('#equipmentAppointmentTable').datagrid('getSelected');
		if (confirm("确定取消预约吗？")){
			$.ajax({
				url: "equipmentAppointment/cancelAppointment",
				type: "post",
				async: false,
				data: {
					"fid": fid,
					"fmachine_status": 0,
					"fwelderId": row.welderId,
					"appointmentMessage": '设备预约取消',
					"userId": row.userId,
					"giveBackDatetime": row.giveBackDatetime,
					"appointmentDatetime": row.appointmentDatetime,
					"checkStatus": row.check_status
				},
				dataType: "json",
				success: function(result){
					alert("成功");
				},
				error: function(e){
					alert("数据请求失败，请联系系统管理员!");
				}
			});
		}
	}else{
		alert("请选择已预约的设备取消！");
	}
}

function insframeworkTree(){
	$("#myTree").tree({  
		onClick : function(node){
			$("#equipmentAppointmentTable").datagrid('load',{
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
	$("#equipmentAppointmentTable").datagrid('resize', {
		height : $("#body").height(),
		width : $("#body").width()
	});
}

