<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>新增用户</title>
    
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
	<script type="text/javascript" src="resources/js/data/alldata"></script>

  </head>
<body class="easyui-layout">
   <div id="body" region="center"  hide="true"  split="true" title="实时数据" style="background: #eee; height: 335px;">
        <table id="dg" style="table-layout:fixed;width:100%"></table>
       <script type="text/javascript">
       $(function(){
	    $("#dg").datagrid( {
		fitColumns : true,
		height : ($("#body").height()),
		width : $("#body").width(),
		idField : 'id',
		toolbar : "#toolbar",
/*  	pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],  */
		url : "data/getAllData",
		singleSelect : false,
		rownumbers : false,
		showPageList : false,
		columns : [ [ {
			field : 'electricity',
			title : '焊接电流',
			width : 130,
			halign : "center",
			align : "left"
		}, {
			field : 'voltage',
			title : '焊接电压',
			width : 130,
			halign : "center",
			align : "left"
		}, {
			field : 'sensor_Num',
			title : '传感器量',
			width : 130,
			halign : "center",
			align : "left"
		}, {
			field : 'machine_id',
			title : '焊机id',
			width : 140,
			halign : "center",
			align : "left"
		}, {
			field : 'welder_id',
			title : '焊工id',
			width : 160,
			halign : "center",
			align : "left",
		}, {
			field : 'code',
			title : '编码',
			width : 130,
			halign : "center",
			align : "left"
		}, {
			field : 'year',
			title : '年',
			width : 140,
			halign : "center",
			align : "left",
					}, {
			field : 'month',
			title : '月',
			width : 140,
			halign : "center",
			align : "left",
			}, {
			field : 'day',
			title : '日',
			width : 140,
			halign : "center",
			align : "left",
			}, {
			field : 'hour',
			title : '时',
			width : 140,
			halign : "center",
			align : "left",
			}, {
			field : 'minute',
			title : '分',
			width : 140,
			halign : "center",
			align : "left",
			}, {
			field : 'second',
			title : '秒',
			width : 140,
			halign : "center",
			align : "left",
			}, {
			field : 'status',
			title : '状态',
			width : 140,
			halign : "center",
			align : "left",

		}]]
		
	});
})
    </script>
    </div>
</body>
</html>
