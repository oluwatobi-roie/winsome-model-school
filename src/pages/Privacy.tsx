import { Link } from 'react-router-dom';

const Privacy = () => (
  <div className="container mx-auto px-4 py-16 max-w-3xl">
    <h1 className="text-4xl font-display font-semibold text-primary mb-8">Privacy Notice</h1>
    <div className="prose prose-slate max-w-none space-y-5 text-muted-foreground">
      <p>Winsome Model Schools uses information submitted through this website only to respond to enquiries and support the admissions process.</p>
      <h2 className="text-2xl text-primary">Information we request</h2>
      <p>The public admissions form requests basic parent or guardian contact details, the intended class and academic session, and an optional message. Do not submit medical records, identity documents, passwords, financial information or other sensitive records through the public form.</p>
      <h2 className="text-2xl text-primary">How information is used</h2>
      <p>Admissions enquiries are sent to the school for follow-up. Information should only be retained for as long as reasonably necessary for the enquiry and admissions process.</p>
      <h2 className="text-2xl text-primary">Your choices</h2>
      <p>You may contact the school without using the form. For general enquiries or questions about information you previously submitted, email <a className="underline" href="mailto:info@winsomemodelschools.com">info@winsomemodelschools.com</a> or call <a className="underline" href="tel:+2348032319017">+234 803 231 9017</a>. Admissions enquiries may also be sent directly to <a className="underline" href="mailto:admissions@winsomemodelschools.com">admissions@winsomemodelschools.com</a>.</p>
      <p>Return to the <Link to="/admissions" className="underline">admissions page</Link>.</p>
    </div>
  </div>
);

export default Privacy;
