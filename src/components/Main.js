import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';


export default class Main extends Component {
constructor(props){
    super(props);
    this.state = {
      
    }
}

    render() {

        return (
            <div>
                {this.props.quotes}
            </div>
        )
    }
}
