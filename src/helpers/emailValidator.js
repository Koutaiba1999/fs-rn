export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/;
  if (!email || email.length <= 0) return "Email ne peut être vide.";
  if (!re.test(email)) return "Email invalide";
  return "";
}
