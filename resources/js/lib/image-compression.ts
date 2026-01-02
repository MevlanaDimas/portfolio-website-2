import imageCompression from "browser-image-compression";

const defaultOptions = {
    maxSizeMb: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
};

export async function compressImage(file: File, options = defaultOptions): Promise<File> {
    if (file.type.startsWith('image/')) {
        try {
            return await imageCompression(file, options);
        } catch (error) {
            console.error("Image compression failed:", error);
        }
    }
    return file;
}
