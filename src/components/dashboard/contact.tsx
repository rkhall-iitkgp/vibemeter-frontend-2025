
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Calendar, BadgeInfo } from "lucide-react";

const ContactCard = () => {
  const contact = {
    email: "dummy@example.com",
    phone: "+1 (123) 456-7890",
    addedOn: "01-03-2025",
    id: "EM000000",
  };

  return (
    <div className="p-4 max-w-sm mx-auto w-full">
      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Contact Information</h2>
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5" />
            <span>{contact.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-5 h-5" />
            <span>{contact.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Added on {contact.addedOn}</span>
          </div>
          <div className="flex items-center space-x-2">
            <BadgeInfo className="w-5 h-5" />
            <span>ID: {contact.id}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactCard;
