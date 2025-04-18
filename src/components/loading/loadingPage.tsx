import Loading from "../../assets/Loading-pana.svg";
export function LoadingPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <img className="h-150 w-150" src={Loading} alt="Loading Page" />
    </div>
  );
}
