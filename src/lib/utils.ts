import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}.${P}`
    : never
  : never;

type Prev = [never, 0, 1, 2, 3, 4, 5];

type JSONPath<T, D extends Prev[number] = 5> = [D] extends [never]
  ? never
  : T extends object
    ? {
        [K in keyof T & (string | number)]:
          | `${K}` // Include the current key as a path
          | (T[K] extends object // Recurse only if the value is an object
              ? Join<K, JSONPath<T[K], Prev[D]>>
              : never);
      }[keyof T & (string | number)]
    : never;

type NestedObjects<T> = T extends object
  ? T | { [K in keyof T]: NestedObjects<T[K]> }[keyof T]
  : never;

export const isJsonPath = <T extends object>(
  maybePath: string,
  object: T,
): boolean => {
  // TODO: checking for the path existing in the object should happen during
  return maybePath.split(".").length > 0 && !(maybePath in (object ?? {}));
};

export const walkTree = <T extends object>(
  path: JSONPath<T>,
  object: T,
): unknown => {
  const split = (path as string).split(".");
  const resolved: NestedObjects<T> = (object ?? {})[
    split.shift() as keyof T
  ] as NestedObjects<T>;

  if (split.length) {
    return walkTree(split.join(".") as JSONPath<typeof resolved>, resolved);
  } else {
    return resolved;
  }
};

const convertGroupKeyToDef = <T extends object>(
  groupKey: JSONPath<T> | Array<JSONPath<T>>,
  baseValue: T,
) =>
  (Array.isArray(groupKey) ? groupKey : [groupKey]).map((key) => ({
    key,
    isJsonPath: isJsonPath(key, baseValue),
  }));

export function groupBy<T extends object>(
  values: T[],
  groupKey: JSONPath<T> | Array<JSONPath<T>>,
  keyDelimiter = ";;;",
): Record<string, T[]> {
  const groupDefinition = convertGroupKeyToDef<T>(groupKey, values[0]!);
  const aggregate: Record<string, T[]> = {};

  return values.reduce((acc, curr) => {
    const values = groupDefinition.map(({ key, isJsonPath }) =>
      isJsonPath ? walkTree<T>(key as JSONPath<T>, curr) : curr[key as keyof T],
    );
    const key = values.join(keyDelimiter);
    if (!acc[key]) {
      acc[key] = [curr];
    } else {
      acc[key].push(curr);
    }
    return acc;
  }, aggregate);
}

// more efficiently manage grouping based on multiple disparate criteria
export function multiGroupBy<T extends object, U extends string>(
  values: T[],
  groupKeys: Record<U, JSONPath<T> | Array<JSONPath<T>>>,
  keyDelimiter = ";;;",
): Record<U, Record<string, T[]>> {
  const groupDefinition = Object.fromEntries(
    Object.entries(groupKeys).map(([group, key]) => [
      group as U,
      convertGroupKeyToDef<T>(
        key as JSONPath<T> | Array<JSONPath<T>>,
        values[0]!,
      ),
    ]),
  ) as Record<U, Array<{ key: JSONPath<T>; isJsonPath: boolean }>>;

  const aggregate = Object.fromEntries(
    Object.keys(groupDefinition).map((group) => [group, {}]),
  ) as Record<U, Record<string, T[]>>;

  return values.reduce((acc, curr) => {
    for (const [group, record] of Object.entries(acc) as [
      U,
      Record<string, T[]>,
    ][]) {
      const keys = groupDefinition[group as keyof typeof groupDefinition];
      const value = keys
        .map(({ key, isJsonPath }) => {
          return isJsonPath ? walkTree<T>(key, curr) : curr[key as keyof T];
        })
        .join(keyDelimiter);
      if (!record[value]) {
        record[value] = [curr];
      } else {
        record[value].push(curr);
      }
    }
    return acc;
  }, aggregate);
}

export const queryParam = (key: string, value: string) => {
  return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
};

export const queryParams = (params: [string, string][]) => {
  return params.map(([key, value]) => queryParam(key, value)).join("&");
};

export const fmtCurrency = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
  currencyDisplay: "symbol",
  compactDisplay: "long",
  notation: "compact",
}).format;
