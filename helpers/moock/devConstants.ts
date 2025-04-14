import { TListClient } from "@/components/container/ListClient";

export const fakeListClient:TListClient[] = 
 [
{
  id: "1",
  name: "John Doe",
  direction: "john.doe@example.com",
  date: new Date(new Date().setDate(new Date().getDate() - 1)), // Yesterday
},
{
  id: "2",
  name: "Jane Smith",
  direction: "jane.smith@example.com",
  date: new Date(), // Today
},
{
  id: "3",
  name: "Alice Johnson",
  direction: "alice.johnson@example.com",
  date: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
}
  ]