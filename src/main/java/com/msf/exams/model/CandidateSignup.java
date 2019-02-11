package com.msf.exams.model;

import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="candidate")
public class CandidateSignup {
       
	@Id
	private String id = UUID.randomUUID().toString();;
	private String candidateName;
	private String candidatePhoneNo;
	private String candidateEmail;
	private String referencedBy;
	private String yearOfExperience;
	private String passedOutYear;
	
	public CandidateSignup(String candidateName, String candidatePhoneNo, String candidateEmail, String referencedBy,
			String yearOfExperience, String passedOutYear) {
		super();
		this.candidateName = candidateName;
		this.candidatePhoneNo = candidatePhoneNo;
		this.candidateEmail = candidateEmail;
		this.referencedBy = referencedBy;
		this.yearOfExperience = yearOfExperience;
		this.passedOutYear = passedOutYear;
	}
	
	public CandidateSignup() {
	}

	public String getId() {
		return id;
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

	public void setcandidatePhoneNo(String candidatePhoneNo) {
		this.candidatePhoneNo = candidatePhoneNo;
	}

	public String getcandidateEmail() {
		return candidateEmail;
	}

	public void setCandidateEmail(String candidateEmail) {
		this.candidateEmail = candidateEmail;
	}

	public String getReferencedBy() {
		return referencedBy;
	}

	public void setReferencedBy(String referencedBy) {
		this.referencedBy = referencedBy;
	}

	public String getYearOfExperience() {
		return yearOfExperience;
	}

	public void setYearOfExperience(String yearOfExperience) {
		this.yearOfExperience = yearOfExperience;
	}

	public String getPassedOutYear() {
		return passedOutYear;
	}

	public void setPassedOutYear(String passedOutYear) {
		this.passedOutYear = passedOutYear;
	}
       
}
