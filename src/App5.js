import React, { Component } from 'react';

/*
    delete & update a Item(Row)
*/
// 글 수정은 글 항목(행)들 중에 하나를 선택하면(handleSelectRow)
// 선택된 행의 값들을 사용자가 수정할 수 있도록 입력상자(BoardForm)에 뿌려주고,
// 사용자가 수정 후 저장 버튼을 클릭하면, 글번호의 값이 있으면 수정, 없으면 신규 등록으로 구현한다

class App5 extends Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
    }
    
    state = {
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
    
    handleSaveData = (data) => {
        let boards = this.state.boards;
        if (data.brdno ===null || data.brdno==='' || data.brdno===undefined) {    // new : Insert   8. 글 번호(Brdno)가 있으면 수정, 없으면 신규 등록으로 구현한다
            this.setState({
                maxNo: this.state.maxNo+1,
				boards: boards.concat({brdno: this.state.maxNo, brddate: new Date(), brdwriter: data.brdwriter, brdtitle: data.brdtitle })				
            });
        } else {                                                        // Update
            this.setState({
                boards: boards.map(row => data.brdno === row.brdno ? {...data }: row) // 9. 수정은 글 번호가 같은 행을 찾아서(data.brdno === row.brdno) 행을 바꾸는 방식으로 구현
            })                                                                        // 마지막으로 사용자가 입력한 값은 지워 주는데 BoardFrom에서 state 변수내의 값 변수들
        }                                                                             // 값을 지워주면 화면에서도 지워진다. BoardItem고 같은 원리로 입력상자들이 state를 바라보고 있기 때문에
    }                                                                                 // 가능한 것이다. React에서는 HTML 태그들이 자바스크립트에 바인드(Bind) 된 것처럼 작동한다
    
    handleRemove = (brdno) => { // 사용자가 삭제 버튼을 클릭하면 부모에 저장된 boards에서 해당 글을 삭제한다
        this.setState({
            boards: this.state.boards.filter(row => row.brdno !== brdno) // 삭제할 때는, 사용자가 선택한 글 번호(brdno)에 해당하는 글을 찾아서 삭제
        })                                                               // 배열에서 값을 삭제하는 것을 filter사용 권장
    }
    
    handleSelectRow = (row) => { //3. 부모는 선택한 행의 데이터를 자식(this.child)의 handleSelectRow를 호출하면서 파라미터로 넘겨준다
         this.child.current.handleSelectRow(row);
    }
    
    render() {
        const { boards } = this.state;

        return (
            <div>
                {/* 2. 입력상자는 BoardForm에 있기 때문에 BoardForm을 부모(App)컴포넌트가 알고 있어야 한다. 즉 자식(BoardForm)의 핸들러를 가지고 있어야 한다
                각 컴포넌트의 핸들을 가지고 오는 속성 ref를 this.child에 보관하는 방법을 사용한다 */}
                <BoardForm onSaveData={this.handleSaveData}  ref={this.child}/>
                <table border="1">
                    <tbody>
                    <tr align="center">
                        <td width="50">No.</td>
                        <td width="300">Title</td>
                        <td width="100">Name</td>
                        <td width="100">Date</td>
                    </tr>
                    {
                        boards.map(row =>
                            (<BoardItem key={row.brdno} row={row} onRemove={this.handleRemove} onSelectRow={this.handleSelectRow} />)
                        )
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

class BoardItem extends React.Component {
    handleRemove = () => {
        const { row, onRemove } = this.props;
        onRemove(row.brdno);
    }    
    handleSelectRow = () => {
        const { row, onSelectRow } = this.props;
        onSelectRow(row);
    }    
    render() {
        console.log(this.props.row.brdno);
        return(
            <tr>
                <td>{this.props.row.brdno}</td>
                {/* 1. 사용자가 글 항목(행)들 중에 하나를 선택하면(handleSelectRow) 선택된 행의 값들을 사용자가 수정할 수 있도록 입력상자에 뿌려주어야 한다*/}
                <td><a onClick={this.handleSelectRow}>{this.props.row.brdtitle}</a></td>
                <td>{this.props.row.brdwriter}</td>
                <td>{this.props.row.brddate.toLocaleDateString('ko-KR')}</td>
                {/* 삭제버튼 */}
                <td><button onClick={this.handleRemove}>X</button></td>
            </tr>
        );
    }
}

class BoardForm extends Component {
    state = {
        brdwriter:'',
        brdtitle:''        
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    handleSelectRow = (row) => { 
        this.setState(row); // 4. 입력 폼(BoardForm)에서는 부모로부터 받은 값을 그대로 state변수에 넣어준다
                            // 파라미터로 받은 값의 구조가 Json이기 때문에 '변수:값'구조로 지정하지 않고 한번에 넣어 준다
    }
    
    handleSubmit = (e) => { //6. 사용자가 수정 후 저장 버튼을 클리가면
        e.preventDefault();
        this.props.onSaveData(this.state); // 7. 부모로 데이터를 보내서 
        this.setState({
            brdno:'',
            brdwriter:'',
            brdtitle:''
        });
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {/* 5. 이 state의 변수를 입력상자가 바로 보고 있도록 수정해서 state 값이 변경되면 자동으로 바뀌도록 작성. BoardForm과 같은 원리 */}
                <input placeholder="title" name="brdtitle" value={this.state.brdtitle} onChange={this.handleChange}/>
                <input placeholder="name" name="brdwriter" value={this.state.brdwriter} onChange={this.handleChange}/>
                <button type="submit">Save</button>
            </form>
        );
    }
}

export default App5;