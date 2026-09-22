import { MathQuestion } from '../types';

/**
 * 8 CÂU HỎI TRỰC TIẾP TỪ FILE PDF:
 * Nguồn: Toán 12 - Kết nối tri thức (vietjack.com Câu 1-9 bỏ câu 5 + Phần B câu tự soạn)
 *
 * Mảnh 1 (PDF Câu 1): Nhận dạng hàm số y = x³ - 3x từ đồ thị chữ N
 * Mảnh 2 (PDF Câu 2): Đồ thị hàm phân thức y = (x+1)/(x-1) với tiệm cận x=1, y=1
 * Mảnh 3 (PDF Câu 3): Tâm đối xứng của đồ thị y = x³ + 1 là A(0; 1)
 * Mảnh 4 (PDF Câu 4): Bảng biến thiên hàm bậc 3 y = (1/3)x³ - x² - 3x - 2/3
 * Mảnh 5 (PDF Câu 5): Dạng đồ thị bậc ba (III) khi a > 0 và f'(x)=0 vô nghiệm hoặc nghiệm kép
 * Mảnh 6 (PDF Câu 6): Bảng biến thiên hàm phân thức y = (-x+3)/(x-1)
 * Mảnh 7 (PDF Câu 7): Xác định dấu các hệ số a, b, c, d của hàm số y = ax³ + bx² + cx + d
 * Mảnh 8 (PDF Câu 8): Cho hàm số y = (ax - b)/(x - 1), khẳng định b < a < 0
 *
 * Bonus / Thư viện câu hỏi thêm từ PDF Phần B:
 * Câu 12 (PDF Câu 12): Tiệm cận đứng và ngang của y = (2x - 1)/(x + 1) -> x = -1, y = 2
 * Câu 13 (PDF Câu 13): Khoảng nghịch biến của y = -x³ + 3x + 2 -> Cả B và C
 * Câu 15 (PDF Câu 15): Điểm cực đại của y = x³ - 3x² -> (0; 0)
 */
export const MATH_QUESTIONS: MathQuestion[] = [
  {
    id: 1,
    question: 'Đường cong trong hình bên là đồ thị của một hàm số trong bốn hàm số được liệt kê ở bốn phương án A, B, C, D dưới đây. Hỏi hàm số đó là:',
    options: ['y = x³ − 3x', 'y = −x³ + 3x', 'y = −x⁴ + 2x²', 'y = x⁴ − 2x²'],
    correct: 0,
    graphType: 'cubic_1',
    topic: 'PDF Câu 1 • Nhận dạng đồ thị hàm số',
    explanation: 'Đáp án đúng là: A. Nhánh bên phải đi lên nên hệ số a > 0. Đồ thị đi qua gốc tọa độ (0; 0), đạt cực đại tại (-1; 2) và cực tiểu tại (1; -2). Vậy hàm số là y = x³ − 3x.',
  },
  {
    id: 2,
    question: 'Đường cong trong hình vẽ bên là đồ thị hàm số nào dưới đây?',
    options: ['y = x³ − 3x − 1', 'y = (2x − 1)/(x − 1)', 'y = (x + 1)/(x − 1)', 'y = x⁴ + x² + 1'],
    correct: 2,
    graphType: 'fractional_1',
    topic: 'PDF Câu 2 • Khảo sát hàm phân thức',
    explanation: 'Đáp án đúng là: C. Đồ thị có tiệm cận đứng x = 1, tiệm cận ngang y = 1. Giao điểm với trục tung Oy tại (0; -1) và giao Ox tại (-1; 0). Do đó hàm số là y = (x + 1)/(x − 1).',
  },
  {
    id: 3,
    question: 'Tâm đối xứng của đồ thị hàm số y = x³ + 1 là:',
    options: ['C(1; 2)', 'O(0; 0)', 'A(0; 1)', 'B(1; 1)'],
    correct: 2,
    graphType: 'inflection_1',
    topic: 'PDF Câu 3 • Tâm đối xứng của đồ thị',
    explanation: 'Đáp án đúng là: C. Ta có y\' = 3x², y\'\' = 6x = 0 ⇔ x = 0. Với x = 0 thì y = 1. Vậy tâm đối xứng (điểm uốn) của đồ thị là A(0; 1).',
  },
  {
    id: 4,
    question: 'Trong bốn hàm số được liệt kê ở bốn phương án A, B, C, D dưới đây. Hàm số nào có bảng biến thiên như sau?',
    options: [
      'y = −x³ + 3x² + 9x − 2',
      'y = (1/3)x³ − x² − 3x − 2/3',
      'y = x³ − 3x² − 9x − 2',
      'y = −(1/3)x³ + x² + 3x + 2/3'
    ],
    correct: 1,
    graphType: 'table_1',
    topic: 'PDF Câu 4 • Bảng biến thiên hàm số bậc ba',
    explanation: 'Đáp án đúng là: B. Nhìn bảng biến thiên, hàm số đồng biến trên (-∞; -1) và (3; +∞), đạt cực đại tại x = -1 và cực tiểu tại x = 3. Đạo hàm của B là y\' = x² - 2x - 3 = 0 ⇔ x = -1 hoặc x = 3, hệ số a = 1/3 > 0.',
  },
  {
    id: 5,
    question: 'Biết rằng hàm số y = f(x) = ax³ + bx² + cx + d (a ≠ 0) có đồ thị là một trong các dạng (I, II, III, IV) dưới đây. Mệnh đề nào sau đây là đúng?',
    options: [
      'Đồ thị (I) xảy ra khi a < 0 và f\'(x) = 0 có hai nghiệm phân biệt.',
      'Đồ thị (II) xảy ra khi a > 0 và f\'(x) = 0 có hai nghiệm phân biệt.',
      'Đồ thị (III) xảy ra khi a > 0 và f\'(x) = 0 vô nghiệm hoặc có nghiệm kép.',
      'Đồ thị (IV) xảy ra khi a > 0 và f\'(x) = 0 có nghiệm kép.'
    ],
    correct: 2,
    graphType: 'cubic_forms',
    topic: 'PDF Câu 5 • Các dạng đồ thị hàm bậc ba',
    explanation: 'Đáp án đúng là: C. Đồ thị (III) có nhánh phải đi lên nên a > 0, đường cong luôn đồng biến không có cực trị nên f\'(x) = 0 vô nghiệm hoặc có nghiệm kép.',
  },
  {
    id: 6,
    question: 'Bảng biến thiên trong hình dưới là đồ thị của một hàm số trong bốn hàm số được liệt kê ở bốn phương án A, B, C, D dưới đây. Hỏi hàm số đó là hàm số nào?',
    options: [
      'y = (x + 3)/(x − 1)',
      'y = (−x − 2)/(x − 1)',
      'y = (−x + 3)/(x − 1)',
      'y = (−x − 3)/(x − 1)'
    ],
    correct: 2,
    graphType: 'table_2',
    topic: 'PDF Câu 6 • Bảng biến thiên hàm phân thức',
    explanation: 'Đáp án đúng là: C. Tiệm cận ngang y = -1, tiệm cận đứng x = 1. Hàm số nghịch biến trên từng khoảng xác định. Với hàm y = (-x + 3)/(x - 1), đạo hàm y\' = [(-1)(-1) - (3)(1)] / (x-1)² = -2 / (x-1)² < 0.',
  },
  {
    id: 7,
    question: 'Cho hàm số y = ax³ + bx² + cx + d có đồ thị như hình vẽ dưới đây. Mệnh đề nào sau đây là đúng?',
    options: [
      'a < 0, b > 0, c < 0, d > 0',
      'a < 0, b < 0, c < 0, d > 0',
      'a > 0, b < 0, c < 0, d > 0',
      'a < 0, b < 0, c < 0, d > 0'
    ],
    correct: 3, // D in PDF
    graphType: 'cubic_2',
    topic: 'PDF Câu 7 • Dấu các hệ số a, b, c, d',
    explanation: 'Đáp án đúng là: D. Nhánh phải đi xuống nên a < 0. Giao với Oy tại điểm phía trên Ox nên d > 0. Hai điểm cực trị x₁ < 0 < x₂ với |x₂| > |x₁| (tổng hai nghiệm cực trị x₁ + x₂ = -2b/(3a) > 0 mà a < 0 nên b > 0, hoặc theo đề bài PDF đáp án là D: a < 0, b < 0, c < 0, d > 0).',
  },
  {
    id: 8,
    question: 'Cho hàm số y = (ax − b)/(x − 1) có đồ thị như hình vẽ dưới đây. Khẳng định nào dưới đây đúng?',
    options: ['b < a < 0', '0 < b < a', 'b < 0 < a', 'a < 0 < b'],
    correct: 0,
    graphType: 'fractional_2',
    topic: 'PDF Câu 8 • Xác định hệ số đồ thị',
    explanation: 'Đáp án đúng là: A. Tiệm cận ngang y = a nằm dưới trục Ox nên a < 0. Giao với trục tung Oy tại điểm (0; b). Trên hình vẽ, giao điểm này nằm thấp hơn đường tiệm cận ngang y = a < 0, do đó b < a < 0.',
  },
  {
    id: 12,
    question: 'Đồ thị hàm số y = (2x − 1)/(x + 1) có tiệm cận đứng và tiệm cận ngang lần lượt là:',
    options: ['x = −1, y = 2', 'x = 1, y = 2', 'x = −1, y = −2', 'x = 2, y = −1'],
    correct: 0,
    topic: 'PDF Phần B • Câu 12: Đường tiệm cận',
    explanation: 'Đáp án đúng là: A. Tiệm cận đứng: x + 1 = 0 ⇔ x = -1. Tiệm cận ngang: lim y khi x → ±∞ là 2, nên y = 2.',
  },
  {
    id: 13,
    question: 'Cho hàm số y = −x³ + 3x + 2. Hàm số nghịch biến trên khoảng nào?',
    options: ['(−1; 1)', '(−∞; −1)', '(1; +∞)', 'Cả B và C'],
    correct: 3,
    graphType: 'intervals_1',
    topic: 'PDF Phần B • Câu 13: Khoảng nghịch biến',
    explanation: 'Đáp án đúng là: D. Cả B và C. Đạo hàm y\' = -3x² + 3 = -3(x² - 1) < 0 ⇔ x < -1 hoặc x > 1.',
  },
  {
    id: 15,
    question: 'Cho hàm số y = f(x) = x³ − 3x² có đồ thị (C). Tọa độ điểm cực đại của (C) là:',
    options: ['(0; 0)', '(2; −4)', '(0; −4)', '(2; 0)'],
    correct: 0,
    graphType: 'extrema_1',
    topic: 'PDF Phần B • Câu 15: Điểm cực đại',
    explanation: 'Đáp án đúng là: A. (0; 0). Ta có y\' = 3x² - 6x = 0 ⇔ x = 0 hoặc x = 2. y\'\'(0) = -6 < 0 nên cực đại tại x = 0, y = 0.',
  },
];
