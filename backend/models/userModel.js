let users = [];

const addUser = async (user) => {
    users.push(user);
};

const findUser = (id) => {
    return users.find(user => user.id === id);
};

const updateUser = async (user) => {
    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) {
        users[index] = user;
    }
};

const deleteUser = (id) => {
    users = users.filter(user => user.id !== id);
};

module.exports = { addUser, findUser, updateUser, deleteUser };
