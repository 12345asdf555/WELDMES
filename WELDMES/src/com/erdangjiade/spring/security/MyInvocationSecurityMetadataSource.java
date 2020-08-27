package com.erdangjiade.spring.security;  
 
import java.util.ArrayList;  
import java.util.Collection;  
import java.util.HashMap;  
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import org.springframework.security.access.ConfigAttribute;  
import org.springframework.security.access.SecurityConfig;  
import org.springframework.security.web.FilterInvocation;  
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.erdangjiade.spring.security.tool.AntUrlPathMatcher;  
import com.erdangjiade.spring.security.tool.UrlMatcher;
import com.spring.model.Authority;
import com.spring.model.Role;
import com.spring.service.AuthorityService;
import com.spring.service.ResourceService;  
 
@Controller
@RequestMapping(value = "/reload",produces = { "text/json;charset=UTF-8" })

public class MyInvocationSecurityMetadataSource implements FilterInvocationSecurityMetadataSource {   
    private UrlMatcher urlMatcher = new AntUrlPathMatcher();   
 
    @Resource    
    private ResourceService resourceService;    
        
    @Resource    
    private AuthorityService authorityService; 
    //tomcat启动时实例化一次  
    private HashMap<String, Collection<ConfigAttribute>> resourceMap = null;    
    
    /**  
     *  
     * 自定义方法，这个类放入到Spring容器后，   
     * 指定init为初始化方法，从数据库中读取资源   
     * TODO(这里用一句话描述这个方法的作用).  
     */    
    @RequestMapping("/init")
	@ResponseBody
    @PostConstruct    
    public void init() {    
//        loadResourceDefine();    
    }    
    
    /**  
     *   
     * TODO(程序启动的时候就加载所有资源信息).  
     */    
    private void loadResourceDefine() {}    
    
    /**  
     * TODO(自定义方法，将List<Role>集合转换为框架需要的Collection<ConfigAttribute>集合).  
     * @param roles 角色集合  
     * @return list 封装好的Collection集合  
     */    
    private Collection<ConfigAttribute> listToCollection(List<Role> roles) {    
        List<ConfigAttribute> list = new ArrayList<ConfigAttribute>();    
    
        for (Role role : roles) {    
            list.add(new SecurityConfig(role.getRoleName()));    
    
        }    
        return list;    
    }    
    
    /*  
     * <p>Title: getAllConfigAttributes</p>  
     * <p>Description: </p>  
     * @return  
     * @see org.springframework.security.access.SecurityMetadataSource#getAllConfigAttributes()  
     */    
    @Override    
    public Collection<ConfigAttribute> getAllConfigAttributes() {    
        return null;    
    }    
    
    /*  
     * <p>Title: getAttributes</p>  
     * <p>Description: </p>  
     * @param arg0  
     * @return  
     * @throws IllegalArgumentException  
     * @see org.springframework.security.access.SecurityMetadataSource#getAttributes(java.lang.Object)  
     */    
    @Override    
    public Collection<ConfigAttribute> getAttributes(Object object)    
            throws IllegalArgumentException {    
        //object 是一个URL ,为用户请求URL    
        String url = ((FilterInvocation)object).getRequestUrl();    
       if("/".equals(url)){    
           return null;    
       }    
        int firstQuestionMarkIndex = url.indexOf(".");    
        //判断请求是否带有参数 如果有参数就去掉后面的后缀和参数(/index.do  --> /index)    
        if(firstQuestionMarkIndex != -1){    
            url = url.substring(0,firstQuestionMarkIndex);    
        }    
  
        List<String> query = resourceService.getAuthByRes(url);    
    
        /**//*  
             * 应当是资源为key， 权限为value。 资源通常为url， 权限就是那些以ROLE_为前缀的角色。 一个资源可以由多个权限来访问。  
             * sparta  
             */    
        resourceMap = new HashMap<String, Collection<ConfigAttribute>>(); 
        Collection<ConfigAttribute> atts = new ArrayList<ConfigAttribute>();  
        int flag=0;
        for (String auth : query) {    
            flag++;   
            ConfigAttribute ca = new SecurityConfig(auth);       
             
                //String authName = auth2.getAuthorityName();    
    
                /**//*  
                     * 判断资源文件和权限的对应关系，如果已经存在相关的资源url，则要通过该url为key提取出权限集合，将权限增加到权限集合中。  
                     * sparta  
                     */     
  
                    atts.add(ca);    
                    if(flag==query.size()){
                        resourceMap.put(url, atts);   
                        return resourceMap.get(url);
                    }    
    
        }                   
        return null;    
    }    
    
    
    /*  
     * <p>Title: supports</p>  
     * <p>Description: </p>  
     * @param arg0  
     * @return  
     * @see org.springframework.security.access.SecurityMetadataSource#supports(java.lang.Class)  
     */    
    @Override    
    public boolean supports(Class<?> arg0) {    
        // TODO Auto-generated method stub    
        return true;    
    } 
    }