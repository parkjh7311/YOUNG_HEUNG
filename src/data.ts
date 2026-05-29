import { Product } from './types';

export const SPRAYERS: Product[] = [
  {
    id: 'yh30a',
    name: '영흥 고압 동력분무기 YH30A',
    category: 'sprayer',
    image: '/images/1.png',
    modelName: 'YH30A (수동형)',
    pressure: '3 - 6 MPa (30 - 60 kg/cm²)',
    flowRate: '10 - 13 L/min',
    power: '2 - 3.0 HP (모터)',
    rpm: '400 - 500 RPM',
    weight: '13 kg',
    features: [
      '소형 경량화 디자인으로 하우스 내부 및 소규모 텃밭 방제에 최적화',
      '가벼운 이동성 및 초보자도 다루기 쉬운 단순 직관 제어'
    ],
    description: '작지만 강력한 토출 성능을 자랑하는 경량 동력분무기입니다. 좁은 공간 및 과수 텃밭, 비닐하우스 내부에서 최고의 기동성을 자랑합니다.'
  },
  {
    id: 'yh50a',
    name: '영흥 고압 동력분무기 YH50A',
    category: 'sprayer',
    image: '/images/2.png',
    modelName: 'YH50A (수동형)',
    pressure: '3 - 6 MPa (30 - 60 kg/cm²)',
    flowRate: '22 - 28 L/min',
    power: '2 - 3 HP (모터)',
    rpm: '400 - 5000 RPM',
    weight: '18.5 kg',
    features: [
      '소형 경량하 디자인이면서도 강력한 방제가능',
      '과수원 및 원예단지 방제 작업에 최고의 밸런스 제공',
      '자동레귤레이터 장착가능',  
    ],
    description: '낮은마력의 모터나 중소형 엔진에 연결하여 사용할 수 있는 동력분무기입니다.'
  },
  {
    id: 'yh88a',
    name: '영흥 동력분무기 YH88A',
    category: 'sprayer',
    image: '/images/3.png',
    modelName: 'YH88A (수동형)',
    pressure: '3 - 6 MPa (30 - 60 kg/cm²)',
    flowRate: '32 - 41 L/min',
    power: '3 - 5 HP',
    rpm: '400 - 500 RPM',
    weight: '23 kg',
    features: [
      '일반 농가 및 시설업체등에 가장 널리 쓰이는 범용모델',
      '열처리 피스톤 적용으로 내구성이 증가하여 타회사 대비 긴수명',
   
    ],
    description: '강력한 압력과 대유량 효율을 조화롭게 달성하여 한국 과수 방제 현장에서 오랫동안 명품으로 인정받아온 국가대표 분무기입니다.'
  },
  {
    id: 'yh88_auto',
    name: '영흥 자동 동력분무기 YH88자동',
    category: 'sprayer',
    image: '/images/4.png',
    modelName: 'YH88자동 (자동 바이패스)',
    pressure: '3 - 6 MPa (30 - 60 kg/cm²)',
    flowRate: '32 - 41 L/min',
    power: '3 - 5 HP',
    rpm: '400 - 500 RPM',
    weight: '23 kg',
    features: [
      '자동레귤레이터 장차 모델',
      '분무 노즐 폐쇄 시 즉시 자동 무압 바이패스로 전환하여 고압 호스 파열 방지',
      '열처리 피스톤 기본장착으로 피스톤 내구성 강화',
      '원거리 1인 방제 작업 시 편리'
    ],
    description: '자동 레귤레이터의 적용으로 불필요한 고비용 호스 파손과 기계 무리를 자동으로 없애주는 원격 1인 작업 특화형 제품입니다.'
  },
  {
    id: 'yh100a',
    name: '영흥 동력분무기 YH100A',
    category: 'sprayer',
    image: '/images/5.png',
    modelName: 'YH100A (수동형)',
    pressure: '3 - 6 MPa (30 - 60 kg/cm²)',
    flowRate: '51 - 64 L/min',
    power: '5.0 - 7.5 HP',
    rpm: '400 - 500 RPM',
    weight: '30.0 kg',
    features: [
      '대형 농기계 SS기(한성, 한아, 한서 등) 탑재용 표준 공인 규격 적용',
      '초대형 과수 농가 및 대단지 방제용 최고출력',
      '연속 고밀도 분사 시에도 흔들림 없는 완벽한 내구성',
      '열첯리 피스톤 적용제품은 강한내구성의 피스톤 적용'
    ],
    description: '안개분무. 거점소독시설등 신속하고 대용량의 분무 처리가 가능하게끔 설계된 고출력 동력분무기입니다.'
  },
  {
    id: 'yh100_auto',
    name: '영흥 자동 동력분무기 YH100A자동',
    category: 'sprayer',
    image: '/images/6.png',
    modelName: 'YH100A자동',
    pressure: '3.0 - 6.0 MPa (30 - 60 kg/cm²)',
    flowRate: '51 - 64 L/min',
    power: '5.0 - 7.5 HP',
    rpm: '400 - 500 RPM',
    weight: '30.0 kg',
    features: [
      '열처리 피스톤 기본탑재모델',
       '분무 노즐 폐쇄 시 즉시 자동 무압 바이패스로 전환하여 고압 호스 파열 방지',
      '열처리 피스톤 기본장착으로 피스톤 내구성 강화',
      '원거리 1인 방제 작업 시 편리'
    ],
    description: '대량 방제 시 필수적으로 동반되는 약대 개폐 시의 압력 서지를 오토 밸브가 완벽히 차단하여 안전성과 작업 능률을 모두 잡은 모델입니다.'
  },
  {
    id: 'yh170a',
    name: '영흥 산업용 동력분무기 YH170A',
    category: 'sprayer',
    image: '/images/7.png',
    modelName: 'YH170A (대용량용)',
    pressure: '5.0 - 6.0 MPa (50 - 60 kg/cm²)',
    flowRate: '83 - 104 L/min',
    power: '10.0 - 15.0 HP',
    rpm: '400 - 600 RPM',
    weight: '60.0 kg',
    features: [
      '초고압 토출 대형 방류 전용 열처리 피스톤 적용',
      '구제역/AI 및 수해 지역 전면 가축 방역 및 차량 거점시설 방역 특화',
      '대용량 안개분무 시설 및 육묘장에 특화',
          ],
    description: '광역 방역 및 거점소독 시설 대용량 안개분무 시설 및 육묘장 산업시설에 특화된 대용량 고성능 분무기입니다.'
  },
  {
    id: 'yh300a',
    name: '영흥 산업용 동력분무기 YH300A',
    category: 'sprayer',
    image: '/images/8.png',
    modelName: 'YH300A (초대용량)',
    pressure: '3 - 6 MPa (30 - 60 kg/cm²)',
    flowRate: '142 - 177 L/min',
    power: '15.0 - 20.0 HP',
    rpm: '400 - 500 RPM',
    weight: '65.0 kg',
    features: [
      '국내 최고 토출량 및 압력을 가진 대용량 분무기',
      '터널 공사장, 도로 비산 먼지 억제 및 세척, 대형 거점소독시설 맞춤형 사양', 
    ],
    description: '대형 산업 건설 기계 및 대형거점 소독시설, 토목 특수 현장  전용으로 소요동력 15-20마력에 이르는 고성능 고용량 분무기입니다.'
  }
];

export const PUMPS: Product[] = [
  {
    id: 'yh2500',
    name: '영흥 고효율 피스톤 펌프 YH2500',
    category: 'pump',
    image: '/images/9.png',
    modelName: 'YH2500 (표준형)',
    pressure: '0.5 - 1.0 MPa (5 - 10kg/cm²)',
    flowRate: '136 - 170 L/min(상용RPM기준) ', 
    power: '5.0 - 7.5 HP',
    rpm: '400 - 500 RPM',
    weight: '30.0 kg',
    features: [
      '40미리 흡토출 3련 피스톤식 고압펌프',
      '기존 양수기 대비 먼거리 및 높은 고도차에도 일정한 유량 및 압력의 양수가능',
    ],
    description: '일반적인 스프링 쿨러 및 접점관수에 사용되는 표준형 피스톤 펌프입니다.'
  },
  {
    id: 'yh2500_high',
    name: '영흥 특고압 피스톤 펌프 YH2500특고압',
    category: 'pump',
    image: '/images/10.png',
    modelName: 'YH2500 (특고압)',
    pressure: '1.5 - 2.5 MPa (15 - 25 kg/cm²)',
    flowRate: '136 - 170 L/min(상용RPM기준)',
    power: '7.5 - 10 HP',
    rpm: '400 - 500 RPM',
    weight: '30 kg',
    features: [
      '일반 통고무 피스톤이 아닌 신주피스톤 적용으로 고압의 환경에서 피스톤 파손 및 압력손실 최소화',
      '압력 조절기 장착으로 일반대비 높은 압력 송출 가능',
      '안개분무 시설이나 그물세척용등 양수량 및 압력이 동시에 필요한곳에 적합한 모델',
        ],
    description: '신주피스톤 및 압력조절기 적용으로 기존관수외 안개분무/염수분사시설등 다방면에 사용가능한 모델입니다.'
  },
  {
    id: 'yh4500',
    name: '영흥  피스톤 펌프 YH4500',
    category: 'pump',
    image: '/images/11.png',
    modelName: 'YH4500 (표준형)',
    pressure: '0.5 - 1.0 MPa (5 - 10 kg/cm²)',
    flowRate: '224 -280 L/min(상용RPM기준)',
    power: '5.0 - 10 HP',
    rpm: '400 - 500 RPM',
    weight: '40 kg',
    features: [
      '50미리 흡토출 3련 피스톤식 고압펌',
      '40미리 피스톤 대비 양수량 개선으로 관수능력 확대',
    ],
    description: '가장 폭넓은 용도로 사랑받는 다목적 농업용 펌프로, 최고의 유량 성능을 뽐냅니다.'
  },
  {
    id: 'yh4500_high',
    name: '영흥 특고압 피스톤 펌프 YH4500특고압',
    category: 'pump',
    image: '/images/12.png',
    modelName: 'YH4500 (특고압)',
    pressure: '1.5 - 2.5 MPa (15 - 25 kg/cm²)',
    flowRate: '224 - 280 L/min(상용RPM기준)',
    power: '7.5 - 10 HP',
    rpm: '400 - 500 RPM',
    weight: '40 kg',
    features: [
      '',
      '일반 통고무 피스톤이 아닌 신주피스톤 적용으로 고압의 환경에서 피스톤 파손 및 압력손실 최소화',
      '압력 조절기 장착으로 일반대비 높은 압력 송출 가능',
       ],
    description: '높은 양수량과 압력을 동시에 확보한 다목적 펌프입니다.'
  },
  {
    id: 'yh5500_high',
    name: '영흥 특고압 피스톤 펌프 YH5500특고압',
    category: 'pump',
    image: '/images/13.png',
    modelName: 'YH5500 (특고압)',
    pressure: '1.0 - 1.5 MPa (10 - 15 kg/cm²)',
    flowRate: '354 - 443 L/min(상용RPM기준)',
    power: '10 - 15 HP',
    rpm: '400 - 500 RPM',
    weight: '70 kg',
    features: [
      '신주피스톤 적용으로 고압의 환경에서 피스톤 파손 및 압력손실 최소화',
      '대용량 관수 시설 및 산업현장 염수분사시설등에 다목적으로 사용',
      ],
    description: '높은 양수량 및 압력을 가진 대용량  특고압 펌프입니다.'
  },
  {
    id: 'yh6500_high',
    name: '영흥 명품 특고압 피스톤 펌프 YH6500특고압',
    category: 'pump',
    image: '/images/14.png',
    modelName: 'YH6500 (특고압 최고사양)',
    pressure: '0.5 - 10 MPa (5 - 10 kg/cm²)',
    flowRate: '522 - 653 L/min(상용RPM기준)',
    power: '15 - 20.0 HP',
    rpm: '400 - 600 RPM',
    weight: '80.0 kg',
    features: [
      '피스톤 펌프 라인업 중 최고의 양수량을 지원하는 국내 최고 대형 모델',
      '강원도 고랭지등 높은고도차 및 긴거리 넚은 영역의 관수가 가능한 최고 유량',
      '신주피스톤적용으로 높은유량 및 압력으로 인한 피스톤 파손 방지',
     ],
    description: '국내 피스톤 펌프중 최고의 압력과 유량을 보유한 최대용량 피스톤펌프입니다.'
  }
];

export const CORE_VALUES = [
  {
    title: '50년 이상의 노하우',
    description: '영흥분무기는 1980년대부터 오직 농기계 분무기 및 피스톤 펌프에 매진하여 대한민국의 식량 안보와 영농 발전에 밑거름이 되어 왔습니다.'
  },
  {
    title: '고성능 & 강한 내구력',
    description: '모든 주요부품들의 국산화 적용으로 믿을수 있는 품질과 강한 내구력 그리고 노하우로 고성능 분무기 및 피스톤펌프를 보유하고 있읍니다.'
  },
  {
    title: 'SS기 제조사 정식 납품',
    description: '한성, 한아, 한서 등 국내 명품 프리미엄 SS기(Speed Sprayer)에 오랫동안 납품되어 적용되어 신뢰성이 높은 프리미엄 브랜드입니다.'
  },
  {
    title: '철저하고 신속한 AS',
    description: '자체 전담 AS운용으로 택배나 방문수리 당일 출고가능하게 신속한 AS를 제공하고 있으며 모든 부품들에 대해 안정적인 공급을 보장합니다.'
  }
];
