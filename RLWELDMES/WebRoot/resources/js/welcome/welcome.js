$(function(){
	$("#dtoTime1").next().hide();
	$("#dtoTime2").next().hide();
	getNowDate();
	getHierarchy();
	caustclick(1);
})

var companylen=0 ,flagid;
function getHierarchy(){
	$.ajax({
		type:'post',
		asyn:false,
		url:'hierarchy/getHierarchy',
		dataType:'json',
		success:function(result){
			var str1 = "", str2 = "";
			str1 = '<div class="wcrightinsframework" id="company'+i+'" onclick="companyclick('+i+')">'+
			'<div class="wcrighttitle">'+result.iname+'</div><div class="wcrighticon"></div></div>';
			$("#autoshowdiv").append(str1);
			return;
			companylen = result.ary1.length;
			caustclick(result.ary2[0].caustid);
			for(var i=0;i<result.ary1.length;i++){
				//显示公司
				str1 = '<div class="wcrightinsframework" id="company'+i+'" onclick="companyclick('+i+')">'+
					'<div class="wcrighttitle">'+result.ary1[i].companyname+'</div><div class="wcrighticon"></div></div>';
				$("#autoshowdiv").append(str1);
				str2 = '<div class="wcul" style="padding-bottom:30px;" id="caust'+i+'"  hidden="true"><ul>';
				var flag = 0;
				for(var x=0;x<result.ary2.length;x++){
					if(result.ary1[i].companyid == result.ary2[x].companyid ){
						str2 += '	<li onclick="caustclick('+result.ary2[x].caustid+')">'+result.ary2[x].caustname+'</li>';
						flag = 1;
					}
				}
				if(flag==1){
					//显示项目部
					str2 += '</ul></div>';
				}else{
					str2 = '<div class="wcul" style="padding-bottom:40px;" id="caust'+i+'"  hidden="true"><ul><li>暂无</li></ul></div>';
				}
				$("#company"+i).after(str2);
				rightshow();
			}
		}
	})
}

function getNowDate(){
	//获取当前时间
	var now = new Date();  
	now.setDate(now.getDate());
    var year = now.getFullYear();//年  
    var month = now.getMonth() + 1;//月  
    var day = now.getDate();//日
    
    var nowtime = year + "-";
      
    if(month < 10){
        nowtime += "0";
    }
    nowtime += month + "-";
      
    if(day < 10){
        nowtime += "0";
    }          
    nowtime += day + " ";
	$(".wcdate").append(nowtime);
}

//右侧初始状态
function rightshow(){
	$("#mesimg").css("transform","rotate(180deg)");//展开按钮旋转180度
	$("#onlineimg").css("transform","rotate(180deg)");
	$("#imgcompany0").css("transform","rotate(180deg)");
	$("#caust0").slideDown();
}

//任务情况点击事件
function onlineclick(){
	if($("#wconline").is(":hidden")){
	    $("#wconline").slideDown();
		$("#onlineimg").css("transform","rotate(180deg)");
	}else{
	    $("#wconline").slideUp();
		$("#onlineimg").css("transform","rotate(0deg)");
	}
}

//公司信息栏点击事件
function companymesclick(){
	if($("#company0").is(":hidden")){
		for(var i=0;i<companylen;i++){
			$("#company"+i).slideDown();
			$("#imgcompany"+i).css("transform","rotate(0deg)");
		}
		$("#mesimg").css("transform","rotate(180deg)");
	}else{
		for(var i=0;i<companylen;i++){
			$("#company"+i).slideUp();
			$("#caust"+i).slideUp();
		}
		$("#mesimg").css("transform","rotate(0deg)");
	}
}

function companyclick(index){
	//关闭其它公司层内容
	for(var i=0;i<companylen;i++){
		$("#imgcompany"+i).css("transform","rotate(0deg)");
		$("#caust"+i).slideUp();
	}
	if($("#caust"+index).is(":hidden")){
		$("#caust"+index).slideDown();
		$("#imgcompany"+index).css("transform","rotate(180deg)");
	}else{
		$("#caust"+index).slideUp();
		$("#imgcompany"+index).css("transform","rotate(0deg)");
	}
}

function caustclick(id){
	flagid = id;
	array1 = new Array();
	array2 = new Array();
	array3 = new Array();
	array4 = new Array();
	ary1 = new Array();
	ary2 = new Array();
	Series = [];
	workRankDatagrid(id);
	useRatio(id);
	loadRate(id);
}

function workRankDatagrid(id){
	$("#workRankTable").datagrid( {
		fitColumns : true,
		scrollbarSize:0,//舍去表格右侧多余留白
		height : $("#wcleft1_2").height(),
		width : $("#wcleft1_2").width()-'2%',
		url : "datastatistics/getWorkRank?parent="+id,
		singleSelect : true,
		columns : [ [ {
			field : 'rownum',
			title : '排名',
			width : 100,
			halign : "center",
			align : "center",
			sortable : true,
			sorter : function(a,b){
				return (a>b?1:-1);
			}
		}, {
			field : 'welderno',
			title : '工号',
			width : 100,
			halign : "center",
			align : "center",
			sortable : true,
			sorter : function(a,b){
				return (a>b?1:-1);
			}
		}, {
			field : 'name',
			title : '姓名',
			width : 100,
			halign : "center",
			align : "center",
			sortable : true,
			sorter : function(a,b){
				return (a>b?1:-1);
			}
		}, {
			field : 'item',
			title : '班组',
			width : 150,
			halign : "center",
			align : "center",
			sortable : true,
			sorter : function(a,b){
				return (a>b?1:-1);
			}
		}, {
			field : 'hour',
			title : '累计焊接工时',
			width : 100,
			halign : "center",
			align : "center",
			sortable : true,
			sorter : function(a,b){
				return (a>b?1:-1);
			},
			formatter : function(value,row,index){
				return value + "小时";
			}
		}] ]
	});
}


var array1 = new Array();
var array2 = new Array();
var array3 = new Array();
var array4 = new Array();
function useRatio(id){
	$.ajax({
		type : 'post',
		asyn : false,
		url : 'datastatistics/getUseRatio?parent='+id,
		dataType : 'json',
		success : function(result){
			for(var i=0;i<result.ary.length;i++){
				array1.push(result.ary[i].itemname);
				array2.push(result.ary[i].worknum);
				array3.push(result.ary[i].machinenum);
				array4.push(result.ary[i].useratio);
			}
			usechart();
		},
		error : function(errorMsg){
		      alert("数据请求失败，请联系系统管理员!");  
		}
	});
}

var charts1,charts2,flag1=0,flag2=0;
var colors = ['#f6c951', '#b6b2d8', '#595757'];
function usechart(){
	if(flag1 == 0){
		flag1 = 1;
	  	//初始化echart实例
		charts1 = echarts.init(document.getElementById("useRatioChart"));
	}
	//显示加载动画效果
	charts1.showLoading({
		text: '稍等片刻,精彩马上呈现...',
		effect:'whirling'
	});
	option = {
		color : colors,
		tooltip:{
			trigger: 'axis'//坐标轴触发，即是否跟随鼠标集中显示数据
		},
		legend:{
			data:['工作设备数','设备总数','设备利用率'],
			backgroundColor:'#dfdfdf',
			padding:[5,500,5,60],//上右下左，目的为产生说明与图表分离的假象
			itemGap:30,//项与项间距
			left:0
		},
		grid:{
			left:'0%',//组件距离容器左边的距离
			right:'0%',
			bottom:'0%',
			containLaber:true//区域是否包含坐标轴刻度标签
		},
		xAxis:{
			type:'category',
			data: array1,
			z:9, //同css的z-index
            axisLabel:{
            	inside:true//刻度显示在内侧
            }
		},
		yAxis:[{
			type: 'value',
			name: '             数量(台)',//内边距属性无效只能用空格代替
	        nameTextStyle : {
	            color: "989a9c" //name颜色
	        },
            min: 0,
            max: 100,
            interval: 20,
            axisLabel:{
            	inside:true,//刻度显示在内侧
            	textStyle: {
            		color:'#989a9c'//y轴文字颜色
            	}
            },
            axisLine:{
                lineStyle: {
                    color: '#f3f3f3'//y轴颜色
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#f3f3f3'//网格线色
                }
            }
		},{
			type: 'value',
			name: '利用率(%)                ',
            nameTextStyle:{
                padding: [0,50,0,0]
            },
            min: 0,
            max: 100,
            interval: 20,
            axisLabel:{
            	inside:true,//刻度显示在内侧
            	textStyle: {
            		color:'#989a9c'//y轴文字颜色
            	}
            },
            splitLine: {
                lineStyle: {
                    color: '#f3f3f3'//网格线色
                }
            }
		}],
		series:[{
     		name :'工作设备数',
     		type :'bar',//柱状图
            barMaxWidth:25,//最大宽度
     		data :array2
		},{
     		name :'设备总数',
     		type :'bar',//柱状图
            barMaxWidth:25,//最大宽度
     		data :array3
		},{
     		name :'设备利用率',
     		type :'line',//折线图
       		symbol: 'circle',//实心折点
            yAxisIndex: 1,
     		data :array4
     	}]
	}
	//为echarts对象加载数据
	charts1.setOption(option);
	//隐藏动画加载效果
	charts1.hideLoading();
}

var ary1 = new Array();
var ary2 = new Array();
var Series = [];
function loadRate(id){
	$.ajax({
		type : 'post',
		asyn : false,
		url : 'datastatistics/getLoadRate?parent='+id+'&time1='+$("#dtoTime1").combobox('getValue')+'&time2='+$("#dtoTime2").combobox('getValue'),
		dataType : 'json',
		success : function(result){
			for(var i=0;i<result.time.length;i++){
				ary1.push(result.time[i].weldtime);
			}
			for(var i=0;i<result.ary.length;i++){
				ary2.push(result.ary[i].itemname);
				Series.push({
               		name : result.ary[i].itemname,
               		type :'line',
               		data :result.ary[i].hour,
               		symbol: 'circle'//实心折点
               	});
			}
			loadchart();
		},
		error : function(errorMsg){
		      alert("数据请求失败，请联系系统管理员!");  
		}
	});
}


function loadchart(){
	if(flag2 == 0){
		flag2 = 1;
	  	//初始化echart实例
		charts2 = echarts.init(document.getElementById("loadRateChart"));
	}
	//显示加载动画效果
	charts2.showLoading({
		text: '稍等片刻,精彩马上呈现...',
		effect:'whirling'
	});
	option = {
		tooltip:{
			trigger: 'axis'//坐标轴触发，即是否跟随鼠标集中显示数据
		},
		legend:{
			data: ary2,
			backgroundColor:'#dfdfdf',
			padding:[5,500,5,60],//上右下左，目的为产生说明与图表分离的假象
			itemGap:30,//项与项间距
			left:0
		},
		grid:{
			left:'0%',//组件距离容器左边的距离
			right:'0%',
			bottom:'0%',
			containLaber:true//区域是否包含坐标轴刻度标签
		},
		xAxis:{
			type:'category',
			data: ary1,
			z:9, //同css的z-index
            axisLabel:{
            	inside:true//刻度显示在内侧
            }
		},
		yAxis:[{
			type: 'value',
			name: '               符合率(%)',//内边距属性无效只能用空格代替
	        nameTextStyle : {
	            color: "989a9c" //name颜色
	        },
            min: 0,
            max: 100,
            interval: 20,
            axisLabel:{
            	inside:true,//刻度显示在内侧
            	textStyle: {
            		color:'#989a9c'//y轴文字颜色
            	}
            },
            axisLine:{
                lineStyle: {
                    color: '#f3f3f3'//y轴颜色
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#f3f3f3'//网格线色
                }
            }
		}],
		series:[]
	}
	option.series = Series;	
	//彻底清理图表
	charts2.clear();
	//为echarts对象加载数据
	charts2.setOption(option);
	//隐藏动画加载效果
	charts2.hideLoading();
}

function fullScreen(){
	window.open("fullScreen.jsp");
}

function closeScreen(){
	window.close();
}

//每半小时刷新一次
window.setInterval(function() {
	caustclick(flagid);
}, 1800000)

//监听窗口大小变化
window.onresize = function() {
	setTimeout(domresize, 500);
}

//改变表格高宽
function domresize() {
	$("#workRankTable").datagrid('resize', {
		height : $("#wcleft1_2").height(),
		width : $("#wcleft1_2").width()-'2%'
	});
	charts1.resize();
	charts2.resize();
	weldercharts.resize();
	personcharts.resize();
}