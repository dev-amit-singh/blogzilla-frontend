"use client";

import { UploadButton } from "@/lib/uploadthing"; // Check your path
import { useEffect, useState } from "react";
import Image from "next/image";
// 👇 Import the server action we just created
import { deleteUTFile } from "@/app/actions/uploadthing"; 

interface ImageUploadProps {
  value?: string;
  onChange?: (url: string) => void;
  endpoint?: "imageUploader";
}

export default function ImageUpload({
  value,
  onChange,
  endpoint = "imageUploader",
}: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState<string>(value || "");

  useEffect(() => {
    if (value) {
      setImageUrl(value);
    }
  }, [value]);

  // 👇 Helper function to extract the "key" from the URL
  // Example URL: https://utfs.io/f/abc-123.png -> Key: abc-123.png
  const handleRemove = async () => {
    if (!imageUrl) return;

    // extract the key (everything after the last slash)
    const fileKey = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);

    // Call server action to delete from UploadThing
    await deleteUTFile(fileKey);

    // Update local state
    setImageUrl("");
    if (onChange) onChange("");
  };

  return (
    <div className="flex flex-col items-center border p-4 rounded-lg bg-gray-50/50 border-dashed border-gray-300">
      
      {imageUrl ? (
        <div className="relative w-full h-[200px] mb-4 rounded-md overflow-hidden border">
           <Image 
             src={imageUrl} 
             alt="Upload preview" 
             fill 
             sizes="200px"
             className="object-cover"
           />
           <button 
             // 👇 Call our new handleRemove function
             onClick={handleRemove}
             className="absolute top-2 right-2 bg-red-500 text-white text-xs p-1 rounded shadow hover:bg-red-600 z-10"
             type="button"
           >
             Remove
           </button>
        </div>
      ) : null}

      {!imageUrl && (
        <UploadButton
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
            const uploadedFileUrl = res?.[0]?.ufsUrl; 
            if (uploadedFileUrl) {
                setImageUrl(uploadedFileUrl);
                if (onChange) {
                onChange(uploadedFileUrl);
                }
            }
            }}
            onUploadError={(error: Error) => {
            alert(`Error: ${error.message}`);
            }}
            appearance={{
                button: "bg-blue-600 text-white hover:bg-blue-700 ut-uploading:cursor-not-allowed"
            }}
        />
      )}
    </div>
  );
}