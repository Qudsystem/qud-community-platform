import { useState } from 'react';
import { useImages } from '@/contexts/ImageContext';
import { cn } from '@/lib/utils';

interface ProfileImageProps {
	src: string | null;
	alt: string;
	size?: 'sm' | 'md' | 'lg';
	className?: string;
}

const sizeMap = {
	sm: 'w-8 h-8',
	md: 'w-12 h-12',
	lg: 'w-16 h-16'
};

export function ProfileImage({ 
	src, 
	alt, 
	size = 'md', 
	className 
}: ProfileImageProps) {
	const [error, setError] = useState(false);
	const { getProfileImageUrl } = useImages();

	const imageUrl = error ? getProfileImageUrl(null) : getProfileImageUrl(src);

	return (
		<img
			src={imageUrl}
			alt={alt}
			onError={() => setError(true)}
			className={cn(
				'rounded-full object-cover',
				sizeMap[size],
				className
			)}
		/>
	);
}