import "./style.css";
interface Props {
  name?: string;
  OnClick?: () => void;
}

export function ButtonForm({ name }: Props) {
  return (
    <div>
      <button>{name}</button>
    </div>
  );
}
