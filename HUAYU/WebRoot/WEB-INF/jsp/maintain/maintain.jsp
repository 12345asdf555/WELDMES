<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>维修记录管理</title>
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
	<script type="text/javascript" src="resources/js/maintain/maintain.js"></script>
	<script type="text/javascript" src="resources/js/maintain/addeditmaintain.js"></script>
	<script type="text/javascript" src="resources/js/maintain/removemaintain.js"></script>
	<script type="text/javascript" src="resources/js/search/search.js"></script>
<!-- 	<script type="text/javascript" src="resources/js/gather/removegather.js"></script> -->
	
  </head>
    
  <body>
  	<div id="body">
	  	<div class="functiondiv">
			<div>
				<a href="javascript:addMaintain();" class="easyui-linkbutton" iconCls="icon-newadd">新增</a>&nbsp;&nbsp;&nbsp;&nbsp;
				<a href="javascript:importclick();" class="easyui-linkbutton" iconCls="icon-import">导入</a>&nbsp;&nbsp;&nbsp;&nbsp;
				<a href="javascript:exporMaintain();" class="easyui-linkbutton" iconCls="icon-export">导出</a>&nbsp;&nbsp;&nbsp;&nbsp;
				<a href="javascript:insertSearchMaintain();" class="easyui-linkbutton" iconCls="icon-select" >查找</a>
			</div>
		</div>
		<div id="importdiv" class="easyui-dialog" style="width:300px; height:200px;" closed="true">
			<form id="importfm" method="post" class="easyui-form" data-options="novalidate:true" enctype="multipart/form-data"> 
				<div>
					<span><input type="file" name="file" id="file"></span>
					<input type="button" value="上传" class="upButton" onclick="importWeldingMachine()"/> 
				</div>
			</form>
		</div>
		
	    <table id="maintainTable" style="table-layout: fixed; width:100%;"></table>
	    
	    <!-- 自定义多条件查询 -->
	    <div id="searchdiv" class="easyui-dialog" style="width:800px; height:400px;" closed="true" buttons="#searchButton" title="自定义条件查询">
	    	<div id="div0">
		    	<select class="fields" id="fields"></select>
		    	<select class="condition" id="condition"></select>
		    	<input class="content" id="content"/>
		    	<select class="joint" id="joint"></select>
		    	<a href="javascript:newSearchMaintain();" class="easyui-linkbutton" iconCls="icon-add"></a>
		    	<a href="javascript:removeSerach();" class="easyui-linkbutton" iconCls="icon-remove"></a>
	    	</div>
	    </div>
	    <div id="searchButton">
			<a href="javascript:searchMaintain();" class="easyui-linkbutton" iconCls="icon-ok">查询</a>
			<a href="javascript:close();" class="easyui-linkbutton" iconCls="icon-cancel">取消</a>
		</div>
	    <!-- 添加修改 -->
		<div id="dlg" class="easyui-dialog" style="width: 400px; height: 500px; padding:10px 20px" closed="true" buttons="#dlg-buttons">
			<form id="fm" class="easyui-form" method="post" data-options="novalidate:true"><br/>
			<div class="fitem">
				<lable><span class="required">*</span>固定资产编号</lable>
				<select class="easyui-combobox" name="wid" id="wid" data-options="required:true,editable:false"></select>
			</div>
			<div class="fitem">
				<lable><span class="required">*</span>维修类型</lable>
				<select class="easyui-combobox" name="typeid" id="typeid" data-options="required:true,editable:false"></select>
			</div>
			<div class="fitem">
				<lable><span class="required">*</span>维修人员</lable>
				<input class="easyui-textbox" name="viceman" id="viceman" data-options="required:true"/>
			</div>
			<div class="fitem">
				<lable><span class="required">*</span>起始时间</lable>
				<input class="easyui-datetimebox" name="starttime" id="starttime" data-options="required:true"/>
			</div>
			<div class="fitem">
				<lable>结束时间</lable>
				<input class="easyui-datetimebox" name="endtime" id="endtime"/>
			</div>
			<div class="fitem">
				<lable>维修说明</lable>
				<textarea name="desc" id="desc" style="height:40px;width:150px"></textarea>
			</div>
			</form>
		</div>
		<div id="dlg-buttons">
			<a href="javascript:saveMaintain();" class="easyui-linkbutton" iconCls="icon-ok">保存</a>
			<a href="javascript:closeDialog('dlg');" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>
		</div>
		<!-- 删除 -->
		<div id="rdlg" class="easyui-dialog" style="width: 400px; height: 500px; padding:10px 20px" closed="true" buttons="#remove-buttons">
			<form id="rfm" class="easyui-form" method="post" data-options="novalidate:true"><br/>
				<div class="fitem">
					<lable>固定资产编号</lable>
					<input type="hidden" id="wid" readonly="readonly" />
					<input class="easyui-textbox" name="equipmentNo" readonly="readonly" />
				</div>
				<div class="fitem">
					<lable>维修类型</lable>
					<input class="easyui-textbox" name=typename readonly="readonly"/>
				</div>
				<div class="fitem">
					<lable>维修人员</lable>
					<input class="easyui-textbox" name="viceman" readonly="readonly" />
				</div>
				<div class="fitem">
					<lable>起始时间</lable>
					<input class="easyui-textbox" name="starttime" readonly="readonly"/>
				</div>
				<div class="fitem">
					<lable>结束时间</lable>
					<input class="easyui-textbox" name="endtime" readonly="readonly" />
				</div>
				<div class="fitem">
					<lable>维修说明</lable>
					<input class="easyui-textbox" name="desc" readonly="readonly"/>
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
