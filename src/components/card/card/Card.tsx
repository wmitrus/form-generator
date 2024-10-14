import { PropsWithChildren, ReactElement } from 'react';
import { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

type CardProps = { variant: string } & ComponentPropsWithoutRef<'div'>;

const Card = ({
  children,
  variant,
  className,
  ...rest
}: PropsWithChildren<CardProps>): ReactElement => {
  const bgColor = (function () {
    switch (variant) {
      case 'primary':
        return '#3B71CA';
      case 'secondary':
        return '#9FA6B2';
      case 'success':
        return '#14A44D';
      case 'danger':
        return '#DC4C64';
      case 'warning':
        return '#E4A11B';
      case 'info':
        return '#54B4D3';
      case 'light':
        return '#F9FAFB';
      case 'dark':
        return '#1F2937';
      default:
        break;
    }
  })();

  return (
    <div className={cn(['flex justify-center', className])} {...rest}>
      <div
        style={{ backgroundColor: bgColor }}
        className="shadow-secondary-1 block max-w-[18rem] rounded-lg bg-slate-500 text-white"
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
