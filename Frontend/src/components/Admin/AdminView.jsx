import React, { Component } from 'react';
import Examcomp from './Examcomp';
import Evaluationcomp from './Evaluationcomp';
import Questionscomp from './Questionscomp';
import { adminmenu } from '../../common/Constants';
import { placeGetRequest } from '../../model/apicommunicator';
import { LoginAPIExtensions } from '../../model/serviceparams';
import { QuestionSetAPIExtensions } from '../../model/serviceparams';

class Adminview extends Component {

    constructor() {
        super();
        this.state = {
            currentpage: '',
            questionList:[],
            quesListSet:[],
            setListId:'',
            resultData:[]
        }

        this.parseaGetQuestionsResponse = this.parseaGetQuestionsResponse.bind(this);
        this.parseGetQuestionsError = this.parseGetQuestionsError.bind(this);
        this.getListQuestions = this.getListQuestions.bind(this);
        
        //========================
        //List Set binds
        this.parseaGetListSetResponse = this.parseaGetListSetResponse.bind(this);
        this.parseGetListSetError = this.parseGetListSetError.bind(this);
        this.getListSets = this.getListSets.bind(this);

        this.parseGetExamResultsResponse = this.parseGetExamResultsResponse.bind(this);
        this.parseGetExamResultsError = this.parseGetExamResultsError.bind(this);
        this.getExamResults = this.getExamResults.bind(this);
    }

    componentDidMount(){
        this.getListSets();
    }
   //============================================================
    gotoExam() {
        this.setState({ currentpage: adminmenu.EXAMINATION },()=>{
            this.getListSets();
        })
            
    }
    gotoQuestions() {
        this.setState({ currentpage: adminmenu.QUESTIONS },()=>{
            this.getListQuestions();
        })
        
    }
    gotoResults() {
        this.setState({ currentpage: adminmenu.EVALUATION },()=>{
            this.getExamResults();
        })
    }

    //==========================================================
    // Question List handling
    getListQuestions(){
       console.log("came")
        placeGetRequest(LoginAPIExtensions.ListQuestion, this.parseaGetQuestionsResponse, this.parseGetQuestionsError);
    }

    parseaGetQuestionsResponse(respObj){
        console.log("response",respObj);
        this.setState({
            questionList : respObj
        });
    }
    
    parseGetQuestionsError(error){
        console.log("error",error);
    }
    //==========================================================
    // List Set Handling

    getListSets(){
        placeGetRequest(QuestionSetAPIExtensions.ListSet, this.parseaGetListSetResponse, this.parseGetListSetError);
    }

    parseaGetListSetResponse(respObj){
        console.log("ListSetResponse",respObj);
        if(respObj.length !== 0){
            this.setState({
                quesListSet :respObj,
                setListId:respObj[0].id            
            },()=>{
                this.setState({currentpage: adminmenu.EXAMINATION})
              
            });
        }else{
            this.setState({
                quesListSet :respObj,
                setListId:'',
                currentpage: adminmenu.EXAMINATION
            });
        }
    }
    
    parseGetListSetError(error){
        console.log("ListSetError",error);
    }
    //==========================================================
    // Results call

    getExamResults=()=> {
        placeGetRequest(QuestionSetAPIExtensions.EvaluationResult, this.parseGetExamResultsResponse, this.parseGetExamResultsError);
    }
    parseGetExamResultsResponse =(respObj) => {
        console.log("ExamResultResponse", respObj)
        this.setState({
            resultData:respObj
        })
    }
    parseGetExamResultsError = (error) => {
        console.log("ExamResultError", error)
    }

   //===========================================================
    render() {
        return (
            <div className="admin-page-container">
                <ul className="admin-subheader">
                    <li className={"subheader "+(this.state.currentpage === adminmenu.EXAMINATION?'active':'' )} onClick={this.gotoExam.bind(this)} >Exam</li>
                    <li className={"subheader "+(this.state.currentpage === adminmenu.QUESTIONS?'active':'' )} onClick={this.gotoQuestions.bind(this)} >Questions</li>
                    <li className={"subheader "+(this.state.currentpage === adminmenu.EVALUATION?'active':'' )} onClick={this.gotoResults.bind(this)} >Results</li>
                </ul>
                <div className="admin-display-container">
                    {this.state.currentpage === adminmenu.EXAMINATION ?
                        <Examcomp questionSetList ={this.state.quesListSet} idToShowSetList = {this.state.setListId} callSetList = {this.getListSets}/>
                        :
                        ''
                    }
                    {this.state.currentpage === adminmenu.EVALUATION ?
                        <Evaluationcomp  showEvaluation = {this.state.resultData}/>
                        :
                        ''
                    }
                    {this.state.currentpage === adminmenu.QUESTIONS ?
                        <Questionscomp questionsList = {this.state.questionList} callList = {this.getListQuestions}/>
                        :
                        ''
                    }
                </div>
            </div>
        );
    }
}

export default Adminview;