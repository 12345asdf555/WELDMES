/**
 * 通用焊机参数管理
 */
var flag;
var reIssue = new Array(),allIssueRows = new Array(),failRows = new Array();
var issueFlag = 0;
var finishdata = new Array();
var nomachine = new Array();
var allmachine = new Array();
$(function() {
//	SPCINIT(1);
	SPCRULE();
	spcDialogData();
	WeldInsframework();
	spccontrol()
})

//参数初始化
function SPCINIT(value) {
	if(value==1){
		$('#fchanel').combobox('clear');
		var ary = new Array();
		for (var i = 0; i < 100; i++) {
			ary.push({
				"text" : "通道号"+i,
				"value" : i+""
			});
		}
		$('#fchanel').combobox('loadData', ary);//清空option选项   
		SPCINIT(0);
		$('#fchanel').combobox('select', "0");
		return;
	}
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

	$('#fweldparameters').combobox('clear');
	$('#fweldparameters').combobox('loadData', [ {
		"text" : "普通碳钢实芯CO2 100%",
		"value" : "0"
	}, {
		"text" : "普通碳钢实芯Ar 80% + CO2 20%",
		"value" : "1"
	}, {
		"text" : "普通碳钢药芯CO2 100%",
		"value" : "2"
	}, {
		"text" : "脉冲碳钢实芯Ar 90% + CO2 10%",
		"value" : "3"
	}, {
		"text" : "脉冲不锈钢钢实芯Ar 98% + CO2 2%",
		"value" : "4"
	}, {
		"text" : "脉冲铝镁实芯Ar 100% ER5356",
		"value" : "5"
	}, {
		"text" : "脉冲铝硅实芯Ar 100% ER4043",
		"value" : "6"
	} ]);
	$('#manual_weld').combobox('clear');
	$('#manual_weld').combobox('loadData', [ {
		"text" : "气保焊",
		"value" : "0"
	}, {
		"text" : "手工焊",
		"value" : "1"
	} ]);
	$('#fargon').combobox('clear');
	$('#fargon').combobox('loadData', [ {
		"text" : "2T",
		"value" : "0"
	}, {
		"text" : "2T+",
		"value" : "1"
	}, {
		"text" : "4T",
		"value" : "10"
	}, {
		"text" : "4T+",
		"value" : "11"
	} ]);
	$("#fmode").prop("checked", false);
	$("#arc_length").prop("checked", false); //弧长控制
	$("#fcontroller").prop("checked", false);
	$("#ftorch").prop("checked", false);
	$("#pulse").prop("checked", false);
	$("#pulse").prop("disabled", true);
	$("#frequency").numberbox('disable', true);
	$("#pulse_ratio").numberbox('disable', true);
	$("#Base_ele").numberbox('disable', true);
	$("#Base_vol").numberbox('disable', true);
	$("#Base_vol1").numberbox('disable', true);
	$('#fselect').combobox('select', 101); //一元个别
	$("#fadvance").numberbox('setValue', 0.5); //提前送气
	$("#firsttime").numberbox('setValue', 1); //初期时间
	$("#fini_ele").numberbox('setValue', 200); //初期电流
	$("#fweld_ele").numberbox('setValue', 200); //焊接电流
	$("#farc_ele").numberbox('setValue', 200); //收弧电流
	$("#fhysteresis").numberbox('setValue', 2.0); //滞后送气
	$("#farc_time").numberbox('setValue', 1); //收弧时间
	$("#fcharacter").numberbox('setValue', 0); //电弧特性
	$("#Rush").numberbox('setValue', 0); //回烧修正
	$("#handarc_ele").numberbox('setValue', 100); //热引弧电流
	$("#handarc_time").numberbox('setValue', 1); //热引弧时间
	$("#hand_ele").numberbox('setValue', 300); //手工焊电流
	$("#Base_ele").numberbox('setValue', 100); //基值电流
	$("#Base_vol").numberbox('setValue', 16.0); //基值电压
	$("#Base_vol1").numberbox('setValue', 0); //基值电压一元
	$("#fargon").combobox('select', "0"); //氩弧焊模式选择
	$("#manual_weld").combobox('select', 0); //手/气焊选择
	$("#rise_time").numberbox('setValue', 1); //缓升时间
	$("#decline_time").numberbox('setValue', 1); //缓降时间
	$("#thrust_ele").numberbox('setValue', 100); //推力电流
	$("#pulse_ratio").numberbox('setValue', 50); //双脉冲占空比
	$("#point_speed").numberbox('setValue', 10); //点动送丝速度
	$('#fdiameter').combobox('select', 132); //焊丝直径
	$('#fmaterial').combobox('select', 94); //焊丝材质
	$("#fweld_tuny_ele").numberbox('setValue', 0); //焊接电流微调
	$("#farc_tuny_ele").numberbox('setValue', 0); //收弧电流微调
	$("#fini_vol").numberbox('setValue', 20); //初期电压
	$("#fweld_vol").numberbox('setValue', 20); //焊接电压
	$("#farc_vol").numberbox('setValue', 20); //收弧电压
	$("#fini_vol1").numberbox('setValue', 0); //初期电压一元
	$("#fweld_vol1").numberbox('setValue', 0); //焊接电压一元
	$("#farc_vol1").numberbox('setValue', 0); //收弧电压一元
	$("#fweld_tuny_vol1").numberbox('setValue', 0);
	$("#farc_tuny_vol1").numberbox('setValue', 0); //收弧电压微调一元
	$('#farc').combobox('select', 111); //收弧无
	$('#fweldparameters').combobox('select', 1); //焊接过程
	$("#frequency").numberbox('setValue', 1.5); //双脉冲频率
	$("#weldingratio").numberbox('setValue', 0); //焊丝负极比率
	$('#dmodel').hide(); //柔软电弧模式
	$('#imodel').hide();
	$('#dgasflow').hide(); //气体流量
	$('#igasflow').hide();
	$('#dratio').hide(); //焊丝负极比率
	$('#iratio').hide();
	$('#dfrequency').show(); //双脉冲频率
	$('#ifrequency').show();
	$('#dgas').hide(); //气体
	$('#rgas').hide();
	$('#dmaterial').hide(); //焊丝材质
	$('#rmaterial').hide();
	$('#tinitial').hide(); //初期条件
	$('#rinitial').hide();
	$('#tcontroller').hide(); //熔深控制
	$('#rcontroller').hide();
	$('#dfarc').hide(); //收弧
	$('#rfarc').hide();
	$('#dtorch').hide(); //水冷焊枪
	$('#itorch').hide();
	$('#dfweldprocess').hide(); //焊接控制
	$('#rfweldprocess').hide();
	$('#dftime').hide(); //点焊时间
	$('#rftime').hide();
/*	$("#av").hide();
	$("#tav").hide();
	$("#dbasevol").hide();
	$("#rbasevol").hide();
	$("#iv").hide();
	$("#tiv").hide();
	$("#wv").hide();
	$("#twv").hide();*/
}

//用户输入参数检测
function SPCCHECK(){
	if ($('#firsttime').numberbox('getValue') < 0 || $('#firsttime').numberbox('getValue') > 10) {
		alert("起始时间：0~10s");
		return false;
	}
	if ($('#rise_time').numberbox('getValue') < 0 || $('#rise_time').numberbox('getValue') > 10) {
		alert("缓升时间：0~10s");
		return false;
	}
	if ($('#decline_time').numberbox('getValue') < 0 || $('#decline_time').numberbox('getValue') > 10) {
		alert("缓降时间：0~10s");
		return false;
	}
	if ($('#fadvance').numberbox('getValue') < 0 || $('#fadvance').numberbox('getValue') > 10) {
		alert("前气时间：0~10s");
		return false;
	}
	if ($('#fini_ele').numberbox('getValue') < 40 || $('#fini_ele').numberbox('getValue') > 500) {
		alert("初期电流范围：40~500A");
		return false;
	}
	if ($('#fini_vol').numberbox('getValue') < 12 || $('#fini_vol').numberbox('getValue') > 50) {
		alert("初期电压范围：12~50V");
		return false;
	}
	if ($('#fini_vol1').numberbox('getValue') < (-25) || $('#fini_vol1').numberbox('getValue') > (25)) {
		alert("初期电压一元范围：-25~25");
		return false;
	}
	if ($('#fweld_ele').numberbox('getValue') < 40 || $('#fweld_ele').numberbox('getValue') > 500) {
		alert("焊接电流范围：40~500A");
		return false;
	}
	if ($('#fweld_vol').numberbox('getValue') < 12 || $('#fweld_vol').numberbox('getValue') > 50) {
		alert("焊接电压范围：12~50V");
		return false;
	}
	if ($('#fweld_vol1').numberbox('getValue') < (-25) || $('#fweld_vol1').numberbox('getValue') > (25)) {
		alert("焊接电压一元范围：-25~25");
		return false;
	}
	if ($('#farc_ele').numberbox('getValue') < 40 || $('#farc_ele').numberbox('getValue') > 500) {
		alert("收弧电流范围：40~500A");
		return false;
	}
	if ($('#farc_vol').numberbox('getValue') < 12 || $('#farc_vol').numberbox('getValue') > 50) {
		alert("收弧电压范围：12~50V");
		return false;
	}
	if($('#farc_vol1').numberbox('getValue')<(-25)||$('#farc_vol1').numberbox('getValue')>(25)){
		alert("收弧电压一元范围：-25~25");
		return false;
	} 
	if ($('#farc_time').numberbox('getValue') < 0 || $('#farc_time').numberbox('getValue') > 10) {
		alert("收弧时间：0~10s");
		return false;
	}
	if ($('#fhysteresis').numberbox('getValue') < 0 || $('#fhysteresis').numberbox('getValue') > 10) {
		alert("延气时间：0~10s");
		return false;
	}
	if ($('#Rush').numberbox('getValue') < (-10) || $('#Rush').numberbox('getValue') > (10)) {
		alert("回烧修正：-10~10");
		return false;
	}
	if ($('#point_speed').numberbox('getValue') < (2) || $('#point_speed').numberbox('getValue') > (24)) {
		alert("点动送丝速速：2~24m/min");
		return false;
	}
	if ($('#fcharacter').numberbox('getValue') < (-10) || $('#fcharacter').numberbox('getValue') > (10)) {
		alert("电弧特性范围：-10~10");
		return false;
	}
	if ($('#handarc_ele').numberbox('getValue') < 0 || $('#handarc_ele').numberbox('getValue') > (150)) {
		alert("手工焊热引弧电流：0~150A");
		return false;
	}
	if ($('#handarc_time').numberbox('getValue') < 0 || $('#handarc_time').numberbox('getValue') > (10)) {
		alert("手工焊热引弧时间：0~10s");
		return false;
	}
	if ($('#hand_ele').numberbox('getValue') < 40 || $('#hand_ele').numberbox('getValue') > (500)) {
		alert("手工焊电流：40~500A");
		return false;
	}
	if ($('#thrust_ele').numberbox('getValue') < 0 || $('#thrust_ele').numberbox('getValue') > (150)) {
		alert("推力电流：0~150A");
		return false;
	}
	if ($('#frequency').numberbox('getValue') < (0.5) || $('#frequency').numberbox('getValue') > (3)) {
		alert("双脉冲频率范围：0.5~3");
		return false;
	}
	if ($('#pulse_ratio').numberbox('getValue') < (10) || $('#pulse_ratio').numberbox('getValue') > (90)) {
		alert("双脉冲占空比：10%~90%");
		return false;
	}
	if ($('#Base_ele').numberbox('getValue') < (40) || $('#Base_ele').numberbox('getValue') > (500)) {
		alert("基值电流：40~500A");
		return false;
	}
	if ($('#Base_vol').numberbox('getValue') < (12) || $('#Base_vol').numberbox('getValue') > (50)) {
		alert("基值电压：12~50V");
		return false;
	}
	if ($('#Base_vol1').numberbox('getValue') < (-25) || $('#Base_vol1').numberbox('getValue') > (25)) {
		alert("基值电压一元：-25~25");
		return false;
	}
}

//索取规范并赋值
function SPCGET(){
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
		var symbol = 0;
		var message = new Paho.MQTT.Message(xxx + checksend + "7D");
		message.destinationName = "weldmes-webdatadown";
		client.send(message);
		var oneMinuteTimer = window.setTimeout(function() {
			if (symbol == 0) {
//				if(alertFlag!=-1){
					client.unsubscribe("weldmes-webdataup", {
						onSuccess : function(e) {
							console.log("取消订阅成功");
						},
						onFailure : function(e) {
							console.log(e);
						}
					})
//					$('#buttonCancel').linkbutton('enable');
//					$('#buttonOk').linkbutton('enable');
					alert("焊机长时间未响应，索取失败");
//				}
			}
		}, 5000);
		client.subscribe("weldmes-webdataup", {
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
				client.unsubscribe("weldmes-webdataup", {
					onSuccess : function(e) {
						console.log("取消订阅成功");
					},
					onFailure : function(e) {
						console.log(e);
					}
				});
				symbol = 1;
				if (data.substring(18, 20) == "FF") {
						alert("此通道没有规范，请尝试新建规范，可恢复默认值进行参考");
				} else {
					$('#fchanel').combobox('select', parseInt(data.substring(18, 20), 16));
					$("#fadvance ").numberbox('setValue', (parseInt(data.substring(20, 22), 16) / 10).toFixed(1));
					var fini_ele_hight =data.substring(22, 24);
					var fini_ele_low= data.substring(24,26);
					var fini_ele = parseInt((fini_ele_low + fini_ele_hight),16);
					$("#fini_ele ").numberbox('setValue', fini_ele);

					var fini_hight =data.substring(26, 28);
					var fini_low= data.substring(28,30);
					var vol = (parseInt((fini_low + fini_hight),16)/10).toFixed(1);
					$("#fini_vol ").numberbox('setValue', vol);
					
					$("#fini_vol1 ").numberbox('setValue', (parseInt(data.substring(30, 32), 16)-25).toFixed(1));
					$("#firsttime").numberbox('setValue', (parseInt(data.substring(32, 34), 16)/10));
					$("#rise_time").numberbox('setValue', (parseInt(data.substring(34, 36), 16)/10));
					$("#decline_time").numberbox('setValue', (parseInt(data.substring(36, 38), 16)/10));
					var farc_ele_hight =data.substring(38, 40);
					var farc_ele_low= data.substring(40,42);
					var farc_ele = parseInt((farc_ele_low + farc_ele_hight),16);
					$("#farc_ele ").numberbox('setValue', farc_ele);
					
					var farc_vol_hight =data.substring(42, 44);
					var farc_vol_low= data.substring(44,46);
					var farc_vol = (parseInt((farc_vol_low + farc_vol_hight),16)/10).toFixed(1);
					$("#farc_vol ").numberbox('setValue', farc_vol);

					$("#farc_vol1 ").numberbox('setValue', (parseInt(data.substring(46, 48), 16)-25));
					$("#farc_time").numberbox('setValue', (parseInt(data.substring(48, 50), 16)/10));
					$("#fhysteresis").numberbox('setValue', (parseInt(data.substring(50, 52), 16)/10));
					$("#Rush").numberbox('setValue', (parseInt(data.substring(52, 54), 16)-10));
					$("#frequency").numberbox('setValue', (parseInt(data.substring(54, 56), 16)/10));
					$("#pulse_ratio").numberbox('setValue', parseInt(data.substring(56, 58), 16));
					var Base_ele_hight =data.substring(58, 60);
					var Base_ele_low= data.substring(60,62);
					var Base_ele = parseInt((Base_ele_low + Base_ele_hight),16);
					$("#Base_ele ").numberbox('setValue', Base_ele);
					
					var Base_vol_hight =data.substring(62, 64);
					var Base_vol_low= data.substring(64,66);
					var Base_vol = (parseInt((Base_vol_low + Base_vol_hight),16)/10).toFixed(1);
					$("#Base_vol ").numberbox('setValue', Base_vol);
					$("#Base_vol1").numberbox('setValue', (parseInt(data.substring(66, 68), 16)-25).toFixed(1));

					$("#fcharacter").numberbox('setValue', (parseInt(data.substring(68, 70), 16)-10));
					$("#point_speed").numberbox('setValue', (parseInt(data.substring(70, 72), 16)/10));
					var fweld_ele_hight =data.substring(72, 74);
					var fweld_ele_low= data.substring(74,76);
					var fweld_ele = parseInt((fweld_ele_low + fweld_ele_hight),16);
					$("#fweld_ele ").numberbox('setValue', fweld_ele);
					
					var fweld_vol_hight =data.substring(76, 78);
					var fweld_vol_low= data.substring(78,80);
					var fweld_vol =(parseInt((fweld_vol_low + fweld_vol_hight),16)/10).toFixed(1);
					$("#fweld_vol ").numberbox('setValue', fweld_vol);
					$("#fweld_vol1").numberbox('setValue', (parseInt(data.substring(80, 82), 16)-25).toFixed(1));
					
					var hand_ele_hight =data.substring(82, 84);
					var hand_ele_low= data.substring(84,86);
					var hand_ele = parseInt((hand_ele_low + hand_ele_hight),16);
					$("#hand_ele ").numberbox('setValue', hand_ele);
					
					$("#handarc_ele ").numberbox('setValue', parseInt(data.substring(86, 88), 16));
					$("#handarc_time").numberbox('setValue', (parseInt(data.substring(88, 90), 16)/10));
					$("#thrust_ele ").numberbox('setValue', parseInt(data.substring(90, 92), 16));
					var sconx = parseInt(data.substring(92, 94), 16);
					sconx = sconx.toString(2);
					if (sconx.length < 8) {
						var length = 8 - sconx.length;
						for (var i = 0; i < length; i++) {
							sconx = "0" + sconx;
						}
					}
					if (sconx.substring(2, 3) == "0") {
						$("#pulse").prop("checked", false);
					} else {
						$("#pulse").prop("checked", true);
					}
					if (sconx.substring(3, 4) == "0") {
						$("#fselect").combobox('select',102);
					} else {
						$("#fselect").combobox('select',101);
					}
					if (sconx.substring(5, 6) == "0" && sconx.substring(6, 7) == "0") {
						$('#fargon').combobox('select', 0);
					}else if(sconx.substring(5, 6) == "1" && sconx.substring(6, 7) == "0"){
						$('#fargon').combobox('select', 10);
					}else if(sconx.substring(5, 6) == "0" && sconx.substring(6, 7) == "1"){
						$('#fargon').combobox('select', 1);
					}else{
						$('#fargon').combobox('select', 11);
					}
					if (sconx.substring(7, 8) == "0") {
						$('#manual_weld').combobox('select', 0);
					}else{
						$('#manual_weld').combobox('select', 1);
					}
						if (parseInt(data.substring(96, 98), 16) == 0) {
						$('#fweldparameters').combobox('select', 0);
					} else if (parseInt(data.substring(96, 98), 16) == 1) {
						$('#fweldparameters').combobox('select', 1);
					} else if (parseInt(data.substring(96, 98), 16) == 2) {
						$('#fweldparameters').combobox('select', 2);
					} else if (parseInt(data.substring(96, 98), 16) == 3) {
						$('#fweldparameters').combobox('select', 3);
					} else if (parseInt(data.substring(96, 98), 16) == 4) {
						$('#fweldparameters').combobox('select', 4);
					} else if (parseInt(data.substring(96, 98), 16) == 5) {
						$('#fweldparameters').combobox('select', 5);
					} else {
						$('#fweldparameters').combobox('select', 6);
					}
					if (parseInt(data.substring(94, 96), 16) == 0) {
						$('#fdiameter').combobox('select', 135);
					} else if (parseInt(data.substring(94, 96), 16) == 1) {
						$('#fdiameter').combobox('select', 131);
					} else if (parseInt(data.substring(94, 96), 16) == 2) {
						$('#fdiameter').combobox('select', 132);
					} else {
						$('#fdiameter').combobox('select', 134);
					}
					var arc_length = parseInt(data.substring(98, 100), 16);
					arc_length = arc_length.toString(2);
					if (arc_length.length < 2) {
						var length = 2 - sconx.length;
						for (var i = 0; i < length; i++) {
							sconx = "0" + sconx;
						}
					}
					if (arc_length.substring(0, 2) == "1"){
						$("#arc_length").prop("checked", true);
					} else {
						$("#arc_length").prop("checked", false);
					}
						alert("索取成功");
				}
			}
		}
}


//下发参数时对页面已写好的参数进行检测
function spcValidationFrom(){
	return $("#fm").form('enableValidation').form('validate');
}
function spcSendCheck(){
    if(!spcValidationFrom()){
    	return;
    }
	if (SPCCHECK() == false) {
		return;
	}else{
		SPC(null, null);
	}
}

//下发规范或者返回拼接好的要下发的字符串
function SPC(yshu,gather){
	if(yshu == null){
		var chanel = parseInt($('#fchanel').combobox('getValue')).toString(16);
		var fadvance = (parseFloat($('#fadvance').numberbox('getValue')) * 10).toString(16);
		var fini_ele = parseInt($('#fini_ele').numberbox('getValue')).toString(16);
		var fini_vol = (parseFloat($('#fini_vol').numberbox('getValue')) * 10).toString(16);
		var fini_vol1 = (parseInt($('#fini_vol1').numberbox('getValue'),10)+25);
		if(fini_vol1<0){
			fini_vol1 = (fini_vol1>>>0).toString(16).toLocaleUpperCase().substring(4);
		}else{
			fini_vol1 = fini_vol1.toString(16);
		}
		var firsttime = (parseFloat($('#firsttime').numberbox('getValue'))*10).toString(16);
		var rise_time  = (parseFloat($('#rise_time').numberbox('getValue'))*10).toString(16);
		var decline_time = (parseFloat($('#decline_time').numberbox('getValue'))*10).toString(16);
		var farc_ele = parseInt($('#farc_ele').numberbox('getValue')).toString(16);
		var farc_vol = (parseFloat($('#farc_vol').numberbox('getValue')) * 10).toString(16);
		var farc_vol1 = (parseInt($('#farc_vol1').numberbox('getValue'),10)+25);
		if(farc_vol1<0){
			farc_vol1 = (farc_vol1>>>0).toString(16).toLocaleUpperCase().substring(4);
		}else{
			farc_vol1 = farc_vol1.toString(16);
		}
		var farc_time = (parseFloat($('#farc_time').numberbox('getValue')) * 10).toString(16);
		var fhysteresis =(parseFloat($('#fhysteresis').numberbox('getValue')) * 10).toString(16);
		var Rush = (parseFloat($('#Rush').numberbox('getValue'))+10).toString(16);
		var frequency =(parseFloat($('#frequency').numberbox('getValue')) * 10).toString(16);
		var pulse_ratio =parseFloat($('#pulse_ratio').numberbox('getValue')).toString(16);
		var Base_ele = parseFloat($('#Base_ele').numberbox('getValue')).toString(16);
		var Base_vol = (parseFloat($('#Base_vol').numberbox('getValue')) * 10).toString(16);
		var Base_vol1 = (parseFloat($('#Base_vol1').numberbox('getValue')) +25).toString(16);
		if(Base_vol1<0){
			Base_vol1 = (Base_vol1>>>0).toString(16).toLocaleUpperCase().substring(4);
		}else{
			Base_vol1 = Base_vol1.toString(16);
		}
		var fcharacter = (parseInt($('#fcharacter').numberbox('getValue'),10)+10);
		if(fcharacter<0){
			fcharacter = (fcharacter>>>0).toString(16).toLocaleUpperCase().substring(4);
		}else{
			fcharacter = fcharacter.toString(16);
		}
		var point_speed =(parseFloat($('#point_speed').numberbox('getValue')) * 10).toString(16);
		var fweld_ele = parseInt($('#fweld_ele').numberbox('getValue')).toString(16);
		var fweld_vol = (parseFloat($('#fweld_vol').numberbox('getValue')) * 10).toString(16);
		var fweld_vol1 = (parseInt($('#fweld_vol1').numberbox('getValue'),10)+25);
		if(fweld_vol1<0){
			fweld_vol1 = (fweld_vol1>>>0).toString(16).toLocaleUpperCase().substring(4);
		}else{
			fweld_vol1 = fweld_vol1.toString(16);
		}
		var hand_ele = parseInt($('#hand_ele').numberbox('getValue')).toString(16);
		var handarc_ele = parseInt($('#handarc_ele').numberbox('getValue')).toString(16);
		var handarc_time = (parseFloat($('#handarc_time').numberbox('getValue')) * 10).toString(16);
		var thrust_ele = parseInt($('#thrust_ele').numberbox('getValue')).toString(16);
		//var manual_weld= parseInt($('#manual_weld').combobox('getValue')).toString(16);
		//var fargon = parseInt($('#fargon').combobox('getValue')).toString(16);
		//var fselect = parseInt($('#fselect').combobox('getValue')).toString(16);
		//var pulse = parseInt($('#pulse').combobox('getValue')).toString(16);
		//con需要修改
		var con = "00";
		if($('#pulse').is(':checked')){
			con =con+"1" ;
		}else{
			con =con +"0";
		}
		if ($('#fselect').combobox('getValue') == 101) {
			con =con + "1" ;
		} else {
			con = con + "0" ;
		}
		if($('#fargon').combobox('getValue') == 0){
			con = con + "0"+"00";
		}else if($('#fargon').combobox('getValue') == 1){
			con =   con +"0"+"01"  ;
		}else if($('#fargon').combobox('getValue') == 10){
			con =  con +"0" +"10" ;
		}else if($('#fargon').combobox('getValue') == 11){
			con = con+"0"+ "11" ;
		}
		if($('#manual_weld').combobox('getValue') == 0){
			con = con + "0";
		}else{
			con = con + "1";
		}
		var fdiameter  = parseInt($('#fdiameter').combobox('getValue')).toString(16);
		var fweldparameters = parseInt($('#fweldparameters').combobox('getValue')).toString(16);
		var arc_length = "";
		if ($('#arc_length').is(':checked')) {
			arc_length = "1";
		} else {
			arc_length = "0";
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
	
	}else {
		var chanel = (yshu.FWPSNum).toString(16);
		var fadvance=(yshu.fadvance*10).toString(16);
		var fini_ele=(yshu.fini_ele).toString(16);
		var fini_vol=(yshu.fini_vol*10).toString(16);
		var fini_vol1=(parseInt(yshu.fini_vol1,10)+25);
		if(fini_vol1<0){
			fini_vol1 = (fini_vol1>>>0).toString(16).toLocaleUpperCase().substring(4);
		}else{
			fini_vol1 = fini_vol1.toString(16);
		}
		var firsttime = (yshu.firsttime*10).toString(16);
		var rise_time = (yshu.rise_time*10).toString(16);
		var decline_time = (yshu.decline_time*10).toString(16);
		var fweld_vol=(yshu.fweld_vol*10).toString(16);
		var fweld_vol1=(parseInt(yshu.fweld_vol1,10)+25);
		if(fweld_vol1<0){
			fweld_vol1 = (fweld_vol1>>>0).toString(16).toLocaleUpperCase().substring(4);
		}else{
			fweld_vol1 = fweld_vol1.toString(16);
		}
		var farc_vol=(yshu.farc_vol*10).toString(16);
		var farc_vol1=(parseInt(yshu.farc_vol1,10)+25);
		if(farc_vol1<0){
			farc_vol1 = (farc_vol1>>>0).toString(16).toLocaleUpperCase().substring(4);
		}else{
			farc_vol1 = farc_vol1.toString(16);
		}
		var fweld_ele=(yshu.fweld_ele).toString(16);
		var farc_ele=(yshu.farc_ele).toString(16);
		var farc_time = (yshu.farc_time*10).toString(16);
		var fhysteresis=(yshu.fhysteresis*10).toString(16);
		var Rush = parseInt((yshu.Rush+10),10).toString(16);
		var frequency = (yshu.frequency*10).toString(16);
		var pulse_ratio= (yshu.pulse_ratio).toString(16);
		var Base_ele= (yshu.Base_ele).toString(16);
		var Base_vol= (yshu.Base_vol*10).toString(16);
		var Base_vol1=(parseInt(yshu.Base_vol1,10)+25);
		if(Base_vol1<0){
			Base_vol1 = (Base_vol1>>>0).toString(16).toLocaleUpperCase().substring(4);
		}else{
			Base_vol1 = Base_vol1.toString(16);
		}
		var fcharacter=(parseInt(yshu.fcharacter,10)+10);
		if(fcharacter<0){
			fcharacter = (fcharacter>>>0).toString(16).toLocaleUpperCase().substring(4);
		}else{
			fcharacter = fcharacter.toString(16);
		}
		var point_speed = (yshu.point_speed*10).toString(16);
		var hand_ele= (yshu.hand_ele).toString(16);
		var handarc_ele= (yshu.handarc_ele).toString(16);
		var handarc_time= (yshu.handarc_time*10).toString(16);
		var thrust_ele = (yshu.thrust_ele).toString(16);
		var fdiameter=parseInt(yshu.fdiameter).toString(16);
		var fweldparameters= (yshu.fweldparameters).toString(16);
		var arc_length = (yshu.arc_length).toString(16);
		//con需要修改
		
		var con = "00";
		if(yshu.pulse == 0){
			con = con+"0";
		}else{
			con = con+"1";
		}
		if(yshu.manual_weld == 0){
			con = "0";
		}else{
			con = "1";
		}
		if (yshu.fselect == 101) {
			con = con + "1";
		} else {
			con = con + "0";
		}
		if(yshu.fargon == 0){
			con = con + "0"+"00";
		}else if(yshu.fargon == 1){
			con =   con +"0"+"01"  ;
		}else if(yshu.fargon == 10){
			con =  con +"0" +"10" ;
		}else if(yshu.fargon == 11){
			con = con+"0"+ "11" ;
		}
		if (yshu.manual_weld == 0) {
			con = con + "0";
		} else {
			con = con + "1";
		}
		mach=parseInt(gather).toString(16);
		if (mach.length < 4) {
			var length = 4 - mach.length;
			for (var i = 0; i < length; i++) {
				mach = "0" + mach;
			}
		}
	}
	if (chanel.length < 2) {
		var length = 2 - chanel.length;
		for (var i = 0; i < length; i++) {
			chanel = "0" + chanel;
		}
	}
	if (fadvance.length < 2) {
		var length = 2 - fadvance.length;
		for (var i = 0; i < length; i++) {
			fadvance = "0" + fadvance;
		}
	}
	if (firsttime.length < 2) {
		var length = 2 - firsttime.length;
		for (var i = 0; i < length; i++) {
			firsttime = "0" + firsttime;
		}
	}
	
	if (fini_ele.length < 4) {
		var length = 4 - fini_ele.length;
		for (var i = 0; i < length; i++) {
			fini_ele = "0"+fini_ele ;
		}
	}
	var fini_height =fini_ele.substring(0, 2);
	var fini_low = fini_ele.substring(2, 4);
	fini_ele = fini_low + fini_height;
	
	if (fini_vol.length < 4) {
		var length = 4 - fini_vol.length;
		for (var i = 0; i < length; i++) {
			fini_vol =  "0" + fini_vol ;
		}
	}
	var fini_vol_hight = fini_vol.substring(0,2);
	var fini_vol_low = fini_vol.substring(2,4);
	fini_vol = fini_vol_low + fini_vol_hight;
	
	if (fini_vol1.length < 2) {
		var length = 2 - fini_vol1.length;
		for (var i = 0; i < length; i++) {
			fini_vol1 = "0" + fini_vol1;
		}
	}
	if (rise_time.length < 2) {
		var length = 2 - rise_time.length;
		for (var i = 0; i < length; i++) {
			rise_time = "0" + rise_time;
		}
	}
	if (decline_time.length < 2) {
		var length = 2 - decline_time.length;
		for (var i = 0; i < length; i++) {
			decline_time = "0" + decline_time;
		}
	}
	if (farc_ele.length < 4) {
		var length = 4 - farc_ele.length;
		for (var i = 0; i < length; i++) {
			farc_ele ="0" + farc_ele;
		}
	}
	var farc_ele_hight = farc_ele.substring(0,2);
	var farc_ele_low = farc_ele.substring(2,4);
	farc_ele = farc_ele_low + farc_ele_hight;
	
	if (farc_vol.length < 4) {
		var length = 4 - farc_vol.length;
		for (var i = 0; i < length; i++) {
			farc_vol =  "0"+ farc_vol;
		}
	}
	var farc_vol_hight = farc_vol.substring(0,2);
	var farc_vol_low = farc_vol.substring(2,4);
	farc_vol = farc_vol_low + farc_vol_hight;
	
	if (farc_vol1.length < 2) {
		var length = 2 - farc_vol1.length;
		for (var i = 0; i < length; i++) {
			farc_vol1 = "0" + farc_vol1;
		}
	}
	if (farc_time.length < 2) {
		var length = 2 - farc_time.length;
		for (var i = 0; i < length; i++) {
			farc_time = "0" + farc_time;
		}
	}
	if (fhysteresis.length < 2) {
		var length = 2 - fhysteresis.length;
		for (var i = 0; i < length; i++) {
			fhysteresis = "0" + fhysteresis;
		}
	}
	if (Rush.length < 2) {
		var length = 2 - Rush.length;
		for (var i = 0; i < length; i++) {
			Rush = "0" + Rush;
		}
	}
	if (frequency.length < 2) {
		var length = 2 - frequency.length;
		for (var i = 0; i < length; i++) {
			frequency = "0" + frequency;
		}
	}
	if (pulse_ratio.length < 2) {
		var length = 2 - pulse_ratio.length;
		for (var i = 0; i < length; i++) {
			pulse_ratio = "0" + pulse_ratio;
		}
	}
	if (Base_ele.length < 4) {
		var length = 4 - Base_ele.length;
		for (var i = 0; i < length; i++) {
			Base_ele ="0"+ Base_ele;
		}
	}
	var Base_ele_hight = Base_ele.substring(0,2);
	var Base_ele_low = Base_ele.substring(2,4);
	Base_ele = Base_ele_low + Base_ele_hight;
	
	if (Base_vol.length < 4) {
		var length = 4 - Base_vol.length;
		for (var i = 0; i < length; i++) {
			Base_vol = "0"+ Base_vol ;
		}
	}
	var Base_vol_hight = Base_vol.substring(0,2);
	var Base_vol_low = Base_vol.substring(2,4);
	Base_vol = Base_vol_low + Base_vol_hight;
	
	
	if (Base_vol1.length < 2) {
		var length = 2 - Base_vol1.length;
		for (var i = 0; i < length; i++) {
			Base_vol1 = "0" + Base_vol1;
		}
	}
	if (fcharacter.length < 2) {
		var length = 2 - fcharacter.length;
		for (var i = 0; i < length; i++) {
			fcharacter = "0" + fcharacter;
		}
	}
	if (point_speed.length < 2) {
		var length = 2 - point_speed.length;
		for (var i = 0; i < length; i++) {
			point_speed = "0" + point_speed;
		}
	}
	
	if (fweld_ele.length < 4) {
		var length = 4 - fweld_ele.length;
		for (var i = 0; i < length; i++) {
			fweld_ele =  "0" + fweld_ele;
		}
	}
	var fweld_ele_hight = fweld_ele.substring(0,2);
	var fweld_ele_low = fweld_ele.substring(2,4);
	fweld_ele = fweld_ele_low + fweld_ele_hight;
	
	if (fweld_vol.length < 4) {
		var length = 4 - fweld_vol.length;
		for (var i = 0; i < length; i++) {
			fweld_vol = "0" + fweld_vol ;
		}
	}
	var fweld_vol_hight = fweld_vol.substring(0,2);
	var fweld_vol_low = fweld_vol.substring(2,4);
	fweld_vol = fweld_vol_low + fweld_vol_hight;
	
	if (fweld_vol1.length < 2) {
		var length = 2 - fweld_vol1.length;
		for (var i = 0; i < length; i++) {
			fweld_vol1 = "0" + fweld_vol1;
		}
	}
	if ( hand_ele.length < 4) {
		var length = 4 -  hand_ele.length;
		for (var i = 0; i < length; i++) {
			 hand_ele =  "0" + hand_ele ;
		}
	}
	var hand_ele_hight = hand_ele.substring(0,2);
	var hand_ele_low = hand_ele.substring(2,4);
	hand_ele = hand_ele_low + hand_ele_hight;
	
	if ( handarc_ele.length < 2) {
		var length = 2 -  handarc_ele.length;
		for (var i = 0; i < length; i++) {
			handarc_ele = "0" +  handarc_ele;
		}
	}
	if ( handarc_time.length < 2) {
		var length = 2 -  handarc_time.length;
		for (var i = 0; i < length; i++) {
			handarc_time = "0" +  handarc_time;
		}
	}
	if ( thrust_ele.length < 2) {
		var length = 2 -  thrust_ele.length;
		for (var i = 0; i < length; i++) {
			thrust_ele = "0" +  thrust_ele;
		}
	}
	
	//直径修改
	if (fdiameter == parseInt(131).toString(16)) {
		fdiameter = "1";
	} else if (fdiameter == parseInt(132).toString(16)) {
		fdiameter = "2";
	} else if (fdiameter == parseInt(135).toString(16)) {
		fdiameter = "0";
	} else if (fdiameter == parseInt(134).toString(16)) {
		fdiameter = "3";
	} 
	if (fdiameter.length < 2) {
		var length = 2 - fdiameter.length;
		for (var i = 0; i < length; i++) {
			fdiameter = "0" + fdiameter;
		}
	}
	//焊接参数
	if (fweldparameters == parseInt(0).toString(16)) {
		fweldparameters = "0";
	} else if (fweldparameters == parseInt(1).toString(16)) {
		fweldparameters = "1";
	} else if (fweldparameters == parseInt(2).toString(16)) {
		fweldparameters = "2";
	} else if (fweldparameters == parseInt(3).toString(16)) {
		fweldparameters = "3";
	} else if (fweldparameters == parseInt(4).toString(16)) {
		fweldparameters = "4";
	} else if (fweldparameters == parseInt(5).toString(16)) {
		fweldparameters = "5";
	}else {
		fweldparameters = "6";
	}
	if (fweldparameters.length < 2) {
		var length = 2 - fweldparameters.length;
		for (var i = 0; i < length; i++) {
			fweldparameters = "0" + fweldparameters;
		}
	}
	con = parseInt(con, 2);
	con = parseInt(con).toString(16);
	if (con.length < 2) {
		var length = 2 - con.length;
		for (var i = 0; i < length; i++) {
			con = "0" + con;
		}
	}
	var arc_length = "";
	if ($('#arc_length').is(':checked')) {
		arc_length = "1";
	} else {
		arc_length = "0";
	}
	if (arc_length.length < 2) {
		var length = 2 - arc_length.length;
		for (var i = 0; i < length; i++) {
			arc_length = "0" + arc_length;
		}
	}
	var xiafasend1 = mach + chanel +fadvance+  fini_ele+fini_vol+fini_vol1+firsttime +rise_time+decline_time+farc_ele+farc_vol+farc_vol1+farc_time+fhysteresis+
	Rush+frequency+pulse_ratio+Base_ele+Base_vol+Base_vol1+fcharacter+point_speed+fweld_ele+fweld_vol+ fweld_vol1+hand_ele+handarc_ele+handarc_time+thrust_ele+
	con+ fdiameter+fweldparameters+arc_length + "00000000";

	var xxx = xiafasend1.toUpperCase();
	var data_length = ((parseInt(xxx.length) + 12) / 2).toString(16);
	if (data_length.length < 2) {
		var length = 2 - data_length.length;
		for (var i = 0; i < length; i++) {
			data_length = "0" + data_length;
		}
	}
	;
	xxx ="7E" + data_length + "01010152" + xiafasend1;
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
	if(yshu!=null){
		return "7E"+xiafasend2+"7D";
	}
	console.log(xiafasend2);
	var symbol = 0;
	var message = new Paho.MQTT.Message("7E" + xiafasend2 + "7D");
	message.destinationName = "weldmes-webdatadown";
	client.send(message);
	var oneMinuteTimer = window.setTimeout(function() {
		if (symbol == 0) {
			client.unsubscribe("weldmes-webdataup", {
				onSuccess : function(e) {
					console.log("取消订阅成功");
				},
				onFailure : function(e) {
					console.log(e);
				}
			})
//			$('#buttonCancel').linkbutton('enable');
//			$('#buttonOk').linkbutton('enable');
			alert("下发超时");
		}
	}, 3000);
	client.subscribe("weldmes-webdataup", {
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
		var fan = e.payloadString;
		if (fan.substring(0, 2) == "7E" && fan.substring(10, 12) == "52") {
			client.unsubscribe("weldmes-webdataup", {
				onSuccess : function(e) {
					console.log("取消订阅成功");
				},
				onFailure : function(e) {
					console.log(e);
				}
			});
			window.clearTimeout(oneMinuteTimer);
			symbol = 1;
			if (parseInt(fan.substring(18, 20), 16) == 1) {
//				websocket.close();
				alert("下发失败");
			} else {
//				websocket.close();
				SPCSAVE(1);
				alert("下发成功");
			}
		}
	}
}

//界面参数规则
function SPCRULE(){
	var mySelect = $("#fgas option");
	$("#fselect").combobox({
		onChange : function(record) {
			if (record == 102) {
				$("#avo").hide();
				$("#tavo").hide();
				$("#dbasevol1").hide();
				$("#rbasevol1").hide();
				$("#ivo").hide();
				$("#tivo").hide();
				$("#wvo").hide();
				$("#twvo").hide();
				$("#av").show();
				$("#tav").show();
				$("#wv").show();
				$("#twv").show();
				$("#iv").show();
				$("#tiv").show();
				$("#rbasevol").show();
				$("#dbasevol").show();
			} else {
				$("#avo").show();
				$("#tavo").show();
				$("#dbasevol1").show();
				$("#rbasevol1").show();
				$("#ivo").show();
				$("#tivo").show();
				$("#wvo").show();
				$("#twvo").show();
				$("#av").hide();
				$("#tav").hide();
				$("#wv").hide();
				$("#twv").hide();
				$("#iv").hide();
				$("#tiv").hide();
				$("#rbasevol").hide();
				$("#dbasevol").hide();
			}
		}
	});
	
	$("#manual_weld").combobox({
		onChange : function(record) {
			if (record == "1") {
				$("#div-1").hide();
				$("#div-2").hide();
				$("#div-3").hide();
				$("#div-4").hide();
				$("#div-5").hide();
				$("#div-6").hide();
				$("#div-7").hide();
				$("#div-8").hide();
				$("#div-9").hide();
				$("#div-10").hide();
				$("#div-11").hide();
				$("#div-12").hide();
				$("#div-13").hide();
				$("#div--1").show();
				$("#div--2").show();
			} else {
				$("#div-1").show();
				$("#div-2").show();
				$("#div-3").show();
				$("#div-4").show();
				$("#div-5").show();
				$("#div-6").show();
				$("#div-7").show();
				$("#div-8").show();
				$("#div-9").show();
				$("#div-10").show();
				$("#div-11").show();
				$("#div-12").show();
				$("#div-13").show();
				$("#div--1").hide();
				$("#div--2").hide();
			}
		}
	});

	$("#fargon").combobox({
		onSelect : function(record) {
			if (record.value == 1) {
				$("#fini_ele").numberbox('enable',true);
				$("#fini_vol").numberbox('enable',true);
				$("#fini_vol1").numberbox('enable',true);
				$("#firsttime").numberbox('enable',true);
				$("#rise_time").numberbox('enable',true);
				$("#farc_ele").numberbox('enable',true);
				$("#farc_vol").numberbox('enable',true);
				$("#farc_vol1").numberbox('enable',true);
				$("#farc_time").numberbox('enable',true);
				$("#decline_time").numberbox('enable',true);
			} else if(record.value == 11){
				$("#fini_ele").numberbox('enable',true);
				$("#fini_vol").numberbox('enable',true);
				$("#fini_vol1").numberbox('enable',true);
				$("#firsttime").numberbox('disable',true);
				$("#rise_time").numberbox('enable',true);
				$("#farc_ele").numberbox('enable',true);
				$("#farc_vol").numberbox('enable',true);
				$("#farc_vol1").numberbox('enable',true);
				$("#farc_time").numberbox('disable',true);
				$("#decline_time").numberbox('enable',true);
			}else{
				$("#fini_ele").numberbox('disable',true);
				$("#fini_vol").numberbox('disable',true);
				$("#fini_vol1").numberbox('disable',true);
				$("#firsttime").numberbox('disable',true);
				$("#rise_time").numberbox('disable',true);
				$("#farc_ele").numberbox('disable',true);
				$("#farc_vol").numberbox('disable',true);
				$("#farc_vol1").numberbox('disable',true);
				$("#farc_time").numberbox('disable',true);
				$("#decline_time").numberbox('disable',true);
			}
		}
	});
	
	document.getElementById("pulse").onchange = function(){
		if ($('#pulse').is(':checked')) {
			$("#frequency").numberbox('enable',true);
			$("#pulse_ratio").numberbox('enable',true);
			$("#Base_ele").numberbox('enable',true);
			$("#Base_vol").numberbox('enable',true);
			$("#Base_vol1").numberbox('enable',true);
		}else{
			$("#frequency").numberbox('disable',true);
			$("#pulse_ratio").numberbox('disable',true);
			$("#Base_ele").numberbox('disable',true);
			$("#Base_vol").numberbox('disable',true);
			$("#Base_vol1").numberbox('disable',true);
		}
	}
	
	$("#fweldparameters").combobox({
		onChange:function(){
			var selectValue = $('#fdiameter').combobox('getValue');
			var fweldparameters = $("#fweldparameters").combobox('getValue');
			if(fweldparameters == 0 || fweldparameters == 1){
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
				if(selectValue!=131 && selectValue!=132 && selectValue!=134 && selectValue!=135){
					var data = $('#fdiameter').combobox('getData');
					$('#fdiameter').combobox('select',data[0].value);
				}else{
					$('#fdiameter').combobox('select',selectValue);
				}
				$("#pulse").prop("disabled", true);
			}else if(fweldparameters == 2){
				$('#fdiameter').combobox('clear');
				$('#fdiameter').combobox('loadData', [ {
					"text" : "Φ1.2",
					"value" : "132"
				}]);
				if(selectValue!=132){
					var data = $('#fdiameter').combobox('getData');
					$('#fdiameter').combobox('select',data[0].value);
				}else{
					$('#fdiameter').combobox('select',selectValue);
				}
				$("#pulse").prop("disabled", true);
			}else if(fweldparameters == 3 || fweldparameters == 4){
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
				}]);
				if(selectValue!=131 && selectValue!=132 && selectValue!=135){
					var data = $('#fdiameter').combobox('getData');
					$('#fdiameter').combobox('select',data[0].value);
				}else{
					$('#fdiameter').combobox('select',selectValue);
				}
				$("#pulse").prop("disabled", false);
			}else if(fweldparameters == 5 || fweldparameters == 6){
				$('#fdiameter').combobox('clear');
				$('#fdiameter').combobox('loadData', [{
					"text" : "Φ1.2",
					"value" : "132"
				}]);
				if(selectValue!=132){
					var data = $('#fdiameter').combobox('getData');
					$('#fdiameter').combobox('select',data[0].value);
				}else{
					$('#fdiameter').combobox('select',selectValue);
				}
				$("#pulse").prop("disabled", false);
			}
			
			if(fweldparameters == 0 || fweldparameters == 1 || fweldparameters == 2){
				$("#fcharacter").numberbox('enable',true);
			}else{
				$("#fcharacter").numberbox('disable',true);
			}
		}
	})
/*	var data = $('#fweldparameters').combobox('getData');
	$('#fweldparameters').combobox('select',data[1].value);*/
	
	$("#fchanel").combobox({
		onSelect : function(record) {
			SPCINIT(0);
			$.ajax({
				type : "post",
				async : false,
				url : "wps/getAllSpe?machine=" + node11.id + "&chanel=" + record.value,
				data : {},
				dataType : "json", //返回数据形式为json  
				success : function(result) {
					if (result) {
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
//								$("#pulse").combobox('select',yshu[0].pulse);//双脉冲
							$("#rise_time").numberbox('setValue', yshu[0].rise_time);//缓升时间
							$("#firsttime").numberbox('setValue',yshu[0].firsttime);//初期时间
							$("#decline_time").numberbox('setValue', yshu[0].decline_time);//缓降时间
							$("#thrust_ele").numberbox('setValue', yshu[0].thrust_ele);//推力电流
							$("#pulse_ratio").numberbox('setValue', yshu[0].pulse_ratio);//双脉冲占空比
							$("#point_speed").numberbox('setValue', yshu[0].point_speed);//点动送丝速度
							$('#fweldparameters').combobox('select', yshu[0].fweldparameters);
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
							if (yshu[0].pulse == "1") {
								$("#pulse").prop("checked", true);
								$("#frequency").numberbox('enable',true);
								$("#pulse_ratio").numberbox('enable',true);
								$("#Base_ele").numberbox('enable',true);
								$("#Base_vol").numberbox('enable',true);
								$("#Base_vol1").numberbox('enable',true);
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
	});
}

//参数保存到数据库
function SPCSAVE(value){
	if (SPCCHECK() == false) {
		return;
	};
	var url2 = "";
	var finitial;
	var fcontroller;
	var fmode;
	var ftorch;
	var arc_length;
	var pulse;
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
	}
	if ($("#arc_length").is(":checked") == true) {
		arc_length = 1;
	} else {
		arc_length = 0;
	}
	if ($("#pulse").is(":checked") == true) {
		pulse = 1;
	} else {
		pulse = 0;
	}
	var fselect = $('#fselect').combobox('getValue');//一元个别
	var farc = 0;//收弧
	var fmaterial = 0;//材料
	var fgas = 0;//气体
	var fdiameter = $('#fdiameter').combobox('getValue');//焊丝直径
	var chanel = $('#fchanel').combobox('getValue');//通道号
	var ftime = 0;//点焊时间
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
	var fweld_tuny_ele = 0;
	var farc_tuny_ele = 0;
	var fini_vol = $('#fini_vol').numberbox('getValue');
	var fweld_vol = $('#fweld_vol').numberbox('getValue');
	var farc_vol = $('#farc_vol').numberbox('getValue');
	var fprocess = 0;
	var fweld_tuny_vol = 0;
	var farc_tuny_vol = 0;
	var machine = node11.id;
	var frequency = $('#frequency').numberbox('getValue');
	var gasflow = 0;
	var weldingratio = 0;
	messager = "保存成功！";
	url2 = "wps/apSpc" + "?finitial=" + finitial + "&fcontroller=" + fcontroller + "&fmode=" + fmode + "&fselect=" + fselect + "&farc=" + farc + "&fmaterial=" + fmaterial + "&fgas=" + fgas + "&fdiameter=" + fdiameter + "&chanel=" + chanel + "&ftime=" + ftime + "&fadvance=" + fadvance + "&fini_ele=" + fini_ele + "&fweld_ele=" + fweld_ele + "&farc_ele=" + farc_ele + "&fhysteresis=" + fhysteresis + "&fcharacter=" + fcharacter + "&fweld_tuny_ele=" + fweld_tuny_ele + "&farc_tuny_ele=" + farc_tuny_ele + "&fini_vol=" + fini_vol +
	"&fini_vol1=" + fini_vol1 + "&fweld_vol=" + fweld_vol + "&fweld_vol1=" + fweld_vol1 + "&farc_vol=" + farc_vol + "&farc_vol1=" + farc_vol1 + "&fweld_tuny_vol=" + fweld_tuny_vol + "&farc_tuny_vol=" + farc_tuny_vol +  "&ftorch=" + ftorch + "&frequency=" + frequency + "&gasflow=" + gasflow + "&weldingratio=" + weldingratio+ "&machine=" + machine+"&firsttime="+firsttime+ "&farc_time="+farc_time+ "&Rush="+Rush +"&handarc_ele="+handarc_ele +"&handarc_time=" +handarc_time +"&hand_ele="+hand_ele +
	"&Base_ele="+Base_ele +"&Base_vol=" +Base_vol+"&Base_vol1="+Base_vol1 +"&fargon=" +fargon +"&manual_weld="+manual_weld +"&arc_length="+arc_length +"&pulse="+pulse +"&fweldparameters="+fweldparameters+"&rise_time="+rise_time +"&decline_time="+decline_time+"&thrust_ele="+thrust_ele+"&pulse_ratio="+pulse_ratio +"&point_speed="+point_speed;
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

//打开通道复制的dialog
function openSpcCopyDialog(value){
	WeldInsframework();
	var url="";
	if (value == 1 || value == 3) {
		url = "wps/findCount?mac=" + node11.id + "&chanel=";
	}else{
		url = "wps/findCount?mac=" + node11.id + "&chanel=" + $('#fchanel').combobox('getValue');
	}
	$.ajax({
		type : "post",
		async : false,
		url : url,
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
	if(value != 3){
	if (chanelCount == 0) {
		alert("未查询到相关参数，无法复制给別的焊机");
		return;
	}
	document.getElementById("mu").innerHTML = "源目标焊机：" + node11.text;
	$('#divro').window({
		title : "目标焊机选择",
		modal : true
	});
	$('#divro').window('open');
}else{
	document.getElementById("mux").innerHTML = "源目标焊机：" + node11.text;
	$('#divrox').window({
		title : "目标焊机选择",
		modal : true
	});
	$('#divrox').window('open');
}
	flag = value;
}

//通道复制的焊机选择表格赋值
function spcDialogData(){
	$("#ro").datagrid({
		height : $("#tab").height(),
		width : $("#tab").width(),
		idField : 'id',
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		url : "weldingMachine/getWedlingMachineList?searchStr=" + "(w.fmodel=" + machineModel + " and w.fequipment_no!='" + node11.text + "')",
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

//控制命令群发获取焊机列表
function spccontrol(){
	$("#rox").datagrid({
		height : $("#tabx").height(),
		width : $("#tabx").width(),
		idField : 'id',
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		url : "weldingMachine/getWedlingMachineList?searchStr=" + "(w.fmodel=" + machineModel + ")",
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
			align : "left",
			hidden : true
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

//参数复制保存到数据库
function saveSpcCopy(){
	if(flag == 1 || flag == 0){
	var smachine = node11.id;
	rows = "";
	var chanel1 = $('#fchanel').combobox('getValue');
	var rows = $("#ro").datagrid("getSelections");
	var ro1Rows = new Array();
	var obj = {};
	for (var i = 0; i < rows.length; i++) {
		if (!rows[i].gatherId) {
			ro1Rows.length = 0;
			alert(rows[i].equipmentNo + "焊机未绑定采集模块！！！")
			return;
		}
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
		if (flag == 1) {
			var url1 = "wps/Spe?machine=" + node11.id + "&chanel=" + "";
		} else {
			var url1 = "wps/Spe?machine=" + node11.id + "&chanel=" + chanel1;
		}
		var yshuary = new Array();
		$.ajax({
			type : "post",
			async : false,
			url : url1,
			data : {},
			dataType : "json", //返回数据形式为json  
			success : function(result) {
				if (result) {
					yshu1 = eval(result.rows);
					var chanelnum = result.chanelNum.substr(0, result.chanelNum.length - 1);
					var failChanelRows = chanelnum.split(",");
					for (var i = 0; i < obj.total; i++) {
						obj.rows[i].num = chanelnum;
						obj.rows[i].nonum = chanelnum;
					}
					$("#ro1").datagrid("loadData", obj);
					for (var q = 0; q < rows.length; q++) {
						for (var c = 0; c < failChanelRows.length; c++) {
							failRows.push(
								{
									gatherNo : rows[q].gatherId,
									chanel : failChanelRows[c]
								}
							);
						}
						for (var n = 0; n < yshu1.length; n++) {
							yshuary.push(SPC(yshu1[n], rows[q].gatherId));
							allIssueRows.push(SPC(yshu1[n], rows[q].gatherId));
						}
					}
				} else {
					alert("未查询到相关数据，请尝试索取保存。");
				}
			},
			error : function(errorMsg) {
				alert("数据请求失败，请联系系统管理员!");
			}
		});
		client.subscribe("weldmes-webdataup", {
			qos : 0,
			onSuccess : function(e) {
				console.log("订阅成功");
			},
			onFailure : function(e) {
				console.log(e);
			}
		})
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
		var reIssueFlagTimer;
		rows1 = ro1Rows;
		reIssueFlagTimer = window.setTimeout(function() {
			issueFlag = 1;
			if (failRows.length != 0) {
				for (var i = 0; i < allIssueRows.length; i++) {
					for (var j = 0; j < failRows.length; j++) {
						if (parseInt(allIssueRows[i].substring(12, 16),16) == parseInt(failRows[j].gatherNo,10) && parseInt(allIssueRows[i].substring(16, 18),16) == parseInt(failRows[j].chanel,10)) {
							reIssue.push(allIssueRows[i]);
						}
					}
				}
				;
				var wsi = window.setInterval(function() {
					if (reIssue.length > 0) {
						var message = new Paho.MQTT.Message(reIssue.pop());
						message.destinationName = "weldmes-webdatadown";
						client.send(message);
						console.log("xx");
					} else {
						window.clearInterval(wsi);
					}
				}, 250);
				window.setTimeout(function() {
					client.unsubscribe("weldmes-webdataup", {
						onSuccess : function(e) {
							console.log("取消订阅成功");
						},
						onFailure : function(e) {
							console.log(e);
						}
					});
					waitSpc();
					//					symbol1++;
					x = 0;
					xx = 0;
					rows1.length = 0;
					rows.length = 0;
					failRows.length = 0;
					allIssueRows.length = 0;
					reIssue.length = 0;
					str = "";
					$('#ro').datagrid('clearSelections');
					alert("复制完成");
				}, failRows.length * 250 + 3000);
			}
		}, yshuary.length * 250 + 3000);
		var wsi = window.setInterval(function() {
			if (yshuary.length > 0) {
				var message = new Paho.MQTT.Message(yshuary.pop());
				message.destinationName = "weldmes-webdatadown";
				client.send(message);
			} else {
				window.clearInterval(wsi);
			}
		}, 250)
		//	wait();
		client.onMessageArrived = function(e) {
			var fan = e.payloadString;
			if (fan.substring(0, 2) == "7E" && fan.substring(10, 12) == "52") {
				if (parseInt(fan.substring(18, 20), 16) == 1) {
					if (issueFlag == 0) {
						x++;
						if (x == rows1[xx].num.toString().split(",").length) {
							xx++;
							x = 0;
							if (xx == rows1.length) {
								window.clearTimeout(reIssueFlagTimer);
								issueFlag = 1;
								if (failRows.length != 0) {
									for (var i = 0; i < allIssueRows.length; i++) {
										for (var j = 0; j < failRows.length; j++) {
											if (parseInt(allIssueRows[i].substring(12, 16),16) == parseInt(failRows[j].gatherNo,10) && parseInt(allIssueRows[i].substring(16, 18),16) == parseInt(failRows[j].chanel,10)) {
												reIssue.push(allIssueRows[i]);
											}
										}
									}
									;
									var wsi = window.setInterval(function() {
										if (reIssue.length > 0) {
											var message = new Paho.MQTT.Message(reIssue.pop());
											message.destinationName = "weldmes-webdatadown";
											client.send(message);
										} else {
											window.clearInterval(wsi);
										}
									}, 250);
									window.setTimeout(function() {
										client.unsubscribe("weldmes-webdataup", {
											onSuccess : function(e) {
												console.log("取消订阅成功");
											},
											onFailure : function(e) {
												console.log(e);
											}
										});
										waitSpc();
										//										symbol1++;
										x = 0;
										xx = 0;
										rows1.length = 0;
										rows.length = 0;
										failRows.length = 0;
										allIssueRows.length = 0;
										reIssue.length = 0;
										str = "";
										$('#ro').datagrid('clearSelections');
										alert("复制完成");
									}, failRows.length * 250 + 3000);
								} else {
									client.unsubscribe("weldmes-webdataup", {
										onSuccess : function(e) {
											console.log("取消订阅成功");
										},
										onFailure : function(e) {
											console.log(e);
										}
									});
									waitSpc();
									//									symbol1++;
									x = 0;
									xx = 0;
									rows1.length = 0;
									rows.length = 0;
									failRows.length = 0;
									allIssueRows.length = 0;
									reIssue.length = 0;
									str = "";
									$('#ro').datagrid('clearSelections');
									alert("复制完成");
								}

							} /*else {
						ccp(rows[xx].gatherId);
					}*/
						}
					}
					for (var i = 0; i < obj.total; i++) {
						var chanelnum = obj.rows[i].nonum.split(",");
						var gatherno = obj.rows[i].gatherNo;
						if (parseInt(fan.substring(12, 16), 16) == parseInt(gatherno,10) && chanelnum.indexOf(parseInt(fan.substring(16, 18), 16).toString()) >= 0) {
							chanelnum.pop(parseInt(fan.substring(16, 18), 16));
							obj.rows[i].nonum = chanelnum.join(",");
							obj.rows[i].failnum += parseInt(fan.substring(16, 18), 16).toString() + ",";
						}
					}
				} else {
					x++;
					if (x == rows1[xx].num.toString().split(",").length) {
						xx++;
						x = 0;
						if (xx == rows1.length) {
							window.clearTimeout(reIssueFlagTimer);
							issueFlag = 1;
							if (failRows.length != 0) {
								for (var i = 0; i < allIssueRows.length; i++) {
									for (var j = 0; j < failRows.length; j++) {
										if (parseInt(allIssueRows[i].substring(12, 16),16) == parseInt(failRows[j].gatherNo,10) && parseInt(allIssueRows[i].substring(16, 18),16) == parseInt(failRows[j].chanel,10)) {
											reIssue.push(allIssueRows[i]);
										}
									}
								}
								;
								var wsi = window.setInterval(function() {
									if (reIssue.length > 0) {
										var message = new Paho.MQTT.Message(reIssue.pop());
										message.destinationName = "weldmes-webdatadown";
										client.send(message);
									} else {
										window.clearInterval(wsi);
									}
								}, 250);
								window.setTimeout(function() {
									client.unsubscribe("weldmes-webdataup", {
										onSuccess : function(e) {
											console.log("取消订阅成功");
										},
										onFailure : function(e) {
											console.log(e);
										}
									});
									waitSpc();
									//								symbol1++;
									x = 0;
									xx = 0;
									rows1.length = 0;
									rows.length = 0;
									failRows.length = 0;
									allIssueRows.length = 0;
									reIssue.length = 0;
									str = "";
									$('#ro').datagrid('clearSelections');
									alert("复制完成");
								}, failRows.length * 250 + 3000);
							} else {
								client.unsubscribe("weldmes-webdataup", {
									onSuccess : function(e) {
										console.log("取消订阅成功");
									},
									onFailure : function(e) {
										console.log(e);
									}
								});
								waitSpc();
								//							symbol1++;
								x = 0;
								xx = 0;
								rows1.length = 0;
								rows.length = 0;
								failRows.length = 0;
								allIssueRows.length = 0;
								reIssue.length = 0;
								str = "";
								$('#ro').datagrid('clearSelections');
								alert("复制完成");
							}

						} /*else {
						ccp(rows[xx].gatherId);
					}*/
					} /*else {
					ccp(rows[xx].gatherId);
				}*/
					for (var i = 0; i < obj.total; i++) {
						var chanelnum = obj.rows[i].nonum.toString().split(",");
						var gatherno = obj.rows[i].gatherNo;
						if (parseInt(fan.substring(12, 16), 16) == parseInt(gatherno,10) && chanelnum.indexOf(parseInt(fan.substring(16, 18), 16).toString()) >= 0) {
							chanelnum.pop(parseInt(fan.substring(16, 18), 16));
							obj.rows[i].nonum = chanelnum.join(",");
							obj.rows[i].readynum += parseInt(fan.substring(16, 18), 16).toString() + ",";
							for (var f = 0; f < failRows.length; f++) {
								if (failRows[f].gatherNo == gatherno && parseInt(failRows[f].chanel) == parseInt(fan.substring(16, 18))) {
									failRows.splice(f, 1);
								}
							}
						}
					//					obj.rows[i].failnum = obj.rows[i].failnum.substring(0,obj.rows[i].failnum.length-1);
					}
				}
			}
			$("#ro1").datagrid("loadData", obj);
		}
	} else {
		$('#divro').dialog('close');
	}
	} else {

		var smachine = node11.text;
		//rows = "";
		//var chanel1 = $('#fchanel').combobox('getValue');
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
				field : 'failnum',
				title : '设备下发状态',
				width : 80,
				halign : "center",
				align : "left",
				formatter: function(value,row,index){
						var str = "";
						if(row.failnum==0){
							str += '<a id="wait" class="easyui-linkbutton"/>';
						}
						if(row.failnum==1){
							str += '<a id="down" class="easyui-linkbutton"/>';
						}
						if(row.failnum==2){
							str += '<a id="finish" class="easyui-linkbutton"/>';
						}
						return str;
					}
			} ] ],
			pagination : true,
			rowStyler: function(index,row){
	            if ((index % 2)!=0){
	            	//处理行代背景色后无法选中
	            	var color=new Object();
	                return color;
	            }
	        },
			onLoadSuccess: function(data){
				if($("#wait").length!=0){
					$("a[id='wait']").linkbutton({text:'未响应',plain:true,iconCls:'icon-help'});
				}
				if($("#down").length!=0){
					$("a[id='down']").linkbutton({text:'下发成功',plain:true,iconCls:'icon-ok'});
				}
				if($("#finish").length!=0){
					$("a[id='finish']").linkbutton({text:'下发失败',plain:true,iconCls:'icon-cancel'});
				}
			}
		});
		var r = confirm("确认下发吗？");
		if (r == true) {
			x = 0;
			xx = 0;
			var rows = $("#rox").datagrid("getSelections");
			var ro1Rows = new Array();
			var obj = {};
			for (var i = 0; i < rows.length; i++) {
				if (!rows[i].gatherId) {
					ro1Rows.length = 0;
					alert(rows[i].equipmentNo + "焊机未绑定采集模块！！！")
					return;
				}
				ro1Rows.push({
					equipmentNo : rows[i].equipmentNo,
					gatherNo : rows[i].gatherId,
					failnum : '0'
				})
			}
			obj.total = ro1Rows.length;
			obj.rows = ro1Rows;
			$('#divrox').dialog('close');
			$('#divro1').window({
				title : "控制指令下发进行中，请稍等。。。",
				modal : true
			});
			$('#divro1').window('open');
			$("#ro1").datagrid("loadData", obj);
			var pwdflag=0;
			var str="";
			for (var i = 0; i < rows.length; i++) {
				str += rows[i].equipmentNo+",";
				var machine;
				machine = parseInt(rows[i].gatherId).toString(16);
				nomachine.push(parseInt(rows[i].gatherId));
				if(machine.length<4){
					var length = 4 - machine.length;
			        for(var m=0;m<length;m++){
			        	machine = "0" + machine;
			        };
				}
				var con = $("input[name='free']:checked").val();
				if(con.length<2){
					var length = 2 - con.length;
			        for(var a=0;a<length;a++){
			        	con = "0" + con;
			        }
			    };
				if(machineModel == 184){
					var nchanel = parseInt($('#newchanel').combobox('getValue')).toString(16);
					if (nchanel.length < 2) {
						var length = 2 - nchanel.length;
						for (var i = 0; i < length; i++) {
							nchanel = "0" + nchanel;
						}
					}
					var xiafasend1 = machine+con+nchanel;
				}else{
					var xiafasend1 = machine+con;
				}
				var xxx = xiafasend1.toUpperCase();
				var data_length = ((parseInt(xxx.length)+12)/2).toString(16);
				if(data_length.length<2){
					var length = 2 - data_length.length;
			        for(var s=0;s<length;s++){
			        	data_length = "0" + data_length;
			        }
			    };
			    xxx="7E"+data_length+"01010154"+xiafasend1;
			    var check = 0;
				for (var j = 0; j < (xxx.length/2); j++)
				{
					var tstr1=xxx.substring(j*2, j*2+2);
					var k=parseInt(tstr1,16);
					check += k;
				}
				var checksend = parseInt(check).toString(16);
				var a2 = checksend.length;
				checksend = checksend.substring(a2-2,a2);
				checksend = checksend.toUpperCase();
				var xiafasend2 = (xxx+checksend).substring(2);
				finishdata.push("7E"+xiafasend2+"7D");
				allmachine.push("7E"+xiafasend2+"7D");
		     }
			var symbol = 0;
			var t = window.setInterval(function() {
					if(finishdata.length> 0){
						var message = new Paho.MQTT.Message(finishdata.pop());
						message.destinationName = "weldmes-webdatadown";
						client.send(message);
					}else if(allmachine.length>0){
						var message = new Paho.MQTT.Message(allmachine.pop());
						message.destinationName = "weldmesjn-webdatadown";
						client.send(message);
						console.log("重发触发");
					}
					else{
						window.clearInterval(t);
						client.unsubscribe("weldmesjn-webdataup", {
							onSuccess : function(e) {
								console.log("取消订阅成功");
							},
							onFailure : function(e) {
								console.log(e);
							}
						});
						alert("下发完成");
					}
			}, 500)
				client.subscribe("weldmes-webdataup", {
				qos: 0,
				onSuccess:function(e){  
		            console.log("订阅成功");  
		        },
		        onFailure: function(e){  
		            console.log(e);  
		        }
			})
				client.onMessageArrived = function(e) {
					console.log("onMessageArrived:" + e.payloadString);
					var fan = e.payloadString; 
					var judge = parseInt(fan.substring(12,16),16);
					for(u=0;u<allmachine.length;u++){
						if(judge == parseInt(allmachine[u].substring(12, 16))){
							allmachine.splice(u, 1);
						}
					}
					for(e=0;e<nomachine.length;e++){
						if(judge == nomachine[e]){
							nomachine.splice(e, 1);
						}
					}
					if(fan.substring(0,2)=="7E"&&fan.substring(10,12)=="54"){
						var cxk = parseInt(fan.substring(12,16),16);
						if(parseInt(fan.substring(16,18),16)==1){
							for(var d=0;d<obj.total;i++){
								if(parseInt(obj.rows[d].gatherNo) == cxk){
									obj.rows[d].failnum = 2;
									break;
								}
							}
							$("#ro1").datagrid("loadData", obj);
						}else{
							for(var d=0;d<obj.total;d++){
								if(parseInt(obj.rows[d].gatherNo) == cxk){
									obj.rows[d].failnum = 1;
									break;
								}
							}
							$("#ro1").datagrid("loadData", obj);
						}
					}
				};
		} else {
			$('#divrox').dialog('close');
		}
	}
}

//所属项目
function WeldInsframework(){
	var machin_id = node11.id;
	$.ajax({  
	type : "post",  
	async : false,
	url : "weldingMachine/getWeldInsframework?machine_id="+machin_id,  
	data : {},  
	dataType : "json", //返回数据形式为json  
	success : function(result) {  
	    if (result) {
	        var optionStr = '';
	        for (var i = 0; i < result.ary.length; i++) {  
	            optionStr += "<option value=\"" + result.ary[i].id + "\" >"  
	                    + result.ary[i].name + "</option>";
	        }
	        $("#item").html(optionStr);
	        $("#itemx").html(optionStr);
	        $('#item').textbox('setValue',result.ary[0].name);
	        $('#itemx').textbox('setValue',result.ary[0].name);
	    }  
	},  
	error : function(errorMsg) {  
	    alert("数据请求失败，请联系系统管理员!");  
	}  
	}); 
	
	//$("#item").textbox();
}


function waitSpc() {
	var smachine = node11.id;
	rows = "";
	var rows = $("#ro").datagrid("getSelections");
	var str = "";
	for (var i = 0; i < rows.length; i++) {
		str += rows[i].id + ",";
	}
	;
	if (flag == 1) {
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