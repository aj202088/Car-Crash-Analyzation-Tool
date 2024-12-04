interface HeaderProps {
  header: string;
  subHeader: string;
}
function Header({ header, subHeader }: HeaderProps) {
  return (
    <>
      <h1>{header}</h1>
      <p>{subHeader}</p>
    </>
  );
}

export default Header;
