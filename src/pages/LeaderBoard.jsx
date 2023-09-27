import React, { useState } from "react";
import { LeaderBoards } from "../assets/leaderBoard";
import TopBar from "../components/TopBar";
import Count from "../components/Count";

function LeaderBoard() {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event) => {
		setSearchTerm(event.target.value);
	};

    let filteredDatas = LeaderBoards.filter((datacomplete) =>
		datacomplete["Name"]
			.toLowerCase()
			.includes(searchTerm.toLowerCase())
	);

	return (
		<div>
            <TopBar />
            <Count />
            <div className="w-full flex justify-center items-center pt-4">
				<input
					className="w-[80%] h-10 py-4 px-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-lg uppercase"
					type="text"
					onChange={handleSearch}
					placeholder="Search by name..."
				/>
			</div>
			<div className="py-5 px-0 max-w-7xl md:px-4 w-full flex items-center justify-center mx-auto">
				<table className="table table-hover fa-border">
					<thead>
						<tr className="uppercase">
							<th scope="col">
								<b>Completion Rank</b>
							</th>
							<th scope="col">
								<b>Name</b>
							</th>
						</tr>
					</thead>
					<tbody id="gccp_body">
						{filteredDatas.map((datacomplete, index) => (
							<tr className="hover:bg-blue-300 cursor-pointer bg-green-200">
								<td className="whitespace-nowrap">
									{datacomplete["sl"]}
								</td>
								<td className="whitespace-nowrap">
									{datacomplete["Name"].toUpperCase()}
									<b>
										{index <= 39
											? "🥇"
											: (index =
													40 && index <= 59
														? "🥈"
														: (index =
																60 &&
																index <= 79
																	? "🥉"
																	: "😔"))}
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
