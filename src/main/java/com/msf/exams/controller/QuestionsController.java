package com.msf.exams.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.msf.exams.model.Question;
import com.msf.exams.repository.QuestionsRepo;
import com.msf.exams.response.QuestionRes;

@RestController
@RequestMapping("/")
@CrossOrigin
public class QuestionsController {

	@Autowired
	QuestionsRepo questionrepo;
	@Autowired
	MongoTemplate mongotemplate;

	@PostMapping("/addquestion")
	public ResponseEntity<QuestionRes> addquestion(@RequestBody Question question) {
		QuestionRes response = new QuestionRes();
		questionrepo.save(question);
		response.message = "inserted";
		return new ResponseEntity<QuestionRes>(response, HttpStatus.CREATED);
	}

	@GetMapping("/listquestion")
	public List<Question> listQuestions() {
		return questionrepo.findAll();
	}
	
//	@GetMapping("/listquestionnew")
//	public List<Question> listQuestionsNew(){
//		Map<String, Object> dataMap = new HashMap<String, Object>();
//		List<Question> list = questionrepo.findAll();
//		
//		return list;
//	}
	
	@DeleteMapping("/deletequestion/{id}")
	public ResponseEntity<QuestionRes> deleteQuestion(@PathVariable String id){
		QuestionRes response = new QuestionRes();
		questionrepo.deleteById(id);
		response.message = "deleted";
		return new ResponseEntity<QuestionRes>(response, HttpStatus.OK); 
	}

	@PutMapping("/editquestion")
	public ResponseEntity<QuestionRes> editQuestion(@RequestBody Question question){
		QuestionRes response = new QuestionRes();
		questionrepo.save(question);
		response.message = "updated";
		return new ResponseEntity<QuestionRes>(response, HttpStatus.CREATED);
	}
}
