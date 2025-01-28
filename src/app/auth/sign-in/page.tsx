import Form from "next/form";

import { Construction } from "lucide-react";
import { getCsrfToken } from "next-auth/react";

import BasePage from "~/components/structure/base-page";

const Page: React.FC = async () => {
  const csrfToken = await getCsrfToken().catch(() => "EMPTY_CSRF");

  return (
    <BasePage>
      <div className="flex h-[calc(100vh-180px)] w-full items-center justify-center p-12">
        <Construction />
      </div>
      <Form action="/api/auth/signin/email">
        <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
      </Form>
    </BasePage>
  );
};

export default Page;
