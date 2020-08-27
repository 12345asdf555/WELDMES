<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!-- <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"> -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>系统参数</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="resources/themes/icon.css" />
	<link rel="stylesheet" type="text/css" href="resources/themes/default/easyui.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/base.css" />
	<script type="text/javascript" src="resources/js/jquery.min.js"></script>
	<script type="text/javascript" src="resources/js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="resources/js/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="resources/js/system/para.js"></script>
<style type="text/css">
		.functiondiv .textbox-text{
			width:250px;
		}
		.textbox-text{
			width:60px;
		}
		.leftTd{
			text-align: right;
		}
		fieldset{
			border:1px solid green;
		}
		legend{
			color:green;padding-left:20px;padding-right:20px;
		}
		table{
			font-size:12px;
		}
	</style>
  </head>
  
  <body>
	<div style="height: 85%;margin: 20px;margin-bottom: 20px;border:3px double #dbefe7;">
	  	<form id="fm" method="post" data-options="novalidate:true">
		    <div style="margin-bottom:10px;display: none;">
		        <input name="id" id="id" class="easyui-textbox" type="hidden">
		    </div>
			<div style="line-height:22px;height:22px;background:#dbefe7; color:#000">
				<label>&nbsp;&nbsp;<strong>参数设置</strong></label>
			</div>
		  	<style>
				.fit{border:6px solid #dbefe7}
			</style>
		  	<div class="fit" style="line-height:22px;height:22px;">
		    	<lable>公司名称：</lable>
		        	<input name="companyName" id="companyName" class="easyui-textbox" style="width:30px;" data-options="required:true">
		    </div>
		    <div class="fit" style="height:44px;">
		        <div style="height:22px;">
		    	<label>监测电流电压限定值有效<input name="term1" id="term1" type="checkbox" value="0"/></label>
		    	<label>超限停机有效<input name="term2" id="term2" type="checkbox" value="1"/></label></br>
		    	</div>
		    	<div style="height:22px;">
		    	<label>基础停机时间：</label>
		    	<input name="hour1" id="hour1" class="easyui-textbox" style="width:30px;" data-options="required:true"/>
		    	<label>时</label>
		    	<input name="minute1" id="minute1" class="easyui-textbox" style="width:30px;" data-options="required:true"/>
		    	<label>分</label>
		    	<input name="second1" id="second1" class="easyui-textbox" style="width:30px;" data-options="required:true"/>
		    	<label>秒</label>
		    	<label>最大停机浮动时间：</label>
		    	<input name="hour2" id="hour2" class="easyui-textbox" style="width:30px;" data-options="required:true"/>
		    	<label>时</label>
		    	<input name="minute2" id="minute2" class="easyui-textbox" style="width:30px;" data-options="required:true"/>
		    	<label>分</label>
		    	<input name="second2" id="second2" class="easyui-textbox" style="width:30px;" data-options="required:true"/>
		    	<label>秒</label>
		    	</div>
		    </div>
		    <div class="fit" style="height:44px;">
		    
		    	<lable>超限监测：</lable></br>
		    	<lable>连续 [</lable>
		       	<input name="hour3" id="hour3" class="easyui-textbox" style="width:30px;" data-options="required:true"/>
		    	<label>时</label>
		    	<input name="minute3" id="minute3" class="easyui-textbox" style="width:30px;" data-options="required:true"/>
		    	<label>分</label>
		    	<input name="second3" id="second3" class="easyui-textbox" style="width:30px;" data-options="required:true"/>
		    	<label>秒 ]内，最大超限次数 </label>
		    	<input name="times" id="times" class="easyui-textbox" style="width:30px;" data-options="required:true"/>
		    </div>
		    <div class="fit" style="height:44px;">
		    	<div style="height:22px;">
		    	<lable>焊丝重量：</lable>
		    	</div>
		    	<div style="height:22px;">
		    	<lable>1.0   </lable>
		       	<input name="one" id="one" class="easyui-textbox" style="width:60px;" data-options="required:true"/>
		    	<label>Kg/m,   1.2   </label>
		    	<input name="two" id="two" class="easyui-textbox" style="width:60px;" data-options="required:true"/>
		    	<label>Kg/m,   1.6   </label>
		    	<input name="six" id="six" class="easyui-textbox" style="width:60px;" data-options="required:true"/>
		    	<label>Kg/m,   0.8   </label>
		    	<input name="eight" id="eight" class="easyui-textbox"  style="width:60px;" data-options="required:true"/>
		    	<label>Kg/m</label>
		    	</div>
		    </div>
		    <div class="fit" style="height:110px;">
		    	<div style="height:22px;">
		    	<lable>汇总信息：</lable>
				</div>
				<div style="height:22px;">
		    	<lable>气流量：</lable>
		       	<input name="airflow" id="airflow" class="easyui-textbox" style="width:30px;" data-options="required:true"/>
		    	<label>L/min</label>
		    	</div>
		    	<div style="height:22px;">
		    	<lable>送丝速度：</lable>
		    	<input name="speed" id="speed" class="easyui-textbox" style="width:30px;" data-options="required:true"/>
		    	<label>m/min</label>
		    	</div>
		    	<div style="height:22px;">
		    	<lable>焊接功率=焊接电流*焊接电压*</lable>
		    	<input name="weld" id="weld" class="easyui-textbox" style="width:30px;" data-options="required:true"/>
		    	</div>
		    	<div style="height:22px;">
		    	<lable>待机功率=</lable>
		    	<input name="wait" id="wait" class="easyui-textbox" style="width:30px;" data-options="required:true"/>
		    	<label>w</label>
		    	</div>
		    </div>
		    <div style="line-height:22px;height:22px;background:#dbefe7; color:#000">
				<label>&nbsp;&nbsp;<strong>班制: 修改</strong></label>
			</div>
			<div class="fit" style="height:88px;">
			<div style="height:22px;">
		    	<lable>开始工作时间</lable>
		    	</div>
		    	<div style="height:22px;">
		    	<lable>白班</lable>
		       	<input name="day" id="day" class="easyui-textbox" style="width:60px;" data-options="required:true"/>
		       	</div>
		       	<div style="height:22px;">
		    	<label>中班</label>
		    	<input name="after" id="after" class="easyui-textbox" style="width:60px;" data-options="required:true"/>
		    	</div>
		    	<div style="height:22px;">
		    	<label>夜班</label>
		    	<input name="night" id="night" class="easyui-textbox" style="width:60px;" data-options="required:true"/>
		    	</div>
		    </div>
		    <div class="fit" style="line-height:44px;height:30px;padding-top:6px;" align="center">
		    	<a href="javascript:savePara();" class="easyui-linkbutton" iconCls="icon-update" style="border:1px solid #cbc9c9;">确定</a>
		    </div>
    	</form>
	</div>
  </body>
</html>
