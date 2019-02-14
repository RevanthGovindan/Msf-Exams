package com.msf.exams.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.msf.exams.model.CandidateQuestions;
import com.msf.exams.model.CandidateSubmit;
import com.msf.exams.model.Question;
import com.msf.exams.model.QuestionChoices;
import com.msf.exams.repository.CandidateEvaluationRepo;



@RestController
@RequestMapping("/")
@CrossOrigin
public class CandidateEvaluation {
	
	@Autowired
	CandidateEvaluationRepo candidaterepo;
	@Autowired
	MongoTemplate mongotemplate;
	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
	
	@PostMapping("/candidate/evaluation")
	public ResponseEntity<Object> candidateEvaluation(@RequestBody CandidateSubmit request){
		int marks = 0;
		
		List<CandidateQuestions> questions =  request.getQuestions();
		for(CandidateQuestions question:questions) {
			Query query = new Query();
			String qid = question.getId();
			String submittedOption = question.getSubmittedoption();
			Question actualData = mongotemplate.findOne(query.addCriteria(Criteria.where("id").is(qid)), Question.class);
			question.setQuestion(actualData.getQuestion());
			for(QuestionChoices choice:actualData.getChoices()) {
				if(choice.getId().equals(submittedOption)) {
					question.setSubmittedanswer(choice.getDisplaytext());
				}
			}
			if((actualData.getCorrectanswer()).equals(question.getSubmittedoption())) {
				marks+=1;
			}
		}		
		request.setMarks(marks);
		return new ResponseEntity<Object>(candidaterepo.save(request), HttpStatus.CREATED);
	}
	
}
