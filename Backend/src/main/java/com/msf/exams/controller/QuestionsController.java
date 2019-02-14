package com.msf.exams.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
	
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
	
	@GetMapping("/listquestion/{pagenum}/{noofquestions}")
	public List<Question> listQuestionsPagination(@PathVariable int pagenum,@PathVariable int noofquestions){
		Pageable pageable = PageRequest.of(pagenum, noofquestions);
		Page<Question> questions = questionrepo.findAll(pageable);
		List<Question> questionsList = questions.getContent();
		return questionsList;		
	}	
	
	@DeleteMapping("/deletequestion/{id}")
	public ResponseEntity<QuestionRes> deleteQuestion(@PathVariable String id){
		QuestionRes response = new QuestionRes();
		questionrepo.deleteById(id);
		response.message = "deleted";
		return new ResponseEntity<QuestionRes>(response, HttpStatus.OK); 
	}

	@PutMapping("/editquestion")
	public ResponseEntity<QuestionRes> editQuestion(@RequestBody Question question){
		LOGGER.info(question.toString());
		QuestionRes response = new QuestionRes();
		questionrepo.save(question);
		response.message = "updated";
		return new ResponseEntity<QuestionRes>(response, HttpStatus.CREATED);
	}
}
