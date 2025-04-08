import { useEffect, useRef } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
};

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Trap focus inside modal
  useEffect(() => {
    if (!isOpen) return;

    const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements?.[0];
    const lastElement = focusableElements?.[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
      if (e.key === "Tab" && focusableElements && focusableElements.length > 0) {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    firstElement?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        ref={modalRef}
        className="rounded-lg bg-white p-6 shadow-lg w-11/12 max-w-md"
      >
        <h2 id="modal-title" className="text-lg font-semibold">
          {title}
        </h2>
        <p id="modal-description" className="mt-2 text-sm text-gray-600">
          {description}
        </p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            type="button"
            className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={onConfirm}
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}
