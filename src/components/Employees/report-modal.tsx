import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import { useState, useEffect } from "react";
  import { format, parseISO } from "date-fns";
  import { 
    BarChart2, 
    Calendar, 
    List, 
    TrendingUp, 
    ChevronLeft,
    FileText,
    CheckCircle,
    AlertCircle,
  } from "lucide-react";
  import { Skeleton } from "@/components/ui/skeleton";
  import Badge from "@/components/ui/badge";
  // Import the ReactMarkdown component
  import ReactMarkdown from 'react-markdown';
  
  interface Report {
    report_id: string;
    generated_at: string;
    content: {
      full_report: string;
      conversation_summary: {
        issues_discussed: string[];
        root_causes: {
          [key: string]: string[];
        };
        themes: string[];
      };
      recommendations: string[];
      metrics: {
        vibe_trend: string;
        performance_rating?: number | null;
        avg_work_hours?: number | null;
      };
    };
  }
  
  interface ReportModalProps {
    isOpen: boolean;
    onClose: (value: boolean) => void;
    reports: Report[];
    isLoading?: boolean;
  }
  
  export function ReportModal({ isOpen, onClose, reports, isLoading = false }: ReportModalProps) {
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  
    // Reset selected report when modal closes
    useEffect(() => {
      if (!isOpen) {
        setSelectedReport(null);
      }
    }, [isOpen]);
  
    // Function to get color based on vibe trend
    const getVibeTrendColor = (trend: string) => {
      if (!trend) return 'text-gray-500';
      
      const trendLower = trend.toLowerCase();
      if (trendLower.includes('positive') || trendLower.includes('upward')) {
        return 'text-green-600';
      } else if (trendLower.includes('negative') || trendLower.includes('downward')) {
        return 'text-red-600';
      } else if (trendLower.includes('stable')) {
        return 'text-amber-600';
      } else {
        return 'text-gray-500';
      }
    };
  
    // Function to format date in a more readable way
    const formatDate = (dateString: string) => {
      try {
        return format(parseISO(dateString), "MMM d, yyyy 'at' h:mm a");
      } catch (e) {
        return dateString;
      }
    };
  
    // Function to capitalize first letter
    const capitalize = (str: string) => {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    };
  
    // Custom renderer components for ReactMarkdown
    const MarkdownComponents = {
      // Style the headings
      h2: ({ node, ...props }) => (
        <h2 className="text-xl font-bold mb-4 mt-6" {...props} />
      ),
      h3: ({ node, ...props }) => (
        <h3 className="font-bold mt-4 mb-2" {...props} />
      ),
      // Style the paragraphs
      p: ({ node, ...props }) => (
        <p className="mb-2" {...props} />
      ),
      // Style the lists
      ul: ({ node, ...props }) => (
        <ul className="space-y-1 ml-4 mb-4" {...props} />
      ),
      li: ({ node, ...props }) => (
        <li className="flex gap-2 mb-1" {...props}>
          <span className="text-[#80c342] mr-1">•</span>
          <span>{props.children}</span>
        </li>
      ),
      // Style the strong elements (bold text)
      strong: ({ node, ...props }) => (
        <strong className="font-bold" {...props} />
      ),
    };
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl h-[80vh] max-h-[80vh] p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-xl font-bold flex items-center">
              {selectedReport ? (
                <>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedReport(null);
                    }}
                    className="mr-2 p-1 rounded-full hover:bg-gray-100"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-500" />
                  </button>
                  Report #{selectedReport.report_id.replace('RPT', '')}
                </>
              ) : (
                "Chat Summary Reports"
              )}
            </DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="h-[calc(80vh-80px)] px-6 pb-6">
            {isLoading ? (
              // Loading state
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : !selectedReport ? (
              // Reports List View
              <div className="space-y-4">
                {reports.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="mb-4 p-3 rounded-full bg-gray-100">
                      <List className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-center text-lg">No conversation reports found.</p>
                    <p className="text-gray-400 text-center text-sm mt-2">
                      Reports will appear here after employee chat interactions.
                    </p>
                  </div>
                ) : (
                  reports.map((report) => (
                    <div
                      key={report.report_id}
                      className="p-4 border rounded-lg hover:border-[#80c342] cursor-pointer transition-all hover:shadow-md bg-white"
                      onClick={() => setSelectedReport(report)}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-lg">Report #{report.report_id.replace('RPT', '')}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(report.generated_at)}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-3 rounded-md">
                          <div className="flex items-center mb-1">
                            <List className="h-4 w-4 text-[#80c342] mr-2" />
                            <p className="text-sm font-medium">Issues Discussed</p>
                          </div>
                          <p className="text-2xl font-bold">
                            {report.content.conversation_summary.issues_discussed.length}
                          </p>
                          <div className="text-xs text-gray-500 mt-1">
                            {report.content.conversation_summary.issues_discussed.length > 0 ? (
                              report.content.conversation_summary.issues_discussed.slice(0, 2).map((issue, i) => (
                                <span key={i} className="block truncate capitalize">{issue}</span>
                              ))
                            ) : (
                              <span className="text-gray-400">No issues recorded</span>
                            )}
                            {report.content.conversation_summary.issues_discussed.length > 2 && 
                              <span>+ {report.content.conversation_summary.issues_discussed.length - 2} more</span>
                            }
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-md">
                          <div className="flex items-center mb-1">
                            <BarChart2 className="h-4 w-4 text-[#80c342] mr-2" />
                            <p className="text-sm font-medium">Themes Identified</p>
                          </div>
                          <p className="text-2xl font-bold">{report.content.conversation_summary.themes.length}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {report.content.conversation_summary.themes.length > 0 ? (
                              report.content.conversation_summary.themes.slice(0, 2).map((theme, i) => (
                                <span key={i} className="px-1.5 py-0.5 bg-gray-200 rounded-full text-xs truncate max-w-full">
                                  {theme}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-gray-400">No themes identified</span>
                            )}
                            {report.content.conversation_summary.themes.length > 2 && 
                              <span className="text-xs text-gray-500">+ {report.content.conversation_summary.themes.length - 2} more</span>
                            }
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-md">
                          <div className="flex items-center mb-1">
                            <TrendingUp className="h-4 w-4 text-[#80c342] mr-2" />
                            <p className="text-sm font-medium">Vibe Trend</p>
                          </div>
                          <p className={`text-lg font-bold ${getVibeTrendColor(report.content.metrics.vibe_trend)}`}>
                            {capitalize(report.content.metrics.vibe_trend || 'No data')}
                          </p>
                          {report.content.metrics.avg_work_hours && (
                            <p className="text-xs text-gray-500 mt-1">
                              Avg hours: {report.content.metrics.avg_work_hours} hrs/day
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              // Individual Report Detail View
              <div className="space-y-6">
                {/* Summary card */}
                <div className="bg-white rounded-lg border p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="text-sm text-gray-500">Generated on</span>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-1 text-[#80c342]" />
                        {formatDate(selectedReport.generated_at)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-gray-50">
                        ID: {selectedReport.report_id}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {/* Issues and Themes */}
                <div className="bg-white rounded-lg border overflow-hidden">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-medium flex items-center">
                      <List className="h-5 w-5 text-[#80c342] mr-2" />
                      Issues & Themes
                    </h3>
                  </div>
                  
                  <div className="p-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Issues Discussed */}
                      <div>
                        <h4 className="font-medium mb-2 text-gray-700 flex items-center">
                          <span className="w-2 h-2 bg-[#80c342] rounded-full mr-2"></span>
                          Issues Discussed
                        </h4>
                        {selectedReport.content.conversation_summary.issues_discussed.length > 0 ? (
                          <ul className="space-y-1 pl-4">
                            {selectedReport.content.conversation_summary.issues_discussed.map((issue, i) => (
                              <li key={i} className="text-sm capitalize list-disc">
                                {issue}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-gray-500 italic">No issues discussed were recorded.</p>
                        )}
                      </div>
                      
                      {/* Themes */}
                      <div>
                        <h4 className="font-medium mb-2 text-gray-700 flex items-center">
                          <span className="w-2 h-2 bg-[#80c342] rounded-full mr-2"></span>
                          Themes
                        </h4>
                        {selectedReport.content.conversation_summary.themes && 
                         selectedReport.content.conversation_summary.themes.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {selectedReport.content.conversation_summary.themes.map((theme, i) => (
                              <span key={i} className="px-2.5 py-1 bg-gray-100 rounded-md text-xs">
                                {theme}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 italic">No themes were identified.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Root Causes */}
                <div className="bg-white rounded-lg border overflow-hidden">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-medium flex items-center">
                      <AlertCircle className="h-5 w-5 text-[#80c342] mr-2" />
                      Root Causes
                    </h3>
                  </div>
                  
                  <div className="p-4">
                    {selectedReport.content.conversation_summary.root_causes && 
                     Object.keys(selectedReport.content.conversation_summary.root_causes).length > 0 ? (
                      <div className="space-y-4">
                        {Object.entries(selectedReport.content.conversation_summary.root_causes).map(([category, causes]) => (
                          <div key={category} className={causes.length > 0 ? "mb-3" : "hidden"}>
                            <h4 className="font-medium text-gray-700 mb-2 capitalize flex items-center">
                              <span className="w-2 h-2 bg-[#80c342] rounded-full mr-2"></span>
                              {category}
                            </h4>
                            {causes.length > 0 ? (
                              <ul className="space-y-1 pl-4">
                                {causes.map((cause, i) => (
                                  <li key={i} className="text-sm list-disc">
                                    {cause}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-gray-500 italic">No specific causes identified.</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic">No root causes were identified.</p>
                    )}
                  </div>
                </div>
                
                {/* Metrics Section */}
                <div className="bg-white rounded-lg border overflow-hidden">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-medium flex items-center">
                      <BarChart2 className="h-5 w-5 text-[#80c342] mr-2" />
                      Metrics
                    </h3>
                  </div>
                  
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="text-sm text-gray-500 mb-1">Vibe Trend</h4>
                        <p className={`font-medium text-lg ${getVibeTrendColor(selectedReport.content.metrics.vibe_trend)}`}>
                          {capitalize(selectedReport.content.metrics.vibe_trend || 'No data')}
                        </p>
                      </div>
                      {selectedReport.content.metrics.performance_rating !== null && 
                       selectedReport.content.metrics.performance_rating !== undefined && (
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="text-sm text-gray-500 mb-1">Performance Rating</h4>
                          <div className="flex items-end gap-1">
                            <p className="font-medium text-lg">{selectedReport.content.metrics.performance_rating}</p>
                            <span className="text-sm text-gray-500">/10</span>
                          </div>
                        </div>
                      )}
                      {selectedReport.content.metrics.avg_work_hours !== null && 
                       selectedReport.content.metrics.avg_work_hours !== undefined && (
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="text-sm text-gray-500 mb-1">Avg Work Hours</h4>
                          <div className="flex items-end gap-1">
                            <p className="font-medium text-lg">{selectedReport.content.metrics.avg_work_hours}</p>
                            <span className="text-sm text-gray-500">hours/day</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Recommendations */}
                {selectedReport.content.recommendations && selectedReport.content.recommendations.length > 0 && (
                  <div className="bg-white rounded-lg border overflow-hidden">
                    <div className="p-4 border-b">
                      <h3 className="text-lg font-medium flex items-center">
                        <CheckCircle className="h-5 w-5 text-[#80c342] mr-2" />
                        Recommendations
                      </h3>
                    </div>
                    
                    <div className="p-4">
                      <ul className="space-y-2 pl-4">
                        {selectedReport.content.recommendations.map((rec, i) => (
                          <li key={i} className="text-sm list-disc">
                            {rec.startsWith('• ') ? rec.substring(2) : rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                
                {/* Full Report - Using ReactMarkdown to render the markdown content */}
                {selectedReport.content.full_report && (
                  <div className="bg-white rounded-lg border overflow-hidden">
                    <div className="p-4 border-b">
                      <h3 className="text-lg font-medium flex items-center">
                        <FileText className="h-5 w-5 text-[#80c342] mr-2" />
                        Full Report
                      </h3>
                    </div>
                    
                    <div className="p-4">
                      <div className="prose max-w-none text-sm">
                        <ReactMarkdown components={MarkdownComponents}>
                          {selectedReport.content.full_report}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }