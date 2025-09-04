export default interface InputFieldProps {
  value: string;
  fieldToEdit: string;
  setFieldToEdit: React.Dispatch<React.SetStateAction<string>>;
}
