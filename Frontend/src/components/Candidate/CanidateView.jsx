import React, { Component} from 'react';
import ConsoleView from '../../components/Candidate/ConsoleView';
import ConsoleNavigation from '../../components/Candidate/ConsoleNavigation';

class CandidateView extends Component{
    constructor(props){
        super(props);
        this.state = {
            displayQuestion:'',
            displayNumber:'',
            displayOptions:[],
            submitAnswers:[],
            showQuestionAnswers:[],
            displayId:''
            
        }
        this.getQuestion = this.getQuestion.bind(this);
        this.getquestionNumber = this.getquestionNumber.bind(this);
    }
    getQuestion(question){
        this.setState({
            displayQuestion:question
        })
    }
    getquestionNumber(number){
        this.setState({
            displayNumber:number
        }) 
    }
    
    getOptions =(options)=>{
        this.setState({
            displayOptions:options
        })
    }

    getQuesId =(number) =>{
        this.setState({
            displayId:number
        },()=>{
            console.log("submitAnswers",this.state.displayId)
        }) 
    }
        
    submitInterview =(data) =>{
        this.setState({
            submitAnswers:data
        },()=>{
            console.log("submitAnswers",this.state.submitAnswers)
        })
    }
    showQuestionAnswer = (data) =>{
        this.setState({
            showQuestionAnswers :data
        })
    }
    render(){
        return(
            <div className="candidate-view-container">
                <ConsoleView  showQuestionAnswer ={this.showQuestionAnswer} submitAnswer={this.submitInterview} toShowQuestion = {this.state.displayQuestion} toShowQuestionNumber = {this.state.displayNumber} toShowOptions = {this.state.displayOptions} toShowQuestionId ={this.state.displayId} />
                <ConsoleNavigation  history={this.props.history} retriveQuestion={this.getQuestion} retriveQuesNo = {this.getquestionNumber} retriveOptions={this.getOptions} retriveQuestionId ={this.getQuesId} submitPaper = {this.state.submitAnswers} dispalyQuesAnswers = {this.state.showQuestionAnswers}/>
            </div>
        )
    }
}

export default CandidateView;