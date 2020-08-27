<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<html>
  <head>
	<link rel="stylesheet" type="text/css" href="resources/themes/icon.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/datagrid.css" />
	<link rel="stylesheet" type="text/css" href="resources/themes/default/easyui.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/base.css" />
	
	<script type="text/javascript" src="resources/js/jquery.min.js"></script>
	<script type="text/javascript" src="resources/js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="resources/js/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="resources/js/datagrid-filter.js"></script>
<!-- 	<script type="text/javascript" src="resources/js/specification/SPC.js"></script> -->
	<script type="text/javascript" src="resources/js/swfobject.js"></script>
	<script type="text/javascript" src="resources/js/web_socket.js"></script>
	<script type="text/javascript" src="resources/js/paho-mqtt.js"></script>
	<script type="text/javascript" src="resources/js/paho-mqtt-min.js"></script>
	<script type="text/javascript" src="resources/js/specification/MqttConnect.js"></script>
	<style type="text/css">
		table tr td{
			font-size:12px;
			height:30px;
		}
		.leftTd{
			text-align: right;
			width : 150px;
		}
		.rightTd{
			text-align: left;
			width: 200px;
		}
	</style>
  </head>
	<diV id="body">
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
						<td id="tmanual_weld" class="leftTd"><lable>焊接方式：</lable></td>
						<td id="rmanual_weld" class="rightTd"><select
							class="easyui-combobox" name="manual_weld" id="manual_weld"
							data-options="editable:false">
								<option value="1">手工焊</option>
								<option value="0">气保焊</option>
						</select></td>
					</tr>
				</table>
			</div>
			<div id="div--1">
				<table>
					<tr>
						<td id="dmanual" class="leftTd"><lable>
							手工焊电流：</lable></td>
						<td id="rmanual" class="rightTd"><input name="hand_ele"
							id="hand_ele" class="easyui-numberbox"
							data-options="required:true">(A)</td>
						<td id="dmanualarc" class="leftTd"><lable>
							热引弧电流：</lable></td>
						<td id="rmanualarc" class="rightTd"><input name="handarc_ele"
							id="handarc_ele" class="easyui-numberbox"
							data-options="required:true">(A)</td>
					</tr>
				</table>
			</div>
			<div id="div--2">
				<table>
					<tr>
						<td id="dmanualtime" class="leftTd"><lable>
							热引弧时间：</lable></td>
						<td id="rmanualtime" class="rightTd"><input
							name="handarc_time" id="handarc_time" value="30.0"
							class="easyui-numberbox" data-options="required:true,precision:1">(s)</td>
						<td id="dthrust_ele" class="leftTd"><lable>
							推力电流:</lable></td>
						<td id="rthrust_ele" class="rightTd"><input name="thrust_ele"
							id="thrust_ele" class="easyui-numberbox"
							data-options="required:true">(A)</td>
					</tr>
				</table>
			</div>
			<div id="div-1">
				<table>
					<tr>
						<td id="dfweldparameters" class="leftTd"><lable>
							焊接方法：</lable></td>
						<td id="rfweldparameters" class="rightTd"><select
							class="easyui-combobox" name="fweldparameters"
							id="fweldparameters" data-options="editable:false">
								<option value="0">普通碳钢实芯CO2 100%</option>
								<option value="1">普通碳钢实芯Ar 80% + CO2 20%</option>
								<option value="2">普通碳钢药芯CO2 100%</option>
								<option value="3">脉冲碳钢实芯Ar 90% + CO2 10%</option>
								<option value="4">脉冲不锈钢钢实芯Ar 98% + CO2 2%</option>
								<option value="5">脉冲铝镁实芯Ar 100% ER5356</option>
								<option value="6">脉冲铝硅实芯Ar 100% ER4043</option>
						</select></td>
						<td id="dpulse" class="leftTd"><lable>
							双脉冲：</lable></td>
						<td id="rpulse" class="rightTd"><input name="pulse" id="pulse"
							type="checkbox" value="1"></td>
					</tr>
				</table>
			</div>
			<div id="div-2">
				<table>
					<tr>
						<td class="leftTd"><lable>
							焊丝直径：</lable></td>
						<td class="rightTd"><select class="easyui-combobox"
							name="fdiameter" id="fdiameter" data-options="editable:false">
								<option value="131">Φ1.0</option>
								<option value="132">Φ1.2</option>
								<option value="133">Φ1.4</option>
								<option value="134">Φ1.6</option>
						</select></td>
						<td class="leftTd"><lable>
							一元/个别：</lable></td>
						<td class="rightTd"><select class="easyui-combobox"
							name="fselect" id="fselect" data-options="editable:false"
							onChange="changeValue(current,old)">
								<option value="102">个别</option>
								<option value="101">一元</option>
						</select></td>
					</tr>
				</table>
			</div>
			<div id="div-3">
				<table>
					<tr>
						<td id="dargon" class="leftTd"><lable>收弧：</lable></td>
						<td id="rargon" class="rightTd"><select
							class="easyui-combobox" name="fargon" id="fargon"
							data-options="editable:false">
								<option value="0">2T</option>
								<option value="1">2T+</option>
								<option value="10">4T</option>
								<option value="11">4T+</option>
						</select></td>
						<td></td>
						<td></td>
					</tr>
				</table>
			</div>
			<div id="div-4">
				<table>
					<tr>
						<td class="leftTd"><lable>
							焊接电流：</lable></td>
						<td class="rightTd"><input name="fweld_ele" id="fweld_ele"
							class="easyui-numberbox" data-options="required:true">(A)</td>
						<td id="wv" class="leftTd"><lable>
							焊接电压：</lable></td>
						<td id="twv" class="rightTd"><input name="fweld_vol" id="fweld_vol"
							class="easyui-numberbox" data-options="required:true,precision:1">(V)</td>
						<td id="wvo" class="leftTd"><lable>
							焊接电压(一元)：</lable></td>
						<td id="twvo" class="rightTd"><input name="fweld_vol1" id="fweld_vol1"
							class="easyui-numberbox" data-options="required:true">(±25)</td>
					</tr>
				</table>
			</div>
			<div id="div-5">
				<table>
					<tr>
						<td class="leftTd"><lable>
							前气时间：</lable></td>
						<td class="rightTd"><input name="fadvance" id="fadvance"
							class="easyui-numberbox" data-options="required:true,precision:1">(s)</td>
						<td class="leftTd"><lable>
							延气时间：</lable></td>
						<td class="rightTd"><input name="fhysteresis" id="fhysteresis"
							class="easyui-numberbox" data-options="required:true,precision:1">(s)</td>
					</tr>
				</table>
			</div>
			<div id="div-6">
				<table>
					<tr>
						<td class="leftTd"><lable>
							起始电流：</lable></td>
						<td class="rightTd"><input name="fini_ele" id="fini_ele"
							class="easyui-numberbox" value="100.0"
							data-options="required:true">(A)</td>
						<td id="iv" class="leftTd"><lable>
							起始电压：</lable></td>
						<td id="tiv" class="rightTd"><input name="fini_vol" id="fini_vol"
							class="easyui-numberbox" value="19.0"
							data-options="required:true,precision:1">(V)</td>
						<td id="ivo" class="leftTd"><lable>
							起始电压(一元)：</lable></td>
						<td id="tivo" class="rightTd"><input name="fini_vol1" id="fini_vol1"
							class="easyui-numberbox" value="0" data-options="required:true">(±25)</td>
					</tr>
				</table>
			</div>
			<div id="div-7">
				<table>
					<tr>
						<td class="leftTd"><lable>
							起始时间：</lable></td>
						<td class="rightTd"><input name="firsttime" id="firsttime"
							class="easyui-numberbox" value="1"
							data-options="required:true,precision:1">(s)</td>
						<td id="drise" class="leftTd"><lable>
							缓升时间:</lable></td>
						<td id="rrise" class="rightTd"><input name="rise_time"
							id="rise_time" value="1" class="easyui-numberbox"
							data-options="required:true,precision:1">(s)</td>
					</tr>
				</table>
			</div>
			<div id="div-8">
				<table>
					<tr>
						<td class="leftTd"><lable>
							<lable>
							收弧电流：</lable></td>
						<td class="rightTd"><input name="farc_ele" id="farc_ele"
							class="easyui-numberbox" value="100.0"
							data-options="required:true">(A)</td>
						<td id="av" class="leftTd"><lable>
							收弧电压：</lable></td>
						<td id="tav" class="rightTd"><input name="farc_vol" id="farc_vol"
							class="easyui-numberbox" value="19.0"
							data-options="required:true,precision:1">(V)</td>
						<td id="avo" class="leftTd"><lable>
							收弧电压(一元)：</lable></td>
						<td id="tavo" class="rightTd"><input name="farc_vol1" id="farc_vol1"
							class="easyui-numberbox" value="0" data-options="required:true">(±25)</td>
					</tr>
				</table>
			</div>
			<div id="div-9">
				<table>
					<tr>
						<td class="leftTd"><lable>
							收弧时间：</lable></td>
						<td class="rightTd"><input name="farc_time" id="farc_time"
							class="easyui-numberbox" data-options="required:true,precision:1">(s)</td>
						<td id="ddecline" class="leftTd"><lable>
							缓降时间:</lable></td>
						<td id="rdecline" class="rightTd"><input name="decline_time"
							id="decline_time" value="1" class="easyui-numberbox"
							data-options="required:true,precision:1">(s)</td>
					</tr>
				</table>
			</div>
			<div id="div-10">
				<table>
					<tr>
						<td id="dfrequency" class="leftTd"><lable>
							双脉冲频率：</lable></td>
						<td id="ifrequency" class="rightTd"><input name="frequency"
							id="frequency" class="easyui-numberbox"
							data-options="required:true,precision:1">(Hz)</td>
						<td id="dpulse_ratio" class="leftTd"><lable>
							双脉冲占空比:</lable></td>
						<td id="rpulse_ratio" class="rightTd"><input
							name="pulse_ratio" id="pulse_ratio" class="easyui-numberbox"
							data-options="required:true">(%)</td>
					</tr>
				</table>
			</div>
			<div id="div-11">
				<table>
					<tr>
						<td id="dbaseele" class="leftTd"><lable>
							基值电流：</lable></td>
						<td id="rbaseele" class="rightTd"><input name="Base_ele"
							id="Base_ele" class="easyui-numberbox"
							data-options="required:true">(A)</td>
						<td id="dbasevol" class="leftTd"><lable>
							基值电压：</lable></td>
						<td id="rbasevol" class="rightTd"><input name="Base_vol"
							id="Base_vol" class="easyui-numberbox"
							data-options="required:true,precision:1">(V)</td>
						<td id="dbasevol1" class="leftTd"><lable>
							基值电压(一元)：</lable></td>
						<td id="rbasevol1" class="rightTd"><input name="Base_vol1"
							id="Base_vol1" class="easyui-numberbox"
							data-options="required:true">(±25)</td>
					</tr>
				</table>
			</div>
			<div id="div-12">
				<table>
					<tr>
						<td class="leftTd"><lable>
							电弧特性：</lable></td>
						<td class="rightTd"><input id="fcharacter" name="fcharacter"
							class="easyui-numberbox" data-options="required:true">(±10)</td>
						<td id="drush" class="leftTd"><lable>
							回烧修正：</lable></td>
						<td id="irush" class="rightTd"><input name="Rush" id="Rush"
							class="easyui-numberbox" data-options="required:true">(±10)</td>
					</tr>
				</table>
			</div>
			<div id="div-13">
				<div>
					<table>
						<tr>
							<td id="tarc_length" class="leftTd"><lable>弧长控制：</lable></td>
							<td id="rarc_length" class="rightTd"><input name="arc_length"
								id="arc_length" type="checkbox" value="1" /></td>
							<td class="leftTd"><lable>
								点动送丝速度：</lable></td>
							<td class="rightTd"><input name="point_speed"
								id="point_speed" class="easyui-numberbox"
								data-options="required:true,precision:1">m/min</td>
						</tr>
					</table>
				</div>
			</div>
			<div algin="center">
				<table aligin="center">
					<tr>
						<td class="leftTd"></td>
						<td style="text-align: center;width: 350px;"><a
							href="javascript:SPCGET();" class="easyui-linkbutton"
							iconCls="icon-ok">索取规范</a> <a href="javascript:SPCSAVE(0);"
							class="easyui-linkbutton" iconCls="icon-ok">保存</a> <a
							href="javascript:spcSendCheck();" class="easyui-linkbutton"
							iconCls="icon-ok">下发规范</a> <a href="javascript:SPCINIT(0);"
							class="easyui-linkbutton" iconCls="icon-ok">恢复默认值</a> <a
							href="javascript:openSpcCopyDialog(1);" class="easyui-linkbutton"
							iconCls="icon-ok">焊机参数复制</a> <a href="javascript:openSpcCopyDialog(0);"
							class="easyui-linkbutton" iconCls="icon-ok">单通道复制</a></td>
						<td class="rightTd"></td>
					</tr>
				</table>
			</div>
		</form>
		<form hidden="true" id="cfm" class="easyui-form" method="post"
			data-options="novalidate:true">
			<div region="left">
				<table width="80%" height="30%" border="1"
					style="text-align: center;">
					<tr height="30px">
						<td colspan="2" align="center"><font face="黑体" size="5">控制命令</font>
						</td>
					</tr>
					<tr height="30px">
					    <td align="center" bgcolor="#FFFAF0" width="10%">工作：</td>
					    <td width="50%">
					    	<input id ="free" name="free" type="radio" value="1" checked="checked"/><label>工作不可自由调节</label><br>
			  				<input id ="free" name="free" type="radio" value="0"/><label>工作自由调节&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
			  			</td>
						<td id="dchanel" class="leftTd"><lable>通道号：</lable></td>
						<td id="rchanel" class="rightTd"><select
							class="easyui-combobox" name="newchanel" id="newchanel"
							data-options="editable:false">
						</select></td>
					</tr>
					<tr height="30px">
						<td colspan="2" align="center">
						<a href="javascript:controlfun();" class="easyui-linkbutton"iconCls="icon-ok">下发控制命令</a>
						<a href="javascript:openSpcCopyDialog(3);" class="easyui-linkbutton" iconCls="icon-ok">群发控制命令</a>
						 <a href="javascript:openPassDlg();"class="easyui-linkbutton" iconCls="icon-ok">密码下发</a></td>
					</tr>
				</table>
			</div>
		</form>
	</div>
	    <div id="divro" class="easyui-dialog" style="width:500px;height:490px" closed="true" buttons="#dlg-ro"algin="center">
	    	<div style="text-align:center;height:25px">
	    		<lable id="mu"></lable>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	    		所属班组：<input class="easyui-textbox" name="item" id="item" data-options="editable:false" onChange="changeValue(current,old)">
	    	</div>
	    	<div id="tab" style="text-align:center;height:385px;width:485px">
	    		<table id="ro" style="table-layout:fixed;width:100%;" ></table>
	    	</div>
        </div>
        <div id="dlg-ro">
			<a href="javascript:saveSpcCopy();" class="easyui-linkbutton" iconCls="icon-ok">下一步</a>
			<a href="javascript:$('#divro').dialog('close');" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>
		</div>
		
		<div id="divro1" class="easyui-dialog" style="width:600px;height:400px" closed="true" buttons="#dlg-ro1"algin="center">
	        <table id="ro1" style="table-layout:fixed;width:100%;" ></table>
        </div>
        <div id="dlg-ro1">
			<a href="javascript:$('#divro1').dialog('close');" class="easyui-linkbutton" iconCls="icon-ok">确定</a>
			<a href="javascript:$('#divro1').dialog('close');" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>
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
		
		
		<div id="pwd" class="easyui-dialog" style="text-align:center;width:400px;height:200px" closed="true" buttons="#dlg-pwd"algin="center">
	        <br><br><lable><span class="required">*</span>密码：</lable>
	        <input name="passwd" id="passwd" class="easyui-numberbox" data-options="required:true,min:1,max:9999"><br/>
	        <lable style="color:red;">（注：密码范围是1~9999）</lable>
        </div>
        <div id="dlg-pwd">
			<a href="javascript:passfun();" class="easyui-linkbutton" iconCls="icon-ok">确定下发</a>
			<a href="javascript:$('#pwd').dialog('close');" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>
		</div>
</body>
</html>
 