import MoraleChart from "@/components/Linegraph";
import BubbleChart from "@/components/overview";
import EmployeeDirectory from "@/components/employees";
export default function Graph() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 ">
            {/* <h1 className="text-2xl font-bold mb-4">Tech Categories Visualization</h1> */}
            {/* <BubbleChart /> */}
            {/* <h1 className="text-2xl font-bold mb-4">Employee Directory</h1> */}
            <EmployeeDirectory />
            {/* <h1 className="text-2xl font-bold mb-4">Morale Chart</h1> */}
        {/* <MoraleChart /> */}
        </div>
    );
    }