import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { FaXTwitter } from "react-icons/fa6";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FcGoogle} from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import bgimage from "../src/assets/colorful-abstract-background-with-smooth-lines-and-curves-that-form-an-otherworldly-landscape-glowing-neon-lights-creating-dynamic-light-patterns-on-a-black-background-photo.jpg"

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
      <div className="relative z-30 min-h-screen flex items-center justify-center rounded-2xl">
        <div className="max-w-5xl w-full m-5 ">
          <div className="grid grid-cols-1 md:grid-cols-2 ">
            <div className=" text-white text-4xl font-bold">
              <Card className="rounded-none capitalize">
                <CardHeader>
                 <h6>create an account</h6>
                  <CardDescription>
                    let's get start with 30 days trial
                  </CardDescription>
                  <div>
                    <Button type="submit" variant="outline" className="w-full flex items-center">
                        <FcGoogle className="text-xl" /> 
                      Sign up with Google
                    </Button>
                    <Button className="w-full">
                          <FaXTwitter className="text-xl" />
                      Sign up with X
                    </Button>
                  </div>
                  <hr className="mt-1" />
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="flex flex-col gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          type="name"
                          placeholder="m@example.com"
                          required
                        />
                      </div>
                       <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="password">Password</Label>
                          <a
                            href="#"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                          >
                            Forgot your password?
                          </a>
                        </div>
                        <Input id="password" type="password" required />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                     <Button  className="w-full py-3 px-1.5" >
                      Sign up
                    </Button>
                    <p className="text-sm text-gray-500">already have an account?<a href="#" className="text-sm text-black">login in</a></p>
                    <div className="mt-3">
                        <p className="text-sm text-gray-500">by creating an account,you agree to our terms of use</p>
                    </div>
                </CardFooter>
              </Card>
            </div>

            
              <div className="relative bg-cover bg-center h-full w-full" style={{backgroundImage:`url(${bgimage})`}}>
                <div className="absolute inset-0 bg-black/35">

                </div>
                <div className="relative text-white capitalize flex flex-col h-full p-5 items-end justify-end gap-2">
                    <h1 className="text-4xl ">
                effortless ai solution tailored for enterprises
                    </h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos nihil animi iure accusantium sit. Adipisci earum explicabo ullam dolor alias.</p>
                </div>
              </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
