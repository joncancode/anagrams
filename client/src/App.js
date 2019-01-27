import React, { Component } from 'react';
import './App.css';
import List from './components/List';

//this is a class component that will be used for our frontend
//while i could have broken this into multiple components, i used a single one, since it all was based off of the single action of one button click
class App extends Component {
  //because we are going to do some configuring to the state, we need to use the constructor and super in this component
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

  //this is a simple swapping function that is used within the anagram finder
  swap = (chars, a, b) => {
    let temp = chars[a];
    chars[a] = chars[b];
    chars[b] = temp;
  };

  //in order to get the anagrams, a bit of logic is used in conjunction with the swap function above
  runAnagram = () => {
    let word = this.state.inputVal;
    let counter = [],
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

    //in order to create a list, I first had to filter out non-unique values
    let anagramsUnique = anagrams.filter((item, index) => {
      return anagrams.indexOf(item) >= index;
    });

    //then, using the sort method, I made two separate separate arrays based off of the [1] index
    //both of these were sorted, but the array that starts with the second letter is ordered first
    //this way, the anagrams are alphabetical order, but starting with the second letter of the original word
    let bySecondLetter = [];
    let notBySecondLetter = [];
    for (let i = 0; i < anagramsUnique.length; i++) {
      if (anagramsUnique[i][0] >= anagramsUnique[0][1]) {
        bySecondLetter.push(anagramsUnique[i]);
      } else {
        notBySecondLetter.push(anagramsUnique[i]);
      }
      notBySecondLetter.sort();
      bySecondLetter.sort();
    }
    let sortedAnagrams = [...bySecondLetter, ...notBySecondLetter]
        //finally, i mapped each value to it's own list item
    .map(
      (word, i) => (
        <li className="list-group-item" key={i}>
          {word}
        </li>
      )
    );

    const anagramLength = sortedAnagrams.length;

    this.setState({
      display: `Total Anagrams: ${anagramLength}`,
      sortedAnagrams
    });
  };

  //this handleClick function will look at the current word in the state (input field) and then run compare it to the other words in the dictionary. the anagram check will go here.
  handleClick = e => {
    let existsInArray = this.state.words.includes(this.state.inputVal);
    if (existsInArray === true) {
      this.runAnagram();
    } else {
      //the following sets the field of retrieved anagrams back to blanks
      //it only runs if a word is not found in the dictionary
      this.setState({
        display: 'None: Does Not Exist in Dictionary',
        sortedAnagrams: ''
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
        <button className="btn btn-primary" onClick={this.handleClick}>
          Press for Anagrams
        </button>
        <h3>{this.state.inputVal}</h3>
        <h4>{this.state.display}</h4>
        {/* the List component below will hold the anagrams created as props */}
        <List sortedAnagrams={this.state.sortedAnagrams} />
      </div>
    );
  }
}

export default App;
