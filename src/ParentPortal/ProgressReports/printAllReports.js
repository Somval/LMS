import { buildReportHtml } from "./reportData";

// One document holding every monthly report (newest first), for "Download Full Report".
// Opens the browser print dialog; choose "Save as PDF" to get the file.
export const printAllReports = (reports, student, generatedAt) => {
  const pages = reports.map((report) => buildReportHtml(report, student, generatedAt));
  const head = pages[0].split("</head>")[0] + "</head><body>";
  const bodies = pages
    .map((html) => html.split("<body>")[1].split("</body>")[0])
    .join('<div style="page-break-after:always"></div>');
  const html = `${head}${bodies}</body></html>`;

  const frame = document.createElement("iframe");
  frame.setAttribute("aria-hidden", "true");
  frame.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;";
  document.body.appendChild(frame);

  const doc = frame.contentWindow.document;
  doc.open();
  doc.write(html);
  doc.close();

  setTimeout(() => {
    frame.contentWindow.focus();
    frame.contentWindow.print();
    setTimeout(() => frame.remove(), 60000);
  }, 150);
};
