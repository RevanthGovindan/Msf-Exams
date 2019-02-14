import React, { Component } from 'react';

class RadioComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionValue: ''
        }
    }

    updateOptions(e){
            this.setState({
                optionValue:e.target.value 
            });
            console.log("stats", this.state.optionValue);
    }

    render() {
        return (
            <div className="question-section choices-section">

                  
                      
                            <div className ="question-choices" >
                                <span>X</span>
                                <input type= "text" value = {this.state.optionValue} onChange = {this.updateOptions.bind(this)}/> 

                            </div>
                        
  
             

            </div>
        );
    }
}

export default RadioComp;