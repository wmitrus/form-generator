import { PropsWithChildren, ReactElement } from 'react';
import { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

type CardBodyProps = { title?: string } & ComponentPropsWithoutRef<'div'>;

const CardBody = ({
  children,
  className,
  title,
  ...rest
}: PropsWithChildren<CardBodyProps>): ReactElement => {
  return (
    <div role="card-body" id="cardBody" className={cn(['p-6', className])} {...rest}>
      <h5 className="mb-2 text-xl font-medium leading-tight">{title}</h5>
      <p className="text-base">{children}</p>
    </div>
  );
};

export default CardBody;
