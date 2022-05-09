import React, { Component } from 'react';

/*
    formed list with Table tag and component
*/

class App3 extends Component {
    state = {
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
  
    render() {
        const { boards } = this.state;

        //<tbody> 테이블 콘텐츠를 그룹으로 묶음
        //<tr> 하나의 행을 정의
        //<td> 하나의 데이터 셀을 정의할 때 사용
        return (
            <div>
                <table border="1">
                    <tbody> 
                    <tr align="center">
                        <td width="50">No.</td>
                        <td width="300">Title</td>
                        <td width="100">Name</td>
                        <td width="100">Date</td>
                    </tr>
                    {
                        //boards에 있는 데이터를 행(tr)으로 출력하도록 작성
                        boards.map(row =>
                            (<BoardItem key={row.brdno} row={row} />)
                        )
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}
// 컴포넌트 자신이 사용하는 것은 State이고, 부모로부터 받은 것은 Props이다
// BoardItem 컴포넌트를 사용하는 것은 React의 특징으로 React에서는 모든 기능을 컴포넌트로 구현하여 사용한다
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


export default App3;