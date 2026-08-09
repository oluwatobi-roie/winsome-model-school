import { Card, CardContent } from '@/components/ui/card';
import { Award, BookOpen, Users } from 'lucide-react';
import leaderJohn from '@/assets/leader-john-akomolafe.jpg';
import leaderComfort from '@/assets/leader-comfort-akomolafe.jpg';
import approvalNursery2008 from '@/assets/approval-nursery-2008.jpg';
import approvalPrimary2009 from '@/assets/approval-primary-2009.jpg';
import approvalJss2012 from '@/assets/approval-jss-2012.jpg';
import approvalSss2013 from '@/assets/approval-sss-2013.jpg';

const AboutPage = () => {
  const approvals = [
    ['2008', 'Nursery School provisional approval', approvalNursery2008],
    ['2009', 'Primary section provisional approval', approvalPrimary2009],
    ['2012', 'Junior Secondary approval-in-principle', approvalJss2012],
    ['2013', 'Senior Secondary provisional approval', approvalSss2013],
  ] as const;

  return (
    <div>
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-display font-semibold mb-6">About Winsome Model Schools</h1>
          <p className="text-xl text-blue-100">Serving the Itoki, Ifo community since 2004, from Nursery through Senior Secondary.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-4xl font-display font-semibold text-primary mb-5">Our story</h2>
              <div className="space-y-4 text-muted-foreground text-lg">
                <p>Winsome Model Schools was founded in 2004 in Araromi Phase 1, Itoki, Dalemo, Ogun State. The school is a mixed day school focused on disciplined learning, character and individual attention.</p>
                <p>We serve learners across Nursery, Primary, Junior Secondary and Senior Secondary levels. Small class sizes help teachers follow each learner's progress closely and provide appropriate support.</p>
              </div>
            </div>

            <div className="grid gap-4">
              <Card><CardContent className="p-6 flex gap-4"><BookOpen className="h-7 w-7 text-primary" /><div><h3 className="font-semibold text-primary">Our mission</h3><p className="text-muted-foreground">To impart knowledge, build character and prepare students for future opportunities and responsibilities.</p></div></CardContent></Card>
              <Card><CardContent className="p-6 flex gap-4"><Users className="h-7 w-7 text-primary" /><div><h3 className="font-semibold text-primary">Our approach</h3><p className="text-muted-foreground">A supportive learning environment that values discipline, integrity, hard work and personal development.</p></div></CardContent></Card>
              <Card><CardContent className="p-6 flex gap-4"><Award className="h-7 w-7 text-primary" /><div><h3 className="font-semibold text-primary">Government approvals</h3><p className="text-muted-foreground">The school holds Ministry of Education approval documents for its sections. We describe each approval using the wording shown on the underlying document.</p></div></CardContent></Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-4xl font-display font-semibold text-primary text-center mb-10">Leadership</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card><CardContent className="p-7 text-center"><img src={leaderComfort} alt="Mrs Comfort Modupe Akomolafe" className="w-32 h-32 rounded-full object-cover mx-auto mb-4" loading="lazy" /><h3 className="text-xl font-semibold text-primary">Mrs Comfort Modupe Akomolafe</h3><p className="text-accent font-medium">Proprietress</p><p className="mt-4 text-sm text-muted-foreground">An experienced educator and administrator who conceived the school in 2004 and later dedicated herself fully to its development after retiring as a Director of Education.</p></CardContent></Card>
            <Card><CardContent className="p-7 text-center"><img src={leaderJohn} alt="Mr John Kayode Akomolafe" className="w-32 h-32 rounded-full object-cover mx-auto mb-4" loading="lazy" /><h3 className="text-xl font-semibold text-primary">Mr John Kayode Akomolafe</h3><p className="text-accent font-medium">Director & Business Strategist</p><p className="mt-4 text-sm text-muted-foreground">A management professional with experience spanning accounting, audit, human resources, aviation and operations who supports the school's governance and business administration.</p></CardContent></Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-4xl font-display font-semibold text-primary mb-4">Approval documents</h2>
            <p className="text-muted-foreground">These images are provided for transparency. Contact the school if you need an official copy or verification.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {approvals.map(([year, title, image]) => (
              <Card key={year} className="overflow-hidden">
                <img src={image} alt={`${title}, ${year}`} className="w-full aspect-[3/4] object-cover" loading="lazy" />
                <CardContent className="p-4"><div className="font-mono-ref text-school font-semibold">{year}</div><h3 className="mt-2 font-medium text-primary">{title}</h3></CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
