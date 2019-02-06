package com.msf.exams.model;

import java.util.List;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="questionsets")
public class QuestionSets {
	@Id
	private String id = UUID.randomUUID().toString();
	private String setname;
	private String duration;
	private List<Question> questions;

	public QuestionSets() {
	} 
	
	public QuestionSets(String setname, String duration, List<Question> questions) {
		super();
		this.setname = setname;
		this.duration = duration;
		this.questions = questions;
	} 
	
	public String getId() {
		return id;
	}
	
	public String getSetname() {
		return setname;
	}
	public void setSetname(String setname) {
		this.setname = setname;
	}
	public String getDuration() {
		return duration;
	}
	public void setDuration(String duration) {
		this.duration = duration;
	}
	public List<Question> getQuestions() {
		return questions;
	}
	public void setQuestions(List<Question> questions) {
		this.questions = questions;
	}
}
