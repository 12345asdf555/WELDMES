$(function(){
	//判断Session是否过期
	var afresh = $("#afresh").val();
	if(afresh!=null && afresh!=""){
		$.messager.confirm("提示",afresh,function(result){
			if(result){
				var url = "login.jsp";
 				var img = new Image();
 			    img.src = url;  // 设置相对路径给Image, 此时会发送出请求
 			    url = img.src;  // 此时相对路径已经变成绝对路径
 			    img.src = null; // 取消请求
				top.location.href = url;
			}
		});
	}
})