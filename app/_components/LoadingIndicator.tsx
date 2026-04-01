export const LoadingIndicator = () => {
	return (
		<div className="z-9999 bg-black/40 backdrop-blur-sm fixed inset-0 flex items-center justify-center">
			<div className="rounded-2xl px-8 py-6 flex flex-col items-center gap-4">
				<p className="text-white text-2xl font-semibold tracking-wide">
					Please wait...
				</p>
				<div className="flex gap-2 items-end h-6">
					<div className="bg-blue-400 h-2.5 w-2.5 rounded-full animate-bounce [animation-duration:0.9s] [animation-delay:0s]" />
					<div className="bg-blue-400 h-2.5 w-2.5 rounded-full animate-bounce [animation-duration:0.9s] [animation-delay:0.18s]" />
					<div className="bg-blue-400 h-2.5 w-2.5 rounded-full animate-bounce [animation-duration:0.9s] [animation-delay:0.36s]" />
				</div>
			</div>
		</div>
	);
};
