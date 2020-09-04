/**
 * 
 */
var ele = new Array();
var vol = new Array();
var weld = new Array();
var param = new Array();
var back = new Array();
var led = [ "0,1,2,4,5,6", "2,5", "0,2,3,4,6", "0,2,3,5,6", "1,2,3,5", "0,1,3,5,6", "0,1,3,4,5,6", "0,2,5", "0,1,2,3,4,5,6", "0,1,2,3,5,6" ];
var timer,
	timer1,
	timer2,
	timer5;
var rowdex = 0;
var vaa1;
var e = 0;
var stri;
var gg = "";
var va;
var po;
var bhq;
var h = 0;
var hq;
var bh;
var bq = 0;
var status;
var mach;
var weld;
var name;
var status = new Array();
var pos;
var position;
var position1 = new Array();
var z = 0;
var jj = 0;
var zz = 0;
var dd;
var bb = 0;
var tt = 0;
var time1 = new Array();
var maxele;
var maxvol;
var minele;
var minvol;
var socket;
var data1;
var namex;
var tryTime = 0;
var symbol = 0;
var heartflag = false;
$(function() {
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
		url : "td/allWeldname",
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				namex = eval(result.rows);
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	$.ajax({
		type : "post",
		async : false,
		url : "td/getAllPosition",
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				position = eval(result.rows);
				position1.push(position[0].fposition);
				for (var err2 = 0; err2 < position.length; err2++) {
					for (var count = 0; count < position1.length; count++) {
						if (position1[count] != position[err2].fposition && count == position1.length - 1) {
							position1.push(position[err2].fposition);
						}
					}
				}
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	w();
})
function w() {
	if (typeof (WebSocket) == "undefined") {
		alert("您的浏览器不支持WebSocket");
		return;
	}
	/*		var dingshiqi=0;
			var dingshiqi1;*/
	ws();
	$("#btnSend").click(function() {
		socket.send("强哥");
	});

	$("#btnClose").click(function() {
		socket.close();
	});
}
;

function ws() {
	//实现化WebSocket对象，指定要连接的服务器地址与端口
	try {
		socket = new WebSocket(data1);
	} catch (err) {
		alert("地址请求错误，请清除缓存重新连接！！！")
	}
	/*		dingshiqi1 = window.setInterval(function() {
				dingshiqi++;
			}, 1000);*/
	//打开事件
	socket.onopen = function() {
		for (var b = 0; b < position1.length; b++) {
			if ($("#pposition" + b + "").length <= 0) {
				var str = "<a id='pposition" + b + "' href='javascript:void(0);' onclick='rece1(\"" + position1[b] + "\")'><i class='iconfont icon-bijiben'></i>" + position1[b] + "</a></br>";
				$("#body11").append(str);
			}
		}
		datatable();
		setTimeout(function() {
			if (symbol == 0) {
				alert("连接成功，但未接收到任何数据");
			}
		}, 5000);
		//监听加载状态改变  
		document.onreadystatechange = completeLoading();

		//加载状态为complete时移除loading效果 
		function completeLoading() {
			var loadingMask = document.getElementById('loadingDiv');
			loadingMask.parentNode.removeChild(loadingMask);
		}
	/*			alert(dingshiqi);*/
	/*			alert("Socket 已打开");
				socket.send("这是来自客户端的消息" + location.href + new Date());*/
	};
	//获得消息事件
	socket.onmessage = function(msg) {
		/*alert(msg.data);*/
		/*alert("有数据");*/
		var xxx = msg.data;
		if (xxx.substring(0, 2) != "7E") {
			dd = msg.data;
			symbol++;
			/*			for(var b=0;b<position1.length;b++){
				    		  if($("#pposition"+b+"").length<=0){
				    			  var str = "<a id='pposition"+b+"' href='javascript:void(0);' onclick='rece1(\""+position1[b]+"\")'><i class='iconfont icon-bijiben'></i>"+position1[b]+"</a></br>";
				    			  $("#body11").append(str);
				    		  }
			    		 }*/
			for (var n = 0; n < dd.length; n += 69) {
				if (dd.substring(8 + n, 12 + n) != "0000") {
					if (back.length == 0) {
						var l = 1;
						var ll = 0;
						for (var a = 0; a < l; a++) {
							if (dd.substring(4 + n, 8 + n) != back[a]) {
								back.push(dd.substring(4 + n, 8 + n));
							} else {
								continue;
							}
						}
					} else {
						l = back.length;
						var ll = 0;
						for (var a = 0; a < l; a++) {
							/*alert(dd.substring(4+n, 8+n));*/
							if (dd.substring(4 + n, 8 + n) != back[a]) {
								ll++;
								if (ll == back.length) {
									back.push(dd.substring(4 + n, 8 + n));
								}
							} else {
								continue;
							}
						}
					}
				}
			}
			;

			if (bb == 0) {
				rece();
			} else if (bb == 1) {
				rece1(0);
			} else {
				rece2(0);
			}

			/*var columns = $('#dg').datagrid("options").columns;*/
			var rows = $('#dg').datagrid("getRows");
			/*alert(rows[dex][columns[0][0].field]);*/
			for (var g = 0; g < dd.length; g += 69 * 3) {
				for (var dex = 0; dex < rows.length; dex++) {
					/*alert(rows[dex][columns[0][1].field]);*/
					if ((dd.substring(8 + g, 12 + g) != "0000") && (dd.substring(4 + g, 8 + g) == rows[dex].fequipment_no)) {
						rows[dex].fwelder_no = dd.substring(8 + g, 12 + g);
						rows[dex].fstatus_id = dd.substring(0 + g, 2 + g);
						for (var k = 0; k < namex.length; k++) {
							if (namex[k].fwelder_no == dd.substring(8 + g, 12 + g)) {
								rows[dex].fname = namex[k].fname;
							}
						}
						$('#dg').datagrid('refreshRow', dex);
						$("a[id='view']").linkbutton({
							text : '查看',
							plain : true,
							iconCls : 'icon-view'
						});
					}
				}
			}
			if ((rowdex < back.length) && (rows.length != 0)) {
				for (var dex1 = 0; dex1 < rows.length; dex1++) {
					if (back[rowdex] == rows[dex1].fequipment_no) {
						$('#dg').datagrid('insertRow', {
							index : 0,
							row : rows[dex1],
						});
						$('#dg').datagrid('deleteRow', dex1 + 1); //删除一行
					}
				}
				rowdex++;
			}
		}

	};
	//关闭事件
	socket.onclose = function(e) {
		heartflag = false;
		if (e.code == 4001 || e.code == 4002 || e.code == 4003 || e.code == 4005 || e.code == 4006) {
			//如果断开原因为4001 , 4002 , 4003 不进行重连.
			return;
		} else {
			return;
		}

		// 重试3次，每次之间间隔5秒
		if (tryTime < 3) {
			setTimeout(function() {
				socket = null;
				tryTime++;
				var _PageHeight = document.documentElement.clientHeight,
					_PageWidth = document.documentElement.clientWidth;
				var _LoadingTop = _PageHeight > 61 ? (_PageHeight - 61) / 2 : 0,
					_LoadingLeft = _PageWidth > 215 ? (_PageWidth - 215) / 2 : 0;
				var _LoadingHtml = '<div id="loadingDiv" style="position:absolute;left:0;width:100%;height:' + _PageHeight + 'px;top:0;background:#f3f8ff;opacity:0.8;filter:alpha(opacity=80);z-index:10000;"><div style="position: absolute; cursor1: wait; left: ' + _LoadingLeft + 'px; top:' + _LoadingTop + 'px; width: auto; height: 57px; line-height: 57px; padding-left: 50px; padding-right: 5px; background: #fff url(resources/images/load.gif) no-repeat scroll 5px 10px; border: 2px solid #95B8E7; color: #696969;">""连接异常，正在尝试第"' + tryTime + '"次重连，请稍候..."</div></div>';
				document.write(_LoadingHtml);
				ws();
			}, 3000);
		} else {
			tryTime = 0;
		}
	};
	//发生了错误事件
	socket.onerror = function() {
		/*				socket.onopen();*/
		heartflag = false;
	}
}
;

function heart() {
	if (heartflag) {
		socket.send("&");
	}
	setTimeout("heart()", 10 * 60 * 1000);

}

function rece1(value2) {
	bb = 1;
	h = 0;
	if (value2 != 0) {
		a = 0;
		jj = 0;
		z = 0;
		zz = 0;
		ele = [];
		vol = [];
		time1 = [];
		bhq = value2;
		$("#body3").empty();
		window.clearInterval(timer);
		window.clearInterval(timer1);
		window.clearInterval(timer5);
		$('#dg').datagrid('loadData', {
			total : 0,
			rows : []
		});
	}
	/*online(position[0].fpositin);*/
	for (var i = 0; i < dd.length; i += 159) {
		for (var err1 = 0; err1 < position.length; err1++) {
			if (position[err1].fequipment_no == dd.substring(4 + i, 8 + i)) {
				po = position[err1].fposition;
			}
		}
	}
	datatable();
	rece2(back[0]);
	var t = 1;
	timer1 = window.setInterval(function() {
		if (t < back.length) {
			rece2(back[t]);
			datatable();
			back.length = 0;
			t++;
		} else {
			t = 0;
		/*rece2(back[t]);*/
		}
	}, 300000);
}
function rece2(value1) {
	bb = 2;
	if (value1 != 0) {
		hq = value1;
		jj = 0;
		z = 0;
		zz = 0
		ele = [];
		vol = [];
		time1 = [];
		$("#body3").empty();
		window.clearInterval(timer);
		window.clearInterval(timer5);
	}
	for (var j = 0; j < 1; j++) {
		for (var i = 0; i < dd.length; i += 69) {
			if (hq == dd.substring(4 + i, 8 + i) && (dd.substring(8 + i, 12 + i)) != "0000") {
				var mach = dd.substring(4 + i, 8 + i);
				var weld = dd.substring(8 + i, 12 + i);
				ele[jj] = parseInt(dd.substring(12 + i, 16 + i));
				vol[jj] = parseFloat((dd.substring(16 + i, 20 + i) / 10).toFixed(2));
				var dati = dd.substring(20 + i, 39 + i);
				var val = Date.parse(dati);
				time1[jj] = val;
				maxele = parseInt(dd.substring(41 + i, 44 + i));
				minele = parseInt(dd.substring(44 + i, 47 + i));
				maxvol = parseInt(dd.substring(47 + i, 50 + i));
				minvol = parseInt(dd.substring(50 + i, 53 + i));
				var ele2 = dd.substring(12 + i, 16 + i);
				if (ele2.length < 4) {
					var len = ele2.length;
					for (var na = 0; na < 4 - len; na++) {
						ele2 = "0" + ele2;
					}
				}
				var vol2 = dd.substring(16 + i, 20 + i);
				if (vol2.length < 4) {
					var len1 = vol2.length;
					for (var nan = 0; nan < 4 - len1; nan++) {
						vol2 = "0" + vol2;
					}
				}
				modiflyNum(1, parseInt(ele2.charAt(0)));
				modiflyNum(2, parseInt(ele2.charAt(1)));
				modiflyNum(3, parseInt(ele2.charAt(2)));
				modiflyNum(4, parseInt(ele2.charAt(3)));
				modiflyNum1(5, parseInt(vol2.charAt(0)));
				modiflyNum1(6, parseInt(vol2.charAt(1)));
				modiflyNum1(7, parseInt(vol2.charAt(2)));
				modiflyNum1(8, parseInt(vol2.charAt(3)));
				document.getElementById("macname").value = hq;
				for (var k = 0; k < namex.length; k++) {
					if (namex[k].fwelder_no == dd.substring(8 + i, 12 + i)) {
						document.getElementById("welname").value = namex[k].fname;
					}
				}
				jj++;
				if (jj <= 1) {
					curve();
					curve1();
				}
			}
		}
		if (jj % 3 == 1) {
			ele[jj] = ele[jj - 1];
			ele[jj + 1] = ele[jj - 1];
			vol[jj] = vol[jj - 1];
			vol[jj + 1] = vol[jj - 1];
			time1[jj] = time1[jj - 1] + 1000;
			time1[jj + 1] = time1[jj - 1] + 2000;
			jj = jj + 2;
		}
		if (jj % 3 == 2) {
			ele[jj] = ele[jj - 1];
			vol[jj] = vol[jj - 1];
			time1[jj] = time1[jj - 1] + 1000;
			jj++;
		}
	}
}
function rece() {
	/*online(position[0].fpositin);*/
	for (var i = 0; i < dd.length; i += 159) {
		for (var err1 = 0; err1 < position.length; err1++) {
			if (position[err1].fequipment_no == dd.substring(4 + i, 8 + i)) {
				po = position[err1].fposition;
			}
		}
	}
	for (var ba = 0; ba < back.length; ba++) {
		for (var baa = 0; baa < position.length; baa++) {
			if (back[ba] == position[baa].fequipment_no) {
				rece2(back[ba]);
			}
		}
	}

	timer1 = window.setInterval(function() {
		for (var t = 0; t < back.length; t++) {
			for (var baa1 = 0; baa1 < position.length; baa1++) {
				if (back[t] == position[baa1].fequipment_no) {
					rece2(back[t]);
					datatable();
					back.length = 0;
					rowdex = 0;
				}
			}
		}
	}, 300000);
/*    	timer2=window.setInterval(function (){
    		var columns = $('#dg').datagrid("options").columns;
    		var rows = $('#dg').datagrid("getRows"); 
    			alert(rows[dex][columns[0][0].field]);
    			for(var g = 0;g < dd.length;g+=53*3){
    			for(var dex=0;dex<rows.length;dex++){
    				alert(rows[dex][columns[0][1].field]);
    		    if((dd.substring(8+g, 12+g)!="0000")&&(parseInt(dd.substring(4+g, 8+g),16)==rows[dex].fequipment_no)){
    			rows[dex].fwelder_no=dd.substring(8+g, 12+g);
    			rows[dex].fstatus_id=dd.substring(0+g, 2+g);
				for(var k=0;k<namex.length;k++){
					if(namex[k].fwelder_no==dd.substring(8+g, 12+g)){
						rows[dex].fname=namex[k].fname;
					}
				}
    			$('#dg').datagrid('refreshRow', dex);
    			$("a[id='view']").linkbutton({text:'查看',plain:true,iconCls:'icon-view'});
    		    }
    		}
    	    }
    	},1000);*/
}

function datatable() {
	$("#dg").datagrid({
		fitColumns : true,
		height : ($("#body4").height()),
		width : $("#body4").width(),
		idField : 'id',
		/*			pageSize : 10,
					pageList : [ 10, 20, 30, 40, 50 ],*/
		url : 'td/getAllPosition',
		singleSelect : false,
		rownumbers : true,
		pagination : false,
		showPageList : false,
		columns : [ [ {
			field : 'fequipment_no',
			title : '焊机编号',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'fwelder_no',
			title : '焊工编号',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'fname',
			title : '焊工姓名',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'fposition',
			title : '设备位置',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'fstatus_id',
			title : '设备状态',
			width : 100,
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'view',
			title : '实时监测',
			width : 130,
			halign : "center",
			align : "left",
			formatter : function(value, row, index) {
				var str = "";
				str += '<a id="view" class="easyui-linkbutton" href="javascript:rece2(' + row.fequipment_no + ')"/>';
				return str;
			}
		} ] ],
		toolbar : '#toolbar',
		onLoadSuccess : function(data) {
			$("a[id='view']").linkbutton({
				text : '查看',
				plain : true,
				iconCls : 'icon-view'
			});
		},
		rowStyler : function(index, row) {
			if ((row.fstatus_id == "03") || (row.fstatus_id == "05") || (row.fstatus_id == "07")) {
				return 'background-color:#00FF00;color:black;';
			}
			/*	            else if (row.fstatus_id=="07"){
				                return 'background-color:#FF0000;color:black;';
				            }*/
			else if (row.fstatus_id == "00") {
				return 'background-color:#0000CD;color:black;';
			} else {
				return 'background-color:#A9A9A9;color:black;';
			}
		}
	});
}
;

function curve() {
	Highcharts.setOptions({
		global : {
			useUTC : false
		}
	});
	function activeLastPointToolip(chart) {
		var points = chart.series[0].points;
		chart.yAxis[0].removePlotLine('plot-line-1');
		chart.yAxis[0].removePlotLine('plot-line-2');
		/*  		    chart.tooltip.refresh(points[points.length -1]);
		  		    chart.tooltip.refresh(points1[points1.length -1]);*/
		chart.yAxis[0].addPlotLine({ //在y轴上增加 
			value : maxele, //在值为2的地方 
			width : 2, //标示线的宽度为2px 
			color : 'red', //标示线的颜色 
			dashStyle : 'longdashdot',
			id : 'plot-line-1', //标示线的id，在删除该标示线的时候需要该id标示 });
			label : {
				text : '最高电流', //标签的内容
				align : 'center', //标签的水平位置，水平居左,默认是水平居中center
				x : 10 //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
			}
		})
		chart.yAxis[0].addPlotLine({ //在y轴上增加 
			value : minele, //在值为2的地方 
			width : 2, //标示线的宽度为2px 
			color : 'red', //标示线的颜色 
			dashStyle : 'longdashdot',
			id : 'plot-line-2', //标示线的id，在删除该标示线的时候需要该id标示 });
			label : {
				text : '最低电流', //标签的内容
				align : 'center', //标签的水平位置，水平居左,默认是水平居中center
				x : 10 //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
			}
		})
	}

	$('#body31').highcharts({
		chart : {
			type : 'spline',
			animation : false, // don't animate in old IE
			marginRight : 70,
			events : {
				load : function() {
					// set up the updating of the chart each second
					var series = this.series[0],
						chart = this;
					timer = window.setInterval(function() {
						/*var x = (new Date()).getTime()+t,*/ // current time
						var x = time1[z],
							y = ele[z];
						z++;
						series.addPoint([ x, y ], true, true);
						activeLastPointToolip(chart);
					}, 1000);
				}
			}
		},
		title : {
			text : '电压电流实时监测'
		},
		xAxis : {
			type : 'datetime',
			tickPixelInterval : 150,
			lineColor : '#FFFFFF',
			tickWidth : 0,
			labels : {
				enabled : false
			}
		},
		yAxis : [ {
			max : 650, // 定义Y轴 最大值  
			min : 0, // 定义最小值  
			minPadding : 0.2,
			maxPadding : 0.2,
			tickInterval : 130,
			color : '#A020F0',
			title : {
				text : '电流',
				style : {
					color : '#A020F0'
				}
			}
		} ],
		tooltip : {
			formatter : function() {
				return '<b>' + this.series.name + '</b><br/>' +
					Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
					Highcharts.numberFormat(this.y, 2);
			},
		},
		legend : {
			enabled : false
		},
		exporting : {
			enabled : false
		},
		credits : {
			enabled : false // 禁用版权信息
		},
		series : [ {
			color : '#A020F0',
			name : '电流',

			data : (function() {
				// generate an array of random data
				var data = [],
					time = (new Date()).getTime(),
					/*time = new Date(Date.parse("0000-00-00 00:00:00")),*/
					i;
				for (i = -19; i <= 0; i += 1) {
					data.push({
						x : time1[0] - 1000 + i * 1000,
						/*x: time + i*1000,*/
						y : 0
					});
				}
				return data;
			}())
		} ]
	}, function(c) {
		activeLastPointToolip(c)
	});
}

function curve1() {
	Highcharts.setOptions({
		global : {
			useUTC : false
		}
	});
	function activeLastPointToolip(chart) {
		var points = chart.series[0].points;
		chart.yAxis[0].removePlotLine('plot-line-3');
		chart.yAxis[0].removePlotLine('plot-line-4');
		/*  		    chart.tooltip.refresh(points[points.length -1]);
		  		    chart.tooltip.refresh(points1[points1.length -1]);*/
		chart.yAxis[0].addPlotLine({ //在y轴上增加 
			value : maxvol, //在值为2的地方 
			width : 2, //标示线的宽度为2px 
			color : 'black', //标示线的颜色 
			dashStyle : 'longdashdot',
			id : 'plot-line-3', //标示线的id，在删除该标示线的时候需要该id标示 });
			label : {
				text : '最高电压', //标签的内容
				align : 'center', //标签的水平位置，水平居左,默认是水平居中center
				x : 10
			}
		})
		chart.yAxis[0].addPlotLine({ //在y轴上增加 
			value : minvol, //在值为2的地方 
			width : 2, //标示线的宽度为2px 
			color : 'black', //标示线的颜色 
			dashStyle : 'longdashdot',
			id : 'plot-line-4', //标示线的id，在删除该标示线的时候需要该id标示 });
			label : {
				text : '最低电压', //标签的内容
				align : 'center', //标签的水平位置，水平居左,默认是水平居中center
				x : 10 //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
			}
		})

	}

	$('#body32').highcharts({
		chart : {
			type : 'spline',
			animation : false, // don't animate in old IE
			marginRight : 70,
			events : {
				load : function() {
					// set up the updating of the chart each second
					var series = this.series[0],
						chart = this;
					timer5 = window.setInterval(function() {
						/*var x = (new Date()).getTime()+t,*/ // current time
						var x = time1[zz],
							y = vol[zz];
						zz++;
						series.addPoint([ x, y ], true, true);
						activeLastPointToolip(chart);
					}, 1000);
				}
			}
		},
		title : {
			text : false
		},
		xAxis : {
			type : 'datetime',
			tickPixelInterval : 150
		},
		yAxis : [ {
			max : 150, // 定义Y轴 最大值  
			min : 0, // 定义最小值  
			minPadding : 0.2,
			maxPadding : 0.2,
			tickInterval : 30,
			color : '#87CEFA',
			title : {
				text : '电压',
				style : {
					color : '#87CEFA'
				}
			},
		} ],
		tooltip : {
			formatter : function() {
				return '<b>' + this.series.name + '</b><br/>' +
					Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
					Highcharts.numberFormat(this.y, 2);
			},
		},
		legend : {
			enabled : false
		},
		exporting : {
			enabled : false
		},
		credits : {
			enabled : false // 禁用版权信息
		},
		series : [ {
			name : '电压',
			data : (function() {
				// generate an array of random data
				var data = [],
					time = (new Date()).getTime(),
					i;
				for (i = -19; i <= 0; i += 1) {
					data.push({
						x : time1[0] - 1000 + i * 1000,
						/*x: time + i*1000,*/
						y : 0
					});
				}
				return data;
			}()),
		} ]
	}, function(c) {
		activeLastPointToolip(c)
	});

}

function modiflyNum(id, value) {
	var elm = document.getElementById('time' + id.toString()).getElementsByTagName('li');
	var str = led[value];
	var cc = str.split(',');
	for (var i = 0; i < 7; i++) {
		elm[i].getElementsByTagName('img')[0].src = "resources/images/back.png";
	}
	for (var i = 0; i < cc.length; i++) {
		elm[parseInt(cc[i])].getElementsByTagName('img')[0].src = "resources/images/purple.png";
	}
}
function modiflyNum1(id, value) {
	var elm = document.getElementById('time' + id.toString()).getElementsByTagName('li');
	var str = led[value];
	var cc = str.split(',');
	for (var i = 0; i < 7; i++) {
		elm[i].getElementsByTagName('img')[0].src = "resources/images/back.png";
	}
	for (var i = 0; i < cc.length; i++) {
		elm[parseInt(cc[i])].getElementsByTagName('img')[0].src = "resources/images/blue.png";
	}
}