package com.msf.exams.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.msf.exams.model.CandidateSubmit;

public interface CandidateEvaluationRepo extends MongoRepository<CandidateSubmit,String> {

}
