<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
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
<link rel="stylesheet" type="text/css"
	href="resources/themes/default/easyui.css" />
<link rel="stylesheet" type="text/css" href="resources/css/base.css" />

<script type="text/javascript" src="resources/js/json2.js"></script>
<script type="text/javascript" src="resources/js/jquery.min.js"></script>
<script type="text/javascript" src="resources/js/jquery.easyui.min.js"></script>
<script type="text/javascript" src="resources/js/datagrid-detailview.js"
	charset="utf-8"></script>
<script type="text/javascript" src="resources/js/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="resources/js/easyui-extend-check.js"></script>
<script type="text/javascript" src="resources/js/search/search.js"></script>
<script type="text/javascript" src="resources/js/wpslib/allWpslib.js"></script>
<script type="text/javascript"
	src="resources/js/wpslib/addeditWpslib.js"></script>
<script type="text/javascript" src="resources/js/wpslib/removeWpslib.js"></script>
<script type="text/javascript" src="resources/js/wpslib/giveWpslib.js"></script>
<script type="text/javascript"
	src="resources/js/wpslib/differentMachine.js"></script>
<script type="text/javascript" src="resources/js/wpslib/control.js"></script>
<script type="text/javascript"
	src="resources/js/wpslib/comboboxCheck.js"></script>
<script type="text/javascript" src="resources/js/getTimeToHours.js"></script>
<script type="text/javascript" src="resources/js/swfobject.js"></script>
<script type="text/javascript" src="resources/js/web_socket.js"></script>
	<script type="text/javascript" src="resources/js/paho-mqtt.js"></script>
	<script type="text/javascript" src="resources/js/paho-mqtt-min.js"></script>
<style type="text/css">
table tr td {
	font-size: 12px;
}

.leftTd {
	text-align: right;
}

.textbox-text {
	width: 85px;
}
</style>
</head>

<body>
	<div class="functiondiv">
		<div>
			<a href="javascript:addWpslib();" class="easyui-linkbutton" iconCls="icon-newadd">新增工艺库</a>&nbsp;&nbsp;&nbsp;&nbsp; 
			<!-- <a href="javascript:openCondlg();" class="easyui-linkbutton" iconCls="icon-newadd">控制命令下发</a>&nbsp;&nbsp;&nbsp;&nbsp;  -->
			<a href="javascript:openHistorydlg();" class="easyui-linkbutton" iconCls="icon-newadd"> 下发历史查询</a>&nbsp;&nbsp;&nbsp;&nbsp;
		</div>
	</div>
	<div id="body">
		<table id="wpslibTable" style="table-layout: fixed; width:100%;"></table>

		<!-- 添加修改工艺库 -->
		<div id="wltdlg" class="easyui-dialog"
			style="width: 400px; height: 225px; padding:10px 20px" closed="true"
			buttons="#wltdlg-buttons">
			<form id="wltfm" class="easyui-form" method="post"
				data-options="novalidate:true">
				<div class="fitem">
					<lable>
					<span class="required">*</span>工艺库名称</lable>
					<input type="hidden" id="validwl"> <input
						class="easyui-textbox" name="wpslibName" id="wpslibName"
						data-options="validType:['wpslibValidate'],required:true" />
				</div>
				<div class="fitem">
					<lable>
					<span class="required">*</span>焊机型号</lable>
					<select class="easyui-combobox" name="model" id="model"
						data-options="required:true,editable:false""></select>
				</div>
				<div class="fitem">
					<lable>状态</lable>
					<span id="radios"></span>
				</div>
			</form>
		</div>
		<div id="wltdlg-buttons">
			<a href="javascript:saveWpslib();" class="easyui-linkbutton"
				iconCls="icon-ok">保存</a> <a href="javascript:closeDialog('wltdlg');"
				class="easyui-linkbutton" iconCls="icon-cancel">取消</a>
		</div>

		<!-- 删除工艺库 -->
		<div id="rmwltdlg" class="easyui-dialog"
			style="width: 400px; height: 170px; padding:10px 20px" closed="true"
			buttons="#rmwltdlg-buttons">
			<form id="rmwltfm" class="easyui-form" method="post"
				data-options="novalidate:true">
				<div class="fitem">
					<lable>
					<span class="required">*</span>工艺库名称</lable>
					<input type="hidden" id="validwl"> <input
						class="easyui-textbox" name="wpslibName" id="wpslibName" />
				</div>
<!-- 				<div class="fitem">
					<lable>状态</lable>
					<span id="radios"></span>
				</div> -->
			</form>
		</div>
		<div id="rmwltdlg-buttons">
			<a href="javascript:removeWpslib();" class="easyui-linkbutton"
				iconCls="icon-ok">删除</a> <a href="javascript:closedlg();"
				class="easyui-linkbutton" iconCls="icon-cancel">取消</a>
		</div>

		<!-- 添加修改工艺 -->
		<div id="mwdlg" class="easyui-dialog"
			style="width: 700px; height: 510px; padding:10px 20px" closed="true"
			buttons="#mwdlg-buttons">
			<form id="mwfm" class="easyui-form" method="post"
				data-options="novalidate:true">
				<div class="fitem">
					<lable>
					<span class="required">*</span>JOB号：</lable>
					<select class="easyui-combobox" name="fchanel" id="fchanel"
						data-options="editable:false">
						<option value="1">JOB号 1</option>
						<option value="2">JOB号 2</option>
						<option value="3">JOB号 3</option>
						<option value="4">JOB号 4</option>
						<option value="5">JOB号 5</option>
						<option value="6">JOB号 6</option>
						<option value="7">JOB号 7</option>
						<option value="8">JOB号 8</option>
						<option value="9">JOB号 9</option>
						<option value="10">JOB号 10</option>
						<option value="11">JOB号 11</option>
						<option value="12">JOB号 12</option>
						<option value="13">JOB号 13</option>
						<option value="14">JOB号 14</option>
						<option value="15">JOB号 15</option>
						<option value="16">JOB号 16</option>
						<option value="17">JOB号 17</option>
						<option value="18">JOB号 18</option>
						<option value="19">JOB号 19</option>
						<option value="20">JOB号 20</option>
						<option value="21">JOB号 21</option>
						<option value="22">JOB号 22</option>
						<option value="23">JOB号 23</option>
						<option value="24">JOB号 24</option>
						<option value="25">JOB号 25</option>
						<option value="26">JOB号 26</option>
						<option value="27">JOB号 27</option>
						<option value="28">JOB号 28</option>
						<option value="29">JOB号 29</option>
						<option value="30">JOB号 30</option>
						<option value="31">JOB号 31</option>
						<option value="32">JOB号 32</option>
						<option value="33">JOB号 33</option>
						<option value="34">JOB号 34</option>
						<option value="35">JOB号 35</option>
						<option value="36">JOB号 36</option>
						<option value="37">JOB号 37</option>
						<option value="38">JOB号 38</option>
						<option value="39">JOB号 39</option>
						<option value="40">JOB号 40</option>
						<option value="41">JOB号 41</option>
						<option value="42">JOB号 42</option>
						<option value="43">JOB号 43</option>
						<option value="44">JOB号 44</option>
						<option value="45">JOB号 45</option>
						<option value="46">JOB号 46</option>
						<option value="47">JOB号 47</option>
						<option value="48">JOB号 48</option>
						<option value="49">JOB号 49</option>
						<option value="50">JOB号 50</option>
					</select>
					<lable>
					<span class="required">*</span>焊接模式：</lable>
					<select class="easyui-combobox" name="fselect" id="fselect"
						data-options="editable:false" onChange="changeValue(current,old)">
						<option value="101">一元</option>
						<option value="102">个别</option>
						<option value="103">脉冲</option>
						<option value="104">双脉冲</option>
					</select>
				</div>
				<div class="fitem">
					<lable>
					<span class="required">*</span>Step：</lable>
					<select class="easyui-combobox" name="fselectstep" id="fselectstep"
						data-options="editable:false" onChange="changeValue(current,old)">
						<option value="105">点焊</option>
						<option value="106">2T</option>
						<option value="107">4T</option>
						<option value="108">4S</option>
					</select>
					<lable>
					<span class="required">*</span>焊丝材质：</lable>
					<select class="easyui-combobox" name="fmaterial" id="fmaterial"
						data-options="editable:false">
						<option value="250">SG2</option>
						<option value="251">CRNI</option>
						<option value="252">ALSI5</option>
						<option value="253">ALMG5</option>
						<option value="254">CUSI</option>
						<option value="255">FLUXBS</option>
						<option value="256">FLUXRU</option>
					</select>
				</div>
				<div class="fitem">
					<lable>
					<span class="required">*</span>焊丝直径：</lable>
					<select class="easyui-combobox" name="fdiameter" id="fdiameter"
						data-options="editable:false">
						<option value="135">Φ0.8</option>
						<option value="131">Φ1.0</option>
						<option value="132">Φ1.2</option>
						<option value="134">Φ1.6</option>
					</select>
					<lable>
					<span class="required">*</span>气体：</lable>
					<select class="easyui-combobox" name="fgas" id="fgas"
						data-options="editable:false">
						<option value="200">100%(CO₂)</option>
						<option value="201">82%-18%(Ar-CO₂)</option>
						<option value="202">92%-8%(Ar-CO₂)</option>
						<option value="203">91%-4%-5%(Ar-O₂-CO₂)</option>
						<option value="204">98%-2%(Ar-CO₂)</option>
						<option value="205">97%-3%(Ar-O₂)</option>
						<option value="206">100%(Ar)</option>
						<option value="207">70%-30%(Ar-He)</option>
						<option value="208">Standard 100%(Ar)</option>
						<option value="209">Special 100%(Ar)</option>
						<option value="210">Standard 82%-18%(Ar-CO₂)</option>
						<option value="211">Special 82%-18%(Ar-CO₂)</option>
						<option value="212">Standard 98%-2%(Ar-CO₂)</option>
						<option value="213">Special 98%-2%(Ar-CO₂)</option>
					</select>
				</div>
				<div class="fitem">
					<lable>
					<span class="required">*</span>给定电感：</lable>
					<input id="fcharacter" name="fcharacter" class="easyui-numberbox"
						data-options="required:true">
					<div id="rfrequency" style="float: left">
						<lable>
						<span class="required">*</span>双脉冲频率：</lable>
						<select class="easyui-combobox" name="frequency" id="frequency"
							data-options="editable:false">
							<option value="137">0.5HZ</option>
							<option value="138">1.0HZ</option>
							<option value="139">1.5HZ</option>
							<option value="140">2.0HZ</option>
							<option value="141">2.5HZ</option>
							<option value="142">3.0HZ</option>
							<option value="143">3.5HZ</option>
							<option value="144">4.0HZ</option>
						</select>
					</div>
				</div>
				<div class="fitem">
					<div id="dadvance" style="float: left">
					<lable>
					<span class="required">*</span>提前送气时间：</lable>
					<input name="fadvance" id="fadvance" class="easyui-numberbox"
						data-options="required:true,precision:1">
					</div>
					<div id="rftime" style="float: left">
						<lable>
						<span class="required">*</span>点焊时间：</lable>
						<input name="ftime" id="ftime" class="easyui-numberbox"
							data-options="required:true,precision:1">
					</div>
				</div>
				<div class="fitem">
					<div id="rfini_ele" style="float: left">
						<lable>
						<span class="required">*</span>初期电流：</lable>
						<input name="fini_ele" id="fini_ele" class="easyui-numberbox"
							data-options="required:true">
					</div>
					<div id="rfini_vol" style="float: left">
						<lable>
						<span class="required">*</span>初期电压：</lable>
						<input name="fini_vol" id="fini_vol" class="easyui-numberbox"
							data-options="required:true,precision:1">
					</div>
				</div>
				<div class="fitem">
					<div id="rfweld_ele" style="float: left">
						<lable>
						<span class="required">*</span>焊接电流：</lable>
						<input name="fweld_ele" id="fweld_ele" class="easyui-numberbox"
							data-options="required:true">
					</div>
					<div id="rfweld_vol" style="float: left">
					<lable>
					<span class="required">*</span>焊接电压：</lable>
					<input name="fweld_vol" id="fweld_vol" class="easyui-numberbox"
						data-options="required:true,precision:1">
						</div>
				</div>
				<div class="fitem">
					<div id="rfarc_ele" style="float: left">
						<lable>
						<span class="required">*</span>收弧电流：</lable>
						<input name="farc_ele" id="farc_ele" class="easyui-numberbox"
							data-options="required:true">
					</div>
					<div id="rfarc_vol" style="float: left">
						<lable>
						<span class="required">*</span>收弧电压：</lable>
						<input name="farc_vol" id="farc_vol" class="easyui-numberbox"
							data-options="required:true,precision:1">
					</div>
				</div>
				<div class="fitem">
					<div id="rfarc_speed" style="float: left">
						<lable>
						<span class="required"></span>初期给定速度：</lable>
						<input name="farc_speed" id="farc_speed" class="easyui-numberbox"
							data-options="required:true,precision:1">
					</div>
					<div id="rfspeed" style="float: left">
					<lable>
					<span class="required"></span>给定速度：</lable>
					<input name="fspeed" id="fspeed" class="easyui-numberbox"
						data-options="required:true,precision:1">
						</div>
				</div>
				<div class="fitem">
					<div id="rfarc_tuny_speed" style="float: left">
						<lable>
						<span class="required"></span>收弧给定速度：</lable>
						<input name="farc_tuny_speed" id="farc_tuny_speed"
							class="easyui-numberbox" data-options="required:true,precision:1">
					</div>
				</div>
				<div class="fitem">
					<div id="rfweld_tuny_ele" style="float: left">
						<lable>
						<span class="required"></span>焊接电流微调：</lable>
						<input name="fweld_tuny_ele" id="fweld_tuny_ele"
							class="easyui-numberbox" data-options="required:true">
					</div>
					<div id="rfweld_tuny_vol" style="float: left">
						<lable>
						<span class="required"></span>焊接电压微调：</lable>
						<input name="fweld_tuny_vol" id="fweld_tuny_vol"
							class="easyui-numberbox" data-options="required:true">
					</div>
				</div>
				<div class="fitem">
					<div id="rfarc_tuny_vol" style="float: left">
						<lable>
						<span class="required"></span>初期电压微调：</lable>
						<input name="fini_tuny_vol" id="fini_tuny_vol"
							class="easyui-numberbox" data-options="required:true">
					</div>
					<div id="rfini_tuny_vol" style="float: left">
						<lable>
						<span class="required"></span>收弧电压微调：</lable>
						<input name="farc_tuny_vol" id="farc_tuny_vol"
							class="easyui-numberbox" data-options="required:true">
					</div>
				</div>
				<div class="fitem">
					<div id="fwpsbackDiv" style="float: left">
						<lable><span class="required"></span>备注：</lable>
						<textarea name="fwpsback" id="fwpsback" style="height:60px;width:150px"></textarea>
					</div>
				</div>
			</form>
			<div id="mwdlg-buttons">
				<!-- <a href="javascript:selectMachineList(0);" class="easyui-linkbutton"
					iconCls="icon-getwps" id="otcgetWpsBut">索取规范</a> --> <a
					href="javascript:saveMainWps();" class="easyui-linkbutton"
					iconCls="icon-ok" id="otcsaveWpsBut">保存</a> <a
					href="javascript:closedlg();" class="easyui-linkbutton"
					iconCls="icon-cancel">取消</a>
			</div>

			<!-- 删除工艺 -->
			<div id="rmmwdlg" class="easyui-dialog"
				style="width: 700px; height: 510px; padding:10px 20px" closed="true"
				buttons="#rmmwdlg-buttons">
				<form id="rmmwfm" class="easyui-form" method="post"
					data-options="novalidate:true">
					<div class="fitem">
						<lable>
						<span class="required">*</span>JOB号：</lable>
						<select class="easyui-combobox" name="fchanel" id="fchanel"
							data-options="editable:false">
							<option value="1">JOB号 1</option>
							<option value="2">JOB号 2</option>
							<option value="3">JOB号 3</option>
							<option value="4">JOB号 4</option>
							<option value="5">JOB号 5</option>
							<option value="6">JOB号 6</option>
							<option value="7">JOB号 7</option>
							<option value="8">JOB号 8</option>
							<option value="9">JOB号 9</option>
							<option value="10">JOB号 10</option>
							<option value="11">JOB号 11</option>
							<option value="12">JOB号 12</option>
							<option value="13">JOB号 13</option>
							<option value="14">JOB号 14</option>
							<option value="15">JOB号 15</option>
							<option value="16">JOB号 16</option>
							<option value="17">JOB号 17</option>
							<option value="18">JOB号 18</option>
							<option value="19">JOB号 19</option>
							<option value="20">JOB号 20</option>
							<option value="21">JOB号 21</option>
							<option value="22">JOB号 22</option>
							<option value="23">JOB号 23</option>
							<option value="24">JOB号 24</option>
							<option value="25">JOB号 25</option>
							<option value="26">JOB号 26</option>
							<option value="27">JOB号 27</option>
							<option value="28">JOB号 28</option>
							<option value="29">JOB号 29</option>
							<option value="30">JOB号 30</option>
							<option value="31">JOB号 31</option>
							<option value="32">JOB号 32</option>
							<option value="33">JOB号 33</option>
							<option value="34">JOB号 34</option>
							<option value="35">JOB号 35</option>
							<option value="36">JOB号 36</option>
							<option value="37">JOB号 37</option>
							<option value="38">JOB号 38</option>
							<option value="39">JOB号 39</option>
							<option value="40">JOB号 40</option>
							<option value="41">JOB号 41</option>
							<option value="42">JOB号 42</option>
							<option value="43">JOB号 43</option>
							<option value="44">JOB号 44</option>
							<option value="45">JOB号 45</option>
							<option value="46">JOB号 46</option>
							<option value="47">JOB号 47</option>
							<option value="48">JOB号 48</option>
							<option value="49">JOB号 49</option>
							<option value="50">JOB号 50</option>
						</select>
						<lable>
						<span class="required">*</span>焊接模式：</lable>
						<select class="easyui-combobox" name="fselect" id="fselect"
							data-options="editable:false" onChange="changeValue(current,old)">
							<option value="102">个别</option>
							<option value="101">一元</option>
							<option value="103">脉冲</option>
							<option value="104">双脉冲</option>
						</select>
					</div>
					<div class="fitem">
						<lable>
						<span class="required">*</span>Step：</lable>
						<select class="easyui-combobox" name="fselectstep"
							id="fselectstep" data-options="editable:false"
							onChange="changeValue(current,old)">
							<option value="105">点焊</option>
							<option value="106">2T</option>
							<option value="107">4T</option>
							<option value="108">4S</option>
						</select>
						<lable>
						<span class="required">*</span>焊丝材质：</lable>
						<select class="easyui-combobox" name="fmaterial" id="fmaterial"
							data-options="editable:false">
							<option value="250">SG2</option>
							<option value="251">CRNI</option>
							<option value="252">ALSI5</option>
							<option value="253">ALMG5</option>
							<option value="254">CUSI</option>
							<option value="255">FLUXBS</option>
							<option value="256">FLUXRU</option>
						</select>
					</div>
					<div class="fitem">
						<lable>
						<span class="required">*</span>焊丝直径：</lable>
						<select class="easyui-combobox" name="fdiameter" id="fdiameter"
							data-options="editable:false">
							<option value="135">Φ0.8</option>
							<option value="131">Φ1.0</option>
							<option value="132">Φ1.2</option>
							<option value="134">Φ1.6</option>
						</select>
						<lable>
						<span class="required">*</span>气体：</lable>
						<select class="easyui-combobox" name="fgas" id="fgas"
							data-options="editable:false">
							<option value="200">100%(CO₂)</option>
							<option value="201">82%-18%(Ar-CO₂)</option>
							<option value="202">92%-8%(Ar-CO₂)</option>
							<option value="203">91%-4%-5%(Ar-O₂-CO₂)</option>
							<option value="204">98%-2%(Ar-CO₂)</option>
							<option value="205">97%-3%(Ar-O₂)</option>
							<option value="206">100%(Ar)</option>
							<option value="207">70%-30%(Ar-He)</option>
							<option value="208">Standard 100%(Ar)</option>
							<option value="209">Special 100%(Ar)</option>
							<option value="210">Standard 82%-18%(Ar-CO₂)</option>
							<option value="211">Special 82%-18%(Ar-CO₂)</option>
							<option value="212">Standard 98%-2%(Ar-CO₂)</option>
							<option value="213">Special 98%-2%(Ar-CO₂)</option>
						</select>
					</div>
					<div class="fitem">
						<lable>
						<span class="required">*</span>给定电感：</lable>
						<input id="fcharacter" name="fcharacter" class="easyui-numberbox"
							data-options="required:true">
						<div id="rfrequency" style="float: left">
							<lable>
							<span class="required">*</span>双脉冲频率：</lable>
							<select class="easyui-combobox" name="frequency" id="frequency"
								data-options="editable:false">
								<option value="137">0.5HZ</option>
								<option value="138">1.0HZ</option>
								<option value="139">1.5HZ</option>
								<option value="140">2.0HZ</option>
								<option value="141">2.5HZ</option>
								<option value="142">3.0HZ</option>
								<option value="143">3.5HZ</option>
								<option value="144">4.0HZ</option>
							</select>
						</div>
					</div>
					<div class="fitem">
						<lable>
						<span class="required">*</span>提前送气时间：</lable>
						<input name="fadvance" id="fadvance" class="easyui-numberbox"
							data-options="required:true,precision:1">
						<div id="rftime" style="float: left">
							<lable>
							<span class="required">*</span>点焊时间：</lable>
							<input name="ftime" id="ftime" class="easyui-numberbox"
								data-options="required:true,precision:1">
						</div>
					</div>
					<div class="fitem">
						<div id="rfini_ele" style="float: left">
							<lable>
							<span class="required">*</span>初期电流：</lable>
							<input name="fini_ele" id="fini_ele" class="easyui-numberbox"
								data-options="required:true">
						</div>
						<div id="rfini_vol" style="float: left">
							<lable>
							<span class="required">*</span>初期电压：</lable>
							<input name="fini_vol" id="fini_vol" class="easyui-numberbox"
								data-options="required:true,precision:1">
						</div>
					</div>
					<div class="fitem">
						<div id="rfweld_ele" style="float: left">
							<lable>
							<span class="required">*</span>焊接电流：</lable>
							<input name="fweld_ele" id="fweld_ele" class="easyui-numberbox"
								data-options="required:true">
						</div>
						<div id="rfweld_vol" style="float: left">
							<lable>
							<span class="required">*</span>焊接电压：</lable>
							<input name="fweld_vol" id="fweld_vol" class="easyui-numberbox"
								data-options="required:true,precision:1">
						</div>
					</div>
					<div class="fitem">
						<div id="rfarc_ele" style="float: left">
							<lable>
							<span class="required">*</span>收弧电流：</lable>
							<input name="farc_ele" id="farc_ele" class="easyui-numberbox"
								data-options="required:true">
						</div>
						<div id="rfarc_vol" style="float: left">
							<lable>
							<span class="required">*</span>收弧电压：</lable>
							<input name="farc_vol" id="farc_vol" class="easyui-numberbox"
								data-options="required:true,precision:1">
						</div>
					</div>
					<div class="fitem">
						<div id="rfarc_speed" style="float: left">
							<lable>
							<span class="required"></span>初期给定速度：</lable>
							<input name="farc_speed" id="farc_speed" class="easyui-numberbox"
								data-options="required:true,precision:1">
						</div>
						<div id="rfspeed" style="float: left">
							<lable>
							<span class="required"></span>给定速度：</lable>
							<input name="fspeed" id="fspeed" class="easyui-numberbox"
								data-options="required:true,precision:1">
						</div>
					</div>
					<div class="fitem">
						<div id="rfarc_tuny_speed" style="float: left">
							<lable>
							<span class="required"></span>收弧给定速度：</lable>
							<input name="farc_tuny_speed" id="farc_tuny_speed"
								class="easyui-numberbox"
								data-options="required:true,precision:1">
						</div>
					</div>
					<div class="fitem">
						<div id="rfweld_tuny_ele" style="float: left">
							<lable>
							<span class="required"></span>焊接电流微调：</lable>
							<input name="fweld_tuny_ele" id="fweld_tuny_ele"
								class="easyui-numberbox" data-options="required:true">
						</div>
						<div id="rfweld_tuny_vol" style="float: left">
							<lable>
							<span class="required"></span>焊接电压微调：</lable>
							<input name="fweld_tuny_vol" id="fweld_tuny_vol"
								class="easyui-numberbox"
								data-options="required:true">
						</div>
					</div>
					<div class="fitem">
						<div id="rfarc_tuny_vol" style="float: left">
							<lable>
							<span class="required"></span>初期电压微调：</lable>
							<input name="fini_tuny_vol" id="fini_tuny_vol"
								class="easyui-numberbox"
								data-options="required:true">
						</div>
						<div id="rfini_tuny_vol" style="float: left">
							<lable>
							<span class="required"></span>收弧电压微调：</lable>
							<input name="farc_tuny_vol" id="farc_tuny_vol"
								class="easyui-numberbox"
								data-options="required:true">
						</div>
					</div>
					<div class="fitem">
					<div id="fwpsbackDiv" style="float: left">
						<lable><span class="required"></span>备注：</lable>
						<textarea name="fwpsback" id="fwpsback" style="height:60px;width:150px"></textarea>
					</div>
				</div>
				</form>
				<div id="rmmwdlg-buttons">
					<a href="javascript:removeMainwps();" class="easyui-linkbutton"
						iconCls="icon-ok">删除</a> <a href="javascript:closedlg();"
						class="easyui-linkbutton" iconCls="icon-cancel">取消</a>
				</div>

				<!-- 选择工艺 -->
				<div id="smwdlg" class="easyui-dialog"
					style="width: 600px; height: 400px; padding:10px 20px"
					closed="true" buttons="#smwdlg-buttons">
					<form id="smwfm" class="easyui-form" method="post"
						data-options="novalidate:true">
						<table id="mainWpsTable" style="table-layout: fixed; width:100%;"></table>
					</form>
				</div>
				<div id="smwdlg-buttons">
					<a href="javascript:selectMachineList(1);"
						class="easyui-linkbutton" iconCls="icon-ok">下一步</a> <a
						href="javascript:closedlg();" class="easyui-linkbutton"
						iconCls="icon-cancel">取消</a>
				</div>

				<!-- 选择焊机 -->
				<div id="smdlg" class="easyui-dialog"
					style="width: 600px; height: 450px; padding:10px 20px"
					closed="true" buttons="#smdlg-buttons">
					<label>组织机构</label>
					<select class="easyui-combobox" name="iId" id="iId" data-options="editable:false"></select>
					<form id="smfm" class="easyui-form" method="post"
						data-options="novalidate:true">
						<table id="weldingmachineTable"
							style="table-layout: fixed; width:100%;"></table>
					</form>
				</div>
				<div id="smdlg-buttons">
					<a href="javascript:selectModel();" class="easyui-linkbutton"
						iconCls="icon-ok">确认</a> <a href="javascript:closedlg();"
						class="easyui-linkbutton" iconCls="icon-cancel">取消</a>
				</div>

				<!-- 下发结果表格 -->
				<div id="resultdlg" class="easyui-dialog"
					style="width: 1120px; height: 600px; padding:10px 20px"
					closed="true" buttons="#resultdlg-buttons">
					<form id="resultfm" class="easyui-form" method="post"
						data-options="novalidate:true">
						<table id="giveResultTable"
							style="table-layout: fixed; width:100%;"></table>
					</form>
				</div>
				<div id="resultdlg-buttons">
				<a id="resultOk" href="javascript:closedlg();" class="easyui-linkbutton" iconCls="icon-ok">确认</a> 
				<a id="resultCancel" href="javascript:closedlg();" class="easyui-linkbutton" iconCls="icon-cancel">取消</a>
				</div>

				<!-- 控制命令下发 -->
				<div id="condlg" class="easyui-dialog"
					style="width: 600px; height: 300px; padding:10px 20px"
					closed="true" buttons="#condlg-buttons">
					<form id="confm" class="easyui-form" method="post"
						data-options="novalidate:true">
						<table width="100%" height="94%" border="1"
							style="text-align: center;">
							<tr height="30px">
								<td colspan="2" align="center"><font face="黑体" size="5">控制命令</font>
								</td>
							</tr>
							<tr height="30px">
								<td align="center" bgcolor="#FFFAF0">工作：</td>
								<td><input id="free" name="free" type="radio" value="1"
									checked="checked" />工作不可自由调节 <input id="free" name="free"
									type="radio" value="0" />工作自由调节</td>
							</tr>
							<tr height="30px">
								<td colspan="2" align="center"><a
									href="javascript:selectMachineList(3);"
									class="easyui-linkbutton" iconCls="icon-ok">下发控制命令</a> <a
									href="javascript:openPassDlg();" class="easyui-linkbutton"
									iconCls="icon-ok">密码下发</a></td>
							</tr>
						</table>
					</form>
				</div>
				<div id="condlg-buttons">
					<a href="javascript:closedlg();" class="easyui-linkbutton"
						iconCls="icon-ok">确认</a> <a href="javascript:closedlg();"
						class="easyui-linkbutton" iconCls="icon-cancel">取消</a>
				</div>

				<!-- 密码框 -->
				<div id="pwd" class="easyui-dialog"
					style="text-align:center;width:400px;height:200px" closed="true"
					buttons="#dlg-pwd" algin="center">
					<br>
					<br>
					<lable>
					<span class="required">*</span>密码：</lable>
					<input name="passwd" id="passwd" type="password"
						class="easyui-numberbox" data-options="required:true,min:1,max:999"><br />
					<lable style="color:red;">（注：密码范围是1~999）</lable>
				</div>
				<div id="dlg-pwd">
					<a href="javascript:selectMachineList(2);"
						class="easyui-linkbutton" iconCls="icon-ok">下一步</a> <a
						href="javascript:closedlg();" class="easyui-linkbutton"
						iconCls="icon-cancel">取消</a>
				</div>

				<!-- 下发历史查询 -->
				<div id="wmhistorydlg" class="easyui-dialog"
					style="width: 950px; height: 520px; padding:10px 20px"
					closed="true">
					<form id="wmhistoryfm" class="easyui-form" method="post"
						data-options="novalidate:true">
						<div id="dg_btn">
							<div style="margin-bottom: 5px;">
								焊机编号： <input class="easyui-numberbox" name="machineNum"
									id="machineNum"> 工艺库名称： <input class="easyui-textbox"
									name="theWpslibName" id="theWpslibName"> 时间： <input
									class="easyui-datetimebox" name="dtoTime1" id="dtoTime1">--
								<input class="easyui-datetimebox" name="dtoTime2" id="dtoTime2">
								<a href="javascript:searchHistory();" class="easyui-linkbutton"
									iconCls="icon-select">搜索</a>
							</div>
						</div>
						<table id="historyTable" style="table-layout: fixed; width:100%;"></table>
					</form>
				</div>
			</div>
</body>
</html>