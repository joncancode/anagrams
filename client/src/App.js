import React, { Component } from 'react';
import './App.css';

//this is a class component that will be used for our frontend
class App extends Component {
  constructor() {
    super();

    //the state will need to hold the input value as well as the total words in the dictionary text file.
    this.state = {
      inputVal: '',
      words: []
    };
  }

  //when the component mounts, it makes a fetch request to the backend to grab all the words
  componentDidMount() {
    fetch('/words')
      .then(res => res.json())
      .then(words => this.setState({ words }));
  }

  //this handle change updates the state every time the input field changes
  handleChange = e => {
    this.setState({
      inputVal: e.target.value
    });
  };

  swap(chars, a, b) {
    var temp = chars[a];
    chars[a] = chars[b];
    chars[b] = temp;
  }

  runAnagram() {
    let word = this.state.inputVal;
    var counter = [],
      anagrams = [],
      chars = word.split(''),
      length = chars.length,
      i;
    for (i = 0; i < length; i++) {
      counter[i] = 0;
    }
    anagrams.push(word);
    i = 0;
    while (i < length) {
      if (counter[i] < i) {
        this.swap(chars, i % 2 === 1 ? counter[i] : 0, i);
        counter[i]++;
        i = 0;
        anagrams.push(chars.join(''));
      } else {
        counter[i] = 0;
        i++;
      }
    }
 
    const anagramsBySecondLetter = anagrams.filter(word => this.state.inputVal[1] === word[0]).sort().map((word, i) => <li className="list-group-item" key={i}>{word}</li>);
    const anagramsRest = anagrams.filter(word => this.state.inputVal[1] !== word[0]).sort().map((word, i) => <li className="list-group-item" key={i}>{word}</li>);
    const anagramLength = anagrams.length

    this.setState({
      display: `You have ${anagramLength} total anagrams`,
      anagramsBySecondLetter,
      anagramsRest
    });
  }

  //this handleClick function will look at the current word in the state (input field) and then run compare it to the other words in the dictionary. the anagram check will go here.
  handleClick = e => {
    let existsInArray = this.state.words.includes(this.state.inputVal);
    if (existsInArray === true) {
      this.runAnagram();
    } else {
      this.setState({
        display: 'None: Does Not Exist in Dictionary',
        anagramsBySecondLetter: '',
        anagramsRest: ''
      });
    }
  };

  render() {
    return (
      //React returns this simple JSX.
      <div style={{ paddingTop: '10%' }} className="App">
        <h1 className="card-title">Fluent Anagram Finder</h1>
        <input
          type="text"
          value={this.state.inputVal}
          onChange={this.handleChange}
        />
        <button className="btn btn-primary" onClick={this.handleClick}>Press for Anagrams</button>
        <h3>{this.state.inputVal}</h3>
        <p>{this.state.display}</p>
        {this.state.anagramsBySecondLetter}
        {this.state.anagramsRest}
      </div>
    );
  }
}

export default App;

