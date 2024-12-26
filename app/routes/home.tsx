import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hermes Queue" },
    { name: "description", content: "Hermes Messaging Queue, at least once delivery via WebSockets" },
  ];
}

export default function Home() {
  return <Welcome />;
}
