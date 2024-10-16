import { PropsWithChildren, ReactElement } from 'react';
import { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

type CardProps = { variant?: string } & ComponentPropsWithoutRef<'div'>;

const Card = ({
  children,
  variant,
  className,
  ...rest
}: PropsWithChildren<CardProps>): ReactElement => {
  const bgClass = (function () {
    switch (variant) {
      case 'primary':
        return 'bg-primary';
      case 'secondary':
        return 'bg-secondary';
      case 'success':
        return 'bg-success';
      case 'danger':
        return 'bg-danger';
      case 'warning':
        return 'bg-warning';
      case 'info':
        return 'bg-info';
      case 'light':
        return 'bg-light';
      case 'dark':
        return 'bg-dark';
      default:
        return 'bg-light';
    }
  })();

  const color = variant === 'light' || variant === '' ? 'text-gray-700' : 'text-white';

  return (
    <div className={cn(['flex justify-center', className])} {...rest}>
      <div
        role="card"
        id="card"
        className={`${bgClass} shadow-secondary-1 block max-w-[18rem] rounded-lg ${color}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
