import React, { Component } from 'react';
import { questTypes } from '../../../common/Constants';
import { QuestionSetAPIExtensions } from '../../../model/serviceparams';
import { placePostRequest } from '../../../model/apicommunicator';
import ErrorMessage from '../../../screens/others/ErrorMessage';

class AddQuestionSet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllQuestions: [],
            isChecked: false,
            selectedQuestions: [],
            setname: '',
            duration: '',
            id: "string",
            showError: false,
            msgError: '',
            istoClose : false,
            date:'',
            today:'',
            removeDuplicate:[],
            duplicate:[],
            iconError:false,
            istoUpdateSet:false
           


        }
        this.parseCreateQuestionSetResponse = this.parseCreateQuestionSetResponse.bind(this);
        this.parseCreateQuestionSetError = this.parseCreateQuestionSetError.bind(this);
    }
    //==============================

    componentWillReceiveProps(newprops) {
        console.log("updateprops", newprops)
        this.setState({
            listAllQuestions: newprops.AddQuestionsToList,
            removeDuplicate: newprops.compareQuestionList
            //id:newprops.AddQuestionsToList.id

        },
        ()=>{
            if(this.props.isaddQuesToSet === true){
            var ListAll = this.state.listAllQuestions;
            var ListAllRemove = this.state.removeDuplicate;
                for (var i = 0; i < ListAll.length; i++) {
                    for (var j = 0; j < ListAllRemove.length; j++) {
                        if (ListAllRemove[j].id === ListAll[i].id) {
                          var x = ListAll.indexOf(ListAll[i]);
                           ListAll.splice(x,1);
                        }
                    }
                }
                this.setState({
                    listAllQuestions:ListAll
                })
            }else{
                this.setState({
                    listAllQuestions:newprops.AddQuestionsToList
                })
            }

            
        }
        )
        console.log("id", this.state.id)
    }
    //===============================
    getSetName = (e) => {
        this.setState({
            setname: e.target.value
        })
    }
    // getToday =() => {
    //     var today = new Date();
    //     var dd = today.getDate();
    //     var mm = today.getMonth() + 1; 
    //     var yyyy = today.getFullYear();
    //     if (dd < 10) {
    //     dd = '0' + dd;
    //     }
    //     if (mm < 10) {
    //     mm = '0' + mm;
    //     }
    //     today = dd + '/' + mm + '/' + yyyy;
    //     console.log("today", today)
    //     this.setState({
    //         today:today
    //     })
    //         }
    // getDate = (e)=>{
       
    //         this.setState({
    //             date: e.target.value
    //         })
    // }

    getDuration = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({
                duration: e.target.value
            })
        }
    }
    checkQuestion(e, question) {
        console.log("zz", question)
        let selectedQuestions = Object.assign([], this.state.selectedQuestions);
        if (e.target.checked) selectedQuestions.push(question);
        else
            selectedQuestions = selectedQuestions.filter(selectedQuestion => question !== selectedQuestion);

        this.setState({
            selectedQuestions
        }, () => console.log(this.state.selectedQuestions));
    }

    //==================================================

    // to create Question Set

    createQuestionSet() {
        var reqData = {
            duration: this.state.duration,
            questions: this.state.selectedQuestions,
            setname: this.state.setname
           // date:this.state.date
        }
        console.log("reqData", reqData.setname)
        if (reqData.setname !== '' && reqData.duration !== '' && reqData.questions.length !== 0) {
            placePostRequest(QuestionSetAPIExtensions.CreateQuestionSet, reqData, this.parseCreateQuestionSetResponse, this.parseCreateQuestionSetError);
        } else if (reqData.setname === '') {
            this.setState({
                showError: true,
                msgError: "Setname not an empty",
                iconError:true
            });
        } else if (reqData.duration === '') {
            this.setState({
                showError: true,
                msgError: "duration not an empty",
                iconError:true
            });
        } else if (reqData.questions === '') {
            this.setState({
                showError: true,
                msgError: "Select atleast one question",
                iconError:true
            });
        }else{
            this.setState({
                showError: true,
                msgError: "Enter valid data",
                iconError:true
            });
        }
    }

    parseCreateQuestionSetResponse(respObj) {
        console.log("createQuestionSetResponse", respObj);
        this.setState({
            showError: true,
            msgError: respObj.message,
            iconError:false,
            istoClose:true,
            istoUpdateSet:true
        },()=>{
            console.log("call1")
           // this.props.callListSetFromParent();
        });
       

    }
    parseCreateQuestionSetError(error) {
        console.log("createQuestionSetError", error);
        this.setState({
            showError: true,
            msgError: error.message,
            iconError:false
        });
    }
    //====================================================
        // to add Questions inside a test        

        addQuestionsSet= ()=>{

            var reqData = {
                questions: this.state.selectedQuestions,
                id:this.props.addQuesToSetId
               
            }
            
            placePostRequest(QuestionSetAPIExtensions.AddQuestionsToSet, reqData, this.parseAddQuestionsSetResponse.bind(this), this.parseAddQuestionsSetError.bind(this));
        }
        parseAddQuestionsSetResponse(resObj){
            console.log("addQuestionResponse",resObj);
            let id = this.props.addQuesToSetId;
            this.setState({
                showError: true,
                msgError: resObj.message,
                iconError:false,
                istoClose:true
            },()=>{
                this.props.IdtoUpdate(id);
            })
            

        }
        parseAddQuestionsSetError(error){
            console.log("addQuestionError",error);
        }        

    //==================================================
    closeError = () => {
        this.setState({
            showError: false
        },()=>{
            if (this.state.istoClose && this.props.closeAddModal)
            this.props.closeAddModal();

            if(this.state.istoClose && this.state.istoUpdateSet){
                this.props.callListSetFromParent();
            }
            
        });
    }

    //==================================================
    render() {
        return (
            <div className="overlay">
                <div className="add-modal">
                    <div className="add-modal-header">
                        <div className="header-title">Select a questions here</div>
                         {
                            this.props.isaddQuesToSet === true? 
                            ''
                            :
                        <div className="setName-sec">
                            <input type="textbox" placeholder="Setname here" onChange={this.getSetName.bind(this)} value={this.state.setname} />
                            {/* <input type="date" onChange={this.getDate.bind(this)} value={this.state.date} onClick = {this.getToday.bind(this)} min = {this.state.today}/> */}
                            <input type="textbox" placeholder="Duration in Minuts" maxLength = "5" onChange={this.getDuration.bind(this)} value={this.state.duration} />
                        </div>
                         
                         } 

                    </div>
                    <div className="add-modal-body">
                        {
                            this.state.listAllQuestions !== [] ?
                                this.state.listAllQuestions.map((d, idx) => (
                                    <div className="ques-select-section" key={idx} >
                                        <div className="qustion-checkbox">
                                            <input type="checkbox" onChange={e => this.checkQuestion(e, d)} />
                                            <div className="question-name">{d.question}</div>
                                        </div>

                                        <div className="question-options">
                                            {
                                                d.questionType === questTypes.MCQ ?
                                                    d.choices.map((d, idx) => {

                                                        return (
                                                            <div className="choice-list" key={idx}>
                                                                <span className="choice-option">{'(' + d.id + ')' + d.displaytext}</span>
                                                            </div>
                                                        )
                                                    })
                                                    :
                                                    null
                                            }
                                        </div>
                                    </div>
                                ))
                                :
                                ''
                        }
                    </div>
                    <div className="add-modal-footer">
                        <button className="add-model-cancel" onClick={this.props.closeAddModal}>Cancel</button>
                        {
                            this.props.isaddQuesToSet === true?
                            <button className="add-model-submit" onClick={this.addQuestionsSet.bind(this)}>Submit Questions</button>
                            :
                            <button className="add-model-submit" onClick={this.createQuestionSet.bind(this)}>Submit Set</button>
                        }
                       
                    </div>
                </div>
                {
                    this.state.showError === true ?
                        <ErrorMessage errHeader='QuestionSet' errorIcon ={this.state.iconError} error={this.state.showError} errorinfo={this.state.msgError} onClose={this.closeError} />
                        :
                        ''
                }
            </div>
        );
    }
}

export default AddQuestionSet;