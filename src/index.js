import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import App from "./App";
import ChatRoom from "./components/ChatRoom";

import "bootstrap/dist/css/bootstrap.min.css";

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/chat" element={<ChatRoom />} />
    </Routes>
  </Router>
);
