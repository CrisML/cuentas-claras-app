"use client";
import React, { useState, useEffect } from "react";
import NavbarItem from "../navbar-item";
import { config } from "@/utils/config";
import { useAuth } from "../contexts/AuthContext";
import { useRouter} from "next/navigation";

interface Group {
  _id: string;
  name: string;
}

export default function GroupCreationScreen(): React.ReactElement {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { state, login, logout } = useAuth();

  const navbar: NavbarItem[] = [
    {
      name: "Inicio",
      href: "/",
    } as NavbarItem,
  ];

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/groups`);
        if (!response.ok) {
          throw new Error("Fallo el get de los grupos");
        }
        console.log("Haciendo GET de los grupos")
        const data = await response.json();
        console.log("Termino GET de los grupos")
        console.log(data)
        if (!data || !Array.isArray(data)) {
          throw new Error("No hay datos");
        }
        setGroups(data);
        setLoading(false);
      } catch (error) {
        console.error("Error haciendo get de los grupos:", error);
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const handleOnClick = (group: Group) => {
    router.push("/group/" + group._id);
  }

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <nav className="flex flex-col">
        <ul>
          {navbar.map((item, index) => (
            <li key={index}>
              <a href={item.href}>{item.name}</a>
            </li>
          ))}
        </ul>
      </nav>

      <h2 className="text-3xl font-bold mt-4">Grupos</h2>
      <ul className="space-y-2 w-full max-w-md">
        {groups.map((group) => (
            <li key={group._id} onClick={() => handleOnClick(group)}
                className="cursor-pointer bg-white shadow-lg rounded-lg p-4 hover:bg-gray-100">
              {group.name}
            </li>
        ))}
      </ul>
    </div>
  );
}
