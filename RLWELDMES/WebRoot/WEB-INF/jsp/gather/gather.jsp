<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>采集模块管理</title>
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
<!-- 	<script type="text/javascript" src="resources/js/insframework/insframeworktree.js"></script> -->
	<script type="text/javascript" src="resources/js/easyui-extend-check.js"></script>
	<script type="text/javascript" src="resources/js/gather/gather.js"></script>
	<script type="text/javascript" src="resources/js/search/search.js"></script>
	<script type="text/javascript" src="resources/js/gather/addeditgather.js"></script>
	<script type="text/javascript" src="resources/js/gather/removegather.js"></script>
	
  </head>
  
  <body>
  	<div id="body">
	  	<div class="functiondiv">
			<div>
				<a href="javascript:addGather()" class="easyui-linkbutton" iconCls="icon-newadd">新增</a>&nbsp;&nbsp;&nbsp;&nbsp;
				<a href="javascript:insertSearchGather();" class="easyui-linkbutton" iconCls="icon-select" >查找</a>
			</div>
		</div>
		
	    <table id="gatherTable" style="table-layout: fixed; width:100%;"></table>
	    
	    <!-- 自定义多条件查询 -->
	    <div id="searchdiv" class="easyui-dialog" style="width:800px; height:400px;" closed="true" buttons="#searchButton" title="自定义条件查询">
	    	<div id="div0">
		    	<select class="fields" id="fields"></select>
		    	<select class="condition" id="condition"></select>
		    	<input class="content" id="content"/>
		    	<select class="joint" id="joint"></select>
		    	<a href="javascript:newSearchGather();" class="easyui-linkbutton" iconCls="icon-add"></a>
		    	<a href="javascript:removeSerach();" class="easyui-linkbutton" iconCls="icon-remove"></a>
	    	</div>
	    </div>
	    <div id="searchButton">
			<a href="javascript:searchGather();" class="easyui-linkbutton" iconCls="icon-ok">查询</a>
			<a href="javascript:close();" class="easyui-linkbutton" iconCls="icon-cancel">取消</a>
		</div>
	    <!-- 添加修改 -->
		<div id="dlg" class="easyui-dialog" style="width: 400px; height: 500px; padding:10px 20px" closed="true" buttons="#dlg-buttons">
			<form id="fm" class="easyui-form" method="post" data-options="novalidate:true"><br/>
				<div class="fitem">
					<input type="hidden" id="validgatherno"/>
					<lable><span class="required">*</span>采集模块编号</lable>
					<input class="easyui-textbox" name="gatherNo" id="gatherNo" data-options="validType:['checkNumber','gathernoValidate','checkLength'],required:true"/>
				</div>
				<div class="fitem">
					<lable><span class="required">*</span>所属项目</lable>
					<select class="easyui-combobox" name="itemid" id="itemid" data-options="required:true,editable:false"></select>
				</div>
				<div class="fitem">
					<lable><span class="required">*</span>采集模块状态</lable>
					<select class="easyui-combobox" name="status" id="status" data-options="required:true,editable:false"></select>
				</div>
				<div class="fitem">
					<lable><span class="required">*</span>采集模块通讯协议</lable>
					<select class="easyui-combobox" name="protocol" id="protocol" data-options="required:true,editable:false"></select>
				</div>
				<div class="fitem">
					<lable>采集模块IP地址</lable>
					<input class="easyui-textbox" name="ipurl" id="ipurl"/>
				</div>
				<div class="fitem">
					<lable>采集模块MAC地址</lable>
					<input class="easyui-textbox" name="macurl" id="macurl" />
				</div>
				<div class="fitem">
					<lable>采集模块出厂时间</lable>
					<input class="easyui-datetimebox" name="leavetime" id="leavetime"/>
				</div>
			</form>
		</div>
		<div id="dlg-buttons">
			<a href="javascript:saveGather();" class="easyui-linkbutton" iconCls="icon-ok">保存</a>
			<a href="javascript:closeDialog('dlg');" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>
		</div>
		
		<!-- 删除 -->
		<div id="rdlg" class="easyui-dialog" style="width: 400px; height: 500px; padding:10px 20px" closed="true" buttons="#remove-buttons">
			<form id="rfm" class="easyui-form" method="post" data-options="novalidate:true"><br/>
				<div class="fitem">
					<input type="hidden" id="id"/>
					<lable>采集模块编号</lable>
					<input class="easyui-textbox" name="gatherNo" id="gatherNo" readonly="readonly"/>
				</div>
				<div class="fitem">
					<lable>所属项目</lable>
					<input class="easyui-textbox" name="itemname" id="itemname" readonly="readonly"/>
				</div>
				<div class="fitem">
					<lable>采集模块状态</lable>
					<input class="easyui-textbox" name="status" id="status" readonly="readonly"/>
				</div>
				<div class="fitem">
					<lable>采集模块通讯协议</lable>
					<input class="easyui-textbox" name="protocol" id="protocol" readonly="readonly"/>
				</div>
				<div class="fitem">
					<lable>采集模块IP地址</lable>
					<input class="easyui-textbox" name="ipurl" id="ipurl" readonly="readonly"/>
				</div>
				<div class="fitem">
					<lable>采集模块MAC地址</lable>
					<input class="easyui-textbox" name="macurl" id="macurl" readonly="readonly"" />
				</div>
				<div class="fitem">
					<lable>采集模块出厂时间</lable>
					<input class="easyui-textbox" name="leavetime" id="leavetime" readonly="readonly"/>
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
