	import React from 'react';
	import clsx from 'clsx';
	
	const Button = ({ children, variant = 'primary', size = 'md', className, ...props }) => {
	  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
	  const variantClasses = {
	    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 dark:focus:ring-offset-secondary-900',
	    secondary: 'bg-secondary-200 text-secondary-700 hover:bg-secondary-300 focus:ring-secondary-500 dark:bg-secondary-700 dark:text-secondary-200 dark:hover:bg-secondary-600',
	    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
	  };
	  const sizeClasses = {
	    sm: 'px-3 py-1.5 text-sm',
	    md: 'px-4 py-2 text-base',
	    lg: 'px-6 py-3 text-lg',
	  };
	  const classes = clsx(baseClasses, variantClasses[variant], sizeClasses[size], className);
	  return (
	    <button className={classes} {...props}>
	      {children}
	    </button>
	  );
	};
	export default Button;