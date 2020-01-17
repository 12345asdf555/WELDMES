$(function(){
	insframeworkTree();
	dgDatagrid();
})   

function dgDatagrid(){
	$("#dg").datagrid({
		height : $("#body").height()+30,
		width : $("#body").width(),
		idField : 'id',
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		url : "weldedjunction/getWeldedJunctionList",
		singleSelect : true,
		rownumbers : true,
		showPageList : false,
		pagination : true,
		fitColumns : true,
		columns : [ [ {
			field : 'id',
			title : '序号',
			width : 30,
			halign : "center",
			align : "left",
			hidden:true
		}, {
			field : 'weldedJunctionno',
			title : '编号',
			width : 90,
			halign : "center",
			align : "left"
		}, {
			field : 'itemid',
			title : '项目id',
			width : 90,
			halign : "center",
			align : "left",
			hidden:true
		}, {
		/*	field : 'externalDiameter',
			title : '上游外径',
			width : 90,
			halign : "center",
			align : "left"
		}, {
			field : 'nextexternaldiameter',
			title : '下游外径',
			width : 90,
			halign : "center",
			align : "left"
		}, {
			field : 'wallThickness',
			title : '上游壁厚',
			width : 90,
			halign : "center",
			align : "left"
		}, {
			field : 'nextwall_thickness',
			title : '下游璧厚',
			width : 90,
			halign : "center",
			align : "left"
		}, {
			field : 'material',
			title : '上游材质',
			width : 90,
			halign : "center",
			align : "left"
		}, {
			field : 'next_material',
			title : '下游材质',
			width : 90,
			halign : "center",
			align : "left"
		}, {*/
			field : 'maxElectricity',
			title : '电流上限',
			width : 90,
			halign : "center",
			align : "left"
		}, {
			field : 'minElectricity',
			title : '电流下限',
			width : 90,
			halign : "center",
			align : "left"
		}, {
			field : 'maxValtage',
			title : '电压上限',
			width : 90,
			halign : "center",
			align : "left"
		}, {
			field : 'minValtage',
			title : '电压下限',
			width : 90,
			halign : "center",
			align : "left"
		}, {
			field : 'itemname',
			title : '所属项目',
			width : 150,
			halign : "center",
			align : "left"
		}, {
			field : 'edit',
			title : '编辑',
			width : 130,
			halign : "center",
			align : "left",
			formatter:function(value,row,index){
			var str = "";
			str += '<a id="wj" class="easyui-linkbutton" href="weldedjunction/getWeldJun?wjno='+encodeURI(row.weldedJunctionno)+'"/>';
			return str;
			}
		}] ],
		rowStyler: function(index,row){
            if ((index % 2)!=0){
            	//处理行代背景色后无法选中
            	var color=new Object();
                return color;
            }
        },
		onLoadSuccess:function(data){
	        $("a[id='wj']").linkbutton({text:'任务信息',plain:true,iconCls:'icon-search'});
	    }
    });
}
                      
function insframeworkTree(){
	$("#myTree").tree({  
		onClick : function(node){
			$("#dg").datagrid('load',{
				"insid" : node.id
			})
		 }
	})
}

//监听窗口大小变化
window.onresize = function() {
	setTimeout(domresize, 500);
}

//改变表格高宽
function domresize() {
	$("#dg").datagrid('resize', {
		height : $("#body").height(),
		width : $("#body").width()
	});
}