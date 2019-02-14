import React, { Component } from 'react';
import AddQuestionSet from './AddQuestionSet';
import { placeGetRequest } from '../../../model/apicommunicator';
import { placeDeleteRequest } from '../../../model/apicommunicator';
import { LoginAPIExtensions } from '../../../model/serviceparams';
import { QuestionSetAPIExtensions } from '../../../model/serviceparams';
import deleteicon from '../../../assets/images/delete.jpeg';
import ErrorMessage from '../../../screens/others/ErrorMessage';
class Examlistcomp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listexam: [],
            activeId: 0,
            isOpenModel: false,
            addQuestionList: [],
            showInlineMessage: false,
            showError: false,
            msgError: '',
            iconError: false,
            istoDeleteSet: false,
            istoClose: false
        }

        this.parseaGetQuestionsResponse = this.parseaGetQuestionsResponse.bind(this);
        this.parseGetQuestionsError = this.parseGetQuestionsError.bind(this);
    }

    //===========================================
    componentDidMount = () => {
        this.setState({
            listexam: this.props.showSetList
        })
    }
    componentWillReceiveProps(newprops) {
        //console.log("zzzz",newprops.showSetList);
        var listexamLength = newprops.showSetList.length;
        console.log("listexamLength", listexamLength)
        if (listexamLength === 0) {
            this.setState({
                showInlineMessage: true,
                listexam: newprops.showSetList
            })
        } else {
            this.setState({
                showInlineMessage: false,
                listexam: newprops.showSetList
            })
        }
    }
    //========================================
    // to delete Sets 

    deleteSet = (id) => {
        var setId = id;
        var deleteExtension = QuestionSetAPIExtensions.DeleteSet + '' + setId;
        placeDeleteRequest(deleteExtension, this.parseDeleteSetResponse.bind(this), this.parseDeleteSetError.bind(this));
    }
    parseDeleteSetResponse(respData) {
        console.log("DeleteSetResponse", respData);
        this.setState({
            showError: true,
            msgError: respData.message,
            iconError: false,
            istoClose: true,
            istoDeleteSet: true
        }, () => {
            // this.props.callListSets();
        });
    }
    parseDeleteSetError(error) {
        console.log("DeleteSetError", error);
    }
    //=========================================
    getListSetQuestions(d, index) {
        var id = d
        this.props.onSelectSet(id);
        this.setState({ activeId: index })
    }
    //===========================================
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
    //================================================

    //Get Questions for Add Question Dialog
    getListQuestions() {
        this.showAddModal();
        placeGetRequest(LoginAPIExtensions.ListQuestion, this.parseaGetQuestionsResponse, this.parseGetQuestionsError);
    }
    parseaGetQuestionsResponse(respObj) {
        console.log("response", respObj)
        this.setState({
            addQuestionList: respObj
        })
    }
    parseGetQuestionsError(error) {
        console.log("error", error);
    }
    //=================================================
    closeError = () => {
        this.setState({
            showError: false
        }, () => {
            if (this.state.istoClose && this.state.istoDeleteSet) {
                this.props.callListSets();
            }

        });
    }

    //=================================================
    render() {
        return (
            <div className="exam-left-container">
                <div className="createbutton">
                    <button className="exam-create-btn">Create Exam</button>
                    <button className="exam-create-btn" onClick={this.getListQuestions.bind(this)}>Create Set</button>
                </div>
                <div className="exam-data-list">
                    {
                        this.state.listexam !== [] ?
                            this.state.listexam.map((d, idx) => {
                                return (
                                    <div className={"examsection " + (this.state.activeId === idx ? 'activeTab' : '')} key={idx} onClick={this.getListSetQuestions.bind(this, d.id, idx)}>
                                        <div className="examname">{d.setname}</div>
                                        {/* <div className="examdate">{d.id}</div> */}
                                        <div className="delete-set">
                                            <img src={deleteicon} alt="Delete Set" onClick={this.deleteSet.bind(this, d.id)}></img>
                                        </div>
                                    </div>
                                )
                            })

                            :
                            <div>
                                <div>No data</div>
                            </div>
                    }
                    {
                        this.state.showError === true ?
                            <ErrorMessage errHeader='Login' error={this.state.showError} errorIcon={this.state.iconError} errorinfo={this.state.msgError} onClose={this.closeError} />
                            :
                            null
                    }
                    {
                        this.state.showInlineMessage === true ?
                            <div className="inLineMessage"> No Sets Available </div>
                            :
                            ''
                    }
                </div>
                {
                    this.state.isOpenModel === true ?
                        <AddQuestionSet closeAddModal={this.closeAddModal} AddQuestionsToList={this.state.addQuestionList} callListSetFromParent={this.props.callListSets} />
                        :
                        ''
                }
            </div>

        );
    }
}

export default Examlistcomp;