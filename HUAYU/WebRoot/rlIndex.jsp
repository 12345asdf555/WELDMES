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
	
	<link rel="stylesheet" type="text/css" href="resources/css/easyui.css" />
	
	<script type="text/javascript" src="resources/js/jquery.min.js"></script>
	<script type="text/javascript" src="resources/js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="resources/js/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="resources/js/echarts.js"></script>
	<script type="text/javascript" src="resources/js/getTime.js"></script>
	<script type="text/javascript" src="resources/js/swfobject.js"></script>
	<script type="text/javascript" src="resources/js/web_socket.js"></script>
	<script type="text/javascript" src="resources/js/rlIndex.js"></script>
  </head>
  
  <body style="background:#052148;">
  		<p id="nowTime" style="color: #ffffff;position:absolute;left:10%;top:15px;"></p>
  		<p id="todayWeather" style="color: #ffffff;position:absolute;left:72%;top:15px;"></p>
  		<div style="background:url(resources/images/rlIndex.png);position:absolute;left:35%;top:10px;height:100px; width:400px;line-height: 100%">
  			<p align="center" style="color:#ffffff; font-size:22px;">瑞凌焊接智能云平台</p>
  		</div>
  		<div id="div1-1" style="background-color: #11325f;width:30%;height:40%;float:left;position:absolute;left:42px;top:80px;"></div>
  		<div id="div1-2" style="background-color: #11325f;width:30%;height:40%;float:left;position:absolute;left:466px;top:80px;"></div>
  		<div id="div1-3" style="background-color: #11325f;width:30%;height:40%;float:left;position:absolute;left:891px;top:80px;"></div>
  		<div id="div2-1" style="background-color: #11325f;width:30%;height:40%;float:left;position:absolute;left:42px;top:320px;"></div>
  		<div id="div2-2" style="background-color: #11325f;width:30%;height:40%;float:left;position:absolute;left:466px;top:320px;">
   			<div id="div2-21" style="width:50%;height:100%;float:left;"></div>
 			<div id="div2-22" style="width:50%;height:100%;float:left;"></div>
  		</div>
  		<div id="div2-3" style="background-color: #11325f;width:30%;height:40%;float:left;position:absolute;left:891px;top:320px;"></div>
  </body>
</html>
