import React, { useEffect, useState } from "react";
import { ButtonBox } from "./ButtonBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`api/v1/user/bulk?filter=${filter}`);
        setUsers(Array.isArray(response.data.user) ? response.data.user : []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };
    fetchData();
  }, [filter]);

  return (
    <div className="w-full flex flex-col items-center p-5">
      <input
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
        type="text"
        placeholder="Search users..."
        className="border-gray-500 w-full md:w-9/12 p-2 mb-4 border-2 rounded text-sm outline-1"
      />
      {users.length > 0 ? (
        users.map((user) => (
          <div
            key={user._id}
            className="bg-gray-100 flex flex-col md:flex-row justify-between items-center border-gray-500 w-full md:w-9/12 p-2 my-2 border-2 rounded text-sm"
          >
            <div className="text-gray-800 flex items-center font-medium text-lg mb-2 md:mb-0 md:mr-10">
              <button
                className="h-8 w-8 mr-3 rounded-full"
                style={{
                  backgroundColor: `rgb(${Math.floor(
                    Math.random() * 255
                  )},${Math.floor(Math.random() * 255)},${Math.floor(
                    Math.random() * 255
                  )})`,
                }}
              >
                {user.firstname[0]}
              </button>
              {user.firstname}
            </div>
            <div>
              <ButtonBox
                onClick={() => {
                  navigate(`/send?id=${user._id}&name=${user.firstname}`);
                }}
                label="Send Money"
                styles={{ height: "2.8rem" }}
              />
            </div>
          </div>
        ))
      ) : (
        <div>No users found</div>
      )}
    </div>
  );
};
