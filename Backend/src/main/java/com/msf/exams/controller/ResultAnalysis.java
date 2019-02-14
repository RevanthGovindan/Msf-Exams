package com.msf.exams.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.msf.exams.model.CandidateSubmit;

@RestController
@RequestMapping("/")
@CrossOrigin
public class ResultAnalysis {

	@Autowired
	MongoTemplate mongotemplate;
	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
	
	@GetMapping("/admin/results")
	public ResponseEntity<Object> resultAnalysis(){
		Query query = new Query();
		return new ResponseEntity<Object>(mongotemplate.findAll(CandidateSubmit.class),HttpStatus.OK);
	}
	
	
	
}
