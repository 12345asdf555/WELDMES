var chartStr = "";
$(document).ready(function(){
	showWorkTime();
	showWorkNum();
})

function setParam(){
	var dtoTime1 = $("#dtoTime1").datetimebox('getValue');
	var dtoTime2 = $("#dtoTime2").datetimebox('getValue');
	chartStr = "&dtoTime1="+dtoTime1+"&dtoTime2="+dtoTime2;
}
var charts1,charts2;
function showWorkTime(){
	setParam();
	var array1 = new Array();
	var array2 = new Array();
	 $.ajax({  
         type : "post",  
         async : false,
         url : "companyChart/getComprehensiveTimeAndNum?status=0"+chartStr,
         data : {},  
         dataType : "json", //返回数据形式为json  
         success : function(result) {  
             if (result) {
            	 for(var i=0;i<result.rows.length;i++){
            		 if(result.rows[i].equipment==undefined){
            			 result.rows[i].equipment = "未定义";
            		 }
                  	array1.push(result.rows[i].equipment);
                  	array2.push(parseFloat(result.rows[i].num).toFixed(2));
            	 }
             }  
         },  
        error : function(errorMsg) {  
             alert("图表请求数据失败啦!");  
         }  
    }); 
   	//初始化echart实例
	charts1 = echarts.init(document.getElementById("left1"));
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
			data:['工作站工作时长(h)']
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
     		name :'工作站工作时长(h)',
     		type :'bar',//柱状图
            barMaxWidth:20,//最大宽度
     		data :array2
		},{
     		name :'工作站工作时长(h)',
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

function showWorkNum(){
	setParam();
	var array1 = new Array();
	var array2 = new Array();
	 $.ajax({  
         type : "post",  
         async : false,
         url : "companyChart/getComprehensiveTimeAndNum?status=1"+chartStr,
         data : {},  
         dataType : "json", //返回数据形式为json  
         success : function(result) {  
             if (result) {
            	 for(var i=0;i<result.rows.length;i++){
            		 if(result.rows[i].equipment==undefined){
            			 result.rows[i].equipment = "未定义";
            		 }
                  	array1.push(result.rows[i].equipment);
                  	array2.push(parseFloat(result.rows[i].num).toFixed(0));
            	 }
             }  
         },  
        error : function(errorMsg) {  
             alert("图表请求数据失败啦!");  
         }  
    }); 
   	//初始化echart实例
	charts1 = echarts.init(document.getElementById("right1"));
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
			data:['工作站工件数量']
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
     		name :'工作站工件数量',
     		type :'bar',//柱状图
            barMaxWidth:20,//最大宽度
     		data :array2
		},{
     		name :'工作站工件数量',
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

function showWelder(status,id){}
//监听窗口大小变化
window.onresize = function() {
	setTimeout(domresize, 500);
}

function serachComprehensive(){
	showWorkTime();
	showWorkNum();
}

//改变表格高宽
function domresize() {
	$("#chartdiv").css({'height':'100%','width':'100%'});
	charts1.resize();
	charts2.resize();
}

