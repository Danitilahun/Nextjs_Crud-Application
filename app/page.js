import AddNote from "@/components/AddNote";
import NoteList from "@/components/NoteList";

async function getData() {
  const res = await fetch("http://localhost:3001/api/post", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Home = async () => {
  const notes = await getData();

  return (
    <main>
      <AddNote />
      <section>
        <NoteList notes={notes} />
      </section>
    </main>
  );
};

export default Home;
