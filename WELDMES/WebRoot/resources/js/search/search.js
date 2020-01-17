var index = 0;
var searchStr = "";
var field="";
var condition="";
var content="";
var joint = "";
var flag = true;

$(function(){
	//根据不同浏览器选择不同的css
	if(window.navigator.userAgent.indexOf("MSIE")>=1){//IE
		setActiveStyleSheet("ieBrowser.css"); 
	}else{
		setActiveStyleSheet("otherBrowser.css");
	}
})

function setActiveStyleSheet(title){ 
	document.getElementsByTagName("link")[0].href = "resources/css/" + title; 
}

//工时分类进入查询
function serachClassify(){
	$("#searchdiv").dialog("open");
	searchClassifyCombobox();
	initSearch();
}
//工时分类下拉框
function searchClassifyCombobox(){
	var optionFields = 
		"<option value='fmaterial'>上游材质</option>" +
		"<option value='fnext_material'>下游材质</option>" +
		"<option value='fwall_thickness'>上游璧厚</option>" +
		"<option value='fnextwall_thickness'>下游璧厚</option>" +
		"<option value='fexternal_diameter'>上游外径</option>" +
		"<option value='fnextExternal_diameter'>下游外径</option>";
	$(".fields").html(optionFields);
	createSearchCombobox();
}

//新增工时分类查询条件
function newSearchhoustclassify(){
	fillcontent();
	newSearch();
	searchClassifyCombobox();
	initSearch();
}

//工时分类执行查询
function searchHousClassify(){
	fillcontent();
	if(!getContent()){
		return;
	}
	$('#classify').datagrid('load', {
		"searchStr" : searchStr
	});
	$("#searchdiv").dialog("close");
	searchStr="";
}

//组织机构进入查询
function insertSearchInsf(){
	$("#searchdiv").dialog("open");
	searchInsfCombobox();
	initSearch();
}

//组织机构下拉框
function searchInsfCombobox(){
	var optionFields = 
		"<option value='fname'>名称</option>" +
		"<option value='flogogram'>简写</option>" +
		"<option value='fcode'>编码</option>" +
		"<option value='fparent'>上级项目</option>" +
		"<option value='d.fvaluename'>类型</option>";
	$(".fields").html(optionFields);
	createSearchCombobox();
}


//新增组织机构查询条件
function newSearchInsf(){
	fillcontent();
	newSearch();
	searchInsfCombobox();
	initSearch();
}

//组织机构执行查询
function searchInsf(){
	fillcontent();
	if(!getContent()){
		return;
	}
	$('#insframeworkTable').datagrid('load', {
		"searchStr" : searchStr
	});
	$("#searchdiv").dialog("close");
	searchStr="";
}

//新增采集模块查询条件
function newSearchGather(){
	fillcontent();
	newSearch();
	searchGatherCombobox();
	initSearch();
}

//采集模块进入查询
function insertSearchGather(){
	$("#searchdiv").dialog("open");
	searchGatherCombobox();
	initSearch();
}
//采集模块下拉框
function searchGatherCombobox(){
	var optionFields = 
		"<option value='fgather_no'>采集模块编号</option>" +
		"<option value='i.fname'>所属项目</option>" +
		"<option value='fstatus'>采集模块状态</option>" +
		"<option value='fprotocol'>采集模块通讯协议</option>" +
		"<option value='fipurl'>采集模块IP地址</option>" +
		"<option value='fmacurl'>采集模块MAC地址</option>" +
		"<option value='fleavetime'>采集模块出厂时间</option>";
	$(".fields").html(optionFields);
	createSearchCombobox();
}

//新增采集模块查询条件
function newSearchGather(){
	fillcontent();
	newSearch();
	searchGatherCombobox();
	initSearch();
}

//采集模块执行查询
function searchGather(){
	fillcontent();
	if(!getContent()){
		return;
	}
	$('#gatherTable').datagrid('load', {
		"searchStr" : searchStr
	});
	$("#searchdiv").dialog("close");
	searchStr="";
}

//新增焊接设备查询条件
function newSearchWeldingMachine(){
	fillcontent();
	newSearch();
	searchWeldingMachineCombobox();
	initSearch();
}

//焊接设备下拉框
function searchWeldingMachineCombobox(){
	var optionFields = 
		"<option value='fequipment_no'>固定资产编号</option>" +
		"<option value='di.fvaluename'>设备类型</option>" +
		"<option value='fjoin_time'>入厂时间</option>" +
		"<option value='i.fname'>所属项目</option>" +
		"<option value='d.fvaluename'>状态</option>" +
		"<option value='m.fname'>厂家</option>" +
		"<option value='fisnetworking'>是否在网</option>" +
		"<option value='fposition'>位置</option>" +
		"<option value='w.fIP'>ip地址</option>" +
		"<option value='dict.fvaluename'>设备型号</option>";
	$(".fields").html(optionFields);
	createSearchCombobox();
}

//焊机设备进入查询dialog
function insertSearchWeldingMachine(){
	$("#searchdiv").dialog("open");
	searchWeldingMachineCombobox();
	initSearch();
}

//焊机设备执行查询
function searchWeldingmachine(){
	fillcontent();
	for(var i=0;i<=index;i++){
		var fieldId =$(".fields").eq(i).attr("id");
		var field = $("#"+fieldId+"").val();
		var conditionId =$(".condition").eq(i).attr("id");
		var condition = $("#"+conditionId+"").val();
		var contentId =$(".content").eq(i).attr("id");
		var content = $("#"+contentId+"").val();
		var jointId =$(".joint").eq(i).attr("id");
		var joint = $("#"+jointId+"").val();
		if(field=="fisnetworking"){
			if(content=="是"){
				content="0";
			}else if(content=="否"){
				content=1;
			}else{
				content="9999";
			}
		}
		if(field==null || field=="" || condition==null || condition=="" || content==null || content==""){
			alert('请输入完整的查询条件！');
			return;
		}
		if(joint==null || joint==""){
			joint = "and";
		}
		if(condition == "like"){
			content = "%"+content+"%";
		}
		if(i==index){
			searchStr +=" "+field+" "+condition+" '"+content+"'";
		}else{
			searchStr +=" "+field+" "+condition+" '"+content+"' "+joint;
		}
	}
	$('#weldingmachineTable').datagrid('load', {
		"searchStr" : searchStr
	});
	$("#searchdiv").dialog("close");
	searchStr = "";
}
	

//新增维修记录查询条件
function newSearchMaintain(){
	fillcontent();
	newSearch();
	searchMaintainCombobox();
	initSearch();
}

//维修记录下拉框
function searchMaintainCombobox(){
	var optionFields = 
		"<option value='fequipment_no'>固定资产编号</option>" +
  		"<option value='d.fvaluename'>维修类型</option>" +
  		"<option value='fviceman'>维修人员</option>" +
  		"<option value='fdesc'>维修说明</option>" +
  		"<option value='fstart_time'>维修起始时间</option>" +
  		"<option value='fend_time'>维修结束时间</option>";
	$(".fields").html(optionFields);
	createSearchCombobox();
}

//维修记录进入查询dialog
function insertSearchMaintain(){
	$("#searchdiv").dialog("open");
	searchMaintainCombobox();
	initSearch();
}

//维修记录执行查询
function searchMaintain(){
	fillcontent();
	if(!getContent()){
		return;
	}
	$('#maintainTable').datagrid('load', {
		"searchStr" : searchStr
	});
	$("#searchdiv").dialog("close");
	searchStr="";
}

//新增焊工查询条件
function newSearchWelder(){
	fillcontent();
	newSearch();
	searchWelderCombobox();
	initSearch();
}

//新增工艺查询条件
function newSearchWps(){
	fillcontent();
	newSearch();
	searchWpsCombobox();
	initSearch();
}

//新增产品查询条件
function newSearchProduct(){
	fillcontent();
	newSearch();
	searchProductCombobox();
	initSearch();
}

//新增焊缝查询条件
function newSearchWeldf(){
	fillcontent();
	newSearch();
	searchWeldfCombobox();
	initSearch();
}

//新增焊缝工艺查询条件
function newSearchProcess(){
	fillcontent();
	newSearch();
	searchProcessCombobox();
	initSearch();
}

function newSearchUser(){
	fillcontent();
	newSearch();
	searchUserCombobox();
	initSearch();
}

function newSearchRole(){
	fillcontent();
	newSearch();
	searchRoleCombobox();
	initSearch();
}

function newSearchAuthority(){
	fillcontent();
	newSearch();
	searchAuthorityCombobox();
	initSearch();
}

function newSearchResource(){
	fillcontent();
	newSearch();
	searchResourceCombobox();
	initSearch();
}

//焊工信息下拉框
function searchWelderCombobox(){
	var optionFields = 
  		"<option value='tb_welder.fname'>姓名</option>" +
  		"<option value='fwelder_no'>编号</option>" +
  		"<option value='FCellPhone'>手机</option>" +
  		"<option value='FCardNUm'>卡号</option>" +
  		"<option value='di.fvaluename'>资质</option>" +
  		"<option value='d.fvaluename'>级别</option>" +
//  		"<option value='FCReateDate'>创建时间</option>" +
//  		"<option value='FUpdateDate'>修改时间</option>" +
  		"<option value='i.fname'>所属项目</option>";
	$(".fields").html(optionFields);
	createSearchCombobox();
}

//工艺查询下拉框
function searchWpsCombobox(){
	var optionFields = 
  		"<option value='FWPSNum'>工艺编号</option>" +
  		"<option value='Fweld_I'>标准焊接电流</option>" +
  		"<option value='Fweld_V'>标准焊接电压</option>" +
  		"<option value='Fweld_I_MAX'>最大焊接电流</option>" +
  		"<option value='Fweld_I_MIN'>最小焊接电流</option>" +
  		"<option value='Fweld_V_MAX'>最大焊接电压</option>" +
  		"<option value='Fweld_V_MIN'>最小焊接电压</option>" +
  		"<option value='Fweld_Alter_I'>报警电流</option>" +
  		"<option value='Fweld_Alter_V'>报警电压</option>" +
  		"<option value='Fweld_PreChannel'>预置通道</option>" +
//  		"<option value='FCReateDate'>提交时间</option>" +
//  		"<option value='FUpdateDate'>修改时间</option>" +
  		"<option value='i.fname'>所属项目</option>";
	$(".fields").html(optionFields);
	createSearchCombobox();
}

//产品查询下拉框
function searchProductCombobox(){
	var optionFields = 
  		"<option value='fproduct_number'>产品编号</option>" +
  		"<option value='fparts_number'>零部件编号</option>" +
  		"<option value='fproduct_info'>产品信息</option>" +
  		"<option value='fparts_info'>零部件信息</option>";
	$(".fields").html(optionFields);
	createSearchCombobox();
}

//焊缝查询下拉框
function searchWeldfCombobox(){
	var optionFields = 
		"<option value='fweld_number'>焊缝编号</option>" +
		"<option value='fweld_info'>焊缝信息</option>";
	$(".fields").html(optionFields);
	createSearchCombobox();
}

//焊缝工艺查询下拉框
function searchProcessCombobox(){
	var optionFields = 
		"<option value='fprocess_name'>工艺名称</option>" +
		"<option value='fweld_position'>焊接位态</option>" +
		"<option value='fmeterial'>材质</option>" +
		"<option value='fformat'>规格</option>" +
		"<option value='fmethod'>焊接方法</option>" +
		"<option value='fdrying'>焊材烘干条件</option>" +
		"<option value='ftemperature'>预热温度</option>" +
		"<option value='ffactor'>后热条件</option>" +
		"<option value='frequire'>热处理条件</option>" +
		"<option value='flevel'>无损检测合格级别</option>" +
		"<option value='fqualify'>员工资质</option>" +
		"<option value='frange'>线能量控制范围</option>";
	$(".fields").html(optionFields);
	createSearchCombobox();
}

function searchUserCombobox(){
	var optionFields = "<option value='users_name'>用户名</option>" +
  		"<option value='users_Login_Name'>登录名</option>" +
  		"<option value='users_phone'>电话</option>"+
  		"<option value='users_email'>邮箱</option>" +
  		"<option value='users_insframework'>岗位</option>" +
  		"<option value='users_position'>部门</option>" +
  		"<option value='d.fvaluename'>状态</option>" ;
	$(".fields").html(optionFields);
	createSearchCombobox();
}

function searchRoleCombobox(){
	var optionFields = "<option value='roles_name'>角色名</option>" +
  		"<option value='roles_desc'>描述</option>"+
  		"<option value='d.fvaluename'>状态</option>" ;
	$(".fields").html(optionFields);
	createSearchCombobox();
}

function searchAuthorityCombobox(){
	var optionFields = "<option value='authorities_name'>权限名</option>" +
  		"<option value='authorities_desc'>描述</option>"+
  		"<option value='d.fvaluename'>状态</option>" ;
	$(".fields").html(optionFields);
	createSearchCombobox();
}

function searchResourceCombobox(){
	var optionFields = "<option value='resources_name'>资源名</option>" +
  		"<option value='resources_type'>类型</option>"+
  		"<option value='resources_address'>地址</option>" +
  		"<option value='resources_desc'>描述</option>" +
  		"<option value='d.fvaluename'>状态</option>" ;
	$(".fields").html(optionFields);
	createSearchCombobox();
}

//焊工信息进入查询dialog
function insertSearchWelder(){
	$("#searchdiv").dialog("open");
	searchWelderCombobox();
	initSearch();
}

function insertSearchWps(){
	$("#searchdiv").dialog("open");
	searchWpsCombobox();
	initSearch();
}

function insertSearchProduct(){
	$("#searchdiv").dialog("open");
	searchProductCombobox();
	initSearch();
}

function insertSearchWeldf(){
	$("#searchdiv").dialog("open");
	searchWeldfCombobox();
	initSearch();
}

function insertSearchProcess(){
	$("#searchdiv").dialog("open");
	searchProcessCombobox();
	initSearch();
}

function insertSearchUser(){
	$("#searchdiv").dialog("open");
	searchUserCombobox();
	initSearch();
}

function insertSearchRole(){
	$("#searchdiv").dialog("open");
	searchRoleCombobox();
	initSearch();
}

function insertSearchAuthority(){
	$("#searchdiv").dialog("open");
	searchAuthorityCombobox();
	initSearch();
}

function insertSearchResource(){
	$("#searchdiv").dialog("open");
	searchResourceCombobox();
	initSearch();
}


//焊工信息执行查询
function searchWelder(){
	fillcontent();
	if(!getContent()){
		return;
	}
	$('#welderTable').datagrid('load', {
		"searchStr" : searchStr
	});
	$("#searchdiv").dialog("close");
	searchStr="";
}

function searchWps(){
	fillcontent();
	if(!getContent()){
		return;
	}
	$('#dg').datagrid('load', {
		"searchStr" : searchStr
	});
	$("#searchdiv").dialog("close");
	searchStr="";
}

function searchProduct(){
	fillcontent();
	if(!getContent()){
		return;
	}
	$('#dg').datagrid('load', {
		"searchStr" : searchStr
	});
	$("#searchdiv").dialog("close");
	searchStr="";
}

function searchWeldf(){
	fillcontent();
	if(!getContent()){
		return;
	}
	$('#dg').datagrid('load', {
		"searchStr" : searchStr
	});
	$("#searchdiv").dialog("close");
	searchStr="";
}

function searchProcess(){
	fillcontent();
	if(!getContent()){
		return;
	}
	$('#dg').datagrid('load', {
		"searchStr" : searchStr
	});
	$("#searchdiv").dialog("close");
	searchStr="";
}

function searchUser(){
	fillcontent();
	if(!getContent()){
		return;
	}
	$('#dg').datagrid('load', {
		"searchStr" : searchStr
	});
	$("#searchdiv").dialog("close");
	searchStr="";
}

function searchRole(){
	fillcontent();
	if(!getContent()){
		return;
	}
	$('#dg').datagrid('load', {
		"searchStr" : searchStr
	});
	$("#searchdiv").dialog("close");
	searchStr="";
}

function searchAuthority(){
	fillcontent();
	if(!getContent()){
		return;
	}
	$('#dg').datagrid('load', {
		"searchStr" : searchStr
	});
	$("#searchdiv").dialog("close");
	searchStr="";
}

function searchResource(){
	fillcontent();
	if(!getContent()){
		return;
	}
	$('#dg').datagrid('load', {
		"searchStr" : searchStr
	});
	$("#searchdiv").dialog("close");
	searchStr="";
}
//新增焊口查询条件
function newSearchWJ(){
	fillcontent();
	newSearch();
	searchWJCombobox();
	initSearch();
}

//焊口下拉框
function searchWJCombobox(){
	var optionFields = 
		"<option value='fwelded_junction_no'>编号</option>" +
		"<option value='fserial_no'>序列号</option>" +
		"<option value='fpipeline_no'>管线号</option>" +
		"<option value='froom_no'>房间号</option>" +
		"<option value='funit'>机组</option>" +
		"<option value='farea'>区域</option>" +
		"<option value='fsystems'>系统</option>" +
		"<option value='fchildren'>子项</option>" +
		"<option value='fexternal_diameter'>上游外径</option>" +
		"<option value='fnextExternal_diameter'>下游外径</option>" +
		"<option value='fwall_thickness'>上游壁厚</option>" +
		"<option value='fnextwall_thickness'>下游壁厚</option>" +
		"<option value='fmaterial'>上游材质</option>" +
		"<option value='fnext_material'>下游材质</option>" +
		"<option value='fdyne'>达因</option>" +
		"<option value='fspecification'>规格</option>" +
		"<option value='fname'>所属项目</option>" +
		"<option value='fmax_electricity'>电流上限</option>" +
		"<option value='fmin_electricity'>电流下限</option>" +
		"<option value='fmax_valtage'>电压上限</option>" +
		"<option value='fmin_valtage'>电压下限</option>" +
		"<option value='felectricity_unit'>电流单位</option>" +
		"<option value='fvaltage_unit'>电压单位</option>" +
		"<option value='fstart_time'>开始时间</option>" +
		"<option value='fend_time'>完成时间</option>" +
		"<option value='fcreatetime'>创建时间</option>" +
		"<option value='	fupdatetime'>修改时间</option>" +
		"<option value='fupdatecount'>修改次数</option>";
	$(".fields").html(optionFields);
	createSearchCombobox();
}


//进入焊口查询
function insertsearchWJ(){
	$("#searchdiv").dialog("open");
	searchWJCombobox();
	initSearch();
}

//焊口执行查询
function searchWJ(){
	fillcontent();
	if(!getContent()){
		return; 
	}
	$('#weldedJunctionTable').datagrid('load', {
		"searchStr" : searchStr
	});
	$("#searchdiv").dialog("close");
	searchStr="";
}

//删除用户查询条件
function removeSerachByUser(){
	if(index == 0){
		return;
	}
	if(index == 1){
		//处理用户点击删除时总是多一行且删除不了
		$("#div0").nextAll().remove();
		index = 0
	}else{
		$("#div"+index).remove();
		index -= 1;
	}
}

//----------------------------------------------------
//删除查询条件
function removeSerach(){
	if(index == 0){
		return;
	}
	$("#div"+index).remove();
	index -= 1;
}

//下拉框赋值
function createSearchCombobox(){
	var optionCondition = "<option value='>'>大于</option>" +
			"<option value='<'>小于</option>" +
			"<option value='='>等于</option>" +
			"<option value='like'>包含</option>";
	$(".condition").html(optionCondition);
	
	var optionJoint = "<option value='and'>并且</option>" +
			"<option value='or'>或者</option>";
	$(".joint").html(optionJoint);
}

function fillcontent(){
	field="";
	condition="";
	content="";
	joint = "";
	//此处用来处理页面点击+按钮后自动清空已添加好的条件
	for(var i=0;i<=index;i++){
		var fieldId =$(".fields").eq(i).attr("id");
		field += $("#"+fieldId+"").val()+",";
		var conditionId =$(".condition").eq(i).attr("id");
		condition += $("#"+conditionId+"").val()+",";
		var contentId =$(".content").eq(i).attr("id");
		content += $("#"+contentId+"").val()+",";
		var jointId =$(".joint").eq(i).attr("id");
		joint += $("#"+jointId+"").val()+",";
	}
}

function newSearch(){
	index += 1;
	var str = "<div style='margin-top:5px' id='div"+index+"'>" +
			"<select class='fields' id='fields"+index+"'></select>&nbsp;" +
			"<select class='condition' id='condition"+index+"'></select>&nbsp;" +
			"<input class='content' id='content"+index+"'/>&nbsp;" +
			"<select class='joint' id='joint"+index+"'></select><div/>";
	$("#searchdiv").append(str);
}

function initSearch(){
	for(var i=0;i<=index;i++){
		var fid = field.split(",");
		var fieldId =$(".fields").eq(i).attr("id");
		$("#"+fieldId+"").val(fid[i]);
		var cnid = condition.split(",");
		var conditionId =$(".condition").eq(i).attr("id");
		$("#"+conditionId+"").val(cnid[i]);
		var ctid = content.split(",");
		var contentId =$(".content").eq(i).attr("id");
		$("#"+contentId+"").val(ctid[i]);
		var jid = joint.split(",");
		var jointId =$(".joint").eq(i).attr("id");
		$("#"+jointId+"").val(jid[i]);
	}
}

//获取值
function getContent(){
	for(var i=0;i<=index;i++){
		var fieldId =$(".fields").eq(i).attr("id");
		var field = $("#"+fieldId+"").val();
		var conditionId =$(".condition").eq(i).attr("id");
		var condition = $("#"+conditionId+"").val();
		var contentId =$(".content").eq(i).attr("id");
		var content = $("#"+contentId+"").val();
		var jointId =$(".joint").eq(i).attr("id");
		var joint = $("#"+jointId+"").val();
		if(field==null || field=="" || condition==null || condition=="" || content==null || content==""){
			alert('请输入完整的查询条件！');
			return;
		}
		if(joint==null || joint==""){
			joint = "and";
		}
		if(condition == "like"){
			content = "%"+content+"%";
		}
		if(i==index){
			searchStr +=" "+field+" "+condition+" '"+content+"'";
		}else{
			searchStr +=" "+field+" "+condition+" '"+content+"' "+joint;
		}
	}
	return true;
}
//关闭查询div
function close(){
	$('#searchdiv').dialog('close');
}

function closeDialog(name){
	$('#'+name).dialog('close');
}
