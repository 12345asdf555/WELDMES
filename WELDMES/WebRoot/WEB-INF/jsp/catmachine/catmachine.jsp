<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>焊机设备管理</title>
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
<!-- 	<script type="text/javascript" src="resources/js/insframework/insframeworktree.js"></script> -->
	<script type="text/javascript" src="resources/js/catmachine/catmachine.js"></script>
	<script type="text/javascript" src="resources/js/search/search.js"></script>
	<script type="text/javascript" src="resources/js/catmachine/addcatmachine.js"></script>
	<script type="text/javascript" src="resources/js/catmachine/removecatmachine.js"></script>
  </head>
  
  <body>
<%--   	<jsp:include  page="../insframeworktree.jsp"/> --%>
  	<div id="body" >
	  	<div class="functiondiv">
			<div>
				<a href="javascript:addWeldingMachine();" class="easyui-linkbutton" iconCls="icon-newadd">新增</a>&nbsp;&nbsp;&nbsp;&nbsp;
				<a href="javascript:importclick();" class="easyui-linkbutton" iconCls="icon-import">导入</a>&nbsp;&nbsp;&nbsp;&nbsp;
				<a href="javascript:exportWeldingMachine();" class="easyui-linkbutton" iconCls="icon-export">导出</a>&nbsp;&nbsp;&nbsp;&nbsp;	
				<a href="javascript:insertSearchWeldingMachine();" class="easyui-linkbutton"iconCls="icon-select" >查找</a>
			</div>
		</div>
		<div id="importdiv" class="easyui-dialog" style="width:300px; height:200px;" closed="true">
			<form id="importfm" method="post" class="easyui-form" data-options="novalidate:true" enctype="multipart/form-data"> 
				<div>
					<span><input type="file" name="file" id="file"></span>
					<input type="button" value="上传" onclick="importWeldingMachine()" class="upButton"/>
				</div>
			</form>
		</div>
	    <table id="weldingmachineTable" style="table-layout: fixed; width:100%;"></table>
		
		<!-- 自定义多条件查询 -->
	    <div id="searchdiv" class="easyui-dialog" style="width:800px; height:400px;" closed="true" buttons="#searchButton" title="自定义条件查询">
	    	<div id="div0">
		    	<select class="fields" id="fields"></select>
		    	<select class="condition" id="condition"></select>
		    	<input class="content" id="content"/>
		    	<select class="joint" id="joint"></select>
		    	<a href="javascript:newSearchWeldingMachine();" class="easyui-linkbutton" iconCls="icon-add"></a>
		    	<a href="javascript:removeSerach();" class="easyui-linkbutton" iconCls="icon-remove"></a>
	    	</div>
	    </div>
	    <div id="searchButton">
			<a href="javascript:searchWeldingmachine();" class="easyui-linkbutton" iconCls="icon-ok">查询</a>
			<a href="javascript:close();" class="easyui-linkbutton" iconCls="icon-cancel">取消</a>
		</div>
	    <!-- 添加修改 -->
		<div id="dlg" class="easyui-dialog" style="width: 400px; height: 530px; padding:10px 20px" closed="true" buttons="#dlg-buttons">
			<form id="fm" class="easyui-form" method="post" data-options="novalidate:true">
				<div class="fitem">
					<lable><span class="required">*</span>设备编号</lable>
					<input type="hidden" id="valideno">
					<input class="easyui-textbox" name="equipmentNo" id="equipmentNo" />
				</div>
				<div class="fitem">
					<lable><span class="required">*</span>设备类型</lable>
					<select class="easyui-combobox" name="typeId" id="tId" data-options="required:true,editable:false"" ></select>
				</div>
				<div class="fitem">
					<lable><span class="required">*</span>制造厂家</lable>
					<select class="easyui-combobox" name="manuno" id="manuno" data-options="required:true,editable:false""></select>
				</div>
				<div class="fitem">
					<lable><span class="required">*</span>设备型号</lable>
					<select class="easyui-combobox" name="model" id="model" data-options="required:true,editable:false"" ></select>
				</div>
				<div class="fitem">
					<lable></span>出厂编号</lable>
					<select class="easyui-textbox" name="manufacturerNo" id="manufacturerNo" ></select>
				</div>
				<div class="fitem">
					<lable>使用日期</lable>
					<input class="easyui-datetimebox" name="joinTime" id="joinTime"/>
				</div>
				<div class="fitem">
					<lable>存放地点</lable>
					<input class="easyui-textbox" name="position" id="position"/>
				</div>
				<div class="fitem">
					<lable>使用工段</lable>
					<input class="easyui-textbox" name="action" id="action" />
				</div>
				<div class="fitem">
					<lable>上度认证时间</lable>
					<input class="easyui-datetimebox" name="inspectTime" id="inspectTime"/>
				</div>
				<div class="fitem">
					<lable>下次效验时间</lable>
					<input class="easyui-datetimebox" name="nextTime" id="nextTime"/>
				</div>
				<div class="fitem">
					<lable>预防性维护日期</lable>
					<input class="easyui-datetimebox" name="maintainTime" id="maintainTime"/>
				</div>
				<div class="fitem">
					<lable><span class="required">*</span>所属项目</lable>
					<input type="hidden" id="validinsf">
					<select class="easyui-combobox" name="iId" id="iId" data-options="required:true,editable:false""></select>
				</div>
				<div class="fitem">
					<lable>采集序号</lable>
					<input type="hidden" id="validgid">
					<select class="easyui-combobox" name="gid" id="gid" data-options="validType:['checkNumber','wmGatheridValidate'],editable:false""></select>
				</div>
				<div class="fitem">
					<lable>ip地址</lable>
					<input class="easyui-textbox" name="ip" id="ip" />
				</div>
				<div class="fitem" >
					<lable>是否联网</lable>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="radio" class="radioStyle" name="isnetworkingId" value="0" checked="checked"/>是&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="radio" class="radioStyle" name="isnetworkingId" value="1"/>否&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</div>
				<div class="fitem">
					<lable>状态</lable>
	   				<span id="radios"></span>
				</div>
			</form>
		</div>
		<div id="dlg-buttons">
			<a href="javascript:saveWeldingMachine();" class="easyui-linkbutton" iconCls="icon-ok">保存</a>
			<a href="javascript:$('#dlg').dialog('close');" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>
		</div>
		
		<!-- 删除 -->
		<div id="rdlg" class="easyui-dialog" style="width: 400px; height: 530px; padding:10px 20px" closed="true" buttons="#remove-buttons">
			<form id="rfm" class="easyui-form" method="post" data-options="novalidate:true">
				<div class="fitem">
					<lable>设备编号</lable>
					<input type="hidden" id="valideno">
					<input class="easyui-textbox" name="equipmentNo" readonly="true"/>
				</div>
				<div class="fitem">
					<lable>设备类型</lable>
					<input class="easyui-textbox" name="typeName" readonly="true"/>
				</div>
				<div class="fitem">
					<lable>制造厂家</lable>
					<input class="easyui-textbox" name="manufacturerName" readonly="true"/>
				</div>
				<div class="fitem">
					<lable>设备型号</lable>
					<input class="easyui-textbox" name="model" readonly="true"/>
				</div>
				<div class="fitem">
					<lable>出厂编号</lable>
					<select class="easyui-textbox" name="manufacturerNo" readonly="true"></select>
				</div>
				<div class="fitem">
					<lable>使用日期</lable>
					<input class="easyui-textbox" name="joinTime" readonly="true"/>
				</div>
				<div class="fitem">
					<lable>存放地点</lable>
					<input class="easyui-textbox" name="position" ireadonly="true"/>
				</div>
				<div class="fitem">
					<lable>使用工段</lable>
					<input class="easyui-textbox" name="action" readonly="true"/>
				</div>
				<div class="fitem">
					<lable>上度认证时间</lable>
					<input class="easyui-textbox" name="inspectTime" readonly="true"/>
				</div>
				<div class="fitem">
					<lable>下次效验时间</lable>
					<input class="easyui-textbox" name="nextTime" readonly="true"/>
				</div>
				<div class="fitem">
					<lable>预防性维护日期</lable>
					<input class="easyui-textbox" name="maintainTime" readonly="true"/>
				</div>
				<div class="fitem">
					<lable>所属项目</lable>
					<input type="hidden" id="validinsf">
					<input class="easyui-textbox" name="insframeworkName" readonly="true"/>
				</div>
				<div class="fitem">
					<lable>采集序号</lable>
					<input type="hidden" id="validgid">
					<input class="easyui-textbox" name="gatherId" readonly="true"/>
				</div>
				<div class="fitem">
					<lable>ip地址</lable>
					<input class="easyui-textbox" name="ip" data-options="required:true" readonly="true"/>
				</div>
				<div class="fitem" >
					<lable>是否联网</lable>
					<input class="easyui-textbox" name="isnetworking" readonly="readonly"/>
				</div>
				<div class="fitem">
					<lable>状态</lable>
	   				<input class="easyui-textbox" name="statusName" readonly="readonly"/>
				</div>
			</form>
		</div>
		<div id="remove-buttons">
			<a href="javascript:remove();" class="easyui-linkbutton" iconCls="icon-ok">删除</a>
			<a href="javascript:$('#rdlg').dialog('close');" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>
		</div>
	</div>
  </body>
</html>
