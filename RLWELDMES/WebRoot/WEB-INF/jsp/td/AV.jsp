<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>实时曲线</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">

	<link rel="stylesheet" type="text/css" href="resources/themes/icon.css" />
	<link rel="stylesheet" type="text/css" href="resources/themes/default/easyui.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/base.css" />
	
	<script type="text/javascript" src="resources/js/jquery.min.js"></script>
	<script type="text/javascript" src="resources/js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="resources/js/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="resources/js/easyui-extend-check.js"></script>
	<script type="text/javascript" src="resources/js/highcharts.js"></script>
	<script type="text/javascript" src="resources/js/td/AV.js"></script>
	<script type="text/javascript" src="resources/js/exporting.js"></script>

  </head>
<body class="easyui-layout">
    <div  id="body" region="center"  hide="true"  split="true" style="background: white;">
    <label style="text-align:center;display:inline-block">焊工姓名</label> <input class="liveInput" name="weldname" id="weldname" value="" readonly="true" type="text"/>
    <label style="text-align:center;display:inline-block">焊机id</label> <input class="liveInput" name="machid" id="machid" value="${av}" readonly="true" type="text"/>
    <div id="body1" style="min-width:300px;height:100%"></div>
    <input id="hid1" name="hid1" type="hidden" value="${av}">
        </div>
</body>
</html>