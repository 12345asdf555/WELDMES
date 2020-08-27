<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>设备负荷率</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!-- <meta http-equiv="X-UA-Compatible" content="IE=edge"/> -->
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
	<script type="text/javascript" src="resources/js/companychart/companyloads.js"></script>
  </head>
  
  <body>
	<div id="chartLoading" style="width:100%;height:100%;">
		<div id="chartShow" style="width:160px;" align="center"><img src="resources/images/load1.gif"/>数据加载中，请稍候...</div>
	</div>
    <div>
	  	<div id="companyLoads_btn">
			<div style="margin-bottom: 5px;">
				<input  name="parent" id="parent" type="hidden" value="${parent }"/>
				<input  name="afresh" id="afresh" type="hidden" value="${afreshLogin }"/>
				时间：
				<input class="easyui-datetimebox" name="dtoTime1" id="dtoTime1">--
				<input class="easyui-datetimebox" name="dtoTime2" id="dtoTime2">
				时间跨度:
				<input type="radio" class="radioStyle" name="otype" value="1" />年
				<input type="radio" class="radioStyle" name="otype" value="2" />月
				<input type="radio" class="radioStyle" name="otype" value="3" checked="checked" />日
				<input type="radio" class="radioStyle" name="otype" value="4" />周
				<a href="javascript:serachCompanyloads();" class="easyui-linkbutton" iconCls="icon-select" >搜索</a>
			</div>
		</div>
		<div id="explain" style="float:left;table-layout: fixed; width:18%;margin-top: 6%;margin-left: 10px;">
		按组织机构和日期对设备负荷率趋势统计:<br/>
		统计时间段内的各部门设备负荷率趋势；<br/>
		负荷率=设备正常焊接时间/(8*60*60)/正常焊接焊机数量<br/>
		X轴:日期<br/>
		Y轴:负荷率<br/></div>
		<div id="companyLoadsChart" style="float:right;height:50%;width:65%;margin-bottom:10px;"></div>
	    <table id="companyLoadsTable" style="table-layout: fixed; width:100%;"></table>
	</div>
  </body>
</html>