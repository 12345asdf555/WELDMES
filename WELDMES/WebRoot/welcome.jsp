<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>欢迎使用</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<link rel="stylesheet" type="text/css" href="resources/themes/icon.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/base.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/easyui.css" />
	
	<script type="text/javascript" src="resources/js/jquery.min.js"></script>
	<script type="text/javascript" src="resources/js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="resources/js/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="resources/js/echarts.js"></script>
	<script type="text/javascript" src="resources/js/getTime.js"></script>
	<script type="text/javascript" src="resources/js/welcome/online.js"></script>
	<script type="text/javascript" src="resources/js/welcome/welcome.js"></script>
	<script type="text/javascript" src="resources/js/swfobject.js"></script>
	<script type="text/javascript" src="resources/js/web_socket.js"></script>
		<script type="text/javascript" src="resources/js/paho-mqtt.js"></script>
	<script type="text/javascript" src="resources/js/paho-mqtt-min.js"></script>
  </head>
  
  <body style="background:#ffffff;">
		<input class="easyui-datetimebox" name="dtoTime1" id="dtoTime1">
		<input class="easyui-datetimebox" name="dtoTime2" id="dtoTime2">
		<div align="right"><a href="javascript:fullScreen();" class="easyui-linkbutton" iconCls="icon-newadd">全屏</a>&nbsp;&nbsp;&nbsp;&nbsp;</div>
  		<div id="wcleftdiv">
  			<div id="wcleft1_1">
  				<p class="wcdate"></p>
  				<div style="margin-top:10px;margin-bottom:10px;"><img src="resources/images/wc-01.png" width="40%"></div>
  				焊工工作量排行<br/>Welder Work Rank List
  			</div>
  			<div id="wcleft1_2">
	   			<table id="workRankTable" style="table-layout: fixed; width:100%;"></table>
  			</div>
  			<div id="wcleft2_1">
  				<p class="wcdate"></p>
  				<div style="margin-top:5px;margin-bottom:5px;"><img src="resources/images/wc-02.png" width="40%"></div>
  				班组设备利用率<br/>The Utilization Rate Of Group Equipment
  			</div>
  			<div id="wcleft2_2">
  				<div id="useRatioChart" style="width:100%;height:100%;"></div>
  			</div>
  			<div id="wcleft3_1">
  				<p class="wcdate"></p>
  				<div style="margin-top:5px;margin-bottom:5px;"><img src="resources/images/wc-03.png" width="40%"></div>
  				焊接规范符合率<br/>The Load Rate Of Welding Standard
  			</div>
  			<div id="wcleft3_2">
  				<div id="loadRateChart" style="width:100%;height:100%;"></div>
  			</div>
  		</div>
  		<div id="wcrightdiv">
  			<div id="autoshowdiv">
	  			<div class="wcright" onclick="companymesclick()">
	  				<div class="wcrighttitle"><img src="resources/images/companymsg.png">&nbsp;公司信息栏</div><div class="wcrighticon"><img src="resources/images/arrow-1.png" id="mesimg"/></div>
	  			</div>
  			</div>
  			<div class="wcright" style="margin-top:10px;" onclick="onlineclick()">
  				<div class="wcrighttitle"><img src="resources/images/online.png">&nbsp;任务情况</div><div class="wcrighticon"><img src="resources/images/arrow-1.png" id="onlineimg"/></div>
  			</div>
  			<div id="wconline">
				<div id="person" style="height:50%;width:100%;overflow:auto;"></div>
				<div id="welder" style="height:50%;width:100%;overflow:auto;"></div>
  			</div>
  		</div>
<!--   		<div align="center" style="position:absolute;left: 40%;top: 46%">
  			<img src="resources/images/weldmeslog.png" />
  		</div> -->
  </body>
</html>
