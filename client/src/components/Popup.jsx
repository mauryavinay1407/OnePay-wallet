import React, { useState } from 'react';
import { InputBox } from './InputBox';
import { ButtonBox } from './ButtonBox';
import { Heading } from './Heading';
import toast from 'react-hot-toast';
import { Loader } from './Loader';
import axios from 'axios';
import { RxCross1 } from 'react-icons/rx';

export const Popup = ({ user, setpopup }) => {
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const username = user.username;

  const updateData = async () => {
    try {
      setLoader(true);
      const response = await axios.put("api/v1/user/me", {
        firstname,
        lastname,
        password
      });
      toast.success(response.data.msg);
      setpopup(false);
    } catch (error) {
      toast.error("Update failed!!!");
      console.log("Updation error", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="w-full h-5/6 flex justify-center items-center p-5">
          <div className="w-full md:w-2/6 bg-gray-100 p-5 md:p-10 rounded flex flex-col items-center mt-10">
            <div className="flex justify-end w-full text-gray-900 text-3xl cursor-pointer">
              <RxCross1 onClick={() => setpopup(false)} />
            </div>
            <Heading label="Edit Profile" />
            <InputBox
              onChange={(e) => setFirstname(e.target.value)}
              label="Firstname"
              value={firstname}
              styles={{ width: "100%", maxWidth: "300px", border: "1px solid gray" }}
            />
            <InputBox
              onChange={(e) => setLastname(e.target.value)}
              label="Lastname"
              value={lastname}
              styles={{ width: "100%", maxWidth: "300px", border: "1px solid gray" }}
            />
            <InputBox
              label="Email"
              value={username}
              readOnly={true}
              styles={{ outline: 'none', width: "100%", maxWidth: "300px", border: "1px solid gray" }}
            />
            <InputBox
              onChange={(e) => setPassword(e.target.value)}
              label="Enter Password"
              value={password}
              placeholder="*********"
              styles={{ width: "100%", maxWidth: "300px", border: "1px solid gray" }}
            />
            <ButtonBox
              onClick={updateData}
              label="Update"
              styles={{ width: "100%", maxWidth: "300px", border: "1px solid gray" }}
            />
          </div>
        </div>
      )}
    </>
  );
};
