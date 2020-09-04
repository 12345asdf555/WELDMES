$(function(){
	$("#dtoTime1").next().hide();
	$("#dtoTime2").next().hide();
})
var chartStr = "";
$(document).ready(function(){
	showMachine(1,"left1");
	showMachine(0,"right1");
	showWelder(1,"left2");
	showWelder(0,"right2");
})

function setParam(){
	var dtoTime1 = $("#dtoTime1").datetimebox('getValue');
	var dtoTime2 = $("#dtoTime2").datetimebox('getValue');
	chartStr = "&dtoTime1="+dtoTime1+"&dtoTime2="+dtoTime2;
}
var charts1,charts2;
function showMachine(status,id){
	setParam();
	var array1 = new Array();
	var array2 = new Array();
	 $.ajax({  
         type : "post",  
         async : false,
         url : "companyChart/getCompanyWmList?status="+status+chartStr,
         data : {},  
         dataType : "json", //返回数据形式为json  
         success : function(result) {  
             if (result) {
            	 for(var i=0;i<result.rows.length;i++){
            		 if(result.rows[i].equipment==undefined){
            			 result.rows[i].equipment = "未定义";
            		 }
                  	array1.push(result.rows[i].equipment);
                  	array2.push(result.rows[i].num.toFixed(2));
            	 }
             }  
         },  
        error : function(errorMsg) {  
             alert("图表请求数据失败啦!");  
         }  
    }); 
   	//初始化echart实例
	charts1 = echarts.init(document.getElementById(id));
	//显示加载动画效果
	charts1.showLoading({
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
			data:['焊机工时(h)']
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
     		name :'焊机工时(h)',
     		type :'bar',//柱状图
            barMaxWidth:20,//最大宽度
     		data :array2
		},{
     		name :'焊机工时(h)',
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
	charts1.setOption(option);
	//隐藏动画加载效果
	charts1.hideLoading();
	chartStr="";
//	$("#"+id).width($("body").width()-$("#explain").width()-30);
//	charts1.resize();
}

function showWelder(status,id){
	setParam();
	var array1 = new Array();
	var array2 = new Array();
	 $.ajax({  
         type : "post",  
         async : false,
         url : "companyChart/getCompanyWerderList?status="+status+chartStr,
         data : {},  
         dataType : "json", //返回数据形式为json  
         success : function(result) {  
             if (result) {
            	 for(var i=0;i<result.rows.length;i++){
                  	array1.push(result.rows[i].equipment);
                  	array2.push(result.rows[i].num.toFixed(2));
            	 }
             }  
         },  
        error : function(errorMsg) {  
             alert("图表请求数据失败啦!");  
         }  
    }); 
   	//初始化echart实例
	charts2 = echarts.init(document.getElementById(id));
	//显示加载动画效果
	charts2.showLoading({
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
			bottom:'40',
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
	charts2.setOption(option);
	//隐藏动画加载效果
	charts2.hideLoading();
	chartStr="";
//	$("#"+id).width($("body").width()-$("#explain").width()-30);
//	charts2.resize();
}
//监听窗口大小变化
window.onresize = function() {
	setTimeout(domresize, 500);
}

//改变表格高宽
function domresize() {
	$("#chartdiv").css({'height':'100%','width':'100%'});
	charts1.resize();
	charts2.resize();
}

