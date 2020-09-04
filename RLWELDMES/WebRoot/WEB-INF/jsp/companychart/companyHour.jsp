<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>焊口焊接工时</title>
    
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
	<script type="text/javascript" src="resources/js/companychart/companyHour.js"></script>
	<script type="text/javascript" src="resources/js/search/search.js"></script>
  </head>
  
  <body>
	<div id="chartLoading" style="width:100%;height:100%;">
		<div id="chartShow" style="width:160px;" align="center"><img src="resources/images/load1.gif"/>数据加载中，请稍候...</div>
	</div>
    <div>
	  	<div id="caustHour_btn">
			<div style="margin-bottom: 5px;">
				<input  name="parent" id="parent" type="hidden" value="${parent }"/>
				<input  name="afresh" id="afresh" type="hidden" value="${afreshLogin }"/>
				时间：
				<input class="easyui-datetimebox" name="dtoTime1" id="dtoTime1">--
				<input class="easyui-datetimebox" name="dtoTime2" id="dtoTime2">
				<a href="javascript:serachcompanyHour();" class="easyui-linkbutton" iconCls="icon-select" >搜索</a>
			</div>
		</div>
		<div id="companyHourChart" style="height:50%;width:50%; margin: auto;margin-bottom: 10px;float:left;"></div>
		<div id="classifydiv" style="height:300px;width:49%; margin: auto;margin-bottom: 10px;float:right;">
			<!-- 自定义多条件查询 -->
		    <div id="searchdiv" class="easyui-dialog" style="width:800px; height:400px;" closed="true" buttons="#searchButton" title="自定义条件查询">
		    	<div id="div0">
			    	<select class="fields" id="fields"></select>
			    	<select class="condition" id="condition"></select>
			    	<input class="content" id="content"/>
			    	<select class="joint" id="joint"></select>
			    	<a href="javascript:newSearchhoustclassify();" class="easyui-linkbutton" iconCls="icon-add"></a>
			    	<a href="javascript:removeSerach();" class="easyui-linkbutton" iconCls="icon-remove"></a>
		    	</div>
		    </div>
		    <div id="searchButton">
				<a href="javascript:searchHousClassify();" class="easyui-linkbutton" iconCls="icon-ok">查询</a>
				<a href="javascript:close();" class="easyui-linkbutton" iconCls="icon-cancel">取消</a>
			</div>
			<div style="margin-bottom: 5px;" id="classify_btn">
				<a href="javascript:serachClassify();" class="easyui-linkbutton" iconCls="icon-select" >搜索</a>
				<a href="javascript:commitChecked();" class="easyui-linkbutton"  iconCls="icon-over" >提交选中数据</a>
			</div>
			<table id="classify" style="table-layout: fixed; width:100%;"></table>
		</div>
	    <table id="companyHourTable" style="table-layout: fixed; width:100%;"></table>
	</div>
  </body>
</html>
