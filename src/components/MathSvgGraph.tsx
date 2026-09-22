import React from 'react';

interface MathSvgGraphProps {
  graphType?: string;
}

export const MathSvgGraph: React.FC<MathSvgGraphProps> = ({ graphType }) => {
  if (!graphType) return null;

  switch (graphType) {
    case 'cubic_1':
      // PDF CÂU 1: Đồ thị hàm số y = x^3 - 3x
      return (
        <div className="bg-white p-3 rounded-2xl border-2 border-amber-200/80 shadow-md flex flex-col items-center">
          <div className="text-[11px] font-bold text-amber-900 mb-1">
            Hình vẽ câu 1: Đồ thị hàm số trên hệ trục Oxy
          </div>
          <svg viewBox="-140 -120 280 240" className="w-full max-w-[320px] h-[190px] overflow-visible">
            {/* Grid & background */}
            <rect x="-135" y="-115" width="270" height="230" fill="#fefdfa" rx="12" stroke="#fef3c7" strokeWidth="1" />

            {/* Axes */}
            <line x1="-130" y1="0" x2="130" y2="0" stroke="#334155" strokeWidth="1.8" />
            <polygon points="130,0 120,-4 120,4" fill="#334155" />
            <text x="132" y="4" fontSize="12" fill="#1e293b" fontWeight="bold">x</text>

            <line x1="0" y1="110" x2="0" y2="-110" stroke="#334155" strokeWidth="1.8" />
            <polygon points="0,-110 -4,-100 4,-100" fill="#334155" />
            <text x="7" y="-103" fontSize="12" fill="#1e293b" fontWeight="bold">y</text>
            <text x="-12" y="14" fontSize="11" fill="#475569">O</text>

            {/* Critical points matching PDF screenshot: (-1; 2) and (1; -2) */}
            {/* (-1, 2): x = -45, y = -70 */}
            <line x1="-45" y1="0" x2="-45" y2="-70" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3 3" />
            <line x1="0" y1="-70" x2="-45" y2="-70" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3 3" />
            <circle cx="-45" cy="-70" r="3.5" fill="#f97316" />
            <text x="-52" y="14" fontSize="11" fill="#1e293b" fontWeight="bold">-1</text>
            <text x="5" y="-66" fontSize="11" fill="#1e293b" fontWeight="bold">2</text>

            {/* (1, -2): x = 45, y = 70 */}
            <line x1="45" y1="0" x2="45" y2="70" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3 3" />
            <line x1="0" y1="70" x2="45" y2="70" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3 3" />
            <circle cx="45" cy="70" r="3.5" fill="#f97316" />
            <text x="42" y="-6" fontSize="11" fill="#1e293b" fontWeight="bold">1</text>
            <text x="-18" y="74" fontSize="11" fill="#1e293b" fontWeight="bold">-2</text>

            {/* Cubic Curve y = x^3 - 3x (chữ N chuẩn toán học như trong PDF) */}
            <path
              d="M -95 105 C -82 -10 -70 -75 -45 -70 C -20 -65 -15 -10 0 0 C 15 10 20 65 45 70 C 70 75 82 10 95 -105"
              fill="none"
              stroke="#0284c7"
              strokeWidth="2.8"
            />
          </svg>
        </div>
      );

    case 'fractional_1':
      // PDF CÂU 2: Đồ thị hàm phân thức y = (x+1)/(x-1)
      return (
        <div className="bg-white p-3 rounded-2xl border-2 border-amber-200/80 shadow-md flex flex-col items-center">
          <div className="text-[11px] font-bold text-amber-900 mb-1">
            Hình vẽ câu 2: Đồ thị hàm phân thức với hai nhánh màu xanh lá
          </div>
          <svg viewBox="-140 -120 280 240" className="w-full max-w-[320px] h-[190px] overflow-visible">
            <rect x="-135" y="-115" width="270" height="230" fill="#fefdfa" rx="12" stroke="#fef3c7" strokeWidth="1" />

            {/* Axes */}
            <line x1="-130" y1="0" x2="130" y2="0" stroke="#334155" strokeWidth="1.8" />
            <polygon points="130,0 120,-4 120,4" fill="#334155" />
            <text x="132" y="4" fontSize="12" fill="#1e293b" fontWeight="bold">x</text>

            <line x1="0" y1="110" x2="0" y2="-110" stroke="#334155" strokeWidth="1.8" />
            <polygon points="0,-110 -4,-100 4,-100" fill="#334155" />
            <text x="7" y="-103" fontSize="12" fill="#1e293b" fontWeight="bold">y</text>
            <text x="-12" y="14" fontSize="11" fill="#475569">O</text>

            {/* Asymptotes matching PDF: Tiệm cận đứng x = 1, Tiệm cận ngang y = 1 */}
            {/* x = 1 (scale 35px) */}
            <line x1="35" y1="-110" x2="35" y2="110" stroke="#000000" strokeWidth="1.5" />
            <text x="39" y="14" fontSize="11" fill="#000000" fontWeight="bold">1</text>

            {/* y = 1 (scale y = -35px) */}
            <line x1="-130" y1="-35" x2="130" y2="-35" stroke="#000000" strokeWidth="1.5" />
            <text x="-12" y="-38" fontSize="11" fill="#000000" fontWeight="bold">1</text>

            {/* Intercepts: (0, -1) and (-1, 0) */}
            <text x="5" y="38" fontSize="11" fill="#000000" fontWeight="bold">-1</text>
            <text x="-48" y="14" fontSize="11" fill="#000000" fontWeight="bold">-1</text>

            {/* Left Branch (x < 1): Passes through (-1, 0) and (0, -1), approaching y=1 and x=1 */}
            <path
              d="M -130 -30 Q -60 -28 -35 0 T 26 110"
              fill="none"
              stroke="#16a34a"
              strokeWidth="2.8"
            />

            {/* Right Branch (x > 1): Starts from top near x=1, curves toward y=1 */}
            <path
              d="M 44 -110 Q 52 -45 75 -40 T 130 -37"
              fill="none"
              stroke="#16a34a"
              strokeWidth="2.8"
            />
          </svg>
        </div>
      );

    case 'inflection_1':
      // PDF CÂU 3: Đồ thị hàm số y = x^3 + 1 với tâm đối xứng A(0; 1)
      return (
        <div className="bg-white p-3 rounded-2xl border-2 border-amber-200/80 shadow-md flex flex-col items-center">
          <div className="text-[11px] font-bold text-amber-900 mb-1">
            Hình minh họa câu 3: Đồ thị y = x³ + 1 và tâm đối xứng A(0; 1)
          </div>
          <svg viewBox="-120 -100 240 200" className="w-full max-w-[280px] h-[160px] overflow-visible">
            <rect x="-115" y="-95" width="230" height="190" fill="#fefdfa" rx="10" stroke="#fef3c7" />
            <line x1="-110" y1="0" x2="110" y2="0" stroke="#334155" strokeWidth="1.5" />
            <polygon points="110,0 102,-3 102,3" fill="#334155" />
            <text x="112" y="4" fontSize="11" fill="#1e293b" fontWeight="bold">x</text>

            <line x1="0" y1="90" x2="0" y2="-90" stroke="#334155" strokeWidth="1.5" />
            <polygon points="0,-90 -3,-82 3,-82" fill="#334155" />
            <text x="6" y="-83" fontSize="11" fill="#1e293b" fontWeight="bold">y</text>
            <text x="-10" y="14" fontSize="10" fill="#64748b">O</text>

            {/* Inflection point A(0, 1) */}
            <circle cx="0" cy="-35" r="4.5" fill="#f97316" stroke="#9a3412" strokeWidth="1.5" />
            <text x="8" y="-32" fontSize="11" fill="#ea580c" fontWeight="bold">A(0; 1)</text>

            {/* y = x^3 + 1 */}
            <path
              d="M -75 80 C -55 40 -30 -35 0 -35 C 30 -35 55 -50 75 -80"
              fill="none"
              stroke="#0284c7"
              strokeWidth="2.5"
            />
          </svg>
        </div>
      );

    case 'table_1':
      // PDF CÂU 4: Bảng biến thiên chính xác từ file PDF
      return (
        <div className="bg-white p-3 rounded-2xl border-2 border-amber-200/80 shadow-md overflow-x-auto">
          <div className="text-[11px] font-bold text-amber-900 mb-2 text-center">
            Bảng biến thiên câu 4 (Toán 12)
          </div>
          <table className="w-full text-xs text-center border-collapse border border-slate-300">
            <thead>
              <tr className="border-b border-slate-300">
                <th className="p-2 border-r border-slate-300 font-bold text-slate-800 bg-amber-50 w-16">x</th>
                <th className="p-2 font-normal text-slate-600">−∞</th>
                <th className="p-2 font-bold text-slate-800">−1</th>
                <th className="p-2 font-normal text-slate-600"></th>
                <th className="p-2 font-bold text-slate-800">3</th>
                <th className="p-2 font-normal text-slate-600">+∞</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-300">
                <td className="p-2 border-r border-slate-300 font-bold text-slate-800 bg-amber-50">y'</td>
                <td className="p-2 text-slate-700 font-bold">+</td>
                <td className="p-2 text-slate-700 font-bold">0</td>
                <td className="p-2 text-slate-700 font-bold">−</td>
                <td className="p-2 text-slate-700 font-bold">0</td>
                <td className="p-2 text-slate-700 font-bold">+</td>
              </tr>
              <tr>
                <td className="p-3 border-r border-slate-300 font-bold text-slate-800 bg-amber-50">y</td>
                <td className="p-3 text-slate-500 text-left align-bottom">−∞</td>
                <td className="p-3 font-bold text-slate-900 align-top">
                  <div className="text-sm">↗ 1</div>
                </td>
                <td className="p-3 text-slate-400">↘</td>
                <td className="p-3 font-bold text-slate-900 align-bottom">
                  <div className="text-sm">−29/3</div>
                </td>
                <td className="p-3 text-slate-500 text-right align-top">↗ +∞</td>
              </tr>
            </tbody>
          </table>
        </div>
      );

    case 'cubic_forms':
      // PDF CÂU 5: 4 dạng đồ thị hàm bậc ba (I, II, III, IV)
      return (
        <div className="bg-white p-3 rounded-2xl border-2 border-amber-200/80 shadow-md">
          <div className="text-[11px] font-bold text-amber-900 mb-2 text-center">
            Các dạng đồ thị (I, II, III, IV) - Hình vẽ câu 5 PDF
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* (I) */}
            <div className="bg-slate-50 p-2 rounded-xl text-center border border-slate-200">
              <div className="text-[11px] font-bold text-slate-700 mb-1">(I)</div>
              <svg viewBox="0 0 100 80" className="w-full h-16">
                <line x1="5" y1="50" x2="95" y2="50" stroke="#475569" strokeWidth="1.2" />
                <line x1="45" y1="75" x2="45" y2="5" stroke="#475569" strokeWidth="1.2" />
                <path d="M 15 65 C 28 15, 38 15, 50 40 C 62 65, 72 65, 85 15" fill="none" stroke="#1e293b" strokeWidth="2" />
              </svg>
            </div>
            {/* (II) */}
            <div className="bg-slate-50 p-2 rounded-xl text-center border border-slate-200">
              <div className="text-[11px] font-bold text-slate-700 mb-1">(II)</div>
              <svg viewBox="0 0 100 80" className="w-full h-16">
                <line x1="5" y1="50" x2="95" y2="50" stroke="#475569" strokeWidth="1.2" />
                <line x1="45" y1="75" x2="45" y2="5" stroke="#475569" strokeWidth="1.2" />
                <path d="M 15 15 C 28 65, 38 65, 50 40 C 62 15, 72 15, 85 65" fill="none" stroke="#1e293b" strokeWidth="2" />
              </svg>
            </div>
            {/* (III) */}
            <div className="bg-amber-50 p-2 rounded-xl text-center border-2 border-amber-300">
              <div className="text-[11px] font-black text-amber-900 mb-1">(III)</div>
              <svg viewBox="0 0 100 80" className="w-full h-16">
                <line x1="5" y1="50" x2="95" y2="50" stroke="#475569" strokeWidth="1.2" />
                <line x1="45" y1="75" x2="45" y2="5" stroke="#475569" strokeWidth="1.2" />
                <path d="M 15 70 C 35 60, 42 40, 50 40 C 58 40, 65 20, 85 10" fill="none" stroke="#0284c7" strokeWidth="2.5" />
              </svg>
            </div>
            {/* (IV) */}
            <div className="bg-slate-50 p-2 rounded-xl text-center border border-slate-200">
              <div className="text-[11px] font-bold text-slate-700 mb-1">(IV)</div>
              <svg viewBox="0 0 100 80" className="w-full h-16">
                <line x1="5" y1="50" x2="95" y2="50" stroke="#475569" strokeWidth="1.2" />
                <line x1="45" y1="75" x2="45" y2="5" stroke="#475569" strokeWidth="1.2" />
                <path d="M 15 10 C 35 20, 42 40, 50 40 C 58 40, 65 60, 85 70" fill="none" stroke="#1e293b" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      );

    case 'table_2':
      // PDF CÂU 6: Bảng biến thiên hàm phân thức nghịch biến
      return (
        <div className="bg-white p-3 rounded-2xl border-2 border-amber-200/80 shadow-md overflow-x-auto">
          <div className="text-[11px] font-bold text-amber-900 mb-2 text-center">
            Bảng biến thiên câu 6 (Toán 12)
          </div>
          <table className="w-full text-xs text-center border-collapse border border-slate-300">
            <thead>
              <tr className="border-b border-slate-300">
                <th className="p-2 border-r border-slate-300 font-bold text-slate-800 bg-amber-50 w-16">x</th>
                <th className="p-2 font-normal text-slate-600">−∞</th>
                <th className="p-2 font-normal text-slate-600"></th>
                <th className="p-2 font-bold text-slate-800">1</th>
                <th className="p-2 font-normal text-slate-600"></th>
                <th className="p-2 font-normal text-slate-600">+∞</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-300">
                <td className="p-2 border-r border-slate-300 font-bold text-slate-800 bg-amber-50">y'</td>
                <td className="p-2"></td>
                <td className="p-2 text-slate-700 font-bold">−</td>
                <td className="p-2 text-slate-700 font-bold border-x border-slate-300">||</td>
                <td className="p-2 text-slate-700 font-bold">−</td>
                <td className="p-2"></td>
              </tr>
              <tr>
                <td className="p-3 border-r border-slate-300 font-bold text-slate-800 bg-amber-50">y</td>
                <td className="p-3 text-slate-600 align-top">−1</td>
                <td className="p-3 text-slate-400">↘</td>
                <td className="p-3 font-mono text-slate-500 border-x border-slate-300">
                  <div className="flex justify-around text-[10px] gap-1">
                    <span className="text-slate-600">−∞</span>
                    <span>||</span>
                    <span className="text-slate-600">+∞</span>
                  </div>
                </td>
                <td className="p-3 text-slate-400">↘</td>
                <td className="p-3 text-slate-600 align-bottom">−1</td>
              </tr>
            </tbody>
          </table>
        </div>
      );

    case 'cubic_2':
      // PDF CÂU 7: Đồ thị hàm số y = ax³ + bx² + cx + d
      return (
        <div className="bg-white p-3 rounded-2xl border-2 border-amber-200/80 shadow-md flex flex-col items-center">
          <div className="text-[11px] font-bold text-amber-900 mb-1">
            Hình vẽ câu 7: Đồ thị hàm bậc ba với hai cực trị x₁, x₂
          </div>
          <svg viewBox="-140 -120 280 240" className="w-full max-w-[320px] h-[190px] overflow-visible">
            <rect x="-135" y="-115" width="270" height="230" fill="#fefdfa" rx="12" stroke="#fef3c7" />

            {/* Axes */}
            <line x1="-130" y1="0" x2="130" y2="0" stroke="#334155" strokeWidth="1.8" />
            <polygon points="130,0 120,-4 120,4" fill="#334155" />
            <text x="132" y="4" fontSize="12" fill="#1e293b" fontWeight="bold">x</text>

            {/* y-axis is placed to the left so x1 > 0 or x1, x2 on right */}
            {/* In PDF: y-axis is placed, curve drops from left high y, passes Oy above Ox (d > 0), dips to min x1, rises to max x2, drops down */}
            <line x1="-50" y1="110" x2="-50" y2="-110" stroke="#334155" strokeWidth="1.8" />
            <polygon points="-50,-110 -54,-100 -46,-100" fill="#334155" />
            <text x="-43" y="-103" fontSize="12" fill="#1e293b" fontWeight="bold">y</text>
            <text x="-62" y="14" fontSize="11" fill="#475569">O</text>

            {/* Curve: y-intercept d > 0, local min at x1, local max at x2, a < 0 */}
            <path
              d="M -60 -105 C -55 -40 -40 45 -20 45 C 5 45 25 -40 50 -40 C 70 -40 85 40 95 105"
              fill="none"
              stroke="#0f172a"
              strokeWidth="2.5"
            />

            {/* Dashed line to x1 and x2 */}
            <line x1="-20" y1="0" x2="-20" y2="45" stroke="#64748b" strokeWidth="1.2" strokeDasharray="3 3" />
            <text x="-24" y="60" fontSize="11" fill="#0f172a">x₁</text>

            <line x1="50" y1="0" x2="50" y2="-40" stroke="#64748b" strokeWidth="1.2" strokeDasharray="3 3" />
            <text x="46" y="14" fontSize="11" fill="#0f172a">x₂</text>
          </svg>
        </div>
      );

    case 'fractional_2':
      // PDF CÂU 8: Đồ thị hàm phân thức y = (ax - b)/(x - 1)
      return (
        <div className="bg-white p-3 rounded-2xl border-2 border-amber-200/80 shadow-md flex flex-col items-center">
          <div className="text-[11px] font-bold text-amber-900 mb-1">
            Hình vẽ câu 8: Đồ thị y = (ax − b)/(x − 1) với tiệm cận ngang dưới Ox
          </div>
          <svg viewBox="-140 -120 280 240" className="w-full max-w-[320px] h-[190px] overflow-visible">
            <rect x="-135" y="-115" width="270" height="230" fill="#fefdfa" rx="12" stroke="#fef3c7" />

            {/* Axes */}
            <line x1="-130" y1="0" x2="130" y2="0" stroke="#334155" strokeWidth="1.8" />
            <polygon points="130,0 120,-4 120,4" fill="#334155" />
            <text x="132" y="4" fontSize="12" fill="#1e293b" fontWeight="bold">x</text>

            <line x1="-40" y1="110" x2="-40" y2="-110" stroke="#334155" strokeWidth="1.8" />
            <polygon points="-40,-110 -44,-100 -36,-100" fill="#334155" />
            <text x="-33" y="-103" fontSize="12" fill="#1e293b" fontWeight="bold">y</text>
            <text x="-52" y="14" fontSize="11" fill="#475569">O</text>

            {/* Asymptotes: x = 1 (vertical dashed), y = a < 0 (horizontal dashed) */}
            <line x1="-15" y1="-110" x2="-15" y2="110" stroke="#475569" strokeWidth="1.2" strokeDasharray="4 3" />
            <text x="-18" y="14" fontSize="10" fill="#475569">1</text>

            <line x1="-130" y1="30" x2="130" y2="30" stroke="#475569" strokeWidth="1.2" strokeDasharray="4 3" />
            <text x="-60" y="27" fontSize="10" fill="#475569">-1</text>

            {/* y-intercept (0; b) below y = a (at y = -2 in PDF: -2 below -1) */}
            <circle cx="-40" cy="55" r="3.5" fill="#f97316" />
            <text x="-52" y="58" fontSize="10" fill="#0f172a" fontWeight="bold">-2</text>

            {/* x-intercept (2; 0) on Ox in right branch */}
            <circle cx="20" cy="0" r="3.5" fill="#f97316" />
            <text x="20" y="-6" fontSize="10" fill="#0f172a" fontWeight="bold">2</text>

            {/* Left branch: starts from horizontal asymptote on left, passes (0, -2), plunges down */}
            <path
              d="M -130 35 Q -70 38 -40 55 T -22 110"
              fill="none"
              stroke="#0f172a"
              strokeWidth="2.2"
            />

            {/* Right branch: drops from top near x=1, passes (2, 0) and approaches horizontal asymptote */}
            <path
              d="M -8 -110 Q 0 -10 20 0 T 130 25"
              fill="none"
              stroke="#0f172a"
              strokeWidth="2.2"
            />
          </svg>
        </div>
      );

    case 'intervals_1':
      // PDF Phần B Câu 13
      return (
        <div className="bg-white p-3 rounded-2xl border-2 border-amber-200/80 shadow-md flex flex-col items-center">
          <div className="text-[11px] font-bold text-amber-900 mb-1">
            Đồ thị hàm số y = −x³ + 3x + 2
          </div>
          <svg viewBox="-120 -100 240 200" className="w-full max-w-[280px] h-[160px]">
            <rect x="-115" y="-95" width="230" height="190" fill="#fefdfa" rx="10" />
            <line x1="-110" y1="0" x2="110" y2="0" stroke="#475569" strokeWidth="1.5" />
            <line x1="0" y1="90" x2="0" y2="-90" stroke="#475569" strokeWidth="1.5" />
            <text x="112" y="4" fontSize="11" fill="#334155" fontWeight="bold">x</text>
            <text x="6" y="-83" fontSize="11" fill="#334155" fontWeight="bold">y</text>
            <path
              d="M -75 -80 C -55 20 -40 40 -25 0 C -10 -40 10 -40 25 -40 C 40 -40 55 20 75 80"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2.5"
            />
          </svg>
        </div>
      );

    case 'extrema_1':
      // PDF Phần B Câu 15
      return (
        <div className="bg-white p-3 rounded-2xl border-2 border-amber-200/80 shadow-md flex flex-col items-center">
          <div className="text-[11px] font-bold text-amber-900 mb-1">
            Đồ thị y = x³ − 3x² với điểm cực đại tại gốc O(0; 0)
          </div>
          <svg viewBox="-120 -100 240 200" className="w-full max-w-[280px] h-[160px]">
            <rect x="-115" y="-95" width="230" height="190" fill="#fefdfa" rx="10" />
            <line x1="-110" y1="0" x2="110" y2="0" stroke="#475569" strokeWidth="1.5" />
            <line x1="0" y1="90" x2="0" y2="-90" stroke="#475569" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="4.5" fill="#ef4444" />
            <text x="6" y="-6" fontSize="11" fill="#ef4444" fontWeight="bold">Cực đại (0; 0)</text>
            <circle cx="50" cy="50" r="4" fill="#0284c7" />
            <text x="56" y="55" fontSize="10" fill="#0284c7">Cực tiểu (2; −4)</text>
            <path
              d="M -60 70 C -35 15 -15 0 0 0 C 15 0 35 50 50 50 C 65 50 75 0 90 -80"
              fill="none"
              stroke="#0284c7"
              strokeWidth="2.5"
            />
          </svg>
        </div>
      );

    default:
      return null;
  }
};
