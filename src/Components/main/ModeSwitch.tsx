import React from "react";

interface ModeSwitchProps {
  isPaginationMode: boolean;
  handleModeSwitch: () => void;
}

export const ModeSwitch: React.FC<ModeSwitchProps> = ({
  isPaginationMode,
  handleModeSwitch,
}) => {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="flex items-center space-x-3">
        <span
          className={`text-sm font-medium ${
            isPaginationMode ? "text-blue-600 dark:text-blue-400" : "text-gray-500"
          }`}
        >
          Pagination
        </span>
        <button
          onClick={handleModeSwitch}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isPaginationMode ? "bg-gray-200 dark:bg-gray-700" : "bg-blue-600"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isPaginationMode ? "translate-x-1" : "translate-x-6"
            }`}
          />
        </button>
        <span
          className={`text-sm font-medium ${
            !isPaginationMode ? "text-blue-600 dark:text-blue-400" : "text-gray-500"
          }`}
        >
          Infinite Scroll
        </span>
      </div>
    </div>
  );
};
