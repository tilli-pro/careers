import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="h-12 w-full bg-primary/[1.5%] md:h-16">
      <div className="mx-auto flex h-full w-full max-w-screen-lg items-center px-4">
        <div className="font-serif text-xs md:text-sm">
          © {new Date().getFullYear()} <span className="font-bold">tilli</span>
          . All Rights Reserved.
        </div>
        <div className="ml-auto flex items-center justify-end gap-8 text-xs font-bold md:gap-4 md:text-sm">
          <Link
            className="hover:underline"
            target="_blank"
            href="https://tilli.pro/industries/terms-and-conditions"
          >
            T&C
          </Link>
          <Link
            className="hover:underline"
            target="_blank"
            href="https://tilli.pro/privacy-policy"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
