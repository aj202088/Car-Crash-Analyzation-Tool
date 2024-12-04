//declares props to be used in InputBox function
interface InputBoxProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

//render an input box with options for the value and handling for onChange
function InputBox({ value, onChange }: InputBoxProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="e.g. 1999"
    />
  );
}

export default InputBox;
