export const LoadingIndicator = () => {
	return (
		<div className="z-9999 bg-black/50 fixed inset-0 flex items-center justify-center flex-col transition-all">
			<p className="text-white font-bold mb-3">Adding Location...</p>
			<div className="flex gap-2">
				<div className="bg-blue-500 animate-bounce h-5 w-5 rounded-full" />
				<div className="bg-blue-500 animate-bounce h-5 w-5 rounded-full [animation-delay:0.2s]" />
				<div className="bg-blue-500 animate-bounce h-5 w-5 rounded-full [animation-delay:0.4s]" />
			</div>
		</div>
	);
};
