type FinalContactProps = {
  contactHref: string;
};

export function FinalContact({ contactHref }: FinalContactProps) {
  return (
    <footer className="contact-section" id="contact">
      <div className="contact-shell" data-reveal>
        <p>JD Solutions</p>
        <h2>Build</h2>
        <a href={contactHref}>Contact</a>
      </div>
      <div className="footer-line" data-reveal>
        <span>Web</span>
        <span>Apps</span>
        <span>Systems</span>
        <span>Automation</span>
      </div>
    </footer>
  );
}

