export const emailRegex = (email) => {
  const emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  return emailRegex.test(email);
}
