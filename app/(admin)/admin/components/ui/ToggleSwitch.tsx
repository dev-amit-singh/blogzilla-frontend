"use client";

interface Props {
  enabled: boolean;
  loading?: boolean;
  onChange: () => void;
}

export default function ToggleSwitch({
  enabled,
  loading,
  onChange,
}: Props) {
  return (
    <button
      onClick={onChange}
      disabled={loading}
      className={`
        relative inline-flex items-center
        w-11 h-6 flex-shrink-0
        rounded-full
        transition-all duration-300 ease-in-out
        ${enabled ? "bg-emerald-500" : "bg-gray-300"}
        ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <span
        className={`
          inline-block
          w-5 h-5
          transform
          bg-white
          rounded-full
          shadow-md
          transition-all duration-300 ease-in-out
          ${enabled ? "translate-x-5" : "translate-x-1"}
        `}
      />
    </button>
  );
}
