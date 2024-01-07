interface ContactFormEmailProps {
  name: string;
  email: string;
  message: string;
  affiliation: string;
}

const ContactFormEmail: React.FC<Readonly<ContactFormEmailProps>> = ({
  name,
  email,
  message,
  affiliation,
}) => (
  <div>
    <p>
      From <strong>{name}</strong>, ${affiliation}, {email}.
    </p>
    <p>{message}</p>
  </div>
);

export default ContactFormEmail;
