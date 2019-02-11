package com.msf.exams.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.msf.exams.model.CandidateSignup;
import com.msf.exams.repository.CandidateSignupRepo;
import com.msf.exams.response.QuestionRes;

@RestController
@RequestMapping("/")
@CrossOrigin
public class CandidateSignupController {
	
	@Autowired
	CandidateSignupRepo candidaterepo;
	@Autowired
	MongoTemplate mongotemplate;
	
	@PostMapping("/candidate/signup")
	public ResponseEntity<Object> candidateSignup(@RequestBody CandidateSignup request){
		return new ResponseEntity<Object>(candidaterepo.save(request), HttpStatus.CREATED);
	}
	
	
	@GetMapping("/candidate/listcandidate")
	public List<CandidateSignup> allCandidates(){
		return candidaterepo.findAll(); 
	}
}
