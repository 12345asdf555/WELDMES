/**
 * 
 */
var oldchanel = 0;
var machineModel;
$(function() {
	//	rule();
	InsframeworkCombobox();
	statusRadio();
	addWpslib();
	machineModel();
	QinTronMaterial();
	QinTronDiameter();
	QinTronGas();
	QinTronSelect();
	QinTronStep();
/*	getDictionary(10,"sxfselect");
	getDictionary(24,"sxfgas");
	getDictionary(23,"sxfdiameter");
	getDictionary(18,"sxfmaterial");
	getDictionary(19,"sxfcontroller");
	getDictionary(20,"sxfinitial");
	getDictionary(21,"sxfarc");*/
	
	$("#iId").combobox({
		onChange : function(record) {
			if(record==-1){
				var wpslibrow = $('#wpslibTable').datagrid('getSelected');
				var url = "weldingMachine/getWedlingMachineList?searchStr="+"w.fmodel="+wpslibrow.model;
				machineList(url);
			}else{
				var wpslibrow = $('#wpslibTable').datagrid('getSelected');
				var url = "weldingMachine/getWedlingMachineList?searchStr="+"w.fmodel="+wpslibrow.model+" and i.fid="+record;
				machineList(url);
			}
		}
	})
	
	$('#editSxDlg').dialog( {
		onClose : function() {
			$('#sxfwpsnum').combobox('clear');
			$('#sxfselect').combobox('clear');
			$('#sxfgas').combobox('clear');
			$('#sxfdiameter').combobox('clear');
			$('#sxfmaterial').combobox('clear');
			$('#sxfinitial').combobox('clear');
			$('#sxfcontroller').combobox('clear');
			$("#sxfm").form("disableValidation");
		}
	})
	$('#smwdlg').dialog({
		onClose : function() {
			$('#mainWpsTable').datagrid('clearSelections');
		}
	})
	$('#smdlg').dialog({
		onClose : function() {
			$('#weldingmachineTable').datagrid('clearSelections');
		}
	})
	$('#sxSelectdlg').dialog( {
		onClose : function() {
			$('#sxSelectWpsTab').datagrid('clearSelections');
		}
	})
	$('#sxMachinedlg').dialog( {
		onClose : function() {
			$('#sxMachineTable').datagrid('clearSelections');
		}
	})
	$('#wltdlg').dialog({
		onClose : function() {
			$("#wltfm").form("disableValidation");
		}
	})
	$("#wltfm").form("disableValidation");
	$("#sxfm").form("disableValidation");
})

var url = "";
var flag = 1;
function addWpslib() {
	flag = 1;
	$('#wltfm').form('clear');
	$('#wltdlg').window({
		title : "新增工艺库",
		modal : true
	});
	$('#wltdlg').window('open');
	var statusId = document.getElementsByName("statusId");
	statusId[0].checked = 'checked';
	$('#model').combobox('enable');
	url = "wps/addWpslib";
}

function editWpslib() {
	flag = 2;
	$('#wltfm').form('clear');
	var row = $('#wpslibTable').datagrid('getSelected');
	if (row) {
		$('#wltdlg').window({
			title : "修改工艺库",
			modal : true
		});
		$('#wltdlg').window('open');
		$('#wltfm').form('load', row);
		$('#validwl').val(row.wpslibName);
		$('#model').combobox('disable', true);
		url = "wps/updateWpslib?fid=" + row.fid;
	}
}

function saveWpslib() {
	var wpslibName = $('#wpslibName').val();
	var fstatus = $("input[name='statusId']:checked").val();
	var messager = "";
	var url2 = "";
	if (flag == 1) {
		var machineModel = $('#model').combobox('getValue');
		messager = "新增成功！";
		url2 = url + "?fstatus=" + fstatus + "&wpslibName=" + encodeURI(wpslibName) + "&machineModel=" + encodeURI(machineModel);
	} else {
		messager = "修改成功！";
		url2 = url + "&fstatus=" + fstatus + "&wpslibName=" + encodeURI(wpslibName);
	}
	$('#wltfm').form('submit', {
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
					$('#wltdlg').dialog('close');
					$('#wpslibTable').datagrid('reload');
					$("#validwl").val("");
				}
			}

		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
}

//工艺库状态
function statusRadio() {
	$.ajax({
		type : "post",
		async : false,
		url : "wps/getStatusAll",
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

var mflag = 1;
function addMainWps() {
	mflag = 1;
	$('#mwfm').form('clear');
	$('#mwdlg').window({
		title : "新增工艺",
		modal : true
	});
	var wlrow = $('#wpslibTable').datagrid('getSelected');
	machineModel = wlrow.model;
	url = "wps/apSperlmw?fid=" + wlrow.fid+"&id="+"";
	QinTronINIT(0);
	$('#mwdlg').window('open');
	return;
	if (wlrow.model == 174) {
		EPWINIT();
		$('#mwdlg').window('open');
		return;
	} else if (wlrow.model == 175) {
		EPSINIT();
		$('#mwdlg').window('open');
		return;
	} else if (wlrow.model == 176) {
		WBMLINIT();
		$('#mwdlg').window('open');
		return;
	} else if (wlrow.model == 177) {
		WBPINIT();
		$('#mwdlg').window('open');
		return;
	} else if (wlrow.model == 178) {
		WBLINIT();
		$('#mwdlg').window('open');
		return;
	} else if (wlrow.model == 171) {
		CPVEWINIT();
		comboboxCheck(wlrow.model);
		$('#mwdlg').window('open');
		return;
	} else if (wlrow.model == 172) {
		CPVESINIT();
		$('#mwdlg').window('open');
		return;
	} else if (wlrow.model == 173) {
		CPVETINIT();
		$('#mwdlg').window('open');
		return;
	} else if (wlrow.manu == 149) {
		$('#editSxDlg').window({
			title : "新增工艺",
			modal : true
		});
		$("#sxRemoveWpsBut").hide();
		$("#sxgetWpsBut").show();
		$("#sxSaveWpsBut").show();
		$('#sxfm').form('clear');
		sxDefault();
		$('#editSxDlg').window('open');
		$("input[name='sxfcharacter']").eq(0).prop("checked", true);
		url = "wps/addSxWps?fwpslib_id=" + wlrow.fid+"&fcharacter="+$('input[name="sxfcharacter"]:checked').val();
		return;
	}
	
}

function editMainWps(indexrow,row) {
	$('#fselectstep').combobox('clear');
	$('#fselect').combobox('clear');
	$('#fgas').combobox('clear');
	$('#fdiameter').combobox('clear');
	$('#fmaterial').combobox('clear');
	mflag = 2;
	$('#mwfm').form('clear');
	machineModel = indexrow.fmodel;
	if (row) {
		if (row.model == 174) {
			EPWINIT();
		} else if (row.model == 175) {
			EPSINIT();
		} else if (row.model == 176) {
			WBMLINIT();
		} else if (row.model == 177) {
			WBPINIT();
		} else if (row.model == 178) {
			WBLINIT();
		} else if (row.model == 172) {
			CPVESINIT();
		} else if (row.model == 173) {
			CPVETINIT();
		} else if (row.model == 171) {
			CPVEWINIT();
			comboboxCheck(row.model);
		} else if (row.manu == 149){
			mflag = 2;
			$('#sxfm').form('clear');
			if (row) {
				$('#editSxDlg').window( {
					title : "修改工艺",
					modal : true
				});
				$("#sxRemoveWpsBut").hide();
				$("#sxgetWpsBut").show();
				$("#sxSaveWpsBut").show();
				$('#editSxDlg').window('open');
				$('#sxfm').form('load', indexrow);
				$('#sxchanel').val(indexrow.fwpsnum);
				$("input[name='sxfcharacter']").eq(indexrow.sxfcharacter).prop("checked", true);
				url = "wps/editSxWps?fid="+indexrow.fid+"&fcharacter="+$('input[name="sxfcharacter"]:checked').val();
			}
			return;
		}
		QinTronINIT(0);
		$('#mwdlg').window({
			title : "修改工艺",
			modal : true
		});
		$('#mwdlg').window('open');
		$('#mwfm').form('load', indexrow);
		$('#fselect').combobox('unselect', $('#fselect').combobox('getValue'));
		$('#fselect').combobox('select', indexrow.fselect);
		$('#fselectstep').combobox('unselect', $('#fselectstep').combobox('getValue'));
	    $('#fselectstep').combobox('select', indexrow.fselectstep);
/*		if (encodeURI(indexrow.initial) == "1") {
			$("#finitial").prop("checked", true);
		}
		if (encodeURI(indexrow.mode) == "1") {
			$("#fmode").prop("checked", true);
		}
		if (encodeURI(indexrow.controller) == "1") {
			$("#fcontroller").prop("checked", true);
		}
		if (encodeURI(indexrow.torch) == "1") {
			$("#ftorch").prop("checked", true);
		}*/
		url = "wps/apSperlmw?fid=" + row.fid+"&id="+indexrow.fid;
		oldchanel = indexrow.fchanel;
	}
}

function saveMainWps() { 
	if (QinTronCHECK(machineModel) == false) {
		return;
	}
	var url2 = "";
	var fselect = $('#fselect').combobox('getValue');//一元个别
	  var fcharacter = $('#fcharacter').numberbox('getValue');//电感
	  var fmaterial = $('#fmaterial').combobox('getValue');//材料
	  var fgas = $('#fgas').combobox('getValue');//气体
	  var fdiameter = $('#fdiameter').combobox('getValue');//焊丝直径
	  var chanel = $('#fchanel').combobox('getValue');//通道号
	  
	  if(!$("#rfweld_ele").is(":hidden")){
	    var fweld_ele = $('#fweld_ele').numberbox('getValue');//焊接电流
	  }else{
	    var fweld_ele = 0;
	  }

	  if(!$("#rfweld_vol").is(":hidden")){
	    var fweld_vol = $('#fweld_vol').numberbox('getValue');//焊接电压
	  }else{
	    var fweld_vol = 0;
	  }
	  
	  if(!$("#rfspeed").is(":hidden")){
	    var fspeed = $('#fspeed').numberbox('getValue');//给定速度
	  }else{
	    var fspeed = 0;
	  }
	  
	  if(!$("#rfarc_speed").is(":hidden")){
	    var farc_speed = $('#farc_speed').numberbox('getValue');//初期速度
	  }else{
	    var farc_speed = 0;
	  }
	  
	  if(!$("#rfarc_tuny_speed").is(":hidden")){
	    var farc_tuny_speed = $('#farc_tuny_speed').numberbox('getValue');//收弧速度
	  }else{
	    var farc_tuny_speed = 0;
	  }
	  
	  
	  if(!$("#rfini_vol").is(":hidden")){
	    var fini_vol = $('#fini_vol').numberbox('getValue');//初期电压
	  }else{
	    var fini_vol = 0;
	  }
	  
	  if(!$("#rfini_ele").is(":hidden")){
	    var fini_ele = $('#fini_ele').numberbox('getValue');//初期电流
	  }else{
	    var fini_ele = 0;
	  }
	  
	  if(!$("#rfarc_vol").is(":hidden")){
	    var farc_vol = $('#farc_vol').numberbox('getValue');//收弧电压
	  }else{
	    var farc_vol = 0;
	  }
	  
	  if(!$("#rfarc_ele").is(":hidden")){
	    var farc_ele = $('#farc_ele').numberbox('getValue');//收弧电流
	  }else{
	    var farc_ele = 0;
	  }
	  
	  if(!$("#dadvance").is(":hidden")){
	    var fadvance = $('#fadvance').numberbox('getValue');//提起送气
	  }else{
	    var fadvance = 0;
	  }
	  
	  if(!$("#rfweld_tuny_vol").is(":hidden")){
	    var fweld_tuny_vol = $('#fweld_tuny_vol').numberbox('getValue');//电压微调
	  }else{
	    var fweld_tuny_vol = 0;
	  }
	  
	  if(!$("#rfarc_tuny_vol").is(":hidden")){
	    var farc_tuny_vol = $('#farc_tuny_vol').numberbox('getValue');//电压微调
	  }else{
	    var farc_tuny_vol = 0;
	  }
	  
	  if(!$("#rfini_tuny_vol").is(":hidden")){
	    var fini_tuny_vol = $('#fini_tuny_vol').numberbox('getValue');//电压微调
	  }else{
	    var fini_tuny_vol = 0;
	  }

	  if(!$("#rfweld_tuny_ele").is(":hidden")){
	    var fweld_tuny_ele = $('#fweld_tuny_ele').numberbox('getValue');//电流微调
	  }else{
	    var fweld_tuny_ele = 0;
	  }
	  
	  var fselectstep = $('#fselectstep').combobox('getValue');//step
	  
	  if(!$("#rfrequency").is(":hidden")){
	    var frequency = $('#frequency').combobox('getValue');//双脉冲
	  }else{
	    var frequency = 0;
	  }
	  
	  if(!$("#rftime").is(":hidden")){
	    var ftime = $('#ftime').numberbox('getValue');//点焊时间
	  }else{
	    var ftime = 0;
	  }
	  var fwpsback = "";
	  if($("#fwpsback").val()){
		  fwpsback = $("#fwpsback").val();
	  }
//	var machine = node11.id;

	messager = "保存成功！";
	if(machineModel == 184){
		url2 = "wps/apSpc" + "?finitial=" + finitial + "&fcontroller=" + fcontroller + "&fmode=" + fmode + "&fselect=" + fselect + "&farc=" + farc + "&fmaterial=" + fmaterial + "&fgas=" + fgas + "&fdiameter=" + fdiameter + "&chanel=" + chanel + "&ftime=" + ftime + "&fadvance=" + fadvance + "&fini_ele=" + fini_ele + "&fweld_ele=" + fweld_ele + "&farc_ele=" + farc_ele + "&fhysteresis=" + fhysteresis + "&fcharacter=" + fcharacter + "&fweld_tuny_ele=" + fweld_tuny_ele + "&farc_tuny_ele=" + farc_tuny_ele + "&fini_vol=" + fini_vol +
		"&fini_vol1=" + fini_vol1 + "&fweld_vol=" + fweld_vol + "&fweld_vol1=" + fweld_vol1 + "&farc_vol=" + farc_vol + "&farc_vol1=" + farc_vol1 + "&fweld_tuny_vol=" + fweld_tuny_vol + "&farc_tuny_vol=" + farc_tuny_vol +  "&ftorch=" + ftorch + "&frequency=" + frequency + "&gasflow=" + gasflow + "&weldingratio=" + weldingratio+ "&machine=" + machine+"&firsttime="+firsttime+ "&farc_time="+farc_time+ "&Rush="+Rush +"&handarc_ele="+handarc_ele +"&handarc_time=" +handarc_time +"&hand_ele="+hand_ele +
		"&Base_ele="+Base_ele +"&Base_vol=" +Base_vol+"&Base_vol1="+Base_vol1 +"&fargon=" +fargon +"&manual_weld="+manual_weld +"&arc_length="+arc_length +"&pulse="+pulse +"&fweldparameters="+fweldparameters+"&rise_time="+rise_time +"&decline_time="+decline_time+"&thrust_ele="+thrust_ele+"&pulse_ratio="+pulse_ratio +"&point_speed="+point_speed;
	}else if (machineModel == 185 || machineModel == 187 || machineModel == 188 || machineModel == 189 || machineModel == 190 || machineModel == 191) {
		url2 = url + "&fselect=" + fselect + "&fcharacter=" + fcharacter + "&fmaterial=" + fmaterial + "&fgas=" + fgas + "&fdiameter=" + fdiameter 
		+ "&chanel=" + chanel + "&fweld_ele=" + fweld_ele + "&fweld_vol=" + fweld_vol + "&fspeed=" + fspeed + "&farc_tuny_speed=" + farc_tuny_speed 
		+ "&farc_speed=" + farc_speed + "&fini_vol=" + fini_vol + "&fini_ele=" + fini_ele + "&farc_ele=" + farc_ele + "&farc_vol=" + farc_vol 
		+ "&fadvance=" + fadvance + "&fweld_tuny_vol=" + fweld_tuny_vol + "&fweld_tuny_ele=" + fweld_tuny_ele + "&fselectstep=" + fselectstep 
		+ "&frequency=" + frequency + "&ftime=" + ftime + "&farc_tuny_vol=" + farc_tuny_vol + "&fini_tuny_vol=" + fini_tuny_vol + "&fwpsback=" + encodeURIComponent(fwpsback);
	}
	$.ajax({
		type : "post",
		async : false,
		url : url2,
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (!result.success) {
				$.messager.show({
					title : 'Error',
					msg : result.errorMsg
				});
			} else {
				$.messager.alert("提示", messager);
				$('#mwdlg').dialog('close');
				$('#wpslibTable').datagrid('reload');
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
}

function rule() {
	$("#farc").combobox({
		onSelect : function(record) {
			if (record.value == 111) {
				$('#farc_ele').numberbox("disable", true);
				$('#farc_vol').numberbox("disable", true);
				$('#farc_tuny_ele').numberbox("disable", true);
				$('#farc_tuny_vol').numberbox("disable", true);
				$('#farc_tuny_vol1').numberbox("disable", true);
				$('#farc_vol1').numberbox("disable", true);
				$('#ftime').numberbox("disable", true);
				$('#fini_ele').numberbox("disable", true);
				$('#fini_vol').numberbox("disable", true);
				$('#fini_vol1').numberbox("disable", true);
			} else if (record.value == 112) {
				$('#farc_ele').numberbox("enable", true);
				$('#farc_vol').numberbox("enable", true);
				$('#farc_tuny_ele').numberbox("enable", true);
				$('#farc_tuny_vol').numberbox("enable", true);
				$('#farc_tuny_vol1').numberbox("enable", true);
				$('#farc_vol1').numberbox("enable", true);
				$('#ftime').numberbox("disable", true);
				if ($("#finitial").is(":checked")) {
					$('#fini_ele').numberbox("enable", true);
					$('#fini_vol').numberbox("enable", true);
					$('#fini_vol1').numberbox("enable", true);
				} else {
					$('#fini_ele').numberbox("disable", true);
					$('#fini_vol').numberbox("disable", true);
					$('#fini_vol1').numberbox("disable", true);
				}
			} else if (record.value == 113) {
				$('#farc_ele').numberbox("enable", true);
				$('#farc_vol').numberbox("enable", true);
				$('#farc_tuny_ele').numberbox("enable", true);
				$('#farc_tuny_vol').numberbox("enable", true);
				$('#farc_tuny_vol1').numberbox("enable", true);
				$('#farc_vol1').numberbox("enable", true);
				$('#ftime').numberbox("disable", true);
				if ($("#finitial").is(":checked")) {
					$('#fini_ele').numberbox("enable", true);
					$('#fini_vol').numberbox("enable", true);
					$('#fini_vol1').numberbox("enable", true);
				} else {
					$('#fini_ele').numberbox("disable", true);
					$('#fini_vol').numberbox("disable", true);
					$('#fini_vol1').numberbox("disable", true);
				}
			} else {
				$('#farc_ele').numberbox("disable", true);
				$('#farc_vol').numberbox("disable", true);
				$('#farc_tuny_ele').numberbox("disable", true);
				$('#farc_tuny_vol').numberbox("disable", true);
				$('#farc_tuny_vol1').numberbox("disable", true);
				$('#farc_vol1').numberbox("disable", true);
				$('#fini_ele').numberbox("disable", true);
				$('#fini_vol').numberbox("disable", true);
				$('#fini_vol1').numberbox("disable", true);
				$('#ftime').numberbox("enable", true);
				$('#ftime').numberbox("enable", true);
			}
		}
	});

	$("#finitial").click(function() {
		if ($("#finitial").is(":checked")) {
			if ($('#farc').combobox('getValue') == 112 || $('#farc').combobox('getValue') == 113) {
				$('#fini_ele').numberbox("enable", true);
				$('#fini_vol').numberbox("enable", true);
				$('#fini_vol1').numberbox("enable", true);
			} else {
				$('#fini_ele').numberbox("disable", true);
				$('#fini_vol').numberbox("disable", true);
				$('#fini_vol1').numberbox("disable", true);
			}
		} else {
			$('#fini_ele').numberbox("disable", true);
			$('#fini_vol').numberbox("disable", true);
			$('#fini_vol1').numberbox("disable", true);
		}
	});

	$("#fmaterial").combobox({
		onSelect : function(record) {
			if (record.value == 91) {
				$('#fgas').combobox('clear');
				$('#fgas').combobox('loadData', [ {
					"text" : "CO2",
					"value" : "121"
				}, {
					"text" : "MAG",
					"value" : "122"
				} ]);
				$('#fdiameter').combobox('clear');
				$('#fdiameter').combobox('loadData', [ {
					"text" : "Φ1.0",
					"value" : "131"
				}, {
					"text" : "Φ1.2",
					"value" : "132"
				}, {
					"text" : "Φ1.4",
					"value" : "133"
				}, {
					"text" : "Φ1.6",
					"value" : "134"
				} ]);
			} else if (record.value == 92) {
				$('#fgas').combobox('clear');
				$('#fgas').combobox('loadData', [ {
					"text" : "MIG",
					"value" : "123"
				} ]);
				$('#fdiameter').combobox('clear');
				$('#fdiameter').combobox('loadData', [ {
					"text" : "Φ1.2",
					"value" : "132"
				}, {
					"text" : "Φ1.6",
					"value" : "134"
				} ]);
			} else if (record.value == 93) {
				$('#fgas').combobox('clear');
				$('#fgas').combobox('loadData', [ {
					"text" : "CO2",
					"value" : "121"
				} ]);
				$('#fdiameter').combobox('clear');
				$('#fdiameter').combobox('loadData', [ {
					"text" : "Φ1.2",
					"value" : "132"
				}, {
					"text" : "Φ1.4",
					"value" : "133"
				}, {
					"text" : "Φ1.6",
					"value" : "134"
				} ]);
			} else {
				$('#fgas').combobox('clear');
				$('#fgas').combobox('loadData', [ {
					"text" : "CO2",
					"value" : "121"
				} ]);
				$('#fdiameter').combobox('clear');
				$('#fdiameter').combobox('loadData', [ {
					"text" : "Φ1.2",
					"value" : "132"
				}, {
					"text" : "Φ1.6",
					"value" : "134"
				} ]);
			}
			var fgas = $('#fgas').combobox('getData');
			var fdiameter = $('#fdiameter').combobox('getData');
			$('#fgas').combobox('select', fgas[0].value);
			$('#fdiameter').combobox('select', fdiameter[0].value);
		}
	});
}

function machineModel() {
	$.ajax({
		type : "post",
		async : false,
		url : "Dictionary/getValueByTypeid?type=" + 17,
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				if (result.ary.length != 0) {
					var boptionStr = '';
					for (var i = 0; i < result.ary.length; i++) {
						boptionStr += "<option value=\"" + result.ary[i].value + "\" >"
							+ result.ary[i].name + "</option>";
					}
					$("#model").html(boptionStr);
					$("#model").combobox();
					$("#model").combobox('select', result.ary[0].value);
				}
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
}

function saveSxWps(){
	if(checkSxWps()==false){
		return;
	};
	var wpsLibRow = $('#wpslibTable').datagrid('getSelected');
	var index = $('#wpslibTable').datagrid('getRowIndex',wpsLibRow);
	var messager = "";
	var url2 = "";
	if(mflag==1){
		messager = "新增成功！";
		url2 = url;
	}else{
		messager = "修改成功！";
		url2 = url;
	}
	$('#sxfm').form('submit', {
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
				}else{
					$('#ddv-'+index).datagrid('reload');
					$.messager.alert("提示", messager);
					$('#editSxDlg').dialog('close');
//					$('#wpslibTable').datagrid('reload');
				}
			}
			
		},  
	    error : function(errorMsg) {  
	        alert("数据请求失败，请联系系统管理员!");  
	    } 
	});
}

function getDictionary(typeid,id) {
	$.ajax({
		type : "post",
		async : false,
		url : "wps/getDictionary?typeid=" + typeid,
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				var optionStr = '';
				for (var i = 0; i < result.ary.length; i++) {
					optionStr += "<option value=\"" + result.ary[i].id + "\" >"
						+ result.ary[i].name + "</option>";
				}
				$("#"+id).html(optionStr);
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	$("#" + id).combobox();
}

function QinTronMaterial() {
	//选择材质监听
	$("#fmaterial").combobox({
		onSelect : function(record) {
					gmaterial = record.value;

					if(machineModel==185 || machineModel==187 || machineModel==188){
						var gas = $('#fgas').combobox('getValue');
						var diameter = $('#fdiameter').combobox('getValue');
						var fselect = $('#fselect').combobox('getValue');
						if(record.value == 250 && gas==200 && diameter==135){
							if(fselect==102 || fselect==101){
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "102"
								}, {
									"text" : "一元",
									"value" : "101"
								} ]);
								$('#fselect').combobox('select', fselect);
							}else{
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "102"
								}, {
									"text" : "一元",
									"value" : "101"
								} ]);
								$('#fselect').combobox('select', 102);
							}
						}else if(record.value == 250 && gas==200 && diameter==131){
							var fselect = $('#fselect').combobox('getValue');
							if(fselect==102 || fselect==101){
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "102"
								}, {
									"text" : "一元",
									"value" : "101"
								} ]);
								$('#fselect').combobox('select', fselect);
							}else{
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "102"
								}, {
									"text" : "一元",
									"value" : "101"
								} ]);
								$('#fselect').combobox('select', 102);
							}
						}else if(record.value == 250 && gas==200 && diameter==132){
							var fselect = $('#fselect').combobox('getValue');
							if(fselect==102 || fselect==101){
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "102"
								}, {
									"text" : "一元",
									"value" : "101"
								} ]);
								$('#fselect').combobox('select', fselect);
							}else{
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "102"
								}, {
									"text" : "一元",
									"value" : "101"
								} ]);
								$('#fselect').combobox('select', 102);
							}
						}else{
							$('#fselect').combobox('clear');
							$('#fselect').combobox('loadData', [ {
								"text" : "个别",
								"value" : "102"
							}, {
								"text" : "一元",
								"value" : "101"
							}, {
								"text" : "脉冲",
								"value" : "103"
							}, {
								"text" : "双脉冲",
								"value" : "104"
							} ]);
							$('#fselect').combobox('select', fselect);
						}
					}


					//选择SG2
					if(record.value == 250){
						var gas = $('#fgas').combobox('getValue');
						var diameter = $('#fdiameter').combobox('getValue');

						if(diameter!=134){
							if(gas!=200 && gas!=201 && gas!=202 && gas!=203){
								$('#fgas').combobox('clear');
								$('#fgas').combobox('loadData', [ {
									"text" : "100%(CO₂)",
									"value" : "200"
								}, {
									"text" : "82%-18%(Ar-CO₂)",
									"value" : "201"
								}, {
									"text" : "92%-8%(Ar-CO₂)",
									"value" : "202"
								}, {
									"text" : "91%-4%-5%(Ar-O₂-CO₂)",
									"value" : "203"
								} ]);
								$('#fgas').combobox('select', '200');

								$('#fdiameter').combobox('clear');
								$('#fdiameter').combobox('loadData', [ {
									"text" : "Φ0.8",
									"value" : "135"
								}, {
									"text" : "Φ1.0",
									"value" : "131"
								}, {
									"text" : "Φ1.2",
									"value" : "132"
								}, {
									"text" : "Φ1.6",
									"value" : "134"
								} ]);
								$('#fdiameter').combobox('select', diameter);
							}else{
								$('#fgas').combobox('clear');
								$('#fgas').combobox('loadData', [ {
									"text" : "100%(CO₂)",
									"value" : "200"
								}, {
									"text" : "82%-18%(Ar-CO₂)",
									"value" : "201"
								}, {
									"text" : "92%-8%(Ar-CO₂)",
									"value" : "202"
								}, {
									"text" : "91%-4%-5%(Ar-O₂-CO₂)",
									"value" : "203"
								} ]);
								$('#fgas').combobox('select', gas);

								$('#fdiameter').combobox('clear');
								$('#fdiameter').combobox('loadData', [ {
									"text" : "Φ0.8",
									"value" : "135"
								}, {
									"text" : "Φ1.0",
									"value" : "131"
								}, {
									"text" : "Φ1.2",
									"value" : "132"
								}, {
									"text" : "Φ1.6",
									"value" : "134"
								} ]);
								$('#fdiameter').combobox('select', diameter);
							}
						}else{
							if(gas!=201 && gas!=202 && gas!=203){
								$('#fgas').combobox('clear');
								$('#fgas').combobox('loadData', [ {
									"text" : "82%-18%(Ar-CO₂)",
									"value" : "201"
								}, {
									"text" : "92%-8%(Ar-CO₂)",
									"value" : "202"
								}, {
									"text" : "91%-4%-5%(Ar-O₂-CO₂)",
									"value" : "203"
								} ]);
								$('#fgas').combobox('select', '201');

								$('#fdiameter').combobox('clear');
								$('#fdiameter').combobox('loadData', [ {
									"text" : "Φ0.8",
									"value" : "135"
								}, {
									"text" : "Φ1.0",
									"value" : "131"
								}, {
									"text" : "Φ1.2",
									"value" : "132"
								}, {
									"text" : "Φ1.6",
									"value" : "134"
								} ]);
								$('#fdiameter').combobox('select', '134');
							}else{
								$('#fgas').combobox('clear');
								$('#fgas').combobox('loadData', [ {
									"text" : "82%-18%(Ar-CO₂)",
									"value" : "201"
								}, {
									"text" : "92%-8%(Ar-CO₂)",
									"value" : "202"
								}, {
									"text" : "91%-4%-5%(Ar-O₂-CO₂)",
									"value" : "203"
								} ]);
								$('#fgas').combobox('select', gas);

								$('#fdiameter').combobox('clear');
								$('#fdiameter').combobox('loadData', [ {
									"text" : "Φ0.8",
									"value" : "135"
								}, {
									"text" : "Φ1.0",
									"value" : "131"
								}, {
									"text" : "Φ1.2",
									"value" : "132"
								}, {
									"text" : "Φ1.6",
									"value" : "134"
								} ]);
								$('#fdiameter').combobox('select', '134');
							}
						}
					}

					//选择CRNI
					if(record.value == 251){
						var gas = $('#fgas').combobox('getValue');
						var diameter = $('#fdiameter').combobox('getValue');

						if(diameter==134){
							if(gas!=204){
								$('#fdiameter').combobox('clear');
								$('#fdiameter').combobox('loadData', [ {
									"text" : "Φ0.8",
									"value" : "135"
								}, {
									"text" : "Φ1.0",
									"value" : "131"
								}, {
									"text" : "Φ1.2",
									"value" : "132"
								} ]);
								$('#fdiameter').combobox('select', '135');

								$('#fgas').combobox('clear');
								$('#fgas').combobox('loadData', [ {
									"text" : "98%-2%(Ar-CO₂)",
									"value" : "204"
								} ]);
								$('#fgas').combobox('select', '204');
							}else{
								$('#fdiameter').combobox('clear');
								$('#fdiameter').combobox('loadData', [ {
									"text" : "Φ0.8",
									"value" : "135"
								}, {
									"text" : "Φ1.0",
									"value" : "131"
								}, {
									"text" : "Φ1.2",
									"value" : "132"
								} ]);
								$('#fdiameter').combobox('select', '135');

								$('#fgas').combobox('clear');
								$('#fgas').combobox('loadData', [ {
									"text" : "98%-2%(Ar-CO₂)",
									"value" : "204"
								} ]);
								$('#fgas').combobox('select', '204');
							}

						}else{
							if(diameter==135){
								$('#fdiameter').combobox('clear');
								$('#fdiameter').combobox('loadData', [ {
									"text" : "Φ0.8",
									"value" : "135"
								}, {
									"text" : "Φ1.0",
									"value" : "131"
								}, {
									"text" : "Φ1.2",
									"value" : "132"
								} ]);
								$('#fdiameter').combobox('select', '135');

								$('#fgas').combobox('clear');
								$('#fgas').combobox('loadData', [ {
									"text" : "98%-2%(Ar-CO₂)",
									"value" : "204"
								} ]);
								$('#fgas').combobox('select', '204');
							}else{
								if(gas!=204 && gas!=205){
									$('#fdiameter').combobox('clear');
									$('#fdiameter').combobox('loadData', [ {
										"text" : "Φ0.8",
										"value" : "135"
									}, {
										"text" : "Φ1.0",
										"value" : "131"
									}, {
										"text" : "Φ1.2",
										"value" : "132"
									} ]);
									$('#fdiameter').combobox('select', diameter);

									$('#fgas').combobox('clear');
									$('#fgas').combobox('loadData', [ {
										"text" : "98%-2%(Ar-CO₂)",
										"value" : "204"
									}, {
										"text" : "97%-3%(Ar-O₂)",
										"value" : "205"
									} ]);
									$('#fgas').combobox('select', '204');
								}else{
									$('#fdiameter').combobox('clear');
									$('#fdiameter').combobox('loadData', [ {
										"text" : "Φ0.8",
										"value" : "135"
									}, {
										"text" : "Φ1.0",
										"value" : "131"
									}, {
										"text" : "Φ1.2",
										"value" : "132"
									} ]);
									$('#fdiameter').combobox('select', diameter);

									$('#fgas').combobox('clear');
									$('#fgas').combobox('loadData', [ {
										"text" : "98%-2%(Ar-CO₂)",
										"value" : "204"
									}, {
										"text" : "97%-3%(Ar-O₂)",
										"value" : "205"
									} ]);
									$('#fgas').combobox('select', gas);
								}
							}
						}
					}

					//选择ALSI5
					if(record.value == 252){
						var gas = $('#fgas').combobox('getValue');
						var diameter = $('#fdiameter').combobox('getValue');

						if(diameter==135){
							if(gas!=206 && gas!=207){
								$('#fdiameter').combobox('clear');
								$('#fdiameter').combobox('loadData', [ {
									"text" : "Φ1.0",
									"value" : "131"
								}, {
									"text" : "Φ1.2",
									"value" : "132"
								}, {
									"text" : "Φ1.6",
									"value" : "134"
								} ]);
								$('#fdiameter').combobox('select', '131');

								$('#fgas').combobox('clear');
								$('#fgas').combobox('loadData', [ {
									"text" : "100%(Ar)",
									"value" : "206"
								}, {
									"text" : "70%-30%(Ar-He)",
									"value" : "207"
								} ]);
								$('#fgas').combobox('select', '206');
							}else{
								$('#fdiameter').combobox('clear');
								$('#fdiameter').combobox('loadData', [ {
									"text" : "Φ1.0",
									"value" : "131"
								}, {
									"text" : "Φ1.2",
									"value" : "132"
								}, {
									"text" : "Φ1.6",
									"value" : "134"
								} ]);
								$('#fdiameter').combobox('select', '131');

								$('#fgas').combobox('clear');
								$('#fgas').combobox('loadData', [ {
									"text" : "100%(Ar)",
									"value" : "206"
								}, {
									"text" : "70%-30%(Ar-He)",
									"value" : "207"
								} ]);
								$('#fgas').combobox('select', gas);
							}
						}else{
							if(gas!=206 && gas!=207){
								$('#fdiameter').combobox('clear');
								$('#fdiameter').combobox('loadData', [ {
									"text" : "Φ1.0",
									"value" : "131"
								}, {
									"text" : "Φ1.2",
									"value" : "132"
								}, {
									"text" : "Φ1.6",
									"value" : "134"
								} ]);
								$('#fdiameter').combobox('select', diameter);

								$('#fgas').combobox('clear');
								$('#fgas').combobox('loadData', [ {
									"text" : "100%(Ar)",
									"value" : "206"
								}, {
									"text" : "70%-30%(Ar-He)",
									"value" : "207"
								} ]);
								$('#fgas').combobox('select', '206');
							}else{
								$('#fdiameter').combobox('clear');
								$('#fdiameter').combobox('loadData', [ {
									"text" : "Φ1.0",
									"value" : "131"
								}, {
									"text" : "Φ1.2",
									"value" : "132"
								}, {
									"text" : "Φ1.6",
									"value" : "134"
								} ]);
								$('#fdiameter').combobox('select', diameter);

								$('#fgas').combobox('clear');
								$('#fgas').combobox('loadData', [ {
									"text" : "100%(Ar)",
									"value" : "206"
								}, {
									"text" : "70%-30%(Ar-He)",
									"value" : "207"
								} ]);
								$('#fgas').combobox('select', gas);
							}
						}
					}

					//选择ALMG5
					if(record.value == 253){
						var gas = $('#fgas').combobox('getValue');
						var diameter = $('#fdiameter').combobox('getValue');

						if(diameter==135){
							if(gas!=206 && gas!=207){
								$('#fdiameter').combobox('clear');
								$('#fdiameter').combobox('loadData', [ {
									"text" : "Φ1.0",
									"value" : "131"
								}, {
									"text" : "Φ1.2",
									"value" : "132"
								}, {
									"text" : "Φ1.6",
									"value" : "134"
								} ]);
								$('#fdiameter').combobox('select', '131');

								$('#fgas').combobox('clear');
								$('#fgas').combobox('loadData', [ {
									"text" : "100%(Ar)",
									"value" : "206"
								}, {
									"text" : "70%-30%(Ar-He)",
									"value" : "207"
								} ]);
								$('#fgas').combobox('select', '206');
							}else{
								$('#fdiameter').combobox('clear');
								$('#fdiameter').combobox('loadData', [ {
									"text" : "Φ1.0",
									"value" : "131"
								}, {
									"text" : "Φ1.2",
									"value" : "132"
								}, {
									"text" : "Φ1.6",
									"value" : "134"
								} ]);
								$('#fdiameter').combobox('select', '131');

								$('#fgas').combobox('clear');
								$('#fgas').combobox('loadData', [ {
									"text" : "100%(Ar)",
									"value" : "206"
								}, {
									"text" : "70%-30%(Ar-He)",
									"value" : "207"
								} ]);
								$('#fgas').combobox('select', gas);
							}
						}else{
							if(gas!=206 && gas!=207){
								$('#fdiameter').combobox('clear');
								$('#fdiameter').combobox('loadData', [ {
									"text" : "Φ1.0",
									"value" : "131"
								}, {
									"text" : "Φ1.2",
									"value" : "132"
								}, {
									"text" : "Φ1.6",
									"value" : "134"
								} ]);
								$('#fdiameter').combobox('select', diameter);

								$('#fgas').combobox('clear');
								$('#fgas').combobox('loadData', [ {
									"text" : "100%(Ar)",
									"value" : "206"
								}, {
									"text" : "70%-30%(Ar-He)",
									"value" : "207"
								} ]);
								$('#fgas').combobox('select', '206');
							}else{
								$('#fdiameter').combobox('clear');
								$('#fdiameter').combobox('loadData', [ {
									"text" : "Φ1.0",
									"value" : "131"
								}, {
									"text" : "Φ1.2",
									"value" : "132"
								}, {
									"text" : "Φ1.6",
									"value" : "134"
								} ]);
								$('#fdiameter').combobox('select', diameter);

								$('#fgas').combobox('clear');
								$('#fgas').combobox('loadData', [ {
									"text" : "100%(Ar)",
									"value" : "206"
								}, {
									"text" : "70%-30%(Ar-He)",
									"value" : "207"
								} ]);
								$('#fgas').combobox('select', gas);
							}
						}
					}

					//选择CUSI
					if(record.value == 254){
						var gas = $('#fgas').combobox('getValue');
						var diameter = $('#fdiameter').combobox('getValue');

						if(diameter==134){
							if(gas!=208 && gas!=209 && gas!=212 && gas!=213){
								$('#fdiameter').combobox('clear');
								$('#fdiameter').combobox('loadData', [ {
									"text" : "Φ0.8",
									"value" : "135"
								},{
									"text" : "Φ1.0",
									"value" : "131"
								}, {
									"text" : "Φ1.2",
									"value" : "132"
								} ]);
								$('#fdiameter').combobox('select', '135');

								$('#fgas').combobox('clear');
								$('#fgas').combobox('loadData', [ {
									"text" : "Standard 100%(Ar)",
									"value" : "208"
								}, {
									"text" : "Special 100%(Ar)",
									"value" : "209"
								}, {
									"text" : "Standard 98%-2%(Ar-CO₂)",
									"value" : "212"
								}, {
									"text" : "Special 98%-2%(Ar-CO₂)",
									"value" : "213"
								} ]);
								$('#fgas').combobox('select', '208');
							}else{
								$('#fdiameter').combobox('clear');
								$('#fdiameter').combobox('loadData', [ {
									"text" : "Φ0.8",
									"value" : "135"
								},{
									"text" : "Φ1.0",
									"value" : "131"
								}, {
									"text" : "Φ1.2",
									"value" : "132"
								} ]);
								$('#fdiameter').combobox('select', '135');

								$('#fgas').combobox('clear');
								$('#fgas').combobox('loadData', [ {
									"text" : "Standard 100%(Ar)",
									"value" : "208"
								}, {
									"text" : "Special 100%(Ar)",
									"value" : "209"
								}, {
									"text" : "Standard 98%-2%(Ar-CO₂)",
									"value" : "212"
								}, {
									"text" : "Special 98%-2%(Ar-CO₂)",
									"value" : "213"
								} ]);
								$('#fgas').combobox('select', gas);
							}
						}else{
							if(gas!=208 && gas!=209 && gas!=212 && gas!=213){
								$('#fdiameter').combobox('clear');
								$('#fdiameter').combobox('loadData', [ {
									"text" : "Φ0.8",
									"value" : "135"
								},{
									"text" : "Φ1.0",
									"value" : "131"
								}, {
									"text" : "Φ1.2",
									"value" : "132"
								} ]);
								$('#fdiameter').combobox('select', diameter);

								$('#fgas').combobox('clear');
								$('#fgas').combobox('loadData', [ {
									"text" : "Standard 100%(Ar)",
									"value" : "208"
								}, {
									"text" : "Special 100%(Ar)",
									"value" : "209"
								}, {
									"text" : "Standard 98%-2%(Ar-CO₂)",
									"value" : "212"
								}, {
									"text" : "Special 98%-2%(Ar-CO₂)",
									"value" : "213"
								} ]);
								$('#fgas').combobox('select', '208');
							}else{
								$('#fdiameter').combobox('clear');
								$('#fdiameter').combobox('loadData', [ {
									"text" : "Φ0.8",
									"value" : "135"
								},{
									"text" : "Φ1.0",
									"value" : "131"
								}, {
									"text" : "Φ1.2",
									"value" : "132"
								} ]);
								$('#fdiameter').combobox('select', diameter);

								$('#fgas').combobox('clear');
								$('#fgas').combobox('loadData', [ {
									"text" : "Standard 100%(Ar)",
									"value" : "208"
								}, {
									"text" : "Special 100%(Ar)",
									"value" : "209"
								}, {
									"text" : "Standard 98%-2%(Ar-CO₂)",
									"value" : "212"
								}, {
									"text" : "Special 98%-2%(Ar-CO₂)",
									"value" : "213"
								} ]);
								$('#fgas').combobox('select', gas);
							}
						}
					}

					//选择FLUXBS
					if(record.value == 255){
						var gas = $('#fgas').combobox('getValue');
						var diameter = $('#fdiameter').combobox('getValue');

						if(diameter==135){
							if(gas!=210 && gas!=211){
								$('#fdiameter').combobox('clear');
								$('#fdiameter').combobox('loadData', [ {
									"text" : "Φ1.0",
									"value" : "131"
								}, {
									"text" : "Φ1.2",
									"value" : "132"
								}, {
									"text" : "Φ1.6",
									"value" : "134"
								} ]);
								$('#fdiameter').combobox('select', '131');

								$('#fgas').combobox('clear');
								$('#fgas').combobox('loadData', [ {
									"text" : "Standard 82%-18%(Ar-CO₂)",
									"value" : "210"
								}, {
									"text" : "Special 82%-18%(Ar-CO₂)",
									"value" : "211"
								} ]);
								$('#fgas').combobox('select', '210');
							}else{
								$('#fdiameter').combobox('clear');
								$('#fdiameter').combobox('loadData', [ {
									"text" : "Φ1.0",
									"value" : "131"
								}, {
									"text" : "Φ1.2",
									"value" : "132"
								}, {
									"text" : "Φ1.6",
									"value" : "134"
								} ]);
								$('#fdiameter').combobox('select', '131');

								$('#fgas').combobox('clear');
								$('#fgas').combobox('loadData', [  {
									"text" : "Standard 82%-18%(Ar-CO₂)",
									"value" : "210"
								}, {
									"text" : "Special 82%-18%(Ar-CO₂)",
									"value" : "211"
								} ]);
								$('#fgas').combobox('select', gas);
							}
						}else{
							if(gas!=210 && gas!=211){
								$('#fdiameter').combobox('clear');
								$('#fdiameter').combobox('loadData', [ {
									"text" : "Φ1.0",
									"value" : "131"
								}, {
									"text" : "Φ1.2",
									"value" : "132"
								}, {
									"text" : "Φ1.6",
									"value" : "134"
								} ]);
								$('#fdiameter').combobox('select', diameter);

								$('#fgas').combobox('clear');
								$('#fgas').combobox('loadData', [ {
									"text" : "Standard 82%-18%(Ar-CO₂)",
									"value" : "210"
								}, {
									"text" : "Special 82%-18%(Ar-CO₂)",
									"value" : "211"
								} ]);
								$('#fgas').combobox('select', '210');
							}else{
								$('#fdiameter').combobox('clear');
								$('#fdiameter').combobox('loadData', [ {
									"text" : "Φ1.0",
									"value" : "131"
								}, {
									"text" : "Φ1.2",
									"value" : "132"
								}, {
									"text" : "Φ1.6",
									"value" : "134"
								} ]);
								$('#fdiameter').combobox('select', diameter);

								$('#fgas').combobox('clear');
								$('#fgas').combobox('loadData', [ {
									"text" : "Standard 82%-18%(Ar-CO₂)",
									"value" : "210"
								}, {
									"text" : "Special 82%-18%(Ar-CO₂)",
									"value" : "211"
								} ]);
								$('#fgas').combobox('select', gas);
							}
						}
					}
					
					//选择FLUXRU
					if(record.value == 256){
						var gas = $('#fgas').combobox('getValue');
						var diameter = $('#fdiameter').combobox('getValue');

						if(diameter==135){
							if(gas!=201){
								$('#fdiameter').combobox('clear');
								$('#fdiameter').combobox('loadData', [ {
									"text" : "Φ1.0",
									"value" : "131"
								}, {
									"text" : "Φ1.2",
									"value" : "132"
								}, {
									"text" : "Φ1.6",
									"value" : "134"
								} ]);
								$('#fdiameter').combobox('select', '131');

								$('#fgas').combobox('clear');
								$('#fgas').combobox('loadData', [ {
									"text" : "82%-18%(Ar-CO₂)",
									"value" : "201"
								} ]);
								$('#fgas').combobox('select', '201');
							}else{
								$('#fdiameter').combobox('clear');
								$('#fdiameter').combobox('loadData', [ {
									"text" : "Φ1.0",
									"value" : "131"
								}, {
									"text" : "Φ1.2",
									"value" : "132"
								}, {
									"text" : "Φ1.6",
									"value" : "134"
								} ]);
								$('#fdiameter').combobox('select', '131');

								$('#fgas').combobox('clear');
								$('#fgas').combobox('loadData', [ {
									"text" : "82%-18%(Ar-CO₂)",
									"value" : "201"
								} ]);
								$('#fgas').combobox('select', gas);
							}
						}else{
							if(gas!=201){
								$('#fdiameter').combobox('clear');
								$('#fdiameter').combobox('loadData', [ {
									"text" : "Φ1.0",
									"value" : "131"
								}, {
									"text" : "Φ1.2",
									"value" : "132"
								}, {
									"text" : "Φ1.6",
									"value" : "134"
								} ]);
								$('#fdiameter').combobox('select', diameter);

								$('#fgas').combobox('clear');
								$('#fgas').combobox('loadData', [ {
									"text" : "82%-18%(Ar-CO₂)",
									"value" : "201"
								} ]);
								$('#fgas').combobox('select', '201');
							}else{
								$('#fdiameter').combobox('clear');
								$('#fdiameter').combobox('loadData', [ {
									"text" : "Φ1.0",
									"value" : "131"
								}, {
									"text" : "Φ1.2",
									"value" : "132"
								}, {
									"text" : "Φ1.6",
									"value" : "134"
								} ]);
								$('#fdiameter').combobox('select', diameter);

								$('#fgas').combobox('clear');
								$('#fgas').combobox('loadData', [ {
									"text" : "82%-18%(Ar-CO₂)",
									"value" : "201"
								} ]);
								$('#fgas').combobox('select', gas);
							}
						}
					}
		}
	});
}

function QinTronDiameter() {
	//选择丝径监听
	$("#fdiameter").combobox({
		onSelect : function(record) {
					gdiameter = record.value;

					if(machineModel==185 || machineModel==187 || machineModel==188){
						var gas = $('#fgas').combobox('getValue');
						var material = $('#fmaterial').combobox('getValue');
						var fselect = $('#fselect').combobox('getValue');
						if(material == 250 && gas==200 && record.value==135){
							if(fselect==102 || fselect==101){
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "102"
								}, {
									"text" : "一元",
									"value" : "101"
								} ]);
								$('#fselect').combobox('select', fselect);
							}else{
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "102"
								}, {
									"text" : "一元",
									"value" : "101"
								} ]);
								$('#fselect').combobox('select', 102);
							}
						}else if(material == 250 && gas==200 && record.value==131){
							var fselect = $('#fselect').combobox('getValue');
							if(fselect==102 || fselect==101){
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "102"
								}, {
									"text" : "一元",
									"value" : "101"
								} ]);
								$('#fselect').combobox('select', fselect);
							}else{
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "102"
								}, {
									"text" : "一元",
									"value" : "101"
								} ]);
								$('#fselect').combobox('select', 102);
							}
						}else if(material == 250 && gas==200 && record.value==132){
							var fselect = $('#fselect').combobox('getValue');
							if(fselect==102 || fselect==101){
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "102"
								}, {
									"text" : "一元",
									"value" : "101"
								} ]);
								$('#fselect').combobox('select', fselect);
							}else{
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "102"
								}, {
									"text" : "一元",
									"value" : "101"
								} ]);
								$('#fselect').combobox('select', 102);
							}
						}else{
							$('#fselect').combobox('clear');
							$('#fselect').combobox('loadData', [ {
								"text" : "个别",
								"value" : "102"
							}, {
								"text" : "一元",
								"value" : "101"
							}, {
								"text" : "脉冲",
								"value" : "103"
							}, {
								"text" : "双脉冲",
								"value" : "104"
							} ]);
							$('#fselect').combobox('select', fselect);
						}
					}
					


					//选择0.8
					if(record.value == 135){
						var gas = $('#fgas').combobox('getValue');
						var material = gmaterial;

						if(gas==200 && material==250){
							var fselect = $('#fselect').combobox('getValue');
							if(fselect==102 || fselect==101){
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "102"
								}, {
									"text" : "一元",
									"value" : "101"
								} ]);
								$('#fselect').combobox('select', fselect);
							}else{
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "102"
								}, {
									"text" : "一元",
									"value" : "101"
								} ]);
								$('#fselect').combobox('select', 102);
							}
						}

						if(material==250){
							$('#fgas').combobox('clear');
							$('#fgas').combobox('loadData', [ {
								"text" : "100%(CO₂)",
								"value" : "200"
							}, {
								"text" : "82%-18%(Ar-CO₂)",
								"value" : "201"
							}, {
								"text" : "92%-8%(Ar-CO₂)",
								"value" : "202"
							}, {
								"text" : "91%-4%-5%(Ar-O₂-CO₂)",
								"value" : "203"
							} ]);
							$('#fgas').combobox('select', gas);
						}else if(material==251){
							$('#fgas').combobox('clear');
							$('#fgas').combobox('loadData', [ {
								"text" : "98%-2%(Ar-CO₂)",
								"value" : "204"
							} ]);
							$('#fgas').combobox('select', '204');
						}else if(material==254){
							$('#fgas').combobox('clear');
							$('#fgas').combobox('loadData', [ {
								"text" : "Standard 100%(Ar)",
								"value" : "208"
							}, {
								"text" : "Special 100%(Ar)",
								"value" : "209"
							}, {
								"text" : "Standard 98%-2%(Ar-CO₂)",
								"value" : "212"
							}, {
								"text" : "Special 98%-2%(Ar-CO₂)",
								"value" : "213"
							} ]);
							$('#fgas').combobox('select', gas);
						}
					}

					//选择1.0
					if(record.value == 131){
						var gas = $('#fgas').combobox('getValue');
						var material = gmaterial;

						if(material==250){
							$('#fgas').combobox('clear');
							$('#fgas').combobox('loadData', [ {
								"text" : "100%(CO₂)",
								"value" : "200"
							}, {
								"text" : "82%-18%(Ar-CO₂)",
								"value" : "201"
							}, {
								"text" : "92%-8%(Ar-CO₂)",
								"value" : "202"
							}, {
								"text" : "91%-4%-5%(Ar-O₂-CO₂)",
								"value" : "203"
							} ]);
							$('#fgas').combobox('select', gas);
						}else if(material==251){
							$('#fgas').combobox('clear');
							$('#fgas').combobox('loadData', [ {
								"text" : "98%-2%(Ar-CO₂)",
								"value" : "204"
							}, {
								"text" : "97%-3%(Ar-O₂)",
								"value" : "205"
							} ]);
							$('#fgas').combobox('select', gas);
						}else if(material==252){
							$('#fgas').combobox('clear');
							$('#fgas').combobox('loadData', [ {
								"text" : "100%(Ar)",
								"value" : "206"
							}, {
								"text" : "70%-30%(Ar-He)",
								"value" : "207"
							} ]);
							$('#fgas').combobox('select', gas);
						}else if(material==253){
							$('#fgas').combobox('clear');
							$('#fgas').combobox('loadData', [ {
								"text" : "100%(Ar)",
								"value" : "206"
							}, {
								"text" : "70%-30%(Ar-He)",
								"value" : "207"
							} ]);
							$('#fgas').combobox('select', gas);
						}else if(material==254){
							$('#fgas').combobox('clear');
							$('#fgas').combobox('loadData', [ {
								"text" : "Standard 100%(Ar)",
								"value" : "208"
							}, {
								"text" : "Special 100%(Ar)",
								"value" : "209"
							}, {
								"text" : "Standard 98%-2%(Ar-CO₂)",
								"value" : "212"
							}, {
								"text" : "Special 98%-2%(Ar-CO₂)",
								"value" : "213"
							} ]);
							$('#fgas').combobox('select', gas);
						}else if(material==255){
							$('#fgas').combobox('clear');
							$('#fgas').combobox('loadData', [ {
								"text" : "Standard 82%-18%(Ar-CO₂)",
								"value" : "210"
							}, {
								"text" : "Special 82%-18%(Ar-CO₂)",
								"value" : "211"
							} ]);
							$('#fgas').combobox('select', gas);
						}else if(material==256){
							$('#fgas').combobox('clear');
							$('#fgas').combobox('loadData', [ {
								"text" : "82%-18%(Ar-CO₂)",
								"value" : "201"
							} ]);
							$('#fgas').combobox('select', '201');
						}
					}

					//选择1.2
					if(record.value == 132){
						var gas = $('#fgas').combobox('getValue');
						var material = gmaterial;

						if(material==250){
							$('#fgas').combobox('clear');
							$('#fgas').combobox('loadData', [ {
								"text" : "100%(CO₂)",
								"value" : "200"
							}, {
								"text" : "82%-18%(Ar-CO₂)",
								"value" : "201"
							}, {
								"text" : "92%-8%(Ar-CO₂)",
								"value" : "202"
							}, {
								"text" : "91%-4%-5%(Ar-O₂-CO₂)",
								"value" : "203"
							} ]);
							$('#fgas').combobox('select', gas);
						}else if(material==251){
							$('#fgas').combobox('clear');
							$('#fgas').combobox('loadData', [ {
								"text" : "98%-2%(Ar-CO₂)",
								"value" : "204"
							}, {
								"text" : "97%-3%(Ar-O₂)",
								"value" : "205"
							} ]);
							$('#fgas').combobox('select', gas);
						}else if(material==252){
							$('#fgas').combobox('clear');
							$('#fgas').combobox('loadData', [ {
								"text" : "100%(Ar)",
								"value" : "206"
							}, {
								"text" : "70%-30%(Ar-He)",
								"value" : "207"
							} ]);
							$('#fgas').combobox('select', gas);
						}else if(material==253){
							$('#fgas').combobox('clear');
							$('#fgas').combobox('loadData', [ {
								"text" : "100%(Ar)",
								"value" : "206"
							}, {
								"text" : "70%-30%(Ar-He)",
								"value" : "207"
							} ]);
							$('#fgas').combobox('select', gas);
						}else if(material==254){
							$('#fgas').combobox('clear');
							$('#fgas').combobox('loadData', [ {
								"text" : "Standard 100%(Ar)",
								"value" : "208"
							}, {
								"text" : "Special 100%(Ar)",
								"value" : "209"
							}, {
								"text" : "Standard 98%-2%(Ar-CO₂)",
								"value" : "212"
							}, {
								"text" : "Special 98%-2%(Ar-CO₂)",
								"value" : "213"
							} ]);
							$('#fgas').combobox('select', gas);
						}else if(material==255){
							$('#fgas').combobox('clear');
							$('#fgas').combobox('loadData', [ {
								"text" : "Standard 82%-18%(Ar-CO₂)",
								"value" : "210"
							}, {
								"text" : "Special 82%-18%(Ar-CO₂)",
								"value" : "211"
							} ]);
							$('#fgas').combobox('select', gas);
						}else if(material==256){
							$('#fgas').combobox('clear');
							$('#fgas').combobox('loadData', [ {
								"text" : "82%-18%(Ar-CO₂)",
								"value" : "201"
							} ]);
							$('#fgas').combobox('select', '201');
						}
					}

					//选择1.6
					if(record.value == 134){
						var gas = $('#fgas').combobox('getValue');
						var material = gmaterial;

						if(material==250){
							if(gas==200){
								$('#fgas').combobox('clear');
								$('#fgas').combobox('loadData', [ {
									"text" : "82%-18%(Ar-CO₂)",
									"value" : "201"
								}, {
									"text" : "92%-8%(Ar-CO₂)",
									"value" : "202"
								}, {
									"text" : "91%-4%-5%(Ar-O₂-CO₂)",
									"value" : "203"
								} ]);
								$('#fgas').combobox('select', '201');
							}else{
								$('#fgas').combobox('clear');
								$('#fgas').combobox('loadData', [ {
									"text" : "82%-18%(Ar-CO₂)",
									"value" : "201"
								}, {
									"text" : "92%-8%(Ar-CO₂)",
									"value" : "202"
								}, {
									"text" : "91%-4%-5%(Ar-O₂-CO₂)",
									"value" : "203"
								} ]);
								$('#fgas').combobox('select', gas);
							}
						}else if(material==252){
							$('#fgas').combobox('clear');
							$('#fgas').combobox('loadData', [ {
								"text" : "100%(Ar)",
								"value" : "206"
							}, {
								"text" : "70%-30%(Ar-He)",
								"value" : "207"
							} ]);
							$('#fgas').combobox('select', gas);
						}else if(material==253){
							$('#fgas').combobox('clear');
							$('#fgas').combobox('loadData', [ {
								"text" : "100%(Ar)",
								"value" : "206"
							}, {
								"text" : "70%-30%(Ar-He)",
								"value" : "207"
							} ]);
							$('#fgas').combobox('select', gas);
						}else if(material==255){
							$('#fgas').combobox('clear');
							$('#fgas').combobox('loadData', [ {
								"text" : "Standard 82%-18%(Ar-CO₂)",
								"value" : "210"
							}, {
								"text" : "Special 82%-18%(Ar-CO₂)",
								"value" : "211"
							} ]);
							$('#fgas').combobox('select', gas);
						}else if(material==256){
							$('#fgas').combobox('clear');
							$('#fgas').combobox('loadData', [ {
								"text" : "82%-18%(Ar-CO₂)",
								"value" : "201"
							} ]);
							$('#fgas').combobox('select', gas);
						}
					}
		}
	});
}

function QinTronGas() {
	//选择气体监听
	$("#fgas").combobox({
		onSelect : function(record) {
//				if(firgas==1000){
//				}else{
					ggas = record.value;
					if(machineModel==185 || machineModel==187 || machineModel==188){
						var material = $('#fmaterial').combobox('getValue');
						var diameter = $('#fdiameter').combobox('getValue');
						var fselect = $('#fselect').combobox('getValue');
						if(material == 250 && record.value==200 && diameter==135){
							if(fselect==102 || fselect==101){
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "102"
								}, {
									"text" : "一元",
									"value" : "101"
								} ]);
								$('#fselect').combobox('select', fselect);
							}else{
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "102"
								}, {
									"text" : "一元",
									"value" : "101"
								} ]);
								$('#fselect').combobox('select', 102);
							}
						}else if(material == 250 && record.value==200 && diameter==131){
							var fselect = $('#fselect').combobox('getValue');
							if(fselect==102 || fselect==101){
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "102"
								}, {
									"text" : "一元",
									"value" : "101"
								} ]);
								$('#fselect').combobox('select', fselect);
							}else{
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "102"
								}, {
									"text" : "一元",
									"value" : "101"
								} ]);
								$('#fselect').combobox('select', 102);
							}
						}else if(material == 250 && record.value==200 && diameter==132){
							var fselect = $('#fselect').combobox('getValue');
							if(fselect==102 || fselect==101){
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "102"
								}, {
									"text" : "一元",
									"value" : "101"
								} ]);
								$('#fselect').combobox('select', fselect);
							}else{
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "102"
								}, {
									"text" : "一元",
									"value" : "101"
								} ]);
								$('#fselect').combobox('select', 102);
							}
						}else{
							$('#fselect').combobox('clear');
							$('#fselect').combobox('loadData', [ {
								"text" : "个别",
								"value" : "102"
							}, {
								"text" : "一元",
								"value" : "101"
							}, {
								"text" : "脉冲",
								"value" : "103"
							}, {
								"text" : "双脉冲",
								"value" : "104"
							} ]);
							$('#fselect').combobox('select', fselect);
						}
					}
//				}
		}
	});
}

function QinTronSelect() {
	//选择模式监听
	$("#fselect").combobox({
		onSelect : function(record) {
					gselect = record.value;

					if(record.value != 102 && record.value != 104){
						$("#rfweld_vol").hide();
						$("#tfweld_vol").hide();
						$("#rfspeed").hide();
						$("#tfspeed").hide();
						$("#rfrequency").hide();
						$("#tfrequency").hide();

						$("#rfweld_ele").show();
						$("#tfweld_ele").show();
						$("#rfweld_tuny_ele").show();
						$("#tfweld_tuny_ele").show();
						$("#rfweld_tuny_vol").show();
						$("#tfweld_tuny_vol").show();
						if($('#fselectstep').combobox('getValue') == 108){
							$("#rfini_vol").hide();
							$("#tfini_vol").hide();
							$("#rfarc_vol").hide();
							$("#tfarc_vol").hide();
							$("#rfarc_speed").hide();
							$("#tfarc_speed").hide();
							$("#rfarc_tuny_speed").hide();
							$("#tfarc_tuny_speed").hide();

							$("#rfini_ele").show();
							$("#tfini_ele").show();
							$("#rfarc_ele").show();
							$("#tfarc_ele").show();
							$("#rftime").hide();
							$("#tftime").hide();
						}
					}else if(record.value == 104){
						$("#rfweld_vol").hide();
						$("#tfweld_vol").hide();
						$("#rfspeed").hide();
						$("#tfspeed").hide();

						$("#rfrequency").show();
						$("#tfrequency").show();
						$("#rfweld_ele").show();
						$("#tfweld_ele").show();
						$("#rfweld_tuny_ele").show();
						$("#tfweld_tuny_ele").show();
						$("#rfweld_tuny_vol").show();
						$("#tfweld_tuny_vol").show();
						if($('#fselectstep').combobox('getValue') == 108){
							$("#rfini_vol").hide();
							$("#tfini_vol").hide();
							$("#rfarc_vol").hide();
							$("#tfarc_vol").hide();
							$("#rfarc_speed").hide();
							$("#tfarc_speed").hide();
							$("#rfarc_tuny_speed").hide();
							$("#tfarc_tuny_speed").hide();

							$("#rfini_ele").show();
							$("#tfini_ele").show();
							$("#rfarc_ele").show();
							$("#tfarc_ele").show();
							$("#rftime").hide();
							$("#tftime").hide();
						}
					}else {
						$("#rfweld_ele").hide();
						$("#tfweld_ele").hide();
						$("#rfweld_tuny_ele").hide();
						$("#tfweld_tuny_ele").hide();
						$("#rfweld_tuny_vol").hide();
						$("#tfweld_tuny_vol").hide();
						$("#rfrequency").hide();
						$("#tfrequency").hide();

						$("#rfweld_vol").show();
						$("#tfweld_vol").show();
						$("#rfspeed").show();
						$("#tfspeed").show();
						if($('#fselectstep').combobox('getValue') == 108){
							$("#rfini_vol").show();
							$("#tfini_vol").show();
							$("#rfarc_vol").show();
							$("#tfarc_vol").show();
							$("#rfarc_speed").show();
							$("#tfarc_speed").show();
							$("#rfarc_tuny_speed").show();
							$("#tfarc_tuny_speed").show();

							$("#rfini_ele").hide();
							$("#tfini_ele").hide();
							$("#rfarc_ele").hide();
							$("#tfarc_ele").hide();
							$("#rftime").hide();
							$("#tftime").hide();
						}
					}
					if(record.value == 101 &&　$('#fselectstep').combobox('getValue') == 108){
						$("#rfarc_tuny_vol").show();
						$("#tfarc_tuny_vol").show();
						$("#rfini_tuny_vol").show();
						$("#tfini_tuny_vol").show();
					}else{
						$("#rfarc_tuny_vol").hide();
						$("#tfarc_tuny_vol").hide();
						$("#rfini_tuny_vol").hide();
						$("#tfini_tuny_vol").hide();
					}
		}
	});
}

function QinTronStep() {
	//选择step监听
	$("#fselectstep").combobox({
		onSelect : function(record) {
					gselectstep = record.value;

					if(record.value == 105){
						$("#rftime").show();
						$("#tftime").show();

						$("#rfini_vol").hide();
						$("#tfini_vol").hide();
						$("#rfini_ele").hide();
						$("#tfini_ele").hide();
						$("#rfarc_vol").hide();
						$("#tfarc_vol").hide();
						$("#rfarc_ele").hide();
						$("#tfarc_ele").hide();
						$("#rfarc_speed").hide();
						$("#tfarc_speed").hide();
						$("#rfarc_tuny_speed").hide();
						$("#tfarc_tuny_speed").hide();
					}else if(record.value == 106 || record.value == 107){
						$("#rftime").hide();
						$("#tftime").hide();
						$("#rfini_vol").hide();
						$("#tfini_vol").hide();
						$("#rfini_ele").hide();
						$("#tfini_ele").hide();
						$("#rfarc_vol").hide();
						$("#tfarc_vol").hide();
						$("#rfarc_ele").hide();
						$("#tfarc_ele").hide();
						$("#rfarc_speed").hide();
						$("#tfarc_speed").hide();
						$("#rfarc_tuny_speed").hide();
						$("#tfarc_tuny_speed").hide();
					}else if(record.value == 108){
						if($('#fselect').combobox('getValue') == 102){
							$("#rfini_vol").show();
							$("#tfini_vol").show();
							$("#rfarc_vol").show();
							$("#tfarc_vol").show();
							$("#rfarc_speed").show();
							$("#tfarc_speed").show();
							$("#rfarc_tuny_speed").show();
							$("#tfarc_tuny_speed").show();

							$("#rfini_ele").hide();
							$("#tfini_ele").hide();
							$("#rfarc_ele").hide();
							$("#tfarc_ele").hide();
							$("#rftime").hide();
							$("#tftime").hide();
						}else{
							$("#rfini_vol").hide();
							$("#tfini_vol").hide();
							$("#rfarc_vol").hide();
							$("#tfarc_vol").hide();
							$("#rfarc_speed").hide();
							$("#tfarc_speed").hide();
							$("#rfarc_tuny_speed").hide();
							$("#tfarc_tuny_speed").hide();

							$("#rfini_ele").show();
							$("#tfini_ele").show();
							$("#rfarc_ele").show();
							$("#tfarc_ele").show();
							$("#rftime").hide();
							$("#tftime").hide();
						}
					}
					
					if(record.value == 108 && $('#fselect').combobox('getValue') == 101){
						$("#rfarc_tuny_vol").show();
						$("#tfarc_tuny_vol").show();
						$("#rfini_tuny_vol").show();
						$("#tfini_tuny_vol").show();
					}else{
						$("#rfarc_tuny_vol").hide();
						$("#tfarc_tuny_vol").hide();
						$("#rfini_tuny_vol").hide();
						$("#tfini_tuny_vol").hide();
					}
					
					if(record.value == 108){
						$("#dadvance").show();
						$("#tadvance").show();
					}else{
						$("#dadvance").hide();
						$("#tadvance").hide();
					}
		}
	});
}

//用户输入参数检测
function QinTronCHECK(machineModel) {
	var fgas = parseInt($('#fgas').combobox('getValue'));    //气体
	var fdiameter = parseInt($('#fdiameter').combobox('getValue'));    //丝径
	var fmaterial = parseInt($('#fmaterial').combobox('getValue'));    //材质
	var fselectstep = parseInt($('#fselectstep').combobox('getValue'));    //step
	var fselect = parseInt($('#fselect').combobox('getValue'));   //焊接模式
	
	var fspeed = (parseFloat($('#fspeed').numberbox('getValue')));    //速度
	var farc_speed = (parseFloat($('#farc_speed').numberbox('getValue')));    //初期速度
	var farc_tuny_speed = (parseFloat($('#farc_tuny_speed').numberbox('getValue')));    //收弧速度

	var fini_ele = parseInt($('#fini_ele').numberbox('getValue'));    //初期电流
	var fweld_ele = parseInt($('#fweld_ele').numberbox('getValue'));    //电流
	var farc_ele = parseInt($('#farc_ele').numberbox('getValue'));    //收弧电流

	var fini_vol = (parseFloat($('#fini_vol').numberbox('getValue')));  //初期电压
	var farc_vol = (parseFloat($('#farc_vol').numberbox('getValue')));  //收弧电压
	var fweld_vol = (parseFloat($('#fweld_vol').numberbox('getValue')));  //电压
	var farc_tuny_vol = (parseFloat($('#farc_tuny_vol').numberbox('getValue')));  //收狐电压微调
	var fweld_tuny_vol = (parseFloat($('#fweld_tuny_vol').numberbox('getValue')));  //焊接电压微调
	var fini_tuny_vol = (parseFloat($('#fini_tuny_vol').numberbox('getValue')));  //初期电压微调
	
	var fadvance = $('#fadvance').numberbox('getValue');   //提前送气
	var ftime = $('#ftime').numberbox('getValue');   //提前送气
	if(!$("#dadvance").is(":hidden")){
		if(fadvance<0.1 || fadvance>5){
			alert("提前送气：0.1~5");
			return false;
		}
	}
	if(!$("#rftime").is(":hidden")){
		if(ftime<0.5 || ftime>10){
			alert("点焊时间：0.5~10");
			return false;
		}
	}
	if(farc_tuny_vol<-50 || farc_tuny_vol>50){
		alert("收狐电压微调：-50~50");
		return false;
	}
	if(fweld_tuny_vol<-50 || fweld_tuny_vol>50){
		alert("焊接电压微调：-50~50");
		return false;
	}
	if(fini_tuny_vol<-50 || fini_tuny_vol>50){
		alert("初期电压微调：-50~50");
		return false;
	}
	var fcharacter = parseInt($('#fcharacter').numberbox('getValue'));  //电感
	if(fcharacter<-50 || fcharacter>50){
		alert("给定电感：-50~50");
		return false;
	}
	if(machineModel == 185){    //400DP
		if (fmaterial == 250 && fdiameter == 135 && fgas == 200){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>185 || fweld_ele<60 || fweld_ele>185 || farc_ele<60 || farc_ele>185){
						alert("电流：60-185");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>185){
						alert("电流：60-185");
						return false;
					}
				}
			}else if(fselect == 103){
				
			}else if(fselect == 104){
				
			}
		}else if (fmaterial == 250 && fdiameter == 135 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<68 || fini_ele>230 || fweld_ele<68 || fweld_ele>230 || farc_ele<68 || farc_ele>230){
						alert("电流：68-230");
						return false;
					}
				}else{
					if(fweld_ele<68 || fweld_ele>230){
						alert("电流：68-230");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<25 || fini_ele>210 || fweld_ele<25 || fweld_ele>210 || farc_ele<25 || farc_ele>210){
						alert("电流：25-210");
						return false;
					}
				}else{
					if(fweld_ele<25 || fweld_ele>210){
						alert("电流：25-210");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<31 || fini_ele>175 || fweld_ele<31 || fweld_ele>175 || farc_ele<31 || farc_ele>175){
						alert("电流：31-175");
						return false;
					}
				}else{
					if(fweld_ele<68 || fweld_ele>175){
						alert("电流：31-175");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 135 && fgas == 202){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<62 || fini_ele>225 || fweld_ele<62 || fweld_ele>225 || farc_ele<62 || farc_ele>225){
						alert("电流：62-225");
						return false;
					}
				}else{
					if(fweld_ele<62 || fweld_ele>225){
						alert("电流：62-225");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<28 || fini_ele>210 || fweld_ele<28 || fweld_ele>210 || farc_ele<28 || farc_ele>210){
						alert("电流：28-210");
						return false;
					}
				}else{
					if(fweld_ele<28 || fweld_ele>210){
						alert("电流：28-210");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<35 || fini_ele>175 || fweld_ele<35 || fweld_ele>175 || farc_ele<35 || farc_ele>175){
						alert("电流：35-175");
						return false;
					}
				}else{
					if(fweld_ele<35 || fweld_ele>175){
						alert("电流：35-175");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 135 && fgas == 203){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<65 || fini_ele>230 || fweld_ele<65 || fweld_ele>230 || farc_ele<65 || farc_ele>230){
						alert("电流：65-230");
						return false;
					}
				}else{
					if(fweld_ele<65 || fweld_ele>230){
						alert("电流：65-230");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<24 || fini_ele>200 || fweld_ele<24 || fweld_ele>200 || farc_ele<24 || farc_ele>200){
						alert("电流：24-200");
						return false;
					}
				}else{
					if(fweld_ele<24 || fweld_ele>200){
						alert("电流：24-200");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<30 || fini_ele>166 || fweld_ele<30 || fweld_ele>166 || farc_ele<30 || farc_ele>166){
						alert("电流：30-166");
						return false;
					}
				}else{
					if(fweld_ele<30 || fweld_ele>166){
						alert("电流：30-166");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 131 && fgas == 200){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<55 || fini_ele>375 || fweld_ele<55 || fweld_ele>375 || farc_ele<55 || farc_ele>375){
						alert("电流：55-375");
						return false;
					}
				}else{
					if(fweld_ele<55 || fweld_ele>375){
						alert("电流：55-375");
						return false;
					}
				}
			}else if(fselect == 103){
				
			}else if(fselect == 104){
				
			}
		}else if (fmaterial == 250 && fdiameter == 131 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<68 || fini_ele>375 || fweld_ele<68 || fweld_ele>375 || farc_ele<68 || farc_ele>375){
						alert("电流：68-375");
						return false;
					}
				}else{
					if(fweld_ele<68 || fweld_ele>375){
						alert("电流：68-375");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>335 || fweld_ele<40 || fweld_ele>335 || farc_ele<40 || farc_ele>335){
						alert("电流：40-335");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>335){
						alert("电流：40-335");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<50 || fini_ele>279 || fweld_ele<50 || fweld_ele>279 || farc_ele<50 || farc_ele>279){
						alert("电流：50-279");
						return false;
					}
				}else{
					if(fweld_ele<50 || fweld_ele>279){
						alert("电流：50-279");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 131 && fgas == 202){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<65 || fini_ele>380 || fweld_ele<65 || fweld_ele>380 || farc_ele<65 || farc_ele>380){
						alert("电流：65-380");
						return false;
					}
				}else{
					if(fweld_ele<65 || fweld_ele>380){
						alert("电流：65-380");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>340 || fweld_ele<40 || fweld_ele>340 || farc_ele<40 || farc_ele>340){
						alert("电流：40-340");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>340){
						alert("电流：40-340");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<50 || fini_ele>283 || fweld_ele<50 || fweld_ele>283 || farc_ele<50 || farc_ele>283){
						alert("电流：50-283");
						return false;
					}
				}else{
					if(fweld_ele<50 || fweld_ele>283){
						alert("电流：50-283");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 131 && fgas == 203){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<66 || fini_ele>360 || fweld_ele<66 || fweld_ele>360 || farc_ele<66 || farc_ele>360){
						alert("电流：66-360");
						return false;
					}
				}else{
					if(fweld_ele<66 || fweld_ele>360){
						alert("电流：66-360");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<42 || fini_ele>325 || fweld_ele<42 || fweld_ele>325 || farc_ele<42 || farc_ele>325){
						alert("电流：42-325");
						return false;
					}
				}else{
					if(fweld_ele<42 || fweld_ele>325){
						alert("电流：42-325");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<52 || fini_ele>270 || fweld_ele<52 || fweld_ele>270 || farc_ele<52 || farc_ele>270){
						alert("电流：52-270");
						return false;
					}
				}else{
					if(fweld_ele<52 || fweld_ele>270){
						alert("电流：52-270");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 132 && fgas == 200){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<96 || fini_ele>400 || fweld_ele<96 || fweld_ele>400 || farc_ele<96 || farc_ele>400){
						alert("电流：96-400");
						return false;
					}
				}else{
					if(fweld_ele<96 || fweld_ele>400){
						alert("电流：96-400");
						return false;
					}
				}
			}else if(fselect == 103){

			}else if(fselect == 104){

			}
		}else if (fmaterial == 250 && fdiameter == 132 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<85 || fini_ele>400 || fweld_ele<85 || fweld_ele>400 || farc_ele<85 || farc_ele>400){
						alert("电流：85-400");
						return false;
					}
				}else{
					if(fweld_ele<85 || fweld_ele>400){
						alert("电流：85-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<55 || fini_ele>400 || fweld_ele<55 || fweld_ele>400 || farc_ele<55 || farc_ele>400){
						alert("电流：55-400");
						return false;
					}
				}else{
					if(fweld_ele<55 || fweld_ele>400){
						alert("电流：55-400");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<68 || fini_ele>383 || fweld_ele<68 || fweld_ele>383 || farc_ele<68 || farc_ele>383){
						alert("电流：68-383");
						return false;
					}
				}else{
					if(fweld_ele<68 || fweld_ele>383){
						alert("电流：68-383");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 132 && fgas == 202){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<85 || fini_ele>400 || fweld_ele<85 || fweld_ele>400 || farc_ele<85 || farc_ele>400){
						alert("电流：85-400");
						return false;
					}
				}else{
					if(fweld_ele<85 || fweld_ele>400){
						alert("电流：85-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>400 || fweld_ele<60 || fweld_ele>400 || farc_ele<60 || farc_ele>400){
						alert("电流：60-400");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>400){
						alert("电流：60-400");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<75 || fini_ele>370 || fweld_ele<75 || fweld_ele>370 || farc_ele<75 || farc_ele>370){
						alert("电流：75-370");
						return false;
					}
				}else{
					if(fweld_ele<75 || fweld_ele>370){
						alert("电流：75-370");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 132 && fgas == 203){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<82 || fini_ele>400 || fweld_ele<82 || fweld_ele>400 || farc_ele<82 || farc_ele>400){
						alert("电流：82-400");
						return false;
					}
				}else{
					if(fweld_ele<82 || fweld_ele>400){
						alert("电流：82-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<65 || fini_ele>400 || fweld_ele<65 || fweld_ele>400 || farc_ele<65 || farc_ele>400){
						alert("电流：65-400");
						return false;
					}
				}else{
					if(fweld_ele<65 || fweld_ele>400){
						alert("电流：65-400");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<81 || fini_ele>354 || fweld_ele<81 || fweld_ele>354 || farc_ele<81 || farc_ele>354){
						alert("电流：81-354");
						return false;
					}
				}else{
					if(fweld_ele<81 || fweld_ele>354){
						alert("电流：81-354");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 134 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<130 || fini_ele>400 || fweld_ele<130 || fweld_ele>400 || farc_ele<130 || farc_ele>400){
						alert("电流： 130-400");
						return false;
					}
				}else{
					if(fweld_ele<130 || fweld_ele>400){
						alert("电流： 130-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<35 || fini_ele>400 || fweld_ele<35 || fweld_ele>400 || farc_ele<35 || farc_ele>400){
						alert("电流：35-400");
						return false;
					}
				}else{
					if(fweld_ele<35 || fweld_ele>400){
						alert("电流：35-400");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<43 || fini_ele>400 || fweld_ele<43 || fweld_ele>400 || farc_ele<43 || farc_ele>400){
						alert("电流：43-400");
						return false;
					}
				}else{
					if(fweld_ele<43 || fweld_ele>400){
						alert("电流：43-400");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 134 && fgas == 202){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<125 || fini_ele>400 || fweld_ele<125 || fweld_ele>400 || farc_ele<125 || farc_ele>400){
						alert("电流： 125-400");
						return false;
					}
				}else{
					if(fweld_ele<125 || fweld_ele>400){
						alert("电流： 125-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<35 || fini_ele>400 || fweld_ele<35 || fweld_ele>400 || farc_ele<35 || farc_ele>400){
						alert("电流：35-400");
						return false;
					}
				}else{
					if(fweld_ele<35 || fweld_ele>400){
						alert("电流：35-400");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<43 || fini_ele>400 || fweld_ele<43 || fweld_ele>400 || farc_ele<43 || farc_ele>400){
						alert("电流：43-400");
						return false;
					}
				}else{
					if(fweld_ele<43 || fweld_ele>400){
						alert("电流：43-400");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 134 && fgas == 203){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<130 || fini_ele>400 || fweld_ele<130 || fweld_ele>400 || farc_ele<130 || farc_ele>400){
						alert("电流：130-400");
						return false;
					}
				}else{
					if(fweld_ele<130 || fweld_ele>400){
						alert("电流：130-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<35 || fini_ele>400 || fweld_ele<35 || fweld_ele>400 || farc_ele<35 || farc_ele>400){
						alert("电流：35-400");
						return false;
					}
				}else{
					if(fweld_ele<35 || fweld_ele>400){
						alert("电流：35-400");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<43 || fini_ele>400 || fweld_ele<43 || fweld_ele>400 || farc_ele<43 || farc_ele>400){
						alert("电流：43-400");
						return false;
					}
				}else{
					if(fweld_ele<43 || fweld_ele>400){
						alert("电流：43-400");
						return false;
					}
				}
			}
		}else if (fmaterial == 251 && fdiameter == 135 && fgas == 204){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<53 || fini_ele>245 || fweld_ele<53 || fweld_ele>245 || farc_ele<53 || farc_ele>245){
						alert("电流：53-245");
						return false;
					}
				}else{
					if(fweld_ele<53 || fweld_ele>245){
						alert("电流：53-245");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<18 || fini_ele>200 || fweld_ele<18 || fweld_ele>200 || farc_ele<18 || farc_ele>200){
						alert("电流：18-200");
						return false;
					}
				}else{
					if(fweld_ele<18 || fweld_ele>200){
						alert("电流：18-200");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<22 || fini_ele>166 || fweld_ele<22 || fweld_ele>166 || farc_ele<22 || farc_ele>166){
						alert("电流：22-166");
						return false;
					}
				}else{
					if(fweld_ele<22 || fweld_ele>166){
						alert("电流：22-166");
						return false;
					}
				}
			}
		}else if (fmaterial == 251 && fdiameter == 131 && fgas == 204){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<54 || fini_ele>395 || fweld_ele<54 || fweld_ele>395 || farc_ele<54 || farc_ele>395){
						alert("电流：54-395");
						return false;
					}
				}else{
					if(fweld_ele<54 || fweld_ele>395){
						alert("电流：54-395");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<35 || fini_ele>260 || fweld_ele<35 || fweld_ele>260 || farc_ele<35 || farc_ele>260){
						alert("电流：35-260");
						return false;
					}
				}else{
					if(fweld_ele<35 || fweld_ele>260){
						alert("电流：35-260");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<43 || fini_ele>216 || fweld_ele<43 || fweld_ele>216 || farc_ele<43 || farc_ele>216){
						alert("电流：43-216");
						return false;
					}
				}else{
					if(fweld_ele<43 || fweld_ele>216){
						alert("电流：43-216");
						return false;
					}
				}
			}
		}else if (fmaterial == 251 && fdiameter == 131 && fgas == 205){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<45 || fini_ele>330 || fweld_ele<45 || fweld_ele>330 || farc_ele<45 || farc_ele>330){
						alert("电流：45-330");
						return false;
					}
				}else{
					if(fweld_ele<45 || fweld_ele>330){
						alert("电流：45-330");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<18 || fini_ele>320 || fweld_ele<18 || fweld_ele>320 || farc_ele<18 || farc_ele>320){
						alert("电流：18-320");
						return false;
					}
				}else{
					if(fweld_ele<18 || fweld_ele>320){
						alert("电流：18-320");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<22 || fini_ele>266 || fweld_ele<22 || fweld_ele>266 || farc_ele<22 || farc_ele>266){
						alert("电流：22-266");
						return false;
					}
				}else{
					if(fweld_ele<22 || fweld_ele>266){
						alert("电流：22-266");
						return false;
					}
				}
			}
		}else if (fmaterial == 251 && fdiameter == 132 && fgas == 204){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<75 || fini_ele>400 || fweld_ele<75 || fweld_ele>400 || farc_ele<75 || farc_ele>400){
						alert("电流：75-400");
						return false;
					}
				}else{
					if(fweld_ele<75 || fweld_ele>400){
						alert("电流：75-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<45 || fini_ele>335 || fweld_ele<45 || fweld_ele>335 || farc_ele<45 || farc_ele>335){
						alert("电流：45-335");
						return false;
					}
				}else{
					if(fweld_ele<45 || fweld_ele>335){
						alert("电流：45-335");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<56 || fini_ele>279 || fweld_ele<56 || fweld_ele>279 || farc_ele<56 || farc_ele>279){
						alert("电流：56-279");
						return false;
					}
				}else{
					if(fweld_ele<56 || fweld_ele>279){
						alert("电流：56-279");
						return false;
					}
				}
			}
		}else if (fmaterial == 251 && fdiameter == 132 && fgas == 205){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<66 || fini_ele>346 || fweld_ele<66 || fweld_ele>346 || farc_ele<66 || farc_ele>346){
						alert("电流：66-346");
						return false;
					}
				}else{
					if(fweld_ele<66 || fweld_ele>346){
						alert("电流：66-346");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<29 || fini_ele>390 || fweld_ele<29 || fweld_ele>390 || farc_ele<29 || farc_ele>390){
						alert("电流：29-390");
						return false;
					}
				}else{
					if(fweld_ele<29 || fweld_ele>390){
						alert("电流：29-390");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<36 || fini_ele>325 || fweld_ele<36 || fweld_ele>325 || farc_ele<36 || farc_ele>325){
						alert("电流：36-325");
						return false;
					}
				}else{
					if(fweld_ele<36 || fweld_ele>325){
						alert("电流：36-325");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 131 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<46 || fini_ele>245 || fweld_ele<46 || fweld_ele>245 || farc_ele<46 || farc_ele>245){
						alert("电流：46-245");
						return false;
					}
				}else{
					if(fweld_ele<46 || fweld_ele>245){
						alert("电流：46-245");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<28 || fini_ele>260 || fweld_ele<28 || fweld_ele>260 || farc_ele<28 || farc_ele>260){
						alert("电流：28-260");
						return false;
					}
				}else{
					if(fweld_ele<28 || fweld_ele>260){
						alert("电流：28-260");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<35 || fini_ele>216 || fweld_ele<35 || fweld_ele>216 || farc_ele<35 || farc_ele>216){
						alert("电流：35-216");
						return false;
					}
				}else{
					if(fweld_ele<35 || fweld_ele>216){
						alert("电流：35-216");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 131 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<54 || fini_ele>270 || fweld_ele<54 || fweld_ele>270 || farc_ele<54 || farc_ele>270){
						alert("电流：54-270");
						return false;
					}
				}else{
					if(fweld_ele<54 || fweld_ele>270){
						alert("电流：54-270");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<24 || fini_ele>245 || fweld_ele<24 || fweld_ele>245 || farc_ele<2524 || farc_ele>245){
						alert("电流：24-245");
						return false;
					}
				}else{
					if(fweld_ele<24 || fweld_ele>245){
						alert("电流：24-245");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<30 || fini_ele>204 || fweld_ele<30 || fweld_ele>204 || farc_ele<30 || farc_ele>204){
						alert("电流：30-204");
						return false;
					}
				}else{
					if(fweld_ele<30 || fweld_ele>204){
						alert("电流：30-204");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 132 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<82 || fini_ele>300 || fweld_ele<82 || fweld_ele>300 || farc_ele<82 || farc_ele>300){
						alert("电流：82-300");
						return false;
					}
				}else{
					if(fweld_ele<82 || fweld_ele>300){
						alert("电流：82-300");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<35 || fini_ele>270 || fweld_ele<35 || fweld_ele>270 || farc_ele<35 || farc_ele>270){
						alert("电流：35-270");
						return false;
					}
				}else{
					if(fweld_ele<35 || fweld_ele>270){
						alert("电流：35-270");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<43 || fini_ele>225 || fweld_ele<43 || fweld_ele>225 || farc_ele<43 || farc_ele>225){
						alert("电流：43-225");
						return false;
					}
				}else{
					if(fweld_ele<43 || fweld_ele>225){
						alert("电流：43-225");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 132 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<92 || fini_ele>300 || fweld_ele<92 || fweld_ele>300 || farc_ele<92 || farc_ele>300){
						alert("电流：92-300");
						return false;
					}
				}else{
					if(fweld_ele<92 || fweld_ele>300){
						alert("电流：92-300");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<38 || fini_ele>265 || fweld_ele<38 || fweld_ele>265 || farc_ele<38 || farc_ele>265){
						alert("电流：38-265");
						return false;
					}
				}else{
					if(fweld_ele<38 || fweld_ele>265){
						alert("电流：38-265");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<47 || fini_ele>220 || fweld_ele<47 || fweld_ele>220 || farc_ele<47 || farc_ele>220){
						alert("电流：47-220");
						return false;
					}
				}else{
					if(fweld_ele<47 || fweld_ele>220){
						alert("电流：47-220");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 134 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<110 || fini_ele>320 || fweld_ele<110 || fweld_ele>320 || farc_ele<110 || farc_ele>320){
						alert("电流： 110-320");
						return false;
					}
				}else{
					if(fweld_ele<110 || fweld_ele>320){
						alert("电流： 110-320");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<61 || fini_ele>344 || fweld_ele<61 || fweld_ele>344 || farc_ele<61 || farc_ele>344){
						alert("电流：61-344");
						return false;
					}
				}else{
					if(fweld_ele<61 || fweld_ele>344){
						alert("电流：61-344");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<76 || fini_ele>286 || fweld_ele<76 || fweld_ele>286 || farc_ele<76 || farc_ele>286){
						alert("电流：76-286");
						return false;
					}
				}else{
					if(fweld_ele<76 || fweld_ele>286){
						alert("电流：76-286");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 134 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<98 || fini_ele>385 || fweld_ele<98 || fweld_ele>385 || farc_ele<98 || farc_ele>385){
						alert("电流：98-385");
						return false;
					}
				}else{
					if(fweld_ele<98 || fweld_ele>385){
						alert("电流：98-385");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<55 || fini_ele>335 || fweld_ele<55 || fweld_ele>335 || farc_ele<55 || farc_ele>335){
						alert("电流：55-335");
						return false;
					}
				}else{
					if(fweld_ele<55 || fweld_ele>335){
						alert("电流：55-335");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<68 || fini_ele>279 || fweld_ele<68 || fweld_ele>279 || farc_ele<68 || farc_ele>279){
						alert("电流：68-279");
						return false;
					}
				}else{
					if(fweld_ele<68 || fweld_ele>279){
						alert("电流：68-279");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 131 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<55 || fini_ele>220 || fweld_ele<55 || fweld_ele>220 || farc_ele<55 || farc_ele>220){
						alert("电流：55-220");
						return false;
					}
				}else{
					if(fweld_ele<55 || fweld_ele>220){
						alert("电流：55-220");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<20 || fini_ele>185 || fweld_ele<20 || fweld_ele>185 || farc_ele<20 || farc_ele>185){
						alert("电流：20-185");
						return false;
					}
				}else{
					if(fweld_ele<20 || fweld_ele>185){
						alert("电流：20-185");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<25 || fini_ele>154 || fweld_ele<25 || fweld_ele>154 || farc_ele<25 || farc_ele>154){
						alert("电流：25-154");
						return false;
					}
				}else{
					if(fweld_ele<25 || fweld_ele>154){
						alert("电流：25-154");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 131 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>195 || fweld_ele<60 || fweld_ele>195 || farc_ele<60 || farc_ele>195){
						alert("电流：60-195");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>195){
						alert("电流：60-195");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<30 || fini_ele>200 || fweld_ele<30 || fweld_ele>200 || farc_ele<30 || farc_ele>200){
						alert("电流：30-200");
						return false;
					}
				}else{
					if(fweld_ele<30 || fweld_ele>200){
						alert("电流：30-200");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<37 || fini_ele>166 || fweld_ele<37 || fweld_ele>166 || farc_ele<37 || farc_ele>166){
						alert("电流：37-166");
						return false;
					}
				}else{
					if(fweld_ele<37 || fweld_ele>166){
						alert("电流：37-166");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 132 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<82 || fini_ele>260 || fweld_ele<82 || fweld_ele>260 || farc_ele<82 || farc_ele>260){
						alert("电流：82-260");
						return false;
					}
				}else{
					if(fweld_ele<82 || fweld_ele>260){
						alert("电流：82-260");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<35 || fini_ele>270 || fweld_ele<35 || fweld_ele>270 || farc_ele<35 || farc_ele>270){
						alert("电流：35-270");
						return false;
					}
				}else{
					if(fweld_ele<35 || fweld_ele>270){
						alert("电流：35-270");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<31 || fini_ele>175 || fweld_ele<31 || fweld_ele>175 || farc_ele<31 || farc_ele>175){
						alert("电流：31-175");
						return false;
					}
				}else{
					if(fweld_ele<31 || fweld_ele>175){
						alert("电流：31-175");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 132 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<87 || fini_ele>250 || fweld_ele<87 || fweld_ele>250 || farc_ele<87 || farc_ele>250){
						alert("电流：87-250");
						return false;
					}
				}else{
					if(fweld_ele<87 || fweld_ele>250){
						alert("电流：87-250");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<24 || fini_ele>231 || fweld_ele<24 || fweld_ele>231 || farc_ele<24 || farc_ele>231){
						alert("电流：24-231");
						return false;
					}
				}else{
					if(fweld_ele<24 || fweld_ele>231){
						alert("电流：24-231");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<30 || fini_ele>192 || fweld_ele<30 || fweld_ele>192 || farc_ele<30 || farc_ele>192){
						alert("电流：30-192");
						return false;
					}
				}else{
					if(fweld_ele<30 || fweld_ele>192){
						alert("电流：30-192");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 134 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<105 || fini_ele>290 || fweld_ele<105 || fweld_ele>290 || farc_ele<105 || farc_ele>290){
						alert("电流： 105-290");
						return false;
					}
				}else{
					if(fweld_ele<105 || fweld_ele>290){
						alert("电流： 105-290");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<58 || fini_ele>390 || fweld_ele<58 || fweld_ele>390 || farc_ele<58 || farc_ele>390){
						alert("电流：58-390");
						return false;
					}
				}else{
					if(fweld_ele<58 || fweld_ele>390){
						alert("电流：58-390");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<72 || fini_ele>325 || fweld_ele<72 || fweld_ele>325 || farc_ele<72 || farc_ele>325){
						alert("电流：72-325");
						return false;
					}
				}else{
					if(fweld_ele<72 || fweld_ele>325){
						alert("电流：72-325");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 134 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<124 || fini_ele>265 || fweld_ele<124 || fweld_ele>265 || farc_ele<124 || farc_ele>265){
						alert("电流： 124-265");
						return false;
					}
				}else{
					if(fweld_ele<124 || fweld_ele>265){
						alert("电流： 124-265");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<65 || fini_ele>385 || fweld_ele<65 || fweld_ele>385 || farc_ele<65 || farc_ele>385){
						alert("电流：65-385");
						return false;
					}
				}else{
					if(fweld_ele<65 || fweld_ele>385){
						alert("电流：65-385");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<81 || fini_ele>320 || fweld_ele<81 || fweld_ele>320 || farc_ele<81 || farc_ele>320){
						alert("电流：81-320");
						return false;
					}
				}else{
					if(fweld_ele<81 || fweld_ele>320){
						alert("电流：81-320");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 135 && fgas == 208){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<45 || fini_ele>107 || fweld_ele<45 || fweld_ele>107 || farc_ele<45 || farc_ele>107){
						alert("电流：45-107");
						return false;
					}
				}else{
					if(fweld_ele<45 || fweld_ele>107){
						alert("电流：45-107");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<15 || fini_ele>180 || fweld_ele<15 || fweld_ele>180 || farc_ele<15 || farc_ele>180){
						alert("电流：15-180");
						return false;
					}
				}else{
					if(fweld_ele<15 || fweld_ele>180){
						alert("电流：15-180");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<18 || fini_ele>150 || fweld_ele<18 || fweld_ele>150 || farc_ele<18 || farc_ele>150){
						alert("电流：18-150");
						return false;
					}
				}else{
					if(fweld_ele<18 || fweld_ele>150){
						alert("电流：18-150");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 135 && fgas == 209){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>170 || fweld_ele<40 || fweld_ele>170 || farc_ele<40 || farc_ele>170){
						alert("电流：40-170");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>170){
						alert("电流：40-170");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>155 || fweld_ele<40 || fweld_ele>155 || farc_ele<40 || farc_ele>155){
						alert("电流：40-155");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>155){
						alert("电流：40-155");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<50 || fini_ele>129 || fweld_ele<50 || fweld_ele>129 || farc_ele<50 || farc_ele>129){
						alert("电流：50-129");
						return false;
					}
				}else{
					if(fweld_ele<50 || fweld_ele>129){
						alert("电流：50-129");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 135 && fgas == 212){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>170 || fweld_ele<40 || fweld_ele>170 || farc_ele<40 || farc_ele>170){
						alert("电流：40-170");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>170){
						alert("电流：40-170");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<15 || fini_ele>180 || fweld_ele<15 || fweld_ele>180 || farc_ele<15 || farc_ele>180){
						alert("电流：15-180");
						return false;
					}
				}else{
					if(fweld_ele<15 || fweld_ele>180){
						alert("电流：15-180");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<18 || fini_ele>150 || fweld_ele<18 || fweld_ele>150 || farc_ele<18 || farc_ele>150){
						alert("电流：18-150");
						return false;
					}
				}else{
					if(fweld_ele<18 || fweld_ele>150){
						alert("电流：18-150");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 135 && fgas == 213){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>170 || fweld_ele<40 || fweld_ele>170 || farc_ele<40 || farc_ele>170){
						alert("电流：40-170");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>170){
						alert("电流：40-170");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<15 || fini_ele>180 || fweld_ele<15 || fweld_ele>180 || farc_ele<15 || farc_ele>180){
						alert("电流：15-180");
						return false;
					}
				}else{
					if(fweld_ele<15 || fweld_ele>180){
						alert("电流：15-180");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<18 || fini_ele>150 || fweld_ele<18 || fweld_ele>150 || farc_ele<18 || farc_ele>150){
						alert("电流：18-150");
						return false;
					}
				}else{
					if(fweld_ele<18 || fweld_ele>150){
						alert("电流：18-150");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 131 && fgas == 208){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>135 || fweld_ele<60 || fweld_ele>135 || farc_ele<60 || farc_ele>135){
						alert("电流：60-135");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>135){
						alert("电流：60-135");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>175 || fweld_ele<40 || fweld_ele>175 || farc_ele<40 || farc_ele>175){
						alert("电流：40-175");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>175){
						alert("电流：40-175");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<50 || fini_ele>145 || fweld_ele<50 || fweld_ele>145 || farc_ele<50 || farc_ele>145){
						alert("电流：50-145");
						return false;
					}
				}else{
					if(fweld_ele<50 || fweld_ele>145){
						alert("电流：50-145");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 131 && fgas == 209){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<70 || fini_ele>155 || fweld_ele<70 || fweld_ele>155 || farc_ele<70 || farc_ele>155){
						alert("电流：70-155");
						return false;
					}
				}else{
					if(fweld_ele<70 || fweld_ele>155){
						alert("电流：70-155");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>200 || fweld_ele<40 || fweld_ele>200 || farc_ele<40 || farc_ele>200){
						alert("电流：40-200");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>200){
						alert("电流：40-200");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<50 || fini_ele>166 || fweld_ele<50 || fweld_ele>166 || farc_ele<50 || farc_ele>166){
						alert("电流：50-166");
						return false;
					}
				}else{
					if(fweld_ele<50 || fweld_ele>166){
						alert("电流：50-166");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 131 && fgas == 212){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<57 || fini_ele>145 || fweld_ele<57 || fweld_ele>145 || farc_ele<57 || farc_ele>145){
						alert("电流：57-145");
						return false;
					}
				}else{
					if(fweld_ele<57 || fweld_ele>145){
						alert("电流：57-145");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<25 || fini_ele>330 || fweld_ele<25 || fweld_ele>330 || farc_ele<25 || farc_ele>330){
						alert("电流：25-330");
						return false;
					}
				}else{
					if(fweld_ele<25 || fweld_ele>330){
						alert("电流：25-330");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<31 || fini_ele>275 || fweld_ele<31 || fweld_ele>275 || farc_ele<31 || farc_ele>275){
						alert("电流：31-275");
						return false;
					}
				}else{
					if(fweld_ele<31 || fweld_ele>275){
						alert("电流：31-275");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 131 && fgas == 213){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<80 || fini_ele>165 || fweld_ele<80 || fweld_ele>165 || farc_ele<80 || farc_ele>165){
						alert("电流：80-165");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>165){
						alert("电流：80-165");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<31 || fini_ele>150 || fweld_ele<31 || fweld_ele>150 || farc_ele<31 || farc_ele>150){
						alert("电流：31-150");
						return false;
					}
				}else{
					if(fweld_ele<31 || fweld_ele>150){
						alert("电流：31-150");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<38 || fini_ele>125 || fweld_ele<38 || fweld_ele>125 || farc_ele<38 || farc_ele>125){
						alert("电流：38-125");
						return false;
					}
				}else{
					if(fweld_ele<38 || fweld_ele>125){
						alert("电流：38-125");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 132 && fgas == 208){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<95 || fini_ele>215 || fweld_ele<95 || fweld_ele>215 || farc_ele<95 || farc_ele>215){
						alert("电流：95-215");
						return false;
					}
				}else{
					if(fweld_ele<95 || fweld_ele>215){
						alert("电流：95-215");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>213 || fweld_ele<60 || fweld_ele>213 || farc_ele<60 || farc_ele>213){
						alert("电流：60-213");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>213){
						alert("电流：60-213");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<75 || fini_ele>177 || fweld_ele<75 || fweld_ele>177 || farc_ele<75 || farc_ele>177){
						alert("电流：75-177");
						return false;
					}
				}else{
					if(fweld_ele<75 || fweld_ele>177){
						alert("电流：75-177");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 132 && fgas == 209){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<95 || fini_ele>245 || fweld_ele<95 || fweld_ele>245 || farc_ele<95 || farc_ele>245){
						alert("电流：95-245");
						return false;
					}
				}else{
					if(fweld_ele<95 || fweld_ele>245){
						alert("电流：95-245");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<50 || fini_ele>250 || fweld_ele<50 || fweld_ele>250 || farc_ele<50 || farc_ele>250){
						alert("电流：50-250");
						return false;
					}
				}else{
					if(fweld_ele<50 || fweld_ele>250){
						alert("电流：50-250");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<62 || fini_ele>208 || fweld_ele<62 || fweld_ele>208 || farc_ele<62 || farc_ele>208){
						alert("电流：62-208");
						return false;
					}
				}else{
					if(fweld_ele<62 || fweld_ele>208){
						alert("电流：62-208");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 132 && fgas == 212){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<72 || fini_ele>225 || fweld_ele<72 || fweld_ele>225 || farc_ele<72 || farc_ele>225){
						alert("电流：72-225");
						return false;
					}
				}else{
					if(fweld_ele<72 || fweld_ele>225){
						alert("电流：72-225");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<32 || fini_ele>360 || fweld_ele<32 || fweld_ele>360 || farc_ele<32 || farc_ele>360){
						alert("电流：32-360");
						return false;
					}
				}else{
					if(fweld_ele<32 || fweld_ele>360){
						alert("电流：32-360");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>300 || fweld_ele<40 || fweld_ele>300 || farc_ele<40 || farc_ele>300){
						alert("电流：40-300");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>300){
						alert("电流：40-300");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 132 && fgas == 213){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<100 || fini_ele>255 || fweld_ele<100 || fweld_ele>255 || farc_ele<100 || farc_ele>255){
						alert("电流： 100-255");
						return false;
					}
				}else{
					if(fweld_ele<100 || fweld_ele>255){
						alert("电流： 100-255");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<32 || fini_ele>360 || fweld_ele<32 || fweld_ele>360 || farc_ele<32 || farc_ele>360){
						alert("电流：32-360");
						return false;
					}
				}else{
					if(fweld_ele<32 || fweld_ele>360){
						alert("电流：32-360");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>300 || fweld_ele<40 || fweld_ele>300 || farc_ele<40 || farc_ele>300){
						alert("电流：40-300");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>300){
						alert("电流：40-300");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 131 && fgas == 210){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>135 || fweld_ele<60 || fweld_ele>135 || farc_ele<60 || farc_ele>135){
						alert("电流：60-135");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>135){
						alert("电流：60-135");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>175 || fweld_ele<40 || fweld_ele>175 || farc_ele<40 || farc_ele>175){
						alert("电流：40-175");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>175){
						alert("电流：40-175");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<50 || fini_ele>145 || fweld_ele<50 || fweld_ele>145 || farc_ele<50 || farc_ele>145){
						alert("电流：50-145");
						return false;
					}
				}else{
					if(fweld_ele<50 || fweld_ele>145){
						alert("电流：50-145");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 131 && fgas == 211){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<75 || fini_ele>385 || fweld_ele<75 || fweld_ele>385 || farc_ele<75 || farc_ele>385){
						alert("电流：75-385");
						return false;
					}
				}else{
					if(fweld_ele<75 || fweld_ele>385){
						alert("电流：75-385");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<56 || fini_ele>345 || fweld_ele<56 || fweld_ele>345 || farc_ele<56 || farc_ele>345){
						alert("电流：56-345");
						return false;
					}
				}else{
					if(fweld_ele<56 || fweld_ele>345){
						alert("电流：56-345");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<70 || fini_ele>287 || fweld_ele<70 || fweld_ele>287 || farc_ele<70 || farc_ele>287){
						alert("电流：70-287");
						return false;
					}
				}else{
					if(fweld_ele<70 || fweld_ele>287){
						alert("电流：70-287");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 132 && fgas == 210){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<119 || fini_ele>400 || fweld_ele<119 || fweld_ele>400 || farc_ele<119 || farc_ele>400){
						alert("电流： 119-400");
						return false;
					}
				}else{
					if(fweld_ele<119 || fweld_ele>400){
						alert("电流： 119-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>400 || fweld_ele<60 || fweld_ele>400 || farc_ele<60 || farc_ele>400){
						alert("电流：60-400");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>400){
						alert("电流：60-400");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<75 || fini_ele>383 || fweld_ele<75 || fweld_ele>383 || farc_ele<75 || farc_ele>383){
						alert("电流：75-383");
						return false;
					}
				}else{
					if(fweld_ele<75 || fweld_ele>383){
						alert("电流：75-383");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 132 && fgas == 211){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<80 || fini_ele>400 || fweld_ele<80 || fweld_ele>400 || farc_ele<80 || farc_ele>400){
						alert("电流：80-400");
						return false;
					}
				}else{
					if(fweld_ele<80 || fweld_ele>400){
						alert("电流：80-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<72 || fini_ele>400 || fweld_ele<72 || fweld_ele>400 || farc_ele<72 || farc_ele>400){
						alert("电流：72-400");
						return false;
					}
				}else{
					if(fweld_ele<72 || fweld_ele>400){
						alert("电流：72-400");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<90 || fini_ele>339 || fweld_ele<90 || fweld_ele>339 || farc_ele<90 || 339>175){
						alert("电流：90-339");
						return false;
					}
				}else{
					if(fweld_ele<90 || fweld_ele>339){
						alert("电流：90-339");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 134 && fgas == 210){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<90 || fini_ele>400 || fweld_ele<90 || fweld_ele>400 || farc_ele<90 || farc_ele>400){
						alert("电流：90-400");
						return false;
					}
				}else{
					if(fweld_ele<90 || fweld_ele>400){
						alert("电流：90-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<90 || fini_ele>400 || fweld_ele<90 || fweld_ele>400 || farc_ele<90 || farc_ele>400){
						alert("电流：90-400");
						return false;
					}
				}else{
					if(fweld_ele<90 || fweld_ele>400){
						alert("电流：90-400");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<112 || fini_ele>383 || fweld_ele<112 || fweld_ele>383 || farc_ele<112 || farc_ele>383){
						alert("电流：112-383");
						return false;
					}
				}else{
					if(fweld_ele<112 || fweld_ele>383){
						alert("电流：112-383");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 134 && fgas == 211){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<132 || fini_ele>400 || fweld_ele<132 || fweld_ele>400 || farc_ele<60 || farc_ele>400){
						alert("电流： 132-400");
						return false;
					}
				}else{
					if(fweld_ele<132 || fweld_ele>400){
						alert("电流： 132-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<95 || fini_ele>400 || fweld_ele<95 || fweld_ele>400 || farc_ele<95 || farc_ele>400){
						alert("电流：95-400");
						return false;
					}
				}else{
					if(fweld_ele<95 || fweld_ele>400){
						alert("电流：95-400");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<118 || fini_ele>400 || fweld_ele<118 || fweld_ele>400 || farc_ele<118 || farc_ele>400){
						alert("电流：118-400");
						return false;
					}
				}else{
					if(fweld_ele<118 || fweld_ele>400){
						alert("电流：118-400");
						return false;
					}
				}
			}
		}else if (fmaterial == 256 && fdiameter == 131 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<102 || fini_ele>330 || fweld_ele<102 || fweld_ele>330 || farc_ele<102 || farc_ele>330){
						alert("电流： 102-330");
						return false;
					}
				}else{
					if(fweld_ele<102 || fweld_ele>330){
						alert("电流： 102-330");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>305 || fweld_ele<60 || fweld_ele>305 || farc_ele<60 || farc_ele>305){
						alert("电流：60-305");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>305){
						alert("电流：60-305");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<75 || fini_ele>254 || fweld_ele<75 || fweld_ele>254 || farc_ele<75 || farc_ele>254){
						alert("电流：75-254");
						return false;
					}
				}else{
					if(fweld_ele<75 || fweld_ele>254){
						alert("电流：75-254");
						return false;
					}
				}
			}
		}else if (fmaterial == 256 && fdiameter == 132 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<79 || fini_ele>375 || fweld_ele<79 || fweld_ele>375 || farc_ele<79 || farc_ele>375){
						alert("电流：79-375");
						return false;
					}
				}else{
					if(fweld_ele<79 || fweld_ele>375){
						alert("电流：79-375");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<70 || fini_ele>400 || fweld_ele<70 || fweld_ele>400 || farc_ele<70 || farc_ele>400){
						alert("电流：70-400");
						return false;
					}
				}else{
					if(fweld_ele<70 || fweld_ele>400){
						alert("电流：70-400");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<87 || fini_ele>358 || fweld_ele<87 || fweld_ele>358 || farc_ele<87 || farc_ele>358){
						alert("电流：87-358");
						return false;
					}
				}else{
					if(fweld_ele<87 || fweld_ele>358){
						alert("电流：87-358");
						return false;
					}
				}
			}
		}else if (fmaterial == 256 && fdiameter == 134 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<125 || fini_ele>400 || fweld_ele<125 || fweld_ele>400 || farc_ele<125 || farc_ele>400){
						alert("电流：125-400");
						return false;
					}
				}else{
					if(fweld_ele<125 || fweld_ele>400){
						alert("电流：125-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<85 || fini_ele>400 || fweld_ele<85 || fweld_ele>400 || farc_ele<85 || farc_ele>400){
						alert("电流：85-400");
						return false;
					}
				}else{
					if(fweld_ele<85 || fweld_ele>400){
						alert("电流：85-400");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<106 || fini_ele>383 || fweld_ele<106 || fweld_ele>383 || farc_ele<106 || farc_ele>383){
						alert("电流：106-383");
						return false;
					}
				}else{
					if(fweld_ele<106 || fweld_ele>383){
						alert("电流：106-383");
						return false;
					}
				}
			}
		}
	}else if(machineModel == 187){    //500DP
		if (fmaterial == 250 && fdiameter == 135 && fgas == 200){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>185 || fweld_ele<60 || fweld_ele>185 || farc_ele<60 || farc_ele>185){
						alert("电流：60-185");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>185){
						alert("电流：60-185");
						return false;
					}
				}
			}else if(fselect == 103){
				
			}else if(fselect == 104){
				
			}
		}else if (fmaterial == 250 && fdiameter == 135 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<68 || fini_ele>230 || fweld_ele<68 || fweld_ele>230 || farc_ele<68 || farc_ele>230){
						alert("电流：68-230");
						return false;
					}
				}else{
					if(fweld_ele<68 || fweld_ele>230){
						alert("电流：68-230");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<25 || fini_ele>210 || fweld_ele<25 || fweld_ele>210 || farc_ele<25 || farc_ele>210){
						alert("电流：25-210");
						return false;
					}
				}else{
					if(fweld_ele<25 || fweld_ele>210){
						alert("电流：25-210");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<31 || fini_ele>175 || fweld_ele<31 || fweld_ele>175 || farc_ele<31 || farc_ele>175){
						alert("电流：31-175");
						return false;
					}
				}else{
					if(fweld_ele<68 || fweld_ele>175){
						alert("电流：31-175");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 135 && fgas == 202){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<62 || fini_ele>225 || fweld_ele<62 || fweld_ele>225 || farc_ele<62 || farc_ele>225){
						alert("电流：62-225");
						return false;
					}
				}else{
					if(fweld_ele<62 || fweld_ele>225){
						alert("电流：62-225");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<28 || fini_ele>210 || fweld_ele<28 || fweld_ele>210 || farc_ele<28 || farc_ele>210){
						alert("电流：28-210");
						return false;
					}
				}else{
					if(fweld_ele<28 || fweld_ele>210){
						alert("电流：28-210");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<35 || fini_ele>175 || fweld_ele<35 || fweld_ele>175 || farc_ele<35 || farc_ele>175){
						alert("电流：35-175");
						return false;
					}
				}else{
					if(fweld_ele<35 || fweld_ele>175){
						alert("电流：35-175");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 135 && fgas == 203){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<65 || fini_ele>230 || fweld_ele<65 || fweld_ele>230 || farc_ele<65 || farc_ele>230){
						alert("电流：65-230");
						return false;
					}
				}else{
					if(fweld_ele<65 || fweld_ele>230){
						alert("电流：65-230");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<24 || fini_ele>200 || fweld_ele<24 || fweld_ele>200 || farc_ele<24 || farc_ele>200){
						alert("电流：24-200");
						return false;
					}
				}else{
					if(fweld_ele<24 || fweld_ele>200){
						alert("电流：24-200");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<30 || fini_ele>166 || fweld_ele<30 || fweld_ele>166 || farc_ele<30 || farc_ele>166){
						alert("电流：30-166");
						return false;
					}
				}else{
					if(fweld_ele<30 || fweld_ele>166){
						alert("电流：30-166");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 131 && fgas == 200){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<55 || fini_ele>375 || fweld_ele<55 || fweld_ele>375 || farc_ele<55 || farc_ele>375){
						alert("电流：55-375");
						return false;
					}
				}else{
					if(fweld_ele<55 || fweld_ele>375){
						alert("电流：55-375");
						return false;
					}
				}
			}else if(fselect == 103){
				
			}else if(fselect == 104){
				
			}
		}else if (fmaterial == 250 && fdiameter == 131 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<68 || fini_ele>375 || fweld_ele<68 || fweld_ele>375 || farc_ele<68 || farc_ele>375){
						alert("电流：68-375");
						return false;
					}
				}else{
					if(fweld_ele<68 || fweld_ele>375){
						alert("电流：68-375");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>335 || fweld_ele<40 || fweld_ele>335 || farc_ele<40 || farc_ele>335){
						alert("电流：40-335");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>335){
						alert("电流：40-335");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<50 || fini_ele>279 || fweld_ele<50 || fweld_ele>279 || farc_ele<50 || farc_ele>279){
						alert("电流：50-279");
						return false;
					}
				}else{
					if(fweld_ele<50 || fweld_ele>279){
						alert("电流：50-279");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 131 && fgas == 202){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<65 || fini_ele>380 || fweld_ele<65 || fweld_ele>380 || farc_ele<65 || farc_ele>380){
						alert("电流：65-380");
						return false;
					}
				}else{
					if(fweld_ele<65 || fweld_ele>380){
						alert("电流：65-380");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>340 || fweld_ele<40 || fweld_ele>340 || farc_ele<40 || farc_ele>340){
						alert("电流：40-340");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>340){
						alert("电流：40-340");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<50 || fini_ele>283 || fweld_ele<50 || fweld_ele>283 || farc_ele<50 || farc_ele>283){
						alert("电流：50-283");
						return false;
					}
				}else{
					if(fweld_ele<50 || fweld_ele>283){
						alert("电流：50-283");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 131 && fgas == 203){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<66 || fini_ele>360 || fweld_ele<66 || fweld_ele>360 || farc_ele<66 || farc_ele>360){
						alert("电流：66-360");
						return false;
					}
				}else{
					if(fweld_ele<66 || fweld_ele>360){
						alert("电流：66-360");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<42 || fini_ele>325 || fweld_ele<42 || fweld_ele>325 || farc_ele<42 || farc_ele>325){
						alert("电流：42-325");
						return false;
					}
				}else{
					if(fweld_ele<42 || fweld_ele>325){
						alert("电流：42-325");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<52 || fini_ele>270 || fweld_ele<52 || fweld_ele>270 || farc_ele<52 || farc_ele>270){
						alert("电流：52-270");
						return false;
					}
				}else{
					if(fweld_ele<52 || fweld_ele>270){
						alert("电流：52-270");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 132 && fgas == 200){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<96 || fini_ele>400 || fweld_ele<96 || fweld_ele>400 || farc_ele<96 || farc_ele>400){
						alert("电流：96-400");
						return false;
					}
				}else{
					if(fweld_ele<96 || fweld_ele>400){
						alert("电流：96-400");
						return false;
					}
				}
			}else if(fselect == 103){

			}else if(fselect == 104){

			}
		}else if (fmaterial == 250 && fdiameter == 132 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<85 || fini_ele>400 || fweld_ele<85 || fweld_ele>400 || farc_ele<85 || farc_ele>400){
						alert("电流：85-400");
						return false;
					}
				}else{
					if(fweld_ele<85 || fweld_ele>400){
						alert("电流：85-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<55 || fini_ele>460 || fweld_ele<55 || fweld_ele>460 || farc_ele<55 || farc_ele>460){
						alert("电流：55-460");
						return false;
					}
				}else{
					if(fweld_ele<55 || fweld_ele>460){
						alert("电流：55-460");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<68 || fini_ele>383 || fweld_ele<68 || fweld_ele>383 || farc_ele<68 || farc_ele>383){
						alert("电流：68-383");
						return false;
					}
				}else{
					if(fweld_ele<68 || fweld_ele>383){
						alert("电流：68-383");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 132 && fgas == 202){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<85 || fini_ele>400 || fweld_ele<85 || fweld_ele>400 || farc_ele<85 || farc_ele>400){
						alert("电流：85-400");
						return false;
					}
				}else{
					if(fweld_ele<85 || fweld_ele>400){
						alert("电流：85-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>445 || fweld_ele<60 || fweld_ele>445 || farc_ele<60 || farc_ele>445){
						alert("电流：60-445");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>445){
						alert("电流：60-445");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<75 || fini_ele>370 || fweld_ele<75 || fweld_ele>370 || farc_ele<75 || farc_ele>370){
						alert("电流：75-370");
						return false;
					}
				}else{
					if(fweld_ele<75 || fweld_ele>370){
						alert("电流：75-370");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 132 && fgas == 203){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<82 || fini_ele>400 || fweld_ele<82 || fweld_ele>400 || farc_ele<82 || farc_ele>400){
						alert("电流：82-400");
						return false;
					}
				}else{
					if(fweld_ele<82 || fweld_ele>400){
						alert("电流：82-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<65 || fini_ele>425 || fweld_ele<65 || fweld_ele>425 || farc_ele<65 || farc_ele>425){
						alert("电流：65-425");
						return false;
					}
				}else{
					if(fweld_ele<65 || fweld_ele>425){
						alert("电流：65-425");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<81 || fini_ele>354 || fweld_ele<81 || fweld_ele>354 || farc_ele<81 || farc_ele>354){
						alert("电流：81-354");
						return false;
					}
				}else{
					if(fweld_ele<81 || fweld_ele>354){
						alert("电流：81-354");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 134 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<130 || fini_ele>400 || fweld_ele<130 || fweld_ele>400 || farc_ele<130 || farc_ele>400){
						alert("电流： 130-400");
						return false;
					}
				}else{
					if(fweld_ele<130 || fweld_ele>400){
						alert("电流： 130-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<35 || fini_ele>500 || fweld_ele<35 || fweld_ele>500 || farc_ele<35 || farc_ele>500){
						alert("电流：35-500");
						return false;
					}
				}else{
					if(fweld_ele<35 || fweld_ele>500){
						alert("电流：35-500");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<43 || fini_ele>416 || fweld_ele<43 || fweld_ele>416 || farc_ele<43 || farc_ele>416){
						alert("电流：43-416");
						return false;
					}
				}else{
					if(fweld_ele<43 || fweld_ele>416){
						alert("电流：43-416");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 134 && fgas == 202){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<125 || fini_ele>400 || fweld_ele<125 || fweld_ele>400 || farc_ele<125 || farc_ele>400){
						alert("电流： 125-400");
						return false;
					}
				}else{
					if(fweld_ele<125 || fweld_ele>400){
						alert("电流： 125-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<35 || fini_ele>500 || fweld_ele<35 || fweld_ele>500 || farc_ele<35 || farc_ele>500){
						alert("电流：35-500");
						return false;
					}
				}else{
					if(fweld_ele<35 || fweld_ele>500){
						alert("电流：35-500");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<43 || fini_ele>416 || fweld_ele<43 || fweld_ele>416 || farc_ele<43 || farc_ele>416){
						alert("电流：43-416");
						return false;
					}
				}else{
					if(fweld_ele<43 || fweld_ele>416){
						alert("电流：43-416");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 134 && fgas == 203){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<130 || fini_ele>400 || fweld_ele<130 || fweld_ele>400 || farc_ele<130 || farc_ele>400){
						alert("电流：130-400");
						return false;
					}
				}else{
					if(fweld_ele<130 || fweld_ele>400){
						alert("电流：130-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<35 || fini_ele>500 || fweld_ele<35 || fweld_ele>500 || farc_ele<35 || farc_ele>500){
						alert("电流：35-500");
						return false;
					}
				}else{
					if(fweld_ele<35 || fweld_ele>500){
						alert("电流：35-500");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<43 || fini_ele>416 || fweld_ele<43 || fweld_ele>416 || farc_ele<43 || farc_ele>416){
						alert("电流：43-416");
						return false;
					}
				}else{
					if(fweld_ele<43 || fweld_ele>416){
						alert("电流：43-416");
						return false;
					}
				}
			}
		}else if (fmaterial == 251 && fdiameter == 135 && fgas == 204){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<53 || fini_ele>245 || fweld_ele<53 || fweld_ele>245 || farc_ele<53 || farc_ele>245){
						alert("电流：53-245");
						return false;
					}
				}else{
					if(fweld_ele<53 || fweld_ele>245){
						alert("电流：53-245");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<18 || fini_ele>200 || fweld_ele<18 || fweld_ele>200 || farc_ele<18 || farc_ele>200){
						alert("电流：18-200");
						return false;
					}
				}else{
					if(fweld_ele<18 || fweld_ele>200){
						alert("电流：18-200");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<22 || fini_ele>166 || fweld_ele<22 || fweld_ele>166 || farc_ele<22 || farc_ele>166){
						alert("电流：22-166");
						return false;
					}
				}else{
					if(fweld_ele<22 || fweld_ele>166){
						alert("电流：22-166");
						return false;
					}
				}
			}
		}else if (fmaterial == 251 && fdiameter == 131 && fgas == 204){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<54 || fini_ele>395 || fweld_ele<54 || fweld_ele>395 || farc_ele<54 || farc_ele>395){
						alert("电流：54-395");
						return false;
					}
				}else{
					if(fweld_ele<54 || fweld_ele>395){
						alert("电流：54-395");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<35 || fini_ele>260 || fweld_ele<35 || fweld_ele>260 || farc_ele<35 || farc_ele>260){
						alert("电流：35-260");
						return false;
					}
				}else{
					if(fweld_ele<35 || fweld_ele>260){
						alert("电流：35-260");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<43 || fini_ele>216 || fweld_ele<43 || fweld_ele>216 || farc_ele<43 || farc_ele>216){
						alert("电流：43-216");
						return false;
					}
				}else{
					if(fweld_ele<43 || fweld_ele>216){
						alert("电流：43-216");
						return false;
					}
				}
			}
		}else if (fmaterial == 251 && fdiameter == 131 && fgas == 205){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<45 || fini_ele>330 || fweld_ele<45 || fweld_ele>330 || farc_ele<45 || farc_ele>330){
						alert("电流：45-330");
						return false;
					}
				}else{
					if(fweld_ele<45 || fweld_ele>330){
						alert("电流：45-330");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<18 || fini_ele>320 || fweld_ele<18 || fweld_ele>320 || farc_ele<18 || farc_ele>320){
						alert("电流：18-320");
						return false;
					}
				}else{
					if(fweld_ele<18 || fweld_ele>320){
						alert("电流：18-320");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<22 || fini_ele>266 || fweld_ele<22 || fweld_ele>266 || farc_ele<22 || farc_ele>266){
						alert("电流：22-266");
						return false;
					}
				}else{
					if(fweld_ele<22 || fweld_ele>266){
						alert("电流：22-266");
						return false;
					}
				}
			}
		}else if (fmaterial == 251 && fdiameter == 132 && fgas == 204){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<75 || fini_ele>400 || fweld_ele<75 || fweld_ele>400 || farc_ele<75 || farc_ele>400){
						alert("电流：75-400");
						return false;
					}
				}else{
					if(fweld_ele<75 || fweld_ele>400){
						alert("电流：75-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<45 || fini_ele>335 || fweld_ele<45 || fweld_ele>335 || farc_ele<45 || farc_ele>335){
						alert("电流：45-335");
						return false;
					}
				}else{
					if(fweld_ele<45 || fweld_ele>335){
						alert("电流：45-335");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<56 || fini_ele>279 || fweld_ele<56 || fweld_ele>279 || farc_ele<56 || farc_ele>279){
						alert("电流：56-279");
						return false;
					}
				}else{
					if(fweld_ele<56 || fweld_ele>279){
						alert("电流：56-279");
						return false;
					}
				}
			}
		}else if (fmaterial == 251 && fdiameter == 132 && fgas == 205){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<66 || fini_ele>346 || fweld_ele<66 || fweld_ele>346 || farc_ele<66 || farc_ele>346){
						alert("电流：66-346");
						return false;
					}
				}else{
					if(fweld_ele<66 || fweld_ele>346){
						alert("电流：66-346");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<29 || fini_ele>390 || fweld_ele<29 || fweld_ele>390 || farc_ele<29 || farc_ele>390){
						alert("电流：29-390");
						return false;
					}
				}else{
					if(fweld_ele<29 || fweld_ele>390){
						alert("电流：29-390");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<36 || fini_ele>325 || fweld_ele<36 || fweld_ele>325 || farc_ele<36 || farc_ele>325){
						alert("电流：36-325");
						return false;
					}
				}else{
					if(fweld_ele<36 || fweld_ele>325){
						alert("电流：36-325");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 131 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<46 || fini_ele>245 || fweld_ele<46 || fweld_ele>245 || farc_ele<46 || farc_ele>245){
						alert("电流：46-245");
						return false;
					}
				}else{
					if(fweld_ele<46 || fweld_ele>245){
						alert("电流：46-245");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<28 || fini_ele>260 || fweld_ele<28 || fweld_ele>260 || farc_ele<28 || farc_ele>260){
						alert("电流：28-260");
						return false;
					}
				}else{
					if(fweld_ele<28 || fweld_ele>260){
						alert("电流：28-260");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<35 || fini_ele>216 || fweld_ele<35 || fweld_ele>216 || farc_ele<35 || farc_ele>216){
						alert("电流：35-216");
						return false;
					}
				}else{
					if(fweld_ele<35 || fweld_ele>216){
						alert("电流：35-216");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 131 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<54 || fini_ele>270 || fweld_ele<54 || fweld_ele>270 || farc_ele<54 || farc_ele>270){
						alert("电流：54-270");
						return false;
					}
				}else{
					if(fweld_ele<54 || fweld_ele>270){
						alert("电流：54-270");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<24 || fini_ele>245 || fweld_ele<24 || fweld_ele>245 || farc_ele<2524 || farc_ele>245){
						alert("电流：24-245");
						return false;
					}
				}else{
					if(fweld_ele<24 || fweld_ele>245){
						alert("电流：24-245");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<30 || fini_ele>204 || fweld_ele<30 || fweld_ele>204 || farc_ele<30 || farc_ele>204){
						alert("电流：30-204");
						return false;
					}
				}else{
					if(fweld_ele<30 || fweld_ele>204){
						alert("电流：30-204");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 132 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<82 || fini_ele>300 || fweld_ele<82 || fweld_ele>300 || farc_ele<82 || farc_ele>300){
						alert("电流：82-300");
						return false;
					}
				}else{
					if(fweld_ele<82 || fweld_ele>300){
						alert("电流：82-300");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<35 || fini_ele>270 || fweld_ele<35 || fweld_ele>270 || farc_ele<35 || farc_ele>270){
						alert("电流：35-270");
						return false;
					}
				}else{
					if(fweld_ele<35 || fweld_ele>270){
						alert("电流：35-270");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<43 || fini_ele>225 || fweld_ele<43 || fweld_ele>225 || farc_ele<43 || farc_ele>225){
						alert("电流：43-225");
						return false;
					}
				}else{
					if(fweld_ele<43 || fweld_ele>225){
						alert("电流：43-225");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 132 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<92 || fini_ele>300 || fweld_ele<92 || fweld_ele>300 || farc_ele<92 || farc_ele>300){
						alert("电流：92-300");
						return false;
					}
				}else{
					if(fweld_ele<92 || fweld_ele>300){
						alert("电流：92-300");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<38 || fini_ele>265 || fweld_ele<38 || fweld_ele>265 || farc_ele<38 || farc_ele>265){
						alert("电流：38-265");
						return false;
					}
				}else{
					if(fweld_ele<38 || fweld_ele>265){
						alert("电流：38-265");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<47 || fini_ele>220 || fweld_ele<47 || fweld_ele>220 || farc_ele<47 || farc_ele>220){
						alert("电流：47-220");
						return false;
					}
				}else{
					if(fweld_ele<47 || fweld_ele>220){
						alert("电流：47-220");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 134 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<110 || fini_ele>320 || fweld_ele<110 || fweld_ele>320 || farc_ele<110 || farc_ele>320){
						alert("电流： 110-320");
						return false;
					}
				}else{
					if(fweld_ele<110 || fweld_ele>320){
						alert("电流： 110-320");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<61 || fini_ele>344 || fweld_ele<61 || fweld_ele>344 || farc_ele<61 || farc_ele>344){
						alert("电流：61-344");
						return false;
					}
				}else{
					if(fweld_ele<61 || fweld_ele>344){
						alert("电流：61-344");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<76 || fini_ele>286 || fweld_ele<76 || fweld_ele>286 || farc_ele<76 || farc_ele>286){
						alert("电流：76-286");
						return false;
					}
				}else{
					if(fweld_ele<76 || fweld_ele>286){
						alert("电流：76-286");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 134 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<98 || fini_ele>385 || fweld_ele<98 || fweld_ele>385 || farc_ele<98 || farc_ele>385){
						alert("电流：98-385");
						return false;
					}
				}else{
					if(fweld_ele<98 || fweld_ele>385){
						alert("电流：98-385");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<55 || fini_ele>335 || fweld_ele<55 || fweld_ele>335 || farc_ele<55 || farc_ele>335){
						alert("电流：55-335");
						return false;
					}
				}else{
					if(fweld_ele<55 || fweld_ele>335){
						alert("电流：55-335");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<68 || fini_ele>279 || fweld_ele<68 || fweld_ele>279 || farc_ele<68 || farc_ele>279){
						alert("电流：68-279");
						return false;
					}
				}else{
					if(fweld_ele<68 || fweld_ele>279){
						alert("电流：68-279");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 131 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<55 || fini_ele>220 || fweld_ele<55 || fweld_ele>220 || farc_ele<55 || farc_ele>220){
						alert("电流：55-220");
						return false;
					}
				}else{
					if(fweld_ele<55 || fweld_ele>220){
						alert("电流：55-220");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<20 || fini_ele>185 || fweld_ele<20 || fweld_ele>185 || farc_ele<20 || farc_ele>185){
						alert("电流：20-185");
						return false;
					}
				}else{
					if(fweld_ele<20 || fweld_ele>185){
						alert("电流：20-185");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<25 || fini_ele>154 || fweld_ele<25 || fweld_ele>154 || farc_ele<25 || farc_ele>154){
						alert("电流：25-154");
						return false;
					}
				}else{
					if(fweld_ele<25 || fweld_ele>154){
						alert("电流：25-154");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 131 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>195 || fweld_ele<60 || fweld_ele>195 || farc_ele<60 || farc_ele>195){
						alert("电流：60-195");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>195){
						alert("电流：60-195");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<30 || fini_ele>200 || fweld_ele<30 || fweld_ele>200 || farc_ele<30 || farc_ele>200){
						alert("电流：30-200");
						return false;
					}
				}else{
					if(fweld_ele<30 || fweld_ele>200){
						alert("电流：30-200");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<37 || fini_ele>166 || fweld_ele<37 || fweld_ele>166 || farc_ele<37 || farc_ele>166){
						alert("电流：37-166");
						return false;
					}
				}else{
					if(fweld_ele<37 || fweld_ele>166){
						alert("电流：37-166");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 132 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<82 || fini_ele>260 || fweld_ele<82 || fweld_ele>260 || farc_ele<82 || farc_ele>260){
						alert("电流：82-260");
						return false;
					}
				}else{
					if(fweld_ele<82 || fweld_ele>260){
						alert("电流：82-260");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<28 || fini_ele>324 || fweld_ele<28 || fweld_ele>324 || farc_ele<28 || farc_ele>324){
						alert("电流：28-324");
						return false;
					}
				}else{
					if(fweld_ele<28 || fweld_ele>324){
						alert("电流：28-324");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<35 || fini_ele>270 || fweld_ele<35 || fweld_ele>270 || farc_ele<35 || farc_ele>270){
						alert("电流：35-270");
						return false;
					}
				}else{
					if(fweld_ele<35 || fweld_ele>270){
						alert("电流：35-270");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 132 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<87 || fini_ele>250 || fweld_ele<87 || fweld_ele>250 || farc_ele<87 || farc_ele>250){
						alert("电流：87-250");
						return false;
					}
				}else{
					if(fweld_ele<87 || fweld_ele>250){
						alert("电流：87-250");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<24 || fini_ele>231 || fweld_ele<24 || fweld_ele>231 || farc_ele<24 || farc_ele>231){
						alert("电流：24-231");
						return false;
					}
				}else{
					if(fweld_ele<24 || fweld_ele>231){
						alert("电流：24-231");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<30 || fini_ele>192 || fweld_ele<30 || fweld_ele>192 || farc_ele<30 || farc_ele>192){
						alert("电流：30-192");
						return false;
					}
				}else{
					if(fweld_ele<30 || fweld_ele>192){
						alert("电流：30-192");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 134 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<105 || fini_ele>290 || fweld_ele<105 || fweld_ele>290 || farc_ele<105 || farc_ele>290){
						alert("电流： 105-290");
						return false;
					}
				}else{
					if(fweld_ele<105 || fweld_ele>290){
						alert("电流： 105-290");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<58 || fini_ele>390 || fweld_ele<58 || fweld_ele>390 || farc_ele<58 || farc_ele>390){
						alert("电流：58-390");
						return false;
					}
				}else{
					if(fweld_ele<58 || fweld_ele>390){
						alert("电流：58-390");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<72 || fini_ele>325 || fweld_ele<72 || fweld_ele>325 || farc_ele<72 || farc_ele>325){
						alert("电流：72-325");
						return false;
					}
				}else{
					if(fweld_ele<72 || fweld_ele>325){
						alert("电流：72-325");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 134 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<124 || fini_ele>265 || fweld_ele<124 || fweld_ele>265 || farc_ele<124 || farc_ele>265){
						alert("电流： 124-265");
						return false;
					}
				}else{
					if(fweld_ele<124 || fweld_ele>265){
						alert("电流： 124-265");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<65 || fini_ele>385 || fweld_ele<65 || fweld_ele>385 || farc_ele<65 || farc_ele>385){
						alert("电流：65-385");
						return false;
					}
				}else{
					if(fweld_ele<65 || fweld_ele>385){
						alert("电流：65-385");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<81 || fini_ele>320 || fweld_ele<81 || fweld_ele>320 || farc_ele<81 || farc_ele>320){
						alert("电流：81-320");
						return false;
					}
				}else{
					if(fweld_ele<81 || fweld_ele>320){
						alert("电流：81-320");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 135 && fgas == 208){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<45 || fini_ele>107 || fweld_ele<45 || fweld_ele>107 || farc_ele<45 || farc_ele>107){
						alert("电流：45-107");
						return false;
					}
				}else{
					if(fweld_ele<45 || fweld_ele>107){
						alert("电流：45-107");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<15 || fini_ele>180 || fweld_ele<15 || fweld_ele>180 || farc_ele<15 || farc_ele>180){
						alert("电流：15-180");
						return false;
					}
				}else{
					if(fweld_ele<15 || fweld_ele>180){
						alert("电流：15-180");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<18 || fini_ele>150 || fweld_ele<18 || fweld_ele>150 || farc_ele<18 || farc_ele>150){
						alert("电流：18-150");
						return false;
					}
				}else{
					if(fweld_ele<18 || fweld_ele>150){
						alert("电流：18-150");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 135 && fgas == 209){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>170 || fweld_ele<40 || fweld_ele>170 || farc_ele<40 || farc_ele>170){
						alert("电流：40-170");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>170){
						alert("电流：40-170");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>155 || fweld_ele<40 || fweld_ele>155 || farc_ele<40 || farc_ele>155){
						alert("电流：40-155");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>155){
						alert("电流：40-155");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<50 || fini_ele>129 || fweld_ele<50 || fweld_ele>129 || farc_ele<50 || farc_ele>129){
						alert("电流：50-129");
						return false;
					}
				}else{
					if(fweld_ele<50 || fweld_ele>129){
						alert("电流：50-129");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 135 && fgas == 212){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>170 || fweld_ele<40 || fweld_ele>170 || farc_ele<40 || farc_ele>170){
						alert("电流：40-170");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>170){
						alert("电流：40-170");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<15 || fini_ele>180 || fweld_ele<15 || fweld_ele>180 || farc_ele<15 || farc_ele>180){
						alert("电流：15-180");
						return false;
					}
				}else{
					if(fweld_ele<15 || fweld_ele>180){
						alert("电流：15-180");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<18 || fini_ele>150 || fweld_ele<18 || fweld_ele>150 || farc_ele<18 || farc_ele>150){
						alert("电流：18-150");
						return false;
					}
				}else{
					if(fweld_ele<18 || fweld_ele>150){
						alert("电流：18-150");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 135 && fgas == 213){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>170 || fweld_ele<40 || fweld_ele>170 || farc_ele<40 || farc_ele>170){
						alert("电流：40-170");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>170){
						alert("电流：40-170");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<15 || fini_ele>180 || fweld_ele<15 || fweld_ele>180 || farc_ele<15 || farc_ele>180){
						alert("电流：15-180");
						return false;
					}
				}else{
					if(fweld_ele<15 || fweld_ele>180){
						alert("电流：15-180");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<18 || fini_ele>150 || fweld_ele<18 || fweld_ele>150 || farc_ele<18 || farc_ele>150){
						alert("电流：18-150");
						return false;
					}
				}else{
					if(fweld_ele<18 || fweld_ele>150){
						alert("电流：18-150");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 131 && fgas == 208){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>135 || fweld_ele<60 || fweld_ele>135 || farc_ele<60 || farc_ele>135){
						alert("电流：60-135");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>135){
						alert("电流：60-135");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>175 || fweld_ele<40 || fweld_ele>175 || farc_ele<40 || farc_ele>175){
						alert("电流：40-175");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>175){
						alert("电流：40-175");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<50 || fini_ele>145 || fweld_ele<50 || fweld_ele>145 || farc_ele<50 || farc_ele>145){
						alert("电流：50-145");
						return false;
					}
				}else{
					if(fweld_ele<50 || fweld_ele>145){
						alert("电流：50-145");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 131 && fgas == 209){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<70 || fini_ele>155 || fweld_ele<70 || fweld_ele>155 || farc_ele<70 || farc_ele>155){
						alert("电流：70-155");
						return false;
					}
				}else{
					if(fweld_ele<70 || fweld_ele>155){
						alert("电流：70-155");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>200 || fweld_ele<40 || fweld_ele>200 || farc_ele<40 || farc_ele>200){
						alert("电流：40-200");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>200){
						alert("电流：40-200");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<50 || fini_ele>166 || fweld_ele<50 || fweld_ele>166 || farc_ele<50 || farc_ele>166){
						alert("电流：50-166");
						return false;
					}
				}else{
					if(fweld_ele<50 || fweld_ele>166){
						alert("电流：50-166");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 131 && fgas == 212){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<57 || fini_ele>145 || fweld_ele<57 || fweld_ele>145 || farc_ele<57 || farc_ele>145){
						alert("电流：57-145");
						return false;
					}
				}else{
					if(fweld_ele<57 || fweld_ele>145){
						alert("电流：57-145");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<25 || fini_ele>330 || fweld_ele<25 || fweld_ele>330 || farc_ele<25 || farc_ele>330){
						alert("电流：25-330");
						return false;
					}
				}else{
					if(fweld_ele<25 || fweld_ele>330){
						alert("电流：25-330");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<31 || fini_ele>275 || fweld_ele<31 || fweld_ele>275 || farc_ele<31 || farc_ele>275){
						alert("电流：31-275");
						return false;
					}
				}else{
					if(fweld_ele<31 || fweld_ele>275){
						alert("电流：31-275");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 131 && fgas == 213){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<80 || fini_ele>165 || fweld_ele<80 || fweld_ele>165 || farc_ele<80 || farc_ele>165){
						alert("电流：80-165");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>165){
						alert("电流：80-165");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<31 || fini_ele>150 || fweld_ele<31 || fweld_ele>150 || farc_ele<31 || farc_ele>150){
						alert("电流：31-150");
						return false;
					}
				}else{
					if(fweld_ele<31 || fweld_ele>150){
						alert("电流：31-150");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<38 || fini_ele>125 || fweld_ele<38 || fweld_ele>125 || farc_ele<38 || farc_ele>125){
						alert("电流：38-125");
						return false;
					}
				}else{
					if(fweld_ele<38 || fweld_ele>125){
						alert("电流：38-125");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 132 && fgas == 208){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<95 || fini_ele>215 || fweld_ele<95 || fweld_ele>215 || farc_ele<95 || farc_ele>215){
						alert("电流：95-215");
						return false;
					}
				}else{
					if(fweld_ele<95 || fweld_ele>215){
						alert("电流：95-215");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>213 || fweld_ele<60 || fweld_ele>213 || farc_ele<60 || farc_ele>213){
						alert("电流：60-213");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>213){
						alert("电流：60-213");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<75 || fini_ele>177 || fweld_ele<75 || fweld_ele>177 || farc_ele<75 || farc_ele>177){
						alert("电流：75-177");
						return false;
					}
				}else{
					if(fweld_ele<75 || fweld_ele>177){
						alert("电流：75-177");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 132 && fgas == 209){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<95 || fini_ele>245 || fweld_ele<95 || fweld_ele>245 || farc_ele<95 || farc_ele>245){
						alert("电流：95-245");
						return false;
					}
				}else{
					if(fweld_ele<95 || fweld_ele>245){
						alert("电流：95-245");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<50 || fini_ele>250 || fweld_ele<50 || fweld_ele>250 || farc_ele<50 || farc_ele>250){
						alert("电流：50-250");
						return false;
					}
				}else{
					if(fweld_ele<50 || fweld_ele>250){
						alert("电流：50-250");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<62 || fini_ele>208 || fweld_ele<62 || fweld_ele>208 || farc_ele<62 || farc_ele>208){
						alert("电流：62-208");
						return false;
					}
				}else{
					if(fweld_ele<62 || fweld_ele>208){
						alert("电流：62-208");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 132 && fgas == 212){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<72 || fini_ele>225 || fweld_ele<72 || fweld_ele>225 || farc_ele<72 || farc_ele>225){
						alert("电流：72-225");
						return false;
					}
				}else{
					if(fweld_ele<72 || fweld_ele>225){
						alert("电流：72-225");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<32 || fini_ele>360 || fweld_ele<32 || fweld_ele>360 || farc_ele<32 || farc_ele>360){
						alert("电流：32-360");
						return false;
					}
				}else{
					if(fweld_ele<32 || fweld_ele>360){
						alert("电流：32-360");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>300 || fweld_ele<40 || fweld_ele>300 || farc_ele<40 || farc_ele>300){
						alert("电流：40-300");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>300){
						alert("电流：40-300");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 132 && fgas == 213){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<100 || fini_ele>255 || fweld_ele<100 || fweld_ele>255 || farc_ele<100 || farc_ele>255){
						alert("电流： 100-255");
						return false;
					}
				}else{
					if(fweld_ele<100 || fweld_ele>255){
						alert("电流： 100-255");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<32 || fini_ele>360 || fweld_ele<32 || fweld_ele>360 || farc_ele<32 || farc_ele>360){
						alert("电流：32-360");
						return false;
					}
				}else{
					if(fweld_ele<32 || fweld_ele>360){
						alert("电流：32-360");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>300 || fweld_ele<40 || fweld_ele>300 || farc_ele<40 || farc_ele>300){
						alert("电流：40-300");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>300){
						alert("电流：40-300");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 131 && fgas == 210){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>135 || fweld_ele<60 || fweld_ele>135 || farc_ele<60 || farc_ele>135){
						alert("电流：60-135");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>135){
						alert("电流：60-135");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>175 || fweld_ele<40 || fweld_ele>175 || farc_ele<40 || farc_ele>175){
						alert("电流：40-175");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>175){
						alert("电流：40-175");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<50 || fini_ele>145 || fweld_ele<50 || fweld_ele>145 || farc_ele<50 || farc_ele>145){
						alert("电流：50-145");
						return false;
					}
				}else{
					if(fweld_ele<50 || fweld_ele>145){
						alert("电流：50-145");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 131 && fgas == 211){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<75 || fini_ele>385 || fweld_ele<75 || fweld_ele>385 || farc_ele<75 || farc_ele>385){
						alert("电流：75-385");
						return false;
					}
				}else{
					if(fweld_ele<75 || fweld_ele>385){
						alert("电流：75-385");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<56 || fini_ele>345 || fweld_ele<56 || fweld_ele>345 || farc_ele<56 || farc_ele>345){
						alert("电流：56-345");
						return false;
					}
				}else{
					if(fweld_ele<56 || fweld_ele>345){
						alert("电流：56-345");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<70 || fini_ele>287 || fweld_ele<70 || fweld_ele>287 || farc_ele<70 || farc_ele>287){
						alert("电流：70-287");
						return false;
					}
				}else{
					if(fweld_ele<70 || fweld_ele>287){
						alert("电流：70-287");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 132 && fgas == 210){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<119 || fini_ele>400 || fweld_ele<119 || fweld_ele>400 || farc_ele<119 || farc_ele>400){
						alert("电流： 119-400");
						return false;
					}
				}else{
					if(fweld_ele<119 || fweld_ele>400){
						alert("电流： 119-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>460 || fweld_ele<60 || fweld_ele>460 || farc_ele<60 || farc_ele>460){
						alert("电流：60-460");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>460){
						alert("电流：60-460");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<75 || fini_ele>383 || fweld_ele<75 || fweld_ele>383 || farc_ele<75 || farc_ele>383){
						alert("电流：75-383");
						return false;
					}
				}else{
					if(fweld_ele<75 || fweld_ele>383){
						alert("电流：75-383");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 132 && fgas == 211){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<80 || fini_ele>400 || fweld_ele<80 || fweld_ele>400 || farc_ele<80 || farc_ele>400){
						alert("电流：80-400");
						return false;
					}
				}else{
					if(fweld_ele<80 || fweld_ele>400){
						alert("电流：80-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<72 || fini_ele>407 || fweld_ele<72 || fweld_ele>407 || farc_ele<72 || farc_ele>407){
						alert("电流：72-407");
						return false;
					}
				}else{
					if(fweld_ele<72 || fweld_ele>407){
						alert("电流：72-407");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<90 || fini_ele>339 || fweld_ele<90 || fweld_ele>339 || farc_ele<90 || 339>175){
						alert("电流：90-339");
						return false;
					}
				}else{
					if(fweld_ele<90 || fweld_ele>339){
						alert("电流：90-339");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 134 && fgas == 210){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<90 || fini_ele>400 || fweld_ele<90 || fweld_ele>400 || farc_ele<90 || farc_ele>400){
						alert("电流：90-400");
						return false;
					}
				}else{
					if(fweld_ele<90 || fweld_ele>400){
						alert("电流：90-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<90 || fini_ele>460 || fweld_ele<90 || fweld_ele>460 || farc_ele<90 || farc_ele>460){
						alert("电流：90-460");
						return false;
					}
				}else{
					if(fweld_ele<90 || fweld_ele>460){
						alert("电流：90-460");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<112 || fini_ele>383 || fweld_ele<112 || fweld_ele>383 || farc_ele<112 || farc_ele>383){
						alert("电流：112-383");
						return false;
					}
				}else{
					if(fweld_ele<112 || fweld_ele>383){
						alert("电流：112-383");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 134 && fgas == 211){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<132 || fini_ele>400 || fweld_ele<132 || fweld_ele>400 || farc_ele<60 || farc_ele>400){
						alert("电流： 132-400");
						return false;
					}
				}else{
					if(fweld_ele<132 || fweld_ele>400){
						alert("电流： 132-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<95 || fini_ele>485 || fweld_ele<95 || fweld_ele>485 || farc_ele<95 || farc_ele>485){
						alert("电流：95-485");
						return false;
					}
				}else{
					if(fweld_ele<95 || fweld_ele>485){
						alert("电流：95-485");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<118 || fini_ele>404 || fweld_ele<118 || fweld_ele>404 || farc_ele<118 || farc_ele>404){
						alert("电流：118-404");
						return false;
					}
				}else{
					if(fweld_ele<118 || fweld_ele>404){
						alert("电流：118-404");
						return false;
					}
				}
			}
		}else if (fmaterial == 256 && fdiameter == 131 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<102 || fini_ele>330 || fweld_ele<102 || fweld_ele>330 || farc_ele<102 || farc_ele>330){
						alert("电流： 102-330");
						return false;
					}
				}else{
					if(fweld_ele<102 || fweld_ele>330){
						alert("电流： 102-330");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>305 || fweld_ele<60 || fweld_ele>305 || farc_ele<60 || farc_ele>305){
						alert("电流：60-305");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>305){
						alert("电流：60-305");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<75 || fini_ele>254 || fweld_ele<75 || fweld_ele>254 || farc_ele<75 || farc_ele>254){
						alert("电流：75-254");
						return false;
					}
				}else{
					if(fweld_ele<75 || fweld_ele>254){
						alert("电流：75-254");
						return false;
					}
				}
			}
		}else if (fmaterial == 256 && fdiameter == 132 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<79 || fini_ele>375 || fweld_ele<79 || fweld_ele>375 || farc_ele<79 || farc_ele>375){
						alert("电流：79-375");
						return false;
					}
				}else{
					if(fweld_ele<79 || fweld_ele>375){
						alert("电流：79-375");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<70 || fini_ele>430 || fweld_ele<70 || fweld_ele>430 || farc_ele<70 || farc_ele>430){
						alert("电流：70-430");
						return false;
					}
				}else{
					if(fweld_ele<70 || fweld_ele>430){
						alert("电流：70-430");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<87 || fini_ele>358 || fweld_ele<87 || fweld_ele>358 || farc_ele<87 || farc_ele>358){
						alert("电流：87-358");
						return false;
					}
				}else{
					if(fweld_ele<87 || fweld_ele>358){
						alert("电流：87-358");
						return false;
					}
				}
			}
		}else if (fmaterial == 256 && fdiameter == 134 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<125 || fini_ele>400 || fweld_ele<125 || fweld_ele>400 || farc_ele<125 || farc_ele>400){
						alert("电流：125-400");
						return false;
					}
				}else{
					if(fweld_ele<125 || fweld_ele>400){
						alert("电流：125-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<85 || fini_ele>460 || fweld_ele<85 || fweld_ele>460 || farc_ele<85 || farc_ele>460){
						alert("电流：85-460");
						return false;
					}
				}else{
					if(fweld_ele<85 || fweld_ele>460){
						alert("电流：85-460");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<106 || fini_ele>383 || fweld_ele<106 || fweld_ele>383 || farc_ele<106 || farc_ele>383){
						alert("电流：106-383");
						return false;
					}
				}else{
					if(fweld_ele<106 || fweld_ele>383){
						alert("电流：106-383");
						return false;
					}
				}
			}
		}
	}else if(machineModel == 188){    //600DP
		if (fmaterial == 250 && fdiameter == 135 && fgas == 200){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>185 || fweld_ele<60 || fweld_ele>185 || farc_ele<60 || farc_ele>185){
						alert("电流：60-185");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>185){
						alert("电流：60-185");
						return false;
					}
				}
			}else if(fselect == 103){
				
			}else if(fselect == 104){
				
			}
		}else if (fmaterial == 250 && fdiameter == 135 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<68 || fini_ele>230 || fweld_ele<68 || fweld_ele>230 || farc_ele<68 || farc_ele>230){
						alert("电流：68-230");
						return false;
					}
				}else{
					if(fweld_ele<68 || fweld_ele>230){
						alert("电流：68-230");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<25 || fini_ele>210 || fweld_ele<25 || fweld_ele>210 || farc_ele<25 || farc_ele>210){
						alert("电流：25-210");
						return false;
					}
				}else{
					if(fweld_ele<25 || fweld_ele>210){
						alert("电流：25-210");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<31 || fini_ele>175 || fweld_ele<31 || fweld_ele>175 || farc_ele<31 || farc_ele>175){
						alert("电流：31-175");
						return false;
					}
				}else{
					if(fweld_ele<68 || fweld_ele>175){
						alert("电流：31-175");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 135 && fgas == 202){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<62 || fini_ele>225 || fweld_ele<62 || fweld_ele>225 || farc_ele<62 || farc_ele>225){
						alert("电流：62-225");
						return false;
					}
				}else{
					if(fweld_ele<62 || fweld_ele>225){
						alert("电流：62-225");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<28 || fini_ele>210 || fweld_ele<28 || fweld_ele>210 || farc_ele<28 || farc_ele>210){
						alert("电流：28-210");
						return false;
					}
				}else{
					if(fweld_ele<28 || fweld_ele>210){
						alert("电流：28-210");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<35 || fini_ele>175 || fweld_ele<35 || fweld_ele>175 || farc_ele<35 || farc_ele>175){
						alert("电流：35-175");
						return false;
					}
				}else{
					if(fweld_ele<35 || fweld_ele>175){
						alert("电流：35-175");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 135 && fgas == 203){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<65 || fini_ele>230 || fweld_ele<65 || fweld_ele>230 || farc_ele<65 || farc_ele>230){
						alert("电流：65-230");
						return false;
					}
				}else{
					if(fweld_ele<65 || fweld_ele>230){
						alert("电流：65-230");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<24 || fini_ele>200 || fweld_ele<24 || fweld_ele>200 || farc_ele<24 || farc_ele>200){
						alert("电流：24-200");
						return false;
					}
				}else{
					if(fweld_ele<24 || fweld_ele>200){
						alert("电流：24-200");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<30 || fini_ele>166 || fweld_ele<30 || fweld_ele>166 || farc_ele<30 || farc_ele>166){
						alert("电流：30-166");
						return false;
					}
				}else{
					if(fweld_ele<30 || fweld_ele>166){
						alert("电流：30-166");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 131 && fgas == 200){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<55 || fini_ele>375 || fweld_ele<55 || fweld_ele>375 || farc_ele<55 || farc_ele>375){
						alert("电流：55-375");
						return false;
					}
				}else{
					if(fweld_ele<55 || fweld_ele>375){
						alert("电流：55-375");
						return false;
					}
				}
			}else if(fselect == 103){
				
			}else if(fselect == 104){
				
			}
		}else if (fmaterial == 250 && fdiameter == 131 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<68 || fini_ele>375 || fweld_ele<68 || fweld_ele>375 || farc_ele<68 || farc_ele>375){
						alert("电流：68-375");
						return false;
					}
				}else{
					if(fweld_ele<68 || fweld_ele>375){
						alert("电流：68-375");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>335 || fweld_ele<40 || fweld_ele>335 || farc_ele<40 || farc_ele>335){
						alert("电流：40-335");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>335){
						alert("电流：40-335");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<50 || fini_ele>279 || fweld_ele<50 || fweld_ele>279 || farc_ele<50 || farc_ele>279){
						alert("电流：50-279");
						return false;
					}
				}else{
					if(fweld_ele<50 || fweld_ele>279){
						alert("电流：50-279");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 131 && fgas == 202){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<65 || fini_ele>380 || fweld_ele<65 || fweld_ele>380 || farc_ele<65 || farc_ele>380){
						alert("电流：65-380");
						return false;
					}
				}else{
					if(fweld_ele<65 || fweld_ele>380){
						alert("电流：65-380");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>340 || fweld_ele<40 || fweld_ele>340 || farc_ele<40 || farc_ele>340){
						alert("电流：40-340");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>340){
						alert("电流：40-340");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<50 || fini_ele>283 || fweld_ele<50 || fweld_ele>283 || farc_ele<50 || farc_ele>283){
						alert("电流：50-283");
						return false;
					}
				}else{
					if(fweld_ele<50 || fweld_ele>283){
						alert("电流：50-283");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 131 && fgas == 203){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<66 || fini_ele>360 || fweld_ele<66 || fweld_ele>360 || farc_ele<66 || farc_ele>360){
						alert("电流：66-360");
						return false;
					}
				}else{
					if(fweld_ele<66 || fweld_ele>360){
						alert("电流：66-360");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<42 || fini_ele>325 || fweld_ele<42 || fweld_ele>325 || farc_ele<42 || farc_ele>325){
						alert("电流：42-325");
						return false;
					}
				}else{
					if(fweld_ele<42 || fweld_ele>325){
						alert("电流：42-325");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<52 || fini_ele>270 || fweld_ele<52 || fweld_ele>270 || farc_ele<52 || farc_ele>270){
						alert("电流：52-270");
						return false;
					}
				}else{
					if(fweld_ele<52 || fweld_ele>270){
						alert("电流：52-270");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 132 && fgas == 200){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<96 || fini_ele>400 || fweld_ele<96 || fweld_ele>400 || farc_ele<96 || farc_ele>400){
						alert("电流：96-400");
						return false;
					}
				}else{
					if(fweld_ele<96 || fweld_ele>400){
						alert("电流：96-400");
						return false;
					}
				}
			}else if(fselect == 103){

			}else if(fselect == 104){

			}
		}else if (fmaterial == 250 && fdiameter == 132 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<85 || fini_ele>400 || fweld_ele<85 || fweld_ele>400 || farc_ele<85 || farc_ele>400){
						alert("电流：85-400");
						return false;
					}
				}else{
					if(fweld_ele<85 || fweld_ele>400){
						alert("电流：85-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<55 || fini_ele>460 || fweld_ele<55 || fweld_ele>460 || farc_ele<55 || farc_ele>460){
						alert("电流：55-460");
						return false;
					}
				}else{
					if(fweld_ele<55 || fweld_ele>460){
						alert("电流：55-460");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<68 || fini_ele>383 || fweld_ele<68 || fweld_ele>383 || farc_ele<68 || farc_ele>383){
						alert("电流：68-383");
						return false;
					}
				}else{
					if(fweld_ele<68 || fweld_ele>383){
						alert("电流：68-383");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 132 && fgas == 202){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<85 || fini_ele>400 || fweld_ele<85 || fweld_ele>400 || farc_ele<85 || farc_ele>400){
						alert("电流：85-400");
						return false;
					}
				}else{
					if(fweld_ele<85 || fweld_ele>400){
						alert("电流：85-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>445 || fweld_ele<60 || fweld_ele>445 || farc_ele<60 || farc_ele>445){
						alert("电流：60-445");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>445){
						alert("电流：60-445");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<75 || fini_ele>370 || fweld_ele<75 || fweld_ele>370 || farc_ele<75 || farc_ele>370){
						alert("电流：75-370");
						return false;
					}
				}else{
					if(fweld_ele<75 || fweld_ele>370){
						alert("电流：75-370");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 132 && fgas == 203){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<82 || fini_ele>400 || fweld_ele<82 || fweld_ele>400 || farc_ele<82 || farc_ele>400){
						alert("电流：82-400");
						return false;
					}
				}else{
					if(fweld_ele<82 || fweld_ele>400){
						alert("电流：82-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<65 || fini_ele>425 || fweld_ele<65 || fweld_ele>425 || farc_ele<65 || farc_ele>425){
						alert("电流：65-425");
						return false;
					}
				}else{
					if(fweld_ele<65 || fweld_ele>425){
						alert("电流：65-425");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<81 || fini_ele>354 || fweld_ele<81 || fweld_ele>354 || farc_ele<81 || farc_ele>354){
						alert("电流：81-354");
						return false;
					}
				}else{
					if(fweld_ele<81 || fweld_ele>354){
						alert("电流：81-354");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 134 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<130 || fini_ele>400 || fweld_ele<130 || fweld_ele>400 || farc_ele<130 || farc_ele>400){
						alert("电流： 130-400");
						return false;
					}
				}else{
					if(fweld_ele<130 || fweld_ele>400){
						alert("电流： 130-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<35 || fini_ele>500 || fweld_ele<35 || fweld_ele>500 || farc_ele<35 || farc_ele>500){
						alert("电流：35-500");
						return false;
					}
				}else{
					if(fweld_ele<35 || fweld_ele>500){
						alert("电流：35-500");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<43 || fini_ele>416 || fweld_ele<43 || fweld_ele>416 || farc_ele<43 || farc_ele>416){
						alert("电流：43-416");
						return false;
					}
				}else{
					if(fweld_ele<43 || fweld_ele>416){
						alert("电流：43-416");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 134 && fgas == 202){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<125 || fini_ele>400 || fweld_ele<125 || fweld_ele>400 || farc_ele<125 || farc_ele>400){
						alert("电流： 125-400");
						return false;
					}
				}else{
					if(fweld_ele<125 || fweld_ele>400){
						alert("电流： 125-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<35 || fini_ele>500 || fweld_ele<35 || fweld_ele>500 || farc_ele<35 || farc_ele>500){
						alert("电流：35-500");
						return false;
					}
				}else{
					if(fweld_ele<35 || fweld_ele>500){
						alert("电流：35-500");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<43 || fini_ele>416 || fweld_ele<43 || fweld_ele>416 || farc_ele<43 || farc_ele>416){
						alert("电流：43-416");
						return false;
					}
				}else{
					if(fweld_ele<43 || fweld_ele>416){
						alert("电流：43-416");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 134 && fgas == 203){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<130 || fini_ele>400 || fweld_ele<130 || fweld_ele>400 || farc_ele<130 || farc_ele>400){
						alert("电流：130-400");
						return false;
					}
				}else{
					if(fweld_ele<130 || fweld_ele>400){
						alert("电流：130-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<35 || fini_ele>500 || fweld_ele<35 || fweld_ele>500 || farc_ele<35 || farc_ele>500){
						alert("电流：35-500");
						return false;
					}
				}else{
					if(fweld_ele<35 || fweld_ele>500){
						alert("电流：35-500");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<43 || fini_ele>416 || fweld_ele<43 || fweld_ele>416 || farc_ele<43 || farc_ele>416){
						alert("电流：43-416");
						return false;
					}
				}else{
					if(fweld_ele<43 || fweld_ele>416){
						alert("电流：43-416");
						return false;
					}
				}
			}
		}else if (fmaterial == 251 && fdiameter == 135 && fgas == 204){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<53 || fini_ele>245 || fweld_ele<53 || fweld_ele>245 || farc_ele<53 || farc_ele>245){
						alert("电流：53-245");
						return false;
					}
				}else{
					if(fweld_ele<53 || fweld_ele>245){
						alert("电流：53-245");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<18 || fini_ele>200 || fweld_ele<18 || fweld_ele>200 || farc_ele<18 || farc_ele>200){
						alert("电流：18-200");
						return false;
					}
				}else{
					if(fweld_ele<18 || fweld_ele>200){
						alert("电流：18-200");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<22 || fini_ele>166 || fweld_ele<22 || fweld_ele>166 || farc_ele<22 || farc_ele>166){
						alert("电流：22-166");
						return false;
					}
				}else{
					if(fweld_ele<22 || fweld_ele>166){
						alert("电流：22-166");
						return false;
					}
				}
			}
		}else if (fmaterial == 251 && fdiameter == 131 && fgas == 204){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<54 || fini_ele>395 || fweld_ele<54 || fweld_ele>395 || farc_ele<54 || farc_ele>395){
						alert("电流：54-395");
						return false;
					}
				}else{
					if(fweld_ele<54 || fweld_ele>395){
						alert("电流：54-395");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<35 || fini_ele>260 || fweld_ele<35 || fweld_ele>260 || farc_ele<35 || farc_ele>260){
						alert("电流：35-260");
						return false;
					}
				}else{
					if(fweld_ele<35 || fweld_ele>260){
						alert("电流：35-260");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<43 || fini_ele>216 || fweld_ele<43 || fweld_ele>216 || farc_ele<43 || farc_ele>216){
						alert("电流：43-216");
						return false;
					}
				}else{
					if(fweld_ele<43 || fweld_ele>216){
						alert("电流：43-216");
						return false;
					}
				}
			}
		}else if (fmaterial == 251 && fdiameter == 131 && fgas == 205){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<45 || fini_ele>330 || fweld_ele<45 || fweld_ele>330 || farc_ele<45 || farc_ele>330){
						alert("电流：45-330");
						return false;
					}
				}else{
					if(fweld_ele<45 || fweld_ele>330){
						alert("电流：45-330");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<18 || fini_ele>320 || fweld_ele<18 || fweld_ele>320 || farc_ele<18 || farc_ele>320){
						alert("电流：18-320");
						return false;
					}
				}else{
					if(fweld_ele<18 || fweld_ele>320){
						alert("电流：18-320");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<22 || fini_ele>266 || fweld_ele<22 || fweld_ele>266 || farc_ele<22 || farc_ele>266){
						alert("电流：22-266");
						return false;
					}
				}else{
					if(fweld_ele<22 || fweld_ele>266){
						alert("电流：22-266");
						return false;
					}
				}
			}
		}else if (fmaterial == 251 && fdiameter == 132 && fgas == 204){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<75 || fini_ele>400 || fweld_ele<75 || fweld_ele>400 || farc_ele<75 || farc_ele>400){
						alert("电流：75-400");
						return false;
					}
				}else{
					if(fweld_ele<75 || fweld_ele>400){
						alert("电流：75-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<45 || fini_ele>335 || fweld_ele<45 || fweld_ele>335 || farc_ele<45 || farc_ele>335){
						alert("电流：45-335");
						return false;
					}
				}else{
					if(fweld_ele<45 || fweld_ele>335){
						alert("电流：45-335");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<56 || fini_ele>279 || fweld_ele<56 || fweld_ele>279 || farc_ele<56 || farc_ele>279){
						alert("电流：56-279");
						return false;
					}
				}else{
					if(fweld_ele<56 || fweld_ele>279){
						alert("电流：56-279");
						return false;
					}
				}
			}
		}else if (fmaterial == 251 && fdiameter == 132 && fgas == 205){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<66 || fini_ele>346 || fweld_ele<66 || fweld_ele>346 || farc_ele<66 || farc_ele>346){
						alert("电流：66-346");
						return false;
					}
				}else{
					if(fweld_ele<66 || fweld_ele>346){
						alert("电流：66-346");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<29 || fini_ele>390 || fweld_ele<29 || fweld_ele>390 || farc_ele<29 || farc_ele>390){
						alert("电流：29-390");
						return false;
					}
				}else{
					if(fweld_ele<29 || fweld_ele>390){
						alert("电流：29-390");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<36 || fini_ele>325 || fweld_ele<36 || fweld_ele>325 || farc_ele<36 || farc_ele>325){
						alert("电流：36-325");
						return false;
					}
				}else{
					if(fweld_ele<36 || fweld_ele>325){
						alert("电流：36-325");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 131 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<46 || fini_ele>245 || fweld_ele<46 || fweld_ele>245 || farc_ele<46 || farc_ele>245){
						alert("电流：46-245");
						return false;
					}
				}else{
					if(fweld_ele<46 || fweld_ele>245){
						alert("电流：46-245");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<28 || fini_ele>260 || fweld_ele<28 || fweld_ele>260 || farc_ele<28 || farc_ele>260){
						alert("电流：28-260");
						return false;
					}
				}else{
					if(fweld_ele<28 || fweld_ele>260){
						alert("电流：28-260");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<35 || fini_ele>216 || fweld_ele<35 || fweld_ele>216 || farc_ele<35 || farc_ele>216){
						alert("电流：35-216");
						return false;
					}
				}else{
					if(fweld_ele<35 || fweld_ele>216){
						alert("电流：35-216");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 131 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<54 || fini_ele>270 || fweld_ele<54 || fweld_ele>270 || farc_ele<54 || farc_ele>270){
						alert("电流：54-270");
						return false;
					}
				}else{
					if(fweld_ele<54 || fweld_ele>270){
						alert("电流：54-270");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<24 || fini_ele>245 || fweld_ele<24 || fweld_ele>245 || farc_ele<2524 || farc_ele>245){
						alert("电流：24-245");
						return false;
					}
				}else{
					if(fweld_ele<24 || fweld_ele>245){
						alert("电流：24-245");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<30 || fini_ele>204 || fweld_ele<30 || fweld_ele>204 || farc_ele<30 || farc_ele>204){
						alert("电流：30-204");
						return false;
					}
				}else{
					if(fweld_ele<30 || fweld_ele>204){
						alert("电流：30-204");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 132 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<82 || fini_ele>300 || fweld_ele<82 || fweld_ele>300 || farc_ele<82 || farc_ele>300){
						alert("电流：82-300");
						return false;
					}
				}else{
					if(fweld_ele<82 || fweld_ele>300){
						alert("电流：82-300");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<35 || fini_ele>270 || fweld_ele<35 || fweld_ele>270 || farc_ele<35 || farc_ele>270){
						alert("电流：35-270");
						return false;
					}
				}else{
					if(fweld_ele<35 || fweld_ele>270){
						alert("电流：35-270");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<43 || fini_ele>225 || fweld_ele<43 || fweld_ele>225 || farc_ele<43 || farc_ele>225){
						alert("电流：43-225");
						return false;
					}
				}else{
					if(fweld_ele<43 || fweld_ele>225){
						alert("电流：43-225");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 132 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<92 || fini_ele>300 || fweld_ele<92 || fweld_ele>300 || farc_ele<92 || farc_ele>300){
						alert("电流：92-300");
						return false;
					}
				}else{
					if(fweld_ele<92 || fweld_ele>300){
						alert("电流：92-300");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<38 || fini_ele>265 || fweld_ele<38 || fweld_ele>265 || farc_ele<38 || farc_ele>265){
						alert("电流：38-265");
						return false;
					}
				}else{
					if(fweld_ele<38 || fweld_ele>265){
						alert("电流：38-265");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<47 || fini_ele>220 || fweld_ele<47 || fweld_ele>220 || farc_ele<47 || farc_ele>220){
						alert("电流：47-220");
						return false;
					}
				}else{
					if(fweld_ele<47 || fweld_ele>220){
						alert("电流：47-220");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 134 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<110 || fini_ele>320 || fweld_ele<110 || fweld_ele>320 || farc_ele<110 || farc_ele>320){
						alert("电流： 110-320");
						return false;
					}
				}else{
					if(fweld_ele<110 || fweld_ele>320){
						alert("电流： 110-320");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<61 || fini_ele>344 || fweld_ele<61 || fweld_ele>344 || farc_ele<61 || farc_ele>344){
						alert("电流：61-344");
						return false;
					}
				}else{
					if(fweld_ele<61 || fweld_ele>344){
						alert("电流：61-344");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<76 || fini_ele>286 || fweld_ele<76 || fweld_ele>286 || farc_ele<76 || farc_ele>286){
						alert("电流：76-286");
						return false;
					}
				}else{
					if(fweld_ele<76 || fweld_ele>286){
						alert("电流：76-286");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 134 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<98 || fini_ele>385 || fweld_ele<98 || fweld_ele>385 || farc_ele<98 || farc_ele>385){
						alert("电流：98-385");
						return false;
					}
				}else{
					if(fweld_ele<98 || fweld_ele>385){
						alert("电流：98-385");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<55 || fini_ele>335 || fweld_ele<55 || fweld_ele>335 || farc_ele<55 || farc_ele>335){
						alert("电流：55-335");
						return false;
					}
				}else{
					if(fweld_ele<55 || fweld_ele>335){
						alert("电流：55-335");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<68 || fini_ele>279 || fweld_ele<68 || fweld_ele>279 || farc_ele<68 || farc_ele>279){
						alert("电流：68-279");
						return false;
					}
				}else{
					if(fweld_ele<68 || fweld_ele>279){
						alert("电流：68-279");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 131 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<55 || fini_ele>220 || fweld_ele<55 || fweld_ele>220 || farc_ele<55 || farc_ele>220){
						alert("电流：55-220");
						return false;
					}
				}else{
					if(fweld_ele<55 || fweld_ele>220){
						alert("电流：55-220");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<20 || fini_ele>185 || fweld_ele<20 || fweld_ele>185 || farc_ele<20 || farc_ele>185){
						alert("电流：20-185");
						return false;
					}
				}else{
					if(fweld_ele<20 || fweld_ele>185){
						alert("电流：20-185");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<25 || fini_ele>154 || fweld_ele<25 || fweld_ele>154 || farc_ele<25 || farc_ele>154){
						alert("电流：25-154");
						return false;
					}
				}else{
					if(fweld_ele<25 || fweld_ele>154){
						alert("电流：25-154");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 131 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>195 || fweld_ele<60 || fweld_ele>195 || farc_ele<60 || farc_ele>195){
						alert("电流：60-195");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>195){
						alert("电流：60-195");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<30 || fini_ele>200 || fweld_ele<30 || fweld_ele>200 || farc_ele<30 || farc_ele>200){
						alert("电流：30-200");
						return false;
					}
				}else{
					if(fweld_ele<30 || fweld_ele>200){
						alert("电流：30-200");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<37 || fini_ele>166 || fweld_ele<37 || fweld_ele>166 || farc_ele<37 || farc_ele>166){
						alert("电流：37-166");
						return false;
					}
				}else{
					if(fweld_ele<37 || fweld_ele>166){
						alert("电流：37-166");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 132 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<82 || fini_ele>260 || fweld_ele<82 || fweld_ele>260 || farc_ele<82 || farc_ele>260){
						alert("电流：82-260");
						return false;
					}
				}else{
					if(fweld_ele<82 || fweld_ele>260){
						alert("电流：82-260");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<28 || fini_ele>324 || fweld_ele<28 || fweld_ele>324 || farc_ele<28 || farc_ele>324){
						alert("电流：28-324");
						return false;
					}
				}else{
					if(fweld_ele<28 || fweld_ele>324){
						alert("电流：28-324");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<35 || fini_ele>270 || fweld_ele<35 || fweld_ele>270 || farc_ele<35 || farc_ele>270){
						alert("电流：35-270");
						return false;
					}
				}else{
					if(fweld_ele<35 || fweld_ele>270){
						alert("电流：35-270");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 132 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<87 || fini_ele>250 || fweld_ele<87 || fweld_ele>250 || farc_ele<87 || farc_ele>250){
						alert("电流：87-250");
						return false;
					}
				}else{
					if(fweld_ele<87 || fweld_ele>250){
						alert("电流：87-250");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<24 || fini_ele>231 || fweld_ele<24 || fweld_ele>231 || farc_ele<24 || farc_ele>231){
						alert("电流：24-231");
						return false;
					}
				}else{
					if(fweld_ele<24 || fweld_ele>231){
						alert("电流：24-231");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<30 || fini_ele>192 || fweld_ele<30 || fweld_ele>192 || farc_ele<30 || farc_ele>192){
						alert("电流：30-192");
						return false;
					}
				}else{
					if(fweld_ele<30 || fweld_ele>192){
						alert("电流：30-192");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 134 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<105 || fini_ele>290 || fweld_ele<105 || fweld_ele>290 || farc_ele<105 || farc_ele>290){
						alert("电流： 105-290");
						return false;
					}
				}else{
					if(fweld_ele<105 || fweld_ele>290){
						alert("电流： 105-290");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<58 || fini_ele>390 || fweld_ele<58 || fweld_ele>390 || farc_ele<58 || farc_ele>390){
						alert("电流：58-390");
						return false;
					}
				}else{
					if(fweld_ele<58 || fweld_ele>390){
						alert("电流：58-390");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<72 || fini_ele>325 || fweld_ele<72 || fweld_ele>325 || farc_ele<72 || farc_ele>325){
						alert("电流：72-325");
						return false;
					}
				}else{
					if(fweld_ele<72 || fweld_ele>325){
						alert("电流：72-325");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 134 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<124 || fini_ele>265 || fweld_ele<124 || fweld_ele>265 || farc_ele<124 || farc_ele>265){
						alert("电流： 124-265");
						return false;
					}
				}else{
					if(fweld_ele<124 || fweld_ele>265){
						alert("电流： 124-265");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<65 || fini_ele>385 || fweld_ele<65 || fweld_ele>385 || farc_ele<65 || farc_ele>385){
						alert("电流：65-385");
						return false;
					}
				}else{
					if(fweld_ele<65 || fweld_ele>385){
						alert("电流：65-385");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<81 || fini_ele>320 || fweld_ele<81 || fweld_ele>320 || farc_ele<81 || farc_ele>320){
						alert("电流：81-320");
						return false;
					}
				}else{
					if(fweld_ele<81 || fweld_ele>320){
						alert("电流：81-320");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 135 && fgas == 208){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<45 || fini_ele>107 || fweld_ele<45 || fweld_ele>107 || farc_ele<45 || farc_ele>107){
						alert("电流：45-107");
						return false;
					}
				}else{
					if(fweld_ele<45 || fweld_ele>107){
						alert("电流：45-107");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<15 || fini_ele>180 || fweld_ele<15 || fweld_ele>180 || farc_ele<15 || farc_ele>180){
						alert("电流：15-180");
						return false;
					}
				}else{
					if(fweld_ele<15 || fweld_ele>180){
						alert("电流：15-180");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<18 || fini_ele>150 || fweld_ele<18 || fweld_ele>150 || farc_ele<18 || farc_ele>150){
						alert("电流：18-150");
						return false;
					}
				}else{
					if(fweld_ele<18 || fweld_ele>150){
						alert("电流：18-150");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 135 && fgas == 209){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>170 || fweld_ele<40 || fweld_ele>170 || farc_ele<40 || farc_ele>170){
						alert("电流：40-170");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>170){
						alert("电流：40-170");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>155 || fweld_ele<40 || fweld_ele>155 || farc_ele<40 || farc_ele>155){
						alert("电流：40-155");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>155){
						alert("电流：40-155");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<50 || fini_ele>129 || fweld_ele<50 || fweld_ele>129 || farc_ele<50 || farc_ele>129){
						alert("电流：50-129");
						return false;
					}
				}else{
					if(fweld_ele<50 || fweld_ele>129){
						alert("电流：50-129");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 135 && fgas == 212){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>170 || fweld_ele<40 || fweld_ele>170 || farc_ele<40 || farc_ele>170){
						alert("电流：40-170");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>170){
						alert("电流：40-170");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<15 || fini_ele>180 || fweld_ele<15 || fweld_ele>180 || farc_ele<15 || farc_ele>180){
						alert("电流：15-180");
						return false;
					}
				}else{
					if(fweld_ele<15 || fweld_ele>180){
						alert("电流：15-180");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<18 || fini_ele>150 || fweld_ele<18 || fweld_ele>150 || farc_ele<18 || farc_ele>150){
						alert("电流：18-150");
						return false;
					}
				}else{
					if(fweld_ele<18 || fweld_ele>150){
						alert("电流：18-150");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 135 && fgas == 213){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>170 || fweld_ele<40 || fweld_ele>170 || farc_ele<40 || farc_ele>170){
						alert("电流：40-170");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>170){
						alert("电流：40-170");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<15 || fini_ele>180 || fweld_ele<15 || fweld_ele>180 || farc_ele<15 || farc_ele>180){
						alert("电流：15-180");
						return false;
					}
				}else{
					if(fweld_ele<15 || fweld_ele>180){
						alert("电流：15-180");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<18 || fini_ele>150 || fweld_ele<18 || fweld_ele>150 || farc_ele<18 || farc_ele>150){
						alert("电流：18-150");
						return false;
					}
				}else{
					if(fweld_ele<18 || fweld_ele>150){
						alert("电流：18-150");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 131 && fgas == 208){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>135 || fweld_ele<60 || fweld_ele>135 || farc_ele<60 || farc_ele>135){
						alert("电流：60-135");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>135){
						alert("电流：60-135");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>175 || fweld_ele<40 || fweld_ele>175 || farc_ele<40 || farc_ele>175){
						alert("电流：40-175");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>175){
						alert("电流：40-175");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<50 || fini_ele>145 || fweld_ele<50 || fweld_ele>145 || farc_ele<50 || farc_ele>145){
						alert("电流：50-145");
						return false;
					}
				}else{
					if(fweld_ele<50 || fweld_ele>145){
						alert("电流：50-145");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 131 && fgas == 209){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<70 || fini_ele>155 || fweld_ele<70 || fweld_ele>155 || farc_ele<70 || farc_ele>155){
						alert("电流：70-155");
						return false;
					}
				}else{
					if(fweld_ele<70 || fweld_ele>155){
						alert("电流：70-155");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>200 || fweld_ele<40 || fweld_ele>200 || farc_ele<40 || farc_ele>200){
						alert("电流：40-200");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>200){
						alert("电流：40-200");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<50 || fini_ele>166 || fweld_ele<50 || fweld_ele>166 || farc_ele<50 || farc_ele>166){
						alert("电流：50-166");
						return false;
					}
				}else{
					if(fweld_ele<50 || fweld_ele>166){
						alert("电流：50-166");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 131 && fgas == 212){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<57 || fini_ele>145 || fweld_ele<57 || fweld_ele>145 || farc_ele<57 || farc_ele>145){
						alert("电流：57-145");
						return false;
					}
				}else{
					if(fweld_ele<57 || fweld_ele>145){
						alert("电流：57-145");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<25 || fini_ele>330 || fweld_ele<25 || fweld_ele>330 || farc_ele<25 || farc_ele>330){
						alert("电流：25-330");
						return false;
					}
				}else{
					if(fweld_ele<25 || fweld_ele>330){
						alert("电流：25-330");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<31 || fini_ele>275 || fweld_ele<31 || fweld_ele>275 || farc_ele<31 || farc_ele>275){
						alert("电流：31-275");
						return false;
					}
				}else{
					if(fweld_ele<31 || fweld_ele>275){
						alert("电流：31-275");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 131 && fgas == 213){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<80 || fini_ele>165 || fweld_ele<80 || fweld_ele>165 || farc_ele<80 || farc_ele>165){
						alert("电流：80-165");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>165){
						alert("电流：80-165");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<31 || fini_ele>150 || fweld_ele<31 || fweld_ele>150 || farc_ele<31 || farc_ele>150){
						alert("电流：31-150");
						return false;
					}
				}else{
					if(fweld_ele<31 || fweld_ele>150){
						alert("电流：31-150");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<38 || fini_ele>125 || fweld_ele<38 || fweld_ele>125 || farc_ele<38 || farc_ele>125){
						alert("电流：38-125");
						return false;
					}
				}else{
					if(fweld_ele<38 || fweld_ele>125){
						alert("电流：38-125");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 132 && fgas == 208){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 102){
				if(fselectstep == 108){
					if(fini_ele<95 || fini_ele>215 || fweld_ele<95 || fweld_ele>215 || farc_ele<95 || farc_ele>215){
						alert("电流：95-215");
						return false;
					}
				}else{
					if(fweld_ele<95 || fweld_ele>215){
						alert("电流：95-215");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>213 || fweld_ele<60 || fweld_ele>213 || farc_ele<60 || farc_ele>213){
						alert("电流：60-213");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>213){
						alert("电流：60-213");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<75 || fini_ele>177 || fweld_ele<75 || fweld_ele>177 || farc_ele<75 || farc_ele>177){
						alert("电流：75-177");
						return false;
					}
				}else{
					if(fweld_ele<75 || fweld_ele>177){
						alert("电流：75-177");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 132 && fgas == 209){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<95 || fini_ele>245 || fweld_ele<95 || fweld_ele>245 || farc_ele<95 || farc_ele>245){
						alert("电流：95-245");
						return false;
					}
				}else{
					if(fweld_ele<95 || fweld_ele>245){
						alert("电流：95-245");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<50 || fini_ele>250 || fweld_ele<50 || fweld_ele>250 || farc_ele<50 || farc_ele>250){
						alert("电流：50-250");
						return false;
					}
				}else{
					if(fweld_ele<50 || fweld_ele>250){
						alert("电流：50-250");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<62 || fini_ele>208 || fweld_ele<62 || fweld_ele>208 || farc_ele<62 || farc_ele>208){
						alert("电流：62-208");
						return false;
					}
				}else{
					if(fweld_ele<62 || fweld_ele>208){
						alert("电流：62-208");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 132 && fgas == 212){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<72 || fini_ele>225 || fweld_ele<72 || fweld_ele>225 || farc_ele<72 || farc_ele>225){
						alert("电流：72-225");
						return false;
					}
				}else{
					if(fweld_ele<72 || fweld_ele>225){
						alert("电流：72-225");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<32 || fini_ele>360 || fweld_ele<32 || fweld_ele>360 || farc_ele<32 || farc_ele>360){
						alert("电流：32-360");
						return false;
					}
				}else{
					if(fweld_ele<32 || fweld_ele>360){
						alert("电流：32-360");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>300 || fweld_ele<40 || fweld_ele>300 || farc_ele<40 || farc_ele>300){
						alert("电流：40-300");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>300){
						alert("电流：40-300");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 132 && fgas == 213){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<100 || fini_ele>255 || fweld_ele<100 || fweld_ele>255 || farc_ele<100 || farc_ele>255){
						alert("电流： 100-255");
						return false;
					}
				}else{
					if(fweld_ele<100 || fweld_ele>255){
						alert("电流： 100-255");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<32 || fini_ele>360 || fweld_ele<32 || fweld_ele>360 || farc_ele<32 || farc_ele>360){
						alert("电流：32-360");
						return false;
					}
				}else{
					if(fweld_ele<32 || fweld_ele>360){
						alert("电流：32-360");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>300 || fweld_ele<40 || fweld_ele>300 || farc_ele<40 || farc_ele>300){
						alert("电流：40-300");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>300){
						alert("电流：40-300");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 131 && fgas == 210){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>135 || fweld_ele<60 || fweld_ele>135 || farc_ele<60 || farc_ele>135){
						alert("电流：60-135");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>135){
						alert("电流：60-135");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>175 || fweld_ele<40 || fweld_ele>175 || farc_ele<40 || farc_ele>175){
						alert("电流：40-175");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>175){
						alert("电流：40-175");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<50 || fini_ele>145 || fweld_ele<50 || fweld_ele>145 || farc_ele<50 || farc_ele>145){
						alert("电流：50-145");
						return false;
					}
				}else{
					if(fweld_ele<50 || fweld_ele>145){
						alert("电流：50-145");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 131 && fgas == 211){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<75 || fini_ele>385 || fweld_ele<75 || fweld_ele>385 || farc_ele<75 || farc_ele>385){
						alert("电流：75-385");
						return false;
					}
				}else{
					if(fweld_ele<75 || fweld_ele>385){
						alert("电流：75-385");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<56 || fini_ele>345 || fweld_ele<56 || fweld_ele>345 || farc_ele<56 || farc_ele>345){
						alert("电流：56-345");
						return false;
					}
				}else{
					if(fweld_ele<56 || fweld_ele>345){
						alert("电流：56-345");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<70 || fini_ele>287 || fweld_ele<70 || fweld_ele>287 || farc_ele<70 || farc_ele>287){
						alert("电流：70-287");
						return false;
					}
				}else{
					if(fweld_ele<70 || fweld_ele>287){
						alert("电流：70-287");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 132 && fgas == 210){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<119 || fini_ele>400 || fweld_ele<119 || fweld_ele>400 || farc_ele<119 || farc_ele>400){
						alert("电流： 119-400");
						return false;
					}
				}else{
					if(fweld_ele<119 || fweld_ele>400){
						alert("电流： 119-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>460 || fweld_ele<60 || fweld_ele>460 || farc_ele<60 || farc_ele>460){
						alert("电流：60-460");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>460){
						alert("电流：60-460");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<75 || fini_ele>383 || fweld_ele<75 || fweld_ele>383 || farc_ele<75 || farc_ele>383){
						alert("电流：75-383");
						return false;
					}
				}else{
					if(fweld_ele<75 || fweld_ele>383){
						alert("电流：75-383");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 132 && fgas == 211){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<80 || fini_ele>400 || fweld_ele<80 || fweld_ele>400 || farc_ele<80 || farc_ele>400){
						alert("电流：80-400");
						return false;
					}
				}else{
					if(fweld_ele<80 || fweld_ele>400){
						alert("电流：80-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<72 || fini_ele>407 || fweld_ele<72 || fweld_ele>407 || farc_ele<72 || farc_ele>407){
						alert("电流：72-407");
						return false;
					}
				}else{
					if(fweld_ele<72 || fweld_ele>407){
						alert("电流：72-407");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<90 || fini_ele>339 || fweld_ele<90 || fweld_ele>339 || farc_ele<90 || 339>175){
						alert("电流：90-339");
						return false;
					}
				}else{
					if(fweld_ele<90 || fweld_ele>339){
						alert("电流：90-339");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 134 && fgas == 210){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<90 || fini_ele>400 || fweld_ele<90 || fweld_ele>400 || farc_ele<90 || farc_ele>400){
						alert("电流：90-400");
						return false;
					}
				}else{
					if(fweld_ele<90 || fweld_ele>400){
						alert("电流：90-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<90 || fini_ele>460 || fweld_ele<90 || fweld_ele>460 || farc_ele<90 || farc_ele>460){
						alert("电流：90-460");
						return false;
					}
				}else{
					if(fweld_ele<90 || fweld_ele>460){
						alert("电流：90-460");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<112 || fini_ele>383 || fweld_ele<112 || fweld_ele>383 || farc_ele<112 || farc_ele>383){
						alert("电流：112-383");
						return false;
					}
				}else{
					if(fweld_ele<112 || fweld_ele>383){
						alert("电流：112-383");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 134 && fgas == 211){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<132 || fini_ele>400 || fweld_ele<132 || fweld_ele>400 || farc_ele<60 || farc_ele>400){
						alert("电流： 132-400");
						return false;
					}
				}else{
					if(fweld_ele<132 || fweld_ele>400){
						alert("电流： 132-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<95 || fini_ele>485 || fweld_ele<95 || fweld_ele>485 || farc_ele<95 || farc_ele>485){
						alert("电流：95-485");
						return false;
					}
				}else{
					if(fweld_ele<95 || fweld_ele>485){
						alert("电流：95-485");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<118 || fini_ele>404 || fweld_ele<118 || fweld_ele>404 || farc_ele<118 || farc_ele>404){
						alert("电流：118-404");
						return false;
					}
				}else{
					if(fweld_ele<118 || fweld_ele>404){
						alert("电流：118-404");
						return false;
					}
				}
			}
		}else if (fmaterial == 256 && fdiameter == 131 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<102 || fini_ele>330 || fweld_ele<102 || fweld_ele>330 || farc_ele<102 || farc_ele>330){
						alert("电流： 102-330");
						return false;
					}
				}else{
					if(fweld_ele<102 || fweld_ele>330){
						alert("电流： 102-330");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>305 || fweld_ele<60 || fweld_ele>305 || farc_ele<60 || farc_ele>305){
						alert("电流：60-305");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>305){
						alert("电流：60-305");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<75 || fini_ele>254 || fweld_ele<75 || fweld_ele>254 || farc_ele<75 || farc_ele>254){
						alert("电流：75-254");
						return false;
					}
				}else{
					if(fweld_ele<75 || fweld_ele>254){
						alert("电流：75-254");
						return false;
					}
				}
			}
		}else if (fmaterial == 256 && fdiameter == 132 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<79 || fini_ele>375 || fweld_ele<79 || fweld_ele>375 || farc_ele<79 || farc_ele>375){
						alert("电流：79-375");
						return false;
					}
				}else{
					if(fweld_ele<79 || fweld_ele>375){
						alert("电流：79-375");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<70 || fini_ele>430 || fweld_ele<70 || fweld_ele>430 || farc_ele<70 || farc_ele>430){
						alert("电流：70-430");
						return false;
					}
				}else{
					if(fweld_ele<70 || fweld_ele>430){
						alert("电流：70-430");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<87 || fini_ele>358 || fweld_ele<87 || fweld_ele>358 || farc_ele<87 || farc_ele>358){
						alert("电流：87-358");
						return false;
					}
				}else{
					if(fweld_ele<87 || fweld_ele>358){
						alert("电流：87-358");
						return false;
					}
				}
			}
		}else if (fmaterial == 256 && fdiameter == 134 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else if(fselect == 101){
				if(fselectstep == 108){
					if(fini_ele<125 || fini_ele>400 || fweld_ele<125 || fweld_ele>400 || farc_ele<125 || farc_ele>400){
						alert("电流：125-400");
						return false;
					}
				}else{
					if(fweld_ele<125 || fweld_ele>400){
						alert("电流：125-400");
						return false;
					}
				}
			}else if(fselect == 103){
				if(fselectstep == 108){
					if(fini_ele<85 || fini_ele>460 || fweld_ele<85 || fweld_ele>460 || farc_ele<85 || farc_ele>460){
						alert("电流：85-460");
						return false;
					}
				}else{
					if(fweld_ele<85 || fweld_ele>460){
						alert("电流：85-460");
						return false;
					}
				}
			}else if(fselect == 104){
				if(fselectstep == 108){
					if(fini_ele<106 || fini_ele>383 || fweld_ele<106 || fweld_ele>383 || farc_ele<106 || farc_ele>383){
						alert("电流：106-383");
						return false;
					}
				}else{
					if(fweld_ele<106 || fweld_ele>383){
						alert("电流：106-383");
						return false;
					}
				}
			}
		}
	}else if(machineModel == 189){    //400D
		if (fmaterial == 250 && fdiameter == 135 && fgas == 200){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>185 || fweld_ele<60 || fweld_ele>185 || farc_ele<60 || farc_ele>185){
						alert("电流：60-185");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>185){
						alert("电流：60-185");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 135 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<68 || fini_ele>230 || fweld_ele<68 || fweld_ele>230 || farc_ele<68 || farc_ele>230){
						alert("电流：68-230");
						return false;
					}
				}else{
					if(fweld_ele<68 || fweld_ele>230){
						alert("电流：68-230");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 135 && fgas == 202){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<62 || fini_ele>225 || fweld_ele<62 || fweld_ele>225 || farc_ele<62 || farc_ele>225){
						alert("电流：62-225");
						return false;
					}
				}else{
					if(fweld_ele<62 || fweld_ele>225){
						alert("电流：62-225");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 135 && fgas == 203){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<65 || fini_ele>230 || fweld_ele<65 || fweld_ele>230 || farc_ele<65 || farc_ele>230){
						alert("电流：65-230");
						return false;
					}
				}else{
					if(fweld_ele<65 || fweld_ele>230){
						alert("电流：65-230");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 131 && fgas == 200){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<55 || fini_ele>375 || fweld_ele<55 || fweld_ele>375 || farc_ele<55 || farc_ele>375){
						alert("电流：55-375");
						return false;
					}
				}else{
					if(fweld_ele<55 || fweld_ele>375){
						alert("电流：55-375");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 131 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<68 || fini_ele>375 || fweld_ele<68 || fweld_ele>375 || farc_ele<68 || farc_ele>375){
						alert("电流：68-375");
						return false;
					}
				}else{
					if(fweld_ele<68 || fweld_ele>375){
						alert("电流：68-375");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 131 && fgas == 202){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<65 || fini_ele>380 || fweld_ele<65 || fweld_ele>380 || farc_ele<65 || farc_ele>380){
						alert("电流：65-380");
						return false;
					}
				}else{
					if(fweld_ele<65 || fweld_ele>380){
						alert("电流：65-380");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 131 && fgas == 203){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<66 || fini_ele>360 || fweld_ele<66 || fweld_ele>360 || farc_ele<66 || farc_ele>360){
						alert("电流：66-360");
						return false;
					}
				}else{
					if(fweld_ele<66 || fweld_ele>360){
						alert("电流：66-360");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 132 && fgas == 200){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<96 || fini_ele>400 || fweld_ele<96 || fweld_ele>400 || farc_ele<96 || farc_ele>400){
						alert("电流：96-400");
						return false;
					}
				}else{
					if(fweld_ele<96 || fweld_ele>400){
						alert("电流：96-400");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 132 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<85 || fini_ele>400 || fweld_ele<85 || fweld_ele>400 || farc_ele<85 || farc_ele>400){
						alert("电流：85-400");
						return false;
					}
				}else{
					if(fweld_ele<85 || fweld_ele>400){
						alert("电流：85-400");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 132 && fgas == 202){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<85 || fini_ele>400 || fweld_ele<85 || fweld_ele>400 || farc_ele<85 || farc_ele>400){
						alert("电流：85-400");
						return false;
					}
				}else{
					if(fweld_ele<85 || fweld_ele>400){
						alert("电流：85-400");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 132 && fgas == 203){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<82 || fini_ele>400 || fweld_ele<82 || fweld_ele>400 || farc_ele<82 || farc_ele>400){
						alert("电流：82-400");
						return false;
					}
				}else{
					if(fweld_ele<82 || fweld_ele>400){
						alert("电流：82-400");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 134 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<130 || fini_ele>400 || fweld_ele<130 || fweld_ele>400 || farc_ele<130 || farc_ele>400){
						alert("电流： 130-400");
						return false;
					}
				}else{
					if(fweld_ele<130 || fweld_ele>400){
						alert("电流： 130-400");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 134 && fgas == 202){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<125 || fini_ele>400 || fweld_ele<125 || fweld_ele>400 || farc_ele<125 || farc_ele>400){
						alert("电流： 125-400");
						return false;
					}
				}else{
					if(fweld_ele<125 || fweld_ele>400){
						alert("电流： 125-400");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 134 && fgas == 203){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<130 || fini_ele>400 || fweld_ele<130 || fweld_ele>400 || farc_ele<130 || farc_ele>400){
						alert("电流：130-400");
						return false;
					}
				}else{
					if(fweld_ele<130 || fweld_ele>400){
						alert("电流：130-400");
						return false;
					}
				}
			}
		}else if (fmaterial == 251 && fdiameter == 135 && fgas == 204){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<53 || fini_ele>245 || fweld_ele<53 || fweld_ele>245 || farc_ele<53 || farc_ele>245){
						alert("电流：53-245");
						return false;
					}
				}else{
					if(fweld_ele<53 || fweld_ele>245){
						alert("电流：53-235");
						return false;
					}
				}
			}
		}else if (fmaterial == 251 && fdiameter == 131 && fgas == 204){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<54 || fini_ele>395 || fweld_ele<54 || fweld_ele>395 || farc_ele<54 || farc_ele>395){
						alert("电流：54-395");
						return false;
					}
				}else{
					if(fweld_ele<54 || fweld_ele>395){
						alert("电流：54-395");
						return false;
					}
				}
			}
		}else if (fmaterial == 251 && fdiameter == 131 && fgas == 205){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<45 || fini_ele>330 || fweld_ele<45 || fweld_ele>330 || farc_ele<45 || farc_ele>330){
						alert("电流：45-330");
						return false;
					}
				}else{
					if(fweld_ele<45 || fweld_ele>330){
						alert("电流：45-330");
						return false;
					}
				}
			}
		}else if (fmaterial == 251 && fdiameter == 132 && fgas == 204){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<75 || fini_ele>400 || fweld_ele<75 || fweld_ele>400 || farc_ele<75 || farc_ele>400){
						alert("电流：75-400");
						return false;
					}
				}else{
					if(fweld_ele<75 || fweld_ele>400){
						alert("电流：75-400");
						return false;
					}
				}
			}
		}else if (fmaterial == 251 && fdiameter == 132 && fgas == 205){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<66 || fini_ele>346 || fweld_ele<66 || fweld_ele>346 || farc_ele<66 || farc_ele>346){
						alert("电流：66-346");
						return false;
					}
				}else{
					if(fweld_ele<66 || fweld_ele>346){
						alert("电流：66-346");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 131 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<46 || fini_ele>245 || fweld_ele<46 || fweld_ele>245 || farc_ele<46 || farc_ele>245){
						alert("电流：46-245");
						return false;
					}
				}else{
					if(fweld_ele<46 || fweld_ele>245){
						alert("电流：46-245");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 131 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<54 || fini_ele>270 || fweld_ele<54 || fweld_ele>270 || farc_ele<54 || farc_ele>270){
						alert("电流：54-270");
						return false;
					}
				}else{
					if(fweld_ele<54 || fweld_ele>270){
						alert("电流：54-270");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 132 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<82 || fini_ele>300 || fweld_ele<82 || fweld_ele>300 || farc_ele<82 || farc_ele>300){
						alert("电流：82-300");
						return false;
					}
				}else{
					if(fweld_ele<82 || fweld_ele>300){
						alert("电流：82-300");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 132 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<92 || fini_ele>300 || fweld_ele<92 || fweld_ele>300 || farc_ele<92 || farc_ele>300){
						alert("电流：92-300");
						return false;
					}
				}else{
					if(fweld_ele<92 || fweld_ele>300){
						alert("电流：92-300");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 134 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<110 || fini_ele>320 || fweld_ele<110 || fweld_ele>320 || farc_ele<110 || farc_ele>320){
						alert("电流： 110-320");
						return false;
					}
				}else{
					if(fweld_ele<110 || fweld_ele>320){
						alert("电流： 110-320");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 134 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<98 || fini_ele>385 || fweld_ele<98 || fweld_ele>385 || farc_ele<98 || farc_ele>385){
						alert("电流：98-385");
						return false;
					}
				}else{
					if(fweld_ele<98 || fweld_ele>385){
						alert("电流：98-385");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 131 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<55 || fini_ele>220 || fweld_ele<55 || fweld_ele>220 || farc_ele<55 || farc_ele>220){
						alert("电流：55-220");
						return false;
					}
				}else{
					if(fweld_ele<55 || fweld_ele>220){
						alert("电流：55-220");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 131 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>195 || fweld_ele<60 || fweld_ele>195 || farc_ele<60 || farc_ele>195){
						alert("电流：60-195");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>195){
						alert("电流：60-195");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 132 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<82 || fini_ele>260 || fweld_ele<82 || fweld_ele>260 || farc_ele<82 || farc_ele>260){
						alert("电流：82-260");
						return false;
					}
				}else{
					if(fweld_ele<82 || fweld_ele>260){
						alert("电流：82-260");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 132 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<87 || fini_ele>250 || fweld_ele<87 || fweld_ele>250 || farc_ele<87 || farc_ele>250){
						alert("电流：87-250");
						return false;
					}
				}else{
					if(fweld_ele<87 || fweld_ele>250){
						alert("电流：87-250");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 134 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<105 || fini_ele>290 || fweld_ele<105 || fweld_ele>290 || farc_ele<105 || farc_ele>290){
						alert("电流： 105-290");
						return false;
					}
				}else{
					if(fweld_ele<105 || fweld_ele>290){
						alert("电流： 105-290");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 134 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<124 || fini_ele>265 || fweld_ele<124 || fweld_ele>265 || farc_ele<124 || farc_ele>265){
						alert("电流： 124-265");
						return false;
					}
				}else{
					if(fweld_ele<124 || fweld_ele>265){
						alert("电流： 124-265");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 135 && fgas == 208){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<45 || fini_ele>107 || fweld_ele<45 || fweld_ele>107 || farc_ele<45 || farc_ele>107){
						alert("电流：45-107");
						return false;
					}
				}else{
					if(fweld_ele<45 || fweld_ele>107){
						alert("电流：45-107");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 135 && fgas == 209){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>170 || fweld_ele<40 || fweld_ele>170 || farc_ele<40 || farc_ele>170){
						alert("电流：40-170");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>170){
						alert("电流：40-170");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 135 && fgas == 212){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>170 || fweld_ele<40 || fweld_ele>170 || farc_ele<40 || farc_ele>170){
						alert("电流：40-170");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>170){
						alert("电流：40-170");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 135 && fgas == 213){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>170 || fweld_ele<40 || fweld_ele>170 || farc_ele<40 || farc_ele>170){
						alert("电流：40-170");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>170){
						alert("电流：40-170");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 131 && fgas == 208){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>135 || fweld_ele<60 || fweld_ele>135 || farc_ele<60 || farc_ele>135){
						alert("电流：60-135");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>135){
						alert("电流：60-135");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 131 && fgas == 209){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<70 || fini_ele>155 || fweld_ele<70 || fweld_ele>155 || farc_ele<70 || farc_ele>155){
						alert("电流：70-155");
						return false;
					}
				}else{
					if(fweld_ele<70 || fweld_ele>155){
						alert("电流：70-155");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 131 && fgas == 212){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<57 || fini_ele>145 || fweld_ele<57 || fweld_ele>145 || farc_ele<57 || farc_ele>145){
						alert("电流：57-145");
						return false;
					}
				}else{
					if(fweld_ele<57 || fweld_ele>145){
						alert("电流：57-145");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 131 && fgas == 213){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<80 || fini_ele>165 || fweld_ele<80 || fweld_ele>165 || farc_ele<80 || farc_ele>165){
						alert("电流：80-165");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>165){
						alert("电流：80-165");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 132 && fgas == 208){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<95 || fini_ele>215 || fweld_ele<95 || fweld_ele>215 || farc_ele<95 || farc_ele>215){
						alert("电流：95-215");
						return false;
					}
				}else{
					if(fweld_ele<95 || fweld_ele>215){
						alert("电流：95-215");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 132 && fgas == 209){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<95 || fini_ele>245 || fweld_ele<95 || fweld_ele>245 || farc_ele<95 || farc_ele>245){
						alert("电流：95-245");
						return false;
					}
				}else{
					if(fweld_ele<95 || fweld_ele>245){
						alert("电流：95-245");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 132 && fgas == 212){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<72 || fini_ele>225 || fweld_ele<72 || fweld_ele>225 || farc_ele<72 || farc_ele>225){
						alert("电流：72-225");
						return false;
					}
				}else{
					if(fweld_ele<72 || fweld_ele>225){
						alert("电流：72-225");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 132 && fgas == 213){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<100 || fini_ele>255 || fweld_ele<100 || fweld_ele>255 || farc_ele<100 || farc_ele>255){
						alert("电流： 100-255");
						return false;
					}
				}else{
					if(fweld_ele<100 || fweld_ele>255){
						alert("电流： 100-255");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 131 && fgas == 210){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>135 || fweld_ele<60 || fweld_ele>135 || farc_ele<60 || farc_ele>135){
						alert("电流：60-135");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>135){
						alert("电流：60-135");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 131 && fgas == 211){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<75 || fini_ele>385 || fweld_ele<75 || fweld_ele>385 || farc_ele<75 || farc_ele>385){
						alert("电流：75-385");
						return false;
					}
				}else{
					if(fweld_ele<75 || fweld_ele>385){
						alert("电流：75-385");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 132 && fgas == 210){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<119 || fini_ele>400 || fweld_ele<119 || fweld_ele>400 || farc_ele<119 || farc_ele>400){
						alert("电流： 119-400");
						return false;
					}
				}else{
					if(fweld_ele<119 || fweld_ele>400){
						alert("电流： 119-400");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 132 && fgas == 211){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<80 || fini_ele>400 || fweld_ele<80 || fweld_ele>400 || farc_ele<80 || farc_ele>400){
						alert("电流：80-400");
						return false;
					}
				}else{
					if(fweld_ele<80 || fweld_ele>400){
						alert("电流：80-400");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 134 && fgas == 210){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<90 || fini_ele>400 || fweld_ele<90 || fweld_ele>400 || farc_ele<90 || farc_ele>400){
						alert("电流：90-400");
						return false;
					}
				}else{
					if(fweld_ele<90 || fweld_ele>400){
						alert("电流：90-400");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 134 && fgas == 211){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<132 || fini_ele>400 || fweld_ele<132 || fweld_ele>400 || farc_ele<60 || farc_ele>400){
						alert("电流： 132-400");
						return false;
					}
				}else{
					if(fweld_ele<132 || fweld_ele>400){
						alert("电流： 132-400");
						return false;
					}
				}
			}
		}else if (fmaterial == 256 && fdiameter == 131 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<102 || fini_ele>330 || fweld_ele<102 || fweld_ele>330 || farc_ele<102 || farc_ele>330){
						alert("电流： 102-330");
						return false;
					}
				}else{
					if(fweld_ele<102 || fweld_ele>330){
						alert("电流： 102-330");
						return false;
					}
				}
			}
		}else if (fmaterial == 256 && fdiameter == 132 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<79 || fini_ele>375 || fweld_ele<79 || fweld_ele>375 || farc_ele<79 || farc_ele>375){
						alert("电流：79-375");
						return false;
					}
				}else{
					if(fweld_ele<79 || fweld_ele>375){
						alert("电流：79-375");
						return false;
					}
				}
			}
		}else if (fmaterial == 256 && fdiameter == 134 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>35 || fini_vol<12 || fini_vol>35 || farc_vol<12 || farc_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>35){
						alert("给定速度：1.5~24  电压：12-35");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<125 || fini_ele>400 || fweld_ele<125 || fweld_ele>400 || farc_ele<125 || farc_ele>400){
						alert("电流：125-400");
						return false;
					}
				}else{
					if(fweld_ele<125 || fweld_ele>400){
						alert("电流：125-400");
						return false;
					}
				}
			}
		}
	}else if(machineModel == 190){    //500D
		if (fmaterial == 250 && fdiameter == 135 && fgas == 200){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>185 || fweld_ele<60 || fweld_ele>185 || farc_ele<60 || farc_ele>185){
						alert("电流：60-185");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>185){
						alert("电流：60-185");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 135 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<68 || fini_ele>230 || fweld_ele<68 || fweld_ele>230 || farc_ele<68 || farc_ele>230){
						alert("电流：68-230");
						return false;
					}
				}else{
					if(fweld_ele<68 || fweld_ele>230){
						alert("电流：68-230");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 135 && fgas == 202){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<62 || fini_ele>225 || fweld_ele<62 || fweld_ele>225 || farc_ele<62 || farc_ele>225){
						alert("电流：62-225");
						return false;
					}
				}else{
					if(fweld_ele<62 || fweld_ele>225){
						alert("电流：62-225");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 135 && fgas == 203){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<65 || fini_ele>230 || fweld_ele<65 || fweld_ele>230 || farc_ele<65 || farc_ele>230){
						alert("电流：65-230");
						return false;
					}
				}else{
					if(fweld_ele<65 || fweld_ele>230){
						alert("电流：65-230");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 131 && fgas == 200){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<55 || fini_ele>375 || fweld_ele<55 || fweld_ele>375 || farc_ele<55 || farc_ele>375){
						alert("电流：55-375");
						return false;
					}
				}else{
					if(fweld_ele<55 || fweld_ele>375){
						alert("电流：55-375");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 131 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<68 || fini_ele>375 || fweld_ele<68 || fweld_ele>375 || farc_ele<68 || farc_ele>375){
						alert("电流：68-375");
						return false;
					}
				}else{
					if(fweld_ele<68 || fweld_ele>375){
						alert("电流：68-375");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 131 && fgas == 202){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<65 || fini_ele>380 || fweld_ele<65 || fweld_ele>380 || farc_ele<65 || farc_ele>380){
						alert("电流：65-380");
						return false;
					}
				}else{
					if(fweld_ele<65 || fweld_ele>380){
						alert("电流：65-380");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 131 && fgas == 203){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<66 || fini_ele>360 || fweld_ele<66 || fweld_ele>360 || farc_ele<66 || farc_ele>360){
						alert("电流：66-360");
						return false;
					}
				}else{
					if(fweld_ele<66 || fweld_ele>360){
						alert("电流：66-360");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 132 && fgas == 200){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<96 || fini_ele>400 || fweld_ele<96 || fweld_ele>400 || farc_ele<96 || farc_ele>400){
						alert("电流：96-400");
						return false;
					}
				}else{
					if(fweld_ele<96 || fweld_ele>400){
						alert("电流：96-400");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 132 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<85 || fini_ele>475 || fweld_ele<85 || fweld_ele>475 || farc_ele<85 || farc_ele>475){
						alert("电流：85-475");
						return false;
					}
				}else{
					if(fweld_ele<85 || fweld_ele>475){
						alert("电流：85-475");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 132 && fgas == 202){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<85 || fini_ele>470 || fweld_ele<85 || fweld_ele>470 || farc_ele<85 || farc_ele>470){
						alert("电流：85-470");
						return false;
					}
				}else{
					if(fweld_ele<85 || fweld_ele>470){
						alert("电流：85-470");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 132 && fgas == 203){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<82 || fini_ele>450 || fweld_ele<82 || fweld_ele>450 || farc_ele<82 || farc_ele>450){
						alert("电流：82-450");
						return false;
					}
				}else{
					if(fweld_ele<82 || fweld_ele>450){
						alert("电流：82-450");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 134 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<130 || fini_ele>500 || fweld_ele<130 || fweld_ele>500 || farc_ele<130 || farc_ele>500){
						alert("电流： 130-500");
						return false;
					}
				}else{
					if(fweld_ele<130 || fweld_ele>500){
						alert("电流： 130-500");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 134 && fgas == 202){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<125 || fini_ele>500 || fweld_ele<125 || fweld_ele>500 || farc_ele<125 || farc_ele>500){
						alert("电流： 125-500");
						return false;
					}
				}else{
					if(fweld_ele<125 || fweld_ele>400){
						alert("电流： 125-500");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 134 && fgas == 203){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<130 || fini_ele>500 || fweld_ele<130 || fweld_ele>500 || farc_ele<130 || farc_ele>500){
						alert("电流：130-500");
						return false;
					}
				}else{
					if(fweld_ele<130 || fweld_ele>500){
						alert("电流：130-500");
						return false;
					}
				}
			}
		}else if (fmaterial == 251 && fdiameter == 135 && fgas == 204){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<53 || fini_ele>245 || fweld_ele<53 || fweld_ele>245 || farc_ele<53 || farc_ele>245){
						alert("电流：53-245");
						return false;
					}
				}else{
					if(fweld_ele<53 || fweld_ele>245){
						alert("电流：53-245");
						return false;
					}
				}
			}
		}else if (fmaterial == 251 && fdiameter == 131 && fgas == 204){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<54 || fini_ele>395 || fweld_ele<54 || fweld_ele>395 || farc_ele<54 || farc_ele>395){
						alert("电流：54-395");
						return false;
					}
				}else{
					if(fweld_ele<54 || fweld_ele>395){
						alert("电流：54-395");
						return false;
					}
				}
			}
		}else if (fmaterial == 251 && fdiameter == 131 && fgas == 205){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<45 || fini_ele>330 || fweld_ele<45 || fweld_ele>330 || farc_ele<45 || farc_ele>330){
						alert("电流：45-330");
						return false;
					}
				}else{
					if(fweld_ele<45 || fweld_ele>330){
						alert("电流：45-330");
						return false;
					}
				}
			}
		}else if (fmaterial == 251 && fdiameter == 132 && fgas == 204){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<75 || fini_ele>400 || fweld_ele<75 || fweld_ele>400 || farc_ele<75 || farc_ele>400){
						alert("电流：75-400");
						return false;
					}
				}else{
					if(fweld_ele<75 || fweld_ele>400){
						alert("电流：75-400");
						return false;
					}
				}
			}
		}else if (fmaterial == 251 && fdiameter == 132 && fgas == 205){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<66 || fini_ele>346 || fweld_ele<66 || fweld_ele>346 || farc_ele<66 || farc_ele>346){
						alert("电流：66-346");
						return false;
					}
				}else{
					if(fweld_ele<66 || fweld_ele>346){
						alert("电流：66-346");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 131 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<46 || fini_ele>245 || fweld_ele<46 || fweld_ele>245 || farc_ele<46 || farc_ele>245){
						alert("电流：46-245");
						return false;
					}
				}else{
					if(fweld_ele<46 || fweld_ele>245){
						alert("电流：46-245");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 131 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<54 || fini_ele>270 || fweld_ele<54 || fweld_ele>270 || farc_ele<54 || farc_ele>270){
						alert("电流：54-270");
						return false;
					}
				}else{
					if(fweld_ele<54 || fweld_ele>270){
						alert("电流：54-270");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 132 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<82 || fini_ele>300 || fweld_ele<82 || fweld_ele>300 || farc_ele<82 || farc_ele>300){
						alert("电流：82-300");
						return false;
					}
				}else{
					if(fweld_ele<82 || fweld_ele>300){
						alert("电流：82-300");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 132 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<92 || fini_ele>300 || fweld_ele<92 || fweld_ele>300 || farc_ele<92 || farc_ele>300){
						alert("电流：92-300");
						return false;
					}
				}else{
					if(fweld_ele<92 || fweld_ele>300){
						alert("电流：92-300");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 134 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<110 || fini_ele>320 || fweld_ele<110 || fweld_ele>320 || farc_ele<110 || farc_ele>320){
						alert("电流： 110-320");
						return false;
					}
				}else{
					if(fweld_ele<110 || fweld_ele>320){
						alert("电流： 110-320");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 134 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<98 || fini_ele>385 || fweld_ele<98 || fweld_ele>385 || farc_ele<98 || farc_ele>385){
						alert("电流：98-385");
						return false;
					}
				}else{
					if(fweld_ele<98 || fweld_ele>385){
						alert("电流：98-385");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 131 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<55 || fini_ele>220 || fweld_ele<55 || fweld_ele>220 || farc_ele<55 || farc_ele>220){
						alert("电流：55-220");
						return false;
					}
				}else{
					if(fweld_ele<55 || fweld_ele>220){
						alert("电流：55-220");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 131 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>195 || fweld_ele<60 || fweld_ele>195 || farc_ele<60 || farc_ele>195){
						alert("电流：60-195");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>195){
						alert("电流：60-195");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 132 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<82 || fini_ele>260 || fweld_ele<82 || fweld_ele>260 || farc_ele<82 || farc_ele>260){
						alert("电流：82-260");
						return false;
					}
				}else{
					if(fweld_ele<82 || fweld_ele>260){
						alert("电流：82-260");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 132 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<87 || fini_ele>250 || fweld_ele<87 || fweld_ele>250 || farc_ele<87 || farc_ele>250){
						alert("电流：87-250");
						return false;
					}
				}else{
					if(fweld_ele<87 || fweld_ele>250){
						alert("电流：87-250");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 134 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<105 || fini_ele>290 || fweld_ele<105 || fweld_ele>290 || farc_ele<105 || farc_ele>290){
						alert("电流： 105-290");
						return false;
					}
				}else{
					if(fweld_ele<105 || fweld_ele>290){
						alert("电流： 105-290");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 134 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<124 || fini_ele>265 || fweld_ele<124 || fweld_ele>265 || farc_ele<124 || farc_ele>265){
						alert("电流： 124-265");
						return false;
					}
				}else{
					if(fweld_ele<124 || fweld_ele>265){
						alert("电流： 124-265");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 135 && fgas == 208){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<45 || fini_ele>107 || fweld_ele<40 || fweld_ele>107 || farc_ele<45 || farc_ele>107){
						alert("电流：45-107");
						return false;
					}
				}else{
					if(fweld_ele<45 || fweld_ele>107){
						alert("电流：45-107");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 135 && fgas == 209){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>170 || fweld_ele<40 || fweld_ele>170 || farc_ele<40 || farc_ele>170){
						alert("电流：40-170");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>170){
						alert("电流：40-170");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 135 && fgas == 212){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>170 || fweld_ele<40 || fweld_ele>170 || farc_ele<40 || farc_ele>170){
						alert("电流：40-170");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>170){
						alert("电流：40-170");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 135 && fgas == 213){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>170 || fweld_ele<40 || fweld_ele>170 || farc_ele<40 || farc_ele>170){
						alert("电流：40-170");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>170){
						alert("电流：40-170");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 131 && fgas == 208){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>135 || fweld_ele<60 || fweld_ele>135 || farc_ele<60 || farc_ele>135){
						alert("电流：60-135");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>135){
						alert("电流：60-135");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 131 && fgas == 209){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<70 || fini_ele>155 || fweld_ele<70 || fweld_ele>155 || farc_ele<70 || farc_ele>155){
						alert("电流：70-155");
						return false;
					}
				}else{
					if(fweld_ele<70 || fweld_ele>155){
						alert("电流：70-155");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 131 && fgas == 212){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<57 || fini_ele>145 || fweld_ele<57 || fweld_ele>145 || farc_ele<57 || farc_ele>145){
						alert("电流：57-145");
						return false;
					}
				}else{
					if(fweld_ele<57 || fweld_ele>145){
						alert("电流：57-145");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 131 && fgas == 213){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<80 || fini_ele>165 || fweld_ele<80 || fweld_ele>165 || farc_ele<80 || farc_ele>165){
						alert("电流：80-165");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>165){
						alert("电流：80-165");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 132 && fgas == 208){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<95 || fini_ele>215 || fweld_ele<95 || fweld_ele>215 || farc_ele<95 || farc_ele>215){
						alert("电流：95-215");
						return false;
					}
				}else{
					if(fweld_ele<95 || fweld_ele>215){
						alert("电流：95-215");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 132 && fgas == 209){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<95 || fini_ele>245 || fweld_ele<95 || fweld_ele>245 || farc_ele<95 || farc_ele>245){
						alert("电流：95-245");
						return false;
					}
				}else{
					if(fweld_ele<95 || fweld_ele>245){
						alert("电流：95-245");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 132 && fgas == 212){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<72 || fini_ele>225 || fweld_ele<72 || fweld_ele>225 || farc_ele<72 || farc_ele>225){
						alert("电流：72-225");
						return false;
					}
				}else{
					if(fweld_ele<72 || fweld_ele>225){
						alert("电流：72-225");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 132 && fgas == 213){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<100 || fini_ele>255 || fweld_ele<100 || fweld_ele>255 || farc_ele<100 || farc_ele>255){
						alert("电流： 100-255");
						return false;
					}
				}else{
					if(fweld_ele<100 || fweld_ele>255){
						alert("电流： 100-255");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 131 && fgas == 210){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>135 || fweld_ele<60 || fweld_ele>135 || farc_ele<60 || farc_ele>135){
						alert("电流：60-135");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>135){
						alert("电流：60-135");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 131 && fgas == 211){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<75 || fini_ele>385 || fweld_ele<75 || fweld_ele>385 || farc_ele<75 || farc_ele>385){
						alert("电流：75-385");
						return false;
					}
				}else{
					if(fweld_ele<75 || fweld_ele>385){
						alert("电流：75-385");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 132 && fgas == 210){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<119 || fini_ele>400 || fweld_ele<119 || fweld_ele>400 || farc_ele<119 || farc_ele>400){
						alert("电流： 119-400");
						return false;
					}
				}else{
					if(fweld_ele<119 || fweld_ele>400){
						alert("电流： 119-400");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 132 && fgas == 211){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<80 || fini_ele>470 || fweld_ele<80 || fweld_ele>470 || farc_ele<80 || farc_ele>470){
						alert("电流：80-470");
						return false;
					}
				}else{
					if(fweld_ele<80 || fweld_ele>470){
						alert("电流：80-470");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 134 && fgas == 210){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<90 || fini_ele>460 || fweld_ele<90 || fweld_ele>460 || farc_ele<90 || farc_ele>460){
						alert("电流：90-460");
						return false;
					}
				}else{
					if(fweld_ele<90 || fweld_ele>460){
						alert("电流：90-460");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 134 && fgas == 211){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<132 || fini_ele>500 || fweld_ele<132 || fweld_ele>500 || farc_ele<60 || farc_ele>500){
						alert("电流： 132-500");
						return false;
					}
				}else{
					if(fweld_ele<132 || fweld_ele>500){
						alert("电流： 132-500");
						return false;
					}
				}
			}
		}else if (fmaterial == 256 && fdiameter == 131 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<102 || fini_ele>330 || fweld_ele<102 || fweld_ele>330 || farc_ele<102 || farc_ele>330){
						alert("电流： 102-330");
						return false;
					}
				}else{
					if(fweld_ele<102 || fweld_ele>330){
						alert("电流： 102-330");
						return false;
					}
				}
			}
		}else if (fmaterial == 256 && fdiameter == 132 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<79 || fini_ele>375 || fweld_ele<79 || fweld_ele>375 || farc_ele<79 || farc_ele>375){
						alert("电流：79-375");
						return false;
					}
				}else{
					if(fweld_ele<79 || fweld_ele>375){
						alert("电流：79-375");
						return false;
					}
				}
			}
		}else if (fmaterial == 256 && fdiameter == 134 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>40 || fini_vol<12 || fini_vol>40 || farc_vol<12 || farc_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>40){
						alert("给定速度：1.5~24  电压：12-40");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<125 || fini_ele>440 || fweld_ele<125 || fweld_ele>440 || farc_ele<125 || farc_ele>440){
						alert("电流：125-440");
						return false;
					}
				}else{
					if(fweld_ele<125 || fweld_ele>440){
						alert("电流：125-440");
						return false;
					}
				}
			}
		}
	}else if(machineModel == 191){    //600D
		if (fmaterial == 250 && fdiameter == 135 && fgas == 200){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>185 || fweld_ele<60 || fweld_ele>185 || farc_ele<60 || farc_ele>185){
						alert("电流：60-185");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>185){
						alert("电流：60-185");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 135 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<68 || fini_ele>230 || fweld_ele<68 || fweld_ele>230 || farc_ele<68 || farc_ele>230){
						alert("电流：68-230");
						return false;
					}
				}else{
					if(fweld_ele<68 || fweld_ele>230){
						alert("电流：68-230");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 135 && fgas == 202){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<62 || fini_ele>225 || fweld_ele<62 || fweld_ele>225 || farc_ele<62 || farc_ele>225){
						alert("电流：62-225");
						return false;
					}
				}else{
					if(fweld_ele<62 || fweld_ele>225){
						alert("电流：62-225");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 135 && fgas == 203){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<65 || fini_ele>230 || fweld_ele<65 || fweld_ele>230 || farc_ele<65 || farc_ele>230){
						alert("电流：65-230");
						return false;
					}
				}else{
					if(fweld_ele<65 || fweld_ele>230){
						alert("电流：65-230");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 131 && fgas == 200){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<55 || fini_ele>375 || fweld_ele<55 || fweld_ele>375 || farc_ele<55 || farc_ele>375){
						alert("电流：55-375");
						return false;
					}
				}else{
					if(fweld_ele<55 || fweld_ele>375){
						alert("电流：55-375");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 131 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<68 || fini_ele>375 || fweld_ele<68 || fweld_ele>375 || farc_ele<68 || farc_ele>375){
						alert("电流：68-375");
						return false;
					}
				}else{
					if(fweld_ele<68 || fweld_ele>375){
						alert("电流：68-375");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 131 && fgas == 202){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<65 || fini_ele>380 || fweld_ele<65 || fweld_ele>380 || farc_ele<65 || farc_ele>380){
						alert("电流：65-380");
						return false;
					}
				}else{
					if(fweld_ele<65 || fweld_ele>380){
						alert("电流：65-380");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 131 && fgas == 203){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<66 || fini_ele>360 || fweld_ele<66 || fweld_ele>360 || farc_ele<66 || farc_ele>360){
						alert("电流：66-360");
						return false;
					}
				}else{
					if(fweld_ele<66 || fweld_ele>360){
						alert("电流：66-360");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 132 && fgas == 200){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<96 || fini_ele>440 || fweld_ele<96 || fweld_ele>440 || farc_ele<96 || farc_ele>440){
						alert("电流：96-440");
						return false;
					}
				}else{
					if(fweld_ele<96 || fweld_ele>440){
						alert("电流：96-440");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 132 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<85 || fini_ele>475 || fweld_ele<85 || fweld_ele>475 || farc_ele<85 || farc_ele>475){
						alert("电流：85-475");
						return false;
					}
				}else{
					if(fweld_ele<85 || fweld_ele>475){
						alert("电流：85-475");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 132 && fgas == 202){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<85 || fini_ele>470 || fweld_ele<85 || fweld_ele>470 || farc_ele<85 || farc_ele>470){
						alert("电流：85-470");
						return false;
					}
				}else{
					if(fweld_ele<85 || fweld_ele>470){
						alert("电流：85-470");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 132 && fgas == 203){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<82 || fini_ele>450 || fweld_ele<82 || fweld_ele>450 || farc_ele<82 || farc_ele>450){
						alert("电流：82-450");
						return false;
					}
				}else{
					if(fweld_ele<82 || fweld_ele>450){
						alert("电流：82-450");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 134 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<130 || fini_ele>580 || fweld_ele<130 || fweld_ele>580 || farc_ele<130 || farc_ele>580){
						alert("电流： 130-580");
						return false;
					}
				}else{
					if(fweld_ele<130 || fweld_ele>580){
						alert("电流： 130-580");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 134 && fgas == 202){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<125 || fini_ele>590 || fweld_ele<125 || fweld_ele>590 || farc_ele<125 || farc_ele>590){
						alert("电流： 125-590");
						return false;
					}
				}else{
					if(fweld_ele<125 || fweld_ele>590){
						alert("电流： 125-590");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 134 && fgas == 203){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<130 || fini_ele>600 || fweld_ele<130 || fweld_ele>600 || farc_ele<130 || farc_ele>600){
						alert("电流：130-600");
						return false;
					}
				}else{
					if(fweld_ele<130 || fweld_ele>600){
						alert("电流：130-600");
						return false;
					}
				}
			}
		}else if (fmaterial == 251 && fdiameter == 135 && fgas == 204){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<53 || fini_ele>245 || fweld_ele<53 || fweld_ele>245 || farc_ele<53 || farc_ele>245){
						alert("电流：53-245");
						return false;
					}
				}else{
					if(fweld_ele<53 || fweld_ele>245){
						alert("电流：53-245");
						return false;
					}
				}
			}
		}else if (fmaterial == 251 && fdiameter == 131 && fgas == 204){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<54 || fini_ele>395 || fweld_ele<54 || fweld_ele>395 || farc_ele<54 || farc_ele>395){
						alert("电流：54-395");
						return false;
					}
				}else{
					if(fweld_ele<54 || fweld_ele>395){
						alert("电流：54-395");
						return false;
					}
				}
			}
		}else if (fmaterial == 251 && fdiameter == 131 && fgas == 205){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<45 || fini_ele>330 || fweld_ele<45 || fweld_ele>330 || farc_ele<45 || farc_ele>330){
						alert("电流：45-330");
						return false;
					}
				}else{
					if(fweld_ele<45 || fweld_ele>330){
						alert("电流：45-330");
						return false;
					}
				}
			}
		}else if (fmaterial == 251 && fdiameter == 132 && fgas == 204){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<75 || fini_ele>400 || fweld_ele<75 || fweld_ele>400 || farc_ele<75 || farc_ele>400){
						alert("电流：75-400");
						return false;
					}
				}else{
					if(fweld_ele<75 || fweld_ele>400){
						alert("电流：75-400");
						return false;
					}
				}
			}
		}else if (fmaterial == 251 && fdiameter == 132 && fgas == 205){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<66 || fini_ele>346 || fweld_ele<66 || fweld_ele>346 || farc_ele<66 || farc_ele>346){
						alert("电流：66-346");
						return false;
					}
				}else{
					if(fweld_ele<66 || fweld_ele>346){
						alert("电流：66-346");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 131 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<46 || fini_ele>245 || fweld_ele<46 || fweld_ele>245 || farc_ele<46 || farc_ele>245){
						alert("电流：46-245");
						return false;
					}
				}else{
					if(fweld_ele<46 || fweld_ele>245){
						alert("电流：46-245");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 131 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<54 || fini_ele>270 || fweld_ele<54 || fweld_ele>270 || farc_ele<54 || farc_ele>270){
						alert("电流：54-270");
						return false;
					}
				}else{
					if(fweld_ele<54 || fweld_ele>270){
						alert("电流：54-270");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 132 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<82 || fini_ele>300 || fweld_ele<82 || fweld_ele>300 || farc_ele<82 || farc_ele>300){
						alert("电流：82-300");
						return false;
					}
				}else{
					if(fweld_ele<82 || fweld_ele>300){
						alert("电流：82-300");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 132 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<92 || fini_ele>300 || fweld_ele<92 || fweld_ele>300 || farc_ele<92 || farc_ele>300){
						alert("电流：92-300");
						return false;
					}
				}else{
					if(fweld_ele<92 || fweld_ele>300){
						alert("电流：92-300");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 134 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<110 || fini_ele>320 || fweld_ele<110 || fweld_ele>320 || farc_ele<110 || farc_ele>320){
						alert("电流： 110-320");
						return false;
					}
				}else{
					if(fweld_ele<110 || fweld_ele>320){
						alert("电流： 110-320");
						return false;
					}
				}
			}
		}else if (fmaterial == 252 && fdiameter == 134 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<98 || fini_ele>385 || fweld_ele<98 || fweld_ele>385 || farc_ele<98 || farc_ele>385){
						alert("电流：98-385");
						return false;
					}
				}else{
					if(fweld_ele<98 || fweld_ele>385){
						alert("电流：98-385");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 131 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<55 || fini_ele>220 || fweld_ele<55 || fweld_ele>220 || farc_ele<55 || farc_ele>220){
						alert("电流：55-220");
						return false;
					}
				}else{
					if(fweld_ele<55 || fweld_ele>220){
						alert("电流：55-220");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 131 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>195 || fweld_ele<60 || fweld_ele>195 || farc_ele<60 || farc_ele>195){
						alert("电流：60-195");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>195){
						alert("电流：60-195");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 132 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<82 || fini_ele>260 || fweld_ele<82 || fweld_ele>260 || farc_ele<82 || farc_ele>260){
						alert("电流：82-260");
						return false;
					}
				}else{
					if(fweld_ele<82 || fweld_ele>260){
						alert("电流：82-260");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 132 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<87 || fini_ele>250 || fweld_ele<87 || fweld_ele>250 || farc_ele<87 || farc_ele>250){
						alert("电流：87-250");
						return false;
					}
				}else{
					if(fweld_ele<87 || fweld_ele>250){
						alert("电流：87-250");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 134 && fgas == 206){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<105 || fini_ele>290 || fweld_ele<105 || fweld_ele>290 || farc_ele<105 || farc_ele>290){
						alert("电流： 105-290");
						return false;
					}
				}else{
					if(fweld_ele<105 || fweld_ele>290){
						alert("电流： 105-290");
						return false;
					}
				}
			}
		}else if (fmaterial == 253 && fdiameter == 134 && fgas == 207){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<124 || fini_ele>265 || fweld_ele<124 || fweld_ele>265 || farc_ele<124 || farc_ele>265){
						alert("电流： 124-265");
						return false;
					}
				}else{
					if(fweld_ele<124 || fweld_ele>265){
						alert("电流： 124-265");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 135 && fgas == 208){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<45 || fini_ele>107 || fweld_ele<45 || fweld_ele>107 || farc_ele<45 || farc_ele>107){
						alert("电流：45-107");
						return false;
					}
				}else{
					if(fweld_ele<45 || fweld_ele>107){
						alert("电流：45-107");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 135 && fgas == 209){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>170 || fweld_ele<40 || fweld_ele>170 || farc_ele<40 || farc_ele>170){
						alert("电流：40-170");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>170){
						alert("电流：40-170");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 135 && fgas == 212){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>170 || fweld_ele<40 || fweld_ele>170 || farc_ele<40 || farc_ele>170){
						alert("电流：40-170");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>170){
						alert("电流：40-170");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 135 && fgas == 213){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<40 || fini_ele>170 || fweld_ele<40 || fweld_ele>170 || farc_ele<40 || farc_ele>170){
						alert("电流：40-170");
						return false;
					}
				}else{
					if(fweld_ele<40 || fweld_ele>170){
						alert("电流：40-170");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 131 && fgas == 208){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>135 || fweld_ele<60 || fweld_ele>135 || farc_ele<60 || farc_ele>135){
						alert("电流：60-135");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>135){
						alert("电流：60-135");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 131 && fgas == 209){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<70 || fini_ele>155 || fweld_ele<70 || fweld_ele>155 || farc_ele<70 || farc_ele>155){
						alert("电流：70-155");
						return false;
					}
				}else{
					if(fweld_ele<70 || fweld_ele>155){
						alert("电流：70-155");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 131 && fgas == 212){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<57 || fini_ele>145 || fweld_ele<57 || fweld_ele>145 || farc_ele<57 || farc_ele>145){
						alert("电流：57-145");
						return false;
					}
				}else{
					if(fweld_ele<57 || fweld_ele>145){
						alert("电流：57-145");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 131 && fgas == 213){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<80 || fini_ele>165 || fweld_ele<80 || fweld_ele>165 || farc_ele<80 || farc_ele>165){
						alert("电流：80-165");
						return false;
					}
				}else{
					if(fweld_ele<80 || fweld_ele>165){
						alert("电流：80-165");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 132 && fgas == 208){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<95 || fini_ele>215 || fweld_ele<95 || fweld_ele>215 || farc_ele<95 || farc_ele>215){
						alert("电流：95-215");
						return false;
					}
				}else{
					if(fweld_ele<95 || fweld_ele>215){
						alert("电流：95-215");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 132 && fgas == 209){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<95 || fini_ele>245 || fweld_ele<95 || fweld_ele>245 || farc_ele<95 || farc_ele>245){
						alert("电流：95-245");
						return false;
					}
				}else{
					if(fweld_ele<95 || fweld_ele>245){
						alert("电流：95-245");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 132 && fgas == 212){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<72 || fini_ele>225 || fweld_ele<72 || fweld_ele>225 || farc_ele<72 || farc_ele>225){
						alert("电流：72-225");
						return false;
					}
				}else{
					if(fweld_ele<72 || fweld_ele>225){
						alert("电流：72-225");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 132 && fgas == 213){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<100 || fini_ele>255 || fweld_ele<100 || fweld_ele>255 || farc_ele<100 || farc_ele>255){
						alert("电流： 100-255");
						return false;
					}
				}else{
					if(fweld_ele<100 || fweld_ele>255){
						alert("电流： 100-255");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 131 && fgas == 210){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<60 || fini_ele>135 || fweld_ele<60 || fweld_ele>135 || farc_ele<60 || farc_ele>135){
						alert("电流：60-135");
						return false;
					}
				}else{
					if(fweld_ele<60 || fweld_ele>135){
						alert("电流：60-135");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 131 && fgas == 211){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<75 || fini_ele>385 || fweld_ele<75 || fweld_ele>385 || farc_ele<75 || farc_ele>385){
						alert("电流：75-385");
						return false;
					}
				}else{
					if(fweld_ele<75 || fweld_ele>385){
						alert("电流：75-385");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 132 && fgas == 210){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<119 || fini_ele>400 || fweld_ele<119 || fweld_ele>400 || farc_ele<119 || farc_ele>400){
						alert("电流： 119-400");
						return false;
					}
				}else{
					if(fweld_ele<119 || fweld_ele>400){
						alert("电流： 119-400");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 132 && fgas == 211){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<80 || fini_ele>470 || fweld_ele<80 || fweld_ele>470 || farc_ele<80 || farc_ele>470){
						alert("电流：80-470");
						return false;
					}
				}else{
					if(fweld_ele<80 || fweld_ele>470){
						alert("电流：80-470");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 134 && fgas == 210){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<90 || fini_ele>460 || fweld_ele<90 || fweld_ele>460 || farc_ele<90 || farc_ele>460){
						alert("电流：90-460");
						return false;
					}
				}else{
					if(fweld_ele<90 || fweld_ele>460){
						alert("电流：90-460");
						return false;
					}
				}
			}
		}else if (fmaterial == 255 && fdiameter == 134 && fgas == 211){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<132 || fini_ele>540 || fweld_ele<132 || fweld_ele>540 || farc_ele<132 || farc_ele>540){
						alert("电流： 132-540");
						return false;
					}
				}else{
					if(fweld_ele<132 || fweld_ele>540){
						alert("电流： 132-540");
						return false;
					}
				}
			}
		}else if (fmaterial == 256 && fdiameter == 131 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<102 || fini_ele>330 || fweld_ele<102 || fweld_ele>330 || farc_ele<102 || farc_ele>330){
						alert("电流： 102-330");
						return false;
					}
				}else{
					if(fweld_ele<102 || fweld_ele>330){
						alert("电流： 102-330");
						return false;
					}
				}
			}
		}else if (fmaterial == 256 && fdiameter == 132 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<79 || fini_ele>375 || fweld_ele<79 || fweld_ele>375 || farc_ele<79 || farc_ele>375){
						alert("电流：79-375");
						return false;
					}
				}else{
					if(fweld_ele<79 || fweld_ele>375){
						alert("电流：79-375");
						return false;
					}
				}
			}
		}else if (fmaterial == 256 && fdiameter == 134 && fgas == 201){
			if(fselect == 102){
				if(fselectstep == 108){
					if(fspeed<1.5 || fspeed>24 || farc_speed<1.5 || farc_speed>24 || farc_tuny_speed<1.5 || farc_tuny_speed>24 || fweld_vol<12 || fweld_vol>45 || fini_vol<12 || fini_vol>45 || farc_vol<12 || farc_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}else{
					if(fspeed<1.5 || fspeed>24 || fweld_vol<12 || fweld_vol>45){
						alert("给定速度：1.5~24  电压：12-45");
						return false;
					}
				}
			}else{
				if(fselectstep == 108){
					if(fini_ele<125 || fini_ele>440 || fweld_ele<125 || fweld_ele>440 || farc_ele<125 || farc_ele>440){
						alert("电流：125-440");
						return false;
					}
				}else{
					if(fweld_ele<125 || fweld_ele>440){
						alert("电流：125-440");
						return false;
					}
				}
			}
		}
	}
}

//所属项目
function InsframeworkCombobox(){
	$.ajax({  
    type : "post",  
    async : false,
    url : "weldingMachine/getInsframeworkAll",  
    data : {},  
    dataType : "json", //返回数据形式为json  
    success : function(result) {  
        if (result) {
            var optionStr = '';
            optionStr += "<option value=\"-1\" >全部</option>";
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