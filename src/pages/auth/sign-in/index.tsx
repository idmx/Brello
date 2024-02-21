import { useUnit } from "effector-react";

import { IconMail01 } from "@/shared/assets/icons";
import { ImageLogomark } from "@/shared/assets/images";
import { Logo } from "@/shared/ui";

import { LoginForm } from "./LoginForm";
import { LoginSuccess } from "./LoginSuccess";
import { $finished } from "./model";

import styles from "./styles.module.css";

export const SignInPage = () => {
  const [finished] = useUnit([$finished]);

  return (
    <>
      <main className={styles.root}>
        <div className={styles.content}>
          <header className={styles.header}>
            <Logo />
          </header>
          <section className={styles.form}>
            <img className={styles.logomark} src={ImageLogomark} alt="Brello logomark" />
            {finished ? (
              <LoginSuccess />
            ) : (
              <>
                <h1 className={styles.headline}>Sign in</h1>
                <LoginForm />
              </>
            )}
          </section>
          <footer className={styles.footer}>
            <p className={styles.info}>&copy; Brello 2023</p>
            <p className={styles.info}>
              <IconMail01 className={styles.mail} /> help@brello.io
            </p>
          </footer>
        </div>
        <div className={styles.geometric} />
      </main>
    </>
  );
};
