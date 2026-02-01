import Dashboard from "../pages/dashboard";
import Login from "../pages/login";
import Chatbot from "../pages/chatbot";
// import SlotCalendar from "./componentPages/slotcalendar";
import Service from "../pages/service";
import Staff from "../pages/staff";
import Appointments from "../pages/appointment";
import Calendar from "../pages/calendar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../pages/signup";
import { ServiceTitleProvider } from "../src/context/servicecontext";
function Routing() {
  return (
    <ServiceTitleProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/calendar" element={<Calendar />} />
        {/* <Route path="/slotcalendar" element={<SlotCalendar/>}/> */}
        <Route path="/service" element={<Service />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/appointments" element={<Appointments />} />
      </Routes>
    </BrowserRouter>
    </ServiceTitleProvider>
  );
}
export default Routing;
