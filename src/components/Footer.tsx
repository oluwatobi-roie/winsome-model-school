import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import wfsLogo from '@/assets/wms-logo.jpg';

const Footer = () => {
  const year = new Date().getFullYear();
  const mapUrl = 'https://www.google.com/maps/search/?api=1&query=Araromi+Phase+1+Itoki+Ifo+Ogun+State+Nigeria';

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={wfsLogo} alt="Winsome Model Schools logo" className="w-12 h-12 rounded-md object-cover" width="48" height="48" />
              <div>
                <h2 className="text-xl font-display font-semibold">Winsome Model Schools</h2>
                <p className="text-primary-foreground/80 text-sm">Excellence in Education</p>
              </div>
            </div>
            <p className="text-primary-foreground/90 text-sm leading-relaxed">A day school in Itoki, Ifo serving learners from Nursery through Senior Secondary.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-display font-semibold">Contact</h2>
            <a href="mailto:info@winsomemodelschools.com" className="flex items-center gap-3 text-primary-foreground/85 hover:text-primary-foreground">
              <Mail className="h-4 w-4 shrink-0" />
              <span>info@winsomemodelschools.com</span>
            </a>
            <a href="tel:+2348032319017" className="flex items-center gap-3 text-primary-foreground/85 hover:text-primary-foreground"><Phone className="h-4 w-4" />+234 803 231 9017</a>
            <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-primary-foreground/85 hover:text-primary-foreground">
              <MapPin className="h-4 w-4 mt-1 shrink-0" />
              <span>Araromi Phase 1, Itoki, Ifo LGA, Ogun State <ExternalLink className="inline h-3 w-3 ml-1" /></span>
            </a>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-display font-semibold">Quick links</h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground">About</Link>
              <Link to="/facilities" className="text-primary-foreground/80 hover:text-primary-foreground">Facilities</Link>
              <Link to="/admissions" className="text-primary-foreground/80 hover:text-primary-foreground">Admissions</Link>
              <a href="mailto:admissions@winsomemodelschools.com" className="text-primary-foreground/80 hover:text-primary-foreground">Admissions email</a>
              <Link to="/privacy" className="text-primary-foreground/80 hover:text-primary-foreground">Privacy</Link>
              <Link to="/terms" className="text-primary-foreground/80 hover:text-primary-foreground">Terms</Link>
              <Link to="/accessibility" className="text-primary-foreground/80 hover:text-primary-foreground">Accessibility</Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/20 text-sm text-primary-foreground/75">© {year} Winsome Model Schools. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
