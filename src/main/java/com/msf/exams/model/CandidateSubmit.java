package com.msf.exams.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="candidateResult")
public class CandidateSubmit {
	@Id
	private String id;	
	private String candidateName;
	private String candidatePhoneNo;
	private String candidateEmail;
	private List<CandidateQuestions> questions;
	private int marks;
	
	public CandidateSubmit() {
	}
	public CandidateSubmit(String id, String candidateName, String candidatePhoneNo, String candidateEmail,
			List<CandidateQuestions> questions, int marks) {
		super();
		this.id = id;
		this.candidateName = candidateName;
		this.candidatePhoneNo = candidatePhoneNo;
		this.candidateEmail = candidateEmail;
		this.questions = questions;
		this.marks = marks;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getCandidateName() {
		return candidateName;
	}
	public void setCandidateName(String candidateName) {
		this.candidateName = candidateName;
	}
	public String getCandidatePhoneNo() {
		return candidatePhoneNo;
	}
	public void setCandidatePhoneNo(String candidatePhoneNo) {
		this.candidatePhoneNo = candidatePhoneNo;
	}
	public String getCandidateEmail() {
		return candidateEmail;
	}
	public void setCandidateEmail(String candidateEmail) {
		this.candidateEmail = candidateEmail;
	}
	public List<CandidateQuestions> getQuestions() {
		return questions;
	}
	public void setQuestions(List<CandidateQuestions> questions) {
		this.questions = questions;
	}
	public int getMarks() {
		return marks;
	}
	public void setMarks(int marks) {
		this.marks = marks;
	}
}
