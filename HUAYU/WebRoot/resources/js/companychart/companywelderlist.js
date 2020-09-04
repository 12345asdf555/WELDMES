$(function(){
	CompanyloadsDatagrid();
})
var chartStr = "";
$(document).ready(function(){
	showCompanyLoadsChart(0);
})

function setParam(){
	var parent = $("#parent").val();
	var status = $("#status").val();
	var dtoTime1 = $("#dtoTime1").datetimebox('getValue');
	var dtoTime2 = $("#dtoTime2").datetimebox('getValue');
	chartStr = "?parent="+parent+"&dtoTime1="+dtoTime1+"&dtoTime2="+dtoTime2+"&status="+status;
}

var charts;
var array1 = new Array();
var array2 = new Array();
var Series = [];
function showCompanyLoadsChart(num){
	setParam();
	if(num == 0){
	   	//初始化echart实例
		charts = echarts.init(document.getElementById("companywmlistChart"));
	}
	//显示加载动画效果
	charts.showLoading({
		text: '稍等片刻,精彩马上呈现...',
		effect:'whirling'
	});
	option = {
		title:{
			text: ""//标题
		},
		tooltip:{
			trigger: 'axis',//坐标轴触发，即是否跟随鼠标集中显示数据
			formatter: function (params, ticket, callback) {
			    	return params[0].seriesName+"<br/>"+params[0].marker+params[0].name+":  "+params[0].value;
			}
		},
		legend:{
			data:['焊工工时(h)']
		},
		grid:{
			left:'50',//组件距离容器左边的距离
			right:'4%',
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
			data: array1
		},
		yAxis:{
			type: 'value'//value:数值轴，category:类目轴，time:时间轴，log:对数轴
		},
		series:[{
     		name :'焊工工时(h)',
     		type :'bar',//柱状图
            barMaxWidth:20,//最大宽度
     		data :array2
		},{
     		name :'焊工工时(h)',
     		type :'line',//折线图
     		data :array2,
     		itemStyle : {
     			normal: {
                    color:'#000000',  //折点颜色
     				label : {
     					show: true//显示每个折点的值
     				},
     				lineStyle:{  
                        color:'#000000'  //折线颜色
                    }  
     			}
     		}
     	}]
	}
	//为echarts对象加载数据
	charts.setOption(option);
	//隐藏动画加载效果
	charts.hideLoading();
	$("#companywmlistChart").width($("body").width()-$("#explain").width()-30);
	charts.resize();
}

function CompanyloadsDatagrid(){
	setParam();
	 $("#companywmlistTable").datagrid( {
			fitColumns : true,
			height : $("body").height() / 2 -$("#companywmlist_btn").height()-30,
			width : $("body").width(),
			idField : 'id',
			url : "companyChart/getCompanyWerderList"+chartStr,
			singleSelect : true,
			rownumbers : true,
			columns : [ [ {
				field : 'equipment',
				title : '焊工编号',
				width : 100,
				halign : "center",
				align : "left",
				formatter : function(value,row,index){
                  	array1.push(value);
                  	return value;
				}
			}, {
				field : 'num',
				title : '工时(h)',
				width : 100,
				halign : "center",
				align : "left",
				formatter:function(value,row,index){
                  	array2.push(value.toFixed(2));
					return value.toFixed(2);
				}
			}] ],
			rowStyler: function(index,row){
	            if ((index % 2)!=0){
                	//处理行代背景色后无法选中
                	var color=new Object();
                    return color;
	            }
	        },
			onLoadSuccess : function(index,row){
			    if(!charts){
			         return;
			    }
			    //更新数据
			    var option = charts.getOption();
			    option.series[0].data = array2;
			    option.series[1].data = array2;
			    option.xAxis[0].data = array1;
			    charts.setOption(option);
			 	$("#chartLoading").hide();
			}
	 })
}

function serachCompanywmlist(){
	$("#chartLoading").show();
	Series = [];
	array1 = new Array();
	array2 = new Array();
	chartStr = "";
	setTimeout(function(){
		CompanyloadsDatagrid(1);
	},500);
}

//监听窗口大小变化
window.onresize = function() {
	setTimeout(domresize, 500);
}

//改变表格高宽
function domresize() {
	$("#companywmlistTable").datagrid('resize', {
		height : $("body").height()/2-$("#companywmlist_btn").height()-30,
		width : $("body").width()
	});
	charts.resize();
}
