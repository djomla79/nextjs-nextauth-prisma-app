import { activateUser } from '@/lib/actions';
import ActivationUser from '@/components/user/ActivationUser';

type ActivationPageProps = {
  params: {
    jwt: string;
  };
};

const ActivationPage = async ({ params: { jwt } }: ActivationPageProps) => {
  const result = await activateUser(jwt);
  return <ActivationUser status={result} />;
};

export default ActivationPage;
