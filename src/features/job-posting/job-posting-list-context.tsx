"use client";

import { createContext, useContext, useState } from "react";

import { api } from "~/trpc/react";

import { JobPostingSchema } from "./types";

interface IJobPostingLinkContext {
  posts: JobPostingSchema[];
  filters: Record<
    "department" | "location",
    {
      placeholder: string;
      value: string;
      values: Array<{
        value: string;
        label: string;
      }>;
    }
  >;
  onFilterChange: (filter: "department" | "location", value: string) => void;
}
const JobPostingLinkContext = createContext<IJobPostingLinkContext>({
  posts: [],
  filters: {
    department: {
      placeholder: "Department",
      value: "",
      values: [],
    },
    location: {
      placeholder: "Location",
      value: "",
      values: [],
    },
  },
  onFilterChange: () => {},
});

export const JobPostingListDataProvider: React.FC<
  React.PropsWithChildren<{
    initialValues?: {
      department?: {
        value?: string;
        values?: Array<{ value: string; label: string }>;
      };
      location?: {
        value?: string;
        values?: Array<{ value: string; label: string }>;
      };
      posts?: JobPostingSchema[];
    };
  }>
> = ({ initialValues, children }) => {
  const [filters, setFilters] = useState({
    department: {
      placeholder: "Department",
      value: initialValues?.department?.value ?? "",
      values: initialValues?.department?.values ?? [],
    },
    location: {
      placeholder: "Location",
      value: initialValues?.location?.value ?? "",
      values: initialValues?.location?.values ?? [],
    },
  });
  const { data } = api.post.all.useQuery();
  const posts = (data ?? initialValues?.posts ?? []).filter((post) => {
    return (
      (!filters.department.value ||
        post.department.slug === filters.department.value) &&
      (!filters.location.value || post.location.slug === filters.location.value)
    );
  });

  const onFilterChange = (filter: "department" | "location", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filter]: {
        ...prev[filter],
        value,
      },
    }));
  };

  console.log(filters);

  return (
    <JobPostingLinkContext.Provider value={{ filters, onFilterChange, posts }}>
      {children}
    </JobPostingLinkContext.Provider>
  );
};

export const useJobPostListData = () => useContext(JobPostingLinkContext);
