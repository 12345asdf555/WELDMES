$(function(){
	insframeworkDatagrid();
	insframeworkTree();
	var width = $("#treeDiv").width();
	$(".easyui-layout").layout({
		onCollapse:function(){
			$("#insframeworkTable").datagrid( {
				height : $("#body").height(),
				width : $("#body").width()
			})
		},
		onExpand:function(){
			$("#insframeworkTable").datagrid( {
				height : $("#body").height(),
				width : $("#body").width()
			})
		}
	});
});

function insframeworkDatagrid(){
	$("#insframeworkTable").datagrid( {
		fitColumns : true,
		height : $("#body").height(),
		width : $("#body").width(),
		idField : 'id',
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		url : "insframework/getInsframeworkList",
		singleSelect : true,
		rownumbers : true,
		showPageList : false,
		columns : [ [ {
			field : 'id',
			title : '序号',
			width : 100,
			halign : "center",
			align : "left",
			hidden:true
		}, {
			field : 'name',
			title : '名称',
			width : 150,
			halign : "center",
			align : "left"
		}, {
			field : 'logogram',
			title : '简写',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'code',
			title : '编码',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'parent',
			title : '上级项目',
			width : 150,
			halign : "center",
			align : "left"
		}, {
			field : 'type',
			title : '类型',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'typeid',
			title : '类型id',
			width : 100,
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'parentid',
			title : '父类id',
			width : 100,
			halign : "center",
			align : "left",
			hidden : true
		}, {
			field : 'edit',
			title : '编辑',
			width : 200,
			halign : "center",
			align : "left",
			formatter:function(value,row,index){
				var str = "";
				str += '<a id="edit" class="easyui-linkbutton" href="javascript:editInsf('+row.id+','+true+')"/>';
				str += '<a id="remove" class="easyui-linkbutton" href="javascript:editInsf('+row.id+','+false+')"/>';
				return str;
			}
		}] ],
		pagination : true,
		nowrap : false,
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
}

//删除/修改权限处理
function editInsf(id,flags){
		$.ajax({  
	        type : "post",  
	        async : false,
	        url : "insframework/getUserAuthority?id="+id,  
	        data : {},  
	        dataType : "json", //返回数据形式为json  
	        success : function(result) {
	            if (result) {
            		if(result.afreshLogin==null || result.afreshLogin==""){
	            		if(result.flag){
	            			var url = "";
	            			if(flags){
//	            				url = "insframework/goeditInsframework?id="+id;
	            				editInsframework();
	            			}else{
//	            				url = "insframework/goremoveInsframework?id="+id;
	            				removeInsframework();
	            			}
//		       				var img = new Image();
//		       			    img.src = url;  // 设置相对路径给Image, 此时会发送出请求
//		       			    url = img.src;  // 此时相对路径已经变成绝对路径
//		       			    img.src = null; // 取消请求
//		       				window.location.href = encodeURI(url);
	            		}else{
	            			alert("对不起，您不能对你的上级或同级部门的数据进行编辑");
	            		}
	            	}else{
	            		$.messager.confirm("提示",result.afreshLogin,function(data){
  		        		 if(data){
  		        			var url = "login.jsp";
  		       				var img = new Image();
  		       			    img.src = url;  // 设置相对路径给Image, 此时会发送出请求
  		       			    url = img.src;  // 此时相对路径已经变成绝对路径
  		       			    img.src = null; // 取消请求
   		     				 top.location.href = url;
   		     			 }
  		     		 });
  		        }
	           }
	        },  
	        error : function(errorMsg) {  
	            alert("数据请求失败，请联系系统管理员!");  
	        }  
	   });
}


function insframeworkTree(){
	$("#myTree").tree({  
		onClick : function(node){
			$("#insframeworkTable").datagrid('load',{
				"parent" : node.id
			})
		 }
	})
}

//监听窗口大小变化
window.onresize = function() {
	setTimeout(domresize, 500);
}

//改变表格高宽
function domresize() {
	$("#insframeworkTable").datagrid('resize', {
		height : $("#body").height(),
		width : $("#body").width()
	});
}



