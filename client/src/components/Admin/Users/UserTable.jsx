import React from "react";
import User from "./User";

const UserTable = ({ loading, users, handleDeleteUser }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>UserID</th>
          <th>Email</th>
          <th>Name</th>
          <th>Role</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users?.map((item) => (
            <User
              key={item._id}
              item={item}
              loading={loading}
              handleDeleteUser={handleDeleteUser}
            />
          ))}
      </tbody>
    </table>
  );
};

export default UserTable;
