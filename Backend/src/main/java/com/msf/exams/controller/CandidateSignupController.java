package com.msf.exams.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.msf.exams.model.CandidateSignup;
import com.msf.exams.model.QuestionSets;
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
	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
	
	@PostMapping("/candidate/signup")
	public ResponseEntity<Object> candidateSignup(@RequestBody CandidateSignup request){
		return new ResponseEntity<Object>(candidaterepo.save(request), HttpStatus.CREATED);
	}
	
	
	@GetMapping("/candidate/listcandidate")
	public List<CandidateSignup> allCandidates(){
		return candidaterepo.findAll(); 
	}
	
	@GetMapping("/candidate/listquestions")
	public ResponseEntity<Object> candidateExamQuestions(){
		Query query = new Query();
		QuestionSets qsets = new QuestionSets();
		query.with(new Sort(Sort.Direction.DESC,"createdAt"));
		qsets = mongotemplate.findOne(query, QuestionSets.class);
		Object resultList = new Object();
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("id", qsets.getId());
			map.put("setname", qsets.getSetname());
			map.put("duration", qsets.getDuration());
			map.put("questions", qsets.getQuestions());
			resultList = map;
		}catch(Exception e) {
			
		}	
		
		return new ResponseEntity<Object>(resultList, HttpStatus.OK);
	}
	
//	@PostMapping("/candidate/submit")
//	public ResponseEntity<Object> candidateSubmit(@RequestBody  ){
//		
//	}
}
