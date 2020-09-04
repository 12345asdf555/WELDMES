/**
 * 
 */
       $(function(){
	    $("#dg").datagrid( {
//		fitColumns : true,
		height : ($("#body").height()),
		width : $("#body").width(),
		idField : 'id',
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		url : "wps/getAllWps",
		singleSelect : true,
		rownumbers : true,
		pagination : true,
		showPageList : false,
		columns : [ [ {
			field : 'FID',
			title : 'FID',
			width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'FWPSNum',
			title : '工艺编号',
//			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'Fweld_I',
			title : '标准焊接电流',
//			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'Fweld_V',
			title : '标准焊接电压',
//			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'Fweld_I_MAX',
			title : '最大焊接电流',
//			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'Fweld_I_MIN',
			title : '最小焊接电流',
//			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'Fweld_V_MAX',
			title : '最大焊接电压',
//			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'Fweld_V_MIN',
			title : '最小焊接电压',
//			width : 100,
			halign : "center",
			align : "left"
        }, {
			field : 'Fweld_Alter_I',
			title : '报警电流',
//			width : 100,
			halign : "center",
			align : "left"
        }, {
			field : 'Fweld_Alter_V',
			title : '报警电压',
//			width : 100,
			halign : "center",
			align : "left"
        }, {
			field : 'Fdiameter',
			title : '焊丝直径',
//			width : 100,
			halign : "center",
			align : "left"
        },{
			field : 'Fweld_PreChannel',
			title : '预置通道',
//			width : 100,
			halign : "center",
			align : "left"
        }, {
			field : 'FCReateDate',
			title : '提交时间',
//			width : 100,
			halign : "center",
			align : "left"
        }, {
			field : 'FUpdateDate',
			title : '修改时间',
//			width : 100,
			halign : "center",
			align : "left"
        }, {
			field : 'Fowner',
			title : '部门',
//			width : 100,
			halign : "center",
			align : "left"
        }, {
			field : 'insid',
			title : '部门id',
			halign : "center",
			align : "left",
			hidden : true
        }, {
			field : 'Fback',
			title : '备注',
//			width : 100,
			halign : "center",
			align : "left"
        }, {
			field : 'Fname',
			title : '工艺参数名称',
//			width : 100,
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
			str += '<a id="edit" class="easyui-linkbutton" href="javascript:editWps()"/>';
			str += '<a id="remove" class="easyui-linkbutton" href="javascript:removeWps()"/>';
			return str;
			}
		}]],
		rowStyler: function(index,row){
            if ((index % 2)!=0){
            	//处理行代背景色后无法选中
            	var color=new Object();
                color.class="rowColor";
                return color;
            }
		},
		onLoadSuccess:function(data){
	        $("a[id='edit']").linkbutton({text:'修改',plain:true,iconCls:'icon-update'});
	        $("a[id='remove']").linkbutton({text:'删除',plain:true,iconCls:'icon-delete'});
	        }
	});

})

function giveWps(){
    	   var url = "wps/selectwps";
			var img = new Image();
		    img.src = url;  // 设置相对路径给Image, 此时会发送出请求
		    url = img.src;  // 此时相对路径已经变成绝对路径
		    img.src = null; // 取消请求
			window.location.href = encodeURI(url);
       } 
function addWps(){
    	   var url = "wps/toAddWps";
			var img = new Image();
		    img.src = url;  // 设置相对路径给Image, 此时会发送出请求
		    url = img.src;  // 此时相对路径已经变成绝对路径
		    img.src = null; // 取消请求
			window.location.href = encodeURI(url);
       }
function history(){
	$("#historyDIV").dialog("open");
    $("#history").datagrid( {
	fitColumns : true,
	height : $("#historyDIV").height(),
	width : $("#historyDIV").width(),
	idField : 'id',
	pageSize : 10,
	pageList : [ 10, 20, 30, 40, 50 ],
	url : "wps/findHistory",
	rownumbers : true,
	pagination : true,
	showPageList : false,
	checkOnSelect:true,
	selectOnCheck:true,
	columns : [ [{
		field : 'FWPSNum',
		title : '工艺编号',
		width : 100,
		halign : "center",
		align : "left"
	}, {
		field : 'Fname',
		title : '焊机ID',
		width : 100,
		halign : "center",
		align : "left"
    }, {
		field : 'Fweld_PreChannel',
		title : '预置通道',
		width : 100,
		halign : "center",
		align : "left"
    }, {
		field : 'FCReateDate',
		title : '时间',
		width : 100,
		halign : "center",
		align : "left"
    }]],
	rowStyler: function(index,row){
        if ((index % 2)!=0){
        	//处理行代背景色后无法选中
        	var color=new Object();
            color.class="rowColor";
            return color;
        }
	}
});


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
