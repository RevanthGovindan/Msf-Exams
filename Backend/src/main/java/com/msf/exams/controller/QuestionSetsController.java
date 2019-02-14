package com.msf.exams.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.msf.exams.model.Question;
import com.msf.exams.model.QuestionSets;
import com.msf.exams.repository.QuestionSetsRepo;
import com.msf.exams.response.InsertSetRes;
import com.msf.exams.response.QuestionRes;

@RestController
@RequestMapping("/")
@CrossOrigin
public class QuestionSetsController {

	@Autowired
	QuestionSetsRepo questionsetsrepo;
	@Autowired
	MongoTemplate mongotemplate;
	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
	@PostMapping("/sets/createset")
	public ResponseEntity<InsertSetRes> addQuestionSet(@RequestBody QuestionSets questionsets) {
		InsertSetRes response = new InsertSetRes();
		response.message = "inserted";
		questionsetsrepo.save(questionsets);
		return new ResponseEntity<InsertSetRes>(response, HttpStatus.CREATED);
	}

	@GetMapping("/sets/list")
	public ResponseEntity<Object> listsets() {
		Query query = new Query();
		List<QuestionSets> qsets = new ArrayList<QuestionSets>();
		query.with(new Sort(Sort.Direction.DESC,"createdAt"));
		qsets = mongotemplate.find(query, QuestionSets.class);
		List<Object> resultList = new ArrayList<>();
		try {
			for (QuestionSets res : qsets) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("id", res.getId());
				map.put("setname", res.getSetname());
				map.put("createdAt", res.getCreatedAt());
				resultList.add(map);
			}
		} catch (Exception e) {
			LOGGER.info(e.toString());
		}
		return new ResponseEntity<Object>(resultList, HttpStatus.OK);
	}
	
	@GetMapping("/sets/listquestions/{id}")
	public ResponseEntity<Object> listsetquestions(@PathVariable String id){
		Query query = new Query();
		query.addCriteria(Criteria.where("id").is(id));
		QuestionSets qlists = new QuestionSets();
		qlists = mongotemplate.findOne(query, QuestionSets.class);
		return new ResponseEntity<Object>(qlists, HttpStatus.OK);
	}
	 
	@DeleteMapping("/sets/deletequestion/{setid}/{questionid}")
	public ResponseEntity<Object> deleteSetQuestions(@PathVariable String setid,@PathVariable String questionid){
		Query query = new Query();
		QuestionRes response = new QuestionRes();
		query.addCriteria(Criteria.where("id").is(setid));
		Update update = new Update(); 
		update.pull("questions", new Query(Criteria.where("id").is(questionid)));
		if(mongotemplate.updateFirst(query,update, QuestionSets.class) != null){
			response.message = "deleted";
		} else {
			response.message = "failed";
		}
		
		return new ResponseEntity<Object>(response, HttpStatus.OK);
	}
	
	@DeleteMapping("/sets/deleteset/{setid}")
	public ResponseEntity<Object> deleteSet(@PathVariable String setid){
		QuestionRes response = new QuestionRes();
		Query query = new Query();
		query.addCriteria(Criteria.where("id").is(setid));
		if(mongotemplate.remove(query,  QuestionSets.class) != null) {
			response.message = "deleted";
		} else {
			response.message = "failed";
		}		
		return new ResponseEntity<Object>(response, HttpStatus.OK);
	}
	
	@PostMapping("/sets/addquestions")
	public ResponseEntity<Object> addQuestions(@RequestBody QuestionSets request){
		QuestionRes response = new QuestionRes();
		Update update = new Update();
		List<Question> questions = new ArrayList<Question>();
		questions = request.getQuestions() ;
		String setid = request.getId();
		Query query = new Query();
		LOGGER.info(setid);
		query.addCriteria(Criteria.where("id").is(setid));
		update.push("questions").each(questions);
		if(mongotemplate.updateFirst(query, update, QuestionSets.class) != null) {
			response.message = "inserted";
		} else {
			response.message = "failed";
		}
		return new ResponseEntity<Object>(response, HttpStatus.OK);
	}
	
}