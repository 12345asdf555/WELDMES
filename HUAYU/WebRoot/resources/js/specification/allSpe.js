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
		url : "wps/getAllSpe",
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
			title : '规范号',
//			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'Fweld_I',
			title : '初始条件',
//			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'Fweld_V',
			title : '熔深控制',
//			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'Fweld_I_MAX',
			title : '一元/个别',
//			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'Fweld_I_MIN',
			title : '收弧',
//			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'Fweld_V_MAX',
			title : '电弧特性',
//			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'Fweld_V_MIN',
			title : '柔软电弧模式',
//			width : 100,
			halign : "center",
			align : "left"
        }, {
			field : 'Fweld_Alter_I',
			title : '焊丝材质',
//			width : 100,
			halign : "center",
			align : "left"
        }, {
			field : 'Fweld_Alter_V',
			title : '气体',
//			width : 100,
			halign : "center",
			align : "left"
        }, {
			field : 'Fweld_PreChannel',
			title : '焊丝直径',
//			width : 100,
			halign : "center",
			align : "left"
        }, {
			field : 'ftime',
			title : '点焊时间',
//			width : 100,
			halign : "center",
			align : "left"
        },{
			field : 'fadvance',
			title : '提前送气',
//			width : 100,
			halign : "center",
			align : "left"
        },{
			field : 'fhysteresis',
			title : '滞后送气',
//			width : 100,
			halign : "center",
			align : "left"
        },{
			field : 'fini_ele',
			title : '初期电流',
//			width : 100,
			halign : "center",
			align : "left"
        },{
			field : 'fini_vol',
			title : '初期电压',
//			width : 100,
			halign : "center",
			align : "left"
        },{
			field : 'fweld_ele',
			title : '焊接电流',
//			width : 100,
			halign : "center",
			align : "left"
        },{
			field : 'fweld_vol',
			title : '焊接电压',
//			width : 100,
			halign : "center",
			align : "left"
        },{
			field : 'farc_ele',
			title : '收弧电流',
//			width : 100,
			halign : "center",
			align : "left"
        },{
			field : 'farc_vol',
			title : '收弧电压',
//			width : 100,
			halign : "center",
			align : "left"
        },{
			field : 'fweld_tuny_ele',
			title : '焊接电流微调',
//			width : 100,
			halign : "center",
			align : "left"
        },{
			field : 'fweld_tuny_vol',
			title : '焊接电压微调',
//			width : 100,
			halign : "center",
			align : "left"
        },{
			field : 'farc_tuny_ele',
			title : '收弧电流微调',
//			width : 100,
			halign : "center",
			align : "left"
        },{
			field : 'Fdiameter',
			title : '收弧电压微调',
//			width : 100,
			halign : "center",
			align : "left"
        },{
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
