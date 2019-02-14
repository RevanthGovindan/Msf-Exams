import React, { Component } from 'react';
import Examlistcomp from '../Admin/ExamSet/Examlistcomp';
import ExamDetailView from '../Admin/ExamSet/Examdetailview';
import { placeGetRequest } from '../../model/apicommunicator';
import { QuestionSetAPIExtensions } from '../../model/serviceparams'
class Examcomp extends Component {
    constructor() {
        super();
        this.state = {
            setList: [],
            setQuestions: [],
            setId: '',
            displaySetInfo: {
                dispSetName: '',
                dispSetTime: '',
                dispaSetDuration: ''
            }
        };
        this.getListSetQuestions = this.getListSetQuestions.bind(this);
        this.parseaGetListSetQuestionsResponse = this.parseaGetListSetQuestionsResponse.bind(this);
        this.parseGetListSetQuestionsError = this.parseGetListSetQuestionsError.bind(this);
        this.handleSetId = this.handleSetId.bind(this);
        this.deletequesId = this.deletequesId.bind(this)

    }
    //==============================
    componentDidMount() {
        var id = this.props.idToShowSetList;
            this.setState({
                setId: id
            },()=>{
            if(this.state.setId){
                this.getListSetQuestions(id);
            }
                
            })
    }
    componentWillReceiveProps(newprops){    
        let id = newprops.idToShowSetList; 
            this.setState({
                setId: id
            },()=>{
                if(this.state.setId){
                    this.getListSetQuestions(id);
                }
               
            })
    }   

    showQuestionsSet = (data) => {
        this.setState({
            setList: data.questions
        })
    }

    //======================
    handleSetId = (id) => {
            this.setState({
                setId: id
            })
            this.getListSetQuestions(id)
    }

    deletequesId = () => {
           var id = this.state.setId;
           this.getListSetQuestions(id)
    }
    // ======================================
    getListSetQuestions(d) {
        var id = d
        var listSetQuestionExtension = QuestionSetAPIExtensions.ListSetQuestion + '' + id;
        placeGetRequest(listSetQuestionExtension, this.parseaGetListSetQuestionsResponse, this.parseGetListSetQuestionsError);
    }
    parseaGetListSetQuestionsResponse(respObj) {
        var questions = respObj.questions

        this.setState({
            setQuestions: questions,
            displaySetInfo: {
                dispSetName: respObj.setname,
                dispSetDuration: respObj.duration
            }
        })

    }
    parseGetListSetQuestionsError(error) {
        console.log("ListSetQuestionError", error);
    }
    //=========================================
    render() {
        return (
            <div className="exam-container">
                <Examlistcomp showSetList={this.props.questionSetList} showSetQuestions={this.showQuestionsSet} idToShowQuesList={this.props.idToShowSetList} onSelectSet={this.handleSetId} callListSets={this.props.callSetList} />
                {
                    this.state.setId !== '' ?
                    <ExamDetailView queslistset={this.props.questionSetList} toAddQuestionsList={this.props.questionsList} setQuesList={this.state.setList} dispQuestions={this.state.setQuestions} callListSets={this.props.callSetList} dispSetData={this.state.displaySetInfo} setid = {this.state.setId} onSelectSetDetail={this.deletequesId}/>
                    :
                    ''
                }
            </div>
        );
    }
}

export default Examcomp;