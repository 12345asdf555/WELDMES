<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!-- <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> -->
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>规范管理</title>
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
	<script type="text/javascript" src="resources/js/search/search.js"></script>
	<script type="text/javascript" src="resources/js/specification/specificationtree.js"></script>

  </head>
  
  <body>
    <jsp:include  page="../specificationtree.jsp"/>
  	<div  id="bodys" region="center"  hide="true"  split="true" >
		        <div>
		        	<select class="easyui-combobox" name="fspe_num" id="fspe_num" data-options="required:true,editable:false">></select>
		        	<a href="javascript:addWps();" class="easyui-linkbutton" iconCls="icon-newadd">新增</a>&nbsp;&nbsp;&nbsp;&nbsp;
		    	</div>
           		<div class="fitem">
	            	<lable><span class="required">*</span>初期条件：</lable><input name="finitial" id="finitial" type="checkbox">
	            	<lable><span class="required">*</span>熔深控制：</lable><input name="fcontroller" type="checkbox">
	            </div>
	            <div class="fitem">
	            	<lable><span class="required">*</span>一元/个别：</lable>
	                <select class="easyui-combobox" name="fselect" id="fselect" data-options="required:true,editable:false">
	                    <option value="102">个别</option>
					    <option value="101">一元</option>
	                </select>
	            	<lable><span class="required">*</span>收弧：</lable>
	                <select class="easyui-combobox" name="farc" id="farc" data-options="required:true,editable:false">
	                	<option value="111">无</option>
					    <option value="112">有</option>
					    <option value="113">反复</option>
					    <option value="114">点焊</option>
	                </select>
	            </div>
	            <div class="fitem">
	            	<lable><span class="required">*</span>电弧特性：</lable>
	                <input name="fcharacter" class="easyui-numberbox"   data-options="required:true"></span>((±1))</lable>
	            	<lable><span class="required">*</span>柔软电弧模式：</lable>
	            	<input name="fmode" type="checkbox">
	            </div>
	            <div class="fitem">
	            	<lable><span class="required">*</span>点焊时间：</lable><lable><span class="required">*
	                <input name="ftime" class="easyui-numberbox"  data-options="required:true"></span>(0.1s)</lable>
	            	<lable><span class="required">*</span>焊丝材质</lable>
	                <select class="easyui-combobox" name="fmaterial" id="fmaterial" data-options="required:true,editable:false">
	                	<option value="91">低碳钢实心</option>
					    <option value="92">不锈钢实心</option>
					    <option value="93">低碳钢药芯</option>
					    <option value="94">不锈钢药芯</option>
	                </select>
	            </div>
	            <div class="fitem">
	            	<lable><span class="required">*</span>提前送气：</lable><lable><span class="required">*
	                <input name="fadvance" class="easyui-numberbox"   data-options="required:true"></span>(0.1s)</lable>
	            	<lable><span class="required">*</span>气体：</lable>
	                <select class="easyui-combobox" name="fgas" id="fgas" data-options="required:true,editable:false">
	                	<option value="121">CO2</option>
					    <option value="122">MAG</option>
	                </select>
	            </div>
	            <div class="fitem">
	            	<lable><span class="required">*</span>滞后送气：</lable><lable><span class="required">*
	                <input name="fhysteresis" class="easyui-numberbox" data-options="required:true"></span>(0.1s)</lable>
	            	<lable><span class="required">*</span>焊丝直径：</lable>
	                <select class="easyui-combobox" name="fdiameter" id="fdiameter" data-options="required:true,editable:false">
	                	<option value="131">Φ1.0</option>
	                	<option value="132">Φ1.2</option>
	                	<option value="133">Φ1.4</option>
	                	<option value="134">Φ1.6</option>
	                </select>
	            </div>
	            <div class="fitem">
	            	<lable><span class="required">*</span>初期电流：</lable><lable><span class="required">*
	                <input name="fini_ele" class="easyui-numberbox" data-options="required:true"></span>(A)</lable>
	            	<lable><span class="required">*</span>焊接电流：</lable><lable><span class="required">*
	                <input name="fweld_ele" class="easyui-numberbox" data-options="required:true"></span>(A)</lable>
	                <lable><span class="required">*</span>收弧电流：</lable><lable><span class="required">*
	                <input name="farc_ele" class="easyui-numberbox" data-options="required:true"></span>(A)</lable>
	            </div>
	            <div class="fitem">
	            	<lable><span class="required">*</span>初期电压（一元）：</lable><lable><span class="required">*
	                <input name="fini_vol" class="easyui-numberbox" data-options="required:true"></span>(±1)</lable>
	            	<lable><span class="required">*</span>焊接电压（一元）：</lable><lable><span class="required">*
	                <input name="fweld_vol" class="easyui-numberbox" data-options="required:true"></span>(±1))</lable>
	                <lable><span class="required">*</span>收弧电压（一元）：</lable><lable><span class="required">*
	                <input name="farc_vol" class="easyui-numberbox" data-options="required:true"></span>(±1)</lable>
	            </div>
	            <div class="fitem">
	            	<lable><span class="required">*</span>焊接电流微调：</lable><lable><span class="required">*
	                <input name="fweld_tuny_ele" class="easyui-numberbox" data-options="required:true"></span>(A)</lable>
	            	<lable><span class="required">*</span>收弧电流微调：</lable><lable><span class="required">*
	                <input name="farc_tuny_ele" class="easyui-numberbox" data-options="required:true"></span>(A)</lable>
	            </div>
	            <div class="fitem">
	            	<lable><span class="required">*</span>焊接电压微调（一元）：</lable><lable><span class="required">*
	                <input name="fweld_tuny_vol" class="easyui-numberbox" data-options="required:true"></span>(%)</lable>
	            	<lable><span class="required">*</span>收弧电压微调（一元）：</lable><lable><span class="required">*
	                <input name="farc_tuny_vol" class="easyui-numberbox" data-options="required:true"></span>(%)</lable>
	            </div>
	            <div class="fitem">
	            	<lable><span class="required">*</span>初期电压：</lable><lable><span class="required">*
	                <input name="fini_vol" class="easyui-numberbox" data-options="required:true"></span>(V)</lable>
	            	<lable><span class="required">*</span>焊接电压：</lable><lable><span class="required">*
	                <input name="fweld_vol" class="easyui-numberbox" data-options="required:true"></span>(V))</lable>
	                <lable><span class="required">*</span>收弧电压：</lable><lable><span class="required">*
	                <input name="farc_vol" class="easyui-numberbox" data-options="required:true"></span>(V)</lable>
	            </div>
	            <div class="fitem">
	            	<lable><span class="required">*</span>焊接电流微调：</lable><lable><span class="required">*
	                <input name="fweld_tuny_ele" class="easyui-numberbox" data-options="required:true"></span>(A)</lable>
	            	<lable><span class="required">*</span>收弧电流微调：</lable><lable><span class="required">*
	                <input name="farc_tuny_ele" class="easyui-numberbox" data-options="required:true"></span>(A)</lable>
	            </div>
	            <div class="fitem">
	            	<lable><span class="required">*</span>焊接电压微调：</lable><lable><span class="required">*
	                <input name="fweld_tuny_vol" class="easyui-numberbox" data-options="required:true"></span>(V)</lable>
	            	<lable><span class="required">*</span>收弧电压微调：</lable><lable><span class="required">*
	                <input name="farc_tuny_vol" class="easyui-numberbox" data-options="required:true"></span>(V)</lable>
	            </div>
	            <div id="dlg-buttons">
	            	<a href="javascript:save();" class="easyui-linkbutton" iconCls="icon-ok">新增</a>
					<a href="javascript:save();" class="easyui-linkbutton" iconCls="icon-ok">保存</a>
					<a href="javascript:$('#dlg').dialog('close');" class="easyui-linkbutton" iconCls="icon-cancel" >取消</a>
				</div>
	</div>
</body>
</html>
 
 
