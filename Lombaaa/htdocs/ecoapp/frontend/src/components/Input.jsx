	import React from 'react';
	import clsx from 'clsx';
	
	const Input = ({ label, error, className, ...props }) => {
	  return (
	    <div className="w-full">
	      {label && (
	        <label htmlFor={props.id} className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
	          {label}
	        </label>
	      )}
	      <input
	        className={clsx(
	          'block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-secondary-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-secondary-700 dark:border-secondary-600 dark:text-white dark:placeholder-secondary-500',
	          error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
	          className
	        )}
	        {...props}
	      />
	      {error && (
	        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
	          {error}
	        </p>
	      )}
	    </div>
	  );
	};
	export default Input;