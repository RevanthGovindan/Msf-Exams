package com.msf.exams.model;

import java.util.List;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

@Document(collection="questions")
public class Question {
	
	@Id
	private String id = UUID.randomUUID().toString();
	private String question;
	private String questionType;
	private List<QuestionChoices> choices;
	private String correctanswer;
	private String domain;
	

	public Question() {
	}
	
	public Question(String question, String questionType, List<QuestionChoices> choices,
			String correctanswer,String domain) {
		super();
		this.question = question;
		this.questionType = questionType;
		this.choices = choices;
		this.correctanswer = correctanswer;
	}
	
	public String getId() {
		return id;
	}
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public String getQuestionType() {
		return questionType;
	}
	public void setQuestionType(String questionType) {
		this.questionType = questionType;
	}
	public List<QuestionChoices> getChoices() {
		return choices;
	}
	public void setChoices(List<QuestionChoices> choices) {
		this.choices = choices;
	}
	public String getCorrectanswer() {
		return correctanswer;
	}
	public void setCorrectanswer(String correctanswer) {
		this.correctanswer = correctanswer;
	}
	public String getDomain() {
		return domain;
	}

	public void setDomain(String domain) {
		this.domain = domain;
	}
	@Override
    public String toString() {
    	ObjectMapper mapper = new ObjectMapper();
    	
    	String jsonString = "";
		try {
			mapper.enable(SerializationFeature.INDENT_OUTPUT);
			jsonString = mapper.writeValueAsString(this);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
    	return jsonString;
    }
	
}
