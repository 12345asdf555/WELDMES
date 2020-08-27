function comboboxCheck(machineModel){
	if(machineModel == 172){//CPVE-400
		CPVESGET_combobox();
	}else if(machineModel  == 173){//CPVE-250
		CPVETGET_combobox();
	}else if(machineModel == 174){//EP-500
		EPWINIT_combobox();
	}else if(machineModel == 175){//EP-400
		EPSINIT_combobox();
	}else if(machineModel == 176){//WB-M350L
		WBMLINIT_combobox();
	}else if(machineModel == 177){//WB-P400
		WBPINIT_combobox();
	}else if(machineModel == 178){//WB-500L
		WBLINIT_combobox();
	}else if(machineModel == 182){//WB-W400L
		WBWINIT_combobox();
	}else if(machineModel == 184){//上汽通用
		SPCINIT_combobox();
	}else{
		CPVEWGET_combobox();
	}
}

function SPCINIT_combobox(){
	//清空改变事件
/*	$("#pulse").combobox({//双脉冲
		onChange:function(){
			var pulse = $("#pulse").combobox('getValue');
			if(pulse == 0){//脉冲
				fprocess_1();
			}else if(pulse == 1){
				fprocess_2();
			}
			var data = $('#fweldparameters').combobox('getData');
			$('#fweldparameters').combobox('select',data[0].value);
		}
	})*/
	$("#fweldparameters").combobox({
		onChange:function(){
//			var pulse = $("#pulse").combobox('getValue');
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
//	$('#pulse').combobox('select', 0);
//	fprocess_1();
	var data = $('#fweldparameters').combobox('getData');
	$('#fweldparameters').combobox('select',data[1].value);
}

function WBLINIT_combobox(){
	//清空改变事件
	$("#fweldprocess").combobox({//焊接方法
		onChange : function() {
			var fweldprocess = $("#fweldprocess").combobox('getValue');
			if(fweldprocess == 1){//直流
				fgas_3();
			}else if(fweldprocess == 2){
				fgas_2();
			}else if(fweldprocess == 0 || fweldprocess == 3){
				fgas_4();
			}
			var data = $('#fgas').combobox('getData');
			$('#fgas').combobox('select',data[0].value);
		}
	})
	$("#fgas").combobox({//气体
		onChange : function() {
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
			}
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
			}
			var data = $('#fdiameter').combobox('getData');
			$('#fdiameter').combobox('select',data[0].value);
		}
	})
	$('#fweldprocess').combobox('select', 0);
	fgas_4();
	var data = $('#fgas').combobox('getData');
	$('#fgas').combobox('select',data[0].value);
}

function WBWINIT_combobox(){
	//清空改变事件
	$("#fweldprocess").combobox({//焊接方法
		onChange : function() {
			var fweldprocess = $("#fweldprocess").combobox('getValue');
			if(fweldprocess == 1){//直流
				fgas_6();
			}else if(fweldprocess == 0 || fweldprocess == 9 || fweldprocess == 3 || fweldprocess == 10){
				fgas_5();
			}
			var data = $('#fgas').combobox('getData');
			$('#fgas').combobox('select',data[0].value);
		}
	})
	$("#fgas").combobox({//气体
		onChange : function() {
			var fweldprocess = $("#fweldprocess").combobox('getValue');
			var fgas = $("#fgas").combobox('getValue');
			if(fweldprocess == 1){
				if(fgas == 124){//MIG_2CO2
					$('#fmaterial').combobox('clear');
					$('#fmaterial').combobox('loadData', [ {
						"text" : "不锈钢实芯",
						"value" : "92"
					}]);
				}else if(fgas == 123){
					$('#fmaterial').combobox('clear');
					$('#fmaterial').combobox('loadData', [ {
						"text" : "不锈钢实芯",
						"value" : "92"
					}, {
						"text" : "铁素体不锈钢实芯",
						"value" : "93"
					}]);
				}else if(fgas == 121){
					$('#fmaterial').combobox('clear');
					$('#fmaterial').combobox('loadData', [ {
						"text" : "低碳钢实芯",
						"value" : "91"
					}]);
				}
				var data = $('#fmaterial').combobox('getData');
				$('#fmaterial').combobox('select',data[0].value);
			}else if(fweldprocess == 0){
				if(fgas == 122){
					fmaterial_5();
				}else if(fgas == 123){
					$('#fmaterial').combobox('clear');
					$('#fmaterial').combobox('loadData', [{
						"text" : "铁素体不锈钢实芯",
						"value" : "93"
					},{
						"text" : "不锈钢实芯",
						"value" : "92"
					}]);
				}else if(fgas == 121){
					$('#fmaterial').combobox('clear');
					$('#fmaterial').combobox('loadData', [{
						"text" : "低碳钢实芯",
						"value" : "91"
					}]);
				}else if(fgas == 124){
					$('#fmaterial').combobox('clear');
					$('#fmaterial').combobox('loadData', [ {
						"text" : "不锈钢实芯",
						"value" : "92"
					} ]);
				}
				var data = $('#fmaterial').combobox('getData');
				$('#fmaterial').combobox('select',data[0].value);
			}else if(fweldprocess == 3){
				if(fgas == 122){
					$('#fmaterial').combobox('clear');
					$('#fmaterial').combobox('loadData', [ {
						"text" : "纯铝",
						"value" : "94"
					},{
						"text" : "铝镁合金",
						"value" : "96"
					}]);
				}else if(fgas == 123){
					$('#fmaterial').combobox('clear');
					$('#fmaterial').combobox('loadData', [{
						"text" : "不锈钢实芯",
						"value" : "92"
					},{
						"text" : "铁素体不锈钢",
						"value" : "93"
					}]);
				}else if(fgas == 121){
					$('#fmaterial').combobox('clear');
					$('#fmaterial').combobox('loadData', [{
						"text" : "低碳钢实芯",
						"value" : "91"
					} ]);
				}else if(fgas == 124){
					$('#fmaterial').combobox('clear');
					$('#fmaterial').combobox('loadData', [{
						"text" : "不锈钢实芯",
						"value" : "92"
					}]);
				}
				var data = $('#fmaterial').combobox('getData');
				$('#fmaterial').combobox('select',data[0].value);
			}else if(fweldprocess == 9){//交流脉冲
				if(fgas == 122){
					fmaterial_5();
				}else if(fgas == 123){
					$('#fmaterial').combobox('clear');
					$('#fmaterial').combobox('loadData', [{
						"text" : "不锈钢实芯",
						"value" : "92"
					},{
						"text" : "铁素体不锈钢实芯",
						"value" : "93"
					}]);
				}else if(fgas == 121){
					$('#fmaterial').combobox('clear');
					$('#fmaterial').combobox('loadData', [{
						"text" : "低碳钢实芯",
						"value" : "91"
					} ]);
				}else if(fgas == 124){
					$('#fmaterial').combobox('clear');
					$('#fmaterial').combobox('loadData', [{
						"text" : "不锈钢实芯",
						"value" : "92"
					}]);
				}
				var data = $('#fmaterial').combobox('getData');
				$('#fmaterial').combobox('select',data[0].value);
			}else if(fweldprocess == 10){//交流双脉冲
				if(fgas == 122){
					$('#fmaterial').combobox('clear');
					$('#fmaterial').combobox('loadData', [{
						"text" : "纯铝",
						"value" : "94"
					},{
						"text" : "铝镁合金",
						"value" : "96"
					}]);
				}else if(fgas == 123){
					$('#fmaterial').combobox('clear');
					$('#fmaterial').combobox('loadData', [{
						"text" : "不锈钢实芯",
						"value" : "92"
					},{
						"text" : "铁素体不锈钢实芯",
						"value" : "93"
					}]);
				}else if(fgas == 121){
					$('#fmaterial').combobox('clear');
					$('#fmaterial').combobox('loadData', [{
						"text" : "低碳钢实芯",
						"value" : "91"
					} ]);
				}else if(fgas == 124){
					$('#fmaterial').combobox('clear');
					$('#fmaterial').combobox('loadData', [{
						"text" : "不锈钢实芯",
						"value" : "92"
					}]);
				}
				var data = $('#fmaterial').combobox('getData');
				$('#fmaterial').combobox('select',data[0].value);
			}
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
					if(fmaterial == 91){
						fdiameter_1();
						$("#fcontroller").prop("disabled",false);
					}
				}else if(fgas == 123){
					if(fmaterial == 92){
						fdiameter_1();
					}else if(fmaterial == 93){
						fdiameter_1();
					}
				}else if(fgas == 124){
					fdiameter_1();
					$("#fcontroller").prop("disabled",false);
				}
			}else if(fweldprocess == 0){
				if(fgas == 122){
					if(fmaterial == 94){
						fdiameter_4();
						$("#fcontroller").prop("disabled",false);
					}else if(fmaterial == 96){
						fdiameter_6();
						$("#fcontroller").prop("disabled",false);
					}else if(fmaterial == 97){
						$('#fdiameter').combobox('clear');
						$('#fdiameter').combobox('loadData', [ {
							"text" : "Φ0.8",
							"value" : "135"
						},  {
							"text" : "Φ1.0",
							"value" : "131"
						}]);
						$("#fcontroller").prop("disabled",false);
					}
				}else if(fgas == 123){
					fdiameter_1();
					$("#fcontroller").prop("disabled",false);
				}else if(fgas == 121){
					fdiameter_1();
					$("#fcontroller").prop("disabled",false);
				}else if(fgas == 124){
					fdiameter_1();
					$("#fcontroller").prop("disabled",false);
				}
			}else if(fweldprocess == 3){
				if(fgas == 122){
					if(fmaterial == 94){
						fdiameter_4();
						$("#fcontroller").prop("disabled",false);
					}else if(fmaterial == 96){
						fdiameter_6();
						$("#fcontroller").prop("disabled",false);
					}
				}else if(fgas == 123){
					fdiameter_1();
				}else if(fgas == 121){   
					fdiameter_1();
			    }else if(fgas == 124){
				fdiameter_1();
			    }
			var data = $('#fdiameter').combobox('getData');
			$('#fdiameter').combobox('select',data[0].value);
		}else if(fweldprocess == 9){
			if(fgas ==122 ){
				if(fmaterial == 94){
					fdiameter_4();
					$("#fcontroller").prop("disabled",false);
				}else if(fmaterial == 96){
					fdiameter_6();
					$("#fcontroller").prop("disabled",false);
				}else if(fmaterial == 97){
					$('#fdiameter').combobox('clear');
					$('#fdiameter').combobox('loadData', [ {
						"text" : "Φ0.8",
						"value" : "135"
					},  {
						"text" : "Φ1.0",
						"value" : "131"
					}]);
					$("#fcontroller").prop("disabled",false);
				}
			}else if(fgas ==121 || fgas ==123 || fgas ==124){
				fdiameter_1();
				$("#fcontroller").prop("disabled",false);
			}
			
		}else if(fweldprocess == 10){
			if(fgas ==122 ){
				if(fmaterial == 94){
					fdiameter_4();
					$("#fcontroller").prop("disabled",false);
				}else if(fmaterial == 96){
					fdiameter_6();
					$("#fcontroller").prop("disabled",false);
				}
			}
			else if(fgas ==121 || fgas ==123 || fgas ==124){
				fdiameter_1();
			}
		}
			var data = $('#fdiameter').combobox('getData');
			$('#fdiameter').combobox('select',data[0].value);
		}
	})
	$('#fweldprocess').combobox('select', 0);
	fgas_5();
	var data = $('#fgas').combobox('getData');
	$('#fgas').combobox('select',data[0].value);
}

function WBPINIT_combobox(){
	//清空改变事件
	$("#fweldprocess").combobox({//焊接方法
		onChange : function() {
			var fweldprocess = $("#fweldprocess").combobox('getValue');
			if(fweldprocess == 1){//直流
				fgas_3();
			}else if(fweldprocess == 0 || fweldprocess == 3){
				fgas_4();
			}
			var data = $('#fgas').combobox('getData');
			$('#fgas').combobox('select',data[0].value);
		}
	})
	$("#fgas").combobox({//气体
		onChange : function() {
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
					} ]);
				}
				var data = $('#fmaterial').combobox('getData');
				$('#fmaterial').combobox('select',data[0].value);
			}else if(fweldprocess == 0){
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
					} ]);
				}
				var data = $('#fmaterial').combobox('getData');
				$('#fmaterial').combobox('select',data[0].value);
			}else if(fweldprocess == 3){
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
					} ]);
				}
				var data = $('#fmaterial').combobox('getData');
				$('#fmaterial').combobox('select',data[0].value);
			}
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
					if(fmaterial == 91){
						fdiameter_2();
						$("#fcontroller").prop("disabled",false);
					}else if(fmaterial == 93){
						$('#fdiameter').combobox('clear');
						$('#fdiameter').combobox('loadData', [ {
							"text" : "Φ1.0",
							"value" : "131"
						}, {
							"text" : "Φ1.2",
							"value" : "132"
						} ]);
						$("#fcontroller").prop("disabled",false);
					}else if(fmaterial == 94){
						$('#fdiameter').combobox('clear');
						$('#fdiameter').combobox('loadData', [ {
							"text" : "Φ0.9",
							"value" : "136"
						}, {
							"text" : "Φ1.2",
							"value" : "132"
						} ]);
						$("#fcontroller").prop("disabled",false);
					}
				}else if(fgas == 122){
					fdiameter_2();
					$("#fcontroller").prop("disabled",false);
				}else if(fgas == 123){
					if(fmaterial == 96){
						fdiameter_4();
					}else if(fmaterial == 97){
						fdiameter_6();
					}
				}else if(fgas == 124){
					fdiameter_2();
					$("#fcontroller").prop("disabled",false);
				}
			}else if(fweldprocess == 0){
				if(fgas == 122){
					fdiameter_1();
					$("#fcontroller").prop("disabled",false);
				}else if(fgas == 123){
					if(fmaterial == 96){
						fdiameter_4();
					}else if(fmaterial == 97){
						fdiameter_6();
					}
				}else if(fgas == 124){
					fdiameter_1();
					$("#fcontroller").prop("disabled",false);
				}
			}else if(fweldprocess == 3){
				if(fgas == 122){
					fdiameter_1();
				}else if(fgas == 123){
					fdiameter_4();
				}else if(fgas == 124){
					fdiameter_1();
				}
			}
			var data = $('#fdiameter').combobox('getData');
			$('#fdiameter').combobox('select',data[0].value);
		}
	})
	$('#fweldprocess').combobox('select', 0);
	fgas_3();
	var data = $('#fgas').combobox('getData');
	$('#fgas').combobox('select',data[0].value);
}

function WBMLINIT_combobox(){
	//清空改变事件
	$("#fweldprocess").combobox({//焊接方法
		onChange : function() {
		}
	})
	$("#fgas").combobox({//气体
		onChange : function() {
			var fgas = $("#fgas").combobox('getValue');
			if(fgas == 121){//CO2
				fmaterial_3();
			}else if(fgas == 122){
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
				} ]);
			}
			var data = $('#fmaterial').combobox('getData');
			$('#fmaterial').combobox('select',data[0].value);
		}
	})
	$("#fmaterial").combobox({//焊丝种类
		onChange : function() {
			var fgas = $("#fgas").combobox('getValue');
			var fmaterial = $("#fmaterial").combobox('getValue');
			if(fgas == 121){
				$("#fcontroller").prop("checked",false);
				$("#fcontroller").prop("disabled",true);
				if(fmaterial == 91){
					fdiameter_2();
				}else if(fmaterial == 93){
					$('#fdiameter').combobox('clear');
					$('#fdiameter').combobox('loadData', [ {
						"text" : "Φ1.2",
						"value" : "132"
					}, {
						"text" : "Φ1.4",
						"value" : "133"
					} ]);
					$("#fcontroller").prop("disabled",false);
				}else if(fmaterial == 94){
					$('#fdiameter').combobox('clear');
					$('#fdiameter').combobox('loadData', [ {
						"text" : "Φ0.9",
						"value" : "136"
					}, {
						"text" : "Φ1.2",
						"value" : "132"
					} ]);
					$("#fcontroller").prop("disabled",false);
				}
			}else{
				fdiameter_2();
				$("#fcontroller").prop("checked",false);
				$("#fcontroller").prop("disabled",true);
			}
			var data = $('#fdiameter').combobox('getData');
			$('#fdiameter').combobox('select',data[0].value);
		}
	})
	$('#fweldprocess').combobox('select', 1);
	fgas_2();
	var data = $('#fgas').combobox('getData');
	$('#fgas').combobox('select',data[0].value);
}

function CPVESGET_combobox(){
	//清空改变事件
	$("#fweldprocess").combobox({//焊接方法
		onChange : function() {
		}
	})
	$("#fmaterial").combobox({//焊丝种类
		onChange : function() {
			var fmaterial = $("#fmaterial").combobox('getValue');
			if(fmaterial == 91){
				fgas_1();
			}else if(fmaterial == 92){
				$('#fgas').combobox('clear');
				$('#fgas').combobox('loadData', [ {
					"text" : "MIG_2O2",
					"value" : "124"
				} ]);
			}else if(fmaterial == 93){
				$('#fgas').combobox('clear');
				$('#fgas').combobox('loadData', [ {
					"text" : "CO2",
					"value" : "121"
				} ]);
			}else if(fmaterial == 94){
				$('#fgas').combobox('clear');
				$('#fgas').combobox('loadData', [ {
					"text" : "CO2",
					"value" : "121"
				} ]);
			}
			var data = $('#fgas').combobox('getData');
			$('#fgas').combobox('select',data[0].value);
		}
	})
	$("#fgas").combobox({//气体
		onChange : function() {
			var fmaterial = $("#fmaterial").combobox('getValue');
			var fgas = $("#fgas").combobox('getValue');
			if(fmaterial == 91 || fmaterial == 92){//低碳钢实芯
				fdiameter_2();
			}else if(fmaterial == 93){
				$('#fdiameter').combobox('clear');
				$('#fdiameter').combobox('loadData', [ {
					"text" : "Φ1.2",
					"value" : "132"
				} ]);
			}else if(fmaterial == 94){
				$('#fdiameter').combobox('clear');
				$('#fdiameter').combobox('loadData', [ {
					"text" : "Φ0.9",
					"value" : "136"
				}, {
					"text" : "Φ1.2",
					"value" : "132"
				} ]);
			}
			var data = $('#fdiameter').combobox('getData');
			$('#fdiameter').combobox('select',data[0].value);
		}
	})
	$('#fweldprocess').combobox('select', 1);
	fmaterial_1();
	var data = $('#fmaterial').combobox('getData');
	$('#fmaterial').combobox('select',data[0].value);
}

function CPVEWGET_combobox(){
	//清空改变事件
	$("#fweldprocess").combobox({//焊接方法
		onChange : function() {
		}
	})
	$("#fmaterial").combobox({//焊丝种类
		onChange : function() {
			var fmaterial = $("#fmaterial").combobox('getValue');
			if(fmaterial == 91){
				fgas_1();
			}else if(fmaterial == 92){
				$('#fgas').combobox('clear');
				$('#fgas').combobox('loadData', [ {
					"text" : "MIG_2O2",
					"value" : "124"
				} ]);
			}else if(fmaterial == 93){
				$('#fgas').combobox('clear');
				$('#fgas').combobox('loadData', [ {
					"text" : "CO2",
					"value" : "121"
				} ]);
			}else if(fmaterial == 94){
				$('#fgas').combobox('clear');
				$('#fgas').combobox('loadData', [ {
					"text" : "CO2",
					"value" : "121"
				} ]);
			}
			var data = $('#fgas').combobox('getData');
			$('#fgas').combobox('select',data[0].value);
		}
	})
	$("#fgas").combobox({//气体
		onChange : function() {
			var fmaterial = $("#fmaterial").combobox('getValue');
			var fgas = $("#fgas").combobox('getValue');
			if(fmaterial == 91){//低碳钢实芯
				fdiameter_5();
			}else if(fmaterial == 93){
				fdiameter_3();
			}else if(fmaterial == 92 || fmaterial == 94){
				fdiameter_4();
			}
			var data = $('#fdiameter').combobox('getData');
			$('#fdiameter').combobox('select',data[0].value);
		}
	})
	$('#fweldprocess').combobox('select', 1);
	fmaterial_1();
	var data = $('#fmaterial').combobox('getData');
	$('#fmaterial').combobox('select',data[0].value);
}

function CPVETGET_combobox(){
	//清空改变事件
	$("#fweldprocess").combobox({//焊接方法
		onChange : function() {
		}
	})
	$("#fmaterial").combobox({//焊丝种类
		onChange : function() {
		}
	})
	$("#fgas").combobox({//气体
		onChange : function() {
		}
	})
	$('#fweldprocess').combobox('select', 1);
	$('#fmaterial').combobox('clear');
	$('#fmaterial').combobox('loadData', [ {
		"text" : "低碳钢实芯",
		"value" : "91"
	} ]);
	$('#fmaterial').combobox('select',91);
	fgas_1();
	$('#fgas').combobox('select',121);

	$('#fdiameter').combobox('clear');
	$('#fdiameter').combobox('loadData', [ {
		"text" : "Φ0.8",
		"value" : "135"
	}, {
		"text" : "Φ1.0",
		"value" : "131"
	} ]);
	$('#fdiameter').combobox('select',135);
}

function EPWINIT_combobox(){
	$("#fweldprocess").combobox({//焊接方法
		onChange : function() {
			var fweldprocess = $("#fweldprocess").combobox('getValue');
			if(fweldprocess == 0){//直流脉冲
				fmaterial_2();
			}else{
				fmaterial_1();
			}
			var data = $('#fmaterial').combobox('getData');
			$('#fmaterial').combobox('select',data[0].value);
		}
	})
	$("#fmaterial").combobox({//焊丝种类
		onChange : function() {
			var fweldprocess = $("#fweldprocess").combobox('getValue');
			var fmaterial = $("#fmaterial").combobox('getValue');
			if(fweldprocess == 0){//直流脉冲
				if(fmaterial == 91){
					$('#fgas').combobox('clear');
					$('#fgas').combobox('loadData', [ {
						"text" : "MAG",
						"value" : "122"
					} ]);
				}else if(fmaterial == 92){
					$('#fgas').combobox('clear');
					$('#fgas').combobox('loadData', [ {
						"text" : "MIG",
						"value" : "123"
					} ]);
				}
			}else{
				if(fmaterial == 91){
					fgas_1();
				}else if(fmaterial == 92){
					$('#fgas').combobox('clear');
					$('#fgas').combobox('loadData', [ {
						"text" : "MIG",
						"value" : "123"
					} ]);
				}else if(fmaterial == 93 || fmaterial == 94){
					$('#fgas').combobox('clear');
					$('#fgas').combobox('loadData', [ {
						"text" : "CO2",
						"value" : "121"
					} ]);
				}
			}
			var data = $('#fgas').combobox('getData');
			$('#fgas').combobox('select',data[0].value);
		}
	})
	$("#fgas").combobox({//气体
		onChange : function() {
			var fweldprocess = $("#fweldprocess").combobox('getValue');
			var fmaterial = $("#fmaterial").combobox('getValue');
			var fgas = $("#fgas").combobox('getValue');
			if(fweldprocess == 0){//直流脉冲
				if(fgas == 122){
					fdiameter_3();
				}else{
					fdiameter_4();
				}
			}else{
				if(fmaterial == 91 || fmaterial == 93){
					fdiameter_3();
				}else{
					fdiameter_4();
				}
			}
			var data = $('#fdiameter').combobox('getData');
			$('#fdiameter').combobox('select',data[0].value);
		}
	})
	$('#fweldprocess').combobox('select', 0);
	fmaterial_2();
	var data = $('#fmaterial').combobox('getData');
	$('#fmaterial').combobox('select',data[0].value);
}

function EPSINIT_combobox(){
	$("#fweldprocess").combobox({//焊接方法
		onChange : function() {
			var fweldprocess = $("#fweldprocess").combobox('getValue');
			if(fweldprocess == 0){//直流脉冲
				fmaterial_2();
			}else{
				fmaterial_1();
			}
			var data = $('#fmaterial').combobox('getData');
			$('#fmaterial').combobox('select',data[0].value);
		}
	})
	$("#fmaterial").combobox({//焊丝种类
		onChange : function() {
			var fweldprocess = $("#fweldprocess").combobox('getValue');
			var fmaterial = $("#fmaterial").combobox('getValue');
			if(fweldprocess == 0){//直流脉冲
				if(fmaterial == 91){
					$('#fgas').combobox('clear');
					$('#fgas').combobox('loadData', [ {
						"text" : "MAG",
						"value" : "122"
					} ]);
				}else if(fmaterial == 92){
					$('#fgas').combobox('clear');
					$('#fgas').combobox('loadData', [ {
						"text" : "MIG",
						"value" : "123"
					} ]);
				}
			}else{
				if(fmaterial == 91){
					fgas_1();
				}else if(fmaterial == 92){
					$('#fgas').combobox('clear');
					$('#fgas').combobox('loadData', [ {
						"text" : "MIG",
						"value" : "123"
					} ]);
				}else if(fmaterial == 93 || fmaterial == 94){
					$('#fgas').combobox('clear');
					$('#fgas').combobox('loadData', [ {
						"text" : "CO2",
						"value" : "121"
					} ]);
				}
			}
			var data = $('#fgas').combobox('getData');
			$('#fgas').combobox('select',data[0].value);
		}
	})
	$("#fgas").combobox({//气体
		onChange : function() {
			var fweldprocess = $("#fweldprocess").combobox('getValue');
			var fmaterial = $("#fmaterial").combobox('getValue');
			var fgas = $("#fgas").combobox('getValue');
			if(fweldprocess == 0){//直流脉冲
				if(fgas == 122){
					fdiameter_1();
				}else{
					fdiameter_1();
				}
			}else{
				if(fmaterial == 93){
					$('#fdiameter').combobox('clear');
					$('#fdiameter').combobox('loadData', [ {
						"text" : "Φ1.0",
						"value" : "131"
					}, {
						"text" : "Φ1.2",
						"value" : "132"
					} ]);
				}else if(fmaterial == 94){
					$('#fdiameter').combobox('clear');
					$('#fdiameter').combobox('loadData', [ {
						"text" : "Φ0.9",
						"value" : "136"
					}, {
						"text" : "Φ1.2",
						"value" : "132"
					} ]);
				}else{
					fdiameter_2();
				}
			}
			var data = $('#fdiameter').combobox('getData');
			$('#fdiameter').combobox('select',data[0].value);
		}
	})
	$('#fweldprocess').combobox('select', 0);
	fmaterial_2();
	var data = $('#fmaterial').combobox('getData');
	$('#fmaterial').combobox('select',data[0].value);
}


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
