import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: Replace with actual database query
  const mockUserData = {
    name: 'John Doe',
    email: 'john@example.com',
    carbonScore: 450
  };

  return NextResponse.json(mockUserData);
} 