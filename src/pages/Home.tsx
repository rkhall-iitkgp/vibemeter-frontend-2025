import { useState, FC, FormEvent, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, logout, RootState } from "../store";

interface Mood {
  id: number;
  name: string;
  color: string;
  emoji: string;
}

const VibemeterPage: FC = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [comment, setComment] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const moods: Mood[] = [
    { id: 1, name: "Frustrated", color: "bg-red-500", emoji: "😣" },
    { id: 2, name: "Concerned", color: "bg-orange-400", emoji: "😟" },
    { id: 3, name: "Neutral", color: "bg-yellow-300", emoji: "😐" },
    { id: 4, name: "Content", color: "bg-green-400", emoji: "🙂" },
    { id: 5, name: "Excited", color: "bg-green-600", emoji: "😄" },
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
        timestamp: new Date().toISOString(),
      });
    }
  };

  const resetForm = () => {
    setSelectedMood(null);
    setComment("");
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
      <header className="bg-black py-4 text-white">
        <div className="container mx-auto flex items-center justify-between px-6">
          <div className="flex items-center">
            <div className="mr-2 text-3xl font-bold text-green-400">.</div>
            <h1 className="text-xl font-bold">Deloitte</h1>
          </div>
          <div className="text-sm">
            People Experience Portal
            {auth.isAuthenticated && (
              <span className="ml-4 inline-block">
                Welcome, {auth.user?.name}{" "}
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
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-md">
          {!submitted ? (
            <>
              <h2 className="mb-6 text-2xl font-bold text-gray-800">
                How are you feeling today?
              </h2>
              <p className="mb-8 text-gray-600">
                Your feedback helps us create a better workplace. Responses are
                confidential and reviewed by the People Experience team.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <label className="mb-4 block font-medium text-gray-700">
                    Select your current mood:
                  </label>
                  <div className="flex flex-wrap justify-between gap-4">
                    {moods.map((mood) => (
                      <button
                        key={mood.id}
                        type="button"
                        onClick={() => setSelectedMood(mood)}
                        className={`flex flex-col items-center rounded-lg p-4 transition-all ${
                          selectedMood && selectedMood.id === mood.id
                            ? `${mood.color} scale-105 text-white ring-4 ring-blue-400`
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        <span className="mb-2 text-3xl">{mood.emoji}</span>
                        <span className="font-medium">{mood.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="comment"
                    className="mb-2 block font-medium text-gray-700"
                  >
                    Would you like to share more? (Optional)
                  </label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={handleCommentChange}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    rows={4}
                    placeholder="Tell us what's on your mind..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={!selectedMood}
                  className={`w-full rounded-md px-4 py-3 font-medium text-white ${
                    selectedMood
                      ? "bg-green-600 hover:bg-green-700"
                      : "cursor-not-allowed bg-gray-400"
                  }`}
                >
                  Submit Feedback
                </button>
              </form>
            </>
          ) : (
            <div className="py-8 text-center">
              <div className="mb-4 text-5xl">🙏</div>
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                Thank you for your feedback!
              </h2>
              <p className="mb-8 text-gray-600">
                Your input helps us make Deloitte a better place to work. We
                appreciate your honesty.
              </p>
              <button
                onClick={resetForm}
                className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                Submit Another Response
              </button>
            </div>
          )}
        </div>

        <div className="mx-auto mt-6 max-w-2xl rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h3 className="mb-2 text-lg font-medium text-blue-800">
            About Vibemeter
          </h3>
          <p className="text-blue-700">
            The Vibemeter helps us understand employee sentiment across the
            organization. Your responses are anonymous and help leadership
            identify areas for improvement.
          </p>
        </div>
      </div>

      <footer className="mt-12 bg-gray-800 py-6 text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 md:mb-0">
              <p>© 2025 Deloitte People Experience</p>
            </div>
            <div>
              <a href="#" className="mr-4 text-gray-300 hover:text-white">
                Help
              </a>
              <a href="#" className="mr-4 text-gray-300 hover:text-white">
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
