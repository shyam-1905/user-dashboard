import React from "react";
import { User } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Globe, Briefcase, Phone, Mail } from "lucide-react";

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20 border-4 border-white">
              <AvatarImage
                src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${user.name}`}
              />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl font-bold">{user.name}</CardTitle>
              <p className="text-xl opacity-80">@{user.username}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Personal Information</h3>
              <div className="space-y-2">
                <InfoItem
                  icon={<Mail className="w-5 h-5" />}
                  label="Email"
                  value={user.email}
                />
                <InfoItem
                  icon={<Phone className="w-5 h-5" />}
                  label="Phone"
                  value={user.phone}
                />
                <InfoItem
                  icon={<Globe className="w-5 h-5" />}
                  label="Website"
                  value={user.website}
                />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Address</h3>
              <div className="space-y-2">
                <p className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span>
                    {user.address.street}, {user.address.suite}
                  </span>
                </p>
                <p className="ml-7">
                  {user.address.city}, {user.address.zipcode}
                </p>
                <Badge variant="secondary" className="ml-7">
                  Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
                </Badge>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Company</h3>
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-6 h-6 text-blue-500" />
                  <div>
                    <p className="font-semibold">{user.company.name}</p>
                    <p className="text-sm text-gray-600">
                      {user.company.catchPhrase}
                    </p>
                    <p className="text-sm text-gray-500">{user.company.bs}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const InfoItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-2">
    {icon}
    <span className="font-medium">{label}:</span>
    <span>{value}</span>
  </div>
);

export default UserProfile;
