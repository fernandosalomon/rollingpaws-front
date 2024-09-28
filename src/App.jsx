import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import PageViews from "./routes/PageViews";

const App = () => {
  return (
    <Router>
      <PageViews />
    </Router>
  );
};

export default App;
