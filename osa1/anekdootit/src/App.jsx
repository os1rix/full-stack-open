import React, { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
  ];
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [selectedAnecdote, setselectedAnecdote] = useState(0);

  console.log(votes);

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selectedAnecdote]}</div>
      <div>has {votes[selectedAnecdote]} votes</div>

      <button
        onClick={() =>
          setselectedAnecdote(Math.floor(Math.random() * anecdotes.length))
        }
      >
        Next Anecdote
      </button>
      <button
        onClick={() => {
          const newVotes = [...votes];
          newVotes[selectedAnecdote] += 1;
          setVotes(newVotes);
        }}
      >
        Vote
      </button>
      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[votes.indexOf(Math.max(...votes))]}</div>
    </>
  );
};

export default App;
