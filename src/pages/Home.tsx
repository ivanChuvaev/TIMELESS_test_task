import { useGlobalContext } from '../contexts/globalContext';
import TextButton from '../shared/ui/TextButton/TextButton';
import Searchbar from '../shared/ui/Searchbar/Searchbar';
import UserCardGrid from '../entities/UserCardGrid/UserCardGrid';
import Statistic from '../entities/Statistic/Statistic';
import { useMemo, useState } from 'react';
import { birthdayFormat, useDebounce } from '../shared/utils';
import './Home.scss';

export default function Home() {
  const { users, refetch, removeUser, loading } = useGlobalContext();
  const [search, setSearch] = useState('');

  const searchDebounced = useDebounce(search, 500);

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          user.lastName.includes(searchDebounced) ||
          user.firstName.includes(searchDebounced) ||
          user.email.includes(searchDebounced) ||
          user.phone.includes(searchDebounced) ||
          birthdayFormat(user.birthday).includes(searchDebounced)
      ),
    [users, searchDebounced]
  );

  return (
    <div className="Home">
      <div className="Home__header">
        <Searchbar value={search} setValue={setSearch} />
        <TextButton onClick={refetch} />
      </div>
      <div className="Home__content">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <UserCardGrid
              key={searchDebounced}
              users={filteredUsers}
              onDelete={removeUser}
            />
            <Statistic users={users} />
          </>
        )}
      </div>
    </div>
  );
}
