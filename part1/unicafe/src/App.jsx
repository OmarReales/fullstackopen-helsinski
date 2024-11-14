import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Statistics = ({ text, value }) => {
  return (
    <tr>
      <td>
        {text}
        {":"} {value}
      </td>
    </tr>
  );
};

const StatisticsContainer = ({ feedback }) => {
  const all = feedback.good + feedback.neutral + feedback.bad;
  const average = (feedback.good - feedback.bad) / all;
  const positive = (feedback.good / all) * 100;

  if (all === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <>
      <table>
        <tbody>
          <Statistics text="good" value={feedback.good} />
          <Statistics text="neutral" value={feedback.neutral} />
          <Statistics text="bad" value={feedback.bad} />
          <Statistics text="all" value={all} />
          <Statistics text="average" value={average} />
          <Statistics text="positive" value={positive} />
        </tbody>
      </table>
    </>
  );
};

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const handleGoodClick = () => {
    setFeedback({ ...feedback, good: feedback.good + 1 });
  };

  const handleNeutralClick = () => {
    setFeedback({ ...feedback, neutral: feedback.neutral + 1 });
  };

  const handleBadClick = () => {
    setFeedback({ ...feedback, bad: feedback.bad + 1 });
  };

  return (
    <div>
      <Header text="Give feedback" />
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <Header text="Statistics" />
      <StatisticsContainer feedback={feedback} />
    </div>
  );
};

export default App;
