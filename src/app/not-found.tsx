import BasePage from "~/components/structure/base-page";

const NotFound: React.FC = () => {
  return (
    <BasePage className="items-center justify-center">
      <div className="relative flex min-h-80 min-w-96 items-center justify-center">
        <h1>Not Found</h1>
        <div className="absolute left-0 top-0 z-0 flex h-full w-full select-none items-center justify-center text-[144px] font-bold opacity-5">
          404
        </div>
      </div>
    </BasePage>
  );
};

export default NotFound;
