import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { FaXTwitter } from "react-icons/fa6";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import bgimage from "../src/assets/colorful-abstract-background-with-smooth-lines-and-curves-that-form-an-otherworldly-landscape-glowing-neon-lights-creating-dynamic-light-patterns-on-a-black-background-photo.jpg";

function Login() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <div className="absolute inset-0">
        <FlickeringGrid
          color="blue"
          maxOpacity={1}
          flickerChance={1}
          squareSize={3}
          gridGap={6}
        />
      </div>

      <div className="relative z-30 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl bg-white">
            <div className="p-2 sm:p-4">
              <Card className="border-none shadow-none">
                <CardHeader className="p-1.5">
                  <h6 className="text-2xl font-semibold capitalize">
                    Create an account
                  </h6>
                  <CardDescription>
                    Let’s get started with a 30-day free trial
                  </CardDescription>

                  <div className="space-y-2 pt-3">
                    <Button
                      variant="outline"
                      className="w-full flex gap-2"
                    >
                      <FcGoogle className="text-xl" />
                      Sign up with Google
                    </Button>

                    <Button className="w-full flex gap-2">
                      <FaXTwitter className="text-xl" />
                      Sign up with X
                    </Button>
                  </div>

                  <hr className="mt-4" />
                </CardHeader>

                <CardContent className="px-0">
                  <form className="space-y-4">
                    <div>
                      <Label>Name</Label>
                      <Input placeholder="John Doe" />
                    </div>

                    <div>
                      <Label>Email</Label>
                      <Input type="email" placeholder="email@example.com" />
                    </div>

                    <div>
                      <div className="flex justify-between items-center">
                        <Label>Password</Label>
                        <a className="text-sm hover:text-primary">
                          Forgot?
                        </a>
                      </div>
                      <Input type="password" />
                    </div>
                  </form>
                </CardContent>

                <CardFooter className="px-0 flex flex-col gap-3">
                  <Button className="w-full py-3">
                    Sign up
                  </Button>

                  <p className="text-sm text-gray-500">
                    Already have an account?
                    <a className="text-black ">Log in</a>
                  </p>

                  <p className="text-xs text-gray-400 text-center">
                    By creating an account, you agree to our terms of use
                  </p>
                </CardFooter>
              </Card>
            </div>
            <div
              className="relative  md:h-auto bg-cover bg-center"
              style={{ backgroundImage: `url(${bgimage})` }}
            >
              <div className="absolute inset-0 bg-black/40" />

              <div className="relative h-full flex flex-col justify-end p-5 sm:p-8 text-white gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold capitalize">
                  Effortless AI solutions for enterprises
                </h1>
                <p className="text-sm text-gray-200">
                  Build smarter systems faster with AI-powered workflows.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
