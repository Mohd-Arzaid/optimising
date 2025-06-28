import { Link, useLocation } from "react-router-dom";
import { memo, useMemo, useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import companyLogo from "../assets/company-logo/company-logo.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

import {
  BookText,
  CheckCircle,
  Radiation,
  Battery,
  Recycle,
  Scale,
  Award,
  FileWarning,
  Flame,
  Radio,
  Wifi,
  Zap,
  ShieldCheck,
  Cpu,
  Presentation,
  Video,
  FileCheck,
  GalleryHorizontal,
  X,
  Menu,
  ChevronDown,
} from "lucide-react";

// ✅ Single source of truth for all navigation data - Immutable for performance
const NAVIGATION_DATA = Object.freeze({
  categories: Object.freeze([
    Object.freeze({
      id: "bis-foreign",
    name: "BIS Mark (Foreign)",
    link: "/a-guide-to-bis-certification-for-foreign-manufacturers-indian-bis",
      icon: CheckCircle,
      desktopOrder: 1,
      mobileOrder: 1,
    }),
  {
      id: "crs-reg",
    name: "CRS Registration",
    link: "/what-is-crs-bis-or-crs-registration",
      icon: ShieldCheck,
      desktopOrder: 2,
      mobileOrder: 7,
  },
  {
      id: "ce-cert",
    name: "CE Certification",
    link: "/ce-certification",
      icon: ShieldCheck,
      desktopOrder: 3,
      mobileOrder: 14,
  },
  {
      id: "isi-indian",
    name: "ISI Mark (Indian)",
    link: "/a-guide-to-bis-certification-indian-bis",
      icon: Award,
      desktopOrder: 4,
      mobileOrder: 2,
  },
  {
      id: "scheme-x",
    name: "Scheme X",
    link: "/schemeX",
      icon: Cpu,
      desktopOrder: 5,
      mobileOrder: 8,
  },
  {
      id: "epr-reg",
    name: "EPR Registration",
    link: "/a-guide-on-how-to-obtain-epr-certificate",
      icon: Recycle,
      desktopOrder: 6,
      mobileOrder: 9,
  },
  {
      id: "rohs",
    name: "ROHS",
    link: "/restriction-of-hazardous-substance-rohs-certificate",
      icon: Radiation,
      desktopOrder: 7,
      mobileOrder: 15,
  },
  {
      id: "bis-cert",
    name: "BIS Certification",
    link: "/what-is-bis-certificate-indian-bis",
      icon: CheckCircle,
      desktopOrder: 8,
      mobileOrder: 3,
  },
  {
      id: "plastic-waste",
    name: "Plastic Waste",
    link: "/epr-certificate-for-plastic-waste-management-pwm",
      icon: Recycle,
      desktopOrder: 9,
      mobileOrder: 10,
  },
  {
      id: "emi-emc",
    name: "EMI/EMC",
    link: "/emi-emc-certification",
      icon: Cpu,
      desktopOrder: 10,
      mobileOrder: 16,
  },
  {
      id: "cdsco-reg",
    name: "CDSCO Registration",
    link: "/cdsco-registration-certification",
      icon: FileWarning,
      desktopOrder: 11,
      mobileOrder: 4,
  },
  {
      id: "battery-waste",
    name: "Battery Waste",
    link: "/epr-certificate-for-battery-waste-management-bwm",
      icon: Battery,
      desktopOrder: 12,
      mobileOrder: 11,
  },
  {
      id: "tec",
    name: "TEC",
    link: "/information-about-tec-certificate-mtcte",
      icon: Radio,
      desktopOrder: 13,
      mobileOrder: 17,
  },
  {
      id: "lmpc-reg",
    name: "LMPC Registration",
    link: "/a-guide-on-how-to-obtain-lmpc-certificate",
      icon: BookText,
      desktopOrder: 14,
      mobileOrder: 5,
  },
  {
      id: "peso",
    name: "PESO",
    link: "/information-about-peso-certification-peso-license-india",
      icon: Flame,
      desktopOrder: 15,
      mobileOrder: 12,
  },
  {
      id: "bee",
    name: "BEE",
    link: "/bee-certification",
      icon: Zap,
      desktopOrder: 16,
      mobileOrder: 18,
  },
  {
      id: "legal-metrology",
    name: "Legal Metrology",
    link: "/what-is-legal-metrology-or-lmpc-certificate",
      icon: Scale,
      desktopOrder: 17,
      mobileOrder: 6,
  },
  {
      id: "wpc",
    name: "WPC",
    link: "/information-about-wpc-certificate-eta-approval",
      icon: Wifi,
      desktopOrder: 18,
      mobileOrder: 13,
  },
  {
      id: "cb-cert",
    name: "CB Certification",
    link: "/cb-certification",
      icon: Award,
      desktopOrder: 19,
      mobileOrder: 19,
  },
  ]),
  updates: [
    {
      id: "bis-qco",
    name: "BIS QCO UPDATES",
    link: "/bis-qco-updates",
      icon: BookText,
  },
  {
      id: "ministry",
    name: "Ministry Updates",
    link: "/ministry-updates",
      icon: FileWarning,
  },
  {
      id: "webinars",
    name: "Upcoming Webinars",
    link: "/webinar",
      icon: Presentation,
  },
  {
      id: "videos",
    name: "Video About BIS Certification",
    link: "/videos-about-bis-certification",
      icon: Video,
  },
  ],
  gallery: [
  {
      id: "audits",
    name: "International Audits",
    link: "/international-audits",
      icon: FileCheck,
  },
  {
      id: "seminars",
    name: "Seminars/Exhibitions",
    link: "/seminars-and-exhibitions",
      icon: GalleryHorizontal,
  },
  ],
  faqs: [
  {
      id: "bis-licence",
    name: "BIS Licence",
    link: "/faq-bis-licence",
      icon: Award,
  },
  {
      id: "bis-registration",
    name: "BIS Registration",
    link: "/faq-bis-registration",
      icon: CheckCircle,
  },
  {
      id: "cdsco-licence",
    name: "CDSCO Licence",
    link: "/faq-cdsco-licence",
      icon: FileCheck,
  },
  {
      id: "cdsco-registration",
    name: "CDSCO Registration",
    link: "/faq-cdsco-registration",
      icon: BookText,
  },
  {
      id: "foreign-bis",
    name: "Foreign Manufacturer BIS",
    link: "/faq-foreign-manufacturer-bis",
      icon: ShieldCheck,
  },
  ],
});

// ✅ CSS Classes as constants (DRY principle) - Immutable for performance
const STYLES = Object.freeze({
  menuItem:
    "text-base text-foreground/60 font-roboto tracking-wide hover:text-foreground/80 transition-colors block hover:bg-black/10 hover:rounded-md w-full p-2 text-left flex items-center",
  button:
    "text-base uppercase text-foreground/60 font-roboto tracking-wide hover:text-foreground/80 transition-colors",
  mobileButton:
    "text-base text-foreground/80 font-roboto tracking-wide hover:text-foreground hover:bg-neutral-100 transition-colors w-full justify-start py-3",
  mobileSubButton:
    "text-sm text-foreground/70 font-roboto tracking-wide hover:text-foreground hover:bg-neutral-100 transition-colors w-full justify-start py-2 pl-4",
  mobileSectionHeader:
    "text-base text-foreground/80 font-roboto tracking-wide hover:text-foreground hover:bg-neutral-100 transition-colors w-full justify-start py-3 flex items-center justify-between",
});

// 📱 Reusable mobile navigation item with performance optimization
const MobileNavItem = memo(({ item, onClose, className = STYLES.mobileSubButton }) => (
  <Link to={item.link} className="block w-full" onClick={onClose}>
    <Button variant="ghost" className={className}>
      <item.icon className="w-4 h-4 mr-2" />
      {item.name}
    </Button>
  </Link>
));

MobileNavItem.displayName = "MobileNavItem";

// 🔽 Collapsible mobile section with smooth animations
const MobileSection = memo(({ title, items, isOpen, onToggle, onClose }) => (
  <div>
    <Button
      variant="ghost"
      onClick={onToggle}
      className={STYLES.mobileButton}
      aria-expanded={isOpen}
    >
      {title}
      <ChevronDown
        className={`w-4 h-4 ml-auto transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </Button>

    {isOpen && (
      <div className="pt-1 pb-4 pl-4 pr-0 bg-neutral-50/50">
        <div className="flex flex-col space-y-1 py-1 max-h-[60vh] overflow-y-auto scrollbar-hide">
          {items.map((item) => (
            <MobileNavItem key={item.id} item={item} onClose={onClose} />
          ))}
        </div>
      </div>
    )}
  </div>
));

MobileSection.displayName = "MobileSection";

const Navbar = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState(new Set());
  const location = useLocation();

  // ✅ Optimized menu items with proper ordering and deep memoization
  const menuItems = useMemo(() => {
    const createDesktopItems = (items) =>
      items.map((item) => (
        <NavigationMenuLink key={item.id} asChild>
            <Link to={item.link} className="block">
            <div className={STYLES.menuItem}>
              <item.icon className="w-4 h-4 mr-2" />
                <span>{item.name}</span>
              </div>
            </Link>
          </NavigationMenuLink>
      ));

    // Sort categories for desktop and mobile separately - memoized sorting
    const categoriesDesktop = [...NAVIGATION_DATA.categories].sort(
      (a, b) => a.desktopOrder - b.desktopOrder
    );
    const categoriesMobile = [...NAVIGATION_DATA.categories].sort(
      (a, b) => a.mobileOrder - b.mobileOrder
    );

    return {
      categories: createDesktopItems(categoriesDesktop),
      categoriesMobile: categoriesMobile,
      updates: createDesktopItems(NAVIGATION_DATA.updates),
      updatesMobile: NAVIGATION_DATA.updates,
      gallery: createDesktopItems(NAVIGATION_DATA.gallery),
      galleryMobile: NAVIGATION_DATA.gallery,
      faqs: createDesktopItems(NAVIGATION_DATA.faqs),
      faqsMobile: NAVIGATION_DATA.faqs,
    };
  }, []); // Empty dependency array since NAVIGATION_DATA is static

  // 🔄 Efficient Set-based state for tracking open mobile sections
  const toggleSection = useCallback((sectionId) => {
    setOpenSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  }, []);

  // ✅ Close mobile menu when clicking outside or on links
  const closeMobileMenu = useCallback(() => setIsOpen(false), []);

  // 🔄 Optimized route change handler - only reset if sections are actually open
  const resetMobileState = useCallback(() => {
    setOpenSections(prev => prev.size > 0 ? new Set() : prev); // Only reset if needed
    setIsOpen(prev => prev ? false : prev); // Only update if actually open
  }, []);

  // 🔄 Reset mobile dropdown sections when route changes for better UX
  useEffect(() => {
    resetMobileState();
  }, [location.pathname, resetMobileState]);

  return (
    <nav className="z-50 sticky top-0 md:top-[44px] w-full bg-white/70 backdrop-blur-lg border-b border-neutral-200">
      <div className="flex items-center justify-between px-4 md:px-8 h-20 max-w-[88rem] mx-auto">
        {/* Company Logo & Name */}
        <Link
          to="/"
          className="selection:bg-emerald-600 flex items-center justify-center space-x-2.5 text-2xl font-bold py-6 text-center text-neutral-600 md:mr-10"
          aria-label="Sun Certifications India - Home"
          onClick={closeMobileMenu}
        >
          <img
            src={companyLogo}
            alt="Sun Certifications India logo"
            className="w-10 h-10 md:w-12 md:h-12"
            loading="eager"
            decoding="async"
            width="48"
            height="48"
          />
          <div className="py-2 text-center">
            <h1 className="font-roboto text-black uppercase tracking-wide leading-normal text-[14px] md:text-xl font-bold">
              Sun Certifications India
            </h1>
            <p className="text-foreground/90 text-[10px] md:text-[13px] leading-none uppercase font-normal">
              Simplifying Certifications
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center justify-end">
          <NavigationMenu>
            <NavigationMenuList>
              {/* Home */}
              <NavigationMenuItem>
                <Link to="/">
                  <Button variant="link" className={STYLES.button}>
                    Home
                  </Button>
                </Link>
              </NavigationMenuItem>

              {/* About */}
              <NavigationMenuItem>
                <Link to="/about">
                  <Button variant="link" className={STYLES.button}>
                    About
                  </Button>
                </Link>
              </NavigationMenuItem>

              {/* Services */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className={STYLES.button}>
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-3 gap-2 w-[700px] p-6">
                    {menuItems.categories}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Updates */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={STYLES.button}>
                  Updates
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 w-[300px]">{menuItems.updates}</div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Gallery */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={STYLES.button}>
                  Gallery
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 w-60">{menuItems.gallery}</div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* FAQs */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={STYLES.button}>
                  FAQs
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 w-[265px]">{menuItems.faqs}</div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Contact Us */}
              <NavigationMenuItem>
                <Link to="/contact">
                  <Button variant="link" className={STYLES.button}>
                    Contact Us
                  </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-black focus:outline-none "
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <MobileNavbarMenu
          closeMobileMenu={closeMobileMenu}
          menuItems={menuItems}
          openSections={openSections}
          toggleSection={toggleSection}
        />
      )}
    </nav>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;

const MobileNavbarMenu = memo(
  ({ closeMobileMenu, menuItems, openSections, toggleSection }) => {
    const menuRef = useRef(null);

    // 📱 Optimized mobile UX with efficient event handling
    useEffect(() => {
      // Instant scroll handler - immediate close for better UX
      const handleScroll = () => {
        closeMobileMenu(); // Close immediately on scroll
      };

      // Optimized outside click handler with early return
      const handleOutsideClick = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          closeMobileMenu(); // Close when clicking outside menu area
        }
      };

      // Use passive listeners for better scroll performance
      window.addEventListener("scroll", handleScroll, { passive: true });
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick, { passive: true });

      // 🧹 Cleanup to prevent memory leaks
      return () => {
        window.removeEventListener("scroll", handleScroll);
        document.removeEventListener("mousedown", handleOutsideClick);
        document.removeEventListener("touchstart", handleOutsideClick);
      };
    }, [closeMobileMenu]);

  return (
      <div
        ref={menuRef}
        className="md:hidden absolute top-full left-0 w-full bg-white border-t border-b border-neutral-200 shadow-lg z-40 max-h-[80vh] overflow-y-auto scrollbar-hide"
      >
      <div className="px-4 py-4 space-y-1">
        {/* Home */}
          <Link to="/" className="block w-full" onClick={closeMobileMenu}>
            <Button variant="ghost" className={STYLES.mobileButton}>
            Home
          </Button>
        </Link>

        {/* About */}
          <Link to="/about" className="block w-full" onClick={closeMobileMenu}>
            <Button variant="ghost" className={STYLES.mobileButton}>
            About
          </Button>
        </Link>

          {/* Services */}
          <MobileSection
            title="Services"
            items={menuItems.categoriesMobile}
            isOpen={openSections.has("services")}
            onToggle={() => toggleSection("services")}
            onClose={closeMobileMenu}
          />

          {/* Updates */}
          <MobileSection
            title="Updates"
            items={menuItems.updatesMobile}
            isOpen={openSections.has("updates")}
            onToggle={() => toggleSection("updates")}
            onClose={closeMobileMenu}
          />

          {/* Gallery */}
          <MobileSection
            title="Gallery"
            items={menuItems.galleryMobile}
            isOpen={openSections.has("gallery")}
            onToggle={() => toggleSection("gallery")}
            onClose={closeMobileMenu}
          />

          {/* FAQs */}
          <MobileSection
            title="FAQs"
            items={menuItems.faqsMobile}
            isOpen={openSections.has("faqs")}
            onToggle={() => toggleSection("faqs")}
            onClose={closeMobileMenu}
          />

        {/* Contact Us */}
          <Link
            to="/contact"
            className="block w-full"
            onClick={closeMobileMenu}
          >
            <Button variant="ghost" className={STYLES.mobileButton}>
            Contact Us
          </Button>
        </Link>
      </div>
    </div>
  );
  }
);

MobileNavbarMenu.displayName = "MobileNavbarMenu";

MobileNavbarMenu.propTypes = {
  closeMobileMenu: PropTypes.func.isRequired,
  menuItems: PropTypes.object.isRequired,
  openSections: PropTypes.instanceOf(Set).isRequired,
  toggleSection: PropTypes.func.isRequired,
};

MobileNavItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
};

MobileSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
