import * as React from 'react';
import { IUser } from '../../App';

const { useEffect, useState } = React;

interface ICombo {
  handleSelectedUser?(user: IUser): void;
}

const UserCombo: React.FC<ICombo> = ({ handleSelectedUser }) => {
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

  const handleDataSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedUser: string = e.target.value;

    const selectedUserDetails = userList.find(
      ({ name }: IUser): boolean => name === selectedUser
    );

    handleSelectedUser?.(selectedUserDetails);
  };

  return (
    <div className="user-combo">
      <h3>Select User</h3>
      <input
        type="search"
        list="user-list"
        onChange={handleDataSelect}
        className="user-combo-search"
      />
      <datalist id="user-list">
        {userList.map(({ id, name }) => (
          <option key={id} value={name} data-id={id}>
            {name}
          </option>
        ))}
      </datalist>
    </div>
  );
};

export default UserCombo;
