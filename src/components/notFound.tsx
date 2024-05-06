import React from "react";

type Props = {};

function NotFound({}: Props) {
	return (
		<div className="text-center">
			<h1 className="text-2xl font-bold">Parece que essa não era a página que você estava buscando...</h1>
			<h4 className="text-muted-foreground">Ei ei, não fique triste, olha essa coisa fofa!</h4>
			<img src={"https://cataas.com/cat"} alt="cat" className="max-w-[400px] max-h-[400px] m-auto mt-4" />
			<u className="text-xs text-muted-foreground">
				<a href="https://cataas.com">cataas.com</a>
			</u>
		</div>
	);
}

export default NotFound;
