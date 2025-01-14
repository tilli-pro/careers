import BasePage from "~/components/structure/base-page";
import SpinningSphere from "~/components/ui/sphere";

const Page: React.FC = () => {
  return (
    <BasePage className="h-full">
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-20 py-16">
        <SpinningSphere size={600} />
        <h1 className="absolute rounded bg-background/20 p-2 backdrop-blur">
          Under Construction
        </h1>
      </div>
    </BasePage>
  );
};

export default Page;
