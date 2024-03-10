import styled from "styled-components";

export const StyledModalContainer = styled.div<{ message?: string }>`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;

	position: absolute;
	z-index: 2;

	width: 100%;
	height: 100px;

	animation: dropAnimation 1.5s ease;
	@keyframes dropAnimation {
		0% {
			transform: translateY(-300px);
		}
		100% {
			transform: translateY(0);
		}
	}
`;

export const StyledModal = styled.div<{ type: string }>`
	--bg-color-ok: #eafcef;
	--color-ok: #33a720;
	--bg-color-error: #ffddca;
	--color-error: #f60707;

	width: 20%;
	height: 50px;

	display: flex;
	flex-direction: center;
	align-items: center;
	justify-content: center;
	z-index: 3;

	background-color: ${(props) => (props.type === "ok" ? "var(--bg-color-ok)" : "var(--bg-color-error)")};
	color: ${(props) => (props.type === "ok" ? "var(--color-ok)" : "var(--color-error)")};
	border: ${(props) => (props.type === "ok" ? "2px solid var(--color-ok)" : "2px solid var(--color-error)")};
	border-radius: 15px;

	text-align: center;
	font-size: 24px;
	font-weight: 500;
`;

export const StyledMobileModal = styled.div<{ type: string }>`
	--bg-color-ok: #eafcef;
	--color-ok: #33a720;
	--bg-color-error: #ffddca;
	--color-error: #f60707;

	width: 60%;
	height: 50px;

	display: flex;
	flex-direction: center;
	align-items: center;
	justify-content: center;
	z-index: 3;

	background-color: ${(props) => (props.type === "ok" ? "var(--bg-color-ok)" : "var(--bg-color-error)")};
	color: ${(props) => (props.type === "ok" ? "var(--color-ok)" : "var(--color-error)")};
	border: ${(props) => (props.type === "ok" ? "2px solid var(--color-ok)" : "2px solid var(--color-error)")};
	border-radius: 15px;

	text-align: center;
	font-size: 24px;
	font-weight: 500;
`;
