interface ResponsiveImageProps {
	mobileSrc: string
	desktopSrc: string
	fallbackSrc: string
	alt: string
	width: number
	height: number
}

export function ResponsiveImage({
	mobileSrc,
	desktopSrc,
	fallbackSrc,
	alt,
	width,
	height
}: ResponsiveImageProps) {
	return (
		<picture>
			<source
				srcSet={mobileSrc}
				media="(max-width: 768px)"
				type="image/webp"
			/>
			<source
				srcSet={desktopSrc}
				media="(min-width: 769px)"
				type="image/webp"
			/>
			<img
				src={fallbackSrc}
				alt={alt}
				loading="lazy"
				width={width}
				height={height}
			/>
		</picture>
	)
}