import HeaderSection from '../../components/HeaderSection';
import ContentSection from '../../components/ContentSection';

interface PageProps {
  params: {
    page: string
  }
};

export default async function Page({ params }: PageProps) {
  return (
    <>
      <HeaderSection />
      <ContentSection page={params.page} />
    </>
  );
}
