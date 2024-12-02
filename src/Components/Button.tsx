interface ButtonProps {
  buttonName: string;
  onClick: () => void;
  buttonType?: "primary" | "success" | "danger";
}

function Button({ buttonName, onClick, buttonType = "primary" }: ButtonProps) {
  return (
    <button onClick={onClick} className={`btn btn-${buttonType}`}>
      {buttonName}
    </button>
  );
}

export default Button;
