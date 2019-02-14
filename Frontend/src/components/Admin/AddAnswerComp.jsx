import React, { Component } from 'react';

class AddAnswerComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: this.props.choiceToAns,
            answer: '',
            correctAns: this.props.choiceToAnswer
        }
    }

    componentDidMount() {

        if(this.state.correctAns !== ''){
            let intans = parseInt(this.props.choiceToAnswer);
            let correctans = this.state.options[intans - 1].id
            this.setState({
                answer: correctans
            })
        }

    }
    selectAnswer(e) {
        this.setState({
            answer: e.target.value
        }, () => {
            this.sentAnswer();
        });
    }
    sentAnswer() {
        let correctanswer = this.state.answer
        this.props.handlerFromParant(correctanswer);

    }
    render() {
        return (
            <div className="question-section">
                <div className="question-label">Answer: </div>
                <select value={this.state.answer} onChange={this.selectAnswer.bind(this)}>
                    {
                        this.state.options.map((d, idx) => {
                            return (
                                <option key={idx} value={d.id}>{d.displaytext}</option>
                            )
                        })
                    }
                </select>
            </div>
        )
    }
}

export default AddAnswerComp;