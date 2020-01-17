var insfid;
var charts;
var websocketURL, dic, starows, redata, symbol=0, welderName, socket;
var worknum=0, standbynum=0, warnnum=0, offnum=0, flag = 0, showflag = 0;
var liveary = new Array(), machine = new Array;
var taskNum;

$(function(){
	$.ajax({
		type : "post",
		async : false,
		url : "weldedjunction/getWeldTask",
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				taskNum = eval(result.rows);
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	loadtree();
	websocketUrl();
	websocket();
	//状态发生改变
	$("#status").combobox({
		onChange : function(newValue, oldValue){
			statusClick(newValue);
		}
	});
})
function loadtree() {
	$("#myTree").tree({
		url : 'insframework/getConmpany', //请求路径
		onLoadSuccess : function(node, data) {
			var tree = $(this);
			if (data) {
				$(data).each(function(index, d) {
					if (this.state == 'closed') {
						tree.tree('expandAll');
					}
				});
			}
			if (data.length > 0) {
				//找到第一个元素
				var nownodes = $('#myTree').tree('find', data[0].id);
				insfid = nownodes.id;
				$('#myTree').tree('select', nownodes.target);
				getMachine(insfid);
				//初始化
				showChart();
			}

		},
		//树形菜单点击事件,获取项目部id，默认选择当前组织机构下的第一个
		onClick : function(node) {
			showflag = 0;
			document.getElementById("load").style.display="block";
			var sh = '<div id="show" style="align="center""><img src="resources/images/load.gif"/>正在加载，请稍等...</div>';
			$("#bodydiv").append(sh);
			document.getElementById("show").style.display="block";
			var nownodes = $('#myTree').tree('find', node.id);
			insfid = nownodes.id;
			$("#curve").html("");
			$("#standby").html(0);
			$("#work").html(0);
			$("#off").html(0);
			$("#overproof").html(0);
			$("#overtime").html(0);
			getMachine(insfid);
			/*var defaultnode = $('#myTree').tree('find', insfid);*/
			$('#itemname').html(nownodes.text);
			flag = 0;
			//清空实时数组
			liveary.length = 0;
			setTimeout(function() {
				if (symbol != 1) {
					/*alert("未接收到数据!!!");*/
		    		document.getElementById("load").style.display ='none';
		    		document.getElementById("show").style.display ='none';
				}
			}, 10000);
		}
	});
}

function websocketUrl() {
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
}

//获取焊机及焊工信息
function getMachine(insfid) {
	var url,welderurl;
	if (insfid == "" || insfid == null) {
		url = "td/getLiveMachine";
		welderurl = "td/getLiveWelder";
	} else {
		url = "td/getLiveMachine?parent=" + insfid;
		welderurl = "td/getLiveWelder?parent=" + insfid;
	}
	$.ajax({
		type : "post",
		async : false,
		url : url,
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				machine = eval(result.rows);
				$("#machinenum").html(machine.length);
				$("#off").html(machine.length);
//				showChart();
				$("#curve").html();
				for(var i=0;i<machine.length;i++){
					var imgnum = machine[i].model;
					var str = '<div id="machine'+machine[i].fid+'" style="width:250px;height:120px;float:left;margin-right:10px;display:none">'+
						'<div style="float:left;width:40%;height:100%;"><a href="td/goNextcurve?value='+machine[i].fid+'&valuename='+machine[i].fequipment_no+'&type='+machine[i].model+'"><img id="img'+machine[i].fid+'" src="resources/images/welder_'+imgnum+'3.png" style="height:110px;width:90%;padding-top:10px;"></a></div>'+
						'<div style="float:left;width:60%;height:100%;">'+
						'<ul><li style="width:100%;height:19px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">设备编号：<span id="m1'+machine[i].fid+'">'+machine[i].fequipment_no+'</span></li>'+
						'<li style="width:100%;height:19px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">任务编号：<span id="m2'+machine[i].fid+'">--</span></li>'+
						'<li style="width:100%;height:19px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">操作人员：<span id="m3'+machine[i].fid+'">--</span></li>'+
						'<li style="width:100%;height:19px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">焊接电流：<span id="m4'+machine[i].fid+'">--A</span></li>'+
						'<li style="width:100%;height:19px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">焊接电压：<span id="m5'+machine[i].fid+'">--V</span></li>'+
						'<li style="width:100%;height:19px;">焊机状态：<span id="m6'+machine[i].fid+'">关机</span></li></ul><input id="status'+machine[i].fid+'" type="hidden" value="3"></div></div>';
					$("#curve").append(str);
					var statusnum = $("#status").combobox('getValue');
					if(showflag==0 && (statusnum==99 || statusnum==3)){
						$("#machine"+machine[i].fid).show();
					}
				}
				showflag=1;
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
	
	//获取焊工信息
	$.ajax({  
	      type : "post",  
	      async : false,
	      url : welderurl,  
	      data : {},  
	      dataType : "json", //返回数据形式为json  
	      success : function(result) {
	          if (result) {
	        	  welderName=eval(result.rows);
	          }  
	      },
	      error : function(errorMsg) {  
	          alert("数据请求失败，请联系系统管理员!");
		}
	});
}
function websocket() {
	if (typeof (WebSocket) == "undefined") {
		WEB_SOCKET_SWF_LOCATION = "resources/js/WebSocketMain.swf";
		WEB_SOCKET_DEBUG = true;
	}
	webclient();
}

function webclient() {
	var tryTime = 0;
	try {
		socket = new WebSocket(websocketURL);
	} catch (err) {
		alert("地址请求错误，请清除缓存重新连接！！！")
	}
	setTimeout(function() {
		if (socket.readyState != 1) {
			alert("与服务器连接失败,请检查网络设置!");
		}
	}, 10000);
	socket.onopen = function() {
		//			datatable();
		//监听加载状态改变  
		document.onreadystatechange = completeLoading();

		//加载状态为complete时移除loading效果 
		function completeLoading() {
			var loadingMask = document.getElementById('loadingDiv');
			loadingMask.parentNode.removeChild(loadingMask);
		}
		/*setTimeout(function(){
			if(symbol==0){
				alert("连接成功，但未接收到任何数据");
			}
		},5000);*/
	};
	socket.onmessage = function(msg) {
		redata = msg.data;
		if(redata==null || redata=="" || showflag==0){
			for(var i=0;i<machine.length;i++){
				$("#machine"+machine[i].fid).show();
			}
			showflag = 1;
		}
		iview();
		symbol++;
	};
	//关闭事件
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
				var _PageHeight = document.documentElement.clientHeight,
					_PageWidth = document.documentElement.clientWidth;
				var _LoadingTop = _PageHeight > 61 ? (_PageHeight - 61) / 2 : 0,
					_LoadingLeft = _PageWidth > 215 ? (_PageWidth - 215) / 2 : 0;
				var _LoadingHtml = '<div id="loadingDiv" style="position:absolute;left:0;width:100%;height:' + _PageHeight + 'px;top:0;background:#f3f8ff;opacity:0.8;filter:alpha(opacity=80);z-index:10000;"><div style="position: absolute; cursor1: wait; left: ' + _LoadingLeft + 'px; top:' + _LoadingTop + 'px; width: auto; height: 57px; line-height: 57px; padding-left: 50px; padding-right: 5px; background: #fff url(resources/images/load.gif) no-repeat scroll 5px 10px; border: 2px solid #95B8E7; color: #696969;">""正在尝试第"' + tryTime + '"次重连，请稍候..."</div></div>';
				document.write(_LoadingHtml);
				try {
					socket = new WebSocket(websocketURL);
				} catch (e) {
					document.clear();
				}
			}, 5000);
		} else {
			tryTime = 0;
		}
	};
	//发生了错误事件
	socket.onerror = function() {
		alert("发生异常，正在尝试重新连接服务器！！！");
	}
}

function iview(){
	if(flag==0){
		if(machine!=null){
			document.getElementById("load").style.display="block";
			var sh = '<div id="show" style="align="center""><img src="resources/images/load.gif"/>正在加载，请稍等...</div>';
			$("#bodydiv").append(sh);
			document.getElementById("show").style.display="block";
		}
		window.setTimeout(function() {
			tempary = liveary.concat();
			worknum=0, standbynum=0, warnnum=0, offnum=machine.length-tempary.length;
			//默认显示所有
			for(var i=0;i<machine.length;i++){
				for(var j=0;j<tempary.length;j++){
					if(tempary[j].fid==machine[i].fid){
						$("#m4"+machine[i].fid).html(tempary[j].liveele);
						$("#m5"+machine[i].fid).html(tempary[j].livevol);
						$("#m6"+machine[i].fid).html(tempary[j].livestatus);
						$("#status"+machine[i].fid).val(tempary[j].livestatusid);
						$("#img"+machine[i].fid).attr("src",tempary[j].liveimg);
					}
				}
				$("#machine"+machine[i].fid).show();
			}
			for(var j=0;j<tempary.length;j++){
				var status = $("#status"+tempary[j].fid).val();
				if(status == 0){
					worknum += 1;
				}else if(status == 1){
					standbynum += 1;
				}else if(status == 2){
					warnnum += 1;
				}else if(status == 3){
					offnum += 1;
				}
			}
			$("#work").html(worknum);
			$("#standby").html(standbynum);
			$("#warn").html(warnnum);
			$("#off").html(offnum);
			showChart();
    		document.getElementById("load").style.display ='none';
    		document.getElementById("show").style.display ='none';
		},5000);
		flag=2;
	}

	if(redata.length==297 || redata.length%99==0){
		for(var i = 0;i < redata.length;i+=99){
			for(var f=0;f<machine.length;f++){
				if(machine[f].fid==(parseInt(redata.substring(4+i, 8+i),10))){
						var imgnum = machine[f].model;
						$("#m3"+machine[f].fid).html("--");
						$("#m2"+machine[f].fid).html("--");
						for(var k=0;k<welderName.length;k++){
							if(welderName[k].fid==parseInt(redata.substring(0+i, 4+i))){
								$("#m3"+machine[f].fid).html(welderName[k].fwelder_no);
							}
						}
						for (var t = 0; t < taskNum.length; t++) {
							if (taskNum[t].id == parseInt(redata.substring(12 + i, 16 + i),10)) {
								$("#m2"+machine[f].fid).html(taskNum[t].weldedJunctionno);
							}
						}
						if(parseInt(redata.substring(32+i, 36+i),10)==137){
							var liveele = parseFloat((parseInt(redata.substring(38+i, 42+i),10)/10).toFixed(1));
						}else{
							var liveele = parseInt(redata.substring(38+i, 42+i),10);
						}
			            var livevol = parseFloat(parseInt(redata.substring(42+i, 46+i),10)/10).toFixed(1);
			            var maxele = parseInt(redata.substring(75+i, 79+i),10);
			            var minele = parseInt(redata.substring(79+i, 83+i),10);
			            var maxvol = parseInt(redata.substring(83+i, 87+i),10);
			            var minvol = parseInt(redata.substring(87+i, 91+i),10);
						var mstatus = redata.substring(36 + i, 38 + i);
						var livestatus,livestatusid,liveimg;
						switch (mstatus){
						case "00":
							livestatus = "待机";
							livestatusid = 1;
							liveimg = "resources/images/welder_"+imgnum+"1.png";
							break;
						case "01":
							livestatus = "E-010 焊枪开关OFF等待";
							livestatusid = 2;
							liveimg = "resources/images/welder_"+imgnum+"2.png";
							break;
						case "02":
							livestatus = "E-000工作停止";
							livestatusid = 2;
							liveimg = "resources/images/welder_"+imgnum+"2.png";
							break;
						case "03":
							livestatus = "工作";
							livestatusid = 0;
							liveimg = "resources/images/welder_"+imgnum+"0.png";
							break;
						case "04":
							livestatus = "电流过低";
							livestatusid = 2;
							liveimg = "resources/images/welder_"+imgnum+"2.png";
							break;
						case "05":
							livestatus = "收弧";
							livestatusid = 0;
							liveimg = "resources/images/welder_"+imgnum+"0.png";
							break;
						case "06":
							livestatus = "电流过高";
							livestatusid = 2;
							liveimg = "resources/images/welder_"+imgnum+"2.png";
							break;
						case "07":
							livestatus = "启弧";
							livestatusid = 0;
							liveimg = "resources/images/welder_"+imgnum+"0.png";
							break;
						case "08":
							livestatus = "电压过低";
							livestatusid = 2;
							liveimg = "resources/images/welder_"+imgnum+"2.png";
							break;
						case "09":
							livestatus = "电压过高";
							livestatusid = 2;
							liveimg = "resources/images/welder_"+imgnum+"2.png";
							break;
						case "10":
							livestatus = "E-100控制电源异常";
							livestatusid = 2;
							liveimg = "resources/images/welder_"+imgnum+"2.png";
							break;
						case "15":
							livestatus = "E-150一次输入电压过高";
							livestatusid = 2;
							liveimg = "resources/images/welder_"+imgnum+"2.png";
							break;
						case "16":
							livestatus = "E-160一次输入电压过低";
							livestatusid = 2;
							liveimg = "resources/images/welder_"+imgnum+"2.png";
							break;
						case "20":
							livestatus = "E-200一次二次电流检出异常";
							livestatusid = 2;
							liveimg = "resources/images/welder_"+imgnum+"2.png";
							break;
						case "21":
							livestatus = "E-210电压检出异常";
							livestatusid = 2;
							liveimg = "resources/images/welder_"+imgnum+"2.png";
							break;
						case "22":
							livestatus = "E-220逆变电路反馈异常";
							livestatusid = 2;
							liveimg = "resources/images/welder_"+imgnum+"2.png";
							break;
						case "30":
							livestatus = "E-300温度异常";
							livestatusid = 2;
							liveimg = "resources/images/welder_"+imgnum+"2.png";
							break;
						case "70":
							livestatus = "E-700输出过流异常";
							livestatusid = 2;
							liveimg = "resources/images/welder_"+imgnum+"2.png";
							break;
						case "71":
							livestatus = "E-710输入缺相异常";
							livestatusid = 2;
							liveimg = "resources/images/welder_"+imgnum+"2.png";
							break;
						case "98":
							livestatus = "超规范停机";
							livestatusid = 2;
							liveimg = "resources/images/welder_"+imgnum+"2.png";
							break;
						case "99":
							livestatus = "超规范报警";
							livestatusid = 2;
							liveimg = "resources/images/welder_"+imgnum+"2.png";
							break;
						}
						if(liveary.length==0){
							liveary.push(
									{"fid":machine[f].fid,
									"liveele":liveele+"A",
									"livevol":livevol+"V",
									"livestatus":livestatus,
									"livestatusid":livestatusid,
									"liveimg":liveimg})
						}else{
							var tempflag = false;
							for(var x=0;x<liveary.length;x++){
								if(liveary[x].fid == machine[f].fid){
									tempflag = true;
									liveary.splice(x, 1, {"fid":machine[f].fid,
										"liveele":liveele+"A",
										"livevol":livevol+"V",
										"livestatus":livestatus,
										"livestatusid":livestatusid,
										"liveimg":liveimg})
										break;
								}
								if(x == liveary.length-1){
									liveary.push(
											{"fid":machine[f].fid,
											"liveele":liveele+"A",
											"livevol":livevol+"V",
											"livestatus":livestatus,
											"livestatusid":livestatusid,
											"liveimg":liveimg})
								}
						}
					}
				}
			}
		};
	}
}

var charts,flagnum=0;
//饼图统计
function showChart(){
	if(flagnum==0){
		flagnum = 1;
	   	//初始化echart实例
		charts = echarts.init(document.getElementById("piecharts"));
	}
 	//显示加载动画效果
	charts.showLoading({
		text: '稍等片刻,精彩马上呈现...',
		effect:'whirling'
	});
	option = {
		tooltip:{
			trigger: 'item',
			formatter: function(param){
				return '<div>实时统计<div>'+'<div style="float:left;margin-top:5px;border-radius:50px;border:solid rgb(100,100,100) 1px;width:10px;height:10px;background-color:'+param.color+'"></div><div style="float:left;">&nbsp;'+param.name+'：'+param.value+'%<div>';
			}
		},
		toolbox:{
			feature:{
				saveAsImage:{}//保存为图片
			},
			right:'2%'
		},
		series:[{
			name:'实时统计',
			type:'pie',
			radius : ['45%', '60%'],
			color:['#7cbc16','#55a7f3','#fe0002','#818181'],
			data:[
              {value:($("#work").html()/$("#machinenum").html()*100).toFixed(2), name:'工作', id :0},
              {value:($("#standby").html()/$("#machinenum").html()*100).toFixed(2), name:'待机', id :1},
              {value:($("#warn").html()/$("#machinenum").html()*100).toFixed(2), name:'故障', id :2},
              {value:($("#off").html()/$("#machinenum").html()*100).toFixed(2), name:'关机', id :3}
          ],
    		itemStyle : {
    			normal: {
    				label : {
    					formatter: function(param){
    						return param.name+"："+param.value+"%";
    					}
    				}
    			}
    		}
		}]
	}
	// 1、清除画布
	charts.clear();
	// 2、为echarts对象加载数据
	charts.setOption(option);
	//3、在渲染点击事件之前先清除点击事件
	charts.off('click');
	//隐藏动画加载效果
	charts.hideLoading();
	// 4、echarts 点击事件
	charts.on('click', function (param) {
		statusClick(param.data.id);
	});
	$("#chartLoading").hide();
}

//每30'刷新一次
var tempary = new Array();
window.setInterval(function(){
	//清空数组
//	liveary.length = 0;
//	window.setTimeout(function() {
		tempary = liveary.concat();
		var statusnum = $("#status").combobox('getValue');
		worknum=0, standbynum=0, warnnum=0, offnum=machine.length-tempary.length;
		for(var i=0;i<machine.length;i++){
			var off = true;
			var imgnum = machine[i].model;
			for(var j=0;j<tempary.length;j++){
				if(machine[i].fid==tempary[j].fid){
					off = false;
				}
			}
			if(off){
				$("#m3"+machine[i].fid).html("--");
				$("#m4"+machine[i].fid).html("--A");
				$("#m5"+machine[i].fid).html("--V");
				$("#m6"+machine[i].fid).html("关机");
				$("#status"+machine[i].fid).val(3);
				$("#img"+machine[i].fid).attr("src","resources/images/welder_"+imgnum+"3.png");
			}
			if(statusnum == 99){
				for(var j=0;j<tempary.length;j++){
					if(tempary[j].fid==machine[i].fid){
						$("#m4"+machine[i].fid).html(tempary[j].liveele);
						$("#m5"+machine[i].fid).html(tempary[j].livevol);
						$("#m6"+machine[i].fid).html(tempary[j].livestatus);
						$("#status"+machine[i].fid).val(tempary[j].livestatusid);
						$("#img"+machine[i].fid).attr("src",tempary[j].liveimg);
					}
				}
				$("#machine"+machine[i].fid).show();
			}else{
				$("#machine"+machine[i].fid).hide();
				if(statusnum==3){
					var offflag = true;
					for(var j=0;j<tempary.length;j++){
						if(machine[i].fid==tempary[j].fid){
							offflag = false;
						}
					}
					if(offflag){
						$("#m3"+machine[i].fid).html("--");
						$("#m4"+machine[i].fid).html("--A");
						$("#m5"+machine[i].fid).html("--V");
						$("#m6"+machine[i].fid).html("关机");
						$("#status"+machine[i].fid).val(3);
						$("#img"+machine[i].fid).attr("src","resources/images/welder_04.png");
						$("#machine"+machine[i].fid).show();
					}
				}
			}
		}
		for(var j=0;j<tempary.length;j++){
//			var status = $("#status"+tempary[j].fid).val();
			var status = tempary[j].livestatusid;
			if(status == 0){
				worknum += 1;
			}else if(status == 1){
				standbynum += 1;
			}else if(status == 2){
				warnnum += 1;
			}else if(status == 3){
				offnum += 1;
			}
			if(status == statusnum){
				$("#m4"+tempary[j].fid).html(tempary[j].liveele);
				$("#m5"+tempary[j].fid).html(tempary[j].livevol);
				$("#m6"+tempary[j].fid).html(tempary[j].livestatus);
				$("#status"+tempary[j].fid).val(tempary[j].livestatusid);
				$("#img"+tempary[j].fid).attr("src",tempary[j].liveimg);
				$("#machine"+tempary[j].fid).show();
			}
		}
		$("#work").html(worknum);
		$("#standby").html(standbynum);
		$("#warn").html(warnnum);
		$("#off").html(offnum);
		showChart();
		liveary.length = 0;
//	}, 6000);
},30000);

//状态按钮点击事件
function statusClick(statusnum){
	$("#status").combobox('setValue',statusnum);
	for(var i=0;i<machine.length;i++){
		if(statusnum == 99){
			for(var j=0;j<tempary.length;j++){
				if(tempary[j].fid==machine[i].fid){
					$("#m4"+machine[i].fid).html(tempary[j].liveele);
					$("#m5"+machine[i].fid).html(tempary[j].livevol);
					$("#m6"+machine[i].fid).html(tempary[j].livestatus);
					$("#status"+machine[i].fid).val(tempary[j].livestatusid);
					$("#img"+machine[i].fid).attr("src",tempary[j].liveimg);
				}
			}
			$("#machine"+machine[i].fid).show();
		}else{
			$("#machine"+machine[i].fid).hide();
			if(statusnum==3){
				var offflag = true;
				var imgnum = machine[i].model;
				for(var j=0;j<tempary.length;j++){
					if(machine[i].fid==tempary[j].fid){
						offflag = false;
					}
				}
				if(offflag){
					$("#m3"+machine[i].fid).html("--");
					$("#m4"+machine[i].fid).html("--A");
					$("#m5"+machine[i].fid).html("--V");
					$("#m6"+machine[i].fid).html("关机");
					$("#status"+machine[i].fid).val(3);
					$("#img"+machine[i].fid).attr("src","resources/images/welder_"+imgnum+"3.png");
					$("#machine"+machine[i].fid).show();
				}
			}
		}
	}
	for(var j=0;j<tempary.length;j++){
		var status = tempary[j].livestatusid;
		if(status == statusnum){
			$("#m4"+tempary[j].fid).html(tempary[j].liveele);
			$("#m5"+tempary[j].fid).html(tempary[j].livevol);
			$("#m6"+tempary[j].fid).html(tempary[j].livestatus);
			$("#status"+tempary[j].fid).val(tempary[j].livestatusid);
			$("#img"+tempary[j].fid).attr("src",tempary[j].liveimg);
			$("#machine"+tempary[j].fid).show();
		}
	}
}

//监听窗口大小变化
window.onresize = function() {
	setTimeout(domresize, 500);
}

//改变图表高宽
function domresize() {
	charts.resize();
}
  	