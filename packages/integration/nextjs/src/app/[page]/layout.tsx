type Props = {
  params: { page: string };
  children: any
};

export async function generateMetadata({ params }: any) {
  return {
    title: `Partytown GTM plugin - ${params.page}`
  };
}

export default function Page({ params, children }: Props) {
  return (
    <>{children}</>
  )
}
