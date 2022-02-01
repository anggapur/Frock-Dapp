import * as Yup from 'yup';

export const CommunityOfferingSchema = Yup.object().shape({
  depositAmount: Yup.number()
    .typeError('Contribution Amount must be a number')
    .positive('Contribution Amount must be greater than zero')
    .required('Contribution Amount is required'),
});
