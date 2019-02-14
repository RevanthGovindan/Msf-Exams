import React, { Component } from 'react';

class CandidateSubmit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answers: [],
            name:'',
            number:'',
            email:'',
            Id:''
        }

    }

    componentDidMount() {
       
        var candidateData = window.sessionStorage.getItem("key");
        candidateData =  JSON.parse(candidateData)     
        this.setState({
            answers: this.props.sendAllanswers,
            name:candidateData.candidateName,
            number:candidateData.candidatePhoneNo,
            email:candidateData.candidateEmail,
            id:candidateData.id
        })

    }
    componentWillReceiveProps(newprops){
        this.setState({
            answers: newprops.sendAllanswers
        })
    }


    closeModal = () => {
        this.props.closeDialog();
        //this.props.history.push('/');
    }

    render() {
        return (
            <div className="backdrop">
                <div className="instructionModel">
                    <div className="submit-header">Test Submitted. Thank you!!!!</div>
                    <div className="Candidate-Details">
                      <div className="can-name">Name: {this.state.name}</div>
                      <div className="can-email">Email: {this.state.email}</div>
                      <div className="can-number">Number: {this.state.number} </div>
                    </div>
                    <div className="instructionList">
                        {
                            this.state.answers.map((d, idx) => {
                                return (
                                    <div key={idx}>
                                        <div><pre>Ques: {d.question}</pre></div>
                                        <div><pre>Ans: {d.answer}</pre></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="buttons">
                        <button className="close-btn" onClick={this.closeModal.bind(this)}>Close</button>
                    </div>

                </div>
            </div>
        )
    }
}

export default CandidateSubmit;