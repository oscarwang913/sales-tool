import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Link to="excel-tool">Excel tool</Link>
      <Link to="orders">Order document</Link>
    </div>
  );
}

export default Home;