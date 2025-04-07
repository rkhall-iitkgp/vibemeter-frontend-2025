import EmployeeSatisfactionGauge, {
  EmployeeSatisfaction,
} from "@/components/Admin/employee-satisfaction";
import HighConcernEmployees, {
  Employee,
} from "@/components/Admin/new-high-concern-employee";
import VibemeterChart, {
  ChartData,
} from "@/components/Admin/average-vibemeter-score";
import AdminBubbleChart, {
  BubbleData,
} from "@/components/Admin/AdminBubbleChart";
import { FaChartBar, FaDownload, FaSpinner } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

interface AdminData {
  employee_satisfaction: EmployeeSatisfaction;
  vibemeter_scores: ChartData;
  high_concern_employees: Employee[];
  bubble_data: BubbleData[];
}

const initialData: AdminData = {
  employee_satisfaction: {
    percentage: 0,
    change: 0,
    period: "1 month",
  },
  vibemeter_scores: {
    average: 0,
    percentageChange: 0,
    scores: [],
  },
  high_concern_employees: [],
  bubble_data: [
    {
      name: "Loading...",
      value: 80,
      description: "Please wait while we load the data.",
    },
  ],
};

export default function AdminDashboard() {
  const [isExporting, setIsExporting] = useState(false);
  const [data, setData] = useState<AdminData>(initialData);
  const [loading, setLoading] = useState<boolean>(false);

  // Create refs for each section to capture them individually
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch data from API or use demo data
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/dashboard`
        );
        if (response.ok) {
          const data = await response.json();
          setData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error - show notification to user
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Function to fetch and download PDF from backend
  const generateMultiPagePDF = async () => {
    setIsExporting(true);
    
    try {
      // Fetch the PDF file from your backend
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/report`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/pdf',
            // Include authentication headers if needed
            // 'Authorization': `Bearer ${authToken}`,
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      
      // Get the PDF as a blob
      const pdfBlob = await response.blob();
      
      // Create a download link and trigger the download
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'dashboard-report.pdf'); 
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Error downloading PDF:', error);
      // Show an error notification to the user
      alert('Failed to download the PDF. Please try again later.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      {/* Header with export button */}
      <header className="bg-gray-100 z-10 p-6 pt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[#80C342]">
              <FaChartBar size={40} />
            </span>
            <h1 className="text-4xl font-semibold text-gray-800">Overview</h1>
          </div>
          <button
            onClick={generateMultiPagePDF}
            disabled={isExporting}
            className="flex items-center gap-2 bg-[#80C342] hover:bg-[#6ca834] text-white px-4 py-2 rounded-md transition-colors disabled:bg-gray-400"
          >
            {isExporting ? (
              <>
                <FaSpinner className="animate-spin" />
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <FaDownload />
                <span>Export PDF (A4)</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Dashboard content with separate refs for each section */}
      <main className="p-6">
        {/* Section 1 - Top row with gauges */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          ref={section1Ref}
        >
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <EmployeeSatisfactionGauge {...data?.employee_satisfaction} />
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <VibemeterChart data={data.vibemeter_scores} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden h-full">
            <HighConcernEmployees
              employees={data.high_concern_employees}
              loading={loading}
            />
          </div>
        </div>

        {/* Section 2 - First bubble chart */}
        <div className="mt-4" ref={section2Ref}>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <AdminBubbleChart data={data.bubble_data} isLoading={loading} />
          </div>
        </div>
      </main>
    </div>
  );
}
