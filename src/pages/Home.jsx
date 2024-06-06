import { Link } from "react-router-dom";
import Footer from "../components/Footer"
import { main1ColumnStyle } from "../styles/styles";

const Home = () => {
  return (
    <>
      <div css={main1ColumnStyle}>
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
