import react, { Component } from 'react';

class Dropdown extends Component{
    constructor(props){
        super(props);
        this.state = {
            dropList: '',
            defaultValue:''
        }
    }
    render(){
        return(
            <p>Am a Drop Down</p>
        );
    }
}

export default Dropdown;