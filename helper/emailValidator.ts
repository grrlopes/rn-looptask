export const emailValidator = (email: string) => {
  const regex = /\S+@\S+\.\S+/
  if (!email) return "Email cannot be empty."
  if (!regex.test(email)) return 'A valid email address must be provided.'
  return ''
}
