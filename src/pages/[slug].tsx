import { useRouter } from "next/router";

export default function JournalEntry() {
  const router = useRouter();
  const { slug, id } = router.query;

  return (
    <div>
      <h1>Slug: {slug}</h1>
      <p>Doc ID: {id}</p>
    </div>
  );
}
