export const isUserAdmin = (user) => {
  return user?.role?.includes("admin");
};
