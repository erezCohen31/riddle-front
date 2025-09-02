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
export default function ReadRiddlePage() {
  return (
    <>
      <div>ReadRiddlePage</div>

      {riddles.map((riddle) => (
        <div key={riddle._id}>
          <p>{riddle.name}</p>
          <p>{riddle.taskDescription}</p>
          <p>{riddle.correctAnswer}</p>
          <ul>
            {riddle.choices.map((choice) => (
              <li>{choice}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
