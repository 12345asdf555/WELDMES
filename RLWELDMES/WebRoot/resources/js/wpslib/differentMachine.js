//WB-M350L
function WBML() {}
function WBMLGET(data) {}
function WBMLINIT() {}
function WBMLCHECK() {}

//WB-P400
function WBP() {}
function WBPGET(data) {}
function WBPINIT() {}
function WBPCHECK() {}

//WB-500L
function WBL() {}
function WBLGET(data) {}
function WBLINIT() {}
function WBLCHECK() {}

//EP-400
function EPS() {}
function EPSGET(data) {}
function EPSINIT() {}
function EPSCHECK() {}

//EP-500
function EPW() {}
function EPWGET(data) {}
function EPWINIT() {}
function EPWCHECK() {}

//CPVE-500
function CPVEW(wpslibId) {
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
			var chanel = parseInt(selectMainWpsRows[mwindex].fchanel).toString(16);
			if (chanel.length < 2) {
				var length = 2 - chanel.length;
				for (var i = 0; i < length; i++) {
					chanel = "0" + chanel;
				}
			}
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
			var fini_ele = parseInt(selectMainWpsRows[mwindex].fini_ele).toString(16);
			if (fini_ele.length < 4) {
				var length = 4 - fini_ele.length;
				for (var i = 0; i < length; i++) {
					fini_ele = "0" + fini_ele;
				}
			}
			var fini_vol = (parseFloat(selectMainWpsRows[mwindex].fini_vol) * 10).toString(16);
			if (fini_vol.length < 4) {
				var length = 4 - fini_vol.length;
				for (var i = 0; i < length; i++) {
					fini_vol = "0" + fini_vol;
				}
			}
			var fini_vol1 = parseInt(selectMainWpsRows[mwindex].fini_vol1).toString(16);
			if (fini_vol1.length < 4) {
				var length = 4 - fini_vol1.length;
				for (var i = 0; i < length; i++) {
					fini_vol1 = "0" + fini_vol1;
				}
			}
			var fweld_ele = parseInt(selectMainWpsRows[mwindex].fweld_ele).toString(16);
			if (fweld_ele.length < 4) {
				var length = 4 - fweld_ele.length;
				for (var i = 0; i < length; i++) {
					fweld_ele = "0" + fweld_ele;
				}
			}
			var fweld_vol = (parseFloat(selectMainWpsRows[mwindex].fweld_vol) * 10).toString(16);
			if (fweld_vol.length < 4) {
				var length = 4 - fweld_vol.length;
				for (var i = 0; i < length; i++) {
					fweld_vol = "0" + fweld_vol;
				}
			}
			var fweld_vol1 = parseInt(selectMainWpsRows[mwindex].fweld_vol1).toString(16);
			if (fweld_vol1.length < 4) {
				var length = 4 - fweld_vol1.length;
				for (var i = 0; i < length; i++) {
					fweld_vol1 = "0" + fweld_vol1;
				}
			}
			var farc_ele = parseInt(selectMainWpsRows[mwindex].farc_ele).toString(16);
			if (farc_ele.length < 4) {
				var length = 4 - farc_ele.length;
				for (var i = 0; i < length; i++) {
					farc_ele = "0" + farc_ele;
				}
			}
			var farc_vol = (parseFloat(selectMainWpsRows[mwindex].farc_vol) * 10).toString(16);
			if (farc_vol.length < 4) {
				var length = 4 - farc_vol.length;
				for (var i = 0; i < length; i++) {
					farc_vol = "0" + farc_vol;
				}
			}
			var farc_vol1 = parseInt(selectMainWpsRows[mwindex].farc_vol1).toString(16);
			if (farc_vol1.length < 4) {
				var length = 4 - farc_vol1.length;
				for (var i = 0; i < length; i++) {
					farc_vol1 = "0" + farc_vol1;
				}
			}
			var fhysteresis = (parseFloat(selectMainWpsRows[mwindex].fhysteresis) * 10).toString(16);
			if (fhysteresis.length < 4) {
				var length = 4 - fhysteresis.length;
				for (var i = 0; i < length; i++) {
					fhysteresis = "0" + fhysteresis;
				}
			}
			var fcharacter = parseInt(selectMainWpsRows[mwindex].fcharacter).toString(16);
			if (fcharacter.length < 4) {
				var length = 4 - fcharacter.length;
				for (var i = 0; i < length; i++) {
					fcharacter = "0" + fcharacter;
				}
			}
			//			alert($('#fgas').combobox('getValue'));
			var fgas = parseInt(selectMainWpsRows[mwindex].fgas).toString(16);
			if (fgas == parseInt(121).toString(16)) {
				fgas = "0";
			} else if (fgas == parseInt(122).toString(16)) {
				fgas = "1";
			} else {
				fgas = "3";
			}
			if (fgas.length < 2) {
				var length = 2 - fgas.length;
				for (var i = 0; i < length; i++) {
					fgas = "0" + fgas;
				}
			}
			//			alert($('#fdiameter').combobox('getValue'));
			var fdiameter = parseInt(selectMainWpsRows[mwindex].fdiameter).toString(16);
			if (fdiameter == parseInt(131).toString(16)) {
				fdiameter = "A";
			} else if (fdiameter == parseInt(132).toString(16)) {
				fdiameter = "C";
			} else if (fdiameter == parseInt(133).toString(16)) {
				fdiameter = "E";
			} else {
				fdiameter = "10";
			}
			if (fdiameter.length < 2) {
				var length = 2 - fdiameter.length;
				for (var i = 0; i < length; i++) {
					fdiameter = "0" + fdiameter;
				}
			}
			//			alert($('#fmaterial').combobox('getValue'));
			var fmaterial = parseInt(selectMainWpsRows[mwindex].fmaterial).toString(16);
			if (fmaterial == parseInt(91).toString(16)) {
				fmaterial = "0";
			} else if (fmaterial == parseInt(92).toString(16)) {
				fmaterial = "1";
			} else if (fmaterial == parseInt(93).toString(16)) {
				fmaterial = "4";
			} else {
				fmaterial = "5";
			}
			if (fmaterial.length < 2) {
				var length = 2 - fmaterial.length;
				for (var i = 0; i < length; i++) {
					fmaterial = "0" + fmaterial;
				}
			}
			var fweld_tuny_ele = parseInt(selectMainWpsRows[mwindex].fweld_tuny_ele).toString(16);
			if (fweld_tuny_ele.length < 2) {
				var length = 2 - fweld_tuny_ele.length;
				for (var i = 0; i < length; i++) {
					fweld_tuny_ele = "0" + fweld_tuny_ele;
				}
			}
			var fwarn_ele_up = parseInt(selectMainWpsRows[mwindex].fwarn_ele_up).toString(16);
			if (fwarn_ele_up.length < 4) {
				var length = 4 - fwarn_ele_up.length;
				for (var i = 0; i < length; i++) {
					fwarn_ele_up = "0" + fwarn_ele_up;
				}
			}
			var fwarn_ele_down = parseInt(selectMainWpsRows[mwindex].fwarn_ele_down).toString(16);
			if (fwarn_ele_down.length < 4) {
				var length = 4 - fwarn_ele_down.length;
				for (var i = 0; i < length; i++) {
					fwarn_ele_down = "0" + fwarn_ele_down;
				}
			}
			var fwarn_vol_up = (parseFloat(selectMainWpsRows[mwindex].fwarn_vol_up) * 10).toString(16);
			if (fwarn_vol_up.length < 4) {
				var length = 4 - fwarn_vol_up.length;
				for (var i = 0; i < length; i++) {
					fwarn_vol_up = "0" + fwarn_vol_up;
				}
			}
			var fwarn_vol_down = (parseFloat(selectMainWpsRows[mwindex].fwarn_vol_down) * 10).toString(16);
			if (fwarn_vol_down.length < 4) {
				var length = 4 - fwarn_vol_down.length;
				for (var i = 0; i < length; i++) {
					fwarn_vol_down = "0" + fwarn_vol_down;
				}
			}
			if (selectMainWpsRows[mwindex].fselect == 102) {
				var fweld_tuny_vol = (parseFloat(selectMainWpsRows[mwindex].fweld_tuny_vol) * 10).toString(16);
				var farc_tuny_vol = (parseFloat(selectMainWpsRows[mwindex].farc_tuny_vol) * 10).toString(16);
			} else {
				var fweld_tuny_vol = parseInt(selectMainWpsRows[mwindex].fweld_tuny_vol).toString(16);
				var farc_tuny_vol = parseInt(selectMainWpsRows[mwindex].farc_tuny_vol).toString(16);
			}
			if (fweld_tuny_vol.length < 2) {
				var length = 2 - fweld_tuny_vol.length;
				for (var i = 0; i < length; i++) {
					fweld_tuny_vol = "0" + fweld_tuny_vol;
				}
			}
			var farc_tuny_ele = parseInt(selectMainWpsRows[mwindex].farc_tuny_ele).toString(16);
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
			var con = "";
			if (selectMainWpsRows[mwindex].finitial == "是") {
				con = "1" + con;
			} else {
				con = "0" + con;
			}
			if (selectMainWpsRows[mwindex].farc == 111) {
				con = "0000" + con;
			} else if (selectMainWpsRows[mwindex].farc == 112) {
				con = "0001" + con;
			} else if (selectMainWpsRows[mwindex].farc == 113) {
				con = "0010" + con;
			} else {
				con = "0100" + con;
			}
			if (selectMainWpsRows[mwindex].fselect == 101) {
				con = "1" + con;
			} else {
				con = "0" + con;
			}
			if (selectMainWpsRows[mwindex].fcontroller == "是") {
				con = "1" + con;
			} else {
				con = "0" + con;
			}
			if (selectMainWpsRows[mwindex].fmode == "是") {
				con = "1" + con;
			} else {
				con = "0" + con;
			}
			con = parseInt(con, 2);
			con = parseInt(con).toString(16);
			if (con.length < 2) {
				var length = 2 - con.length;
				for (var i = 0; i < length; i++) {
					con = "0" + con;
				}
			}

			var mach = parseInt(selectMachine[smindex].gatherId).toString(16);
			if (mach.length < 4) {
				var length = 4 - mach.length;
				for (var i = 0; i < length; i++) {
					mach = "0" + mach;
				}
				;
			}

			var xiafasend1 = mach + chanel + ftime + fadvance + fini_ele + fini_vol + fini_vol1 + fweld_ele + fweld_vol + fweld_vol1 + farc_ele + farc_vol + farc_vol1 + fhysteresis + fcharacter + fgas
				+ fdiameter + fmaterial + "0000" + con + fweld_tuny_ele + fweld_tuny_vol + farc_tuny_ele + farc_tuny_vol + fwarn_ele_up + fwarn_vol_up
				+ fwarn_ele_down + fwarn_vol_down;

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
	var websocket = null;
	if (typeof (WebSocket) == "undefined") {
		WEB_SOCKET_SWF_LOCATION = "resources/js/WebSocketMain.swf";
		WEB_SOCKET_DEBUG = true;
	}
	websocket = new WebSocket(websocketUrl);
	websocket.onopen = function() {
		var oneMinuteTimer = window.setTimeout(function() {
			alert("部分焊机下发超时");
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
		}, 30000);
		showResult();
		$("#giveResultTable").datagrid('loadData', resultData);
		var timer = window.setInterval(function() {
			if (sochet_send_data.length != 0) {
				var popdata = sochet_send_data.pop();
				websocket.send(popdata);
			} else {
				window.clearInterval(timer);
			}
		}, 300)
		websocket.onmessage = function(msg) {
			var fan = msg.data;
			if (fan.substring(0, 2) == "7E" && fan.substring(10, 12) == "52") {
				var rows = $('#giveResultTable').datagrid("getRows");
				if (parseInt(fan.substring(18, 20), 16) == 1) {
					realLength++;
					var frchanel = parseInt(fan.substring(16, 18), 16);
					var indexNum = $.inArray(parseInt(fan.substring(12, 16), 16),giveArray);
//					var indexNum = giveArray.indexOf(parseInt(fan.substring(12, 16), 16));
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
						websocket.close();
						if (websocket.readyState != 1) {
							window.clearTimeout(oneMinuteTimer);
							$.ajax({  
							      type : "post",  
							      async : false,
							      url : "wps/saveGiveWpsHistory", 
							      data : {mainwps:JSON.stringify(selectMainWpsRows),machine:JSON.stringify(selectMachine),wpslib:wpslibId,flag:0},  
							      dataType : "json", //返回数据形式为json  
							      success : function(result) {
							          if (result.success) {
											alert("下发完成");
							          } else{
							        	  	alert("下发完成，存储下发记录失败")
							          }
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
							      },  
							      error : function(errorMsg) {  
							          alert("数据请求失败，请联系系统管理员!");  
							      }  
							 }); 
						}
					}
				} else {
					realLength++;
					var frchanel = parseInt(fan.substring(16, 18), 16);
					var indexNum = $.inArray(parseInt(fan.substring(12, 16), 16),giveArray);
//					var indexNum = giveArray.indexOf(parseInt(fan.substring(12, 16), 16));
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
						websocket.close();
						if (websocket.readyState != 1) {
							window.clearTimeout(oneMinuteTimer);
							$.ajax({  
							      type : "post",  
							      async : false,
							      url : "wps/saveGiveWpsHistory", 
							      data : {mainwps:JSON.stringify(selectMainWpsRows),machine:JSON.stringify(selectMachine),wpslib:wpslibId,flag:0},  
							      dataType : "json", //返回数据形式为json  
							      success : function(result) {
							          if (result.success) {
											alert("下发完成");
							          } else{
							        	  	alert("下发完成，存储下发记录失败")
							          }
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
function CPVEWGET(data) {
	$('#fchanel').combobox('select', parseInt(data.substring(18, 20), 16));
	$("#ftime").numberbox('setValue', (parseInt(data.substring(20, 24), 16) / 10).toFixed(1));
	$("#fadvance").numberbox('setValue', (parseInt(data.substring(24, 28), 16) / 10).toFixed(1));
	$("#fini_ele").numberbox('setValue', parseInt(data.substring(28, 32), 16));
	$("#fini_vol").numberbox('setValue', (parseInt(data.substring(32, 36), 16) / 10).toFixed(1));
	$("#fini_vol1").numberbox('setValue', parseInt(data.substring(36, 40), 16).toFixed(1));
	$("#fweld_ele").numberbox('setValue', parseInt(data.substring(40, 44), 16));
	$("#fweld_vol").numberbox('setValue', (parseInt(data.substring(44, 48), 16) / 10).toFixed(1));
	$("#fweld_vol1").numberbox('setValue', parseInt(data.substring(48, 52), 16).toFixed(1));
	$("#farc_ele").numberbox('setValue', parseInt(data.substring(52, 56), 16));
	$("#farc_vol").numberbox('setValue', (parseInt(data.substring(56, 60), 16) / 10).toFixed(1));
	$("#farc_vol1").numberbox('setValue', parseInt(data.substring(60, 64), 16).toFixed(1));
	$("#fhysteresis").numberbox('setValue', (parseInt(data.substring(64, 68), 16) / 10).toFixed(1));
	$("#fcharacter").numberbox('setValue', parseInt(data.substring(68, 72), 16));
	if (parseInt(data.substring(72, 74), 16) == 0) {
		$('#fgas').combobox('select', 121);
	} else if (parseInt(data.substring(72, 74), 16) == 1) {
		$('#fgas').combobox('select', 122);
	} else {
		$('#fgas').combobox('select', 124);
	}
	if (parseInt(data.substring(74, 76), 16) == 10) {
		$('#fdiameter').combobox('select', 131);
	} else if (parseInt(data.substring(74, 76), 16) == 12) {
		$('#fdiameter').combobox('select', 132);
	} else if (parseInt(data.substring(74, 76), 16) == 14) {
		$('#fdiameter').combobox('select', 133);
	} else {
		$('#fdiameter').combobox('select', 134);
	}
	if (parseInt(data.substring(76, 78), 16) == 0) {
		$('#fmaterial').combobox('select', 91);
	} else if (parseInt(data.substring(76, 78), 16) == 1) {
		$('#fmaterial').combobox('select', 92);
	} else if (parseInt(data.substring(76, 78), 16) == 4) {
		$('#fmaterial').combobox('select', 93);
	} else {
		$('#fmaterial').combobox('select', 94);
	}
	var sconx = parseInt(data.substring(82, 84), 16);
	sconx = sconx.toString(2);
	if (sconx.length < 8) {
		var length = 8 - sconx.length;
		for (var i = 0; i < length; i++) {
			sconx = "0" + sconx;
		}
	}
	if (sconx.substring(7, 8) == "1") {
		$("#finitial").prop("checked", true);
	} else {
		$("#finitial").prop("checked", false);
	}
	if (sconx.substring(6, 7) == "0") {
		$('#farc').combobox('select', 111);
	} else {
		$('#farc').combobox('select', 112);
	}
	if (sconx.substring(5, 6) == "1") {
		$('#farc').combobox('select', 113);
	}
	if (sconx.substring(4, 5) == "1") {
		$('#farc').combobox('select', 114);
	}
	if (sconx.substring(2, 3) == "0") {
		$('#fselect').combobox('select', 102);
	} else {
		$('#fselect').combobox('select', 101);
	}
	if (sconx.substring(1, 2) == "1") {
		$("#fcontroller").prop("checked", true);
	} else {
		$("#fcontroller").prop("checked", false);
	}
	if (sconx.substring(0, 1) == "1") {
		$("#fmode").prop("checked", true);
	} else {
		$("#fmode").prop("checked", false);
	}
	$("#fweld_tuny_ele").numberbox('setValue', parseInt(data.substring(84, 86), 16));
	$("#farc_tuny_ele").numberbox('setValue', parseInt(data.substring(88, 90), 16));
	$("#fwarn_ele_up").numberbox('setValue', parseInt(data.substring(92, 96), 16));
	$("#fwarn_ele_down").numberbox('setValue', parseInt(data.substring(100, 104), 16));
	$("#fwarn_vol_up").numberbox('setValue', (parseInt(data.substring(96, 100), 16) / 10).toFixed(1));
	$("#fwarn_vol_down").numberbox('setValue', (parseInt(data.substring(104, 108), 16) / 10).toFixed(1));
	if (sconx.substring(2, 3) == "0") {
		$("#fweld_tuny_vol").numberbox('setValue', (parseInt(data.substring(86, 88), 16) / 10).toFixed(1));
		$("#farc_tuny_vol").numberbox('setValue', (parseInt(data.substring(90, 92), 16) / 10).toFixed(1));
	} else {
		$("#fweld_tuny_vol").numberbox('setValue', parseInt(data.substring(86, 88), 16));
		$("#farc_tuny_vol").numberbox('setValue', parseInt(data.substring(90, 92), 16));
	}
}
function CPVEWINIT() {
	$('#fchanel').combobox('clear');
	var str = "";
	for (var i = 1; i < 31; i++) {
		str += '<option value="' + i + '">通道号' + i + '</option>';
	}
	$('#fchanel').append(str);
	$('#fchanel').combobox();
	$('#farc').combobox('clear');
	$('#farc').combobox('loadData', [ {
		"text" : "无",
		"value" : "111"
	}, {
		"text" : "有",
		"value" : "112"
	}, {
		"text" : "反复",
		"value" : "113"
	}, {
		"text" : "点焊",
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
		"text" : "MIG_2O2",
		"value" : "124"
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
	} ]);
	$('#fweldprocess').combobox('clear');
	$('#fweldprocess').combobox('loadData', [ {
		"text" : "直流",
		"value" : "1"
	} ]);
	$('#fchanel').combobox('select', 1);
	$("#fmode").prop("checked", false);
	$("#finitial").prop("checked", false);
	$("#fcontroller").prop("checked", false);
	$("#ftorch").prop("checked", false);
	$('#fselect').combobox('select', 102);
	$("#ftime").numberbox('setValue', 3.0);
	$("#fadvance").numberbox('setValue', 0.1);
	$("#fini_ele").numberbox('setValue', 100);
	$("#fini_vol").numberbox('setValue', 19.0);
	$("#fini_vol1").numberbox('setValue', 0.0);
	$("#fweld_vol").numberbox('setValue', 19.0);
	$("#fweld_vol1").numberbox('setValue', 0.0);
	$("#farc_vol").numberbox('setValue', 19.0);
	$("#farc_vol1").numberbox('setValue', 0.0);
	$("#fweld_ele").numberbox('setValue', 100);
	$("#farc_ele").numberbox('setValue', 100);
	$("#fhysteresis").numberbox('setValue', 0.1);
	$("#fcharacter").numberbox('setValue', 0);
	$('#fgas').combobox('select', 121);
	$('#fdiameter').combobox('select', 132);
	$('#fmaterial').combobox('select', 91);
	$("#fweld_tuny_ele").numberbox('setValue', 0);
	$("#fweld_tuny_vol").numberbox('setValue', 0);
	$("#farc_tuny_ele").numberbox('setValue', 0);
	$("#farc_tuny_vol").numberbox('setValue', 0);
	$("#fwarn_ele_up").numberbox('setValue', 150);
	$("#fwarn_ele_down").numberbox('setValue', 100);
	$("#fwarn_vol_up").numberbox('setValue', 24);
	$("#fwarn_vol_down").numberbox('setValue', 14);
	$('#farc').combobox('select', 111);
	$('#fweldprocess').combobox('select', 0);
	/*$("#frequency").numberbox('setValue', 3);
	$("#gasflow").numberbox('setValue', 15);*/
	$('#dtorch').hide();
	$('#itorch').hide();
	$('#dmodel').show();
	$('#imodel').show();
	$('#dgasflow').hide();
	$('#igasflow').hide();
	$('#dfrequency').hide();
	$('#ifrequency').hide();
}
function CPVEWCHECK() {
	if ($('#ftime').numberbox('getValue') < 0.1 || $('#ftime').numberbox('getValue') > 10) {
		alert("点焊时间：0.1~10");
		return false;
	}
	if ($('#fadvance').numberbox('getValue') < 0 || $('#fadvance').numberbox('getValue') > 10) {
		alert("提前送气范围：0~10");
		return false;
	}
	if ($('#fini_ele').numberbox('getValue') < 30 || $('#fini_ele').numberbox('getValue') > 550) {
		alert("初期电流范围：30~550");
		return false;
	}
	if ($('#fini_vol').numberbox('getValue') < 12 || $('#fini_vol').numberbox('getValue') > 50) {
		alert("初期电压范围：12~50");
		return false;
	}
	if ($('#fini_vol1').numberbox('getValue') < (-30) || $('#fini_vol1').numberbox('getValue') > (30)) {
		alert("初期电压一元范围：-30~30");
		return false;
	}
	if ($('#fweld_ele').numberbox('getValue') < 30 || $('#fweld_ele').numberbox('getValue') > 550) {
		alert("焊接电流范围：30~550");
		return false;
	}
	if ($('#fweld_vol').numberbox('getValue') < 12 || $('#fweld_vol').numberbox('getValue') > 50) {
		alert("焊接电压范围：12~50");
		return false;
	}
	if ($('#fweld_vol1').numberbox('getValue') < (-30) || $('#fweld_vol1').numberbox('getValue') > (30)) {
		alert("焊接电压一元范围：-30~30");
		return false;
	}
	if ($('#farc_ele').numberbox('getValue') < 30 || $('#farc_ele').numberbox('getValue') > 550) {
		alert("收弧电流范围：30~550");
		return false;
	}
	if ($('#farc_vol').numberbox('getValue') < 12 || $('#farc_vol').numberbox('getValue') > 50) {
		alert("收弧电压范围：12~50");
		return false;
	}
	if ($('#farc_vol1').numberbox('getValue') < (-30) || $('#farc_vol1').numberbox('getValue') > (30)) {
		alert("收弧电压一元范围：-30~30");
		return false;
	}
	if ($('#fhysteresis').numberbox('getValue') < 0.1 || $('#fhysteresis').numberbox('getValue') > 10) {
		alert("滞后送气范围：0.1~10");
		return false;
	}
	if ($('#fcharacter').numberbox('getValue') < (-99) || $('#fcharacter').numberbox('getValue') > (99)) {
		alert("电弧特性范围：-99~99");
		return false;
	}
	/*if ($('#frequency').numberbox('getValue') < (0.5) || $('#frequency').numberbox('getValue') > (32)) {
		alert("双脉冲频率范围：0.5~32");
		return false;
	}
	if ($('#gasflow').numberbox('getValue') < (5) || $('#gasflow').numberbox('getValue') > (50)) {
		alert("气体流量范围：5~50");
		return;
	}*/
	if ($('#fweld_tuny_ele').numberbox('getValue') < (0) || $('#fweld_tuny_ele').numberbox('getValue') > (50)) {
		alert("焊接电流微调范围：0~50");
		return false;
	}
	if ($('#farc_tuny_ele').numberbox('getValue') < (0) || $('#farc_tuny_ele').numberbox('getValue') > (50)) {
		alert("收弧电流微调范围：0~50");
		return false;
	}
/*	if ($('#fwarn_tuny_ele').numberbox('getValue') < (0) || $('#fwarn_tuny_ele').numberbox('getValue') > (250)) {
		alert("报警电流微调范围：0~250");
		return false;
	}
	if ($('#fwarn_tuny_vol').numberbox('getValue') < (0) || $('#fwarn_tuny_vol').numberbox('getValue') > (25)) {
		alert("报警电压微调范围：0~25");
		return false;
	}*/
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

//CPVE-400
function CPVES() {}
function CPVESGET(data) {}
function CPVESINIT() {}
function CPVESCHECK() {}

//CPVE-250
function CPVET() {}
function CPVETGET(data) {}
function CPVETINIT() {}
function CPVETCHECK() {}

//瑞林
function QinTronINIT(value) {
	$('#fchanel').combobox('clear');
	var ary = new Array();
	for (var i = 1; i < 11; i++) {
		ary.push({
			"text" : "JOB号"+i,
			"value" : i+""
		});
	}
	$('#fchanel').combobox('loadData', ary);//清空option选项 
	$('#fchanel').combobox('select', "1");
	if(machineModel == 185){
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
	}else if(machineModel == 187){
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
	}else if(machineModel == 188){
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
	}else if(machineModel == 189){
		$('#fselect').combobox('clear');
		$('#fselect').combobox('loadData', [ {
			"text" : "个别",
			"value" : "102"
		}, {
			"text" : "一元",
			"value" : "101"
		} ]);
	}else if(machineModel == 190){
		$('#fselect').combobox('clear');
		$('#fselect').combobox('loadData', [ {
			"text" : "个别",
			"value" : "102"
		}, {
			"text" : "一元",
			"value" : "101"
		} ]);
	}else if(machineModel == 191){
		$('#fselect').combobox('clear');
		$('#fselect').combobox('loadData', [ {
			"text" : "个别",
			"value" : "102"
		}, {
			"text" : "一元",
			"value" : "101"
		} ]);
	}

	$('#fselect').combobox('unselect', '102');
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
	$('#fselect').combobox('select', 102);
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
}

//YD-500GR3 验证
function checkSxWps() {
	var wpsLibRow = $('#wpslibTable').datagrid('getSelected');
	if ($('#sxchanel').val() != $('#sxfwpsnum').combobox('getValue')) {
		var num;
		$.ajax({
			type : "post",
			async : false,
			url : "wps/getCountByWpslibidChanel?wpslibid=" + wpsLibRow.fid + "&chanel=" + $('#sxfwpsnum').combobox('getValue'),
			data : {},
			dataType : "json", //返回数据形式为json  
			success : function(result) {
				if (result) {
					num = eval(result.count);
				}
			},
			error : function(errorMsg) {
				alert("数据请求失败，请联系系统管理员!");
			}
		});
		if (num > 0) {
			alert("该通道规范已经存在!!!");
			return false;
		}
	}
	if ($("#sxfflow_top").numberbox('getValue') < 0.1 || $("#sxfflow_top").numberbox('getValue') > 25) {
		alert("流量上限范围：0.1~25.0");
		return false;
	}
	if ($("#sxfflow_bottom").numberbox('getValue') < 0.1 || $("#sxfflow_bottom").numberbox('getValue') > 25) {
		alert("流量下限范围：0.1~25.0");
		return false;
	}
	if ($("#sxfdelay_time").numberbox('getValue') < 0.1 || $("#sxfdelay_time").numberbox('getValue') > 25) {
		alert("延时时间范围：0.1~25.0");
		return false;
	}
	if ($("#sxfover_time").numberbox('getValue') < 0.1 || $("#sxfover_time").numberbox('getValue') > 25) {
		alert("超限时间范围：0.1~25.0");
		return false;
	}
	if ($("#sxffixed_cycle").numberbox('getValue') < 0.1 || $("#sxffixed_cycle").numberbox('getValue') > 10) {
		alert("修正周期范围：0.1~10.0");
		return false;
	}
	if ($("#sxfarc_delay_time").numberbox('getValue') < 0.1 || $("#sxfarc_delay_time").numberbox('getValue') > 3) {
		alert("起弧延时时间范围：0.1~3.0");
		return false;
	}
	if ($("#sxfwarn_delay_time").numberbox('getValue') < 0.1 || $("#sxfwarn_delay_time").numberbox('getValue') > 25) {
		alert("报警延时时间范围：0.1~25.0");
		return false;
	}
	if ($("#sxfwarn_stop_time").numberbox('getValue') < 0.1 || $("#sxfwarn_stop_time").numberbox('getValue') > 25) {
		alert("报警停机时间范围：0.1~25.0");
		return false;
	}
}