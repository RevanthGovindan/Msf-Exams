import React, { Component } from 'react';

class ConsoleView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionToShow: '',
            quesNoToShow: '1',
            quesId: '',
            answer: '',
            totalAnswer: [],
            quesAnswer:[],
            options: [],
            selectedOption: ''
        }
    }
    //============================
    componentWillReceiveProps(newprops) {

        this.setState({
            questionToShow: newprops.toShowQuestion,
            quesNoToShow: newprops.toShowQuestionNumber,
            quesId: newprops.toShowQuestionId,
            options: newprops.toShowOptions
        })
    }


    answerHandler = (qID, aID, ques, ans) => {
        let totalAnswer = Object.assign({}, this.state.totalAnswer);
        let quesAnswer = Object.assign({}, this.state.quesAnswer);
        totalAnswer[qID] = aID;
        quesAnswer[ques] = ans; 
       // totalAnswer[qID] = ques;
        this.setState({
            totalAnswer: totalAnswer,
            quesAnswer:quesAnswer
        }, () => {
            this.props.submitAnswer(this.state.totalAnswer);
            this.props.showQuestionAnswer(this.state.quesAnswer);
            console.log("zzzz",this.state.totalAnswer)
        })
    }
    //===============================
    render() {
        return (
            <div className='console-view-container'>
                <div className='console-header'>
                    <div className="question-number">Question No: {this.state.quesNoToShow}</div>
                </div>
                <div className='console-body'>
                    <div className='show-question'>
                        {this.state.questionToShow}
                    </div>
                    <div className="question-options">
                        {
                            this.state.options.map((d, idx) => {
                                return (
                                    <div className="choice-list" key={idx}>

                                        <input type="radio" checked={this.state.totalAnswer[this.state.quesId] === d.id} name="choice" onChange={() => this.answerHandler(this.state.quesId, d.id, this.state.questionToShow,d.displaytext)} /> {d.displaytext} <br />
                                        {/* <input type="radio" checked={this.state.totalAnswer[this.state.quesNoToShow] === d.id} name="options" value = {d.id} onChange = {this.getAnswer.bind(this)}/>{ d.displaytext}<br/> */}
                                    </div>
                                )
                            })

                        }
                    </div>

                </div>

            </div>
        )
    }

}
export default ConsoleView;