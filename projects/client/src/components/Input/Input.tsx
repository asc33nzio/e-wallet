import React, { useState } from "react";
import { FormikErrors, FormikTouched, useFormikContext } from "formik";
import { StyledEyeBlockedIcon, StyledEyeIcon, StyledField, StyledInputContainer } from "./Input.styles";

const Input = (props: {
	placeholder: string;
	isPassword: boolean;
	marBot: string;
	name?: string;
}): React.ReactElement => {
	const { errors, touched } = useFormikContext();
	const [show, setShow] = useState(false);

	const showHandler = () => {
		setShow(!show);
	};

	const hasError =
		(touched as FormikTouched<Record<string, unknown>>)[props.name ?? ""] &&
		(errors as FormikErrors<Record<string, unknown>>)[props.name ?? ""];

	return (
		<StyledInputContainer style={{ marginBottom: `${props.marBot}` }} error={hasError?.toString()}>
			{!props.isPassword ? (
				<StyledField
					type="text"
					name={props.name}
					placeholder={props.placeholder}
					error={hasError?.toString()}
				/>
			) : (
				<>
					<StyledField
						type={show ? "text" : "password"}
						name={props.name}
						placeholder={props.placeholder}
						error={hasError?.toString()}
					/>
					{show ? (
						<StyledEyeBlockedIcon size={30} error={hasError?.toString()} onClick={showHandler} />
					) : (
						<StyledEyeIcon size={30} error={hasError?.toString()} onClick={showHandler} />
					)}
				</>
			)}
		</StyledInputContainer>
	);
};

export default Input;
