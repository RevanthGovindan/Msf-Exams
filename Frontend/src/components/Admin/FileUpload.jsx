import React, { Component } from 'react';
import { questionHeaders } from '../../common/Constants';
import { placePostRequest } from '../../model/apicommunicator';
import { LoginAPIExtensions } from '../../model/serviceparams';
import ErrorMessage from '../../screens/others/ErrorMessage';
class FileUpload extends Component {
    constructor() {
        super();
        this.state = {
            questions: [],
            error: '',
            showMessage:false,
            message:''
        }
        this.closeError = this.closeError.bind(this);
    }

    handleChangeFile = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onload = () => {
            this.textToJSON(reader.result);
        };
        reader.readAsText(file);
    }

    textToJSON = (file) => {
        let lines = file.split("\n");
        var headers;
        headers = lines[0].split(",");
        for (let i = 0; i < questionHeaders.length; i++) {
            if (questionHeaders[i].trim() !== headers[i].trim()) {
                this.setState({ error: "File is not in required format" });
                console.log("error")
                return;
            }
        }
        let data = [];
        for (let i = 1; i < lines.length; i++) {
            let row = lines[i].split(",");
            let pushData = {};
            for (let j = 0; j < headers.length; j++) {
                pushData[questionHeaders[j]] = row[j];

            }
            data.push(pushData);
        }
        this.setState({ questions: data });
    }

    UploadQuestion = () => {
        let questions = this.frameQuestionRequest();
        placePostRequest(LoginAPIExtensions.BulkUpload, questions, this.parseaddQuestionsResponse.bind(this), this.parseaddQuestionsError.bind(this));
    }

    frameQuestionRequest = () => {
        let questions =  this.state.questions;
        let newRequestData = [];
        for (let i = 0; i < questions.length; i++) {
            let obj = {
                question: questions[i].question,
                questionType: questions[i].question_type,
                correctanswer: questions[i].answer_option,
                choices: [
                    {
                        id: '1',
                        displaytext: questions[i].option1
                    },
                    {
                        id: '2',
                        displaytext: questions[i].option2
                    },
                    {
                        id: '3',
                        displaytext: questions[i].option3
                    },
                    {
                        id: '4',
                        displaytext: questions[i].option4
                    }
                ]
            }
            newRequestData.push(obj);
        }
       return newRequestData;
    }
    parseaddQuestionsResponse = (response)=>{
        if(response && response.message){
            this.setState({showMessage:true,message:response.message})
        }           
    }

    parseaddQuestionsError = (error)=>{
        this.setState({showMessage:true,message:error.message})
    }
    closeError(){
        this.setState({showMessage:true},()=>{
            this.props.bulkUploadModal();
            this.props.callQuestions();
        })
    }
    render() {
        return (
            <div className="backdrop">
                <div className="modal">
                    <div className="question-header">
                        Upload Questions
                    </div>
                    <div className='add-question-model'>
                        <div className="question-upload-input">
                            <input
                                className="upload"
                                type="file"
                                id="file"
                                accept=".csv, text/csv"
                                onChange={e => this.handleChangeFile(e)}
                            />
                        </div>
                    </div>
                    <div className="question-footer">
                        <button onClick={this.props.bulkUploadModal} className="close-model">Close</button>
                        {
                            <button onClick={this.UploadQuestion} className="save-model">Upload</button>
                        }
                    </div>
                    {
                        this.state.showMessage?
                        <ErrorMessage errHeader='Add Question' onClose={this.closeError} errorinfo={this.state.message}/>:''
                    }
                </div>
            </div>
        )
    }


};
export default FileUpload;