var flag;
var reIssue = new Array(),allIssueRows = new Array(),failRows = new Array();
var issueFlag = 0;
var finishdata = new Array();
var nomachine = new Array();
var allmachine = new Array();
$(function() {
//	SPCINIT(1);
	WBAPRULE();
	wbapDialogData();
	WeldInsframework();
	wbacontrol();
})

//下发规范或者返回拼接好的要下发的字符串
function WBAP(yshu,gather){
	if(yshu==null){		
		var chanel = parseInt($('#fchanel').combobox('getValue')).toString(16);								//通道号
		var ftime = (parseFloat($('#ftime').numberbox('getValue')) * 10).toString(16);						//点焊时间
		var fadvance = (parseFloat($('#fadvance').numberbox('getValue')) * 10).toString(16);				//提前送气
		var fhysteresis = (parseFloat($('#fhysteresis').numberbox('getValue')) * 10).toString(16); 			//滞后送气
		var rise_time = (parseFloat($('#rise_time').numberbox('getValue')) * 10).toString(16); 				//缓升时间
		var decline_time = (parseFloat($('#decline_time').numberbox('getValue')) * 10).toString(16); 		//缓降时间
		var fini_ele = (parseFloat($('#fini_ele').numberbox('getValue')) * 10).toString(16); 				//初期电流
		var fpulse_ele = (parseFloat($('#fpulse_ele').numberbox('getValue')) * 10).toString(16); 			//脉冲电流
		var farc_ele = (parseFloat($('#farc_ele').numberbox('getValue')) * 10).toString(16); 				//收弧电流
		var fweld_ele = (parseFloat($('#fweld_ele').numberbox('getValue')) * 10).toString(16); 				//焊接电流
		var ac_form = parseInt($('#ac_form').combobox('getValue')).toString(16);
		var farc = parseInt($('#farc').combobox('getValue')).toString(16);	
		var weld_method = parseInt($('#weld_method').combobox('getValue')).toString(16);					//焊接方法
		//反复时的结束方法
		var fsarc_time = parseInt($('#fsarc_time').combobox('getValue')).toString(16);						//特殊收弧时序
		var clear_width = parseInt($('#clear_width').numberbox('getValue'),10).toString(16);								//清洁宽度
		if(clear_width<0){
			clear_width = (clear_width>>>0).toString(16).toLocaleUpperCase().substring(4);
		}else{
			clear_width = clear_width.toString(16);
		}
		var acfreq = (parseFloat($('#acfreq').numberbox('getValue')) * 10).toString(16); 					//AC频率
		var pulsefreq = (parseFloat($('#pulsefreq').numberbox('getValue')) * 10).toString(16); 				//脉冲频率
		var ac_dcfreq = (parseFloat($('#ac_dcfreq').numberbox('getValue')) * 10).toString(16); 				//AC-DC切换电流
		var pulse_width = parseInt($('#pulse_width').numberbox('getValue')).toString(16);					//脉冲宽度
		var ac_rate = parseInt($('#ac_rate').numberbox('getValue')).toString(16);							//AC比率
		var fweld_tuny_ele = parseInt($('#fweld_tuny_ele').numberbox('getValue')).toString(16);				//焊接电流微调
		var farc_tuny_ele = parseInt($('#farc_tuny_ele').numberbox('getValue')).toString(16);				//收弧电流微调
		var fpulse_tuny_ele = parseInt($('#fpulse_tuny_ele').numberbox('getValue')).toString(16);			//脉冲电流微调
		var fsarc_init_time = (parseFloat($('#fsarc_init_time').numberbox('getValue')) * 10).toString(16); 	//特殊收弧时序初期时间
		var fsarc_arc_time = (parseFloat($('#fsarc_arc_time').numberbox('getValue')) * 10).toString(16); 	//特殊收弧时序收弧时间
		var click_ele = parseInt($('#click_ele').numberbox('getValue'),10);									//单击电流增减量
		if(click_ele<0){
			click_ele = (click_ele>>>0).toString(16).toLocaleUpperCase().substring(4);
		}else{
			click_ele = click_ele.toString(16);
		}
		var double_click_ele = parseInt($('#double_click_ele').numberbox('getValue'),10);					//双击电流增减量
		if(double_click_ele<0){
			double_click_ele = (double_click_ele>>>0).toString(16).toLocaleUpperCase().substring(4);
		}else{
			double_click_ele = double_click_ele.toString(16);
		}
		var frepeat_end = parseInt($('#frepeat_end').combobox('getValue')).toString(16);
		//con需要修改
		var con = "";
		if ($('#finitial').is(':checked')) {							//初期条件
			con = "1" + con;
		} else {
			con = "0" + con;
		}
		if ($('#farc').combobox('getValue') == 111) {
			con = "000" + con;
		} else if ($('#farc').combobox('getValue') == 112) {
			con = "001" + con;
		} else if ($('#farc').combobox('getValue') == 113) {
			con = "011" + con;
		} else {
			con = "100" + con;
		}
		if ($('#set_guide').is(':checked')) {							//设定指南
			con = "1" + con;
		} else {
			con = "0" + con;
		}

		con = "0" + con;

		if ($('#fcontroller').is(':checked')) {				//斜坡控制
			con = "1" + con;
		} else {
			con = "0" + con;
		}
		con = "0" + con;									//空位
		con = "0" + con;									//空位

		if ($('#fsarc').is(':checked')) {					//特殊起弧
			con = "1" + con;
		} else {
			con = "0" + con;
		}
		if ($('#fsarc_repeat').is(':checked')) {			//特殊起弧反复
			con = "1" + con;
		} else {
			con = "0" + con;
		}
		if ($('#fcondition').is(':checked')) {				//通过TS变更条件
			con = "1" + con;
		} else {
			con = "0" + con;
		}

		con = "0" + con;

		if ($('#weld_gun').is(':checked')) {				//水冷焊枪
			con = "1" + con;
		} else {
			con = "0" + con;
		}
		if ($('#pulse_ctrl').is(':checked')) {				//脉冲控制
			con = "1" + con;
		} else {
			con = "0" + con;
		}
		if ($('#contact_arc').is(':checked')) {				//接触起弧
			con = "1" + con;
		} else {
			con = "0" + con;
		}

		/***********************************************************************************/		
		con = parseInt(con, 2);		
		con = parseInt(con).toString(16);
		if (con.length < 4) {
			var length = 4 - con.length;
			for (var i = 0; i < length; i++) {
				con = "0" + con;
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
	}
	else{
		var chanel = (yshu.FWPSNum).toString(16);										//通道号
		var ftime=(yshu.ftime*10).toString(16);											//点焊时间
		var fadvance=(yshu.fadvance*10).toString(16);									//提前送气
		var fhysteresis =(yshu.fhysteresis *10).toString(16);							//滞后送气
		var rise_time =(yshu.rise_time *10).toString(16);								//缓升时间
		var decline_time =(yshu.decline_time *10).toString(16);							//缓降时间
		var fini_ele=(yshu.fini_ele*10).toString(16);										//初期电流
		var fpulse_ele=(yshu.pulse_ele*10).toString(16);									//脉冲电流
		var farc_ele=(yshu.farc_ele*10).toString(16);										//收弧电流
		var fweld_ele=(yshu.fweld_ele*10).toString(16);									//焊接电流						
		var fweld_tuny_ele =(yshu.fweld_tuny_ele).toString(16);							//焊接电流微调
		var farc_tuny_ele =(yshu.farc_tuny_ele).toString(16);							//收弧电流微调
		var ac_rate = parseInt(yshu.ac_ratio,10).toString(16);//ac比率
		var fpulse_tuny_ele = (yshu.pulse_tuny_ele).toString(16);
		var pulsefreq = (yshu.frequency*10).toString(16);
		var weld_method = (yshu.fprocessid).toString(16);
		var farc = (yshu.farc).toString(16);
		var pulse_width = parseInt(yshu.pulse_width,10).toString(16);
		var fsarc_time = (yshu.special_arcorder).toString(16);
		var fsarc_init_time = (yshu.special_arc_initial*10).toString(16);
		var fsarc_arc_time = (yshu.special_arctime*10).toString(16);
		var click_ele = (yshu.click_ele).toString(16);
		var double_click_ele = (yshu.two_click_ele).toString(16);
		var frepeat_end = (yshu.repeat_end).toString(16);
		var acfreq = (yshu.ac_frequency*10).toString(16);
		var ac_dcfreq = (yshu.ac_dc*10).toString(16);
		var clear_width = (yshu.clean_width).toString(16);
		var ac_form = (yshu.ac_wave).toString(16);

		//con需要修改
		var con = "";
		con = yshu.finitial + con;
		if (yshu.farc == 111) {
			con = "000"+con;
		} else if (yshu.farc == 112) {
			con =  "100"+ con;
		} else if (yshu.farc == 113) {
			con ="010" + con ;
		} else {
			con ="001" + con ;
		}
		if (yshu.guide == 1) {							//设定指南
			con = "1" + con ;
		} else {
			con = "0" + con;
		}
		con = "0" + con;

		if (yshu.slope == 1) {				//斜坡控制
			con = "1" + con;
		} else {
			con = "0" + con;
		}
		con = "0" + con;									//空位
		con = "0" + con;									//空位

		if (yshu.specialarc == 1) {					//特殊起弧
			con = "1" + con;
		} else {
			con = "0" + con;
		}
		if (yshu.specialarc_rep == 1) {			//特殊起弧反复
			con = "1" + con;
		} else {
			con = "0" + con;
		}
		if (yshu.ts_condition == 1) {				//通过TS变更条件
			con = "1" + con;
		} else {
			con = "0" + con;
		}

		con = "0" + con;

		if (yshu.ftorch == 1) {				//水冷焊枪
			con = "1" + con;
		} else {
			con = "0" + con;
		}
		if (yshu.pulse == 1) {				//脉冲控制
			con = "1" + con;
		} else {
			con = "0" + con;
		}
		if (yshu.fcharacter == 1) {				//接触起弧
			con = "1" + con;
		} else {
			con = "0" + con;
		}
		con = parseInt(con, 4);
		con = parseInt(con).toString(16);
		if (con.length < 4) {
			var length = 4 - con.length;
			for (var i = 0; i < length; i++) {
				con = "0" + con;
			}
		}
		mach=parseInt(gather).toString(16);
//		mach = mach.toString(16);
		if (mach.length < 4) {
			var length = 4 - mach.length;
			for (var i = 0; i < length; i++) {
				mach = "0" + mach;
			}
		}
	}

	/********************************************/	
	if (chanel.length < 2) {							//通道号
		var length = 2 - chanel.length;
		for (var i = 0; i < length; i++) {
			chanel = "0" + chanel;
		}
	}
	if (ftime.length < 4) {								//点焊时间
		var length = 4 - ftime.length;
		for (var i = 0; i < length; i++) {
			ftime = "0" + ftime;
		}
	}

	if (fadvance.length < 4) {							//提前送气时间
		var length = 4 - fadvance.length;
		for (var i = 0; i < length; i++) {
			fadvance = "0" + fadvance;
		}
	}

	if (fini_ele.length < 4) {							//初期电流
		var length = 4 - fini_ele.length;
		for (var i = 0; i < length; i++) {
			fini_ele = "0" + fini_ele;
		}
	}

	if (fpulse_ele.length < 4) {						//脉冲电流
		var length = 4 - fpulse_ele.length;
		for (var i = 0; i < length; i++) {
			fpulse_ele = "0" + fpulse_ele;
		}
	}

	if (rise_time.length < 4) {							//缓升时间
		var length = 4 - rise_time.length;
		for (var i = 0; i < length; i++) {
			rise_time = "0" + rise_time;
		}
	}
	if (fweld_ele.length < 4) {							//焊接电流
		var length = 4 - fweld_ele.length;
		for (var i = 0; i < length; i++) {
			fweld_ele = "0" + fweld_ele;
		}
	}
	if (acfreq.length < 4) {							//AC频率
		var length = 4 - acfreq.length;
		for (var i = 0; i < length; i++) {
			acfreq = "0" + acfreq;
		}
	}
	if (clear_width.length < 4) {						//清洁宽度
		var length = 4 - clear_width.length;
		for (var i = 0; i < length; i++) {
			clear_width = "0" + clear_width;
		}
	}
	if (farc_ele.length < 4) {							//收弧电流
		var length = 4 - farc_ele.length;
		for (var i = 0; i < length; i++) {
			farc_ele = "0" + farc_ele;
		}
	}
	if (pulsefreq.length < 4) {							//脉冲频率
		var length = 4 - pulsefreq.length;
		for (var i = 0; i < length; i++) {
			pulsefreq = "0" + pulsefreq;
		}
	}
	if (decline_time.length < 4) {						//缓降时间
		var length = 4 - decline_time.length;
		for (var i = 0; i < length; i++) {
			decline_time = "0" + decline_time;
		}
	}
	if (fhysteresis.length < 4) {						//滞后送气时间
		var length = 4 - fhysteresis.length;
		for (var i = 0; i < length; i++) {
			fhysteresis = "0" + fhysteresis;
		}
	}
	if (ac_dcfreq.length < 4) {							//AC-DC切换频率
		var length = 4 - ac_dcfreq.length;
		for (var i = 0; i < length; i++) {
			ac_dcfreq = "0" + ac_dcfreq;
		}
	}
	if (pulse_width.length < 2) {							//脉冲宽度的设定
		var length = 2 - pulse_width.length;
		for (var i = 0; i < length; i++) {
			pulse_width = "0" + pulse_width;
		}
	}

	if (ac_rate.length < 2) {							//AC比率
		var length = 2 - ac_rate.length;
		for (var i = 0; i < length; i++) {
			ac_rate = "0" + ac_rate;
		}
	}

	if (ac_form.length < 2) {							//AC波形
		var length = 2 - ac_form.length;
		for (var i = 0; i < length; i++) {
			ac_form = "0" + ac_form;
		}
	}
	if (weld_method.length < 2) {							//焊接方法
		var length = 2 - weld_method.length;
		for (var i = 0; i < length; i++) {
			weld_method = "0" + weld_method;
		}
	}

	if (fweld_tuny_ele.length < 2) {					//焊接电流微调
		var length = 2 - fweld_tuny_ele.length;
		for (var i = 0; i < length; i++) {
			fweld_tuny_ele = "0" + fweld_tuny_ele;
		}
	}

	if (fpulse_tuny_ele.length < 2) {					//脉冲电流微调
		var length = 2 - fpulse_tuny_ele.length;
		for (var i = 0; i < length; i++) {
			fpulse_tuny_ele = "0" + fpulse_tuny_ele;
		}
	}

	if (fsarc_time.length < 2) {						//特殊收弧时序
		var length = 2 - fsarc_time.length;
		for (var i = 0; i < length; i++) {
			fsarc_time = "0" + fsarc_time;
		}
	}

	if (farc_tuny_ele.length < 2) {						//收弧电流微调
		var length = 2 - farc_tuny_ele.length;
		for (var i = 0; i < length; i++) {
			farc_tuny_ele = "0" + farc_tuny_ele;
		}
	}

	if (fsarc_init_time.length < 2) {					//特殊收弧时序初期时间
		var length = 2 - fsarc_init_time.length;
		for (var i = 0; i < length; i++) {
			fsarc_init_time = "0" + fsarc_init_time;
		}
	}


	if (fsarc_arc_time.length < 2) {					//特殊收弧时序收弧时间
		var length = 2 - fsarc_arc_time.length;
		for (var i = 0; i < length; i++) {
			fsarc_arc_time = "0" + fsarc_arc_time;
		}
	}

	if (click_ele.length < 4) {							//单击操作的电流增减量
		var length = 4 - click_ele.length;
		for (var i = 0; i < length; i++) {
			click_ele = "0" + click_ele;
		}
	}

	if (double_click_ele.length < 4) {					//双击操作的电流增减量
		var length = 4 - double_click_ele.length;
		for (var i = 0; i < length; i++) {
			double_click_ele = "0" + double_click_ele;
		}
	}

	if (frepeat_end.length < 2) {						//反复时的结束方法
		var length = 2 - frepeat_end.length;
		for (var i = 0; i < length; i++) {
			frepeat_end = "0" + frepeat_end;
		}
	}
	/********************************************/	


	/*	var mach = parseInt(selectMachine[smindex].gatherId).toString(16);
	if(mach.length<4){
		var length = 4 - mach.length;
        for(var i=0;i<length;i++){
        	mach = "0" + mach;
        };
	}*/

	var xiafasend1 = mach + chanel + ftime + fadvance + fini_ele + fpulse_ele + rise_time + 
	fweld_ele + acfreq + clear_width + farc_ele + pulsefreq + decline_time + fhysteresis + 
	ac_dcfreq + pulse_width + ac_rate + ac_form +weld_method + con + fweld_tuny_ele 
	+ fpulse_tuny_ele + farc_tuny_ele + fsarc_time + fsarc_init_time + 
	fsarc_arc_time + click_ele + double_click_ele + frepeat_end+"00";

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
	console.log(xiafasend2);
	if(yshu!=null){
		return "7E"+xiafasend2+"7D";
	}
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
				WBAPSAVE(1);
				alert("下发成功");
			}
		}
	}
}

//索取规范并赋值
function WBAPGET(data) {
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
					$("#ftime").numberbox('setValue', (parseInt(data.substring(20, 24), 16) / 10).toFixed(1));
					$("#fadvance").numberbox('setValue', (parseInt(data.substring(24, 28), 16) / 10).toFixed(1));
					$("#fini_ele").numberbox('setValue', (parseInt(data.substring(28, 32), 16) /10).toFixed(1));
					$("#fpulse_ele").numberbox('setValue', (parseInt(data.substring(32, 36), 16)/10).toFixed(1));
					$("#rise_time").numberbox('setValue', (parseInt(data.substring(36, 40), 16) / 10).toFixed(1));
					$("#fweld_ele").numberbox('setValue', (parseInt(data.substring(40, 44), 16)/10).toFixed(1));
					$("#acfreq").numberbox('setValue', (parseInt(data.substring(44, 48), 16) / 10).toFixed(1));
					$("#clear_width").numberbox('setValue', parseInt(data.substring(48, 52), 16));
					$("#farc_ele").numberbox('setValue', (parseInt(data.substring(52, 56), 16)/10).toFixed(1));
					$("#pulsefreq").numberbox('setValue', (parseInt(data.substring(56, 60), 16) / 10).toFixed(1));
					$("#decline_time").numberbox('setValue', (parseInt(data.substring(60, 64), 16) / 10).toFixed(1));
					$("#fhysteresis").numberbox('setValue', (parseInt(data.substring(64, 68), 16) / 10).toFixed(1));
					$("#ac_dcfreq").numberbox('setValue', (parseInt(data.substring(68, 72), 16) / 10).toFixed(1));
					$("#pulse_width").numberbox('setValue', parseInt(data.substring(72, 74), 16));
					$("#ac_rate").numberbox('setValue', parseInt(data.substring(74, 76), 16));
					if(data.substring(84, 86).substring(0,2).toUpperCase()=="FF"){
						$("#fweld_tuny_ele").numberbox('setValue', parseInt("FFFF"+data.substring(84, 86), 16)<<0);
					}else{
						$("#fweld_tuny_ele").numberbox('setValue', parseInt(data.substring(84, 86), 16));
					}
					if(data.substring(86, 88).substring(0,2).toUpperCase()=="FF"){
						$("#fpulse_tuny_ele").numberbox('setValue', parseInt("FFFF"+data.substring(86, 88), 16)<<0);
					}else{
						$("#fpulse_tuny_ele").numberbox('setValue', parseInt(data.substring(86, 88), 16));
					}
					if(data.substring(88, 90).substring(0,2).toUpperCase()=="FF"){
						$("#farc_tuny_ele").numberbox('setValue', parseInt("FFFF"+data.substring(88, 90), 16)<<0);
					}else{
						$("#farc_tuny_ele").numberbox('setValue', parseInt(data.substring(88, 90), 16));
					}
					$("#fsarc_init_time").numberbox('setValue', (parseInt(data.substring(92, 94), 16) / 10).toFixed(1));
					$("#fsarc_arc_time").numberbox('setValue', (parseInt(data.substring(94, 96), 16) / 10).toFixed(1));
					if(data.substring(96, 100).substring(0,2).toUpperCase()=="FF"){
						$("#click_ele").numberbox('setValue', parseInt("FFFF"+data.substring(96, 100), 16)<<0);
					}else{
						$("#click_ele").numberbox('setValue', parseInt(data.substring(96, 100), 16));
					}
					if(data.substring(100, 104).substring(0,2).toUpperCase()=="FF"){
						$("#double_click_ele").numberbox('setValue', parseInt("FFFF"+data.substring(100, 104), 16)<<0);
					}else{
						$("#double_click_ele").numberbox('setValue', parseInt(data.substring(100, 104), 16));
					}

					if (parseInt(data.substring(76, 78), 16) == "0") {
						$('#ac_form').combobox('select', "0");
					} else if (parseInt(data.substring(76, 78), 16) == "1") {
						$('#ac_form').combobox('select', "1");
					} else {
						$('#ac_form').combobox('select', "2");
					}
					if (parseInt(data.substring(78,80), 16) == 0) {
						$('#weld_method').combobox('select', "0");
					} else if (parseInt(data.substring(78,80), 16) == 1) {
						$('#weld_method').combobox('select', "1");
					} else {
						$('#weld_method').combobox('select', "3");
					}

					if (parseInt(data.substring(104, 106), 16) == 1) {
						$('#frepeat_end').combobox('select', 1);
					} else {
						$('#frepeat_end').combobox('select', 0);
					}
					if (parseInt(data.substring(90, 92), 16) == 1) {
						$('#fsarc_time').combobox('select', 1);
					} else {
						$('#fsarc_time').combobox('select', 0);
					}
					var sconx = parseInt(data.substring(80, 84), 16);
					sconx = sconx.toString(2);
					if (sconx.length < 16) {
						var length = 16 - sconx.length;
						for (var i = 0; i < length; i++) {
							sconx = "0" + sconx;
						}
					}
					if (sconx.substring(15, 16) == "1") {
						$("#finitial").prop("checked", true);
					} else {
						$("#finitial").prop("checked", false);
					}
					if (sconx.substring(14, 15) == "0") {
						$('#farc').combobox('select', 111);
					} else {
						$('#farc').combobox('select', 112);
					}
					if (sconx.substring(13, 14) == "1") {
						$('#farc').combobox('select', 113);
					}
					if (sconx.substring(12, 13) == "1") {
						$('#farc').combobox('select', 114);
					}
					if (sconx.substring(11, 12) == "1") {
						$('#set_guide').prop("checked", true);
					} else {
						$("#set_guide").prop("checked", false);
					}
					if (sconx.substring(9, 10) == "1") {
						$("#fcontroller").prop("checked", true);
					} else {
						$("#fcontroller").prop("checked", false);
					}
					if (sconx.substring(6, 7) == "1") {
						$("#fsarc").prop("checked", true);
					} else {
						$("#fsarc").prop("checked", false);
					}
					if (sconx.substring(5, 6) == "1") {
						$("#fsarc_repeat").prop("checked", true);
					} else {
						$("#fsarc_repeat").prop("checked", false);
					}
					if (sconx.substring(4, 5) == "1") {
						$("#fcondition").prop("checked", true);
					} else {
						$("#fcondition").prop("checked", false);
					}
					if (sconx.substring(2, 3) == "1") {
						$("#weld_gun").prop("checked", true);
					} else {
						$("#weld_gun").prop("checked", false);
					}
					if (sconx.substring(1, 2) == "1") {
						$("#pulse_ctrl").prop("checked", true);
					} else {
						$("#pulse_ctrl").prop("checked", false);
					}
					if (sconx.substring(0, 1) == "1") {
						$("#contact_arc").prop("checked", true);
					} else {
						$("#contact_arc").prop("checked", false);
					}
						alert("索取成功");
				}
			}
		}
}

//参数初始化
function WBAPINIT(value) {
	if(value==1){
		$('#fchanel').combobox('clear');
		var ary = new Array();
		for (var i = 1; i < 101; i++) {
			ary.push({
				"text" : "通道号"+i,
				"value" : i+""
			});
		}
		$('#fchanel').combobox('loadData', ary);//清空option选项   
		WBAPINIT(0);
		$('#fchanel').combobox('select', "1");
		return;
	}
	$('#farc').combobox('clear');
	$('#farc').combobox('loadData', [ {
		"text" : "无",
		"value" : "111"
	}, {
		"text" : "有",
		"value" : "112"
	}, {
		"text" : "收弧反复",
		"value" : "113"
	}, {
		"text" : "点焊",
		"value" : "114"
	} ]);
	$('#fsarc_time').combobox('clear');
	$('#fsarc_time').combobox('loadData', [ {
		"text" : "有效",
		"value" : "1"
	}, {
		"text" : "无效",
		"value" : "0"
	}]);


	$('#frepeat_end').combobox('clear');
	$('#frepeat_end').combobox('loadData', [ {
		"text" : "OFF",
		"value" : "0"
	}, {
		"text" : "ON",
		"value" : "1"
	}]);

	$('#ac_form').combobox('clear');
	$('#ac_form').combobox('loadData', [ {
		"text" : "标准",
		"value" : "0"
	}, {
		"text" : "软",
		"value" : "1"
	},{
		"text" : "硬性",
		"value" : "2"
	}]);

	$('#weld_method').combobox('clear');
	$('#weld_method').combobox('loadData', [ {
		"text" : "直流TIG",
		"value" : "0"
	},{
		"text" : "交流TIG",
		"value" : "1"
	},{
		"text" : "AC-DC TIG",
		"value" : "3"
	}]);
	$("#finitial").prop("checked", false);//初期条件
	$("#set_guide").prop("checked", false);//设定指南
	$("#fcontroller").prop("checked", false);//斜坡控制
	$("#fsarc").prop("checked", false);//特殊收弧时序(F45)
	$("#fsarc_repeat").prop("checked", false);//特殊收弧反复
	$("#fcondition").prop("checked", false);//通过TS变更条件
	$("#weld_gun").prop("checked", false);//水冷焊枪
	$("#pulse_ctrl").prop("checked", false);//脉冲控制
	$("#contact_arc").prop("checked", false);//接触起弧
	$("#ftime").numberbox('setValue', 3.0);//点焊时间
	$("#fadvance").numberbox('setValue', 0.3);//提前送气时间
	$("#fini_ele").numberbox('setValue', 150);//初期电流
	$("#fweld_ele").numberbox('setValue', 150);//焊接电流
	$("#farc_ele").numberbox('setValue', 150);//收弧电流
	$("#fhysteresis").numberbox('setValue', 7.0);//滞后送气
	$("#fpulse_ele").numberbox('setValue', 150);//脉冲电流
	$("#rise_time").numberbox('setValue', 1.0);//缓升时间
	$("#decline_time").numberbox('setValue', 1.0);//缓降时间
	$("#fweld_tuny_ele").numberbox('setValue', 0);//焊接电流微调
	$("#ac_rate").numberbox('setValue', 70);//ac比率
	$("#fpulse_tuny_ele").numberbox('setValue', 0);//脉冲电流微调
	$("#farc_tuny_ele").numberbox('setValue', 0);//收弧电流微调
	$("#pulse_width").numberbox('setValue', 50);//脉冲宽度
	$('#farc').combobox('select', 111);//收弧
	$('#weld_method').combobox('select', "1");//焊接方法
	$('#fsarc_time').combobox('select', 0);//特殊收弧时序
	$("#fsarc_init_time").numberbox('setValue', 0);//特殊收弧时序初期时间
	$("#fsarc_arc_time").numberbox('setValue', 0);//特殊收弧时序收弧时间
	$("#click_ele").numberbox('setValue', 0);//单击操作的电流增减量
	$("#double_click_ele").numberbox('setValue', 0);//双击操作的电流增减量
	$('#frepeat_end').combobox('select', 0);//反复时的结束方法
	$("#acfreq").numberbox('setValue', 70);//ac频率
	$("#pulsefreq").numberbox('setValue', 2);//脉冲频率
	$("#ac_dcfreq").numberbox('setValue', 1.0);//ac-dc切换频率
	$("#clear_width").numberbox('setValue', 0);//清洁宽度
	$('#ac_form').combobox('select',0);//ac波形
}

//用户输入参数检测
function WBAPCHECK() {
	if(!$('#ftime').numberbox('options').disabled){
		if ($('#ftime').numberbox('getValue') < 0 || $('#ftime').numberbox('getValue') > 10) {
			alert("点焊时间：0~10");
			return false;
		}
	}

	if(!$('#fadvance').numberbox('options').disabled){
		if ($('#fadvance').numberbox('getValue') < 0 || $('#fadvance').numberbox('getValue') > 99) {
			alert("提前送气范围：0~99");
			return false;
		}
	}


	if(!$('#fhysteresis').numberbox('options').disabled){
		if ($('#fhysteresis').numberbox('getValue') < 0 || $('#fhysteresis').numberbox('getValue') > 99) {
			alert("滞后送气范围：0~99");
			return false;
		}
	}

	if(!$('#rise_time').numberbox('options').disabled){
		if ($('#rise_time').numberbox('getValue') < 0 || $('#rise_time').numberbox('getValue') > 10) {
			alert("缓升时间范围：0~10");
			return false;
		}
	}

	if(!$('#decline_time').numberbox('options').disabled){
		if ($('#decline_time').numberbox('getValue') < 0 || $('#decline_time').numberbox('getValue') > 10) {
			alert("缓降时间范围：0~10");
			return false;
		}
	}

	if(!$('#fini_ele').numberbox('options').disabled){
		if ($('#fini_ele').numberbox('getValue') < 1 || $('#fini_ele').numberbox('getValue') > 380) {
			alert("初期电流范围：1~380");
			return false;
		}
	}

	if(!$('#fpulse_ele').numberbox('options').disabled){
		if ($('#fpulse_ele').numberbox('getValue') < 1 || $('#fpulse_ele').numberbox('getValue') > 380) {
			alert("脉冲电流范围：1~380");
			return false;
		}	
	}

	if(!$('#farc_ele').numberbox('options').disabled){
		if ($('#farc_ele').numberbox('getValue') < 1 || $('#farc_ele').numberbox('getValue') > 380) {
			alert("收弧电流范围：1~380");
			return false;
		}
	}

	if(!$('#fweld_ele').numberbox('options').disabled){
		if ($('#fweld_ele').numberbox('getValue') < 1 || $('#fweld_ele').numberbox('getValue') > 380) {
			alert("焊接电流范围：1~380");
			return false;
		}
	}

	if(!$('#clear_width').numberbox('options').disabled){
		if ($('#clear_width').numberbox('getValue') < (-20) || $('#clear_width').numberbox('getValue') > (20)) {
			alert("清洁宽度范围：-20~20");
			return false;
		}
	}

	if(!$('#acfreq').numberbox('options').disabled){
		if ($('#acfreq').numberbox('getValue') < 30 || $('#acfreq').numberbox('getValue') > 500) {
			alert("AC频率范围：30~500");
			return false;
		}
	}

	if(!$('#pulsefreq').numberbox('options').disabled){
		if ($('#pulsefreq').numberbox('getValue') < 0.1 || $('#pulsefreq').numberbox('getValue') > 999) {
			alert("脉冲频率范围：0.1~999");
			return false;
		}
	}

	if(!$('#ac_dcfreq').numberbox('options').disabled){
		if ($('#ac_dcfreq').numberbox('getValue') < 0.1 || $('#ac_dcfreq').numberbox('getValue') > 50) {
			alert("AC-DC切换频率范围：0.1~50");
			return false;
		}
	}

	if(!$('#fweld_tuny_ele').numberbox('options').disabled){
		if ($('#fweld_tuny_ele').numberbox('getValue') < (0) || $('#fweld_tuny_ele').numberbox('getValue') > (50)) {
			alert("焊接电流微调范围：0~50");
			return false;
		}
	}

	if(!$('#farc_tuny_ele').numberbox('options').disabled){
		if ($('#farc_tuny_ele').numberbox('getValue') < (0) || $('#farc_tuny_ele').numberbox('getValue') > (50)) {
			alert("收弧电流微调范围：0~50");
			return false;
		}
	}

	if(!$('#fpulse_tuny_ele').numberbox('options').disabled){
		if ($('#fpulse_tuny_ele').numberbox('getValue') < (0) || $('#fpulse_tuny_ele').numberbox('getValue') > (50)) {
			alert("脉冲电流微调范围：0~50");
			return false;
		}
	}

	if(!$('#pulse_width').numberbox('options').disabled){
		if ($('#pulse_width').numberbox('getValue') < (5) || $('#pulse_width').numberbox('getValue') > (95)) {
			alert("脉冲宽度范围：5~95");
			return false;
		}
	}

	if(!$('#ac_rate').numberbox('options').disabled){
		if ($('#ac_rate').numberbox('getValue') < (10) || $('#ac_rate').numberbox('getValue') > (90)) {
			alert("AC比率范围：10~90");
			return false;
		}
	}

	if(!$('#fsarc_init_time').numberbox('options').disabled){
		if ($('#fsarc_init_time').numberbox('getValue') < (0) || $('#fsarc_init_time').numberbox('getValue') > (10)) {
			alert("特殊收弧时序初期时间范围：0~10");
			return false;
		}
	}

	if(!$('#fsarc_arc_time').numberbox('options').disabled){
		if ($('#fsarc_arc_time').numberbox('getValue') < (0) || $('#fsarc_arc_time').numberbox('getValue') > (10)) {
			alert("特殊收弧时序收弧时间范围：0~10");
			return false;
		}
	}

	if(!$('#click_ele').numberbox('options').disabled){
		if ($('#click_ele').numberbox('getValue') < (-100) || $('#click_ele').numberbox('getValue') > (100)) {
			alert("单击操作的电流增减量范围：-100~100");
			return false;
		}
	}

	if(!$('#double_click_ele').numberbox('options').disabled){
		if ($('#double_click_ele').numberbox('getValue') < (-100) || $('#double_click_ele').numberbox('getValue') > (100)) {
			alert("双击操作的电流增减量范围：-100~100");
			return false;
		}
	}
}

//下发参数时对页面已写好的参数进行检测
function wbapValidationFrom(){
	return $("#fm").form('enableValidation').form('validate');
}
function wbapSendCheck() {
	if (!wbapValidationFrom()) {
		return;
	}
	if (WBAPCHECK() == false) {
		return;
	} else {
		WBAP(null, null);
	}
}

//参数规则
function WBAPRULE() {
	$("#fsarc_time").combobox({
		onSelect : function(record) {
			if (record.value == 1) {
				$("#fsarc_init_time").numberbox({disabled: false}); 
				$("#fsarc_arc_time").numberbox({disabled: false});
			} else {
				$("#fsarc_init_time").numberbox({disabled: true}); 
				$("#fsarc_arc_time").numberbox({disabled: true}); 
			}
		}
	});

	//选择收弧
	$("#farc").combobox({
		onSelect : function(record) {
			if (record.value != 114) {
				$("#ftime").numberbox({disabled: true}); 
			} else {
				$("#ftime").numberbox({disabled: false}); 
			}
			
			if (record.value == 112 || record.value == 113 || record.value == 114) {
				document.getElementById("fcontroller").disabled = false;
			} else { 
				$("#fcontroller").prop("checked", false);
				document.getElementById("fcontroller").disabled = true;
			}

			if (record.value == 113 && $('#fcontroller').is(':checked')) {
				$("#rise_time").numberbox({disabled: false}); 
				$("#decline_time").numberbox({disabled: false});
			} else if(record.value == 114 && $('#fcontroller').is(':checked')){
				$("#decline_time").numberbox({disabled: false});
			}else if(record.value == 112 && $('#fcontroller').is(':checked')){
				$("#decline_time").numberbox({disabled: false});
			}
			else { 
				$("#rise_time").numberbox({disabled: true}); 
				$("#decline_time").numberbox({disabled: true}); 
			}

			if((record.value == 112 || record.value == 113) && $('#finitial').is(':checked')){
				$("#fini_ele").numberbox({disabled: false});
			}else{
				$("#fini_ele").numberbox({disabled: true});
				$("#finitial").prop("checked", false);
			}

			if ((record.value != 111 && record.value != 114) ) {
				$("#farc_ele").numberbox({disabled: false}); 
				document.getElementById("finitial").disabled = false;
			} else {
				$("#farc_ele").numberbox({disabled: true}); 
				document.getElementById("finitial").disabled = true;
				$("#finitial").prop("checked", false);
			}

			if(record.value != 111){
				if($('#fsarc').is(':checked')){
					$("#fsarc").prop("checked", false);//初期条件
				}
			}

			if(record.value != 112){
				if($('#fcondition').is(':checked')){
					$("#fcondition").prop("checked", false);//初期条件
				}
			}
			
			if(record.value == 111){
				if($('#fsarc').is(':checked')){
					document.getElementById("finitial").disabled = false;
				}else{
					document.getElementById("finitial").disabled = true;
				}
			}
		}
	});

	//选择焊接方法
	$("#weld_method").combobox({
		onSelect : function(record) {
			if (record.value == "3") {
				$("#ac_rate").numberbox({disabled: false}); 
				$("#ac_dcfreq").numberbox({disabled: false});
				document.getElementById("pulse_ctrl").disabled = true;
			} else {
				$("#ac_rate").numberbox({disabled: true}); 
				$("#ac_dcfreq").numberbox({disabled: true});
				document.getElementById("pulse_ctrl").disabled = false;
			}

			if(record.value != "3" && $('#pulse_ctrl').is(':checked')) {
				$("#pulse_width").numberbox({disabled: false});
				$("#pulsefreq").numberbox({disabled: false});
				$("#fpulse_ele").numberbox({disabled: false});
				$("#fpulse_tuny_ele").numberbox({disabled: false});
			}else{
				$("#pulse_width").numberbox({disabled: true});
				$("#pulsefreq").numberbox({disabled: true});
				$("#fpulse_ele").numberbox({disabled: true});
				$("#fpulse_tuny_ele").numberbox({disabled: true});
				$("#pulse_ctrl").prop("checked", false);
			}

			if (record.value == "1" || record.value == "3") {
				$("#acfreq").numberbox({disabled: false});
				$("#ac_form").combobox({disabled: false});
				$("#clear_width").numberbox({disabled: false});
			} else {
				$("#acfreq").numberbox({disabled: true}); 
				$("#ac_form").combobox({disabled: true});
				$("#clear_width").numberbox({disabled: true});
			}

		}
	});

	//选择反复时的结束方法
	$("#frepeat_end").combobox({
		onSelect : function(record) {
			if (record.value == "1" || $('#fsarc').is(':checked')) {
				document.getElementById("fcondition").disabled = true;
				$("#click_ele").numberbox({disabled: true});  
				$("#double_click_ele").numberbox({disabled: true});
				$("#farc").combobox({disabled: true});
			} else {
				document.getElementById("fcondition").disabled = false;
				$("#farc").combobox({disabled:false});
			}
			if(record.value == "1"){
				$('#farc').combobox('select', "113");
				document.getElementById("fsarc").disabled = true;
			}
			if(record.value == "0"){
				document.getElementById("fsarc").disabled = false;
				document.getElementById("farc").disabled = false;
			}
			if (record.value == "1") {
		        $("#fsarc_repeat").prop("checked", true);
		      }else {
		        $("#fsarc_repeat").prop("checked", false);
		      }
		}
	});

	//勾选缓升缓降
	document.getElementById("fcontroller").onchange = function(){
		if ($('#fcontroller').is(':checked') && "113" == parseInt($('#farc').combobox('getValue'))) {
			$("#rise_time").numberbox({disabled: false}); 
			$("#decline_time").numberbox({disabled: false}); 
		}else{
			$("#rise_time").numberbox({disabled: true}); 
			$("#decline_time").numberbox({disabled: true}); 
		}
		if ($('#fcontroller').is(':checked') && "111" != parseInt($('#farc').combobox('getValue'))) { 
			   $("#decline_time").numberbox({disabled: false}); 
			  }
		else{
			   $("#decline_time").numberbox({disabled: true}); 
			  }
		if("111" == parseInt($('#farc').combobox('getValue'))){
			$("#fcontroller").prop("checked", false);
		}
	}

	//勾选初期条件
	document.getElementById("finitial").onchange = function(){
		if ($('#finitial').is(':checked')) {
			if("111" == parseInt($('#farc').combobox('getValue')) ||"112" == parseInt($('#farc').combobox('getValue')) || "113" == parseInt($('#farc').combobox('getValue'))){
				$("#fini_ele").numberbox({disabled: false});
			}else{
				$("#fini_ele").numberbox({disabled: true});
			}
		}else{
			$("#fini_ele").numberbox({disabled: true});
		}
	}

	//勾选特殊收弧F45
	document.getElementById("fsarc").onchange = function(){
		if ($('#fsarc').is(':checked')) {
			$('#farc').combobox('select', "111");
			$("#farc").combobox({disabled: true});
			document.getElementById("finitial").disabled = false;
		}else{
			$("#farc").combobox({disabled: false});
		}

		if($('#fsarc').is(':checked') || "0" == parseInt($('#frepeat_end').combobox('getValue'))){
			document.getElementById("fcondition").disabled = true;
			$("#click_ele").numberbox({disabled: true});
			$("#double_click_ele").numberbox({disabled: true});
		}else{
			document.getElementById("fcondition").disabled = false;
			
		}

		if ($('#fsarc').is(':checked')) {
			$('#fsarc_time').combobox('select', "1");
			$("#frepeat_end").combobox({disabled: true});
			//$('#frepeat_end').combobox('select', "1");
		}else{
			$('#fsarc_time').combobox('select', "0");
			$("#frepeat_end").combobox({disabled: false});
		}
		
		if ($('#fsarc').is(':checked')) {
			if($('#farc').combobox('getValue')==111){
				document.getElementById("finitial").disabled = false;
			}else{
				document.getElementById("finitial").disabled = true;
			}
		}else{
			document.getElementById("finitial").disabled = true;
		}
	}

	//勾选调整电流
	document.getElementById("fcondition").onchange = function(){
		if ($('#fcondition').is(':checked')) {
			$('#farc').combobox('select', "112");
		}

		if ($('#fcondition').is(':checked')) {
			$("#click_ele").numberbox({disabled: false});
			$("#double_click_ele").numberbox({disabled: false});
		}else{
			$("#click_ele").numberbox({disabled: true});
			$("#double_click_ele").numberbox({disabled: true});
		}
	}

	//勾选脉冲控制
	document.getElementById("pulse_ctrl").onchange = function(){
		if ($('#pulse_ctrl').is(':checked')) {
			$("#pulse_width").numberbox({disabled: false});
			$("#pulsefreq").numberbox({disabled: false});
			$("#fpulse_ele").numberbox({disabled: false});
			$("#fpulse_tuny_ele").numberbox({disabled: false});
		}else{
			$("#pulse_width").numberbox({disabled: true});
			$("#pulsefreq").numberbox({disabled: true});
			$("#fpulse_ele").numberbox({disabled: true});
			$("#fpulse_tuny_ele").numberbox({disabled: true});
		}
	}

	$("#fchanel").combobox({
		onSelect : function(record) {
			WBAPINIT(0);
			$.ajax({
				type : "post",
				async : false,
				url : "wps/getAllOtcspc?machine=" + node11.id + "&chanel=" + record.value,
				data : {},
				dataType : "json", //返回数据形式为json  
				success : function(result) {
					if (result) {
						yshu = eval(result.rows);
						if (yshu.length != 0) {
							$('#fchanel').combobox('select', yshu[0].FWPSNum);
							if(yshu[0].fprocessid == 1){
								$('#weld_method').combobox('select',"1");
							}else if(yshu[0].fprocessid == 2){
								$('#weld_method').combobox('select',"2");
							}else if(yshu[0].fprocessid == 3){
								$('#weld_method').combobox('select',"3");
							}else if(yshu[0].fprocessid == 4){
								$('#weld_method').combobox('select',"4");
							}else{
								$('#weld_method').combobox('select',"5");
							}
							$('#farc').combobox('select', yshu[0].farc);
							
							if (yshu[0].slope == "1") {
								$("#fcontroller").prop("checked", true);
								if ($('#fcontroller').is(':checked') && "113" == parseInt($('#farc').combobox('getValue'))) {
									$("#rise_time").numberbox({disabled: false}); 
									$("#decline_time").numberbox({disabled: false}); 
								}else{
									$("#rise_time").numberbox({disabled: true}); 
									$("#decline_time").numberbox({disabled: true}); 
								}
							}
							if (yshu[0].pulse == "1") {
								$("#pulse_ctrl").prop("checked", true);
								if ($('#pulse_ctrl').is(':checked')) {
									$("#pulse_width").numberbox({disabled: false});
									$("#pulsefreq").numberbox({disabled: false});
									$("#fpulse_ele").numberbox({disabled: false});
									$("#fpulse_tuny_ele").numberbox({disabled: false});
								}else{
									$("#pulse_width").numberbox({disabled: true});
									$("#pulsefreq").numberbox({disabled: true});
									$("#fpulse_ele").numberbox({disabled: true});
									$("#fpulse_tuny_ele").numberbox({disabled: true});
								}
							}
							$("#frepeat_end").combobox('select', yshu[0].repeat_end);
							if (yshu[0].specialarc == "1") {
								$("#fsarc").prop("checked", true);
								if($('#fsarc').is(':checked') || "0" == parseInt($('#frepeat_end').combobox('getValue'))){
									document.getElementById("fcondition").disabled = true;  
									$("#click_ele").numberbox({disabled: true});
									$("#double_click_ele").numberbox({disabled: true});
								}else{
									document.getElementById("fcondition").disabled = false;  
								}
							}
							$("#ftime").numberbox('setValue', yshu[0].ftime);
							$("#fadvance").numberbox('setValue', yshu[0].fadvance);
							$("#fini_ele").numberbox('setValue', yshu[0].fini_ele);
							$("#farc_ele").numberbox('setValue', yshu[0].farc_ele);
							$("#fhysteresis").numberbox('setValue', yshu[0].fhysteresis);
							$("#fpulse_ele").numberbox('setValue', yshu[0].pulse_ele);
							$("#ac_rate").numberbox('setValue', yshu[0].ac_ratio);
							$("#fpulse_tuny_ele").numberbox('setValue', yshu[0].pulse_tuny_ele);
							$("#fweld_ele").numberbox('setValue', yshu[0].fweld_ele);
							$("#pulsefreq").numberbox('setValue', yshu[0].frequency);
							$('#pulse_width').numberbox('setValue', yshu[0].pulse_width);
							$('#fsarc_time').combobox('select', yshu[0].special_arcorder);
							$("#fweld_tuny_ele").numberbox('setValue', yshu[0].fweld_tuny_ele);
							$("#fsarc_init_time").numberbox('setValue', yshu[0].special_arc_initial);
							$("#farc_tuny_ele").numberbox('setValue', yshu[0].farc_tuny_ele);
							$("#fsarc_arc_time").numberbox('setValue', yshu[0].special_arctime);
							$("#click_ele").numberbox('setValue', yshu[0].click_ele);
							$("#double_click_ele").numberbox('setValue', yshu[0].two_click_ele);
							$("#acfreq").numberbox('setValue', yshu[0].ac_frequency);
							$("#ac_dcfreq").numberbox('setValue', yshu[0].ac_dc);
							$("#clear_width").numberbox('setValue', yshu[0].clean_width);
							$("#ac_form").combobox('select', yshu[0].ac_wave);
							$("#decline_time").numberbox('setValue', yshu[0].decline_time);//缓降时间
							if (yshu[0].ts_condition == "1") {
								$("#fcondition").prop("checked", true);
								if ($('#fcondition').is(':checked')) {
									$("#click_ele").numberbox({disabled: false});
									$("#double_click_ele").numberbox({disabled: false});
								}else{
									$("#click_ele").numberbox({disabled: true});
									$("#double_click_ele").numberbox({disabled: true});
								}
							}
							if (yshu[0].finitial == "1") {
								$("#finitial").prop("checked", true);
								if ($('#finitial').is(':checked')) {
									if("112" == parseInt($('#farc').combobox('getValue')) || "113" == parseInt($('#farc').combobox('getValue'))){
										$("#fini_ele").numberbox({disabled: false});
									}else{
										$("#fini_ele").numberbox({disabled: true});
									}
								}else{
									$("#fini_ele").numberbox({disabled: true});
								}
							}
							if (yshu[0].guide == "1") {
								$("#set_guide").prop("checked", true);
							}
							if (yshu[0].specialarc_rep == "1") {
								$("#fsarc_repeat").prop("checked", true);
							}
							if (yshu[0].ftorch == "1") {
								$("#weld_gun").prop("checked", true);
							}
							if (yshu[0].fcharacter == "1") {
								$("#contact_arc").prop("checked", true);
							}
							$("#rise_time").numberbox('setValue', yshu[0].rise_time);//缓升时间
							
							if ($('#farc').combobox('getValue') != 114) {
								$("#ftime").numberbox({disabled: true}); 
							} else {
								$("#ftime").numberbox({disabled: false}); 
							}

							if ($('#farc').combobox('getValue') == 112 || $('#farc').combobox('getValue') == 113 || $('#farc').combobox('getValue') == 114) {
								document.getElementById("fcontroller").disabled = false;
							} else { 
								$("#fcontroller").prop("checked", false);
								document.getElementById("fcontroller").disabled = true;
							}

							if ($('#farc').combobox('getValue') == 113 && $('#fcontroller').is(':checked')) {
								$("#rise_time").numberbox({disabled: false}); 
								$("#decline_time").numberbox({disabled: false});
							} else { 
								$("#rise_time").numberbox({disabled: true}); 
								$("#decline_time").numberbox({disabled: true}); 
							}

							if(($('#farc').combobox('getValue') == 112 || $('#farc').combobox('getValue') == 113) && $('#finitial').is(':checked')){
								$("#fini_ele").numberbox({disabled: false});
							}else{
								$("#fini_ele").numberbox({disabled: true});
							}
							
							if ($('#farc').combobox('getValue') != 111 && $('#farc').combobox('getValue') != 114) {
								$("#farc_ele").numberbox({disabled: false}); 
								document.getElementById("finitial").disabled = false;
							} else {
								$("#farc_ele").numberbox({disabled: true}); 
								document.getElementById("finitial").disabled = true;
							}
							
							if($('#farc').combobox('getValue') == 111){
								if($('#fsarc').is(':checked')){
									document.getElementById("finitial").disabled = false;
								}else{
									document.getElementById("finitial").disabled = true;
								}
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

function WBAPSAVE(value) {
	if (WBAPCHECK() == false) {
		return;
	}
	var url2 = "";
	var finitial;//初期
	var fcontroller;//斜坡
	var set_guide;
	var fsarc;
	var fsarc_repeat;
	var fcondition;
	var weld_gun;
	var pulse_ctrl;
	var contact_arc;
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
	if ($("#set_guide").is(":checked") == true) {
		set_guide = 1;
	} else {
		set_guide = 0;
	}
	if ($("#fsarc").is(":checked") == true) {
		fsarc = 1;
	} else {
		fsarc = 0;
	}
	if ($("#fsarc_repeat").is(":checked") == true) {
		fsarc_repeat = 1;
	} else {
		fsarc_repeat = 0;
	}
	if ($("#fcondition").is(":checked") == true) {
		fcondition = 1;
	} else {
		fcondition = 0;
	}
	if ($("#weld_gun").is(":checked") == true) {
		weld_gun = 1;
	} else {
		weld_gun = 0;
	}
	if ($("#pulse_ctrl").is(":checked") == true) {
		pulse_ctrl = 1;
	} else {
		pulse_ctrl = 0;
	}
	if ($("#contact_arc").is(":checked") == true) {
		contact_arc = 1;
	} else {
		contact_arc = 0;
	}
	var chanel = $('#fchanel').combobox('getValue');//通道号 
	var ftime = $('#ftime').numberbox('getValue');//点焊时间
	var fadvance = $('#fadvance').numberbox('getValue');//提前送气
	var fini_ele = $('#fini_ele').numberbox('getValue');//初期电流
	var fweld_ele = $('#fweld_ele').numberbox('getValue');//焊接电流
	var farc_ele = $('#farc_ele').numberbox('getValue');//收弧电流
	var fhysteresis = $('#fhysteresis').numberbox('getValue');//滞后送气
	var pulse_ele = $('#fpulse_ele').numberbox('getValue');//脉冲电流
	var rise_time = $('#rise_time').numberbox('getValue');//缓升时间
	var decline_time = $('#decline_time').numberbox('getValue');//缓降时间
	var fweld_tuny_ele = $('#fweld_tuny_ele').numberbox('getValue');
	var ac_rate = $("#ac_rate").numberbox('getValue');//ac比率
	var fpulse_tuny_ele= $("#fpulse_tuny_ele").numberbox('getValue');//脉冲电流微调
	var farc_tuny_ele= $("#farc_tuny_ele").numberbox('getValue');//收弧电流微调
	var fpulse_tuny_ele=$("#fpulse_tuny_ele").numberbox('getValue');//脉冲电流微调
	var pulse_width=$("#pulse_width").numberbox('getValue');//脉冲宽度
	var farc=$('#farc').combobox('getValue');//收弧
	var weld_method = $('#weld_method').combobox('getValue');//焊接方法
	var fsarc_time = $('#fsarc_time').combobox('getValue');//特殊收弧时序
	var fsarc_init_time = $("#fsarc_init_time").numberbox('getValue');//特殊收弧时序初期时间
	var fsarc_arc_time = $("#fsarc_arc_time").numberbox('getValue');//特殊收弧时序收弧时间
	var click_ele = $("#click_ele").numberbox('getValue');//单击操作的电流增减量
	var double_click_ele = $("#double_click_ele").numberbox('getValue');//双击操作的电流增减量
	var frepeat_end = $('#frepeat_end').combobox('getValue');//反复时的结束方法
	var acfreq = $("#acfreq").numberbox('getValue');//ac频率
	var pulsefreq = $("#pulsefreq").numberbox('getValue');//脉冲频率
	var ac_dcfreq = $("#ac_dcfreq").numberbox('getValue');//ac-dc切换频率
	var clear_width = $("#clear_width").numberbox('getValue');//清洁宽度
	var ac_form = $('#ac_form').combobox('getValue');//ac波形
	var machine = node11.id;
	messager = "保存成功！";
	url2 = "wps/otcspc" + "?finitial=" + finitial + "&fcontroller=" + fcontroller + "&set_guide=" + set_guide + "&fsarc=" + fsarc + "&fsarc_repeat=" + fsarc_repeat + "&fcondition=" + fcondition + "&weld_gun=" + weld_gun + "&pulse_ctrl=" + pulse_ctrl +"&contact_arc=" + contact_arc + "&chanel=" + chanel + "&ftime=" + ftime + "&fadvance=" + fadvance + "&fini_ele=" + fini_ele + "&fweld_ele=" + fweld_ele + "&farc_ele=" + farc_ele + "&fhysteresis=" + fhysteresis + "&pulse_ele=" + pulse_ele + "&rise_time="+rise_time +"&decline_time="+decline_time+
	"&fweld_tuny_ele=" + fweld_tuny_ele + "&ac_rate=" + ac_rate + "&fpulse_tuny_ele=" + fpulse_tuny_ele +"&farc_tuny_ele=" + farc_tuny_ele + "&pulse_width=" + pulse_width + "&farc=" + farc +
	"&weld_method=" + weld_method + "&fsarc_time=" + fsarc_time + "&fsarc_init_time=" + fsarc_init_time + "&fsarc_arc_time=" + fsarc_arc_time +  "&click_ele=" + click_ele + "&double_click_ele=" + double_click_ele + "&frepeat_end=" + frepeat_end + "&acfreq=" + acfreq+ "&machine=" + machine+"&pulsefreq="+pulsefreq+ "&ac_dcfreq="+ac_dcfreq+ "&clear_width="+clear_width+ 
	"&ac_form="+ac_form;
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
function openWbapCopyDialog(value){
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
function wbapDialogData(){
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
function wbacontrol(){
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

function saveWbapCopy(){
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
							yshuary.push(WBAP(yshu1[n], rows[q].gatherId));
							allIssueRows.push(WBAP(yshu1[n], rows[q].gatherId));
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
					waitWbap();
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
										waitWbap();
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
									waitWbap();
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
									waitWbap();
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
								waitWbap();
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
	} else{
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
							break;
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

function waitWbap() {
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