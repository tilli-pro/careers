import { env } from "~/env";

interface ToEmail {
  email: string;
  name: string;
}

interface MergeTag {
  tagName: string;
  tagValue: string;
}

export const sendNudgeEmail = async (
  email: ToEmail,
  nudgeId: string | number,
  mergeTags?: MergeTag[] | Record<string, string>,
) => {
  mergeTags = mergeTags ?? [];
  mergeTags = Array.isArray(mergeTags)
    ? mergeTags
    : Object.entries(mergeTags).map(([tagName, tagValue]) => ({
        tagName,
        tagValue,
      }));

  const result = await fetch("https://app.nudge.net/api/v2/Nudge/Send", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: env.NUDGE_API_KEY,
    },
    body: JSON.stringify({
      nudgeId: nudgeId,
      toEmailAddress: email.email,
      toName: email.name,
      mergeTags,
      channel: 0,
    }),
  });

  if (result.status >= 200 && result.status <= 399) {
    return true;
  }

  try {
    const text = await result.text();
    console.log(result.status, text);
  } catch (e) {
    console.log(e);
  }

  return false;
};
