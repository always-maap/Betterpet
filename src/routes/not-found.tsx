import { Container } from "@/components/ui/container";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="text-center">
        <Container>
          <h1 className="text-4xl font-bold my-8">404 - Page not found</h1>
          <Link to="/">Go back to home</Link>
        </Container>
      </div>
    </div>
  );
}
