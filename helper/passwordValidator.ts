export const passwordValidator = (password: string) => {
  if (!password) return "Password cannot be empty."
  if (password.length < 5) return 'Password must be at least 5 characters long.'
  return ''
}
