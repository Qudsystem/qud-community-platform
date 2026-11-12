import { useState } from 'react';
import { useImages } from '@/contexts/ImageContext';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	fallback?: string;
	className?: string;
}

export function OptimizedImage({
	src,
	alt,
	width,
	height,
	fallback = '/assets/images/placeholder.png',
	className,
	...props
}: OptimizedImageProps) {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);
	const { optimizeImageUrl } = useImages();

	const optimizedSrc = optimizeImageUrl(src, width, height);

	return (
		<div className={cn('relative', className)}>
			<img
				src={error ? fallback : optimizedSrc}
				alt={alt}
				width={width}
				height={height}
				loading="lazy"
				decoding="async"
				onLoad={() => setIsLoading(false)}
				onError={() => {
					setError(true);
					setIsLoading(false);
				}}
				className={cn(
					'transition-opacity duration-300',
					isLoading ? 'opacity-0' : 'opacity-100'
				)}
				{...props}
			/>
			{isLoading && (
				<div className="absolute inset-0 bg-gray-200 animate-pulse" />
			)}
		</div>
	);
}