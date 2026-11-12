import { createContext, useContext, ReactNode } from 'react';

interface ImageContextType {
	getImageUrl: (path: string) => string;
	optimizeImageUrl: (url: string, width?: number, height?: number) => string;
	getProfileImageUrl: (path: string | null) => string;
	getPostImageUrl: (path: string | null) => string;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

interface ImageProviderProps {
	children: ReactNode;
	baseUrl?: string;
}

const DEFAULT_PROFILE_IMAGE = '/assets/images/default-avatar.png';
const DEFAULT_POST_IMAGE = '/assets/images/default-post.png';

export function ImageProvider({ children, baseUrl = '/assets/images' }: ImageProviderProps) {
	const getImageUrl = (path: string) => {
		if (path.startsWith('http')) return path;
		return `${baseUrl}/${path}`;
	};

	const optimizeImageUrl = (url: string, width?: number, height?: number) => {
		if (!url) return '';
		if (url.startsWith('http')) {
			// For remote images, you might want to use an image optimization service
			return url;
		}
		return `${baseUrl}/${url}?w=${width || ''}&h=${height || ''}`;
	};

	const getProfileImageUrl = (path: string | null) => {
		if (!path) return DEFAULT_PROFILE_IMAGE;
		return getImageUrl(path);
	};

	const getPostImageUrl = (path: string | null) => {
		if (!path) return DEFAULT_POST_IMAGE;
		return getImageUrl(path);
	};

	return (
		<ImageContext.Provider value={{ 
			getImageUrl, 
			optimizeImageUrl, 
			getProfileImageUrl,
			getPostImageUrl 
		}}>
			{children}
		</ImageContext.Provider>
	);
}

export const useImages = () => {
	const context = useContext(ImageContext);
	if (context === undefined) {
		throw new Error('useImages must be used within an ImageProvider');
	}
	return context;
};