<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>公司工效</title>
    
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
	<script type="text/javascript" src="resources/js/companychart/companyefficiency.js"></script>
  </head>
  
  <body>
	<div id="chartLoading" style="width:100%;height:100%;">
		<div id="chartShow" style="width:160px;" align="center"><img src="resources/images/load1.gif"/>数据加载中，请稍候...</div>
	</div>
    <div>
	  	<div id="companyEfficiency_btn">
			<div style="margin-bottom: 5px;">
				<input  name="nextparent" id="nextparent" type="hidden" value="${nextparent }"/>
				<input  name="afresh" id="afresh" type="hidden" value="${afreshLogin }"/>
				时间：
				<input class="easyui-datetimebox" name="dtoTime1" id="dtoTime1">--
				<input class="easyui-datetimebox" name="dtoTime2" id="dtoTime2">
				<select class="easyui-combobox" name="parent" id="parent" data-options="editable:false"></select>
				<a href="javascript:serachEfficiencyCompany();" class="easyui-linkbutton" iconCls="icon-select" >搜索</a>
			</div>
		</div>
		<div id="explain" style="float:left;table-layout: fixed; width:18%;margin-top: 10%;margin-left:10px;">
		按组织机构和日期对工效统计:<br/>
		统计时间段内的员工效率所占百分比；<br/>
		X轴:时间(小时)<br/>
		Y轴:工效百分比<br/></div>
		<div id="companyEfficiencyChart" style="float:right;height:50%;width:65%;margin-bottom:10px;"></div>
		
	    <table id="companyEfficiencyTable" style="table-layout: fixed; width:100%;"></table>
	    
	</div>
  </body>
</html>