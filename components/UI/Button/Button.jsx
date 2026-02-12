'use client';

import Link from 'next/link';
import './button.css';

const Button = ({
  variant = 'primary',
  size = 'md',
  rounded = 'full',
  showArrow = true,
  arrowPosition = 'right',
  children,
  className = '',
  disabled = false,
  href = null,
  onClick,
  ...props
}) => {
  const baseClasses = 'arrow-btn';
  const variantClasses = `arrow-btn-${variant}`;
  const sizeClasses = `arrow-btn-${size}`;
  const roundedClasses = `arrow-btn-rounded-${rounded}`;
  const disabledClass = disabled ? 'arrow-btn-disabled' : '';

  const combinedClassName = `${baseClasses} ${variantClasses} ${sizeClasses} ${roundedClasses} ${disabledClass} ${className}`;

  const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 74 74" className="arrow-btn-icon">
      <circle strokeWidth="3" stroke="currentColor" r="35.5" cy="37" cx="37"></circle>
      <path
        fill="currentColor"
        d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
      ></path>
    </svg>
  );

  const LeftArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 74 74" className="arrow-btn-icon arrow-btn-icon-left">
      <circle strokeWidth="3" stroke="currentColor" r="35.5" cy="37" cx="37"></circle>
      <path
        fill="currentColor"
        d="M49 38.5C49.8284 38.5 50.5 37.8284 50.5 37C50.5 36.1716 49.8284 35.5 49 35.5V38.5ZM24.9393 35.9393C24.3536 36.5251 24.3536 37.4749 24.9393 38.0607L34.4853 47.6066C35.0711 48.1924 36.0208 48.1924 36.6066 47.6066C37.1924 47.0208 37.1924 46.0711 36.6066 45.4853L28.1213 37L36.6066 28.5147C37.1924 27.9289 37.1924 26.9792 36.6066 26.3934C36.0208 25.8076 35.0711 25.8076 34.4853 26.3934L24.9393 35.9393ZM49 35.5L26 35.5V38.5L49 38.5V35.5Z"
      ></path>
    </svg>
  );

  const Content = (
    <>
      {showArrow && arrowPosition === 'left' && <LeftArrowIcon />}
      <span className="arrow-btn-text">{children}</span>
      {showArrow && arrowPosition === 'right' && <ArrowIcon />}
    </>
  );

  // 🔥 PRIORITY RULE:
  // If onClick exists → render button ONLY
  if (onClick) {
    return (
      <button
        className={combinedClassName}
        disabled={disabled}
        onClick={disabled ? undefined : onClick}
        {...props}
      >
        {Content}
      </button>
    );
  }

  // 🔥 If only href exists → render Next Link
  if (href) {
    return (
      <Link href={disabled ? '#' : href} className={combinedClassName} {...props}>
        {Content}
      </Link>
    );
  }

  // 🔥 Default fallback
  return (
    <button
      className={combinedClassName}
      disabled={disabled}
      {...props}
    >
      {Content}
    </button>
  );
};

export default Button;
