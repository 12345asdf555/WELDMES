/**
 * 
 */
var websocketUrl;
var selectflag;
var wpslibindex;
var wpslibId;
var client,clientId;
$(function() {
	$.ajax({
		type : "post",
		async : false,
		url : "td/AllTdbf",
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				websocketUrl = result.web_socket;
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	mqttTest();
})

//选择工艺
function selectMainWps(value,model){
	wpslibId = value;
	if(model == 149){
		flag = 1;
		$('#sxSelectdlg').window( {
			title : "选择工艺",
			modal : true
		});
		$('#sxSelectdlg').window('open');
		showSelectSxWps(value);
		return;
	}
	$('#smwfm').form('clear');
	$('#smwdlg').window( {
		title : "选择工艺",
		modal : true
	});
	$("#mainWpsTable").datagrid( {
		height : $("#smwdlg").height(),
		width : $("#smwdlg").width(),
		idField : 'fid',
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		url : "wps/getMainwpsList?parent="+value,
		singleSelect : false,
		rownumbers : true,
		showPageList : false, 
        columns : [ [ {
		    field:'ck',
			checkbox:true
		},{
			field : 'fid',
			title : 'FID',
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'fmodel',
			title : '焊机型号',
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'FWPSNum',
			title : 'Job号',
			halign : "center",
			align : "left"
		}, {
			field : 'fchanel',
			title : 'Job号',
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'fselect',
			title : '焊接模式',
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'fselectname',
			title : '焊接模式',
			halign : "center",
			align : "left"
		}, {
			field : 'fselectstep',
			title : 'Step',
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'fselectstepname',
			title : 'Step',
			halign : "center",
			align : "left"
		}, {
			field : 'fmaterial',
			title : '材质',
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'materialname',
			title : '材质',
			halign : "center",
			align : "left"
		}, {
			field : 'fdiameter',
			title : '丝径',
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'dianame',
			title : '丝径',
			halign : "center",
			align : "left"
		}, {
			field : 'fgas',
			title : '气体',
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'gasname',
			title : '气体',
			halign : "center",
			align : "left"
		}, {
			field : 'fcharacter',
			title : '给定电感',
			halign : "center",
			align : "left"
		}, {
			field : 'frequency',
			title : '双脉冲频率',
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'fadvance',
			title : '提前送气时间',
			halign : "center",
			align : "left"
		}, {
			field : 'ftime',
			title : '点焊时间',
			halign : "center",
			align : "left"
		}, {
			field : 'fini_ele',
			title : '初期电流',
			halign : "center",
			align : "left"
		}, {
			field : 'fweld_ele',
			title : '焊接电流',
			halign : "center",
			align : "left"
		}, {
			field : 'farc_ele',
			title : '收弧电流',
			halign : "center",
			align : "left"
		}, {
			field : 'fini_vol',
			title : '初期电压',
			halign : "center",
			align : "left"
		}, {
			field : 'fweld_vol',
			title : '焊接电压',
			halign : "center",
			align : "left"
		}, {
			field : 'farc_vol',
			title : '收弧电压',
			halign : "center",
			align : "left"
		}, {
			field : 'fspeed',
			title : '给定速度',
			halign : "center",
			align : "left"
		}, {
			field : 'farc_speed',
			title : '初期给定速度',
			halign : "center",
			align : "left"
		}, {
			field : 'farc_tuny_speed',
			title : '收弧给定速度',
			halign : "center",
			align : "left"
		},{
			field : 'fweld_tuny_ele',
			title : '焊接电流微调',
			halign : "center",
			align : "left"
		}, {
			field : 'fweld_tuny_vol',
			title : '焊接电压微调',
			halign : "center",
			align : "left"
		}, {
			field : 'fini_tuny_vol',
			title : '初期电压微调',
			halign : "center",
			align : "left"
		}, {
			field : 'farc_tuny_vol',
			title : '收弧电压微调',
			halign : "center",
			align : "left"
		}, {
			field : 'fwpsback',
			title : '备注',
			halign : "center",
			align : "left"
		}
		] ],
		pagination : true,
		rowStyler: function(index,row){
            if ((index % 2)!=0){
            	//处理行代背景色后无法选中
            	var color=new Object();
//	                color.class="rowColor";
                return color;
            }
        }
	});
	$('#smwdlg').window('open');
/*	if($('#ddv-'+value).datagrid()){
		var rows = $('#ddv-'+value).datagrid('getSelections');
		if(rows.length==0){
			alert("请先选择工艺!!!");
		}else{
			selectMachineList(1);
		}
	}*/
}

//松下工艺选择
function showSelectSxWps(id) {
	$("#sxSelectWpsTab").datagrid({
		height : ($("#sxSelectdlg").height()),
		width : $("#sxSelectdlg").width(),
		idField : 'id',
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		url : "wps/getSxWpsList?fwpslib_id="+id,
		rownumbers : true,
		pagination : true,
		showPageList : false,
		columns : [ [ {
		    field:'ck',
			checkbox:true
		},{ 
			field : 'fid',
			title : 'FID',
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'fwpsnum',
			title : '通道号',
			halign : "center",
			align : "left"
		}, {
			field : 'fmaterial',
			title : '材质',
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'materialname',
			title : '材质',
			halign : "center",
			align : "left"
		}, {
			field : 'fdiameter',
			title : '丝径',
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'dianame',
			title : '丝径',
			halign : "center",
			align : "left"
		}, {
			field : 'fgas',
			title : '气体',
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'gasname',
			title : '气体',
			halign : "center",
			align : "left"
		}, {
			field : 'fcontroller',
			title : '焊接控制',
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'fcontrollername',
			title : '焊接控制',
			halign : "center",
			align : "left"
		}, {
			field : 'farc',
			title : '脉冲有无',
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'farcname',
			title : '脉冲有无',
			halign : "center",
			align : "left"
		}, {
			field : 'selectname',
			title : '分别/一元',
			halign : "center",
			align : "left"
		}, /*{
			field : 'ininame',
			title : '干伸长度',
			halign : "center",
			align : "left"
		}, */{
			field : 'fselect',
			title : '分别/一元',
			halign : "center",
			align : "left",
			hidden : true
		},  {
			field : 'ftime',
			title : '点焊时间',
			halign : "center",
			align : "left"
		}, {
			field : 'farc_delay_time',
			title : '启弧延时时间',
			halign : "center",
			align : "left"
		}, {
			field : 'fwarn_delay_time',
			title : '报警延时时间',
			halign : "center",
			align : "left"
		},/*{
			field : 'finitial',
			title : '干伸长度',
			halign : "center",
			align : "left",
			hidden : true
		},*/ {
			field : 'fpreset_ele_top',
			title : '预置电流上限',
			halign : "center",
			align : "left"
		}, {
			field : 'fpreset_ele_bottom',
			title : '预置电流下限',
			halign : "center",
			align : "left"
		}, {
			field : 'fpreset_vol_top',
			title : '预置电压上限',
			halign : "center",
			align : "left"
		}, {
			field : 'fpreset_vol_bottom',
			title : '预置电压下限',
			halign : "center",
			align : "left"
		}, {
			field : 'fini_vol1',
			title : '初期电流上限',
			halign : "center",
			align : "left"
		}, {
			field : 'fweld_tuny_ele',
			title : '初期电流下限',
			halign : "center",
			align : "left"
		}, {
			field : 'farc_vol',
			title : '初期电压上限',
			halign : "center",
			align : "left"
		}, {
			field : 'fweld_tuny_vol',
			title : '初期电压下线',
			halign : "center",
			align : "left"
		}, {
			field : 'fweld_vol1',
			title : '收弧电流上线',
			halign : "center",
			align : "left"
		}, {
			field : 'farc_tuny_ele',
			title : '收弧电流下线',
			halign : "center",
			align : "left"
		}, {
			field : 'farc_vol_top',
			title : '收弧电压上线',
			halign : "center",
			align : "left"
		}, {
			field : 'farc_tuny_vol',
			title : '收弧电压下线',
			halign : "center",
			align : "left"
		} ] ],
		rowStyler : function(index, row) {
			if ((index % 2) != 0) {
				//处理行代背景色后无法选中
				var color = new Object();
				return color;
			}
		}
	});
}


//选择焊机
function selectMachineList(value){
	if(value==1){
		var rows = $('#mainWpsTable').datagrid('getSelections');
		if(rows.length==0){
			alert("请先选择工艺!!!");
			return;
		}
	}
	var url = "";
	if(value==0 || value==1){
		var wpslibrow = $('#wpslibTable').datagrid('getSelected');
		url = "weldingMachine/getWedlingMachineList?searchStr="+"w.fmodel="+wpslibrow.model;
	}else if(value==2){
		url = "weldingMachine/getWedlingMachineList?searchStr="+"w.fmanufacturer_id="+152;
		if(!$('#passwd').numberbox('getValue')){
			alert("密码不能为空");
			return;
		}
		if(parseInt($('#passwd').numberbox('getValue'))<1||parseInt($('#passwd').numberbox('getValue'))>999){
			alert("密码范围是1~999");
			return;
		}
	}else if(value==3){
		url = "weldingMachine/getWedlingMachineList?searchStr="+"w.fmanufacturer_id="+152;
	}else if(value==4){
		url = "weldingMachine/getWedlingMachineList?searchStr="+"w.fmanufacturer_id="+149;
	}else if(value==5){
		url = "weldingMachine/getWedlingMachineList?searchStr="+"w.fmanufacturer_id="+149;
	}
	$('#smfm').form('clear');
	$('#smdlg').window( {
		title : "选择焊机",
		modal : true
	});
	machineList(url);
	if(value==1){
		$("#weldingmachineTable").datagrid({
			singleSelect: false
		});
		selectflag=1;
	}else if(value==2){
		$("#weldingmachineTable").datagrid({
			singleSelect: true
		});
		selectflag=2;
	}else if(value==3){
		$("#weldingmachineTable").datagrid({
			singleSelect: true
		});
		selectflag=3;
	}else if(value==0){
		$("#weldingmachineTable").datagrid({
			singleSelect: true
		});
		selectflag=0;
	}else if(value==4){
		$("#weldingmachineTable").datagrid({
			singleSelect: true
		});
		selectflag=4;
	}else if(value==5){
		$("#weldingmachineTable").datagrid({
			singleSelect: true
		});
		selectflag=5;
	}
	$('#smdlg').window('open');
}

function selectModel(){
	if(selectflag==0){
		requestWps();
	}else if(selectflag==1){
		giveMainWps();
	}else if(selectflag==2){
		passfun();
	}else if(selectflag==3){
		controlfun();
	}else if(selectflag==4){
		sxMachineIsLock(1);
	}else if(selectflag==5){
		sxMachineIsLock(0);
	}else{
		return;
	}
}

function showResult(){
	$('#resultfm').form('clear');
	$('#resultdlg').window( {
		title : "下发中，请稍等。。。",
		modal : true
	});
	$("#giveResultTable").datagrid( {
		height : $("#resultdlg").height(),
		width : $("#resultdlg").width(),
		idField : 'id',
/*		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],*/
		url : "/",
		singleSelect : true,
		rownumbers : false,
//		showPageList : false, 
        columns : [ [ {
			field : 'machineNo',
			title : '焊机编号',
			width : 80,
			halign : "center",
			align : "left"
		}, {
			field : 'gatherNo',
			title : '采集序号',
			width : 80,
			halign : "center",
			align : "left"
		}, {
			field : 'successNum',
			title : '成功通道',
			width : 300,
			halign : "center",
			align : "left"
		}, {
			field : 'failNum',
			title : '失败通道',
			width : 300,
			halign : "center",
			align : "left"
		}, {
			field : 'noNum',
			title : '未响应通道',
			width : 300,
			halign : "center",
			align : "left"
		}
		] ],
//		pagination : true,
		rowStyler: function(index,row){
            if ((index % 2)!=0){
            	//处理行代背景色后无法选中
            	var color=new Object();
                return color;
            }
        }
	});
	$('#resultdlg').window('open');
/*	$("#resultdlg").dialog({ 
		closeOnEscape:false,
	    open:function(event,ui){
	        $(".ui-dialog-titlebar-close").hide();
	    } 
	}); */
	$('#resultdlg').panel({
        closable:false
    });
	$('#resultOk').linkbutton('disable');
	$('#resultCancel').linkbutton('disable');
}

//索取规范
function requestWps() {
	var selectMachine = $('#weldingmachineTable').datagrid('getSelected');
	if (selectMachine) {
		if (!selectMachine.gatherId) {
			alert("该焊机未绑定采集模块");
			return;
		}
	} else {
		alert("请选择焊机");
		return;
	}
	var symbol = 0;
	var chanel = $('#fchanel').combobox('getValue').toString(16);
	if (chanel.length < 2) {
		var length = 2 - chanel.length;
		for (var i = 0; i < length; i++) {
			chanel = "0" + chanel;
		}
	}
	var mach = selectMachine.gatherId;
	if (mach.length < 4) {
		var length = 4 - mach.length;
		for (var i = 0; i < length; i++) {
			mach = "0" + mach;
		}
		;
	}
	var needGatherCheck = mach;
	var needChanelCheck = chanel;
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
	
	var message = new Paho.MQTT.Message(xxx + checksend + "7D");
	message.destinationName = "webdatadown";
	client.send(message);
	var oneMinuteTimer = window.setTimeout(function() {
		if (symbol == 0) {
			client.unsubscribe("webdataup", {
				onSuccess : function(e) {
					console.log("取消订阅成功");
				},
				onFailure : function(e) {
					console.log(e);
				}
			})
			$('#buttonCancel').linkbutton('enable');
			$('#buttonOk').linkbutton('enable');
			alert("焊机长时间未响应，索取失败");
		}
	}, 3000);
	client.subscribe("webdataup", {
		qos: 0,
		onSuccess:function(e){  
            console.log("订阅成功");  
        },
        onFailure: function(e){  
            console.log(e);  
        }
	})
	client.onMessageArrived = function(e){
		console.log("onMessageArrived:" + e.payloadString);
		var data = e.payloadString;
		if (data.substring(0, 2) == "7E" && data.substring(10, 12) == "56") {
			if (needChanelCheck.toUpperCase() == data.substring(18, 20) && needGatherCheck.toUpperCase() == data.substring(12, 16)) {
				client.unsubscribe("webdataup", {
					onSuccess : function(e) {
						console.log("取消订阅成功");
					},
					onFailure : function(e) {
						console.log(e);
					}
				});
				symbol = 1;
				window.clearTimeout(oneMinuteTimer);
				$('#buttonCancel').linkbutton('enable');
				$('#buttonOk').linkbutton('enable');
				if (data.substring(18, 20) == "FF") {
					alert("此通道没有规范!!!");
				} else {
					$('#fchanel').combobox('select', parseInt(data.substring(18, 20), 16));
					$("#ftime").numberbox('setValue', (parseFloat(parseInt(data.substring(20, 24), 16) / 10)).toFixed(1));
					$("#fadvance").numberbox('setValue', (parseFloat(parseInt(data.substring(24, 28), 16) / 10)).toFixed(1));
					$("#fini_ele").numberbox('setValue', parseInt(data.substring(28, 32), 16));
					$("#farc_speed").numberbox('setValue', (parseFloat(parseInt(data.substring(28, 32), 16) / 10)).toFixed(1));
					$("#fini_vol").numberbox('setValue', (parseFloat(parseInt(data.substring(32, 36), 16) / 10)).toFixed(1));
					$("#fweld_ele").numberbox('setValue', parseInt(data.substring(40, 44), 16));
					$("#fspeed").numberbox('setValue', (parseFloat(parseInt(data.substring(40, 44), 16) / 10)).toFixed(1));
					$("#fweld_vol").numberbox('setValue', (parseFloat(parseInt(data.substring(44, 48), 16) / 10)).toFixed(1));
					$("#farc_ele").numberbox('setValue', parseInt(data.substring(52, 56), 16));
					$("#farc_tuny_speed").numberbox('setValue', (parseFloat(parseInt(data.substring(52, 56), 16) / 10)).toFixed(1));
					$("#farc_vol").numberbox('setValue', (parseFloat(parseInt(data.substring(56, 60), 16) / 10)).toFixed(1));
					if(parseInt(data.substring(68, 72).substring(2,4),16)>127){
						$("#fcharacter").numberbox('setValue', parseInt("FFFFFF"+data.substring(70, 72), 16)<<0);
					}else{
						$("#fcharacter").numberbox('setValue', parseInt(data.substring(68, 72), 16));
					}
					var mdg = data.substring(76, 78);
					if (mdg == "00"){
						$('#fmaterial').combobox('select', '250');
						$('#fdiameter').combobox('select', '135');
						$('#fgas').combobox('select', '200');
					}else if (mdg == "01"){
						$('#fmaterial').combobox('select', '250');
						$('#fdiameter').combobox('select', '135');
						$('#fgas').combobox('select', '201');
					}else if (mdg == "02"){
						$('#fmaterial').combobox('select', '250');
						$('#fdiameter').combobox('select', '135');
						$('#fgas').combobox('select', '202');
					}else if (mdg == "03"){
						$('#fmaterial').combobox('select', '250');
						$('#fdiameter').combobox('select', '135');
						$('#fgas').combobox('select', '203');
					}else if (mdg == "04"){
						$('#fmaterial').combobox('select', '250');
						$('#fdiameter').combobox('select', '131');
						$('#fgas').combobox('select', '200');
					}else if (mdg == "05"){
						$('#fmaterial').combobox('select', '250');
						$('#fdiameter').combobox('select', '131');
						$('#fgas').combobox('select', '201');
					}else if (mdg == "06"){
						$('#fmaterial').combobox('select', '250');
						$('#fdiameter').combobox('select', '131');
						$('#fgas').combobox('select', '202');
					}else if (mdg == "07"){
						$('#fmaterial').combobox('select', '250');
						$('#fdiameter').combobox('select', '131');
						$('#fgas').combobox('select', '203');
					}else if (mdg == "08"){
						$('#fmaterial').combobox('select', '250');
						$('#fdiameter').combobox('select', '132');
						$('#fgas').combobox('select', '200');
					}else if (mdg == "09"){
						$('#fmaterial').combobox('select', '250');
						$('#fdiameter').combobox('select', '132');
						$('#fgas').combobox('select', '201');
					}else if (mdg == "0A"){
						$('#fmaterial').combobox('select', '250');
						$('#fdiameter').combobox('select', '132');
						$('#fgas').combobox('select', '202');
					}else if (mdg == "0B"){
						$('#fmaterial').combobox('select', '250');
						$('#fdiameter').combobox('select', '132');
						$('#fgas').combobox('select', '203');
					}else if (mdg == "0C"){
						$('#fmaterial').combobox('select', '250');
						$('#fdiameter').combobox('select', '134');
						$('#fgas').combobox('select', '201');
					}else if (mdg == "0D"){
						$('#fmaterial').combobox('select', '250');
						$('#fdiameter').combobox('select', '134');
						$('#fgas').combobox('select', '202');
					}else if (mdg == "0E"){
						$('#fmaterial').combobox('select', '250');
						$('#fdiameter').combobox('select', '134');
						$('#fgas').combobox('select', '203');
					}else if (mdg == "0F"){
						$('#fmaterial').combobox('select', '251');
						$('#fdiameter').combobox('select', '135');
						$('#fgas').combobox('select', '204');
					}else if (mdg == "10"){
						$('#fmaterial').combobox('select', '251');
						$('#fdiameter').combobox('select', '131');
						$('#fgas').combobox('select', '204');
					}else if (mdg == "11"){
						$('#fmaterial').combobox('select', '251');
						$('#fdiameter').combobox('select', '131');
						$('#fgas').combobox('select', '205');
					}else if (mdg == "12"){
						$('#fmaterial').combobox('select', '251');
						$('#fdiameter').combobox('select', '132');
						$('#fgas').combobox('select', '204');
					}else if (mdg == "13"){
						$('#fmaterial').combobox('select', '251');
						$('#fdiameter').combobox('select', '132');
						$('#fgas').combobox('select', '205');
					}else if (mdg == "14"){
						$('#fmaterial').combobox('select', '252');
						$('#fdiameter').combobox('select', '131');
						$('#fgas').combobox('select', '206');
					}else if (mdg == "15"){
						$('#fmaterial').combobox('select', '252');
						$('#fdiameter').combobox('select', '131');
						$('#fgas').combobox('select', '207');
					}else if (mdg == "16"){
						$('#fmaterial').combobox('select', '252');
						$('#fdiameter').combobox('select', '132');
						$('#fgas').combobox('select', '206');
					}else if (mdg == "17"){
						$('#fmaterial').combobox('select', '252');
						$('#fdiameter').combobox('select', '132');
						$('#fgas').combobox('select', '207');
					}else if (mdg == "18"){
						$('#fmaterial').combobox('select', '252');
						$('#fdiameter').combobox('select', '134');
						$('#fgas').combobox('select', '206');
					}else if (mdg == "19"){
						$('#fmaterial').combobox('select', '252');
						$('#fdiameter').combobox('select', '134');
						$('#fgas').combobox('select', '207');
					}else if (mdg == "1A"){
						$('#fmaterial').combobox('select', '253');
						$('#fdiameter').combobox('select', '131');
						$('#fgas').combobox('select', '206');
					}else if (mdg == "1B"){
						$('#fmaterial').combobox('select', '253');
						$('#fdiameter').combobox('select', '131');
						$('#fgas').combobox('select', '207');
					}else if (mdg == "1C"){
						$('#fmaterial').combobox('select', '253');
						$('#fdiameter').combobox('select', '132');
						$('#fgas').combobox('select', '206');
					}else if (mdg == "1D"){
						$('#fmaterial').combobox('select', '253');
						$('#fdiameter').combobox('select', '132');
						$('#fgas').combobox('select', '207');
					}else if (mdg == "1E"){
						$('#fmaterial').combobox('select', '253');
						$('#fdiameter').combobox('select', '134');
						$('#fgas').combobox('select', '206');
					}else if (mdg == "1F"){
						$('#fmaterial').combobox('select', '253');
						$('#fdiameter').combobox('select', '134');
						$('#fgas').combobox('select', '207');
					}else if (mdg == "20"){
						$('#fmaterial').combobox('select', '254');
						$('#fdiameter').combobox('select', '135');
						$('#fgas').combobox('select', '208');
					}else if (mdg == "21"){
						$('#fmaterial').combobox('select', '254');
						$('#fdiameter').combobox('select', '135');
						$('#fgas').combobox('select', '209');
					}else if (mdg == "22"){
						$('#fmaterial').combobox('select', '254');
						$('#fdiameter').combobox('select', '135');
						$('#fgas').combobox('select', '212');
					}else if (mdg == "23"){
						$('#fmaterial').combobox('select', '254');
						$('#fdiameter').combobox('select', '135');
						$('#fgas').combobox('select', '213');
					}else if (mdg == "24"){
						$('#fmaterial').combobox('select', '254');
						$('#fdiameter').combobox('select', '131');
						$('#fgas').combobox('select', '208');
					}else if (mdg == "25"){
						$('#fmaterial').combobox('select', '254');
						$('#fdiameter').combobox('select', '131');
						$('#fgas').combobox('select', '209');
					}else if (mdg == "26"){
						$('#fmaterial').combobox('select', '254');
						$('#fdiameter').combobox('select', '131');
						$('#fgas').combobox('select', '212');
					}else if (mdg == "27"){
						$('#fmaterial').combobox('select', '254');
						$('#fdiameter').combobox('select', '131');
						$('#fgas').combobox('select', '213');
					}else if (mdg == "28"){
						$('#fmaterial').combobox('select', '254');
						$('#fdiameter').combobox('select', '132');
						$('#fgas').combobox('select', '208');
					}else if (mdg == "29"){
						$('#fmaterial').combobox('select', '254');
						$('#fdiameter').combobox('select', '132');
						$('#fgas').combobox('select', '209');
					}else if (mdg == "2A"){
						$('#fmaterial').combobox('select', '254');
						$('#fdiameter').combobox('select', '132');
						$('#fgas').combobox('select', '212');
					}else if (mdg == "2B"){
						$('#fmaterial').combobox('select', '254');
						$('#fdiameter').combobox('select', '132');
						$('#fgas').combobox('select', '213');
					}else if (mdg == "2C"){
						$('#fmaterial').combobox('select', '255');
						$('#fdiameter').combobox('select', '131');
						$('#fgas').combobox('select', '210');
					}else if (mdg == "2D"){
						$('#fmaterial').combobox('select', '255');
						$('#fdiameter').combobox('select', '131');
						$('#fgas').combobox('select', '211');
					}else if (mdg == "2E"){
						$('#fmaterial').combobox('select', '255');
						$('#fdiameter').combobox('select', '132');
						$('#fgas').combobox('select', '210');
					}else if (mdg == "2F"){
						$('#fmaterial').combobox('select', '255');
						$('#fdiameter').combobox('select', '132');
						$('#fgas').combobox('select', '211');
					}else if (mdg == "30"){
						$('#fmaterial').combobox('select', '255');
						$('#fdiameter').combobox('select', '134');
						$('#fgas').combobox('select', '210');
					}else if (mdg == "31"){
						$('#fmaterial').combobox('select', '255');
						$('#fdiameter').combobox('select', '134');
						$('#fgas').combobox('select', '211');
					}else if (mdg == "32"){
						$('#fmaterial').combobox('select', '256');
						$('#fdiameter').combobox('select', '131');
						$('#fgas').combobox('select', '201');
					}else if (mdg == "33"){
						$('#fmaterial').combobox('select', '256');
						$('#fdiameter').combobox('select', '132');
						$('#fgas').combobox('select', '201');
					}else if (mdg == "34"){
						$('#fmaterial').combobox('select', '256');
						$('#fdiameter').combobox('select', '134');
						$('#fgas').combobox('select', '201');
					}
					var fselect = data.substring(78, 80);
					if(fselect == "00"){
						$('#fselect').combobox('select', '102');
					}else if(fselect == "01"){
						$('#fselect').combobox('select', '101');
					}else if(fselect == "02"){
						$('#fselect').combobox('select', '103');
					}else if(fselect == "03"){
						$('#fselect').combobox('select', '104');
					}
					var fselectstep = data.substring(82, 84);
					if(fselectstep == "00"){
						$('#fselectstep').combobox('select', '105');
					}else if(fselectstep == "01"){
						$('#fselectstep').combobox('select', '106');
					}else if(fselectstep == "02"){
						$('#fselectstep').combobox('select', '107');
					}else if(fselectstep == "03"){
						$('#fselectstep').combobox('select', '108');
					}
					$("#fweld_tuny_ele").numberbox('setValue', parseInt(data.substring(84, 86), 16));
					if(fselect == "01"){
						if(parseInt(data.substring(46, 48).substring(0,2),16)>127){
							$("#fweld_tuny_vol").numberbox('setValue', parseInt("FFFFFF"+data.substring(46, 48), 16)<<0);
						}else{
							$("#fweld_tuny_vol").numberbox('setValue', parseInt(data.substring(44, 48), 16));
						}
						if(parseInt(data.substring(34, 36).substring(0,2),16)>127){
							$("#fini_tuny_vol").numberbox('setValue', parseInt("FFFFFF"+data.substring(34, 36), 16)<<0);
						}else{
							$("#fini_tuny_vol").numberbox('setValue', parseInt(data.substring(32, 36), 16));
						}
						if(parseInt(data.substring(58, 60).substring(0,2),16)>127){
							$("#farc_tuny_vol").numberbox('setValue', parseInt("FFFFFF"+data.substring(58, 60), 16)<<0);
						}else{
							$("#farc_tuny_vol").numberbox('setValue', parseInt(data.substring(56, 60), 16));
						}
					}
					var frequency = data.substring(94, 96);
					if(frequency == "00"){
						$('#frequency').combobox('select', '137');
					}else if(frequency == "01"){
						$('#frequency').combobox('select', '138');
					}else if(frequency == "02"){
						$('#frequency').combobox('select', '139');
					}else if(frequency == "03"){
						$('#frequency').combobox('select', '140');
					}else if(frequency == "04"){
						$('#frequency').combobox('select', '141');
					}else if(frequency == "05"){
						$('#frequency').combobox('select', '142');
					}else if(frequency == "06"){
						$('#frequency').combobox('select', '143');
					}else if(frequency == "07"){
						$('#frequency').combobox('select', '144');
					}
					alert("索取成功");
					$('#smdlg').window('close');
					$('#weldingmachineTable').datagrid('clearSelections');
					$('#smdlg').form('clear');
				}
			}
		}
	}
}

//下发规范
function giveMainWps(){
	var wpslibrow = $('#wpslibTable').datagrid("getSelected");
	QinTron(wpslibId);
	return;
	if(wpslibrow.model==174){
		if(EPW()==false){
			return;
		}
	}else if(wpslibrow.model==175){
		if(EPS()==false){
			return;
		}
	}else if(wpslibrow.model==176){
		if(WBML()==false){
			return;
		}
	}else if(wpslibrow.model==177){
		if(WBP()==false){
			return;
		}
	}else if(wpslibrow.model==178){
		if(WBL()==false){
			return;
		}
	}else if(wpslibrow.model==171){
		if(CPVEW(wpslibId)==false){
			return;
		}
	}
}

//控制命令下发
function openCondlg(){
	$('#condlg').window( {
		title : "控制命令下发",
		modal : true
	});
	$('#condlg').window("open");
}

//松下选择焊机
function selectSxMachineList(status){
	if(status==1){
		var rows = $('#sxSelectWpsTab').datagrid('getSelections');
		if(rows.length==0){
			alert("请先选择工艺!!!");
			return;
		}
	}else{
		if(!$('#sxfwpsnum').combobox('getValue')){
			alert("请先选择通道号！");
			return;
		}
	}
	$('#sxmachinefm').form('clear');
	$('#sxMachinedlg').window( {
		title : "选择焊机",
		modal : true
	});
	$("#sxMachineTable").datagrid( {
		height : $("#sxMachinedlg").height(),
		width : $("#sxMachinedlg").width(),
		idField : 'id',
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		url : "weldingMachine/getWedlingMachineList?searchStr=w.fmanufacturer_id=149",
		singleSelect : true,
		rownumbers : true,
		showPageList : false, 
        columns : [ [ {
		    field:'ck',
			checkbox:true
		},{
			field : 'id',
			title : '序号',
			width : 50,
			halign : "center",
			align : "left",
			hidden:true
		}, {
			field : 'equipmentNo',
			title : '固定资产编号',
			halign : "center",
			align : "left"
		}, {
			field : 'typeName',
			title : '设备类型',
			halign : "center",
			align : "left"
		}, {
			field : 'statusName',
			title : '状态',
			halign : "center",
			align : "left"
		}, {
			field : 'manufacturerName',
			title : '厂家',
			halign : "center",
			align : "left"
		}, {
			field : 'gatherId',
			title : '采集序号',
			halign : "center",
			align : "left"
		}, {
			field : 'statusId',
			title : '状态id',
			width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'isnetworkingId',
			title : '是否联网id',
			width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'manuno',
			title : '厂商id',
			width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'typeId',
			title : '类型id',
			width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'iId',
			title : '项目id',
			width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'gid',
			title : '采集id',
			width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}
		] ],
		pagination : true,
		rowStyler: function(index,row){
            if ((index % 2)!=0){
            	//处理行代背景色后无法选中
            	var color=new Object();
                return color;
            }
        }
	});
	if(status==1){
		$("#sxMachineTable").datagrid({
			singleSelect: false
		});
		selectflag=1;
	}else{
		$("#sxMachineTable").datagrid({
			singleSelect: true
		});
		selectflag=0;
	}
	$('#sxMachinedlg').window('open');
}


function selectSxModel(){
	if(selectflag==0){
		getSxMainWps();//索取
	}else if(selectflag==1){
		setSxMainWps();//下发
	}else{
		return;
	}
}

//松下下发规范
function setSxMainWps() {
	var selectMainWpsRows = $('#sxSelectWpsTab').datagrid('getSelections');
	var selectMachine = $('#sxMachineTable').datagrid('getSelections');
	if (selectMachine.length == 0) {
		alert("请先选择焊机!!!");
		return;
	}
	for (var m = 0; m < selectMachine.length; m++) {
		if (!selectMachine[m].gatherId) {
			alert(selectMachine[m].equipmentNo + "未绑定采集模块，请重新选择!!!");
			return;
		}
	}
	var symbol = 0;
	var websocket = null;
	if (typeof (WebSocket) == "undefined") {
		WEB_SOCKET_SWF_LOCATION = "resources/js/WebSocketMain.swf";
		WEB_SOCKET_DEBUG = true;
	}
	symbol = 0;
	websocket = new WebSocket(websocketUrl);
	var sochet_send_data = new Array();
	var giveArray = new Array();
	var resultData = new Array();
	var noReceiveGiveChanel = new Array();
	var realLength = 0;
	websocket.onopen = function() {
		var checkLength = selectMachine.length * selectMainWpsRows.length;
		for (var smindex = 0; smindex < selectMachine.length; smindex++) {
			noReceiveGiveChanel.length = 0;
			//处理工艺，转换成16进制
			for (var mwindex = 0; mwindex < selectMainWpsRows.length; mwindex++) {
				var crc7_str = [];
				crc7_str.push("FE");
				crc7_str.push("5A");
				crc7_str.push("A5");
				var data_length = parseInt("110").toString(16);
				crc7_str.push(data_length);
				if (data_length.length < 4) {
					var length = 4 - data_length.length;
					for (var i = 0; i < length; i++) {
						data_length = "0" + data_length;
					}
				}
				var equipmentNo = (parseInt(selectMachine[smindex].gatherId)).toString(16);
				crc7_str.push(equipmentNo);
				if (equipmentNo.length < 4) {
					var length = 4 - equipmentNo.length;
					for (var i = 0; i < length; i++) {
						equipmentNo = "0" + equipmentNo;
					}
				}
				crc7_str.push("0");
				crc7_str.push("211");
				crc7_str.push("2");
				var chanel = parseInt(selectMainWpsRows[mwindex].fwpsnum).toString(16);
				crc7_str.push(chanel);
				if (chanel.length < 2) {
					var length = 2 - chanel.length;
					for (var i = 0; i < length; i++) {
						chanel = "0" + chanel;
					}
				}
				var fpreset_ele_top = parseInt(selectMainWpsRows[mwindex].fpreset_ele_top).toString(16);
				crc7_str.push(fpreset_ele_top);
				if (fpreset_ele_top.length < 4) {
					var length = 4 - fpreset_ele_top.length;
					for (var i = 0; i < length; i++) {
						fpreset_ele_top = "0" + fpreset_ele_top;
					}
				}
				var fpreset_vol_top = parseInt(selectMainWpsRows[mwindex].fpreset_vol_top * 10).toString(16);
				crc7_str.push(fpreset_vol_top);
				if (fpreset_vol_top.length < 4) {
					var length = 4 - fpreset_vol_top.length;
					for (var i = 0; i < length; i++) {
						fpreset_vol_top = "0" + fpreset_vol_top;
					}
				}
				var fpreset_ele_bottom = parseInt(selectMainWpsRows[mwindex].fpreset_ele_bottom).toString(16);
				crc7_str.push(fpreset_ele_bottom);
				if (fpreset_ele_bottom.length < 4) {
					var length = 4 - fpreset_ele_bottom.length;
					for (var i = 0; i < length; i++) {
						fpreset_ele_bottom = "0" + fpreset_ele_bottom;
					}
				}
				var fpreset_vol_bottom = parseInt(selectMainWpsRows[mwindex].fpreset_vol_bottom * 10).toString(16);
				crc7_str.push(fpreset_vol_bottom);
				if (fpreset_vol_bottom.length < 4) {
					var length = 4 - fpreset_vol_bottom.length;
					for (var i = 0; i < length; i++) {
						fpreset_vol_bottom = "0" + fpreset_vol_bottom;
					}
				}
				var fini_vol1 = parseInt(selectMainWpsRows[mwindex].fini_vol1).toString(16);
				crc7_str.push(fini_vol1);
				if (fini_vol1.length < 4) {
					var length = 4 - fini_vol1.length;
					for (var i = 0; i < length; i++) {
						fini_vol1 = "0" + fini_vol1;
					}
				}
				var farc_vol1 = parseInt(selectMainWpsRows[mwindex].farc_vol1 * 10).toString(16);
				crc7_str.push(farc_vol1);
				if (farc_vol1.length < 4) {
					var length = 4 - farc_vol1.length;
					for (var i = 0; i < length; i++) {
						farc_vol1 = "0" + farc_vol1;
					}
				}
				var fweld_tuny_ele = parseInt(selectMainWpsRows[mwindex].fweld_tuny_ele).toString(16);
				crc7_str.push(fweld_tuny_ele);
				if (fweld_tuny_ele.length < 4) {
					var length = 4 - fweld_tuny_ele.length;
					for (var i = 0; i < length; i++) {
						fweld_tuny_ele = "0" + fweld_tuny_ele;
					}
				}
				var fweld_tuny_vol = parseInt(selectMainWpsRows[mwindex].fweld_tuny_vol * 10).toString(16);
				crc7_str.push(fweld_tuny_vol);
				if (fweld_tuny_vol.length < 4) {
					var length = 4 - fweld_tuny_vol.length;
					for (var i = 0; i < length; i++) {
						fweld_tuny_vol = "0" + fweld_tuny_vol;
					}
				}
				var fweld_vol1 = parseInt(selectMainWpsRows[mwindex].fweld_vol1).toString(16);
				crc7_str.push(fweld_vol1);
				if (fweld_vol1.length < 4) {
					var length = 4 - fweld_vol1.length;
					for (var i = 0; i < length; i++) {
						fweld_vol1 = "0" + fweld_vol1;
					}
				}
				var farc_vol_top = parseInt(selectMainWpsRows[mwindex].farc_vol_top * 10).toString(16);
				crc7_str.push(farc_vol_top);
				if (farc_vol_top.length < 4) {
					var length = 4 - farc_vol_top.length;
					for (var i = 0; i < length; i++) {
						farc_vol_top = "0" + farc_vol_top;
					}
				}
				var farc_tuny_ele = parseInt(selectMainWpsRows[mwindex].farc_tuny_ele).toString(16);
				crc7_str.push(farc_tuny_ele);
				if (farc_tuny_ele.length < 4) {
					var length = 4 - farc_tuny_ele.length;
					for (var i = 0; i < length; i++) {
						farc_tuny_ele = "0" + farc_tuny_ele;
					}
				}
				var farc_tuny_vol = parseInt(selectMainWpsRows[mwindex].farc_tuny_vol * 10).toString(16);
				crc7_str.push(farc_tuny_vol);
				if (farc_tuny_vol.length < 4) {
					var length = 4 - farc_tuny_vol.length;
					for (var i = 0; i < length; i++) {
						farc_tuny_vol = "0" + farc_tuny_vol;
					}
				}
				var fmaterial = parseInt(selectMainWpsRows[mwindex].fmaterial).toString(16);//材质
				crc7_str.push(fmaterial);
				if (fmaterial.length < 2) {
					var length = 2 - fmaterial.length;
					for (var i = 0; i < length; i++) {
						fmaterial = "0" + fmaterial;
					}
				}
				var fdiameter = parseInt(selectMainWpsRows[mwindex].fdiameter).toString(16);
				crc7_str.push(fdiameter);
				if (fdiameter.length < 2) {
					var length = 2 - fdiameter.length;
					for (var i = 0; i < length; i++) {
						fdiameter = "0" + fdiameter;
					}
				}
				var fgas = parseInt(selectMainWpsRows[mwindex].fgas).toString(16);
				crc7_str.push(fgas);
				if (fgas.length < 2) {
					var length = 2 - fgas.length;
					for (var i = 0; i < length; i++) {
						fgas = "0" + fgas;
					}
				}
				var fcontroller = parseInt(selectMainWpsRows[mwindex].fcontroller).toString(16);
				crc7_str.push(fcontroller);
				if (fcontroller.length < 2) {
					var length = 2 - fcontroller.length;
					for (var i = 0; i < length; i++) {
						fcontroller = "0" + fcontroller;
					}
				}
				var farc = parseInt(selectMainWpsRows[mwindex].farc).toString(16);
				crc7_str.push(farc);
				if (farc.length < 2) {
					var length = 2 - farc.length;
					for (var i = 0; i < length; i++) {
						farc = "0" + farc;
					}
				}
				var ftime = parseInt(selectMainWpsRows[mwindex].ftime * 10).toString(16);
				crc7_str.push(ftime);
				if (ftime.length < 4) {
					var length = 4 - ftime.length;
					for (var i = 0; i < length; i++) {
						ftime = "0" + ftime;
					}
				}
				var fselect = parseInt(selectMainWpsRows[mwindex].fselect).toString(16);
				crc7_str.push(fselect);
				if(fselect==parseInt(101).toString(16)){
					fselect="1";
				}else if(fselect==parseInt(102).toString(16)){
					fselect="0";
				}
				if (fselect.length < 2) {
					var length = 2 - fselect.length;
					for (var i = 0; i < length; i++) {
						fselect = "0" + fselect;
					}
				}
				var finitial = (parseInt(selectMainWpsRows[mwindex].finitial)).toString(16);
				crc7_str.push(finitial);
				if (finitial.length < 2) {
					var length = 2 - finitial.length;
					for (var i = 0; i < length; i++) {
						finitial = "0" + finitial;
					}
				}
				crc7_str.push("0");
				var fweld_vol = (parseInt(selectMainWpsRows[mwindex].fweld_vol)).toString(16);
				crc7_str.push(fweld_vol);
				if (fweld_vol.length < 4) {
					var length = 4 - fweld_vol.length;
					for (var i = 0; i < length; i++) {
						fweld_vol = "0" + fweld_vol;
					}
				}
				var fweld_ele = (parseInt(selectMainWpsRows[mwindex].fweld_ele)).toString(16);
				crc7_str.push(fweld_ele);
				if (fweld_ele.length < 4) {
					var length = 4 - fweld_ele.length;
					for (var i = 0; i < length; i++) {
						fweld_ele = "0" + fweld_ele;
					}
				}
				var fini_ele = (parseInt(selectMainWpsRows[mwindex].fini_ele)).toString(16);
				crc7_str.push(fini_ele);
				if (fini_ele.length < 4) {
					var length = 4 - fini_ele.length;
					for (var i = 0; i < length; i++) {
						fini_ele = "0" + fini_ele;
					}
				}
				var fini_vol = (parseInt(selectMainWpsRows[mwindex].fini_vol)).toString(16);
				crc7_str.push(fini_vol);
				if (fini_vol.length < 4) {
					var length = 4 - fini_vol.length;
					for (var i = 0; i < length; i++) {
						fini_vol = "0" + fini_vol;
					}
				}
				var farc_ele = (parseInt(selectMainWpsRows[mwindex].farc_ele)).toString(16);
				crc7_str.push(farc_ele);
				if (farc_ele.length < 4) {
					var length = 4 - farc_ele.length;
					for (var i = 0; i < length; i++) {
						farc_ele = "0" + farc_ele;
					}
				}
				var farc_vol = (parseInt(selectMainWpsRows[mwindex].farc_vol)).toString(16);
				crc7_str.push(farc_vol);
				if (farc_vol.length < 4) {
					var length = 4 - farc_vol.length;
					for (var i = 0; i < length; i++) {
						farc_vol = "0" + farc_vol;
					}
				}
				var fadvance = parseInt(selectMainWpsRows[mwindex].fadvance).toString(16);//延时时间
				crc7_str.push(fadvance);
				if (fadvance.length < 2) {
					var length = 2 - fadvance.length;
					for (var i = 0; i < length; i++) {
						fadvance = "0" + fadvance;
					}
				}
				var fhysteresis = parseInt(selectMainWpsRows[mwindex].fhysteresis).toString(16);
				crc7_str.push(fhysteresis);
				if (fhysteresis.length < 2) {
					var length = 2 - fhysteresis.length;
					for (var i = 0; i < length; i++) {
						fhysteresis = "0" + fhysteresis;
					}
				}
				var fpreset_ele_warn_top = parseInt(selectMainWpsRows[mwindex].fpreset_ele_warn_top).toString(16);
				crc7_str.push(fpreset_ele_warn_top);
				if (fpreset_ele_warn_top.length < 4) {
					var length = 4 - fpreset_ele_warn_top.length;
					for (var i = 0; i < length; i++) {
						fpreset_ele_warn_top = "0" + fpreset_ele_warn_top;
					}
				}
				var fpreset_vol_warn_top = parseInt(selectMainWpsRows[mwindex].fpreset_vol_warn_top * 10).toString(16);
				crc7_str.push(fpreset_vol_warn_top);
				if (fpreset_vol_warn_top.length < 4) {
					var length = 4 - fpreset_vol_warn_top.length;
					for (var i = 0; i < length; i++) {
						fpreset_vol_warn_top = "0" + fpreset_vol_warn_top;
					}
				}
				var fpreset_ele_warn_bottom = parseInt(selectMainWpsRows[mwindex].fpreset_ele_warn_bottom).toString(16);
				crc7_str.push(fpreset_ele_warn_bottom);
				if (fpreset_ele_warn_bottom.length < 4) {
					var length = 4 - fpreset_ele_warn_bottom.length;
					for (var i = 0; i < length; i++) {
						fpreset_ele_warn_bottom = "0" + fpreset_ele_warn_bottom;
					}
				}
				var fpreset_vol_warn_bottom = parseInt(selectMainWpsRows[mwindex].fpreset_vol_warn_bottom * 10).toString(16);
				crc7_str.push(fpreset_vol_warn_bottom);
				if (fpreset_vol_warn_bottom.length < 4) {
					var length = 4 - fpreset_vol_warn_bottom.length;
					for (var i = 0; i < length; i++) {
						fpreset_vol_warn_bottom = "0" + fpreset_vol_warn_bottom;
					}
				}
				var fini_ele_warn_top = parseInt(selectMainWpsRows[mwindex].fini_ele_warn_top).toString(16);
				crc7_str.push(fini_ele_warn_top);
				if (fini_ele_warn_top.length < 4) {
					var length = 4 - fini_ele_warn_top.length;
					for (var i = 0; i < length; i++) {
						fini_ele_warn_top = "0" + fini_ele_warn_top;
					}
				}
				var fini_vol_warn_top = parseInt(selectMainWpsRows[mwindex].fini_vol_warn_top * 10).toString(16);
				crc7_str.push(fini_vol_warn_top);
				if (fini_vol_warn_top.length < 4) {
					var length = 4 - fini_vol_warn_top.length;
					for (var i = 0; i < length; i++) {
						fini_vol_warn_top = "0" + fini_vol_warn_top;
					}
				}
				var fini_ele_warn_bottom = parseInt(selectMainWpsRows[mwindex].fini_ele_warn_bottom).toString(16);
				crc7_str.push(fini_ele_warn_bottom);
				if (fini_ele_warn_bottom.length < 4) {
					var length = 4 - fini_ele_warn_bottom.length;
					for (var i = 0; i < length; i++) {
						fini_ele_warn_bottom = "0" + fini_ele_warn_bottom;
					}
				}
				var fini_vol_warn_bottom = parseInt(selectMainWpsRows[mwindex].fini_vol_warn_bottom * 10).toString(16);
				crc7_str.push(fini_vol_warn_bottom);
				if (fini_vol_warn_bottom.length < 4) {
					var length = 4 - fini_vol_warn_bottom.length;
					for (var i = 0; i < length; i++) {
						fini_vol_warn_bottom = "0" + fini_vol_warn_bottom;
					}
				}
				var farc_ele_warn_top = parseInt(selectMainWpsRows[mwindex].farc_ele_warn_top).toString(16);
				crc7_str.push(farc_ele_warn_top);
				if (farc_ele_warn_top.length < 4) {
					var length = 4 - farc_ele_warn_top.length;
					for (var i = 0; i < length; i++) {
						farc_ele_warn_top = "0" + farc_ele_warn_top;
					}
				}
				var farc_vol_warn_top = parseInt(selectMainWpsRows[mwindex].farc_vol_warn_top * 10).toString(16);
				crc7_str.push(farc_vol_warn_top);
				if (farc_vol_warn_top.length < 4) {
					var length = 4 - farc_vol_warn_top.length;
					for (var i = 0; i < length; i++) {
						farc_vol_warn_top = "0" + farc_vol_warn_top;
					}
				}
				var farc_ele_warn_bottom = parseInt(selectMainWpsRows[mwindex].farc_ele_warn_bottom).toString(16);
				crc7_str.push(farc_ele_warn_bottom);
				if (farc_ele_warn_bottom.length < 4) {
					var length = 4 - farc_ele_warn_bottom.length;
					for (var i = 0; i < length; i++) {
						farc_ele_warn_bottom = "0" + farc_ele_warn_bottom;
					}
				}
				var farc_vol_warn_bottom = parseInt(selectMainWpsRows[mwindex].farc_vol_warn_bottom * 10).toString(16);
				crc7_str.push(farc_vol_warn_bottom);
				if (farc_vol_warn_bottom.length < 4) {
					var length = 4 - farc_vol_warn_bottom.length;
					for (var i = 0; i < length; i++) {
						farc_vol_warn_bottom = "0" + farc_vol_warn_bottom;
					}
				}
				var farc_delay_time = parseInt(selectMainWpsRows[mwindex].farc_delay_time * 10).toString(16);
				crc7_str.push(farc_delay_time);
				if (farc_delay_time.length < 2) {
					var length = 2 - farc_delay_time.length;
					for (var i = 0; i < length; i++) {
						farc_delay_time = "0" + farc_delay_time;
					}
				}
				var fwarn_delay_time = parseInt(selectMainWpsRows[mwindex].fwarn_delay_time * 10).toString(16);
				crc7_str.push(fwarn_delay_time);
				if (fwarn_delay_time.length < 2) {
					var length = 2 - fwarn_delay_time.length;
					for (var i = 0; i < length; i++) {
						fwarn_delay_time = "0" + fwarn_delay_time;
					}
				}
				var fwarn_stop_time = parseInt(selectMainWpsRows[mwindex].fwarn_stop_time * 10).toString(16);
				crc7_str.push(fwarn_stop_time);
				if (fwarn_stop_time.length < 2) {
					var length = 2 - fwarn_stop_time.length;
					for (var i = 0; i < length; i++) {
						fwarn_stop_time = "0" + fwarn_stop_time;
					}
				}
				var fcharacter = "0" + selectMainWpsRows[mwindex].sxfcharacter;//标志
				crc7_str.push(selectMainWpsRows[mwindex].sxfcharacter);
				
				var fflow_top = parseInt(selectMainWpsRows[mwindex].fflow_top * 10).toString(16);
				crc7_str.push(fflow_top);
				if (fflow_top.length < 2) {
					var length = 2 - fflow_top.length;
					for (var i = 0; i < length; i++) {
						fflow_top = "0" + fflow_top;
					}
				}
				var fflow_bottom = parseInt(selectMainWpsRows[mwindex].fflow_bottom * 10).toString(16);
				crc7_str.push(fflow_bottom);
				if (fflow_bottom.length < 2) {
					var length = 2 - fflow_bottom.length;
					for (var i = 0; i < length; i++) {
						fflow_bottom = "0" + fflow_bottom;
					}
				}
				var fdelay_time = parseInt(selectMainWpsRows[mwindex].fdelay_time * 10).toString(16);
				crc7_str.push(fdelay_time);
				if (fdelay_time.length < 2) {
					var length = 2 - fdelay_time.length;
					for (var i = 0; i < length; i++) {
						fdelay_time = "0" + fdelay_time;
					}
				}
				var fover_time = parseInt(selectMainWpsRows[mwindex].fover_time * 10).toString(16);
				crc7_str.push(fover_time);
				if (fover_time.length < 2) {
					var length = 2 - fover_time.length;
					for (var i = 0; i < length; i++) {
						fover_time = "0" + fover_time;
					}
				}
				var ffixed_cycle = parseInt(selectMainWpsRows[mwindex].ffixed_cycle * 10).toString(16);
				crc7_str.push(ffixed_cycle);
				if (ffixed_cycle.length < 2) {
					var length = 2 - ffixed_cycle.length;
					for (var i = 0; i < length; i++) {
						ffixed_cycle = "0" + ffixed_cycle;
					}
				}
				crc7_str.push("0");
				var xiafasend1 = chanel + "0000" + fpreset_ele_top + fpreset_vol_top +  fpreset_ele_bottom + fpreset_vol_bottom + fini_vol1 + farc_vol1 + fweld_tuny_ele + fweld_tuny_vol + fweld_vol1 + farc_vol_top + farc_tuny_ele + farc_tuny_vol + fmaterial + fdiameter
					+ fgas + fcontroller + farc + ftime + fselect + finitial + "000000" + fweld_vol + fweld_ele + fini_ele + fini_vol + farc_ele + farc_vol + fadvance + fhysteresis + fpreset_ele_warn_top + fpreset_vol_warn_top + fpreset_ele_warn_bottom
					+ fpreset_vol_warn_bottom + fini_ele_warn_top + fini_vol_warn_top + fini_ele_warn_bottom + fini_vol_warn_bottom + farc_ele_warn_top + farc_vol_warn_top + farc_ele_warn_bottom + farc_vol_warn_bottom + farc_delay_time + fwarn_delay_time + fwarn_stop_time
					+ fcharacter + fflow_top + fflow_bottom + fdelay_time + fover_time + ffixed_cycle + "00";
				
				var xxx = xiafasend1.toUpperCase();
				
				//CRC7校验
				$.ajax({
				      type : "post",  
				      async : false,
				      url : "wps/CRC7Check?crc7_str="+crc7_str,  
				      data : {},  
				      dataType : "json", //返回数据形式为json  
				      success : function(result) {
				          if (result) {
								var CRC7_check = parseInt(result.CRC7_code) .toString(16);
								if (CRC7_check.length < 2) {
									var length = 2 - CRC7_check.length;
									for (var i = 0; i < length; i++) {
										CRC7_check = "0" + CRC7_check;
									}
								}
								var xiafasend2 = "FE5AA5" + data_length + equipmentNo + "000000000000000000000000" + CRC7_check + "021102" + xiafasend1;
								sochet_send_data.push(xiafasend2);
								noReceiveGiveChanel.push(parseInt(selectMainWpsRows[mwindex].fwpsnum));
				          }  
				      },
				      error : function(errorMsg) {  
				          alert("数据请求失败，请联系系统管理员!");  
				      }  
				 });
			}
			var jsonstr = {
				"gatherNo" : selectMachine[smindex].gatherId,
				"machineNo" : selectMachine[smindex].equipmentNo,
				"successNum" : 0,
				"failNum" : 0,
				"noNum" : noReceiveGiveChanel.join(",")
			};
			resultData.push(jsonstr);
			if (giveArray.length == 0) {
				giveArray.push(selectMachine[smindex].equipmentNo);
				giveArray.push(parseInt(selectMachine[smindex].gatherId));
				giveArray.push(0);//成功
				giveArray.push(0);//失败
				giveArray.push(0);//未响应
			} else {
				if ($.inArray(selectMachine[smindex],giveArray) == (-1)) {
					giveArray.push(selectMachine[smindex].equipmentNo);
					giveArray.push(parseInt(selectMachine[smindex].gatherId));
					giveArray.push(0);
					giveArray.push(0);
					giveArray.push(0);
				}
			}
		}
		var oneMinuteTimer = window.setTimeout(function() {
			websocket.close();
			alert("下发超时");
			$('#sxSelectdlg').window('close');
			$('#sxMachinedlg').window('close');
			$('#sxSelectWpsTab').datagrid('clearSelections');
			$('#sxMachineTable').datagrid('clearSelections');
			selectMainWpsRows.length = 0;
			selectMachine.length = 0;
			sochet_send_data.length = 0;
			giveArray.length = 0;
			noReceiveGiveChanel.length = 0;
			resultData.length = 0;
			realLength = 0;
		}, selectMachine.length*selectMainWpsRows.length*30000);
		showResult();
		$("#giveResultTable").datagrid('loadData', resultData);//下发结果展示
		var timer = window.setInterval(function() {
			if (sochet_send_data.length != 0) {
				var popdata = sochet_send_data.pop();
				websocket.send(popdata);//下发
			} else {
				window.clearInterval(timer);
			}
		}, 300)
		
		websocket.onmessage = function(msg) {
			var fan = msg.data;
			if (fan.substring(0, 6) == "FE5AA5" && fan.substring(6,10) == "001A") {
				var rows = $('#giveResultTable').datagrid("getRows");
				if (parseInt(fan.substring(44, 46), 16) != 2) {//控制，2表示OK
					realLength++;
					var frchanel = parseInt(fan.substring(46, 48), 16);
					var indexNum = $.inArray(parseInt(fan.substring(10, 14),16),giveArray);
					if (indexNum != -1) {
						giveArray[indexNum + 2] = frchanel;
						if (rows[(indexNum - 1) / 5].noNum != "0") {
							var onNumArr = rows[(indexNum - 1) / 5].noNum.split(",");
							onNumArr.splice($.inArray(frchanel,onNumArr), 1);
							var nowNoArr = onNumArr;
							if (nowNoArr.length != 0) {
								rows[(indexNum - 1) / 5].noNum = nowNoArr.join(",");
							} else {
								rows[(indexNum - 1) / 5].noNum = 0;
							}
						} else {
							rows[(indexNum - 1) / 5].noNum = 0;
						}
						if (parseInt(rows[(indexNum - 1) / 5].failNum) != 0) {
							rows[(indexNum - 1) / 5].failNum = rows[(indexNum - 1) / 5].failNum + "," + giveArray[indexNum + 2];
						} else {
							rows[(indexNum - 1) / 5].failNum = giveArray[indexNum + 2];
						}
						$('#giveResultTable').datagrid('refreshRow', (indexNum - 1) / 5);
					}
					if (realLength == checkLength) {//焊机数据*工艺数据=收到的数目
						websocket.close();
						if (websocket.readyState != 1) {
							window.clearTimeout(oneMinuteTimer);
							$.ajax({  
							      type : "post",  
							      async : false,
							      url : "wps/saveGiveWpsHistory", 
							      data : {mainwps:JSON.stringify(selectMainWpsRows),machine:JSON.stringify(selectMachine),wpslib:wpslibId,flag:1},  
							      dataType : "json", //返回数据形式为json  
							      success : function(result) {
							          if (result.success) {
											alert("下发完成");
							          } else{
							        	  	alert("下发完成，存储下发记录失败")
							          }
									  $('#sxSelectdlg').window('close');
									  $('#sxMachinedlg').window('close');
									  $('#sxSelectWpsTab').datagrid('clearSelections');
									  $('#sxMachineTable').datagrid('clearSelections');
									  selectMainWpsRows.length = 0;
									  selectMachine.length = 0;
									  sochet_send_data.length = 0;
									  noReceiveGiveChanel.length = 0;
									  giveArray.length = 0;
									  resultData.length = 0;
									  realLength = 0;
							      },  
							      error : function(errorMsg) {  
							          alert("数据请求失败，请联系系统管理员!");  
							      }  
							}); 
						}
					}
				} else {
					realLength++;
					var frchanel = parseInt(fan.substring(46, 48), 16);
					var indexNum = $.inArray(parseInt(fan.substring(10, 14), 16),giveArray);
					if (indexNum != -1) {
						giveArray[indexNum + 1] = frchanel;
						if (rows[(indexNum - 1) / 5].noNum != "0") {
							var onNumArr = rows[(indexNum - 1) / 5].noNum.split(",");
							onNumArr.splice($.inArray(frchanel,onNumArr), 1);
							var nowNoArr = onNumArr;
							if (nowNoArr.length != 0) {
								rows[(indexNum - 1) / 5].noNum = nowNoArr.join(",");
							} else {
								rows[(indexNum - 1) / 5].noNum = 0;
							}
						} else {
							rows[(indexNum - 1) / 5].noNum = 0;
						}
						if (parseInt(rows[(indexNum - 1) / 5].successNum) != 0) {
							rows[(indexNum - 1) / 5].successNum = rows[(indexNum - 1) / 5].successNum + "," + giveArray[indexNum + 1];
						} else {
							rows[(indexNum - 1) / 5].successNum = giveArray[indexNum + 1];
						}
						$('#giveResultTable').datagrid('refreshRow', (indexNum - 1) / 5);
					}
					if (realLength == checkLength) {
						websocket.close();
						if (websocket.readyState != 1) {
							window.clearTimeout(oneMinuteTimer);
							$.ajax({  
							      type : "post",  
							      async : false,
							      url : "wps/saveGiveWpsHistory", 
							      data : {mainwps:JSON.stringify(selectMainWpsRows),machine:JSON.stringify(selectMachine),wpslib:wpslibId,flag:1},  
							      dataType : "json", //返回数据形式为json  
							      success : function(result) {
							          if (result.success) {
											alert("下发完成");
							          } else{
							        	  	alert("下发完成，存储下发记录失败")
							          }
									  $('#sxSelectdlg').window('close');
									  $('#sxMachinedlg').window('close');
									  $('#sxSelectWpsTab').datagrid('clearSelections');
									  $('#sxMachineTable').datagrid('clearSelections');
									  selectMainWpsRows.length = 0;
									  selectMachine.length = 0;
									  sochet_send_data.length = 0;
									  noReceiveGiveChanel.length = 0;
									  giveArray.length = 0;
									  resultData.length = 0;
									  realLength = 0;
							      },  
							      error : function(errorMsg) {  
							          alert("数据请求失败，请联系系统管理员!");  
							      }  
							});
						}
					}
				}
			}
		}
	}
}


//松下索取规范
function getSxMainWps() {
	var selectMachine = $('#sxMachineTable').datagrid('getSelected');
	if (selectMachine) {
		if (!selectMachine.gatherId) {
			alert("该焊机未绑定采集模块");
			return;
		}
	} else {
		alert("请选择焊机");
		return;
	}
	var flag = 0;
	var websocket = null;
	if (typeof (WebSocket) == "undefined") {
		WEB_SOCKET_SWF_LOCATION = "resources/js/WebSocketMain.swf";
		WEB_SOCKET_DEBUG = true;
	}
	websocket = new WebSocket(websocketUrl);
	websocket.onopen = function() {
		var crc7_str = [];
		crc7_str.push("FE");
		crc7_str.push("5A");
		crc7_str.push("A5");
		var data_length = parseInt("26").toString(16);
		crc7_str.push(data_length);
		if (data_length.length < 4) {
			var length = 4 - data_length.length;
			for (var i = 0; i < length; i++) {
				data_length = "0" + data_length;
			}
		}
		var mach = parseInt(selectMachine.gatherId).toString(16);
		crc7_str.push(mach);
		if (mach.length < 4) {
			var length = 4 - mach.length;
			for (var i = 0; i < length; i++) {
				mach = "0" + mach;
			}
		}
		crc7_str.push("0");
		crc7_str.push("211");
		crc7_str.push("2");
		var chanel = $('#sxfwpsnum').combobox('getValue').toString(16);
		crc7_str.push(chanel);
		if (chanel.length < 2) {
			var length = 2 - chanel.length;
			for (var i = 0; i < length; i++) {
				chanel = "0" + chanel;
			}
		}
		crc7_str.push("0");
		//CRC7校验
		$.ajax({
		      type : "post",  
		      async : false,
		      url : "wps/CRC7Check?crc7_str="+crc7_str,  
		      data : {},  
		      dataType : "json", //返回数据形式为json  
		      success : function(result) {
		          if (result) {
						var CRC7_check = parseInt(result.CRC7_code) .toString(16);
						if (CRC7_check.length < 2) {
							var length = 2 - CRC7_check.length;
							for (var i = 0; i < length; i++) {
								CRC7_check = "0" + CRC7_check;
							}
						}
						var sendMesssager = "FE5AA5"+ data_length + mach + "000000000000000000000000" + CRC7_check + "021101" + chanel + "0000";
						websocket.send(sendMesssager);
		          }  
		      },
		      error : function(errorMsg) {  
		          alert("数据请求失败，请联系系统管理员!");  
		      }  
		 });
		
		if (flag == 0) {
			var jctimer = window.setTimeout(function() {
				if (flag == 0) {
					websocket.close();
					alert("焊机长时间未响应，索取失败!!!");
				}
			}, 60000)
		}
		websocket.onmessage = function(msg) {
			var da = msg.data;
			if (da.substring(0, 6) == "FE5AA5") {
				if (da.substring(6,10) == "001A") {
					flag++;
					websocket.close();
					if (websocket.readyState != 1) {
						alert("此通道没有规范!!!");
						flag = 0;
					}
				} else {
					$('#sxfwpsnum').combobox('select', parseInt(da.substring(46, 48), 16));
					$("#sxfpreset_ele_top").numberbox('setValue', (parseInt(da.substring(52, 56), 16)).toFixed(1));
					$("#sxfpreset_vol_top").numberbox('setValue', (parseInt(da.substring(56, 60), 16) / 10).toFixed(1));
					$("#sxfpreset_ele_bottom").numberbox('setValue', (parseInt(da.substring(60, 64), 16)).toFixed(1));
					$("#sxfpreset_vol_bottom").numberbox('setValue', (parseInt(da.substring(64, 68), 16) / 10).toFixed(1));
					$("#sxfini_vol1").numberbox('setValue', (parseInt(da.substring(68, 72), 16)).toFixed(1));
					$("#sxfarc_vol1").numberbox('setValue', (parseInt(da.substring(72, 76), 16) / 10).toFixed(1));
					$("#sxfweld_tuny_ele").numberbox('setValue', (parseInt(da.substring(76, 80), 16)).toFixed(1));
					$("#sxfweld_tuny_vol").numberbox('setValue', (parseInt(da.substring(80, 84), 16) / 10).toFixed(1));
					$("#sxfweld_vol1").numberbox('setValue', (parseInt(da.substring(84, 88), 16)).toFixed(1));
					$("#sxfarc_vol_top").numberbox('setValue', (parseInt(da.substring(88, 92), 16) / 10).toFixed(1));
					$("#sxfarc_tuny_ele").numberbox('setValue', (parseInt(da.substring(92, 96), 16)).toFixed(1));
					$("#sxfarc_tuny_vol").numberbox('setValue', (parseInt(da.substring(96, 100), 16) / 10).toFixed(1));
					
					$("#sxfmaterial").combobox('setValue', parseInt(da.substring(100, 102), 16));
					$("#sxfdiameter").combobox('setValue', parseInt(da.substring(102, 104), 16));
					$("#sxfgas").combobox('setValue', parseInt(da.substring(104, 106), 16));
					$("#sxfcontroller").combobox('setValue', parseInt(da.substring(106, 108), 16));
					$("#sxfarc").combobox('setValue', parseInt(da.substring(108, 110), 16));
					$("#sxftime").numberbox('setValue', (parseInt(da.substring(110, 114), 16) / 10).toFixed(1));
					if (parseInt(da.substring(114, 116)) == "0") {
						$('#sxfselect').combobox('select', 102);
					} else {
						$('#sxfselect').combobox('select', 101);
					}
					
					$("#sxfinitial").combobox('setValue', parseInt(da.substring(116, 118), 16));
					
					$("#sxfweld_vol").numberbox('setValue', parseInt(da.substring(124, 128), 16));
					$("#sxfweld_ele").numberbox('setValue', parseInt(da.substring(128, 132), 16));
					$("#sxfini_ele").numberbox('setValue', parseInt(da.substring(132, 136), 16));
					$("#sxfini_vol").numberbox('setValue', parseInt(da.substring(136, 140), 16));
					$("#sxfarc_ele").numberbox('setValue', parseInt(da.substring(140, 144), 16));
					$("#sxfarc_vol").numberbox('setValue', parseInt(da.substring(144, 148), 16));
					
					$("#sxfadvance").numberbox('setValue', parseInt(da.substring(148, 150), 16));
					$("#sxfhysteresis").numberbox('setValue', parseInt(da.substring(150, 152), 16));
					
					$("#sxfpreset_ele_warn_top").numberbox('setValue', (parseInt(da.substring(152, 156), 16)).toFixed(1));
					$("#sxfpreset_vol_warn_top").numberbox('setValue', (parseInt(da.substring(156, 160), 16) / 10).toFixed(1));
					$("#sxfpreset_ele_warn_bottom").numberbox('setValue', (parseInt(da.substring(160, 164), 16)).toFixed(1));
					$("#sxfpreset_vol_warn_bottom").numberbox('setValue', (parseInt(da.substring(164, 168), 16) / 10).toFixed(1));
					
					$("#sxfini_ele_warn_top").numberbox('setValue', (parseInt(da.substring(168, 172), 16)).toFixed(1));
					$("#sxfini_vol_warn_top").numberbox('setValue', (parseInt(da.substring(172, 176), 16) / 10).toFixed(1));
					$("#sxfini_ele_warn_bottom").numberbox('setValue', (parseInt(da.substring(176, 180), 16)).toFixed(1));
					$("#sxfini_vol_warn_bottom").numberbox('setValue', (parseInt(da.substring(180, 184), 16) / 10).toFixed(1));
					$("#sxfarc_ele_warn_top").numberbox('setValue', (parseInt(da.substring(184, 188), 16)).toFixed(1));
					$("#sxfarc_vol_warn_top").numberbox('setValue', (parseInt(da.substring(188, 192), 16) / 10).toFixed(1));
					$("#sxfarc_ele_warn_bottom").numberbox('setValue', (parseInt(da.substring(192, 196), 16)).toFixed(1));
					$("#sxfarc_vol_warn_bottom").numberbox('setValue', (parseInt(da.substring(196, 200), 16) / 10).toFixed(1));

					$("#sxfarc_delay_time").numberbox('setValue', (parseInt(da.substring(200, 202), 16) / 10).toFixed(1));
					$("#sxfwarn_delay_time").numberbox('setValue', (parseInt(da.substring(202, 204), 16) / 10).toFixed(1));
					$("#sxfwarn_stop_time").numberbox('setValue', (parseInt(da.substring(204, 206), 16) / 10).toFixed(1));
					
					if(parseInt(da.substring(206, 208))==0){
					    $("input[name='sxfcharacter']").eq(0).prop("checked",true);
					}else{
					    $("input[name='sxfcharacter']").eq(1).prop("checked",true);
					}
				
					$("#sxfflow_top").numberbox('setValue', (parseInt(da.substring(208, 210), 16) / 10).toFixed(1));
					$("#sxfflow_bottom").numberbox('setValue', (parseInt(da.substring(210, 212), 16) / 10).toFixed(1));
					$("#sxfdelay_time").numberbox('setValue', (parseInt(da.substring(212, 214), 16) / 10).toFixed(1));
					$("#sxfover_time").numberbox('setValue', (parseInt(da.substring(214, 216), 16) / 10).toFixed(1));
					$("#sxffixed_cycle").numberbox('setValue', (parseInt(da.substring(216, 218), 16) / 10).toFixed(1));

					flag++;
					websocket.close();
					if (websocket.readyState != 1) {
						window.clearTimeout(jctimer);
						alert("索取成功");
						flag = 0;
						$('#sxMachinedlg').window('close');
						$('#sxMachineTable').datagrid('clearSelections');
						$('#sxmachinefm').form('clear');
					}
				}
			}
		}
	}
}

function machineList(url){
	$("#weldingmachineTable").datagrid( {
		height : $("#smdlg").height()-30,
		width : $("#smdlg").width(),
		idField : 'id',
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		url : url,
		singleSelect : true,
		rownumbers : true,
		showPageList : false, 
        columns : [ [ {
		    field:'ck',
			checkbox:true
		},{
			field : 'id',
			title : '序号',
			width : 50,
			halign : "center",
			align : "left",
			hidden:true
		}, {
			field : 'equipmentNo',
			title : '固定资产编号',
//				width : 80,
			halign : "center",
			align : "left"
		}, {
			field : 'typeName',
			title : '设备类型',
//				width : 80,
			halign : "center",
			align : "left"
		}, /*{
				field : 'joinTime',
				title : '入厂时间',
//				width : 150,
				halign : "center",
				align : "left"
			}, {
				field : 'insframeworkName',
				title : '所属项目',
//				width : 80,
				halign : "center",
				align : "left"
			},*/ {
			field : 'statusName',
			title : '状态',
//				width : 80,
			halign : "center",
			align : "left"
		} , {
			field : 'manufacturerName',
			title : '厂家',
//				width : 150,
			halign : "center",
			align : "left"
		}, /*{
				field : 'isnetworking',
				title : '是否在网',
//				width : 80,
				halign : "center",
				align : "left"
			},*/ {
			field : 'gatherId',
			title : '采集序号',
//				width : 100,
			halign : "center",
			align : "left"
		}, /*{
				field : 'position',
				title : '位置',
//				width : 100,
				halign : "center",
				align : "left"
			}, {
				field : 'ip',
				title : 'ip地址',
//				width : 100,
				halign : "center",
				align : "left"
			}, {
				field : 'model',
				title : '设备型号',
//				width : 100,
				halign : "center",
				align : "left"
			},*/ {
			field : 'statusId',
			title : '状态id',
			width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'isnetworkingId',
			title : '是否联网id',
			width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'manuno',
			title : '厂商id',
			width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'typeId',
			title : '类型id',
			width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'iId',
			title : '项目id',
			width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'gid',
			title : '采集id',
			width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}
		] ],
		pagination : true,
//			fitColumns : true,
		rowStyler: function(index,row){
            if ((index % 2)!=0){
            	//处理行代背景色后无法选中
            	var color=new Object();
//	                color.class="rowColor";
                return color;
            }
        }
	});
}

function QinTron(wpslibId) {
	var sochet_send_data = new Array();
	var giveArray = new Array();
	var resultData = new Array();
	var noReceiveGiveChanel = new Array();
	var realLength = 0;
	var selectMainWpsRows = $('#mainWpsTable').datagrid('getSelections');
	var selectMachine = $('#weldingmachineTable').datagrid('getSelections');
	if (selectMachine.length == 0) {
		alert("请先选择焊机!!!");
		return false;
	}
	for (var m = 0; m < selectMachine.length; m++) {
		if (!selectMachine[m].gatherId) {
			alert(selectMachine[m].equipmentNo + "未绑定采集模块，请重新选择!!!");
			return false;
		}
	}
	var checkLength = selectMachine.length * selectMainWpsRows.length;
	for (var smindex = 0; smindex < selectMachine.length; smindex++) {
		noReceiveGiveChanel.length = 0;
		for (var mwindex = 0; mwindex < selectMainWpsRows.length; mwindex++) {
			var fchanel = parseInt(selectMainWpsRows[mwindex].fchanel).toString(16);
			if (fchanel.length < 2) {
				var length = 2 - fchanel.length;
				for (var i = 0; i < length; i++) {
					fchanel = "0" + fchanel;
				}
			}
			var fselect = parseInt(selectMainWpsRows[mwindex].fselect); //焊接模式
			var fweld_ele = parseInt(selectMainWpsRows[mwindex].fweld_ele).toString(16);
			if (fweld_ele.length < 4) {
				var length = 4 - fweld_ele.length;
				for (var i = 0; i < length; i++) {
					fweld_ele = "0" + fweld_ele;
				}
			}
			var fweld_vol = (parseFloat(selectMainWpsRows[mwindex].fweld_vol) * 10).toString(16);
			var fcharacter = parseInt(selectMainWpsRows[mwindex].fcharacter).toString(16);
			if(fcharacter<0){
				fcharacter = (fcharacter>>>0).toString(16).toLocaleUpperCase().substring(4);
			}else{
				fcharacter = fcharacter.toString(16);
			}
			if (fcharacter.length < 4) {
				var length = 4 - fcharacter.length;
				for (var i = 0; i < length; i++) {
					fcharacter = "0" + fcharacter;
				}
			}
			var fgas = parseInt(selectMainWpsRows[mwindex].fgas);
			var fdiameter = parseInt(selectMainWpsRows[mwindex].fdiameter);
			var fmaterial = parseInt(selectMainWpsRows[mwindex].fmaterial);
			var ftime = (parseFloat(selectMainWpsRows[mwindex].ftime) * 10).toString(16);
			if (ftime.length < 4) {
				var length = 4 - ftime.length;
				for (var i = 0; i < length; i++) {
					ftime = "0" + ftime;
				}
			}
			var fadvance = (parseFloat(selectMainWpsRows[mwindex].fadvance) * 10).toString(16);
			if (fadvance.length < 4) {
				var length = 4 - fadvance.length;
				for (var i = 0; i < length; i++) {
					fadvance = "0" + fadvance;
				}
			}

			if (ftime == "0000") {
				ftime = "0005";
			}
			if (fadvance == "0000") {
				fadvance = "0020";
			}

			var fini_vol = (parseFloat(selectMainWpsRows[mwindex].fini_vol) * 10).toString(16);
			var farc_vol = (parseFloat(selectMainWpsRows[mwindex].farc_vol) * 10).toString(16);
			var fselectstep = parseInt(selectMainWpsRows[mwindex].fselectstep);
			var fweld_tuny_ele = parseInt(selectMainWpsRows[mwindex].fweld_tuny_ele).toString(16);
			fweld_tuny_ele = fweld_tuny_ele.substring(fweld_tuny_ele.length-2);
			if (fweld_tuny_ele.length < 2) {
				var length = 2 - fweld_tuny_ele.length;
				for (var i = 0; i < length; i++) {
					fweld_tuny_ele = "0" + fweld_tuny_ele;
				}
			}
			var fweld_tuny_vol = (selectMainWpsRows[mwindex].fweld_tuny_vol).toString(16);
			fweld_tuny_vol = fweld_tuny_vol.substring(fweld_tuny_vol.length-2);
			if (fweld_tuny_vol.length < 2) {
				var length = 2 - fweld_tuny_vol.length;
				for (var i = 0; i < length; i++) {
					fweld_tuny_vol = "0" + fweld_tuny_vol;
				}
			}
			var frequency = parseInt(selectMainWpsRows[mwindex].frequency);
			var fini_14;  //初期电流、送丝
			var fini_20;  //电流、送丝
			var fini_26;  //收弧电流、送丝
			if(fselect == 102){
				fini_14 = (parseFloat(selectMainWpsRows[mwindex].farc_speed) * 10).toString(16);
				fini_20 = (parseFloat(selectMainWpsRows[mwindex].fspeed) * 10).toString(16);
				fini_26 = (parseFloat(selectMainWpsRows[mwindex].farc_tuny_speed) * 10).toString(16);
			}else{
				fini_14 = parseInt(selectMainWpsRows[mwindex].fini_ele).toString(16);
				fini_20 = parseInt(selectMainWpsRows[mwindex].fweld_ele).toString(16);
				fini_26 = parseInt(selectMainWpsRows[mwindex].farc_ele).toString(16);
				if(selectMainWpsRows[mwindex].farc_tuny_vol<0){
					farc_vol = parseInt(selectMainWpsRows[mwindex].farc_tuny_vol>>>0).toString(16).toLocaleUpperCase().substring(4);
				}else{
					farc_vol = parseInt(selectMainWpsRows[mwindex].farc_tuny_vol).toString(16);
				}
				if(selectMainWpsRows[mwindex].fini_tuny_vol<0){
					fini_vol = parseInt(selectMainWpsRows[mwindex].fini_tuny_vol>>>0).toString(16).toLocaleUpperCase().substring(4);
				}else{
					fini_vol = parseInt(selectMainWpsRows[mwindex].fini_tuny_vol).toString(16);
				}
				if(selectMainWpsRows[mwindex].fweld_tuny_vol<0){
					fweld_vol = parseInt(selectMainWpsRows[mwindex].fweld_tuny_vol>>>0).toString(16).toLocaleUpperCase().substring(4);
				}else{
					fweld_vol = parseInt(selectMainWpsRows[mwindex].fweld_tuny_vol).toString(16);
				}
			}
			if (fini_vol.length < 4) {
				var length = 4 - fini_vol.length;
				for (var i = 0; i < length; i++) {
					fini_vol = "0" + fini_vol;
				}
			}
			if (farc_vol.length < 4) {
				var length = 4 - farc_vol.length;
				for (var i = 0; i < length; i++) {
					farc_vol = "0" + farc_vol;
				}
			}
			if (fweld_vol.length < 4) {
				var length = 4 - fweld_vol.length;
				for (var i = 0; i < length; i++) {
					fweld_vol = "0" + fweld_vol;
				}
			}
			if (fini_14.length < 4) {
				var length = 4 - fini_14.length;
				for (var i = 0; i < length; i++) {
					fini_14 = "0" + fini_14;
				}
			}
			if (fini_20.length < 4) {
				var length = 4 - fini_20.length;
				for (var i = 0; i < length; i++) {
					fini_20 = "0" + fini_20;
				}
			}
			if (fini_26.length < 4) {
				var length = 4 - fini_26.length;
				for (var i = 0; i < length; i++) {
					fini_26 = "0" + fini_26;
				}
			}
			
			var model;
			if (fselect == 102){
				model = "00";
			}else if(fselect == 101){
				model = "01";
			}else if(fselect == 103){
				model = "02";
			}else if(fselect == 104){
				model = "03";
			}
			var step;
			if (fselectstep == 105){
				step = "0000";
			}else if(fselectstep == 106){
				step = "0001";
			}else if(fselectstep == 107){
				step = "0002";
			}else if(fselectstep == 108){
				step = "0003";
			}
			var doumai = "00";
			if (frequency == 137){
				doumai = "00";
			}else if(frequency == 138){
				doumai = "01";
			}else if(frequency == 139){
				doumai = "02";
			}else if(frequency == 140){
				doumai = "03";
			}else if(frequency == 141){
				doumai = "04";
			}else if(frequency == 142){
				doumai = "05";
			}else if(frequency == 143){
				doumai = "06";
			}else if(frequency == 144){
				doumai = "07";
			}
			var mdg;
			if (fmaterial == 250 && fdiameter == 135 && fgas == 200){
				mdg = "00";
			}else if (fmaterial == 250 && fdiameter == 135 && fgas == 201){
				mdg = "01";
			}else if (fmaterial == 250 && fdiameter == 135 && fgas == 202){
				mdg = "02";
			}else if (fmaterial == 250 && fdiameter == 135 && fgas == 203){
				mdg = "03";
			}else if (fmaterial == 250 && fdiameter == 131 && fgas == 200){
				mdg = "04";
			}else if (fmaterial == 250 && fdiameter == 131 && fgas == 201){
				mdg = "05";
			}else if (fmaterial == 250 && fdiameter == 131 && fgas == 202){
				mdg = "06";
			}else if (fmaterial == 250 && fdiameter == 131 && fgas == 203){
				mdg = "07";
			}else if (fmaterial == 250 && fdiameter == 132 && fgas == 200){
				mdg = "08";
			}else if (fmaterial == 250 && fdiameter == 132 && fgas == 201){
				mdg = "09";
			}else if (fmaterial == 250 && fdiameter == 132 && fgas == 202){
				mdg = "0a";
			}else if (fmaterial == 250 && fdiameter == 132 && fgas == 203){
				mdg = "0b";
			}else if (fmaterial == 250 && fdiameter == 134 && fgas == 201){
				mdg = "0c";
			}else if (fmaterial == 250 && fdiameter == 134 && fgas == 202){
				mdg = "0d";
			}else if (fmaterial == 250 && fdiameter == 134 && fgas == 203){
				mdg = "0e";
			}else if (fmaterial == 251 && fdiameter == 135 && fgas == 204){
				mdg = "0f";
			}else if (fmaterial == 251 && fdiameter == 131 && fgas == 204){
				mdg = "10";
			}else if (fmaterial == 251 && fdiameter == 131 && fgas == 205){
				mdg = "11";
			}else if (fmaterial == 251 && fdiameter == 132 && fgas == 204){
				mdg = "12";
			}else if (fmaterial == 251 && fdiameter == 132 && fgas == 205){
				mdg = "13";
			}else if (fmaterial == 252 && fdiameter == 131 && fgas == 206){
				mdg = "14";
			}else if (fmaterial == 252 && fdiameter == 131 && fgas == 207){
				mdg = "15";
			}else if (fmaterial == 252 && fdiameter == 132 && fgas == 206){
				mdg = "16";
			}else if (fmaterial == 252 && fdiameter == 132 && fgas == 207){
				mdg = "17";
			}else if (fmaterial == 252 && fdiameter == 134 && fgas == 206){
				mdg = "18";
			}else if (fmaterial == 252 && fdiameter == 134 && fgas == 207){
				mdg = "19";
			}else if (fmaterial == 253 && fdiameter == 131 && fgas == 206){
				mdg = "1a";
			}else if (fmaterial == 253 && fdiameter == 131 && fgas == 207){
				mdg = "1b";
			}else if (fmaterial == 253 && fdiameter == 132 && fgas == 206){
				mdg = "1c";
			}else if (fmaterial == 253 && fdiameter == 132 && fgas == 207){
				mdg = "1d";
			}else if (fmaterial == 253 && fdiameter == 134 && fgas == 206){
				mdg = "1e";
			}else if (fmaterial == 253 && fdiameter == 134 && fgas == 207){
				mdg = "1f";
			}else if (fmaterial == 254 && fdiameter == 135 && fgas == 208){
				mdg = "20";
			}else if (fmaterial == 254 && fdiameter == 135 && fgas == 209){
				mdg = "21";
			}else if (fmaterial == 254 && fdiameter == 135 && fgas == 212){
				mdg = "22";
			}else if (fmaterial == 254 && fdiameter == 135 && fgas == 213){
				mdg = "23";
			}else if (fmaterial == 254 && fdiameter == 131 && fgas == 208){
				mdg = "24";
			}else if (fmaterial == 254 && fdiameter == 131 && fgas == 209){
				mdg = "25";
			}else if (fmaterial == 254 && fdiameter == 131 && fgas == 212){
				mdg = "26";
			}else if (fmaterial == 254 && fdiameter == 131 && fgas == 213){
				mdg = "27";
			}else if (fmaterial == 254 && fdiameter == 132 && fgas == 208){
				mdg = "28";
			}else if (fmaterial == 254 && fdiameter == 132 && fgas == 209){
				mdg = "29";
			}else if (fmaterial == 254 && fdiameter == 132 && fgas == 212){
				mdg = "2a";
			}else if (fmaterial == 254 && fdiameter == 132 && fgas == 213){
				mdg = "2b";
			}else if (fmaterial == 255 && fdiameter == 131 && fgas == 210){
				mdg = "2c";
			}else if (fmaterial == 255 && fdiameter == 131 && fgas == 211){
				mdg = "2d";
			}else if (fmaterial == 255 && fdiameter == 132 && fgas == 210){
				mdg = "2e";
			}else if (fmaterial == 255 && fdiameter == 132 && fgas == 211){
				mdg = "2f";
			}else if (fmaterial == 255 && fdiameter == 134 && fgas == 210){
				mdg = "30";
			}else if (fmaterial == 255 && fdiameter == 134 && fgas == 211){
				mdg = "31";
			}else if (fmaterial == 256 && fdiameter == 131 && fgas == 201){
				mdg = "32";
			}else if (fmaterial == 256 && fdiameter == 132 && fgas == 201){
				mdg = "33";
			}else if (fmaterial == 256 && fdiameter == 134 && fgas == 201){
				mdg = "34";
			}
			
			var mach = parseInt(selectMachine[smindex].gatherId).toString(16);
			if (mach.length < 4) {
				var length = 4 - mach.length;
				for (var i = 0; i < length; i++) {
					mach = "0" + mach;
				}
				;
			}

			var xiafasend1 = mach + fchanel + ftime + fadvance + fini_14 + fini_vol + "0000" + fini_20 + fweld_vol + "0000" + fini_26 + farc_vol + "0000" + "0000" + fcharacter + "00"
			+ "00" + mdg + model + step + fweld_tuny_ele + fweld_tuny_vol + "00" + "00" + "00" + doumai + "0000" + "0000" + "0000";

			var xxx = xiafasend1.toUpperCase();
			var data_length = ((parseInt(xxx.length) + 12) / 2).toString(16);
			if (data_length.length < 2) {
				var length = 2 - data_length.length;
				for (var i = 0; i < length; i++) {
					data_length = "0" + data_length;
				}
			}
			;
			xxx = "7E" + data_length + "01010152" + xiafasend1;
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

			var xiafasend2 = (xxx + checksend).substring(2);
			sochet_send_data.push("7E" + xiafasend2 + "7D")
			console.log("7E" + xiafasend2 + "7D");
			noReceiveGiveChanel.push(parseInt(selectMainWpsRows[mwindex].fchanel));
		}
		var jsonstr = {
			"machineNo" : selectMachine[smindex].equipmentNo,
			"gatherNo" : selectMachine[smindex].gatherId,
			"successNum" : 0,
			"failNum" : 0,
			"noNum" : noReceiveGiveChanel.join(",")
		};
		resultData.push(jsonstr);
		if (giveArray.length == 0) {
			giveArray.push(selectMachine[smindex].equipmentNo);
			giveArray.push(parseInt(selectMachine[smindex].gatherId));
			giveArray.push(0);
			giveArray.push(0);
			giveArray.push(0);
		} else {
			if ($.inArray(selectMachine[smindex].equipmentNo,giveArray) == (-1)) {
				giveArray.push(selectMachine[smindex].equipmentNo);
				giveArray.push(parseInt(selectMachine[smindex].gatherId));
				giveArray.push(0);
				giveArray.push(0);
				giveArray.push(0);
			}
		}
	}
	var symbol = 0;
	client.subscribe("webdataup", {
		qos: 0,
		onSuccess:function(e){  
            console.log("订阅成功");  
        },
        onFailure: function(e){  
            console.log(e);  
        }
	})
	var oneMinuteTimer = window.setTimeout(function() {
		client.unsubscribe("webdataup", {
			onSuccess : function(e) {
				console.log("取消订阅成功");
			},
			onFailure : function(e) {
				console.log(e);
			}
		})
		$('#smdlg').window('close');
		$('#smwdlg').window('close');
		$('#weldingmachineTable').datagrid('clearSelections');
		$('#mainWpsTable').datagrid('clearSelections');
		selectMainWpsRows.length = 0;
		selectMachine.length = 0;
		sochet_send_data.length = 0;
		giveArray.length = 0;
		noReceiveGiveChanel.length = 0;
		resultData.length = 0;
		realLength = 0;
		$('#resultdlg').panel({
	        closable:true
	    });
		$('#resultOk').linkbutton('enable');
		$('#resultCancel').linkbutton('enable');
		alert("部分焊机下发超时");
	}, checkLength*300+3000);
	showResult();
	$("#giveResultTable").datagrid('loadData', resultData);
	var timer = window.setInterval(function() {
		if (sochet_send_data.length != 0) {
			var message = new Paho.MQTT.Message(sochet_send_data.pop());
			message.destinationName = "webdatadown";
			client.send(message);
		} else {
			window.clearInterval(timer);
		}
	}, 300)
	client.onMessageArrived = function(e){
		console.log("onMessageArrived:" + e.payloadString);
		var fan = e.payloadString;e.payloadString;
		if (fan.substring(0, 2) == "7E" && fan.substring(10, 12) == "52") {
			var rows = $('#giveResultTable').datagrid("getRows");
			if (parseInt(fan.substring(18, 20), 16) == 1) {
				realLength++;
				var frchanel = parseInt(fan.substring(16, 18), 16);
				var indexNum = $.inArray(parseInt(fan.substring(12, 16), 16),giveArray);
//				var indexNum = giveArray.indexOf(parseInt(fan.substring(12, 16), 16));
				if (indexNum != -1) {
					giveArray[indexNum + 2] = frchanel;
					/*					giveArray[indexNum+3].splice(giveArray[indexNum+3].indexOf(frchanel), 1);*/
					if (rows[(indexNum - 1) / 5].noNum != "0") {
						var onNumArr = rows[(indexNum - 1) / 5].noNum.split(",");
						//						if(onNumArr.indexOf(frchanel)!=-1){
						onNumArr.splice($.inArray(frchanel,onNumArr), 1);
						var nowNoArr = onNumArr;
						if (nowNoArr.length != 0) {
							rows[(indexNum - 1) / 5].noNum = nowNoArr.join(",");
						} else {
							rows[(indexNum - 1) / 5].noNum = 0;
						}
					//						}
					} else {
						rows[(indexNum - 1) / 5].noNum = 0;
					}
					if (parseInt(rows[(indexNum - 1) / 5].failNum) != 0) {
						rows[(indexNum - 1) / 5].failNum = rows[(indexNum - 1) / 5].failNum + "," + giveArray[indexNum + 2];
					} else {
						rows[(indexNum - 1) / 5].failNum = giveArray[indexNum + 2];
					}
					$('#giveResultTable').datagrid('refreshRow', (indexNum - 1) / 5);
				}
				if (realLength == checkLength) {
					client.unsubscribe("webdataup", {
						onSuccess : function(e) {
							console.log("取消订阅成功");
						},
						onFailure : function(e) {
							console.log(e);
						}
					})
					window.clearTimeout(oneMinuteTimer);
					$.ajax({  
					      type : "post",  
					      async : false,
					      url : "wps/saveGiveWpsHistory", 
					      data : {mainwps:JSON.stringify(selectMainWpsRows),machine:JSON.stringify(selectMachine),wpslib:wpslibId,flag:0},  
					      dataType : "json", //返回数据形式为json  
					      success : function(result) {
/*							          if (result.success) {
										alert("下发完成");
						          } else{
						        	  	alert("下发完成，存储下发记录失败")
						          }*/
					    	  alert("下发完成");
								$('#smdlg').window('close');
								$('#smwdlg').window('close');
								$('#weldingmachineTable').datagrid('clearSelections');
								$('#mainWpsTable').datagrid('clearSelections');
								selectMainWpsRows.length = 0;
								selectMachine.length = 0;
								sochet_send_data.length = 0;
								giveArray.length = 0;
								resultData.length = 0;
								noReceiveGiveChanel.length = 0;
								realLength = 0;
								$('#resultdlg').panel({
							        closable:true
							    });
								$('#resultOk').linkbutton('enable');
								$('#resultCancel').linkbutton('enable');
					      },  
					      error : function(errorMsg) {  
					          alert("数据请求失败，请联系系统管理员!");  
					      }  
					 }); 
				}
			} else {
				realLength++;
				var frchanel = parseInt(fan.substring(16, 18), 16);
				var indexNum = $.inArray(parseInt(fan.substring(12, 16), 16),giveArray);
//				var indexNum = giveArray.indexOf(parseInt(fan.substring(12, 16), 16));
				if (indexNum != -1) {
					giveArray[indexNum + 1] = frchanel;
					/*					giveArray[indexNum+3].splice(giveArray[indexNum+3].indexOf(frchanel), 1);*/
					if (rows[(indexNum - 1) / 5].noNum != "0") {
						var onNumArr = rows[(indexNum - 1) / 5].noNum.split(",");
						//						if(onNumArr.indexOf(frchanel)!=-1){
						onNumArr.splice($.inArray(frchanel,onNumArr), 1);
						var nowNoArr = onNumArr;
						if (nowNoArr.length != 0) {
							rows[(indexNum - 1) / 5].noNum = nowNoArr.join(",");
						} else {
							rows[(indexNum - 1) / 5].noNum = 0;
						}
					//						}
					} else {
						rows[(indexNum - 1) / 5].noNum = 0;
					}
					if (parseInt(rows[(indexNum - 1) / 5].successNum) != 0) {
						rows[(indexNum - 1) / 5].successNum = rows[(indexNum - 1) / 5].successNum + "," + giveArray[indexNum + 1];
					} else {
						rows[(indexNum - 1) / 5].successNum = giveArray[indexNum + 1];
					}
					$('#giveResultTable').datagrid('refreshRow', (indexNum - 1) / 5);
				}
				if (realLength == checkLength) {
					client.unsubscribe("webdataup", {
						onSuccess : function(e) {
							console.log("取消订阅成功");
						},
						onFailure : function(e) {
							console.log(e);
						}
					})
					window.clearTimeout(oneMinuteTimer);
					$.ajax({  
					      type : "post",  
					      async : false,
					      url : "wps/saveGiveWpsHistory", 
					      data : {mainwps:JSON.stringify(selectMainWpsRows),machine:JSON.stringify(selectMachine),wpslib:wpslibId,flag:0},  
					      dataType : "json", //返回数据形式为json  
					      success : function(result) {
/*							          if (result.success) {
										alert("下发完成");
						          } else{
						        	  	alert("下发完成，存储下发记录失败")
						          }*/
					    	  alert("下发完成");
								$('#smdlg').window('close');
								$('#smwdlg').window('close');
								$('#weldingmachineTable').datagrid('clearSelections');
								$('#mainWpsTable').datagrid('clearSelections');
								selectMainWpsRows.length = 0;
								selectMachine.length = 0;
								sochet_send_data.length = 0;
								giveArray.length = 0;
								resultData.length = 0;
								noReceiveGiveChanel.length = 0;
								realLength = 0;
								$('#resultdlg').panel({
							        closable:true
							    });
								$('#resultOk').linkbutton('enable');
								$('#resultCancel').linkbutton('enable');
					      },  
					      error : function(errorMsg) {  
					          alert("数据请求失败，请联系系统管理员!");  
					      }  
					 }); 
				}
			}
		}
	}
}

function mqttTest(){
	clientId = Math.random().toString().substr(3,8) + Date.now().toString(36);
	client = new Paho.MQTT.Client(websocketUrl.split(":")[0], parseInt(websocketUrl.split(":")[1]), clientId);
	var options = {
        timeout: 5,  
        keepAliveInterval: 60,  
        cleanSession: false,  
        useSSL: true,  
        onSuccess: onConnect,  
        onFailure: function(e){  
            console.log(e);  
        },
        reconnect : true
	}
	
	//set callback handlers
	client.onConnectionLost = onConnectionLost;
//	client.onMessageArrived = onMessageArrived;

	//connect the client
	client.connect(options);
}

//called when the client connects
function onConnect() {
	// Once a connection has been made, make a subscription and send a message.
	console.log("onConnect");
}

//called when the client loses its connection
function onConnectionLost(responseObject) {
	if (responseObject.errorCode !== 0) {
		console.log("onConnectionLost:"+responseObject.errorMessage);
	}
}