$(function(){
	/**
	 * Easyui校验规则扩展
	 */
	$.extend($.fn.validatebox.defaults.rules,
			{
				userValidate : {
					validator : function(value, param) {
						if (flag) {
							var userName = $("#validName").val();
							if((userName!=null || userName!="") && userName == value){
								return true;
							}
							var result = "";
							$.ajax( {
								type : 'post',
								async : false,
								url : 'user/usernamevalidate',
								data : {
									"userName" : value
								},
								success : function(data) {
									result = data;
								}
							});
							return result;
						} else {
							return true;
						}
		
					},
					message : '登录名已经被占用'
				},
				
				roleValidate : {
					validator : function(value, param) {
						if (flag) {
							var roleName = $("#validName").val();
							if((roleName!=null || roleName!="") && roleName == value){
								return true;
							}
							var result = "";
							$.ajax( {
								type : 'post',
								async : false,
								url : 'role/rolenamevalidate',
								data : {
									"roleName" : value
								},
								success : function(data) {
									if("true" == data)
										{
									result = true;
										}
									else{
										result =false;
									}
								}
							});
							return result;
						} else {
							return true;
						}
		
					},
					message : '角色名已经被占用'
				},
				
				
				authorityValidate : {
					validator : function(value, param) {
						if (flag) {
							var authorityName = $("#validName").val();
							if((authorityName!=null || authorityName!="") && authorityName == value){
								return true;
							}
							var result = "";
							$.ajax( {
								type : 'post',
								async : false,
								url : 'authority/authoritynamevalidate',
								data : {
									"authorityName" : "ROLE_"+value
								},
								success : function(data) {
									result = data;
								}
							});
							return result;
						} else {
							return true;
						}
		
					},
					message : '权限名已经被占用'
				},
				
				resourceValidate : {
					validator : function(value, param) {
						if (flag) {
							var resourceName = $("#validName").val();
							if((resourceName!=null || resourceName!="") && resourceName == value){
								return true;
							}
							var result = "";
							$.ajax( {
								type : 'post',
								async : false,
								url : 'resource/resourcenamevalidate',
								data : {
									"resourceName" : value
								},
								success : function(data) {
									result = data;
								}
							});
							return result;
						} else {
							return true;
						}
		
					},
					message : '资源名已经被占用'
				},
				
				wpsValidate : {
					validator : function(value, param) {
						if (flag) {
							var fwpsnum = $("#validName").val();
							if((fwpsnum!=null || fwpsnum!="") && fwpsnum == value){
								return true;
							}
							var result = "";
							$.ajax( {
								type : 'post',
								async : false,
								url : 'wps/wpsvalidate',
								data : {
									"fwpsnum" : value
								},
								success : function(data) {
									result = data;
								}
							});
							return result;
						} else {
							return true;
						}
		
					},
					message : '工艺参数编号已存在'
				},
				
				welderValidate : {
					validator : function(value, param) {
						if (flag) {
							var welderno = $("#validName").val();
							if((welderno!=null || welderno!="") && welderno == value){
								return true;
							}
							var result = "";
							$.ajax( {
								type : 'post',
								async : false,
								url : 'welders/weldersvalidate',
								data : {
									"welderno" : value
								},
								success : function(data) {
									result = data;
								}
							});
							return result;
						} else {
							return true;
						}
		
					},
					message : '焊工编号已存在'
				},
				
				wmEnoValidate : {
					validator : function(value, param) {
						if (flag) {
							var valideno = $("#valideno").val();
							if((valideno!=null || valideno!="") && valideno == value){
								return true;
							}
							var result = "";
							$.ajax( {
								type : 'post',
								async : false,
								url : 'weldingMachine/enovalidate',
								data : {
									"eno" : value
								},
								success : function(data) {
									result = data;
								}
							});
							return result;
						} else {
							return true;
						}

					},
					message : '焊机编码已经被占用'
				},
				
				wmGatheridValidate : {
					validator : function(value, param){
						if(flag){
							var iId = $('#iId').combobox('getValue');
							var validgid = $("#validgid").val();
							var olditem = $("#validinsf").val();
							if((validgid!=null || validgid!="") && validgid == value && iId == olditem){
								return true;
							}
							var result = "";
							$.ajax({
								type : 'post',
								async : false,
								url : 'weldingMachine/gidvalidate',
								data : {
									"gather" : value,
									"itemid" : iId
								},
								success : function(data){
									result = data;
								}
							});
							return result;
						}else{
							return true;
						}
					},
					message : '采集序号已经被占用'
				},
				
				checkNumber: {
		          validator: function (value, param) {
		            return /^[0-9]+$/.test(value);
		          },
		          message: '请输入数字'
			    },
			    
			    insfnameValidate : {
					validator : function(value, param){
						if(flag){
							var validname = $("#validname").val();
							if((validname!=null || validname!="") && validname == value){
								return true;
							}
							var result = "";
							$.ajax({
								type : 'post',
								async : false,
								url : 'insframework/insfdValidate',
								data : {
									"name" : value
								},
								success : function(data){
									result = data;
								}
							});
							return result;
						}else{
							return true;
						}
					},
					message : '项目名称已经被占用'
				},
				
				gathernoValidate : {
					validator : function(value, param){
						if(flag){
							var validgatherno = $("#validgatherno").val();
//							var itemid = $("#itemid").combobox('getValue');
							var olditem = $("#item").val();
							if((validgatherno!=null || validgatherno!="") && validgatherno == value){// && itemid == olditem
								return true;
							}
							var result = "";
							$.ajax({
								type : 'post',
								async : false,
								url : 'gather/gathernoValidate',
								data : {
									"gatherno" : value/*,
									"itemid" : itemid*/								
								},
								success : function(data){
									result = data;
								}
							});
							return result;
						}else{
							return true;
						}
					},
					message : '采集模块编号已经被占用'
				},
				
				wjNoValidate : {
					validator : function(value, param){
						if(flag){
							var oldno = $("#oldno").val();
							if((oldno!=null || oldno!="") && oldno == value){
								return true;
							}
							var result = "";
							$.ajax({
								type : 'post',
								async : false,
								url : 'weldedjunction/wjNoValidate',
								data : {
									"wjno" : value
								},
								success : function(data){
									result = data;
								}
							});
							return result;
						}else{
							return true;
						}
					},
					message : '焊缝编号已经被占用'
				},
				
				checkLength : {
					validator : function(value, param){
						if(flag){
							if(value.length!=4){
								return false;
							}else{
								return true;
							}
						}else{
							return true;
						}
					},
					message : '长度必须为四位'
				},
				
				phoneNum: { //验证手机号    
                    validator: function(value, param){
                    	if(value.length!=11){
							return false;
						}
                    	return /^1[3-8]+\d{9}$/.test(value);
                    },     
                    message: '请输入正确的手机号码'    
                }
			})
})