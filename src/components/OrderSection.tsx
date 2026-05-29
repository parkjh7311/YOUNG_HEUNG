import { useState, useEffect, FormEvent } from 'react';
import { 
  Phone, 
  ShieldCheck, 
  User, 
  PhoneCall, 
  PlusCircle, 
} from 'lucide-react';
import { Inquiry } from '../types';

const DEFAULT_INQUIRIES: Inquiry[] = [
  {
    name: "강*욱 (경북 대원농공)",
    phone: "010-****-5524",
    category: "조합 완제품 주문 문의",
    message: "YH88A 밀차 조립 세트 대량 납품 계약 관련하여 추가 부속 호스 연결용 커넥터 가공 시안을 요청드립니다. 트랙터 배수구에 직결할 수 있도록 소켓 구경 맞춤 제작이 가능한지 궁금합니다.",
    createdAt: "2026-05-28 10:24"
  }
];

export default function OrderSection() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('동력분무기 문의');
  const [message, setMessage] = useState('');

  // Restore inquiries on mount (keep state tracking in localStorage to maintain logic)
  useEffect(() => {
    const saved = localStorage.getItem('yh_board_inquiries');
    if (saved) {
      try {
        setInquiries(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse board inquiries", e);
        setInquiries(DEFAULT_INQUIRIES);
      }
    } else {
      setInquiries(DEFAULT_INQUIRIES);
      localStorage.setItem('yh_board_inquiries', JSON.stringify(DEFAULT_INQUIRIES));
    }
  }, []);

  // Save inquiries helper
  const saveInquiries = (updatedList: Inquiry[]) => {
    setInquiries(updatedList);
    localStorage.setItem('yh_board_inquiries', JSON.stringify(updatedList));
  };

  // Handle posting/submitting inquiry
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      alert("이름과 상세 문의 내용을 빠짐없이 입력해 주세요.");
      return;
    }

    // Mask name and phone for luxury industry bulletin presentation
    let formattedName = name.trim();
    if (formattedName.length > 1) {
      const first = formattedName.charAt(0);
      const last = formattedName.charAt(formattedName.length - 1);
      formattedName = formattedName.length === 2 ? `${first}*` : `${first}*${last}`;
    }

    let formattedPhone = phone.trim() || '비공개';
    if (formattedPhone !== '비공개' && formattedPhone.includes('-')) {
      const parts = formattedPhone.split('-');
      if (parts.length >= 2) {
        formattedPhone = `${parts[0]}-****-${parts[parts.length - 1]}`;
      }
    } else if (formattedPhone !== '비공개' && formattedPhone.length >= 10) {
      formattedPhone = `${formattedPhone.substring(0, 3)}-****-${formattedPhone.substring(formattedPhone.length - 4)}`;
    }

    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newInquiry: Inquiry = {
      name: formattedName,
      phone: formattedPhone,
      category,
      message: message.trim(),
      createdAt: dateStr
    };

    const updated = [newInquiry, ...inquiries];
    saveInquiries(updated);

    // Reset Form Fields
    setName('');
    setPhone('');
    setCategory('동력분무기 문의');
    setMessage('');

    alert("상담 문의가 성공적으로 등록되었습니다. 담당 오퍼레이터 및 기술 메카닉이 확인 후 신속히 연락드리겠습니다.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 font-sans" id="order-page-root">
      
      {/* Visual Title Header */}
      <div className="text-center mb-10 space-y-2">
        <span className="text-xs uppercase tracking-wider text-amber-500 font-bold font-mono">
          PURCHASE CHANNELS & SYSTEM BULLETIN
        </span>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
          영흥분무기 주문 & 기술 상담
        </h2>
        <p className="text-stone-400 text-xs sm:text-sm max-w-xl mx-auto font-medium">
          서비스 신청 세부 내역 및 상담 내용을 남겨 주시면 전담 기술 코디네이터가 신속히 접수하여 정밀 유선 안내를 드리겠습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-6">
        {/* Left Column: Direct Phone Purchase Card (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
          <div className="bg-stone-900/40 border border-stone-850 rounded-2xl p-6 flex flex-col justify-between h-full space-y-6">
            <div className="space-y-5">
              <div>
                <span className="text-stone-300 font-bold text-sm tracking-tight flex items-center gap-1.5 font-sans mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                  영흥분무기 안내 및 상담 센터
                </span>
                <p className="text-xs text-stone-400 leading-relaxed font-semibold">
                  영흥은 40년 농기계 가공·설계 전통을 바탕으로 고객 한 분 한 분의 농화 환경에 최적화된 맞춤 사양을 제공합니다. 전화 주문안내부터 전담 실물 AS 가이드까지 신속하고 정밀한 유선 솔루션을 제공해 드립니다.
                </p>
              </div>

              {/* Core Info Details */}
              <div className="bg-gradient-to-r from-[#171412] to-stone-950 p-4 rounded-xl border border-stone-850 space-y-3.5">
                <div className="flex justify-between items-center text-xs text-stone-400 border-b border-stone-930 pb-2.5">
                  <span className="font-bold">평일 및 주말 상시 문의</span>
                  <span className="font-mono font-bold text-amber-500 text-xs">08:00 ~ 19:00</span>
                </div>
                <div className="flex justify-between items-center text-xs text-stone-400 border-b border-stone-930 pb-2.5">
                  <span className="font-bold">화물 안전 배송권역</span>
                  <span className="font-bold text-stone-300">전국 전지역 신속 연계 배송</span>
                </div>
                <div className="flex justify-between items-center text-xs text-stone-400">
                  <span className="font-bold">원스톱 AS 접수</span>
                  <span className="font-bold text-emerald-500 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 fill-current/10" />
                    당일 처리 및 부품 긴급 발송
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-850">
              <a
                href="tel:054-334-2488"
                className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-500 to-[#b8521a] hover:from-amber-600 hover:to-[#9a4112] text-stone-950 font-black py-4.5 px-4 rounded-xl text-[13px] shadow-xl transition-all hover:scale-[1.01] active:scale-95 duration-150 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-stone-950 stroke-[3px]" />
                <span>전화 주문상담 : 054-334-2488</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Write Inquiry Form Card (lg:col-span-8) */}
        <div className="lg:col-span-8">
          <form onSubmit={handleSubmit} className="bg-stone-900/20 border border-stone-850 p-6 sm:p-8 rounded-2xl space-y-5 h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-stone-200">
                <PlusCircle className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-black text-white">온라인 상담 및 기술 문의 등록</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-stone-300 text-xs sm:text-sm font-extrabold leading-none">고객명 / 업체명 *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-500 pointer-events-none">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="예: 홍길동 (나주원예)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-3 bg-stone-950/80 border border-stone-800 focus:border-amber-500 rounded-xl text-xs sm:text-sm font-extrabold text-stone-200 focus:outline-none transition-colors placeholder:text-stone-600"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-stone-300 text-xs sm:text-sm font-extrabold leading-none">연락처 (정밀 AS 피드백용)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-500 pointer-events-none">
                      <PhoneCall className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      placeholder="예: 010-1234-5678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-3 bg-stone-950/80 border border-stone-800 focus:border-amber-500 rounded-xl text-xs sm:text-sm font-extrabold text-stone-200 focus:outline-none transition-colors placeholder:text-stone-600"
                    />
                  </div>
                </div>
              </div>

              <div>
                {/* Category Dropdown */}
                <div className="space-y-2">
                  <label className="text-stone-300 text-xs sm:text-sm font-extrabold leading-none">문의 분류</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-3 bg-stone-950/80 border border-stone-800 focus:border-amber-500 rounded-xl text-xs sm:text-sm font-black text-stone-300 focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="동력분무기 문의">동력분무기 문의</option>
                    <option value="피스톤 펌프 문의">피스톤 펌프 문의</option>
                    <option value="조합 완제품 주문 문의">조합 완제품 주문 문의</option>
                    <option value="부품 및 정비 문의">부품 및 정비 문의</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-stone-300 text-xs sm:text-sm font-extrabold leading-none">상세 문의 내용 *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="요청하시는 동력원 조합, 교체 희망 부품 사양 또는 견적 문의 세부 사항을 자유롭게 적어 주세요."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-3 bg-stone-950/80 border border-stone-800 focus:border-amber-500 rounded-xl text-xs sm:text-sm font-semibold text-stone-200 focus:outline-none transition-colors resize-none leading-relaxed placeholder:text-stone-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-stone-950 hover:scale-[1.005] active:scale-[0.99] font-black py-3.5 rounded-xl text-xs sm:text-sm tracking-widest transition-all cursor-pointer"
            >
              온라인 문의 등록하기
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
