import { clsx } from 'clsx';

const Input = ({
  label,
  error,
  type = 'text',
  className,
  containerClassName,
  required,
  ...props
}) => {
  return (
    <div className={clsx('w-full', containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        className={clsx(
          'w-full px-4 py-2 border rounded-lg transition-all focus:outline-none focus:ring-2',
          error
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 focus:ring-blue-500 focus:border-transparent',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;
