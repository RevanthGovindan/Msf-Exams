import { AppEnvironments } from '../common/AppSettings';

// ==========================================================================
// API Service Parameters

// API end point
export const BaseUrls = {
}

BaseUrls[AppEnvironments.DEV] = "http://127.0.0.1:8080";
BaseUrls[AppEnvironments.PROD] = "http://prod...";

// --------------------------------------------------------------------------
// Service Extensions for Common features
export const CommonAPIExtensions = {

}

// --------------------------------------------------------------------------
// Service Extensions for Login
export const LoginAPIExtensions = {
    AdminLogin: "/adminlogin",
    CandidateLogin: "/candidate/signup",
    AddQuestion:"/addquestion",
    BulkUpload:"/bulkupload",
    ListQuestion:"/listquestion",
    UpdateQuestion:"/editquestion",
    DeleteQuestion:"/deletequestion/"
    
}

// --------------------------------------------------------------------------
// Service Extensions for Quote
export const QuoteAPIExtensions = {

}

// ==========================================================================

// Service Extensions for ExamSets

export const QuestionSetAPIExtensions = {
    ListSet:"/sets/list",
    ListSetQuestion:"/sets/listquestions/",
    CreateQuestionSet:"/sets/createset",
    DeleteSetQuestion:"/sets/deletequestion/",
    DeleteSet:'/sets/deleteset/',
    AddQuestionsToSet:'/sets/addquestions',
    EvaluationResult:"/admin/results"
}

export const CandidateAPIExtensions = {
    ListExamQuestions:"/candidate/listquestions",
    SubmitExam:"/candidate/evaluation"
}
