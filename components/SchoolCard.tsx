type Props = {
  name: string;
  address: string;
  city: string;
  image: string;
};

export default function SchoolCard({ name, address, city, image }: Props) {
  return (
    <div className="rounded-lg border bg-white shadow-sm overflow-hidden hover:shadow-md transition">
      <div className="aspect-[16/10] bg-gray-100">
        <img
          src={`/schoolImages/${image}`}
          alt={name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-700">{address}</p>
        <p className="text-sm text-gray-500">{city}</p>
      </div>
    </div>
  );
}
