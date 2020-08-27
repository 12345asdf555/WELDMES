package com.spring.util;

public class IsnullUtil {
	/**
	 * 判断字符串是否为空，为空则返回false，不为空则返回true
	 * @param str
	 * @return
	 */
	public boolean isNull(String str){
		if(str==null || str.equals("")){
			return false;
		}
		return true;
	}
}
