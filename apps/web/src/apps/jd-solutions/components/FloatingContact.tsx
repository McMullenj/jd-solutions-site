type FloatingContactProps = {
  contactHref: string;
};

export function FloatingContact({ contactHref }: FloatingContactProps) {
  return (
    <a className="floating-contact" href={contactHref} aria-label="Contact JD Solutions">
      <span className="contact-card-art" aria-hidden="true">
        <span />
      </span>
      <span>
        <small>Build</small>
        Contact
      </span>
    </a>
  );
}

