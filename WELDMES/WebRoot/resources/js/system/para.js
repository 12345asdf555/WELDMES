/**
 * 
 */
$(function() {
	$("#fm").form("disableValidation");
	$.ajax({
		type : "post",
		async : false,
		url : "pmt/getParameterAll",
		data : {},
		dataType : "json", //返回数据形式为json  
		success : function(result) {
			var res = eval(result.rows);
			for (var i = 0; i < res.length; i++) {
				$("#id").textbox("setValue", res[i].id);
				$("#companyName").textbox("setValue", res[i].fcn);
				if (res[i].fvv == "0") {
					$("#term1").attr("checked", true);
				} else {
					$("#term2").attr("checked", true);
				}
				var time1 = res[i].fst.split(':');
				$("#hour1").textbox("setValue", time1[0]);
				$("#minute1").textbox("setValue", time1[1]);
				$("#second1").textbox("setValue", time1[2]);
				var time2 = res[i].fsft.split(':');
				$("#hour2").textbox("setValue", time2[0]);
				$("#minute2").textbox("setValue", time2[1]);
				$("#second2").textbox("setValue", time2[2]);
				var time3 = res[i].fct.split(':');
				$("#hour3").textbox("setValue", time3[0]);
				$("#minute3").textbox("setValue", time3[1]);
				$("#second3").textbox("setValue", time3[2]);
				$("#times").textbox("setValue", res[i].folt);
				var weight = res[i].fww.split(',');
				$("#one").textbox("setValue", weight[0]);
				$("#two").textbox("setValue", weight[1]);
				$("#six").textbox("setValue", weight[2]);
				$("#eight").textbox("setValue", weight[3]);
				$("#airflow").textbox("setValue", res[i].fafv);
				$("#speed").textbox("setValue", res[i].fspeed);
				$("#weld").textbox("setValue", res[i].fwc);
				$("#wait").textbox("setValue", res[i].fsp);
				$("#day").textbox("setValue", res[i].fds);
				$("#after").textbox("setValue", res[i].fas);
				$("#night").textbox("setValue", res[i].fns);
			}
		},
		error : function(errorMsg) {
			alert("数据请求失败，请联系系统管理员!");
		}
	});

	$(document).ready(function() {
		$('#fm').find('input[type=checkbox]').bind('click', function() {
			$('#fm').find('input[type=checkbox]').not(this).attr("checked", false);
		});
	});
})

function savePara() {
	var id = document.getElementById("id").value;
	var check = $("input[type='checkbox']:checked").val();
	var url;
	url = "pmt/editParameter?check=" + check + "&id=" + id;
	$('#fm').form('submit', {
		url : url,
		onSubmit : function() {
			return $(this).form('enableValidation').form('validate');
		},
		success : function(result) {
			var result = eval('(' + result + ')');
			if (result.errorMsg) {
				$.messager.show({
					title : 'Error',
					msg : result.errorMsg
				});
			} else {
				$.messager.alert("提示", "修改成功");
				var url = "Dictionary/goParameter";
				var img = new Image();
				img.src = url; // 设置相对路径给Image, 此时会发送出请求
				url = img.src; // 此时相对路径已经变成绝对路径
				img.src = null; // 取消请求
				window.location.href = encodeURI(url);
			}
		}
	});
}