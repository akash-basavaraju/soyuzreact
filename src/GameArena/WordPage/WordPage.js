import React from 'react';
import $ from 'jquery';

export default class WordPage extends React.Component{
    constructor(props){
      super(props);    
      this.state={
        currentWordCode: this.props.selectedWordCode
      }
      this.shownWordList = [];
      this.wordIndices = [];
      this.shownWordList.push(this.props.selectedWordCode);
    }
    wordSelected(wordCode){      
      this.wordIndices = Array.from(this.shownWordList);
      this.shownWordList.push(wordCode);
      this.setState({currentWordCode: wordCode});
      $(window).scrollTop(0);
    }

    coloredBoxesSuggested() {
      this.colorCode = Math.floor((Math.random() * 8) + 1);
      switch(this.colorCode){
        case 1: this.colorWord = 'red';break;
        case 2: this.colorWord = 'blue';break;
        case 3: this.colorWord = 'violet';break;
        case 4: this.colorWord = 'green';break;
        case 5: this.colorWord = 'purple';break;
        case 6: this.colorWord = 'orange';break;
        case 7: this.colorWord = 'pink';break;
        case 8: this.colorWord = 'black';break;          
      }
      this.wordCode = Math.floor((Math.random() * 20 + 1));
      while(this.wordIndices.includes(this.wordCode)){
        this.wordCode = Math.floor((Math.random() * 20 + 1));
      }
      this.wordIndices.push(this.wordCode);
      return(<SuggestedColoredBoxes words={this.props.words} wordCode={this.wordCode} color={this.colorWord} wordSelected={(wordCode)=>this.wordSelected(wordCode)}/>
      );
    }
    render(){
      if(this.props.words.length == 0){
        return null;
      }else{
      return(
        <div className="gameArena col-sm-12"  style={{backgroundColor: 'antiquewhite'}} >
          <div className="text-center">
            <div className="jumbotron-fluid">
                <h1 className="display-4">{this.props.words[this.state.currentWordCode].word}</h1>
                <p className="lead">{this.props.words[this.state.currentWordCode].defination}</p>
                <p className="lead">
                  <a className="btn btn-primary btn-lg" href={"https://www.google.co.in/search?q="+this.props.words[this.state.currentWordCode].word+"%20meaning"} target="_blank" role="button">Learn more</a>
                </p>              
                <hr className="my-4" />
            </div>
            <span style={{fontSize: '2rem'}}>Next Word..</span>
            <div className="d-flex justify-content-center">
                {this.coloredBoxesSuggested()}
                {this.coloredBoxesSuggested()}
                {this.coloredBoxesSuggested()}
                {this.coloredBoxesSuggested()}
                {this.coloredBoxesSuggested()}
            </div>
          </div>
        </div>
      );
    }
    }
  }

  class SuggestedColoredBoxes extends React.Component{
    wordSelected(){
      this.props.wordSelected(this.props.wordCode);
    }
    render(){
     return(
       <div className="coloredBox" style={{backgroundColor: this.props.color,color:'white'}} onClick={()=>this.wordSelected()}>
                {this.props.words[this.props.wordCode].word}
              </div>
     )
    }
   }