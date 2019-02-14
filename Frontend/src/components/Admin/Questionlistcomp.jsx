import React, { Component } from 'react';
import {questTypes} from '../../common/Constants';
import { placeDeleteRequest } from '../../model/apicommunicator';
import { LoginAPIExtensions } from '../../model/serviceparams';
import ErrorMessage from '../../screens/others/ErrorMessage';

class Questionlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listarrques: [],
            showError: false,
            msgError:'',
            showInlineMessage :false,
            istoDeleteQues:false,
            istoclose:false
        }
    }
    componentWillReceiveProps(nextProps){
        console.log("nextpropslistarraydata",nextProps.listarraydata)
        this.setState({listarrques: nextProps.listarraydata });
        let showInlineMessage = nextProps.listarraydata.length;
        if(showInlineMessage === 0){
            this.setState({
                showInlineMessage:true
            })
        }else{
            this.setState({
                showInlineMessage:false
            }) 
        }
    } 
    //============================================================
    deleteQuestions(d){
        var deleteextension = LoginAPIExtensions.DeleteQuestion + '' + d;
        placeDeleteRequest(deleteextension, this.parseDeleteQuestionResponse.bind(this), this.parseDeleteQuestionError.bind(this));
    }
    parseDeleteQuestionResponse(resObj){
        console.log("resObj",resObj);
       
        //this.props.callQuestions();
        this.setState({
            showError: true,
            msgError:resObj.message,
            istoDeleteQues:true,
            istoclose:true
        });
       
    }
    parseDeleteQuestionError(error){
        console.log("error",error);
    }

    //============================================================
    closeError = () => {
        this.setState({
            showError: false
        },()=>{
            if(this.state.istoclose && this.state.istoDeleteQues){
                this.props.callQuestions();
            }
        });
    }
    //============================================================
    render() {
        return (
            <div className="question-lists">
                {
                    this.state.listarrques !== [] ?
                        this.state.listarrques.map((d, idx) => {
                            return (
                                <div className="question-sec" key={idx}>
                                <div className="ques-choice">
                                    <div className="quesshow">{'(' + (idx + 1 )+ ') '+ d.question}</div>
                                    <div className="choice-section">
                                   {
                                        d.questionType === questTypes.MCQ ?
                                        d.choices.map((d, idx) => {    
                                            return(
                                                <div className ="choice-list" key={idx}>
                                                    <span className = "choice-option">{'('+ d.id +')'+ d.displaytext}</span>
                                                </div>
                                            )
                                        })
                                        :
                                        null
                                    } 
                                    </div>
                                </div>
                                    <div className="action-btns">
                                        <button className="delete-btn" onClick={this.deleteQuestions.bind(this, d.id)}>Delete</button>
                                        <button className="edit-btn" onClick={() => { this.props.editOpen(d, idx) }}>Edit</button>
                                    </div>
                                </div>
                            )
                        })
                        :
                        ''
                }
                {
                    this.state.showInlineMessage === true?
                    <div className = "inLineMessage"> No Questions to Show </div>
                    :
                    ''
                }
                    {
                    this.state.showError === true ?
                    <ErrorMessage errHeader= 'Question' error={this.state.showError} errorinfo = {this.state.msgError} onClose = {this.closeError}/>
                    :
                    ''
                }
            </div>

        );
    }
}

export default Questionlist;