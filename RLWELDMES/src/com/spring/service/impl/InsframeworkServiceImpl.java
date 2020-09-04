package com.spring.service.impl;

import java.math.BigInteger;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
import com.spring.dao.InsframeworkMapper;
import com.spring.dao.WeldingMachineMapper;
import com.spring.dao.WeldingMaintenanceMapper;
import com.spring.dto.WeldDto;
import com.spring.model.Insframework;
import com.spring.model.MyUser;
import com.spring.model.WeldingMachine;
import com.spring.model.WeldingMaintenance;
import com.spring.page.Page;
import com.spring.service.InsframeworkService;
import com.spring.util.IsnullUtil;

@Service
@Transactional
public class InsframeworkServiceImpl implements InsframeworkService {
	@Autowired
	private InsframeworkMapper im;
	
	@Autowired
	private WeldingMachineMapper wmm;
	
	@Autowired
	private WeldingMaintenanceMapper wm;

	@Override
	public List<Insframework> getInsframeworkAll(Page page,BigInteger parent, String str,WeldDto dto) {
		PageHelper.startPage(page.getPageIndex(),page.getPageSize());
		return im.getInsframeworkAll(parent,str,dto);
	}

	@Override
	public void addInsframework(Insframework ins) {
		im.addInsframework(ins);
	}

	@Override
	public void editInsframework(Insframework ins) {
		im.editInsframework(ins);
	}

	@Override
	public void deleteInsframework(BigInteger id) {
		//删除维修记录
		List<WeldingMachine> weldingmachine = wmm.getWeldingMachineByInsf(id);
		for(WeldingMachine welding:weldingmachine){
			List<WeldingMaintenance> list = wm.getMaintainByWeldingMachinId(welding.getId());
			for(WeldingMaintenance w:list){
				WeldingMaintenance m = wm.getWeldingMaintenanceById(w.getId());
				wm.deleteMaintenanceRecord(m.getMaintenance().getId());
				wm.deleteWeldingMaintenance(m.getId());
			}
		}
		//删除焊机
		wmm.deleteByInsf(id);
		//删除项目
		im.deleteInsframework(id);
	}

	@Override
	public List<Insframework> getInsframework(String str) {
		return im.getInsframeworkAll(null,str,null);
	}

	@Override
	public int getInsframeworkNameCount(String name) {
		return im.getInsframeworkNameCount(name);
	}

	@Override
	public String getInsframeworkById(BigInteger id) {
		return im.getInsframeworkById(id);
	}

	@Override
	public Insframework getInsfAllById(BigInteger id) {
		return im.getInsfAllById(id);
	}

	@Override
	public List<Insframework> getConmpany(BigInteger value1) {
		return im.getConmpany(value1);
	}

	@Override
	public List<Insframework> getCause(BigInteger id,BigInteger value2) {
		return im.getCause(id,value2);
	}

	@Override
	public List<Insframework> getWeldingMachineInsf(BigInteger parent) {
		return im.getInsframework(parent);
	}

	@Override
	public Insframework getParent(BigInteger id) {
		return im.getParent(id);
	}

	@Override
	public void showParent(HttpServletRequest request,String parentid) {
		IsnullUtil iutil = new IsnullUtil();
		if(iutil.isNull(parentid)){
			StringBuffer sb = new StringBuffer();  
			boolean flag = true;
			Insframework ins = getParent(new BigInteger(parentid));
			while(flag){
				if(ins!=null){
					sb.insert(0, ins.getName()+"-");
					ins = getParent(ins.getId());
				}else if(ins==null){
					flag = false;
				}
			}
			String name = getInsframeworkById(new BigInteger(parentid));
			sb.append(name);
			request.setAttribute("str", sb);
		}
	}

	@Override
	public List<Insframework> getInsByType(int type,BigInteger parent) {
		return im.getInsByType(type,parent);
	}

	@Override
	public int getUserInsfType(BigInteger uid) {
		return im.getUserInsfType(uid);
	}

	@Override
	public BigInteger getUserInsfId(BigInteger uid) {
		return im.getUserInsfId(uid);
	}

	@Override
	public Insframework getBloc() {
		return im.getBloc();
	}

	@Override
	public int getTypeById(BigInteger id) {
		return im.getTypeById(id);
	}

	@Override
	public BigInteger getParentById(BigInteger id) {
		return im.getParentById(id);
	}

	@Override
	public List<Insframework> getInsIdByParent(BigInteger parent,int type) {
		return im.getInsIdByParent(parent,type);
	}

	@Override
	public List<Insframework> getInsByUserid(BigInteger uid) {
		return im.getInsByUserid(uid);
	}

	@Override
	public Insframework getInsById(BigInteger id) {
		return im.getInsById(id);
	}

	@Override
	public List<Insframework> getInsAll(int type,BigInteger parent) {
		return im.getInsAll(type,parent);
	}

	@Override
	public BigInteger getUserInsframework() {
		try{
			//获取用户id
			MyUser myuser = (MyUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			long uid = myuser.getId();
			List<Insframework> insframework = im.getInsByUserid(BigInteger.valueOf(uid));
			return insframework.get(0).getId();
		}catch(Exception e){
			return null;
		}
	}

}
