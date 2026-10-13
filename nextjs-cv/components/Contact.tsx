import { profile } from "@/data/profile";

export default function Contact() {
  return (
    <section id="contact" className="section section-alt">
      <div className="container contact">
        <div>
          <h2>Contact</h2>
          <p>Une question, une opportunité ? Écrivez-moi.</p>
          <ul className="contact-links">
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <form
          className="form"
          action={`mailto:${profile.email}`}
          method="post"
          encType="text/plain"
        >
          <label htmlFor="name">Nom</label>
          <input id="name" name="name" type="text" required />
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={4} required />          <button type="submit">Envoyer le message</button>
        </form>
      </div>
    </section>
  );
}
