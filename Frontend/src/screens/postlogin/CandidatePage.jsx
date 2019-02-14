import React, { Component } from 'react';
import '../../assets/css/CandidatePage.css';
import CandidateHeader from '../../components/Candidate/CandidateHeader';
import CandidateView from '../../components/Candidate/CanidateView';

class CandidatePage extends Component{
    render(){
        return(
            <div className="candidate-container">
               <CandidateHeader />
               <CandidateView  history={this.props.history}/>
            </div>
        );
    }
}

export default CandidatePage;