$(function(){
	if($("#t1").val()){
		$("#dtoTime1").datetimebox('setValue',$("#t1").val());
	}
	if($("#t2").val()){
		$("#dtoTime2").datetimebox('setValue',$("#t2").val());
	}
	fauitcombobox();
	dgDatagrid();
})

var chartStr = "",dtoTime1,dtoTime2,fauit;
function setParam(){
	dtoTime1 = $("#dtoTime1").datetimebox('getValue');
	dtoTime2 = $("#dtoTime2").datetimebox('getValue');
	fauit = $("#fauit").combobox('getValue');
	chartStr += "?fauit="+fauit+"&dtoTime1="+dtoTime1+"&dtoTime2="+dtoTime2;
}

function dgDatagrid(){
	setParam();
	var column = new Array();
	$.ajax({  
        type : "post",  
        async : false,
        url : "datastatistics/getFauit"+chartStr,
        data : {},  
        dataType : "json", //返回数据形式为json  
        success : function(result) {
            if (result) {
            	column.push({field:"t0",title:result.ary[0].title,width:100,halign : "center",align : "left",sortable : true,hidden:true});
            	 for(var i=1;i<result.ary.length;i++){
            		 if(i==result.ary.length-1){
                		 column.push({field:"t"+i,title:result.ary[i].title,width:100,halign : "center",align : "left",sortable : true,
             				sorter : function(a,b){
             					return (a>b?1:-1);
             				},formatter : function(value,row,index){
             					return "<a href='datastatistics/goFauitDetail?id="+row.t0+"&time1="+dtoTime1+"&time2="+dtoTime2+"&fauit="+fauit+"'>"+value+"</>";
             				}});
            		 }else{
            			 column.push({field:"t"+i,title:result.ary[i].title,width:100,halign : "center",align : "left",sortable : true,
            				sorter : function(a,b){
            					return (a>b?1:-1);
            				}});
            		 }
             	 }
            	 var grid = {
            			 fitColumns : true,
        				 height : $("#body").height(),
        				 width : $("#body").width(),
        				 url : "datastatistics/getFauit"+chartStr,
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

function fauitcombobox(){
	$.ajax({  
      type : "post",  
      async : false,
      url : "datastatistics/getAllFauit", 
      data : {},  
      dataType : "json", //返回数据形式为json  
      success : function(result) {  
          if (result) {
	          var optionStr = '';
	          for (var i = 0; i < result.ary.length; i++) {  
	              optionStr += "<option value=\"" + result.ary[i].id + "\" >"  
	                      + result.ary[i].name + "</option>";
	          }
              $("#fauit").html(optionStr);
          }  
      },  
      error : function(errorMsg) {  
          alert("数据请求失败，请联系系统管理员!");  
      }  
	}); 
	$("#fauit").combobox();
	$('#fauit').combobox('select',$('#fauitid').val());
}

function serach(){
	$("#t1").val("");
	$("#t2").val(""); 
	$("#chartLoading").show();
	chartStr = "";
	setTimeout(function(){
		dgDatagrid();
	},500);
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