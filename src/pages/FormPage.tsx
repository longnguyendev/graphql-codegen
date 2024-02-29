import { Form, LoaderFunctionArgs } from "react-router-dom";

export function loader() {
  return null;
}
export async function action({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  console.log("formData", formData.get("title"));
  console.log("method", request.method);
  return formData;
}

export default function FormPage() {
  return (
    <div>
      <Form method="post" replace preventScrollReset>
        <input type="text" name="title" />
        <input type="text" name="description" />
        <button type="submit">Create</button>
      </Form>
      <form></form>
    </div>
  );
}
