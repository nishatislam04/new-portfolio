export default function HeroOrbit({ children, size, rotation, shouldOrbit = false, shouldSpin = false, spinDuration, orbitDuration }: React.PropsWithChildren<{ size: number; rotation: number; shouldOrbit?: boolean; shouldSpin?: boolean; spinDuration?: string; orbitDuration?: string }>) {
	return (
		<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
			<div className={shouldOrbit ? "animate-spin" : ""} style={{ animationDuration: `${orbitDuration}` }}>
				<div className="flex items-start justify-start" style={{ transform: `rotate(${rotation}deg)`, height: `${size}px`, width: `${size}px` }}>
					<div className={shouldSpin ? "animate-spin" : ""} style={{ animationDuration: `${spinDuration}` }}>
						<div className={`inline-flex`} style={{ transform: `rotate(-${rotation * -1}deg)` }}>
							{children}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
