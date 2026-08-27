import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, User, Save } from "lucide-react";
import { StudentProfile } from "@/lib/profileData";

interface EditProfileModalProps {
  isOpen: boolean;
  profile: StudentProfile;
  onClose: () => void;
  onSave: (updated: Partial<StudentProfile>) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  profile,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(profile.name);
  const [major, setMajor] = useState(profile.major);
  const [year, setYear] = useState(profile.year);
  const [bio, setBio] = useState(profile.bio);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    onSave({ name, major, year, bio });
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-[#151515]/40 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.92, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.92, y: 15 }}
          className="bg-[#FFFDF7] border border-[#151515]/10 shadow-[0_20px_50px_rgba(0,0,0,0.18)] rounded-[32px] p-6 sm:p-8 max-w-md w-full relative space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-[#151515]">Edit Student Profile</h3>
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-[#151515]/40 hover:text-[#151515]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-black uppercase text-[#151515]/80 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#F8F6F0] border border-[#151515]/10 rounded-2xl p-3 text-xs font-bold text-[#151515]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-[#151515]/80 mb-1">
                Major & Year
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  className="w-full bg-[#F8F6F0] border border-[#151515]/10 rounded-2xl p-3 text-xs font-bold text-[#151515]"
                  required
                />
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full bg-[#F8F6F0] border border-[#151515]/10 rounded-2xl p-3 text-xs font-bold text-[#151515]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-[#151515]/80 mb-1">
                Community Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full bg-[#F8F6F0] border border-[#151515]/10 rounded-2xl p-3 text-xs font-semibold text-[#151515] resize-none"
              />
            </div>

            {isSaved ? (
              <div className="bg-[#DCFCE7] text-[#15803D] text-xs font-black p-3.5 rounded-2xl text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Profile updated successfully!</span>
              </div>
            ) : (
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 rounded-2xl bg-[#F8F6F0] text-[#151515] font-bold text-xs uppercase hover:bg-[#E8E4DA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-2xl bg-[#151518] text-white hover:bg-[#B92CFF] font-black text-xs uppercase shadow-md flex items-center justify-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EditProfileModal;
