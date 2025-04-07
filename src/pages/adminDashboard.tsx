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
import Parameter from "@/components/Admin/parameters";
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

  // Function to generate multi-page PDF
  const generateMultiPagePDF = async () => {
    setIsExporting(true);

    // Set up A4 PDF - 210 x 297mm
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    try {
      // Create a title page
      pdf.setFontSize(24);
      pdf.setTextColor(0, 163, 66); // Green color for header
      pdf.text("Dashboard Report", 105, 40, { align: "center" });

      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 50, {
        align: "center",
      });

      // Reference to all sections that need to be captured
      const sections = [section1Ref.current, section2Ref.current].filter(
        Boolean
      ); // Filter out any null refs

      // Process each section
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (!section) continue;

        // Add a new page for each section after the title page
        if (i > 0 || i === 0) {
          pdf.addPage();
        }

        // Page header for each page except title page
        pdf.setFontSize(14);
        pdf.setTextColor(0, 163, 66);
        pdf.text(`Dashboard Report - Page ${i + 1}`, 105, 15, {
          align: "center",
        });
        pdf.setDrawColor(0, 163, 66);
        pdf.line(20, 20, 190, 20);

        // Generate and add image for this section
        try {
          const dataUrl = await toPng(section, { quality: 0.95 });

          // Get the image properties and calculate dimensions
          const imgProps = pdf.getImageProperties(dataUrl);
          const pdfWidth = pdf.internal.pageSize.getWidth();

          // Calculate height to maintain aspect ratio, but constrain to page height
          let pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          const maxHeight = pdf.internal.pageSize.getHeight() - 40; // Leave margin for header/footer

          if (pdfHeight > maxHeight) {
            pdfHeight = maxHeight;
          }

          // Add the image to the PDF with correct dimensions
          pdf.addImage(dataUrl, "PNG", 0, 30, pdfWidth, pdfHeight);

          // Add footer with page number
          const pageNumber = pdf.internal.pages.length;
          pdf.setFontSize(10);
          pdf.setTextColor(100, 100, 100);
          pdf.text(`Page ${pageNumber} of ${sections.length + 1}`, 105, 287, {
            align: "center",
          });
        } catch (error) {
          console.error(`Error processing section ${i}:`, error);
        }
      }

      // Save the PDF
      pdf.save("dashboard-report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Handle error - show notification to user
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
        {/* Section 2 - Parameters */}
        <div className="mt-4" ref={section2Ref}>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Parameter />
          </div>
        </div>
        {/* Section 3 - First bubble chart */}
        <div className="mt-4" ref={section2Ref}>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <AdminBubbleChart data={data.bubble_data} isLoading={loading} />
          </div>
        </div>
      </main>
    </div>
  );
}
