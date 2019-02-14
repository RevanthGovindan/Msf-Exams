import React, { Component } from 'react';

class CandidateDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            candidateInfo: [],
            candidateName: ''
        }
    }
    //===========================================
    componentDidMount() {
        this.setState({
            candidateInfo: this.props.candidateInfo.questions,
            candidateName: this.props.candidateInfo.candidateName
        })
    }
    closeModal = () => {
        this.props.closeDialog();
    }
    //========================================
    render() {
        return (
            <div className="backdrop">
                <div className="candidateDetailModel">
                    <div className="cand-header">
                        <div className="can-name">{this.state.candidateName}</div>
                    </div>
                    <div className="detail-section">
                        {
                            this.state.candidateInfo !== [] ?
                                this.state.candidateInfo.map((d, idx) => {
                                    return (
                                        <div className="detail-question-section" key={idx}>
                                            <div className="detail-question">
                                                <pre>Q.{idx + 1}: {d.question}</pre>
                                            </div>
                                            <div className="detail-answer">
                                                <pre>Ans: {d.submittedanswer}</pre>
                                            </div>
                                        </div>
                                    )
                                })

                                :
                                <div className="detail-question-section">
                                    <div>No data available</div>
                                </div>
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

export default CandidateDetail;