import { Link } from "react-router-dom";
import Footer from "../components/Footer"

const Home = () => {
  return (
    <>
      <div>
        TopPage
        <p>
          <Link to="/books">本の一覧ページへ</Link>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Home;
