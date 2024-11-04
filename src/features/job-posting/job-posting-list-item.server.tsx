import React from "react";

import { api } from "~/trpc/server";

type JobPostingSchema = Awaited<ReturnType<typeof api.post.all>>[number];

const JobPostingListItem: React.FC<JobPostingSchema> = ({
  title,
  description,
  department,
  location,
}) => {
  return (
    <section>
      <h2>{title}</h2>
      <p>{department.name}</p>
      <p>{location.location}</p>
    </section>
  );
};

export default JobPostingListItem;
