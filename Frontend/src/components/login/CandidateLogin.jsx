
import React, { Component } from 'react';
import { placePostRequest } from '../../model/apicommunicator';
import { LoginAPIExtensions } from '../../model/serviceparams';
import ErrorMessage from '../../screens/others/ErrorMessage';
import CandidateInstructions from '../../components/Candidate/CandidateInstructions'

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            canname: '',
            cannumber: '',
            canemail: '',
            referredby: '',
            inprogress: false,
            showError: false,
            msgError: '',
            iconError: false,
            valid: true,
            isopenInstruction:false
        }
    }

    //=======================================
        closDialog = () =>{
            this.setState({
                isopenInstruction:false
            },()=>{
                this.props.history.push('/CandidatePage');
            })
        }
    //=======================================
    getcCandidatename(e) {
        this.setState({
            canname: e.target.value
        });
    }

    getcCandidatenumber(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({
                cannumber: e.target.value
            })
        }
    }
    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email)
    }
    getcCandidateemail(e) {
        const email = e.target.value
        const emailValid = this.validateEmail(email)
        this.setState({
            canemail: e.target.value,
            valid: emailValid
        })
    }

    submitCandidate() {
        sessionStorage.setItem('myData', 'access');
        if ((this.state.canname !== '') && (this.state.cannumber !== '') && (this.state.canemail !== '') && (this.state.valid === true)) {
            this.getCandidateLogin();

        } else if (this.state.canname === '') {

            this.setState({
                showError: true,
                iconError: true,
                msgError: "Name not an empty"
            })
        } else if (this.state.cannumber === '') {
            this.setState({
                showError: true,
                iconError: true,
                msgError: "Number not an empty"
            })
        } else if (this.state.canemail === '') {
            this.setState({
                showError: true,
                iconError: true,
                msgError: "Email not an empty"
            })
        } else if (this.state.valid === false) {
            this.setState({
                showError: true,
                iconError: true,
                msgError: "Invalid Email"
            })
        }
        else {
            //alert("go to exampage");
            this.setState({
                showError: true,
                iconError: true,
                msgError: "Invalid Data"
            })

        }
    }


    //==========================================================================================

    getCandidateLogin() {
        let reqObj = {
            candidateName: this.state.canname,
            candidateEmail: this.state.canemail,
            candidatePhoneNo: this.state.cannumber,
            referencedBy: 'harsha'
        }
        this.setState({
            inprogress: true
        })
        this.setState({
            isopenInstruction:true
          })
        placePostRequest(LoginAPIExtensions.CandidateLogin, reqObj, this.parseGetCandiateLoginResponse.bind(this), this.parseGetCandiateLoginError.bind(this));
    }

    parseGetCandiateLoginResponse(respObj) {
       
        console.log("CandidateSignUpResponse", respObj);
        this.setState({
            inprogress: false,
            showError: true,
            msgError: respObj.message
        })
        var parsing =JSON.stringify(respObj)
        window.sessionStorage.setItem("key", parsing);
        
        //var candidateData = JSON.stringify(candidateData)
       // console.log("queen", candidateData)
      // this.props.history.push('/CandidatePage');
      this.setState({
        isopenInstruction:true
      })
    }
     
    parseGetCandiateLoginError(error) {
        this.setState({
            inprogress: false
        })
        console.log("CandidateSignUpError", error);
    }
    // ========================================================

    closeError = () => {
        this.setState({
            showError: false
        });
    }

    //==========================================================================================
    render() {
        return (
            <div className="login-form">
                <div className="getname form-control">
                    <label>Name:</label>
                    <input type='text' autoFocus value={this.state.canname} onChange={this.getcCandidatename.bind(this)} />
                </div>
                <div className="getnumber form-control">
                    <label>Number:</label>
                    <input type='text' maxLength="10" value={this.state.cannumber} onChange={this.getcCandidatenumber.bind(this)} />
                </div>
                <div className="getemail form-control">
                    <label>Email:</label>
                    <input type='text' value={this.state.canemail} onChange={this.getcCandidateemail.bind(this)} />
                </div>
                <div className="form-button form-control">
                    <button type="button" className="candidate_submit" onClick={this.submitCandidate.bind(this)}>Sign In</button>
                </div>
                {
                    this.state.showError === true ?
                        <ErrorMessage errHeader='Login' error={this.state.showError} errorIcon={this.state.iconError} errorinfo={this.state.msgError} onClose={this.closeError} />
                        :
                        null
                }
                {
                    this.state.isopenInstruction === true ?
                    <CandidateInstructions  closeDialog = {this.closDialog} />
                    :
                    ''
                }
            </div>

        )
    }

}

export default LoginForm;