package com.msf.exams.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.msf.exams.model.CandidateSignup;

public interface CandidateSignupRepo extends MongoRepository<CandidateSignup,String> {

}

