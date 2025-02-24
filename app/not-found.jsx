// pages/404.js
import Container from "./components/ui/container";
import LinkButton from "./components/ui/link-button";
import NotFoundCard from "./components/ui/not-found-card";
import Title from "./components/ui/title";

export default function Custom404() {
  return (
    <Container className="flex flex-col items-center justify-center flex-grow">
      <NotFoundCard>
        <Title className="md:mt-2 mb-2 md:mb-4">Page Not Found.</Title>
        <LinkButton href={"/"}> Back to Home </LinkButton>
      </NotFoundCard>
    </Container>
  );
}
