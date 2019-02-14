import React, { Component } from 'react';
import '../../assets/css/loginpage.css';
import LoginForm from '../../components/login/LoginForm';
import { Logins } from '../../common/Constants';
import CandidateLogin from '../../components/login/CandidateLogin';
import login_bg from '../../assets/images/login_bg.jpg';
import logo_sec from '../../assets/images/logo_sec.png';

class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            currentpage: Logins.ADMIN_PANEL
        }
    }

    // =====================================================

    gotoCandidate(e) {
        this.setState({ currentpage: Logins.CANDIDATE_LOGIN })
    }

    gotoAdminpage(e) {
        this.setState({ currentpage: Logins.ADMIN_PANEL })
    }

    // =====================================================

    render() {
        return (
            <div className="login-page">
                <div className="content" >
                    <div className="login-form-container">
                        <div className='login-left-details'>
                            <div className="logo-section">
                                <img src={logo_sec} alt="logo" className="logo-img" />
                            </div>
                            <div className="welcome">
                                Welcome!
                            </div>
                            {this.state.currentpage === Logins.ADMIN_PANEL ?
                                <LoginForm  history={this.props.history}/>
                                :
                                ''

                            }
                            {this.state.currentpage === Logins.CANDIDATE_LOGIN ?
                                <CandidateLogin history={this.props.history}/>
                                :
                                ''
                            }
                            <div className="gotoadmin">
                                {
                                    this.state.currentpage === Logins.ADMIN_PANEL ?
                                        <p onClick={this.gotoCandidate.bind(this)}>Go to Candidate Panel</p> :
                                        <p onClick={this.gotoAdminpage.bind(this)}>Go to Admin Panel</p>
                                }
                            </div>
                        </div>
                        <div className='login-right-details'>
                            <img src={login_bg} alt="loginscreen" className="login-right-image" />
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

export default LoginPage;