export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/;
  if (!email || email.length <= 0) return "Email ne peut pas être vide.";
  if (!re.test(email)) return "Email invalide";
  return "";
}

export function passwordValidator(password) {
  if (!password || password.length <= 0)
    return "Mot de passe ne peut pas être vide.";
  return "";
}
