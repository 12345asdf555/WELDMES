package com.spring.controller;

import java.math.BigInteger;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageInfo;
import com.spring.model.MyUser;
import com.spring.model.Person;
import com.spring.model.WeldingMachine;
import com.spring.page.Page;
import com.spring.service.InsframeworkService;
import com.spring.service.PersonService;
import com.spring.service.WeldingMachineService;
import com.spring.util.IsnullUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/welders",produces = { "text/json;charset=UTF-8" })
public class PersonController {
	
	private Page page;
	private int pageIndex = 1;
	private int pageSize = 10;
	private int total = 0;
	public java.sql.Statement stmt =null;
	public java.sql.Connection conn = null;
	@Autowired
	private PersonService welderService;

	@Autowired
	private WeldingMachineService  machineService;

	@Autowired
	private InsframeworkService  im;
	
	IsnullUtil iutil = new IsnullUtil();
	
	/**
	 * 获取所有用户列表
	 * @param request
	 * @return
	 */
	
	@RequestMapping("/AllWelder")
	public String AllUser(HttpServletRequest request){
		return "welder/allWelder";
	}

	@RequestMapping("/catWelder")
	public String AllcatUser(HttpServletRequest request){
		return "catwelder/catWelder";
	}
	
	@RequestMapping("/getAllWelder")
	@ResponseBody
	public String getAllWelder(HttpServletRequest request){
		pageIndex = Integer.parseInt(request.getParameter("page"));
		pageSize = Integer.parseInt(request.getParameter("rows"));
		String search = request.getParameter("searchStr");
		String parentId = request.getParameter("parent");
		BigInteger parent = null;
		if(iutil.isNull(parentId)){
			parent = new BigInteger(parentId);
		}else{
			parent = im.getUserInsframework();
		}
		page = new Page(pageIndex,pageSize,total);
		List<Person> findAll = welderService.findAll(page,parent,search);
		long total = 0;
		
		if(findAll != null){
			PageInfo<Person> pageinfo = new PageInfo<Person>(findAll);
			total = pageinfo.getTotal();
		}
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(Person welder:findAll){
				json.put("id", welder.getId());
				json.put("name", welder.getName());
				json.put("welderno", welder.getWelderno());
				json.put("cellphone", welder.getCellphone());
				json.put("cardnum", welder.getCardnum());
				json.put("ownername", welder.getInsname());
				json.put("levename", welder.getValuename());
				json.put("qualiname", welder.getValuenamex());
				json.put("back", welder.getBack());
				json.put("leveid", welder.getLeveid());
				json.put("quali", welder.getQuali());
				json.put("owner", welder.getInsid());
				json.put("fcheckintime", welder.getFcheckintime());
				json.put("firstsuretime", welder.getFirstsuretime());
				json.put("workship", welder.getWorkship());
				json.put("workmaintime", welder.getWorkmaintime());
				json.put("workkmainname", welder.getWorkkmainname());
				json.put("workfirsttime", welder.getWorkfirsttime());
				json.put("workfirstname", welder.getWorkfirstname());
				json.put("worksecondtime", welder.getWorksecondtime());
				json.put("worksecondname", welder.getWorksecondname());
				json.put("level", welder.getLevel());
				json.put("score", welder.getScore());
				json.put("ifpase", welder.getIfpase());
				json.put("icworkime", welder.getIcworkime());
				json.put("halfyearsure", welder.getHalfyearsure());
				json.put("yearsure", welder.getYearsure());
				json.put("nextyear", welder.getNextyear());
				json.put("endTime", welder.getEndTime());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("total", total);
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/toAddWelder")
	public String toAddWelder(HttpServletRequest request){
		return "welder/addWelder";
	}
	
	@RequestMapping("/toAddcatWelder")
	public String toAddcatWelder(HttpServletRequest request){
		return "catwelder/addcatWelder";
	}
	
	@RequestMapping("/getLeve")
	@ResponseBody
	public String getIns(HttpServletRequest request){
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		int we = Integer.parseInt(request.getParameter("we"));
		List<Person> findLeve = welderService.findLeve(we);
		try{
			if(we==8){
			for(Person welder:findLeve){
				json.put("leveid", welder.getVal());
				json.put("levename", welder.getValuename());
				ary.add(json);
			}
			}else{
				for(Person welder:findLeve){
					json.put("quaid", welder.getVal());
					json.put("quaname", welder.getValuename());
					ary.add(json);
				}
			}
				
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("rows", ary);
		return obj.toString();
/*		return "redirect:/user/AllUser";*/
	}
	
	@RequestMapping("/addWelder")
	@ResponseBody
	public String addWelder(HttpServletRequest request){
		Person welder = new Person();
		MyUser myuser = (MyUser) SecurityContextHolder.getContext()  
			    .getAuthentication()  
			    .getPrincipal();
		String creat = String.valueOf(myuser.getId());
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		JSONObject obj = new JSONObject();
		try{
			welder.setQuali(Integer.parseInt(request.getParameter("qua")));
			welder.setLeveid(Integer.parseInt(request.getParameter("leve")));
			welder.setOwner(new BigInteger(request.getParameter("ins")));
/*			String sea = Integer.toHexString(Integer.valueOf(request.getParameter("welderno")));
			if(sea.length()!=4){
                int lenth=4-sea.length();
                for(int i=0;i<lenth;i++){
                	sea="0"+sea;
                }
              }*/
			welder.setWelderno(request.getParameter("welderno"));
			welder.setName(request.getParameter("name"));
			welder.setCellphone(request.getParameter("cellphone"));
			welder.setCardnum(request.getParameter("cardnum"));
			welder.setBack(request.getParameter("back"));
			welder.setCreater(new BigInteger(creat));
			welder.setUpdater(new BigInteger(creat));
//			welder.setCreatedate(sdf.parse(sdf.format((new Date()).getTime())));
//			welder.setUpdatedate(sdf.parse(sdf.format((new Date()).getTime())));
			welderService.save(welder);
			obj.put("success", true);
		}catch(Exception e){
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
/*		return "redirect:/user/AllUser";*/
	}
	
	@RequestMapping("/toUpdateWelder")
	public String toUpdateWps(@RequestParam BigInteger fid,HttpServletRequest request){
		Person Welder = welderService.findById(fid);
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		request.setAttribute("welder", Welder);
//		request.setAttribute("update", sdf.format(Welder.getUpdatedate()));
//		request.setAttribute("create", sdf.format(Welder.getCreatedate()));
		return "welder/editWelder";
	}
	
	
	
	@RequestMapping("/updateWelder")
	@ResponseBody
	public String updateWelder(HttpServletRequest request){
		Person welder = new Person();
		MyUser myuser = (MyUser) SecurityContextHolder.getContext()  
			    .getAuthentication()  
			    .getPrincipal();
		String creat = String.valueOf(myuser.getId());
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		JSONObject obj = new JSONObject();
		try{
			welder.setId(new BigInteger(request.getParameter("FID")));
			welder.setQuali(Integer.parseInt(request.getParameter("qua")));
			welder.setLeveid(Integer.parseInt(request.getParameter("leve")));
			welder.setOwner(new BigInteger(request.getParameter("ins")));
			welder.setWelderno(request.getParameter("welderno"));
			welder.setName(request.getParameter("name"));
			welder.setCellphone(request.getParameter("cellphone"));
			welder.setCardnum(request.getParameter("cardnum"));
			welder.setBack(request.getParameter("back"));
			welder.setUpdater(new BigInteger(creat));
//			welder.setUpdatedate(sdf.parse(sdf.format((new Date()).getTime())));
//			welder.setCreatedate(sdf.parse(request.getParameter("createdate")));
		    welderService.update(welder);
			obj.put("success", true);
			}catch(Exception e){
				obj.put("success", false);
				obj.put("errorMsg", e.getMessage());
			}
			return obj.toString();

	}
	
	@RequestMapping("/toDestroyWelder")
	public String toDestroyWps(@RequestParam BigInteger fid,HttpServletRequest request){
		Person Welder = welderService.findById(fid);
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		request.setAttribute("welder", Welder);
//		request.setAttribute("update", sdf.format(Welder.getUpdatedate()));
//		request.setAttribute("create", sdf.format(Welder.getCreatedate()));
		return "welder/destroyWelder";
	}
	
	@RequestMapping("/destroyWelder")
	@ResponseBody
	public String destroyWelder(@RequestParam BigInteger fid){

			JSONObject obj = new JSONObject();
			try{
				welderService.delete(fid);
				 obj.put("success", true);
			}catch(Exception e){
				obj.put("success", false);
				obj.put("errorMsg", e.getMessage());
			}
			return obj.toString();
	}
	
	@RequestMapping("/weldersvalidate")
	@ResponseBody
	private String weldersvalidate(@RequestParam String welderno){
		boolean data = true;
		int count = welderService.getUsernameCount(welderno);
		if(count>0){
			data = false;
		}
		return data + "";
	}
	
	/**
	 * cat焊工焊机增加
	 * @param request
	 * @return
	 */
	@RequestMapping("/addcatWelder")
	@ResponseBody
	public String addcatWelder(HttpServletRequest request){
		Person welder = new Person();
		MyUser myuser = (MyUser) SecurityContextHolder.getContext()  
			    .getAuthentication()  
			    .getPrincipal();
		String creat = String.valueOf(myuser.getId());
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		JSONObject obj = new JSONObject();
		try{
			welder.setQuali(Integer.parseInt(request.getParameter("qua")));
			welder.setLeveid(Integer.parseInt(request.getParameter("leve")));
			welder.setOwner(new BigInteger(request.getParameter("ins")));
/*			String sea = Integer.toHexString(Integer.valueOf(request.getParameter("welderno")));
			if(sea.length()!=4){
                int lenth=4-sea.length();
                for(int i=0;i<lenth;i++){
                	sea="0"+sea;
                }
              }*/
			welder.setWelderno(request.getParameter("welderno"));
			welder.setName(request.getParameter("name"));
			welder.setCellphone(request.getParameter("cellphone"));
			welder.setCardnum(request.getParameter("cardnum"));
			welder.setBack(request.getParameter("back"));
			welder.setCreater(new BigInteger(creat));
			welder.setUpdater(new BigInteger(creat));
			welder.setFcheckintime(request.getParameter("fcheckintime"));
			welder.setFirstsuretime(request.getParameter("firstsuretime"));
			welder.setWorkkmainname(request.getParameter("workkmainname"));
			welder.setWorkmaintime(request.getParameter("workmaintime"));
			welder.setWorkfirstname(request.getParameter("workfirstname"));
			welder.setWorkfirsttime(request.getParameter("workfirsttime"));
			welder.setWorksecondtime(request.getParameter("worksecondtime"));
			welder.setWorksecondname(request.getParameter("worksecondname"));
			welder.setWorkship(request.getParameter("workship"));
			welder.setLevel(request.getParameter("level"));
			welder.setScore(request.getParameter("score"));
			welder.setIfpase(request.getParameter("ifpase"));
			welder.setIcworkime(request.getParameter("icworkime"));
			welder.setHalfyearsure(request.getParameter("halfyearsure"));
			welder.setYearsure(request.getParameter("yearsure"));
			welder.setNextyear(request.getParameter("nextyear"));
//			welder.setCreatedate(sdf.parse(sdf.format((new Date()).getTime())));
//			welder.setUpdatedate(sdf.parse(sdf.format((new Date()).getTime())));
			welderService.catsave(welder);
			obj.put("success", true);
		}catch(Exception e){
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
/*		return "redirect:/user/AllUser";*/
	}
	/**
	 * cat焊工修改
	 * @param request
	 * @return
	 */
	@RequestMapping("/updatecatWelder")
	@ResponseBody
	public String updatecatWelder(HttpServletRequest request){
		Person welder = new Person();
		MyUser myuser = (MyUser) SecurityContextHolder.getContext()  
			    .getAuthentication()  
			    .getPrincipal();
		String creat = String.valueOf(myuser.getId());
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		JSONObject obj = new JSONObject();
		try{
			welder.setId(new BigInteger(request.getParameter("FID")));
			welder.setQuali(Integer.parseInt(request.getParameter("qua")));
			welder.setLeveid(Integer.parseInt(request.getParameter("leve")));
			welder.setOwner(new BigInteger(request.getParameter("ins")));
			welder.setWelderno(request.getParameter("welderno"));
			welder.setName(request.getParameter("name"));
			welder.setCellphone(request.getParameter("cellphone"));
			welder.setCardnum(request.getParameter("cardnum"));
			welder.setBack(request.getParameter("back"));
			welder.setUpdater(new BigInteger(creat));
			welder.setFcheckintime(request.getParameter("fcheckintime"));
			welder.setWorkship(request.getParameter("workship"));
			welder.setWorkkmainname(request.getParameter("workkmainname"));
			welder.setWorkmaintime(request.getParameter("workmaintime"));
			welder.setWorkfirstname(request.getParameter("workfirstname"));
			welder.setWorkfirsttime(request.getParameter("workfirsttime"));
			welder.setWorksecondtime(request.getParameter("worksecondtime"));
			welder.setWorksecondname(request.getParameter("worksecondname"));
			welder.setFirstsuretime(request.getParameter("firstsuretime"));
			welder.setLevel(request.getParameter("level"));
			welder.setScore(request.getParameter("score"));
			welder.setIfpase(request.getParameter("ifpase"));
			welder.setIcworkime(request.getParameter("icworkime"));
			welder.setHalfyearsure(request.getParameter("halfyearsure"));
			welder.setYearsure(request.getParameter("yearsure"));
			welder.setNextyear(request.getParameter("nextyear"));
//			welder.setUpdatedate(sdf.parse(sdf.format((new Date()).getTime())));
//			welder.setCreatedate(sdf.parse(request.getParameter("createdate")));
		    welderService.catupdate(welder);
//		    String symbol = request.getParameter("symbol");
//			Class.forName("com.mysql.jdbc.Driver");  
//            conn = DriverManager.getConnection("jdbc:mysql://121.196.222.216:8080/WELDMES?user=db_admin&password=PIJXmcLRa0QgOw2c&useUnicode=true&autoReconnect=true&characterEncoding=UTF8");
//            stmt= conn.createStatement();
//            ArrayList<String> listarraymail = new ArrayList<String>();
//			ArrayList<String> listarraymailer = new ArrayList<String>();
//			String sqlmail = "SELECT tb_welder.fname,tb_welder.fhalfyearsure,tb_welder.ficworkime,tb_welder.fyearsure,tb_welder.fnextyear FROM tb_welder";
//			String sqlmailer = "SELECT femailname,femailaddress,femailtype FROM tb_catemailinf";
//			ResultSet rs;
//			try {
//				rs = stmt.executeQuery(sqlmail);
//            	while (rs.next()) {
//            		listarraymail.add(rs.getString("fweldername"));
//            		listarraymail.add(rs.getString("ficworkime"));
//            		listarraymail.add(rs.getString("fhalfyearsure"));
//            		listarraymail.add(rs.getString("fyearsure"));
//            		listarraymail.add(rs.getString("fnextyear"));
//            	}
//            	rs = stmt.executeQuery(sqlmailer);
//            	while (rs.next()) {
//            		listarraymailer.add(rs.getString("femailname"));
//            		listarraymailer.add(rs.getString("femailaddress"));
//            		listarraymailer.add(rs.getString("femailtype"));
//            	}
//			} catch (SQLException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//
//			String icworktime = "";
//			String halfyearname = "";
//			String yearname = "";
//			String nextyearname = "";
//			
//			if(symbol.equals("1")){
//				for(int i=0;i<listarraymail.size();i+=5){
//					
//					Date dateic = null;
//					//ic卡有效期提醒
//					try{
//						dateic = DateTools.parse("yyyy-MM-dd HH:mm:ss",listarraymail.get(i+1));
//						Calendar canow = Calendar.getInstance();
//						Calendar ca = Calendar.getInstance();
//						ca.setTime(dateic);
//						ca.add(Calendar.DAY_OF_MONTH, -60);
//						Date resultDate = ca.getTime(); // 结果  
//						String ictime = DateTools.format("yyyy-MM-dd HH:mm:ss",resultDate);
//						
//						String[] timebuf = ictime.split(" ");
//						String[] checkictimebuf = DateTools.format("yyyy-MM-dd HH:mm:ss",canow.getTime()).split(" ");
//						
//						ictime = timebuf[0];
//						String checkictime = checkictimebuf[0];
//								
//						if(ictime.equals(checkictime)){
//							if(icworktime.equals("")){
//								icworktime = listarraymail.get(i);
//							}else{
//								icworktime = listarraymail.get(i) + "、" + icworktime ;
//							}
//						}
//						
//					}catch(Exception e){
//						e.getStackTrace();
//					}
//					
//				}
//				
//				if(!icworktime.equals("")){
//					try{
//						
//						for(int j=0;j<listarraymailer.size();j+=3){
//							if(listarraymailer.get(j+2).equals("1")){
//								final Properties props = new Properties();
//								final String SSL_FACTORY = "javax.net.ssl.SSLSocketFactory";
//								props.setProperty("mail.smtp.socketFactory.fallback", "false");
//							    //props.setProperty("mail.transport.protocol", "smtp");
//							    //props.put("mail.smtp.auth", "true");
//							    //props.put("mail.smtp.host","smtpdm.aliyun.com");// smtp服务器地址
//								props.setProperty("mail.smtp.host","smtp.163.com"); //服务器地址
//							    props.setProperty("mail.smtp.port", "465");
//								props.setProperty("mail.smtp.socketFactory.class", SSL_FACTORY);
//							    props.setProperty("mail.smtp.socketFactory.port", "465");
//							    props.setProperty("mail.smtp.auth", "true");
//							    
//							 // 发件人的账号
//						        props.put("mail.user", "jingsudongyu123@163.com");
//						        // 访问SMTP服务时需要提供的密码
//						        props.put("mail.password", "jsdy123456");
//							    
//							 // 构建授权信息，用于进行SMTP进行身份验证
//						        Authenticator authenticator = new Authenticator() {
//						            @Override
//						            protected PasswordAuthentication getPasswordAuthentication() {
//						                // 用户名、密码
//						                String userName = props.getProperty("mail.user");
//						                String password = props.getProperty("mail.password");
//						                return new PasswordAuthentication(userName, password);
//						            }
//						        };
//						        // 使用环境属性和授权信息，创建邮件会话
//							    
//						        Session session = Session.getInstance(props, authenticator);
//							    session.setDebug(true);
//							    
//							    Message msg = new MimeMessage(session);
//							    msg.setSubject("员工ic卡到期提醒");
//							    msg.setText(icworktime + " ic卡将要过期");
//							    msg.setSentDate(new Date());
//							    msg.setFrom(new InternetAddress("jiangsudongyu123@163.com"));//发件人邮箱
//							    msg.setRecipient(Message.RecipientType.TO,
//							            new InternetAddress(listarraymailer.get(j+1))); //收件人邮箱
//							    //msg.addRecipient(Message.RecipientType.CC, 
//					    		//new InternetAddress("XXXXXXXXXXX@qq.com")); //抄送人邮箱
//							    msg.saveChanges();
//
//							    Transport transport = session.getTransport();
//							    transport.connect("jiangsudongyu123@163.com","qwerasdf12345678");//发件人邮箱,授权码
//							    
//							    transport.sendMessage(msg, msg.getAllRecipients());
//							    transport.close();
//							    
//							    String nowtime = DateTools.format("yyyy-MM-dd HH:mm:ss",new Date());
//							    String sqlmailcheck = "INSERT INTO tb_catemailcheck (femailname, femailaddress, femailtext, femailstatus, femailtime) VALUES ('" + listarraymailer.get(j) + "' , '" + listarraymailer.get(j+1) + "' , '" + icworktime + " ic卡将要过期" + "' , '2' , '" + nowtime + "')";
//							    stmt.execute(sqlmailcheck);
//							}
//						}
//						
//				    }catch(Exception e){
//				    	e.getStackTrace();
//				    }
//				
//				}
//				
//			}else if(symbol.equals("2")){
//				for(int i=0;i<listarraymail.size();i+=5){
//					
//					Date dateic = null;
//					//半年
//					try{
//						dateic = DateTools.parse("yyyy-MM-dd HH:mm:ss",listarraymail.get(i+2));
//						
//						Calendar canow = Calendar.getInstance();
//						Calendar ca = Calendar.getInstance();
//						ca.setTime(dateic);
//						ca.add(Calendar.DAY_OF_MONTH, -15);
//						Date resultDate = ca.getTime(); // 结果  
//						String halfyeartime = DateTools.format("yyyy-MM-dd HH:mm:ss",resultDate);
//						
//						String[] timebuf = halfyeartime.split(" ");
//						String[] halfyearbuf = DateTools.format("yyyy-MM-dd HH:mm:ss",canow.getTime()).split(" ");
//						
//						halfyeartime = timebuf[0];
//						String checkictime = halfyearbuf[0];
//								
//						if(halfyeartime.equals(checkictime)){
//							if(halfyearname.equals("")){
//								halfyearname = listarraymail.get(i);
//							}else{
//								halfyearname = listarraymail.get(i) + "、" + halfyearname ;
//							}
//						}
//						
//					}catch(Exception e){
//						e.getStackTrace();
//					}
//					
//				}
//				
//				if(!halfyearname.equals("")){
//					try{
//						
//						for(int j=0;j<listarraymailer.size();j+=3){
//							if(listarraymailer.get(j+2).equals("2")){
//								final Properties props = new Properties();
//								final String SSL_FACTORY = "javax.net.ssl.SSLSocketFactory";
//								props.setProperty("mail.smtp.socketFactory.fallback", "false");
//							    //props.setProperty("mail.transport.protocol", "smtp");
//							    //props.put("mail.smtp.auth", "true");
//							    //props.put("mail.smtp.host","smtpdm.aliyun.com");// smtp服务器地址
//								props.setProperty("mail.smtp.host","smtp.163.com"); //服务器地址
//							    props.setProperty("mail.smtp.port", "465");
//								props.setProperty("mail.smtp.socketFactory.class", SSL_FACTORY);
//							    props.setProperty("mail.smtp.socketFactory.port", "465");
//							    props.setProperty("mail.smtp.auth", "true");
//							    
//							    // 发件人的账号
//						        props.put("mail.user", "jingsudongyu123@163.com");
//						        // 访问SMTP服务时需要提供的密码
//						        props.put("mail.password", "jsdy123456");
//							    
//							 // 构建授权信息，用于进行SMTP进行身份验证
//						        Authenticator authenticator = new Authenticator() {
//						            @Override
//						            protected PasswordAuthentication getPasswordAuthentication() {
//						                // 用户名、密码
//						                String userName = props.getProperty("mail.user");
//						                String password = props.getProperty("mail.password");
//						                return new PasswordAuthentication(userName, password);
//						            }
//						        };
//						        // 使用环境属性和授权信息，创建邮件会话
//							    
//						        Session session = Session.getInstance(props, authenticator);
//							    session.setDebug(true);
//							    
//							    Message msg = new MimeMessage(session);
//							    msg.setSubject("员工入职半年认证");
//							    msg.setText(halfyearname + " 需要半年认证");
//							    msg.setSentDate(new Date());
//							    msg.setFrom(new InternetAddress("jiangsudongyu123@163.com"));//发件人邮箱
//							    msg.setRecipient(Message.RecipientType.TO,
//							            new InternetAddress(listarraymailer.get(j+1))); //收件人邮箱
//							    //msg.addRecipient(Message.RecipientType.CC, 
//					    		//new InternetAddress("XXXXXXXXXXX@qq.com")); //抄送人邮箱
//							    msg.saveChanges();
//
//							    Transport transport = session.getTransport();
//							    transport.connect("jiangsudongyu123@163.com","qwerasdf12345678");//发件人邮箱,授权码
//							    
//							    transport.sendMessage(msg, msg.getAllRecipients());
//							    transport.close();
//							    
//							    String nowtime = DateTools.format("yyyy-MM-dd HH:mm:ss",new Date());
//							    String sqlmailcheck1 = "INSERT INTO tb_catemailcheck (femailname, femailaddress, femailtext, femailstatus, femailtime) VALUES ('" + listarraymailer.get(j) + "' , '" + listarraymailer.get(j+1) + "' , '" + halfyearname + " 入职已满半年" + "' , '1' , '" + nowtime + "')";
//							    stmt.execute(sqlmailcheck1);
//							}
//						}
//						
//				    }catch(Exception e){
//				    	e.getStackTrace();
//				    }
//				}
//			}else if(symbol.equals("3")){
//				for(int i=0;i<listarraymail.size();i+=5){
//					
//					Date dateic = null;
//					//一年
//					try{
//						dateic = DateTools.parse("yyyy-MM-dd HH:mm:ss",listarraymail.get(i+3));
//						
//						Calendar canow = Calendar.getInstance();
//						Calendar ca = Calendar.getInstance();
//						ca.setTime(dateic);
//						ca.add(Calendar.DAY_OF_MONTH, -15);
//						Date resultDate = ca.getTime(); // 结果  
//						String yeartime = DateTools.format("yyyy-MM-dd HH:mm:ss",resultDate);
//						
//						String[] timebuf = yeartime.split(" ");
//						String[] yearbuf = DateTools.format("yyyy-MM-dd HH:mm:ss",canow.getTime()).split(" ");
//						
//						yeartime = timebuf[0];
//						String checkictime = yearbuf[0];
//								
//						if(yeartime.equals(checkictime)){
//							if(yearname.equals("")){
//								yearname = listarraymail.get(i);
//							}else{
//								yearname = listarraymail.get(i) + "、" + yearname ;
//							}
//						}
//						
//					}catch(Exception e){
//						e.getStackTrace();
//					}
//					
//				}
//				
//				if(!yearname.equals("")){
//					try{
//						
//						for(int j=0;j<listarraymailer.size();j+=3){
//							if(listarraymailer.get(j+2).equals("2")){
//								final Properties props = new Properties();
//								final String SSL_FACTORY = "javax.net.ssl.SSLSocketFactory";
//								props.setProperty("mail.smtp.socketFactory.fallback", "false");
//							    //props.setProperty("mail.transport.protocol", "smtp");
//							    //props.put("mail.smtp.auth", "true");
//							    //props.put("mail.smtp.host","smtpdm.aliyun.com");// smtp服务器地址
//								props.setProperty("mail.smtp.host","smtp.163.com"); //服务器地址
//							    props.setProperty("mail.smtp.port", "465");
//								props.setProperty("mail.smtp.socketFactory.class", SSL_FACTORY);
//							    props.setProperty("mail.smtp.socketFactory.port", "465");
//							    props.setProperty("mail.smtp.auth", "true");
//							    
//							    // 发件人的账号
//						        props.put("mail.user", "jingsudongyu123@163.com");
//						        // 访问SMTP服务时需要提供的密码
//						        props.put("mail.password", "jsdy123456");
//							    
//							 // 构建授权信息，用于进行SMTP进行身份验证
//						        Authenticator authenticator = new Authenticator() {
//						            @Override
//						            protected PasswordAuthentication getPasswordAuthentication() {
//						                // 用户名、密码
//						                String userName = props.getProperty("mail.user");
//						                String password = props.getProperty("mail.password");
//						                return new PasswordAuthentication(userName, password);
//						            }
//						        };
//						        // 使用环境属性和授权信息，创建邮件会话
//							    
//						        Session session = Session.getInstance(props, authenticator);
//							    session.setDebug(true);
//							    
//							    Message msg = new MimeMessage(session);
//							    msg.setSubject("员工入职一年认证");
//							    msg.setText(yearname + " 需要年度认证");
//							    msg.setSentDate(new Date());
//							    msg.setFrom(new InternetAddress("jiangsudongyu123@163.com"));//发件人邮箱
//							    msg.setRecipient(Message.RecipientType.TO,
//							            new InternetAddress(listarraymailer.get(j+1))); //收件人邮箱
//							    //msg.addRecipient(Message.RecipientType.CC, 
//					    		//new InternetAddress("XXXXXXXXXXX@qq.com")); //抄送人邮箱
//							    msg.saveChanges();
//
//							    Transport transport = session.getTransport();
//							    transport.connect("jiangsudongyu123@163.com","qwerasdf12345678");//发件人邮箱,授权码
//							    
//							    transport.sendMessage(msg, msg.getAllRecipients());
//							    transport.close();
//							    
//							    String nowtime = DateTools.format("yyyy-MM-dd HH:mm:ss",new Date());
//							    String sqlmailcheck1 = "INSERT INTO tb_catemailcheck (femailname, femailaddress, femailtext, femailstatus, femailtime) VALUES ('" + listarraymailer.get(j) + "' , '" + listarraymailer.get(j+1) + "' , '" + halfyearname + " 入职已满半年" + "' , '1' , '" + nowtime + "')";
//							    stmt.execute(sqlmailcheck1);
//							}
//						}
//						
//				    }catch(Exception e){
//				    	e.getStackTrace();
//				    }
//				}
//			}else if(symbol.equals("4")){
//				for(int i=0;i<listarraymail.size();i+=5){
//					
//					Date dateic = null;
//					//两年
//					try{
//						dateic = DateTools.parse("yyyy-MM-dd HH:mm:ss",listarraymail.get(i+4));
//						
//						Calendar canow = Calendar.getInstance();
//						Calendar ca = Calendar.getInstance();
//						ca.setTime(dateic);
//						ca.add(Calendar.DAY_OF_MONTH, -15);
//						Date resultDate = ca.getTime(); // 结果  
//						String nextyeartime = DateTools.format("yyyy-MM-dd HH:mm:ss",resultDate);
//						
//						String[] timebuf = nextyeartime.split(" ");
//						String[] nextyearbuf = DateTools.format("yyyy-MM-dd HH:mm:ss",canow.getTime()).split(" ");
//						
//						nextyeartime = timebuf[0];
//						String checkictime = nextyearbuf[0];
//								
//						if(nextyeartime.equals(checkictime)){
//							if(nextyearname.equals("")){
//								nextyearname = listarraymail.get(i);
//							}else{
//								nextyearname = listarraymail.get(i) + "、" + nextyearname ;
//							}
//						}
//						
//					}catch(Exception e){
//						e.getStackTrace();
//					}
//					
//				}
//				
//				if(!nextyearname.equals("")){
//					try{
//						
//						for(int j=0;j<listarraymailer.size();j+=3){
//							if(listarraymailer.get(j+2).equals("2")){
//								final Properties props = new Properties();
//								final String SSL_FACTORY = "javax.net.ssl.SSLSocketFactory";
//								props.setProperty("mail.smtp.socketFactory.fallback", "false");
//							    //props.setProperty("mail.transport.protocol", "smtp");
//							    //props.put("mail.smtp.auth", "true");
//							    //props.put("mail.smtp.host","smtpdm.aliyun.com");// smtp服务器地址
//								props.setProperty("mail.smtp.host","smtp.163.com"); //服务器地址
//							    props.setProperty("mail.smtp.port", "465");
//								props.setProperty("mail.smtp.socketFactory.class", SSL_FACTORY);
//							    props.setProperty("mail.smtp.socketFactory.port", "465");
//							    props.setProperty("mail.smtp.auth", "true");
//							    
//							    // 发件人的账号
//						        props.put("mail.user", "jingsudongyu123@163.com");
//						        // 访问SMTP服务时需要提供的密码
//						        props.put("mail.password", "jsdy123456");
//							    
//							 // 构建授权信息，用于进行SMTP进行身份验证
//						        Authenticator authenticator = new Authenticator() {
//						            @Override
//						            protected PasswordAuthentication getPasswordAuthentication() {
//						                // 用户名、密码
//						                String userName = props.getProperty("mail.user");
//						                String password = props.getProperty("mail.password");
//						                return new PasswordAuthentication(userName, password);
//						            }
//						        };
//						        // 使用环境属性和授权信息，创建邮件会话
//							    
//						        Session session = Session.getInstance(props, authenticator);
//							    session.setDebug(true);
//							    
//							    Message msg = new MimeMessage(session);
//							    msg.setSubject("员工入职两年认证");
//							    msg.setText(nextyearname + " 需要次年认证");
//							    msg.setSentDate(new Date());
//							    msg.setFrom(new InternetAddress("jiangsudongyu123@163.com"));//发件人邮箱
//							    msg.setRecipient(Message.RecipientType.TO,
//							            new InternetAddress(listarraymailer.get(j+1))); //收件人邮箱
//							    //msg.addRecipient(Message.RecipientType.CC, 
//					    		//new InternetAddress("XXXXXXXXXXX@qq.com")); //抄送人邮箱
//							    msg.saveChanges();
//
//							    Transport transport = session.getTransport();
//							    transport.connect("jiangsudongyu123@163.com","qwerasdf12345678");//发件人邮箱,授权码
//							    
//							    transport.sendMessage(msg, msg.getAllRecipients());
//							    transport.close();
//							    
//							    String nowtime = DateTools.format("yyyy-MM-dd HH:mm:ss",new Date());
//							    String sqlmailcheck1 = "INSERT INTO tb_catemailcheck (femailname, femailaddress, femailtext, femailstatus, femailtime) VALUES ('" + listarraymailer.get(j) + "' , '" + listarraymailer.get(j+1) + "' , '" + halfyearname + " 入职已满半年" + "' , '1' , '" + nowtime + "')";
//							    stmt.execute(sqlmailcheck1);
//							}
//						}
//						
//				    }catch(Exception e){
//				    	e.getStackTrace();
//			    }
//}
//			}
			
			obj.put("success", true);
			}catch(Exception e){
				obj.put("success", false);
				obj.put("errorMsg", e.getMessage());
			}
			return obj.toString();

	}
	/**
	 * cat焊工删除
	 * @param request
	 * @return
	 */
	@RequestMapping("/destroycatWelder")
	@ResponseBody
	public String destroycatWelder(@RequestParam BigInteger fid){

			JSONObject obj = new JSONObject();
			try{
				welderService.catdelete(fid);
				 obj.put("success", true);
			}catch(Exception e){
				obj.put("success", false);
				obj.put("errorMsg", e.getMessage());
			}
			return obj.toString();
	}
	
	/**
	 * 获取焊工焊机信息
	 * @param request
	 * @return
	 */
	@RequestMapping("/getWelderMachine")
	@ResponseBody
	public String getWelderMachine(HttpServletRequest request){
		JSONObject machinerjson = new JSONObject();
		JSONArray machineary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			List<WeldingMachine> machinelist = machineService.getAllMachine();
			for(WeldingMachine machine:machinelist){
				machinerjson.put("insfname", machine.getInsframeworkId().getName());
				machinerjson.put("machineno", machine.getEquipmentNo());
				machinerjson.put("machineid", machine.getId());
				machineary.add(machinerjson);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("machineary", machineary);
		return obj.toString();
	}
	
}