import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary' | 'secondary' | 'dark' | 'outline-dark' | 'link'
  size = 'md',
  className = '',
  disabled = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-orange-600 hover:bg-orange-500 text-white shadow-sm hover:shadow-md focus:ring-orange-500',
    secondary: 'bg-transparent border border-white text-white hover:bg-white/10 focus:ring-white',
    dark: 'bg-zinc-950 hover:bg-zinc-800 text-white shadow-sm focus:ring-zinc-950',
    'outline-dark': 'bg-white border border-zinc-300 text-zinc-900 hover:border-zinc-900 hover:bg-zinc-50 focus:ring-zinc-400',
    link: 'text-zinc-900 hover:text-orange-600 p-0 font-medium transition-colors hover:translate-x-0.5',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5',
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${variant !== 'link' ? sizes[size] : ''} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedStyles} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedStyles} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={combinedStyles} {...props}>
      {children}
    </button>
  );
}
