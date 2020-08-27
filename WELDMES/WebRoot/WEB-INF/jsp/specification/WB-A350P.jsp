<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<html>
<head>
<link rel="stylesheet" type="text/css" href="resources/themes/icon.css" />
<link rel="stylesheet" type="text/css" href="resources/css/datagrid.css" />
<link rel="stylesheet" type="text/css"
	href="resources/themes/default/easyui.css" />
<link rel="stylesheet" type="text/css" href="resources/css/base.css" />

<script type="text/javascript" src="resources/js/jquery.min.js"></script>
<script type="text/javascript" src="resources/js/jquery.easyui.min.js"></script>
<script type="text/javascript" src="resources/js/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="resources/js/datagrid-filter.js"></script>
<script type="text/javascript" src="resources/js/swfobject.js"></script>
<script type="text/javascript" src="resources/js/web_socket.js"></script>
	<script type="text/javascript" src="resources/js/paho-mqtt.js"></script>
	<script type="text/javascript" src="resources/js/paho-mqtt-min.js"></script>
	<script type="text/javascript" src="resources/js/specification/MqttConnect.js"></script>

<style type="text/css">
table tr td {
	font-size: 12px;
	height: 30px;
}

.leftTd {
	text-align: right;
	width: 150px;
}

.rightTd {
	text-align: left;
	width: 200px;
}
</style>
</head>
<div id="body">
	<a style="font-size:20px;" href="javascript:parameter();">参数管理</a><span
		style="font-size:20px;">|</span><a style="font-size:20px;"
		href="javascript:control();">控制管理</a>
	<form id="fm" class="easyui-form" method="post"
		data-options="novalidate:true">
		<div region="left">
			<table>
				<tr>
					<td class="leftTd"><lable>通道号：</lable></td>
					<td class="rightTd"><select class="easyui-combobox"
						name="fchanel" id="fchanel" data-options="editable:false">
					</select></td>

				</tr>
			</table>
		</div>

		<div>
			<table>
				<tr>
					<td class="leftTd"><lable>收弧：</lable></td>
					<td class="rightTd"><select class="easyui-combobox"
						name="farc" id="farc" data-options="editable:false"
						onChange="changeValue(current,old)">
							<option value="111">无</option>
							<option value="112">有</option>
							<option value="113">收弧反复</option>
							<option value="114">点焊</option>
					</select></td>
					<td class="leftTd" id="rtime"><lable> <span
							class="required">*</span>点焊时间：</lable></td>
					<td class="rightTd" id="ltime"><input name="ftime" id="ftime"
						value="3.0" class="easyui-numberbox"
						data-options="required:true,precision:1">(s)</td>

				</tr>

				<tr>
					<td id="tcontroller" class="leftTd"><lable>特殊收弧时序(F45)：</lable></td>
					<td id="rcontroller" class="rightTd"><input name="fsarc"
						id="fsarc" type="checkbox" value="1" /></td>
					<td class="leftTd"><lable> <span class="required">*</span>反复时的结束方法(F3)：</lable></td>
					<td class="rightTd"><select class="easyui-combobox"
						name="frepeat_end" id="frepeat_end" data-options="editable:false"
						onChange="changeValue(current,old)">
							<option value="0">OFF</option>
							<option value="1">ON</option>
					</select></td>
					<td Hidden="hide" id="tcontroller" class="leftTd"><lable>特殊收弧反复：</lable></td>
					<td Hidden="hide" id="rcontroller" class="rightTd"><input
						name="fsarc_repeat" id="fsarc_repeat" type="checkbox" value="1" /></td>
				</tr>

				<tr>
					<td id="ftime_ini" class="leftTd"><lable> <span
							class="required">*</span>特殊收弧时序初期时间(F46)：</lable></td>
					<td id="ttime_ini" class="rightTd"><input
						name="fsarc_init_time" id="fsarc_init_time"
						class="easyui-numberbox" value="0"
						data-options="required:true,precision:1">(s)</td>
					<td id="ftime_arc" class="leftTd"><lable> <span
							class="required">*</span>特殊收弧时序收弧时间(F47)：</lable></td>
					<td id="ttime_arc" class="rightTd"><input
						name="fsarc_arc_time" id="fsarc_arc_time" class="easyui-numberbox"
						value="0" data-options="required:true,precision:1">(s)</td>
				</tr>

				<tr>
					<td id="tcontroller" class="leftTd"><lable>调整电流：</lable></td>
					<td id="rcontroller" class="rightTd"><input name="fcondition"
						id="fcondition" type="checkbox" value="1" /></td>
				</tr>

				<tr>
					<td class="leftTd"><lable> <span class="required">*</span>单击操作的电流增减量(F11)：</lable></td>
					<td class="rightTd"><input name="click_ele" id="click_ele"
						class="easyui-numberbox" value="0" data-options="required:true">(A)</td>
					<td class="leftTd"><lable> <span class="required">*</span>双击操作的电流增减量(F12)：</lable></td>
					<td class="rightTd"><input name="double_click_ele"
						id="double_click_ele" class="easyui-numberbox" value="0"
						data-options="required:true">(A)</td>
				</tr>

			</table>
		</div>

		<div>
			<table>
				<tr>
					<td id="tcontroller" class="leftTd"><lable>缓升缓降：</lable></td>
					<td id="rcontroller" class="rightTd"><input name="fcontroller"
						id="fcontroller" type="checkbox" value="1" /></td>
				</tr>
				<tr>
					<td class="leftTd" id="lrise_time"><lable> <span
							class="required">*</span>缓升时间：</lable></td>
					<td class="rightTd" id="rrise_time"><input name="rise_time"
						id="rise_time" value="1.0" class="easyui-numberbox"
						data-options="required:true,precision:1">(s)</td>
					<td class="leftTd" id="ldecline_time"><lable> <span
							class="required">*</span>缓降时间：</lable></td>
					<td class="rightTd" id="rdecline_time"><input
						name="decline_time" id="decline_time" value="1.0"
						class="easyui-numberbox" data-options="required:true,precision:1">(s)</td>
				</tr>

				<tr>
					<td id="tinitial" class="leftTd"><lable>初期电流选择：</lable></td>
					<td id="rinitial" class="rightTd"><input name="finitial"
						id="finitial" type="checkbox" value="1" /></td>
				</tr>

				<tr>
					<td class="leftTd"><lable> <span class="required">*</span>初期电流：</lable></td>
					<td class="rightTd"><input name="fini_ele" id="fini_ele"
						value="150.0" class="easyui-numberbox"
						data-options="required:true,precision:1">(A)</td>
					<td class="leftTd"><lable> <span class="required">*</span>焊接电流：</lable></td>
					<td class="rightTd"><input name="fweld_ele" id="fweld_ele"
						value="150.0" class="easyui-numberbox"
						data-options="required:true,precision:1">(A)</td>
				</tr>
			</table>
		</div>

		<div>
			<table>
				<tr>
					<td class="leftTd"><lable> <span class="required">*</span>收弧电流：</lable></td>
					<td class="rightTd"><input name="farc_ele" id="farc_ele"
						value="150.0" class="easyui-numberbox"
						data-options="required:true,precision:1">(A)</td>
				</tr>

				<tr>
					<td class="leftTd"><lable> <span class="required">*</span>焊接方法：</lable></td>
					<td class="rightTd"><select class="easyui-combobox"
						name="weld_method" id="weld_method" data-options="editable:false"
						onChange="changeValue(current,old)">
							<option value="0">直流TIG</option>
							<option value="1">交流TIG</option>
							<option value="3">AC-DC TIG</option>
					</select></td>
					<td id="tcontroller" class="leftTd"><lable>脉冲控制：</lable></td>
					<td id="rcontroller" class="rightTd"><input name="pulse_ctrl"
						id="pulse_ctrl" type="checkbox" value="1" /></td>
				</tr>

				<tr>
					<td class="leftTd"><lable> <span class="required">*</span>AC比率(F14)：</lable></td>
					<td class="rightTd"><input name="ac_rate" id="ac_rate"
						value="70.0" class="easyui-numberbox"
						data-options="required:true,precision:1">(%)</td>
					<td class="leftTd"><lable> <span class="required">*</span>脉冲宽度(F7)：</lable></td>
					<td class="rightTd"><input name="pulse_width" id="pulse_width"
						value="50.0" class="easyui-numberbox"
						data-options="required:true,precision:1">(%)</td>

				</tr>
			</table>
		</div>

		<div>
			<table>
				<tr>

					<td class="leftTd"><lable> <span class="required">*</span>AC频率：</lable></td>
					<td class="rightTd"><input name="acfreq" id="acfreq"
						value="70.0" class="easyui-numberbox"
						data-options="required:true,precision:1">(Hz)</td>
					<td class="leftTd"><lable> <span class="required">*</span>脉冲频率：</lable></td>
					<td class="rightTd"><input name="pulsefreq" id="pulsefreq"
						value="2.0" class="easyui-numberbox"
						data-options="required:true,precision:1">(Hz)</td>
				</tr>
				<tr>
					<td class="leftTd"><lable> <span class="required">*</span>AC-DC切换频率：</lable></td>
					<td class="rightTd"><input name="ac_dcfreq" id="ac_dcfreq"
						value="1.0" class="easyui-numberbox"
						data-options="required:true,precision:1">(Hz)</td>
					<td class="leftTd"><lable> <span class="required">*</span>脉冲电流：</lable></td>
					<td class="rightTd"><input name="fpulse_ele" id="fpulse_ele"
						value="150.0" class="easyui-numberbox"
						data-options="required:true,precision:1">(A)</td>
				</tr>
			</table>
		</div>
		<div>
			<table>
				<tr>
					<td class="leftTd"><lable> <span class="required">*</span>AC波形：</lable></td>
					<td class="rightTd"><select class="easyui-combobox"
						name="ac_form" id="ac_form" data-options="editable:false"
						onChange="changeValue(current,old)">
							<option value="0">标准</option>
							<option value="1">软</option>
							<option value="2">硬性</option>
					</select></td>
					<td class="leftTd"><lable> <span class="required">*</span>脉冲电流微调：</lable></td>
					<td class="rightTd"><input name="fpulse_tuny_ele"
						id="fpulse_tuny_ele" class="easyui-numberbox" value="0"
						data-options="required:true">(A)</td>
				</tr>
			</table>
		</div>

		<div>
			<table>

				<tr>
					<td class="leftTd"><lable> <span class="required">*</span>清洁宽度：</lable></td>
					<td class="rightTd"><input name="clear_width" id="clear_width"
						value="0" class="easyui-numberbox" data-options="required:true"></td>
				</tr>
				<tr>

					<td id="tcontroller" class="leftTd"><lable>接触起弧：</lable></td>
					<td id="rcontroller" class="rightTd"><input name="contact_arc"
						id="contact_arc" type="checkbox" value="1" /></td>
					<td id="tcontroller" class="leftTd"><lable>水冷焊枪：</lable></td>
					<td id="rcontroller" class="rightTd"><input name="weld_gun"
						id="weld_gun" type="checkbox" value="1" /></td>
				</tr>
			</table>
		</div>
		<div>
			<table>
				<tr>
					<td class="leftTd"><lable> <span class="required">*</span>提前送气：</lable></td>
					<td class="rightTd"><input name="fadvance" id="fadvance"
						value="0.3" class="easyui-numberbox"
						data-options="required:true,precision:1">(s)</td>
					<td class="leftTd"><lable> <span class="required">*</span>滞后送气：</lable></td>
					<td class="rightTd"><input name="fhysteresis" id="fhysteresis"
						value="7.0" class="easyui-numberbox"
						data-options="required:true,precision:1">(s)</td>
				</tr>
				<tr>
					<td class="leftTd"><lable> <span class="required">*</span>焊接电流微调：</lable></td>
					<td class="rightTd"><input name="fweld_tuny_ele"
						id="fweld_tuny_ele" class="easyui-numberbox" value="0"
						data-options="required:true">(A)</td>
					<td class="leftTd"><lable> <span class="required">*</span>收弧电流微调：</lable></td>
					<td class="rightTd"><input name="farc_tuny_ele"
						id="farc_tuny_ele" class="easyui-numberbox" value="0"
						data-options="required:true">(A)</td>
				</tr>
			</table>
		</div>

		<div id="xinzeng">
			<table>
				<tr>

					<td Hidden="hide" class="leftTd"><lable> <span
							class="required">*</span>特殊收弧时序：</lable></td>
					<td Hidden="hide" class="rightTd"><select
						class="easyui-combobox" name="fsarc_time" id="fsarc_time"
						data-options="editable:false" onChange="changeValue(current,old)">
							<option value="0">有效</option>
							<option value="1">无效</option>
					</select></td>
				</tr>


			</table>
		</div>

		<div aligin="center">
			<table aligin="center">
				<tr>
					<td class="leftTd"></td>
					<td style="text-align: center;width: 350px;"><a
						href="javascript:WBAPGET();" class="easyui-linkbutton"
						iconCls="icon-ok">索取规范</a> <a href="javascript:WBAPSAVE(0);"
						class="easyui-linkbutton" iconCls="icon-ok">保存</a> <a
						href="javascript:wbapSendCheck();" class="easyui-linkbutton"
						iconCls="icon-ok">下发规范</a> <a href="javascript:WBAPINIT(0);"
						class="easyui-linkbutton" iconCls="icon-ok">恢复默认值</a> <a
						href="javascript:openWbapCopyDialog(1);" class="easyui-linkbutton"
						iconCls="icon-ok">焊机参数复制</a> <a
						href="javascript:openWbapCopyDialog(0);" class="easyui-linkbutton"
						iconCls="icon-ok">单通道复制</a></td>
					</td>
					<td class="rightTd"></td>
				</tr>
			</table>
		</div>
	</form>
	<form hidden="true" id="cfm" class="easyui-form" method="post"
		data-options="novalidate:true">
		<div region="left">
			<table width="50%" height="30%" border="1"
				style="text-align: center;">
				<tr height="30px">
					<td colspan="2" align="center"><font face="黑体" size="5">控制命令</font>
					</td>
				</tr>
				<tr height="30px">
					<td align="center" bgcolor="#FFFAF0" width="20%">工作：</td>
					<td><input id="free" name="free" type="radio" value="1"
						checked="checked" /><label>工作不可自由调节</label><br> <input
						id="free" name="free" type="radio" value="0" /><label>工作自由调节&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
					</td>
				</tr>
				<tr height="30px">
					<td colspan="2" align="center">
					<a href="javascript:controlfun();" class="easyui-linkbutton" iconCls="icon-ok">下发控制命令</a> 
					<a href="javascript:openWbapCopyDialog(3);" class="easyui-linkbutton" iconCls="icon-ok">群发控制命令</a>
					<a href="javascript:openPassDlg();"class="easyui-linkbutton" iconCls="icon-ok">密码下发</a></td>
				</tr>
			</table>
		</div>
	</form>
</div>
<div id="divro" class="easyui-dialog" style="width:500px;height:490px"
	closed="true" buttons="#dlg-ro" algin="center">
	<div style="text-align:center;height:25px">
		<lable id="mu"></lable>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
		所属班组：<input class="easyui-textbox" name="item" id="item" data-options="editable:false" onChange="changeValue(current,old)">
	</div>
	<div id="tab" style="text-align:center;height:385px;width:485px">
		<table id="ro" style="table-layout:fixed;width:100%;"></table>
	</div>
</div>
<div id="dlg-ro">
	<a href="javascript:saveWbapCopy();" class="easyui-linkbutton"
		iconCls="icon-ok">下一步</a> <a
		href="javascript:$('#divro').dialog('close');"
		class="easyui-linkbutton" iconCls="icon-cancel">取消</a>
</div>

<div id="divro1" class="easyui-dialog" style="width:600px;height:400px"
	closed="true" buttons="#dlg-ro1" algin="center">
	<table id="ro1" style="table-layout:fixed;width:100%;"></table>
</div>
<div id="dlg-ro1">
	<a href="javascript:$('#divro1').dialog('close');"
		class="easyui-linkbutton" iconCls="icon-ok">确定</a> <a
		href="javascript:$('#divro1').dialog('close');"
		class="easyui-linkbutton" iconCls="icon-cancel">取消</a>
</div>

 <div id="divrox" class="easyui-dialog" style="width:500px;height:490px" closed="true" buttons="#dlg-rox"algin="center">
	    	<div style="text-align:center;height:25px">
	    		<lable id="mux"></lable>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	    		所属班组：<input class="easyui-textbox" name="itemx" id="itemx" data-options="editable:false" >
	    	</div>
	    	<div id="tabx" style="text-align:center;height:385px;width:485px">
	    		<table id="rox" style="table-layout:fixed;width:100%;" ></table>
	    	</div>
        </div>
        <div id="dlg-rox">
			<a href="javascript:saveCpvewCopy();" class="easyui-linkbutton" iconCls="icon-ok">下一步</a>
			<a href="javascript:$('#divrox').dialog('close');" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>
		</div>

<div id="pwd" class="easyui-dialog" style="text-align:center;width:400px;height:200px" closed="true" buttons="#dlg-pwd" algin="center"> <br> <br>
	<lable> <span class="required">*</span>密码：</lable>
	<input name="passwd" id="passwd" class="easyui-numberbox"     
		data-options="required:true,min:1,max:9999"><br />
	<lable style="color:red;">（注：密码范围是1~9999）</lable>
</div>

<div id="dlg-pwd"> 
	<a href="javascript:passfun();" class="easyui-linkbutton"  
		iconCls="icon-ok">确定下发</a> <a
		href="javascript:$('#pwd').dialog('close');" class="easyui-linkbutton"
		iconCls="icon-cancel">取消</a>
</div>