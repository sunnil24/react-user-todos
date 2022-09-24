import * as React from 'react';
import { IUser } from '../../App';

import './styles.css';

const { Fragment, useEffect, useState } = React;

interface IToDoList {
  user: IUser;
}

interface IToDoItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const ToDoList: React.FC<IToDoList> = ({ user }) => {
  const [todoList, updateTodoList] = useState<IToDoItem[]>([]);
  const { id, name } = user || {};

  useEffect(() => {
    if (id) {
      (async () => {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}/todos`
        );
        const todos = await response.json();
        updateTodoList(todos);
      })();
    }
  }, [id]);

  if (name) {
    return (
      <Fragment>
        <h3>{name}'s Todo list</h3>
        <ul className="todo-list">
          {todoList.map(({ id, title }) => (
            <li key={`todo-item-${id}`}>{title}</li>
          ))}
        </ul>
      </Fragment>
    );
  }

  return null;
};

export default ToDoList;
