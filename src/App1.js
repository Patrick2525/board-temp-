import React, {Component} from 'react';

//목표 데이터베이스를 연결해서 구현하지 않고, 배열에 데이터를 저장하고 출력하는 방식으로 게시판 구현


/*
 simple list
 */

class App extends Component {
    state = { // state 변수 - 게시판 데이터를 배열로 가지는 board 배열을 구성원으로 가지고 있다
        boards: [
            {
                brdno: 1, // 글번호(board No.)
                brdwriter: 'Lee SunSin', // 작성자(Writer)
                brdtitle: 'If you intend to live then you die', // 글제목(boardTitle)
                brddate: new Date() // 작성일자(board date)
            }, {
                brdno: 2,
                brdwriter: 'So SiNo',
                brdtitle: 'Founder for two countries',
                brddate: new Date()
            }
        ]
    }
    render() { //render - React에서 화면을 생성하기 위해 실행하는 이벤트
        const {boards} = this.state; // component에 있는 state를 render에서 사용하기 위해 this.state로 지정한다
                                     // this는 자바스크립트에서 자기 자신(Component)을 의미한다
                                     // const boards = this.state.board;
        const list = boards.map(function (row) { // 가지고 온 데이터(board)를 map()메서드를 이용해 하나의 문자열(list)로 작성
            return row.brdno + row.brdwriter;
        });
        // html영역
        return (<div>
            {list}
        </div>);
    }
}
export default App;
