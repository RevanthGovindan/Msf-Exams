import React, { Component } from 'react';
import AddQuestioncomp from './AddQuestioncomp';
import Questionlistcomp from './Questionlistcomp';
import FileUpload from './FileUpload';
class Questionscomp extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            listques: [],
            editques: false,
            editqdata: '',
            editid: '',
            isUpload:false
        };

    }

    componentWillReceiveProps(nextProps) {
        console.log("nextpropsss", nextProps)
        this.setState({ listques: nextProps.questionsList });


    }
    openModal = () => {

        this.setState({
            isOpen: true
        });
    }
    editModal = (editq, id) => {
        this.setState({
            isOpen: true,
            editques: true,
            editqdata: editq,
            editid: id
        });

        console.log("editq", editq)
    }
    closeModal = () => {
        this.setState({
            isOpen: false,
            editques: false
        });
    }
    handleData = (data) => {
        this.state.listques.push(data);
        this.setState({
            listques: this.state.listques
        });

    }

    bulkUploadModal=()=>{
        this.setState((prevState)=>{
            return{
                isUpload : !prevState.isUpload
            }
        });
    }

    render() {

        return (
            <div className="question-container">
                <div className="buttons-cont ques-buttons">
                    <div>
                        <button className="add-utton" onClick={this.bulkUploadModal.bind(this)}>CSV Bulk Upload</button>
                    </div>
                    <div>
                        <button className="add-utton" onClick={this.openModal.bind(this)}>Add Question</button>
                    </div>
                </div>

                <Questionlistcomp listarraydata={this.state.listques} editOpen={this.editModal.bind(this)} callQuestions={this.props.callList} />

                {this.state.isOpen ?
                    <AddQuestioncomp  onClose={this.closeModal} handlerFromParant={this.handleData} editData={this.state.editqdata} editcon={this.state.editques} editid={this.state.editid} callQuestions={this.props.callList}>
                    </AddQuestioncomp>
                    :
                    ''
                }
                {
                    this.state.isUpload ? 
                    <FileUpload callQuestions={this.props.callList} bulkUploadModal={this.bulkUploadModal}/>:''
                }

            </div>
        );
    }
}

export default Questionscomp;