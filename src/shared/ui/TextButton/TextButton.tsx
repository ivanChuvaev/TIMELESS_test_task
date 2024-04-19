import './TextButton.scss';

type TTextButtonProps = {
  onClick?: () => void
}

export default function TextButton({ onClick }: TTextButtonProps) {
  return (
    <button className="TextButton" onClick={onClick}>Refresh Users</button>
  )
}
