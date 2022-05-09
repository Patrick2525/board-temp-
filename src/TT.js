import React, { Component } from 'react';

class TT extends Component() {
    componentDidMount() {
        console.log("componentDidMount() Called");
        console.log("componentDidMount의 this는", this); //App
        }

        render() {
        console.log("render() Called");
        console.log("render()의 this는", this); //App
        return (
            <div>
            <h1>Class Component this</h1>
            </div>
        );
        }
}

export default TT
