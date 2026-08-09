import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import wfsLogo from '@/assets/wms-logo.jpg';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Facilities', href: '/facilities' },
    { name: 'Admissions', href: '/admissions' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-elegant' : 'bg-background/95'}`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group" aria-label="Winsome Model Schools home">
          <div className="w-10 h-10 rounded-md overflow-hidden border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-300">
            <img src={wfsLogo} alt="Winsome Model Schools logo" className="w-full h-full object-cover" width="40" height="40" />
          </div>
          <span className="hidden sm:block text-xl font-display font-bold text-primary">Winsome Model Schools</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-7" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`font-medium transition-colors duration-200 ${isActive(item.href) ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/admissions"><Button className="btn-primary hidden sm:inline-flex">Enquire About Admission</Button></Link>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild><Button variant="ghost" size="icon" className="md:hidden"><Menu className="h-6 w-6" /><span className="sr-only">Open menu</span></Button></SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center space-x-3 pb-6 border-b border-border">
                  <img src={wfsLogo} alt="Winsome Model Schools logo" className="w-10 h-10 rounded-md object-cover" width="40" height="40" />
                  <span className="text-lg font-display font-bold text-primary">Winsome Model Schools</span>
                </div>
                <nav className="flex-1 py-6" aria-label="Mobile navigation">
                  <ul className="space-y-3">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          aria-current={isActive(item.href) ? 'page' : undefined}
                          className={`block py-3 px-4 rounded-md font-semibold ${isActive(item.href) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-primary hover:bg-secondary'}`}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="pt-6 border-t border-border"><Link to="/admissions" onClick={() => setIsMobileMenuOpen(false)}><Button className="btn-primary w-full">Admissions Enquiry</Button></Link></div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
