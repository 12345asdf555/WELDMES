$(function(){
	insframworkCombobox();
	leveCombobox();
	quaidCombobox();
	$('#dlg').dialog( {
		onClose : function() {
			$('#leveid').combobox('clear');
			$('#quali').combobox('clear');
			$('#owner').combobox('clear');
			$("#fm").form("disableValidation");
		}
	})
	$("#fm").form("disableValidation");
})

function insframworkCombobox(){
	   $.ajax({
	   type: "post", 
	   async : false,
	   url: "weldingMachine/getInsframeworkAll",
	   dataType: "json",
	   data: {},
	   success: function (result) {
	      if (result) {
	         var optionstring = "";
	         //循环遍历 下拉框绑定
             for (var i = 0; i < result.ary.length; i++) {  
            	 optionstring += "<option value=\"" + result.ary[i].id + "\" >" + result.ary[i].name + "</option>";
             }
	         $("#owner").html(optionstring);
	      } else {
	         alert('部门加载失败');
	      }
	      $("#owner").combobox();
	   },
	   error: function () {
	      alert('error');
	   }
	});
	
}

function leveCombobox(){
	var we=8;
	   $.ajax({
	   type: "post", 
	   async : false,
	   url: "welders/getLeve?we="+we,
	   dataType: "json",
	   data: {},
	   success: function (result) {
	      if (result) {
	         var optionstring = "";
	         //循环遍历 下拉框绑定
	         for(var k=0;k<result.rows.length;k++){
	         optionstring += "<option value=\"" + result.rows[k].leveid + "\" >" + result.rows[k].levename + "</option>";
	         }
	         $("#leveid").html(optionstring);
	      } else {
	         alert('部门加载失败');
	      }
	      $("#leveid").combobox();
	   },
	   error: function () {
	      alert('error');
	   }
	});
}
		
function quaidCombobox(){
	var wee=7;
		   $.ajax({
		   type: "post", 
		   async : false,
		   url: "welders/getLeve?we="+wee,
		   dataType: "json",
		   data: {},
		   success: function (result) {
		      if (result) {
		         var optionstring = "";
		         //循环遍历 下拉框绑定
		         for(var k=0;k<result.rows.length;k++){
		         optionstring += "<option value=\"" + result.rows[k].quaid + "\" >" + result.rows[k].quaname + "</option>";
		         }
		         $("#quali").html(optionstring);
		      } else {
		         alert('部门加载失败');
		      }
		      $("#quali").combobox();
		   },
		   error: function () {
		      alert('error');
		   }
		});
}

var url = "";
var flag = 1;
var oldic;
var oldck;
function saveWelder(){
	flag = 1;
	$('#dlg').window( {
		title : "新增焊工",
		modal : true
	});
	$('#dlg').window('open');
	$('#fm').form('clear');
	url = "welders/addcatWelder";
}

function editWelder(){
	flag = 2;
	$('#fm').form('clear');
	var row = $('#welderTable').datagrid('getSelected');
	if (row) {
		$('#dlg').window( {
			title : "修改焊工",
			modal : true
		});
		$('#dlg').window('open');
		$('#fm').form('load', row);
		$('#validName').val(row.welderno);
		oldic = $("#icworkime").textbox('getValue');
		oldhys = $("#halfyearsure").textbox('getValue');
		oldys = $("#yearsure").textbox('getValue');
		oldny = $("#nextyear").textbox('getValue');
		$('#oldno').val(row.weldedJunctionno);
		url = "welders/updatecatWelder?FID="+ row.id;
	}
}
//提交
function save(){
	var symbol=0;
	var newic = $("#icworkime").textbox('getValue');
	var newhys = $("#halfyearsure").textbox('getValue');
	var newys = $("#yearsure").textbox('getValue');
	var newny = $("#nextyear").textbox('getValue');
	var messager = "";
    var insframework = $('#owner').combobox('getValue');
    var leve = $('#leveid').combobox('getValue');
    var qua = $('#quali').combobox('getValue');
	var url2 = "";
	if(flag==1){
		messager = "新增成功！";
		url2 = url+"?ins="+insframework+"&leve="+leve+"&qua="+qua;;
	}else{
		if(oldic!=newic){
			symbol=1;
		}else if(oldhys!=newhys){
			symbol=2;
		}else if(oldys!=newys){
			symbol=3;
		}else if(oldny!=newny){
			symbol=4;
		}
		messager = "修改成功！";
		url2 = url+"&ins="+insframework+"&leve="+leve+"&qua="+qua+"&symbol="+symbol;
	}
	$('#fm').form('submit', {
		url : url2,
		onSubmit : function() {
			return $(this).form('enableValidation').form('validate');
		},
		success : function(result) {
			if(result){
				var result = eval('(' + result + ')');
				if (!result.success) {
					$.messager.show( {
						title : 'Error',
						msg : result.errorMsg
					});
				} else {
					$.messager.alert("提示", messager);
					$('#dlg').dialog('close');
					$('#welderTable').datagrid('reload');
				}
			}
			
		},  
	    error : function(errorMsg) {  
	        alert("数据请求失败，请联系系统管理员!");  
	    } 
	});
}

        