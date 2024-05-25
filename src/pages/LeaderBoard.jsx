import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LeaderBoards } from "../assets/leaderBoard";
import Count from "../components/Count";
import TopBar from "../components/TopBar";

function LeaderBoard() {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
	};

	let filteredDatas = LeaderBoards.filter((datacomplete) =>
		datacomplete["Name"].toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div>
			<TopBar />
			<div className="w-full flex justify-center items-center pt-4">
				<input
					className="w-[80%] h-10 py-4 px-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-lg uppercase"
					type="text"
					onChange={handleSearch}
					placeholder="Search by name..."
				/>
			</div>
			<div className="w-full flex justify-center items-center pt-4 py-2 flex-row">
				<Link to="/">
					<div class="buttons flex justify-around top-5 left-5">
						<button className="btn text-black">
							<span className="w-max h-full absolute left-0 top-0 m-0 p-0 z-[1]"></span>
							<p
								className="after:text-black"
								data-start="good luck!"
								data-text="Go Back"
								data-title="Progress"
							></p>
						</button>
					</div>
				</Link>
			</div>
			<Count />
			<div className="py-5 px-0 max-w-7xl md:px-4 w-1/2 flex items-center justify-center mx-auto">
				<table className="table table-hover fa-border">
					<thead>
						<tr className="uppercase">
							<th
								scope="col"
								className="text-center w-1/6 whitespace-nowrap"
							>
								<b>Completion Rank</b>
							</th>
							<th
								scope="col"
								className="mr-10 w-3/6 whitespace-nowrap"
							>
								<b>Name</b>
							</th>
						</tr>
					</thead>
					<tbody id="gccp_body">
						{filteredDatas.map((datacomplete, index) => (
							<tr className="hover:bg-blue-300 cursor-pointer bg-green-200">
								<td className="whitespace-nowrap text-center">
									{datacomplete["sl"]}
								</td>
								<td className="whitespace-nowrap">
									{datacomplete["Name"].toUpperCase()}
									<b>
										{index <= 59
											? "🥇"
											: (index =
													60 && index <= 79
														? "🥈"
														: "😔")}
									</b>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default LeaderBoard;
