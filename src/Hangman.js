import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import dead from "./dead.gif";
import { randomWord } from "./words";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = {
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
      lose: false,
    };

    this.restart = this.restart.bind(this);
    this.handleGuess = this.handleGuess.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map((ltr) => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr, idx) => (
      <button
        key={idx}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  restart() {
    this.setState(() => ({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
      lose: false,
    }));
  }

  /** render: render game */
  render() {
    const { nWrong, answer } = this.state;
    const lose = nWrong < this.props.maxWrong ? false : true;

    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <div className={lose ? "Hangman-hidden" : ""}>
          <img
            src={this.props.images[nWrong]}
            alt={`${nWrong}/${this.props.maxWrong} guesses`}
          />
          <h2>Wrong guesses: {nWrong}</h2>
          <p className="Hangman-word">{this.guessedWord()}</p>
          <p className="Hangman-btns">{this.generateButtons()}</p>
        </div>
        <div className={lose ? "" : "Hangman-hidden"}>
          <img src={dead} alt="You lose" />
          <h2>The correct word was: {answer}</h2>
        </div>
        <button className="Hangman-restart-btn" onClick={this.restart}>
          Restart Game
        </button>
      </div>
    );
  }
}

export default Hangman;
