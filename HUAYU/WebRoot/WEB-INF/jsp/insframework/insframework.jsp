<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>组织机构管理</title>
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
	<script type="text/javascript" src="resources/js/insframework/insframework.js"></script>
	<script type="text/javascript" src="resources/js/insframework/insframeworktree.js"></script>
	<script type="text/javascript" src="resources/js/search/search.js"></script>
	<script type="text/javascript" src="resources/js/insframework/addeditinsframework.js"></script>
	<script type="text/javascript" src="resources/js/insframework/removeinsframework.js"></script>
	
  </head>
  
  <body class="easyui-layout">
  	<jsp:include  page="../insframeworktree.jsp"/>
  	<div  id="bodys" region="center"  hide="true"  split="true" >
	  	<div id="body">
		  	<div class="functiondiv">
				<div>
					<a href="javascript:addInsframework();" class="easyui-linkbutton" iconCls="icon-newadd">新增</a>&nbsp;&nbsp;&nbsp;&nbsp;
					<a href="javascript:insertSearchInsf();" class="easyui-linkbutton" iconCls="icon-select" >查找</a>
				</div>
			</div>
			
		    <table id="insframeworkTable" style="table-layout: fixed; width:100%;"></table>
	    </div>
	    <!-- 自定义多条件查询 -->
	    <div id="searchdiv" class="easyui-dialog" style="width:800px; height:400px;" closed="true" buttons="#searchButton" title="自定义条件查询">
	    	<div id="div0">
		    	<select class="fields" id="fields"></select>
		    	<select class="condition" id="condition"></select>
		    	<input class="content" id="content"/>
		    	<select class="joint" id="joint"></select>
		    	<a href="javascript:newSearchInsf();" class="easyui-linkbutton" iconCls="icon-add"></a>
		    	<a href="javascript:removeSerach();" class="easyui-linkbutton" iconCls="icon-remove"></a>
	    	</div>
	    </div>
	    <div id="searchButton">
			<a href="javascript:searchInsf();" class="easyui-linkbutton" iconCls="icon-ok">查询</a>
			<a href="javascript:close();" class="easyui-linkbutton" iconCls="icon-cancel">取消</a>
		</div>
	</div>
	 <!-- 添加修改 -->
	<div id="dlg" class="easyui-dialog" style="width: 400px; height: 500px; padding:10px 20px" closed="true" buttons="#dlg-buttons">
		<form id="fm" class="easyui-form" method="post" data-options="novalidate:true"><br/>
			<div class="fitem">
				<input type="hidden" id="validname" value="${insf.name }"/>
				<lable><span class="required">*</span>名称</lable>
				<input class="easyui-textbox" name="name" id="name" data-options="validType:'insfnameValidate',required:true"/>
			</div>
			<div class="fitem">
				<lable>名称简写</lable>
				<input class="easyui-textbox" name="logogram" id="logogram"/>
			</div>
			<div class="fitem">
				<lable>项目编码</lable>
				<input class="easyui-textbox" name="code" id="code"/>
			</div>
			<div class="fitem">
				<lable><span class="required">*</span>上级项目</lable>
				<select class="easyui-combobox" name="parentid" id="parentid" data-options="required:true,editable:false"></select>
			</div>
			<div class="fitem">
				<lable><span class="required">*</span>项目类型</lable>
				<select class="easyui-combobox" name="typeid" id="typeid" data-options="required:true,editable:false"></select>
			</div>
		</form>
	</div>
	<div id="dlg-buttons">
		<a href="javascript:saveInsframework();" class="easyui-linkbutton" iconCls="icon-ok">保存</a>
		<a href="javascript:closeDialog('dlg');" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>
	</div>
	
	<!-- 删除 -->
	<div id="rdlg" class="easyui-dialog" style="width: 400px; height: 500px; padding:10px 20px" closed="true" buttons="#remove-buttons">
		<form id="rfm" class="easyui-form" method="post" data-options="novalidate:true"><br/>
			<div class="fitem">
				<lable>名称</lable>
				<input type="hidden" id="id" />
				<input class="easyui-textbox" name="name" id="name" readonly="readonly"/>
			</div>
			<div class="fitem">
				<lable>名称简写</lable>
				<input class="easyui-textbox" name="logogram" id="logogram" readonly="readonly"/>
			</div>
			<div class="fitem">
				<lable>项目编码</lable>
				<input class="easyui-textbox" name="code" id="code" readonly="readonly"/>
			</div>
			<div class="fitem">
				<lable>上级项目</lable>
				<input class="easyui-textbox" name="parent" id="parent" readonly="readonly"/>
			</div>
			<div class="fitem">
				<lable>项目类型</lable>
				<input class="easyui-textbox" name="type" id="type" readonly="readonly"/>
			</div>
		</form>
	</div>
	<div id="remove-buttons">
		<a href="javascript:remove();" class="easyui-linkbutton" iconCls="icon-ok">删除</a>
		<a href="javascript:closeDialog('rdlg');" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>
	</div>
  </body>
</html>
