import React, { Component } from 'react';
import { connect } from "react-redux";


class DeFaultClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
     
        };
    }

    async componentDidMount() {
  
    }
    

    render() {
        return (
            <div></div>
        )
   
    }


}

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(DeFaultClass);


// kh lay tu mot noi kahac thi la cham props ,khi lay tu chinh no la la .state 