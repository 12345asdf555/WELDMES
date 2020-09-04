<%@ page language="java" contentType="text/html; charset=UTF-8" import="java.util.*" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%-- <%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%> --%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<html>
	<head>
<%-- 		<base href="<%=basePath%>"> --%>
		<title>云智能焊接管控系统</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="">
		<meta name="author" content="">
		
	 	<link rel="stylesheet" type="text/css" href="resources/css/login.css">
	 	
		<script type="text/javascript" src="resources/js/jquery.min.js"></script>
		<script type="text/javascript" src="resources/js/jquery.easyui.min.js"></script>
	</head>

	<body>
		<div id="bodydiv">
			<img src="resources/images/weldmesback.jpg" width="100%" height="100%" />
		    <div id="logindiv">
		    	<div id="formdiv" style="margin-top:90px;margin-left:100px;width:80%;">
		    		<form name="f" action="<c:url value='j_spring_security_check'/>" method="POST">
		    			<table width="85%" align="center">
			                <tr>
			                    <td>用户名</td>
					            <td align="center">
					                <input type='text' name='j_username'  id="uname" value='<c:if test="${not empty param.login_error}">
					                <c:out value="${SPRING_SECURITY_LAST_USERNAME}"/></c:if>'/>
					            </td>
			                </tr>
			                <tr>
					            <td>密码</td>
					            <td align="center"><input type='password' name='j_password'></td>
			                </tr>
					        <tr>
					        	<td></td>
					            <td align="center">
					                <input name="submit" type="submit" value="登录" id="loginbutton">
					            </td>
					        </tr>
					        <tr>
					        	<td colspan="2" align="center" style="text-size:12px">
								    <c:if test="${not empty param.login_error}">
								       <font color="red">
								           用户名或密码不正确，请重新输入。
								       </font>
								    </c:if>
		    					</td>
					        </tr>
		    			</table>
		    		</form>
				</div>
		    </div>
		    <div id="tenghanbottom">Copyright 1998-2017上海腾悍智能科技有限公司</div>
	  	</div>
	    <div align="center" class="connect" style="height: 220px;">
			<span style="color: red;">${error}</span>
		</div>
	</body>
</html>
