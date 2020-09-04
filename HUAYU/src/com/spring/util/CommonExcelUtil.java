package com.spring.util;

import java.io.FileOutputStream;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.CellRangeAddress;

/**
 * excel通用类
 * @author gpyf16
 *
 */
public class CommonExcelUtil {
	public CommonExcelUtil(String dtime, String titles[], Object data[][], String filepath,
			String excelSheet) {
		HSSFWorkbook wb = new HSSFWorkbook();
		HSSFSheet sheet = wb.createSheet(excelSheet);
		HSSFRow row = sheet.createRow(0);
		HSSFCellStyle style = wb.createCellStyle();
		if(dtime==null||dtime==""){
			style.setAlignment((short) 2);
			for (int i = 0; i < titles.length; i++) {
				cell = row.createCell((short) i);
				cell.setCellValue(deal(titles[i]));
				cell.setCellStyle(style);
			}

			for (int m = 0; m < data.length; m++) {
				row = sheet.createRow(m + 1);
				for (int n = 0; n < titles.length; n++)
					row.createCell((short) n).setCellValue(deal(data[m][n]));
			}
		}else{
			CellRangeAddress region1 = new CellRangeAddress(0, 0, (short) 0, (short) 6); //参数1：起始行 参数2：终止行 参数3：起始列 参数4：终止列   
			sheet.addMergedRegion(region1); 
			row.createCell(0).setCellValue(dtime);
			style.setAlignment((short) 2);
			row = sheet.createRow(1);
			for (int i = 0; i < titles.length; i++) {
				cell = row.createCell((short) i);
				cell.setCellValue(deal(titles[i]));
				cell.setCellStyle(style);
			}

			for (int m = 0; m < data.length; m++) {
				row = sheet.createRow(m + 2);
				for (int n = 0; n < titles.length; n++)
					row.createCell((short) n).setCellValue(deal(data[m][n]));
			}
		}

		try {
			FileOutputStream fout = new FileOutputStream(filepath);
			wb.write(fout);
			fout.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public String deal(Object obj) {
		if (obj == null
				|| (new StringBuilder()).append(obj).toString().trim().equals(
						"")
				|| (new StringBuilder()).append(obj).toString().trim().equals(
						"null"))
			return "";
		else
			return (new StringBuilder()).append(obj).toString();
	}

/*	public static void main(String args[]) {
		String a[] = { "a", "v" };
		Object b[][] = { { "s", "d" }, { "s", "d" } };
		CommonExcelUtil c = new CommonExcelUtil(a, b, "d://a.xls", "test");
	}*/

	private HSSFCell cell;
}
