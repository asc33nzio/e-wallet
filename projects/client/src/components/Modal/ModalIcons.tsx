import React from "react";
import styled from "styled-components";

const EditICO = () => (
	<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M17.2576 0.5C7.999 0.5 0.515137 6.0875 0.515137 13C0.515137 19.9125 7.999 25.5 17.2576 25.5C26.5161 25.5 34 19.9125 34 13C34 6.0875 26.5161 0.5 17.2576 0.5ZM22.4477 6.8375C22.6821 6.8375 22.9165 6.9 23.1174 7.0375L25.2437 8.625C25.6288 8.9 25.6288 9.3375 25.2437 9.6L23.5695 10.85L20.1373 8.2875L21.8115 7.0375C21.9789 6.9 22.2133 6.8375 22.4477 6.8375ZM19.1495 9.0125L22.5984 11.5875L12.4525 19.1625H9.00355V16.5875L19.1495 9.0125Z"
			fill="#4D47C3"
		/>
	</svg>
);

export const SuccessICO = (): React.ReactElement => (
	<svg width="129" height="128" viewBox="0 0 129 128" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M64.5 0.25C29.4375 0.25 0.75 28.9375 0.75 64C0.75 99.0625 29.4375 127.75 64.5 127.75C99.5625 127.75 128.25 99.0625 128.25 64C128.25 28.9375 99.5625 0.25 64.5 0.25ZM51.75 95.875L19.875 64L28.8637 55.0112L51.75 77.8337L100.136 29.4475L109.125 38.5L51.75 95.875Z"
			fill="#33A720"
		/>
	</svg>
);

const StyledFileInput = styled.div`
	display: inline-block;
	position: relative;
	overflow: hidden;
	cursor: pointer;

	svg {
		cursor: pointer;
		position: fixed;
		top: 315px;
		left: 1010px;
		width: 50px;
		height: 50px;
	}

	input[type="file"] {
		cursor: pointer;
		position: fixed;
		top: 315px;
		left: 1010px;
		width: 50px;
		height: 50px;

		opacity: 0;
	}
`;

interface FileInputProps {
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
	return (
		<StyledFileInput>
			<EditICO />
			<input type="file" onChange={onChange} />
		</StyledFileInput>
	);
};

export default FileInput;
