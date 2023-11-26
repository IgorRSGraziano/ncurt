import React from "react";
import styled from "styled-components";
import { StaticContainer, Content, textColor2, fontSize2 } from "styles/style";
import Link from "next/link";

const Brand = styled.div`
	font-size: ${fontSize2};
	font-weight: bold;
	transition: 0.3s;

	&:hover {
		transition: 0.3s;
		color: ${textColor2};
	}
`;

function Header() {
	return (
		<StaticContainer position="sticky" top="0">
			<Content justifyContentf="space-between">
				<Link href={"/"}>
					<Brand>nCurt</Brand>
				</Link>
			</Content>
		</StaticContainer>
	);
}

export default Header;
