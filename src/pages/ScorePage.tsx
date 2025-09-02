const players = [
  { name: "Alice", score: 10 },
  { name: "Bob", score: 15 },
  { name: "Charlie", score: 7 },
  { name: "Diana", score: 20 },
  { name: "Erez", score: 12 },
];

export default function ScorePage() {
  return (
    <>
      <h2>Score Page</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
