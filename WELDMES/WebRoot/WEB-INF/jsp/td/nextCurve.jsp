<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>实时界面</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="resources/css/main.css">
	<link rel="stylesheet" type="text/css" href="resources/themes/icon.css" />
	<link rel="stylesheet" type="text/css" href="resources/themes/default/easyui.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/base.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/iconfont.css">
	
	<script type="text/javascript" src="resources/js/loading.js"></script>
	<script type="text/javascript" src="resources/js/jquery.min.js"></script>
	<script type="text/javascript" src="resources/js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="resources/js/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="resources/js/easyui-extend-check.js"></script>
	<script type="text/javascript" src="resources/js/session-overdue.js"></script>
	<script type="text/javascript" src="resources/js/highcharts.js"></script>
	<script type="text/javascript" src="resources/js/exporting.js"></script>
	<script type="text/javascript" src="resources/js/td/nextCurve.js"></script>
	<script type="text/javascript" src="resources/js/swfobject.js"></script>
	<script type="text/javascript" src="resources/js/web_socket.js"></script>
	<script type="text/javascript" src="resources/js/paho-mqtt.js"></script>
	<script type="text/javascript" src="resources/js/paho-mqtt-min.js"></script>
	<style type="text/css">
		table tr td{
			font-size: 14px;
		}
		#attrtable tr td{
			height:30px;
		}
	</style>
  </head>
  
<body class="easyui-layout">
	<input  name="machineid" id="machineid" type="hidden" value="${value }"/>
	<input id="type" type="hidden" value="${type }"/>
	<input  name="afresh" id="afresh" type="hidden" value="${afreshLogin }"/>
	<div id="bodys" region="center"  hide="true"  split="true">
		<div style="float:left; width:100%;height:30px;background-color: #145d92;color:#ffffff;font-size:14px;">设备运行参数监控
		<div style="float:right;"><a href="td/AllTd"><img src="resources/images/history.png" style="height:30px;width:40px;padding-top:5px;"></a></div></div>
		<div style="width:25%;height:150px;float:left;margin-left:20px;position: relative;">
			<fieldset>
				<legend>设备信息</legend>
				<div style="float:left;width:40%;height:150px;margin-left:10px;"><a href="td/AllTd"><img id="mrjpg" src="resources/images/welder_03.png" style="height:90%;width:85%;padding-top:10px;"></a></div>
				<div style="float:left;width:60%;height:150px;top:30px;left:45%;margin:auto;position:absolute;">
					<ul>
						<li style="width:100%;height:22px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
						设备编号：<span id="l1"></span>${valuename}</li>
						<li style="width:100%;height:22px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
						设备类型：<span id="l2"></span></li>
						<li style="width:100%;height:22px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
						任务编号：<span id="l3"></span></li>
						<li style="width:100%;height:22px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
						操作人员：<span id="l4"></span></li>
						<li style="width:100%;height:22px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
						设备状态：<input type="text" readonly="readonly" id="l5" value="关机" style="border-radius: 5px;width:80px;height:20px;text-align:center;color:#ffffff;background: #818181"></li>
					</ul>
				</div>
			</fieldset>
		</div>
		<div style="width:23%;height:150px;float:left;margin-left:10px;position: relative;">
			<fieldset>
				<legend>焊接参数</legend>
				<div style="width:95%;height:75px;margin-left:20px;">
					<div style="float:left;background-color: #37d512;width:100px;height:40px;border-radius: 10px;margin-top:10px;font-size:20pt;text-align: center;color:#ffffff">电流</div>
					<div style="float:left;width:60px;height:40px;margin-left:15px;font-size:26pt;font-weight: bold;text-align: center;"><span id="c1">0</span>&nbsp;&nbsp;A</div>
				</div>
				<div style="width:95%;height:75px;margin-left:20px;">
					<div style="float:left;background-color: #f05e0e;width:100px;height:40px;border-radius: 10px;font-size:20pt;text-align:center;color:#ffffff">电压</div>
					<div style="float:left;width:60px;height:40px;margin-top:-8px;margin-left:15px;font-size:26pt;font-weight: bold;text-align: center;"><span id="c2">0</span>&nbsp;&nbsp;V</div>
				</div>
			</fieldset>
		</div>
		<div style="width:47%;height:150px;float:left;margin-left:10px;position: relative;">
			<fieldset>
				<legend>设备特征</legend>
				<div style="float:left;width:20%;height:120px;padding-top:30px;margin-left:20px;">
					<ul>
						<li style="width:100%;height:22px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
						开机时长：<span id="r1"></span></li>
						<li style="width:100%;height:22px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
						离线时长：<span id="r2"></span></li>
						<li style="width:100%;height:22px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
						工作时长：<span id="r3">00:00:00</span></li>
						<li style="width:100%;height:22px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
						焊接时长：<span id="r4">00:00:00</span></li>
					</ul>
				</div>
				<div style="float:left;width:24%;height:120px;padding-top:30px;margin-left:20px;">
					<ul>
						<li style="width:100%;height:22px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
						通道总数：<span id="r5">30</span></li>
						<li style="width:100%;height:22px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
						当前通道：<span id="r6"></span></li>
						<li style="width:100%;height:22px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
						焊接控制：<span id="r7"></span></li>
						<li style="width:100%;height:22px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
						送丝速度：<span id="r8"></span></li>
					</ul>
				</div>
				<div style="float:left;width:20%;height:120px;padding-top:30px;margin-left:20px;">
					<ul>
						<li style="width:100%;height:22px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
						气体流量：<span id="r9"></span></li>
						<li style="width:100%;height:22px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
						瞬时功率：<span id="r10"></span></li>
						<li style="width:100%;height:22px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
						提前送气时间：<span id="r11"></span></li>
						<li style="width:100%;height:22px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
						滞后停气时间：<span id="r12"></span></li>
					</ul>
				</div>
				<div style="float:left;width:20%;height:120px;padding-top:30px;margin-left:20px;">
					<ul>
						<li style="width:100%;height:22px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
						预置电流：<span id="r13"></span></li>
						<li style="width:100%;height:22px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
						预置电压：<span id="r14"></span></li>
						<li style="width:100%;height:22px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
						初期电流：<span id="r15"></span></li>
						<li style="width:100%;height:22px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
						收弧电流：<span id="r16"></span></li>
					</ul>
				</div>
			</fieldset>
		</div>
		<div style="float:left; width:100%;height:20px;margin-top:25px;background-color: #145d92;color:#ffffff;text-align:center;">焊接曲线</div>
		<div id="livediv" style="width:100%;height:68%;float:left;top:26%;">
			<div style="float:left; padding-top:2%;width:40px;height:42%;background-color: #37d512;border-radius: 6px;font-size:16pt;color:#ffffff;margin:10px;text-align: center;">
			电流曲线<div style="width:25px;height:25px;border-radius: 60px;font-size:14pt;background-color: #ffffff;color: #000;margin-left:7px;">A</div></div>
			<div id="body31" style="float:left;width:90%;height:48%;"></div>
			<div style="float:left; width:100%;height:10px;background-color: #C4C4C4;"></div>
			<div style="float:left; padding-top:2%;width:40px;height:42%;background-color: #f05e0e;border-radius: 6px;font-size:16pt;color:#ffffff;margin:10px;text-align: center;">
			电压曲线<div style="width:25px;height:25px;border-radius: 60px;font-size:14pt;background-color: #ffffff;color: #000;margin-left:7px;">V</div></div>
			<div id="body32" style="float:left;width:90%;height:48%;"></div>
		</div>
	</div>
</body>
</html>
 
 