import React from "react";
import LoadingAnimation from "./LoadingAnimation";

function PreLoader() {
	return (
		<div
			id="preloader"
			className="w-full h-full fixed top-0 z-50 bg-white flex justify-center items-center"
		>
			<LoadingAnimation />
		</div>
	);
}

export default PreLoader;
