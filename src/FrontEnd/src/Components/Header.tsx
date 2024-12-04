//declare the props that will be passed into header
interface HeaderProps {
  header: string;
  subHeader: string;
}

//render a header with options for main and subheader
function Header({ header, subHeader }: HeaderProps) {
  return (
    <>
      <h1>{header}</h1>
      <p>{subHeader}</p>
    </>
  );
}

export default Header;
