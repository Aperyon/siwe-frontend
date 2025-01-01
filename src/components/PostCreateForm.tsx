import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { BACKEND_URL } from "../variables";

interface FormValues {
  text: string;
}

export default function PostCreateForm() {
  async function onSubmit(values: FormValues) {
    const url = `${BACKEND_URL}/posts`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
  }

  const { handleSubmit, register } = useForm<FormValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="text">Text</label>
        <input
          id="text"
          type="text"
          className="border p-2"
          {...register("text")}
        />
      </div>
      <Button> Create Form</Button>
    </form>
  );
}
