package com.msf.exams.model;

import java.util.List;
import java.util.UUID;

import org.springframework.data.annotation.Id;

public class CandidateQuestions {

	
	@Id
	private String id;
	private String submittedanswer;
	public CandidateQuestions() {
	}
	public CandidateQuestions(String id, String submittedanswer) {
		super();
		this.id = id;
		this.submittedanswer = submittedanswer;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getSubmittedanswer() {
		return submittedanswer;
	}
	public void setSubmittedanswer(String submittedanswer) {
		this.submittedanswer = submittedanswer;
	}
}
