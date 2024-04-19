import { Dispatch, SetStateAction } from 'react'
import './Searchbar.scss'

type TSearchbarProps = {
  value?: string
  setValue?: Dispatch<SetStateAction<string>>
}

export default function Searchbar({ value, setValue }: TSearchbarProps) {
  return (
    <input className="Searchbar" value={value} onChange={(e) => setValue?.(e.target.value)} placeholder='Search' />
  )
}
