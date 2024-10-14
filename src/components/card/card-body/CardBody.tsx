import { PropsWithChildren, ReactElement } from 'react';
import { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

type CardBodyProps = {} & ComponentPropsWithoutRef<'div'>;

const CardBody = ({
  children,
  className,
  ...rest
}: PropsWithChildren<CardBodyProps>): ReactElement => {
  return (
    <div className={cn(['p-6', className])} {...rest}>
      <h5 className="mb-2 text-xl font-medium leading-tight">Secondary card title</h5>
      <p className="text-base">{children}</p>
    </div>
  );
};

export default CardBody;
