import AdminBubbleChart, {
  BubbleData,
} from "@/components/Admin/AdminBubbleChart";
import EmployeeSatisfactionGauge from "@/components/Admin/employee-satisfaction";
import HighConcernEmployees from "@/components/Admin/new-high-concern-employee";
import VibemeterChart from "@/components/Admin/average-vibemeter-score";
import { FaChartBar, FaDownload, FaSpinner } from "react-icons/fa";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

export default function AdminDashboard() {
  const [isExporting, setIsExporting] = useState(false);

  // Create refs for each section to capture them individually
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);

  // Demo data for the AdminBubbleChart component
  const bubbleDemoData: BubbleData[] = [
    { name: "Workload", value: 80, description: "High workload for employees" },
    {
      name: "Engagement",
      value: 65,
      description: "Moderate engagement levels",
    },
    { name: "Team Morale", value: 30, description: "Low team morale observed" },
    { name: "Stress", value: 15, description: "Very low stress levels" },
    {
      name: "Communication",
      value: 50,
      description: "Average communication between teams",
    },
    { name: "Collaboration", value: 70, description: "Good collaboration" },
    { name: "Feedback", value: 90, description: "High feedback scores" },
    { name: "Recognition", value: 20, description: "Very low recognition" },
    { name: "Growth", value: 40, description: "Moderate growth opportunities" },
    { name: "Retention", value: 60, description: "Good retention rates" },
    { name: "Diversity", value: 75, description: "High diversity scores" },
    { name: "Inclusion", value: 85, description: "Very high inclusion scores" },
    {
      name: "Innovation",
      value: 55,
      description: "Moderate innovation levels",
    },
    {
      name: "Leadership",
      value: 45,
      description: "Average leadership quality",
    },
    { name: "Culture", value: 25, description: "Low cultural alignment" },
    { name: "Values", value: 35, description: "Moderate values alignment" },
    { name: "Vision", value: 95, description: "Very high vision alignment" },
    { name: "Mission", value: 10, description: "Very low mission alignment" },
    { name: "Strategy", value: 5, description: "Very low strategic alignment" },
    { name: "Execution", value: 55, description: "Moderate execution quality" },
    { name: "Performance", value: 65, description: "Good performance levels" },
    { name: "Accountability", value: 75, description: "High accountability" },
    { name: "Trust", value: 85, description: "Very high trust levels" },
    { name: "Transparency", value: 95, description: "Excellent transparency" },
  ];

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
              <EmployeeSatisfactionGauge />
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <VibemeterChart />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden h-full">
            <HighConcernEmployees />
          </div>
        </div>

        {/* Section 2 - First bubble chart */}
        <div className="mt-4" ref={section2Ref}>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <AdminBubbleChart data={bubbleDemoData} />
          </div>
        </div>
      </main>
    </div>
  );
}
