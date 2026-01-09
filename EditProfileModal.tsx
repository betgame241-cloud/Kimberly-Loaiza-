import React, { useState, useRef } from 'react';
import { ProfileData, Highlight } from '../types';
import { X, Sparkles, Loader2, Upload, Trash2 } from 'lucide-react';
import { geminiService } from '../services/geminiService';

interface EditProfileModalProps {
  data: ProfileData;
  onSave: (newData: ProfileData) => void;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ data, onSave, onClose }) => {
  const [formData, setFormData] = useState<ProfileData>(data);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // File inputs refs
  const profilePicInputRef = useRef<HTMLInputElement>(null);
  const highlightInputRef = useRef<HTMLInputElement>(null);
  const [selectedHighlightId, setSelectedHighlightId] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateBio = async () => {
    setIsGenerating(true);
    try {
      const newBio = await geminiService.generateBioFromSearch(formData.displayName);
      setFormData(prev => ({ ...prev, bio: newBio }));
    } catch (error) {
      alert("Failed to generate bio. Check API Key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'profilePic' | 'highlight') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      
      if (field === 'profilePic') {
        setFormData(prev => ({ ...prev, profilePicUrl: url }));
      } else if (field === 'highlight' && selectedHighlightId) {
        setFormData(prev => ({
          ...prev,
          highlights: prev.highlights.map(h => h.id === selectedHighlightId ? { ...h, coverUrl: url } : h)
        }));
        setSelectedHighlightId(null);
      }
    }
  };

  const handleHighlightTitleChange = (id: string, newTitle: string) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.map(h => h.id === id ? { ...h, title: newTitle } : h)
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-neutral-900 w-full max-w-md rounded-xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col text-white border border-neutral-800">
        <div className="p-4 border-b border-neutral-800 flex justify-between items-center bg-neutral-900">
          <h2 className="text-lg font-bold">Editar Base de Datos</h2>
          <button onClick={onClose} className="p-2 hover:bg-neutral-800 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Profile Pic Section */}
          <div className="flex flex-col items-center gap-3">
             <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-neutral-700 relative group cursor-pointer"
                  onClick={() => profilePicInputRef.current?.click()}
             >
                <img src={formData.profilePicUrl} className="w-full h-full object-cover" alt="Profile" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Upload size={24} />
                </div>
             </div>
             <button 
                onClick={() => profilePicInputRef.current?.click()}
                className="text-blue-500 text-sm font-semibold"
             >
                Cambiar foto de perfil
             </button>
             <input 
                type="file" 
                ref={profilePicInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'profilePic')}
             />
          </div>

          <div className="space-y-4">
            <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Display Name</label>
                <input
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className="w-full bg-neutral-800 border-none rounded-lg p-2 focus:ring-1 focus:ring-blue-500 outline-none text-white"
                />
            </div>

            <div className="grid grid-cols-3 gap-2">
                <div>
                    <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Posts</label>
                    <input name="postsCount" type="number" value={formData.postsCount} onChange={handleChange}
                        className="w-full bg-neutral-800 border-none rounded-lg p-2 outline-none text-white text-sm" />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Followers</label>
                    <input name="followersCount" value={formData.followersCount} onChange={handleChange}
                        className="w-full bg-neutral-800 border-none rounded-lg p-2 outline-none text-white text-sm" />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Following</label>
                    <input name="followingCount" type="number" value={formData.followingCount} onChange={handleChange}
                        className="w-full bg-neutral-800 border-none rounded-lg p-2 outline-none text-white text-sm" />
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-semibold text-neutral-500 uppercase">Bio</label>
                    <button 
                        onClick={handleGenerateBio}
                        disabled={isGenerating}
                        className="flex items-center gap-1 text-xs text-blue-400 font-medium hover:text-blue-300 disabled:opacity-50"
                    >
                        {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                        AI Gen
                    </button>
                </div>
                <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                className="w-full bg-neutral-800 border-none rounded-lg p-2 focus:ring-1 focus:ring-blue-500 outline-none resize-none text-white"
                />
            </div>
          </div>

          {/* Highlights Editor */}
          <div>
            <label className="block text-xs font-semibold text-neutral-500 uppercase mb-2">Historias Destacadas</label>
            <div className="space-y-2">
                {formData.highlights.map(hl => (
                    <div key={hl.id} className="flex items-center gap-3 bg-neutral-800 p-2 rounded-lg">
                        <div 
                            className="w-10 h-10 rounded-full overflow-hidden shrink-0 relative cursor-pointer"
                            onClick={() => {
                                setSelectedHighlightId(hl.id);
                                highlightInputRef.current?.click();
                            }}
                        >
                            <img src={hl.coverUrl} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <Upload size={14} />
                            </div>
                        </div>
                        <input 
                            value={hl.title}
                            onChange={(e) => handleHighlightTitleChange(hl.id, e.target.value)}
                            className="bg-transparent border-b border-neutral-600 w-full text-sm focus:border-white outline-none py-1"
                        />
                    </div>
                ))}
                <input 
                    type="file" 
                    ref={highlightInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'highlight')}
                />
            </div>
          </div>

        </div>

        <div className="p-4 border-t border-neutral-800 bg-neutral-900 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-neutral-400 font-medium hover:text-white">Cancelar</button>
          <button 
            onClick={() => { onSave(formData); onClose(); }} 
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 transition-colors"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};