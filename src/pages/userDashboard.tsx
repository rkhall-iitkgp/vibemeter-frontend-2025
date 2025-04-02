import { useState } from 'react';
// import TabNavigation from '../components/TabNavigation';
import InitiativeModal from '../components/InitiativeModal';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* <TabNavigation activeTab="overall" /> */}
        
        <div className="mt-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          
          <div className="mt-6">
            <button
              onClick={openModal}
              className="rounded-md bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
            >
              Create Initiative
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && <InitiativeModal onClose={closeModal} />}
    </div>
  );
};

export default Home;
