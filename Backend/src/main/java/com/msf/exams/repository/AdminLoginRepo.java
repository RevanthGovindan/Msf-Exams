package com.msf.exams.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.msf.exams.model.AdminLogin;

public interface AdminLoginRepo extends MongoRepository<AdminLogin,String> {
	public AdminLogin findByuserName(String userName);
}
