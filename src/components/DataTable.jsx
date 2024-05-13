import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DataCompletes } from "../assets/data";
import Count from "./Count";

function DataTable() {
	const [searchTerm, setSearchTerm] = useState("");
	const [totalCompletionFilter, setTotalCompletionFilter] = useState(false);
	const [redemptionStatusFilter, setRedemptionStatusFilter] = useState(false);
	const [nonRedemptionFilter, setNonRedemptionFilter] = useState(false);

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleTotalCompletionClick = () => {
		setTotalCompletionFilter(!totalCompletionFilter);
		if (redemptionStatusFilter) {
			setRedemptionStatusFilter(!redemptionStatusFilter);
		}
		if (nonRedemptionFilter) {
			setNonRedemptionFilter(!nonRedemptionFilter);
		}
	};
	const handleRedemptionStatusClick = () => {
		setRedemptionStatusFilter(!redemptionStatusFilter);
		if (totalCompletionFilter) {
			setTotalCompletionFilter(!totalCompletionFilter);
		}
		if (nonRedemptionFilter) {
			setNonRedemptionFilter(!nonRedemptionFilter);
		}
	};
	const handleNonRedemptionClick = () => {
		setNonRedemptionFilter(!nonRedemptionFilter);
		if (totalCompletionFilter) {
			setTotalCompletionFilter(!totalCompletionFilter);
		}
		if (redemptionStatusFilter) {
			setRedemptionStatusFilter(!redemptionStatusFilter);
		}
	};

	const sortedDataCompletes = [...DataCompletes].sort((a, b) => {
		if (a["Redemption"] > b["Redemption"]) return -1;
		if (a["Redemption"] < b["Redemption"]) return 1;

		if (a["Completed"] > b["Completed"]) return -1;
		if (a["Completed"] < b["Completed"]) return 1;

		const sumA =
			a["Gen AI Arcade"] + a["Prompt Design"] + a["Develop GenAI"];
		const sumB =
			b["Gen AI Arcade"] + b["Prompt Design"] + b["Develop GenAI"];
		return sumB - sumA;
	});

	let filteredData = sortedDataCompletes.filter((datacomplete) =>
		datacomplete["User Name"]
			.toLowerCase()
			.includes(searchTerm.toLowerCase())
	);
	if (totalCompletionFilter) {
		filteredData = filteredData.filter(
			(dataComplete) => dataComplete["Completed"].toLowerCase() === "yes"
		);
	}

	if (redemptionStatusFilter) {
		filteredData = filteredData.filter(
			(dataComplete) => dataComplete["Redemption"].toLowerCase() === "yes"
		);
	}

	if (nonRedemptionFilter) {
		filteredData = filteredData.filter(
			(dataComplete) => dataComplete["Redemption"].toLowerCase() === "no"
		);
	}

	return (
		<>
			<div className="w-full flex justify-center items-center pt-4">
				<input
					className="w-[80%] h-10 py-4 px-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-lg uppercase"
					type="text"
					onChange={handleSearch}
					placeholder="Search by name..."
				/>
			</div>
			<div className="w-full flex justify-center items-center pt-4 py-2 flex-row">
				<div class="buttons flex justify-around top-5 left-5">
					<button
						className="btn text-black"
						onClick={handleRedemptionStatusClick}
					>
						<span className="w-full h-full absolute left-0 top-0 m-0 p-0 z-[1]"></span>
						<p
							className="after:text-black"
							data-start="good luck!"
							data-text="Filter"
							data-title="Redeemed"
						></p>
					</button>
				</div>
				<div className="buttons flex justify-around top-5 left-5">
					<button
						className="btn text-black"
						onClick={handleTotalCompletionClick}
					>
						<span className="w-full h-full absolute left-0 top-0 m-0 p-0 z-[1]"></span>
						<p
							className="after:text-black"
							data-start="good luck!"
							data-text="Filter"
							data-title="Completed"
						></p>
					</button>
				</div>
				<div className="buttons flex justify-around top-5 left-5">
					<button
						className="btn text-black"
						onClick={handleNonRedemptionClick}
					>
						<span className="w-full h-full absolute left-0 top-0 m-0 p-0 z-[1]"></span>
						<p
							className="after:text-black"
							data-start="good luck!"
							data-text="Filter"
							data-title="Non-Redeemed"
						></p>
					</button>
				</div>
				<Link to="/leaderboard">
					<div class="buttons flex justify-around top-5 left-5">
						<button className="btn text-black">
							<span className="w-full h-full absolute left-0 top-0 m-0 p-0 z-[1]"></span>
							<p
								className="after:text-black"
								data-start="good luck!"
								data-text="Visit"
								data-title="Leader Board"
							></p>
						</button>
					</div>
				</Link>
			</div>
			<Count />
			<div className="py-5 px-0 max-w-7xl md:px-4 w-full flex items-center justify-center mx-auto">
				<table className="table table-hover fa-border">
					<thead>
						<tr className="uppercase">
							<th scope="col">
								<b>#</b>
							</th>
							<th scope="col">
								<b>Name</b>
							</th>
							<th
								scope="col"
								className="text-center"
							>
								<b>Prompt Design</b>
							</th>
							<th
								scope="col"
								className="text-center"
							>
								<b>Develop GenAI</b>
							</th>
							<th
								scope="col"
								className="text-center"
							>
								<b>Gen AI</b>
							</th>
							<th
								scope="col"
								className="text-center"
							>
								<b>Completed</b>
							</th>
							<th
								scope="col"
								className="text-center"
							>
								<b>Redemption</b>
							</th>
						</tr>
					</thead>
					<tbody id="gccp_body">
						{filteredData.map((datacomplete, index) => (
							<tr
								className={
									datacomplete["Completed"] === "Yes"
										? "bg-green-200"
										: "" ||
										  datacomplete["Redemption"] === "No"
										? "bg-red-50"
										: ""
								}
							>
								<td className="whitespace-nowrap">
									{index + 1}
								</td>
								<td className="whitespace-nowrap">
									{datacomplete["User Name"].toUpperCase()}
									<b>
										{datacomplete["Completed"] === "Yes"
											? " 🏅 "
											: ""}
									</b>
								</td>
								<td className="whitespace-nowrap text-center">
									{datacomplete["Prompt Design"]}
								</td>
								<td className="whitespace-nowrap text-center">
									{datacomplete["Develop GenAI"]}
								</td>
								<td className="whitespace-nowrap text-center">
									{datacomplete["Gen AI Arcade"]}
								</td>
								<td className="whitespace-nowrap text-center">
									{datacomplete["Completed"] === "Yes"
										? "✅"
										: "❌"}
								</td>
								<td className="whitespace-nowrap text-center">
									{datacomplete["Redemption"] === "Yes"
										? "☑️"
										: "❗️"}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default DataTable;
