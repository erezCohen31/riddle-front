import { useState } from "react";

const riddles = [
  {
    _id: "6878c3580f3555c45d6a5b24",
    id: 1,
    name: "Easy Math",
    taskDescription: "What is 5 + 3?",
    correctAnswer: "8",
    choices: ["7", "8", "9", "6"],
  },
  {
    _id: "7a12c4580f3555c45d6a5c90",
    id: 2,
    name: "General Knowledge",
    taskDescription: "What is the capital of France?",
    correctAnswer: "Paris",
    choices: ["Rome", "Madrid", "Paris", "Berlin"],
  },
  {
    _id: "8b93d1580f3555c45d6a5d31",
    id: 3,
    name: "Science",
    taskDescription: "Which planet is known as the Red Planet?",
    correctAnswer: "Mars",
    choices: ["Venus", "Mars", "Jupiter", "Saturn"],
  },
  {
    _id: "9c04e2580f3555c45d6a5d92",
    id: 4,
    name: "History",
    taskDescription: "Who was the first president of the United States?",
    correctAnswer: "George Washington",
    choices: [
      "Abraham Lincoln",
      "George Washington",
      "Thomas Jefferson",
      "John Adams",
    ],
  },
  {
    _id: "af15f3580f3555c45d6a5e12",
    id: 5,
    name: "Logic",
    taskDescription:
      "If all bloops are razzies and all razzies are lazzies, are all bloops definitely lazzies?",
    correctAnswer: "Yes",
    choices: ["Yes", "No", "Maybe", "Not enough information"],
  },
];

export default function PlayPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [correct, setCorrect] = useState(true);

  const handleAnswer = (choice: string) => {
    const currentRiddle = riddles[currentIndex];

    if (choice !== currentRiddle.correctAnswer) {
      setCorrect(false);
    } else {
      setCorrect(true);

      if (currentIndex === riddles.length - 1) {
        setFinished(true);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }
  };

  if (finished) {
    return (
      <div>
        <h2>Finished</h2>
        <p></p>
      </div>
    );
  }

  const riddle = riddles[currentIndex];

  return (
    <div>
      <h2>Question {currentIndex + 1}</h2>
      <p>{riddle.taskDescription}</p>
      <div>
        {riddle.choices.map((choice) => (
          <button key={choice} onClick={() => handleAnswer(choice)}>
            {choice}
          </button>
        ))}
      </div>
      {correct === false && <p>Wrong answer </p>}
    </div>
  );
}
