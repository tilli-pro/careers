import { api } from "~/trpc/server";

import JobPostingListItem from "./job-posting-list-item.server";

const JobPostingList: React.FC<{
  input?: Parameters<typeof api.post.all>[0];
}> = async ({ input }) => {
  const openRoles = await api.post.all(input);

  return (
    <div className="my-4 flex h-full w-full flex-col gap-4">
      {openRoles.map((role) => (
        <JobPostingListItem key={role.id} {...role} />
      ))}
    </div>
  );
};

export default JobPostingList;
