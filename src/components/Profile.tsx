import { useForm } from "react-hook-form";
import LogoutButton from "./LogoutButton";
import { useAuth } from "../auth";
import { BACKEND_URL } from "../variables";

export interface FormValues {
  username: string;
  bio: string;
}

export default function Profile() {
  const { loggedInUser } = useAuth();

  async function onSubmit(values: FormValues) {
    const res = await fetch(`${BACKEND_URL}/current-user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      console.log("Error updating the user");
    } else {
      console.log("Successfully updated the user");
    }
  }

  const { handleSubmit, register } = useForm<FormValues>({
    defaultValues: { username: loggedInUser!.username, bio: loggedInUser!.bio },
  });

  return (
    <div>
      <h2 className="text-xl">Profile</h2>
      <LogoutButton />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <label>Username:</label>
            <input
              className="border p-2"
              {...register("username", { required: true })}
            />
          </div>
          <div>
            <label>Bio:</label>
            <input className="border p-2" {...register("bio")} />
          </div>
          <button className="bg-green-500 text-white p-2 my-2" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
