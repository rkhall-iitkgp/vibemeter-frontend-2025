import { Mail, Phone, Calendar, BadgeInfo } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// TypeScript interface for contact data
interface ContactData {
  email: string;
  phone: string;
  addedOn: string;
  id: string;
}

// TypeScript interface for component props
interface ContactCardProps {
  contactData?: ContactData;
  className?: string;
}

// Default contact data
const defaultContact: ContactData = {
  email: "dummy@example.com",
  phone: "+1 (123) 456-7890",
  addedOn: "01-03-2025",
  id: "EM000000",
};

const ContactCard = ({ contactData = defaultContact }: ContactCardProps) => {
  return (
    <div className="mx-auto w-full">
      <Card className="rounded-2xl shadow-md py-4">
        <CardContent className="px-4 pb-2 space-y-2">
          <h2 className="text-md font-semibold">Contact Information</h2>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            <span className="text-sm truncate">{contactData.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            <span className="text-sm">{contactData.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            <span className="text-sm">Added on {contactData.addedOn}</span>
          </div>
          <div className="flex items-center space-x-2">
            <BadgeInfo className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            <span className="text-sm">ID: {contactData.id}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactCard;
