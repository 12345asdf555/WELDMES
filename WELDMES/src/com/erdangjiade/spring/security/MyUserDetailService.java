package com.erdangjiade.spring.security;  
 
import java.util.ArrayList;  
import java.util.Collection;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;  
import org.springframework.security.core.GrantedAuthority;  
import org.springframework.security.core.authority.GrantedAuthorityImpl;  
import org.springframework.security.core.userdetails.User;  
import org.springframework.security.core.userdetails.UserDetails;  
import org.springframework.security.core.userdetails.UserDetailsService;  
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.CharacterEncodingFilter;

import com.spring.model.MyUser;
import com.spring.service.UserService;  

@Service("myUserDetailService")

public class MyUserDetailService implements UserDetailsService {   
 
	 @Resource 
	 @Autowired
	    private UserService userService;    
	        
	    /*  
	     * 根据用户名判断是否存在  
	     * <p>Title: loadUserByUsername</p>  
	     * <p>Description: </p>  
	     * @param arg0  
	     * @return  
	     * @throws UsernameNotFoundException  
	     * @see org.springframework.security.core.userdetails.UserDetailsService#loadUserByUsername(java.lang.String)  
	     */    
	 
	    @Override    
	    public UserDetails loadUserByUsername(String userName)    
	            throws UsernameNotFoundException {    
	    	
	    	System.out.println(userName);
	    	com.spring.model.User user = userService.LoadUser(userName);   
/*	        if (null == user) {    
	            throw new UsernameNotFoundException("用户" + userName + "不存在");    
	        } */        
	        Collection<GrantedAuthority> auths = new ArrayList<GrantedAuthority>();    
	        List<String> list = userService.getAuthoritiesByUsername(userName);    
	        System.out.println(list);
	        for (int i = 0; i < list.size(); i++) {    
	            auths.add(new GrantedAuthorityImpl(list.get(i)));    
	            System.out.println("loadUserByUsername : " + list.get(i));    
	        }    
	        System.out.println(user.getUserPassword());
	         
/*	        return new User(userName, user.getUserPassword(), true, true, true, true, auths); */   
	        return new MyUser(user.getId(),userName, user.getUserPassword(), true, true, true, true, auths);    
	    }    
    }