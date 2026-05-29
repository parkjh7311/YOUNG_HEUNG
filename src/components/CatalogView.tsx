import { useState, useEffect, ChangeEvent } from 'react';
import { Sparkles, FileText, Settings, Eye, RefreshCw, Layers, Award, ShieldAlert, Cpu } from 'lucide-react';
import { Product } from '../types';

interface CatalogViewProps {
  category: 'sprayer' | 'pump';
  products: Product[];
}

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

export default function CatalogView({ category, products }: CatalogViewProps) {
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [customImages, setCustomImages] = useState<Record<string, string>>({});

  // Initialize selected product when products load or category changes
  // Restores last selected product of this category to keep navigation seamless
  useEffect(() => {
    if (products.length > 0) {
      const savedId = localStorage.getItem(`yh_last_selected_${category}`);
      if (savedId && products.some((p) => p.id === savedId)) {
        setSelectedProductId(savedId);
      } else {
        setSelectedProductId(products[0].id);
      }
    }
  }, [category, products]);

  // Load custom images globally from local storage (not restricted to current category products)
  // This guarantees all images are preloaded and won't flicker or disappear during page switches
  const loadCustomImages = () => {
    const loadedImages: Record<string, string> = {};
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('yh_image_')) {
          const productId = key.replace('yh_image_', '');
          const saved = localStorage.getItem(key);
          if (saved) {
            loadedImages[productId] = saved;
          }
        }
      }
    } catch (e) {
      console.error("Failed to parse items from localStorage", e);
    }
    setCustomImages(loadedImages);
  };

  useEffect(() => {
    loadCustomImages();

    const handleRestoreTrigger = () => {
      loadCustomImages();
    };

    window.addEventListener('yh_photos_restored', handleRestoreTrigger);
    return () => {
      window.removeEventListener('yh_photos_restored', handleRestoreTrigger);
    };
  }, [products]);

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];

  if (!selectedProduct) {
    return <div className="text-stone-300 p-8 text-center">불러오는 중...</div>;
  }

  // Handle uploading custom image with real-time compression to safe proof against QuotaExceededError
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      compressImage(file, (compressedBase64) => {
        // Save to state
        setCustomImages((prev) => ({
          ...prev,
          [selectedProduct.id]: compressedBase64,
        }));
        // Save to LocalStorage
        try {
          localStorage.setItem(`yh_image_${selectedProduct.id}`, compressedBase64);
        } catch (error) {
          console.error("Local storage quota exceeded! Compression helper kept it safe but some systems might be extremely restricted:", error);
        }
      });
    }
  };

  // Reset custom image
  const handleResetImage = () => {
    setCustomImages((prev) => {
      const next = { ...prev };
      delete next[selectedProduct.id];
      return next;
    });
    localStorage.removeItem(`yh_image_${selectedProduct.id}`);
  };

  const currentImage = customImages[selectedProduct.id] || selectedProduct.image;

  const renderFallbackIllustration = (customClass?: string) => {
    if (category === 'sprayer') {
      return (
        <svg viewBox="0 0 200 160" className={customClass || "w-48 h-48 text-amber-500/85 drop-shadow-[0_0_15px_rgba(245,158,11,0.2)] animate-pulse"} fill="none" stroke="currentColor" strokeWidth="2.5">
          {/* Main pressure chamber cylinder */}
          <rect x="75" y="45" width="50" height="70" rx="6" fill="currentColor" fillOpacity="0.05" />
          <line x1="100" y1="20" x2="100" y2="45" />
          {/* Pressure Gauge Spherical top */}
          <circle cx="100" cy="18" r="10" fill="currentColor" fillOpacity="0.1" />
          <path d="M96,15 L104,15 M100,11 L100,18" strokeWidth="1.5" />
          
          {/* Piston side pipes */}
          <path d="M40,90 L75,90 M125,90 L160,90" />
          <circle cx="36" cy="90" r="4" fill="currentColor" />
          <circle cx="164" cy="90" r="4" fill="currentColor" />
          
          {/* Base structure support feet */}
          <path d="M60,115 L140,115" strokeWidth="4" strokeLinecap="round" />
          <path d="M70,115 L55,135 M130,115 L145,135" strokeWidth="3" />
          <rect x="45" y="135" width="20" height="6" rx="2" fill="currentColor" />
          <rect x="135" y="135" width="20" height="6" rx="2" fill="currentColor" />
          
          {/* Industrial gear accents */}
          <circle cx="100" cy="80" r="14" strokeDasharray="3,3" />
          <circle cx="100" cy="80" r="6" fill="currentColor" />
        </svg>
      );
    } else {
      return (
        <svg viewBox="0 0 200 160" className={customClass || "w-48 h-48 text-[#b8521a] drop-shadow-[0_0_15px_rgba(184,82,26,0.2)] animate-pulse"} fill="none" stroke="currentColor" strokeWidth="2.5">
          {/* Horizontal multi-stage piston blocks */}
          <rect x="40" y="55" width="120" height="40" rx="4" fill="currentColor" fillOpacity="0.05" strokeWidth="3" />
          <line x1="80" y1="55" x2="80" y2="95" />
          <line x1="120" y1="55" x2="120" y2="95" />
          
          {/* Connecting rods & flywheel */}
          <circle cx="150" cy="75" r="18" fill="currentColor" fillOpacity="0.1" strokeWidth="3" />
          <circle cx="150" cy="75" r="4" fill="currentColor" />
          
          {/* High-pressure unloader assembly */}
          <rect x="70" y="25" width="20" height="30" rx="2" fill="currentColor" fillOpacity="0.1" />
          <path d="M80,10 L80,25" strokeWidth="4" />
          <circle cx="80" cy="8" r="5" fill="currentColor" />
          
          {/* Fluid Inlet / Outlet tubes */}
          <path d="M55,95 L55,125 M105,95 L105,125" strokeWidth="4" strokeLinecap="round" />
          
          {/* Heavy Base block mount */}
          <path d="M30,125 L170,125" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 font-sans">
      {/* Visual Title Header */}
      <div className="text-center mb-8 space-y-2">
        <span className="text-xs uppercase tracking-wider text-amber-500 font-bold font-mono">
          MODEL SPECIFICATIONS & USER IMAGES
        </span>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
          {category === 'sprayer' ? '동력분무기 모델' : '피스톤 펌프 모델'}
        </h2>
      </div>

      {/* Model Grid Tabs (Top Selector) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-8 bg-stone-900/60 p-2 rounded-xl border border-stone-800">
        {products.map((p) => {
          const isSelected = p.id === selectedProductId;
          return (
            <button
              key={p.id}
              onClick={() => {
                setSelectedProductId(p.id);
                localStorage.setItem(`yh_last_selected_${category}`, p.id);
              }}
              className={`py-3 px-2 rounded-lg text-xs font-bold text-center tracking-tight transition-all uppercase duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/10 font-black scale-[1.03]'
                  : 'bg-stone-950/40 text-stone-400 hover:text-white hover:bg-stone-950/80 border border-stone-900'
              }`}
            >
              {p.modelName.includes('특고압')
                ? p.modelName.replace(' (특고압 최고사양)', ' 특고압').replace(' (특고압)', ' 특고압')
                : p.modelName
                    .replace(' (수동형)', '')
                    .replace(' (자동 바이패스)', '')
                    .replace(' (대용량용)', '')
                    .replace(' (초대용량)', '')
                    .replace(' (표준형)', '')}
            </button>
          );
        })}
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left: Product Info, Compact Specs & Photo Panel */}
        <div className="lg:col-span-8 space-y-5">
          {/* Model Name & Badge */}
          <div className="space-y-2 bg-stone-900/20 p-5 rounded-xl border border-stone-850/40">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-[#ffa200] bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                {selectedProduct.category === 'sprayer' ? 'POWER SPRAYER' : 'PISTON PUMP'}
              </span>
              <span className="text-[10px] sm:text-xs text-stone-400 font-bold font-mono">
                ID: {selectedProduct.id.toUpperCase()}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {selectedProduct.name}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-medium">
              {selectedProduct.description}
            </p>
          </div>

          {/* Unified Compact Specifications & Photo Panel */}
          <div className="bg-stone-900/40 border border-stone-850 rounded-2xl p-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 w-32 h-32 bg-gradient-to-bl from-amber-500/5 to-transparent rounded-full -mr-12 -mt-12 blur-xl pointer-events-none"></div>

            <div className="flex justify-between items-center mb-4">
              <div className="text-[11px] sm:text-xs font-extrabold tracking-widest text-[#ffa200] uppercase flex items-center gap-1.5 font-mono">
                <FileText className="w-3.5 h-3.5 text-amber-500" />
                <span>INTEGRATED TECHNICAL SPEC & PHOTO (제품 정밀 고유 정보)</span>
              </div>
              
              {customImages[selectedProduct.id] && (
                <button
                  onClick={handleResetImage}
                  className="text-[10px] sm:text-xs text-red-400/80 hover:text-red-400 font-bold flex items-center gap-1 border border-red-950/30 px-2 py-0.5 rounded bg-red-950/20 hover:bg-red-950/40 cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-2.5 h-2.5" />
                  기본 사양 복원
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              
              {/* Left Segment: Technical Specs (md:col-span-7) */}
              <div className="md:col-span-7 bg-stone-950/50 rounded-xl border border-stone-850 p-5 flex flex-col justify-between">
                <div className="grid grid-cols-2 gap-x-5 gap-y-4 text-xs sm:text-sm font-sans">
                  <div className="space-y-1 border-b border-stone-900/60 pb-2">
                    <span className="text-stone-400 text-[10px] sm:text-xs block font-bold">압력 (Pressure)</span>
                    <span className="text-xs sm:text-sm text-amber-400 font-black font-mono block">{selectedProduct.pressure}</span>
                  </div>

                  <div className="space-y-1 border-b border-stone-900/60 pb-2">
                    <span className="text-stone-400 text-[10px] sm:text-xs block font-bold">흡수/토출량 (Flow Rate)</span>
                    <span className="text-xs sm:text-sm text-stone-200 font-bold font-mono block">{selectedProduct.flowRate}</span>
                  </div>

                  <div className="space-y-1 border-b border-stone-900/60 pb-2">
                    <span className="text-stone-400 text-[10px] sm:text-xs block font-bold">소요 동력 (Power)</span>
                    <span className="text-xs sm:text-sm text-stone-200 font-bold block">{selectedProduct.power}</span>
                  </div>

                  <div className="space-y-1 border-b border-stone-900/60 pb-2">
                    <span className="text-stone-400 text-[10px] sm:text-xs block font-bold">회전수 (RPM Range)</span>
                    <span className="text-xs sm:text-sm text-stone-200 font-bold font-mono block">{selectedProduct.rpm}</span>
                  </div>

                  <div className="col-span-2 space-y-1 pt-1">
                    <span className="text-stone-400 text-[10px] sm:text-xs block font-bold">기기 자체 중량 (Weight)</span>
                    <span className="text-xs sm:text-sm text-stone-200 font-bold font-mono block">{selectedProduct.weight}</span>
                  </div>
                </div>

                <p className="text-[10px] sm:text-[11.5px] text-stone-500 font-extrabold leading-relaxed font-sans pt-3 mt-3 border-t border-stone-900/50">
                  * 본 제원은 영흥 표준 사양 기준이며 부하 조건에 따라 가변 조율이 가능합니다.
                </p>
              </div>

              {/* Right Side: Compact Interactive Product Photo (md:col-span-5) */}
              <div className="md:col-span-5 flex flex-col justify-between bg-stone-950/40 p-3 rounded-xl border border-stone-850/60 text-center">
                
                {/* Compact Photo aspect ratio */}
                <div className="relative aspect-[4/3] w-full rounded-lg bg-stone-950 border border-stone-900 flex flex-col items-center justify-center p-2.5 overflow-hidden transition-all duration-300 group-hover:border-amber-500/20">
                  {currentImage ? (
                    <div className="w-full h-full flex items-center justify-center relative">
                      <img
                        src={currentImage}
                        alt={selectedProduct.name}
                        className="max-w-full max-h-full w-auto h-auto object-contain rounded"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center space-y-1.5 p-2">
                      {renderFallbackIllustration(
                        category === 'sprayer'
                          ? "w-20 h-20 text-amber-500/85 drop-shadow-[0_0_15px_rgba(245,158,11,0.2)] animate-pulse"
                          : "w-20 h-20 text-[#b8521a] drop-shadow-[0_0_15px_rgba(184,82,26,0.2)] animate-pulse"
                      )}
                      <p className="text-stone-500 text-[10px] sm:text-xs font-bold">미등록 상태</p>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Right: Technical Features Highlight panel */}
        <div className="lg:col-span-4 bg-gradient-to-b from-stone-900/60 to-stone-900/30 border border-stone-850 rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-xs sm:text-sm font-extrabold tracking-widest text-[#ffa200] uppercase flex items-center gap-1.5 font-mono">
              <Layers className="w-4 h-4 text-amber-500" />
              <span>구조 및 기능적 장점 FEATURES</span>
            </div>
            
            <ul className="text-xs sm:text-sm text-stone-300 space-y-2.5 leading-relaxed">
              {selectedProduct.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 bg-stone-950/20 p-3 rounded-xl border border-stone-900/40 font-medium font-sans hover:border-[#b8521a]/20 transition-all duration-150">
                  <span className="inline-flex h-5 w-5 shrink-0 rounded-full bg-amber-550/10 text-amber-500 items-center justify-center font-extrabold font-mono text-[11px] mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-stone-300 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Verification Badge */}
          <div className="mt-6 p-4 bg-amber-500/5 border border-amber-500/15 rounded-xl flex items-center gap-2.5">
            <Award className="w-4.5 h-4.5 text-amber-500 shrink-0" />
            <div className="text-xs sm:text-[13px] font-sans font-semibold text-stone-200 leading-normal">
              본 기술규격은 정식 인증 완료 정품 규격임을 보증합니다.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
