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
  const { id, name } = user || {};

  const {
    isLoading,
    data,
  }: {
    isLoading: boolean;
    data: IToDoItem[];
  } = useQuery(['todos', id], async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}/todos`
    );
    return await response.json();
  });

  if (name && !isLoading) {
    return (
      <Fragment>
        <ul className="todo-list">
          {data?.map(({ id, title, completed, userId }) => (
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
