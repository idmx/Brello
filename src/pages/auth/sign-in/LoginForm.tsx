import { useUnit } from "effector-react";

import { Button, Input } from "@/shared/ui";

import { $email, $error, $pending, emailChanged, formSubmitted, SignError } from "./model";

import styles from "./styles.module.css";

const errorText: { [key in SignError]: string } = {
  InvalidEmail: "Email должен быть корректным",
  UnknownError: "Неизвестная ошибка, попробуйте еще раз",
};

export const LoginForm = () => {
  const [handleEmailChange, handleFormSubmit] = useUnit([emailChanged, formSubmitted]);
  const [email, pending, error] = useUnit([$email, $pending, $error]);

  return (
    <>
      <p className={styles.description}>Start your 30-day free trial.</p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <Input
          className={styles.input}
          name="email"
          label="Email"
          placeholder="Enter your email"
          value={email}
          onValue={({ value }) => handleEmailChange(value)}
          error={error ? errorText[error] : ""}
          hasError={!!error}
        />
        <Button
          className={styles.button}
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleFormSubmit();
          }}
          loading={pending}
        >
          Get started
        </Button>
      </form>
    </>
  );
};
