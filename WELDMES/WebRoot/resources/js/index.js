$(function(){
	checkBrowser();
	getUserInsframework();
	addTab("欢迎使用","welcome.jsp");
	tabsIncident();
	$("#persondiv").hide();
	$("#junctiondiv").hide();
	$("#machinediv").hide();
})

var browsernum = "auto";
function checkBrowser(){
	if(window.navigator.userAgent.indexOf("MSIE")>=1){//IE
		browsernum = "0";
	}
}

function getUserInsframework(){
	$.ajax({
		type : "post",
		async : true,
		url : "hierarchy/getUserInsframework",
		data : {},
		dataType : "json",
		success : function(result){
			var str = "<span>"+result.uname+"</span>";
			$("#username").append(str);
			for(var r=0;r<result.ary.length;r++){
				resourceary.push(result.ary[r].resource);
			}
			anaylsis(result.ipurl);
		},
		error : function(errorMsg){
			alert("数据请求失败，请联系系统管理员!");
		}
	})
}

function openSubmenus(index1,index2){
	$("#subimg"+index1+"_"+index2).css("transform","rotate(0deg)");
	if($("#div"+index1+"_"+index2).is(":hidden")){
		$("#div"+index1+"_"+index2).show();
	}else{
		$("#div"+index1+"_"+index2).hide();
	}
}

function loadxmlDoc(file) {
	try {
		//IE
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
	} catch (e) {
		//Firefox, Mozilla, Opera, etc
		xmlDoc = document.implementation.createDocument("", "", null);
	}

	try {
		xmlDoc.async = false;
		xmlDoc.load(file); //chrome没有load方法
	} catch (e) {
		//针对Chrome,不过只能通过http访问,通过file协议访问会报错
		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", file, false);
		xmlhttp.send(null);
		xmlDoc = xmlhttp.responseXML.documentElement;
	}
	return xmlDoc;
}

var resourceary = [];
function anaylsis(ipurl){
	var object = loadxmlDoc(ipurl+"ConfigFile/weldmesMenu.xml");
	var menuinfo = object.getElementsByTagName("Menuinfo");
	try{
		var a = menuinfo.item;
		for(var m = 1; m <= menuinfo.length; m++){
			for (var i = 0; i < menuinfo.length; i++) {
				var showIndex = menuinfo[i].getElementsByTagName("ShowIndex");//显示位置
				if (document.all) {
					showIndex = showIndex[0].text;
				} else {
					showIndex = showIndex[0].textContent;
				}
				if(m == showIndex){
					var menuName = menuinfo[i].getElementsByTagName("Name");//菜单名
					var submenus = menuinfo[i].getElementsByTagName("Submenus");//二级菜单
					var imgName = menuinfo[i].getElementsByTagName("ImgName");//菜单图标
					var array = [], firstcontext = "";
					if (document.all) {
						menuName = menuName[0].text,imgName = imgName[0].text;
					} else {
						menuName = menuName[0].textContent,imgName = imgName[0].textContent;
					}
					var context = '<ul id="ul'+showIndex+'">';
					for (var x = 0; x < submenus.length; x++) {
						var firstName = submenus[x].getElementsByTagName("FirstName");
						var firstResource = submenus[x].getElementsByTagName("FirstResource");
						var firstimgName = submenus[x].getElementsByTagName("FirstImgName");//菜单图标
						var firstsubmenus = submenus[x].getElementsByTagName("FirstSubmenus");//三级菜单
						var firstshowIndex = submenus[x].getElementsByTagName("FirstShowIndex");//显示位置
						var subnenustext,flag = true,lastcontext = "";
						if (document.all) { //IE
							firstName = firstName[0].text,firstResource = firstResource[0].text,firstimgName = firstimgName[0].text,
							subnenustext = firstsubmenus[0].text,firstshowIndex = firstshowIndex[0].text;
						} else {
							firstName = firstName[0].textContent,firstResource = firstResource[0].textContent,firstimgName = firstimgName[0].textContent,
							subnenustext = firstsubmenus[0].textContent,firstshowIndex = firstshowIndex[0].textContent;
						}
						if($.trim(subnenustext)){
							flag = false;
							array.push(firstshowIndex);
							firstcontext +='<li onclick="changeColor(this)" id="'+firstshowIndex+'"><a href="javascript:openSubmenus('+showIndex+','+firstshowIndex+')">'+
							'<div><img src="resources/images/'+firstimgName+'" />&nbsp;&nbsp;'+firstName+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="resources/images/arrow.png" id="subimg'+showIndex+'_'+firstshowIndex+'"/></div>'+
							'</a></li><li style="height:'+browsernum+'px;"><div id="div'+showIndex+'_'+firstshowIndex+'" style="display:none;"><ul id="last'+firstshowIndex+'">';
							for (var j = 0; j < firstsubmenus.length; j++) {
								var LastName = firstsubmenus[j].getElementsByTagName("LastName");
								var LastResource = firstsubmenus[j].getElementsByTagName("LastResource");
								var LastimgName = firstsubmenus[j].getElementsByTagName("LastImgName");//菜单图标
								var lastshowIndex = firstsubmenus[j].getElementsByTagName("LastShowIndex");//显示位置
								if (document.all) { //IE
									LastName = LastName[0].text,LastResource = LastResource[0].text,LastimgName = LastimgName[0].text,lastshowIndex = lastshowIndex[0].text;
								} else {
									LastName = LastName[0].textContent,LastResource = LastResource[0].textContent,LastimgName = LastimgName[0].textContent,lastshowIndex = lastshowIndex[0].textContent;
								}
								if($.inArray(LastResource,resourceary)!=-1){
									if(LastResource == "td/AllTd"){
										lastcontext += '<li onclick="changeColor(this)" id="last'+lastshowIndex+'"><a href="javascript:openLive()" ><div><img src="resources/images/'+LastimgName+'" />&nbsp;&nbsp;'+LastName+'</div></a></li>';
									}else{
										lastcontext += '<li onclick="changeColor(this)" id="last'+lastshowIndex+'"><a href="javascript:openTab(\''+LastName+'\',\''+LastResource+'\')" ><div><img src="resources/images/'+LastimgName+'" />&nbsp;&nbsp;'+LastName+'</div></a></li>';
									}
								}
							}
							firstcontext += lastcontext+'</ul></div></li>';
							if(lastcontext == null || lastcontext == ""){
								firstcontext = "";
							}
						}
						if(flag){
							if($.inArray(firstResource,resourceary)!=-1){
								if(firstResource == "td/AllTd"){
									firstcontext +='<li onclick="changeColor(this)" id="'+firstshowIndex+'"><a href="javascript:openLive()" ><div><img src="resources/images/'+firstimgName+'" />&nbsp;&nbsp;'+firstName+'</div></a></li>';
								}else{
									firstcontext +='<li onclick="changeColor(this)" id="'+firstshowIndex+'"><a href="javascript:openTab(\''+firstName+'\',\''+firstResource+'\')" ><div><img src="resources/images/'+firstimgName+'" />&nbsp;&nbsp;'+firstName+'</div></a></li>';
								}
							}
						}
					}
					context += firstcontext+'</ul>';
					if(firstcontext != null && firstcontext != ""){
						//动态渲染easyui的菜单样式
						$('#accordiondiv').accordion('add', {
							title : menuName,
							content : context,
							iconCls: imgName,
							selected : false
						});
						menusort("ul"+showIndex,true);
						for(var f=0;f<array.length;f++){
							menusort("last"+array[f],false);
						}
					}
					$("#accordiondiv").accordion({
						selected:0
					})
				}
			}
		}
	}catch(e){ 
		var menu1 = object.text.split("  ");
		for(var m = 1;m <= menu1.length; m++){
			var menu2 = menu1[m-1].split(" ");
			if((menu2.length-3)%5 == 0){
				for(var i = 0; i < menu2.length; i++){
					var showIndex = menu2[1];//显示位置
					if(m == showIndex){
						var menuName = menu2[i];//菜单名
						var imgName = menu2[i+2];//菜单图标
						var array = [], firstcontext = "";

						var context = '<ul id="ul'+showIndex+'">';
						for(var i1 = 3; i1 < menu2.length; i1+=5){
							var firstName = menu2[i1];
							var firstResource = menu2[i1+2];
							var firstimgName = menu2[i1+4];//菜单图标
							//var firstsubmenus = menu2[i];//三级菜单
							var firstshowIndex = menu2[i+1];//显示位置
							var subnenustext,flag = true,lastcontext = "";
							if(flag){
								if($.inArray(firstResource,resourceary)!=-1){
									if(firstResource == "td/AllTd"){
										firstcontext +='<li onclick="changeColor(this)" id="'+firstshowIndex+'"><a href="javascript:openLive()" ><div><img src="resources/images/'+firstimgName+'" />&nbsp;&nbsp;'+firstName+'</div></a></li>';
									}else{
										firstcontext +='<li onclick="changeColor(this)" id="'+firstshowIndex+'"><a href="javascript:openTab(\''+firstName+'\',\''+firstResource+'\')" ><div><img src="resources/images/'+firstimgName+'" />&nbsp;&nbsp;'+firstName+'</div></a></li>';
									}
								}
							}
						}

					}
					context += firstcontext+'</ul>';
					if(firstcontext != null && firstcontext != ""){
						//动态渲染easyui的菜单样式
						$('#accordiondiv').accordion('add', {
							title : menuName,
							content : context,
							iconCls: imgName,
							selected : false
						});
						menusort("ul"+showIndex,true);
						for(var f=0;f<array.length;f++){
							menusort("last"+array[f],false);
						}
					}
					$("#accordiondiv").accordion({
						selected:0
					})
					break;
				}
			}else{
				/*var menu2 = menu1[m-1].split("+");
				for(var i = 0; i < menu2.length; i++){
					var showIndex = menu2[1];//显示位置
					if(m == showIndex){
						var menuName = menu2[i];//菜单名
						var imgName = menu2[i+2];//菜单图标
						var array = [], firstcontext = "";

						var context = '<ul id="ul'+showIndex+'">';
						for(var i1 = 3; i1 < menu2.length; i1+=5){
							var firstName = menu2[i1];
							var firstResource = menu2[i1+2];
							var firstimgName = menu2[i1+4];//菜单图标
							var firstsubmenus = menu2[i];//三级菜单
							var firstshowIndex = menu2[i+1];//显示位置
							var subnenustext,flag = true,lastcontext = "";
							array.push(firstshowIndex);
							firstcontext +='<li onclick="changeColor(this)" id="'+firstshowIndex+'"><a href="javascript:openSubmenus('+showIndex+','+firstshowIndex+')">'+
							'<div><img src="resources/images/'+firstimgName+'" />&nbsp;&nbsp;'+firstName+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="resources/images/arrow.png" id="subimg'+showIndex+'_'+firstshowIndex+'"/></div>'+
							'</a></li><li style="height:'+browsernum+'px;"><div id="div'+showIndex+'_'+firstshowIndex+'" style="display:none;"><ul id="last'+firstshowIndex+'">';
							
							var menu3 = menu2.split("  ");
						}

					}
					context += firstcontext+'</ul>';
					if(firstcontext != null && firstcontext != ""){
						//动态渲染easyui的菜单样式
						$('#accordiondiv').accordion('add', {
							title : menuName,
							content : context,
							iconCls: imgName,
							selected : false
						});
						menusort("ul"+showIndex,true);
						for(var f=0;f<array.length;f++){
							menusort("last"+array[f],false);
						}
					}
					$("#accordiondiv").accordion({
						selected:0
					})
					break;
				}*/
			}
		}
	}
	$.parser.parse($("#accordiondiv"));
}

//根据位置进行排序
function menusort(name,flag){
	var ul=document.getElementById(name);
    var li=ul.getElementsByTagName("li");
    var list=[];
    //将li添加到list数组
    for(var n=0;n<li.length;n++){
    	var subid = li[n].id.substring(0, 4);
    	if(flag){
        	if(subid!="last"){
            	list.push(li[n]);
        	}
    	}else{
            list.push(li[n]);
    	}
    	
    }
    //对数组进行比较排序
    list.sort(function (li1,li2){
    	var n1,n2
    	if(flag){
    		n1=parseInt(li1.id);
    		n2=parseInt(li2.id);
    	}else{
    		n1=parseInt(li1.id.substring(4));
    		n2=parseInt(li2.id.substring(4));
    	}
        return n1-n2;
    })
    for(var x=0;x<list.length;x++){
       ul.appendChild(list[x]);
    }
}

//打开标签页
function openTab(name,resource){
	addTab(name,resource);
}

function openLive(){
	window.open("td/AllTd");
}

function addWelcom(title,url){
	//该面板是否已打开
	if(!$("#tabs").tabs('exists',title)){
		$("#tabs").tabs('add',{    
		    title:title,
		    content:createFrame(url)
		});
	}else{
		$("#tabs").tabs('select',title);
	}
	// 为选项卡绑定右键
	$(".tabs-inner").bind('contextmenu', function(e) {
		$('#tabMenu').menu('show', {
			left : e.pageX,
			top : e.pageY
		});

		var subtitle = $(this).children(".tabs-closable").text();

		$('#tabMenu').data("currtab", subtitle);
		$('#tabs').tabs('select', subtitle);
		return false;
	});
	
}

function addTab(title,url){
	//该面板是否已打开
	if(!$("#tabs").tabs('exists',title)){
		$("#tabs").tabs('add',{    
		    title:title,
		    content:createFrame(url),    
		    closable:true 
		});
	}else{
		$("#tabs").tabs('select',title);
	}
	// 为选项卡绑定右键
	$(".tabs-inner").bind('contextmenu', function(e) {
		$('#tabMenu').menu('show', {
			left : e.pageX,
			top : e.pageY
		});

		var subtitle = $(this).children(".tabs-closable").text();

		$('#tabMenu').data("currtab", subtitle);
		$('#tabs').tabs('select', subtitle);
		return false;
	});
	
}

function createFrame(url) {
	var s = '<iframe scrolling="auto" frameborder="0"  src="' + url + '" style="width:100%;height:100%;"></iframe>';
	return s;
}


//标签页事件
function tabsIncident(){
	//刷新
	$('#refreshtab').click(function() {
		var currTab = $('#tabs').tabs('getSelected');
		var url = $(currTab.panel('options').content).attr('src');
		$('#tabs').tabs('update', {
			tab : currTab,
			options : {
				content : createFrame(url)
			}
		})
	})
	//关闭标签页
	$("#closetab").click(function(){
		var currtab_title = $('#tabMenu').data("currtab");
		$('#tabs').tabs('close', currtab_title);
	})
	// 全部关闭
	$('#closeAll').click(function() {
		$('.tabs-inner span').each(function(i, n) {
			var t = $(n).text();
			if(t!="欢迎使用"){
				$('#tabs').tabs('close', t);
			}
		});
	});
	// 关闭其他标签页
	$('#closeOther').click(function() {
		$("#closeRight").click();
		$('#closeLeft').click();
	});
	//关闭右侧标签页
	$('#closeRight').click(function(){
		var nextall = $('.tabs-selected').nextAll();
		nextall.each(function(i, n) {
			var t = $('a:eq(0) span', $(n)).text();
			if(t!="欢迎使用"){
				$('#tabs').tabs('close', t);
			}
		});
	})
	//关闭左侧标签页
	$('#closeLeft').click(function() {
		var prevall = $('.tabs-selected').prevAll();
		prevall.each(function(i, n) {
			var t = $('a:eq(0) span', $(n)).text();
			if(t!="欢迎使用"){
				$('#tabs').tabs('close', t);
			}
		});
	});
}

//选中时改变背景颜色
function changeColor(obj){
	$("ul li").css("backgroundColor","#ffffff");
	obj.style.background = "#fecf5d";
}

