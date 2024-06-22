import axios from "axios";

export const fetchedUsers = async () => {
  const response = await axios.get("https://dummyjson.com/users");
  console.log("DATA--", response.data.users);
  return response.data.users;
};
