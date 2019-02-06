package com.msf.exams.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.msf.exams.model.QuestionSets;

public interface QuestionSetsRepo extends MongoRepository<QuestionSets,String> {

}
