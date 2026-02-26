import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  User,
  Phone,
  Mail,
  Lock,
  Shield,
  Headphones,
} from "lucide-react";
import { useForm } from "react-hook-form";

const PersonalInformation = ({ onNext, onBack,setBookingData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data)=>{
    setBookingData(prev=>({
      ...prev,
      personalInfo:data
    }))
    onNext();
  }
  return (
    <div className=" flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <Card className="bg-white overflow-hidden rounded-none shadow-none border-none">
          <CardContent className="p-x md:p-8">
            {/* Title Section */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Personal Information
              </h1>
              <p className="text-sm text-gray-500">
                Please provide your contact information to confirm your booking.
                We'll send a confirmation email and text shortly.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      {...register("fullName", { required: true })}
                      type="text"
                      placeholder="e.g. Johnathan Doe"
                      className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.fullName &&<span>fullName is required</span>}
                  </div>
                </div>

                {/* Mobile Number and Email Address - Side by Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Mobile Number */}
                  <div>
                    <label
                      htmlFor="mobileNumber"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Mobile Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                      {...register("mobileNumber",{required:true})}
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                      {errors.mobileNumber&&<span>mobile number is required</span>}
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="emailAddress"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                       {...register("email",{required:true})}
                        type="email"
                        placeholder="john@example.com"
                        className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                      {errors.email&&<span>email is required</span>}
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label
                    htmlFor="additionalNotes"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Additional Notes (Optional)
                  </label>
                  <Textarea
                   {...register("description")}
                    placeholder="Tell us anything else we should know..."
                    rows={4}
                    className="resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
                <Button
                  variant="outline"
                  onClick={onBack}
                  className="w-full sm:w-auto px-6 h-12 text-gray-700 font-medium border-gray-300 hover:bg-gray-50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  type="submit"
                  se
                  className="w-full sm:flex-1 h-12 bg-blue-500 text-white font-semibold hover:bg-blue-600 shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300"
                >
                  Confirm & Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Lock className="w-4 h-4" />
                <span className="font-medium">SECURE BOOKING</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Shield className="w-4 h-4" />
                <span className="font-medium">PRIVACY PROTECTED</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Headphones className="w-4 h-4" />
                <span className="font-medium">24/7 SUPPORT</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PersonalInformation;
