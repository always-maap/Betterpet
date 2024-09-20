import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Container } from "@/components/ui/container";

export function Header() {
  return (
    <header className="bg-muted py-2">
      <Container>
        <ThemeToggle />
      </Container>
    </header>
  );
}
