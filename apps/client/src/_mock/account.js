// ----------------------------------------------------------------------
const User = JSON.parse(localStorage.getItem('User'))

export const account = {
  displayName: User.name + User.lastname,
  email: User,email,
  photoURL: '/assets/images/avatars/avatar_25.jpg',
};
