import { useState, useEffect, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wrench, 
  PhoneCall, 
  CheckCircle, 
  Gauge, 
  Activity, 
  Cpu, 
  Zap,
  Hammer,
  Image as ImageIcon
} from 'lucide-react';

interface AssemblyProduct {
  id: string;
  name: string;
  pumpModel: string;
  powerSource: string;
  frameType: string;
  description: string;
  pressure: string;
  flowRate: string;
  powerSpecs: string;
  features: string[];
  image: string;
}

// 8 core custom assembly configurations requested by the user
const ASSEMBLY_PRODUCTS: AssemblyProduct[] = [
  {
    id: 'yh88_motor',
    name: 'YH88 모터 조립',
    pumpModel: '영흥 YH88A',
    powerSource: '국산 고마력 3상,단상모터조립',
    frameType: '일반다이/고급다이변경가능',
    description: '가장 많이 사용하고 선호되는 88분무기 모터 조립세트입니다.',
    pressure: '1.5 - 3.5 MPa (15 - 35 kg/cm²)',
    flowRate: '54 - 68 L/min',
    powerSpecs: '양전기 인가 모터 (3마력, 고성능 전용 스타터 장착)',
    features: [
      '오토 바이패스 자동 압력제어 밸브 탑재로 노즐 폐쇄시 동력 자동 바이패스',
      '국산 최고급 동선 권선 모터 사용하여 기동 토크 및 안전 극대화',
      '고정 정밀 연삭 슬라이딩 풀리로 정밀한 V-벨트 텐션 조절 가능'
    ],
    image: '/images/15.png'
  },
  {
    id: 'yh88_engine',
    name: 'YH88 엔진 조립',
    pumpModel: '영흥 YH88A',
    powerSource: '6.5마력 혼다엔진(키시동변경가능)',
    frameType: '일반다이/엔진다이 변경가능',
    description: '차량에 탑재하여 방역하거나 전기가 없는곳에 사용되는 엔진기반형 동력분무기 조립세트입니다.',
    pressure: '1.5 - 4.0 MPa (15 - 40 kg/cm²)',
    flowRate: '54 - 68 L/min',
    powerSpecs: '가솔린 공랭식 4행정 OHV 엔진 (6.5마력)',
    features: [
      '고압 방제 시에도 일정한 유량을 보장하는 동급 최대 가솔린 엔진 출력 설계',
      '시동성이 매우 뛰어나 겨울철에도 손쉽게 리코일 시동 가능',
      '충격 방지 크롬 도금 프레임으로 외부 부식 완벽 제어'
    ],
    image: '/images/16.png'
  },
  {
    id: 'yh88_carrier',
    name: 'YH88 밀차 조립',
    pumpModel: '영흥 YH88A',
    powerSource: '국산 고마력 3상/단상 모터조립',
    frameType: '바퀴 부착형 및 호스릴이 포함된 밀차세트',
    description: '과수 방제 및 비닐하우스 주변 이동식 분무가 편리한 고강력 수레형 캐리어 세트입니다. 광폭 타이어 바퀴와 저중심 프레임 구조로 불규칙한 흙길과 비탈길에서도 손쉽게 운반이 가능합니다.',
    pressure: '1.5 - 4.0 MPa (15 - 40 kg/cm²)',
    flowRate: '54 - 68 L/min',
    powerSpecs: '가솔린 4행정 엔진 (6.5마력, 알루미늄 피스톤 채용)',
    features: [
      '험지 이동을 배려한 고강도 베어링 내장형 스틸 휠 에어타이어 장착',
      '여유로운 호스 권취가 가능한 일체형 밀차 프레임 구성',
      '이동 중에 가해질 수 있는 피스톤 진동 흡수를 위한 듀얼 댐퍼 베이스'
    ],
    image: '/images/17.png'
  },
  {
    id: 'yh100_motor',
    name: 'YH100 모터 조립',
    pumpModel: '영흥 YH100A',
    powerSource: '국산 고마력 3상/단상 모터조립(단상은5마력최대)',
    frameType: '일반다이/고급다이 변경가능',
    description: '100A분무기에 3상7.5마력 모터까지 장착가능한 모델입니다.',
    pressure: '1.5 - 4.5 MPa (15 - 45 kg/cm²)',
    flowRate: '75 - 95 L/min',
    powerSpecs: '산업용 삼상 유도전동기 (5마력, 380V 고압형)',
    features: [
      '75~95 L/min에 이르는 초대형 분출량을 감당하는 대형 황동 매니폴드 블록',
      '정밀 연삭 세라믹 플런저 코팅 기법으로 피스톤 패킹 마모를 80% 이상 혁신 감소',
      '삼상 전격 구동으로 장시간 연속 운전에도 모터 발열 최소화 및 균일 회전 유지'
    ],
    image: '/images/18.png'
  },
  {
    id: 'yh100_engine',
    name: 'YH100 엔진 조립',
    pumpModel: '영흥 YH100A',
    powerSource: '14마력 제논 키시동엔진',
    frameType: '일반다이/고급다이변경가능',
    description: '강력한 방제능력을 가진 100A분무기에 14마력 키시동을 조합한 모델입니다.',
    pressure: '1.5 - 5.0 MPa (15 - 50 kg/cm²)',
    flowRate: '75 - 95 L/min',
    powerSpecs: '대용량 4행정 엔진 (9.0마력, 가솔린 전용)',
    features: [
      '대구경 고압용 메인 호스 멀티 분배기 장착으로 2라인 이상 동기 살포 완벽 대응',
      '엔진 유체 마찰 저항을 혁신적으로 감소시킨 특수 다중 V-벨트 더블 링크 시스템',
      '오일 결핍 감지 엔진 자동 정지 센서 등 다중 안전장치 구비'
    ],
    image: '/images/19.png'
  },
  {
    id: 'yh100_carrier',
    name: 'YH100 밀차 조립',
    pumpModel: '영흥 YH100A',
    powerSource: '국산고마력 삼상/단상(5마력)모터조립',
    frameType: '바퀴 부착형 및 호스릴이 포함된 밀차세트',
    description: '바퀴 및 호스릴이 포함된 밀차 세트입니다 호스는 10미리 이상 권장됩니다.',
    pressure: '1.5 - 5.0 MPa (15 - 50 kg/cm²)',
    flowRate: '75 - 95 L/min',
    powerSpecs: '중대형 가솔린 엔진 (9.0마력)',
    features: [
      '중량 분산을 완벽히 연산하여 기획된 4바퀴 저진동 프레임 워크',
      '원고압 특수 편사벨트와 압력 텐셔너의 고유 조합 설계',
      '고장력 고강성 핸들과 가해 방지형 벨트 안전보호 메쉬망 포함'
    ],
    image: '/images/20.png'
  },
  {
    id: 'yh4500_motor',
    name: 'YH4500 모터 조립',
    pumpModel: '영흥  YH4500',
    powerSource: '국산 고마력 삼상/단상(5마력)모터조립',
    frameType: '일반다이/고급다이변경가능',
    description: '강력한 양수성능을 가진 YH4500펌프에 단상/삼상모터를 조립된 세트입니다.',
    pressure: '2.0 - 5.0 MPa (20 - 50 kg/cm²)',
    flowRate: '30 - 40 L/min',
    powerSpecs: '산업용 삼상 유도전동기 (7.5마력, 특고효율)',
    features: [
      '수직 토출 양정 고도 150m 이상까지 밀어내는 초고압 피스톤 기어',
      '최장 작동 시간을 소화하기 위한 풀 스테인리스 피스톤 헤드블록 탑재',
      '연속 고하중 압력에도 안전하게 차단 복구되도록 설계된 하이엔드 방호 릴리프'
    ],
    image: '/images/21.png'
  },
  {
    id: 'yh6500_custom',
    name: 'YH6500 특주 조립',
    pumpModel: '영흥 특고압 YH6500',
    powerSource: '국산 고마력 고효율 삼상15마력 모터',
    frameType: '시중에 유통되는 일반다이가 아닌 수제로 직접 만들어 높은발과 강한내구성을 가진 특주다이 조립제품',
    description: 'YH6500대용량 펌프와 15마력 모터를 조립할수 있게 특주제작한 다이에 구성한 제품입니다(주문후 제작소요 3일이상).',
    pressure: '3.0 - 7.0 MPa (30 - 70 kg/cm²)',
    flowRate: '40 - 55 L/min',
    powerSpecs: '초강력 13마력 트윈 실린더 가솔린 엔진 또는 10HP 이상 삼상 모터',
    features: [
      '강력한 압력 내구 수명을 보장하기 위한 황동 정밀 가공 실린더 챔버 슬리브',
      '압력 제어 오버플로우 호스 연결용 대용량 리턴 피팅 세트',
      '고객의 실제 수송 환경에 맞추어 맞춤식 동심도 및 풀리 축 배수 가공 시운전 후 완벽 배송'
    ],
    image: '/images/21.png'
  }
];

// Helper function to compress large image files on the client side
// This prevents QuotaExceededError in localStorage and guarantees persistent storage across page switches
const compressImage = (file: File, callback: (base64: string) => void) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Limit max dimension to 800px to balance image quality with lightweight storage size
      const MAX_SIZE = 800;
      if (width > height) {
        if (width > MAX_SIZE) {
          height = Math.round((height * MAX_SIZE) / width);
          width = MAX_SIZE;
        }
      } else {
        if (height > MAX_SIZE) {
          width = Math.round((width * MAX_SIZE) / height);
          height = MAX_SIZE;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        // Export as JPEG with 0.75 quality format which generally fits in < 80-120KB range
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.75);
        callback(compressedBase64);
      } else {
        // Fallback to original read if canvas context fails
        callback(event.target?.result as string);
      }
    };
    img.src = event.target?.result as string;
  };
  reader.readAsDataURL(file);
};

export default function AssemblySection() {
  const [selectedId, setSelectedId] = useState<string>('yh88_motor');
  const [customImages, setCustomImages] = useState<Record<string, string>>({});

  // Restore active selected assembly item and loaded custom images on component mount
  useEffect(() => {
    const savedSelected = localStorage.getItem('yh_assembly_last_selected');
    if (savedSelected && ASSEMBLY_PRODUCTS.some(p => p.id === savedSelected)) {
      setSelectedId(savedSelected);
    }
    loadCustomAssemblyImages();
  }, []);

  const loadCustomAssemblyImages = () => {
    const loaded: Record<string, string> = {};
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('yh_assembly_image_')) {
          const productId = key.replace('yh_assembly_image_', '');
          const saved = localStorage.getItem(key);
          if (saved) {
            loaded[productId] = saved;
          }
        }
      }
    } catch (e) {
      console.error('Failed to read assembly image from localStorage', e);
    }
    setCustomImages(loaded);
  };

  const handleSelectProduct = (id: string) => {
    setSelectedId(id);
    localStorage.setItem('yh_assembly_last_selected', id);
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>, productId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      compressImage(file, (compressedBase64) => {
        // Save to state
        setCustomImages((prev) => ({
          ...prev,
          [productId]: compressedBase64,
        }));
        // Save securely to LocalStorage
        try {
          localStorage.setItem(`yh_assembly_image_${productId}`, compressedBase64);
        } catch (error) {
          console.error('Local storage quota limit exceeded for assembly photo:', error);
        }
      });
    }
  };

  const handleResetImage = (productId: string) => {
    setCustomImages((prev) => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
    localStorage.removeItem(`yh_assembly_image_${productId}`);
  };

  const getMappedCatalogId = (id: string): string => {
    if (id.startsWith('yh88_')) return 'yh88a';
    if (id.startsWith('yh100_')) return 'yh100a';
    if (id === 'yh4500_motor') return 'yh4500';
    if (id === 'yh6500_custom') return 'yh6500_high';
    return id;
  };

  const activeProduct = ASSEMBLY_PRODUCTS.find(p => p.id === selectedId) || ASSEMBLY_PRODUCTS[0];
  const baseCatalogId = getMappedCatalogId(activeProduct.id);
  const catalogImg = localStorage.getItem(`yh_image_${baseCatalogId}`) || null;
  const customImg = customImages[activeProduct.id] || catalogImg || activeProduct.image || null;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8" id="assembly-page-root">
      {/* Title block */}
      <div className="text-center mb-8 space-y-2">
        <span className="text-xs uppercase tracking-wider text-amber-500 font-bold font-mono">
          PREMIUM CUSTOM ASSEMBLY SYSTEM
        </span>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center justify-center gap-2">
          <Wrench className="w-6 h-6 text-amber-500" />
          영흥 맞춤식 조립·제작 카탈로그
        </h2>
        <p className="text-stone-400 text-xs sm:text-sm max-w-2xl mx-auto">
          용도와 환경에 따라 정교하게 선택·조정된 고압 살수 분무장비 라인업입니다.
        </p>
      </div>

      {/* Assembly Category Tab Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 mb-8">
        {ASSEMBLY_PRODUCTS.map((prod) => {
          const isSelected = prod.id === selectedId;
          return (
            <button
              key={prod.id}
              onClick={() => handleSelectProduct(prod.id)}
              className={`py-3 px-1 rounded-lg text-[11px] font-bold text-center tracking-tight transition-all duration-200 cursor-pointer border ${
                isSelected
                  ? 'bg-amber-500 text-stone-950 font-black border-amber-500 shadow-md shadow-amber-500/10 scale-[1.02]'
                  : 'bg-stone-950/40 text-stone-400 hover:text-white hover:bg-stone-950/80 border-stone-900'
              }`}
            >
              {prod.name}
            </button>
          );
        })}
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Unified Board */}
        <div className="bg-stone-900/30 border border-stone-850/70 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="space-y-2 border-b border-stone-850/60 pb-5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] sm:text-xs font-black bg-[#b8521a]/15 text-amber-500 border border-amber-500/20 rounded">
                  정품 조립 세트
                </span>
                <span className="text-stone-450 font-mono text-xs font-black uppercase tracking-wider">
                  {activeProduct.id.toUpperCase()}
                </span>
              </div>
              <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                {activeProduct.name}
              </h3>
              <p className="text-xs sm:text-base text-stone-250 leading-relaxed font-semibold">
                {activeProduct.description}
              </p>
            </div>

            {/* Simulation and Parts Specs Aligned Side-by-Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Left Column: 조립 완성 제품 사진 */}
              <div className="bg-stone-950/40 border border-stone-900 p-4 rounded-xl flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-black text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-amber-500" />
                    조립 완제품 실물 이미지
                  </h4>
                  <p className="text-[11px] sm:text-xs text-stone-500 font-extrabold leading-normal">
                    본 장비의 실제 정품 조립 설계 외관 및 실물 완성 형상 이미지입니다.
                  </p>
                </div>

                {/* Compact Image Container with fallback */}
                <div className="w-full aspect-[4/3] rounded-lg bg-stone-950 border border-stone-850 flex items-center justify-center p-2.5 overflow-hidden relative">
                  {customImg ? (
                    <img
                      src={customImg}
                      alt={activeProduct.name}
                      className="max-w-full max-h-full w-auto h-auto object-contain rounded transition-transform duration-300 hover:scale-[1.03]"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-2 space-y-1.5">
                      <ImageIcon className="w-10 h-10 text-stone-700" />
                      <p className="text-xs text-stone-600 font-bold">이미지가 등록되지 않았습니다.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: 장착 조립 기자재 부품 명세 */}
              <div className="bg-stone-950/40 border border-stone-900 p-4 rounded-xl flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-black text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-amber-500" />
                    장착 조립 기자재 부품 명세
                  </h4>
                  <p className="text-[11px] sm:text-xs text-stone-500 font-extrabold leading-normal">
                    각 조립 프리미엄 시스템에 장착되는 핵심 기계적 부품 내역입니다.
                  </p>
                </div>

                <div className="space-y-2.5 flex-1 flex flex-col justify-center">
                  <div className="bg-stone-950/50 p-3 rounded-lg border border-stone-900/60 flex flex-col justify-between">
                    <span className="text-[11px] sm:text-xs text-stone-400 font-extrabold block leading-none">1. 장착 펌프 헤드</span>
                    <span className="text-xs sm:text-sm text-stone-100 font-extrabold mt-1.5 leading-snug">{activeProduct.pumpModel}</span>
                  </div>
                  <div className="bg-stone-950/50 p-3 rounded-lg border border-stone-900/60 flex flex-col justify-between">
                    <span className="text-[11px] sm:text-xs text-stone-400 font-extrabold block leading-none">2. 구동 동력원</span>
                    <span className="text-xs sm:text-sm text-amber-400 font-extrabold mt-1.5 leading-snug">{activeProduct.powerSource}</span>
                  </div>
                  <div className="bg-stone-950/50 p-3 rounded-lg border border-stone-900/60 flex flex-col justify-between">
                    <span className="text-[11px] sm:text-xs text-stone-400 font-extrabold block leading-none">3. 베이스 프레임</span>
                    <span className="text-xs sm:text-sm text-stone-200 font-semibold mt-1.5 leading-snug">{activeProduct.frameType}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-6 border-t border-stone-850/60 pt-5 space-y-4">
            <div className="bg-[#b8521a]/5 border border-[#b8521a]/15 p-4 rounded-xl">
              <p className="text-xs sm:text-[13px] text-stone-300 leading-relaxed font-bold">
                * 조립 분무기 모터/엔진은 소비자의 상황과 사용용도에 따라 가변가능하오니 조립견적은 반드시 문의후 제품 구매 부탁드립니다.
              </p>
            </div>

            <a
              href="tel:054-334-2488"
              className="flex items-center justify-center gap-2 bg-[#b8521a] hover:bg-[#9a4112] text-white py-3 px-5 rounded-lg text-xs sm:text-sm font-black shadow-md tracking-tight transition-all active:scale-95 duration-150 w-full cursor-pointer hover:shadow-lg hover:shadow-[#b8521a]/10"
            >
              <PhoneCall className="w-4 h-4" />
              <span>조립 직통 견적 (054-334-2488)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
