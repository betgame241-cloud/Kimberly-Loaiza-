import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, Search, User, Bookmark, Archive, Activity, Bell, Clock, 
  BarChart2, BadgeCheck, Sliders, ChevronRight, Info, ChevronDown, Infinity,
  Edit2, Check, Copy, Eye, MessageCircle, Users, Play, MapPin, Upload, Database
} from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
  onOpenEditDB: () => void;
}

const MenuItem = ({ icon: Icon, label, rightText, onClick }: any) => (
  <button onClick={onClick} className="w-full flex items-center justify-between py-3.5 hover:bg-neutral-900 active:bg-neutral-800 rounded-lg px-2 transition-colors group">
     <div className="flex items-center gap-3.5">
        <Icon className="w-6 h-6 text-white group-hover:scale-105 transition-transform" strokeWidth={1.5} />
        <span className="text-[15px] text-white">{label}</span>
     </div>
     <div className="flex items-center gap-2">
        {rightText && <span className="text-sm text-neutral-500">{rightText}</span>}
        <ChevronRight className="w-5 h-5 text-neutral-500" strokeWidth={1.5} />
     </div>
  </button>
);

// --- INTERACCIONES VIEW (Dark Mode with Persistence) ---
const InteractionsView = ({ onBack }: { onBack: () => void }) => {
   const [isEditing, setIsEditing] = useState(false);
   
   // Initial State Helper for Interactions
   const [data, setData] = useState(() => {
       const saved = localStorage.getItem('insta_stats_interactions');
       return saved ? JSON.parse(saved) : {
           interactions: '4',
           followersPercent: '50.0',
           nonFollowersPercent: '50.0',
           dateRange: '7 de dic - 5 de ene',
           publicationsPercent: '100'
       };
   });

   // Persist on change
   useEffect(() => {
       localStorage.setItem('insta_stats_interactions', JSON.stringify(data));
   }, [data]);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       setData({ ...data, [e.target.name]: e.target.value });
   };

   return (
      <div className="fixed inset-0 z-[60] bg-black text-white flex flex-col animate-in slide-in-from-right duration-300 font-sans">
         <div className="flex items-center justify-between px-4 py-3 bg-black border-b border-neutral-800">
            <button onClick={onBack}><ArrowLeft className="w-7 h-7 text-white" strokeWidth={2} /></button>
            <h2 className="text-[19px] font-bold text-white">Interacciones</h2>
            <div className="flex items-center gap-4">
                 <button onClick={() => setIsEditing(!isEditing)} className="text-blue-500">
                    {isEditing ? <Check className="w-6 h-6" /> : <Edit2 className="w-6 h-6" />}
                </button>
                <Info className="w-7 h-7 text-white" strokeWidth={1.5} />
            </div>
         </div>

         <div className="flex-1 overflow-y-auto px-5 py-2">
             <div className="flex justify-between items-center mb-8 mt-4">
                <button className="bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-full text-[15px] font-semibold flex items-center gap-1 text-white">
                   Últimos 30 días <ChevronDown size={16} />
                </button>
                {isEditing ? (
                    <input 
                        name="dateRange"
                        value={data.dateRange}
                        onChange={handleChange}
                        className="bg-neutral-800 text-white text-[15px] font-bold rounded p-1 text-right w-40 outline-none border border-neutral-700"
                    />
                ) : (
                    <div className="text-[15px] font-bold text-neutral-400">{data.dateRange}</div>
                )}
             </div>

             <div className="flex flex-col items-center mb-10">
                 <div className="relative w-64 h-64 mb-6">
                     <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                         <circle cx="50" cy="50" r="40" fill="none" stroke="#7c3aed" strokeWidth="8" strokeDasharray="125 251" strokeDashoffset="0" strokeLinecap="round" />
                         <circle cx="50" cy="50" r="40" fill="none" stroke="#d946ef" strokeWidth="8" strokeDasharray="125 251" strokeDashoffset="-125" strokeLinecap="round" />
                     </svg>
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                         <span className="text-neutral-400 text-[15px] mb-1">Interacciones</span>
                         {isEditing ? (
                            <input name="interactions" value={data.interactions} onChange={handleChange} className="bg-transparent text-5xl font-bold tracking-tighter text-center w-32 border-b border-neutral-700 outline-none text-white" />
                         ) : (
                            <span className="text-5xl font-bold tracking-tighter text-white">{data.interactions}</span>
                         )}
                     </div>
                 </div>

                 <div className="w-full space-y-4">
                     <div className="flex justify-between items-center">
                         <div className="flex items-center gap-2">
                             <div className="w-2.5 h-2.5 rounded-full bg-fuchsia-500"></div>
                             <span className="text-[15px] text-white">Seguidores</span>
                         </div>
                         <div className="flex items-center gap-1">
                             {isEditing ? <input name="followersPercent" value={data.followersPercent} onChange={handleChange} className="bg-neutral-800 text-white text-[15px] text-right w-16 rounded p-1 outline-none" /> : <span className="text-[15px] text-white">{data.followersPercent}%</span>}
                         </div>
                     </div>
                     <div className="flex justify-between items-center">
                         <div className="flex items-center gap-2">
                             <div className="w-2.5 h-2.5 rounded-full bg-violet-600"></div>
                             <span className="text-[15px] text-white">No seguidores</span>
                         </div>
                         <div className="flex items-center gap-1">
                             {isEditing ? <input name="nonFollowersPercent" value={data.nonFollowersPercent} onChange={handleChange} className="bg-neutral-800 text-white text-[15px] text-right w-16 rounded p-1 outline-none" /> : <span className="text-[15px] text-white">{data.nonFollowersPercent}%</span>}
                         </div>
                     </div>
                 </div>
             </div>
             
             <div className="w-full">
                <h3 className="font-bold mb-4 text-[17px] text-white">Por tipo de contenido</h3>
                <div className="flex gap-3 mb-8 overflow-x-auto no-scrollbar">
                    <button className="bg-neutral-800 text-white px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap border border-neutral-700">Todos</button>
                    <button className="bg-black text-white px-5 py-2 rounded-full text-sm font-semibold border border-neutral-700 whitespace-nowrap">Seguidores</button>
                     <button className="bg-black text-white px-5 py-2 rounded-full text-sm font-semibold border border-neutral-700 whitespace-nowrap">No seguidores</button>
                </div>
                 <div className="mb-3 text-[15px] text-white">Publicaciones</div>
                 <div className="flex items-center gap-4 mb-4">
                     <div className="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden flex">
                         <div className="h-full bg-fuchsia-500" style={{ width: `${parseFloat(data.followersPercent)}%` }}></div>
                         <div className="h-full bg-violet-600" style={{ width: `${parseFloat(data.nonFollowersPercent)}%` }}></div>
                     </div>
                     <span className="text-[15px] text-white font-medium">{data.publicationsPercent}%</span>
                 </div>
             </div>
         </div>
      </div>
   )
}

// --- VISUALIZACIONES VIEW (Dark Mode Updated with Persistence) ---
const ViewsView = ({ onBack }: { onBack: () => void }) => {
   const [isEditing, setIsEditing] = useState(false);
   
   // Initial State with LocalStorage
   const [data, setData] = useState(() => {
       const saved = localStorage.getItem('insta_stats_views');
       return saved ? JSON.parse(saved) : {
           dateRange: '26 de jul. - 24 de ago.',
           // Breakdown
           storiesPercent: '46.4',
           postsPercent: '46.2',
           reelsPercent: '7.4',
           // Top Content (Thumbnails)
           topContent: [
               { id: 1, views: '740 mil', date: '28 de jul.', img: 'https://picsum.photos/id/64/200/300' },
               { id: 2, views: '374 mil', date: '27 de jul.', img: 'https://picsum.photos/id/65/200/300' },
               { id: 3, views: '353 mil', date: '31 de jul.', img: 'https://picsum.photos/id/66/200/300' },
               { id: 4, views: '311 mil', date: '26 de jul.', img: 'https://picsum.photos/id/67/200/300' },
           ],
           // Cities
           cities: [
               { name: 'Culiacán', percent: '15.7' },
               { name: 'Tijuana', percent: '5.0' },
               { name: 'Mazatlán', percent: '3.6' },
           ]
       };
   });

   // Persist on change
   useEffect(() => {
       localStorage.setItem('insta_stats_views', JSON.stringify(data));
   }, [data]);
   
   const fileInputRef = useRef<HTMLInputElement>(null);
   const [selectedContentIndex, setSelectedContentIndex] = useState<number | null>(null);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       setData({ ...data, [e.target.name]: e.target.value });
   };

   const handleTopContentChange = (index: number, field: string, value: string) => {
       const newContent = [...data.topContent];
       newContent[index] = { ...newContent[index], [field]: value };
       setData({ ...data, topContent: newContent });
   };
   
   const handleContentImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && selectedContentIndex !== null) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            const newContent = [...data.topContent];
            newContent[selectedContentIndex] = { ...newContent[selectedContentIndex], img: url };
            setData({ ...data, topContent: newContent });
            setSelectedContentIndex(null);
        }
    };

   const handleCityChange = (index: number, field: string, value: string) => {
       const newCities = [...data.cities];
       newCities[index] = { ...newCities[index], [field]: value };
       setData({ ...data, cities: newCities });
   };

   return (
      <div className="fixed inset-0 z-[60] bg-black text-white flex flex-col animate-in slide-in-from-right duration-300 font-sans">
         {/* Header */}
         <div className="flex items-center justify-between px-4 py-3 bg-black border-b border-neutral-800">
            <button onClick={onBack}><ArrowLeft className="w-7 h-7 text-white" strokeWidth={2} /></button>
            <h2 className="text-[19px] font-bold text-white">Visualizaciones</h2>
            <div className="ml-auto flex items-center gap-4">
                <button onClick={() => setIsEditing(!isEditing)} className="text-blue-500">
                    {isEditing ? <Check className="w-6 h-6" /> : <Edit2 className="w-6 h-6" />}
                </button>
                <Info className="w-7 h-7 text-white" strokeWidth={1.5} />
            </div>
         </div>

         <div className="flex-1 overflow-y-auto px-5 py-2">
             {/* Date Dropdown */}
             <div className="flex justify-between items-center mb-8 mt-4">
                <button className="bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-full text-[15px] font-semibold flex items-center gap-1 text-white">
                   Últimos 30 días <ChevronDown size={16} />
                </button>
                {isEditing ? (
                    <input name="dateRange" value={data.dateRange} onChange={handleChange} className="bg-neutral-800 text-white text-[15px] font-bold rounded p-1 text-right w-40 outline-none border border-neutral-700" />
                ) : (
                    <div className="text-[14px] font-semibold text-neutral-400">{data.dateRange}</div>
                )}
             </div>

             {/* Breakdown Bars (Pink/Purple) */}
             <div className="space-y-6 mb-10">
                 {/* Historias */}
                 <div>
                     <div className="flex justify-between mb-1.5">
                         <span className="text-[15px] text-neutral-300">Historias</span>
                         {isEditing ? (
                            <input name="storiesPercent" value={data.storiesPercent} onChange={handleChange} className="w-16 text-right bg-neutral-800 text-white rounded px-1" />
                         ) : (
                            <span className="text-[15px] text-neutral-300 font-medium">{data.storiesPercent}%</span>
                         )}
                     </div>
                     <div className="h-2.5 w-full bg-neutral-800 rounded-full overflow-hidden flex">
                         {/* Pink/Purple lines */}
                         <div className="h-full bg-[#D300C5]" style={{ width: `60%` }}></div>
                         <div className="h-full bg-[#6A00F4]" style={{ width: `40%` }}></div>
                     </div>
                 </div>
                 {/* Publicaciones */}
                 <div>
                     <div className="flex justify-between mb-1.5">
                         <span className="text-[15px] text-neutral-300">Publicaciones</span>
                         {isEditing ? (
                            <input name="postsPercent" value={data.postsPercent} onChange={handleChange} className="w-16 text-right bg-neutral-800 text-white rounded px-1" />
                         ) : (
                            <span className="text-[15px] text-neutral-300 font-medium">{data.postsPercent}%</span>
                         )}
                     </div>
                     <div className="h-2.5 w-full bg-neutral-800 rounded-full overflow-hidden flex">
                          <div className="h-full bg-[#D300C5]" style={{ width: `40%` }}></div>
                          <div className="h-full bg-[#6A00F4]" style={{ width: `60%` }}></div>
                     </div>
                 </div>
                 {/* Reels */}
                 <div>
                     <div className="flex justify-between mb-1.5">
                         <span className="text-[15px] text-neutral-300">Reels</span>
                         {isEditing ? (
                            <input name="reelsPercent" value={data.reelsPercent} onChange={handleChange} className="w-16 text-right bg-neutral-800 text-white rounded px-1" />
                         ) : (
                            <span className="text-[15px] text-neutral-300 font-medium">{data.reelsPercent}%</span>
                         )}
                     </div>
                     <div className="h-2.5 rounded-full overflow-hidden flex" style={{ width: `${parseFloat(data.reelsPercent)}%`, minWidth: '10%' }}>
                          <div className="h-full bg-[#D300C5] w-1/2"></div>
                          <div className="h-full bg-[#6A00F4] w-1/2"></div>
                     </div>
                 </div>

                 {/* Legend */}
                 <div className="flex justify-center gap-6 mt-6">
                     <div className="flex items-center gap-2">
                         <div className="w-2.5 h-2.5 rounded-full bg-[#D300C5]"></div>
                         <span className="text-xs text-neutral-400 font-medium">Seguidores</span>
                     </div>
                     <div className="flex items-center gap-2">
                         <div className="w-2.5 h-2.5 rounded-full bg-[#6A00F4]"></div>
                         <span className="text-xs text-neutral-400 font-medium">No seguidores</span>
                     </div>
                 </div>
             </div>

             {/* Top Content */}
             <div className="mb-8">
                 <div className="flex justify-between items-center mb-4">
                     <h3 className="text-[17px] font-bold text-white">Por contenido principal</h3>
                     <button className="text-[15px] text-blue-500 font-semibold">Ver todo</button>
                 </div>
                 
                 <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                     {data.topContent.map((item, idx) => (
                         <div key={item.id} className="relative flex-none w-[110px] aspect-[9/14] rounded-lg overflow-hidden bg-neutral-800 border border-neutral-800 group">
                             <img src={item.img} className="w-full h-full object-cover opacity-80" />
                             
                             <div className="absolute top-1.5 right-1.5 bg-black/50 p-1 rounded">
                                <Play size={12} fill="white" className="text-white" />
                             </div>
                             
                             {/* Overlay for editing image */}
                             {isEditing && (
                                <div 
                                    className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer z-10"
                                    onClick={() => {
                                        setSelectedContentIndex(idx);
                                        fileInputRef.current?.click();
                                    }}
                                >
                                    <Upload size={24} className="text-white opacity-80" />
                                </div>
                             )}

                             <div className="absolute bottom-2 left-2 right-2 z-20">
                                 {isEditing ? (
                                    <input 
                                        value={item.views} 
                                        onChange={(e) => handleTopContentChange(idx, 'views', e.target.value)}
                                        className="w-full text-xs font-bold bg-neutral-800 rounded px-1 text-white mb-1" 
                                    />
                                 ) : (
                                    <div className="bg-white/90 rounded px-1.5 py-0.5 inline-block mb-1">
                                        <span className="text-[11px] font-bold text-black">{item.views}</span>
                                    </div>
                                 )}
                                 {isEditing ? (
                                     <input 
                                        value={item.date}
                                        onChange={(e) => handleTopContentChange(idx, 'date', e.target.value)}
                                        className="w-full text-[10px] bg-neutral-800 rounded px-1 text-neutral-400"
                                     />
                                 ) : (
                                     <div className="text-[10px] text-white font-medium drop-shadow-md">{item.date}</div>
                                 )}
                             </div>
                         </div>
                     ))}
                 </div>
                 <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleContentImageUpload}
                />
             </div>

             {/* Audience / Cities */}
             <div className="mb-10">
                 <div className="flex items-center gap-2 mb-4">
                     <h3 className="text-[17px] font-bold text-white">Público</h3>
                     <Info size={16} className="text-neutral-500" />
                 </div>

                 <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
                     <h4 className="text-[15px] font-bold text-white mb-4">Principales ciudades</h4>
                     <div className="space-y-5">
                         {data.cities.map((city, idx) => (
                             <div key={idx} className="flex flex-col gap-1">
                                 <div className="flex justify-between items-end">
                                     {isEditing ? (
                                        <input 
                                            value={city.name} 
                                            onChange={(e) => handleCityChange(idx, 'name', e.target.value)}
                                            className="text-[15px] text-neutral-400 bg-neutral-800 rounded px-1" 
                                        />
                                     ) : (
                                        <span className="text-[15px] text-neutral-400">{city.name}</span>
                                     )}
                                     {isEditing ? (
                                        <input 
                                            value={city.percent} 
                                            onChange={(e) => handleCityChange(idx, 'percent', e.target.value)}
                                            className="text-[15px] font-bold text-white text-right w-16 bg-neutral-800 rounded px-1" 
                                        />
                                     ) : (
                                        <span className="text-[15px] font-bold text-white">{city.percent}%</span>
                                     )}
                                 </div>
                                 <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                                     <div 
                                        className="h-full bg-[#D300C5]" 
                                        style={{ width: `${parseFloat(city.percent)}%` }}
                                     ></div>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>
             </div>

         </div>
      </div>
   )
}

// --- AUDIENCE VIEW (Dark Mode with Persistence) ---
const AudienceView = ({ onBack }: { onBack: () => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'age_gender' | 'countries'>('age_gender');
  
  // Initial State with LocalStorage
  const [data, setData] = useState(() => {
      const saved = localStorage.getItem('insta_stats_audience');
      return saved ? JSON.parse(saved) : {
        womenPercent: '71',
        menPercent: '29',
        ages: [
          { label: '35-44', percent: '41.5' },
          { label: '45-54', percent: '23.4' },
          { label: 'Other', percent: '21.9' },
          { label: '25-34', percent: '13.2' },
        ],
        countries: [
           { label: 'México', percent: '55.0' },
           { label: 'Colombia', percent: '15.0' },
           { label: 'Estados Unidos', percent: '10.0' },
           { label: 'Argentina', percent: '5.0' },
        ],
        discovery: [
          { label: 'Friends and followers', percent: '90.0' },
          { label: 'Exploration', percent: '3.0' },
          { label: 'Search', percent: '3.0' },
          { label: 'Other', percent: '2.0' },
        ]
      };
  });

  // Persist
  useEffect(() => {
      localStorage.setItem('insta_stats_audience', JSON.stringify(data));
  }, [data]);

  const handleAgeChange = (index: number, field: 'label' | 'percent', val: string) => {
      const newAges = [...data.ages];
      newAges[index] = { ...newAges[index], [field]: val };
      setData({ ...data, ages: newAges });
  };

  const handleCountryChange = (index: number, field: 'label' | 'percent', val: string) => {
      const newCountries = [...data.countries];
      newCountries[index] = { ...newCountries[index], [field]: val };
      setData({ ...data, countries: newCountries });
  };

  const handleDiscoveryChange = (index: number, field: 'label' | 'percent', val: string) => {
      const newDisc = [...data.discovery];
      newDisc[index] = { ...newDisc[index], [field]: val };
      setData({ ...data, discovery: newDisc });
  };

  const activeData = activeTab === 'age_gender' ? data.ages : data.countries;

  return (
    <div className="fixed inset-0 z-[60] bg-black text-white flex flex-col animate-in slide-in-from-right duration-300 font-sans">
        {/* Header */}
        <div className="bg-black px-4 py-3 flex items-center justify-between border-b border-neutral-800">
             <div className="flex items-center gap-4">
                 <button onClick={onBack}><ArrowLeft className="w-7 h-7 text-white" /></button>
                 <h2 className="text-[19px] font-bold text-white">Panel profesional</h2>
             </div>
             <button 
                onClick={() => setIsEditing(!isEditing)} 
                className={`text-sm font-semibold px-3 py-1.5 rounded transition-colors ${isEditing ? 'bg-green-900/30 text-green-400' : 'bg-blue-900/30 text-blue-400'}`}
             >
                {isEditing ? 'Guardar' : 'Editar Cifras'}
             </button>
        </div>

        {/* Tabs */}
        <div className="bg-black flex items-center px-4 pt-1 mb-2">
            <div className="flex items-center gap-6">
                <button className="px-3 py-3 text-[15px] font-semibold text-neutral-500">Inicio</button>
                <button className="px-3 py-3 text-[15px] font-semibold text-blue-500 border-b-[2px] border-blue-500">Estadísticas</button>
                <button className="px-3 py-3 text-[15px] font-semibold text-neutral-500">Contenido</button>
                <button className="px-3 py-3 text-[15px] font-semibold text-neutral-500">Inte...</button>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {/* Demographics Card */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
                <div className="flex items-center gap-4 mb-6">
                     <button 
                        onClick={() => setActiveTab('age_gender')}
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${activeTab === 'age_gender' ? 'bg-blue-600 text-white' : 'text-neutral-400'}`}
                     >
                        Age & gender
                     </button>
                     <button 
                        onClick={() => setActiveTab('countries')}
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${activeTab === 'countries' ? 'bg-transparent text-neutral-400 hover:text-white' : 'text-neutral-400'}`}
                     >
                        Top countries
                     </button>
                </div>

                {activeTab === 'age_gender' && (
                    <div className="flex items-center gap-6 mb-6 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                            {isEditing ? (
                                <input 
                                    value={data.womenPercent} 
                                    onChange={(e) => setData({...data, womenPercent: e.target.value})}
                                    className="bg-neutral-800 text-white w-10 text-center rounded border border-neutral-700"
                                /> 
                            ) : (
                                <span className="text-neutral-400 font-medium">Women {data.womenPercent}%</span>
                            )}
                        </div>
                         <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-neutral-600"></div>
                            {isEditing ? (
                                <input 
                                    value={data.menPercent} 
                                    onChange={(e) => setData({...data, menPercent: e.target.value})}
                                    className="bg-neutral-800 text-white w-10 text-center rounded border border-neutral-700"
                                /> 
                            ) : (
                                <span className="text-neutral-400 font-medium">Men {data.menPercent}%</span>
                            )}
                        </div>
                    </div>
                )}

                {/* Bars List */}
                <div className="space-y-6">
                    {activeData.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-[15px]">
                            {isEditing ? (
                                <input 
                                    value={item.label}
                                    onChange={(e) => activeTab === 'age_gender' ? handleAgeChange(idx, 'label', e.target.value) : handleCountryChange(idx, 'label', e.target.value)}
                                    className="w-24 bg-neutral-800 rounded px-1 border border-neutral-700 text-white font-medium"
                                />
                            ) : (
                                <span className="text-neutral-400 font-medium w-24">{item.label}</span>
                            )}
                            
                            <div className="flex-1 mx-4 h-3 bg-neutral-800 rounded-full relative overflow-hidden">
                                <div 
                                    className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
                                    style={{ width: `${parseFloat(item.percent)}%` }}
                                ></div>
                            </div>
                            
                            {isEditing ? (
                                <input 
                                    value={item.percent}
                                    onChange={(e) => activeTab === 'age_gender' ? handleAgeChange(idx, 'percent', e.target.value) : handleCountryChange(idx, 'percent', e.target.value)}
                                    className="w-16 text-right bg-neutral-800 rounded px-1 border border-neutral-700 font-bold text-white"
                                />
                            ) : (
                                <span className="font-bold text-white min-w-[3rem] text-right">{item.percent}%</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Discovery Card */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-lg font-bold text-white">How people find your content</h3>
                    <Info size={16} className="text-neutral-400" />
                </div>

                <div className="flex gap-3 mb-6">
                    <button className="bg-neutral-700 text-white px-5 py-1.5 rounded-full text-sm font-semibold">Traffic</button>
                    <button className="bg-neutral-800 text-neutral-400 px-5 py-1.5 rounded-full text-sm font-semibold border border-neutral-700">Source</button>
                </div>

                 <div className="space-y-6">
                    {data.discovery.map((item, idx) => (
                        <div key={idx} className="flex flex-col gap-1.5">
                            <div className="flex justify-between items-center">
                                {isEditing ? (
                                    <input 
                                        value={item.label}
                                        onChange={(e) => handleDiscoveryChange(idx, 'label', e.target.value)}
                                        className="w-full bg-neutral-800 rounded px-1 border border-neutral-700 text-white font-medium mb-1"
                                    />
                                ) : (
                                    <span className="text-neutral-400 font-medium text-[15px] leading-tight max-w-[70%]">{item.label}</span>
                                )}
                                {isEditing ? (
                                    <input 
                                        value={item.percent}
                                        onChange={(e) => handleDiscoveryChange(idx, 'percent', e.target.value)}
                                        className="w-16 text-right bg-neutral-800 rounded px-1 border border-neutral-700 font-bold text-white"
                                    />
                                ) : (
                                    <span className="font-bold text-white text-[15px]">{item.percent}%</span>
                                )}
                            </div>
                            <div className="w-full h-3 bg-neutral-800 rounded-full relative overflow-hidden">
                                <div 
                                    className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
                                    style={{ width: `${parseFloat(item.percent)}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    </div>
  );
};

// --- STATS MENU VIEW (Dark Mode) ---
const StatsMenuView = ({ onBack, onSelect }: { onBack: () => void, onSelect: (view: 'interactions' | 'views' | 'audience') => void }) => {
    return (
        <div className="fixed inset-0 z-50 bg-black text-white flex flex-col animate-in slide-in-from-right duration-300 md:max-w-md md:left-auto md:right-0 md:border-l md:border-neutral-800 md:shadow-2xl">
            <div className="flex items-center gap-4 p-4 border-b border-neutral-800 h-14 bg-black">
                <button onClick={onBack}><ArrowLeft className="w-6 h-6 text-white" /></button>
                <h2 className="text-lg font-bold">Estadísticas</h2>
            </div>
            <div className="p-4 space-y-2">
                <MenuItem icon={Eye} label="Visualizaciones" onClick={() => onSelect('views')} />
                <MenuItem icon={MessageCircle} label="Interacciones" onClick={() => onSelect('interactions')} />
                <MenuItem icon={Users} label="Audiencia" onClick={() => onSelect('audience')} />
            </div>
        </div>
    );
};

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, onOpenEditDB }) => {
  const [view, setView] = useState<'menu' | 'stats_menu' | 'interactions' | 'views' | 'audience'>('menu');

  if (view === 'stats_menu') {
      return <StatsMenuView onBack={() => setView('menu')} onSelect={(v) => setView(v)} />;
  }
  if (view === 'interactions') {
      return <InteractionsView onBack={() => setView('stats_menu')} />;
  }
  if (view === 'views') {
      return <ViewsView onBack={() => setView('stats_menu')} />;
  }
  if (view === 'audience') {
      return <AudienceView onBack={() => setView('stats_menu')} />;
  }

  const copyPublicLink = () => {
     const url = new URL(window.location.href);
     url.searchParams.set('view', 'public');
     navigator.clipboard.writeText(url.toString());
     alert("Enlace público copiado al portapapeles: " + url.toString());
  };

  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex flex-col animate-in slide-in-from-right duration-300 md:max-w-md md:left-auto md:right-0 md:border-l md:border-neutral-800 md:shadow-2xl">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-neutral-800 h-14">
        <button onClick={onClose}><ArrowLeft className="w-6 h-6" /></button>
        <h2 className="text-lg font-bold">Configuración y actividad</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2">
        {/* Search */}
        <div className="relative my-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input 
            type="text" 
            placeholder="Buscar" 
            className="w-full bg-neutral-900 rounded-xl py-2 pl-10 pr-4 text-[15px] outline-none placeholder:text-neutral-500 text-white"
          />
        </div>

        {/* Account Center */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-neutral-500 mb-2 px-2">Tu cuenta</h3>
          <div className="flex items-center justify-between p-4 bg-neutral-900 rounded-xl mb-3 cursor-pointer hover:bg-neutral-800 transition-colors">
             <div className="flex items-center gap-4">
                <User className="w-7 h-7 text-white" />
                <div>
                   <div className="text-[15px] leading-tight mb-0.5 text-white">Centro de cuentas</div>
                   <div className="text-xs text-neutral-400 leading-tight">Contraseñas, seguridad, datos personales, anuncios</div>
                </div>
             </div>
             <ChevronRight className="w-5 h-5 text-neutral-500" />
          </div>
          <div className="text-xs text-neutral-400 font-semibold flex items-center gap-1 px-2">
             <Infinity size={14} className="text-blue-500" />
             <span className="text-blue-500 font-bold">Meta</span>
             Centro de cuentas
          </div>
        </div>

        {/* Clone/Share Section */}
        <div className="mb-2 border-t border-neutral-900 pt-4">
           <h3 className="text-sm font-semibold text-neutral-500 mb-1 px-2">Herramientas del clon</h3>
           <MenuItem icon={Database} label="Editar Base de Datos" onClick={() => { onOpenEditDB(); onClose(); }} />
           <MenuItem icon={Copy} label="Copiar enlace público" rightText="Modo lectura" onClick={copyPublicLink} />
        </div>

        {/* How you use Instagram */}
        <div className="mb-2 border-t border-neutral-900 pt-4">
           <h3 className="text-sm font-semibold text-neutral-500 mb-1 px-2">Cómo usas Instagram</h3>
           <div className="text-white">
              <MenuItem icon={Bookmark} label="Guardado" />
              <MenuItem icon={Archive} label="Archivo" />
              <MenuItem icon={Activity} label="Tu actividad" />
              <MenuItem icon={Bell} label="Notificaciones" />
              <MenuItem icon={Clock} label="Administración del tiempo" />
           </div>
        </div>

        {/* For Professionals */}
        <div className="mb-6 border-t border-neutral-900 pt-4">
           <h3 className="text-sm font-semibold text-neutral-500 mb-1 px-2">Para profesionales</h3>
           <div>
              <MenuItem icon={BarChart2} label="Estadísticas" onClick={() => setView('stats_menu')} />
              <MenuItem icon={BadgeCheck} label="Muestra que tu perfil está verificado" rightText="Sin suscripción" />
              <MenuItem icon={Sliders} label="Controles y herramientas para creadores" />
           </div>
        </div>
      </div>
    </div>
  );
};