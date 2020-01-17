$(function(){
	t1 = $("#parenttime1").val();
	t2 = $("#parenttime2").val();
	if(t1){
		$("#dtoTime1").datetimebox('setValue',t1);
	}
	if(t2){
		$("#dtoTime2").datetimebox('setValue',t2);
	}
	dgDatagrid();
})

var chartStr = "",dtoTime1,dtoTime2,fauit,id,t1,t2;
function setParam(){
	dtoTime1 = $("#dtoTime1").datetimebox('getValue');
	dtoTime2 = $("#dtoTime2").datetimebox('getValue');
	fauit = $("#fauit").val();
	id = $("#id").val();
	chartStr += "?fauit="+fauit+"&id="+id+"&dtoTime1="+dtoTime1+"&dtoTime2="+dtoTime2;
}

function dgDatagrid(){
	setParam();
	var column = new Array();
	$.ajax({  
        type : "post",  
        async : false,
        url : "datastatistics/getFauitDeatil"+chartStr,
        data : {},  
        dataType : "json", //返回数据形式为json  
        success : function(result) {
            if (result) {
            	 for(var i=0;i<result.ary.length;i++){
        			 column.push({field:"t"+i,title:result.ary[i].title,width:100,halign : "center",align : "left",sortable : true,
        				sorter : function(a,b){
        					return (a>b?1:-1);
        				}});
             	 }
            	 var grid = {
            			 fitColumns : true,
        				 height : $("#body").height(),
        				 width : $("#body").width(),
        				 url : "datastatistics/getFauitDeatil"+chartStr,
        				 pageSize : 10,
        				 pageList : [ 10, 20, 30, 40, 50 ],
        				 singleSelect : true,
        				 rownumbers : true,
        				 showPageList : false,
        				 pagination : true,
        				 remoteSort : false,
        				 nowrap : false,
        				 columns : [column],
        				 rowStyler: function(index,row){
        					 if ((index % 2)!=0){
        		            	 //处理行代背景色后无法选中
        		            	 var color=new Object();
        		                 color.class="rowColor";
        		                 return color;
        		             }
        		         },
        		         onBeforeLoad : function(param){
     		        		$("#chartLoading").hide();
        		         }
                 };
            	 $('#dg').datagrid(grid);  
            }  
        },  
        error : function(errorMsg) {  
            alert("数据请求失败，请联系系统管理员!");  
        }  
   }); 
}

function serach(){
	$("#parenttime1").val("");
	$("#parenttime2").val("");
	$("#chartLoading").show();
	chartStr = "";
	setTimeout(function(){
		dgDatagrid();
	},500);
}

function getBack(){
	var url = "datastatistics/goFauit";
	var img = new Image();
    img.src = url;  // 设置相对路径给Image, 此时会发送出请求
    url = img.src;  // 此时相对路径已经变成绝对路径
    img.src = null; // 取消请求
	window.location.href = encodeURI(url)+"?t1="+t1+"&t2="+t2+"&fauit="+fauit;
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