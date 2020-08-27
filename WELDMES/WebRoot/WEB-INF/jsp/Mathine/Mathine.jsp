<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>厂商和设备</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="resources/themes/icon.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/datagrid.css" />
	<link rel="stylesheet" type="text/css" href="resources/themes/default/easyui.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/base.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/common.css">
	<link rel="stylesheet" type="text/css" href="resources/css/iconfont.css">
	
	<script type="text/javascript" src="resources/js/jquery.min.js"></script>
	<script type="text/javascript" src="resources/js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="resources/js/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="resources/js/Mathine/Mathine.js"></script>
  </head>
  
  <body>
    <div id="body">
    	<div class="functiondiv">
<!--         	<a href="javascript:addfactory()" class="easyui-linkbutton" iconCls="icon-newadd" >新增</a>&nbsp;&nbsp;&nbsp;&nbsp; -->
    	</div>
    	<div data-options="region:'center',title:'信息',iconCls:'icon-ok'">
       		<table id="dg" style="table-layout:fixed;width:100%"></table>
        </div>
<!--         <a style="font-size:20px;" href="javascript:addfactory();" iconCls="icon-newadd">厂商焊机绑定</a> -->
        <form id="form" class="easyui-form" method="post" data-options="novalidate:true" buttons="#dlg-buttons">
        <div region="left">
       	 <table>
        	<tr>
        		<td class="leftTD"><lable>焊机厂家：</lable></td>
        		<td class="rightTD">
        			<select class="easyui-combobox" name="desc" id="desc" data-options="editable:false"></select></td>
        	</tr>
       	 </table>
       	 </div>
       	<div region="left">
             <table id="tt" title="焊机型号列表" checkbox="true" style="width:100%" ></table>
        </div>
        </form>
		<div id="dlg-buttons">
			<a href="javascript:save();" class="easyui-linkbutton"  style="float: left; border: 1px solid green;" iconCls="icon-ok">保存</a>
		</div>
		
    </div>
  </body>
</html>
