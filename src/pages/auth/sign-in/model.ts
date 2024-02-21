import { attach, createEffect, createEvent, createStore, sample } from "effector";

export type SignError = "InvalidEmail" | "UnknownError";

const sendEmail = (email: string) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log("fetching", email);
      resolve(email);
    }, 1000),
  );
};

export const fetchSendEmailFx = createEffect("sendEmail", { handler: async (email: string) => await sendEmail(email) });
const signInFx = attach({ effect: fetchSendEmailFx });

export const formSubmitted = createEvent();
export const emailChanged = createEvent<string>();
export const backToLoginPressed = createEvent();

export const $email = createStore("");
export const $error = createStore<SignError | null>(null);
export const $pending = createStore(false);
export const $finished = createStore(false);

const $isEmailValid = $email.map((email) => email.length > 5 && email.includes("@") && email.includes("."));

$email.on(emailChanged, (_, email) => email);

//Login
sample({
  clock: formSubmitted,
  source: $email,
  filter: $isEmailValid, //Шуточная валидация
  target: [signInFx, $error.reinit],
});

$pending.on(signInFx.pending, () => true);
$finished.on(signInFx.done, () => true);
//Login finished

sample({ clock: backToLoginPressed, target: [$finished.reinit, $email.reinit, $error.reinit] });
sample({ clock: signInFx.finally, fn: () => false, target: $pending });

//Invalid Email
sample({
  clock: formSubmitted,
  source: $email,
  filter: $isEmailValid.map((valid) => !valid),
  fn: (): SignError => "InvalidEmail",
  target: $error,
});

// Login error
$error.on(signInFx.failData, () => "UnknownError");
