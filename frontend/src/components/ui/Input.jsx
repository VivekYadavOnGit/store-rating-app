const Input = ({
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    error
  }) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
  
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
            error
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-indigo-500"
          }`}
        />
  
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    )
  }
  
  export default Input