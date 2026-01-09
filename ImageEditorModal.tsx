import React, { useState, useRef } from 'react';
import { Post } from '../types';
import { X, Sparkles, Loader2, Wand2, Upload, Trash2 } from 'lucide-react';
import { geminiService, urlToBase64 } from '../services/geminiService';

interface ImageEditorModalProps {
  post: Post;
  onUpdateImage: (postId: string, newUrl: string, newType: 'image' | 'video') => void;
  onDelete: (postId: string) => void;
  onClose: () => void;
}

export const ImageEditorModal: React.FC<ImageEditorModalProps> = ({ post, onUpdateImage, onDelete, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentImage, setCurrentImage] = useState(post.imageUrl);
  const [mediaType, setMediaType] = useState<'image' | 'video'>(post.type);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = async () => {
    if (!prompt.trim() || mediaType === 'video') return;
    setIsProcessing(true);
    setError(null);

    try {
      // 1. Get base64 of current image
      const base64 = await urlToBase64(currentImage);
      
      // 2. Send to Gemini
      const newImageBase64 = await geminiService.editImage(base64, prompt);
      
      // 3. Update preview
      setCurrentImage(newImageBase64);
      setPrompt(''); // Clear prompt
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          const url = URL.createObjectURL(file);
          const type = file.type.startsWith('video/') ? 'video' : 'image';
          
          setMediaType(type);
          setCurrentImage(url);
      }
  };

  const handleSave = () => {
    onUpdateImage(post.id, currentImage, mediaType);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta publicación?")) {
      onDelete(post.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-neutral-900 border border-neutral-800 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-neutral-800 flex justify-between items-center">
          <h2 className="text-white font-bold flex items-center gap-2">
            <Wand2 className="text-purple-400" size={20} />
            Editor & Upload
          </h2>
          <div className="flex items-center gap-2">
             <button 
                onClick={handleDelete}
                className="p-2 hover:bg-red-900/30 text-red-500 rounded-full transition-colors"
                title="Eliminar publicación"
             >
                <Trash2 size={20} />
             </button>
             <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white">
                <X size={24} />
             </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden relative bg-black flex items-center justify-center min-h-[300px]">
             {mediaType === 'video' ? (
                 <video 
                    src={currentImage} 
                    className="max-h-[50vh] object-contain w-full" 
                    controls 
                    autoPlay 
                    loop
                 />
             ) : (
                 <img 
                    src={currentImage} 
                    alt="Editing preview" 
                    className="max-h-[50vh] object-contain w-full"
                 />
             )}
             
             {isProcessing && (
                 <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-10">
                     <Loader2 className="text-purple-500 animate-spin mb-2" size={48} />
                     <p className="text-white font-medium animate-pulse">Gemini está creando...</p>
                 </div>
             )}
             
             {/* Overlay Button to change image */}
             <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg backdrop-blur-md flex items-center gap-2 text-xs font-semibold transition-all border border-white/10 z-20"
             >
                <Upload size={16} />
                SUBIR FOTO/VIDEO
             </button>
             <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*,video/*"
                onChange={handleFileUpload}
             />
        </div>

        <div className="p-4 bg-neutral-900 border-t border-neutral-800 space-y-4">
            {error && (
                <div className="bg-red-500/10 text-red-400 p-2 rounded text-sm text-center">
                    {error}
                </div>
            )}
            
            {mediaType === 'image' && (
                <div className="space-y-2">
                    <label className="text-neutral-400 text-xs uppercase font-bold tracking-wider">Editar con IA (Gemini)</label>
                    <div className="relative">
                        <input 
                            type="text" 
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="ej. 'Añadir gafas de sol', 'Estilo cyberpunk'..."
                            className="w-full bg-neutral-800 text-white rounded-lg pl-4 pr-12 py-3 focus:ring-1 focus:ring-purple-500 outline-none border border-neutral-700"
                            onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
                        />
                        <button 
                            onClick={handleEdit}
                            disabled={isProcessing || !prompt.trim()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-purple-600 rounded-md text-white disabled:opacity-50 hover:bg-purple-500 transition-colors"
                        >
                            <Sparkles size={18} />
                        </button>
                    </div>
                </div>
            )}
            
            {mediaType === 'video' && (
                 <div className="text-center text-neutral-500 text-sm py-2">
                     La edición con IA solo está disponible para imágenes.
                 </div>
            )}

            <button 
                onClick={handleSave}
                className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
            >
                Guardar Cambios
            </button>
        </div>
      </div>
    </div>
  );
};