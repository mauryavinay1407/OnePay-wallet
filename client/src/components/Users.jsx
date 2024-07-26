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
      const response = await axios.get(`api/v1/user/bulk?filter=${filter}`); 
      setUsers(response.data.user);
    };
    fetchData();
  }, [filter]);
  return (
    <>
      <input
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
        type="text"
        placeholder={"Search users..."}
        className=" border-gray-500 w-9/12 p-2 border-2 rounded text-sm outline-1"
      />
      {users.length > 0 ? (
        users.map((user) => (
          <div
            key={user._id}
            className="bg-gray-100 flex justify-between items-center border-gray-500 w-9/12 p-2 my-2 border-2 rounded text-sm"
          >
            <div className="text-gray-800  flex items-center font-medium text-lg mr-10">
              <button
                className="h-8 w-8 mr-3 rounded-full "
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
            <div className="">
              <ButtonBox
                onClick={() => {
                  navigate(`/send?id=${user._id}&name=${user.firstname}`);
                }}
                label={"Send Money"}
                styles={{ height: "2.8rem" }}
              />
            </div>
          </div>
        ))
      ) : (
        <div>User not found</div>
      )}
    </>
  );
};