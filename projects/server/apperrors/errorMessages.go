package apperror

type CustomError string

func (e CustomError) Error() string {
	return string(e)
}

const (
	ErrDB                       CustomError = "database error"
	ErrPayloadDupUser400        CustomError = "username/email has aready been used"
	ErrPayloadNameFormat400     CustomError = "display name needs to be at least 3 characters long"
	ErrPayloadPwdFormat400      CustomError = "password needs to be at least 6 characters with one upper, lower, and special case"
	ErrPayloadPwdMatch400       CustomError = "password does not match"
	ErrPayloadEmailFormat400    CustomError = "invalid email"
	ErrPayloadDateFormat400     CustomError = "date needs to be in the YYYY-MM-DD format"
	ErrPayloadInvalidSource400  CustomError = "source of fund not allowed"
	ErrPayloadAccNum400         CustomError = "please enter the transfer destination"
	ErrPayloadIncomplete400     CustomError = "information provided is incomplete"
	ErrPayloadAmount400         CustomError = "you can only top up between Rp. 50.000 and Rp. 10.000.000 at once"
	ErrPayloadTransferAmount400 CustomError = "you can only transfer between Rp. 1.000 and Rp. 50.000.000 at once"
	ErrInsufficientFunds400     CustomError = "insufficient funds"
	ErrTopUpDiffId400           CustomError = "sender and recepient ID needs to be the same"
	ErrTransferSameId400        CustomError = "you cant transfer to yourself"
	ErrParamInvalidId400        CustomError = "invalid param ID, only numbers are accepted"
	ErrParamInvalidJWT400       CustomError = "invalid malformed token"
	ErrQueryInvalid400          CustomError = "invalid query"
	ErrQueryInvalidDate400      CustomError = "date needs to be in the YYYY-MM-DD format"
	ErrQueryInvalidSortBy400    CustomError = "sort only available with amount, sourceOfFunds, and createdAt"
	ErrQueryInvalidSortOrder400 CustomError = "only ASC and DESC sort order are allowed"
	ErrGachaNoAttempt400        CustomError = "you have no attempt left. please deposit at least Rp. 10.000.000"
	ErrAccountNotFound404       CustomError = "account does not exist"
	ErrEmailUsed403             CustomError = "email already used"
	ErrNoUpdate400              CustomError = "nothing has been changed"
	ErrUserNotFound404          CustomError = "user does not exist"
	ErrAuthJWT400               CustomError = "reset token no longer valid, please resend reset request"
	ErrAuthJWT401               CustomError = "invalid authorization token"
	ErrAuthJWT404               CustomError = "please provide an authorization token"
	ErrAuthPass401              CustomError = "incorrect login credentials"
	ErrAuth401                  CustomError = "you need to login to perform this operation"
	ErrAuth403                  CustomError = "you are not authorized to perform this operation"
	ErrAvatar400                CustomError = "invalid avatar file"
	ErrAvatarSize400            CustomError = "pictures must be less than 2MB"
	ErrAvatarFormat400          CustomError = "only .jpg, .jpeg, .png, .webp, and .gif is supported"
	ErrInternal500              CustomError = "please try again later"
)
