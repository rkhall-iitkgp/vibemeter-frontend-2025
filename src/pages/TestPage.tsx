import MoraleDistribution from "../components/Morale-Distribution"

const Home: React.FC = () => {
  return (
    <main className="flex  flex-col items-center justify-center p-8">
      <div className="w-full max-w-lg"> {/* Adjusted width here */}
        <MoraleDistribution />
      </div>
    </main>
  )
}

export default Home;
