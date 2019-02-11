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
	private List<Question> questions;
	private int marks;
}
