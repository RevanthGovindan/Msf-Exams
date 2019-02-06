package com.msf.exams.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.msf.exams.model.QuestionSets;
import com.msf.exams.repository.QuestionSetsRepo;
import com.msf.exams.response.InsertSetRes;

@RestController
@RequestMapping("/")
@CrossOrigin
public class QuestionSetsController {

	@Autowired
	QuestionSetsRepo questionsetsrepo;
	@Autowired
	MongoTemplate mongotemplate;
	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
	@PostMapping("/createset")
	public ResponseEntity<InsertSetRes> addQuestionSet(@RequestBody QuestionSets questionsets) {
		InsertSetRes response = new InsertSetRes();
		response.message = "inserted";
		questionsetsrepo.save(questionsets);
		return new ResponseEntity<InsertSetRes>(response, HttpStatus.CREATED);
	}

	@GetMapping("/listsets")
	public ResponseEntity<Object> listsets() {
		Query query = new Query();
		query.fields().include("setname");
		query.fields().include("id");
		List<QuestionSets> qsets = new ArrayList<QuestionSets>();
		qsets = questionsetsrepo.findAll();
		List<Object> resultList = new ArrayList<>();
		try {
			for (QuestionSets res : qsets) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("id", res.getId());
				map.put("setname", res.getSetname());
				resultList.add(map);
			}

		} catch (Exception e) {
			LOGGER.info(e.toString());
		}

		return new ResponseEntity<Object>(resultList, HttpStatus.OK);
	}
	
	@GetMapping("/listsetquestions/{id}")
	public ResponseEntity<Object> listsetquestions(@PathVariable String id){
		Query query = new Query();
		query.addCriteria(Criteria.where("id").is(id));
		QuestionSets qlists = new QuestionSets();
		qlists = mongotemplate.findOne(query, QuestionSets.class);
		LOGGER.info(qlists.toString());
		return new ResponseEntity<Object>(qlists, HttpStatus.OK);
	}
}