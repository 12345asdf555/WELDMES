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
  		<div id="body">
  			<a style="font-size:20px;" href="javascript:parameter();">参数管理</a><span style="font-size:20px;">|</span><a style="font-size:20px;" href="javascript:control();">控制管理</a>
  			<form id="fm" class="easyui-form" method="post" data-options="novalidate:true">
	        	<div region="left">
	            	<table>
	            		<tr>
			  				<td class="leftTd"><lable>通道号：</lable></td>
			  				<td class="rightTd">
			  					<select class="easyui-combobox" name="fchanel" id="fchanel" data-options="editable:false">
				                </select>
				            </td>
			  				<td id="tcontroller" class="leftTd"><lable>熔深控制：</lable></td>
			  				<td id="rcontroller" class="rightTd"><input name="fcontroller" id="fcontroller" type="checkbox" value="1"/></td>
			  			</tr>
	            	</table>
	            </div>
	            <div>
	            	<table>
	            		<tr>
	            			<td id="dtorch" class="leftTd"><lable>水冷焊枪：</lable></td>
			  				<td id="itorch" class="rightTd"><input name="ftorch" id="ftorch" type="checkbox" value="0"></td>
			  				<td id="dfweldprocess" class="leftTd"><lable><span class="required">*</span>焊接过程：</lable></td>
			  				<td id="rfweldprocess" class="rightTd"><select class="easyui-combobox" name="fweldprocess" id="fweldprocess" data-options="editable:false"></select></td>
			  			</tr>
	            	</table>
	            </div>
	            <div >
	            	<table>
	            		<tr>
	            			<td id="dgas" class="leftTd"><lable><span class="required">*</span>气体：</lable></td>
			  				<td id="rgas" class="rightTd">
			  					<select class="easyui-combobox" name="fgas" id="fgas" data-options="editable:false">
				                	<option value="121">CO2</option>
								    <option value="122">MAG</option>
								    <option value="123">MIG</option>
				                </select>
				            </td>
			  				<td id="dmaterial" class="leftTd"><lable><span class="required">*</span>焊丝材质：</lable></td>
			  				<td id="rmaterial" class="rightTd">
			  					<select class="easyui-combobox" name="fmaterial" id="fmaterial" data-options="editable:false">
				                	<option value="91">低碳钢实心</option>
								    <option value="92">不锈钢实心</option>
								    <option value="93">低碳钢药芯</option>
								    <option value="94">不锈钢药芯</option>
				                </select>
				            </td>
			  			</tr>
	            	</table>
	            </div>
	            <div >
	            	<table>
	            		<tr>
	            			<td class="leftTd"><lable><span class="required">*</span>焊丝直径：</lable></td>
			  				<td class="rightTd">
			  					<select class="easyui-combobox" name="fdiameter" id="fdiameter" data-options="editable:false">
				                	<option value="131">Φ1.0</option>
				                	<option value="132">Φ1.2</option>
				                	<option value="133">Φ1.4</option>
				                	<option value="134">Φ1.6</option>
				                </select>
			  				</td>
			  				<td class="leftTd"><lable><span class="required">*</span>一元/个别：</lable></td>
			  				<td class="rightTd">
			  					<select class="easyui-combobox" name="fselect" id="fselect" data-options="editable:false" onChange="changeValue(current,old)">
				                    <option value="102">个别</option>
								    <option value="101">一元</option>
				                </select>
			  				</td>
			  			</tr>
	            	</table>
	            </div>
	            <div>
	            	<table>
	            		<tr>
							<td class="leftTd"><lable><span class="required">*</span>焊接电流：</lable></td>
			  				<td class="rightTd"><input name="fweld_ele" id="fweld_ele" class="easyui-numberbox" data-options="required:true" >(A)</td>
			  				<td id="cwwv" class="leftTd"><lable><span class="required">*</span>焊接电压：</lable></td>
			  				<td id="cwtwv" class="rightTd"><input name="fweld_vol" id="fweld_vol" class="easyui-numberbox" data-options="required:true,precision:1">(V)</td>
			  				<td id="cwwvo" class="leftTd"><lable><span class="required">*</span>焊接电压(一元)：</lable></td>
			  				<td id="cwtwvo" class="rightTd"><input name="fweld_vol1" id="fweld_vol1" class="easyui-numberbox" data-options="required:true">(±25)</td>
			  			</tr>
	            	</table>
	            </div>
	            <div>
	            	<table>
	            		<tr>
	            			<td class="leftTd"><lable><span class="required">*</span>焊接电流微调：</lable></td>
			  				<td class="rightTd"><input name="fweld_tuny_ele" id="fweld_tuny_ele" class="easyui-numberbox" data-options="required:true">(A)</td>
			  				<td id="cwwvt" class="leftTd"><lable><span class="required">*</span>焊接电压微调：</lable></td>
			  				<td id="cwtwvt" class="rightTd"><input name="fweld_tuny_vol" id="fweld_tuny_vol" class="easyui-numberbox" data-options="required:true,precision:1">(V)</td>
			  				<td id="cwwvto" class="leftTd"><lable><span class="required">*</span>焊接电压微调(一元)：</lable></td>
			  				<td id="cwtwvto" class="rightTd"><input name="fweld_tuny_vol1" id="fweld_tuny_vol1" class="easyui-numberbox" data-options="required:true">(%)</td>			  				
			  			</tr>
	            	</table>
	            </div>
	            <div >
	            	<table>
	            		<tr>
			  				<td class="leftTd"><lable><span class="required">*</span>提前送气：</lable></td>
			  				<td class="rightTd"> <input name="fadvance" id="fadvance" class="easyui-numberbox" data-options="required:true,precision:1">(s)</td>
				        	<td class="leftTd"><lable><span class="required">*</span>滞后送气：</lable></td>
		  					<td class="rightTd"><input name="fhysteresis" id="fhysteresis" class="easyui-numberbox" data-options="required:true,precision:1">(s)</td>
				        </tr>
	            	</table>
	            </div>
	            <div >
	            	<table>
			            <tr>
			            	<td id="tinitial" class="leftTd"><lable>初期条件：</lable></td>
			  				<td id="rinitial" class="rightTd"><input name="finitial" id="finitial" type="checkbox" value="1"/></td>
			  				<td class="leftTd"></td>
			  				<td class="rightTd"></td>
		  				</tr>
	            	</table>
	            </div>
	            <div >
	            	<table>
	            		<tr>
			  				<td class="leftTd"><lable><span class="required">*</span>初期电流：</lable></td>
			  				<td class="rightTd"><input name="fini_ele" id="fini_ele" class="easyui-numberbox" value="100.0" data-options="required:true">(A)</td>
			  				<td id="cwiv" class="leftTd"><lable><span class="required">*</span>初期电压：</lable></td>
			  				<td id="cwtiv" class="rightTd"><input name="fini_vol" id="fini_vol" class="easyui-numberbox" value="19.0" data-options="required:true,precision:1">(V)</td>
			  				<td id="cwivo" class="leftTd"><lable><span class="required">*</span>初期电压(一元)：</lable></td>
			  				<td id="cwtivo" class="rightTd"><input name="fini_vol1" id="fini_vol1" class="easyui-numberbox" value="0" data-options="required:true">(±25)</td>
			  			</tr>
	            	</table>
	            </div>
	            <div >
	            	<table>
	            		<tr>
	            			<td id="dfarc" class="leftTd"><lable><span class="required">*</span>收弧：</lable></td>
			  				<td id="rfarc" class="rightTd">
			  					<select class="easyui-combobox" name="farc" id="farc" data-options="editable:false">
				                	<option value="111">无</option>
								    <option value="112">有</option>
								    <option value="113">反复</option>
								    <option value="114">点焊</option>
				                </select>
			  				</td>
			  				<td id="dftime" class="leftTd"><lable><span class="required">*</span>点焊时间：</lable></td>
			  				<td id="rftime" class="rightTd"><input name="ftime" id="ftime" value="30.0" class="easyui-numberbox" data-options="required:true,precision:1">(s)</td>
			  			</tr>
	            	</table>
	            </div>
	            <div>
	            	<table>
	            		<tr>
			  				<td class="leftTd"><lable><span class="required">*</span>收弧电流：</lable></td>
			  				<td class="rightTd"><input name="farc_ele" id="farc_ele" class="easyui-numberbox" value="100.0" data-options="required:true">(A)</td>
			  				<td id="cwav" class="leftTd"><lable><span class="required">*</span>收弧电压：</lable></td>
			  				<td id="cwtav" class="rightTd"><input name="farc_vol" id="farc_vol" class="easyui-numberbox" value="19.0" data-options="required:true,precision:1">(V)</td>
			  				<td id="cwavo" class="leftTd"><lable><span class="required">*</span>收弧电压(一元)：</lable></td>
			  				<td id="cwtavo" class="rightTd"><input name="farc_vol1" id="farc_vol1" class="easyui-numberbox" value="0" data-options="required:true">(±25)</td>
			  			</tr>
	            	</table>
	            </div>
	            <div>
	            	<table>
	            		<tr>
	            			<td class="leftTd"><lable><span class="required">*</span>收弧电流微调：</lable></td>
			  				<td class="rightTd"><input name="farc_tuny_ele" id="farc_tuny_ele" class="easyui-numberbox" value="0.0" data-options="required:true">(A)</td>
							<td id="cwavt" class="leftTd"><lable><span class="required">*</span>收弧电压微调：</lable></td>
			  				<td id="cwtavt" class="rightTd"><input name="farc_tuny_vol" id="farc_tuny_vol" class="easyui-numberbox" value="0.0" data-options="required:true,precision:1">(V)</td>
			  				<td id="cwavto" class="leftTd"><lable><span class="required">*</span>收弧电压微调（一元）：</lable></td>
			  				<td id="cwtavto" class="rightTd"><input name="farc_tuny_vol1" id="farc_tuny_vol1" class="easyui-numberbox" value="0" data-options="required:true">(%)</td>
			  			</tr>
	            	</table>
	            </div>
	            <div >
	            	<table>
	            		<tr>
			  				<td class="leftTd"><lable><span class="required">*</span>电弧特性：</lable></td>
			  				<td class="rightTd"><input id="fcharacter" name="fcharacter" class="easyui-numberbox" data-options="required:true">(±10)</td>
			  				<td id="dfrequency" class="leftTd"><lable><span class="required">*</span>双脉冲频率：</lable></td>
			  				<td id="ifrequency" class="rightTd"><input name="frequency" id="frequency" class="easyui-numberbox" data-options="required:true,precision:1">(Hz)</td>
			  			</tr>
	            	</table>
	            </div>
	          <div algin="center">
	            	<table aligin="center">
	            		<tr>
			  				<td class="leftTd"></td>
			  				<td style="text-align: center;width: 350px;">
			  					<a href="javascript:WBPGET();" class="easyui-linkbutton" iconCls="icon-ok">索取规范</a>
			  					<a href="javascript:WBPSAVE(0);" class="easyui-linkbutton" iconCls="icon-ok">保存</a>
			  					<a href="javascript:wbpSendCheck();" class="easyui-linkbutton" iconCls="icon-ok">下发规范</a>
			  					<a href="javascript:WBPINIT(0);" class="easyui-linkbutton" iconCls="icon-ok">恢复默认值</a>
			  					<a href="javascript:openWbpCopyDialog(1);" class="easyui-linkbutton" iconCls="icon-ok">焊机参数复制</a>
			  					<a href="javascript:openWbpCopyDialog(0);" class="easyui-linkbutton" iconCls="icon-ok">单通道复制</a></td>
			  				<td class="rightTd"></td>
			  			</tr>
	            	</table>
				</div>
			</form>
			<form hidden="true" id="cfm" class="easyui-form" method="post" data-options="novalidate:true">
				<div region="left">
					<table width="50%" height="30%" border="1" style="text-align: center;">
					  <tr height="30px">
					    <td colspan="2" align="center">
					    	<font face="黑体" size="5">控制命令</font>
					    </td>
					  </tr>
					  <tr height="30px">
					    <td align="center" bgcolor="#FFFAF0" width="20%">工作：</td>
					    <td>
					    	<input id ="free" name="free" type="radio" value="1" checked="checked"/><label>工作不可自由调节</label><br>
			  				<input id ="free" name="free" type="radio" value="0"/><label>工作自由调节&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
			  			</td>
					  </tr>
					  <tr height="30px">
					    <td colspan="2" align="center">					
							<a href="javascript:controlfun();" class="easyui-linkbutton" iconCls="icon-ok">下发控制命令</a>
							<a href="javascript:openWbpCopyDialog(3);" class="easyui-linkbutton" iconCls="icon-ok">群发控制命令</a>
							<a href="javascript:openPassDlg();" class="easyui-linkbutton" iconCls="icon-ok">密码下发</a>			
						</td>
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
			<a href="javascript:saveWbpCopy();" class="easyui-linkbutton" iconCls="icon-ok">下一步</a>
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
	        <input name="passwd" id="passwd" class="easyui-numberbox" data-options="required:true,min:1,max:999"><br/>
	        <lable style="color:red;">（注：密码范围是1~999）</lable>
        </div>
        <div id="dlg-pwd">
			<a href="javascript:passfun();" class="easyui-linkbutton" iconCls="icon-ok">确定下发</a>
			<a href="javascript:$('#pwd').dialog('close');" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>
		</div>
</body>
</html>
 