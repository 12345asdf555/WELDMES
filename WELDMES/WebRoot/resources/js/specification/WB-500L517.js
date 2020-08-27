var flag;
var reIssue = new Array(),allIssueRows = new Array(),failRows = new Array();
var issueFlag = 0;
var finishdata = new Array();
var nomachine = new Array();
var allmachine = new Array();
$(function() {
//	SPCINIT(1);
	WBLRULE();
	wblDialogData();
	WeldInsframework();
	wb5control();
})

//下发规范或者返回拼接好的要下发的字符串
function WBL(yshu,gather){
	if(yshu==null){
		var chanel = parseInt($('#fchanel').combobox('getValue')).toString(16);
		var fweldprocess = parseInt($('#fweldprocess').combobox('getValue')).toString(16);
		var ftime = (parseFloat($('#ftime').numberbox('getValue')) * 10).toString(16);
		var fadvance = (parseFloat($('#fadvance').numberbox('getValue')) * 10).toString(16);
		var fini_ele = parseInt($('#fini_ele').numberbox('getValue')).toString(16);
		var fini_vol = (parseFloat($('#fini_vol').numberbox('getValue')) * 10).toString(16);
		var fini_vol1 = parseInt($('#fini_vol1').numberbox('getValue')).toString(16);
		if(fini_vol1<0){
			fini_vol1 = (fini_vol1>>>0).toString(16).toLocaleUpperCase().substring(4);
		}else{
			fini_vol1 = fini_vol1.toString(16);
		}
		var fweld_ele = parseInt($('#fweld_ele').numberbox('getValue')).toString(16);
		var fweld_vol = (parseFloat($('#fweld_vol').numberbox('getValue')) * 10).toString(16);
		var fweld_vol1 = parseInt($('#fweld_vol1').numberbox('getValue'),10);
		if(fweld_vol1<0){
			fweld_vol1 = (fweld_vol1>>>0).toString(16).toLocaleUpperCase().substring(4);
		}else{
			fweld_vol1 = fweld_vol1.toString(16);
		}
		var farc_ele = parseInt($('#farc_ele').numberbox('getValue')).toString(16);
		var farc_vol = (parseFloat($('#farc_vol').numberbox('getValue')) * 10).toString(16);
		var farc_vol1 = parseInt($('#farc_vol1').numberbox('getValue'),10);
		if(farc_vol1<0){
			farc_vol1 = (farc_vol1>>>0).toString(16).toLocaleUpperCase().substring(4);
		}else{
			farc_vol1 = farc_vol1.toString(16);
		}
		var fhysteresis = (parseFloat($('#fhysteresis').numberbox('getValue')) * 10).toString(16);
		var fcharacter = parseInt($('#fcharacter').numberbox('getValue'),10);
		if(fcharacter<0){
			fcharacter = (fcharacter>>>0).toString(16).toLocaleUpperCase().substring(4);
		}else{
			fcharacter = fcharacter.toString(16);
		}
		var fgas = parseInt($('#fgas').combobox('getValue')).toString(16);
		var fdiameter = parseInt($('#fdiameter').combobox('getValue')).toString(16);
		var fmaterial = parseInt($('#fmaterial').combobox('getValue')).toString(16);
		var fweld_tuny_ele = parseInt($('#fweld_tuny_ele').numberbox('getValue')).toString(16);
		if (parseInt($('#fselect').combobox('getValue')) == 102) {
			var fweld_tuny_vol = (parseFloat($('#fweld_tuny_vol').numberbox('getValue')) * 10).toString(16);
			var farc_tuny_vol = (parseFloat($('#farc_tuny_vol').numberbox('getValue')) * 10).toString(16);
		} else {
			var fweld_tuny_vol = parseInt($('#fweld_tuny_vol1').numberbox('getValue')).toString(16);
			var farc_tuny_vol = parseInt($('#farc_tuny_vol1').numberbox('getValue')).toString(16);
		}
		var farc_tuny_ele = parseInt($('#farc_tuny_ele').numberbox('getValue')).toString(16);
		//con需要修改
		var con = "";
		if ($('#finitial').is(':checked')) {
			con = "1";
		} else {
			con = "0";
		}
		var arcrepet = 0;
		if ($('#farc').combobox('getValue') == 111) {
			con = "0000" + con;
			arcrepet = 0;
		} else if ($('#farc').combobox('getValue') == 112) {
			con = "0001" + con;
			arcrepet = 0;
		} else if ($('#farc').combobox('getValue') == 113) {
			con = "0011" + con;
			arcrepet = 0;
		} else if ($('#farc').combobox('getValue') == 114) {
			con = "0100" + con;
			arcrepet = 0;
		} 
		if ($('#fselect').combobox('getValue') == 101) {
			con = "1" + con;
		} else {
			con = "0" + con;
		}
		if ($('#fcontroller').is(':checked')) {
			con = "0000111" + con;
		} else {
			con = "0000110" + con;
		}
		if ($('#ftorch').is(':checked')) {
			con = "0" + arcrepet + "1" + con;
		} else {
			con = "0" + arcrepet + "0" + con;
		}
		con = parseInt(con, 2);
		con = parseInt(con).toString(16);
		if (con.length < 4) {
			var length = 4 - con.length;
			for (var i = 0; i < length; i++) {
				con = "0" + con;
			}
		}
		var gasflow = "0";
		var frequency = parseFloat($('#frequency').numberbox('getValue') * 10).toString(16);
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
	}else{
		var chanel = (yshu.FWPSNum).toString(16);
  		var ftime=(yshu.ftime*10).toString(16);
		var fadvance=(yshu.fadvance*10).toString(16);
		var fini_ele=(yshu.fini_ele).toString(16);
		var fini_vol=(yshu.fini_vol*10).toString(16);
		var fini_vol1=parseInt(yshu.fini_vol1,10);
		if(fini_vol1<0){
			fini_vol1 = (fini_vol1>>>0).toString(16).toLocaleUpperCase().substring(4);
		}else{
			fini_vol1 = fini_vol1.toString(16);
		}
		var fweld_vol=(yshu.fweld_vol*10).toString(16);
		var fweld_vol1=parseInt(yshu.fweld_vol1,10);
		if(fweld_vol1<0){
			fweld_vol1 = (fweld_vol1>>>0).toString(16).toLocaleUpperCase().substring(4);
		}else{
			fweld_vol1 = fweld_vol1.toString(16);
		}
		var farc_vol=(yshu.farc_vol*10).toString(16);
		var farc_vol1=parseInt(yshu.farc_vol1,10);
		if(farc_vol1<0){
			farc_vol1 = (farc_vol1>>>0).toString(16).toLocaleUpperCase().substring(4);
		}else{
			farc_vol1 = farc_vol1.toString(16);
		}
		var fweld_ele=(yshu.fweld_ele).toString(16);
		var farc_ele=(yshu.farc_ele).toString(16);
		var fhysteresis=(yshu.fhysteresis*10).toString(16);
		var fcharacter=parseInt(yshu.fcharacter,10);
		if(fcharacter<0){
			fcharacter = (fcharacter>>>0).toString(16).toLocaleUpperCase().substring(4);
		}else{
			fcharacter = fcharacter.toString(16);
		}
		var fgas=parseInt(yshu.fgas).toString(16);
		var fdiameter=parseInt(yshu.fdiameter).toString(16);
		var fmaterial=parseInt(yshu.fmaterial).toString(16);
		var fweld_tuny_ele =(yshu.fweld_tuny_ele).toString(16);
		var farc_tuny_ele =(yshu.farc_tuny_ele).toString(16);
		if(yshu.fselect == 101){
			var fweld_tuny_vol =(yshu.fweld_tuny_vol).toString(16);
			var farc_tuny_vol =(yshu.Fdiameter).toString(16);
		}else{
			var fweld_tuny_vol =(yshu.fweld_tuny_vol*10).toString(16);
			var farc_tuny_vol =(yshu.Fdiameter*10).toString(16);
		}
		var frequency = (yshu.frequency*10).toString(16);
		var gasflow = (yshu.gasflow*10).toString(16);
		var fweldprocess = (yshu.fprocessid).toString(16);
		//con需要修改
		var con = "";
		con = yshu.finitial;
		var arcrepet = 0;
		if (yshu.farc == 111) {
			con = "0000" + con;
			arcrepet = 0;
		} else if (yshu.farc == 112) {
			con = "0001" + con;
			arcrepet = 0;
		} else if (yshu.farc == 113) {
			con = "0011" + con;
			arcrepet = 0;
		} else if (yshu.farc == 114) {
			con = "0100" + con;
			arcrepet = 0;
		} 
		if (yshu.fselect == 101) {
			con = "1" + con;
		} else {
			con = "0" + con;
		}
		if (yshu.fcontroller==1) {
			con = "0000111" + con;
		} else {
			con = "0000110" + con;
		}
		if (yshu.ftorch=="1") {
			con = "0" + arcrepet + "1" + con;
		} else {
			con = "0" + arcrepet + "0" + con;
		}
		con = parseInt(con, 2);
		con = parseInt(con).toString(16);
		if (con.length < 4) {
			var length = 4 - con.length;
			for (var i = 0; i < length; i++) {
				con = "0" + con;
			}
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
	if (ftime.length < 4) {
		var length = 4 - ftime.length;
		for (var i = 0; i < length; i++) {
			ftime = "0" + ftime;
		}
	}
	if (fadvance.length < 4) {
		var length = 4 - fadvance.length;
		for (var i = 0; i < length; i++) {
			fadvance = "0" + fadvance;
		}
	}
	if (fini_ele.length < 4) {
		var length = 4 - fini_ele.length;
		for (var i = 0; i < length; i++) {
			fini_ele = "0" + fini_ele;
		}
	}
	if (fini_vol.length < 4) {
		var length = 4 - fini_vol.length;
		for (var i = 0; i < length; i++) {
			fini_vol = "0" + fini_vol;
		}
	}
	if (fini_vol1.length < 4) {
		var length = 4 - fini_vol1.length;
		for (var i = 0; i < length; i++) {
			fini_vol1 = "0" + fini_vol1;
		}
	}
	if (fweld_ele.length < 4) {
		var length = 4 - fweld_ele.length;
		for (var i = 0; i < length; i++) {
			fweld_ele = "0" + fweld_ele;
		}
	}
	if (fweld_vol.length < 4) {
		var length = 4 - fweld_vol.length;
		for (var i = 0; i < length; i++) {
			fweld_vol = "0" + fweld_vol;
		}
	}
	if (fweld_vol1.length < 4) {
		var length = 4 - fweld_vol1.length;
		for (var i = 0; i < length; i++) {
			fweld_vol1 = "0" + fweld_vol1;
		}
	}
	if (farc_ele.length < 4) {
		var length = 4 - farc_ele.length;
		for (var i = 0; i < length; i++) {
			farc_ele = "0" + farc_ele;
		}
	}
	if (farc_vol.length < 4) {
		var length = 4 - farc_vol.length;
		for (var i = 0; i < length; i++) {
			farc_vol = "0" + farc_vol;
		}
	}
	if (farc_vol1.length < 4) {
		var length = 4 - farc_vol1.length;
		for (var i = 0; i < length; i++) {
			farc_vol1 = "0" + farc_vol1;
		}
	}
	if (fhysteresis.length < 4) {
		var length = 4 - fhysteresis.length;
		for (var i = 0; i < length; i++) {
			fhysteresis = "0" + fhysteresis;
		}
	}
	if (fcharacter.length < 4) {
		var length = 4 - fcharacter.length;
		for (var i = 0; i < length; i++) {
			fcharacter = "0" + fcharacter;
		}
	}
	//			alert($('#fgas').combobox('getValue'));
	if (fgas == parseInt(121).toString(16)) {
		fgas = "1";
	} else if (fgas == parseInt(122).toString(16)) {
		fgas = "2";
	} else if (fgas == parseInt(123).toString(16)) {
		fgas = "6";
	} else {
		fgas = "4";
	}
	if (fgas.length < 2) {
		var length = 2 - fgas.length;
		for (var i = 0; i < length; i++) {
			fgas = "0" + fgas;
		}
	}
	//			alert($('#fdiameter').combobox('getValue'));
	//直径修改
	if (fdiameter == parseInt(132).toString(16)) {
		fdiameter = "C";
	} else if (fdiameter == parseInt(131).toString(16)) {
		fdiameter = "A";
	} else if (fdiameter == parseInt(135).toString(16)) {
		fdiameter = "08";
	} else if (fdiameter == parseInt(136).toString(16)) {
		fdiameter = "09";
	} else if (fdiameter == parseInt(134).toString(16)) {
		fdiameter = "10";
	} else {
		fdiameter = "E";
	}
	if (fdiameter.length < 2) {
		var length = 2 - fdiameter.length;
		for (var i = 0; i < length; i++) {
			fdiameter = "0" + fdiameter;
		}
	}
	//			alert($('#fmaterial').combobox('getValue'));
	//材质修改
	if (fmaterial == parseInt(91).toString(16)) {
		fmaterial = "1";
	} else if (fmaterial == parseInt(92).toString(16)) {
		fmaterial = "4";
	} else if (fmaterial == parseInt(93).toString(16)) {
		fmaterial = "2";
	} else if (fmaterial == parseInt(95).toString(16)) {
		fmaterial = "7";
	} else if (fmaterial == parseInt(96).toString(16)) {
		fmaterial = "8";
	} else if (fmaterial == parseInt(97).toString(16)) {
		fmaterial = "9";
	} else {
		fmaterial = "5";
	}
	if (fmaterial.length < 2) {
		var length = 2 - fmaterial.length;
		for (var i = 0; i < length; i++) {
			fmaterial = "0" + fmaterial;
		}
	}
	if (fweld_tuny_ele.length < 2) {
		var length = 2 - fweld_tuny_ele.length;
		for (var i = 0; i < length; i++) {
			fweld_tuny_ele = "0" + fweld_tuny_ele;
		}
	}
	if (fweld_tuny_vol.length < 2) {
		var length = 2 - fweld_tuny_vol.length;
		for (var i = 0; i < length; i++) {
			fweld_tuny_vol = "0" + fweld_tuny_vol;
		}
	}
	if (farc_tuny_ele.length < 2) {
		var length = 2 - farc_tuny_ele.length;
		for (var i = 0; i < length; i++) {
			farc_tuny_ele = "0" + farc_tuny_ele;
		}
	}
	if (farc_tuny_vol.length < 2) {
		var length = 2 - farc_tuny_vol.length;
		for (var i = 0; i < length; i++) {
			farc_tuny_vol = "0" + farc_tuny_vol;
		}
	}
	if (fweldprocess.length < 2) {
		var length = 2 - fweldprocess.length;
		for (var i = 0; i < length; i++) {
			fweldprocess = "0" + fweldprocess;
		}
	}

	/*			var mach = parseInt(selectMachine[smindex].gatherId).toString(16);
				if(mach.length<4){
					var length = 4 - mach.length;
			        for(var i=0;i<length;i++){
			        	mach = "0" + mach;
			        };
				}*/

	if (frequency.length < 4) {
		var length = 4 - frequency.length;
		for (var i = 0; i < length; i++) {
			frequency = "0" + frequency;
		}
	}

	if (gasflow.length < 4) {
		var length = 4 - gasflow.length;
		for (var i = 0; i < length; i++) {
			gasflow = "0" + gasflow;
		}
	}

	var xiafasend1 = mach + chanel + ftime + fadvance + fini_ele + fini_vol + fini_vol1 + fweld_ele + fweld_vol + fweld_vol1 + farc_ele + farc_vol + farc_vol1 + fhysteresis + fcharacter + fgas
		+ fdiameter + fmaterial + fweldprocess + con + fweld_tuny_ele + fweld_tuny_vol + farc_tuny_ele + farc_tuny_vol + frequency + gasflow + "00000000";

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
				WBLSAVE(1);
				alert("下发成功");
			}
		}
	}
}

//索取规范并赋值
function WBLGET() {
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
					$("#ftime").numberbox('setValue', (parseInt(data.substring(20, 24), 16) / 10).toFixed(1));
					$("#fadvance").numberbox('setValue', (parseInt(data.substring(24, 28), 16) / 10).toFixed(1));
					$("#fini_ele").numberbox('setValue', parseInt(data.substring(28, 32), 16));
					$("#fini_vol").numberbox('setValue', (parseInt(data.substring(32, 36), 16) / 10).toFixed(1));
					if(data.substring(36, 40).substring(0,2).toUpperCase()=="FF"){
						$("#fini_vol1").numberbox('setValue', parseInt("FFFF"+data.substring(36, 40), 16)<<0);
					}else{
						$("#fini_vol1").numberbox('setValue', parseInt(data.substring(36, 40), 16));
					}
					$("#fweld_ele").numberbox('setValue', parseInt(data.substring(40, 44), 16));
					$("#fweld_vol").numberbox('setValue', (parseInt(data.substring(44, 48), 16) / 10).toFixed(1));
					if(data.substring(48, 52).substring(0,2).toUpperCase()=="FF"){
						$("#fweld_vol1").numberbox('setValue', parseInt("FFFF"+data.substring(48, 52), 16)<<0);
					}else{
						$("#fweld_vol1").numberbox('setValue', parseInt(data.substring(48, 52), 16));
					}
					$("#farc_ele").numberbox('setValue', parseInt(data.substring(52, 56), 16));
					$("#farc_vol").numberbox('setValue', (parseInt(data.substring(56, 60), 16) / 10).toFixed(1));
					if(data.substring(60, 64).substring(0,2).toUpperCase()=="FF"){
						$("#farc_vol1").numberbox('setValue', parseInt("FFFF"+data.substring(60, 64), 16)<<0);
					}else{
						$("#farc_vol1").numberbox('setValue', parseInt(data.substring(60, 64), 16));
					}
					$("#fhysteresis").numberbox('setValue', (parseInt(data.substring(64, 68), 16) / 10).toFixed(1));
					if(data.substring(68, 72).substring(0,2).toUpperCase()=="FF"){
						$("#fcharacter").numberbox('setValue', parseInt("FFFF"+data.substring(68, 72), 16)<<0);
					}else{
						$("#fcharacter").numberbox('setValue', parseInt(data.substring(68, 72), 16));
					}
					$('#fweldprocess').combobox('select', parseInt(data.substring(72, 74), 16));
					if (parseInt(data.substring(74, 76), 16) == 1) {
						$('#fgas').combobox('select', 121);
					} else if (parseInt(data.substring(74, 76), 16) == 2) {
						$('#fgas').combobox('select', 122);
					} else if (parseInt(data.substring(74, 76), 16) == 6) {
						$('#fgas').combobox('select', 123);
					} else {
						$('#fgas').combobox('select', 124);
					}
					if (parseInt(data.substring(76, 78), 16) == 1) {//低碳钢实心
						$('#fmaterial').combobox('select', 91);
					} else if (parseInt(data.substring(76, 78), 16) == 2) {//低碳钢药心
						$('#fmaterial').combobox('select', 93);
					} else if (parseInt(data.substring(76, 78), 16) == 4) {//不锈钢实心
						$('#fmaterial').combobox('select', 92);
					} else if (parseInt(data.substring(76, 78), 16) == 7) {//铁氧体不锈钢实心
						$('#fmaterial').combobox('select', 95);
					} else if (parseInt(data.substring(76, 78), 16) == 8) {//纯铝
						$('#fmaterial').combobox('select', 96);
					} else if (parseInt(data.substring(76, 78), 16) == 9) {//铝镁合金
						$('#fmaterial').combobox('select', 97);
					} else {
						$('#fmaterial').combobox('select', 94);
					}
					if (parseInt(data.substring(78, 80), 16) == 14) {
						$('#fdiameter').combobox('select', 133);
					} else if (parseInt(data.substring(78, 80), 16) == 12) {
						$('#fdiameter').combobox('select', 132);
					} else if (parseInt(data.substring(78, 80), 16) == 8) {
						$('#fdiameter').combobox('select', 135);
					} else if (parseInt(data.substring(78, 80), 16) == 9) {
						$('#fdiameter').combobox('select', 136);
					} else if (parseInt(data.substring(78, 80), 16) == 10) {
						$('#fdiameter').combobox('select', 131);
					} else {
						$('#fdiameter').combobox('select', 134);
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
					} else if (sconx.substring(14, 15) == "1" && sconx.substring(13, 14) == "0") {
						$('#farc').combobox('select', 112);
					} else if (sconx.substring(14, 15) == "1" && sconx.substring(13, 14) == "1") {
						$('#farc').combobox('select', 113);
					} else if (sconx.substring(12, 13) == "1") {
						$('#farc').combobox('select', 114);
					} 
					if (sconx.substring(10, 11) == "0") {
						$('#fselect').combobox('select', 102);
					} else {
						$('#fselect').combobox('select', 101);
					}
					if (sconx.substring(9, 10) == "1") {
						$("#fcontroller").prop("checked", true);
					} else {
						$("#fcontroller").prop("checked", false);
					}
					if (sconx.substring(2, 3) == "1") {
						$("#ftorch").prop("checked", true);
					} else {
						$("#ftorch").prop("checked", false);
					}
					$("#fweld_tuny_ele").numberbox('setValue', parseInt(data.substring(84, 86), 16));
					$("#farc_tuny_ele").numberbox('setValue', parseInt(data.substring(88, 90), 16));
					if ($('#fselect').combobox('getValue') == 102) {
						$("#fweld_tuny_vol").numberbox('setValue', (parseInt(data.substring(86, 88), 16) / 10).toFixed(1));
						$("#farc_tuny_vol").numberbox('setValue', (parseInt(data.substring(90, 92), 16) / 10).toFixed(1));
					} else {
						$("#fweld_tuny_vol1").numberbox('setValue', parseInt(data.substring(86, 88), 16));
						$("#farc_tuny_vol1").numberbox('setValue', parseInt(data.substring(90, 92), 16));
					}
					$("#frequency").numberbox('setValue', (parseInt(data.substring(92, 96), 16) / 10).toFixed(1));
						alert("索取成功");
				}
			}
		}
}

//参数初始化
function WBLINIT(value) {
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
		WBLINIT(0);
		$('#fchanel').combobox('select', "1");
		return;
	}
	$('#farc').combobox('clear');
	$('#farc').combobox('loadData', [ {
		"text" : "无填弧坑",
		"value" : "111"
	}, {
		"text" : "直流填弧坑",
		"value" : "112"
	}, {
		"text" : "脉冲填弧坑",
		"value" : "113"
	}, {
		"text" : "电弧点焊",
		"value" : "114"
	} ]);
	$('#fgas').combobox('clear');
	$('#fgas').combobox('loadData', [ {
		"text" : "CO2",
		"value" : "121"
	}, {
		"text" : "MAG",
		"value" : "122"
	}, {
		"text" : "MIG",
		"value" : "123"
	}, {
		"text" : "MIG_2O2",
		"value" : "124"
	} ]);
	$('#fdiameter').combobox('clear');
	$('#fdiameter').combobox('loadData', [ {
		"text" : "Φ0.8",
		"value" : "135"
	}, {
		"text" : "Φ0.9",
		"value" : "136"
	}, {
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
	$('#fmaterial').combobox('clear');
	$('#fmaterial').combobox('loadData', [ {
		"text" : "低碳钢实芯",
		"value" : "91"
	}, {
		"text" : "不锈钢实芯",
		"value" : "92"
	}, {
		"text" : "低碳钢药芯",
		"value" : "93"
	}, {
		"text" : "不锈钢药芯",
		"value" : "94"
	}, {
		"text" : "铁氧体不锈钢实芯",
		"value" : "95"
	}, {
		"text" : "纯铝",
		"value" : "96"
	}, {
		"text" : "铝镁合金",
		"value" : "97"
	} ]);
	$('#fweldprocess').combobox('clear');
	$('#fweldprocess').combobox('loadData', [ {
		"text" : "直流脉冲",
		"value" : "0"
	}, {
		"text" : "直流",
		"value" : "1"
	}, {
		"text" : "直流低飞溅",
		"value" : "2"
	}, {
		"text" : "直流双脉冲",
		"value" : "3"
	}, {
		"text" : "OP1[PROCESS_OPT1]",
		"value" : "4"
	}]);
	$("#cwwvo").hide();
	$("#cwtwvo").hide();
	$("#cwwvto").hide();
	$("#cwtwvto").hide();
	$("#cwivo").hide();
	$("#cwtivo").hide();
	$("#cwavo").hide();
	$("#cwtavo").hide();
	$("#cwavto").hide();
	$("#cwtavto").hide();
	$("#fmode").prop("checked", false);
	$("#finitial").prop("checked", false);
	$("#fcontroller").prop("checked", false);
	$("#ftorch").prop("checked", false);
	$('#fselect').combobox('select', 102);
	$("#ftime").numberbox('setValue', 3.0);
	$("#fadvance").numberbox('setValue', 0.1);
	$("#fini_ele").numberbox('setValue', 100);
	$("#fweld_ele").numberbox('setValue', 150);
	$("#farc_ele").numberbox('setValue', 100);
	$("#fhysteresis").numberbox('setValue', 0.4);
	$("#fcharacter").numberbox('setValue', 0);
	$('#fweldprocess').combobox('select', 0);
	$('#fgas').combobox('select', 122);
	$('#fmaterial').combobox('select', 91);
	$('#fdiameter').combobox('select', 132);
	$("#fweld_tuny_ele").numberbox('setValue', 0);
	$("#farc_tuny_ele").numberbox('setValue', 0);
	$("#fini_vol").numberbox('setValue', 21.5);
	$("#fweld_vol").numberbox('setValue', 23.5);
	$("#farc_vol").numberbox('setValue', 21.5);
	$("#fweld_tuny_vol").numberbox('setValue', 0.0);
	$("#farc_tuny_vol").numberbox('setValue', 0.0);
	$("#fini_vol1").numberbox('setValue', 0);
	$("#fweld_vol1").numberbox('setValue', 0);
	$("#farc_vol1").numberbox('setValue', 0);
	$("#fweld_tuny_vol1").numberbox('setValue', 0);
	$("#farc_tuny_vol1").numberbox('setValue', 0);
	$('#farc').combobox('select', 111);
	$("#frequency").numberbox('setValue', 3);
}

//用户输入参数检测
function WBLCHECK() {
	var fweldprocess = $("#fweldprocess").combobox('getValue');
	if ($('#ftime').numberbox('getValue') < 0.1 || $('#ftime').numberbox('getValue') > 10) {
		alert("点焊时间：0.1~10");
		return false;
	}
	if ($('#fadvance').numberbox('getValue') < 0 || $('#fadvance').numberbox('getValue') > 10) {
		alert("提前送气范围：0~10");
		return false;
	}
	if(fweldprocess == 4){
		if ($('#fini_ele').numberbox('getValue') < 50 || $('#fini_ele').numberbox('getValue') > 160) {
			alert("初期电流范围：50~160");
			return false;
		}
	}else{
		if ($('#fini_ele').numberbox('getValue') < 20 || $('#fini_ele').numberbox('getValue') > 550) {
			alert("初期电流范围：20~550");
			return false;
		}
	}
	if ($('#fini_vol').numberbox('getValue') < 10 || $('#fini_vol').numberbox('getValue') > 50) {
		alert("初期电压范围：10~50");
		return false;
	}
	if ($('#fini_vol1').numberbox('getValue') < (-100) || $('#fini_vol1').numberbox('getValue') > (100)) {
		alert("初期电压一元范围：-100~100");
		return false;
	}
	if(fweldprocess == 4){
		if ($('#fweld_ele').numberbox('getValue') < 50 || $('#fweld_ele').numberbox('getValue') > 160) {
			alert("焊接电流范围：50~160");
			return false;
		}
	}else{
		if ($('#fweld_ele').numberbox('getValue') < 20 || $('#fweld_ele').numberbox('getValue') > 550) {
			alert("焊接电流范围：20~550");
			return false;
		}
	}
	if ($('#fweld_vol').numberbox('getValue') < 10 || $('#fweld_vol').numberbox('getValue') > 50) {
		alert("焊接电压范围：10~50");
		return false;
	}
	if ($('#fweld_vol1').numberbox('getValue') < (-100) || $('#fweld_vol1').numberbox('getValue') > (100)) {
		alert("焊接电压一元范围：-100~100");
		return false;
	}
	if(fweldprocess == 4){
		if ($('#farc_ele').numberbox('getValue') < 50 || $('#farc_ele').numberbox('getValue') > 160) {
			alert("收弧电流范围：50~160");
			return false;
		}
	}else{
		if ($('#farc_ele').numberbox('getValue') < 20 || $('#farc_ele').numberbox('getValue') > 550) {
			alert("收弧电流范围：20~550");
			return false;
		}
	}
	if ($('#farc_vol').numberbox('getValue') < 10 || $('#farc_vol').numberbox('getValue') > 50) {
		alert("收弧电压范围：10~50");
		return false;
	}
	if ($('#farc_vol1').numberbox('getValue') < (-100) || $('#farc_vol1').numberbox('getValue') > (100)) {
		alert("收弧电压一元范围：-100~100");
		return false;
	}
	if ($('#fhysteresis').numberbox('getValue') < 0 || $('#fhysteresis').numberbox('getValue') > 10) {
		alert("滞后送气范围：0~10");
		return false;
	}
	if ($('#fcharacter').numberbox('getValue') < (-10) || $('#fcharacter').numberbox('getValue') > (10)) {
		alert("电弧特性范围：-10~10");
		return false;
	}
	if ($('#frequency').numberbox('getValue') < (0.5) || $('#frequency').numberbox('getValue') > (32)) {
		alert("双脉冲频率范围：0.5~32");
		return false;
	}
/*	if ($('#gasflow').numberbox('getValue') < (0.5) || $('#gasflow').numberbox('getValue') > (5)) {
		alert("气体流量范围：0.5~5");
		return false;
	}*/
	if ($('#fweld_tuny_ele').numberbox('getValue') < (0) || $('#fweld_tuny_ele').numberbox('getValue') > (50)) {
		alert("焊接电流微调范围：0~50");
		return false;
	}
	if ($('#farc_tuny_ele').numberbox('getValue') < (0) || $('#farc_tuny_ele').numberbox('getValue') > (50)) {
		alert("收弧电流微调范围：0~50");
		return false;
	}
	if ($('#fselect').combobox('getValue') == 102) {
		if ($('#fweld_tuny_vol').numberbox('getValue') < (0) || $('#fweld_tuny_vol').numberbox('getValue') > (5)) {
			alert("焊接电压微调范围：0~5");
			return false;
		}
		if ($('#farc_tuny_vol').numberbox('getValue') < (0) || $('#farc_tuny_vol').numberbox('getValue') > (5)) {
			alert("收弧电压微调范围：0~5");
			return false;
		}
	} else {
		if ($('#fweld_tuny_vol').numberbox('getValue') < (0) || $('#fweld_tuny_vol').numberbox('getValue') > (20)) {
			alert("焊接电压一元微调范围：0~20");
			return false;
		}
		if ($('#farc_tuny_vol').numberbox('getValue') < (0) || $('#farc_tuny_vol').numberbox('getValue') > (20)) {
			alert("收弧电压一元微调范围：0~20");
			return false;
		}
	}
}

//下发参数时对页面已写好的参数进行检测
function wblValidationFrom(){
	return $("#fm").form('enableValidation').form('validate');
}
function wblSendCheck() {
	if (!wblValidationFrom()) {
		return;
	}
	if (WBLCHECK() == false) {
		return;
	} else {
		WBL(null, null);
	}
}

//参数规则
function WBLRULE(){
	$("#fselect").combobox({
		onChange : function(record) {
			if (record == 102) {
				$("#cwwvo").hide();
				$("#cwtwvo").hide();
				$("#cwwvto").hide();
				$("#cwtwvto").hide();
				$("#cwivo").hide();
				$("#cwtivo").hide();
				$("#cwavo").hide();
				$("#cwtavo").hide();
				$("#cwavto").hide();
				$("#cwtavto").hide();
				$("#cwwv").show();
				$("#cwtwv").show();
				$("#cwwvt").show();
				$("#cwtwvt").show();
				$("#cwiv").show();
				$("#cwtiv").show();
				$("#cwav").show();
				$("#cwtav").show();
				$("#cwavt").show();
				$("#cwtavt").show();
			} else {
				$("#cwwvo").show();
				$("#cwtwvo").show();
				$("#cwwvto").show();
				$("#cwtwvto").show();
				$("#cwivo").show();
				$("#cwtivo").show();
				$("#cwavo").show();
				$("#cwtavo").show();
				$("#cwavto").show();
				$("#cwtavto").show();
				$("#cwwv").hide();
				$("#cwtwv").hide();
				$("#cwwvt").hide();
				$("#cwtwvt").hide();
				$("#cwiv").hide();
				$("#cwtiv").hide();
				$("#cwav").hide();
				$("#cwtav").hide();
				$("#cwavt").hide();
				$("#cwtavt").hide();
			}
		}
	});
	
	$("#fchanel").combobox({
		onSelect : function(record) {
			WBLINIT(0);
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

	$("#fweldprocess").combobox({//焊接方法
		onChange : function() {
			var fweldprocess = $("#fweldprocess").combobox('getValue');
			if(fweldprocess == 1){//直流
				fgas_3();
				fselect_1();
//				$("#farc").combobox({disabled: true});
				$('#farc').combobox('clear');
				$('#farc').combobox('loadData', [ {
					"text" : "无填弧坑",
					"value" : "111"
				}, {
					"text" : "直流填弧坑",
					"value" : "112"
				}, {
					"text" : "电弧点焊",
					"value" : "114"
				} ]);
				$('#farc').combobox('select', 111);
				$("#frequency").numberbox({disabled: true});
			}else if(fweldprocess == 2){
				fgas_2();
				fselect_1();
//				$("#farc").combobox({disabled: true});
				$('#farc').combobox('clear');
				$('#farc').combobox('loadData', [ {
					"text" : "无填弧坑",
					"value" : "111"
				}, {
					"text" : "直流填弧坑",
					"value" : "112"
				}, {
					"text" : "电弧点焊",
					"value" : "114"
				} ]);
				$('#farc').combobox('select', 111);
				$("#frequency").numberbox({disabled: true});
			}else if(fweldprocess == 0){
				fgas_4();
				fselect_1();
//				$("#farc").combobox({disabled: false});
				$('#farc').combobox('clear');
				$('#farc').combobox('loadData', [ {
					"text" : "无填弧坑",
					"value" : "111"
				}, {
					"text" : "直流填弧坑",
					"value" : "112"
				}, {
					"text" : "脉冲填弧坑",
					"value" : "113"
				}, {
					"text" : "电弧点焊",
					"value" : "114"
				} ]);
				$('#farc').combobox('select', 111);
				$("#frequency").numberbox({disabled: true});
			}else if(fweldprocess == 3){
				fgas_4();
				fselect_1();
//				$("#farc").combobox({disabled: false});
				$('#farc').combobox('clear');
				$('#farc').combobox('loadData', [ {
					"text" : "无填弧坑",
					"value" : "111"
				}, {
					"text" : "直流填弧坑",
					"value" : "112"
				}, {
					"text" : "脉冲填弧坑",
					"value" : "113"
				}, {
					"text" : "电弧点焊",
					"value" : "114"
				} ]);
				$('#farc').combobox('select', 111);
				$("#frequency").numberbox({disabled: false});
			}else if(fweldprocess == 4){
				fgas_7();
				$('#fselect').combobox('clear');
				$('#fselect').combobox('loadData', [ {
					"text" : "一元",
					"value" : "101"
				}]);
//				$("#farc").combobox({disabled: false});
				$('#farc').combobox('clear');
				$('#farc').combobox('loadData', [ {
					"text" : "无填弧坑",
					"value" : "111"
				}, {
					"text" : "直流填弧坑",
					"value" : "112"
				}, {
					"text" : "脉冲填弧坑",
					"value" : "113"
				}, {
					"text" : "电弧点焊",
					"value" : "114"
				} ]);
				$('#farc').combobox('select', 111);
				$("#frequency").numberbox({disabled: false});
			}
			var data = $('#fgas').combobox('getData');
			$('#fgas').combobox('select',data[0].value);
			var data1 = $('#fselect').combobox('getData');
			$('#fselect').combobox('select',data1[0].value);
		}
	})
	
	$("#farc").combobox({//焊接方法
		onChange : function() {
			var farc = $("#farc").combobox('getValue');
			if(farc == 111){
				document.getElementById("finitial").disabled = true;
				$("#fini_ele").numberbox({disabled: true});
				$("#fini_vol").numberbox({disabled: true});
				$("#fini_vol1").numberbox({disabled: true});
				$("#ftime").numberbox({disabled: true});
			}else if(farc == 112){
				document.getElementById("finitial").disabled = false;
				$("#fini_ele").numberbox({disabled: false});
				$("#fini_vol").numberbox({disabled: false});
				$("#fini_vol1").numberbox({disabled: false});
				$("#ftime").numberbox({disabled: true});
			}else if(farc == 113){
				document.getElementById("finitial").disabled = false;
				$("#fini_ele").numberbox({disabled: false});
				$("#fini_vol").numberbox({disabled: false});
				$("#fini_vol1").numberbox({disabled: false});
				$("#ftime").numberbox({disabled: true});
			}else if(farc == 114){
				document.getElementById("finitial").disabled = true;
				$("#fini_ele").numberbox({disabled: true});
				$("#fini_vol").numberbox({disabled: true});
				$("#fini_vol1").numberbox({disabled: true});
				$("#ftime").numberbox({disabled: false});
			}
			var data = $('#fgas').combobox('getData');
			$('#fgas').combobox('select',data[0].value);
		}
	})
	
	$("#fmaterial").combobox({//焊丝种类
		onChange : function() {
			var fweldprocess = $("#fweldprocess").combobox('getValue');
			var fgas = $("#fgas").combobox('getValue');
			var fmaterial = $("#fmaterial").combobox('getValue');
			$("#fcontroller").prop("checked",false);
			$("#fcontroller").prop("disabled",true);
			if(fweldprocess == 1){
				if(fgas == 121){
					if(fmaterial == 91){//低碳钢实芯
						fdiameter_7();
						$("#fcontroller").prop("disabled",false);
					}else if(fmaterial == 93){
						fdiameter_5();
						$("#fcontroller").prop("disabled",false);
					}else if(fmaterial == 94){
						fdiameter_8();
						$("#fcontroller").prop("disabled",false);
					}
				}else if(fgas == 122){
					fdiameter_7();
					$("#fcontroller").prop("disabled",false);
				}else if(fgas == 123){
					if(fmaterial == 96){
						fdiameter_4();
					}else if(fmaterial == 97){
						fdiameter_6();
					}
				}else if(fgas == 124){
					if(fmaterial == 92){
						fdiameter_9();
					}else if(fmaterial == 95){
						fdiameter_2();
					}
					$("#fcontroller").prop("disabled",false);
				}
				
			}else if(fweldprocess == 2){//直流低飞溅
				fdiameter_2();
			}else if(fweldprocess == 0 || fweldprocess == 3){
				if(fgas == 122){
					fdiameter_7();
					if(fweldprocess == 0){
						$("#fcontroller").prop("disabled",false);
					}
				}else if(fgas == 123){
					if(fmaterial == 96){
						fdiameter_4();
					}else if(fmaterial == 97){
						fdiameter_6();
					}
				}else if(fgas == 124){
					if(fmaterial == 92){
						fdiameter_9();
					}else if(fmaterial == 95){
						fdiameter_2();
					}
					if(fweldprocess == 0){
						$("#fcontroller").prop("disabled",false);
					}
				}
			}else if(fweldprocess == 3){
				if(fgas == 122){
					fdiameter_1();
				}else if(fgas == 123){
					fdiameter_4();
				}else if(fgas == 124){
					fdiameter_1();
				}
			}else if(fweldprocess == 4){
				fdiameter_10();
				$("#fcontroller").prop("disabled",true);
			}
			var data = $('#fdiameter').combobox('getData');
			$('#fdiameter').combobox('select',data[0].value);
		}
	})
	$("#fgas").combobox({//气体
		onChange: function() {
			var fweldprocess = $("#fweldprocess").combobox('getValue');
			var fgas = $("#fgas").combobox('getValue');
			if(fweldprocess == 1){
				if(fgas == 121){//CO2
					fmaterial_3();
				}else if(fgas == 122){
					$('#fmaterial').combobox('clear');
					$('#fmaterial').combobox('loadData', [ {
						"text" : "低碳钢实芯",
						"value" : "91"
					} ]);
				}else if(fgas == 123){
					$('#fmaterial').combobox('clear');
					$('#fmaterial').combobox('loadData', [ {
						"text" : "纯铝",
						"value" : "96"
					},{
						"text" : "铝镁合金",
						"value" : "97"
					} ]);
				}else if(fgas == 124){
					$('#fmaterial').combobox('clear');
					$('#fmaterial').combobox('loadData', [ {
						"text" : "不锈钢实芯",
						"value" : "92"
					},{
						"text" : "铁氧体不锈钢实芯",
						"value" : "95"
					} ]);
				}
				var data = $('#fmaterial').combobox('getData');
				$('#fmaterial').combobox('select',data[0].value);
			}else if(fweldprocess == 2){
				if(fgas == 121 || fgas == 122){
					$('#fmaterial').combobox('clear');
					$('#fmaterial').combobox('loadData', [ {
						"text" : "低碳钢实芯",
						"value" : "91"
					} ]);
				}else if(fgas == 124){
					$('#fmaterial').combobox('clear');
					$('#fmaterial').combobox('loadData', [ {
						"text" : "不锈钢实芯",
						"value" : "92"
					},{
						"text" : "铁氧体不锈钢实芯",
						"value" : "95"
					} ]);
				}
				var data = $('#fmaterial').combobox('getData');
				$('#fmaterial').combobox('select',data[0].value);
			}else if(fweldprocess == 0 || fweldprocess == 3){
				if(fgas == 122){
					$('#fmaterial').combobox('clear');
					$('#fmaterial').combobox('loadData', [ {
						"text" : "低碳钢实芯",
						"value" : "91"
					} ]);
				}else if(fgas == 123){
					$('#fmaterial').combobox('clear');
					$('#fmaterial').combobox('loadData', [ {
						"text" : "纯铝",
						"value" : "96"
					},{
						"text" : "铝镁合金",
						"value" : "97"
					} ]);
				}else if(fgas == 124){
					$('#fmaterial').combobox('clear');
					$('#fmaterial').combobox('loadData', [ {
						"text" : "不锈钢实芯",
						"value" : "92"
					},{
						"text" : "铁氧体不锈钢实芯",
						"value" : "95"
					} ]);
				}
				var data = $('#fmaterial').combobox('getData');
				$('#fmaterial').combobox('select',data[0].value);
			}else if(fweldprocess == 4 ){
				$('#fmaterial').combobox('clear');
				$('#fmaterial').combobox('loadData', [ {
					"text" : "低碳钢实芯",
					"value" : "91"
				} ]);
				var data = $('#fmaterial').combobox('getData');
				$('#fmaterial').combobox('select',data[0].value);
			}
		}
	})
/*	$('#fweldprocess').combobox('select', 0);
	fmaterial_2();
	var data = $('#fmaterial').combobox('getData');
	$('#fmaterial').combobox('select',data[0].value);*/
}

function WBLSAVE(value) {
	if (WBLCHECK() == false) {
		return;
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
	}
	if ($("#arc_length").is(":checked") == true) {
		arc_length = 1;
	} else {
		arc_length = 0;
	}
	var fselect = $('#fselect').combobox('getValue'); //一元个别
	var farc = $('#farc').combobox('getValue'); //收弧
	var fmaterial = $('#fmaterial').combobox('getValue'); //材料
	var fgas = $('#fgas').combobox('getValue'); //气体
	var fdiameter = $('#fdiameter').combobox('getValue'); //焊丝直径
	var chanel = $('#fchanel').combobox('getValue'); //通道号
	var ftime = $('#ftime').numberbox('getValue'); //点焊时间
	var fadvance = $('#fadvance').numberbox('getValue'); //提前送气
	var fini_ele = $('#fini_ele').numberbox('getValue'); //初期电流
	var fweld_ele = $('#fweld_ele').numberbox('getValue'); //焊接电流
	var farc_ele = $('#farc_ele').numberbox('getValue'); //收弧电流
	var fhysteresis = $('#fhysteresis').numberbox('getValue'); //滞后送气
	/****上海通用焊机****/
	var firsttime = 0; //初期时间
	var farc_time = 0; //收弧时间
	var fcharacter = $("#fcharacter").numberbox('getValue'); //电弧特性
	var Rush = 0; //回烧修正
	var handarc_ele = 0; //手工焊热引弧电流
	var handarc_time = 0; //手工焊热引弧时间
	var hand_ele = 0; //手工焊热推力电流
	var Base_ele = 0; //基值电流
	var Base_vol = 0; //基值电压
	var Base_vol1 = 0; //基值电压一元
	var fargon = 0; //氩弧焊模式选择
	var manual_weld = 0; //手/气焊选择
	var pulse = 0; //双脉冲
	var fweldparameters = 0; //焊接参数
	var rise_time = 0; //缓升时间
	var decline_time = 0; //缓降时间
	var thrust_ele = 0; //推力电流
	var pulse_ratio = 0; //双脉冲占空比
	var point_speed = 0; //点动送丝速度
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
	/*	var gasflow = $('#gasflow').numberbox('getValue');
	var weldingratio = $('#weldingratio').numberbox('getValue');*/
	var gasflow = 0;
	var weldingratio = 0;
	messager = "保存成功！";
	if (machineModel == 184) {
		url2 = "wps/apSpc" + "?finitial=" + finitial + "&fcontroller=" + fcontroller + "&fmode=" + fmode + "&fselect=" + fselect + "&farc=" + farc + "&fmaterial=" + fmaterial + "&fgas=" + fgas + "&fdiameter=" + fdiameter + "&chanel=" + chanel + "&ftime=" + ftime + "&fadvance=" + fadvance + "&fini_ele=" + fini_ele + "&fweld_ele=" + fweld_ele + "&farc_ele=" + farc_ele + "&fhysteresis=" + fhysteresis + "&fcharacter=" + fcharacter + "&fweld_tuny_ele=" + fweld_tuny_ele + "&farc_tuny_ele=" + farc_tuny_ele + "&fini_vol=" + fini_vol +
			"&fini_vol1=" + fini_vol1 + "&fweld_vol=" + fweld_vol + "&fweld_vol1=" + fweld_vol1 + "&farc_vol=" + farc_vol + "&farc_vol1=" + farc_vol1 + "&fweld_tuny_vol=" + fweld_tuny_vol + "&farc_tuny_vol=" + farc_tuny_vol + "&ftorch=" + ftorch + "&frequency=" + frequency + "&gasflow=" + gasflow + "&weldingratio=" + weldingratio + "&machine=" + machine + "&firsttime=" + firsttime + "&farc_time=" + farc_time + "&Rush=" + Rush + "&handarc_ele=" + handarc_ele + "&handarc_time=" + handarc_time + "&hand_ele=" + hand_ele +
			"&Base_ele=" + Base_ele + "&Base_vol=" + Base_vol + "&Base_vol1=" + Base_vol1 + "&fargon=" + fargon + "&manual_weld=" + manual_weld + "&arc_length=" + arc_length + "&pulse=" + pulse + "&fweldparameters=" + fweldparameters + "&rise_time=" + rise_time + "&decline_time=" + decline_time + "&thrust_ele=" + thrust_ele + "&pulse_ratio=" + pulse_ratio + "&point_speed=" + point_speed;
	} else {
		url2 = "wps/apSpe" + "?finitial=" + finitial + "&fcontroller=" + fcontroller + "&fmode=" + fmode + "&fselect=" + fselect + "&farc=" + farc + "&fmaterial=" + fmaterial + "&fgas=" + fgas + "&fdiameter=" + fdiameter + "&chanel=" + chanel + "&ftime=" + ftime + "&fadvance=" + fadvance + "&fini_ele=" + fini_ele + "&fweld_ele=" + fweld_ele + "&farc_ele=" + farc_ele + "&fhysteresis=" + fhysteresis + "&fcharacter=" + fcharacter + "&fweld_tuny_ele=" + fweld_tuny_ele + "&farc_tuny_ele=" + farc_tuny_ele + "&fini_vol=" + fini_vol + "&fini_vol1=" + fini_vol1 + "&fweld_vol=" + fweld_vol + "&fweld_vol1=" + fweld_vol1 + "&farc_vol=" + farc_vol + "&farc_vol1=" + farc_vol1 + "&fweld_tuny_vol=" + fweld_tuny_vol + "&farc_tuny_vol=" + farc_tuny_vol + "&fprocess=" + fprocess + "&ftorch=" + ftorch + "&frequency=" + frequency + "&gasflow=" + gasflow + "&weldingratio=" + weldingratio + "&machine=" + machine;
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

//打开通道复制的dialog
function openWblCopyDialog(value){
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
function wblDialogData(){
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
function wb5control(){
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

function saveWblCopy(){
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
							yshuary.push(WBL(yshu1[n], rows[q].gatherId));
							allIssueRows.push(WBL(yshu1[n], rows[q].gatherId));
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
					waitWbl();
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
										waitWbl();
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
									waitWbl();
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
									waitWbl();
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
								waitWbl();
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

function waitWbl() {
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