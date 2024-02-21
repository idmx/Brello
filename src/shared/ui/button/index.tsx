import { forwardRef } from "react";
import cn from "classnames";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import styles from "./styles.module.css";

export type ButtonSize = "s" | "m" | "l" | "xl" | "2xl";
export type ButtonView = "primary" | "secondary-gray" | "link-gray" | "link-color";

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
  size?: ButtonSize;
  view?: ButtonView;
  disabled?: boolean;
  loading?: boolean;
}

export type Ref = HTMLButtonElement;

export const Button = forwardRef<Ref, Props>(
  ({ className, size = "l", view = "primary", onClick, children, disabled, loading, ...rest }, ref) => {
    const classList = cn(styles.root, styles[`size-${size}`], styles[`view-${view}`], className);

    return (
      <button ref={ref} className={classList} onClick={onClick} {...rest} disabled={loading ?? disabled}>
        {loading ? "Loading..." : children}
      </button>
    );
  },
);
