import React, { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button name="good" handleClickFunction={() => setGood(good + 1)} />
      <Button
        name="neutral"
        handleClickFunction={() => setNeutral(neutral + 1)}
      />
      <Button name="bad" handleClickFunction={() => setBad(bad + 1)} />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};
const Button = ({ name, handleClickFunction }) => (
  <button onClick={handleClickFunction}>{name}</button>
);

const Statistics = ({ good, bad, neutral }) => {
  const stats = [good, bad, neutral];
  const sum = stats[0] + stats[1] + stats[2];

  if (stats.every((a) => a === 0)) {
    return <div>No feedback given</div>;
  } else {
    return (
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{sum}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{(good - bad) / sum}</td>
          </tr>
          <tr>
            <td>positive&nbsp;</td>
            <td>{(good / sum) * 100 + "%"}</td>
          </tr>
        </tbody>
      </table>
    );
  }
};

export default App;
