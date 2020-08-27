<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>历史曲线</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="resources/css/main.css">
	<link rel="stylesheet" type="text/css" href="resources/themes/icon.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/datagrid.css" />
	<link rel="stylesheet" type="text/css" href="resources/themes/default/easyui.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/base.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/iconfont.css">
	
	<script type="text/javascript" src="resources/js/load.js"></script>
	<script type="text/javascript" src="resources/js/jquery.min.js"></script>
	<script type="text/javascript" src="resources/js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="resources/js/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="resources/js/easyui-extend-check.js"></script>
	<script type="text/javascript" src="resources/js/highcharts.js"></script>
	<script type="text/javascript" src="resources/js/echarts.js"></script>
	<script type="text/javascript" src="resources/js/getTimeADay.js"></script>
	<script type="text/javascript" src="resources/js/exporting.js"></script>
	<script type="text/javascript" src="resources/js/map.js"></script>
	<script type="text/javascript" src="resources/js/td/historycurves.js"></script>

  </head>
  
<body>
	<div id="bodys" >
		 <div class="functionleftdiv">历史曲线 >> 焊缝信息</div>
	   	 <div id="companyOverproof_btn">
			<div style="margin-bottom: 5px;float:right">
				<input  name="parent" id="parent" type="hidden" value="${parent }"/>
				<input  name="afresh" id="afresh" type="hidden" value="${afreshLogin }"/>
				<input  name="wjnos" id="wjno" type="hidden" value="${wjno }"/>
				<input  name="welderid" id="welderid" type="hidden" value="${welderid }"/>
				<input  name="machine" id="machine" type="hidden" value="${machine }"/>
				时间：
				<input class="easyui-datetimebox" name="dtoTime1" id="dtoTime1">--
				<input class="easyui-datetimebox" name="dtoTime2" id="dtoTime2">
				<a href="javascript:serachCompanyOverproof();" class="easyui-linkbutton" iconCls="icon-select" >搜索</a>
			</div>
		</div>
		<div id="dgtb" style="width:100%;height:100%;">
			<table id="dg" style="table-layout:fixed;width:100%;"></table>
<!-- 			<a href="javascript:fullScreen()" class="easyui-linkbutton" iconCls="icon-select" id="full" >全屏显示</a> -->
		</div>
		<div id="load" style="width:100%;height:42%;"></div>
		<div id="elebody" style="position:absolute;top:58%;width:100%;height:25%;z-index:999;background:#fff;">
			<a href="javascript:fullScreen()" class="easyui-linkbutton" iconCls="icon-select" id="full">全屏显示</a>
			<a href="javascript:theSmallScreen()" class="easyui-linkbutton" iconCls="icon-select" id="little">还原</a><br/>
			<div id="body1" style="position:absolute;top:23;width:100%;z-index:999;"></div>
		</div>
		<div id="body2" style="position:absolute;top:82%;width:100%;height:20%;z-index:999;"></div>
	</div>
	<style type="text/css">
    #load{ display: none; position: absolute; left:0; top:60%;width: 100%; height: 40%; background-color: #555753; z-index:1001; -moz-opacity: 0.4; opacity:0.4; filter: alpha(opacity=70);}
	#show{display: none; position: absolute; top: 80%; left: 45%; width: 10%; height: 5%; padding: 8px; border: 8px solid #E8E9F7; background-color: white; z-index:1002; overflow: auto;}
	</style>
</body>
</html>
 
 