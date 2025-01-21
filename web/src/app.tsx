import { Button, Table, TextInput, Modal, Stack } from "@mantine/core"
import { useDisclosure } from '@mantine/hooks';
import { useState } from "react"
import useSWR, { mutate } from "swr"

export default function App() {
  const [page, setPage] = useState(-1)
  const restaurants = useSWR<IRestaurant[]>(`restaurant-${page}`, async () => {
    if (!page) return
    if (page === -1) return await fetch("/api/restaurant/all").then(res => res.json())
    const docs = await fetch(`/api/restaurant/id/${page}`).then(res => res.json())
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
        <CreateRestaurant />
      </div>
    )
  }
  const rows = restaurants.data && restaurants.data.map(r =>
    <Table.Tr key={r.code}>
      <Table.Td>{r.code}</Table.Td>
      <Table.Td>{r.name}</Table.Td>
      <Table.Td>{r.description}</Table.Td>
      <Table.Td>{r.city}</Table.Td>
      <Table.Td>{r.street}</Table.Td>
      <Table.Td>{r.phone}</Table.Td>
      <Table.Td>{r.type}</Table.Td>
      <Table.Td><EditRestaurant data={r} /></Table.Td>
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
            <Table.Th>Street</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Open</Table.Th>
          </Table.Tr>
        </Table.Thead>
        {restaurants.data && <Table.Tbody>{rows}</Table.Tbody>}
      </Table>
    </div >
  )
}


function EditRestaurant({ data }: { data: IRestaurant }) {
  const [restaurant, setRestaurant] = useState({ ...data })
  const [opened, { open, close }] = useDisclosure(false);
  const update = () => {
    fetch(`/api/restaurant/id/${data.code}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(restaurant)
    })
    mutate(`restaurant-${data.code}`)
    mutate(`restaurant--1`)
    close()
  }
  return (
    <>
      <Modal opened={opened} onClose={close} title="Edit Restaurant" size={"lg"}>
        <Stack>
          <TextInput label="Name" defaultValue={data.name} onChange={(e) => { setRestaurant({ ...restaurant, name: e.currentTarget.value }) }} />
          <TextInput label="Description" defaultValue={data.description} onChange={(e) => { setRestaurant({ ...restaurant, description: e.currentTarget.value }) }} />
          <TextInput label="City" defaultValue={data.city} onChange={(e) => { setRestaurant({ ...restaurant, city: e.currentTarget.value }) }} />
          <TextInput label="Street" defaultValue={data.street} onChange={(e) => { setRestaurant({ ...restaurant, street: e.currentTarget.value }) }} />
          <TextInput label="Phone" defaultValue={data.phone} onChange={(e) => { setRestaurant({ ...restaurant, phone: e.currentTarget.value }) }} />
          <TextInput label="Type" defaultValue={data.type} onChange={(e) => { setRestaurant({ ...restaurant, type: e.currentTarget.value }) }} />
          <Button onClick={update}>Update</Button>
        </Stack>
      </Modal>
      <Button variant="default" onClick={open}>
        Open
      </Button>
    </>
  );
}

function CreateRestaurant() {
  const [restaurant, setRestaurant] = useState({})
  const [opened, { open, close }] = useDisclosure(false);
  const update = () => {
    fetch(`/api/restaurant`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...restaurant, scoring: [] })
    })
    close()
  }
  return (
    <>
      <Modal opened={opened} onClose={close} title="Create Restaurant" size={"lg"}>
        <Stack>
          <TextInput label="Code" onChange={(e) => { setRestaurant({ ...restaurant, code: Number.parseInt(e.currentTarget.value) }) }} />
          <TextInput label="Name" onChange={(e) => { setRestaurant({ ...restaurant, name: e.currentTarget.value }) }} />
          <TextInput label="Description" onChange={(e) => { setRestaurant({ ...restaurant, description: e.currentTarget.value }) }} />
          <TextInput label="City" onChange={(e) => { setRestaurant({ ...restaurant, city: e.currentTarget.value }) }} />
          <TextInput label="Street" onChange={(e) => { setRestaurant({ ...restaurant, street: e.currentTarget.value }) }} />
          <TextInput label="Phone" onChange={(e) => { setRestaurant({ ...restaurant, phone: e.currentTarget.value }) }} />
          <TextInput label="Type" onChange={(e) => { setRestaurant({ ...restaurant, type: e.currentTarget.value }) }} />
          <TextInput label="Email" onChange={(e) => { setRestaurant({ ...restaurant, EmailAddress: e.currentTarget.value }) }} />
          <TextInput label="Website" onChange={(e) => { setRestaurant({ ...restaurant, website: e.currentTarget.value }) }} />
          <TextInput label="Payment" onChange={(e) => { setRestaurant({ ...restaurant, payment: e.currentTarget.value }) }} />
          <TextInput label="Zip" onChange={(e) => { setRestaurant({ ...restaurant, zip: e.currentTarget.value }) }} />
          <TextInput label="Country" onChange={(e) => { setRestaurant({ ...restaurant, country: e.currentTarget.value }) }} />
          <TextInput label="Number" onChange={(e) => { setRestaurant({ ...restaurant, number: e.currentTarget.value }) }} />
          <TextInput label="Date" onChange={(e) => { setRestaurant({ ...restaurant, date: new Date(e.currentTarget.value) }) }} />
          <Button onClick={update}>Update</Button>
        </Stack>
      </Modal>
      <Button variant="default" onClick={open}>
        Create Restaurant
      </Button>
    </>
  );
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