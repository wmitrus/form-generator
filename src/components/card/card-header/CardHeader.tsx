import { PropsWithChildren, ReactElement } from 'react';
import { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

type CardHeaderProps = {} & ComponentPropsWithoutRef<'div'>;

const CardHeader = ({
  children,
  className,
  ...rest
}: PropsWithChildren<CardHeaderProps>): ReactElement => {
  return (
    <div
      role="card-header"
      id="cardHeader"
      className={cn(['border-b-2 border-black/20 px-6 py-3', className])}
      {...rest}
    >
      {children}
    </div>
  );
};

export default CardHeader;
