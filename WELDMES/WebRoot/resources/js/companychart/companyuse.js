$(function(){
	typecombobox();
	CaustUseDatagrid();
})
var chartStr = "";
$(document).ready(function(){
	showcompanyUseChart(0);
})

function setParam(){
	var type = $('#type').combobox('getValue');
	var dtoTime1 = $("#dtoTime1").datetimebox('getValue');
	var dtoTime2 = $("#dtoTime2").datetimebox('getValue');
	chartStr = "?type="+type+"&dtoTime1="+dtoTime1+"&dtoTime2="+dtoTime2;
}

var charts;
var array1 = new Array();
var array2 = new Array();
function showcompanyUseChart(num){
	setParam();
	 $.ajax({  
        type : "post",  
        async : false, //同步执行  
        url : "companyChart/getCompanyUse"+chartStr,
        data : {},  
        dataType : "json", //返回数据形式为json  
        success : function(result) {  
            if (result) {  
                for(var i=0;i<result.rows.length;i++){
                	array1.push(result.rows[i].fname);
                	array2.push(result.rows[i].time);
                }
            }  
        },  
       error : function(errorMsg) {  
            alert("图表请求数据失败啦!");  
        }  
   }); 
	if(num == 0){
	   	//初始化echart实例
		charts = echarts.init(document.getElementById("companyUseChart"));
	}
	//显示加载动画效果
	charts.showLoading({
		text: '稍等片刻,精彩马上呈现...',
		effect:'whirling'
	});
	option = {
		title:{
			text: ""
		},
		tooltip:{
			trigger: 'axis'//坐标轴触发，即是否跟随鼠标集中显示数据
		},
		legend:{
			data:['时长(h)']
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
		series:[
			{
				name:'时长(h)',
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
	$("#companyUseChart").width($("body").width()-$("#explain").width()-30);
	charts.resize();
}

function CaustUseDatagrid(){
	setParam();
	$("#companyUseTable").datagrid( {
		fitColumns : true,
		height : $("body").height() / 2 -$("#companyUse_btn").height()-30,
		width : $("body").width(),
		idField : 'id',
		url : "companyChart/getCompanyUse"+chartStr,
		singleSelect : true,
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50],
		rownumbers : true,
		showPageList : false,
		pagination : true,
		columns : [ [ {
			field : 'fname',
			title : '厂家',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'time',
			title : '焊接平均时长(h)',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'num',
			title : '数量',
			width : 100,
			halign : "center",
			align : "left"
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

function typecombobox(){
	$.ajax({  
      type : "post",  
      async : false,
      url : "companyChart/getCaust",  
      data : {},  
      dataType : "json", //返回数据形式为json  
      success : function(result) {  
          if (result) {
              var optionStr = '';
              for (var i = 0; i < result.ary.length; i++) {  
                  optionStr += "<option value=\"" + result.ary[i].id + "\" >"  
                          + result.ary[i].name + "</option>";
              }
              $("#type").html(optionStr);
          }  
      },  
      error : function(errorMsg) {  
          alert("数据请求失败，请联系系统管理员!");  
      }  
	}); 
	$("#type").combobox();
	var data = $("#type").combobox('getData');
	$("#type").combobox('select',data[0].value);
}

function serachcompanyUse(){
	$("#chartLoading").show();
	array1 = new Array();
	array2 = new Array();
	chartStr = "";
	setTimeout(function(){
		CaustUseDatagrid();
		showcompanyUseChart(1);
	},500);
}

//监听窗口大小变化
window.onresize = function() {
	setTimeout(domresize, 500);
}

//改变表格高宽
function domresize() {
	$("#companyUseTable").datagrid('resize', {
		height : $("body").height()/2-$("#companyUse_btn").height()-30,
		width : $("body").width()
	});
	charts.resize();
}
