import React from "react";

const List = ({ data }) => {
  return (
    <div className="flex justify-center">
      <table className="rwd-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Birth Date</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.email}</td>
                <td>{item.phone_number}</td>
                <td>{item.birth_date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No hay información</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default List;
