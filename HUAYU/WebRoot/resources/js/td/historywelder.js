/**
 * 
 */
        $(function(){
        	var width = $("#treeDiv").width();
    		$(".easyui-layout").layout({
    			onCollapse:function(){
    				$("#dg").datagrid({
    					height : $("#body").height(),
    					width : $("#body").width()
    				})
    			},
    			onExpand:function(){
    				$("#dg").datagrid({
    					height : $("#body").height(),
    					width : $("#body").width()
    				})
    			}
    		});
        	insframeworkTree();
		})   

       $(function(){
	    $("#dg").datagrid({
			height : $("#body").height()+30,
			width : $("#body").width(),
			idField : 'id',
			pageSize : 10,
			pageList : [ 10, 20, 30, 40, 50 ],
			url : "welders/getAllWelder",
			singleSelect : true,
			rownumbers : true,
			showPageList : false,
			pagination : true,
			fitColumns : true,
			columns : [ [ {
				field : 'id',
				title : '序号',
				width : 100,
				halign : "center",
				align : "left",
				hidden:true
			}, {
				field : 'name',
				title : '姓名',
				width : 80,
				halign : "center",
				align : "left"
			}, {
				field : 'welderno',
				title : '编号',
				width : 100,
				halign : "center",
				align : "left"
			}, {
				field : 'cellphone',
				title : '手机',
				width : 100,
				halign : "center",
				align : "left"
			},{
				field : 'leveid',
				title : '级别id',
				width : 100,
				halign : "center",
				align : "left",
				hidden:true
			}, {
				field : 'levename',
				title : '级别',
				width : 100,
				halign : "center",
				align : "left"
			},{
				field : 'cardnum',
				title : '卡号',
				width : 100,
				halign : "center",
				align : "left"
			},{
				field : 'quali',
				title : '资质id',
				width : 100,
				halign : "center",
				align : "left",
				hidden:true
			}, {
				field : 'qualiname',
				title : '资质',
				width : 100,
				halign : "center",
				align : "left"
			},/*{
				field : 'createdate',
				title : '创建时间',
				width : 100,
				halign : "center",
				align : "left"
			},{
				field : 'updatedate',
				title : '修改时间',
				width : 100,
				halign : "center",
				align : "left"
			},*/{
				field : 'owner',
				title : '部门id',
				width : 100,
				halign : "center",
				align : "left",
				hidden:true
			}, {
				field : 'ownername',
				title : '部门',
				width : 150,
				halign : "center",
				align : "left"
			},{
				field : 'back',
				title : '备注',
				width : 100,
				halign : "center",
				align : "left"
			},{
				field : 'edit',
				title : '编辑',
				width : 130,
				halign : "center",
				align : "left",
				formatter:function(value,row,index){
				var str = "";
				str += '<a id="wj" class="easyui-linkbutton" href="weldedjunction/getWeldJun?fid='+row.welderno+'"/>';
				return str;
				}}] ],
			toolbar : '#welderTable_btn',
			rowStyler: function(index,row){
	            if ((index % 2)!=0){
	            	//处理行代背景色后无法选中
	            	var color=new Object();
	                return color;
	            }
	        },
			onLoadSuccess:function(data){
		        $("a[id='wj']").linkbutton({text:'任务信息',plain:true,iconCls:'icon-search'});
		        }
		
	    });

})
                      
        function insframeworkTree(){
        	$("#myTree").tree({  
        		onClick : function(node){
        			$("#dg").datagrid('load',{
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
          	$("#dg").datagrid('resize', {
          		height : $("#body").height(),
          		width : $("#body").width()
          	});
          }