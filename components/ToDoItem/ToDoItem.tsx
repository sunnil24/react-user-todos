import * as React from 'react';
import { IToDoItem } from '../ToDoList/ToDoList';

const ToDoList: React.FC<IToDoItem> = ({ id, title, completed }) => {
  if (title) {
    return (
      <li key={`todo-item-${id}`} className={completed ? 'completed' : ''}>
        {title}
      </li>
    );
  }

  return <li>Loading...</li>;
};

export default ToDoList;
