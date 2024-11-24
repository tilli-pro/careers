import BasePage from "~/components/structure/base-page";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <BasePage>{children}</BasePage>;
};

export default Layout;
