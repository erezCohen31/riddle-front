import { useState, type FormEvent } from "react";

export default function DeleteRiddlePage() {
  const [id, setID] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setID(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitted riddle ID:", id);
  };

  return (
    <>
      <div>DeleteRiddlePage</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="riddleid">Enter id of the riddle:</label>
          <input
            id="riddleid"
            name="riddleid"
            type="text"
            value={id}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
