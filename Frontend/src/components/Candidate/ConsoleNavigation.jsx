import React, { Component } from 'react';
import { CandidateAPIExtensions } from '../../model/serviceparams';
import { placeGetRequest } from '../../model/apicommunicator';
import { placePostRequest } from '../../model/apicommunicator';
import CandidateSubmit from '../Candidate/CandidateSubmit'

class ConsoleNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            examQuestions: [],
            showQuestion: '',
            questionNumber: 1,
            isDisabledNext: false,
            isDisabledPrev: true,
            timer: null,
            options: [],
            allAnswers: [],
            showQuesAnswers :[],
            isSubmit: false,
            name:'',
            number:'',
            email:'',
            id:'',
            questionId:'',
            result:[]
        }

    }
    componentDidMount() {
        this.getExamQuestions();
        this.props.retriveQuestion(this.state.showQuestion);
        this.props.retriveQuesNo(this.state.questionNumber);
        this.props.retriveOptions(this.state.options);
        this.props.retriveQuestionId(this.state.questionId);
        //console.log("questionId",this.state.questionId)
        var candidateData = window.sessionStorage.getItem("key");
        candidateData =  JSON.parse(candidateData)      
        this.setState({
            answers: this.props.sendAllanswers,
            name:candidateData.candidateName,
            number:candidateData.candidatePhoneNo,
            email:candidateData.candidateEmail,
            id:candidateData.id
        })
        this.Countdown = setInterval(() => {
          this.setState({
            timer:this.state.timer-1
          })
          if (this.state.timer === 0) {
              this.SubmitInterview();
              this.setState({
                isSubmit:true
              })
            clearInterval(this.Countdown);
          }else{
              this.setState({
                  isSubmit:false
              })
          }
        }, 1000);    
    }
    componentWillReceiveProps(newprops) {

        this.setState({
            allAnswers: newprops.submitPaper,
            showQuesAnswers:newprops.dispalyQuesAnswers
        })
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    //================================
    getQuestionNumber(question, index) {
        this.setState({
            showQuestion: question.question,
            questionNumber: index + 1,
            options: question.choices,
            questionId:question.id,
            isDisabledPrev: false,
            isDisabledNext: false
        }, () => {
            this.props.retriveQuestion(this.state.showQuestion);
            this.props.retriveQuesNo(this.state.questionNumber);
            this.props.retriveOptions(this.state.options);
            this.props.retriveQuestionId(this.state.questionId);
        })
       
    }
    //==============
    gotoNextQuestion() {
        this.setState({
            isDisabledPrev: false
        })
        var disablebtn = this.state.examQuestions.length;
        var currentQues = this.state.questionNumber;
        var nextQues = currentQues + 1;
        if (disablebtn === nextQues - 1) {
            this.setState({
                isDisabledNext: true
            })
        } else {
            this.setState({
                isDisabledNext: false
            })
            var questionshow = currentQues;
            var nextquesshow = this.state.examQuestions[questionshow].question;
            var options = this.state.examQuestions[questionshow].choices;
            var questionId =  this.state.examQuestions[questionshow].id;
            this.setState({
                questionNumber: nextQues,
                showQuestion: nextquesshow,
                options: options,
                questionId:questionId
            }, () => {
                this.props.retriveQuestion(this.state.showQuestion);
                this.props.retriveQuesNo(this.state.questionNumber);
                this.props.retriveOptions(this.state.options);
                this.props.retriveQuestionId(this.state.questionId);
            })
        }
        
    }
    gotoPrevQuestion() {
        this.setState({
            isDisabledNext: false
        })
        var currentQues = this.state.questionNumber;
        var nextQues = currentQues - 1;
        if (nextQues === 0 || currentQues === 1) {
            this.setState({
                isDisabledPrev: true
            })
        } else {
            this.setState({
                isDisabledPrev: false
            })
            var nextquesshow = this.state.examQuestions[nextQues - 1].question;
            var options = this.state.examQuestions[nextQues - 1].choices;
            var questionId =  this.state.examQuestions[nextQues - 1].id;
            this.setState({
                questionNumber: nextQues,
                showQuestion: nextquesshow,
                options: options,
                questionId:questionId
            }, () => {
                this.props.retriveQuestion(this.state.showQuestion);
                this.props.retriveQuesNo(this.state.questionNumber);
                this.props.retriveOptions(this.state.options);
                this.props.retriveQuestionId(this.state.questionId);
            })
        }
        
    }
    //===============================================================
    getExamQuestions = () => {
        placeGetRequest(CandidateAPIExtensions.ListExamQuestions, this.parseaGetExamQuestionResponse, this.parseGetExamQuestionError);
    }

    parseaGetExamQuestionResponse = (respObj) => {
        console.log("examquestionsResponse", respObj)
        this.setState({
            examQuestions: respObj.questions,
            showQuestion: respObj.questions[0].question,
            questionNumber: 1,
            isDisabledNext: false,
            isDisabledPrev: true,
            timer: respObj.duration,
            options: respObj.questions[0].choices,
            questionId:respObj.questions[0].id

        }, () => {
            this.props.retriveQuestion(this.state.showQuestion);
            this.props.retriveQuesNo(this.state.questionNumber);
            this.props.retriveOptions(this.state.options);
            this.props.retriveQuestionId(this.state.questionId);
     
        })
    }
    parseGetExamQuestionError = (error) => {
        console.log("examquestionsError", error)
    }

    //===================================

    closDialog = () => {
        this.setState({
            isSubmit: false
        }, () => {
            this.props.history.push('/');
        })
    }
    //==============================================================
    SubmitInterview = () => {
      clearInterval(this.Countdown);
       var answers = this.state.allAnswers;
       var showQuestionsAnswers = this.state.showQuesAnswers;
       var showQuestionsAnswersResult = [];
       for(var j in showQuestionsAnswers){
        var quesAns = {
            question: j,
            answer:showQuestionsAnswers[j]
            }
            showQuestionsAnswersResult.push(quesAns);
       }       
       var result = [];
       for(var i in answers){
        var obj = {
            id: i,
            submittedoption:answers[i]
            }
              result.push(obj);
       }
        this.setState({
            isSubmit: true,
            allAnswers:result,
            showQuesAnswers:showQuestionsAnswersResult
        })
        var reqdata = {
            candidateEmail:this.state.email,
            candidateName:this.state.name,
            candidatePhoneNo:this.state.number,
            id:this.state.id,
            questions:result
        }
        console.log("reqdata",reqdata);
        placePostRequest(CandidateAPIExtensions.SubmitExam, reqdata, this.parseSubmitTestResponse.bind(this), this.parseSubmitTestError.bind(this));
    }
    parseSubmitTestResponse = (respobj) =>{
        console.log("submitResponse", respobj)
    }
    parseSubmitTestError = (error) =>{
        console.log("submitError", error)
    }

    //==============================================================
    render() {
        return (
            <div className="question-navigtion-container">
                <div className="timer-section">
                    <div className="timers">{this.state.timer}</div>
                </div>
                <div className="nav-buttons">
                    <button className={"prev-button " + (this.state.isDisabledPrev === true ? 'cursor-disabled' : '')} disabled={this.state.isDisabledPrev === true ? true : ''} onClick={this.gotoPrevQuestion.bind(this)}>prev</button>
                    <button className={"next-button " + (this.state.isDisabledNext === true ? 'cursor-disabled' : '')} disabled={this.state.isDisabledNext === true ? true : ''} onClick={this.gotoNextQuestion.bind(this)}>next</button>
                </div>
                <div className="questions-list-con">
                    {
                        this.state.examQuestions.map((data, idx) => {
                            return (
                                <div className={"questions-list " + (this.state.questionNumber - 1 === idx ? 'activeQuestion' : '')} key={idx}>
                                    <div className='question-number-id' onClick={this.getQuestionNumber.bind(this, data, idx)}>{idx + 1}</div>
                                </div>
                            )

                        })
                    }
                </div>
                <div className="submit-btn">
                    <button onClick={this.SubmitInterview.bind(this)}>Submit</button>
                </div>
                {
                    this.state.isSubmit === true ?
                        <CandidateSubmit closeDialog={this.closDialog} sendAllanswers={this.state.showQuesAnswers} />
                        :
                        ''

                }
            </div>
        )
    }
}

export default ConsoleNavigation;