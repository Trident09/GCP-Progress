import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { Outlet } from "react-router-dom";
import { DataCompletes } from "./assets/data";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import PreLoader from "./components/PreLoader";

export default function Layout() {
	const [isLoading, setIsLoading] = useState(true);
	const [isConfetti, setIsConfetti] = useState(false);
	const [bodyWidth, setBodyWidth] = useState(document.body.innerWidth);
	const [bodyHeight, setBodyHeight] = useState(document.body.innerHeight);

	function handleSizeChange() {
		setBodyWidth(document.body.clintWidth);
		setBodyHeight(document.body.clintHeight);
	}

	useEffect(() => {
		let totalCompletions = DataCompletes.filter((datacomplete) =>
			datacomplete["Completed"].toLowerCase().includes("yes")
		);
		if (totalCompletions.length >= 60) {
			setIsConfetti(true);
		}
	}, []);

	useEffect(() => {
		const delay = () => {
			setTimeout(() => {
				setIsLoading(false);
			}, 1650);
		};
		delay();
	}, []);
	useEffect(() => {
		document.body.onresize = () => handleSizeChange();
		const delay = () => {
			setTimeout(() => {
				setIsConfetti(false);
			}, 9000);
		};
		delay();
	}, []);
	return isLoading ? (
		<PreLoader />
	) : (
		<body>
			{isConfetti && (
				<Confetti
					width={bodyWidth}
					height={bodyHeight}
					numberOfPieces={200}
					gravity={0.06}
					wind={0.01}
				/>
			)}
			<NavBar />
			<main className="pt-20 min-h-[95vh]">
				<Outlet />
			</main>
			<Footer />
		</body>
	);
}
