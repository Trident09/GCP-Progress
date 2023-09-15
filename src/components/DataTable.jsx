import React, { useState } from "react";
import { DataCompletes } from "../assets/data";
import Count from "./Count";

function DataTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [totalCompletionFilter, setTotalCompletionFilter] = useState(false);
  const [redemptionStatusFilter, setRedemptionStatusFilter] = useState(false);
  const [nonRedemptionFilter, setNonRedemptionFilter] = useState(false);

  const [data, setData] = useState(DataCompletes);
  const [courseSortOrder, setCourseSortOrder] = useState("desc");
  const [skillSortOrder, setSkillSortOrder] = useState("desc");
  const [genAISortOrder, setGenAISortOrder] = useState("desc");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTotalCompletionClick = () => {
    setTotalCompletionFilter(!totalCompletionFilter);
  };

  const handleRedemptionStatusClick = () => {
    setRedemptionStatusFilter(!redemptionStatusFilter);
  };

  const handleNonRedemptionClick = () => {
    setNonRedemptionFilter(!nonRedemptionFilter);
  };

  const toggleSortOrder = (column) => {
    if (column === "Courses") {
      setCourseSortOrder(courseSortOrder === "asc" ? "desc" : "asc");
    } else if (column === "Skill") {
      setSkillSortOrder(skillSortOrder === "asc" ? "desc" : "asc");
    } else if (column === "Gen AI") {
      setGenAISortOrder(genAISortOrder === "asc" ? "desc" : "asc");
    }
  };

  let filteredData = data.filter((datacomplete) =>
    datacomplete["Student Name"]
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (totalCompletionFilter) {
    filteredData = filteredData.filter(
      (dataComplete) =>
        dataComplete["Total Completions of both Pathways"].toLowerCase() ===
        "yes"
    );
  }

  if (redemptionStatusFilter) {
    filteredData = filteredData.filter(
      (dataComplete) =>
        dataComplete["Redemption Status"].toLowerCase() === "yes"
    );
  }

  if (nonRedemptionFilter) {
    filteredData = filteredData.filter(
      (dataComplete) => dataComplete["Redemption Status"].toLowerCase() === "no"
    );
  }

  const sortDataByColumn = (column, sortOrder) => {
    const sortedData = [...filteredData];

    sortedData.sort((a, b) => {
      const valueA = parseInt(a[column]);
      const valueB = parseInt(b[column]);

      if (sortOrder === "asc") {
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    });

    setData(sortedData);
  };
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
								<b>Courses</b>
							</th>
							<th
								scope="col"
								className="text-center"
							>
								<b>Skill</b>
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
								<b>Totality</b>
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
									datacomplete[
										"Total Completions of both Pathways"
									] === "Yes"
										? "bg-green-200"
										: "" ||
										  datacomplete["Redemption Status"] ===
												"No"
										? "bg-red-50"
										: ""
								}
							>
								<td className="whitespace-nowrap">
									{index + 1}
								</td>
								<td className="whitespace-nowrap">
									{datacomplete["Student Name"].toUpperCase()}
									<b>
										{datacomplete[
											"Total Completions of both Pathways"
										] === "Yes"
											? " 🏅 "
											: ""}
									</b>
								</td>
								<td className="whitespace-nowrap text-center">
									{datacomplete["# of Courses Completed"]}
								</td>
								<td className="whitespace-nowrap text-center">
									{
										datacomplete[
											"# of Skill Badges Completed"
										]
									}
								</td>
								<td className="whitespace-nowrap text-center">
									{datacomplete["# of GenAI Game Completed"]}
								</td>
								<td className="whitespace-nowrap text-center">
									{datacomplete[
										"Total Completions of both Pathways"
									] === "Yes"
										? "✅"
										: "❌"}
								</td>
								<td className="whitespace-nowrap text-center">
									{datacomplete["Redemption Status"] === "Yes"
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
