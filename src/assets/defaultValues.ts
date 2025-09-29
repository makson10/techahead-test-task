import type { FormValues } from '@/components/formSchema';

export const defaultValues: FormValues = {
	property: {
		borough: '',
		block: '',
		lot: '',
		fullAddress: '',
	},
	applicant: {
		applicantName: '',
		applicantDescription: 'owner',
		applicantOther: '',
		isCondoBoardAgent: false,
		boardAuthority: '',
	},
};
