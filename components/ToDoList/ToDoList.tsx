import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { IUser } from '../../App';
import ToDoItem from '../ToDoItem';

import './styles.css';

const { Fragment, useEffect, useState } = React;

interface IToDoList {
  user: IUser;
}

export interface IToDoItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const ToDoList: React.FC<IToDoList> = ({ user }) => {
  const [todoList, updateTodoList] = useState<IToDoItem[]>([]);
  const { id, name } = user || {};

  const { isLoading, error, data, isFetching } = useQuery(["repoData"],)

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
          {todoList.map(({ id, title, completed, userId }) => (
            <ToDoItem
              key={`todo-item-${id}`}
              title={title}
              id={id}
              userId={userId}
              completed={completed}
            />
          ))}
        </ul>
      </Fragment>
    );
  }

  return null;
};

export default ToDoList;
