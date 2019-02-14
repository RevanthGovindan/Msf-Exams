import React, { Component } from 'react';
import '../../assets/css/Evaluation.css';
import CandidateDetail from '../Evaluation/CandidateDetail.jsx'


class Evaluationcomp extends Component{
    constructor(props){
        super(props);
        this.state = {
            evaluationInfo : [],
            isOpenDetail:false,
            candidateInfo:[]
        }
    }
    componentWillReceiveProps(newprops){
        this.setState({
            evaluationInfo: newprops.showEvaluation
        },()=>{
            console.log("evaluationInfo",this.state.evaluationInfo)
        })
    }
    //===========================================================
    getCandiateInfo = (candData) => {
        

        this.setState({
            isOpenDetail: true,
            candidateInfo:candData
        },()=>{
            console.log("canId",this.state.candidateInfo)
        })
    }
    //============
    closDialog = () => {
        this.setState({
            isOpenDetail: false
        })
    }

    //===========================================================
    render(){
        return(
            <div className="evaluation-container">
                <div className="evaluation-header">
                    <div className="can-name">NAME</div>
                    <div className="can-number">NUMBER</div>
                    <div className="can-number">EMAIL</div>
                    <div className="can-number">MARKS</div>                
                </div>
                <div className="evaluation-body">
                {
                    this.state.evaluationInfo !==[] ?
                    this.state.evaluationInfo.map((d, idx)=>{
                        return(
                            <div className ="result-section" key = {idx} onClick={this.getCandiateInfo.bind(this, d)}>
                                       <div className="can-name">{d.candidateName}</div>
                                       <div className="can-number">{d.candidatePhoneNo}</div>
                                       <div className="can-number">{d.candidateEmail}</div>
                                       <div className="can-number">{d.marks}</div>
                            </div>
                        )
                    })
                    :
                    ''
                }
                </div>

                {
                    this.state.isOpenDetail === true ?
                    <CandidateDetail closeDialog={this.closDialog} candidateInfo = {this.state.candidateInfo}/>
                    :
                    ''
                }

            </div>
        );
    }
}

export default Evaluationcomp;