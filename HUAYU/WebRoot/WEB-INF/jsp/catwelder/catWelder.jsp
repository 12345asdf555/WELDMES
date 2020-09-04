<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>焊工管理</title>
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
	<script type="text/javascript" src="resources/js/catwelder/catWelder.js"></script>
	<script type="text/javascript" src="resources/js/easyui-extend-check.js"></script>
	<script type="text/javascript" src="resources/js/search/search.js"></script>
	<script type="text/javascript" src="resources/js/catwelder/addcatWelder.js"></script>
	<script type="text/javascript" src="resources/js/catwelder/destroycatWelder.js"></script>
	
  </head>
  <body>
  	<div id="body">
	  	<div class="functiondiv">
			<div>
				<a href="javascript:saveWelder();" class="easyui-linkbutton" iconCls="icon-newadd">新增</a>&nbsp;&nbsp;&nbsp;&nbsp;
				<a href="javascript:importclick();" class="easyui-linkbutton" iconCls="icon-import">导入</a>&nbsp;&nbsp;&nbsp;&nbsp;
				<a href="javascript:exportcatwelder();" class="easyui-linkbutton" iconCls="icon-export">导出</a>&nbsp;&nbsp;&nbsp;&nbsp;	
				<a href="javascript:insertSearchWelder();" class="easyui-linkbutton" iconCls="icon-select" >查找</a>
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
		
	    <table id="welderTable" style="table-layout: fixed; width:100%;"></table>
		<!-- 自定义多条件查询 -->
	    <div id="searchdiv" class="easyui-dialog" style="width:800px; height:400px;" closed="true" buttons="#searchButton" title="自定义条件查询">
	    	<div id="div0">
		    	<select class="fields" id="fields"></select>
		    	<select class="condition" id="condition"></select>
		    	<input class="content" id="content"/>
		    	<select class="joint" id="joint"></select>
		    	<a href="javascript:newSearchWelder();" class="easyui-linkbutton" iconCls="icon-add"></a>
		    	<a href="javascript:removeSerach();" class="easyui-linkbutton" iconCls="icon-remove"></a>
	    	</div>
	    </div>
	    <div id="searchButton">
			<a href="javascript:searchWelder();" class="easyui-linkbutton" iconCls="icon-ok">查询</a>
			<a href="javascript:close();" class="easyui-linkbutton" iconCls="icon-cancel">取消</a>
		</div>
	    <!-- 添加修改 -->
		<div id="dlg" class="easyui-dialog" style="width: 400px; height: 500px; padding:10px 20px" closed="true" buttons="#dlg-buttons">
			<form id="fm" class="easyui-form" method="post" data-options="novalidate:true"><br/>
				<div class="fitem">
	            	<lable><span class="required">*</span>工号</lable>
	            	<input id="validName" type="hidden" >
	                <input name="welderno" id="welderno" class="easyui-textbox" data-options="validType:['checkNumber','welderValidate','checkLength'],required:true">
	                <lable><span class="required">*</span>入职时间</lable>
					<input class="easyui-datetimebox" id="fcheckintime"  name="fcheckintime"/>
	            </div>
	            <div class="fitem">
	            	<lable><span class="required">*</span>姓名</lable>
	                <input name="name" class="easyui-textbox" data-options="required:true">
	                <lable>技能等级</lable>
					<input class="easyui-textbox"  id="level" name="level"/>
	            </div>
	            <div class="fitem">
	            	<lable>手机</lable>
	                <input name="cellphone" type="easyui-textbox" class="easyui-textbox" >
	            </div>
	            <div class="fitem">
					<lable>主岗位名称</lable>
					<input class="easyui-textbox" id="workkmainname" name="workkmainname"/>
					<lable>主岗位上岗时间</lable>
					<input class="easyui-datetimebox" id="workmaintime"  name="workmaintime"/>
				</div>
				<div class="fitem">
					<lable>岗位一名称</lable>
					<input class="easyui-textbox" id="workfirstname" name="workfirstname"/>
					<lable>岗位一上岗时间</lable>
					<input class="easyui-datetimebox" id="workfirsttime"  name="workfirsttime"/>
				</div>
	            <div class="fitem">
					<lable>岗位二名称</lable>
					<input class="easyui-textbox" id="worksecondname" name="worksecondname"/>
					<lable>岗位二上岗时间</lable>
					<input class="easyui-datetimebox" id="worksecondtime"  name="worksecondtime"/>
				</div>
	            <div class="fitem">
	            	<lable><span class="required">*</span>钢印号</lable>
	                <input name="cardnum" class="easyui-textbox" data-options="required:true">
	                <lable>首次认证时间</lable>
					<input class="easyui-datetimebox" id="firstsuretime"  name="firstsuretime" />
	            </div>
	            <div class="fitem">
					<lable><span class="required">*</span>分类</lable>
					<select class="easyui-combobox" name="leveid" id="leveid" data-options="required:true,editable:false"></select>
					<lable><span class="required">*</span>IE2111从事员</lable>
					<select class="easyui-combobox" name="quali" id="quali" data-options="required:true,editable:false"></select>
	        	</div>
	        	<div class="fitem">
					<lable>理论考试成绩</lable>
					<input class="easyui-numberbox"  min="0.001" precision="3"  id="score" name="score"/>
					<lable>认证状态</lable>
					<input class="easyui-textbox"  id="ifpase"  name="ifpase"/>
				</div>
				<div class="fitem">
					<lable><span class="required">*</span>IC卡有效期</lable>
					<input class="easyui-datetimebox" id="icworkime"  name="icworkime"/>
					<lable>半年确认时间</lable>
					<input class="easyui-datetimebox" id="halfyearsure"  name="halfyearsure"/>
				</div>
	            <div class="fitem">
					<lable><span class="required">*</span>部门</lable>
					<select class="easyui-combobox" name="owner" id="owner" data-options="required:true,editable:false"></select>
					<lable>车间</lable>
					<input class="easyui-textbox" id="workship" name="workship"/>
	        	</div>
	        	<div class="fitem">
					<lable>年度认证</lable>
					<input class="easyui-datetimebox" id="yearsure"  name="yearsure"/>
					<lable>次年年度认证</lable>
					<input class="easyui-datetimebox" id="nextyear"  name="nextyear"/>
<!-- 					<lable>完成时间</lable> -->
<!-- 					<input class="easyui-datetimebox" id="endTime"  name="endTime"/> -->
				</div>
				<div class="fitem">
	            	<lable>备注</lable>
	                <input name="back" class="easyui-textbox">
	            </div>
			</form>
		</div>
		<div id="dlg-buttons">
			<a href="javascript:save();" class="easyui-linkbutton" iconCls="icon-ok">保存</a>
			<a href="javascript:$('#dlg').dialog('close');" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>
		</div>
		
		<!-- 删除 -->
		<div id="rdlg" class="easyui-dialog" style="width: 400px; height: 500px; padding:10px 20px" closed="true" buttons="#remove-buttons">
			<form id="rfm" class="easyui-form" method="post" data-options="novalidate:true"><br/>
				<div style="margin-bottom:10px;display: none;">
	                <input name="FID" id="FID"  type="hidden">
	            </div>
	            <div class="fitem">
	            	<lable>编号</lable>
	                <input name="welderno" id="welderno" class="easyui-textbox"  readonly="true" >
	                <lable><span class="required">*</span>入职时间</lable>
					<input class="easyui-datetimebox" id="fcheckintime"  name="fcheckintime" readonly="true">
	            </div>
	            <div class="fitem">
	            	<lable>姓名</lable>
	                <input name="name" class="easyui-textbox" readonly="true" >
	                 <lable>技能等级</lable>
					<input class="easyui-textbox"  id="level" name="level" readonly="true"/>
	            </div>
	            <div class="fitem">
	            	<lable>手机</lable>
	                <input name="cellphone" type="easyui-textbox"  class="easyui-textbox" readonly="true" >
	            </div>
	             <div class="fitem">
					<lable>主岗位名称</lable>
					<input class="easyui-textbox" id="workkmainname" name="workkmainname" readonly="true"/>
					<lable>主岗位上岗时间</lable>
					<input class="easyui-datetimebox" id="workmaintime"  name="workmaintime" readonly="true"/>
				</div>
				<div class="fitem">
					<lable>岗位一名称</lable>
					<input class="easyui-textbox" id="workfirstname" name="workfirstname" readonly="true"/>
					<lable>岗位一上岗时间</lable>
					<input class="easyui-datetimebox" id="workfirsttime"  name="workfirsttime" readonly="true"/>
				</div>
	            <div class="fitem">
					<lable>岗位二名称</lable>
					<input class="easyui-textbox" id="worksecondname" name="worksecondname" readonly="true"/>
					<lable>岗位二上岗时间</lable>
					<input class="easyui-datetimebox" id="worksecondtime"  name="worksecondtime" readonly="true"/>
				</div>
	            <div class="fitem">
	            	<lable>钢印号</lable>
	                <input name="cardnum" class="easyui-textbox" readonly="true" readonly="true" >
	                <lable>首次认证时间</lable>
					<input class="easyui-datetimebox" id="firstsuretime"  name="firstsuretime" readonly="true"/>
	            </div>
	            <div class="fitem">
					<lable>分类</lable>
					<input name="leveid" id="leveid" type="hidden" >
					<input class="easyui-textbox" name="levename" id="levename" readonly="true" />
					<lable>IE2111从事员</lable>
					<input name="quali" id="quali" type="hidden"  >
					<input class="easyui-textbox" name="qualiname" id="qualiname"  readonly="true" />
	        	</div>
	            <div class="fitem">
					<lable>部门</lable>
					<input name="owners" id="owners" type="hidden" >
					<input class="easyui-textbox" name="ownername" id="ownername" readonly="true" />
					<lable>车间</lable>
					<input class="easyui-textbox" id="workship" name="workship" readonly="true"/>
	        	</div>
	        	<div class="fitem">
					<lable>年度认证</lable>
					<input class="easyui-datetimebox" id="yearsure"  name="yearsure" readonly="true"/>
					<lable>半年年度认证</lable>
					<input class="easyui-datetimebox" id="halfyearsure"  name="halfyearsure" readonly="true"/>
					<lable>次年年度认证</lable>
					<input class="easyui-datetimebox" id="nextyear"  name="nextyear" readonly="true"/>
<!-- 					<lable>完成时间</lable> -->
<!-- 					<input class="easyui-datetimebox" id="endTime"  name="endTime"/> -->
				</div>
				<div class="fitem">
	            	<lable>备注</lable>
	                <input name="back" readonly="true" class="easyui-textbox" readonly="true" >
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
