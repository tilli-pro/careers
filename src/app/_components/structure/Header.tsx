const navItems = [
  { display: "About Us", href: "/about" },
  { display: "Careers", href: "/careers" },
  { display: "", href: "" },
];

const Header: React.FC = () => {
  return (
    <header>
      <nav className="flex flex-row">
        <ul className="appearance-none children:appearance-none">
          {navItems.map((item) => (
            <li key={item.href}></li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
