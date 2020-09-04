<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>实时监控</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">

	<link rel="stylesheet" type="text/css" href="resources/themes/icon.css" />
	<link rel="stylesheet" type="text/css" href="resources/themes/default/easyui.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/base.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/common.css">
	<link rel="stylesheet" type="text/css" href="resources/css/iconfont.css">
	
	<script type="text/javascript" src="resources/js/load.js"></script>
	<script type="text/javascript" src="resources/js/jquery.min.js"></script>
	<script type="text/javascript" src="resources/js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="resources/js/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="resources/js/easyui-extend-check.js"></script>
	<script type="text/javascript" src="resources/js/td/division.js"></script>
  </head>
<body class="easyui-layout">
    <div  id="body" region="center"  hide="true"  split="true" style="background: white;">
    <input name="division" id="division" value="${divi}" type="hidden">
    <div class="content-wrap">
       		<div class="box" id="box">
       		</div>
     </div>
<!--     <div id="body1" style="min-width:300px;height:350px"></div>
    <div id="body2" style="min-width:300px;height:350px"></div> -->
 <!--       	<form id="fm" method="post" data-options="novalidate:true" style="margin:0;padding:20px 50px;">
            <div style="margin-bottom:10px;" align="left">
               <label style="display:inline-block">项目部</label> 
            </div>
            <div style="margin-bottom:10px" align="left">
               <label for="status" style="text-align:center;display:inline-block;width:65px">焊机总数</label> <input name="status" id="status" class="easyui-textbox">
            </div>
            <div style="margin-bottom:10px;">
               <div style=" width:17px; height:15px; background-color:#00FF00; border-radius:25px; float:left;"></div><label for="on" style="text-align:center;display:inline-block">工作总数</label> <input name="on" id="on" class="easyui-textbox">
            </div>
            <div style="margin-bottom:10px">
               <div style=" width:17px; height:15px; background-color:#FF0000; border-radius:25px; float:left;"></div><label for="warning" style="text-align:center;display:inline-block">报警总数</label> <input name="warning" id="warning" class="easyui-textbox">
            </div>
            <div style="margin-bottom:10px">
               <div style=" width:17px; height:15px; background-color:#0000CD; border-radius:25px; float:left;"></div><label for="wait" style="text-align:center;display:inline-block">待机总数</label> <input name="wait" id="wait" class="easyui-textbox">
            </div>
            <div style="margin-bottom:10px">
                <div style=" width:17px; height:15px; background-color:#A9A9A9; border-radius:25px; float:left;"></div><label for="off" style="text-align:center;display:inline-block">关机总数</label> <input name="off" id="off" class="easyui-textbox">
            </div>
        </form> -->
        </div>
</body>
</html>