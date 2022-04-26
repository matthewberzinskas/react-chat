import {createRoot} from 'react-dom/client';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import App from "./App";
import ChatRoom from "./components/ChatRoom";

import "bootstrap/dist/css/bootstrap.min.css";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/chat" element={<ChatRoom />} />
    </Routes>
  </Router>
);
