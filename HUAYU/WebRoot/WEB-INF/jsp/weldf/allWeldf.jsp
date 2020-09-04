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
    
    <title>焊缝管理</title>
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
	<script type="text/javascript" src="resources/js/weldf/allweldf.js"></script>
	<script type="text/javascript" src="resources/js/weldf/addweldf.js"></script>
	<script type="text/javascript" src="resources/js/weldf/deleteweldf.js"></script>

  </head>
  
  <body>
   <div id="body">
		<div class="functionleftdiv">产品管理 >> 焊缝管理</div>
        <div class="functiondiv">
        	<a href="javascript:addWeldf()" class="easyui-linkbutton" iconCls="icon-newadd">新增</a>&nbsp;&nbsp;&nbsp;&nbsp;
        	<a href="javascript:insertSearchWeldf();" class="easyui-linkbutton" iconCls="icon-select">查找</a>
    	</div>
        <table id="dg" style="table-layout:fixed;width:100%"></table>
    	<!-- 自定义多条件查询 -->
	    <div id="searchdiv" class="easyui-dialog" style="width:800px; height:400px;" closed="true" buttons="#searchButton" title="自定义条件查询">
	    	<div id="div0">
		    	<select class="fields" id="fields"></select>
		    	<select class="condition" id="condition"></select>
		    	<input class="content" id="content"/>
		    	<select class="joint" id="joint"></select>
		    	<a href="javascript:newSearchWeldf();" class="easyui-linkbutton" iconCls="icon-add"></a>
		    	<a href="javascript:removeSerachByWeldf();" class="easyui-linkbutton" iconCls="icon-remove"></a>
	    	</div>
	    </div>
	    <div id="searchButton">
			<a href="javascript:searchWeldf();" class="easyui-linkbutton" iconCls="icon-ok">查询</a>
			<a href="javascript:close();" class="easyui-linkbutton" iconCls="icon-cancel">取消</a>
		</div>
		<!-- 添加修改 -->
		<div id="dlg" class="easyui-dialog" style="width: 400px; height: 500px; padding:10px 20px" closed="true" buttons="#dlg-buttons">
			<form id="fm" class="easyui-form" method="post" data-options="novalidate:true"><br/>
	            <div class="fitem">
	            	<lable><span class="required">*</span>焊缝编号</lable>
	                <input name="weldnum" id="weldnum" class="easyui-textbox" data-options="required:true">
	            </div>
	            <div class="fitem">
	            	<lable><span class="required">*</span>焊缝信息</lable>
	                <input name="weldinfo" id="weldinfo" class="easyui-textbox" data-options="required:true">
	            </div>
	            <div class="fitem">
	            	<lable>备注1</lable>
	                <input name="remark1" id="remark1" class="easyui-textbox">
	            </div>
	            <div class="fitem">
	            	<lable>备注2</lable>
	                <input name="remark2" id="remark2" class="easyui-textbox">
	            </div>
				<div class="fitem">
	            	<lable>备注3</lable>
	                <input name="remark3" id="remark3" class="easyui-textbox">
	            </div>
				<div class="fitem">
	            	<lable>备注4</lable>
	                <input name="remark4" id="remark4" class="easyui-textbox">
	            </div>
			</form>
		</div>
		<div id="dlg-buttons">
			<a href="javascript:save();" class="easyui-linkbutton" iconCls="icon-ok">保存</a>
			<a href="javascript:closeDialog('dlg');" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>
		</div>
		
		<!-- 删除 -->
		<div id="rdlg" class="easyui-dialog" style="width: 400px; height: 500px; padding:10px 20px" closed="true" buttons="#remove-buttons">
			<form id="rfm" class="easyui-form" method="post" data-options="novalidate:true"><br/>
	            <div style="margin-bottom:10px;display: none;">
	                <input name="id" id="id" class="easyui-textbox" type="hidden" value="${product.id}">
	            </div>
	            <div class="fitem">
	            	<lable>焊缝编号</lable>
	                <input name="weldnum" id="weldnum" class="easyui-textbox" readonly="true">
	            </div>
	            <div class="fitem">
	            	<lable>焊缝信息</lable>
	                <input name="weldinfo" id="weldinfo" class="easyui-textbox" readonly="true">
	            </div>
	            <div class="fitem">
	            	<lable>备注1</lable>
	                <input name="remark1" id="remark1" class="easyui-textbox" readonly="true">
	            </div>
	            <div class="fitem">
	            	<lable>备注2</lable>
	                <input name="remark2" id="remark2" class="easyui-textbox" readonly="true">
	            </div>
				<div class="fitem">
	            	<lable>备注3</lable>
	                <input name="remark3" id="remark3" class="easyui-textbox" readonly="true">
	            </div>
				<div class="fitem">
	            	<lable>备注4</lable>
	                <input name="remark4" id="remark4" class="easyui-textbox" readonly="true">
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
 
 
