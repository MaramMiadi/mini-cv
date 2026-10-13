import Link from "next/link";
import { profile } from "@/data/profile";

const links = [
  { href: "/#about", label: "À propos" },
  { href: "/#skills", label: "Compétences" },
  { href: "/projects", label: "Projets" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="brand">
          {profile.name}
        </Link>
        <nav aria-label="Navigation principale">
          <ul className="nav">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
