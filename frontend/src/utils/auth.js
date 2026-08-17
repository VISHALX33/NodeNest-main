const ADMIN_EMAILS = [
  "vishalprajapati2303@gmail.com",
  "harshul@notesea.xyz",
  "ceo@notesea.xyz",
];

export const isAdminEmail = (email) =>
  ADMIN_EMAILS.includes(String(email || "").toLowerCase());

export const setAuthSession = (token, user) => {
  localStorage.setItem("token", token);
  if (user) {
    localStorage.setItem(
      "user",
      JSON.stringify({ ...user, isAdmin: user.isAdmin ?? isAdminEmail(user.email) })
    );
  }
};

export const clearAuthSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

export const isAdminUser = () => {
  const user = getStoredUser();
  return user?.isAdmin === true || isAdminEmail(user?.email);
};

export const isAuthenticated = () => !!localStorage.getItem("token");
