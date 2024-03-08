import { db } from "./db.server";
import { getUser } from "./session.server";

export async function createFeedbackForm(name, request) {
  let user = await getUser(request);

  if (!user) return null;

  return await db.feedbackForm.create({
    data: { name: name, userId: user.id },
  });
}

export async function addFeedback(formId, text, emoji) {
  const feedbackForm = await db.feedbackForm.findFirst({
    where: { id: formId },
  });
  await db.feedback.create({
    data: {
      text: text,
      emojiCode: emoji,
      feedbackFormId: feedbackForm.id,
    },
  });
}

export async function getAllFeedbackForms(request) {
  const forms = await db.feedbackForm.findMany({
    where: {
      userId: (await getUser(request)).id,
    },
    include: { feedbacks: true },
  });

  if (!forms) return null;
  return forms;
}

export async function getAllFeedbacks(formName, request) {
  const userId = (await getUser(request)).id;
  const form = await db.feedbackForm.findFirst({
    where: { name: formName, userId: userId },
  });
  const feedbacks = await db.feedback.findMany({
    where: {
      feedbackFormId: form.id,
    },
  });
  if (!feedbacks) null;
  return feedbacks;
}

export async function deleteFeedbackForm(formId, request) {
  const userId = (await getUser(request)).id;
  const form = await db.feedbackForm.delete({
    where: { id: formId, userId: userId },
  });

  if (!form) {
    console.log("cannot");
  }

  console.log("deleted form", form);
  return form;
}
