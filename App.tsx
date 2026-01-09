import React, { useState, useEffect } from 'react';
import { INITIAL_PROFILE } from './constants';
import { ProfileData, Post } from './types';
import { 
  Menu, Bell, ChevronDown, UserPlus, Grid, PlaySquare, 
  UserSquare2, ArrowLeft, MoreVertical, Link as LinkIcon,
  Database, Edit3, Heart, MessageCircle, Home, Search, Compass, Film, MessageSquare, PlusSquare, Settings
} from 'lucide-react';
import { EditProfileModal } from './components/EditProfileModal';
import { ImageEditorModal } from './components/ImageEditorModal';
import { SettingsModal } from './components/SettingsModal';

type Tab = 'grid' | 'reels' | 'tagged';

const App = () => {
  // Initialize state from localStorage if available, otherwise use INITIAL_PROFILE
  const [profileData, setProfileData] = useState<ProfileData>(() => {
    const savedData = localStorage.getItem('insta_profile_data');
    return savedData ? JSON.parse(savedData) : INITIAL_PROFILE;
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('grid');

  // Save to localStorage whenever profileData changes
  useEffect(() => {
    localStorage.setItem('insta_profile_data', JSON.stringify(profileData));
  }, [profileData]);

  const handleUpdateProfile = (newData: ProfileData) => {
    setProfileData(newData);
  };

  const handleUpdatePostImage = (postId: string, newUrl: string, newType: 'image' | 'video') => {
    setProfileData(prev => {
      const updatePost = (p: Post) => p.id === postId ? { ...p, imageUrl: newUrl, type: newType } : p;

      const inPosts = prev.posts.some(p => p.id === postId);
      if (inPosts) {
        return { ...prev, posts: prev.posts.map(updatePost) };
      }
      const inReels = prev.reels.some(p => p.id === postId);
      if (inReels) {
        return { ...prev, reels: prev.reels.map(updatePost) };
      }
      const inTagged = prev.tagged.some(p => p.id === postId);
      if (inTagged) {
        return { ...prev, tagged: prev.tagged.map(updatePost) };
      }
      return prev;
    });
  };

  const handleDeletePost = (postId: string) => {
    setProfileData(prev => ({
      ...prev,
      posts: prev.posts.filter(p => p.id !== postId),
      reels: prev.reels.filter(p => p.id !== postId),
      tagged: prev.tagged.filter(p => p.id !== postId),
    }));
    setSelectedPost(null);
  };

  // Sidebar Component for Desktop
  const Sidebar = () => (
    <div className="hidden md:flex flex-col w-[245px] h-screen sticky top-0 border-r border-neutral-800 p-4 pb-8 z-40 bg-black">
        <div className="mb-10 px-2 mt-4">
             {/* Instagram Logo Text Placeholder */}
            <h1 className="text-2xl font-bold font-serif italic tracking-wider">Instagram</h1>
        </div>
        <nav className="flex-1 flex flex-col gap-2">
            {[
                { icon: Home, label: "Inicio" },
                { icon: Search, label: "Búsqueda" },
                { icon: Compass, label: "Explorar" },
                { icon: Film, label: "Reels" },
                { icon: MessageSquare, label: "Mensajes" },
                { icon: Heart, label: "Notificaciones" },
                { icon: PlusSquare, label: "Crear" },
            ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 hover:bg-white/10 rounded-lg cursor-pointer transition-colors group">
                    <item.icon size={24} className="group-hover:scale-105 transition-transform" />
                    <span className="text-[16px] font-medium">{item.label}</span>
                </div>
            ))}
             <div className="flex items-center gap-4 p-3 hover:bg-white/10 rounded-lg cursor-pointer transition-colors font-bold">
                 <img src={profileData.profilePicUrl} className="w-6 h-6 rounded-full border border-neutral-500" />
                 <span>Perfil</span>
            </div>
        </nav>
        
        <div 
            onClick={() => setIsSettingsOpen(true)}
            className="mt-auto flex items-center gap-4 p-3 hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
        >
            <Menu size={24} />
            <span className="text-[16px]">Más</span>
        </div>
    </div>
  );

  // Bottom Nav for Mobile
  const MobileBottomNav = () => (
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-12 bg-black border-t border-neutral-800 flex items-center justify-around z-30 px-2">
          <Home size={24} strokeWidth={2} />
          <Compass size={24} strokeWidth={2} />
          <PlusSquare size={24} strokeWidth={2} />
          <Film size={24} strokeWidth={2} />
          <div className="w-6 h-6 rounded-full overflow-hidden border border-white">
              <img src={profileData.profilePicUrl} className="w-full h-full object-cover" />
          </div>
      </div>
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-row">
      
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 w-full flex justify-center overflow-x-hidden">
        <div className="w-full max-w-[935px] flex flex-col pb-20 md:pb-0">
            
            {/* Mobile Top Header */}
            <header className="md:hidden sticky top-0 z-30 bg-black border-b border-neutral-800 px-4 py-2 flex items-center justify-between h-14">
                <div className="flex items-center gap-6">
                    <ArrowLeft className="w-6 h-6 text-white cursor-pointer" />
                    <div className="flex items-center gap-1">
                        <h1 className="font-bold text-lg text-white">{profileData.username}</h1>
                        {profileData.isVerified && (
                            <svg className="w-3.5 h-3.5 text-blue-500 fill-current" viewBox="0 0 24 24">
                                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .495.083.965.238 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.015-.015-2.653-1.772c-.238-.158-.335-.46-.223-.72.113-.26.402-.383.653-.25l.017.012 2.11 1.4 3.658-5.487c.15-.224.46-.282.684-.132.224.15.283.46.134.684l-.01.013z" />
                            </svg>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-5 text-white">
                    <Bell className="w-6 h-6" />
                    <button onClick={() => setIsSettingsOpen(true)}>
                        <MoreVertical className="w-6 h-6" />
                    </button>
                </div>
            </header>

            {/* Profile Section Wrapper */}
            <div className="px-4 pt-3 pb-2 md:pt-8 md:px-0 md:pb-12">
                
                {/* Flex container for responsive layout */}
                <div className="md:flex md:items-start md:gap-12 md:mb-10 md:ml-10">
                    
                    {/* Profile Pic */}
                    <div className="flex md:justify-center md:grow-0 md:shrink-0 md:basis-1/3">
                        <div className="relative cursor-pointer mx-auto md:mx-0" onClick={() => setIsEditModalOpen(true)}>
                            <div className="w-20 h-20 md:w-[150px] md:h-[150px] rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
                                <div className="bg-black p-[2px] rounded-full h-full w-full">
                                    <img 
                                        src={profileData.profilePicUrl} 
                                        alt="profile" 
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-0.5 border-2 border-black md:hidden">
                                <UserPlus size={12} fill="white" className="text-white"/>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Info Section (Right Side) */}
                    <div className="flex-1 min-w-0">
                        
                        {/* Desktop: Header Row (Username + Buttons) */}
                        <div className="hidden md:flex items-center gap-4 mb-5">
                            <h2 className="text-xl font-normal">{profileData.username}</h2>
                            {profileData.isVerified && (
                                <svg className="w-4 h-4 text-blue-500 fill-current" viewBox="0 0 24 24">
                                    <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .495.083.965.238 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.015-.015-2.653-1.772c-.238-.158-.335-.46-.223-.72.113-.26.402-.383.653-.25l.017.012 2.11 1.4 3.658-5.487c.15-.224.46-.282.684-.132.224.15.283.46.134.684l-.01.013z" />
                                </svg>
                            )}
                            <div className="flex gap-2">
                                <button className="bg-neutral-800 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-neutral-700 transition-colors">Ver archivo</button>
                            </div>
                            <Settings className="w-6 h-6 ml-2 cursor-pointer" onClick={() => setIsSettingsOpen(true)} />
                        </div>

                        {/* Mobile: Stats Row (Moved here in hierarchy but displayed flex differently) */}
                        <div className="flex md:hidden justify-around text-center ml-4 mb-4">
                            <div className="cursor-pointer hover:opacity-70 transition-opacity" onClick={() => setIsEditModalOpen(true)}>
                                <div className="font-bold text-lg leading-tight text-white">{profileData.postsCount}</div>
                                <div className="text-sm text-neutral-300">publicaciones</div>
                            </div>
                            <div className="cursor-pointer hover:opacity-70 transition-opacity" onClick={() => setIsEditModalOpen(true)}>
                                <div className="font-bold text-lg leading-tight text-white">{profileData.followersCount}</div>
                                <div className="text-sm text-neutral-300">seguidores</div>
                            </div>
                            <div className="cursor-pointer hover:opacity-70 transition-opacity" onClick={() => setIsEditModalOpen(true)}>
                                <div className="font-bold text-lg leading-tight text-white">{profileData.followingCount}</div>
                                <div className="text-sm text-neutral-300">seguidos</div>
                            </div>
                        </div>

                        {/* Desktop: Stats Row */}
                        <div className="hidden md:flex items-center gap-10 mb-5">
                             <div className="text-[16px]">
                                <span className="font-bold">{profileData.postsCount}</span> publicaciones
                             </div>
                             <div className="text-[16px]">
                                <span className="font-bold">{profileData.followersCount}</span> seguidores
                             </div>
                             <div className="text-[16px]">
                                <span className="font-bold">{profileData.followingCount}</span> seguidos
                             </div>
                        </div>

                        {/* Bio Section */}
                        <div className="space-y-0.5 mb-4 md:mb-0">
                            <div className="font-bold text-[15px] flex items-center gap-1 text-white">
                                {profileData.displayName} {profileData.flag}
                            </div>
                            <div className="text-neutral-400 text-sm">{profileData.category}</div>
                            <div className="text-sm whitespace-pre-line leading-tight text-white">{profileData.bio}</div>
                            {profileData.linkUrl && (
                                <div className="flex items-center gap-1 mt-1">
                                    <LinkIcon className="w-3 h-3 text-blue-200 rotate-45" />
                                    <a href={profileData.linkUrl} className="text-blue-100 font-medium text-sm hover:underline">{profileData.linkText}</a>
                                </div>
                            )}
                        </div>

                        {/* Mobile: Mutuals & Actions */}
                         <div className="md:hidden">
                            <div className="flex items-center gap-2 mb-4 text-xs text-white">
                                <div className="flex -space-x-2">
                                    {profileData.mutualFollowers.avatarUrls.map((url, i) => (
                                        <img key={i} src={url} className="w-5 h-5 rounded-full border border-black" />
                                    ))}
                                </div>
                                <div className="truncate text-neutral-400">
                                    <span className="text-white font-medium">Nuestro Grupo 🤭💬</span> • {profileData.mutualFollowers.text}
                                </div>
                            </div>
                            <div className="flex gap-1.5 mb-6">
                                <button className="flex-1 bg-neutral-800 rounded-lg py-1.5 text-sm font-semibold text-neutral-500 cursor-not-allowed">
                                    Mensaje
                                </button>
                                <a 
                                    href="mailto:martinezarmando55573@gmail.com"
                                    className="flex-1 bg-neutral-800 rounded-lg py-1.5 text-sm font-semibold text-white hover:bg-neutral-700 flex items-center justify-center"
                                >
                                    Correo
                                </a>
                            </div>
                         </div>
                    </div>
                </div>

                {/* Highlights */}
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 mb-2 md:mb-10 md:ml-10">
                    {profileData.highlights.map(hl => (
                        <div key={hl.id} className="flex flex-col items-center gap-1 min-w-[70px] md:min-w-[85px] cursor-pointer" onClick={() => setIsEditModalOpen(true)}>
                             <div className="w-[68px] h-[68px] md:w-[77px] md:h-[77px] rounded-full p-[1px] border border-neutral-600">
                                <div className="bg-black p-[2px] rounded-full h-full w-full">
                                    <img src={hl.coverUrl} className="w-full h-full rounded-full object-cover" />
                                </div>
                            </div>
                            <span className="text-xs truncate w-full text-center text-white font-semibold">{hl.title}</span>
                        </div>
                    ))}
                    <div className="flex flex-col items-center gap-1 min-w-[70px] md:min-w-[85px] cursor-pointer" onClick={() => setIsEditModalOpen(true)}>
                             <div className="w-[68px] h-[68px] md:w-[77px] md:h-[77px] rounded-full border border-neutral-700 flex items-center justify-center">
                                <UserPlus size={24} className="text-neutral-500" />
                            </div>
                            <span className="text-xs truncate w-full text-center text-white font-semibold">Nuevo</span>
                        </div>
                </div>

            </div>

            {/* Tabs - Sticky & Responsive */}
            <div className="sticky top-14 md:static bg-black z-20 border-t border-neutral-800">
                <div className="flex md:justify-center md:gap-16">
                    <button 
                        onClick={() => setActiveTab('grid')}
                        className={`flex-1 md:flex-none md:w-auto flex items-center justify-center gap-2 py-2.5 md:py-4 transition-colors ${activeTab === 'grid' ? 'border-b md:border-t md:border-b-0 border-white text-white' : 'text-neutral-500 md:border-t md:border-transparent'}`}
                    >
                        <Grid size={24} className="md:w-3 md:h-3" />
                        <span className="hidden md:block text-xs font-bold tracking-widest">PUBLICACIONES</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('reels')}
                        className={`flex-1 md:flex-none md:w-auto flex items-center justify-center gap-2 py-2.5 md:py-4 transition-colors ${activeTab === 'reels' ? 'border-b md:border-t md:border-b-0 border-white text-white' : 'text-neutral-500 md:border-t md:border-transparent'}`}
                    >
                        <PlaySquare size={24} className="md:w-3 md:h-3" />
                        <span className="hidden md:block text-xs font-bold tracking-widest">REELS</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('tagged')}
                        className={`flex-1 md:flex-none md:w-auto flex items-center justify-center gap-2 py-2.5 md:py-4 transition-colors ${activeTab === 'tagged' ? 'border-b md:border-t md:border-b-0 border-white text-white' : 'text-neutral-500 md:border-t md:border-transparent'}`}
                    >
                        <UserSquare2 size={24} className="md:w-3 md:h-3" />
                        <span className="hidden md:block text-xs font-bold tracking-widest">ETIQUETADAS</span>
                    </button>
                </div>
            </div>

            {/* Content Area - Switchable Content */}
            <div className="min-h-[300px] animate-in slide-in-from-bottom-2 duration-300">
                {activeTab === 'grid' && (
                    <div className="grid grid-cols-3 gap-0.5 md:gap-4">
                        {profileData.posts.map(post => (
                            <div 
                                key={post.id} 
                                className="relative aspect-square cursor-pointer group bg-neutral-900"
                                onClick={() => setSelectedPost(post)}
                            >
                                {post.type === 'video' ? (
                                    <video src={post.imageUrl} className="w-full h-full object-cover" />
                                ) : (
                                    <img src={post.imageUrl} className="w-full h-full object-cover" />
                                )}
                                
                                {post.isPinned && (
                                    <div className="absolute top-1 right-1 text-white rotate-45">
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                            <path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" />
                                        </svg>
                                    </div>
                                )}
                                {post.type === 'video' && (
                                    <div className="absolute top-2 right-2 text-white">
                                        <PlaySquare size={16} fill="white" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                                    <div className="flex items-center gap-1 text-white font-bold">
                                        <Heart size={16} fill="white" /> {post.likes > 1000 ? (post.likes / 1000).toFixed(1) + 'k' : post.likes}
                                    </div>
                                    <div className="flex items-center gap-1 text-white font-bold">
                                        <MessageCircle size={16} fill="white" /> 120
                                    </div>
                                    <div className="mt-2 text-xs text-white bg-black/50 px-2 py-1 rounded">Click to Edit</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'reels' && (
                    <div className="grid grid-cols-3 gap-0.5 md:gap-4">
                        {profileData.reels.map(post => (
                            <div 
                                key={post.id} 
                                className="relative aspect-[9/16] cursor-pointer group bg-neutral-900"
                                onClick={() => setSelectedPost(post)}
                            >
                                <video src={post.imageUrl} className="w-full h-full object-cover" />
                                <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-xs font-bold shadow-black drop-shadow-md">
                                    <PlaySquare size={14} fill="white" /> {post.likes > 1000 ? (post.likes / 1000).toFixed(0) + 'k' : post.likes}
                                </div>
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                                    <div className="mt-2 text-xs text-white bg-black/50 px-2 py-1 rounded">Click to Upload/Edit</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'tagged' && (
                     <div className="grid grid-cols-3 gap-0.5 md:gap-4">
                        {profileData.tagged.map(post => (
                            <div 
                                key={post.id} 
                                className="relative aspect-square cursor-pointer group bg-neutral-900"
                                onClick={() => setSelectedPost(post)}
                            >
                                <img src={post.imageUrl} className="w-full h-full object-cover" />
                                <div className="absolute top-2 right-2 text-white">
                                    <UserSquare2 size={16} fill="white" />
                                </div>
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                                    <div className="flex items-center gap-1 text-white font-bold">
                                        <Heart size={16} fill="white" /> {post.likes > 1000 ? (post.likes / 1000).toFixed(1) + 'k' : post.likes}
                                    </div>
                                    <div className="mt-2 text-xs text-white bg-black/50 px-2 py-1 rounded">Click to Upload/Edit</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modals */}
            {isEditModalOpen && (
                <EditProfileModal 
                    data={profileData} 
                    onSave={handleUpdateProfile} 
                    onClose={() => setIsEditModalOpen(false)} 
                />
            )}

            {selectedPost && (
                <ImageEditorModal 
                    post={selectedPost}
                    onUpdateImage={handleUpdatePostImage}
                    onDelete={handleDeletePost}
                    onClose={() => setSelectedPost(null)}
                />
            )}
            
            {isSettingsOpen && (
                <SettingsModal 
                    onClose={() => setIsSettingsOpen(false)} 
                    onOpenEditDB={() => setIsEditModalOpen(true)}
                />
            )}

        </div>
      </div>
      
      <MobileBottomNav />

    </div>
  );
};

export default App;