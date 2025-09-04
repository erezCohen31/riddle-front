import type InputFieldProps from "../interface/InputFieldProps.ts";

export default function InputField({
  value,
  fieldToEdit,
  setFieldToEdit,
}: InputFieldProps) {
  return (
    <div>
      <label>
        <input
          type="radio"
          name="field"
          value={value}
          checked={fieldToEdit === value}
          onChange={(e) => setFieldToEdit(e.target.value)}
        />
        {value}
      </label>
    </div>
  );
}
