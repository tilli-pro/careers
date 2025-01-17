import { Construction } from "lucide-react";

import BasePage from "~/components/structure/base-page";

const Page: React.FC = async () => {
  return (
    <BasePage>
      <div className="flex h-[calc(100vh-180px)] w-full items-center justify-center p-12">
        <Construction />
      </div>
    </BasePage>
  );
};

export default Page;
