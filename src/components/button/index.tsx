interface Props {
  name?: string;
  OnClick?: () => void;
}

export function ButtonDefault({ name, OnClick }: Props) {
  return (
    <div className="h-15 w-full rounded-4xl bg-black">
      <button
        onClick={OnClick}
        className="h-full w-full border-none bg-transparent shadow-none"
      >
        <p className="text-2xl text-white">{name}</p>
      </button>
    </div>
  );
}
