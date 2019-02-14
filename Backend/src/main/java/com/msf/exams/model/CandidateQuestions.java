package com.msf.exams.model;

import java.util.List;
import java.util.UUID;

import org.springframework.data.annotation.Id;

public class CandidateQuestions {

	
	@Id
	private String id;
	private String submittedanswer;
	private String question;
	private String submittedoption;
	
	public CandidateQuestions() {
	}
	public CandidateQuestions(String id, String submittedanswer, String question, String submittedoption) {
		super();
		this.id = id;
		this.submittedanswer = submittedanswer;
		this.question = question;
		this.submittedoption = submittedoption;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public String getSubmittedoption() {
		return submittedoption;
	}
	public void setSubmittedoption(String submittedoption) {
		this.submittedoption = submittedoption;
	}
	public String getSubmittedanswer() {
		return submittedanswer;
	}
	public void setSubmittedanswer(String submittedanswer) {
		this.submittedanswer = submittedanswer;
	}
}
