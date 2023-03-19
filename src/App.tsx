import { useEffect, useState } from "react";
import useUser from "./hooks/useUser";
import { CanceledError } from "./services/api-client";
import UserService, { User } from "./services/user-service";

function App() {
  const { users, error, isLoading, setUsers, setError } = useUser();
  const handleDelete = (user: User) => {
    const originalUser = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    UserService.delete(user.id)
      .then((res) => {})
      .catch((err) => {
        setError(err.message);
        setUsers(originalUser);
      });
  };
  const handleAdd = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Pravar" };
    setUsers([newUser, ...users]);
    UserService.create(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };
  const handleUpdate = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    UserService.update(updatedUser).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };
  return (
    <>
      {isLoading && <div className="spinner-border" role="status"></div>}
      {error && <p className="text-danger">{error}</p>}
      <button className="btn btn-primary" onClick={handleAdd}>
        Add
      </button>
      <ul className="list-group">
        {users.map((u) => (
          <li
            className="list-group-item d-flex justify-content-between"
            key={u.id}
          >
            {u.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-1"
                onClick={() => handleUpdate(u)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => handleDelete(u)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
