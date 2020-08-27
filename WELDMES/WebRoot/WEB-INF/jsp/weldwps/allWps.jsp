<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!-- <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> -->
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>工艺管理</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="" />
	<link rel="stylesheet" type="text/css" href="resources/themes/icon.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/datagrid.css" />
	<link rel="stylesheet" type="text/css" href="resources/themes/default/easyui.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/base.css" />
	
	<script type="text/javascript" src="resources/js/jquery.min.js"></script>
	<script type="text/javascript" src="resources/js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="resources/js/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="resources/js/easyui-extend-check.js"></script>
	<script type="text/javascript" src="resources/js/weldwps/allWps.js"></script>
	<script type="text/javascript" src="resources/js/search/search.js"></script>
	<script type="text/javascript" src="resources/js/weldwps/addWps.js"></script>
	<script type="text/javascript" src="resources/js/weldwps/destroyWps.js"></script>
	<script type="text/javascript" src="resources/js/weldwps/giveWps.js"></script>
	<script type="text/javascript" src="resources/js/swfobject.js"></script>
	<script type="text/javascript" src="resources/js/web_socket.js"></script>

  </head>
  
  <body >
   <div id="body">
        <div class="functiondiv">
        	<a href="javascript:addWps();" class="easyui-linkbutton" iconCls="icon-newadd">新增</a>&nbsp;&nbsp;&nbsp;&nbsp;
        	<a href="javascript:insertSearchWps();" class="easyui-linkbutton" iconCls="icon-select" >查找</a>&nbsp;&nbsp;&nbsp;&nbsp;
        	<a href="javascript:selectWps()" class="easyui-linkbutton" iconCls="icon-select">工艺下发</a>&nbsp;&nbsp;&nbsp;&nbsp;
        	<a href="javascript:history()" class="easyui-linkbutton" iconCls="icon-select" >下发历史</a>
    	</div>
	  	<div align="center">
        	<table id="dg" style="table-layout:fixed;width:100%"></table>
		</div>
    	<div id="searchdiv" class="easyui-dialog" style="width:800px; height:400px;" closed="true" buttons="#searchButton" title="自定义条件查询">
	    	<div id="div0">
		    	<select class="fields" id="fields"></select>
		    	<select class="condition" id="condition"></select>
		    	<input class="content" id="content"/>
		    	<select class="joint" id="joint"></select>
		    	<a href="javascript:newSearchWps();" class="easyui-linkbutton" iconCls="icon-add"></a>
		    	<a href="javascript:removeSerach();" class="easyui-linkbutton" iconCls="icon-remove"></a>
	    	</div>
	    </div>
	    <div id="searchButton">
			<a href="javascript:searchWps();" class="easyui-linkbutton" iconCls="icon-ok">查询</a>
			<a href="javascript:close();" class="easyui-linkbutton" iconCls="icon-cancel">取消</a>
		</div>
		<div id="historyDIV" class="easyui-dialog" style="width:800px; height:400px;" closed="true" title="下发历史">
		    <table id="history" name="history" style="table-layout:fixed;width:100%"></table>
	    </div>
		<!-- 添加修改 -->
		<div id="dlg" class="easyui-dialog" style="width: 700px; height: 400px; padding:10px 20px" closed="true" buttons="#dlg-buttons">
			<form id="fm" class="easyui-form" method="post" data-options="novalidate:true">
           		<div class="fitem">
	            	<lable><span class="required">*</span>工艺编号</lable>
	                <input id="validName" type="hidden">
	                <input id="FWPSNum" name="FWPSNum" class="easyui-textbox" data-options="validType:'wpsValidate',required:true">
	            	<lable>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="required">*</span>预置通道</lable>
	                <input name="Fweld_PreChannel" id="Fweld_PreChannel" class="easyui-numberbox"  data-options="required:true">
	            </div>
	            <div class="fitem">
	            	<lable><span class="required">*</span>报警电流</lable>
	                <input name="Fweld_Alter_I" id="Fweld_Alter_I" class="easyui-numberbox"  data-options="required:true">
	            	<lable>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="required">*</span>报警电压</lable>
	                <input name="Fweld_Alter_V" id="Fweld_Alter_V" class="easyui-numberbox"  data-options="required:true">
	            </div>
	            <div class="fitem">
	            	<lable><span class="required">*</span>标准焊接电流</lable>
	                <input name="Fweld_I" id="Fweld_I" class="easyui-numberbox"   data-options="required:true">
	            	<lable><span class="required">*</span>标准焊接电压</lable>
	                <input name="Fweld_V" id="Fweld_V" type="easyui-textbox" class="easyui-numberbox" data-options="required:true">
	            </div>
	            <div class="fitem">
	            	<lable><span class="required">*</span>最大焊接电流</lable>
	                <input name="Fweld_I_MAX" id="Fweld_I_MAX" class="easyui-numberbox"  data-options="required:true">
	            	<lable><span class="required">*</span>最小焊接电流</lable>
	                <input name="Fweld_I_MIN" id="Fweld_I_MIN" class="easyui-numberbox"  data-options="required:true">
	            </div>
	            <div class="fitem">
	            	<lable><span class="required">*</span>最大焊接电压</lable>
	                <input name="Fweld_V_MAX" id="Fweld_V_MAX" class="easyui-numberbox"   data-options="required:true">
	            	<lable><span class="required">*</span>最小焊接电压</lable>
	                <input name="Fweld_V_MIN" id="Fweld_V_MIN" class="easyui-numberbox" data-options="required:true">
	            </div>
	            <div class="fitem">
	            	<lable><span class="required">*</span>工艺参数名称</lable>
	                <input name="Fname" id="Fname" class="easyui-textbox" data-options="required:true">
	            	<lable>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="required">*</span>焊丝直径</lable>
	                <input name="Fdiameter" id="Fdiameter" class="easyui-numberbox"  min="0.001" precision="3" data-options="required:true">
	            </div>
	            <div class="fitem">
					<lable><span class="required">*</span>部门</lable>
					<select class="easyui-combobox" name="insid" id="insid" data-options="required:true,editable:false"></select>
	            	<lable>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;备注</lable>
	                <input name="Fback" id="Fback" class="easyui-textbox">
	        	</div>
			</form>
		</div>
		<div id="dlg-buttons">
			<a href="javascript:save();" class="easyui-linkbutton" iconCls="icon-ok">保存</a>
			<a href="javascript:close1();" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>
		</div>
		
		<!-- 删除 -->
		<div id="rdlg" class="easyui-dialog" style="width: 700px; height: 400px; padding:10px 20px" closed="true" buttons="#remove-buttons">
			<form id="rfm" class="easyui-form" method="post" data-options="novalidate:true">
	            <div class="fitem">
	            	<lable>工艺编号</lable>
	                <input name="FWPSNum" id="FWPSNum" class="easyui-textbox" readonly="true">
	            	<lable>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;预置通道</lable>
	                <input name="Fweld_PreChannel" class="easyui-textbox" readonly="true">
	            </div>
	            <div class="fitem">
	            	<lable>报警电流</lable>
	                <input name="Fweld_Alter_I" class="easyui-textbox" readonly="true">
	            	<lable>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;报警电压</lable>
	                <input name="Fweld_Alter_V" class="easyui-textbox" readonly="true" >
	            </div>
	            <div class="fitem">
	            	<lable>标准焊接电流</lable>
	                <input name="Fweld_I" class="easyui-textbox" readonly="true">
	            	<lable>标准焊接电压</lable>
	                <input name="Fweld_V" class="easyui-textbox" readonly="true">
	            </div>
	            <div class="fitem">
	            	<lable>最大焊接电流</lable>
	                <input name="Fweld_I_MAX" class="easyui-textbox" readonly="true">
	            	<lable>最小焊接电流</lable>
	                <input name="Fweld_I_MIN" class="easyui-textbox" readonly="true" >
	            </div>
	            <div class="fitem">
	            	<lable>最大焊接电压</lable>
	                <input name="Fweld_V_MAX" class="easyui-textbox"  readonly="true">
	            	<lable>最小焊接电压</lable>
	                <input name="Fweld_V_MIN" class="easyui-textbox" readonly="true">
	            </div>
	            <div class="fitem">
	            	<lable>工艺参数名称</lable>
	                <input name="Fname" class="easyui-textbox" readonly="true">
	            	<lable>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;焊丝直径</lable>
	                <input name="Fdiameter" class="easyui-textbox" readonly="true">
	            </div>
	            <div class="fitem">
					<lable>部门</lable>
					<input name="Fowner" id="Fowner" class="easyui-textbox" readonly="true">
	            	<lable>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;备注</lable>
	                <input name="Fback" class="easyui-textbox" readonly="true">
	        	</div>
			</form>
		</div>
		<div id="remove-buttons">
			<a href="javascript:remove();" class="easyui-linkbutton" iconCls="icon-ok">删除</a>
			<a href="javascript:close2();" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>
		</div>
		
		<!-- 下发工艺选择 -->
		<div id="sewps" class="easyui-dialog" style="width: 700px; height: 400px; padding:10px 20px" closed="true" buttons="#sewps-buttons">
			<table id="sewpstable" checkbox="true" style="table-layout:fixed;width:50%"></table>
		</div>
		<div id="sewps-buttons">
			<a href="javascript:selectMachine();" class="easyui-linkbutton" iconCls="icon-next">下一步</a>
			<a href="javascript:closewps();" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>
		</div>
		
		<!-- 下发焊机选择 -->
		<div id="semac" class="easyui-dialog" style="width: 700px; height: 400px; padding:10px 20px" closed="true" buttons="#semac-buttons">
			<table id="semactable" checkbox="true" style="table-layout:fixed;width:50%"></table>
		</div>
		<div id="semac-buttons">
			<a href="javascript:giveWps();" class="easyui-linkbutton" iconCls="icon-ok">下发</a>
			<a href="javascript:closemac();" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>
		</div>
    </div>
</body>
</html>