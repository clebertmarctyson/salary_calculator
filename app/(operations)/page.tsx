type Props = {
  params: {
    slug: string;
  };
};

const OperationPage = ({ params: { slug } }: Props) => {
  return <div>OperationPage {slug}</div>;
};

export default OperationPage;
