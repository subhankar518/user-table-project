
import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { User } from './userInterface';
import { userReducer, initialState } from '../Reducer/userReducer';
import { getAllData, createUser, baseUrl, deleteUsers } from '../Network/API';

const UserList = () => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [sort, setSort] = useState("asc")
  const [youngestUserShow, setYoungestUserShow] = useState(false);

  useEffect(() => {
    const callFunc = async () => {
      await fetchAndSaveUsers();
      await getAllUsers()
    }
    callFunc();
  }, []);

  const fetchAndSaveUsers = async () => {
    try {
      const res = await axios.get('https://randomuser.me/api');
      await axios.post(`${baseUrl}${createUser}`, res?.data?.results)

      //   dispatch({ type: 'SAVE', payload: response });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${baseUrl}${getAllData}`);
      console.log("res-", response);
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

  const sortUsers = state?.users ? [...state?.users].sort((a, b) => {
    if (sort === 'asc') {
      return a.name.first.localeCompare(b.name.first);
    } else {
      return b.name.first.localeCompare(a.name.first);
    }
  }) : null;

  const handleSortFunc = () => {
    setSort((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const youngestUser = state?.users ? [...state?.users].sort((a, b) => a.dob.age - b.dob.age).slice(0, 2): null

  return (
    <div>
      
      <h2 className="text-2xl font-bold mb-4 flex justify-center">User List</h2>
      <div className="mb-5 flex justify-end p-2 border-b">
        <button
          className="p-2 bg-blue-600 text-white mr-4 cursor"
          onClick={handleSortFunc}
          disabled={youngestUserShow}
        >
          Sort by Name: {sort === 'asc' ? 'Ascending' : 'Descending'}
        </button>
        <button
          className="p-2 bg-blue-600 text-white cursor"
          onClick={() => setYoungestUserShow(!youngestUserShow)}
        >
          {youngestUserShow ? 'Show All Users' : 'Show Youngest Users'}
        </button>
      </div>
      <ul className="space-y-2">
        {youngestUserShow ? youngestUser && youngestUser.map((user) => (
          <li key={user._id} className="flex justify-between p-2 border-b">
            <div>
              {user.name.first} {user.name.last} - Age: {user.dob.age}
            </div>
            <div className="mb-5 flex justify-end p-2 border-b">
            <input
              className="mr-4"
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  selectUser(user);
                } else {
                  deselectUser(user);
                }
              }}
            />
            <button  className="p-2 bg-blue-600 text-white cursor">edit</button>
            </div>
          </li>
        )) :
          sortUsers && sortUsers?.map((user) => (
            <li key={user._id} className="flex justify-between p-2 border-b">
              <div>
                {user.name.first} {user.name.last} - Age: {user.dob.age}
              </div>
              <div className="mb-5 flex justify-end p-2 border-b">
              <input
                className="mr-4"
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    selectUser(user);
                  } else {
                    deselectUser(user);
                  }
                }}
              />
              <button  className="p-2 bg-blue-600 text-white cursor w-15 h-10">edit</button>
              </div>
            </li>
          ))}
      </ul>
      <button
        className="mt-4 p-2 bg-red-500 text-white cursor"
        onClick={deleteUser}
        disabled={state.selectedUsers.length === 0}
      >
        Delete Selected Users
      </button>
    </div>
    
  );
};

export default UserList;
