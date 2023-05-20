export const emailRegex = (email) => {
  const emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  return emailRegex.test(email);
}
export const reqextname = (fileName) => {
 const extName = fileName.match(/\.([^.]+)$/)[1];
  return extName;
}
