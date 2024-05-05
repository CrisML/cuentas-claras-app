'use client';
import { AuthProvider } from "@/app/contexts/AuthContext";
import React from "react";
import {Homepage} from "@/app/Homepage/Homepage";
import { Navigate  } from "react-router-dom";

export default function Home() {

    return (
        <AuthProvider>
            <Homepage />
        </AuthProvider>
  );
}
