import * as Yup from 'yup';

export const CommunityOfferingSchema = selected => {
  if (selected === 'deposit') {
    return Yup.object().shape({
      depositAmount: Yup.number()
        .typeError('Contribution Amount must be a number')
        .positive('Contribution Amount must be greater than zero')
        .required('Contribution Amount is required'),
    });
  }
  return Yup.object().shape({
    withdrawAmount: Yup.number()
      .typeError('Withdraw Amount must be a number')
      .positive('Withdraw Amount must be greater than zero')
      .required('Withdraw Amount is required'),
  });
};
