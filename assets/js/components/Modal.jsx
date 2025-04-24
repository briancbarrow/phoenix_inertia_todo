import React, { useEffect, useRef } from "react";

export default function Modal({ isOpen, onClose, id = "modal", children }) {
  const focusRef = useRef(null);

  // Handle ESC key press
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Handle click outside
  useEffect(() => {
    function handleClickAway(e) {
      if (focusRef.current && !focusRef.current.contains(e.target) && isOpen) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickAway);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickAway);
    };
  }, [isOpen, onClose]);

  // Control body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle focus trap
  useEffect(() => {
    if (isOpen && focusRef.current) {
      focusRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div id={id} className="relative z-50" role="dialog">
      {/* Background overlay */}
      <div
        id={`${id}-bg`}
        className="bg-zinc-50/90 fixed inset-0 transition-opacity"
        aria-hidden="true"
      />

      {/* Modal container */}
      <div
        className="fixed inset-0 overflow-y-auto"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-description`}
        role="dialog"
        aria-modal="true"
        tabIndex="0"
      >
        <div className="flex min-h-full items-center justify-center">
          <div className="w-full max-w-3xl p-4 sm:p-6 lg:py-8">
            {/* Focus wrap */}
            <div
              ref={focusRef}
              id={`${id}-container`}
              className="shadow-zinc-700/10 ring-zinc-700/10 relative rounded-2xl bg-white p-14 shadow-lg ring-1 transition"
              tabIndex="-1"
            >
              {/* Close button */}
              <div className="absolute top-6 right-5">
                <button
                  onClick={onClose}
                  type="button"
                  className="-m-3 flex-none p-3 opacity-20 hover:opacity-40"
                  aria-label="close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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

              {/* Modal content */}
              <div id={`${id}-content`}>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
