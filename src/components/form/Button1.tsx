import * as React from 'react';
import { FC } from 'react';

export type ButtonSize = 'lg' | 'sm';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link';

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  href?: string;
}

const Button: FC<BaseButtonProps> = (props) => {
  const { btnType, className, disabled, size, children, href } = props;
  if (btnType === 'link' && href) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  } else {
    return <button>{children}</button>;
  }
};

export default Button;
