import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "shepherd.js/dist/css/shepherd.css";
import { DataCompletes } from "../assets/data";

function DataTable() {
    const [searchTerm, setSearchTerm] = useState("");
    const [redemptionStatusFilter, setRedemptionStatusFilter] = useState(false);
    const [nonRedemptionFilter, setNonRedemptionFilter] = useState(false);
	const [completionFilter, setCompletionFilter] = useState(false);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleRedemptionStatusClick = () => {
        setRedemptionStatusFilter(!redemptionStatusFilter);
        if (nonRedemptionFilter) {
            setNonRedemptionFilter(false);
        }
    };

    const handleNonRedemptionClick = () => {
        setNonRedemptionFilter(!nonRedemptionFilter);
        if (redemptionStatusFilter) {
            setRedemptionStatusFilter(false);
        }
    };

	const handleTotalCompletionClick = () => {
		setCompletionFilter(!completionFilter);
		if (redemptionStatusFilter) {
			setRedemptionStatusFilter(false);
		}
	};

    // Updated Sorting Logic
    const sortedDataCompletes = useMemo(() => {
        return [...DataCompletes].sort((a, b) => {
            // 1. Sort by Redemption Status ("Yes" first)
            const redemptionA = a["Access Code Redemption Status"].toLowerCase();
            const redemptionB = b["Access Code Redemption Status"].toLowerCase();
            if (redemptionA !== redemptionB) {
                return redemptionA === "yes" ? -1 : 1;
            }

            // 2. Sort by Number of Skill Badges Completed (Descending)
            const skillBadgesA = parseInt(a["# of Skill Badges Completed"], 10) || 0;
            const skillBadgesB = parseInt(b["# of Skill Badges Completed"], 10) || 0;
            if (skillBadgesA !== skillBadgesB) {
                return skillBadgesB - skillBadgesA;
            }

            // 3. Sort by Number of Gen AI Completions (Descending)
            const genAIACompletionsA = parseInt(a["# of Arcade Games Completed"], 10) || 0;
            const genAIACompletionsB = parseInt(b["# of Arcade Games Completed"], 10) || 0;
            if (genAIACompletionsA !== genAIACompletionsB) {
                return genAIACompletionsB - genAIACompletionsA;
            }

            return 0; // If all criteria are equal
        });
    }, []);

    let filteredData = sortedDataCompletes.filter((datacomplete) =>
        datacomplete["User Name"]
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    if (redemptionStatusFilter) {
        filteredData = filteredData.filter(
            (dataComplete) =>
                dataComplete["Access Code Redemption Status"].toLowerCase() ===
                "yes"
        );
    }

    if (nonRedemptionFilter) {
        filteredData = filteredData.filter(
            (dataComplete) =>
                dataComplete["Access Code Redemption Status"].toLowerCase() ===
                "no"
        );
    }

	if (completionFilter) {
		filteredData = filteredData.filter(
			(dataComplete) =>
				dataComplete["All Skill Badges & Games Completed"].toLowerCase() === "yes"
		);
	};

    const redeemedStudents = DataCompletes.filter((datacomplete) =>
        datacomplete["Access Code Redemption Status"]
            .toLowerCase()
            .includes("yes")
    );
    const genAICompletions = DataCompletes.filter((datacomplete) =>
        datacomplete["# of Arcade Games Completed"].includes("1")
    );
    const GCCFCompletions = DataCompletes.filter(
        (datacomplete) =>
            datacomplete["All Skill Badges & Games Completed"].toLowerCase().includes("yes")
    );

    const getTier = (total) => {
        if (total < 60) return "NA";
        if (total >= 60 && total < 80) return "Two";
        if (total >= 80) return "One";
        return "NA";
    };

    return (
        <>
            {/* Search Bar */}
            <div className="w-full flex justify-center items-center pt-4">
                <input
                    className="SearchBar w-[80%] h-10 py-4 px-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-lg uppercase"
                    type="text"
                    onChange={handleSearch}
                    placeholder="Search by name..."
                />
            </div>

            {/* Filter Buttons */}
            <div className="w-full flex justify-center items-center pt-4 py-2 flex-row">
                <div className="buttons flex justify-around top-5 left-5">
                    <button
                        className={`RedemptionDone btn text-black ${
                            redemptionStatusFilter ? "active" : ""
                        }`}
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
                        className="TotalCompletion btn text-black"
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
                        className={`NotRedeemed btn text-black ${
                            nonRedemptionFilter ? "active" : ""
                        }`}
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
                    <div className="buttons flex justify-around top-5 left-5">
                        <button className="Leaderboard btn text-black">
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

            {/* Statistics */}
            <div className="w-full flex justify-center items-center pt-4 py-2 flex-col">
                <div className="w-[80%] grid grid-cols-3 gap-2 text-normal font-semibold text-gray-700 ">
                    <p className="Students flex flex-row justify-between p-2 px-4 outline-1 outline outline-blue-700 m-2 rounded-md shadow-md">
                        Total Students :{" "}
                        <b className="text-blue-500">{DataCompletes.length}</b>
                    </p>
                    <p className="Redemptions flex flex-row justify-between p-2 px-4 outline-1 outline outline-blue-700 m-2 rounded-md shadow-md">
                        Total Redemptions :{" "}
                        <b className="text-blue-500">
                            {redeemedStudents.length}
                        </b>
                    </p>
                    <p className="GenAI flex flex-row justify-between p-2 px-4 outline-1 outline outline-blue-700 m-2 rounded-md shadow-md">
                        Total GenAI Completions :{" "}
                        <b className="text-blue-500">
                            {genAICompletions.length}
                        </b>
                    </p>
                    <p className="GCP flex flex-row justify-between p-2 px-4 outline-1 outline outline-blue-700 m-2 rounded-md shadow-md">
                        Total Skill Badge Completions :{" "}
                        <b className="text-blue-500">
                            {GCCFCompletions.length}
                        </b>
                    </p>
					<p className="GCP flex flex-row justify-between p-2 px-4 outline-1 outline outline-blue-700 m-2 rounded-md shadow-md">
                        Tier :{" "}
                        <b className="text-blue-500">
                            {getTier(GCCFCompletions.length)}
                        </b>
                    </p>
                </div>
            </div>

            {/* Data Table */}
            <div className="py-5 px-0 max-w-7xl md:px-4 w-full flex items-center justify-center mx-auto">
                <table className="TableData table table-hover fa-border">
                    <thead>
                        <tr className="uppercase">
                            <th scope="col">
                                <b>#</b>
                            </th>
                            <th scope="col">
                                <b>Name</b>
                            </th>
                            <th scope="col" className="text-center">
                                <b>Gen AI</b>
                            </th>
                            <th scope="col" className="text-center">
                                <b># of Skill Badges</b>
                            </th>
                            <th scope="col" className="text-center">
                                <b>Completion</b>
                            </th>
                            <th scope="col" className="text-center">
                                <b>Redemption</b>
                            </th>
                        </tr>
                    </thead>
                    <tbody id="gccp_body">
                        {filteredData.map((datacomplete, index) => (
                            <tr
                                key={index}
                                className={
                                    datacomplete["All Skill Badges & Games Completed"] === "Yes"
                                        ? "bg-green-200"
                                        : datacomplete["Access Code Redemption Status"] === "No"
                                            ? "bg-red-50"
                                            : ""
                                }
                            >
                                <td className="whitespace-nowrap">
                                    {index + 1}
                                </td>
                                <td className="whitespace-nowrap">
                                    {datacomplete["User Name"].toUpperCase()}
									{datacomplete["All Skill Badges & Games Completed"] === "Yes"
										? " 🏅 "
										: ""}
                                </td>
                                <td className="whitespace-nowrap text-center">
                                    {
                                        datacomplete["# of Arcade Games Completed"]
                                    }
                                </td>
                                <td className="whitespace-nowrap text-center">
                                    {
                                        datacomplete["# of Skill Badges Completed"]
                                    }
                                </td>
                                <td className="whitespace-nowrap text-center">
                                    {
                                        datacomplete["All Skill Badges & Games Completed"] === "Yes" ? "✅" : "❌"
                                    }
                                </td>
                                <td className="whitespace-nowrap text-center">
                                    {datacomplete["Access Code Redemption Status"] === "Yes"
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
