import React, { Component } from 'react';
import success from '../../../src/assets/images/success.png';
import error from '../../../src/assets/images/error.png';

class ErrorMessage extends Component {
    constructor(props){
        super(props);
        this.state = {
            messagebody :this.props.errorinfo,
            error:this.props.errorIcon
        }
        console.log("body",this.state.messagebody)
    }


    closeError(){

    }
    render() {
        return (
            
            <div className="backdrop">
                <div className="errorModel">
                        <div className="errorHeader">
                            <div className="headertext">{this.props.errHeader}</div>
                            <div className ="closeError" onClick={this.props.onClose}>&#10006;</div>
                        </div>
                        <div className="errorBody">
                            <div className="message-icon">
                                {
                                    this.state.error === true?
                                    <img src= {error} alt="error" />
                                    :
                                    <img src= {success} alt="success" />
                                }
                            </div>
                            <div className="error-message">
                            {this.state.messagebody}
                            </div>
                            
                        </div>
                        <div className="errorFooter">
                            <button className="close-btn" onClick={this.props.onClose}>Close</button>
                        </div>
                </div>
            </div>
        );
    }
}

export default ErrorMessage;