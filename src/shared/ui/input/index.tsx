import cn from "classnames";
import type { ChangeEvent, InputHTMLAttributes } from "react";

import styles from "./styles.module.css";

export type IntputType = "text" | "email" | "search";
export type InputSize = "s" | "m";

export interface Props<T extends string> extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  onValue: ({ value, name }: { value: string; name: T }) => void;
  name: T;
  value: string;
  label?: string;
  type?: IntputType;
  hint?: string;
  inputSize?: InputSize;
  hasError?: boolean;
  error?: string | null;
}

export const Input = <T extends string>({
  className,
  onValue,
  name,
  value,
  label,
  hint,
  type = "text",
  inputSize = "s",
  hasError = false,
  error,
  ...props
}: Props<T>) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget;
    onValue({ value, name: name as T });
  };

  return label ? (
    <label className={cn(styles.labelOnly, className)}>
      <span className={styles.label}>{label}</span>
      <input
        type={type}
        name={name}
        className={cn(styles.root, styles[`inputSize-${inputSize}`], {
          [styles.hasError]: hasError,
        })}
        value={value}
        onChange={handleChange}
        {...props}
      />
      {hasError ? <span className={styles.error}>{error}</span> : hint && <span className={styles.hint}>{hint}</span>}
    </label>
  ) : (
    <>
      <input
        type={type}
        name={name}
        className={cn(
          styles.root,
          styles[`inputSize-${inputSize}`],
          {
            [styles.hasError]: hasError,
          },
          className,
        )}
        value={value}
        onChange={handleChange}
        {...props}
      />
      {hasError ? <span className={styles.error}>{error}</span> : hint && <span className={styles.hint}>{hint}</span>}
    </>
  );
};
