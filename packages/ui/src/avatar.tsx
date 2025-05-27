import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  editable?: boolean;
  profilePicture: string;
  updateProfilePicture: (url: string) => void;
  isEditing: boolean;
}

const sizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
  xl: 'w-40 h-40',
};

const Avatar: React.FC<AvatarProps> = ({ 
  size = 'lg', 
  editable = false,
  profilePicture,
  updateProfilePicture,
  isEditing
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    multiple: false,
    disabled: !isEditing,
    onDrop: acceptedFiles => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result as string;
          updateProfilePicture(dataUrl);
        };
        reader.readAsDataURL(file as Blob);
      }
    }
  });

  return (
    <div
      className={`relative rounded-full overflow-hidden ${sizeClasses[size]} bg-gray-200 dark:bg-gray-700`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...(editable && isEditing
        ? (() => {
            const { ref, style, ...rootProps } = getRootProps();
            return rootProps;
          })()
        : {})}
    >
      <motion.div
        className="w-full h-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        whileHover={editable && isEditing ? { scale: 1.05 } : {}}
        style={{ width: '100%', height: '100%' }}
      >
        <img 
          src={profilePicture} 
          alt="Profile" 
          className="w-full h-full object-cover"
        />
        {editable && isEditing && (
          <motion.div 
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovering || isDragActive ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <input {...getInputProps()} />
            <Camera className="text-white" size={32} />
            <span className="text-white text-sm font-medium ml-2">Change Photo</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Avatar;