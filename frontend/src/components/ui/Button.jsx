const Button = ({
    children,
    onClick,
    type = "button",
    variant = "primary",
    disabled = false,
    className = ""
  }) => {
    const baseStyle =
      "px-4 py-2 rounded-lg font-medium transition duration-200"
  
    const variants = {
      primary:
        "bg-indigo-600 hover:bg-indigo-700 text-white",
      secondary:
        "bg-gray-200 hover:bg-gray-300 text-gray-800",
      danger:
        "bg-red-500 hover:bg-red-600 text-white"
    }
  
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyle} ${variants[variant]} ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${className}`}
      >
        {children}
      </button>
    )
  }
  
  export default Button