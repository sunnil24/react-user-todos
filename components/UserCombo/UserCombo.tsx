import * as React from 'react';

const { useEffect, useState } = React;

interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const UserCombo: React.FC<{}> = () => {
  const [userList, updateUserList] = useState<IUser[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      const users = await response.json();
      updateUserList(users);
    })();
  }, []);

  return (
    <div className="user-combo">
      <h3>Select User</h3>
      <input type="text" list="user-list" />
      <datalist id="user-list">
        {userList.map(({ id, name }) => (
          <option key={id}>{name}</option>
        ))}
      </datalist>
    </div>
  );
};

export default UserCombo;
