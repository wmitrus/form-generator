import CardBody from '@/components/card/card-body/CardBody';
import CardHeader from '@/components/card/card-header/CardHeader';
import Card from '@/components/card/card/Card';

export default function CardPage({ params }: { params: { variant: string } }) {
  const { variant } = params;

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <Card variant={variant}>
          <CardHeader>Header</CardHeader>
          <CardBody>
            {
              "Some quick example text to build on the card title and make up the bulk of the card's content."
            }
          </CardBody>
        </Card>
      </main>
    </div>
  );
}
