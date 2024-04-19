import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import { TUser } from '../../types';
import UserCard from '../UserCard/UserCard';
import AutoSizer from 'react-virtualized-auto-sizer';
import { chunk } from '../../shared/utils';
import { List } from 'react-virtualized';
import Scrollbars from 'react-custom-scrollbars-2';
import './UserCardGrid.scss';

type TUserCardGridProps = {
  users: TUser[];
  onDelete?: (uuid: string) => void;
  // count: number;
};

export default function UserCardGrid({
  users,
  onDelete,
  // count,
}: TUserCardGridProps) {
  const [selectedUserUUID, setSelectedUserUUID] = useState<null | string>(null);
  const [topGradient, setTopGradient] = useState(false);
  const [bottomGradient, setBottomGradient] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<List | null>(null);
  const [count, setCount] = useState(2);

  const userGroups = useMemo(() => chunk(users, count), [users, count]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleScroll: React.UIEventHandler<any> = ({ target }) => {
    if (target instanceof HTMLElement) {
      setTopGradient(target.scrollTop > 10);
      setBottomGradient(target.scrollHeight - target.clientHeight - target.scrollTop > 10)
      const { scrollTop, scrollLeft } = target;
      const { Grid: grid } = listRef.current!;
      grid?.handleScrollEvent({ scrollTop, scrollLeft });
    }
  };

  // handle deselect
  useEffect(() => {
    const func = (event: MouseEvent) => {
      if (
        event.target instanceof HTMLElement &&
        (gridRef.current === event.target ||
          event.target.classList.contains('UserCardGrid__grid-group') ||
          !gridRef.current!.contains(event.target))
      ) {
        setSelectedUserUUID(null);
      }
    };
    document.body.addEventListener('click', func);
    return () => {
      document.body.removeEventListener('click', func);
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      console.log(window.innerWidth)
      if (window.innerWidth < 1100) {
        setCount(1)
      } else if (window.innerWidth >= 1100 && window.innerWidth < 1440) {
        setCount(2);
      } else if (window.innerWidth >= 1440 && window.innerWidth < 2137) {
        setCount(3);
      } else if (window.innerWidth >= 2137) {
        setCount(5);
      }
    }

    onResize();

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, [])

  return (
    <div ref={gridRef} className="UserCardGrid" style={{ '--count': count } as CSSProperties}>
      <div className={`UserCardGrid__top-gradient ${topGradient && 'UserCardGrid__top-gradient_visible'}`} />
      <div className={`UserCardGrid__bottom-gradient ${bottomGradient && 'UserCardGrid__bottom-gradient_visible'}`} />
        <AutoSizer>
          {({ width, height }) => (
            <Scrollbars
              style={{ width, height }}
              onScroll={handleScroll}
              renderTrackVertical={(props) => (
                <div {...props} className='UserCardGrid__scrollbar-track' />
              )}
              renderThumbVertical={(props) => (
                <div {...props} className='UserCardGrid__scrollbar-thumb' />
              )}
            >
              <List
                ref={listRef}
                style={{ overflow: 'visible' }}
                width={width}
                height={height}
                rowCount={userGroups.length}
                rowHeight={196 + 16}
                rowRenderer={({ index, style }) => (
                  <div
                    key={userGroups[index].map((user) => user.uuid).join('')}
                    style={style}
                    className="UserCardGrid__grid-group"
                  >
                    {userGroups[index].map((user) => (
                      <UserCard
                        key={user.phone}
                        user={user}
                        selected={user.uuid === selectedUserUUID}
                        onSelect={setSelectedUserUUID}
                        onDelete={onDelete}
                      />
                    ))}
                  </div>
                )}
              />
              {bottomGradient && <div className="UserCardGrid__bottom-gradient" />}
            </Scrollbars>
          )}
        </AutoSizer>
    </div>
  );
}
