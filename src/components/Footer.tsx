import { Printer, Mail, Map, PhoneCall } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#15110f] border-t-2 border-stone-900 text-stone-300 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 lg:py-16">
        
        {/* Foot core details: Dual column matches requested mockup perfectly */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-xs sm:text-sm leading-relaxed text-stone-400">
          
          {/* Col 1: Core corporate details */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-[#ffa200] border-b border-stone-850/60 pb-1.5 inline-block text-sm sm:text-base uppercase tracking-wider">
              영흥분무기 정보
            </h4>
            <div className="space-y-2">
              <p>
                <span className="text-stone-500 mr-2">대표자 :</span>
                <strong className="text-stone-300 font-medium">김은혜</strong>
                <span className="text-stone-800 mx-3">|</span>
                <span className="text-stone-500 mr-2">상호 :</span>
                <strong className="text-stone-300 font-medium">영흥분무기</strong>
              </p>
              <p>
                <span className="text-stone-500 mr-2">사업자등록번호 :</span>
                <strong className="text-stone-300 font-mono">505-19-91653</strong>
              </p>
              <p className="flex items-start gap-1">
                <span className="text-stone-500 mr-2 shrink-0">소재지 :</span>
                <span className="text-stone-300">경상북도 영천시 서문길 48</span>
              </p>
            </div>
          </div>

          {/* Col 2: Active operation details */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-[#ffa200] border-b border-stone-850/60 pb-1.5 inline-block text-sm sm:text-base uppercase tracking-wider">
              영업 및 방문 안내
            </h4>
            <div className="space-y-2 font-sans">
              <p className="flex flex-wrap gap-x-6 gap-y-1">
                <span>
                  <span className="text-stone-500 mr-2">전화번호 :</span>
                  <a href="tel:054-334-2488" className="text-stone-200 font-bold hover:text-amber-500 transition-colors font-mono">054-334-2488</a>
                </span>
                <span>
                  <span className="text-stone-500 mr-2">팩스 :</span>
                  <span className="text-stone-300 font-mono">054-334-3209</span>
                </span>
              </p>
              <p>
                <span className="text-stone-500 mr-2">평일 :</span>
                <span className="text-stone-300">오전 8시 ~ 오후 5시</span>
              </p>
              <p>
                <span className="text-stone-500 mr-2">토요일 :</span>
                <span className="text-stone-300">오전 8시 ~ 오후 12시 <strong className="text-amber-500/90 font-medium">격주휴무 10~2월 전체휴무</strong></span>
              </p>
              <p className="text-amber-500 font-medium pt-1 text-xs">
                ※ 방문 전 미리 전화를 주시면 더욱 원활한 상담이 가능합니다.
              </p>
            </div>
          </div>

        </div>

        {/* Foot bottom copyright: Centered thin boundary line overlay */}
        <div className="mt-12 pt-8 border-t border-stone-850 text-center flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-550 font-mono">
          <span>&copy; {currentYear} 영흥분무기 All Rights Reserved.</span>
          <div className="flex items-center gap-4 text-[10px] tracking-tight text-stone-600">
            <span>농기계 부품 장인정신 40주년 기념사업회 공식 지정사이트</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
