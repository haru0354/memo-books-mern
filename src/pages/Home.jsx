import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      TopPage
      <p>
        <Link to="/books">本の一覧ページへ</Link>
      </p>
    </div>
  );
};

export default Home;
