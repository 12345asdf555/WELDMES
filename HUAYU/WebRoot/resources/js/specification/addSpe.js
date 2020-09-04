/**
 * 
 */
/**
 * 
 */
var data1;
var da;
var yshu;
var yshu1 = new Array();
var node11;
var symbol = 0;
var symbol1 = 0;
var symbol2;
var chanelCount = 0;
var x = 0;
var xx = 0;
var rows1;
var itemrow;
var machga;
var machineModel;
var allMachineModel = new Array();
var jobNoTemp="";
var selectFunFlag = 0;
$(function() {
	gfsd();
	//	inscombobox();
	$('#dlg').dialog({
		onClose : function() {
			$("#fm").form("disableValidation");
		}
	})
	$("#fm").form("disableValidation");
	document.getElementById("body").style.display = "none";
	document.getElementById("fnsbody").style.display = "none";
	insframeworkTree();
	$.ajax({
		type : "post",
		async : false,
		url : "td/AllTdbf",
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				data1 = eval(result.web_socket);
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	$.ajax({
		type : "post",
		async : false,
		url : "weldingMachine/getMachineModelAll",
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				allMachineModel = eval(result.ary);
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	$.ajax({
		type : "post",
		async : false,
		url : "datastatistics/getAllInsframework",
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				itemrow = eval(result);
				var optionStr = '';
				for (var i = 0; i < result.ary.length; i++) {
					optionStr += "<option value=\"" + result.ary[i].id + "\" >"
						+ result.ary[i].name + "</option>";
				}
				$("#item").html(optionStr);
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});

	$("#item").combobox();

	$.ajax({
		type : "post",
		async : false,
		url : "weldingMachine/getMachineGather",
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				machga = eval(result.rows);
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	
	//部分下拉框失去焦点判定
	$("#f0111").combobox('textbox').bind('blur', function(e) {
		var re = /^\d+(?=\.{0,1}\d+$|$)/;
		if(!re.test($('#f0111').combobox('getValue'))){
			alert("请输入正确的参数");
			$('#f0111').combobox('select',0);
			return;
		}
		if($('#f0111').combobox('getValue')>10){
			$('#f0111').combobox('select', 10);
		}else if($('#f0111').combobox('getValue')<0.1){
			$('#f0111').combobox('select', 0.1);
		}else{
			var num = parseFloat($('#f0111').combobox('getValue'));
			$('#f0111').combobox('select', num.toFixed(1));
		}
	});
	$("#f0131").combobox('textbox').bind('blur', function(e) {
		var re = /^\d+(?=\.{0,1}\d+$|$)/;
		if(!re.test($('#f0131').combobox('getValue'))){
			alert("请输入正确的参数");
			$('#f0131').combobox('select',0);
			return;
		}
		if($('#f0131').combobox('getValue')>2){
			$('#f0131').combobox('select', 2);
		}else if($('#f0131').combobox('getValue')<0.01){
			$('#f0131').combobox('select', 0.01);
		}else{
			var num = parseFloat($('#f0131').combobox('getValue'));
			$('#f0131').combobox('select', num.toFixed(2));
		}
	});
})

$(document).ready(function() {
	$("#fchanel").combobox({
		onSelect : function(record) {
			if (node11 != null) {
				$.ajax({
					type : "post",
					async : false,
					url : "wps/getAllSpe?machine=" + node11.id + "&chanel=" + record.value,
					data : {},
					dataType : "json", //返回数据形式为json  
					success : function(result) {
						if (result) {
							chushihua(0);
//							comboboxCheck(machineModel);
							yshu = eval(result.rows);
							if (yshu.length != 0) {
								$('#fchanel').combobox('select', yshu[0].FWPSNum);
								$('#fselect').combobox('select', yshu[0].fselect);
								$("#ftime").numberbox('setValue', yshu[0].ftime);
								$("#fadvance").numberbox('setValue', yshu[0].fadvance);
								$("#fini_ele").numberbox('setValue', yshu[0].fini_ele);
								$("#fini_vol").numberbox('setValue', yshu[0].fini_vol);
								$("#fini_vol1").numberbox('setValue', yshu[0].fini_vol1);
								$("#fweld_vol").numberbox('setValue', yshu[0].fweld_vol);
								$("#fweld_vol1").numberbox('setValue', yshu[0].fweld_vol1);
								$("#farc_vol").numberbox('setValue', yshu[0].farc_vol);
								$("#farc_vol1").numberbox('setValue', yshu[0].farc_vol1);
								$("#fweld_ele").numberbox('setValue', yshu[0].fweld_ele);
								$("#farc_ele").numberbox('setValue', yshu[0].farc_ele);
								$("#fhysteresis").numberbox('setValue', yshu[0].fhysteresis);
								$("#fcharacter").numberbox('setValue', yshu[0].fcharacter);
								$('#fweldprocess').combobox('select', yshu[0].fprocessid);
								$('#fgas').combobox('select', yshu[0].fgas);
								$('#fmaterial').combobox('select', yshu[0].fmaterial);
								$('#fdiameter').combobox('select', yshu[0].fdiameter);
								$("#fweld_tuny_ele").numberbox('setValue', yshu[0].fweld_tuny_ele);
								$("#fweld_tuny_vol").numberbox('setValue', yshu[0].fweld_tuny_vol);
								$("#farc_tuny_ele").numberbox('setValue', yshu[0].farc_tuny_ele);
								$("#farc_tuny_vol").numberbox('setValue', yshu[0].Fdiameter);
								$("#farc_tuny_vol1").numberbox('setValue', yshu[0].Fdiameter);
								$("#fweld_tuny_vol1").numberbox('setValue', yshu[0].fweld_tuny_vol);
								$("#frequency").numberbox('setValue', yshu[0].frequency);
								$("#gasflow").numberbox('setValue', yshu[0].gasflow);
								$("#weldingratio").numberbox('setValue', yshu[0].weldingratio);
								//上海通用
								$("#farc_time").numberbox('setValue', yshu[0].farc_time);
								$("#Rush").numberbox('setValue', yshu[0].Rush);
								$("#handarc_ele").numberbox('setValue', yshu[0].handarc_ele);//热引弧电流
								$("#handarc_time").numberbox('setValue', yshu[0].handarc_time);//热引弧时间
								$("#hand_ele").numberbox('setValue', yshu[0].hand_ele);//手工焊电流
								$("#Base_ele").numberbox('setValue', yshu[0].Base_ele);//基值电流
								$("#Base_vol").numberbox('setValue', yshu[0].Base_vol);//基值电压
								$("#Base_vol1").numberbox('setValue', yshu[0].Base_vol1);//基值电压一元
								$("#fargon").combobox('select', yshu[0].fargon);//氩弧焊模式选择
								$("#manual_weld").combobox('select', yshu[0].manual_weld);//手/气焊选择
								$("#pulse").combobox('select',yshu[0].pulse);//双脉冲
								$("#rise_time").numberbox('setValue', yshu[0].rise_time);//缓升时间
								$("#firsttime").numberbox('setValue',yshu[0].firsttime);//初期时间
								$("#decline_time").numberbox('setValue', yshu[0].decline_time);//缓降时间
								$("#thrust_ele").numberbox('setValue', yshu[0].thrust_ele);//推力电流
								$("#pulse_ratio").numberbox('setValue', yshu[0].pulse_ratio);//双脉冲占空比
								$("#point_speed").numberbox('setValue', yshu[0].point_speed);//点动送丝速度
								if (yshu[0].arc_length == "1") {
									$("#arc_length").prop("checked", true);
								}
								if (yshu[0].finitial == "1") {
									$("#finitial").prop("checked", true);
								}
								$('#farc').combobox('select', yshu[0].farc);
								if (yshu[0].fcontroller == "1") {
									$("#fcontroller").prop("checked", true);
								}
								if (yshu[0].fmode == "1") {
									$("#fmode").prop("checked", true);
								}
								if (yshu[0].ftorch == "1") {
									$("#ftorch").prop("checked", true);
								}
							} else {
								alert("未查询到相关数据，已初始化，也可尝试索取。");
							}
						}
					},
					error : function(errorMsg) {
						alert("数据请求失败，请联系系统管理员!");
					}
				});
			}
		}
	});
});

function chushihua(value) {
	if (machineModel == 174) {
		EPWINIT(value);
	} else if (machineModel == 175) {
		EPSINIT(value);
	} else if (machineModel == 176) {
		WBMLINIT(value);
	} else if (machineModel == 177) {
		WBPINIT(value);
	} else if (machineModel == 178) {
		WBLINIT(value);
	} else if (machineModel == 172) {
		CPVESINIT(value);
	} else if (machineModel == 173) {
		CPVETINIT(value);
	}  else if (machineModel == 182) {
		WBWINIT(value);
	}else if (machineModel == 184) {
		SPCINIT(value);
	}  else if (machineModel == 183) {
		$("#fnsjoblist").datagrid({
			height : $("#joblistdiv").height(),
			width : $("#joblistdiv").width()*0.95,
			idField : 'id',
			url : "wps/getFnsJobList?machine=" + node11.id,
			rownumbers : false,
			singleSelect : true,
			columns : [ [ {
				field : 'jobno',
				title : 'No.',
				width : 80,
				halign : "center",
				align : "left"
			}, {
				field : 'jobname',
				title : 'Job名称',
				width : 100,
				halign : "center",
				align : "left"
			}
			] ],
			fitColumns : true,
			rowStyler : function(index, row) {
				if ((index % 2) != 0) {
					//处理行代背景色后无法选中
					var color = new Object();
					color.class="rowColor";
					return color;
				}
			},
	        onSelect : function(index,row){
	        	getSelectJobDetail(row.jobno);
	        	jobNoTemp = row.jobno;
				$("#tdjobno").html(row.jobno);
				$("#injobno").textbox('setValue',row.jobno);
	        },
			onLoadSuccess: function(data){
				if(data.rows.length!=0){
					if($('#injobno').textbox('getValue')=="" || $('#injobno').textbox('getValue')==null){
						getSelectJobDetail(data.rows[0].jobno);
					}
					jobNoTemp = data.rows[0].jobno;
					var jobNoList = new Array();
					for(var j=0;j<data.rows.length;j++){
						jobNoList.push(data.rows[j].jobno);
					}
					var optionStr1 = '';
					for(var o=1;o<1001;o++){
						var l = ""+o;
						if (l.length < 4) {
							var length = 4 - l.length;
							for (var i = 0; i < length; i++) {
								l = "0" + l;
							}
						}
						if($.inArray(l, jobNoList)==-1){
		                    optionStr1 += "<option value=\"" + o + "\" >"  
		                            + l + "</option>";  
						}
					}
					$("#jobno").html(optionStr1);
					$("#jobno").combobox();
				}
			}
		});
	} else{
		CPVEWINIT(value);
	}
	if(value==0){
		comboboxCheck(machineModel);
	}
	return;
}

//根据Job号获取对应的详情
function getSelectJobDetail(value){
	$.ajax({
		type : "post",
		async : false,
		url : "wps/getFnsDetail?machine=" + node11.id + "&chanel=" + parseInt(value,10),
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				var ary = eval(result.rows);
				$('#f0011').combobox('select', parseInt(ary[0].f001, 10));
				$("#f001").html($('#f0011').combobox('getText'));
				$("#f002").html(ary[0].f002);
				$("#f0021").numberbox('setValue',ary[0].f002);
				$("#f003").html(ary[0].f003);
				$("#f0031").numberbox('setValue',ary[0].f003);
				$("#f004").html(ary[0].f004);
				$("#f0041").numberbox('setValue',ary[0].f004);
				$("#f005").html(ary[0].f005);
				$("#f0051").numberbox('setValue',ary[0].f005);
				$("#f006").html(ary[0].f006);
				$("#f0061").numberbox('setValue',ary[0].f006);
				$("#f007").html(ary[0].f007);
				$("#f0071").numberbox('setValue',ary[0].f007);
				$("#f008").html(ary[0].f008);
				$("#f0081").numberbox('setValue',ary[0].f008);
				$("#f009").html(ary[0].f009);
				$("#f0091").numberbox('setValue',ary[0].f009);
				$("#f010").html(ary[0].f010);
				$("#f0101").numberbox('setValue',ary[0].f010);
				$('#f0111').combobox('select', parseInt(ary[0].f011,10));
				$("#f011").html($('#f0111').combobox('getText'));
//				$("#f0111").numberbox('setValue',ary[0].f011);
				$('#f0121').combobox('select', parseInt(ary[0].f012,10));
				$("#f012").html($('#f0121').combobox('getText'));
//				$("#f0121").numberbox('setValue',ary[0].f012);
				$('#f0131').combobox('select', parseInt(ary[0].f013,10));
				$("#f013").html($('#f0131').combobox('getText'));
//				$("#f0131").numberbox('setValue',ary[0].f013);
				$("#f014").html(ary[0].f014);
				$("#f0141").numberbox('setValue',ary[0].f014);
				$('#f0151').combobox('select', parseInt(ary[0].f015,10));
				$("#f015").html($('#f0151').combobox('getText'));
//				$("#f0151").numberbox('setValue',ary[0].f015);
				$("#f016").html(ary[0].f016);
				$("#f0161").numberbox('setValue',ary[0].f016);
				$("#f017").html(ary[0].f017);
				$("#f0171").numberbox('setValue',ary[0].f017);
				$("#f018").html(ary[0].f018);
				$("#f0181").numberbox('setValue',ary[0].f018);
				$("#f019").html(ary[0].f019);
				$("#f0191").numberbox('setValue',ary[0].f019);
				$("#f020").html(ary[0].f020);
				$("#f0201").numberbox('setValue',ary[0].f020);
				$("#f021").html(ary[0].f021);
				$("#f0211").numberbox('setValue',ary[0].f021);
				$("#f022").html(ary[0].f022);
				$("#f0221").numberbox('setValue',ary[0].f022);
				$("#f023").html(ary[0].f023);
				$("#f0231").numberbox('setValue',ary[0].f023);
				$("#f024").html(ary[0].f024);
				$("#f0241").textbox('setValue',ary[0].f024);
				$("#tdfadvance").html(ary[0].fadvance);
				$("#infadvance").numberbox('setValue',ary[0].fadvance);
				$("#tdfhysteresis").html(ary[0].fhysteresis);
				$("#infhysteresis").numberbox('setValue',ary[0].fhysteresis);
				$("#tdjobno").html(ary[0].jobno);
				$("#injobno").textbox('setValue',ary[0].jobno);
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
}

//打开新增job号的dialog框
function openAddJobNoDlg(value){
	$("#addjobfm").form("disableValidation");
	$('#addjobdg').window( {
		title : "新增Job",
		modal : true
	});
	$('#addjobdg').window('open');
	$('#addjobfm').form('clear');
	selectFunFlag = value;
}

//选择另存为还是默认值
function selectFun(){
	if(selectFunFlag==0){
		saveJobNo();
	}else{
		saveJobDetail(1);
	}
}

//新增Job号并初始化
function saveJobNo(){
	$('#addjobfm').form('submit', {
		url : "wps/addJobNoDetail?jobno="+$('#jobno').combobox('getValue')+"&machid="+node11.id,
		onSubmit : function() {
			//return $(this).form('enableValidation').form('validate');
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
					$("#fnsjoblist").datagrid("clearSelections");
					$('#addjobdg').dialog('close');
					$('#fnsjoblist').datagrid('reload');
					$.messager.alert("提示", "保存成功");
					getSelectJobDetail($('#jobno').combobox('getValue'));
				}
			}
			
		},  
	    error : function(errorMsg) {  
	        alert("数据请求失败，请联系系统管理员!");  
	    } 
	});
}

//保存Job参数详情
function saveJobDetail(value){
	var jobno = 0;
	if(value==0){
		jobno = $('#injobno').textbox('getValue');
	}else{
		jobno = $('#jobno').combobox('getValue');
		$("#f0241").textbox('setValue',$('#jobname').textbox('getValue'));
	}
	var fadvance = $('#infadvance').numberbox('getValue')
	var fhysteresis = $('#infhysteresis').numberbox('getValue');
	$('#jobdetailform').form('submit', {
		url : "wps/updateJobNoDetail?jobno="+parseInt(jobno,10)+"&fadvance="+fadvance+"&fhysteresis="+fhysteresis+"&machid="+node11.id+"&flag="+value,
		onSubmit : function() {
			//return $(this).form('enableValidation').form('validate');
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
					getSelectJobDetail(jobno);
					$("#fnsjoblist").datagrid("clearSelections");
					$.messager.alert("提示", "保存成功");
					if(value==1){
						$('#addjobdg').dialog('close');
					}
					$('#fnsjoblist').datagrid('reload');
				}
			}
			
		},  
	    error : function(errorMsg) {  
	        alert("数据请求失败，请联系系统管理员!");  
	    } 
	});
}

//删除调整
function deleteAdjustment(){
	getSelectJobDetail(jobNoTemp);
}

//删除Job
function deleteJob(){
	$.messager.confirm('提示', '此操作不可撤销，是否确认删除?', function(flag) {
		if (flag) {
			$.ajax({
				type : "post",
				async : false,
				url : "wps/deleteJob?jobno="+parseInt($('#injobno').textbox('getValue'),10)+"&machid="+node11.id,
				data : {},
				dataType : "json", //返回数据形式为json  
				success : function(result) {
					if (result) {
						if (!result.success) {
							$.messager.show({
								title : 'Error',
								msg : result.msg
							});
						} else {
							$.messager.alert("提示", "删除成功！");
							$('#injobno').textbox('setValue',"");
							$('#fnsjoblist').datagrid('reload');
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

function gfsd() {
	var mySelect = $("#fgas option");
	$("#fselect").combobox({
		onSelect : function(record) {
			if (node11 != null) {
				if(machineModel == 184){
					if(record.value == 102){
					document.getElementById("gebie3").style.display = "none";
					document.getElementById("yiyuan1").style.display = "none";
					document.getElementById("yiyuan3").style.display = "none";
					document.getElementById("gebie1").style.display = "block";
					}else{
						document.getElementById("yiyuan1").style.display = "block";
						document.getElementById("yiyuan3").style.display = "none";
						document.getElementById("gebie1").style.display = "none";
						document.getElementById("gebie3").style.display = "none";
					}
				}else{
				if (record.value == 102) {
					document.getElementById("yiyuan1").style.display = "none";
					document.getElementById("yiyuan3").style.display = "none";
					document.getElementById("gebie1").style.display = "block";
					document.getElementById("gebie3").style.display = "block";
				} else {
					document.getElementById("yiyuan1").style.display = "block";
					document.getElementById("yiyuan3").style.display = "block";
					document.getElementById("gebie1").style.display = "none";
					document.getElementById("gebie3").style.display = "none";
				}
				}
			}
		}
	});
}


//提交
function save(value) {
   /*if(!validationFrom()){
    	return;
    }*/
	if (machineModel == 174) {
		if (EPWCHECK() == false) {
			return;
		}
	} else if (machineModel == 175) {
		if (EPSCHECK() == false) {
			return;
		}
	} else if (machineModel == 176) {
		if (WBMLCHECK() == false) {
			return;
		}
	} else if (machineModel == 177) {
		if (WBPCHECK() == false) {
			return;
		}
	} else if (machineModel == 178) {
		if (WBLCHECK() == false) {
			return;
		}
	} else if (machineModel == 172) {
		if (CPVESCHECK() == false) {
			return;
		}
	} else if (machineModel == 173) {
		if (CPVETCHECK() == false) {
			return;
		}
	} else if (machineModel == 182) {
		if (WBWCHECK() == false) {
			return;
		}
	}else if (machineModel == 184) {
		if (SPCCHECK() == false) {
			return;
		}
	}else{
		if (CPVEWCHECK() == false) {
			return;
			}
		}
	var url2 = "";
	var finitial;
	var fcontroller;
	var fmode;
	var ftorch;
	var arc_length;
	if ($("#finitial").is(":checked") == true) {
		finitial = 1;
	} else {
		finitial = 0;
	}
	
	if ($("#fcontroller").is(":checked") == true) {
		fcontroller = 1;
	} else {
		fcontroller = 0;
	}
	if ($("#fmode").is(":checked") == true) {
		fmode = 1;
	} else {
		fmode = 0;
	}
	if ($("#ftorch").is(":checked") == true) {
		ftorch = 1;
	} else {
		ftorch = 0;
	}if ($("#arc_length").is(":checked") == true) {
		arc_length = 1;
	} else {
		arc_length = 0;
	}
	var fselect = $('#fselect').combobox('getValue');//一元个别
	var farc = $('#farc').combobox('getValue');//收弧
	var fmaterial = $('#fmaterial').combobox('getValue');//材料
	var fgas = $('#fgas').combobox('getValue');//气体
	var fdiameter = $('#fdiameter').combobox('getValue');//焊丝直径
	var chanel = $('#fchanel').combobox('getValue');//通道号
	var ftime = $('#ftime').numberbox('getValue');//点焊时间
	var fadvance = $('#fadvance').numberbox('getValue');//提前送气
	var fini_ele = $('#fini_ele').numberbox('getValue');//初期电流
	var fweld_ele = $('#fweld_ele').numberbox('getValue');//焊接电流
	var farc_ele = $('#farc_ele').numberbox('getValue');//收弧电流
	var fhysteresis = $('#fhysteresis').numberbox('getValue');//滞后送气
	/****上海通用焊机****/
	var firsttime= $("#firsttime").numberbox('getValue');//初期时间
	var farc_time = $("#farc_time").numberbox('getValue');//收弧时间
	var fcharacter = $("#fcharacter").numberbox('getValue');//电弧特性
	var Rush = $("#Rush").numberbox('getValue');//回烧修正
	var handarc_ele = $("#handarc_ele").numberbox('getValue');//手工焊热引弧电流
	var handarc_time = $("#handarc_time").numberbox('getValue');//手工焊热引弧时间
	var hand_ele = $("#hand_ele").numberbox('getValue');//手工焊热推力电流
	var Base_ele = $("#Base_ele").numberbox('getValue');//基值电流
	var Base_vol = $("#Base_vol").numberbox('getValue');//基值电压
	var Base_vol1 = $("#Base_vol1").numberbox('getValue');//基值电压一元
	var fargon = $("#fargon").combobox('getValue');//氩弧焊模式选择
	var manual_weld = $("#manual_weld").combobox('getValue');//手/气焊选择
	var pulse = $("#pulse").combobox('getValue');//双脉冲
	var fweldparameters = $('#fweldparameters').combobox('getValue');//焊接参数
	var rise_time = $("#rise_time").numberbox('getValue');//缓升时间
	var decline_time = $("#decline_time").numberbox('getValue');//缓降时间
	var thrust_ele = $("#thrust_ele").numberbox('getValue');//推力电流
	var pulse_ratio = $("#pulse_ratio").numberbox('getValue');//双脉冲占空比
	var point_speed = $("#point_speed").numberbox('getValue');//点动送丝速度
	var fini_vol1 = $('#fini_vol1').numberbox('getValue');
	var fweld_vol1 = $('#fweld_vol1').numberbox('getValue');
	var farc_vol1 = $('#farc_vol1').numberbox('getValue');
	/****上海通用焊机****/
	var fcharacter = $('#fcharacter').numberbox('getValue');
	var fweld_tuny_ele = $('#fweld_tuny_ele').numberbox('getValue');
	var farc_tuny_ele = $('#farc_tuny_ele').numberbox('getValue');
	var fini_vol = $('#fini_vol').numberbox('getValue');
	var fweld_vol = $('#fweld_vol').numberbox('getValue');
	var farc_vol = $('#farc_vol').numberbox('getValue');
	var fprocess = $('#fweldprocess').combobox('getValue');
	if (fselect == 102) {
		var fweld_tuny_vol = $('#fweld_tuny_vol').numberbox('getValue');
		var farc_tuny_vol = $('#farc_tuny_vol').numberbox('getValue');
	} else {
		var fweld_tuny_vol = $('#fweld_tuny_vol1').numberbox('getValue');
		var farc_tuny_vol = $('#farc_tuny_vol1').numberbox('getValue');
	}
	var machine = node11.id;
	var frequency = $('#frequency').numberbox('getValue');
	var gasflow = $('#gasflow').numberbox('getValue');
	var weldingratio = $('#weldingratio').numberbox('getValue');
	messager = "保存成功！";
	if(machineModel == 184){
		url2 = "wps/apSpc" + "?finitial=" + finitial + "&fcontroller=" + fcontroller + "&fmode=" + fmode + "&fselect=" + fselect + "&farc=" + farc + "&fmaterial=" + fmaterial + "&fgas=" + fgas + "&fdiameter=" + fdiameter + "&chanel=" + chanel + "&ftime=" + ftime + "&fadvance=" + fadvance + "&fini_ele=" + fini_ele + "&fweld_ele=" + fweld_ele + "&farc_ele=" + farc_ele + "&fhysteresis=" + fhysteresis + "&fcharacter=" + fcharacter + "&fweld_tuny_ele=" + fweld_tuny_ele + "&farc_tuny_ele=" + farc_tuny_ele + "&fini_vol=" + fini_vol +
		"&fini_vol1=" + fini_vol1 + "&fweld_vol=" + fweld_vol + "&fweld_vol1=" + fweld_vol1 + "&farc_vol=" + farc_vol + "&farc_vol1=" + farc_vol1 + "&fweld_tuny_vol=" + fweld_tuny_vol + "&farc_tuny_vol=" + farc_tuny_vol +  "&ftorch=" + ftorch + "&frequency=" + frequency + "&gasflow=" + gasflow + "&weldingratio=" + weldingratio+ "&machine=" + machine+"&firsttime="+firsttime+ "&farc_time="+farc_time+ "&Rush="+Rush +"&handarc_ele="+handarc_ele +"&handarc_time=" +handarc_time +"&hand_ele="+hand_ele +
		"&Base_ele="+Base_ele +"&Base_vol=" +Base_vol+"&Base_vol1="+Base_vol1 +"&fargon=" +fargon +"&manual_weld="+manual_weld +"&arc_length="+arc_length +"&pulse="+pulse +"&fweldparameters="+fweldparameters+"&rise_time="+rise_time +"&decline_time="+decline_time+"&thrust_ele="+thrust_ele+"&pulse_ratio="+pulse_ratio +"&point_speed="+point_speed;
	}else{
		url2 = "wps/apSpe" + "?finitial=" + finitial + "&fcontroller=" + fcontroller + "&fmode=" + fmode + "&fselect=" + fselect + "&farc=" + farc + "&fmaterial=" + fmaterial + "&fgas=" + fgas + "&fdiameter=" + fdiameter + "&chanel=" + chanel + "&ftime=" + ftime + "&fadvance=" + fadvance + "&fini_ele=" + fini_ele + "&fweld_ele=" + fweld_ele + "&farc_ele=" + farc_ele + "&fhysteresis=" + fhysteresis + "&fcharacter=" + fcharacter + "&fweld_tuny_ele=" + fweld_tuny_ele + "&farc_tuny_ele=" + farc_tuny_ele + "&fini_vol=" + fini_vol + "&fini_vol1=" + fini_vol1 + "&fweld_vol=" + fweld_vol + "&fweld_vol1=" + fweld_vol1 + "&farc_vol=" + farc_vol + "&farc_vol1=" + farc_vol1 + "&fweld_tuny_vol=" + fweld_tuny_vol + "&farc_tuny_vol=" + farc_tuny_vol + "&fprocess=" + fprocess + "&ftorch=" + ftorch + "&frequency=" + frequency + "&gasflow=" + gasflow + "&weldingratio=" + weldingratio+ "&machine=" + machine;
	}
	$.ajax({
		type : "post",
		async : false,
		url : url2,
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (!result.success) {
				if (value == 0) {
					$.messager.show({
						title : 'Error',
						msg : result.errorMsg
					});
				}
			} else {
				if (value == 0) {
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
function insframeworkTree() {
	$("#speTree").tree({
		onClick : function(node) {
			for (var mm = 0; mm < allMachineModel.length; mm++) {
				if (allMachineModel[mm].id == node.id) {
					machineModel = allMachineModel[mm].model;
					break;
				}
			}
			node11 = $(this).tree("getSelected");
			var leve = $(this).tree("getLevel", node11.target);
			if ((leve == 1) || (leve == 2) || (leve == 3) || (leve == 4)) {
				alert("请选择对应的焊机！！！");
			} else {
				if(machineModel!=183){
					document.getElementById("body").style.display = "block";
					document.getElementById("bodyy").style.display = "none";
					document.getElementById("fnsbody").style.display = "none";
				}else{
					document.getElementById("body").style.display = "none";
					document.getElementById("bodyy").style.display = "none";
					document.getElementById("fnsbody").style.display = "block";
				}
				chushihua(1);
				$("#ro").datagrid({
					height : $("#tab").height(),
					width : $("#tab").width(),
					idField : 'id',
					pageSize : 10,
					pageList : [ 10, 20, 30, 40, 50 ],
					url : "weldingMachine/getWedlingMachineList?searchStr=" + "(w.fmodel=" + machineModel + " and w.fequipment_no!=" + node11.text + ")",
					singleSelect : false,
					rownumbers : true,
					showPageList : false,
					columns : [ [ {
						field : 'ck',
						checkbox : true
					}, {
						field : 'id',
						title : '序号',
						width : 50,
						halign : "center",
						align : "left",
						hidden : true
					}, {
						field : 'equipmentNo',
						title : '固定资产编号',
						width : 80,
						halign : "center",
						align : "left"
					}, {
						field : 'insframeworkName',
						title : '所属项目',
						width : 100,
						halign : "center",
						align : "left"
					}, {
						field : 'manufacturerName',
						title : '厂家',
						width : 100,
						halign : "center",
						align : "left"
					}, {
						field : 'gatherId',
						title : '采集序号',
						width : 100,
						halign : "center",
						align : "left"
					}, {
						field : 'ip',
						title : 'ip地址',
						width : 160,
						halign : "center",
						align : "left"
					}, {
						field : 'modelname',
						title : '设备型号',
						width : 130,
						halign : "center",
						align : "left"
					}, {
						field : 'model',
						title : '设备型号id',
						width : 100,
						halign : "center",
						align : "left",
						hidden : true
					}, {
						field : 'manuno',
						title : '厂商id',
						width : 100,
						halign : "center",
						align : "left",
						hidden : true
					}, {
						field : 'typeId',
						title : '类型id',
						width : 100,
						halign : "center",
						align : "left",
						hidden : true
					}, {
						field : 'iId',
						title : '项目id',
						width : 100,
						halign : "center",
						align : "left",
						hidden : true
					}, {
						field : 'gid',
						title : '采集id',
						width : 100,
						halign : "center",
						align : "left",
						hidden : true
					}
					] ],
					pagination : true,
					fitColumns : true,
					rowStyler : function(index, row) {
						if ((index % 2) != 0) {
							//处理行代背景色后无法选中
							var color = new Object();
							return color;
						}
					}
				});
			}
		}
	})
}

$(document).ready(function() {
	$("#item").combobox({
		onSelect : function(record) {
			$("#ro").datagrid('load', {
				"parent" : record.value
			})
		}
	});
});

function suoqu() {
/*	var da = "7E350101015200010001001e0001006400be0000006e00c30000006400be000000010001000C000000c1010b0000001e001400000000AB7D";
	if (machineModel == 174) {
		EPWGET(da);
	} else if (machineModel == 175) {
		EPSGET(da);
	} else if (machineModel == 176) {
		WBMLGET(da);
	} else if (machineModel == 177) {
		WBPGET(da);
	} else if (machineModel == 178) {
		WBLGET(da);
	} else if (machineModel == 171) {
		CPVEWGET(da);
	} else if (machineModel == 172) {
		CPVESGET(da);
	} else if (machineModel == 173) {
		CPVETGET(da);
	}
	return;*/
	var socketfc = null;
	symbol = 0;
	if (typeof (WebSocket) == "undefined") {
		WEB_SOCKET_SWF_LOCATION = "resources/js/WebSocketMain.swf";
		WEB_SOCKET_DEBUG = true;
	}
	socketfc = new WebSocket(data1);
	//打开事件
	socketfc.onopen = function() {

		var chanel = parseInt($('#fchanel').numberbox('getValue')).toString(16);
		if (chanel.length < 2) {
			var length = 2 - chanel.length;
			for (var i = 0; i < length; i++) {
				chanel = "0" + chanel;
			}
		}
		var mach;
		if (machga != null) {
			for (var q = 0; q < machga.length; q++) {
				if (machga[q].id == node11.id) {
					if (machga[q].gatherId) {
						mach = parseInt(machga[q].gatherId).toString(16);
						if (mach.length < 4) {
							var length = 4 - mach.length;
							for (var i = 0; i < length; i++) {
								mach = "0" + mach;
							}
							;
							break;
						}
					} else {
						alert("该焊机未对应采集编号!!!");
						return;
					}
				}
			}
		}
		var xxx = "7E0901010156" + mach + chanel;
		var check = 0;
		for (var i = 0; i < (xxx.length / 2); i++) {
			var tstr1 = xxx.substring(i * 2, i * 2 + 2);
			var k = parseInt(tstr1, 16);
			check += k;
		}

		var checksend = parseInt(check).toString(16);
		var a2 = checksend.length;
		checksend = checksend.substring(a2 - 2, a2);
		checksend = checksend.toUpperCase();
		socketfc.send(xxx + checksend + "7D");
		if (symbol == 0) {
			window.setTimeout(function() {
				if (symbol == 0) {
					socketfc.close();
					alert("焊机长时间未响应，索取失败");
				}
			}, 5000)
		}
		socketfc.onmessage = function(msg) {
			var da = msg.data;
			if (da.substring(0, 2) == "7E" && da.substring(10, 12) == "56") {
				if (da.substring(18, 20) == "FF") {
					symbol++;
					socketfc.close();
					if (socketfc.readyState != 1) {
						alert("此通道没有规范，请尝试新建规范，可恢复默认值进行参考");
					}
				} else {
					if (machineModel == 174) {
						EPWGET(da);
					} else if (machineModel == 175) {
						EPSGET(da);
					} else if (machineModel == 176) {
						WBMLGET(da);
					} else if (machineModel == 177) {
						WBPGET(da);
					} else if (machineModel == 178) {
						WBLGET(da);
					} else if (machineModel == 172) {
						CPVESGET(da);
					} else if (machineModel == 173) {
						CPVETGET(da);
					}else if (machineModel == 182) {
						WBWGET(da);
					} else if (machineModel == 184) {
						SPCGET(da);
					} else{
						CPVEWGET(da);
					}
					symbol++;
					socketfc.close();
					if (socketfc.readyState != 1) {
						alert("索取成功");
					}
				}
			}
		}
	}
}

function validationFrom(){
	return $("#fm").form('enableValidation').form('validate');
}

function xiafa() {
    if(!validationFrom()){
    	return;
    }
	if (machineModel == 174) {
		if (EPWCHECK() == false) {
			return;
		}else{
			EPW(null, null);
		}
	} else if (machineModel == 175) {
		if (EPSCHECK() == false) {
			return;
		}else{
			EPS(null, null);
		}
	} else if (machineModel == 176) {
		if (WBMLCHECK() == false) {
			return;
		}else{
			WBML(null, null);
		}
	} else if (machineModel == 177) {
		if (WBPCHECK() == false) {
			return;
		}else{
			WBP(null, null);
		}
	}else if (machineModel == 182) {
		if (WBWCHECK() == false) {
			return;
		}else{
			WBW(null, null);
		}
	} else if (machineModel == 184) {
		if (SPCCHECK() == false) {
			return;
		}else{
			SPC(null, null);
		}
	} else if (machineModel == 172) {
		if (CPVESCHECK() == false) {
			return;
		}else{
			CPVES(null, null);
		}
	} else if (machineModel == 173) {
		if (CPVETCHECK() == false) {
			return;
		}else{
			CPVET(null, null);
		}
	} else{
		if (CPVEWCHECK() == false) {
			return;
		}else{
			CPVEW(null, null);
		}
	}
}

function copy(value) {
	if (value == 1) {
		$.ajax({
			type : "post",
			async : false,
			url : "wps/findCount?mac=" + node11.id + "&chanel=",
			data : {},
			dataType : "json", //返回数据形式为json  
			success : function(result) {
				if (result) {
					chanelCount = eval(result.count);
				}
			},
			error : function(errorMsg) {
				alert("数据请求失败，请联系系统管理员!");
			}
		});
		if (chanelCount == 0) {
			alert("该焊机所有通道都不存在参数，无法复制给別的焊机");
			return;
		}
	} else {
		$.ajax({
			type : "post",
			async : false,
			url : "wps/findCount?mac=" + node11.id + "&chanel=" + $('#fchanel').combobox('getValue'),
			data : {},
			dataType : "json", //返回数据形式为json  
			success : function(result) {
				if (result) {
					chanelCount = eval(result.count);
				}
			},
			error : function(errorMsg) {
				alert("数据请求失败，请联系系统管理员!");
			}
		});
		if (chanelCount == 0) {
			alert("该焊机当前通道不存在参数，无法复制给別的焊机");
			return;
		}
	}
	document.getElementById("mu").innerHTML = "源目标焊机：" + node11.text;
	$('#divro').window({
		title : "目标焊机选择",
		modal : true
	});
	$('#divro').window('open');
	symbol2 = value;
}

//通道复制
function savecopy() {
	var smachine = node11.id;
	rows = "";
	var chanel1 = $('#fchanel').combobox('getValue');
	var rows = $("#ro").datagrid("getSelections");
	var ro1Rows = new Array();
	/*var str = {};*/
	var obj = {};
	for (var i = 0; i < rows.length; i++) {
		if (!rows[i].gatherId) {
			/*str = {};*/
			ro1Rows.length = 0;
			alert(rows[i].equipmentNo + "焊机未绑定采集模块！！！")
			return;
		}
		/*str.equipmentNo = rows[i].equipmentNo;
		str.gatherNo = rows[i].gatherId;
		str.num = chanel1;
		str.nonum = chanel1;
		str.readynum = 0;
		str.failnum = 0;
		ro1Rows.push(str);*/
		ro1Rows.push({
			equipmentNo : rows[i].equipmentNo,
			gatherNo : rows[i].gatherId,
			num : chanel1,
			nonum : chanel1,
			readynum : '',
			failnum : ''
		})
	}
	obj.total = ro1Rows.length;
	obj.rows = ro1Rows;
	/*	if(symbol2==1){
			var url="wps/findCount?mac="+smachine+"&str="+str+"&chanel="+"";
		}else{
			var chanel = $('#fchanel').numberbox('getValue');
			var url="wps/findCount?mac="+smachine+"&str="+str+"&chanel="+chanel;
		}*/
	$("#ro1").datagrid({
		fitColumns : true,
		height : $("#divro1").height(),
		width : $("#divro1").width(),
		idField : 'id',
		url : '/',
		singleSelect : false,
		rownumbers : true,
		columns : [ [ {
			field : 'equipmentNo',
			title : '焊机编号',
			width : 80,
			halign : "center",
			align : "left"
		}, {
			field : 'gatherNo',
			title : '采集编号',
			width : 80,
			halign : "center",
			align : "left"
		}, {
			field : 'num',
			title : '通道号',
			width : 80,
			halign : "center",
			align : "left"
		}, {
			field : 'nonum',
			title : '未响应通道号',
			width : 80,
			halign : "center",
			align : "left"
		}, {
			field : 'readynum',
			title : '已完成通道号',
			width : 80,
			halign : "center",
			align : "left"
		}, {
			field : 'failnum',
			title : '失败通道号',
			width : 80,
			halign : "center",
			align : "left"
		} ] ]
	});
	var r = confirm("确认复制吗？");
	if (r == true) {
		x = 0;
		xx = 0;
		$('#divro').dialog('close');
		$('#divro1').window({
			title : "参数复制进行中，请稍等。。。",
			modal : true
		});
		$('#divro1').window('open');
		$("#ro1").datagrid("loadData", obj);
		if (symbol2 == 1) {
			var url1 = "wps/Spe?machine=" + node11.id + "&chanel=" + "";
		} else {
			var url1 = "wps/Spe?machine=" + node11.id + "&chanel=" + chanel1;
		}
		$.ajax({
			type : "post",
			async : false,
			url : url1,
			data : {},
			dataType : "json", //返回数据形式为json  
			success : function(result) {
				if (result) {
					yshu1 = eval(result.rows);
					for(var i=0;i<obj.total;i++){
						var chanelnum = result.chanelNum.substr(0, result.chanelNum.length-1);
						obj.rows[i].num = chanelnum;
						obj.rows[i].nonum = chanelnum;
					}
					$("#ro1").datagrid("loadData", obj);
				} else {
					alert("未查询到相关数据，请尝试索取保存。");
				}
			},
			error : function(errorMsg) {
				alert("数据请求失败，请联系系统管理员!");
			}
		});
		var yshuary = new Array();
		for(var q=0;q<rows.length;q++){
			for(var n=0;n<yshu1.length;n++){
				if (machineModel == 174) {
					yshuary.push(EPW(yshu1[n], rows[q].gatherId));
				} else if (machineModel == 175) {
					yshuary.push(EPS(yshu1[n], rows[q].gatherId));
				} else if (machineModel == 176) {
					yshuary.push(WBML(yshu1[n], rows[q].gatherId));
				} else if (machineModel == 177) {
					yshuary.push(WBP(yshu1[n], rows[q].gatherId));
				} else if (machineModel == 178) {
					yshuary.push(WBL(yshu1[n], rows[q].gatherId));
				} else if (machineModel == 172) {
					yshuary.push(CPVES(yshu1[n], rows[q].gatherId));
				} else if (machineModel == 173) {
					yshuary.push(CPVET(yshu1[n], rows[q].gatherId));
				} else if (machineModel == 182) {
					yshuary.push(WBW(yshu1[n], rows[q].gatherId));
				} else if (machineModel == 184) {
					yshuary.push(SPC(yshu1[n], rows[q].gatherId));
				} else{
					yshuary.push(CPVEW(yshu1[n], rows[q].gatherId));
				}
			}
		}
		socketfc = new WebSocket(data1);
/*		if (symbol1 == 0) {
			window.setTimeout(function() {
				if (symbol1 == 0) {
					rows.length = 0;
					str = "";
					$('#ro').datagrid('clearSelections');
					socketfc.close();
					alert("复制完成");
				}
			}, 15000)
		}*/
		socketfc.onopen = function() {
			rows1 = ro1Rows;
			/*ccp(rows[0].gatherId);*/
			window.setInterval(function() {
				if(yshuary.length>0){
					socketfc.send(yshuary.pop());
				}
			}, 250)
			wait();
		}
		socketfc.onmessage = function(msg) {
			var fan = msg.data;
			if (fan.substring(0, 2) == "7E" && fan.substring(10, 12) == "52") {
				if (parseInt(fan.substring(18, 20), 16) == 1) {
					x++;
					if (x == rows1[xx].num.toString().split(",").length) {
						xx++;
						x=0;
						if (xx == rows1.length) {
							socketfc.close();
							if (socketfc.readyState != 1) {
								wait();
								alert("复制完成");
								symbol1++;
								x = 0;
								xx = 0;
								rows1.length = 0;
								rows.length = 0;
								str = "";
								$('#ro').datagrid('clearSelections');
							}

						} /*else {
							ccp(rows[xx].gatherId);
						}*/
					}
					for(var i=0;i<obj.total;i++){
						var chanelnum = obj.rows[i].nonum.split(",");
						var gatherno = obj.rows[i].gatherNo;
						if(parseInt(fan.substring(12, 16), 16) == parseInt(gatherno) && chanelnum.indexOf(parseInt(fan.substring(16, 18), 16).toString())>=0){
							chanelnum.pop(parseInt(fan.substring(16, 18), 16));
							obj.rows[i].nonum = chanelnum.join(",");
							obj.rows[i].readynum += parseInt(fan.substring(16, 18), 16).toString()+",";
						}
					}
				} else {
					x++;
					if (x == rows1[xx].num.toString().split(",").length) {
						xx++;
						x=0;
						if (xx == rows1.length) {
							socketfc.close();
							if (socketfc.readyState != 1) {
								wait();
								alert("复制成功");
								symbol1++;
								x = 0;
								xx = 0;
								$('#divro1').dialog('close');
								rows1.length = 0;
								rows.length = 0;
								str = "";
								$('#ro').datagrid('clearSelections');
							}

						} /*else {
							ccp(rows[xx].gatherId);
						}*/
					} /*else {
						ccp(rows[xx].gatherId);
					}*/
					for(var i=0;i<obj.total;i++){
						var chanelnum = obj.rows[i].nonum.toString().split(",");
						var gatherno = obj.rows[i].gatherNo;
						if(parseInt(fan.substring(12, 16), 16) == parseInt(gatherno) && chanelnum.indexOf(parseInt(fan.substring(16, 18), 16).toString())>=0){
							chanelnum.pop(parseInt(fan.substring(16, 18), 16));
							obj.rows[i].nonum = chanelnum.join(",");
							obj.rows[i].readynum += parseInt(fan.substring(16, 18), 16).toString()+",";
						}
//						obj.rows[i].failnum = obj.rows[i].failnum.substring(0,obj.rows[i].failnum.length-1);
					}
				}
			}
			$("#ro1").datagrid("loadData", obj);
		}
	} else {
		$('#divro').dialog('close');
	}
}

/*function ccp(value) {
	if (x == rows1[xx].num) {
		x = 0;
	}
	if (machineModel == 174) {
		socketfc.send(EPW(yshu1[x], value));
	} else if (machineModel == 175) {
		socketfc.send(EPS(yshu1[x], value));
	} else if (machineModel == 176) {
		socketfc.send(WBML(yshu1[x], value));
	} else if (machineModel == 177) {
		socketfc.send(WBP(yshu1[x], value));
	} else if (machineModel == 178) {
		socketfc.send(WBL(yshu1[x], value));
	} else if (machineModel == 171) {
		socketfc.send(CPVEW(yshu1[x], value));
	} else if (machineModel == 172) {
		socketfc.send(CPVES(yshu1[x], value));
	} else if (machineModel == 173) {
		socketfc.send(CPVET(yshu1[x], value));
	}
	x++;
}*/

function wait() {
	var smachine = node11.id;
	rows = "";
	var rows = $("#ro").datagrid("getSelections");
	var str = "";
	for (var i = 0; i < rows.length; i++) {
		str += rows[i].id + ",";
	}
	;
	if (symbol2 == 1) {
		var url = "wps/saveCopy?mac=" + smachine + "&str=" + str + "&chanel=" + "";
	} else {
		var chanel = $('#fchanel').numberbox('getValue');
		var url = "wps/saveCopy?mac=" + smachine + "&str=" + str + "&chanel=" + chanel;
	}
	$.ajax({
		type : "post",
		async : false,
		url : url,
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (!result.success) {
				$.messager.show({
					title : 'Error',
					msg : result.errorMsg
				});
			} else {
				$('#ro').datagrid('clearSelections');
				$('#ro').datagrid('reload');
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
}
