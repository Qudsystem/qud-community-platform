import { ImgHTMLAttributes } from 'react'

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	src: string
	alt: string
	width?: number
	height?: number
}

export function Image({ 
	src, 
	alt, 
	width, 
	height, 
	className,
	...props 
}: ImageProps) {
	return (
		<img
			src={src}
			alt={alt}
			width={width}
			height={height}
			loading="lazy"
			decoding="async"
			className={className}
			{...props}
		/>
	)
}