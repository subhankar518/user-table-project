
import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { User } from './userInterface';
import { userReducer, initialState } from '../Reducer/userReducer';
import { getAllData,createUser, baseUrl, deleteUsers } from '../Network/API';

const UserList = () => {
  const [state, dispatch] = useReducer(userReducer, initialState);
//   const [allData,setAllData]= useState([])

  useEffect(() =>{
    const callFunc= async()=>{
        await fetchAndSaveUsers();
        await getAllUsers()}
    callFunc();
  }, []);

  const fetchAndSaveUsers = async () => {
    try {
      const res = await axios.get('https://randomuser.me/api');
      await axios.post(`${baseUrl}${createUser}`,res?.data?.results)

    //   dispatch({ type: 'SAVE', payload: response });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${baseUrl}${getAllData}`);
      console.log("res-",response);
      dispatch({ type: 'SAVE', payload: response?.data });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const selectUser = (user: User) => {
    dispatch({ type: 'SELECT', payload: user });
  };

  const deselectUser = (user: User) => {
    dispatch({ type: 'DESELECT', payload: user });
  };

  const deleteUser = async () => {
    const idsToDelete = state.selectedUsers.map(user => user._id);
    try {
      await axios.delete(`${baseUrl}${deleteUsers}`, { data: { ids: idsToDelete } });
      dispatch({ type: 'REMOVE', payload: idsToDelete });
    } catch (error) {
      console.error('Error deleting users:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">User List</h2>
      <ul className="space-y-2">
        {state.users.map((user) => (
          <li key={user._id} className="flex justify-between p-2 border-b">
            <div>
              {user.name.first} {user.name.last} - Age: {user.dob.age}
            </div>
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                    selectUser(user);
                } else {
                    deselectUser(user);
                }
              }}
            />
          </li>
        ))}
      </ul>
      <button
        className="mt-4 p-2 bg-red-500 text-white"
        onClick={deleteUser}
        disabled={state.selectedUsers.length === 0}
      >
        Delete Selected Users
      </button>
    </div>
  );
};

export default UserList;
