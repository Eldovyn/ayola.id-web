import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";
import Image from "next/image";

interface Venue {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
}

interface VenueCardProps {
  venue: Venue;
}

function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

const VenueCard: React.FC<VenueCardProps> = ({ venue }) => {
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <Image
          src={venue.image}
          alt={venue.name}
          width={400}
          height={400}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-black/0 to-transparent opacity-70" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-zinc-800 shadow ring-1 ring-black/5 backdrop-blur-sm dark:bg-zinc-800/80 dark:text-zinc-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden
          >
            <path d="M11.48 3.499a.75.75 0 0 1 1.04 0l7 7a.75.75 0 1 1-1.06 1.06l-.96-.96V19.5a2.25 2.25 0 0 1-2.25 2.25H8.25A2.25 2.25 0 0 1 6 19.5V10.6l-.96.96a.75.75 0 0 1-1.06-1.06l7-7Z" />
          </svg>
          {formatIDR(venue.price)}/jam
        </span>
      </div>


      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {venue.name}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {venue.description}
        </p>


        <div className="mt-auto flex items-center justify-between pt-2">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl px-3.5 py-2 text-sm font-medium text-white shadow-sm ring-1 ring-black/5 transition-all duration-200 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 active:scale-[0.98] bg-indigo-600 hover:bg-indigo-500"
            aria-label={`Booking ${venue.name}`}
          >
            Booking
          </button>
          <button
            type="button"
            className="rounded-full p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 focus:outline-none dark:hover:bg-zinc-800"
            aria-label="Simpan ke favorit"
            title="Simpan ke favorit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M11.645 20.91l-.007-.003-.022-.01a15.247 15.247 0 0 1-.383-.177 25.18 25.18 0 0 1-4.244-2.59C4.688 16.001 2.25 13.298 2.25 9.75 2.25 7.126 4.289 5 6.833 5A4.64 4.64 0 0 1 12 7.01 4.64 4.64 0 0 1 17.167 5C19.711 5 21.75 7.126 21.75 9.75c0 3.549-2.438 6.252-4.739 8.38a25.175 25.175 0 0 1-4.244 2.59 15.247 15.247 0 0 1-.383.177l-.022.01-.007.003-.003.001a.75.75 0 0 1-.61 0l-.003-.001Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
};


export default function Home() {
  const badmintonVenues: Venue[] = [
    {
      id: "bv-01",
      name: "SmashPoint Arena",
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
      description: "Hall 3 lapangan vinyl dengan pencahayaan LED & ruang tunggu ber-AC. Cocok untuk latihan rutin.",
      price: 120000
    },
    {
      id: "bv-02",
      name: "Night Court Prime",
      image: "https://images.unsplash.com/photo-1599391398131-cd12dfc6c24e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=711",
      description: "Outdoor lighting premium untuk main malam, tersedia rental raket & shuttle.",
      price: 90000
    },
    {
      id: "bv-03",
      name: "Feather Hub",
      image: "https://images.unsplash.com/photo-1595220427358-8cf2ce3d7f89?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1476",
      description: "Studio privat 1 lapangan—sepi, nyaman, ideal untuk coaching 1-on-1.",
      price: 150000
    },
    {
      id: "bv-04",
      name: "Parkside Badminton",
      image: "https://plus.unsplash.com/premium_photo-1664303134673-7a073bf3fb54?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=736",
      description: "Lapangan park outdoor rindang—cocok untuk komunitas & fun games.",
      price: 75000
    },
    {
      id: "bv-05",
      name: "Urban Lines Hall",
      image: "https://plus.unsplash.com/premium_photo-1708119178805-321dec8ba9cf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1633",
      description: "Arena kota bergaris tegas, akses mudah dekat stasiun & parkir luas.",
      price: 110000
    },
    {
      id: "bv-06",
      name: "Shuttle Classic",
      image: "https://images.unsplash.com/photo-1664106588879-5480437fb30f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
      description: "Gudang peralatan lengkap—tersedia paket bundle raket + lapangan.",
      price: 100000
    },
    {
      id: "bv-07",
      name: "Nordic Drive Court",
      image: "https://images.unsplash.com/photo-1723074832950-9fb031b0f4ec?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
      description: "Lapangan standar turnamen—garis akurat, net premium, pro-shop on-site.",
      price: 180000
    },
    {
      id: "bv-08",
      name: "Monochrome Court",
      image: "https://plus.unsplash.com/premium_photo-1745951329360-4c25a8f19c9d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1633",
      description: "Aesthetic industrial—spot foto kece + lounge kopi setelah sparring.",
      price: 95000
    }
  ]

  return (
    <>
      <div className="flex flex-col gap-10 h-screen w-full pt-10">
        <div className="flex justify-end items-start w-full pt-20 pe-8">
          <div className="relative w-72">
            <Input type="search" placeholder="Search" className="pr-10" />
            <IoSearchOutline
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10"
              size={18}
              aria-hidden
            />
          </div>
        </div>
        <section className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ps-8 pe-8">
          {badmintonVenues.map((v) => (
            <VenueCard key={v.id} venue={v} />
          ))}
        </section>
        <br />
      </div>
    </>
  );
}
