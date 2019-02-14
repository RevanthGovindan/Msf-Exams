import React, { Component } from 'react';
import { placePostRequest } from '../../model/apicommunicator';
import { LoginAPIExtensions } from '../../model/serviceparams';
import ErrorMessage from '../../screens/others/ErrorMessage';

class CandidateLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adminname: '',
            adminpwd: '',
            inprogress: false,
            showError: false,
            msgError:'',
            iconError:false
        }
    }

    // =====================================================

    getAdminName(e) {
        this.setState({ adminname: e.target.value });
    }

    getAdminPassword(e) {
        this.setState({ adminpwd: e.target.value });
    }

    submitAdmin(e) {
        sessionStorage.setItem('myData', 'access');
        if ((this.state.adminname !== '') && (this.state.adminpwd !== '') ) {
            this.getAdminLogins();
        }else if(this.state.adminname === ''){
            this.setState({
                showError: true,
                msgError:"UserName is required",
                iconError:true
            });
        }else if(this.state.adminpwd === ''){
            this.setState({
                showError: true,
                msgError:"Password is required",
                iconError:true
            });
        }
         else {
            this.setState({
                showError: true,
                msgError:"UserName and Password is required",
                iconError:true
            });
        }
    }
    submitAdminKey = (e)=>{
        e.preventDefault();
        if(e.keyCode === 13){
            if ((this.state.adminname !== '') && (this.state.adminpwd !== '') ) {
                this.getAdminLogins();
            } else {
                this.setState({
                    showError: true,
                    msgError:"Fill UserName and Password",
                    iconError:true
                });
            }
        }
    }
    // =====================================================

    getAdminLogins() {
        this.setState({ inprogress: true });
        let reqdata = {
            userName: this.state.adminname,
            password: this.state.adminpwd
        }
        // reqdata = JSON.stringify(reqdata);
        placePostRequest(LoginAPIExtensions.AdminLogin, reqdata, this.parseGetAdminLoginsResponse.bind(this), this.parseGetAdminLoginsError.bind(this));
    }

    parseGetAdminLoginsResponse(respObj) {
        this.setState({ inprogress: false });
        if (respObj.isValid === true) {
            console.log("respObj.isValid", respObj.isValid);
            this.props.history.push('/AdminPage');
        } else {
            console.log("respObj.isValid", respObj.message); 
            this.setState({
                showError: true,
                msgError:respObj.message
            });

        }

    }

    parseGetAdminLoginsError(error) {
        this.setState({ inprogress: false });
        console.log(error);
    }

    // =====================================================
    closeError = () => {
        this.setState({
            showError: false
        });
    }
    // ========================================================
    render() {
        return (
            <div>
                <div className="admin-login-form">
                    <div className="adminname admin-form-control">
                        <label>Username:</label>
                        <input type='text' autoFocus value={this.state.adminname} onChange={this.getAdminName.bind(this)} />
                        
                    </div>
                    <div className="adminpwd admin-form-control">
                        <label>Password:</label>
                        <input type='text' value={this.state.adminpwd} onChange={this.getAdminPassword.bind(this)} />
                    </div>
                    <div className="form-button admin-form-control">
                        <button type="button" className="admin_submit" onClick={this.submitAdmin.bind(this)} onKeyUp = {this.submitAdminKey.bind(this)}>Sign In</button>
                    </div>
                </div>
                {
                    this.state.showError === true ?
                    <ErrorMessage errHeader= 'Login' error={this.state.showError} errorIcon ={this.state.iconError} errorinfo = {this.state.msgError} onClose = {this.closeError}/>
                    :
                    null
                }
                
            </div>

        );



    }
}

export default CandidateLogin;
