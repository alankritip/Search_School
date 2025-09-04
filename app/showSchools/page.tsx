import { listSchools } from "@/app/actions/schools";
import SchoolCard from "@/components/SchoolCard"; // adjust path if different

export default async function ShowSchoolsPage() {
  const schools = await listSchools(48, 0);

  return (
    <main className="py-6">
      <h1 className="text-2xl font-bold mb-4">Schools</h1>

      {!schools || schools.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-600">
          No schools found yet. Add the first one on the Add School page.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {schools.map((s) => (
            <SchoolCard
              key={s.id}           
              name={s.name}
              address={s.address}
              city={s.city}
              image={s.image}
            />
          ))}
        </div>
      )}
    </main>
  );
}
