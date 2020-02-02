import React from 'react';
import axios from 'axios';

export default class ModalShow extends React.Component{
    constructor(props){
        super(props);
        this.state={
          addedWord: '',
          addedTheory: '',
          category: ''
        }
    }
    handleWordChange(e){
      this.setState({addedWord: e.target.value});
    }
    handleTheoryChange(e){
      this.setState({addedTheory: e.target.value});
    }
    handleCategory(e){
      this.setState({category: e.target.value});
    }
    sendWord(){
      axios.post('/addword',{"word": this.state.addedWord,"defination": this.state.addedTheory, "category": this.state.category})
      .then((res)=>{console.log(res);alert('Word Added Succefully!');})
      .catch((err)=>console.log(err));
    }
    render(){
        return(
            <div>
            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel" >Add Word</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                  <input className="form-control mr-sm-2 addwordmodal" type="text" placeholder="Word" value={this.state.addedWord} onChange={(e)=>this.handleWordChange(e)}/>
                  <textarea className="form-control mr-sm-2 addwordmodal" type="text" placeholder="Word's meaning..." value={this.state.addedTheory} onChange={(e)=>this.handleTheoryChange(e)}/>
                  
                  <select className="custom-select addwordmodal" id="inputGroupSelect01" onChange={(e)=>this.handleCategory(e)} value={this.state.category}>
                    <option selected>Choose Category..</option>
                    <option value="Maths">Maths</option>
                    <option value="Physics">Physics</option>
                    <option value="Computer Science">Computer Science</option>
                  </select>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>this.sendWord()}>Save changes</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>
            </div>
        );
    }
}