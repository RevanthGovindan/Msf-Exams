import React, {Component} from 'react';
import logo_sec from '../../assets/images/logo_sec.png';

class CandidateHeader extends Component{
    constructor(props){
        super(props);
        this.state ={
            name:''
        }
    }
    componentDidMount(){
        var candidateData = window.sessionStorage.getItem("key");
        candidateData =  JSON.parse(candidateData)
        console.log("candidateData",candidateData)
            this.setState({
                name:candidateData.candidateName
            })
        
        
    }
    render(){
        return(
           <div className="candidate-header">
            <div className="logo-section">  
                <img src={logo_sec} alt="logo-MSF" />
            </div>
            <div className='show-candidateName'>Welcome <span className="candidate-name">{this.state.name}!</span></div>
           </div>
        )
    }
}

export default CandidateHeader;