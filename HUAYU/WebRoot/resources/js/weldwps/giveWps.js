/**
 * 
 */
var websocketURL;
$(function(){
	$.ajax({
		type : "post",
		async : false,
		url : "td/AllTdbf",
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				websocketURL = eval(result.web_socket);
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	getMachine();
	getWps();
})

//焊机选择表格
function getMachine(){
	$("#semactable").datagrid( {
		height : $("#semac").height(),
		width : $("#semac").width(),
		idField : 'id',
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		url : "weldingMachine/getWedlingMachineList",
		checkbox : true,
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
			width : 80,
			halign : "center",
			align : "left"
		}, {
			field : 'typeName',
			title : '设备类型',
			width : 80,
			halign : "center",
			align : "left"
		}, {
			field : 'joinTime',
			title : '入厂时间',
			width : 150,
			halign : "center",
			align : "left"
		}, {
			field : 'insframeworkName',
			title : '所属项目',
			width : 80,
			halign : "center",
			align : "left"
		}, {
			field : 'statusName',
			title : '状态',
			width : 80,
			halign : "center",
			align : "left"
		} , {
			field : 'manufacturerName',
			title : '厂家',
			width : 150,
			halign : "center",
			align : "left"
		}, {
			field : 'isnetworking',
			title : '是否在网',
			width : 80,
			halign : "center",
			align : "left"
		}, {
			field : 'gatherId',
			title : '采集序号',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'position',
			title : '位置',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'ip',
			title : 'ip地址',
			width : 100,
			halign : "center",
			align : "left"
		},{
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
			field : 'manufacturerId',
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
			field : 'insframeworkId',
			title : '项目id',
			width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}] ],
		rowStyler: function(index,row){
            if ((index % 2)!=0){
            	//处理行代背景色后无法选中
            	var color=new Object();
                return color;
            }
		},
		fitColumns : true,
		pagination : true
	});
}

//工艺选择表格
function getWps(){
    $("#sewpstable").datagrid( {
//	fitColumns : true,
	height : ($("#sewps").height()),
	width : $("#sewps").width(),
	idField : 'id',
	pageSize : 10,
	pageList : [ 10, 20, 30, 40, 50 ],
	url : "wps/getAllWps",
	rownumbers : true,
	pagination : true,
	showPageList : false,
	columns : [ [ {
	    field:'ck',
		checkbox:true
	},{
		field : 'FID',
		title : 'FID',
		width : 100,
		halign : "center",
		align : "left",
		hidden: true
	}, {
		field : 'FWPSNum',
		title : '工艺编号',
//		width : 100,
		halign : "center",
		align : "left"
	}, {
		field : 'Fweld_I',
		title : '标准焊接电流',
//		width : 100,
		halign : "center",
		align : "left"
	}, {
		field : 'Fweld_V',
		title : '标准焊接电压',
//		width : 100,
		halign : "center",
		align : "left"
	}, {
		field : 'Fweld_PreChannel',
		title : '预置通道',
//		width : 100,
		halign : "center",
		align : "left"
    }, {
		field : 'Fowner',
		title : '部门',
//		width : 100,
		halign : "center",
		align : "left"
    }, {
		field : 'insid',
		title : '部门id',
		halign : "center",
		align : "left",
		hidden : true
    },{
		field : 'Fback',
		title : '备注',
//		width : 100,
		halign : "center",
		align : "left"
    }]],
	rowStyler: function(index,row){
        if ((index % 2)!=0){
        	//处理行代背景色后无法选中
        	var color=new Object();
            return color;
        }
	}
});
} 

var wpsrows=new Array();
var macrows=new Array();
//打开工艺选择的dialog
function selectWps(){
	$('#sewps').window( {
		title : "选择工艺",
		modal : true
	});
	$('#sewps').window('open');
}

//打开焊机选择的dialog
function selectMachine(){
	$('#sewps').dialog('close');
	wpsrows = $("#sewpstable").datagrid("getSelections");
    if(wpsrows.length==0){
 	   alert("请先选择工艺参数");
    }else{
    	$('#semac').window( {
    		title : "选择焊机",
    		modal : true
    	});
    	$('#semac').window('open');
    }
}

function giveWps(){
	var machid="";
	var panelnum="";
	var wpsid="";
	macrows = $("#semactable").datagrid("getSelections");
	if(macrows.length==0){
	 	alert("请先选择焊机");
	}else{
		var count=0;
		if (typeof (WebSocket) == "undefined") {
			WEB_SOCKET_SWF_LOCATION = "resources/js/WebSocketMain.swf";
			WEB_SOCKET_DEBUG = true;
		}
		var socket = new WebSocket(websocketURL);
		socket.onopen = function() {
		for(var i=0;i<macrows.length;i++){
			machid+=macrows[i].id+",";
			for(var j=0;j<wpsrows.length;j++){
				wpsid+=wpsrows[j].FID+",";
				panelnum+=wpsrows[j].Fweld_PreChannel+",";
				if(macrows[i].gatherId){
					var gather = parseInt(macrows[i].gatherId).toString(16);
					if(gather.length<4){
						var length = 4 - gather.length;
				        for(var g=0;g<length;g++){
				        	gather = "0" + gather;
				        };
					}else{
						alert("该焊机未绑定采集编号！！！");
						socket.close();
						return;
					}
				}
			    var panel = parseInt(wpsrows[j].Fweld_PreChannel).toString(16);
			    if(panel.length<2){
					var length = 2 - panel.length;
			        for(var g=0;g<length;g++){
			        	panel = "0" + panel;
			        };
			    } 
			    var ele = parseInt(wpsrows[j].Fweld_I).toString(16);
				if(ele.length<4){
					var length = 4 - ele.length;
			        for(var e=0;e<length;e++){
			        	ele = "0" + ele;
			        };
				}
			    var vol = (parseInt(wpsrows[j].Fweld_V)*10).toString(16);
				if(vol.length<4){
					var length = 4 - vol.length;
			        for(var v=0;v<length;v++){
			        	vol = "0" + vol;
			        };
				}
			    var senddata = "7E2D01010152"+gather+panel+"001E0001006400BE0000"+ele+vol+"0000006400BE000000010000000C0000000000000000";
			    var check = 0;
				for (var s = 0; s < (senddata.length/2); s++)
				{
					var tstr1=senddata.substring(s*2, s*2+2);
					var k=parseInt(tstr1,16);
					check += k;
				}

				var checksend = parseInt(check).toString(16);
				var a2 = checksend.length;
				checksend = checksend.substring(a2-2,a2);
				checksend = checksend.toUpperCase();
				
				var xiafasend2 = (senddata+checksend).substring(2);
				
/*				var xiafasend4 = xiafasend2.replace(/7C/g, '7C5C');
				var xiafasend3 = xiafasend4.replace(/7E/g, '7C5E');
				var fuer="";
				for(var er=0;er<(xiafasend3.length/2);er++){
					if(xiafasend3.substring(er*2,er*2+2)=="00"){
						fuer = fuer+"7C20"
					}else{
						fuer = fuer+xiafasend3.substring(er*2,er*2+2);
					}
				}
				var xiafasend5 = fuer.replace(/7D/g, '7C5D').toUpperCase();
				
				var xiafasend = "7E" + xiafasend5 + "7D";
			    socket.send(xiafasend);*/
				socket.send("7E"+xiafasend2+"7D");
				socket.onmessage = function(msg) {
					var receivedata = msg.data;
//					receivedata = receivedata.replace(/7C20/g, '00').toUpperCase();
					if(receivedata.substring(0,2)=="7E"&&receivedata.substring(10,12)=="52"){
						if(parseInt(receivedata.substring(18,20),10)==1){
							alert("下发失败");
							return;
						}else{
							count++;
							if(count==wpsrows.length*macrows.length){
								socket.close();
								$.ajax({
									type : "post",
									async : false,
									url : "wps/giveWM?machid="+machid+"&panelnum="+panelnum+"&wpsid="+wpsid,
									data : {},
									dataType : "json", //返回数据形式为json  
									success : function(result) {
										if (eval(result.success)==true) {
											$("#sewpstable").datagrid("clearSelections");
											$("#semactable").datagrid("clearSelections");
											$('#semac').dialog('close');
											alert("下发成功");
											count=0;
										}
									},
									error : function(errorMsg) {
										alert("下发成功,未成功保存下发记录！！！");
										count=0;
									}
								});
							}
						}
					}
				};
			}
		}
	}
	};
}

//关闭工艺选择的dialog框
function closewps(){
	$('#sewps').dialog('close');
}

//关闭工艺选择的dialog框
function closemac(){
	$('#semac').dialog('close');
}