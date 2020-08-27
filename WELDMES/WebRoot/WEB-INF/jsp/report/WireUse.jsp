<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!-- <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"> -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>焊丝用量维度表</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="resources/themes/icon.css" />
	<link rel="stylesheet" type="text/css" href="resources/themes/default/easyui.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/base.css" />
	
	<script type="text/javascript" src="resources/js/load.js"></script>
	<script type="text/javascript" src="resources/js/jquery.min.js"></script>
	<script type="text/javascript" src="resources/js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="resources/js/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="resources/js/getTime.js"></script>
	<script type="text/javascript" src="resources/js/insframework/insframeworktree.js"></script>
	<script type="text/javascript" src="resources/js/report/wireuse.js"></script>

  </head>
  
<body class="easyui-layout">
	<jsp:include  page="../insframeworktree.jsp"/>
   <div region="center"  hide="true"  split="true">
   		<div id="body">
<%--    	  	<div id="companyOverproof_btn">
			<div style="margin-bottom: 5px;">
<!-- 				<lable>车间号</lable>
				<select class="easyui-combobox" name="division" id="division" onChange="changeValue(current,old)"></select> -->
			
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
				<a href="javascript:serachCompanyOverproof();" class="easyui-linkbutton" iconCls="icon-search" >搜索</a>
			</div>
		</div> --%>
        	<table id="dg" style="table-layout:fixed;width:100%"></table>
       	</div>
    </div>
</body>
</html>
 
 
