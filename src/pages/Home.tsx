import { useState, FC, FormEvent, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, logout, RootState } from '../store';

interface Mood {
  id: number;
  name: string;
  color: string;
  emoji: string;
}

const VibemeterPage: FC = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [comment, setComment] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const moods: Mood[] = [
    { id: 1, name: 'Frustrated', color: 'bg-red-500', emoji: '😣' },
    { id: 2, name: 'Concerned', color: 'bg-orange-400', emoji: '😟' },
    { id: 3, name: 'Neutral', color: 'bg-yellow-300', emoji: '😐' },
    { id: 4, name: 'Content', color: 'bg-green-400', emoji: '🙂' },
    { id: 5, name: 'Excited', color: 'bg-green-600', emoji: '😄' }
  ];

  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedMood) {
      setSubmitted(true);
      console.log({
        mood: selectedMood,
        comment,
        timestamp: new Date().toISOString()
      });
    }
  };

  const resetForm = () => {
    setSelectedMood(null);
    setComment('');
    setSubmitted(false);
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-black text-white py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-green-400 font-bold text-3xl mr-2">.</div>
            <h1 className="text-xl font-bold">Deloitte</h1>
          </div>
          <div className="text-sm">
            People Experience Portal
            {auth.isAuthenticated && (
              <span className="ml-4 inline-block">
                Welcome, {auth.user?.name}{' '}
                <button
                  onClick={handleLogout}
                  className="ml-2 text-blue-300 hover:underline"
                >
                  Logout
                </button>
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          {!submitted ? (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                How are you feeling today?
              </h2>
              <p className="text-gray-600 mb-8">
                Your feedback helps us create a better workplace. Responses are
                confidential and reviewed by the People Experience team.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <label className="block text-gray-700 font-medium mb-4">
                    Select your current mood:
                  </label>
                  <div className="flex flex-wrap gap-4 justify-between">
                    {moods.map((mood) => (
                      <button
                        key={mood.id}
                        type="button"
                        onClick={() => setSelectedMood(mood)}
                        className={`flex flex-col items-center p-4 rounded-lg transition-all ${
                          selectedMood && selectedMood.id === mood.id
                            ? `${mood.color} text-white ring-4 ring-blue-400 scale-105`
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        <span className="text-3xl mb-2">{mood.emoji}</span>
                        <span className="font-medium">{mood.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="comment"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Would you like to share more? (Optional)
                  </label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={handleCommentChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Tell us what's on your mind..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={!selectedMood}
                  className={`w-full py-3 px-4 rounded-md font-medium text-white ${
                    selectedMood
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Submit Feedback
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🙏</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Thank you for your feedback!
              </h2>
              <p className="text-gray-600 mb-8">
                Your input helps us make Deloitte a better place to work. We
                appreciate your honesty.
              </p>
              <button
                onClick={resetForm}
                className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Submit Another Response
              </button>
            </div>
          )}
        </div>

        <div className="max-w-2xl mx-auto mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-800 mb-2">
            About Vibemeter
          </h3>
          <p className="text-blue-700">
            The Vibemeter helps us understand employee sentiment across the
            organization. Your responses are anonymous and help leadership
            identify areas for improvement.
          </p>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>© 2025 Deloitte People Experience</p>
            </div>
            <div>
              <a href="#" className="text-gray-300 hover:text-white mr-4">
                Help
              </a>
              <a href="#" className="text-gray-300 hover:text-white mr-4">
                Privacy
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VibemeterPage;
