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
	<script type="text/javascript" src="resources/js/search/search.js"></script>
	<script type="text/javascript" src="resources/js/process/allprocess.js"></script>
	<script type="text/javascript" src="resources/js/process/addprocess.js"></script>
	<script type="text/javascript" src="resources/js/process/deleteprocess.js"></script>

  </head>
  
  <body>
   <div id="body">
		<div class="functionleftdiv">产品管理 >> 焊缝管理 >> 工艺信息</div>
        <div class="functiondiv">
        	<a href="javascript:addProcess()" class="easyui-linkbutton" iconCls="icon-newadd">新增</a>&nbsp;&nbsp;&nbsp;&nbsp;
        	<a href="javascript:insertSearchProcess();" class="easyui-linkbutton" iconCls="icon-select">查找</a>
    	</div>
        <table id="dg" style="table-layout:fixed;width:100%"></table>
    	<!-- 自定义多条件查询 -->
	    <div id="searchdiv" class="easyui-dialog" style="width:800px; height:400px;" closed="true" buttons="#searchButton" title="自定义条件查询">
	    	<div id="div0">
		    	<select class="fields" id="fields"></select>
		    	<select class="condition" id="condition"></select>
		    	<input class="content" id="content"/>
		    	<select class="joint" id="joint"></select>
		    	<a href="javascript:newSearchProcess();" class="easyui-linkbutton" iconCls="icon-add"></a>
		    	<a href="javascript:removeSerachByProcess();" class="easyui-linkbutton" iconCls="icon-remove"></a>
	    	</div>
	    </div>
	    <div id="searchButton">
			<a href="javascript:searchProcess();" class="easyui-linkbutton" iconCls="icon-ok">查询</a>
			<a href="javascript:close();" class="easyui-linkbutton" iconCls="icon-cancel">取消</a>
		</div>
		<!-- 添加修改 -->
		<div id="dlg" class="easyui-dialog" style="width: 400px; height: 600px; padding:10px 20px" closed="true" buttons="#dlg-buttons">
			<form id="fm" class="easyui-form" method="post" data-options="novalidate:true"><br/>
	            <div class="fitem">
	            	<lable><span class="required">*</span>工艺名称</lable>
	                <input name="processname" id="processname" class="easyui-textbox" data-options="required:true">
	            </div>
	            <div class="fitem">
	            	<lable><span class="required">*</span>焊接位态</lable>
	                <input name="weldposition" id="weldposition" class="easyui-textbox" data-options="required:true">
	            </div>
	            <div class="fitem">
	            	<lable><span class="required">*</span>材质</lable>
	                <input name="material" id="material" class="easyui-textbox" data-options="required:true">
	            </div>
	            <div class="fitem">
	            	<lable><span class="required">*</span>规格</lable>
	                <input name="format" id="format" class="easyui-numberbox" min="0.001" precision="3" data-options="required:true">
	            </div>
	            <div class="fitem">
	            	<lable><span class="required">*</span>焊接方法</lable>
	                <input name="method" id="method" class="easyui-textbox" data-options="required:true">
	            </div>
	            <div class="fitem">
	            	<lable><span class="required">*</span>焊材烘干条件</lable>
	                <input name="drying" id="drying" class="easyui-textbox" data-options="required:true">
	            </div>
				<div class="fitem">
	            	<lable><span class="required">*</span>预热温度</lable>
	                <input name="temperature" id="temperature" class="easyui-textbox" data-options="required:true">
	            </div>
				<div class="fitem">
	            	<lable><span class="required">*</span>后热条件</lable>
	                <input name="factor" id="factor" class="easyui-textbox" data-options="required:true">
	            </div>
	            <div class="fitem">
	            	<lable><span class="required">*</span>热处理条件</lable>
	                <input name="require" id="require" class="easyui-textbox" data-options="required:true">
	            </div>
	            <div class="fitem">
	            	<lable><span class="required">*</span>无损检测合格级别</lable>
	                <input name="lecel" id="lecel" class="easyui-textbox" data-options="required:true">
	            </div>
	            <div class="fitem">
	            	<lable><span class="required">*</span>员工资质</lable>
	                <input name="qualify" id="qualify" class="easyui-textbox" data-options="required:true">
	            </div>
	            <div class="fitem">
	            	<lable><span class="required">*</span>线能量控制范围</lable>
	                <input name="range" id="range" class="easyui-textbox" data-options="required:true">
	            </div>
			</form>
		</div>
		<div id="dlg-buttons">
			<a href="javascript:save();" class="easyui-linkbutton" iconCls="icon-ok">保存</a>
			<a href="javascript:closeDialog('dlg');" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>
		</div>
		
		<!-- 删除 -->
		<div id="rdlg" class="easyui-dialog" style="width: 400px; height: 600px; padding:10px 20px" closed="true" buttons="#remove-buttons">
			<form id="rfm" class="easyui-form" method="post" data-options="novalidate:true"><br/>
	            <div class="fitem">
	            	<lable>工艺名称</lable>
	                <input name="processname" id="processname" class="easyui-textbox" readonly="true">
	            </div>
	            <div class="fitem">
	            	<lable>焊接位态</lable>
	                <input name="weldposition" id="weldposition" class="easyui-textbox" readonly="true">
	            </div>
	            <div class="fitem">
	            	<lable>材质</lable>
	                <input name="material" id="material" class="easyui-textbox" readonly="true">
	            </div>
	            <div class="fitem">
	            	<lable>规格</lable>
	                <input name="format" id="format" class="easyui-textbox" readonly="true">
	            </div>
	            <div class="fitem">
	            	<lable>焊接方法</lable>
	                <input name="method" id="method" class="easyui-textbox" readonly="true">
	            </div>
	            <div class="fitem">
	            	<lable>焊材烘干条件</lable>
	                <input name="drying" id="drying" class="easyui-textbox"  readonly="true">
	            </div>
				<div class="fitem">
	            	<lable>预热温度</lable>
	                <input name="temperature" id="temperature" class="easyui-textbox" readonly="true">
	            </div>
				<div class="fitem">
	            	<lable>后热条件</lable>
	                <input name="factor" id="factor" class="easyui-textbox" readonly="true">
	            </div>
	            <div class="fitem">
	            	<lable>热处理条件</lable>
	                <input name="require" id="require" class="easyui-textbox" readonly="true">
	            </div>
	            <div class="fitem">
	            	<lable>无损检测合格级别</lable>
	                <input name="lecel" id="lecel" class="easyui-textbox" readonly="true">
	            </div>
	            <div class="fitem">
	            	<lable>员工资质</lable>
	                <input name="qualify" id="qualify" class="easyui-textbox" readonly="true">
	            </div>
	            <div class="fitem">
	            	<lable>线能量控制范围</lable>
	                <input name="range" id="range" class="easyui-textbox" readonly="true">
	            </div>
			</form>
		</div>
		<div id="remove-buttons">
			<a href="javascript:remove();" class="easyui-linkbutton" iconCls="icon-ok">删除</a>
			<a href="javascript:closeDialog('rdlg');" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>
		</div>
    </div>
</body>
</html>
 
 
