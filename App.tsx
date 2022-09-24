import * as React from 'react';
import UserCombo from './components/UserCombo';
import './style.css';
import ToDoList from './components/ToDoList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export interface IUser {
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

const { Fragment, useState } = React;

export default function App() {
  const [selectedUser, updateSelectedUser] = useState<IUser>();

  const handleSelectedUser = (user: IUser): void => {
    if (user) {
      updateSelectedUser(user);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <UserCombo handleSelectedUser={handleSelectedUser} />
        <ToDoList user={selectedUser} />
      </main>
    </QueryClientProvider>
  );
}
