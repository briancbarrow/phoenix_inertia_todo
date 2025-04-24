import React, { useState, useEffect } from "react";

const FLASH_STYLES = {
  info: {
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    ring: "ring-emerald-500",
    fill: "fill-cyan-900",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  error: {
    bg: "bg-rose-50",
    text: "text-rose-900",
    ring: "ring-rose-500",
    fill: "fill-rose-900",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  warning: {
    bg: "bg-amber-50",
    text: "text-amber-800",
    ring: "ring-amber-500",
    fill: "fill-amber-900",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
};

export default function Flash({
  type = "info",
  title,
  message,
  show = false,
  onClose,
  autoHideDuration = 5000, // Auto-hide after 5 seconds by default
  id = `flash-${type}`,
}) {
  const [isVisible, setIsVisible] = useState(show);

  // Show or hide the flash message based on prop changes
  useEffect(() => {
    setIsVisible(show);

    let timeoutId;
    if (show && autoHideDuration) {
      timeoutId = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, autoHideDuration);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [show, autoHideDuration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  // Get the appropriate styles for this flash type
  const style = FLASH_STYLES[type] || FLASH_STYLES.info;

  return (
    <div
      id={id}
      role="alert"
      className={`
        fixed top-2 right-2 mr-2 w-80 sm:w-96 z-50 rounded-lg p-3 ring-1 
        ${style.bg} ${style.text} shadow-md ${style.ring} ${style.fill}
        ${!isVisible ? "hidden" : ""}
        transition-all transform ease-in duration-200
      `}
    >
      {title && (
        <p className="flex items-center gap-1.5 text-sm font-semibold leading-6">
          {style.icon}
          {title}
        </p>
      )}

      {message && <p className="mt-2 text-sm leading-5">{message}</p>}

      <button
        type="button"
        className="group absolute top-1 right-1 p-2"
        aria-label="close"
        onClick={handleClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 opacity-40 group-hover:opacity-70"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
