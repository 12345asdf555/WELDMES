package com.spring.controller;

import java.math.BigInteger;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageInfo;
import com.spring.model.Dictionarys;
import com.spring.model.Insframework;
import com.spring.model.MyUser;
import com.spring.model.User;
import com.spring.page.Page;
import com.spring.service.DictionaryService;
import com.spring.service.InsframeworkService;
import com.spring.service.UserService;
import com.spring.util.IsnullUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/user",produces = { "text/json;charset=UTF-8" })
public class UserController {
	
	private Page page;
	private int pageIndex = 1;
	private int pageSize = 10;
	private int total = 0;
	@Autowired
	private UserService userService;
	
	@Autowired
	private InsframeworkService im;
	
	@Autowired
	private DictionaryService dm;
	
	IsnullUtil iutil = new IsnullUtil();
	
	/**
	 * 获取所有用户列表
	 * @param request
	 * @return
	 */
	@RequestMapping("/logout")

	public String AllLouout(HttpServletRequest request,HttpServletResponse response){
		    Authentication auth = (Authentication) SecurityContextHolder.getContext().getAuthentication();
		    if (auth != null){    
		        new SecurityContextLogoutHandler().logout(request,response,auth);
		    }
		    return "redirect:/login.jsp?logout";
	}
	
	@RequestMapping("/AllUser")
	public String AllUser(HttpServletRequest request){
		return "user/allUser";
	}
	@RequestMapping("/Error")
	public String Error(HttpServletRequest request){
		return "/Error";
	}
	@RequestMapping("/getAllUser")
	@ResponseBody
	public String getAllUser(HttpServletRequest request){
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
		List<User> findAll = userService.findAll(page,parent,search);
		long total = 0;
		
		if(findAll != null){
			PageInfo<User> pageinfo = new PageInfo<User>(findAll);
			total = pageinfo.getTotal();
		}

		request.setAttribute("userList", findAll);
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(User user:findAll){
				json.put("id", user.getId());
				json.put("userName", user.getUserName());
				json.put("userLoginName", user.getUserLoginName());
				json.put("userPhone", user.getUserPhone());
				json.put("userEmail",user.getUserEmail());
				json.put("userPosition", user.getUserPosition());
				json.put("users_insframework", user.getInsname());
				json.put("insid", user.getInsid());
				json.put("status", user.getStatusname());
				json.put("statusid", user.getStatus());
				json.put("userPassword", user.getUserPassword());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("total", total);
		obj.put("rows", ary);
		return obj.toString();
	}
	
	/**
	 * 跳转到添加用户界面
	 * @param request
	 * @return
	 */
	@RequestMapping("/toAddUser")
	public String toAddUser(HttpServletRequest request){
		String insfname = request.getParameter("name");
		String insid = request.getParameter("insid");
		request.setAttribute("insfname", insfname);
		request.setAttribute("insid", insid);
		return "user/addUser";
	}
	/**
	 * 添加用户并重定向
	 * @param user
	 * @param request
	 * @return
	 */
	@RequestMapping("/addUser")
	@ResponseBody
	public String addUser(User user,HttpServletRequest request){
       
		JSONObject obj = new JSONObject();
		try{
		String fs = user.getUserPassword();
		String xxx = DigestUtils.md5Hex(fs);
		user.setUserPassword(xxx);
		user.setUserInsframework(Long.parseLong(request.getParameter("userInsframework")));
        user.setStatus(Integer.parseInt(request.getParameter("status")));
		userService.save(user);
        String str = request.getParameter("rid");
        if(null!=str&&""!=str)
        {
        String[] s = str.split(",");
        for (int i = 0; i < s.length; i++) {
            Integer id = Integer.parseInt(s[i]);
            user.setId(userService.findByName(user.getUserLoginName()));
            user.setRoleName(userService.findByRoleId(id));
            user.setRoleId(id);
            userService.saveRole(user);
        }
        }
/*		userService.save(user);*/
		obj.put("success", true);
		}catch(Exception e){
			obj.put("success", false);
			obj.put("errorMsg", e.getMessage());
		}
		return obj.toString();
/*		return "redirect:/user/AllUser";*/
	}
	
	/**
	 *编辑用户
	 * @param user
	 * @param request
	 * @return
	 */
	@RequestMapping("/updateUser")
	@ResponseBody
	public String updateUser(HttpServletRequest request){
		User user = new User();
		JSONObject obj = new JSONObject();
		try{
			String fs = request.getParameter("userPassword");
			if(fs.length()<32){
				String xxx = DigestUtils.md5Hex(fs);
				user.setUserPassword(xxx);
			}else{
				user.setUserPassword(fs);
			}
			user.setUserName(request.getParameter("userName"));
			user.setUserLoginName(request.getParameter("userLoginName"));
			user.setUserPhone(request.getParameter("userPhone"));
			user.setUserEmail(request.getParameter("userEmail"));
			user.setUserPosition(request.getParameter("userPosition"));
	        user.setUserInsframework(Long.parseLong(request.getParameter("userInsframework")));
	        user.setStatus(Integer.parseInt(request.getParameter("status")));
			String str = request.getParameter("rid");
			Integer uid = Integer.parseInt(request.getParameter("uid"));
			user.setId(uid);
			userService.deleteRole(uid);
			if(null!=str&&""!=str)
			{
	        String[] s = str.split(",");
	        for (int i = 0; i < s.length; i++) {
	            Integer id = Integer.parseInt(s[i]);
	            /*userService.deleteRole(userService.updateUserRole(uid));*/
	            user.setRoleName(userService.findByRoleId(id));
	            user.setRoleId(id);
                userService.saveRole(user);
	        }
			}
		    userService.update(user);
			obj.put("success", true);
			}catch(Exception e){
				obj.put("success", false);
				obj.put("errorMsg", e.getMessage());
			}
			return obj.toString();

	}
	/**
	 * 根据id查询单个用户
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping("/getUser")
	public String getUser(@RequestParam int id,HttpServletRequest request){
		request.setAttribute("user", userService.findById(new Integer(id)));
		return "user/editUser";
	}
	
	@RequestMapping("/desUser")
	public String desUser(@RequestParam int id,HttpServletRequest request){
		request.setAttribute("user", userService.findById(new Integer(id)));
		return "user/destroyUser";
	}
	/**
	 * 删除用户
	 * @param id
	 * @param request
	 * @param response
	 * @return 
	 */
	@RequestMapping("/delUser")
	@ResponseBody
	public String delUser(@RequestParam int id){

			JSONObject obj = new JSONObject();
			try{
				 User user = userService.findById(new Integer(id));
				 userService.delete(new Integer(user.getId()));
				 obj.put("success", true);
			}catch(Exception e){
				e.printStackTrace();
				obj.put("success", false);
				obj.put("errorMsg", e.getMessage());
			}
			return obj.toString();
	}
	@RequestMapping("/getAllRole")
	@ResponseBody
	public String getAllRole(HttpServletRequest request){
		
		List<User> findAllRole = userService.findAllRole();
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(User user:findAllRole){
				json.put("id", user.getId());
				json.put("roles_name", user.getRoleName());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	@RequestMapping("/getRole")
	@ResponseBody
	public String getRole(@RequestParam Integer id,HttpServletRequest request){
		
		List<User> findRole = userService.findRole(new Integer(id));
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(User user:findRole){
				json.put("id", user.getId());
				json.put("roles_name", user.getRoleName());
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
	
	@RequestMapping("/usernamevalidate")
	@ResponseBody
	private String usernamevalidate(@RequestParam String userName){
		boolean data = true;
		int count = userService.getUsernameCount(userName);
		if(count>0){
			data = false;
		}
		return data + "";
	}
	
	@RequestMapping("/getIns")
	@ResponseBody
	public String getIns(HttpServletRequest request){
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			//获取用户id
			Object object = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			MyUser myuser = (MyUser)object;
			List<Insframework> insframework = im.getInsByUserid(BigInteger.valueOf(myuser.getId()));
			BigInteger parent = insframework.get(0).getId();
			List<Insframework> list = im.getInsAll(0,parent);
			for(Insframework i:list){
				json.put("insid", i.getId());
				json.put("insname", i.getName());
				ary.add(json);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("rows", ary);
		return obj.toString();
/*		return "redirect:/user/AllUser";*/
	}
	
	@RequestMapping("/getStatusAll")
	@ResponseBody
	public String getStatusAll(){
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			List<Dictionarys> dictionary = dm.getDictionaryValue(6);
			for(Dictionarys d:dictionary){
				json.put("id", d.getValue());
				json.put("name", d.getValueName());
				ary.add(json);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("ary", ary);
		return obj.toString();
	}
	
	@RequestMapping("/getInsUser")
	@ResponseBody
	public String getInsUser(HttpServletRequest request){
		int ins = Integer.parseInt(request.getParameter("ins"));
		List<User> getIns = userService.getInsUser(ins);
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{			
			for(User user:getIns){
			json.put("id", user.getId());
			json.put("users_name", user.getUserName());
			json.put("users_Login_Name", user.getUserLoginName());
			json.put("users_phone", user.getUserPhone());
			json.put("users_email",user.getUserEmail());
			json.put("users_position", user.getUserPosition());
			json.put("users_insframework", user.getInsname());
			if(31==user.getStatus()){
			json.put("status", "启用");
			}
			else{
			json.put("status", "停用");
			}
			ary.add(json);
		}}catch(Exception e){
			e.printStackTrace();
		}
		obj.put("ary", ary);
		return obj.toString();
	}

	@RequestMapping("/getAllRole1")
	@ResponseBody
	public String getAllRole1(@RequestParam Integer id,HttpServletRequest request){
		List<User> findRole = userService.findRole(new Integer(id));
		List<User> findAllRole = userService.findAllRole();
		JSONObject json = new JSONObject();
		JSONArray ary = new JSONArray();
		JSONObject obj = new JSONObject();
		try{
			for(User user:findAllRole){
				json.put("id", user.getId());
				json.put("roles_name", user.getRoleName());
				json.put("symbol", 0);
				for(User aut:findRole){
					if(user.getId()==aut.getRoleId()){
						json.put("symbol", 1);
					}
				}
				ary.add(json);
			}
		}catch(Exception e){
			e.getMessage();
		}
		obj.put("rows", ary);
		return obj.toString();
	}
}