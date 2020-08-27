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
							<td class="leftTd"><lable>JOB号：</lable></td>
							<td class="rightTd"><select class="easyui-combobox"
								name="fchanel" id="fchanel" data-options="editable:false">
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
							</select></td>
							<td></td>
							<td></td>
						</tr>
					</table>
				</div>
				<div>
					<table>
						<tr>
							<td id="rselect" class="leftTd"><lable> <span
									class="required">*</span>焊接模式：</lable></td>
							<td class="rightTd"><select class="easyui-combobox"
								name="fselect" id="fselect" data-options="editable:false"
								onChange="changeValue(current,old)">
									<option value="101">个别</option>
									<option value="102">一元</option>
									<option value="103">脉冲</option>
									<option value="104">双脉冲</option>
							</select></td>
							<td id="rselectstep" class="leftTd"><lable> <span
									class="required">*</span>Step：</lable></td>
							<td class="rightTd"><select class="easyui-combobox"
								name="fselectstep" id="fselectstep"
								data-options="editable:false"
								onChange="changeValue(current,old)">
									<option value="105">点焊</option>
									<option value="106">2T</option>
									<option value="107">4T</option>
									<option value="108">4S</option>
							</select></td>
						</tr>
					</table>
				</div>
				<div>
					<table>
						<tr>
							<td id="dmaterial" class="leftTd"><lable> <span
									class="required">*</span>焊丝材质：</lable></td>
							<td id="rmaterial" class="rightTd"><select
								class="easyui-combobox" name="fmaterial" id="fmaterial"
								data-options="editable:false">
									<option value="250">SG2</option>
									<option value="251">CRNI</option>
									<option value="252">ALSI5</option>
									<option value="253">ALMG5</option>
									<option value="254">CUSI</option>
									<option value="255">FLUXBS</option>
									<option value="256">FLUXRU</option>
							</select></td>
						</tr>
					</table>
				</div>
				<div>
					<table>
						<tr>
							<td class="leftTd"><lable> <span class="required">*</span>焊丝直径：</lable></td>
							<td class="rightTd">
							<select class="easyui-combobox" name="fdiameter" id="fdiameter" data-options="editable:false">
									<option value="135">Φ0.8</option>
									<option value="131">Φ1.0</option>
									<option value="132">Φ1.2</option>
									<option value="134">Φ1.6</option>
							</select></td>
							<td id="dgas" class="leftTd"><lable> <span class="required">*</span>气体：</lable></td>
							<td id="rgas" class="rightTd">
								<select class="easyui-combobox" name="fgas" id="fgas" style="width:180" data-options="editable:false">
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
							</select></td>
						</tr>
					</table>
				</div>
				<div>
					<table>
						<tr>
							<td class="leftTd"><lable> <span class="required">*</span>给定电感：</lable></td>
							<td class="rightTd"><input id="fcharacter" name="fcharacter"
								class="easyui-numberbox" data-options="required:true">(±50)</td>
							<td id="rfrequency" class="leftTd"><lable> <span
									class="required">*</span>双脉冲频率：</lable></td>
							<td id="tfrequency" class="rightTd"><select
								class="easyui-combobox" name="frequency" id="frequency"
								data-options="editable:false">
									<option value="137">0.5HZ</option>
									<option value="138">1.0HZ</option>
									<option value="139">1.5HZ</option>
									<option value="140">2.0HZ</option>
									<option value="141">2.5HZ</option>
									<option value="142">3.0HZ</option>
									<option value="143">3.5HZ</option>
									<option value="144">4.0HZ</option>
							</select></td>
						</tr>
					</table>
				</div>
				<div>
					<table>
						<tr>
							<td class="leftTd"><lable> <span class="required">*</span>提前送气时间：</lable></td>
							<td class="rightTd"><input name="fadvance" id="fadvance"
								class="easyui-numberbox"
								data-options="required:true,precision:1">(s)</td>
							<td id="rftime" class="leftTd"><lable> <span
									class="required">*</span>点焊时间：</lable></td>
							<td id="tftime" class="rightTd"><input name="ftime"
								id="ftime" class="easyui-numberbox" data-options="required:true,precision:1">(s)</td>
						</tr>
					</table>
				</div>
				<div>
					<table>
						<tr>
							<td id="rfini_ele" class="leftTd"><lable> <span class="required">*</span>初期电流：</lable></td>
							<td id="tfini_ele" class="rightTd"><input name="fini_ele" id="fini_ele"
								class="easyui-numberbox" data-options="required:true">(A)</td>
							<td id="rfweld_ele" class="leftTd"><lable> <span class="required">*</span>焊接电流：</lable></td>
							<td id="tfweld_ele" class="rightTd"><input name="fweld_ele" id="fweld_ele"
								class="easyui-numberbox" data-options="required:true">(A)</td>
						</tr>
						<tr>
							<td id="rfarc_ele" class="leftTd"><lable> <lable> <span
									class="required">*</span>收弧电流：</lable></td>
							<td id="tfarc_ele" class="rightTd"><input name="farc_ele" id="farc_ele"
								class="easyui-numberbox" data-options="required:true">(A)</td>
						</tr>
					</table>
				</div>
				<div>
					<table>
						<tr>
							<td id="rfini_vol" class="leftTd"><lable> <span class="required">*</span>初期电压：</lable></td>
							<td id="tfini_vol" class="rightTd"><input name="fini_vol" id="fini_vol"
								class="easyui-numberbox" data-options="required:true,precision:1">(V)</td>
							<td id="rfweld_vol" class="leftTd"><lable> <span class="required">*</span>焊接电压：</lable></td>
							<td id="tfweld_vol" class="rightTd"><input name="fweld_vol" id="fweld_vol"
								class="easyui-numberbox" data-options="required:true,precision:1">(V)</td>
						</tr>
						<tr>
							<td id="rfarc_vol" class="leftTd"><lable> <span class="required">*</span>收弧电压：</lable></td>
							<td id="tfarc_vol" class="rightTd"><input name="farc_vol" id="farc_vol"
								class="easyui-numberbox" data-options="required:true,precision:1">(V)</td>
						</tr>
					</table>
				</div>
				<div>
					<table>
						<tr>
							<td id="rfarc_speed" class="leftTd"><lable> <span name="darc_speed"
									id="dweld_speed" class="required">*</span>初期给定速度：</lable></td>
							<td id="tfarc_speed" class="rightTd"><input name="farc_speed" id="farc_speed"
								class="easyui-numberbox"  data-options="required:true,precision:1"></td>
							<td id="rfspeed" class="leftTd"><lable> <span name="dspeed"
									id="dweld_speed" class="required">*</span>给定速度：</lable></td>
							<td id="tfspeed" class="rightTd"><input name="fspeed" id="fspeed"
								class="easyui-numberbox"  data-options="required:true,precision:1"></td>
						</tr>
						<tr>
							<td id="rfarc_tuny_speed" class="leftTd"><lable> <span
									name="darc_tuny_speed" id="dweld_speed" class="required">*</span>收弧给定速度：</lable></td>
							<td id="tfarc_tuny_speed" class="rightTd"><input name="farc_tuny_speed"
								id="farc_tuny_speed" class="easyui-numberbox"
								 data-options="required:true,precision:1"></td>
						</tr>
					</table>
				</div>
				<div>
					<table>
						<tr>
							<td id="rfweld_tuny_ele" class="leftTd"><lable> <span class="required">*</span>焊接电流微调：</lable></td>
							<td id="tfweld_tuny_ele" class="rightTd"><input name="fweld_tuny_ele"
								id="fweld_tuny_ele" class="easyui-numberbox"
								data-options="required:true">(A)</td>
							<td id="rfweld_tuny_vol" class="leftTd"><lable> <span class="required">*</span>焊接电压微调：</lable></td>
							<td id="tfweld_tuny_vol" class="rightTd"><input name="fweld_tuny_vol"
								id="fweld_tuny_vol" class="easyui-numberbox"
								data-options="required:true,precision:1">(V)</td>
						</tr>
					</table>
				</div>
				<div>
					<table>
						<tr>
							<td id="rfini_tuny_vol" class="leftTd"><lable> <span class="required">*</span>初期电压微调：</lable></td>
							<td id="tfini_tuny_vol" class="rightTd"><input name="fini_tuny_vol"
								id="fini_tuny_vol" class="easyui-numberbox"
								data-options="required:true,precision:1">(A)</td>
							<td id="rfarc_tuny_vol" class="leftTd"><lable> <span class="required">*</span>收狐电压微调：</lable></td>
							<td id="tfarc_tuny_vol" class="rightTd"><input name="farc_tuny_vol"
								id="farc_tuny_vol" class="easyui-numberbox"
								data-options="required:true,precision:1">(V)</td>
						</tr>
					</table>
				</div>
				<div algin="center">
					<table aligin="center">
						<tr>
							<td class="leftTd"></td>
							<td style="text-align: center;width: 350px;">
				  				<a href="javascript:QinTronGET();" class="easyui-linkbutton" iconCls="icon-ok">索取规范</a>
			  					<a href="javascript:QinTronSAVE(0);" class="easyui-linkbutton" iconCls="icon-ok">保存</a>
			  					<a href="javascript:QinTronSendCheck();" class="easyui-linkbutton" iconCls="icon-ok">下发规范</a>
			  					<a href="javascript:QinTronINIT(0);" class="easyui-linkbutton" iconCls="icon-ok">恢复默认值</a>
			  					<a href="javascript:openQinTronCopyDialog(1);" class="easyui-linkbutton" iconCls="icon-ok">焊机参数复制</a>
			  					<a href="javascript:openQinTronCopyDialog(0);" class="easyui-linkbutton" iconCls="icon-ok">单通道复制</a></td>
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
							<a href="javascript:openQinTronCopyDialog(3);" class="easyui-linkbutton" iconCls="icon-ok">群发控制命令</a>
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
			<a href="javascript:saveQinTronCopy();" class="easyui-linkbutton" iconCls="icon-ok">下一步</a>
			<a href="javascript:$('#divro').dialog('close');" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>
		</div>
		
		<div id="divro1" class="easyui-dialog" style="width:600px;height:400px" closed="true" buttons="#dlg-ro1"algin="center">
	        <table id="ro1" style="table-layout:fixed;width:100%;" ></table>
        </div>
        <div id="dlg-ro1">
			<a href="javascript:$('#divro1').dialog('close');" class="easyui-linkbutton" iconCls="icon-ok">确定</a>
			<a href="javascript:$('#divro1').dialog('close');" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>
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
 