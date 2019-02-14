package com.msf.exams.model;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

@Document(collection = "questionsets")
public class QuestionSets {
	@Id
	private String id = UUID.randomUUID().toString();
	private String setname;
	private String duration;
	
	private List<Question> questions;
	@DateTimeFormat(pattern = "dd-MM-yyyy")
	private String createdAt = new SimpleDateFormat("dd-MM-yyyy HH-mm-ss a").format(Calendar.getInstance().getTime());

	public QuestionSets() {
	}

	public QuestionSets(String setname, String duration, List<Question> questions) {
		super();
		this.setname = setname;
		this.duration = duration;
		this.questions = questions;
	}
	
	public String getCreatedAt() {
		return createdAt;
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
