package com.msf.exams.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.msf.exams.model.Question;

public interface QuestionsRepo extends MongoRepository<Question,String> {

}
