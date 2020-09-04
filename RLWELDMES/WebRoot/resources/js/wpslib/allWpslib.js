/**
 * 
 */
var sxTableFlag=0;
var otcTableFlag=0;
$(function(){
	wpslibDatagrid();
	sxDefault();
	$("#fselect").combobox({
		onSelect : function(record) {
			if (record.value == 102) {
//				document.getElementById("tryiyuan").style.display = "none";
				$("#tryiyuan").next().hide();
			} else {
//				document.getElementById("trgebie").style.display = "none";
				$("#trgebie").css('display' ,'none')
			}
		}
	});
})

function wpslibDatagrid(){
	$("#wpslibTable").datagrid( {
//		fitColumns : true,
		view: detailview,
		height : $("#body").height(),
		width : $("#body").width(),
		idField : 'id',
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		url : "wps/getWpslibList",
		singleSelect : true,
		rownumbers : true,
		showPageList : false,
		autoRowHeight:true,
		columns : [ [ {
			field : 'fid',
			title : '序号',
			width : 30,
			halign : "center",
			align : "left",
			hidden:true
		},{
			field : 'manu',
			title : '厂商类型id',
			width : 30,
			halign : "center",
			align : "left",
			hidden:true
		}, {
			field : 'wpslibName',
			title : '工艺库名称',
			width : 300,
			halign : "center",
			align : "left"
		}, {
			field : 'model',
			title : '焊机型号id',
			width : 270,
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'modelname',
			title : '焊机型号',
			width : 300,
			halign : "center",
			align : "left"
		}, {
			field : 'createdate',
			title : '创建日期',
			width : 270,
			halign : "center",
			align : "left"
		}, {
			field : 'status',
			title : '状态',
			width : 270,
			halign : "center",
			align : "left"
		}, {
			field : 'statusId',
			title : '状态id',
			width : 270,
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'edit',
			title : '编辑',
			width : 400,
			halign : "center",
			align : "left",
			formatter: function(value,row,index){
				var str = "";
				str += '<a id="wpslibgive" class="easyui-linkbutton" href="javascript:selectMainWps('+row.fid+','+row.manu+')"/>';
				str += '<a id="wpslibadd" class="easyui-linkbutton" href="javascript:addMainWps()"/>';
				str += '<a id="wpslibedit" class="easyui-linkbutton" href="javascript:editWpslib()"/>';
				str += '<a id="wpslibremove" class="easyui-linkbutton" href="javascript:openRemoveWpslib()"/>';
				return str;
			}
		}] ],
		pagination : true,
		rowStyler: function(index,row){
            if ((index % 2)!=0){
            	//处理行代背景色后无法选中
            	var color=new Object();
                return color;
            }
        },
		onLoadSuccess: function(data){
			$("a[id='wpslibgive']").linkbutton({text:'工艺库下发',plain:true,iconCls:'icon-setwps'});
			$("a[id='wpslibadd']").linkbutton({text:'新增工艺',plain:true,iconCls:'icon-newadd'});
	        $("a[id='wpslibedit']").linkbutton({text:'修改',plain:true,iconCls:'icon-update'});
	        $("a[id='wpslibremove']").linkbutton({text:'删除',plain:true,iconCls:'icon-delete'});
		},
		detailFormatter:function(index,row2){
			return '<div id="div'+index+'"><table id="ddv-' + index + '" style="min-height:80px;"></table></div>';
		},
		onExpandRow: function(index,row){
			var ddv = $(this).datagrid('getRowDetail',index).find('#ddv-'+index);
			if(row.manu==149){
				ddv.datagrid({
					width: $("#div"+index).width,
					height: $("#div"+index).height,
					idField : 'id',
					pageSize : 10,
					pageList : [ 10, 20, 30, 40, 50 ],
					url : "wps/getMainwpsList?fwpslib_id="+row.fid,
					rownumbers : true,
					pagination : true,
					showPageList : false,
					singleSelect : true,
					columns : [ [ {
						field : 'fid',
						title : 'FID',
						halign : "center",
						align : "left",
						hidden : true
					}, {
						field : 'fmodel',
						title : '焊机型号',
						halign : "center",
						align : "left",
						hidden : true
					}, {
						field : 'FWPSNum',
						title : 'Job号',
						halign : "center",
						align : "left"
					}, {
						field : 'fchanel',
						title : 'Job号',
						halign : "center",
						align : "left",
						hidden : true
					}, {
						field : 'fselect',
						title : '焊接模式',
						halign : "center",
						align : "left",
						hidden : true
					}, {
						field : 'fselectname',
						title : '焊接模式',
						halign : "center",
						align : "left"
					}, {
						field : 'fselectstep',
						title : 'Step',
						halign : "center",
						align : "left",
						hidden : true
					}, {
						field : 'fselectstepname',
						title : 'Step',
						halign : "center",
						align : "left"
					}, {
						field : 'fmaterial',
						title : '材质',
						halign : "center",
						align : "left",
						hidden : true
					}, {
						field : 'materialname',
						title : '材质',
						halign : "center",
						align : "left"
					}, {
						field : 'fdiameter',
						title : '丝径',
						halign : "center",
						align : "left",
						hidden : true
					}, {
						field : 'dianame',
						title : '丝径',
						halign : "center",
						align : "left"
					}, {
						field : 'fgas',
						title : '气体',
						halign : "center",
						align : "left",
						hidden : true
					}, {
						field : 'gasname',
						title : '气体',
						halign : "center",
						align : "left"
					}, {
						field : 'fcharacter',
						title : '给定电感',
						halign : "center",
						align : "left"
					}, {
						field : 'frequency',
						title : '双脉冲频率',
						halign : "center",
						align : "left",
						hidden : true
					}, {
						field : 'fadvance',
						title : '提前送气时间',
						halign : "center",
						align : "left"
					}, {
						field : 'ftime',
						title : '点焊时间',
						halign : "center",
						align : "left"
					}, {
						field : 'fini_ele',
						title : '初期电流',
						halign : "center",
						align : "left"
					}, {
						field : 'fweld_ele',
						title : '焊接电流',
						halign : "center",
						align : "left"
					}, {
						field : 'farc_ele',
						title : '收弧电流',
						halign : "center",
						align : "left"
					}, {
						field : 'fini_vol',
						title : '初期电压',
						halign : "center",
						align : "left"
					}, {
						field : 'fweld_vol',
						title : '焊接电压',
						halign : "center",
						align : "left"
					}, {
						field : 'farc_vol',
						title : '收弧电压',
						halign : "center",
						align : "left"
					}, {
						field : 'fspeed',
						title : '给定速度',
						halign : "center",
						align : "left"
					}, {
						field : 'farc_speed',
						title : '初期给定速度',
						halign : "center",
						align : "left"
					}, {
						field : 'farc_tuny_speed',
						title : '收弧给定速度',
						halign : "center",
						align : "left"
					},{
						field : 'fweld_tuny_ele',
						title : '焊接电流微调',
						halign : "center",
						align : "left"
					}, {
						field : 'fweld_tuny_vol',
						title : '焊接电压微调',
						halign : "center",
						align : "left"
					}, {
						field : 'fini_tuny_vol',
						title : '初期电压微调',
						halign : "center",
						align : "left"
					}, {
						field : 'farc_tuny_vol',
						title : '收弧电压微调',
						halign : "center",
						align : "left"
					}, {
						field : 'fwpsback',
						title : '备注',
						halign : "center",
						align : "left"
					}, {
						field : 'edit',
						title : '编辑',
						width : 150,
						halign : "center",
						align : "left",
						formatter : function(value, indexrow, index) {
							var str = "";
							str += '<a id="wpslibedit" class="easyui-linkbutton" href="javascript:editMainWps('+encodeURI(JSON.stringify(indexrow))+','+encodeURI(JSON.stringify(row))+')"/>';
							str += '<a id="wpslibremove" class="easyui-linkbutton" href="javascript:rmSxWps('+encodeURI(JSON.stringify(indexrow))+')"/>';
							return str;
						}
					} ] ],
					onResize:function(){
						$('#wpslibTable').datagrid('fixDetailRowHeight',index);
					},
					onLoadSuccess : function(data) {
						$("a[id='wpslibedit']").linkbutton({
							text : '修改',
							plain : true,
							iconCls : 'icon-update'
						});
						$("a[id='wpslibremove']").linkbutton({
							text : '删除',
							plain : true,
							iconCls : 'icon-delete'
						});
						if(sxTableFlag==0){
							$("#div"+index).height($("#div"+index).height()+20);
							sxTableFlag++;
						}
						$("#ddv-"+index).datagrid('resize', {
							height : $("#div"+index).height(),
							width : $("#div"+index).width()
						});
					},
					rowStyler : function(index, row) {
						if ((index % 2) != 0) {
							//处理行代背景色后无法选中
							var color = new Object();
							return color;
						}
					}
				});
			}else{
				ddv.datagrid({
					fitColumns : false,
					width: $("#div"+index).width,
					height: $("#div"+index).height,
					idField : 'id',
					pageSize : 30,
					pageList : [ 10, 20, 30, 40, 50 ],
					url : "wps/getMainwpsList?parent="+row.fid,
					singleSelect : true,
					rownumbers : true,
					showPageList : false,
					columns : [ [ {
						field : 'fid',
						title : 'FID',
						halign : "center",
						align : "left",
						hidden : true
					}, {
						field : 'fmodel',
						title : '焊机型号',
						halign : "center",
						align : "left",
						hidden : true
					}, {
						field : 'FWPSNum',
						title : 'Job号',
						halign : "center",
						align : "left"
					}, {
						field : 'fchanel',
						title : 'Job号',
						halign : "center",
						align : "left",
						hidden : true
					}, {
						field : 'fselect',
						title : '焊接模式',
						halign : "center",
						align : "left",
						hidden : true
					}, {
						field : 'fselectname',
						title : '焊接模式',
						halign : "center",
						align : "left"
					}, {
						field : 'fselectstep',
						title : 'Step',
						halign : "center",
						align : "left",
						hidden : true
					}, {
						field : 'fselectstepname',
						title : 'Step',
						halign : "center",
						align : "left"
					}, {
						field : 'fmaterial',
						title : '材质',
						halign : "center",
						align : "left",
						hidden : true
					}, {
						field : 'materialname',
						title : '材质',
						halign : "center",
						align : "left"
					}, {
						field : 'fdiameter',
						title : '丝径',
						halign : "center",
						align : "left",
						hidden : true
					}, {
						field : 'dianame',
						title : '丝径',
						halign : "center",
						align : "left"
					}, {
						field : 'fgas',
						title : '气体',
						halign : "center",
						align : "left",
						hidden : true
					}, {
						field : 'gasname',
						title : '气体',
						halign : "center",
						align : "left"
					}, {
						field : 'fcharacter',
						title : '给定电感',
						halign : "center",
						align : "left"
					}, {
						field : 'frequency',
						title : '双脉冲频率',
						halign : "center",
						align : "left",
						hidden : true
					}, {
						field : 'fadvance',
						title : '提前送气时间',
						halign : "center",
						align : "left"
					}, {
						field : 'ftime',
						title : '点焊时间',
						halign : "center",
						align : "left"
					}, {
						field : 'fini_ele',
						title : '初期电流',
						halign : "center",
						align : "left"
					}, {
						field : 'fweld_ele',
						title : '焊接电流',
						halign : "center",
						align : "left"
					}, {
						field : 'farc_ele',
						title : '收弧电流',
						halign : "center",
						align : "left"
					}, {
						field : 'fini_vol',
						title : '初期电压',
						halign : "center",
						align : "left"
					}, {
						field : 'fweld_vol',
						title : '焊接电压',
						halign : "center",
						align : "left"
					}, {
						field : 'farc_vol',
						title : '收弧电压',
						halign : "center",
						align : "left"
					}, {
						field : 'fspeed',
						title : '给定速度',
						halign : "center",
						align : "left"
					}, {
						field : 'farc_speed',
						title : '初期给定速度',
						halign : "center",
						align : "left"
					}, {
						field : 'farc_tuny_speed',
						title : '收弧给定速度',
						halign : "center",
						align : "left"
					},{
						field : 'fweld_tuny_ele',
						title : '焊接电流微调',
						halign : "center",
						align : "left"
					}, {
						field : 'fweld_tuny_vol',
						title : '焊接电压微调',
						halign : "center",
						align : "left"
					}, {
						field : 'fini_tuny_vol',
						title : '初期电压微调',
						halign : "center",
						align : "left"
					}, {
						field : 'farc_tuny_vol',
						title : '收弧电压微调',
						halign : "center",
						align : "left"
					}, {
						field : 'fwpsback',
						title : '备注',
						halign : "center",
						align : "left"
					}, {
						field : 'edit',
						title : '编辑',
						width : 150,
						halign : "center",
						align : "left",
						formatter: function(value,indexrow,index){
							var str = "";
							str += '<a id="mainwpsedit" class="easyui-linkbutton" href="javascript:editMainWps('+encodeURI(JSON.stringify(indexrow))+','+encodeURI(JSON.stringify(row))+')"/>';
							str += '<a id="mainwpsremove" class="easyui-linkbutton" href="javascript:openRemoveMainWps('+encodeURI(JSON.stringify(indexrow))+')"/>';
							return str;
						}
					}
					] ],
					pagination : true,
					onResize:function(){
						$('#wpslibTable').datagrid('fixDetailRowHeight',index);
					},
					onLoadSuccess:function(){
						var wpslibrow = $('#wpslibTable').datagrid("getSelected");
						$('#wpslibTable').datagrid("selectRow", index)
						setTimeout(function(){
							$('#wpslibTable').datagrid('fixDetailRowHeight',index);
							$('#wpslibTable').datagrid('fixRowHeight',index);
						},0);
				        $("a[id='mainwpsedit']").linkbutton({text:'修改',plain:true,iconCls:'icon-update'});
				        $("a[id='mainwpsremove']").linkbutton({text:'删除',plain:true,iconCls:'icon-delete'});
						if(otcTableFlag==0){
							$("#div"+index).height($("#div"+index).height()+20);
							otcTableFlag++;
						}
						$("#ddv-"+index).datagrid('resize', {
							height : $("#div"+index).height(),
							width : $("#div"+index).width()
						});
					}
				});
			}
			$('#wpslibTable').datagrid('fixDetailRowHeight',index);
		}
	});
}

function closedlg(){
	if(!$("#smdlg").parent().is(":hidden")){
		$('#smdlg').window('close');
	}
	if(!$("#smwdlg").parent().is(":hidden")){
		$('#smwdlg').window('close');
	}
	if(!$("#mwdlg").parent().is(":hidden")){
		$('#mwdlg').window('close');
	}
	if(!$("#rmmwdlg").parent().is(":hidden")){
		$('#rmmwdlg').window('close');
	}
	if(!$("#wltdlg").parent().is(":hidden")){
		$('#wltdlg').window('close');
	}
	if(!$("#rmwltdlg").parent().is(":hidden")){
		$('#rmwltdlg').window('close');
	}
	if(!$("#editSxDlg").parent().is(":hidden")){
		$('#editSxDlg').window('close');
	}
	if(!$("#sxMachinedlg").parent().is(":hidden")){
		$('#sxMachinedlg').window('close');
	}
	if(!$("#sxSelectdlg").parent().is(":hidden")){
		$('#sxSelectdlg').window('close');
	}
	if(!$("#resultdlg").parent().is(":hidden")){
		$('#resultdlg').window('close');
	}
}

function sxDefault(){
	$("#sxfweld_vol").numberbox('setValue', 1234);
	$("#sxfweld_ele").numberbox('setValue', 1234);
	$("#sxfini_ele").numberbox('setValue', 1234);
	$("#sxfini_vol").numberbox('setValue', 1234);
	$("#sxfarc_ele").numberbox('setValue', 1234);
	$("#sxfarc_vol").numberbox('setValue', 1234);
	$("#sxfadvance").numberbox('setValue', 10);
	$("#sxfhysteresis").numberbox('setValue', 10);
	$("#sxfinitial").combobox('setValue', 0);
	$("#sxfflow_top").numberbox('setValue', 12.3);
	$("#sxfflow_bottom").numberbox('setValue', 12.3);
	$("#sxfdelay_time").numberbox('setValue', 12.3);
	$("#sxfover_time").numberbox('setValue', 12.3);
	$("#sxffixed_cycle").numberbox('setValue', 12.3);
	$("#sxfwarn_stop_time").numberbox('setValue', 12.3);
/*	$("#sxfpreset_ele_warn_top").numberbox('setValue', 1234);
	$("#sxfpreset_vol_warn_top").numberbox('setValue', 543.2);
	$("#sxfpreset_ele_warn_bottom").numberbox('setValue', 1234);
	$("#sxfpreset_vol_warn_bottom").numberbox('setValue', 543.2);*/
	
	$("#sxfini_ele_warn_top").numberbox('setValue', 1234);
	$("#sxfini_vol_warn_top").numberbox('setValue', 543.2);
	$("#sxfini_ele_warn_bottom").numberbox('setValue', 1234);
	$("#sxfini_vol_warn_bottom").numberbox('setValue', 543.2);
	$("#sxfarc_ele_warn_top").numberbox('setValue', 1234);
	$("#sxfarc_vol_warn_top").numberbox('setValue', 543.2);
	$("#sxfarc_ele_warn_bottom").numberbox('setValue', 1234);
	$("#sxfarc_vol_warn_bottom").numberbox('setValue', 543.2);
}

//打开历史查询窗口
function openHistorydlg(){
	$("#wmhistorydlg").dialog({
	    onClose: function () {
	    	$('#machineNum').numberbox('clear');
	    	$('#theWpslibName').textbox('clear');
	    	getOldTime();
	    	getNewTime();
	    	$('#historyTable').datagrid('loadData',{total:0,rows:[]});
	    	chartStr = "";
	    }
	});
	$('#wmhistorydlg').window( {
		title : "历史下发查询",
		modal : true
	});
	$('#wmhistorydlg').window("open");
	historyTable();
}

var chartStr = "";
function setParam(){
	var dtoTime1 = $("#dtoTime1").datetimebox('getValue');
	var dtoTime2 = $("#dtoTime2").datetimebox('getValue');
	var machineNum = $("#machineNum").numberbox('getValue');
	var wpslibName = $("#theWpslibName").textbox('getValue');
	chartStr += "?machineNum="+machineNum+"&wpslibName="+encodeURI(wpslibName)+"&dtoTime1="+dtoTime1+"&dtoTime2="+dtoTime2;
}

function historyTable(){
	setParam();
	$("#historyTable").datagrid( {
		fitColumns : true,
		height : $("#wmhistorydlg").height()*0.9,
		width : $("#wmhistorydlg").width(),
		idField : 'id',
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],  
		url : "wps/getWpslibMachineHistory"+chartStr,
		singleSelect : true,
		rownumbers : true,
		pagination : true,
		showPageList : false,
		columns : [ [ {
			field : 'fid',
			title : 'FID',
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'fmodel',
			title : '焊机型号',
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'FWPSNum',
			title : 'Job号',
			halign : "center",
			align : "left"
		}, {
			field : 'fchanel',
			title : 'Job号',
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'fselect',
			title : '焊接模式',
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'fselectname',
			title : '焊接模式',
			halign : "center",
			align : "left"
		}, {
			field : 'fselectstep',
			title : 'Step',
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'fselectstepname',
			title : 'Step',
			halign : "center",
			align : "left"
		}, {
			field : 'fmaterial',
			title : '材质',
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'materialname',
			title : '材质',
			halign : "center",
			align : "left"
		}, {
			field : 'fdiameter',
			title : '丝径',
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'dianame',
			title : '丝径',
			halign : "center",
			align : "left"
		}, {
			field : 'fgas',
			title : '气体',
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'gasname',
			title : '气体',
			halign : "center",
			align : "left"
		}, {
			field : 'fcharacter',
			title : '给定电感',
			halign : "center",
			align : "left"
		}, {
			field : 'frequency',
			title : '双脉冲频率',
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'fadvance',
			title : '提前送气时间',
			halign : "center",
			align : "left"
		}, {
			field : 'ftime',
			title : '点焊时间',
			halign : "center",
			align : "left"
		}, {
			field : 'fini_ele',
			title : '初期电流',
			halign : "center",
			align : "left"
		}, {
			field : 'fweld_ele',
			title : '焊接电流',
			halign : "center",
			align : "left"
		}, {
			field : 'farc_ele',
			title : '收弧电流',
			halign : "center",
			align : "left"
		}, {
			field : 'fini_vol',
			title : '初期电压',
			halign : "center",
			align : "left"
		}, {
			field : 'fweld_vol',
			title : '焊接电压',
			halign : "center",
			align : "left"
		}, {
			field : 'farc_vol',
			title : '收弧电压',
			halign : "center",
			align : "left"
		}, {
			field : 'fspeed',
			title : '给定速度',
			halign : "center",
			align : "left"
		}, {
			field : 'farc_speed',
			title : '初期给定速度',
			halign : "center",
			align : "left"
		}, {
			field : 'farc_tuny_speed',
			title : '收弧给定速度',
			halign : "center",
			align : "left"
		},{
			field : 'fweld_tuny_ele',
			title : '焊接电流微调',
			halign : "center",
			align : "left"
		}, {
			field : 'fweld_tuny_vol',
			title : '焊接电压微调',
			halign : "center",
			align : "left"
		}, {
			field : 'fini_tuny_vol',
			title : '初期电压微调',
			halign : "center",
			align : "left"
		}, {
			field : 'farc_tuny_vol',
			title : '收弧电压微调',
			halign : "center",
			align : "left"
		}, {
			field : 'createTime',
			title : '时间',
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'back',
			title : '备注',
			width : 100,
			halign : "center",
			align : "left",
			formatter:function(value,row,index){
			var str = "";
			str += '<a id="fdetail" class="easyui-linkbutton" href="javascript:getDetail('+encodeURI(JSON.stringify(row))+')"/>';
			return str; 
			}
		}]],
		nowrap : false,
		rowStyler: function(index,row){
            if ((index % 2)!=0){
            	//处理行代背景色后无法选中
            	var color=new Object();
                return color;
            }
		},
		onLoadSuccess:function(data){
	        $("a[id='fdetail']").linkbutton({text:'参数详情',plain:true});
	    }
	});
}

function getDetail(row){
	$.ajax({
		type : "post",
		async : false,
		url : "wps/getSpeDetail?id="+row.fid,
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			if (result) {
				$("#mwdlg").dialog({
				    onClose: function () {
						$("#otcsaveWpsBut").show();
						$("#otcgetWpsBut").show();
				    }
				});
				QinTronINIT(0);
				$('#mwfm').form('clear');
				$('#mwdlg').window({
					title : "参数详情",
					modal : true
				});
				$("#otcsaveWpsBut").hide();
				$("#otcgetWpsBut").hide();
				$('#mwdlg').window('open');
				$('#mwfm').form('load', result.rows[0]);
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});
}

//搜索
function searchHistory(){
	chartStr = "";
	setTimeout(function(){
		historyTable();
	},500);
}

//监听窗口大小变化
window.onresize = function() {
	setTimeout(domresize(), 500);
}

//改变表格高宽
function domresize() {
	$("#wpslibTable").datagrid('resize', {
		height : $("#body").height(),
		width : $("#body").width()
	});
}