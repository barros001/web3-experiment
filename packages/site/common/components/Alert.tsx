import { FC } from 'react';

type Props = {
  type: 'danger' | 'info' | 'success' | 'warning';
  className?: string;
};

const Alert: FC<Props> = ({ type, className, children }) => {
  return (
    <div
      className={`bg-alert-${type}-background border border-alert-${type}-border text-alert-${type}-text px-4 py-3 rounded relative ${className} mb-4 text-center`}
      role="alert"
    >
      {children}
    </div>
  );
};

export default Alert;
