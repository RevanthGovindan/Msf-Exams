package com.msf.exams.model;

public class QuestionChoices {
	private String id;
	private String displaytext;
	
	public QuestionChoices() {
		
	}
	public QuestionChoices(String id, String displaytext) {
		super();
		this.id = id;
		this.displaytext = displaytext;
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getDisplaytext() {
		return displaytext;
	}
	public void setDisplaytext(String displaytext) {
		this.displaytext = displaytext;
	}
}
