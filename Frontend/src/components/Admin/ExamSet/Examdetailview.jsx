import React, { Component } from 'react';
import AddQuestionSet from './AddQuestionSet';
import { placeGetRequest } from '../../../model/apicommunicator';
import { LoginAPIExtensions } from '../../../model/serviceparams';
import { placeDeleteRequest } from '../../../model/apicommunicator';
import { QuestionSetAPIExtensions } from '../../../model/serviceparams';
import ErrorMessage from '../../../screens/others/ErrorMessage';
class ExamDetailView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showListSet: [],
            isOpenModel: false,
            addQuestionList: [],
            setname: '',
            setdate: '',
            setduration: '',
            showInlineMessage: false,
            deletsetId: '',
            showError: false,
            msgError: '',
            iconError: false,
            isAddQuestionstoSet: false,
            istoClose: false,
            istoDeleteQuesFromSet: false

        }
        this.parseaGetQuestionsResponse = this.parseaGetQuestionsResponse.bind(this);
        this.parseGetQuestionsError = this.parseGetQuestionsError.bind(this);
    }
    //========================
    componentWillReceiveProps(newprops) {
        var showlistlength = newprops.dispQuestions.length;
        console.log("showlistlength", showlistlength)
        if (showlistlength === 0) {
            this.setState({
                showInlineMessage: true,
                showError: false,
                msgError: '',
                iconError: false
            }, () => {
                this.closeError()
            })
        } else {
            this.setState({
                showInlineMessage: false,
                deletsetId: newprops.setid
            })
        }
        this.setState({
            addQuestionList: [],
            showListSet: newprops.dispQuestions,
            setname: newprops.dispSetData.dispSetName,
            setduration: newprops.dispSetData.dispSetDuration,
            setdate: newprops.dispSetData.dispSetTime
        })
    }
    showAddModal = () => {

        this.setState({
            isOpenModel: true
        })
    }
    closeAddModal = () => {
        this.setState({
            isOpenModel: false
        });
    }
    //========================
    //Get Questions for Add Question Dialog

    addQuestions() {
        this.showAddModal();
        placeGetRequest(LoginAPIExtensions.ListQuestion, this.parseaGetQuestionsResponse, this.parseGetQuestionsError);
    }
    parseaGetQuestionsResponse(respObj) {
        console.log("response", respObj)
        var removeDuplicate = this.state.showListSet;
        console.log("removeDuplicate", removeDuplicate);
        this.setState({
            addQuestionList: respObj,
            isAddQuestionstoSet: true
        })

    }
    parseGetQuestionsError(error) {
        console.log("error", error);
    }
    //=============================
    // Delete Questions inside set

    DeleteSetQuestion = (quesid) => {
        var questionId = quesid;
        var setId = this.state.deletsetId;
        var deleteExtension = QuestionSetAPIExtensions.DeleteSetQuestion + '' + setId + '/' + questionId;
        placeDeleteRequest(deleteExtension, this.parseDeleteQuestionResponse.bind(this), this.parseDeleteQuestionError.bind(this));
    }
    parseDeleteQuestionResponse(respData) {
        console.log("DeleteResponse", respData)
        this.setState({
            showError: true,
            msgError: respData.message,
            iconError: false,
            istoDeleteQuesFromSet: true,
            istoClose: true

        });
    }
    parseDeleteQuestionError(error) {
        console.log("deleteError", error)
    }
    //=========================
    closeError = () => {
        this.setState({
            showError: false
        }, () => {
            if (this.state.istoDeleteQuesFromSet && this.state.istoClose) {
                this.setState({
                    istoDeleteQuesFromSet: false,
                    istoClose: false
                }, () => {
                    this.props.onSelectSetDetail();
                })

            }
        });
    }
    //=========================
    render() {

        return (
            this.state.showInlineMessage !== true ?
                <div className="exam-right-container">
                    <div className="showlist-header">
                        <div className="set-title"> Set Model: {this.state.setname}</div>
                        <div className="set-title"> Duration: {this.state.setduration}</div>
                        {/* <div className="set-title"> Created Date: {this.state.setdate}</div> */}
                        <button className="add-ques-btn" onClick={this.addQuestions.bind(this)}>Add Question</button>
                    </div>
                    <div className="showlist-body">
                        {
                            this.state.showListSet !== null ?
                                this.state.showListSet.map((d, idx) => {
                                    return (
                                        <div className="listset-question-sec" key={idx}>
                                            <div className="list-ques-name"> {d.question}</div>
                                            <button className="list-ques-delete" onClick={this.DeleteSetQuestion.bind(this, d.id, idx)}>Delete</button>
                                        </div>
                                    )
                                })
                                :
                                ''
                        }
                    </div>
                    {
                        this.state.isOpenModel === true ?
                            <AddQuestionSet closeAddModal={this.closeAddModal} compareQuestionList={this.state.showListSet} isaddQuesToSet={this.state.isAddQuestionstoSet} IdtoUpdate={this.props.onSelectSetDetail} addQuesToSetId={this.state.deletsetId} AddQuestionsToList={this.state.addQuestionList} callListSetFromParent={this.props.callListSets} />
                            :
                            ''
                    }
                    {
                        this.state.showError === true ?
                            <ErrorMessage errHeader='Login' error={this.state.showError} errorIcon={this.state.iconError} errorinfo={this.state.msgError} onClose={this.closeError} />
                            :
                            null
                    }
                </div>
                :
                <div className="exam-right-container">
                    <div className="showlist-header">
                        <div className="set-title"> Set Model: {this.state.setname}</div>
                        <div className="set-title"> Duration: {this.state.setduration}</div>
                        {/* <div className="set-title"> Created Date: {this.state.setdate}</div> */}
                        <button className="add-ques-btn" onClick={this.addQuestions.bind(this)}>Add Question</button>
                    </div>
                    <div className="inLineMessage"> No Questions Available </div>
                    {
                        this.state.isOpenModel === true ?
                            <AddQuestionSet closeAddModal={this.closeAddModal} compareQuestionList={this.state.showListSet} isaddQuesToSet={this.state.isAddQuestionstoSet} IdtoUpdate={this.props.onSelectSetDetail} addQuesToSetId={this.state.deletsetId} AddQuestionsToList={this.state.addQuestionList} callListSetFromParent={this.props.callListSets} />
                            :
                            ''
                    }
                </div>
        );
    }
}

export default ExamDetailView;