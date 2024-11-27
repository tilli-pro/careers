"use client";

import { Combobox } from "~/components/ui/combobox";

import { useJobPostListData } from "./job-posting-list-context";

interface JobPostingFilterProps {
  filter: "location" | "department";
}
const JobPostingFilter: React.FC<JobPostingFilterProps> = ({ filter }) => {
  const { filters, onFilterChange } = useJobPostListData();

  const filterData = filters[filter];

  return (
    <Combobox
      values={filterData.values}
      placeholder={filterData.placeholder}
      onSelect={(value) => onFilterChange(filter, value)}
      defaultValue={filterData.value}
    />
  );
};

export default JobPostingFilter;
