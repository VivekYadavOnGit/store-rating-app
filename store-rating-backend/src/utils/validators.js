exports.validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  exports.validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/
    return passwordRegex.test(password)
  }
  
  exports.validateName = (name) => {
    return name.length >= 20 && name.length <= 60
  }
  
  exports.validateAddress = (address) => {
    return !address || address.length <= 400
  }