import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GameArena from './GameArena/GameArena';
import ModalShow from './ModalShow/ModalShow';

class AppComponent extends React.Component{
    constructor(props){
        super(props);
      this.state={wordsCategory: ''}
    }

    handleCategory(e){
      this.setState({wordsCategory: e.target.value});
    }

    render(){
        return(<div className="AppComponent">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">Soyuz</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item input-group">  
                <div className="input-group-prepend" style={{height: '38px'}}>
                  <div className="input-group-text">Choose Category:</div>
                </div>             
                <select className="custom-select" id="inputGroupSelect01" onChange={(e)=>this.handleCategory(e)} value={this.state.wordsCategory}>
                    <option defaultValue="">All</option>
                    <option value="Maths">Maths</option>
                    <option value="Physics">Physics</option>
                    <option value="Computer Science">Computer Science</option>
                  </select>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Type.." aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            <button className="btn btn-outline-danger" data-toggle="modal" data-target="#exampleModal">Add Word</button>
          </div>
        </nav>
        <div className="row" style={{minHeight: '20rem'}}>
          <GameArena wordsCategory={this.state.wordsCategory} ></GameArena>
        </div>
        <ModalShow></ModalShow>
        </div>
      );
    }
}

ReactDOM.render(<AppComponent/>,document.getElementById('root'));