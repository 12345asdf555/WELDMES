package com.spring.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

/**
 * Excel导入数据之：上传文件
 * @author gpyf16
 *
 */
public class UploadUtil {
	/**
	 * 上传文件方法
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public String uploadFile(HttpServletRequest request,HttpServletResponse response) throws Exception{
		response.setContentType("multipart/form-data");
		response.setCharacterEncoding("UTF-8");
		String fileName ="";
		ServletContext scontext=request.getSession().getServletContext();
		//获取绝对路径
		String abpath=scontext.getRealPath("")+"excelfiles";

		File file = new File(abpath);
		if (!file.exists()) {
			file.mkdirs();
		}

		DiskFileItemFactory factory = new DiskFileItemFactory();
		factory.setRepository(file);
		ServletFileUpload upload = new ServletFileUpload(factory);
		upload.setHeaderEncoding("UTF-8");
		upload.setFileSizeMax(1024 * 1024 * 1000);
		upload.setSizeMax(1024 * 1024 * 5000);
		try {
			List list = upload.parseRequest(request);
			Iterator itr = list.iterator();
			while (itr.hasNext()) {
				FileItem item = (FileItem) itr.next();
				if (item.isFormField()) {

				} else {
					fileName = item.getName();
					if (fileName == null || fileName.trim().length() == 0) {
						continue;
					}

					// 注意：不同的浏览器提交的文件名是不一样的，有些浏览器提交上来的文件名是带有路径的
					// 如: C:\Users\H__D\Desktop\1.txt 而有些则是 ： 1.txt
					// 处理获取到的上传文件的文件名的路径部分，只保留文件名部分
					fileName = fileName.substring(fileName.lastIndexOf("\\") + 1);
			
					// 得到上传文件的扩展名
					String fileExt = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
					// 检查扩展名
					// 如果需要限制上传的文件类型，那么可以通过文件的扩展名来判断上传的文件类型是否合法
					if (!"xls,xlsx".contains(fileExt)) {
						System.out.println("上传文件扩展名是不允许的扩展名：" + fileExt);
						break;
					}
					InputStream is = item.getInputStream();
					if (item.getSize() == 0) {
						continue;
					}
					if (item.getSize() > 1024 * 1024 * 1) {
						System.out.println("上传文件大小：" + item.getSize());
						break;
					}
					FileOutputStream out = new FileOutputStream(file+"/"+fileName);
					byte[] buffer = new byte[1024];
					int len=0;
					while((len=is.read(buffer))>0){
						out.write(buffer, 0, len);
					}
					is.close();
					out.close();
					item.delete();
				}
			}
		} catch (FileUploadException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		String path = file+"\\"+fileName;
		path = path.replace("\\", "/");
		return path;
	}
}
