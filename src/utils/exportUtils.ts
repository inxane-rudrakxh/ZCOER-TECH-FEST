import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export interface StudentScoreRecord {
  rank?: number;
  playerId: string;
  fullName: string;
  department: string;
  academicYear?: string;
  campaignName?: string;
  quizScore: number;
  maxQuizScore: number;
  puzzleScore?: number;
  maxPuzzleScore?: number;
  totalScore: number;
  maxTotalScore: number;
  percentage: number;
  status: 'PASS' | 'DISTINCTION' | 'NEEDS_IMPROVEMENT';
  timeTakenSeconds?: number;
  submittedAt?: string;
  answersBreakdown?: {
    questionNumber: number;
    topic: string;
    isCorrect: boolean;
    userAnswer: string;
    correctAnswer: string;
    explanation: string;
  }[];
}

/**
 * Format seconds into mm:ss string
 */
export const formatDuration = (seconds?: number): string => {
  if (!seconds || seconds <= 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Generates and downloads a master PDF report containing all student marks
 */
export const exportAllResultsPDF = (
  records: StudentScoreRecord[],
  title = "S.Y. B.Tech (AI & DS) – OOPS in C++ Assessment Results"
) => {
  const doc = new jsPDF('landscape', 'mm', 'a4');

  // Header Banner
  doc.setFillColor(33, 37, 41); // Dark background
  doc.rect(0, 0, 297, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("ZEAL COLLEGE OF ENGINEERING AND RESEARCH, PUNE", 14, 11);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(200, 200, 200);
  doc.text("Department of Artificial Intelligence & Data Science | Academic Year 2026-27", 14, 18);
  doc.text(`Report: ${title}  |  Generated: ${new Date().toLocaleString()}`, 14, 24);

  // Summary Metrics Box
  const totalCount = records.length;
  const avgScore = totalCount > 0 
    ? (records.reduce((acc, r) => acc + r.totalScore, 0) / totalCount).toFixed(1) 
    : "0";
  const maxScore = totalCount > 0 
    ? Math.max(...records.map(r => r.totalScore)).toFixed(1) 
    : "0";
  const passCount = records.filter(r => r.percentage >= 40).length;
  const passPercent = totalCount > 0 ? ((passCount / totalCount) * 100).toFixed(1) : "0";

  doc.setFillColor(245, 247, 250);
  doc.setDrawColor(200, 200, 200);
  doc.rect(14, 32, 269, 14, 'FD');

  doc.setFontSize(9);
  doc.setTextColor(50, 50, 50);
  doc.setFont("helvetica", "bold");
  doc.text(`Total Students: ${totalCount}`, 20, 41);
  doc.text(`Average Score: ${avgScore}`, 85, 41);
  doc.text(`Highest Score: ${maxScore}`, 155, 41);
  doc.text(`Pass Rate: ${passPercent}% (${passCount}/${totalCount})`, 220, 41);

  // Table Data
  const tableData = records.map((r, idx) => [
    `#${r.rank || idx + 1}`,
    r.playerId,
    r.fullName,
    `${r.department || 'AI & DS'}`,
    `${r.quizScore.toFixed(1)} / ${r.maxQuizScore}`,
    r.puzzleScore !== undefined ? `${r.puzzleScore.toFixed(1)} / ${r.maxPuzzleScore || 20}` : 'N/A',
    `${r.totalScore.toFixed(1)} / ${r.maxTotalScore}`,
    `${r.percentage.toFixed(1)}%`,
    formatDuration(r.timeTakenSeconds),
    r.status
  ]);

  autoTable(doc, {
    startY: 50,
    head: [[
      'Rank', 
      'Player ID / Roll No', 
      'Student Name', 
      'Department / Class', 
      'Quiz (/20)', 
      'Puzzle (/20)', 
      'Total Marks', 
      'Percentage', 
      'Time Taken', 
      'Result'
    ]],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [22, 101, 52], // Deep green
      textColor: 255,
      fontSize: 8.5,
      fontStyle: 'bold',
      halign: 'center'
    },
    styles: {
      fontSize: 8,
      cellPadding: 2.5,
      valign: 'middle'
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 14 },
      1: { cellWidth: 28 },
      2: { cellWidth: 50 },
      3: { cellWidth: 32 },
      4: { halign: 'center', cellWidth: 22 },
      5: { halign: 'center', cellWidth: 22 },
      6: { halign: 'center', cellWidth: 24, fontStyle: 'bold' },
      7: { halign: 'center', cellWidth: 22 },
      8: { halign: 'center', cellWidth: 20 },
      9: { halign: 'center', cellWidth: 30 }
    },
    alternateRowStyles: {
      fillColor: [248, 249, 250]
    },
    didDrawCell: (data) => {
      // Highlight Status
      if (data.section === 'body' && data.column.index === 9) {
        const text = data.cell.text[0];
        if (text === 'DISTINCTION') {
          doc.setTextColor(21, 128, 61); // Green
        } else if (text === 'PASS') {
          doc.setTextColor(30, 64, 175); // Blue
        } else {
          doc.setTextColor(185, 28, 28); // Red
        }
      }
    }
  });

  // Footer / Signature Area
  const finalY = (doc as any).lastAutoTable.finalY + 15;
  if (finalY < 185) {
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text("Verified by Subject Incharge (OOPS in C++)", 20, finalY);
    doc.text("Head of Department (AI & DS)", 140, finalY);
    doc.text("Principal / Dean Academics", 225, finalY);
  }

  const filename = `ZCOER_OOPS_Marksheet_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
};

/**
 * Generates and downloads a single student's individual official Marksheet PDF
 */
export const exportSingleStudentPDF = (record: StudentScoreRecord) => {
  const doc = new jsPDF('portrait', 'mm', 'a4');

  // Header Banner
  doc.setFillColor(33, 37, 41);
  doc.rect(0, 0, 210, 32, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("ZEAL COLLEGE OF ENGINEERING AND RESEARCH, PUNE", 14, 12);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(220, 220, 220);
  doc.text("Department of Artificial Intelligence & Data Science", 14, 18);
  doc.text("S.Y. B.Tech – Object Oriented Programming in C++ Assessment", 14, 24);

  // Student Identity Box
  doc.setFillColor(248, 249, 250);
  doc.setDrawColor(200, 200, 200);
  doc.rect(14, 38, 182, 30, 'FD');

  doc.setFontSize(10);
  doc.setTextColor(30, 30, 30);
  doc.setFont("helvetica", "bold");
  doc.text(`Student Name: ${record.fullName}`, 20, 46);
  doc.text(`Roll No / Player ID: ${record.playerId}`, 20, 53);
  doc.text(`Class / Branch: ${record.department || 'S.Y. B.Tech (AI & DS)'}`, 20, 60);

  doc.text(`Assessment Date: ${record.submittedAt ? new Date(record.submittedAt).toLocaleDateString() : new Date().toLocaleDateString()}`, 120, 46);
  doc.text(`Time Taken: ${formatDuration(record.timeTakenSeconds)}`, 120, 53);
  doc.text(`Status: ${record.status}`, 120, 60);

  // Score Highlight Cards
  const startCardY = 74;
  
  // Card 1: Quiz Score
  doc.setFillColor(239, 246, 255); // light blue
  doc.rect(14, startCardY, 56, 22, 'F');
  doc.setFontSize(8);
  doc.setTextColor(30, 64, 175);
  doc.text("QUIZ MARKS", 20, startCardY + 6);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(`${record.quizScore} / ${record.maxQuizScore}`, 20, startCardY + 16);

  // Card 2: Puzzle Score
  doc.setFillColor(240, 253, 244); // light green
  doc.rect(77, startCardY, 56, 22, 'F');
  doc.setFontSize(8);
  doc.setTextColor(21, 128, 61);
  doc.text("PUZZLE MARKS", 83, startCardY + 6);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(`${record.puzzleScore || 0} / ${record.maxPuzzleScore || 20}`, 83, startCardY + 16);

  // Card 3: Total Score & Percentage
  doc.setFillColor(254, 243, 199); // light amber
  doc.rect(140, startCardY, 56, 22, 'F');
  doc.setFontSize(8);
  doc.setTextColor(180, 83, 9);
  doc.text("TOTAL AGGREGATE", 146, startCardY + 6);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(`${record.totalScore} / ${record.maxTotalScore} (${record.percentage.toFixed(1)}%)`, 146, startCardY + 16);

  // If question breakdown is present, render table
  if (record.answersBreakdown && record.answersBreakdown.length > 0) {
    const qData = record.answersBreakdown.map(q => [
      `Q${q.questionNumber}`,
      q.topic,
      q.isCorrect ? 'CORRECT' : 'INCORRECT',
      q.userAnswer,
      q.correctAnswer,
      q.explanation
    ]);

    autoTable(doc, {
      startY: 104,
      head: [['Q#', 'Topic', 'Result', 'Selected', 'Correct', 'Concept Explanation']],
      body: qData,
      theme: 'grid',
      headStyles: {
        fillColor: [30, 41, 59],
        textColor: 255,
        fontSize: 8,
        halign: 'center'
      },
      styles: {
        fontSize: 7.5,
        cellPadding: 2,
        valign: 'middle'
      },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 24 },
        2: { cellWidth: 20, halign: 'center', fontStyle: 'bold' },
        3: { cellWidth: 24 },
        4: { cellWidth: 24 },
        5: { cellWidth: 80 }
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252]
      }
    });
  }

  const filename = `Marksheet_${record.playerId}_${record.fullName.replace(/\s+/g, '_')}.pdf`;
  doc.save(filename);
};

/**
 * Exports data into RFC 4180 compliant CSV format with UTF-8 BOM for Microsoft Excel
 */
export const exportResultsCSV = (
  records: StudentScoreRecord[],
  filename = `ZCOER_OOPS_Marks_${new Date().toISOString().slice(0, 10)}.csv`
) => {
  const headers = [
    "Rank",
    "Player ID / Roll No",
    "Full Name",
    "Department",
    "Academic Year",
    "Campaign",
    "Quiz Marks (/20)",
    "Puzzle Marks (/20)",
    "Total Marks",
    "Max Marks",
    "Percentage (%)",
    "Result Status",
    "Time Taken (Seconds)",
    "Time Formatted",
    "Submission Date"
  ];

  const escapeCSV = (val: any) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = records.map((r, idx) => [
    r.rank || idx + 1,
    r.playerId,
    r.fullName,
    r.department || "AI & DS",
    r.academicYear || "S.Y. B.Tech",
    r.campaignName || "General",
    r.quizScore,
    r.puzzleScore !== undefined ? r.puzzleScore : 0,
    r.totalScore,
    r.maxTotalScore,
    r.percentage.toFixed(2),
    r.status,
    r.timeTakenSeconds || 0,
    formatDuration(r.timeTakenSeconds),
    r.submittedAt ? new Date(r.submittedAt).toLocaleString() : new Date().toLocaleString()
  ]);

  const csvContent = "\uFEFF" + [
    headers.map(escapeCSV).join(","),
    ...rows.map(row => row.map(escapeCSV).join(","))
  ].join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

