import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1> This is Pratical Task... </h1>

      <Link href={"/api"} style={{ textDecoration: "none" }}> Go to Weather Api </Link>


    </>
  );
}
