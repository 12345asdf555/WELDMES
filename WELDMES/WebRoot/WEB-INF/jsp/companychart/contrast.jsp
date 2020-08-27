<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'contrast.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<link rel="stylesheet" type="text/css" href="resources/themes/icon.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/datagrid.css" />
	<link rel="stylesheet" type="text/css" href="resources/themes/default/easyui.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/base.css" />
	
	<script type="text/javascript" src="resources/js/load.js"></script>
	<script type="text/javascript" src="resources/js/jquery.min.js"></script>
	<script type="text/javascript" src="resources/js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="resources/js/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="resources/js/echarts.js"></script>
	<script type="text/javascript" src="resources/js/session-overdue.js"></script>
	<script type="text/javascript" src="resources/js/getTime.js"></script>
	<script type="text/javascript" src="resources/js/companychart/contrast.js"></script>
  </head>
  
  <body>
	<input class="easyui-datetimebox" name="dtoTime1" id="dtoTime1">
	<input class="easyui-datetimebox" name="dtoTime2" id="dtoTime2">
	<table border="1" id=“chartdiv” style="table-layout:fixed;width:100%;height:100%">
		<tr>
			<td height="50%"><a href="companyChart/goCompanyWmMax"><div id="left1" style="height:100%;width:100%;float:left;"></div></a></td>
			<td height="50%"><a href="companyChart/goCompanyWmMin"><div id="right1" style="height:100%;width:100%;float:left;"></div></a></td>
		</tr>
		<tr>
			<td height="50%"><a href="companyChart/goCompanyWelderMax"><div id="left2" style="height:100%;width:100%;float:left;"></div></a></td>
			<td height="50%"><a href="companyChart/goCompanyWelderMin"><div id="right2" style="height:100%;width:100%;float:left;"></div></a></td>
		</tr>
	</table>
  </body>
</html>
