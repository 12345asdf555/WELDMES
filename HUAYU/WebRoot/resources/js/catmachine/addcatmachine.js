$(function() {
	typeCombobox();
	InsframeworkCombobox();
	manuCombobox();
	statusRadio();
	gatherCombobox();
	modelCombobox(0);
	$("#iId").combobox({
		onChange : function() {
			itemid = $("#iId").combobox("getValue");
			gatherCombobox();
		}
	});
	$('#dlg').dialog({
		onClose : function() {
			$('#iId').combobox('clear');
			$('#manuno').combobox('clear');
			$('#tId').combobox('clear');
			$('#gid').combobox('clear');
			$('#model').combobox('clear');
			$("#fm").form("disableValidation");
		}
	})
	$("#manuno").combobox({
		onChange :function(newValue,oldValue){
			modelCombobox(newValue);
			$("#fm").form("disableValidation");
		}
	})
	$("#fm").form("disableValidation");
	
})


var url = "";
var flag = 1;
function addWeldingMachine() {
	flag = 1;
	$('#fm').form('clear');
	$('#dlg').window({
		title : "新增焊机设备",
		modal : true
	});
	$('#dlg').window('open');
	var isnetworkingId = document.getElementsByName("isnetworkingId");
	var statusId = document.getElementsByName("statusId");
	isnetworkingId[0].checked = 'checked';
	statusId[0].checked = 'checked';
	url = "weldingMachine/addcatmachine";
}
var oldnextTime;
function editWeldingMachine() {
	flag = 2;
	$('#fm').form('clear');
	var row = $('#weldingmachineTable').datagrid('getSelected');
	if (row) {
		$('#dlg').window({
			title : "修改焊机设备",
			modal : true
		});
		$('#dlg').window('open');
		$('#valideno').val(row.equipmentNo);
		$('#validgid').val(row.gatherId);
		$('#validinsf').val(row.iId);
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
		url = "weldingMachine/editcatmachine?wid=" + row.id;
	}
}

//提交
function saveWeldingMachine() {
	var symbol = 0;
	var newnextTime = $("#nextTime").textbox('getValue');
	if (oldnextTime != newnextTime) {
		symbol = 1;
	} else {
		symbol = 2;
	}
	var tid = $('#tId').combobox('getValue');
	var iid = $('#iId').combobox('getValue');
	var gatherId = $('#gid').combobox('getValue');
	var manuno = $('#manuno').combobox('getValue');
	var sid = $("input[name='statusId']:checked").val();
	var isnetworking = $("input[name='isnetworking']:checked").val();
	var messager = "";
	var url2 = "";
	if (flag == 1) {
		messager = "新增成功！";
		url2 = url + "?tId=" + tid + "&iId=" + iid + "&sId=" + sid + "&isnetworking=" + isnetworking + "&manuno=" + manuno + "&gatherId=" + gatherId;
	} else {
		messager = "修改成功！";
		url2 = url + "&symbol=" + symbol + "&tId=" + tid + "&iId=" + iid + "&sId=" + sid + "&isnetworking=" + isnetworking + "&manuno=" + manuno + "&gatherId=" + gatherId;
	}
	$('#fm').form('submit', {
		url : url2,
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
					$.messager.alert("提示", messager);
					$('#dlg').dialog('close');
					$('#weldingmachineTable').datagrid('reload');
					$("#valideno").val("");
					$("#validgid").val("");
					$("#valideid").val("");
				}
			}

		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
}

var itemid = "";
//采集序号
function gatherCombobox() {
	$.ajax({
		type : "post",
		async : false,
		url : "weldingMachine/getGatherAll?itemid=" + itemid,
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			var optionStr = "";
			if (result) {
				if (result.ary.length <= 0) {
					optionStr += "<option></option>";
				} else {
					for (var i = 0; i < result.ary.length; i++) {
						optionStr += "<option value=\"" + result.ary[i].id + "\" >"
							+ result.ary[i].name + "</option>";
					}
				}
				$("#gid").html(optionStr);
			}
		}
	});
	$("#gid").combobox();
}

//设备类型
function typeCombobox() {
	$.ajax({
		type : "post",
		async : false,
		url : "weldingMachine/getTypeAll",
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				var optionStr = '';
				for (var i = 0; i < result.ary.length; i++) {
					optionStr += "<option value=\"" + result.ary[i].id + "\" >"
						+ result.ary[i].name + "</option>";
				}
				$("#tId").append(optionStr);
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	$("#tId").combobox();
}


//设备型号
function modelCombobox(type) {
	$.ajax({
		type : "post",
		async : false,
		url : "weldingMachine/getcatModelAll?type=" + type,
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			var optionStr = "";
			if (result) {
				if (result.ary.length <= 0) {
					optionStr += "<option></option>";
				} else {
					for (var i = 0; i < result.ary.length; i++) {
						optionStr += "<option value=\"" + result.ary[i].id + "\" >"
							+ result.ary[i].name + "</option>";
					}
				}
				$("#model").html(optionStr);
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	$("#model").combobox();
}


//所属项目
function InsframeworkCombobox() {
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
				$("#iId").html(optionStr);
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	$("#iId").combobox();
}

//厂商
function manuCombobox() {
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
				$("#manuno").html(optionStr);
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	$("#manuno").combobox();
}

//焊机状态
function statusRadio() {
	$.ajax({
		type : "post",
		async : false,
		url : "weldingMachine/getStatusAll",
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				var str = "";
				for (var i = 0; i < result.ary.length; i++) {
					str += "<input type='radio' class='radioStyle' name='statusId' id='sId' value=\"" + result.ary[i].id + "\" />"
					+ result.ary[i].name;
				}
				$("#radios").html(str);
				$("input[name='statusId']").eq(0).attr("checked", true);
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
}