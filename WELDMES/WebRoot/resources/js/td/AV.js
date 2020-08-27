/**
 * 
 */
var num1 = new Array();
var num2 = new Array();
var z = 0;
var jj = 0;
var t = 0;
var dd;
var time1 = new Array();
var maxele;
var maxvol;
var minele;
var minvol;
var socket;
var data1;
var namex;
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
	w();
//		q();
})
function w() {
	if (typeof (WebSocket) == "undefined") {
		alert("您的浏览器不支持WebSocket");
		return;
	}
	$(function() {
		//实现化WebSocket对象，指定要连接的服务器地址与端口
		socket = new WebSocket(data1);
		//打开事件
		socket.onopen = function() {
			//				alert("Socket 已打开");
			//socket.send("这是来自客户端的消息" + location.href + new Date());
		};
		//获得消息事件
		socket.onmessage = function(msg) {
			/*alert(msg.data);*/
			dd = msg.data;
			var va = document.getElementById("hid1").value;
			for (var j = 0; j < 1; j++) {
				for (var i = 0; i < dd.length; i += 53) {
					if (va == dd.substring(4 + i, 8 + i) && dd.substring(8 + i, 12 + i) != "0000") {
						var mach = parseInt(dd.substring(4 + i, 8 + i), 16);
						var weld = dd.substring(8 + i, 12 + i);
						var dati = dd.substring(20 + i, 39 + i);
						var val = Date.parse(dati);
						if ((jj != 0) && (val - time1[jj - 1] > 1000)) {
							for (var db = time1[jj - 1] + 1000; db < val; db = db + 1000) {
								time1[jj] = time1[jj - 1] + 1000;
								num1[jj] = 0;
								num2[jj] = 0;
								jj++;
							}
						}
						time1[jj] = val;
						var xx = dd.substring(12 + i, 16 + i);
						num1[jj] = parseInt(xx, 16);
						num2[jj] = parseInt(dd.substring(16 + i, 20 + i), 16);
						maxele = parseInt(dd.substring(41 + i, 44 + i));
						minele = parseInt(dd.substring(44 + i, 47 + i));
						maxvol = parseInt(dd.substring(47 + i, 50 + i));
						minvol = parseInt(dd.substring(50 + i, 53 + i));
						jj++;
						if (jj == 1) {
							Highcharts.setOptions({
								global : {
									useUTC : false
								}
							});
							function activeLastPointToolip(chart) {
								var points = chart.series[0].points;
								var points1 = chart.series[1].points;
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
									id : 'plot-line-1', //标示线的id，在删除该标示线的时候需要该id标示 });
									label : {
										text : '最低电流', //标签的内容
										align : 'center', //标签的水平位置，水平居左,默认是水平居中center
										x : 10 //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
									}
								})
								chart.yAxis[1].addPlotLine({ //在y轴上增加 
									value : maxvol, //在值为2的地方 
									width : 2, //标示线的宽度为2px 
									color : 'black', //标示线的颜色 
									dashStyle : 'longdashdot',
									id : 'plot-line-1', //标示线的id，在删除该标示线的时候需要该id标示 });
									label : {
										text : '最高电压', //标签的内容
										align : 'center', //标签的水平位置，水平居左,默认是水平居中center
										x : 10
									}
								})
								chart.yAxis[1].addPlotLine({ //在y轴上增加 
									value : minvol, //在值为2的地方 
									width : 2, //标示线的宽度为2px 
									color : 'black', //标示线的颜色 
									dashStyle : 'longdashdot',
									id : 'plot-line-1', //标示线的id，在删除该标示线的时候需要该id标示 });
									label : {
										text : '最低电压', //标签的内容
										align : 'center', //标签的水平位置，水平居左,默认是水平居中center
										x : 10 //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
									}
								})

							}

							$('#body1').highcharts({
								chart : {
									type : 'spline',
									animation : false, // don't animate in old IE
									marginRight : 70,
									events : {
										load : function() {
											// set up the updating of the chart each second
											var series = this.series[0],
												series1 = this.series[1],
												chart = this;
											setInterval(function() {
												if (z < jj) {
													/*var x = (new Date()).getTime()+t,*/ // current time
													var x = time1[z],
														y = num1[z];
													var y1 = num2[z];
													z++;
													t += 1000;
													series.addPoint([ x, y ], true, true);
													series1.addPoint([ x, y1 ], true, true);
													activeLastPointToolip(chart);
												}
											}, 1000);
										}
									}
								},
								title : {
									text : '电压电流实时监测'
								},
								xAxis : {
									type : 'datetime',
									tickPixelInterval : 150
								},
								yAxis : [ {
									max : 280, // 定义Y轴 最大值  
									min : 0, // 定义最小值  
									minPadding : 0.2,
									maxPadding : 0.2,
									tickInterval : 40,
									color : '#A020F0',
									title : {
										text : '电流',
										style : {
											color : '#A020F0'
										}
									}
								}, {
									max : 105, // 定义Y轴 最大值  
									min : 0, // 定义最小值  
									minPadding : 0.2,
									maxPadding : 0.2,
									tickInterval : 15,
									color : '#87CEFA',
									title : {
										text : '电压',
										style : {
											color : '#87CEFA'
										}
									},
									opposite : true
								} ],
								tooltip : {
									formatter : function() {
										return '<b>' + this.series.name + '</b><br/>' +
											Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
											Highcharts.numberFormat(this.y, 2);
									},
								},
								legend : {
									enabled : true
								},
								exporting : {
									enabled : false
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
								}, {
									name : '电压',
									yAxis : 1,
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
					}
					if (weld != "0000") {
						for (var k = 0; k < namex.length; k++) {
							if (namex[k].fwelder_no == dd.substring(8 + i, 12 + i)) {
								document.getElementById("weldname").value = namex[k].fname;
							}
						}
					}
				}
			/*					if(jj%3==1){
									num1[jj] = num1[jj-1];
									num1[jj+1] = num1[jj-1];
									num2[jj] = num2[jj-1];
									num2[jj+1] = num2[jj-1];
									time1[jj] = time1[jj-1]+1000;
									time1[jj+1] = time1[jj-1]+2000;
									jj=jj+2;
								}
								if(jj%3==2){
									num1[jj] = num1[jj-1];
									num2[jj] = num2[jj-1];
									time1[jj] = time1[jj-1]+1000;
									jj++;
								}*/
			}
		/*document.getElementById("machid").value = mach;*/
		};
		//关闭事件
		socket.onclose = function() {
			alert("Socket已关闭");
		};
		//发生了错误事件
		socket.onerror = function() {
			alert("发生了错误");
		}
	});

	$("#btnSend").click(function() {
		socket.send("强哥");
	});

	$("#btnClose").click(function() {
		socket.close();
	});
}
;

function q() {
	Highcharts.setOptions({
		global : {
			useUTC : false
		}
	});
	function activeLastPointToolip(chart) {
		var points = chart.series[0].points;
		var points1 = chart.series[1].points;
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
			id : 'plot-line-1', //标示线的id，在删除该标示线的时候需要该id标示 });
			label : {
				text : '最低电流', //标签的内容
				align : 'center', //标签的水平位置，水平居左,默认是水平居中center
				x : 10 //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
			}
		})
		chart.yAxis[1].addPlotLine({ //在y轴上增加 
			value : maxvol, //在值为2的地方 
			width : 2, //标示线的宽度为2px 
			color : 'black', //标示线的颜色 
			dashStyle : 'longdashdot',
			id : 'plot-line-1', //标示线的id，在删除该标示线的时候需要该id标示 });
			label : {
				text : '最高电压', //标签的内容
				align : 'center', //标签的水平位置，水平居左,默认是水平居中center
				x : 10
			}
		})
		chart.yAxis[1].addPlotLine({ //在y轴上增加 
			value : minvol, //在值为2的地方 
			width : 2, //标示线的宽度为2px 
			color : 'black', //标示线的颜色 
			dashStyle : 'longdashdot',
			id : 'plot-line-1', //标示线的id，在删除该标示线的时候需要该id标示 });
			label : {
				text : '最低电压', //标签的内容
				align : 'center', //标签的水平位置，水平居左,默认是水平居中center
				x : 10 //标签相对于被定位的位置水平偏移的像素，重新定位，水平居左10px
			}
		})

	}

	$('#body1').highcharts({
		chart : {
			type : 'spline',
			animation : false, // don't animate in old IE
			marginRight : 70,
			events : {
				load : function() {
					// set up the updating of the chart each second
					var series = this.series[0],
						series1 = this.series[1],
						chart = this;
					setInterval(function() {
						var x = time1[z], // current time
							y = num1[z];
						var y1 = num2[z];
						z++;
						series.addPoint([ x, y ], true, true);
						series1.addPoint([ x, y1 ], true, true);
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
			tickPixelInterval : 150
		},
		yAxis : [ {
			max : 280, // 定义Y轴 最大值  
			min : 0, // 定义最小值  
			minPadding : 0.2,
			maxPadding : 0.2,
			tickInterval : 40,
			color : '#A020F0',
			title : {
				text : '电流',
				style : {
					color : '#A020F0'
				}
			}
		}, {
			max : 105, // 定义Y轴 最大值  
			min : 0, // 定义最小值  
			minPadding : 0.2,
			maxPadding : 0.2,
			tickInterval : 15,
			color : '#87CEFA',
			title : {
				text : '电压',
				style : {
					color : '#87CEFA'
				}
			},
			opposite : true
		} ],
		tooltip : {
			formatter : function() {
				return '<b>' + this.series.name + '</b><br/>' +
					Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
					Highcharts.numberFormat(this.y, 2);
			},
		},
		legend : {
			enabled : true
		},
		exporting : {
			enabled : false
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
						x : time,
						y : num1[0]
					});
				}
				return data;
			}())
		}, {
			name : '电压',
			yAxis : 1,
			data : (function() {
				// generate an array of random data
				var data = [],
					time = (new Date()).getTime(),
					i;
				for (i = -19; i <= 0; i += 1) {
					data.push({
						x : time + i * 1000,
						y : num2[0]
					});
				}
				return data;
			}()),
		} ]
	}, function(c) {
		activeLastPointToolip(c)
	});

}