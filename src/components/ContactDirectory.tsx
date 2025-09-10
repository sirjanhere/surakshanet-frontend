import * as React from 'react';
import { Phone, Mail, User, Shield, Heart, Wrench } from 'lucide-react';

interface Contact {
  name: string;
  role: string;
  phone: string;
  email: string;
  status: 'available' | 'busy' | 'offline';
  type: 'manager' | 'volunteer' | 'professional';
}

const ContactDirectory: React.FC = () => {
  const contacts: Contact[] = [
    {
      name: 'Rajesh Kumar',
      role: 'Security Manager',
      phone: '+91 98765 43210',
      email: 'rajesh.kumar@surakshanet.com',
      status: 'available',
      type: 'manager'
    },
    {
      name: 'Priya Sharma',
      role: 'Operations Manager',
      phone: '+91 98765 43211',
      email: 'priya.sharma@surakshanet.com',
      status: 'busy',
      type: 'manager'
    },
    {
      name: 'Amit Patel',
      role: 'Security Volunteer',
      phone: '+91 98765 43212',
      email: 'amit.patel@volunteers.com',
      status: 'available',
      type: 'volunteer'
    },
    {
      name: 'Dr. Sunita Reddy',
      role: 'Medical Professional',
      phone: '+91 98765 43213',
      email: 'dr.sunita@medical.com',
      status: 'available',
      type: 'professional'
    },
    {
      name: 'Vikram Singh',
      role: 'Technical Support',
      phone: '+91 98765 43214',
      email: 'vikram.singh@tech.com',
      status: 'offline',
      type: 'professional'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoleIcon = (type: string) => {
    switch (type) {
      case 'manager': return <Shield size={16} className="text-blue-400" />;
      case 'volunteer': return <Heart size={16} className="text-green-400" />;
      case 'professional': return <Wrench size={16} className="text-orange-400" />;
      default: return <User size={16} className="text-gray-400" />;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="flex items-center gap-2 p-4 border-b border-gray-700">
        <User className="text-blue-400" size={20} />
        <h3 className="text-white font-semibold">Emergency Contacts</h3>
      </div>
      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {contacts.map((contact, index) => (
          <div key={index} className="bg-gray-700 rounded-lg p-3 hover:bg-gray-650 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {getRoleIcon(contact.type)}
                <div>
                  <div className="text-white font-medium">{contact.name}</div>
                  <div className="text-sm text-gray-400">{contact.role}</div>
                </div>
              </div>
              <div className={`w-3 h-3 rounded-full ${getStatusColor(contact.status)}`}></div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Phone size={14} />
                <span>{contact.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Mail size={14} />
                <span className="truncate">{contact.email}</span>
              </div>
            </div>
            <div className="mt-2 flex gap-2">
              <button className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded transition-colors">
                Call
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded transition-colors">
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactDirectory;