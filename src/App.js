import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      title: "React simple Crud aplication",
      act: 0,
      index: '',
      datas: []
    }
  }

  componentDidMount(){
    this.refs.name.focus();
  }

  fSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.datas);

    let datas = this.state.datas;
    let name = this.refs.name.value;
    let address = this.refs.address.value;

    if(this.state.act === 0){ // adding new data
      let data = {
        name, address
      }
      datas.push(data);
    }else{                 //update
      let index = this.state.index;
      datas[index].name = name;
      datas[index].address = address;
    }

    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  fRemove = (i, event) => {
    event.preventDefault();
    let datas = this.state.datas;
    datas.splice(i,1);
    this.setState({
      datas: datas
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
    
  }
  fEdit = (i, event) => {
    event.preventDefault();
    let data = this.state.datas[i];
    this.refs.name.value = data.name;
    this.refs.address.value = data.address;

    this.setState({
      act: 1,
      index: i
    });

    this.refs.name.focus();
  }

  render(){
    let datas = this.state.datas;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <form ref="myForm">
          <input type="text" ref="name"/>
          <input type="text" ref="address"/>
          <button onClick={this.fSubmit}>Submit</button>
          <pre>
            {datas.map((data, i) =>
              <li key={i}>
                {i+1}.{data.name},{data.address}
                <button onClick= {(e) => this.fRemove(i,e) }>remove</button>
                <button onClick= {(e) => this.fEdit(i,e) }>edit</button>
              </li>
            )}
          </pre>
        </form>
      </div>
    );
  }
}

export default App;
