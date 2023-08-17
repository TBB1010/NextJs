"use client";

import TableCustom from "@/components/app.table";
import axios from "axios";
import { useState } from "react";
import { Container } from "react-bootstrap";
import useSWR from "swr";

export default function Blogs() {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/blogs",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (error) return <Container fluid>An error has database ....</Container>;
  if (isLoading) return <Container fluid>Loading....</Container>;

  return (
    <Container>
      <TableCustom blogs={data?.sort((a: any, b: any) => b.id - a.id)} />
    </Container>
  );
}
