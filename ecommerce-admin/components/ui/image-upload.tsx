"use client";

import React, {useEffect, useState} from "react";

interface ImageUploadProps {
    disable: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({disable, onChange, onRemove, value}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div>
            <h1>Image Upload</h1>
        </div>
    );
};

export default ImageUpload;
