const RatingStars = ({
    value = 0,
    onChange,
    editable = false,
    size = "text-lg"
  }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const isActive = star <= value
  
          return (
            <span
              key={star}
              onClick={() => editable && onChange(star)}
              className={`
                ${size}
                ${editable ? "cursor-pointer" : "cursor-default"}
                transition-colors duration-200
                ${isActive ? "text-yellow-400" : "text-gray-300"}
                ${editable ? "hover:text-yellow-500" : ""}
              `}
            >
              ★
            </span>
          )
        })}
      </div>
    )
  }
  
  export default RatingStars