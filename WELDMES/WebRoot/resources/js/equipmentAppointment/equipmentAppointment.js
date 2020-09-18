$(function() {
	initialize();
	insframeworkTree();
	equipmentAppointmentDatagrid();
	var vlogoflag = "";
});
function equipmentAppointmentDatagrid() {
	$("#equipmentAppointmentTable").datagrid({
		view : detailview, //detailview必须写
		height : $("#body").height(),
		width : $("#body").width(),
		idField : 'id',
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		url : "equipmentAppointment/getEquipmentAppointmentList",
		singleSelect : true,
		rownumbers : true,
		remoteSort : false,
		showPageList : false,
		columns : [ [ {
			field : 'fid',
			title : '序号',
			width : 50,
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'equipmentNo',
			title : '固定资产编号',
			width : 200,
			halign : "center",
			align : "center",
			sortable : true
		}, {
			field : 'typeName',
			title : '设备类型',
			width : 150,
			halign : "center",
			align : "center"
		}, {
			field : 'modelname',
			title : '设备型号',
			width : 200,
			halign : "center",
			align : "center"
		}, {
			field : 'insframeworkName',
			title : '所属项目',
			width : 200,
			halign : "center",
			align : "left"
		}, {
			field : 'gatherId',
			title : '采集序号',
			width : 200,
			halign : "center",
			align : "center"
		}, {
			field : 'position',
			title : '位置',
			width : 250,
			halign : "center",
			align : "center"
		}, {
			field : 'edit',
			title : '操作',
			width : 410,
			halign : "center",
			align : "left",
			formatter : function(value, row, index) {
				var str = "";
				str += '<a id="addAppointment" class="easyui-linkbutton" href="javascript:appointment(' + row.iId + ',' + row.fid + ')"/>';
				return str;
			}
		}
		] ],
		detailFormatter : function(index, row) { //注意2
			return '<div style="padding:2px"><table id="ddv-' + index + '"></table></div>';
		},
		onExpandRow : function(index, row) { //注意3
			$('#ddv-' + index).datagrid({
				url : 'equipmentAppointment/getEquipmentListForFmachineId',
				fitColumns : true,
				singleSelect : true,
				rownumbers : true,
				loadMsg : '拼命加载中，请稍后...',
				width : '100%',
				height : 'auto',
				queryParams : { //传参
					fmachineId : row.fid
				},
				columns : [ [ {
					field : 'welderInfo',
					title : '焊工',
					width : 40,
					halign : "center",
					align : "left",
					hidden : false
				}, {
					field : 'appointmentDatetime',
					title : '预约时间',
					width : 60,
					halign : "center",
					align : "left",
					sortable : true
				}, {
					field : 'giveBackDatetime',
					title : '归还时间',
					width : 60,
					halign : "center",
					align : "left"
				}, {
					field : 'fmachineStatus',
					title : '状态',
					width : 30,
					halign : "center",
					align : "left",
					formatter : function(value, row, index) {
						var str = "";
						if (value == 0 || value == null || value == '') {
							str = '<span style="color: green;">' + "预约中" + '</span>';
						} else if (value == 1) {
							str = '<span style="color: blue;">' + "使用中" + '</span>';
						} else if (value == 2) {
							str = '<span style="color: red;">' + "使用完成" + '</span>';
						}
						return str;
					}
				}, {
					field : 'appointmentMessage',
					title : '预约信息',
					width : 60,
					halign : "center",
					align : "left"
				}, {
					field : 'remark',
					title : '备注',
					width : 60,
					halign : "center",
					align : "left"
				}, {
					field : 'checkStatus',
					title : '审核状态',
					width : 40,
					halign : "center",
					align : "left",
					formatter : function(value, row, index) {
						var str = "";
						if (value == '' || value == "" || value == 0) {
							str = "";
						} else if (value == 1) {
							str = '<span">' + "待审核" + '</span>';
						} else if (value == 2) {
							str = '<span style="color: green;">' + "审核通过" + '</span>';
						} else if (value == 3) {
							str = '<span style="color: red;">' + "审核不通过" + '</span>';
						}
						return str;
					}
				}, {
					field : 'checkDatetime',
					title : '审核时间',
					width : 60,
					halign : "center",
					align : "left"
				}, {
					field : 'checkMessage',
					title : '审核信息',
					width : 60,
					halign : "center",
					align : "left"
				}, {
					field : 'userInfo',
					title : '审核人',
					width : 60,
					halign : "center",
					align : "left"
				}, {
					field : 'edit',
					title : '操作',
					width : 50,
					halign : "center",
					align : "left",
					formatter : function(value, row, indexs) {
						var str = "";
						if (row.fmachineStatus == 0) {	//预约中才可以取消
							if (row.checkStatus == 1 || row.checkStatus == 3) {		//待审核或审核不通过才可以编辑
								str += '<a id="edit" class="easyui-linkbutton" href="javascript:editAppointment(' + index + ',' + row.fmachineId + ',' + row.fmachineStatus + ')"/>';
							}
							str += '<a id="cancel" class="easyui-linkbutton" href="javascript:cancel(' + row.id + ',' + row.fmachineId + ',' + row.fmachineStatus + ')"/>';
						}
						return str;
					}
				}
				] ],
				onResize : function() {
					$('#equipmentAppointmentTable').datagrid('fixDetailRowHeight', index);
				},
				onLoadSuccess : function() {
					setTimeout(function() {
						$('#equipmentAppointmentTable').datagrid('fixDetailRowHeight', index);
					}, 0);
					$("a[id='edit']").linkbutton({
						text : '编辑',
						plain : true,
						iconCls : 'icon-update'
					});
					$("a[id='cancel']").linkbutton({
						text : '取消预约',
						plain : true,
						iconCls : 'icon-cancel'
					});
				}
			});
			$('#equipmentAppointmentTable').datagrid('fixDetailRowHeight', index);
		},
		pagination : true,
		//		fitColumns : true,
		rowStyler : function(index, row) {
			if ((index % 2) != 0) {
				//处理行代背景色后无法选中
				var color = new Object();
				return color;
			}
		},
		onLoadSuccess : function(data) {
			$("a[id='addAppointment']").linkbutton({
				text : '新增预约',
				plain : true,
				iconCls : 'icon-newadd'
			});
		}
	});
}

//预约
function appointment(id, fid) {
	$.ajax({
		type : "post",
		async : false,
		url : "insframework/getUserAuthority?id=" + id,
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (null == result.afreshLogin || result.afreshLogin == '') {
				if (result.flag) { //判断用户操作权限
					//判断设备是否可预约
					equipmentAppointment(fid);
				} else {
					alert("对不起，您不能对你的上级或同级部门的数据进行编辑");
				}
			} else {
				$.messager.confirm("提示", result.afreshLogin, function(data) {
					if (data) {
						var url = "login.jsp";
						var img = new Image();
						img.src = url; // 设置相对路径给Image, 此时会发送出请求
						url = img.src; // 此时相对路径已经变成绝对路径
						img.src = null; // 取消请求
						top.location.href = url;
					}
				});
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
}
//时间格式化
var formatDate = function(date) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	var h = date.getHours();
	var minute = date.getMinutes();
	minute = minute < 10 ? ('0' + minute) : minute;
	var second = date.getSeconds();
	second = minute < 10 ? ('0' + second) : second;
	return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};
//弹出设备预约页面
function equipmentAppointment(fid) {
	vlogoflag = "add";
	selectCheckUser(); //审核人列表
	$('#fm').form('clear');
	var row = $('#equipmentAppointmentTable').datagrid('getSelected');
	if (row) {
		$('#dlg').window({
			title : "焊机设备预约",
			modal : true
		});
		$('#dlg').window('open');
		$("#icon-ok").hide();
		$("#icon-cancel").hide();
		$('#fid').val(fid);
		$('#appointmentDatetime').datetimebox("setValue", "");
		$('#giveBackDatetime').datetimebox("setValue", "");
		$("#appointmentDatetime").datetimebox('calendar').calendar({
			validator : function(date) {
				var nowdate = new Date();
				var d1 = new Date(nowdate.getFullYear(), nowdate.getMonth(), nowdate.getDate());
				return d1 <= date;
			},
			onSelect : function(beginDate) { //设置开时间选中事件
				$('#giveBackDatetime').datetimebox().datetimebox('calendar').calendar({ //选中后得到结束时间对象 并会清空结束时间对象的值
					validator : function(endDate) {
						return beginDate <= endDate; //设置选择范围大于开始时间
					}
				});
			}
		});
		$('#fm').form('load', row);
	}
}

//异步加载焊机的预约列表
function uploadEquipmentForFid(fid,appointmentDatetime,giveBackDatetime){
	var flag = true;
	$.ajax({
		url: 'equipmentAppointment/getEquipmentListForFmachineId',
		type: 'GET',
		async: false,
		dataType: 'json',
		data: {
			fmachineId: fid
		},
		success: function(result){
			for (let val in result.rows){
				var starttime = result.rows[val].appointmentDatetime;
				starttime = formatDate(new Date(starttime));
				var endtime = result.rows[val].giveBackDatetime;
				endtime = formatDate(new Date(endtime));
				//appointmentDatetime = formatDate(new Date(appointmentDatetime));
				//giveBackDatetime = formatDate(new Date(giveBackDatetime));
				//判断时间交叉问题，如果时间有交叉，禁止提交[状态必须为：已取消]
				//修改
				if (vlogoflag == "edit"){
					if (appointmentDatetime == starttime && giveBackDatetime == endtime){	//不会判断自己
					}else{
						//预约时间大于开始时间，并且小于结束时间（预约时间在时间段内）
						if (appointmentDatetime >= starttime && appointmentDatetime <= endtime){
							flag = false;
							break;
						}
						//完成时间大于开始时间，并且小于结束时间（完成时间在时间段内）
						if (giveBackDatetime >= starttime && giveBackDatetime <= endtime){
							flag = false;
							break;
						}
						//完成时间小于开始时间，并且大于结束时间（预约时间段包含了已经预约的时间段）
						if (appointmentDatetime <= starttime && giveBackDatetime >= endtime){
							flag = false;
							break;
						}
					}
				//新增
				}else if(vlogoflag == "add"){
					//预约时间大于开始时间，并且小于结束时间（预约时间在时间段内）
					if (appointmentDatetime >= starttime && appointmentDatetime <= endtime){
						flag = false;
						break;
					}
					//完成时间大于开始时间，并且小于结束时间（完成时间在时间段内）
					if (giveBackDatetime >= starttime && giveBackDatetime <= endtime){
						flag = false;
						break;
					}
					//完成时间小于开始时间，并且大于结束时间（预约时间段包含了已经预约的时间段）
					if (appointmentDatetime <= starttime && giveBackDatetime >= endtime){
						flag = false;
						break;
					}
				}
			}
		},
		error: function(){
			alert("焊机预约列表加载异常");
			flag = false;
		}
	});
	return flag;
}

//设备预约提交
function saveEquipmentAppointment() {
	var fid = $("#fid").val();
	var urls = "";
	var message = "";
	if (vlogoflag == "add") {
		message = "预约成功！";
		urls = "equipmentAppointment/addEquipmentAppointment";
	} else if (vlogoflag == "edit") {
		message = "修改成功！";
		urls = "equipmentAppointment/editEquipmentAppointment";
	}
	var appointmentDatetime = $('#appointmentDatetime').datetimebox("getValue");
	var giveBackDatetime = $('#giveBackDatetime').datetimebox("getValue");
	if (appointmentDatetime >= giveBackDatetime) {
		//预约时间大于归还时间，不能提交
		return false;
	} else {
		if (uploadEquipmentForFid(fid,appointmentDatetime,giveBackDatetime)){
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
						}
					}
				},
				error : function(errorMsg) {
					alert("数据请求失败，请联系系统管理员!");
				}
			});
			vlogoflag = "";
		}else{
			alert("该时间段已被预约，请重新选择预约时间和完成时间");
		}
	}
}

//审核人列表
function selectCheckUser() {
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
				data : result.ary
			}).combobox('clear');
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
}

//编辑
function editAppointment(index,fid,fmachineStatus) {
	vlogoflag = "edit";
	$('#fm').form('clear');
	var row = $('#ddv-'+index).datagrid('getSelected');
	var rows = $('#equipmentAppointmentTable').datagrid('getSelected');
	if (row) {
		$('#dlg').window({
			title : "编辑",
			modal : true
		});
		checkUserList(row.userId); //审核人列表
		$('#dlg').window('open');
		$("#icon-ok").hide();
		$("#icon-cancel").hide();
		$('#equipmentNo').textbox("setValue", rows.equipmentNo);
		$('#fid').val(fid);
		/**
		 * 给easyui textbox赋值
		 */
		$("#fwelderno").textbox("setValue", row.welderno);
		$("#fwelderId").val(row.fwelderId);
		$('#appointment_message').val(row.appointmentMessage);
		$('#remarks').val(row.remark);
		$('#id').val(row.id);
		$('#checkStatus').val(row.checkStatus);
		$('#checkMessage').val(row.checkMessage);
		$('#appointmentDatetime').datetimebox("setValue", row.appointmentDatetime);
		$('#giveBackDatetime').datetimebox("setValue", row.giveBackDatetime);
		$('#fm').form('load', row);
	}
}

function checkUserList(userId) {
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
				data : result.ary,
				onLoadSuccess : function() {
					var val = result.ary;
					for (var item in val) {
						if ((val[item].id) == userId) {
							$("#userId").combobox("select", val[item].id);
						}
					}
				}
			});

		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
}

//初始化
function initialize() {
	$("#welderText").text("");
	$("#welderText").css("color", "");
	$("#icon-ok").hide();
	$("#icon-cancel").hide();
	$("input", $("#fwelderno").next("span")).blur(function() {
		var fwelderno = $("#fwelderno").textbox('getValue')
		if (fwelderno != '') {
			$.ajax({
				type : "post",
				async : true,
				url : "equipmentAppointment/findWelderByWelderNo",
				data : {
					"fwelderno" : fwelderno
				},
				dataType : "json", //返回数据形式为json  
				success : function(result) {
					if (result.success) {
						$("#welderText").text("焊工编号可用");
						$("#welderText").css("color", "green");
						$("#icon-ok").show();
						$("#icon-cancel").hide();
					} else {
						$("#welderText").text("焊工编号不可用");
						$("#welderText").css("color", "red");
						$("#icon-cancel").show();
						$("#icon-ok").hide();
					}
				},
				error : function(errorMsg) {
					alert("数据请求失败，请联系系统管理员!");
				}
			});
		} else {
			$("#welderText").text("");
			$("#welderText").css("color", "");
			$("#icon-ok").hide();
			$("#icon-cancel").hide();
		}
	});
	$("#appointmentDatetime").datetimebox('calendar').calendar({
		validator : function(date) {
			var nowdate = new Date();
			var d1 = new Date(nowdate.getFullYear(), nowdate.getMonth(), nowdate.getDate());
			return d1 <= date;
		},
		onSelect : function(beginDate) { //设置开时间选中事件
			$('#giveBackDatetime').datetimebox().datetimebox('calendar').calendar({ //选中后得到结束时间对象 并会清空结束时间对象的值
				validator : function(endDate) {
					return beginDate <= endDate; //设置选择范围大于开始时间
				}
			});
		}
	});
}


//取消预约
function cancel(id, fmachineId, fmachineStatus) {
	var row = $('#equipmentAppointmentTable').datagrid('getSelected');
	if (confirm("确定取消预约吗？")) {
		$.ajax({
			url : "equipmentAppointment/cancelAppointment",
			type : "post",
			async : false,
			data : {
				"id" : id
			},
			dataType : "json",
			success : function(result) {
				if (result.success) {
					alert("取消成功");
				} else {
					alert("取消失败，请稍后再试");
				}
			},
			error : function(e) {
				alert("数据请求失败，请联系系统管理员!");
			}
		});
		$('#equipmentAppointmentTable').datagrid('reload');
	}
}

function insframeworkTree() {
	$("#myTree").tree({
		onClick : function(node) {
			$("#equipmentAppointmentTable").datagrid('load', {
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