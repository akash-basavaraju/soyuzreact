import React from 'react';
import FirstPage from './FirstPage/FirstPage';
import WordPage from './WordPage/WordPage';
import $ from 'jquery';
import axios from 'axios';

export default class GameArena extends React.Component{
    constructor(props){
      super(props);
      this.state={
        selectedWordCode: 0,
        received: [],
      };
    }
    componentWillReceiveProps(nextProps){
      this.updateTheWords();
    }
    componentWillMount(){
      this.updateTheWords();
    }
    updateTheWords(){
      axios.get('/words/'+this.props.wordsCategory)
      .then((res)=>{
        console.log(res.data.array);
        this.setState({received: res.data.array});
        console.log(this.state.received);
      })
      .catch((error)=>console.log(error))
      .then(()=>console.log('ajax call finished excution!'));
    }
    wordSelected(wordCode){
      this.setState({selectedWordCode: wordCode});
      $(window).scrollTop(0);
    }
    render(){    
      if(this.state.selectedWordCode === 0){
        return <FirstPage words={this.state.received} wordSelected={(wordCode)=>this.wordSelected(wordCode)}/>
      }else{
        return <WordPage words={this.state.received} selectedWordCode={this.state.selectedWordCode}/>
      }
    }
  }