/**
 * 
 */
var data1;
var socket;
 $(function(){
	$.ajax({  
	      type : "post",  
	      async : false,
	      url : "td/AllTdbf",  
	      data : {},  
	      dataType : "json", //返回数据形式为json  
	      success : function(result) {
	          if (result) {
	        	  data1 = eval(result.web_socket);
	          }  
	      },
	      error : function(errorMsg) {  
	          alert("数据请求失败，请联系系统管理员!");  
	      }  
	 });
	$("#dg").datagrid( {
		height : $("#body").height()*0.8,
		width : $("#body").width(),
		idField : 'id',
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		url : "weldingMachine/getWedlingMachineList",
		checkbox : true,
		rownumbers : true,
		showPageList : false, 
        columns : [ [ {
		    field:'ck',
			checkbox:true
		},{
			field : 'id',
			title : '序号',
			width : 50,
			halign : "center",
			align : "left",
			hidden:true
		}, {
			field : 'equipmentNo',
			title : '固定资产编号',
			width : 80,
			halign : "center",
			align : "left"
		}, {
			field : 'typeName',
			title : '设备类型',
			width : 80,
			halign : "center",
			align : "left"
		}, {
			field : 'joinTime',
			title : '入厂时间',
			width : 150,
			halign : "center",
			align : "left"
		}, {
			field : 'insframeworkName',
			title : '所属项目',
			width : 80,
			halign : "center",
			align : "left"
		}, {
			field : 'statusName',
			title : '状态',
			width : 80,
			halign : "center",
			align : "left"
		} , {
			field : 'manufacturerName',
			title : '厂家',
			width : 150,
			halign : "center",
			align : "left"
		}, {
			field : 'isnetworking',
			title : '是否在网',
			width : 80,
			halign : "center",
			align : "left"
		}, {
			field : 'gatherId',
			title : '采集序号',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'position',
			title : '位置',
			width : 100,
			halign : "center",
			align : "left"
		}, {
			field : 'ip',
			title : 'ip地址',
			width : 100,
			halign : "center",
			align : "left"
		},{
			field : 'statusId',
			title : '状态id',
			width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'isnetworkingId',
			title : '是否联网id',
			width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'manufacturerId',
			title : '厂商id',
			width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'typeId',
			title : '类型id',
			width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}, {
			field : 'insframeworkId',
			title : '项目id',
			width : 100,
			halign : "center",
			align : "left",
			hidden: true
		}] ],
		rowStyler: function(index,row){
            if ((index % 2)!=0){
            	//处理行代背景色后无法选中
            	var color=new Object();
                color.class="rowColor";
                return color;
            }
		},
		fitColumns : true,
		pagination : true
	});
 })
 
 function save(){
     var rows = $("#dg").datagrid("getSelections");
     if(rows.length==0){
  	   alert("请选择焊机");
     }else{
     var str="";
		for(var i=0; i<rows.length; i++){
			str += rows[i].id+",";
			}
      $.ajax({  
		      type : "post",  
		      async : false,
		      url : "wps/giveWM?mid="+str,  
		      data : {},  
		      dataType : "json", //返回数据形式为json  
		      success : function(result) {
		          if (result) {
		        	  var fdata = eval(result);
		      		if(typeof(WebSocket) == "undefined") {
		    			alert("您的浏览器不支持WebSocket");
		    			return;
		    		}
		    		socket = new WebSocket(data1);
		    		//打开事件
		    		socket.onopen = function() {
		    			socket.send(fdata.fsdata);
		    			$.messager.alert("提示", "下发成功");
		    			var url = "wps/AllWps";
		    			var img = new Image();
		    		    img.src = url;  // 设置相对路径给Image, 此时会发送出请求
		    		    url = img.src;  // 此时相对路径已经变成绝对路径
		    		    img.src = null; // 取消请求
		    			window.location.href = encodeURI(url);
		    		};
		    		//获得消息事件
		    		socket.onmessage = function(msg) {};
		    		//关闭事件
		    		socket.onclose = function(e) {};
		    		//发生了错误事件
		    		socket.onerror = function() {}
		    		$("#btnSend").click(function() {
		    			socket.send("强哥");
		    		});

		    		$("#btnClose").click(function() {
		    			socket.close();
		    		});
		        	  $.messager.alert("提示", "下发成功");
						var url = "wps/AllWps";
						var img = new Image();
					    img.src = url;  // 设置相对路径给Image, 此时会发送出请求
					    url = img.src;  // 此时相对路径已经变成绝对路径
					    img.src = null; // 取消请求
						window.location.href = encodeURI(url);
		          }  
		      },
		      error : function(errorMsg) {  
		          alert("数据请求失败，请联系系统管理员!");  
		      }  
		 });
     }
}
