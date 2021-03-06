<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>设备预约审核</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<link rel="stylesheet" type="text/css" href="" />
<link rel="stylesheet" type="text/css" href="resources/themes/icon.css" />
<link rel="stylesheet" type="text/css" href="resources/css/datagrid.css" />
<link rel="stylesheet" type="text/css"
href="resources/themes/default/easyui.css" />
<link rel="stylesheet" type="text/css" href="resources/css/base.css" />

<script type="text/javascript" src="resources/js/jquery.min.js"></script>
<script type="text/javascript" src="resources/js/jquery.easyui.min.js"></script>
<script type="text/javascript" src="resources/js/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="resources/js/easyui-extend-check.js"></script>
<!-- 	<script type="text/javascript" src="resources/js/insframework/insframeworktree.js"></script> -->
<script type="text/javascript" src="resources/js/equipmentAudit/equipmentAudit.js"></script>
<script type="text/javascript" src="resources/js/search/search.js"></script>
<script type="text/javascript" src="resources/js/weldingMachine/addeditweldingmachine.js"></script>
<script type="text/javascript" src="resources/js/weldingMachine/removeweldingmachine.js"></script>
</head>

<body>
	<%--   	<jsp:include  page="../insframeworktree.jsp"/> --%>
	<div id="body">
		<div class="functiondiv">
			<div>
				 <a href="javascript:insertSearchWeldingMachine();" class="easyui-linkbutton" iconCls="icon-select">查找</a>
			</div>
		</div>
		<div id="importdiv" class="easyui-dialog"
			style="width:300px; height:200px;" closed="true">
			<form id="importfm" method="post" class="easyui-form"
				data-options="novalidate:true" enctype="multipart/form-data">
				<div>
					<span><input type="file" name="file" id="file"></span> <input
						type="button" value="上传" onclick="importWeldingMachine()"
						class="upButton" />
				</div>
			</form>
		</div>
		<table id="equipmentAuditTable" style="table-layout: fixed; width:100%;"></table>

		<!-- 自定义多条件查询 -->
		<div id="searchdiv" class="easyui-dialog"
			style="width:800px; height:400px;" closed="true"
			buttons="#searchButton" title="自定义条件查询">
			<div id="div0">
				<select class="fields" id="fields"></select> <select
					class="condition" id="condition"></select> <input class="content"
					id="content" /> <select class="joint" id="joint"></select> <a
					href="javascript:newSearchWeldingMachine();"
					class="easyui-linkbutton" iconCls="icon-add"></a> <a
					href="javascript:removeSerach();" class="easyui-linkbutton"
					iconCls="icon-remove"></a>
			</div>
		</div>
		<div id="searchButton">
			<a href="javascript:searchWeldingmachine();"
				class="easyui-linkbutton" iconCls="icon-ok">查询</a> <a href="javascript:close();" class="easyui-linkbutton"
				iconCls="icon-cancel">取消</a>
		</div>
		<!-- 设备预约审核 -->
		<div id="dlg" class="easyui-dialog"
			style="width: 500px; height: 530px; padding:10px 20px" closed="true"
			buttons="#dlg-buttons">
			<form id="fmAudit" class="easyui-form" method="post"data-options="novalidate:true">
				<div class="fitem">
					<lable>固定资产编号</lable>
					<input type="hidden" id="id" name="id">
					<input class="easyui-textbox" name="equipmentNo" id="equipmentNo"
						readonly="readonly" data-options="required:true" />
				</div>
				<div class="fitem">
					<lable>焊工</lable>
					<input class="easyui-textbox" name="welderInfo" id="welderInfo" readonly="readonly">
				</div>
				<div class="fitem">
					<lable>预约时间</lable>
					<input class="easyui-datetimebox" name="appointmentDatetime" id="appointmentDatetime" readonly="readonly"/>
				</div>
				<div class="fitem">
					<lable>归还时间</lable>
					<input class="easyui-datetimebox" name="giveBackDatetime" id="giveBackDatetime" readonly="readonly"/>
				</div>
				<div class="fitem">
					<lable><span class="required">*</span>审核结果</lable>
					<select class="easyui-combobox" name="check_status" id="check_status" style="position:absolute;z-index:2;"
					οnmοusedοwn="if(this.options.length>3){this.size=4}" οnblur="this.size=0" οnchange="this.size=0"></select>
				</div>
				<div class="fitem">
					<lable>预约信息</lable>
					<textarea rows="6" cols="30" name="appointmentMessage" id="appointment_message" readonly="readonly"></textarea>
				</div>
				<div class="fitem">
					<lable>备注</lable>
					<textarea rows="6" cols="30" name="remarks" id="remarks" readonly="readonly"></textarea>
				</div>
				<div class="fitem">
					<lable><span class="required">*</span>审核信息</lable>
					<textarea rows="6" cols="30" name="checkMessage" id="checkMessage" data-options="required:true"></textarea>
				</div>
			</form>
		</div>
		<div id="dlg-buttons">
			<a href="javascript:saveEquipmentAudit();" class="easyui-linkbutton"
				iconCls="icon-ok">保存</a> <a href="javascript:closeDialog('dlg');"
				class="easyui-linkbutton" iconCls="icon-cancel">取消</a>
		</div>
		
	</div>
</body>
</html>
