/**
 * 
 */
$(function(){
	var width = $("#treeDiv").width();
	$(".easyui-layout").layout({
		onCollapse:function(){
			$("#dg").datagrid({
				height : $("#body").height(),
				width : $("#body").width()
			})
		},
		onExpand:function(){
			$("#dg").datagrid({
				height : $("#body").height(),
				width : $("#body").width()
			})
		}
	});
	insframeworkTree();
})   
