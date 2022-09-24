import * as React from 'react';
import { IUser } from '../../App';

interface IToDoList {
  user: IUser;
}

const ToDoList: React.FC<IToDoList> = ({ user }) => {
  console.log(user, '--');
  if (user) {
    <h3>{user.name}</h3>;
    return (
      <ul>
        <li>ToDo item</li>
      </ul>
    );
  }
};

export default ToDoList;
