import React from 'react';

export default class FirstPage extends React.Component {
  constructor(props){
    super(props);
    this.wordIndices = [];
  }
  wordSelected(word){
    this.props.wordSelected(word);
  }
    coloredBoxes() {
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

      return <ColoredBoxes words={this.props.words} wordCode={this.wordCode} color={this.colorWord} wordSelected={(word)=>this.wordSelected(word)}/>
    }
    render(){
      if(this.props.words.length == 0){
        return (<div className="loader"></div>);
      }else{
      return(
        <div className="gameArena col-sm-12"  style={{backgroundColor: 'antiquewhite'}}>
          <div className="text-center">
            <h1>It's all about Words!</h1>
            <h3>Whats your word?</h3>
            <div className="d-flex justify-content-center">
                {this.coloredBoxes()}
                {this.coloredBoxes()}
                {this.coloredBoxes()}
                {this.coloredBoxes()}
                {this.coloredBoxes()}
                {this.coloredBoxes()}
                {this.coloredBoxes()}
                {this.coloredBoxes()}
                {this.coloredBoxes()}
            </div>
          </div>
        </div>
      );
    }
    }
  }

 class ColoredBoxes extends React.Component{
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