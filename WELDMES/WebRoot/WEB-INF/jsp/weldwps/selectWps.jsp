<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>选择工艺</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">

	<link rel="stylesheet" type="text/css" href="resources/themes/icon.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/datagrid.css" />
	<link rel="stylesheet" type="text/css" href="resources/themes/default/easyui.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/base.css" />
	
	<script type="text/javascript" src="resources/js/jquery.min.js"></script>
	<script type="text/javascript" src="resources/js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="resources/js/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="resources/js/easyui-extend-check.js"></script>
	<script type="text/javascript" src="resources/js/weldwps/selectWps.js"></script>

  </head>
  <body>
    <div  id="body">
		<div style="text-align: center ">
			<div class="functionleftdiv">工艺管理 >> 工艺下发</div>
	    	<div class="functiondiv">
				<lable>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<div style="position:absolute;left:25%;top:85%">
			        	<a href="javascript:next();" class="easyui-linkbutton" style="height:40px;" iconCls="icon-next">下一步</a>
			   	 	</div>
			    	<div style="position:absolute;left:65%;top:85%">
			        	<a href="wps/AllWps" class="easyui-linkbutton" style="height:40px;" iconCls="icon-newcancel">取消</a>
			        </div>
		        </lable>
	    	</div>
			<div align="center">
				<table id="dg" checkbox="true" style="table-layout:fixed;width:50%"></table>
			</div>
    </div>
    </div>
</body>
</html>