package com.erdangjiade.spring.security;  
 
import java.util.Collection;  
import java.util.Iterator;  
 
import org.springframework.security.access.AccessDecisionManager;  
import org.springframework.security.access.AccessDeniedException;  
import org.springframework.security.access.ConfigAttribute;  
import org.springframework.security.access.SecurityConfig;  
import org.springframework.security.authentication.InsufficientAuthenticationException;  
import org.springframework.security.core.Authentication;  
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;  
 

public class MyAccessDecisionManager implements AccessDecisionManager {  
 
    //检查用户是否够权限访问资源  
    //参数authentication是从spring的全局缓存SecurityContextHolder中拿到的，里面是用户的权限信息  
    //参数object是url  
    //参数configAttributes所需的权限  
    @Override    
    public void decide(Authentication authentication, Object object,    
            Collection<ConfigAttribute> configAttributes) throws AccessDeniedException,    
            InsufficientAuthenticationException {    
        if (null == configAttributes) {    
            return;    
        }    
            
        Iterator<ConfigAttribute> cons = configAttributes.iterator();    
            
        while(cons.hasNext()){    
            ConfigAttribute ca = cons.next();    
            String needRole = ((SecurityConfig) ca).getAttribute();    
            //gra 为用户所被赋予的权限，needRole为访问相应的资源应具有的权限    
            for (GrantedAuthority gra : authentication.getAuthorities()) {    
                if ((needRole.trim().equals(gra.getAuthority().trim()))||(gra.getAuthority().trim().equalsIgnoreCase("ROLE_ADMIN"))) {    
                    return;    
                }    
            }    
        }    
        throw new AccessDeniedException("Access Denied");    
    }    
    
    /*  
     * <p>Title: supports</p>  
     * <p>Description: </p>  
     * @param arg0  
     * @return  
     * @see org.springframework.security.access.AccessDecisionManager#supports(org.springframework.security.access.ConfigAttribute)  
     */    
    @Override    
    public boolean supports(ConfigAttribute arg0) {    
        // TODO Auto-generated method stub    
        return true;    
    }    
    
    /*  
     * <p>Title: supports</p>  
     * <p>Description: </p>  
     * @param arg0  
     * @return  
     * @see org.springframework.security.access.AccessDecisionManager#supports(java.lang.Class)  
     */    
    @Override    
    public boolean supports(Class<?> arg0) {    
        // TODO Auto-generated method stub    
        return true;    
    }   
    }