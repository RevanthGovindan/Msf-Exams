import React, { Component } from 'react';
import AddAnswerComp from '../Admin/AddAnswerComp';
import { placePostRequest } from '../../model/apicommunicator';
import { placePutRequest } from '../../model/apicommunicator';
import { LoginAPIExtensions } from '../../model/serviceparams';
import ErrorMessage from '../../screens/others/ErrorMessage';
import addChoice from '../../assets/images/addChoice.png';
import answershow from '../../assets/images/dropdown.jpeg';

class AddQuestioncomp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inprogress: false,
            Ques: '',
            QuesType: '',
            Choices: '',
            Ans: '',
            isaddTotal: false,
            id: '',
            displayData: [],
            typeTextDisabled: false,
            showError: false,
            msgError: '',
            actualobject: undefined,
            istoclose: false,
            showanswer: false,
            iconError:false
            

        }
        this.ChocieChange = this.ChocieChange.bind(this);

    }
    //==================================================================

    componentDidMount() {
        this.setUpQuestion(this.props);
    }

    componentWillReceiveProps(editedProps) {
        if (this.state.actualobject === editedProps.editData)
            return;

        this.setUpQuestion(editedProps);
    }

    setUpQuestion(editedProps) {
        console.log("edited", editedProps)
        if (editedProps.editcon === true) {
            var newobj = JSON.parse(JSON.stringify(editedProps.editData))
            this.setState({
                Ques: newobj.question,
                QuesType: newobj.questionType,
                Ans: newobj.correctanswer,
                displayData: newobj.choices,
                id: newobj.id,
                typeTextDisabled: true,

                actualobject: editedProps.editData
            })

            if (editedProps.editData.questionType === 'mcq') {
                this.setState({
                    isaddTotal: true
                });
            } else {
                this.setState({
                    isaddTotal: false
                });
            }
        } else {

            this.setState({
                inprogress: false,
                Ques: '',
                QuesType: '',
                Choices: '',
                Ans: '',
                isaddTotal: false,
                id: '',
                displayData: [],
                typeTextDisabled: false

            })
        }

    }

    //===================================================================
    getQuestion(e) {
        this.setState({
            Ques: e.target.value
        });
    }
    getQuestionType(e) {
        this.setState({
            QuesType: e.target.value
        });
    }

    addChoice() {
        if (this.state.displayData.length <= 3) {
            let dispId = this.state.displayData.length + 1;
            var iddisplaytext = {
                displaytext: '',
                id: dispId.toString()
            }
            let arr = this.state.displayData;
            arr.push(iddisplaytext);
            this.setState({
                isaddTotal: true,
                displayData: arr
            });
        }
    }
    showanswer = () => {
        var disptemp = this.state.displayData;
        let dispLength = disptemp.length;
        var optionnull = [];
        for (var i = 0; i <= dispLength - 1; i++) {
            if (disptemp[i].displaytext === '') {
                optionnull.push(disptemp[i]);
            }
        }
        if (optionnull.length === 0) {
            this.setState({
                showanswer: true
            })

        } else {
            this.setState({
                showanswer: false,
                showError: true,
                msgError: 'Options not an empty',
                iconError:true
            })
        }
    }
    ChocieChange = (e, data) => {
        let arr = this.state.displayData;
        arr[data].displaytext = e.target.value;
        this.setState({
            displayData: arr,
            showanswer: false
        });


    }

    handleAnswer = (data) => {
        this.setState({
            Ans: data
        });


    }
    DeleteOption(data) {
        let obj = this.state.displayData;
        obj.splice(data, 1);
        this.setState({
            displayData: obj
        })

    }
    saveQuestion(e) {

        if (this.state.isaddTotal === true) {

            if ((this.state.Ques !== '') && (this.state.QuesType !== '') && (this.state.displayData !== '') && (this.state.Ans !== '')) {
                var disptemp = this.state.displayData;
                let dispLength = disptemp.length;
                var optionnull = [];
                for (var i = 0; i <= dispLength - 1; i++) {
                    if (disptemp[i].displaytext === '') {
                        optionnull.push(disptemp[i]);
                    }
                }
                if (optionnull.length >= 1) {
                    this.setState({
                        showError: true,
                        msgError: 'Options not an empty',
                        iconError:true

                    });
                } else {
                    this.addQuestionsRequest();
                }

            } else if(this.state.Ques === ''){
                this.setState({
                    showError: true,
                    msgError: 'Please enter valid question',
                    iconError:true
                });
            }else if(this.state.QuesType === ''){
                this.setState({
                    showError: true,
                    msgError: 'Please enter valid questionType',
                    iconError:true
                });
            }else if(this.state.displayData === ''){
                this.setState({
                    showError: true,
                    msgError: 'Please enter valid Options',
                    iconError:true
                });
            }
            else if(this.state.Ans === ''){
                this.setState({
                    showError: true,
                    msgError: 'Please enter valid Answer',
                    iconError:true
                });
            }
        } else {

            if ((this.state.Ques !== '') && (this.state.QuesType === 'text')) {
                this.addQuestionsRequest();
            }else if(this.state.Ques === ''){
                this.setState({
                    showError: true,
                    msgError: 'Please enter valid question',
                    iconError:true
                });
            }else if(this.state.QuesType === ''){
                this.setState({
                    showError: true,
                    msgError: 'Please enter valid questionType',
                    iconError:true
                });
            }
             else {
                this.setState({
                    showError: true,
                    msgError: 'Please enter valid questions',
                    iconError:true
                });
            }
        }
    }

    //=====================================================================================

    addQuestionsRequest() {
        this.setState({
            inprogress: true
        });
        if (this.state.isaddTotal === true) {
            var reqdata = {
                question: this.state.Ques,
                questionType: this.state.QuesType,
                correctanswer: this.state.Ans,
                choices: this.state.displayData
            }
        } else {
            reqdata = {
                question: this.state.Ques,
                questionType: this.state.QuesType
            }
        }

        placePostRequest(LoginAPIExtensions.AddQuestion, reqdata, this.parseaddQuestionsResponse.bind(this), this.parseaddQuestionsError.bind(this));
    }

    parseaddQuestionsResponse(respObj) {
        console.log("response", respObj);
        this.props.callQuestions();
        this.setState({
            inprogress: false,
            Ques: '',
            QuesType: '',
            Choices: '',
            Ans: '',
            isaddTotal: false,
            displayData: [],
            id: ''
        });
        this.setState({
            showError: true,
            msgError: respObj.message,
            iconError:false
        });

    }

    parseaddQuestionsError(error) {
        console.log("error", error);
    }

    //==============================================================================================

    UpdateQuestion(e) {
        if (this.state.isaddTotal === true) {
            if ((this.state.Ques !== '') && (this.state.QuesType !== '') && (this.state.choiceList !== '') && (this.state.Ans !== '')) {

                var disptemp = this.state.displayData;
                let dispLength = disptemp.length;
                var optionnull = [];
                for (var i = 0; i <= dispLength - 1; i++) {
                    if (disptemp[i].displaytext === '') {
                        optionnull.push(disptemp[i]);
                    }
                }
                if (optionnull.length >= 1) {
                    this.setState({
                        showError: true,
                        msgError: 'Options not an empty',
                        iconError:true
                    });
                } else {
                    this.updateQuestionsRequest();
                }
            } else {
                this.setState({
                    showError: true,
                    msgError: 'Please enter valid questions',
                    iconError:true
                });
            }
        } else {
            if ((this.state.Ques !== '') && (this.state.QuesType === 'text')) {
                this.updateQuestionsRequest();
            } else {
                this.setState({
                    showError: true,
                    msgError: 'Please enter valid questions',
                    iconError:true
                });
            }
        }
    }
    updateQuestionsRequest() {
        this.setState({
            inprogress: true
        });
        if (this.state.isaddTotal === true) {
            var reqdata = {
                question: this.state.Ques,
                questionType: this.state.QuesType,
                correctanswer: this.state.Ans,
                choices: this.state.displayData,
                id: this.state.id
            }
        } else {
            reqdata = {
                question: this.state.Ques,
                questionType: this.state.QuesType,
                id: this.state.id
            }
        }

        placePutRequest(LoginAPIExtensions.UpdateQuestion, reqdata, this.parseUpdateQuestionsResponse.bind(this), this.parseUpdateQuestionsError.bind(this));
    }

    parseUpdateQuestionsResponse(respObj) {

        this.props.callQuestions();
        this.setState({
            showError: true,
            msgError: respObj.message,
            istoclose: true
        });
    }
    parseUpdateQuestionsError(error) {
        console.log("error", error);
    }
    //=======================================================================
    closeError = () => {
        this.setState({
            showError: false
        }, () => {
            console.log(this.state.istoclose);
            if (this.state.istoclose && this.props.onClose){
                this.props.onClose();
            }       
        });
    }

    //============================
    render() {

        if (this.props.show === true) {
            return (
                <div className="backdrop">
                    <div className="modal">
                        <div className="question-header">
                            Add a Question and Answer here
                        </div>
                        <div className='add-question-model'>

                            <div className="question-section">
                                <div className="question-label">Enter Question: </div>
                                <input type='text' className='question-part' value={this.state.Ques} onChange={this.getQuestion.bind(this)} />
                            </div>
                            <div className="question-section">
                                <div className="question-label">Question Type: </div>

                                <select disabled={this.state.typeTextDisabled} value={this.state.QuesType} onChange={this.getQuestionType.bind(this)}>
                                    <option value='select here' >select here</option>
                                    <option value='text' >text</option>
                                    <option value='mcq'>MCQ</option>
                                </select>

                            </div>
                            {
                                this.state.QuesType === "mcq" ?
                                    <div>
                                        <div className="question-section">
                                            <div className="question-label">Add Choice: </div>
                                            {/* <span className="addChoice" onClick={this.addChoice.bind(this)}>&#43;</span> */}
                                            <img src={addChoice} alt="addchoice-icon" className="addChoice-png" onClick={this.addChoice.bind(this)}></img>
                                        </div>
                                    </div>
                                    :
                                    ''
                            }
                            {
                                this.state.isaddTotal === true ?
                                    <div>

                                        <div className="display-choice-container">
                                            {
                                                this.state.displayData.map((d, idx) => {
                                                    return (
                                                        <div className="options-container" key={idx}>

                                                            <span className="deleteOption" onClick={this.DeleteOption.bind(this, idx)} id={idx}>&#10006; </span>
                                                            <input type="text" id={idx} value={d.displaytext} onChange={((e) => this.ChocieChange(e, idx, d))} />
                                                        </div>
                                                    )
                                                }
                                                )
                                            }
                                        </div>
                                        <div className="question-section">
                                            <div className="question-label">Create Answer: </div>
                                            <div className="answer-png">
                                                <img src={answershow} alt="addchoice-icon" className="addChoice" onClick={this.showanswer.bind(this)}></img>
                                            </div>
                                        </div>
                                        {
                                            this.state.showanswer === true ?
                                                <AddAnswerComp choiceToAns={this.state.displayData} handlerFromParant={this.handleAnswer} choiceToAnswer={this.state.Ans} />
                                                :
                                                ''
                                        }
                                    </div>
                                    :
                                    ''
                            }
                        </div>

                        <div className="question-footer">
                            <button onClick={this.props.onClose} className="close-model">Close</button>
                            {
                                this.props.editcon !== true ?
                                    <button onClick={this.saveQuestion.bind(this)} className="save-model">Save</button>
                                    :
                                    <button onClick={this.UpdateQuestion.bind(this)} className="save-model">Update</button>
                            }


                        </div>

                        {
                            this.state.showError === true ?
                                <ErrorMessage errHeader='AddQuestion' errorIcon ={this.state.iconError} error={this.state.showError} errorinfo={this.state.msgError} onClose={this.closeError} />
                                :
                                ''
                        }
                    </div>
                </div>
            );
        }
        else {
            return null
        }

    }
}

export default AddQuestioncomp;