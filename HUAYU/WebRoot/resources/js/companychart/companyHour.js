$(function(){
	classifyDatagrid();
})

var chartStr = "";
function setParam(){
	var dtoTime1 = $("#dtoTime1").datetimebox('getValue');
	var dtoTime2 = $("#dtoTime2").datetimebox('getValue');
	chartStr += "&dtoTime1="+dtoTime1+"&dtoTime2="+dtoTime2;
}

var charts;
var array1 = new Array();
var array2 = new Array();
function showCompanyHourChart(num){
	array1 = new Array();
	array2 = new Array();
	setParam();
	var parent = $("#parent").val();
	 $.ajax({  
         type : "post",  
         async : false, //同步执行  
         url : encodeURI("companyChart/getCompanyHour?parent="+parent+chartStr),
         data : {},  
         dataType : "json", //返回数据形式为json
         success : function(result) {  
             if (result) {
                 for(var i=0;i<result.rows.length;i++){
                 	array1.push(result.rows[i].name);
                 	if(result.rows[i].jidgather==0){
                     	array2.push(0);
                 	}else{
                     	var num = (result.rows[i].manhour/result.rows[i].jidgather).toFixed(2);
                     	array2.push(num);
                 	}
                 }
             }  
         },  
        error : function(errorMsg) {  
             alert("图表请求数据失败啦!");  
         }  
    }); 
	if(num==0){
	   	//初始化echart实例
		charts = echarts.init(document.getElementById("companyHourChart"));
	}
	//显示加载动画效果
	charts.showLoading({
		text: '稍等片刻,精彩马上呈现...',
		effect:'whirling'
	});
	option = {
		tooltip:{
			trigger: 'axis'//坐标轴触发，即是否跟随鼠标集中显示数据
		},
		legend:{
			data:['工时(h)']
		},
		grid:{
			left:'60',//组件距离容器左边的距离
			right:'11%',
			bottom:'20',
			containLaber:true//区域是否包含坐标轴刻度标签
		},
		toolbox:{
			feature:{
				saveAsImage:{}//保存为图片
			},
			right:'2%'
		},
		xAxis:{
			type:'category',
			data: array1,
			name:'组织\n机构'
		},
		yAxis:{
			type: 'value',//value:数值轴，category:类目轴，time:时间轴，log:对数轴
			name:'焊接平均时长(h)'
		},
		series:[
			{
				name:'工时(h)',
				type:'bar',
	            barMaxWidth:20,//最大宽度
				data:array2
			}
		]
	}
	//为echarts对象加载数据
	charts.setOption(option);
	//隐藏动画加载效果
	charts.hideLoading();
 	$("#chartLoading").hide();
	$("#companyHourChart").width($("body").width()/2 -30);
	charts.resize();
}

function CompanyHourDatagrid(){
	setParam();
	var parent = $("#parent").val();
	$("#companyHourTable").datagrid( {
		fitColumns : true,
		height : $("body").height() / 2 -$("#caustHour_btn").height()-30,
		width : $("body").width(),
		idField : 'id',
		url : "companyChart/getCompanyHour?parent="+parent+chartStr,
		singleSelect : true,
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50],
		rownumbers : true,
		showPageList : false,
		pagination : true,
		columns : [ [ {
			field : 'name',
			title : '所属部门',
			width : 100,
			halign : "center",
			align : "left",
			formatter:function(value,row,index){
				array1.push(value);
				return value;
			}
		}, {
			field : 'jidgather',
			title : '焊口数量',
			width : 100,
			halign : "center",
			align : "left",
			formatter : function(value,row,index){
				if(value==0){
                 	array2.push(0);
             	}else{
                 	var num = (row.manhour/value).toFixed(2);
                 	array2.push(num);
             	}
				return value;
			}
		}, {
			field : 'manhour',
			title : '焊接平均工时(h)',
			width : 100,
			halign : "center",
			align : "left",
			formatter:function(value,row,index){
				if(row.jidgather==0){
                 	return 0;
             	}
				return (value/row.jidgather).toFixed(2);
			}
		}, {
			field : 'itemid',
			title : '事业id',
			width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}] ],
		rowStyler: function(index,row){
            if ((index % 2)!=0){
            	//处理行代背景色后无法选中
            	var color=new Object();
                return color;
            }
        }
	});
}

function serachcompanyHour(){
	commitChecked();
}

function classifyDatagrid(){
	var parent = $("#parent").val();
	$("#classify").datagrid( {
		fitColumns : true,
		height : $("#classifydiv").height(),
		width : $("body").width()*0.49,
		idField : 'fid',
		url : "companyChart/getItemHousClassify?item="+parent,
		singleSelect : true,
		pageSize : 5,
		pageList : [ 5, 10, 15, 20, 25],
		rownumbers : true,
		showPageList : false,
		pagination : true,
		columns : [ [{
			field : 'fid',
			hidden : true
		},{
			field : 'material',
			title : '上游材质',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'nextmaterial',
			title : '下游材质',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'wall_thickness',
			title : '上游璧厚',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'nextwall_thickness',
			title : '下游璧厚',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'external_diameter',
			title : '上游外径',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'nextExternal_diameter',
			title : '下游外径',
			width : 100,
			halign : "center",
			align : "left"
		}] ],
		toolbar : '#classify_btn',
		onLoadSuccess: function(){
			$("#classify").datagrid("selectRow",0);
			CompanyHourDatagrid();
			showCompanyHourChart(0);
		},
		rowStyler: function(index,row){
            if ((index % 2)!=0){
            	//处理行代背景色后无法选中
            	var color=new Object();
                return color;
            }
        }
	});
}

function commitChecked(){
	chartStr = "";
	search = "";
	$("#chartLoading").show();
	var rows = $("#classify").datagrid("getSelected");
	search += " (fmaterial='"+rows.material+"' and fexternal_diameter='"+rows.external_diameter+"' and fwall_thickness='"+rows.wall_thickness+"' and fnextExternal_diameter='"+rows.nextExternal_diameter+
	"' and fnextwall_thickness ='"+rows.nextwall_thickness+"' and fnext_material ='"+rows.nextmaterial+"')";
	chartStr += "&search="+search;
	setTimeout(function(){
		CompanyHourDatagrid();
		showCompanyHourChart(1);
	},500);
}

//监听窗口大小变化
window.onresize = function() {
	setTimeout(domresize, 500);
}

//改变表格高宽
function domresize() {
	$("#companyHourTable").datagrid('resize', {
		height : $("body").height() /2-$("#caustHour_btn").height()-30,
		width : $("body").width()
	});
	$("#classify").datagrid('resize', {
		height : $("#classifydiv").height(),
		width : $("body").width()/2
	});
	echarts.init(document.getElementById('companyHourChart')).resize();
}
