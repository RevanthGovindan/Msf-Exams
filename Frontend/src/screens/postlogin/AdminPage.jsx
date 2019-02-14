import React, { Component } from 'react';
import '../../assets/css/Adminpage.css';
import AdminHeader from '../../components/Admin/Adminheader';
import Adminview from '../../components/Admin/AdminView';


class AdminPage extends Component {
    render() {
        return (
            <div className="admin-page">
                <AdminHeader history={this.props.history}/>
                <Adminview />
            </div>
        );
    }
}

export default AdminPage;