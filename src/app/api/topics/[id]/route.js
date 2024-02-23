import connectMongoDB from "@/lib/mongodb";
import Topic from "@/models/Topic";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newTitle: title, newDescription: description , newPrice: price , newQuantity: quantity, newStartDate: startDate , newEndDate : endDate  } = await request.json();
  await connectMongoDB();
  await Topic.findByIdAndUpdate(id, { title, description , price , quantity , startDate , endDate });
  return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const topic = await Topic.findOne({ _id: id });
  return NextResponse.json({ topic }, { status: 200 });
}