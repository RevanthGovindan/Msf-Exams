import React, { Component } from 'react';

class CandidateInstructions extends Component{
    constructor(props){
        super(props);
        this.state={
            isStart:false
        }
    }
    //===========================
    closeModal=() => {
        this.props.closeDialog();
    }

    render(){
        return(
            <div className="backdrop">
                 <div className="instructionModel">
                    <div className="instructionList">
                        <div className="instructions">* Negative Marks for wrong Answers</div>
                        <div className="instructions">* Time countdown starts automatically once start the test</div>
                        <div className="instructions">* Test submitted automatically once time gets over</div>
                        <div className="instructions">* No tab switching during the test</div>
                        <div className="instructions">* Press start button, to take a test</div>
                    </div>
                    <div className="buttons">
                    <button className="close-btn" onClick={this.closeModal.bind(this)}>Start</button>
                    </div>
                    
                 </div>
            </div>
            
        )
    }
}
export default CandidateInstructions;