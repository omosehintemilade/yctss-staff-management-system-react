import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { ContextProvider } from "./context";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminView from "./pages/AdminView";
import BioData from "./pages/BioData";
import CreateExperience from "./pages/CreateExperience";
import DocumentsUpload from "./pages/DocumentsUpload";
import EditBiodata from "./pages/EditBiodata";
import Experience from "./pages/Experience";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import UserLogin from "./pages/UserLogin";

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route
              path="/user/profile"
              element={<ProtectedRoute children={<Profile />} />}
            />

            <Route
              path="/user/biodata/edit"
              element={<ProtectedRoute children={<EditBiodata />} />}
            />

            <Route
              path="/user/biodata"
              element={<ProtectedRoute children={<BioData />} />}
            />

            <Route
              path="/user/document_uploads"
              element={<ProtectedRoute children={<DocumentsUpload />} />}
            />
            <Route
              path="/user/experience"
              element={
                <ProtectedRoute>
                  <Experience />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/experience/create"
              element={
                <ProtectedRoute>
                  <CreateExperience />
                </ProtectedRoute>
              }
            />

            {/* ADMIN */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/view/:userId" element={<AdminView />} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </ContextProvider>
    </div>
  );
}

export default App;
