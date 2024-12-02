interface InputBoxProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

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
