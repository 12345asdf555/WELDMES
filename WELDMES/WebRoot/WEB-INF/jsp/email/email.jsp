<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>邮件管理</title>
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
<!-- 	<script type="text/javascript" src="resources/js/insframework/insframeworktree.js"></script> -->
	<script type="text/javascript" src="resources/js/easyui-extend-check.js"></script>
	<script type="text/javascript" src="resources/js/email/email.js"></script>
	<script type="text/javascript" src="resources/js/search/search.js"></script>
	
  </head>
  
  <body>
  	<div id="body">
	  	<div class="functiondiv">
			<div>
				<a href="javascript:addEmail()" class="easyui-linkbutton" iconCls="icon-newadd">新增</a>&nbsp;&nbsp;&nbsp;&nbsp;
				<a href="javascript:insertSearchEmail();" class="easyui-linkbutton" iconCls="icon-select" >查找</a>
			</div>
		</div>
		
	    <table id="dg" style="table-layout: fixed; width:100%;"></table>
	    
	    <!-- 自定义多条件查询 -->
	    <div id="searchdiv" class="easyui-dialog" style="width:800px; height:400px;" closed="true" buttons="#searchButton" title="自定义条件查询">
	    	<div id="div0">
		    	<select class="fields" id="fields"></select>
		    	<select class="condition" id="condition"></select>
		    	<input class="content" id="content"/>
		    	<select class="joint" id="joint"></select>
		    	<a href="javascript:newSearchEmail();" class="easyui-linkbutton" iconCls="icon-add"></a>
		    	<a href="javascript:removeSerach();" class="easyui-linkbutton" iconCls="icon-remove"></a>
	    	</div>
	    </div>
	    <div id="searchButton">
			<a href="javascript:searchEmail();" class="easyui-linkbutton" iconCls="icon-ok">查询</a>
			<a href="javascript:close();" class="easyui-linkbutton" iconCls="icon-cancel">取消</a>
		</div>
	    <!-- 添加修改 -->
		<div id="dlg" class="easyui-dialog" style="width: 400px; height: 500px; padding:10px 20px" closed="true" buttons="#dlg-buttons">
			<form id="fm" class="easyui-form" method="post" data-options="novalidate:true"><br/>
				<div class="fitem">
					<lable><span class="required">*</span>接收者</lable>
					<input class="easyui-textbox" name="femailname" id="femailname" data-options="required:true"/>
				</div>
				<div class="fitem">
					<lable><span class="required">*</span>邮箱地址</lable>
					<input type="hidden" id="oldemail"/>
					<input class="easyui-textbox" name="femailaddress" id="femailaddress" data-options="required:true,validType:['email','emailValidate']"/>
				</div>
				<div class="fitem">
					<lable><input type="checkbox" name="femailtype" value="1" style="width:20px;"/></lable>
					半年年度认证
				</div>
				<div class="fitem">
					<lable><input type="checkbox" name="femailtype" value="2" style="width:20px;"/></lable>
					IC卡有效日期
				</div>
				<div class="fitem">
					<lable><input type="checkbox" name="femailtype" value="3" style="width:20px;"/></lable>
					员工长时间未工作提醒
				</div>
				<div class="fitem">
					<lable><input type="checkbox" name="femailtype" value="4" style="width:20px;"/></lable>
					下次校验日期
				</div>
				<div class="fitem">
					<lable><input type="checkbox" name="femailtype" value="5" style="width:20px;"/></lable>
					预防性维护日期
				</div>
			</form>
		</div>
		<div id="dlg-buttons">
			<a href="javascript:saveEmail();" class="easyui-linkbutton" iconCls="icon-ok">保存</a>
			<a href="javascript:$('#dlg').dialog('close');" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>
		</div>
		
		<!-- 删除 -->
		<div id="rdlg" class="easyui-dialog" style="width: 400px; height: 500px; padding:10px 20px" closed="true" buttons="#remove-buttons">
			<form id="rfm" class="easyui-form" method="post" data-options="novalidate:true"><br/>
				<div class="fitem">
					<lable>接收者</lable>
					<input class="easyui-textbox" name="femailname" id="femailname" readonly="readonly"/>
				</div>
				<div class="fitem">
					<lable>邮箱地址</lable>
					<input class="easyui-textbox" name="femailaddress" id="femailaddress" readonly="readonly"/>
				</div>
				<div class="fitem">
					<lable><input type="checkbox" name="femailtype" value="1" style="width:20px;" disabled="disabled"/></lable>
					员工入职半年提醒
				</div>
				<div class="fitem">
					<lable><input type="checkbox" name="femailtype" value="2" style="width:20px;" disabled="disabled"/></lable>
					员工IC卡有效期提醒
				</div>
				<div class="fitem">
					<lable><input type="checkbox" name="femailtype" value="3" style="width:20px;" disabled="disabled"/></lable>
					员工长时间未工作提醒
				</div>
				<div class="fitem">
					<lable><input type="checkbox" name="femailtype" value="4" style="width:20px;" disabled="disabled"/></lable>
					下次校验日期
				</div>
				<div class="fitem">
					<lable><input type="checkbox" name="femailtype" value="5" style="width:20px;" disabled="disabled"/></lable>
					预防性维护日期
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
