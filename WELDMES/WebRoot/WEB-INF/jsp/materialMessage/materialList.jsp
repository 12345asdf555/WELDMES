<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div region="west"  hide="true"  split="true" title="物料列表" id="treeDiv" style="background: witch; width:12%;" fit=“true”>
	<div>
		<a href="javascript:addMaterialType();" class="easyui-linkbutton" iconCls="icon-newadd">新增物料类型</a>
	</div>
	<div style="padding-top: 3%">
		<ul id="myTree" class="easyui-tree"></ul>
	</div>
</div>