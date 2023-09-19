export const getUserInitials = (user) => {
  if (user?.firstName && user?.lastName) {
    return (
      user.firstName.toUpperCase().charAt(0) +
      user.lastName.toUpperCase().charAt(0)
    );
  } else {
    return user?.profilePicture;
  }
};

export const getAuthorInitials = (user) => {
  if (user.author) {
    return (
      user.author.firstName.toUpperCase().charAt(0) +
      user.author.lastName.toUpperCase().charAt(0)
    );
  }
};
