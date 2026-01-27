import { FlickeringGrid } from "@/components/ui/flickering-grid";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import bgimage from "../src/assets/colorful-abstract-background-with-smooth-lines-and-curves-that-form-an-otherworldly-landscape-glowing-neon-lights-creating-dynamic-light-patterns-on-a-black-background-photo.jpg";
import { useState } from "react";
import api from "@/api";
import { useNavigate } from "react-router-dom";
function Login() {
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const loginform = (e) => {
    setdata({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const submitlogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/login", {
        email: data.email,
        password: data.password,
      });
      const token = res.data.token;
      if (!token) {
        alert("you have not any account");
        console.log("you have not account please signup"); 
      }
      localStorage.setItem("token",token);
      localStorage.setItem("userid",res.data.user._id);
      navigate('/service')
    } catch (error) {
      console.log(error,"login failed");
      alert("login failed",error)
    }
    console.log(data);
  };
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Flicker background (FULL SCREEN) */}
      <div className="absolute inset-0">
        <FlickeringGrid
          color="blue"
          maxOpacity={1}
          flickerChance={1}
          squareSize={3}
          gridGap={6}
        />
      </div>

      {/* Centered login form */}
      <div className="relative z-30 min-h-screen flex items-center justify-center px-4">
        {/* Image wrapper ONLY around form */}
        <div
          className="relative w-full max-w-md rounded-2xl bg-cover bg-center p-1"
          style={{ backgroundImage: `url(${bgimage})` }}
        >
          {/* Dark overlay on image */}
          <div className="absolute inset-0 bg-black/50 rounded-2xl" />
          <Card className="relative z-10 border-none shadow-xl bg-backdrop-blur-md rounded-2xl">
            <CardHeader className="p-4">
              <h6 className="text-2xl text-white font-bold capitalize">
                log in account
              </h6>
              <CardDescription className="text-white font-bold">
                Let’s get started with a 30-day free trial
              </CardDescription>
              <hr className="mt-4" />
            </CardHeader>
            <form onSubmit={submitlogin} className="">
              <CardContent className="px-4 space-y-4">
                <div>
                  <Label className={`text-white font-bold mb-1.5`}>Email</Label>
                  <Input
                    onChange={loginform}
                    name="email"
                    value={data.email}
                    type="email"
                    placeholder="email@example.com"
                    className={`text-yellow-300 font-bold placeholder:text-yellow-200 `}
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <Label className={`text-white font-bold mb-1.5`}>
                      Password
                    </Label>
                    <a className="text-sm text-white font-bold hover:text-yellow-300 cursor-pointer">
                      Forgot?
                    </a>
                  </div>
                  <Input
                    onChange={loginform}
                    name="password"
                    type="password"
                    value={data.password}
                    className={`text-yellow-300 font-extrabold`}
                  />
                </div>
              </CardContent>

              <CardFooter className="px-4 mt-2 flex flex-col gap-3">
                <Button className="w-full py-3 cursor-pointer" type="submit">
                  login
                </Button>

                <p className="text-sm text-gray-500">
                  you don't have an account?{" "}
                  <a className="text-white font-extrabold  cursor-pointer">
                    sign up
                  </a>
                </p>

                <p className="text-xs text-gray-400 text-center">
                  By creating an account, you agree to our terms of use
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Login;
