users = [];

const addUser = ({ id, username, roomTag }) => {
  const ifUserExist = users.find(
    (user) => user.username === username && user.roomTag === roomTag
  );

  if (ifUserExist) {
    return {
      error: "Username is already in room",
    };
  }

  const user = { id, username, roomTag };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

module.exports = { addUser, removeUser };
