import { useState } from 'react';
import { useImages } from '@/contexts/ImageContext';
import { cn } from '@/lib/utils';

interface PostImageProps {
	src: string | null;
	alt: string;
	className?: string;
	aspectRatio?: '16:9' | '4:3' | '1:1';
}

const aspectRatioClasses = {
	'16:9': 'aspect-video',
	'4:3': 'aspect-4/3',
	'1:1': 'aspect-square'
};

export function PostImage({ 
	src, 
	alt, 
	className,
	aspectRatio = '16:9'
}: PostImageProps) {
	const [error, setError] = useState(false);
	const { getPostImageUrl, optimizeImageUrl } = useImages();

	const imageUrl = error ? 
		getPostImageUrl(null) : 
		optimizeImageUrl(getPostImageUrl(src), 800);

	return (
		<div className={cn(
			'overflow-hidden rounded-lg',
			aspectRatioClasses[aspectRatio],
			className
		)}>
			<img
				src={imageUrl}
				alt={alt}
				onError={() => setError(true)}
				className="w-full h-full object-cover"
				loading="lazy"
			/>
		</div>
	);
}