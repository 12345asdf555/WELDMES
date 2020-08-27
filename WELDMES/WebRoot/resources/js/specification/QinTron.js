var flag;
var finishdata = new Array();
var nomachine = new Array();
var allmachine = new Array();
$(function() {
	QinTronRULE();
	QinTronMaterial();
	QinTronDiameter();
	QinTronGas();
	QinTronSelect();
	QinTronStep();
	QinTronDialogData();
	WeldInsframework();
})

function QinTron(yshu,gather){
	if(yshu==null){
		var fchanel = parseInt($('#fchanel').combobox('getValue')).toString(16); //通道
		var fselect = parseInt($('#fselect').combobox('getValue')); //焊接模式
		var fweld_ele = parseInt($('#fweld_ele').numberbox('getValue')).toString(16);  //电流
		var fweld_vol = (parseFloat($('#fweld_vol').numberbox('getValue')) * 10).toString(16);  //电压
		var fcharacter = parseInt($('#fcharacter').numberbox('getValue'),10);  //电感
		if(fcharacter<0){
			fcharacter = (fcharacter>>>0).toString(16).toLocaleUpperCase().substring(4);
		}else{
			fcharacter = fcharacter.toString(16);
		}
		var fgas = parseInt($('#fgas').combobox('getValue'));  //气体
		var fdiameter = parseInt($('#fdiameter').combobox('getValue'));  //丝径
		var fmaterial = parseInt($('#fmaterial').combobox('getValue'));  //材质
		var ftime = (parseFloat($('#ftime').numberbox('getValue'))*10).toString(16);  //点焊时间
		var fadvance = (parseFloat($('#fadvance').numberbox('getValue')) * 10).toString(16);  //提前送气
		var fini_vol = (parseFloat($('#fini_vol').numberbox('getValue')) * 10).toString(16);  //初期电压
		var farc_vol = (parseFloat($('#farc_vol').numberbox('getValue')) * 10).toString(16);  //收弧电压
		var fselectstep = parseInt($('#fselectstep').combobox('getValue'));  //step
		var fweld_tuny_ele = parseInt($('#fweld_tuny_ele').numberbox('getValue')).toString(16);  //电流微调
		var fweld_tuny_vol = (parseFloat($('#fweld_tuny_vol').numberbox('getValue')) * 10).toString(16);  //电压微调
		var frequency = parseInt($('#frequency').combobox('getValue'));  //双脉冲频率

		var fini_14;  //初期电流、送丝
		var fini_20;  //电流、送丝
		var fini_26;  //收弧电流、送丝
		if(fselect == 101){
			fini_14 = (parseFloat($('#farc_speed').numberbox('getValue')) * 10).toString(16);
			fini_20 = (parseFloat($('#fspeed').numberbox('getValue')) * 10).toString(16);
			fini_26 = (parseFloat($('#farc_tuny_speed').numberbox('getValue')) * 10).toString(16);
		}else{
			fini_14 = parseInt($('#fini_ele').numberbox('getValue')).toString(16);
			fini_20 = parseInt($('#fweld_ele').numberbox('getValue')).toString(16);
			fini_26 = parseInt($('#farc_ele').numberbox('getValue')).toString(16);
			farc_vol = (parseFloat($('#farc_tuny_vol').numberbox('getValue')) * 10).toString(16);
			fini_vol = (parseFloat($('#fini_tuny_vol').numberbox('getValue')) * 10).toString(16);
			fweld_vol = (parseFloat($('#fweld_tuny_vol').numberbox('getValue')) * 10).toString(16);
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
	}else{
		var fchanel = (yshu.FWPSNum).toString(16);
		var fselect = parseInt(yshu.fselect);
		var fweld_vol=(yshu.fweld_vol*10).toString(16);
		var fweld_ele=(yshu.fweld_ele).toString(16);
		var fcharacter=parseInt(yshu.fcharacter,10);
		if(fcharacter<0){
			fcharacter = (fcharacter>>>0).toString(16).toLocaleUpperCase().substring(4);
		}else{
			fcharacter = fcharacter.toString(16);
		}
		var fgas=parseInt(yshu.fgas);
		var fdiameter=parseInt(yshu.fdiameter);
		var fmaterial=parseInt(yshu.fmaterial);
		var ftime=(yshu.ftime*10).toString(16);
		var fadvance=(yshu.fadvance*10).toString(16);
		var fini_vol=(yshu.fini_vol*10).toString(16);
		var farc_vol=(yshu.farc_vol*10).toString(16);
		var fselectstep=parseInt(yshu.fselectstep);
		var fweld_tuny_ele=(yshu.fweld_tuny_ele).toString(16);
		var fweld_tuny_vol=(yshu.fweld_tuny_vol*10).toString(16);
		var frequency=(yshu.frequency);
		var fspeed=parseInt(yshu.fspeed).toString(16);

		var fini_14;  //初期电流、送丝
		var fini_20;  //电流、送丝
		var fini_26;  //收弧电流、送丝
		if(fselect == 101){
			fini_14 = (yshu.farc_speed*10).toString(16);
			fini_20 = (yshu.fspeed*10).toString(16);
			fini_26 = (yshu.farc_tuny_speed*10).toString(16);
		}else{
			fini_14 = (yshu.fini_ele).toString(16);
			fini_20 = (yshu.fweld_ele).toString(16);
			fini_26 = (yshu.farc_ele).toString(16);
			farc_vol = (yshu.farc_tuny_vol*10).toString(16);
			fini_vol = (yshu.fini_tuny_vol*10).toString(16);
			fweld_vol = (yshu.fweld_tuny_vol*10).toString(16);
		}

		/*//con需要修改
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
		}*/
		mach=parseInt(gather).toString(16);
		if (mach.length < 4) {
			var length = 4 - mach.length;
			for (var i = 0; i < length; i++) {
				mach = "0" + mach;
			}
		}
	}
	if (fchanel.length < 2) {
		var length = 2 - fchanel.length;
		for (var i = 0; i < length; i++) {
			fchanel = "0" + fchanel;
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
	if (fcharacter.length < 4) {
		var length = 4 - fcharacter.length;
		for (var i = 0; i < length; i++) {
			fcharacter = "0" + fcharacter;
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
	}if (fini_14.length < 4) {
		var length = 4 - fini_14.length;
		for (var i = 0; i < length; i++) {
			fini_14 = "0" + fini_14;
		}
	}if (fini_vol.length < 4) {
		var length = 4 - fini_vol.length;
		for (var i = 0; i < length; i++) {
			fini_vol = "0" + fini_vol;
		}
	}if (fini_20.length < 4) {
		var length = 4 - fini_20.length;
		for (var i = 0; i < length; i++) {
			fini_20 = "0" + fini_20;
		}
	}if (fweld_vol.length < 4) {
		var length = 4 - fweld_vol.length;
		for (var i = 0; i < length; i++) {
			fweld_vol = "0" + fweld_vol;
		}
	}if (farc_vol.length < 4) {
		var length = 4 - farc_vol.length;
		for (var i = 0; i < length; i++) {
			farc_vol = "0" + farc_vol;
		}
	}if (fini_26.length < 4) {
		var length = 4 - fini_26.length;
		for (var i = 0; i < length; i++) {
			fini_26 = "0" + fini_26;
		}
	}if (fini_26.length < 4) {
		var length = 4 - fini_26.length;
		for (var i = 0; i < length; i++) {
			fini_26 = "0" + fini_26;
		}
	}if (fweld_tuny_ele.length < 2) {
		var length = 2 - fweld_tuny_ele.length;
		for (var i = 0; i < length; i++) {
			fweld_tuny_ele = "0" + fweld_tuny_ele;
		}
	}if (fweld_tuny_vol.length < 2) {
		var length = 2 - fweld_tuny_vol.length;
		for (var i = 0; i < length; i++) {
			fweld_tuny_vol = "0" + fweld_tuny_vol;
		}
	}
	var model;
	if (fselect == 101){
		model = "00";
	}else if(fselect == 102){
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
	var doumai;
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
	}else if (fmaterial == 251 && fdiameter == 135 && fgas == 202){
		mdg = "0f";
	}else if (fmaterial == 251 && fdiameter == 131 && fgas == 202){
		mdg = "10";
	}else if (fmaterial == 251 && fdiameter == 131 && fgas == 205){
		mdg = "11";
	}else if (fmaterial == 251 && fdiameter == 132 && fgas == 202){
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
	if(yshu!=null){
		return "7E"+xiafasend2+"7D";
	}
	var symbol = 0;
	var websocket = null;
	if (typeof (WebSocket) == "undefined") {
		WEB_SOCKET_SWF_LOCATION = "resources/js/WebSocketMain.swf";
		WEB_SOCKET_DEBUG = true;
	}
	websocket = new WebSocket(websocketUrl);
	websocket.onopen = function() {
		var oneMinuteTimer = window.setTimeout(function() {
			if (symbol == 0) {
				alert("下发超时");
			}
		}, 30000);
		websocket.send("7E" + xiafasend2 + "7D");
	}
	websocket.onmessage = function(msg) {
		var fan = msg.data;
		if (fan.substring(0, 2) == "7E" && fan.substring(10, 12) == "52") {
			symbol = 1;
			if (parseInt(fan.substring(18, 20), 16) == 1) {
				websocket.close();
				alert("下发失败");
			} else {
				websocket.close();
				QinTronSAVE(1);
				alert("下发成功");
			}
		}
	}
}

//索取规范并赋值
function QinTronGET() {
	var socketfc = null;
	symbol = 0;
	if (typeof (WebSocket) == "undefined") {
		WEB_SOCKET_SWF_LOCATION = "resources/js/WebSocketMain.swf";
		WEB_SOCKET_DEBUG = true;
	}
	socketfc = new WebSocket(websocketUrl);
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
			var data = msg.data;
			if (data.substring(0, 2) == "7E" && data.substring(10, 12) == "56") {
				if (data.substring(18, 20) == "FF") {
					symbol++;
					socketfc.close();
					if (socketfc.readyState != 1) {
						alert("此通道没有规范，请尝试新建规范，可恢复默认值进行参考");
					}
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
					if(data.substring(68, 72).substring(0,2).toUpperCase()=="FF"){
						$("#fcharacter").numberbox('setValue', parseInt("FFFF"+data.substring(68, 72), 16)<<0);
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
						$('#fgas').combobox('select', '202');
					}else if (mdg == "10"){
						$('#fmaterial').combobox('select', '251');
						$('#fdiameter').combobox('select', '131');
						$('#fgas').combobox('select', '202');
					}else if (mdg == "11"){
						$('#fmaterial').combobox('select', '251');
						$('#fdiameter').combobox('select', '131');
						$('#fgas').combobox('select', '205');
					}else if (mdg == "12"){
						$('#fmaterial').combobox('select', '251');
						$('#fdiameter').combobox('select', '132');
						$('#fgas').combobox('select', '202');
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
						$('#fselect').combobox('select', '101');
					}else if(fselect == "01"){
						$('#fselect').combobox('select', '102');
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
						$("#fweld_tuny_vol").numberbox('setValue', (parseFloat(data.substring(44, 48), 16) / 10).toFixed(1));
						$("#fini_tuny_vol").numberbox('setValue', (parseFloat(data.substring(32, 36), 16) / 10).toFixed(1));
						$("#farc_tuny_vol").numberbox('setValue', (parseFloat(data.substring(56, 60), 16) / 10).toFixed(1));
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

//参数初始化
function QinTronINIT(value) {
	if(value==1){
		$('#fchanel').combobox('unselect', '1');
		$('#fchanel').combobox('select', '1');
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
		$('#fgas').combobox('select', '200');

		$("#fcharacter").numberbox('setValue', 0);
		$('#rselect').show();
		$('#fselect').combobox('select', 101);
		$("#fspeed").numberbox('setValue', 10);
		$('#fdiameter').combobox('select', 135);
		$('#fmaterial').combobox('select', 250);
		$("#fweld_vol").numberbox('setValue', 19.0);
		$("#fweld_ele").numberbox('setValue', 100);

		$("#farc_speed").numberbox('setValue', 10);
		$("#farc_tuny_speed").numberbox('setValue', 10);
		$("#fini_vol").numberbox('setValue', 19.0);
		$("#fini_ele").numberbox('setValue', 100);
		$("#farc_vol").numberbox('setValue', 19.0);
		$("#farc_ele").numberbox('setValue', 100);
		$("#fadvance").numberbox('setValue', 0.1);
		$("#fweld_tuny_vol").numberbox('setValue', 19.0);
		$("#fini_tuny_vol").numberbox('setValue', 19.0);
		$("#farc_tuny_vol").numberbox('setValue', 19.0);
		$("#fweld_tuny_ele").numberbox('setValue', 100);
		$('#fselectstep').combobox('select', 105);
		$('#frequency').combobox('select', 137);
		$("#ftime").numberbox('setValue', 0.5);
		
		$("#rfrequency").hide();
		$("#tfrequency").hide();
		$("#rfweld_ele").hide();
		$("#tfweld_ele").hide();
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
		$("#rfweld_tuny_ele").hide();
		$("#tfweld_tuny_ele").hide();
		$("#rfweld_tuny_vol").hide();
		$("#tfweld_tuny_vol").hide();
		$("#rfarc_tuny_vol").hide();
		$("#tfarc_tuny_vol").hide();
		$("#rfini_tuny_vol").hide();
		$("#tfini_tuny_vol").hide();
	}
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
	if(farc_tuny_vol<-50 || farc_tuny_vol>50){
		alert("收狐电压微调：-50~50");
		return;
	}
	if(fweld_tuny_vol<-50 || fweld_tuny_vol>50){
		alert("焊接电压微调：-50~50");
		return;
	}
	if(fini_tuny_vol<-50 || fini_tuny_vol>50){
		alert("初期电压微调：-50~50");
		return;
	}

	if(machineModel == 185){    //400DP
		if (fmaterial == 250 && fdiameter == 135 && fgas == 200){
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
				if(fselectstep == 108){
					if(fini_ele<105 || fini_ele>400 || fweld_ele<105 || fweld_ele>400 || farc_ele<105 || farc_ele>400){
						alert("电流： 105-400");
						return false;
					}
				}else{
					if(fweld_ele<105 || fweld_ele>400){
						alert("电流： 105-400");
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
		}else if (fmaterial == 251 && fdiameter == 135 && fgas == 202){
			if(fselect == 101){
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
			}else if(fselect == 102){
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
		}else if (fmaterial == 251 && fdiameter == 131 && fgas == 202){
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
		}else if (fmaterial == 251 && fdiameter == 132 && fgas == 202){
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
				if(fselectstep == 108){
					if(fini_ele<105 || fini_ele>400 || fweld_ele<105 || fweld_ele>400 || farc_ele<105 || farc_ele>400){
						alert("电流： 105-400");
						return false;
					}
				}else{
					if(fweld_ele<105 || fweld_ele>400){
						alert("电流： 105-400");
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
		}else if (fmaterial == 251 && fdiameter == 135 && fgas == 202){
			if(fselect == 101){
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
			}else if(fselect == 102){
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
		}else if (fmaterial == 251 && fdiameter == 131 && fgas == 202){
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
		}else if (fmaterial == 251 && fdiameter == 132 && fgas == 202){
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			}else if(fselect == 102){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
					if(fini_ele<105 || fini_ele>400 || fweld_ele<105 || fweld_ele>400 || farc_ele<105 || farc_ele>400){
						alert("电流： 105-400");
						return false;
					}
				}else{
					if(fweld_ele<105 || fweld_ele>400){
						alert("电流： 105-400");
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
			if(fselect == 101){
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
			if(fselect == 101){
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
		}else if (fmaterial == 251 && fdiameter == 135 && fgas == 202){
			if(fselect == 101){
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
		}else if (fmaterial == 251 && fdiameter == 131 && fgas == 202){
			if(fselect == 101){
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
			if(fselect == 101){
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
		}else if (fmaterial == 251 && fdiameter == 132 && fgas == 202){
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
					if(fini_ele<105 || fini_ele>400 || fweld_ele<105 || fweld_ele>400 || farc_ele<105 || farc_ele>400){
						alert("电流： 105-400");
						return false;
					}
				}else{
					if(fweld_ele<105 || fweld_ele>400){
						alert("电流： 105-400");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 134 && fgas == 202){
			if(fselect == 101){
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
			if(fselect == 101){
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
		}else if (fmaterial == 251 && fdiameter == 135 && fgas == 202){
			if(fselect == 101){
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
		}else if (fmaterial == 251 && fdiameter == 131 && fgas == 202){
			if(fselect == 101){
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
			if(fselect == 101){
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
		}else if (fmaterial == 251 && fdiameter == 132 && fgas == 202){
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
					if(fini_ele<105 || fini_ele>500 || fweld_ele<105 || fweld_ele>500 || farc_ele<105 || farc_ele>500){
						alert("电流： 105-500");
						return false;
					}
				}else{
					if(fweld_ele<105 || fweld_ele>500){
						alert("电流： 105-500");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 134 && fgas == 202){
			if(fselect == 101){
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
			if(fselect == 101){
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
		}else if (fmaterial == 251 && fdiameter == 135 && fgas == 202){
			if(fselect == 101){
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
		}else if (fmaterial == 251 && fdiameter == 131 && fgas == 202){
			if(fselect == 101){
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
			if(fselect == 101){
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
		}else if (fmaterial == 251 && fdiameter == 132 && fgas == 202){
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
					if(fini_ele<105 || fini_ele>580 || fweld_ele<105 || fweld_ele>580 || farc_ele<105 || farc_ele>580){
						alert("电流： 105-580");
						return false;
					}
				}else{
					if(fweld_ele<105 || fweld_ele>580){
						alert("电流： 105-580");
						return false;
					}
				}
			}
		}else if (fmaterial == 250 && fdiameter == 134 && fgas == 202){
			if(fselect == 101){
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
			if(fselect == 101){
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
		}else if (fmaterial == 251 && fdiameter == 135 && fgas == 202){
			if(fselect == 101){
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
		}else if (fmaterial == 251 && fdiameter == 131 && fgas == 202){
			if(fselect == 101){
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
			if(fselect == 101){
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
		}else if (fmaterial == 251 && fdiameter == 132 && fgas == 202){
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
					if(fweld_ele<60 || fweld_ele>165){
						alert("电流：80-165");
						return false;
					}
				}
			}
		}else if (fmaterial == 254 && fdiameter == 132 && fgas == 208){
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
					if(fini_ele<132 || fini_ele>540 || fweld_ele<132 || fweld_ele>540 || farc_ele<60 || farc_ele>540){
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
			if(fselect == 101){
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
			if(fselect == 101){
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
			if(fselect == 101){
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

//下发参数时对页面已写好的参数进行检测
function QinTronValidationFrom(){
	return $("#fm").form('enableValidation').form('validate');
}
function QinTronSendCheck() {
	if (!QinTronValidationFrom()) {
		return;
	}
	if (QinTronCHECK(machineModel) == false) {
		return;
	} else {
		QinTron(null, null);
	}
}

//参数规则
function QinTronRULE(){
	$("#fchanel").combobox({
		onSelect : function(record) {
			if (node11 != null) {
				$.ajax({
					type : "post",
					async : false,
					url : "wps/getAllSperl?machine=" + node11.id + "&chanel=" + record.value,
					data : {},
					dataType : "json", //返回数据形式为json  
					success : function(result) {
						if (result) {
							yshu = eval(result.rows);
							if (yshu.length != 0) {
								firmaterial=yshu[0].fmaterial;
								firdiameter=yshu[0].fdiameter;
								firgas=yshu[0].fgas;
								firselectstep=yshu[0].fselectstep;
								firselect=yshu[0].fselect;

								if(machineModel == 185){
									$('#fselect').combobox('clear');
									$('#fselect').combobox('loadData', [ {
										"text" : "个别",
										"value" : "101"
									}, {
										"text" : "一元",
										"value" : "102"
									}, {
										"text" : "脉冲",
										"value" : "103"
									}, {
										"text" : "双脉冲",
										"value" : "104"
									} ]);
								}else if(machineModel == 187){
									$('#fselect').combobox('clear');
									$('#fselect').combobox('loadData', [ {
										"text" : "个别",
										"value" : "101"
									}, {
										"text" : "一元",
										"value" : "102"
									}, {
										"text" : "脉冲",
										"value" : "103"
									}, {
										"text" : "双脉冲",
										"value" : "104"
									} ]);
								}else if(machineModel == 188){
									$('#fselect').combobox('clear');
									$('#fselect').combobox('loadData', [ {
										"text" : "个别",
										"value" : "101"
									}, {
										"text" : "一元",
										"value" : "102"
									}, {
										"text" : "脉冲",
										"value" : "103"
									}, {
										"text" : "双脉冲",
										"value" : "104"
									} ]);
								}else if(machineModel == 189){
									$('#fselect').combobox('clear');
									$('#fselect').combobox('loadData', [ {
										"text" : "个别",
										"value" : "101"
									}, {
										"text" : "一元",
										"value" : "102"
									} ]);
								}else if(machineModel == 190){
									$('#fselect').combobox('clear');
									$('#fselect').combobox('loadData', [ {
										"text" : "个别",
										"value" : "101"
									}, {
										"text" : "一元",
										"value" : "102"
									} ]);
								}else if(machineModel == 191){
									$('#fselect').combobox('clear');
									$('#fselect').combobox('loadData', [ {
										"text" : "个别",
										"value" : "101"
									}, {
										"text" : "一元",
										"value" : "102"
									} ]);
								}

								$('#fselect').combobox('unselect', '101');
								$('#fdiameter').combobox('unselect', '135');
								$('#fmaterial').combobox('unselect', '250');
								$('#fselectstep').combobox('unselect', '105');

								$('#fselect').combobox('select', yshu[0].fselect);
								$("#fweld_vol").numberbox('setValue', yshu[0].fweld_vol);
								$("#fweld_ele").numberbox('setValue', yshu[0].fweld_ele);
								$("#fcharacter").numberbox('setValue', yshu[0].fcharacter);
								$('#fmaterial').combobox('select', yshu[0].fmaterial);
								$('#fdiameter').combobox('select', yshu[0].fdiameter);
								$('#fgas').combobox('select', yshu[0].fgas);
								$("#frelength").numberbox('setValue', yshu[0].frelength);
								$("#fspeed").numberbox('setValue', yshu[0].fspeed);

								$('#fadvance').numberbox('setValue', yshu[0].fadvance);
								$("#farc_speed").numberbox('setValue', yshu[0].farc_speed);
								$("#farc_tuny_speed").numberbox('setValue', yshu[0].farc_tuny_speed);
								$("#fini_ele").numberbox('setValue', yshu[0].fini_ele);
								$('#fini_vol').numberbox('setValue', yshu[0].fini_vol);
								$('#farc_ele').numberbox('setValue', yshu[0].farc_ele);
								$('#farc_vol').numberbox('setValue', yshu[0].farc_vol);
								$("#fweld_tuny_ele").numberbox('setValue', yshu[0].fweld_tuny_ele);
								$("#fweld_tuny_vol").numberbox('setValue', yshu[0].fweld_tuny_vol);
								$("#fini_tuny_vol").numberbox('setValue', yshu[0].fini_tuny_vol);
								$("#farc_tuny_vol").numberbox('setValue', yshu[0].farc_tuny_vol);

								$('#frequency').combobox('select', yshu[0].frequency);
								$("#fselectstep").combobox('select', yshu[0].fselectstep);
								$("#ftime").numberbox('setValue', yshu[0].ftime);

							} else {
								firmaterial=0;
								firdiameter=0;
								firselectstep=0;
								firselect=0;
								gmaterial=250;
								gdiameter=135;
								gselectstep=105;
								gselect=101;

								if(machineModel == 185){
									$('#fselect').combobox('clear');
									$('#fselect').combobox('loadData', [ {
										"text" : "个别",
										"value" : "101"
									}, {
										"text" : "一元",
										"value" : "102"
									}, {
										"text" : "脉冲",
										"value" : "103"
									}, {
										"text" : "双脉冲",
										"value" : "104"
									} ]);
								}else if(machineModel == 187){
									$('#fselect').combobox('clear');
									$('#fselect').combobox('loadData', [ {
										"text" : "个别",
										"value" : "101"
									}, {
										"text" : "一元",
										"value" : "102"
									}, {
										"text" : "脉冲",
										"value" : "103"
									}, {
										"text" : "双脉冲",
										"value" : "104"
									} ]);
								}else if(machineModel == 188){
									$('#fselect').combobox('clear');
									$('#fselect').combobox('loadData', [ {
										"text" : "个别",
										"value" : "101"
									}, {
										"text" : "一元",
										"value" : "102"
									}, {
										"text" : "脉冲",
										"value" : "103"
									}, {
										"text" : "双脉冲",
										"value" : "104"
									} ]);
								}else if(machineModel == 189){
									$('#fselect').combobox('clear');
									$('#fselect').combobox('loadData', [ {
										"text" : "个别",
										"value" : "101"
									}, {
										"text" : "一元",
										"value" : "102"
									} ]);
								}else if(machineModel == 190){
									$('#fselect').combobox('clear');
									$('#fselect').combobox('loadData', [ {
										"text" : "个别",
										"value" : "101"
									}, {
										"text" : "一元",
										"value" : "102"
									} ]);
								}else if(machineModel == 191){
									$('#fselect').combobox('clear');
									$('#fselect').combobox('loadData', [ {
										"text" : "个别",
										"value" : "101"
									}, {
										"text" : "一元",
										"value" : "102"
									} ]);
								}

								$('#fselect').combobox('unselect', '101');
								$('#fdiameter').combobox('unselect', '135');
								$('#fmaterial').combobox('unselect', '250');
								$('#fselectstep').combobox('unselect', '105');

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

								$("#fcharacter").numberbox('setValue', 0);
								$('#rselect').show();
								$('#fselect').combobox('select', 101);
								$("#fspeed").numberbox('setValue', 10);
								$('#fmaterial').combobox('select', 250);
								$('#fdiameter').combobox('select', 135);
								$('#fgas').combobox('select', '200');
								$("#fweld_vol").numberbox('setValue', 19.0);
								$("#fweld_ele").numberbox('setValue', 100);

								$("#farc_speed").numberbox('setValue', 10);
								$("#farc_tuny_speed").numberbox('setValue', 10);
								$("#fini_vol").numberbox('setValue', 19.0);
								$("#fini_ele").numberbox('setValue', 100);
								$("#farc_vol").numberbox('setValue', 19.0);
								$("#farc_ele").numberbox('setValue', 100);
								$("#fadvance").numberbox('setValue', 0.1);
								$("#fweld_tuny_vol").numberbox('setValue', 19.0);
								$("#fini_tuny_vol").numberbox('setValue', 19.0);
								$("#farc_tuny_vol").numberbox('setValue', 19.0);
								$("#fweld_tuny_ele").numberbox('setValue', 100);
								$('#fselectstep').combobox('select', 105);
								$('#frequency').combobox('select', 137);
								$("#ftime").numberbox('setValue', 0.5);

								$("#rfrequency").hide();
								$("#tfrequency").hide();
								$("#rfweld_ele").hide();
								$("#tfweld_ele").hide();
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
								$("#rfweld_tuny_ele").hide();
								$("#tfweld_tuny_ele").hide();
								$("#rfweld_tuny_vol").hide();
								$("#tfweld_tuny_vol").hide();
								$("#rfarc_tuny_vol").hide();
								$("#tfarc_tuny_vol").hide();
								$("#rfini_tuny_vol").hide();
								$("#tfini_tuny_vol").hide();

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
}

function QinTronSAVE(value) {
	if (machineModel == 185 || machineModel == 187 || machineModel == 188 || machineModel == 189 || machineModel == 190 || machineModel == 191) {
		if (QinTronCHECK(machineModel) == false) {
			return;
		}
	}
	var url2 = "";

	var fselect = $('#fselect').combobox('getValue');//一元个别
	var fcharacter = $('#fcharacter').numberbox('getValue');//电感
	var fmaterial = $('#fmaterial').combobox('getValue');//材料
	var fgas = $('#fgas').combobox('getValue');//气体
	var fdiameter = $('#fdiameter').combobox('getValue');//焊丝直径
	var chanel = $('#fchanel').combobox('getValue');//通道号
	var fweld_ele = $('#fweld_ele').numberbox('getValue');//焊接电流
	var fweld_vol = $('#fweld_vol').numberbox('getValue');//焊接电压
	var fspeed = $('#fspeed').numberbox('getValue');//给定速度
	var farc_speed = $('#farc_speed').numberbox('getValue');//初期速度
	var farc_tuny_speed = $('#farc_tuny_speed').numberbox('getValue');//收弧速度
	var fini_vol = $('#fini_vol').numberbox('getValue');//初期电压
	var fini_ele = $('#fini_ele').numberbox('getValue');//初期电流
	var farc_vol = $('#farc_vol').numberbox('getValue');//收弧电压
	var farc_ele = $('#farc_ele').numberbox('getValue');//收弧电流
	var fadvance = $('#fadvance').numberbox('getValue');//提起送气
	var fweld_tuny_vol = $('#fweld_tuny_vol').numberbox('getValue');//电压微调
	var farc_tuny_vol = $('#farc_tuny_vol').numberbox('getValue');//电压微调
	var fini_tuny_vol = $('#fini_tuny_vol').numberbox('getValue');//电压微调
	var fweld_tuny_ele = $('#fweld_tuny_ele').numberbox('getValue');//电流微调
	var fselectstep = $('#fselectstep').combobox('getValue');//step
	var frequency = $('#frequency').combobox('getValue');//双脉冲
	var ftime = $('#ftime').numberbox('getValue');//点焊时间
	var machine = node11.id;

	messager = "保存成功！";
	if(machineModel == 184){
		url2 = "wps/apSpc" + "?finitial=" + finitial + "&fcontroller=" + fcontroller + "&fmode=" + fmode + "&fselect=" + fselect + "&farc=" + farc + "&fmaterial=" + fmaterial + "&fgas=" + fgas + "&fdiameter=" + fdiameter + "&chanel=" + chanel + "&ftime=" + ftime + "&fadvance=" + fadvance + "&fini_ele=" + fini_ele + "&fweld_ele=" + fweld_ele + "&farc_ele=" + farc_ele + "&fhysteresis=" + fhysteresis + "&fcharacter=" + fcharacter + "&fweld_tuny_ele=" + fweld_tuny_ele + "&farc_tuny_ele=" + farc_tuny_ele + "&fini_vol=" + fini_vol +
		"&fini_vol1=" + fini_vol1 + "&fweld_vol=" + fweld_vol + "&fweld_vol1=" + fweld_vol1 + "&farc_vol=" + farc_vol + "&farc_vol1=" + farc_vol1 + "&fweld_tuny_vol=" + fweld_tuny_vol + "&farc_tuny_vol=" + farc_tuny_vol +  "&ftorch=" + ftorch + "&frequency=" + frequency + "&gasflow=" + gasflow + "&weldingratio=" + weldingratio+ "&machine=" + machine+"&firsttime="+firsttime+ "&farc_time="+farc_time+ "&Rush="+Rush +"&handarc_ele="+handarc_ele +"&handarc_time=" +handarc_time +"&hand_ele="+hand_ele +
		"&Base_ele="+Base_ele +"&Base_vol=" +Base_vol+"&Base_vol1="+Base_vol1 +"&fargon=" +fargon +"&manual_weld="+manual_weld +"&arc_length="+arc_length +"&pulse="+pulse +"&fweldparameters="+fweldparameters+"&rise_time="+rise_time +"&decline_time="+decline_time+"&thrust_ele="+thrust_ele+"&pulse_ratio="+pulse_ratio +"&point_speed="+point_speed;
	}else if (machineModel == 185 || machineModel == 187 || machineModel == 188 || machineModel == 189 || machineModel == 190 || machineModel == 191) {
		url2 = "wps/apSperl" + "?fselect=" + fselect + "&fcharacter=" + fcharacter + "&fmaterial=" + fmaterial + "&fgas=" + fgas + "&fdiameter=" + fdiameter 
		+ "&chanel=" + chanel + "&fweld_ele=" + fweld_ele + "&fweld_vol=" + fweld_vol + "&fspeed=" + fspeed + "&farc_tuny_speed=" + farc_tuny_speed 
		+ "&farc_speed=" + farc_speed + "&fini_vol=" + fini_vol + "&fini_ele=" + fini_ele + "&farc_ele=" + farc_ele + "&farc_vol=" + farc_vol 
		+ "&fadvance=" + fadvance + "&fweld_tuny_vol=" + fweld_tuny_vol + "&fweld_tuny_ele=" + fweld_tuny_ele + "&fselectstep=" + fselectstep 
		+ "&frequency=" + frequency + "&ftime=" + ftime + "&machine=" + machine + "&farc_tuny_vol=" + farc_tuny_vol + "&fini_tuny_vol=" + fini_tuny_vol;
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
function openQinTronCopyDialog(value){
	WeldInsframework();
	var url="";
	if (value == 1 || value == 1) {
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
	flag = value;
}

//通道复制的焊机选择表格赋值
function QinTronDialogData(){
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

function saveQinTronCopy(){
	if(flag == 1 || flag == 0){
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
		if (flag == 1) {
			var url1 = "wps/Sperl?machine=" + node11.id + "&chanel=" + "";
		} else {
			var url1 = "wps/Sperl?machine=" + node11.id + "&chanel=" + chanel1;
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
				yshuary.push(QinTron(yshu1[n], rows[q].gatherId));
			}
		}
		socketfc = new WebSocket(websocketUrl);
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
//			wait();
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
								waitQinTron();
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
								waitQinTron();
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
	} else {

		var smachine = node11.id;
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
					failnum : '0'
				})
			}
			obj.total = ro1Rows.length;
			obj.rows = ro1Rows;
			$('#divro').dialog('close');
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
						var msg = new Paho.MQTT.Message(allmachine.pop());
						msg.destinationName = "weldmes-webdatadown";
						client.send(msg);
						console.log("重发触发");
					}
					else{
						window.clearInterval(t);
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
					var judge = parseInt(fan.substring(12,16));
					for(u=0;u<allmachine.length;u++){
						if(judge == parseInt(allmachine[u].substring(12, 16))){
							allmachine.splice(u, 1);
						}
					}
					for(e=0;e<nomachine.length;e++){
						if(judge == nomachine[e]){
							nomachine.splice(e, 1);
							for(p=0;p<obj.total;p++){
								obj.rows[p].failnum = 0;
							}
							$("#ro1").datagrid("loadData", obj);
						}
					}
					if(fan.substring(0,2)=="7E"&&fan.substring(10,12)=="54"){
						var cxk = parseInt(fan.substring(12,16),16);
						client.unsubscribe("weldmes-webdataup", {
							onSuccess : function(e) {
								console.log("取消订阅成功");
							},
							onFailure : function(e) {
								console.log(e);
							}
						});
						if(parseInt(fan.substring(16,18),16)==1){
							for(var d=0;d<obj.total;i++){
								if(parseInt(obj.rows[d].gatherNo) == cxk){
									obj.rows[d].failnum = 2;
								}
							}
							$("#ro1").datagrid("loadData", obj);
						}else{
							for(var d=0;d<obj.total;d++){
								if(parseInt(obj.rows[d].gatherNo) == cxk){
									obj.rows[d].failnum = 1;
								}
							}
							$("#ro1").datagrid("loadData", obj);
						}
					}
				};
		} else {
			$('#divro').dialog('close');
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
	        $('#item').textbox('setValue',result.ary[0].name);
	    }  
	},  
	error : function(errorMsg) {  
	    alert("数据请求失败，请联系系统管理员!");  
	}  
	}); 
	
	//$("#item").textbox();
}

function waitQinTron() {
	var smachine = node11.id;
	rows = "";
	var rows = $("#ro").datagrid("getSelections");
	var str = "";
	for (var i = 0; i < rows.length; i++) {
		str += rows[i].id + ",";
	}
	;
	if (flag == 1) {
		var url = "wps/saveCopyrl?mac=" + smachine + "&str=" + str + "&chanel=" + "";
	} else {
		var chanel = $('#fchanel').numberbox('getValue');
		var url = "wps/saveCopyrl?mac=" + smachine + "&str=" + str + "&chanel=" + chanel;
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

function QinTronMaterial() {
	//选择材质监听
	$("#fmaterial").combobox({
		onSelect : function(record) {
			if (node11 != null) {
				if(firmaterial==1000){
				}else{
					gmaterial = record.value;

					if(machineModel==185 || machineModel==187 || machineModel==188){
						var gas = $('#fgas').combobox('getValue');
						var diameter = $('#fdiameter').combobox('getValue');
						var fselect = $('#fselect').combobox('getValue');
						if(record.value == 250 && gas==200 && diameter==135){
							if(fselect==101 || fselect==102){
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "101"
								}, {
									"text" : "一元",
									"value" : "102"
								} ]);
								$('#fselect').combobox('select', fselect);
							}else{
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "101"
								}, {
									"text" : "一元",
									"value" : "102"
								} ]);
								$('#fselect').combobox('select', 101);
							}
						}else if(record.value == 250 && gas==200 && diameter==131){
							var fselect = $('#fselect').combobox('getValue');
							if(fselect==101 || fselect==102){
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "101"
								}, {
									"text" : "一元",
									"value" : "102"
								} ]);
								$('#fselect').combobox('select', fselect);
							}else{
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "101"
								}, {
									"text" : "一元",
									"value" : "102"
								} ]);
								$('#fselect').combobox('select', 101);
							}
						}else if(record.value == 250 && gas==200 && diameter==132){
							var fselect = $('#fselect').combobox('getValue');
							if(fselect==101 || fselect==102){
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "101"
								}, {
									"text" : "一元",
									"value" : "102"
								} ]);
								$('#fselect').combobox('select', fselect);
							}else{
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "101"
								}, {
									"text" : "一元",
									"value" : "102"
								} ]);
								$('#fselect').combobox('select', 101);
							}
						}else{
							$('#fselect').combobox('clear');
							$('#fselect').combobox('loadData', [ {
								"text" : "个别",
								"value" : "101"
							}, {
								"text" : "一元",
								"value" : "102"
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
			}
		}
	});
}

function QinTronDiameter() {
	//选择丝径监听
	$("#fdiameter").combobox({
		onSelect : function(record) {
			if (node11 != null) {
				if(firdiameter==1000){
				}else{
					gdiameter = record.value;

					if(machineModel==185 || machineModel==187 || machineModel==188){
						var gas = $('#fgas').combobox('getValue');
						var material = $('#fmaterial').combobox('getValue');
						var fselect = $('#fselect').combobox('getValue');
						if(material == 250 && gas==200 && record.value==135){
							if(fselect==101 || fselect==102){
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "101"
								}, {
									"text" : "一元",
									"value" : "102"
								} ]);
								$('#fselect').combobox('select', fselect);
							}else{
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "101"
								}, {
									"text" : "一元",
									"value" : "102"
								} ]);
								$('#fselect').combobox('select', 101);
							}
						}else if(material == 250 && gas==200 && record.value==131){
							var fselect = $('#fselect').combobox('getValue');
							if(fselect==101 || fselect==102){
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "101"
								}, {
									"text" : "一元",
									"value" : "102"
								} ]);
								$('#fselect').combobox('select', fselect);
							}else{
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "101"
								}, {
									"text" : "一元",
									"value" : "102"
								} ]);
								$('#fselect').combobox('select', 101);
							}
						}else if(material == 250 && gas==200 && record.value==132){
							var fselect = $('#fselect').combobox('getValue');
							if(fselect==101 || fselect==102){
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "101"
								}, {
									"text" : "一元",
									"value" : "102"
								} ]);
								$('#fselect').combobox('select', fselect);
							}else{
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "101"
								}, {
									"text" : "一元",
									"value" : "102"
								} ]);
								$('#fselect').combobox('select', 101);
							}
						}else{
							$('#fselect').combobox('clear');
							$('#fselect').combobox('loadData', [ {
								"text" : "个别",
								"value" : "101"
							}, {
								"text" : "一元",
								"value" : "102"
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
							if(fselect==101 || fselect==102){
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "101"
								}, {
									"text" : "一元",
									"value" : "102"
								} ]);
								$('#fselect').combobox('select', fselect);
							}else{
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "101"
								}, {
									"text" : "一元",
									"value" : "102"
								} ]);
								$('#fselect').combobox('select', 101);
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
			}
		}
	});
}

function QinTronGas() {
	//选择气体监听
	$("#fgas").combobox({
		onSelect : function(record) {
			if (node11 != null) {
				if(firgas==1000){
				}else{
					ggas = record.value;
					if(machineModel==185 || machineModel==187 || machineModel==188){
						var material = $('#fmaterial').combobox('getValue');
						var diameter = $('#fdiameter').combobox('getValue');
						var fselect = $('#fselect').combobox('getValue');
						if(material == 250 && record.value==200 && diameter==135){
							if(fselect==101 || fselect==102){
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "101"
								}, {
									"text" : "一元",
									"value" : "102"
								} ]);
								$('#fselect').combobox('select', fselect);
							}else{
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "101"
								}, {
									"text" : "一元",
									"value" : "102"
								} ]);
								$('#fselect').combobox('select', 101);
							}
						}else if(material == 250 && record.value==200 && diameter==131){
							var fselect = $('#fselect').combobox('getValue');
							if(fselect==101 || fselect==102){
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "101"
								}, {
									"text" : "一元",
									"value" : "102"
								} ]);
								$('#fselect').combobox('select', fselect);
							}else{
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "101"
								}, {
									"text" : "一元",
									"value" : "102"
								} ]);
								$('#fselect').combobox('select', 101);
							}
						}else if(material == 250 && record.value==200 && diameter==132){
							var fselect = $('#fselect').combobox('getValue');
							if(fselect==101 || fselect==102){
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "101"
								}, {
									"text" : "一元",
									"value" : "102"
								} ]);
								$('#fselect').combobox('select', fselect);
							}else{
								$('#fselect').combobox('clear');
								$('#fselect').combobox('loadData', [ {
									"text" : "个别",
									"value" : "101"
								}, {
									"text" : "一元",
									"value" : "102"
								} ]);
								$('#fselect').combobox('select', 101);
							}
						}else{
							$('#fselect').combobox('clear');
							$('#fselect').combobox('loadData', [ {
								"text" : "个别",
								"value" : "101"
							}, {
								"text" : "一元",
								"value" : "102"
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
				}
			}
		}
	});
}

function QinTronSelect() {
	//选择模式监听
	$("#fselect").combobox({
		onSelect : function(record) {
			if (node11 != null) {
				if(firselect==1000){
				}else{
					gselect = record.value;

					if(record.value != 101 && record.value != 104){
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
					if(record.value == 102 &&　$('#fselectstep').combobox('getValue') == 108){
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
			}
		}
	});
}

function QinTronStep() {
	//选择step监听
	$("#fselectstep").combobox({
		onSelect : function(record) {
			if (node11 != null) {
				if(firselectstep==1000){
				}else{
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
						if($('#fselect').combobox('getValue') == 101){
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
					
					if(record.value == 108 && $('#fselect').combobox('getValue') == 102){
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
			}
		}
	});
}