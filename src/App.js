import "./App.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUsers = async () => {
  const { data } = await axios.get("https://dummyjson.com/users");
  console.log("DATA--", data);
  return data;
};

function App() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["datakey"],
    queryFn: fetchUsers,
  });

  if (error) return <div>Error Occured</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Users List</h1>\
    </div>
  );
}

export default App;
