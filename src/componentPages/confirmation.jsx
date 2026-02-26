import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  CheckCircle2,
  ArrowLeft,
  Shield,
  Bell,
  XCircle
} from 'lucide-react';
import api from '@/api';
import { useNavigate } from 'react-router-dom';
export default function BookingConfirmation({onBack,bookingdata,setbookingdata}) {
  const navigate = useNavigate();
 const submit = async () => {
  try {
    const payload = {
      service: bookingdata.service,
      customer_name: bookingdata.personalInfo.fullName,
      phone: bookingdata.personalInfo.mobileNumber,
      date: bookingdata.date.toLocaleDateString(),
      time: bookingdata.time,
      status: "pending",
      payment: "unpaid"
    };

    console.log("Sending:", payload);

    const response = await api.post("/api/appointments", payload);
 
    alert("Booking Confirmed ✅");
navigate('/appointments')

  } catch (error) {
    console.error("Server Error:", error.response?.data || error.message);
    alert("Booking Failed ❌");
  }
};
  return (
    <div className=" px-4 md:p-8">
      {/* Desktop Layout */}
      <div className="hidden md:block max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Final Confirmation</h1>
          <p className="text-slate-600">Please review your appointment details carefully before confirming.</p>
        </div>

        <Card className="shadow-xl border-slate-200/60 backdrop-blur-sm bg-white/95">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-slate-900">Review Your Booking</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Service Section */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl border border-slate-200/50">
                <div className="w-32 h-32 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                  <div className="text-white/20 text-6xl font-bold">$</div>
                </div>
                
                <div className="flex-1 space-y-3">
                  <div>
                    <Badge variant="secondary" className="mb-2 bg-blue-100 text-blue-700 hover:bg-blue-100">
                      SELECTED SERVICE
                    </Badge>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      Executive Strategic Consultation
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Our most popular 60-minute session for business growth and strategic planning. 
                      Includes a detailed post-session report.
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-slate-700 pt-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <span className="font-medium">60 Minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-slate-900">$150.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule and Contact Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Schedule Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-600 mb-4">
                  <Calendar className="w-5 h-5" />
                  <h4 className="font-semibold text-slate-900">Schedule</h4>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-slate-600">Date</span>
                    <span className="font-semibold text-slate-900"> {bookingdata.date?.toLocaleDateString()}</span>
                  </div>
                  <Separator />
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-slate-600">Time</span>
                    <span className="font-semibold text-slate-900">{bookingdata.time}</span>
                  </div>
                  <Separator />
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-slate-600">Location</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-semibold text-slate-900">Online Meeting</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-600 mb-4">
                  <User className="w-5 h-5" />
                  <h4 className="font-semibold text-slate-900">Your Contact Info</h4>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-slate-600">Full Name</span>
                    <span className="font-semibold text-slate-900">{bookingdata.personalInfo.fullName}</span>
                  </div>
                  <Separator />
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-slate-600">Email</span>
                    <span className="font-semibold text-slate-900">{bookingdata.personalInfo.email}</span>
                  </div>
                  <Separator />
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-slate-600">Phone</span>
                    <span className="font-semibold text-slate-900">{bookingdata.personalInfo.mobileNumber}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <Button 
               onClick={submit}
                size="lg" 
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 h-14 text-base font-semibold"
              >
              
                Confirm Booking
                  <CheckCircle2 className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
              onClick={onBack}
              
                size="lg" 
                variant="outline" 
                className="border-2 hover:bg-slate-50 h-14 px-8"
              >
                Back to Details
              </Button>
            </div>

            {/* Footer Info */}
            <div className="flex items-center justify-center gap-8 pt-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>SECURE BOOKING</span>
              </div>
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                <span>EMAIL REMINDERS</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                <span>24H CANCEL POLICY</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden max-w-lg mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Final Confirmation</h1>
          <p className="text-sm text-slate-600">Review your appointment details</p>
        </div>

        <div className="space-y-4">
          {/* Service Card - Mobile */}
          <Card className="shadow-lg border-slate-200/60 bg-white/95">
            <CardContent className="p-5 space-y-4">
              <div className="space-y-3">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                  SELECTED SERVICE
                </Badge>
                
                <div className="flex gap-3">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                    <div className="text-white/20 text-4xl font-bold">$</div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      Executive Strategic Consultation
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-700 mt-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>60 Min</span>
                      </div>
                      <span className="text-lg font-bold text-slate-900">$150.00</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our most popular 60-minute session for business growth and strategic planning. 
                  Includes a detailed post-session report.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Schedule Card - Mobile */}
          <Card className="shadow-lg border-slate-200/60 bg-white/95">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 text-blue-600 mb-4">
                <Calendar className="w-4 h-4" />
                <h4 className="font-semibold text-slate-900 text-sm">Schedule</h4>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">Date</span>
                  <span className="font-semibold text-slate-900 text-sm">Monday, Oct 24, 2023</span>
                </div>
                <Separator />
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">Time</span>
                  <span className="font-semibold text-slate-900 text-sm">10:00 AM - 11:00 AM</span>
                </div>
                <Separator />
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">Location</span>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-semibold text-slate-900 text-sm">Online Meeting</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Card - Mobile */}
          <Card className="shadow-lg border-slate-200/60 bg-white/95">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 text-blue-600 mb-4">
                <User className="w-4 h-4" />
                <h4 className="font-semibold text-slate-900 text-sm">Your Contact Info</h4>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">Full Name</span>
                  <span className="font-semibold text-slate-900 text-sm">Alex Thompson</span>
                </div>
                <Separator />
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">Email</span>
                  <span className="font-semibold text-slate-900 text-sm">alex.t@example.com</span>
                </div>
                <Separator />
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">Phone</span>
                  <span className="font-semibold text-slate-900 text-sm">+1 (555) 012-3456</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons - Mobile */}
          <div className="space-y-3 pt-2 sticky bottom-0 bg-gradient-to-t from-slate-50 via-blue-50/30 to-transparent pb-4 pt-6">
            <Button 
              size="lg" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 h-12 text-sm font-semibold"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Confirm Booking
            </Button>
            
            <Button 
            onClick={onBack}
              size="lg" 
              variant="outline" 
              className="w-full border-2 hover:bg-slate-50 h-12 text-sm"
            >
              Back to Details
            </Button>
          </div>

          {/* Footer Info - Mobile */}
          <div className="flex flex-col items-center gap-3 py-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5" />
              <span>SECURE BOOKING</span>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <Bell className="w-3.5 h-3.5" />
                <span>EMAIL REMINDERS</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="w-3.5 h-3.5" />
                <span>24H CANCEL POLICY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}