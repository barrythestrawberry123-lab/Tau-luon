/**
 * Utility to download the current webpage or standalone bundle as an HTML file
 */
export function exportAppAsHtml() {
  try {
    // Clone document
    const docClone = document.documentElement.cloneNode(true) as HTMLElement;

    // Remove any external live dev scripts or unnecessary tags if present
    const scripts = docClone.querySelectorAll('script[src*="vite"], script[src*="@vite"]');
    scripts.forEach((s) => s.remove());

    const htmlContent = `<!DOCTYPE html>\n${docClone.outerHTML}`;
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'cong-truong-tau-luon-vui-nhon.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Failed to export HTML:', err);
  }
}
