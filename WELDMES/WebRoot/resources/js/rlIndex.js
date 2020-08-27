var machine = new Array, off = new Array(), on = new Array(), warn = new Array(), stand = new Array(), cleardata = new Array();
var chartsDiv11 = null,chartsDiv12=null,chartsDiv221 = null,chartsDiv222 = null,chartsDiv21 = null,chartsDiv23 = null,chartsDiv13 = null;
$(function(){
	showChart11();
	showDiv12();
	showChart13();
	showChart21();
	showChart22();
	showChart23();
	 $.ajax({
         type: 'GET',
         url: 'https://www.tianqiapi.com/api/',
         data: 'version=v1&city=上海',
         dataType: 'JSON',
         error: function () {
             alert('网络错误');
         },
         success: function (res) {
             var weaStr = res.city + "  " + res.data[0].wea + "  " + res.data[0].tem2 + "~" + res.data[0].tem1 + "  空气" + res.data[0].air_level;
             $("#todayWeather").html(weaStr);
         }
     });
	 window.setInterval(function() {
		 var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			var hour = date.getHours();
			if (hour < 10) {
				hour = "0" + hour;
			}
			var minutes = date.getMinutes();
			if (minutes < 10) {
				minutes = "0" + minutes;
			}
			var second = date.getSeconds();
			if (second < 10) {
				second = "0" + second;
			}
			var timestr = year + "年" + month + "月" + day + "日  " + hour
					+ ":" + minutes + ":" + second;
			$("#nowTime").html(timestr);
	 }, 1000)
	 
	 window.addEventListener("resize", function () {
			chartsDiv11.resize();
			chartsDiv12.resize();
			chartsDiv13.resize();
			chartsDiv21.resize();
			chartsDiv221.resize();
			chartsDiv222.resize();
			chartsDiv23.resize();
	 });
})

function showDiv12(){
	var websocketURL=null,socket=null,tryTime = 0;
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
	
	$.ajax({
		type : "post",
		async : false,
		url : "td/getLiveMachine",
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				machine = eval(result.rows);
				for(var i=0;i<machine.length;i++){
					off.push(machine[i].fid);
				}
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	
	chartsDiv12 = echarts.init(document.getElementById("div1-2"));
	showChart12();
	
	if (typeof (WebSocket) == "undefined") {
		WEB_SOCKET_SWF_LOCATION = "resources/js/WebSocketMain.swf";
		WEB_SOCKET_DEBUG = true;
	}
	try {
		socket = new WebSocket(websocketURL);
	} catch (err) {
		alert("地址请求错误，请清除缓存重新连接！！！")
	}
	socket.onopen = function() {
		clearData();
	}
	socket.onmessage = function(msg) {
		var redata = msg.data;
		if(redata.length==297){
			for(var i = 0;i < redata.length;i+=99){
				for(var f=0;f<machine.length;f++){
					if(machine[f].fid==(parseInt(redata.substring(4+i, 8+i),10))){
						var cleardataIndex = $.inArray(parseInt(redata.substring(4+i, 8+i),10), cleardata);
						if(cleardataIndex==(-1)){
							cleardata.push(parseInt(redata.substring(4+i, 8+i),10));
							cleardata.push(new Date().getTime());
						}else{
							cleardata.splice(cleardataIndex+1, 1, new Date().getTime());
						}
						var mstatus = redata.substring(36 + i, 38 + i);
						if(mstatus=="00"){
							var num;
							num = $.inArray(parseInt(redata.substring(4+i, 8+i),10), stand);
							if(num==(-1)){
								stand.push(parseInt(redata.substring(4+i, 8+i),10));
							}
							num = $.inArray(parseInt(redata.substring(4+i, 8+i),10), warn);
							if(num!=(-1)){
								warn.splice(num, 1);
							}
							num = $.inArray(parseInt(redata.substring(4+i, 8+i),10), off);
							if(num!=(-1)){
								off.splice(num, 1);
							}
							num = $.inArray(parseInt(redata.substring(4+i, 8+i),10), on);
							if(num!=(-1)){
								on.splice(num, 1);
							}
						}else if(mstatus=="03"||mstatus=="05"||mstatus=="07"){
							var num;
							num = $.inArray(parseInt(redata.substring(4+i, 8+i),10), on);
							if(num==(-1)){
								on.push(parseInt(redata.substring(4+i, 8+i),10));
							}
							num = $.inArray(parseInt(redata.substring(4+i, 8+i),10), warn);
							if(num!=(-1)){
								warn.splice(num, 1);
							}
							num = $.inArray(parseInt(redata.substring(4+i, 8+i),10), off);
							if(num!=(-1)){
								off.splice(num, 1);
							}
							num = $.inArray(parseInt(redata.substring(4+i, 8+i),10), stand);
							if(num!=(-1)){
								stand.splice(num, 1);
							}
						}else{
							var num;
							num = $.inArray(parseInt(redata.substring(4+i, 8+i),10), warn);
							if(num==(-1)){
								warn.push(parseInt(redata.substring(4+i, 8+i),10));
							}
							num = $.inArray(parseInt(redata.substring(4+i, 8+i),10), on);
							if(num!=(-1)){
								on.splice(num, 1);
							}
							num = $.inArray(parseInt(redata.substring(4+i, 8+i),10), off);
							if(num!=(-1)){
								off.splice(num, 1);
							}
							num = $.inArray(parseInt(redata.substring(4+i, 8+i),10), stand);
							if(num!=(-1)){
								stand.splice(num, 1);
							}
						}
					}
				}
			}
		}
		var option = chartsDiv12.getOption();
		option.series[0].data = [
            {value:on.length, name:'工作', id :0},
            {value:stand.length, name:'待机', id :1},
            {value:warn.length, name:'故障', id :2},
            {value:off.length, name:'关机', id :3}
        ];
		chartsDiv12.setOption(option);
	};
	socket.onclose = function(e) {
		if (e.code == 4001 || e.code == 4002 || e.code == 4003 || e.code == 4005 || e.code == 4006) {
			//如果断开原因为4001 , 4002 , 4003 不进行重连.
			return;
		} 
		// 重试3次，每次之间间隔5秒
		if (tryTime < 3) {
			setTimeout(function() {
				socket = null;
				tryTime++;
				socket = new WebSocket(websocketURL);
			}, 5000);
		} else {
			tryTime = 0;
		}
	};
}

function showChart12(){
	chartsDiv12.showLoading({
		text: '稍等片刻,精彩马上呈现...',
		effect:'whirling'
	});
	option = {
		backgroundColor: '#11325f',
	    title:{
	        text: '设备状态',
	        x:'center',
	        textStyle: {
                color: '#fff'
            }
	    },
		tooltip:{
			trigger: 'item',
			formatter: function(param){
				return '<div>实时统计<div>'+'<div style="float:left;margin-top:5px;border-radius:50px;border:solid rgb(100,100,100) 1px;width:10px;height:10px;background-color:'+param.color+'"></div><div style="float:left;">&nbsp;'+param.name+'：'+param.value+'<div>';
			}
		},
		toolbox:{
			feature:{
				saveAsImage:{}//保存为图片
			},
			right:'2%'
		},
		legend: {
	        orient: 'vertical',
	        x: 'left',
	        textStyle: {color: '#fff'},
	        data:['工作','待机','故障','关机']
	    },
		series:[{
			name:'实时统计',
			type:'pie',
			radius : ['35%', '50%'],
			color:['#7cbc16','#55a7f3','#fe0002','#818181'],
			data:[
              {value:on.length, name:'工作', id :0},
              {value:stand.length, name:'待机', id :1},
              {value:warn.length, name:'故障', id :2},
              {value:off.length, name:'关机', id :3}
          ],
    		itemStyle : {
    			normal: {
    				label : {
    					formatter: function(param){
    						return param.name+"："+param.value;
    					}
    				}
    			}
    		}
		}]
	}
	// 1、清除画布
	chartsDiv12.clear();
	// 2、为echarts对象加载数据
	chartsDiv12.setOption(option);
	//3、在渲染点击事件之前先清除点击事件
	chartsDiv12.off('click');
	//隐藏动画加载效果
	chartsDiv12.hideLoading();
	$("#chartLoading").hide();
}

function clearData(){
	window.setInterval(function() {
		var timeflag = new Date().getTime();
		for(var i=0;i<cleardata.length;i=i+2){
			if(timeflag-cleardata[i+1]>=30000){
				cleardata.splice(i+1, 1);
				var num;
				num = $.inArray(cleardata[i], stand);
				if(num!=(-1)){
					stand.splice(num, 1);
				}
				num = $.inArray(cleardata[i], warn);
				if(num!=(-1)){
					warn.splice(num, 1);
				}
				num = $.inArray(cleardata[i], on);
				if(num!=(-1)){
					on.splice(num, 1);
				}
				num = $.inArray(cleardata[i], off);
				if(num==(-1)){
					off.push(cleardata[i]);
				}
				cleardata.splice(i, 1);
			}
		}
	}, 30000)
}

function showChart11(){
	var aryX = new Array(), aryS = new Array();
	var temp;
	$.ajax({
		type : "post",
		async : false,
		url : "datastatistics/getWarnTimes",
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				aryX = eval(result.aryX);
				aryS = eval(result.aryS);
				temp = eval(result.temp);
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	chartsDiv11 = echarts.init(document.getElementById("div1-1"));
	chartsDiv11.showLoading({
		text: '稍等片刻,精彩马上呈现...',
		effect:'whirling'
	});
	option = {
		backgroundColor: '#11325f',
	    title:{
	        text: '设备故障',
	        x:'center',
	        textStyle: {
                color: '#fff'
            }
	    },
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'cross',
	            crossStyle: {
	                color: '#999'
	            }
	        }
	    },
	    toolbox: {
	        feature: {
	            dataView: {show: true, readOnly: false},
	            magicType: {show: true, type: ['line', 'bar']},
	            restore: {show: true},
	            saveAsImage: {show: true}
	        }
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: aryX,
	            axisPointer: {
	                type: 'shadow',
	                crossStyle: {
		                color: '#999'
		            }
	            },
	            axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff'
                    },
                    interval:0,  
                    rotate:40
                }
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            name: '次数',
	            Color:"fff",
	            min: 0,
	            max: temp,
	            interval: 'auto',
	            axisLabel: {
	            	show: true,
                    textStyle: {
                        color: '#fff'
                    },
	                formatter: '{value} 次'
	            },
		        axisLine: {            // 坐标轴线
		            show: true,         // 默认显示，属性show控制显示与否
		            lineStyle: {        // 属性lineStyle控制线条样式
		                color: '#d24d62',
		                width: 2,
		                type: 'solid'
		            }
		        }
	        }
	    ],
        grid: {
		      left: "20%",
		},
		series:[{
			name:'故障次数',
			type:'bar',
			data:aryS
		}]
	}
	// 1、清除画布
	chartsDiv11.clear();
	// 2、为echarts对象加载数据
	chartsDiv11.setOption(option);
	//3、在渲染点击事件之前先清除点击事件
	chartsDiv11.off('click');
	//隐藏动画加载效果
	chartsDiv11.hideLoading();
	$("#chartLoading").hide();
}

function showChart22(){
	var onRatio=0,weldRatio=0;
	var temp;
	$.ajax({
		type : "post",
		async : false,
		url : "datastatistics/getOnAndWeldRatio",
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				onRatio = eval(result.onRatio);
				weldRatio = eval(result.weldRatio)
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	chartsDiv221 = echarts.init(document.getElementById("div2-21"));
	chartsDiv221.showLoading({
		text: '稍等片刻,精彩马上呈现...',
		effect:'whirling'
	});
	option = {
		title:{
	        text: '开机率',
	        x:'center',
	        textStyle: {
                color: '#fff'
            }
	    },
	    tooltip : {
	        formatter: "{a} {b} : {c}%"
	    },
	    toolbox: {
	        feature: {
	            restore: {},
	            saveAsImage: {}
	        }
	    },
	    series: [
	        {
	        	name:"开机率",
	            type: 'gauge',
	            detail: {
	            	formatter:'{value}%',
	            	textStyle:{
	                    "fontSize": 22,
	                    color: '#fff'
	                }
	            },
	            data: [{value: onRatio}]
	        }
	    ]
	}
	// 1、清除画布
	chartsDiv221.clear();
	// 2、为echarts对象加载数据
	chartsDiv221.setOption(option);
	//3、在渲染点击事件之前先清除点击事件
	chartsDiv221.off('click');
	//隐藏动画加载效果
	chartsDiv221.hideLoading();
	$("#chartLoading").hide();
	
	/***********************************************************/
	chartsDiv222 = echarts.init(document.getElementById("div2-22"));
	chartsDiv222.showLoading({
		text: '稍等片刻,精彩马上呈现...',
		effect:'whirling'
	});
	option = {
		title:{
	        text: '焊接率',
	        x:'center',
	        textStyle: {
                color: '#fff'
            }
	    },
	    tooltip : {
	        formatter: "{a} {b} : {c}%"
	    },
	    toolbox: {
	        feature: {
	            restore: {},
	            saveAsImage: {}
	        }
	    },
	    series: [
	        {
	        	name:"焊接率",
	            type: 'gauge',
	            detail: {
	            	formatter:'{value}%',
	            	textStyle:{
	                    "fontSize": 22,
	                    color: '#fff'
	                }},
	            data: [{value: weldRatio}]
	        }
	    ]
	}
	// 1、清除画布
	chartsDiv222.clear();
	// 2、为echarts对象加载数据
	chartsDiv222.setOption(option);
	//3、在渲染点击事件之前先清除点击事件
	chartsDiv222.off('click');
	//隐藏动画加载效果
	chartsDiv222.hideLoading();
	$("#chartLoading").hide();
}

function showChart21(){
	var aryX = new Array(), aryS0 = new Array(), aryS1 = new Array();
	var temp0,temp1;
	$.ajax({
		type : "post",
		async : false,
		url : "datastatistics/getOnAndWeldTime",
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				aryX = eval(result.aryX);
				aryS0 = eval(result.aryS0);
				aryS1 = eval(result.aryS1);
				temp = eval(result.temp);
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	chartsDiv21 = echarts.init(document.getElementById("div2-1"));
	chartsDiv21.showLoading({
		text: '稍等片刻,精彩马上呈现...',
		effect:'whirling'
	});
	option = {
		backgroundColor: '#11325f',
	    title:{
	        text: '开机和焊接时长',
	        x:'center',
	        textStyle: {
                color: '#fff'
            }
	    },
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'cross',
	            crossStyle: {
	                color: '#999'
	            }
	        }
	    },
	    toolbox: {
	        feature: {
	            dataView: {show: true, readOnly: false},
	            magicType: {show: true, type: ['line', 'bar']},
	            restore: {show: true},
	            saveAsImage: {show: true}
	        }
	    },
	    legend: {
	    	orient: 'horizontal',
	    	bottom: 'bottom',
	        data:['开机时长', '焊接时长'],
	        textStyle: {color: '#fff'}
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: aryX,
	            axisPointer: {
	                type: 'shadow',
	                crossStyle: {
		                color: '#999'
		            }
	            },
	            axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff'
                    },
                    interval:0,  
                    rotate:40
                }
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            name:"开机时长",
	            Color:"fff",
	            min: 0,
	            max: temp0,
	            interval: 'auto',
	            axisLabel: {
	            	show: true,
                    textStyle: {
                        color: '#c23531'
                    },
	                formatter: '{value} 时'
	            },
		        axisLine: {            // 坐标轴线
		            show: true,         // 默认显示，属性show控制显示与否
		            lineStyle: {        // 属性lineStyle控制线条样式
		                color: '#c23531',
		                width: 2,
		                type: 'solid'
		            }
		        }
	        },
	        {
	            type: 'value',
	            name:"焊接时长",
	            Color:"fff",
	            min: 0,
	            max: temp1,
	            interval: 'auto',
	            axisLabel: {
	            	show: true,
                    textStyle: {
                        color: '#5994f2'
                    },
	                formatter: '{value} 时'
	            },
		        axisLine: {            // 坐标轴线
		            show: true,         // 默认显示，属性show控制显示与否
		            lineStyle: {        // 属性lineStyle控制线条样式
		                color: '#5994f2',
		                width: 2,
		                type: 'solid'
		            }
		        }
	        }
	    ],
        grid: {
		      left: "20%"
		},
		series:[{
			name:'开机时长',
			type:'bar',
			data:aryS0
		},{
			name:'焊接时长',
            yAxisIndex: 1,
			type:'bar',
			data:aryS1
		}]
	}
	// 1、清除画布
	chartsDiv21.clear();
	// 2、为echarts对象加载数据
	chartsDiv21.setOption(option);
	//3、在渲染点击事件之前先清除点击事件
	chartsDiv21.off('click');
	//隐藏动画加载效果
	chartsDiv21.hideLoading();
	$("#chartLoading").hide();
}

function showChart23(){
	var aryX = new Array(), aryS0 = new Array(), aryS1 = new Array();
	var temp0,temp1;
	$.ajax({
		type : "post",
		async : false,
		url : "datastatistics/getWireAndFlow",
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				aryX = eval(result.aryX);
				aryS0 = eval(result.aryS0);
				aryS1 = eval(result.aryS1);
				temp0 = eval(result.temp0);
				temp1 = eval(result.temp1);
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	chartsDiv23 = echarts.init(document.getElementById("div2-3"));
	chartsDiv23.showLoading({
		text: '稍等片刻,精彩马上呈现...',
		effect:'whirling'
	});
	option = {
		backgroundColor: '#11325f',
	    title:{
	        text: '焊丝和气体消耗',
	        x:'center',
	        textStyle: {
                color: '#fff'
            }
	    },
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'cross',
	            crossStyle: {
	                color: '#999'
	            }
	        }
	    },
	    toolbox: {
	        feature: {
	            dataView: {show: true, readOnly: false},
	            magicType: {show: true, type: ['line', 'bar']},
	            restore: {show: true},
	            saveAsImage: {show: true}
	        }
	    },
	    legend: {
	    	orient: 'horizontal',
	    	bottom: 'bottom',
	        data:['焊丝消耗量', '气体消耗量'],
	        textStyle: {color: '#fff'}
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: aryX,
	            axisPointer: {
	                type: 'shadow',
	                crossStyle: {
		                color: '#999'
		            }
	            },
	            axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff'
                    },
                    interval:0,  
                    rotate:40
                }
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            name:"焊丝消耗",
	            Color:"fff",
	            min: 0,
	            max: temp0,
	            interval: 'auto',
	            axisLabel: {
	            	show: true,
                    textStyle: {
                        color: '#d24d62'
                    },
	                formatter: '{value} 米'
	            },
		        axisLine: {            // 坐标轴线
		            show: true,         // 默认显示，属性show控制显示与否
		            lineStyle: {        // 属性lineStyle控制线条样式
		                color: '#d24d62',
		                width: 2,
		                type: 'solid'
		            }
		        }
	        },
	        {
	            type: 'value',
	            name:"气体消耗",
	            Color:"fff",
	            min: 0,
	            max: temp1,
	            interval: 'auto',
	            axisLabel: {
	            	show: true,
                    textStyle: {
                        color: '#5994f2'
                    },
	                formatter: '{value} 升'
	            },
		        axisLine: {            // 坐标轴线
		            show: true,         // 默认显示，属性show控制显示与否
		            lineStyle: {        // 属性lineStyle控制线条样式
		                color: '#5994f2',
		                width: 2,
		                type: 'solid'
		            }
		        }
	        }
	    ],
        grid: {
		      left: "20%",
		},
		series:[{
			name:'焊丝消耗量',
			type:'bar',
			data:aryS0,
			itemStyle:{
                normal:{
                    color:'#d24d62'
                }
            }
		},{
			name:'气体消耗量',
            yAxisIndex: 1,
			type:'bar',
			data:aryS1,
			itemStyle:{
                normal:{
                    color:'#5994f2'
                }
            }
		}]
	}
	// 1、清除画布
	chartsDiv23.clear();
	// 2、为echarts对象加载数据
	chartsDiv23.setOption(option);
	//3、在渲染点击事件之前先清除点击事件
	chartsDiv23.off('click');
	//隐藏动画加载效果
	chartsDiv23.hideLoading();
	$("#chartLoading").hide();
}

function showChart13(){
	var aryX = new Array(), aryS0 = new Array(), aryS1 = new Array(), aryS2 = new Array();
	var temp0,temp1;
	$.ajax({
		type : "post",
		async : false,
		url : "datastatistics/getMachineOverSpe",
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				aryX = eval(result.aryX);
				aryS0 = eval(result.aryS0);
				aryS1 = eval(result.aryS1);
				aryS2 = eval(result.aryS2);
				temp0 = eval(result.temp0);
				temp1 = eval(result.temp1);
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	chartsDiv13 = echarts.init(document.getElementById("div1-3"));
	chartsDiv13.showLoading({
		text: '稍等片刻,精彩马上呈现...',
		effect:'whirling'
	});
	option = {
		backgroundColor: '#11325f',
	    title:{
	        text: '焊机超规范',
	        x:'center',
	        textStyle: {
                color: '#fff'
            }
	    },
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'cross',
	            crossStyle: {
	                color: '#999'
	            }
	        }
	    },
	    toolbox: {
	        feature: {
	            dataView: {show: true, readOnly: false},
	            magicType: {show: true, type: ['line', 'bar']},
	            restore: {show: true},
	            saveAsImage: {show: true}
	        }
	    },
	    legend: {
	    	orient: 'horizontal',
	    	bottom: 'bottom',
	        data:['总超规范', '超规范焊机', '总焊机数'],
	        textStyle: {color: '#fff'}
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: aryX,
	            axisPointer: {
	                type: 'shadow',
	                crossStyle: {
		                color: '#999'
		            }
	            },
	            axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff'
                    },
                    interval:0,  
                    rotate:40
                }
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            name:"次数",
	            Color:"fff",
	            min: 0,
	            max: temp0,
	            interval: 'auto',
	            axisLabel: {
	            	show: true,
                    textStyle: {
                        color: '#dd695d'
                    },
	                formatter: '{value} 次'
	            },
		        axisLine: {            // 坐标轴线
		            show: true,         // 默认显示，属性show控制显示与否
		            lineStyle: {        // 属性lineStyle控制线条样式
		                color: '#dd695d',
		                width: 2,
		                type: 'solid'
		            }
		        }
	        },
	        {
	            type: 'value',
	            name:"台数",
	            Color:"fff",
	            min: 0,
	            max: temp1,
	            interval: 'auto',
	            axisLabel: {
	            	show: true,
                    textStyle: {
                        color: '#5994f2'
                    },
	                formatter: '{value} 台'
	            },
		        axisLine: {            // 坐标轴线
		            show: true,         // 默认显示，属性show控制显示与否
		            lineStyle: {        // 属性lineStyle控制线条样式
		                color: '#5994f2',
		                width: 2,
		                type: 'solid'
		            }
		        }
	        }
	    ],
        grid: {
		      left: "20%"
		},
		series:[{
			name:'总超规范',
			type:'bar',
			data:aryS0,
			itemStyle:{
                normal:{
                    color:'#dd5052'
                }
            }
		},{
			name:'超规范焊机',
            yAxisIndex: 1,
			type:'bar',
			data:aryS1,
			itemStyle:{
                normal:{
                    color:'#5ec495'
                }
            }
		},{
			name:'总焊机数',
            yAxisIndex: 1,
			type:'bar',
			data:aryS2,
			itemStyle:{
                normal:{
                    color:'#516ee9'
                }
            }
		}]
	}
	// 1、清除画布
	chartsDiv13.clear();
	// 2、为echarts对象加载数据
	chartsDiv13.setOption(option);
	//3、在渲染点击事件之前先清除点击事件
	chartsDiv13.off('click');
	//隐藏动画加载效果
	chartsDiv13.hideLoading();
	$("#chartLoading").hide();
}
