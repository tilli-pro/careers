import { env } from "~/env";

interface ToEmail {
  email: string;
  name?: string;
}

interface MergeTag {
  tagName: string;
  tagValue: string;
}

export const sendNudgeEmail = async (
  email: ToEmail,
  nudgeId: string | number,
  mergeTags?: MergeTag[] | Record<string, string>,
  attachments?: File[],
  opts?: { emailCc?: string; emailBcc?: string },
) => {
  mergeTags = mergeTags ?? [];
  mergeTags = Array.isArray(mergeTags)
    ? mergeTags
    : Object.entries(mergeTags).map(([tagName, tagValue]) => ({
        tagName,
        tagValue,
      }));

  const emailAttachments = [];
  if (attachments?.length) {
    for (const attachment of attachments) {
      emailAttachments.push({
        content: Buffer.from(await attachment.arrayBuffer()).toString("base64"),
        mimeType: attachment.type,
        fileName: attachment.name,
      });
    }
  }

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
      emailCc: opts?.emailCc,
      emailBcc: opts?.emailBcc,
      emailAttachments,
    }),
  });

  if (result.status >= 200 && result.status <= 399) {
    try {
      const success = await result.json();
      console.log(result.status, success);
    } catch (e) {
      console.log(e);
    }
    return true;
  }

  try {
    const failure = await result.json();
    console.log(result.status, failure);
  } catch (e) {
    console.log(e);
  }

  return false;
};
