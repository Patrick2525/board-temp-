import React, { Component } from 'react';

// 글쓰기 기능 구현하기 위해서는 HTML 컨트롤과 이벤트가 React와 연동되는 방법을 알아야 한다
// React의 값을 주고 받는 방식도 잘 기억해야 하지만, 자식(BoardForm)에서 작성한 값을 부모에게 보내어 저장하는 구조도 잘 기억해야한다
// 부모(App)의 state에 있는 boards에 모든 값을 저장하기 때문에 부모에게 사용자가 입력한 값을 전송한다
// 부모의 state에 값을 저장하고, 이 state에 변경이 생기면 state(boards)의 값을 참조하는 또 다른 자식인
// BoardItem에 값들이 자동으로 보내어져 추가된 글이 화면에 출력된다.
// 이것이 React의 특징 중 하나이다.
// 일반적으로 프로그래밍에서는 데이터를 추가하거나 수정하면 화면 갱신을 하도록 별도의 처리를 해야 하지만
// React에서는 state에 변경사항이 생기면 관련 내용이 자동으로 반영된다.

/*
    add a board (post)
*/

class App4 extends Component {
    
    state = { // App 컴포넌트에서 사용하는 state
        maxNo: 3,
        boards: [
            {
                brdno: 1,
                brdwriter: 'Lee SunSin',
                brdtitle: 'If you intend to live then you die',
                brddate: new Date()
            },
            {
                brdno: 2,
                brdwriter: 'So SiNo',
                brdtitle: 'Founder for two countries',
                brddate: new Date()
            }
        ]
    }
    // 호출받은 부모의 handleSaveData()에서는 setState를 이용하여 state에 있는 boards 배열에 값을 추가(concate)한다
    //board배열에 concat으로 추가하고 이것을 board라는 이름으로 저장하는 방식으로 작성한다
    handleSaveData = (data) => { 
        this.setState({
            // 저장시 글 번호(brdno)와 작성일자(brddate)를 생성한다
            // 작성일자는 자바스크립트 Date 클래스로 현재 날짜를 입력하고, 글 번호는 state에 추가한 변수 maxNo값을 이용한다
            // 글을 추가한 후에 1증가(++)한 값(다음 글번호)을 저장한다
            boards: this.state.boards.concat({ brdno: this.state.maxNo++, brddate: new Date(), ...data })
        });
    }
  
    render() {
        const { boards } = this.state;

        return (
            <div>
                {/* 부모(호출하는)App 컴포넌트에서는 값을 입력받을 적당한 위치에 BoardForm 컴포넌트를 생성한다
                컴포넌트 생성은 HTML 태그처럼 <BoardForm/>로 작성하면된다
                BoardForm를 생성하면서 파라미터로 handleSaveData() 함수를 onSaveData()라는 이름으로 넘겨준다
                이것을 자식(호출받는) BoardForm에서는 this.props.onSaveData로 호출한다 */}
                
                <BoardForm onSaveData={this.handleSaveData}/> 
                <table border="1">
                    <tbody>
                    <tr align="center">
                        <td width="50">No.</td>
                        <td width="300">Title</td>
                        <td width="100">Name</td>
                        <td width="100">Date</td>
                    </tr>
                    {
                        boards.map(function(row){ 
                            return (<BoardItem key={row.brdno} row={row} />);
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

class BoardItem extends React.Component {
    render() {
        return(
            <tr>
                <td>{this.props.row.brdno}</td>
                <td>{this.props.row.brdtitle}</td>
                <td>{this.props.row.brdwriter}</td>
                <td>{this.props.row.brddate.toLocaleDateString('ko-KR')}</td>
            </tr>
        );
    }
}

// 글쓰기 기능 구현할 컴포넌트 생성
class BoardForm extends Component {
    state = {} // BoardForm 내부에서 사용하는 state
                // state는 컴포넌트 내부에서 사용할 변수로 이름이 고정되어 있다
    
    //이벤트 헨들러
    //화살표 함수가 아닌 전통적인 함수로 작성하면 bind등의 복잡한 처리를 해야한다
    handleChange = (e) => { // 사용자가 값을 입력할 때 마다(onCahnge 이벤트) 입력하는 값을 받아서
                            // state 변수에 각 컨트롤의 이름(brdtitle, brdwriter)으로 저장한다
                            // e는 자바스크립트의 change 이벤트에서 파라미터로 넘어오는 Event를 의미하고
                            // e.target은 현재 이벤트가 발생한 개체, 즉 값을 입력하는 입력상자를 의미한다
        this.setState({  // 저장시 setState함수를 이용해야함(리액트 규칙) / this.state.brdwriter=값 (X)
            [e.target.name]: e.target.value // 각각의 이름으로 변수가 생성되어 사용자가 입력한 값이 저장됨
        })
    }

    //이벤트 헨들러
    handleSubmit = (e) => { // From 태그가 값을 서버로 전송할 때 발생하는 이벤트를 처리하기 위한 핸들러
                            // 즉 사용자가 값을 입력하고 저장할 때 발생한다
        e.preventDefault(); // 실제로 서버로 보낼 것은 아니기 때문에 preventDefault로 이벤트를 중지한다
        this.props.onSaveData(this.state); // 그리고 onSaveData함수를 호출하여 데이터를 저장한다
                                           // onSaveData()는 BoardForm 컴포넌트에 있지않고 부모인 App 컴포넌트에 있기 때문에
                                           // this.props.onSaveDate()로 사용한다
                                           // onSaveData()는 부모로 부터 파라미터(this.props)로 받았다
                                           // 부모로부터 받은 것은 값이든 함수이든 항상 props를 사용해야 한다
                                           // 그리고 저장할 값은 state에 있으니 함수를 호출하면서 this.state를 넘겨준다
        this.setState({}); 
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {/* 입력상자와 handleChange를 연결 */}
                {/* 연결시 handleChange에 this를 붙여 사용하는데, 컴포넌트 내의 변수나 함수(이벤트 핸들러)를 참조할 때에는 this를 붙여야한다 */}
                <input placeholder="title" name="brdtitle" onChange={this.handleChange}/> 
                <input placeholder="name" name="brdwriter" onChange={this.handleChange}/>
                <button type="submit">Save</button>
            </form>
        );
    }
}

export default App4;