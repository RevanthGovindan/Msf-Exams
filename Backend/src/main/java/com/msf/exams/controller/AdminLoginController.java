package com.msf.exams.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.msf.exams.model.AdminLogin;
import com.msf.exams.repository.AdminLoginRepo;
import com.msf.exams.request.AdminLoginReq;
import com.msf.exams.response.AdminLoginRes;

@RestController
@RequestMapping("/")
@CrossOrigin
public class AdminLoginController {
	
	@Autowired
	AdminLoginRepo adminrepo;
	@Autowired
	MongoTemplate mongotemplate;
	//private ObjectMapper mapper = new ObjectMapper();	
	//private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());	
	
	
	@PostMapping("/adminlogin")
	public AdminLoginRes checkLogin(@RequestBody AdminLoginReq request) {
		String userName = request.userName;
		String password = request.password;
		AdminLoginRes response = new AdminLoginRes();
		Query query = new Query();
		query.addCriteria(Criteria.where("userName").is(userName).andOperator(Criteria.where("password").is(password)));
		try {
			if( mongotemplate.findOne(query, AdminLogin.class) != null  ){
				response.isValid = true;
				response.message = "Success";
			} else {
				response.isValid = false;
				response.message = "Invalid Credentials";
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
			
		return response;		
	}
}
