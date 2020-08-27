var machga,websocketUrl;
$(function(){
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
})

//所有焊丝材质
function fmaterial_1(){
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
}

//焊丝材质91-92
function fmaterial_2(){
	$('#fmaterial').combobox('clear');
	$('#fmaterial').combobox('loadData', [ {
		"text" : "低碳钢实芯",
		"value" : "91"
	}, {
		"text" : "不锈钢实芯",
		"value" : "92"
	} ]);
}

function fmaterial_3(){
	$('#fmaterial').combobox('clear');
	$('#fmaterial').combobox('loadData', [ {
		"text" : "低碳钢实芯",
		"value" : "91"
	}, {
		"text" : "低碳钢药芯",
		"value" : "93"
	}, {
		"text" : "不锈钢药芯",
		"value" : "94"
	} ]);
}


function fmaterial_5(){
	$('#fmaterial').combobox('clear');
	$('#fmaterial').combobox('loadData', [{
		"text" : "纯铝",
		"value" : "94"
	},{
		"text" : "铝镁合金",
		"value" : "96"
	},{
		"text" : "铜硅钎焊",
		"value" : "97"
	}]);
}

function fmaterial_6(){
	$('#fmaterial').combobox('clear');
	$('#fmaterial').combobox('loadData', [ {
		"text" : "低碳钢实芯",
		"value" : "91"
	} ]);
}

function fprocess_1(){
	$('#fweldparameters').combobox('clear');
	$('#fweldparameters').combobox('loadData', [ {
		"text" : "普通碳钢实芯CO2 100%",
		"value" : "0"
	}, {
		"text" : "普通碳钢实芯Ar 80% + CO2 20%",
		"value" : "1"
	},{
		"text" : "普通碳钢药芯CO2 100%",
		"value" : "2"
	}]);
}

function fprocess_2(){
	$('#fweldparameters').combobox('clear');
	$('#fweldparameters').combobox('loadData', [ {
		"text" : "脉冲碳钢实芯Ar 90% + CO2 10%",
		"value" : "3"
	},{
		"text" : "脉冲不锈钢钢实芯Ar 98% + CO2 2%",
		"value" : "4"
	},{
		"text" : "脉冲铝镁实芯Ar 100% ER5356",
		"value" : "5"
	},{
		"text" : "脉冲铝硅实芯Ar 100% ER4043",
		"value" : "6"
	}]);
}

//气体121-122
function fgas_1(){
	$('#fgas').combobox('clear');
	$('#fgas').combobox('loadData', [ {
		"text" : "CO2",
		"value" : "121"
	}, {
		"text" : "MAG",
		"value" : "122"
	} ]);
}

function fgas_2(){
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
}

function fdiameter_1(){
	$('#fdiameter').combobox('clear');
	$('#fdiameter').combobox('loadData', [ {
		"text" : "Φ0.9",
		"value" : "136"
	}, {
		"text" : "Φ1.0",
		"value" : "131"
	}, {
		"text" : "Φ1.2",
		"value" : "132"
	} ]);
}

function fdiameter_2(){
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
	} ]);
}

function fdiameter_3(){
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
}

function fdiameter_4(){
	$('#fdiameter').combobox('clear');
	$('#fdiameter').combobox('loadData', [ {
		"text" : "Φ1.2",
		"value" : "132"
	}, {
		"text" : "Φ1.6",
		"value" : "134"
	} ]);
}

function fdiameter_5(){
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
}

function fdiameter_6(){
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
}

function fdiameter_7(){
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
}

function fdiameter_8(){
	$('#fdiameter').combobox('clear');
	$('#fdiameter').combobox('loadData', [ {
		"text" : "Φ0.9",
		"value" : "136"
	}, {
		"text" : "Φ1.2",
		"value" : "132"
	}, {
		"text" : "Φ1.6",
		"value" : "134"
	} ]);
}

function fdiameter_9(){
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
		"text" : "Φ1.6",
		"value" : "134"
	} ]);
}
function fdiameter_10(){
	$('#fdiameter').combobox('clear');
	$('#fdiameter').combobox('loadData', [ {
		"text" : "Φ1.0",
		"value" : "131"
	}]);
}
function fdiameter_11(){
	$('#fdiameter').combobox('clear');
	$('#fdiameter').combobox('loadData', [ {
		"text" : "Φ1.0",
		"value" : "131"
	}, {
		"text" : "Φ1.2",
		"value" : "132"
	}]);
}
//所有气体
function fgas_3(){
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
}

function fgas_4(){
	$('#fgas').combobox('clear');
	$('#fgas').combobox('loadData', [ {
		"text" : "MAG",
		"value" : "122"
	}, {
		"text" : "MIG",
		"value" : "123"
	}, {
		"text" : "MIG_2O2",
		"value" : "124"
	} ]);
}

function fgas_5(){
	$('#fgas').combobox('clear');
	$('#fgas').combobox('loadData', [ {
		"text" : "MIG",
		"value" : "122"
	}, {
		"text" : "MAG",
		"value" : "121"
	}, {
		"text" : "MIG_202",
		"value" : "123"
	}, {
		"text" : "MIG_2CO2",
		"value" : "124"
	} ]);
}

function fgas_6(){
	$('#fgas').combobox('clear');
	$('#fgas').combobox('loadData', [{
		"text" : "MIG_2CO2",
		"value" : "124"
	},{
		"text" : "MAG",
		"value" : "121"
	}, {
		"text" : "MIG_202",
		"value" : "123"
	}]);
}
function fgas_7(){
	$('#fgas').combobox('clear');
	$('#fgas').combobox('loadData', [ {
		"text" : "MAG",
		"value" : "122"
	}]);
}
function fselect_1(){
	$('#fselect').combobox('clear');
	$('#fselect').combobox('loadData', [ {
		"text" : "一元",
		"value" : "101"
	},{
		"text" : "个别",
		"value" : "102"
	}]);
}