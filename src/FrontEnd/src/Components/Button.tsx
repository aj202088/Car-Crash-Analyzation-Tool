//declare the props to be passed into the button function
interface ButtonProps {
  buttonName: string;
  onClick: () => void;
  buttonType?: "primary" | "success" | "danger";
}

//render the button with options for onclick as well as the name and the type of bootstrap button to be used
function Button({ buttonName, onClick, buttonType = "primary" }: ButtonProps) {
  return (
    <button onClick={onClick} className={`btn btn-${buttonType}`}>
      {buttonName}
    </button>
  );
}

export default Button;
