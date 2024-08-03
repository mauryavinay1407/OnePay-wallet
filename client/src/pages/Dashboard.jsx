import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Heading } from '../components/Heading';
import { ButtonDash } from '../components/ButtonDash';
import { Popup } from '../components/Popup';
import { Users } from '../components/Users';

export const Dashboard = () => {
  const [balance, setBalance] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState({});
  const [popup, setPopup] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log("start");
      const response = await axios.get("/api/v1/user/logout");
      console.log("end");
      toast.success(response.data.msg);
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed");
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("api/v1/account/balance");
        const { balance, user } = response.data;

        setBalance(balance !== undefined ? balance.toFixed(2) : "0.00");
        setName(user ? user.firstname : "Guest");
        setUser(user || {});
      } catch (error) {
        console.error("Fetching data failed", error);
        toast.error("Fetching data failed");
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {popup ? (
        <Popup user={user} setpopup={setPopup} />
      ) : (
        <div className="p-5">
          <div className="flex flex-col md:flex-row justify-between items-center mb-5">
            <Heading label={`Current Balance: $${balance}`} styles={{ color: 'white', fontSize: '1.5rem' }} />
            <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0">
              <div className="text-gray-200 font-medium text-lg mb-2 md:mb-0 md:mr-10">
                Hey, {name} 
                <button className="h-8 w-8 ml-3 rounded-full bg-gray-500">{name[0]}</button>
              </div>
              <ButtonDash label={"Logout"} onClick={handleLogout} className="mb-2 md:mb-0 md:mr-4" />
              <ButtonDash label={"Edit profile"} onClick={() => setPopup(true)} />
            </div>
          </div>
          <Heading label={"Users"} styles={{ color: 'white', fontSize: '1.5rem', marginLeft: '1rem' }} />
          <div className="w-full flex flex-col items-center mt-4">
            <Users />
          </div>
        </div>
      )}
    </>
  );
}
