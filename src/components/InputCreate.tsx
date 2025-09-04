import type InputCreateProps from "../interface/InputCreateProps.ts";

export default function InputCreate({
  name,
  value,
  onChange,
  placeholder = "",
}: InputCreateProps) {
  return (
    <div>
      <label htmlFor={name}></label>
      <input
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </div>
  );
}
