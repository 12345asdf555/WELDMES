package com.spring.service;


	import java.util.List;

import com.spring.model.Role;
import com.spring.page.Page;

	public interface RoleService {
		void saveAuthority(Role role);
		void save(Role role);
		void saveUser(Role role);
		boolean update(Role role);
		boolean delete(int id);
		boolean delete1(int id);
		boolean delete2(int id);
		boolean deleteAuthority(int id);
		boolean deleteUser(int id);
		Role findById(int id);
		String findByAuthorityId(Integer id);
		String findByUserId(Integer id);
		List<Role> findAll(Page page, String search);
		List<Role> findAllAuthority();
		List<Role> findAuthority(Integer id);
		String updateRoleAuthority(Integer findByAuthorityId);
		String updateRoleUser(Integer findByAuthorityId);
		List<Role> findAllUser();
		List<Role> findUser(Integer id);
		int getRolenameCount(String roleName);
		int findbyid(String roleName);
	}
