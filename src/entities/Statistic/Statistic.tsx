import React, { Fragment } from "react"
import { TUser } from "../../types"
import './Statistic.scss';

type TStatisticProps = {
  users: TUser[]
}

// eslint-disable-next-line react-refresh/only-export-components
function Statistic({ users }: TStatisticProps) {

  const ageGroups: Array<{ label: string, count: number }> = [
    {
      label: '11 to 20',
      count: users.filter((user) => user.age >= 11 && user.age <= 20).length
    },
    {
      label: '21 to 30',
      count: users.filter((user) => user.age >= 21 && user.age <= 30).length
    },
    {
      label: '31 to 40',
      count: users.filter((user) => user.age >= 31 && user.age <= 40).length
    },
    {
      label: '41 to 50',
      count: users.filter((user) => user.age >= 41 && user.age <= 50).length
    }
  ]

  const genderGroups: Array<{ label: string, count: number }> = [
    {
      label: 'Male',
      count: users.filter((user) => user.gender === 'male').length
    },
    {
      label: 'Female',
      count: users.filter((user) => user.gender === 'female').length
    }
  ]

  return (
    <div className="Statistic">
      <div className="Statistic__user-count">
        {users.length} Users
      </div>
      <hr className="Statistic__divider" />
      <div className="Statistic__group">
        <div className="Statistic__group-title">
          Age Groups
        </div>
        <div className="Statistic__group-fields">
          {ageGroups.map((ageGroup) => (
            <Fragment key={ageGroup.label}>
              <div className="Statistic__group-field-label">
                {ageGroup.label}
              </div>
              <div className="Statistic__group-field-value">
                {ageGroup.count} users
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <hr className="Statistic__divider" />
      <div className="Statistic__group">
        <div className="Statistic__group-title">
          Gender Groups
        </div>
        <div className="Statistic__group-fields">
          {genderGroups.map((genderGroup) => (
            <Fragment key={genderGroup.label}>
              <div className="Statistic__group-field-label">
                {genderGroup.label}
              </div>
              <div className="Statistic__group-field-value">
                {genderGroup.count} users
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(Statistic);
