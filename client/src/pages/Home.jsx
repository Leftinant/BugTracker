import BugList from "../components/BugList";

export default function Home() {
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='navbar bg-base-100 shadow mb-4'>
        <div className='text-xl font-bold px-4'>🪲 Bug Tracker</div>
      </div>
      <BugList />
    </div>
  );
}
