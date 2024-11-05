import { React } from "react";

const NavBar = () => {
	return (
		<nav className="fixed navbar navbar-expand-lg navbar-light bg-light w-full z-50">
			<div className="container-fluid">
				<a href="https://gdg.community.dev/gdg-on-campus-national-forensic-sciences-university-delhi-india/">
					<img
						className="d-inline-block align-text-top"
						src="https://raw.githubusercontent.com/Trident09/gcp-progress/main/src/assets/gdg-nfsu-logo.png"
						alt="GDSC NFSU logo"
					/>
				</a>
			</div>
		</nav>
	);
};

export default NavBar;
