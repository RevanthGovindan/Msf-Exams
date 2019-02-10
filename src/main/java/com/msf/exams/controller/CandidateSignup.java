package com.msf.exams.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.msf.exams.repository.CandidateSignupRepo;
import com.msf.exams.response.QuestionRes;

@RestController
@RequestMapping("/")
@CrossOrigin
public class CandidateSignup {
	
	
	@Autowired
	MongoTemplate mongotemplate;
	@Autowired
	CandidateSignupRepo candidaterepo;
	
	@PostMapping
	public ResponseEntity<Object> candiateSignUp(@RequestBody CandidateSignup candidateData){
		QuestionRes response = new QuestionRes();
		if(mongotemplate.save(candidateData) != null) {
			
		}
		
		return null;
		
	}	
	
}
