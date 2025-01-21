import useSWR from "swr"

export default function App() {
  const restaurants = useSWR<IRestaurant[]>("restaurants", () => {
    return fetch("http://localhost:3000/api/restaurant/all").then(res => res.json())
  })

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-slate-800 to-slate-700">
      <div className="flex w-full justify-center items-center flex-wrap p-2 gap-2">
        {restaurants.data?.map(r => <Restaurant key={r.code} restaurant={r} />)}

      </div>
    </div>
  )
}

function Restaurant({ restaurant }: { restaurant: IRestaurant }) {
  return (
    <div className="w-64 bg-white/80 hover:bg-white/90 p-2">
      <div className="flex gap-1 font-bold items-center">
        <div>
          {restaurant.name}
        </div>
        <div className="text-xs">
          {restaurant.code}
        </div>
      </div>
      <div className="text-justify">
        {restaurant.description}
      </div>
      <div>
        {restaurant.city}
      </div>
      <div>
        {restaurant.phone}
      </div>
      <div>
        {restaurant.website}
      </div>
      <div>
        {restaurant.type}
      </div>
    </div>
  )
}


export interface IRestaurant {
  code: number,
  EmailAddress: string,
  name: string,
  type: string
  website: string
  street: string
  number: string
  city: string
  zip: string
  country: string
  phone: string
  date: Date
  payment: string
  description: string
  scoring: IScore[]
}

export interface IScore {
  comment: string
  score: number
}