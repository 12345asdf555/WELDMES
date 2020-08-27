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
	<script type="text/javascript" src="resources/js/highcharts.js"></script>
	<script type="text/javascript" src="resources/js/session-overdue.js"></script>
	<script type="text/javascript" src="resources/js/exporting.js"></script>
	<script type="text/javascript" src="resources/js/echarts.js"></script>
	<script type="text/javascript" src="resources/js/td/newCurve.js"></script>
	<script type="text/javascript" src="resources/js/swfobject.js"></script>
	<script type="text/javascript" src="resources/js/web_socket.js"></script>
	<script type="text/javascript" src="resources/js/paho-mqtt.js"></script>
	<script type="text/javascript" src="resources/js/paho-mqtt-min.js"></script>
	<style type="text/css">
		#curvediv{
			top:60%;
			left:50%; 
			width:120px; 
			height:120px; 
			position:absolute; 
			margin-top:-100px; 
			margin-left:-100px; 
		}
		#curvediv ul li{
			padding-top:6px;
		}
	</style>
  </head>
  
<body class="easyui-layout">
	<jsp:include  page="../insframeworktree.jsp"/>
	<div id="bodydiv" region="center"  hide="true"  split="true" title="焊机实时状态监测" style="background: #fff; width:600px;height: 335px;">
		<div style="float:left; width:100%;height:250px;border:1px solid #C4C4C4;">
			<p style="text-align: center;color:#777777;font-size: 12pt">设备总数 ：<span id="machinenum" style="color:#fe0002">0</span></p>
			<center><hr style="width:95%"/></center>
			<!-- 饼图 -->
			<div id="piecharts" style="float:left; height:250px; width:49.5%;"></div>
			<!-- 实时信息 -->
			<div id="listdiv" style="float:left; height:250px; width:49.5%;position:relative; ">
				<input  name="afresh" id="afresh" type="hidden" value="${afreshLogin }"/>
				<div id="curvediv">
					<ul>
						<li>
							<img src="resources/images/weld_04.png">&nbsp;&nbsp;工作设备：<span id="work">0</span>
						</li>
						<li>
							<img src="resources/images/weld_03.png">&nbsp;&nbsp;待机设备：<span id="standby">0</span>
						</li>
						<li>
							<img src="resources/images/weld_02.png">&nbsp;&nbsp;故障设备：<span id="warn">0</span>
						</li>
						<li>
							<img src="resources/images/weld_05.png">&nbsp;&nbsp;关机设备：<span id="off">0</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div style="float:left; width:100%;height:auto;border:1px solid #C4C4C4;margin-top:5px;">
			<div style="float:left; width:100%;height:20px;border-bottom:1px solid #145d92;background-color: #145d92;color:#ffffff;">
				<div style="float:left;text:left;padding-left:20px;">设备监控</div>
				<div style="float:right;text:right;padding-right:20px;">
					状态:&nbsp;
					<select class="easyui-combobox" name="status" id="status" data-options="editable:false">
						<option value="99" selected="true">全部</option>
						<option value="0">工作</option>
						<option value="1">待机</option>
						<option value="2">故障</option>
						<option value="3">关机</option>
					</select>
				</div>
			</div>
			<!-- 实时焊机 -->
			<div id="curve" style="float:left;height:70%; width:99%;padding-left:10px;">
			</div>
			<div id="load" style="width:100%;height:100%;"></div>
		</div>
	</div>
	<style type="text/css">
	    #load{ display: none; position: absolute; left:0; top:0;width: 100%; height: 40%; background-color: #555753; z-index:10001; -moz-opacity: 0.4; opacity:0.5; filter: alpha(opacity=70);}
		#show{display: none; position: absolute; top: 45%; left: 45%; width: 180px; height: 5%; padding: 8px; border: 8px solid #E8E9F7; background-color: white; z-index:10002; overflow: auto;}
	</style>
</body>
</html>
 
 