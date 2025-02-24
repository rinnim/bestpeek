// validate email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // ex: test@test.com
  return emailRegex.test(email);
};

// validate password
export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9]+$/; // Allows only letters and numbers
  const containsLetterRegex = /[a-zA-Z]/; // Ensure at least one letter

  return (
    username.length >= 3 &&
    usernameRegex.test(username) &&
    containsLetterRegex.test(username)
  );
};

export const validateName = (name) => {
  const nameRegex = /^[a-zA-Z\s]+$/; // Allows only letters and spaces

  return nameRegex.test(name);
};