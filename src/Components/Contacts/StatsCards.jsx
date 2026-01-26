import { FaUser, FaBuilding, FaCalendarAlt } from 'react-icons/fa';

const StatsCards = ({ contacts }) => {
  const totalContacts = contacts.length;
  const totalCompanies = [...new Set(contacts.map(c => c.companyName))].length;
  const totalServices = contacts.reduce((acc, contact) => acc + (contact.serviceIDs?.length || 0), 0);

  const stats = [
    {
      title: 'Total Contacts',
      value: totalContacts,
      icon: <FaUser className="text-xl text-primary" />
    },
    {
      title: 'Companies',
      value: totalCompanies,
      icon: <FaBuilding className="text-xl text-primary" />
    },
    {
      title: 'Services',
      value: totalServices,
      icon: <FaCalendarAlt className="text-xl text-primary" />
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
            </div>
            <div className="bg-stone-100 p-2.5 rounded-full">
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;