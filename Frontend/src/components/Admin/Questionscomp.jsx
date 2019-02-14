import React, { Component } from 'react';
import AddQuestioncomp from './AddQuestioncomp';
import Questionlistcomp from './Questionlistcomp';
class Questionscomp extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            listques: [],
            editques: false,
            editqdata: '',
            editid: ''
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


    render() {

        return (
            <div className="question-container">
                <div className="buttons-cont">
                    <button className="add-utton" onClick={this.openModal.bind(this)}>Add Question</button>
                </div>
                <Questionlistcomp listarraydata={this.state.listques} editOpen={this.editModal.bind(this)} callQuestions={this.props.callList} />

                {this.state.isOpen ?
                    <AddQuestioncomp show={this.state.isOpen} onClose={this.closeModal} handlerFromParant={this.handleData} editData={this.state.editqdata} editcon={this.state.editques} editid={this.state.editid} callQuestions={this.props.callList}>
                    </AddQuestioncomp>
                    :
                    ''
                }

            </div>
        );
    }
}

export default Questionscomp;