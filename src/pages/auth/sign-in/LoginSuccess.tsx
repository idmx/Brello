import { useUnit } from "effector-react";

import { Button } from "@/shared/ui";

import { $email, backToLoginPressed } from "./model";

import styles from "./styles.module.css";

export const LoginSuccess = () => {
  const [email] = useUnit([$email]);
  const [handleBackClick] = useUnit([backToLoginPressed]);

  return (
    <>
      <h1 className={styles.headline}>Check your email</h1>
      <p className={styles.description}>We sent a login link to {email}</p>
      <Button size="s" view="link-gray" onClick={handleBackClick} className={styles.backButton}>
        {"<-- Back to log in"}
      </Button>
    </>
  );
};
