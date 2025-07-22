"use client";
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import React from 'react';
import { SignOutButton } from "@clerk/nextjs";

const Logout = () => {
  return (
    <div>
      <SignOutButton>
        <Button>Logout</Button>
      </SignOutButton>
    </div>
  );
};

export default Logout;