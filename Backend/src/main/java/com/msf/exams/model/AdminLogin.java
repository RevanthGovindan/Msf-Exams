package com.msf.exams.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="admin")
public class AdminLogin {
	
	private String userName;
	private String password;
	
	public AdminLogin( ) {
	}
	public AdminLogin(String userName,String password ) {
		this.userName = userName;
		this.password = password;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
