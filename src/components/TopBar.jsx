import React from "react";
import { Date } from "../assets/data";

function TopBar() {
	return (
		<div className="flex flex-col justify-center items-center mt-4">
			{/* DISCLAIMER  START */}
			<div className="flex flex-col justify-center items-center mt-4">
				<h1 className="text-4xl font-bold p-4 bg bg-red-400 shadow-xl rounded-md text-white mb-4 items-center justify-center text-center">
					<strong>!!!</strong> DISCLAIMER: This event has been postponed to the 1st of November, 2024. <strong>!!!</strong>
					<br />
					Please do not attempt any labs until 2nd November 2024.
				</h1>
			</div>
			{/* DISCLAIMER END */}
			<h4 className="font-normal flex flex-row items-center justify-center">
				<img
					className="h-10 m-2 mr-1"
					src="https://raw.githubusercontent.com/Trident09/gcp-progress/main/src/assets/cloudLg.png"
					alt="cloud"
				/>
				<div className="h-full p-2 pl-0">
					<span className="text-2xl"> Google Cloud&nbsp;</span>
					<b>
						<span class="text-3xl"> GDG on Campus GenAI STUDY JAM 2024</span>
					</b>
				</div>
			</h4>
			<div className="flex flex-row justify-center items-center mb-1">
				<span className="text-xl text-stone-800">
					Last Updated on :&nbsp;
				</span>
				<span className="text-xl text-stone-800 ml-2"> {Date} </span>
			</div>
			<div className="alert-slider w-[60%] m-auto mt-6 mb-0 bg-blue-100 text-red-600 rounded-3xl flex items-center overflow-hidden">
				<p className="text-lg p-1 marquee">
					🚀 This scoreboard will be updated daily at 08:00 PM IST. Please Stay tuned for the latest updates. 🚀
				</p>
			</div>
		</div>
	);
}

export default TopBar;
