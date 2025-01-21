import { Button, Input, NumberInput, Table, TextInput } from "@mantine/core"
import { useState } from "react"
import useSWR from "swr"

export default function App() {
  const [page, setPage] = useState(-1)
  const restaurants = useSWR<IRestaurant[]>(`restaurant-${page}`, async () => {
    if (!page) return
    if (page === -1) return await fetch("http://localhost:3000/api/restaurant/all").then(res => res.json())
    const docs = await fetch(`http://localhost:3000/api/restaurant/id/${page}`).then(res => res.json())
    return [docs] as IRestaurant[]
  })

  const Search = () => {
    const [code, setCode] = useState(-1)
    return (
      <div className="flex gap-2">
        <TextInput
          placeholder="All"
          onChange={(e) => { setCode(Number.parseInt(e.target.value)) }}
        />
        <Button onClick={() => setPage(code)}>Search</Button>
      </div>
    )
  }
  const rows = restaurants.data && restaurants.data.map(r =>
    <Table.Tr key={r.code}>
      <Table.Td>{r.code}</Table.Td>
      <Table.Td>{r.name}</Table.Td>
      <Table.Td>{r.description}</Table.Td>
      <Table.Td>{r.city}</Table.Td>
      <Table.Td>{r.phone}</Table.Td>
      <Table.Td>{r.type}</Table.Td>
      <Table.Td><Button size="xs">edit</Button></Table.Td>
    </Table.Tr>)

  return (
    <div className="w-screen h-screen flex flex-col p-2 gap-2">
      <Search />
      <Table className="w-full h-fit" striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Code</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>City</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Edit</Table.Th>
          </Table.Tr>
        </Table.Thead>
        {restaurants.data && <Table.Tbody>{rows}</Table.Tbody>}
      </Table>
    </div >
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