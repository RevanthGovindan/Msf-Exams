import React, { Component } from 'react';
import '../../assets/css/Adminpage.css';
import logo_sec from '../../assets/images/logo_sec.png';
import logout from '../../assets/images/logout.png';


class AdminHeader extends Component {
    logOut = () =>{
        this.props.history.push("/");
    }
    //======================
    render() {
        return (
            <div className="admin-page-header">
                <div className="logo-section">
                    <img src={logo_sec} alt="logo" className="logo-img" />
                    
                </div>
                <div className="domain-dropdown">
                    {/* <select>
                        <option>WEB</option>
                        <option>ANDROID</option>
                        <option>IOS</option>
                        <option>TESTING</option>
                        <option>OTHERS</option>
                    </select> */}
                    <img src={logout} alt="logOut" title="LogOut" className="logout-png" onClick = {this.logOut}/>
                </div>

            </div>
        );
    }
}

export default AdminHeader;