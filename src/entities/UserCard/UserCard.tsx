import clsx from 'clsx';
import { TUser } from '../../types';
import './UserCard.scss';
import './UserCard_selected.scss';
import { birthdayFormat } from '../../shared/utils';
import React from 'react';

type TUserCardProps = {
  user: TUser;
  selected?: boolean;
  onDelete?: (uuid: string) => void;
  onSelect?: (uuid: string) => void
};

// eslint-disable-next-line react-refresh/only-export-components
function UserCard({ user, selected, onDelete, onSelect }: TUserCardProps) {
  return (
    <div
      className={clsx('UserCard', selected && 'UserCard_selected')}
      onClick={() => onSelect?.(user.uuid)}
    >
      {selected && (
        <button
          className="UserCard__delete-button"
          onClick={() => onDelete?.(user.uuid)}
        >
          <img
            src="/images/UserCard__delete-button-icon.svg"
            alt="User card delete button"
          />
        </button>
      )}
      <div className="UserCard__main-info">
        <img className="UserCard__main-info-image" src={user.picture} />
        <div className="UserCard__main-info-text-lines">
          <div className="UserCard__main-info-text-lines-fullname">
            {user.firstName} {user.lastName}
          </div>
          <div className="UserCard__main-info-text-lines-email">
            {user.email}
          </div>
        </div>
      </div>
      <div className="UserCard__extra-info">
        <div className="UserCard__extra-info-field-label">Phone No</div>
        <div className="UserCard__extra-info-field-value">{user.phone}</div>
        <div className="UserCard__extra-info-field-label">Birthday</div>
        <div className="UserCard__extra-info-field-value">
          {birthdayFormat(user.birthday)}
        </div>
        <div className="UserCard__extra-info-field-label">Address</div>
        <div className="UserCard__extra-info-field-value">{user.address}</div>
      </div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(UserCard);
