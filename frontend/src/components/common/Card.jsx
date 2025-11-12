import { clsx } from 'clsx';

const Card = ({ children, className, title, subtitle, ...props }) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-lg shadow-md overflow-hidden',
        className
      )}
      {...props}
    >
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
          )}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default Card;
