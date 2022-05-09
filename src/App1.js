import React, {Component} from 'react';

//목표 데이터베이스를 연결해서 구현하지 않고, 배열에 데이터를 저장하고 출력하는 방식으로 게시판 구현

class App extends Component {
    state = { //?state
        boards: [
            {
                brdno: 1,
                brdwriter: 'Lee SunSin',
                brdtitle: 'If you intend to live then you die',
                brddate: new Date()
            }, {
                brdno: 2,
                brdwriter: 'So SiNo',
                brdtitle: 'Founder for two countries',
                brddate: new Date()
            }
        ]
    }
    render() { //
        const {boards} = this.state;
        const list = boards.map(function (row) {
            return row.brdno + row.brdwriter;
        });
        return (<div>
            hey
            {list}
        </div>);
    }
}
export default App;
