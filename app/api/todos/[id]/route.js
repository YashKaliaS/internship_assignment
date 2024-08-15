import { connectToDatabase } from '../../../lib/mongodb';
import Todo from '../../../model/Todo';

export async function GET() {
  await connectToDatabase();
  const todos = await Todo.find().lean(); // Use `.lean()` to get plain JavaScript objects
  return new Response(JSON.stringify(todos), { status: 200 });
}

export async function POST(req) {
  const { text } = await req.json();
  if (!text) return new Response('Invalid request body', { status: 400 });

  await connectToDatabase();
  const newTodo = new Todo({ text });
  await newTodo.save();
  return new Response(JSON.stringify(newTodo), { status: 201 });
}

export async function DELETE(req, { params }) {
  const { id } = params;
  await connectToDatabase();
  await Todo.findByIdAndDelete(id);
  return new Response(null, { status: 204 });
}

export async function PATCH(req, { params }) {
  const { id } = params;
  const { text } = await req.json();
  if (!text) return new Response('Invalid request body', { status: 400 });

  await connectToDatabase();
  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    { text },
    { new: true } // Return the updated document
  );

  if (!updatedTodo) return new Response('Todo not found', { status: 404 });

  return new Response(JSON.stringify(updatedTodo), { status: 200 });
}
